 
import React, { useMemo, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Switch,
  TouchableOpacity,
} from 'react-native';
import { Stack } from 'expo-router';
import {
  Layers,
  PhoneCall,
  MessageCircle,
  Link2,
  Briefcase,
  Users,
  AlertCircle,
  Globe,
  Activity,
  Timer,
  CheckCircle,
  ChevronRight,
} from 'lucide-react-native';
import { useTheme } from '@/providers/ThemeProvider';

interface BlueprintStep {
  id: string;
  title: string;
  description: string;
  owner: string;
  completed: boolean;
}

interface Connector {
  id: string;
  label: string;
  detail: string;
  connected: boolean;
}

interface ApprovalLane {
  id: string;
  title: string;
  threshold: string;
  responders: string;
  sla: string;
}

const observabilityMetrics = [
  { id: 'pipeline', label: 'Pipeline monitored', value: '$42M', subtext: 'Across 68 deals' },
  { id: 'latency', label: 'Response latency', value: '2.2s', subtext: 'AI → AE handoff' },
  { id: 'savings', label: 'Discount guardrail', value: '$1.4M', subtext: 'Protected this quarter' },
  { id: 'coverage', label: 'Geo coverage', value: '11 regions', subtext: 'PSTN + WhatsApp' },
];

export default function AINegotiationSetupScreen() {
  const { theme } = useTheme();
  const [aiNegotiatorEnabled, setAiNegotiatorEnabled] = useState<boolean>(true);
  const [autoDiscounts, setAutoDiscounts] = useState<boolean>(false);
  const [autoEscalations, setAutoEscalations] = useState<boolean>(true);
  const [callPickupMode, setCallPickupMode] = useState<'auto' | 'wait'>('wait');
  const [waitDuration, setWaitDuration] = useState<number>(8);
  const [orderConfirmationEnabled, setOrderConfirmationEnabled] = useState<boolean>(true);
  const [confirmationTiming, setConfirmationTiming] = useState<'immediate' | 'delayed'>('immediate');
  const [confirmationRetries, setConfirmationRetries] = useState<number>(2);
  const [connectors, setConnectors] = useState<Connector[]>([
    { id: 'crm', label: 'Salesforce CRM', detail: 'Streaming call notes + transcripts', connected: true },
    { id: 'dialer', label: 'Global Dialer', detail: '+1, +44, +61 pools mapped', connected: true },
    { id: 'whatsapp', label: 'WhatsApp Business', detail: 'Meta BSP verified', connected: true },
    { id: 'slack', label: 'Slack War Room', detail: '#deal-escalations channel', connected: true },
  ]);

  const blueprintSteps = useMemo<BlueprintStep[]>(() => [
    { id: '1', title: 'ICP & Messaging', description: 'Tone, persona packs, and forbidden phrases', owner: 'Brand Studio', completed: true },
    { id: '2', title: 'Pricing Guardrails', description: 'Floor, stretch, and approval paths', owner: 'Revenue Ops', completed: true },
    { id: '3', title: 'Contract Intelligence', description: 'Clause extraction + legal auto-summary', owner: 'Legal', completed: false },
    { id: '4', title: 'Escalation Mesh', description: 'Bridge AE, SE, finance approvers in <90s', owner: 'Deal Desk', completed: false },
  ], []);

  const approvalLanes: ApprovalLane[] = [
    { id: 'lane-1', title: 'Tier 1 · up to $100k', threshold: 'Auto AI negotiation', responders: 'AE + AI pair', sla: 'Instant' },
    { id: 'lane-2', title: 'Tier 2 · $100k-$500k', threshold: 'Dual approval required', responders: 'Deal desk + finance', sla: '2 hours' },
    { id: 'lane-3', title: 'Tier 3 · Strategic', threshold: 'Legal + exec briefing', responders: 'CRO, Legal, RevOps', sla: '4 hours' },
  ];

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
    <View style={[styles.container, { backgroundColor: theme.colors.background }]} testID="negotiation-setup-screen">
      <Stack.Screen
        options={{
          title: 'Setup & Configuration',
          headerStyle: { backgroundColor: theme.colors.background },
          headerTintColor: theme.colors.text,
        }}
      />

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        <View style={styles.header}>
          <Text style={[styles.title, { color: theme.colors.text }]}>Enterprise deal desk</Text>
          <Text style={[styles.subtitle, { color: theme.colors.secondaryText }]} testID="negotiation-setup-subtitle">
            Configure AI negotiators, approvals, channels, and observability for high-velocity enterprise deals.
          </Text>
        </View>

        <View style={[styles.metricCard, { backgroundColor: theme.colors.cardBackground }]}>
          <View style={styles.metricLeft}>
            <Text style={[styles.metricLabel, { color: theme.colors.secondaryText }]}>Readiness score</Text>
            <Text style={[styles.metricValue, { color: theme.colors.text }]}>91%</Text>
            <Text style={[styles.metricHint, { color: theme.colors.secondaryText }]}>5 of 6 launch criteria cleared</Text>
          </View>
          <View style={styles.metricRight}>
            <Text style={[styles.metricChip, { color: theme.colors.primary, borderColor: theme.colors.primary }]}>Global pilot</Text>
            <Text style={[styles.metricChip, { color: theme.colors.success, borderColor: theme.colors.success }]}>AI tier 3 ready</Text>
          </View>
        </View>

        <View style={styles.toggleRow}>
          <View style={[styles.toggleCard, { backgroundColor: theme.colors.cardBackground }]}>
            <View style={styles.toggleContent}>
              <View>
                <Text style={[styles.toggleTitle, { color: theme.colors.text }]}>Enable AI negotiator</Text>
                <Text style={[styles.toggleSubtitle, { color: theme.colors.secondaryText }]}>Routes calls + WhatsApp threads to AI first</Text>
              </View>
              <Switch
                value={aiNegotiatorEnabled}
                onValueChange={value => {
                  console.log('AI negotiator toggled', value);
                  setAiNegotiatorEnabled(value);
                }}
                trackColor={{ false: '#767577', true: theme.colors.primary }}
                thumbColor={aiNegotiatorEnabled ? '#fff' : '#f4f3f4'}
              />
            </View>
          </View>
          <View style={[styles.toggleCard, { backgroundColor: theme.colors.cardBackground }]}>
            <View style={styles.toggleContent}>
              <View>
                <Text style={[styles.toggleTitle, { color: theme.colors.text }]}>Auto discounts</Text>
                <Text style={[styles.toggleSubtitle, { color: theme.colors.secondaryText }]}>Allow AI to concede up to 5%</Text>
              </View>
              <Switch
                value={autoDiscounts}
                onValueChange={value => {
                  console.log('Auto discount toggled', value);
                  setAutoDiscounts(value);
                }}
                trackColor={{ false: '#767577', true: theme.colors.primary }}
                thumbColor={autoDiscounts ? '#fff' : '#f4f3f4'}
              />
            </View>
          </View>
        </View>

        <View style={[styles.toggleCard, { backgroundColor: theme.colors.cardBackground }]}>
          <View style={styles.toggleContent}>
            <View>
              <Text style={[styles.toggleTitle, { color: theme.colors.text }]}>Auto escalations</Text>
              <Text style={[styles.toggleSubtitle, { color: theme.colors.secondaryText }]}>Page live AE when risk rises or SLA breached</Text>
            </View>
            <Switch
              value={autoEscalations}
              onValueChange={value => {
                console.log('Auto escalations toggled', value);
                setAutoEscalations(value);
              }}
              trackColor={{ false: '#767577', true: theme.colors.primary }}
              thumbColor={autoEscalations ? '#fff' : '#f4f3f4'}
            />
          </View>
        </View>

        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Call Pickup Behavior</Text>
          <View style={[styles.callPickupCard, { backgroundColor: theme.colors.cardBackground }]} testID="negotiation-call-pickup">
            <Text style={[styles.callPickupDescription, { color: theme.colors.secondaryText }]}>
              Configure how AI handles incoming calls
            </Text>
            
            <View style={styles.pickupOptions}>
              <TouchableOpacity
                style={[styles.pickupOption, { backgroundColor: callPickupMode === 'auto' ? theme.colors.primary : theme.colors.cardBackground }]}
                onPress={() => {
                  console.log('Call pickup mode changed to auto');
                  setCallPickupMode('auto');
                }}
                testID="negotiation-pickup-auto"
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
                style={[styles.pickupOption, { backgroundColor: callPickupMode === 'wait' ? theme.colors.primary : theme.colors.cardBackground }]}
                onPress={() => {
                  console.log('Call pickup mode changed to wait');
                  setCallPickupMode('wait');
                }}
                testID="negotiation-pickup-wait"
              >
                <View style={styles.pickupOptionContent}>
                  <Timer size={20} color={callPickupMode === 'wait' ? 'white' : theme.colors.text} />
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
                  <Timer size={18} color={theme.colors.primary} />
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
                      testID={`negotiation-wait-${duration}`}
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
          <View style={[styles.orderConfirmCard, { backgroundColor: theme.colors.cardBackground }]} testID="negotiation-order-confirmation">
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
                    testID="negotiation-confirmation-immediate"
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
                    testID="negotiation-confirmation-delayed"
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
                        testID={`negotiation-confirmation-retry-${retry}`}
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
          <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Blueprint checklist</Text>
          {blueprintSteps.map(step => (
            <View key={step.id} style={[styles.blueprintRow, { backgroundColor: theme.colors.cardBackground }]} testID={`negotiation-setup-blueprint-${step.id}`}>
              <View style={styles.blueprintLeft}>
                <View style={[styles.statusIcon, { backgroundColor: step.completed ? '#34C75920' : '#FF3B3015' }]}>
                  {step.completed ? (
                    <CheckCircle size={16} color={theme.colors.success} />
                  ) : (
                    <AlertCircle size={16} color={theme.colors.error} />
                  )}
                </View>
                <View>
                  <Text style={[styles.blueprintTitle, { color: theme.colors.text }]}>{step.title}</Text>
                  <Text style={[styles.blueprintDescription, { color: theme.colors.secondaryText }]}>{step.description}</Text>
                </View>
              </View>
              <View style={styles.blueprintRight}>
                <Text style={[styles.ownerLabel, { color: theme.colors.secondaryText }]}>{step.owner}</Text>
                <ChevronRight size={16} color={theme.colors.secondaryText} />
              </View>
            </View>
          ))}
        </View>

        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Channel readiness</Text>
          <View style={[styles.connectorCard, { backgroundColor: theme.colors.cardBackground }]} testID="negotiation-setup-connectors">
            {connectors.map(connector => (
              <View key={connector.id} style={styles.connectorRow}>
                <View style={styles.connectorLeft}>
                  {connector.id === 'crm' && <Briefcase size={18} color={theme.colors.primary} />}
                  {connector.id === 'dialer' && <PhoneCall size={18} color={theme.colors.primary} />}
                  {connector.id === 'whatsapp' && <MessageCircle size={18} color={theme.colors.primary} />}
                  {connector.id === 'slack' && <Users size={18} color={theme.colors.primary} />}
                  <View>
                    <Text style={[styles.connectorLabel, { color: theme.colors.text }]}>{connector.label}</Text>
                    <Text style={[styles.connectorDetail, { color: theme.colors.secondaryText }]}>{connector.detail}</Text>
                  </View>
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
        </View>

        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Approval matrix</Text>
          {approvalLanes.map(lane => (
            <View key={lane.id} style={[styles.approvalCard, { backgroundColor: theme.colors.cardBackground }]} testID={`negotiation-setup-approval-${lane.id}`}>
              <View style={styles.approvalHeader}>
                <Layers size={18} color={theme.colors.primary} />
                <Text style={[styles.approvalTitle, { color: theme.colors.text }]}>{lane.title}</Text>
              </View>
              <Text style={[styles.approvalText, { color: theme.colors.secondaryText }]}>{lane.threshold}</Text>
              <Text style={[styles.approvalMeta, { color: theme.colors.secondaryText }]}>Responders: {lane.responders}</Text>
              <Text style={[styles.approvalMeta, { color: theme.colors.secondaryText }]}>SLA: {lane.sla}</Text>
            </View>
          ))}
        </View>

        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Observability</Text>
          <View style={styles.observabilityGrid}>
            {observabilityMetrics.map(metric => (
              <View key={metric.id} style={[styles.observabilityCard, { backgroundColor: theme.colors.cardBackground }]}>
                <Text style={[styles.observabilityLabel, { color: theme.colors.secondaryText }]}>{metric.label}</Text>
                <Text style={[styles.observabilityValue, { color: theme.colors.text }]}>{metric.value}</Text>
                <Text style={[styles.observabilitySubtext, { color: theme.colors.secondaryText }]}>{metric.subtext}</Text>
              </View>
            ))}
          </View>
        </View>

        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Global coverage</Text>
          <View style={[styles.globeCard, { backgroundColor: theme.colors.cardBackground }]} testID="negotiation-setup-coverage">
            <View style={styles.globeRow}>
              <Globe size={18} color={theme.colors.primary} />
              <Text style={[styles.globeText, { color: theme.colors.text }]}>Follow-the-sun routing across US, EU, APAC</Text>
            </View>
            <View style={styles.globeRow}>
              <Link2 size={18} color={theme.colors.secondaryText} />
              <Text style={[styles.globeText, { color: theme.colors.secondaryText }]}>PSTN + WhatsApp encrypted with mTLS</Text>
            </View>
            <View style={styles.globeRow}>
              <Activity size={18} color={theme.colors.warning} />
              <Text style={[styles.globeText, { color: theme.colors.secondaryText }]}>Live sentiment + anomaly alerts to #deal-ops</Text>
            </View>
          </View>
        </View>

        <View style={[styles.infoCard, { backgroundColor: theme.colors.cardBackground }]}>
          <Timer size={22} color={theme.colors.primary} />
          <View style={styles.infoContent}>
            <Text style={[styles.infoTitle, { color: theme.colors.text }]}>Finalize legal intelligence</Text>
            <Text style={[styles.infoSubtitle, { color: theme.colors.secondaryText }]}>Upload clause embeddings + fallback terms to unlock tier-3 automation.</Text>
          </View>
        </View>
      </ScrollView>
    </View>
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
    fontSize: 28,
    fontWeight: '700',
    marginBottom: 6,
  },
  subtitle: {
    fontSize: 14,
    lineHeight: 20,
  },
  metricCard: {
    marginHorizontal: 20,
    borderRadius: 20,
    padding: 18,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  metricLeft: {
    gap: 4,
  },
  metricLabel: {
    fontSize: 13,
    textTransform: 'uppercase',
  },
  metricValue: {
    fontSize: 32,
    fontWeight: '700',
  },
  metricHint: {
    fontSize: 13,
  },
  metricRight: {
    alignItems: 'flex-end',
    gap: 8,
  },
  metricChip: {
    borderWidth: 1,
    borderRadius: 12,
    paddingHorizontal: 10,
    paddingVertical: 4,
    fontSize: 12,
    fontWeight: '600',
  },
  toggleRow: {
    flexDirection: 'row',
    gap: 12,
    paddingHorizontal: 20,
    marginBottom: 16,
  },
  toggleCard: {
    flex: 1,
    borderRadius: 18,
    padding: 16,
  },
  toggleContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: 12,
  },
  toggleTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  toggleSubtitle: {
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
  blueprintRow: {
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  blueprintLeft: {
    flexDirection: 'row',
    gap: 12,
    flex: 1,
  },
  statusIcon: {
    width: 40,
    height: 40,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
  },
  blueprintTitle: {
    fontSize: 15,
    fontWeight: '600',
    marginBottom: 4,
  },
  blueprintDescription: {
    fontSize: 13,
  },
  blueprintRight: {
    alignItems: 'flex-end',
  },
  ownerLabel: {
    fontSize: 12,
    marginBottom: 4,
  },
  connectorCard: {
    borderRadius: 18,
    padding: 16,
  },
  connectorRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderColor: 'rgba(0,0,0,0.06)',
  },
  connectorLeft: {
    flexDirection: 'row',
    gap: 12,
    alignItems: 'center',
  },
  connectorLabel: {
    fontSize: 15,
    fontWeight: '600',
  },
  connectorDetail: {
    fontSize: 13,
  },
  approvalCard: {
    borderRadius: 18,
    padding: 16,
    marginBottom: 12,
  },
  approvalHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 8,
  },
  approvalTitle: {
    fontSize: 16,
    fontWeight: '600',
  },
  approvalText: {
    fontSize: 13,
    marginBottom: 6,
  },
  approvalMeta: {
    fontSize: 12,
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
  },
  observabilityLabel: {
    fontSize: 12,
    textTransform: 'uppercase',
  },
  observabilityValue: {
    fontSize: 22,
    fontWeight: '700',
    marginVertical: 4,
  },
  observabilitySubtext: {
    fontSize: 12,
  },
  globeCard: {
    borderRadius: 20,
    padding: 18,
  },
  globeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginBottom: 10,
  },
  globeText: {
    fontSize: 14,
  },
  infoCard: {
    marginHorizontal: 20,
    borderRadius: 18,
    padding: 18,
    flexDirection: 'row',
    gap: 12,
    alignItems: 'center',
    marginBottom: 32,
  },
  infoContent: {
    flex: 1,
  },
  infoTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  infoSubtitle: {
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
