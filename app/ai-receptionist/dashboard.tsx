 
import React, { useState, useCallback, useEffect, useMemo } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Dimensions,
  Switch,
} from 'react-native';
import {
  Phone,
  PhoneIncoming,
  PhoneMissed,
  Clock,
  PhoneCall,
  PhoneOff,
  TrendingUp,
  TrendingDown,
  Users,
  Star,
  Calendar,
  Activity,
  ChartBar,
  CircleCheck,
  CircleAlert,
  DollarSign,
  ArrowLeft,
  Plus,
} from 'lucide-react-native';
import { useTheme } from '@/providers/ThemeProvider';
import { Stack, router } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { AIAssistantCapabilityMatrix } from '@/components/AIAssistantCapabilityMatrix';
import { aiReceptionistCapabilities } from '@/constants/aiAssistants';
import { ErrorBoundary } from '@/components/ErrorBoundary';
import { AIAssistantPlaybook } from '@/components/AIAssistantPlaybook';
import { aiReceptionistPlaybook } from '@/constants/aiAssistantPlaybooks';
import { useRealtimeCalls } from '@/utils/realtimeCallingService';
import { trpc } from '@/lib/trpc';

const { width } = Dimensions.get('window');

export default function AIReceptionistDashboard() {
  const { theme } = useTheme();
  const insets = useSafeAreaInsets();
  const [selectedPeriod, setSelectedPeriod] = useState<'today' | 'week' | 'month'>('today');
  const { activeCalls, endCall, callToDefault, defaultPhoneNumber } = useRealtimeCalls();
  const [showCallButton] = useState(true);

  // tRPC data fetching
  const { data: callAnalytics, isLoading: analyticsLoading, refetch: refetchAnalytics } = trpc.calling.getAnalytics.useQuery({ period: selectedPeriod });
  const { data: phoneNumbers, isLoading: phonesLoading, refetch: refetchPhones } = trpc.calling.getPhoneNumbers.useQuery();
  const { data: callQueue, isLoading: queueLoading, refetch: refetchQueue } = trpc.calling.getQueue.useQuery();
  const { data: callerInsights, isLoading: insightsLoading, refetch: refetchInsights } = trpc.calling.getInsights.useQuery();

  const [callRouting, setCallRouting] = useState({
    autoAnswer: false,
    delaySeconds: 8,
    ivrEnabled: true,
    voiceMenuEnabled: true,
    recordingEnabled: true,
    sentimentAnalysis: true,
    callTranscription: true,
    autoFollowUp: true,
  });

  const handlePeriodChange = useCallback((period: 'today' | 'week' | 'month') => {
    console.log('[AIReceptionistDashboard] period changed', period);
    setSelectedPeriod(period);
  }, []);

  const handleQuickActionPress = useCallback((route: string) => {
    console.log('[AIReceptionistDashboard] quick action pressed', route);
    router.push(route as never);
  }, []);

  const handleCallPress = useCallback(() => {
    console.log(`[AIReceptionist] Initiating call to ${defaultPhoneNumber}`);
    callToDefault('Customer', 'voice');
  }, [callToDefault, defaultPhoneNumber]);

  const handleEndCall = useCallback(() => {
    if (activeCalls.length > 0) {
      endCall(activeCalls[0].id);
    }
  }, [activeCalls, endCall]);

  useEffect(() => {
    console.log('[AIReceptionist] Real-time calling system active');
    console.log(`[AIReceptionist] Default number: ${defaultPhoneNumber}`);
  }, [defaultPhoneNumber]);

  const stats = useMemo(() => {
    if (callAnalytics) {
      return [
        {
          title: 'Autonomous Calls',
          value: callAnalytics.totalCalls.toLocaleString(),
          change: '+23%',
          trending: 'up',
          icon: Phone,
          color: '#007AFF',
          bgColor: '#007AFF15',
        },
        {
          title: 'Human Handoffs',
          value: Math.round(callAnalytics.totalCalls * 0.05).toString(),
          change: '-12%',
          trending: 'down',
          icon: Users,
          color: '#34C759',
          bgColor: '#34C75915',
        },
        {
          title: 'Revenue Generated',
          value: `$${(callAnalytics.totalCalls * 23.5 / 1000).toFixed(1)}k`,
          change: '+18%',
          trending: 'up',
          icon: DollarSign,
          color: '#FF9500',
          bgColor: '#FF950015',
        },
        {
          title: 'Voice Health',
          value: `${callAnalytics.successRate}%`,
          change: 'Stable',
          trending: 'up',
          icon: Activity,
          color: '#5856D6',
          bgColor: '#5856D615',
        },
      ];
    }
    return [
      {
        title: 'Autonomous Calls',
        value: '1,847',
        change: '+23%',
        trending: 'up',
        icon: Phone,
        color: '#007AFF',
        bgColor: '#007AFF15',
      },
      {
        title: 'Human Handoffs',
        value: '24',
        change: '-12%',
        trending: 'down',
        icon: Users,
        color: '#34C759',
        bgColor: '#34C75915',
      },
      {
        title: 'Revenue Generated',
        value: '$42.5k',
        change: '+18%',
        trending: 'up',
        icon: DollarSign,
        color: '#FF9500',
        bgColor: '#FF950015',
      },
      {
        title: 'Voice Health',
        value: '99.9%',
        change: 'Stable',
        trending: 'up',
        icon: Activity,
        color: '#5856D6',
        bgColor: '#5856D615',
      },
    ];
  }, [callAnalytics]);

  const realtimeData = useMemo(() => {
    if (callQueue && callQueue.length > 0) {
      return callQueue.map((item: any) => ({
        id: item.id,
        type: 'call',
        status: item.status,
        caller: item.agentName || 'Unknown Caller',
        duration: item.duration || '0:00',
        priority: item.priority || 'medium'
      }));
    }
    return [
      { id: '1', type: 'call', status: 'active', caller: 'John Smith', duration: '2:34', priority: 'high' },
      { id: '2', type: 'booking', status: 'pending', caller: 'Sarah Johnson', time: '3:00 PM', priority: 'medium' },
      { id: '3', type: 'call', status: 'waiting', caller: 'Mike Davis', duration: '0:45', priority: 'low' },
    ];
  }, [callQueue]);

  const quickActions = [
    { id: '1', title: 'View Calls', icon: Phone, route: '/ai-receptionist/call-logs', color: '#007AFF' },
    { id: '2', title: 'Appointments', icon: Calendar, route: '/ai-receptionist/appointments', color: '#34C759' },
    { id: '3', title: 'Contacts', icon: Users, route: '/ai-receptionist/contacts', color: '#FF9500' },
    { id: '4', title: 'Analytics', icon: ChartBar, route: '/ai-receptionist/analytics', color: '#AF52DE' },
  ];

  const aiInsights = [
    {
      type: 'success',
      message: '97% answer rate achieved - Industry-leading performance',
      icon: CircleCheck,
      color: '#34C759',
    },
    {
      type: 'warning',
      message: 'Peak hours: 2-4 PM requires +3 concurrent lines',
      icon: CircleAlert,
      color: '#FF9500',
    },
    {
      type: 'info',
      message: 'Top queries: Pricing (42%), Support (31%), Sales (27%)',
      icon: Activity,
      color: '#007AFF',
    },
    {
      type: 'tip',
      message: 'Avg booking value increased by $247 with AI optimization',
      icon: TrendingUp,
      color: '#AF52DE',
    },
    {
      type: 'alert',
      message: '8 VIP callers in queue - Priority routing active',
      icon: CircleAlert,
      color: '#FF3B30',
    },
  ];

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <Stack.Screen
        options={{
          title: 'AI Receptionist',
          headerStyle: { backgroundColor: theme.colors.background },
          headerTintColor: theme.colors.text,
          headerRight: () => (
            <TouchableOpacity
              style={styles.settingsButton}
              onPress={() => router.push('/ai-receptionist/setup')}
            >
              <Activity size={20} color={theme.colors.primary} />
            </TouchableOpacity>
          ),
        }}
      />

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Premium Receptionist Header */}
        <View style={[styles.premiumHeader, { paddingTop: insets.top + 20, backgroundColor: theme.colors.cardBackground }]}>
          <View style={styles.headerTop}>
            <TouchableOpacity onPress={() => router.back()}>
              <ArrowLeft size={24} color={theme.colors.text} />
            </TouchableOpacity>
            <Text style={[styles.premiumTitle, { color: theme.colors.text }]}>Voice Command</Text>
            <TouchableOpacity style={[styles.plusBtn, { backgroundColor: theme.colors.primary }]} onPress={() => router.push('/ai-receptionist/phone-numbers')}>
              <Plus size={20} color="#fff" />
            </TouchableOpacity>
          </View>
          <View style={styles.headerMetrics}>
            <View style={styles.hMetric}>
              <Text style={[styles.hMetricVal, { color: theme.colors.text }]}>12</Text>
              <Text style={[styles.hMetricLab, { color: theme.colors.secondaryText }]}>Active Nodes</Text>
            </View>
            <View style={styles.hMetricDivider} />
            <View style={styles.hMetric}>
              <Text style={[styles.hMetricVal, { color: '#34C759' }]}>99.2%</Text>
              <Text style={[styles.hMetricLab, { color: theme.colors.secondaryText }]}>Voice Success</Text>
            </View>
            <View style={styles.hMetricDivider} />
            <View style={styles.hMetric}>
              <Text style={[styles.hMetricVal, { color: theme.colors.primary }]}>8ms</Text>
              <Text style={[styles.hMetricLab, { color: theme.colors.secondaryText }]}>LLM Latency</Text>
            </View>
          </View>
        </View>

        <View style={styles.content}>

          {(['today', 'week', 'month'] as const).map(period => (
            <TouchableOpacity
              key={period}
              style={[
                styles.periodButton,
                selectedPeriod === period && { backgroundColor: theme.colors.primary },
              ]}
              onPress={() => handlePeriodChange(period)}
              testID={`period-Filter-${period}`}
            >
              <Text
                style={[
                  styles.periodText,
                  { color: selectedPeriod === period ? 'white' : theme.colors.secondaryText },
                ]}
              >
                {period.charAt(0).toUpperCase() + period.slice(1)}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        <View style={styles.statsGrid}>
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            const TrendIcon = stat.trending === 'up' ? TrendingUp : TrendingDown;
            return (
              <View
                key={index}
                style={[styles.statCard, { backgroundColor: theme.colors.cardBackground }]}
              >
                <View style={[styles.statIcon, { backgroundColor: stat.bgColor }]}>
                  <Icon size={22} color={stat.color} strokeWidth={2.5} />
                </View>
                <Text style={[styles.statValue, { color: theme.colors.text }]}>{stat.value}</Text>
                <Text style={[styles.statTitle, { color: theme.colors.secondaryText }]}>
                  {stat.title}
                </Text>
                <View style={styles.statChange}>
                  <TrendIcon
                    size={14}
                    color={stat.trending === 'up' ? '#34C759' : '#FF3B30'}
                  />
                  <Text
                    style={[
                      styles.statChangeText,
                      { color: stat.trending === 'up' ? '#34C759' : '#FF3B30' },
                    ]}
                  >
                    {stat.change}
                  </Text>
                </View>
              </View>
            );
          })}
        </View>

        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Call Routing Settings</Text>
          <View style={[styles.routingCard, { backgroundColor: theme.colors.cardBackground }]}>
            <View style={styles.routingOption}>
              <View style={styles.routingLeft}>
                <Text style={[styles.routingTitle, { color: theme.colors.text }]}>Auto-Answer Calls</Text>
                <Text style={[styles.routingSubtitle, { color: theme.colors.secondaryText }]}>AI picks up immediately</Text>
              </View>
              <Switch
                value={callRouting.autoAnswer}
                onValueChange={(v: boolean) => setCallRouting(prev => ({ ...prev, autoAnswer: v }))}
                trackColor={{ false: '#767577', true: theme.colors.primary }}
                thumbColor={callRouting.autoAnswer ? '#fff' : '#f4f3f4'}
              />
            </View>

            {!callRouting.autoAnswer && (
              <View style={styles.routingOption}>
                <View style={styles.routingLeft}>
                  <Text style={[styles.routingTitle, { color: theme.colors.text }]}>Wait Time: {callRouting.delaySeconds}s</Text>
                  <Text style={[styles.routingSubtitle, { color: theme.colors.secondaryText }]}>Company has {callRouting.delaySeconds}s to answer before AI takes over</Text>
                </View>
              </View>
            )}

            <View style={styles.routingOption}>
              <View style={styles.routingLeft}>
                <Text style={[styles.routingTitle, { color: theme.colors.text }]}>IVR Menu</Text>
                <Text style={[styles.routingSubtitle, { color: theme.colors.secondaryText }]}>Interactive voice response system</Text>
              </View>
              <Switch
                value={callRouting.ivrEnabled}
                onValueChange={(v: boolean) => setCallRouting(prev => ({ ...prev, ivrEnabled: v }))}
                trackColor={{ false: '#767577', true: theme.colors.primary }}
                thumbColor={callRouting.ivrEnabled ? '#fff' : '#f4f3f4'}
              />
            </View>

            <View style={styles.routingOption}>
              <View style={styles.routingLeft}>
                <Text style={[styles.routingTitle, { color: theme.colors.text }]}>Call Recording</Text>
                <Text style={[styles.routingSubtitle, { color: theme.colors.secondaryText }]}>Record all conversations for quality</Text>
              </View>
              <Switch
                value={callRouting.recordingEnabled}
                onValueChange={(v: boolean) => setCallRouting(prev => ({ ...prev, recordingEnabled: v }))}
                trackColor={{ false: '#767577', true: theme.colors.primary }}
                thumbColor={callRouting.recordingEnabled ? '#fff' : '#f4f3f4'}
              />
            </View>

            <View style={styles.routingOption}>
              <View style={styles.routingLeft}>
                <Text style={[styles.routingTitle, { color: theme.colors.text }]}>Sentiment Analysis</Text>
                <Text style={[styles.routingSubtitle, { color: theme.colors.secondaryText }]}>Real-time emotion detection</Text>
              </View>
              <Switch
                value={callRouting.sentimentAnalysis}
                onValueChange={(v: boolean) => setCallRouting(prev => ({ ...prev, sentimentAnalysis: v }))}
                trackColor={{ false: '#767577', true: theme.colors.primary }}
                thumbColor={callRouting.sentimentAnalysis ? '#fff' : '#f4f3f4'}
              />
            </View>

            <View style={styles.routingOption}>
              <View style={styles.routingLeft}>
                <Text style={[styles.routingTitle, { color: theme.colors.text }]}>Auto-Transcription</Text>
                <Text style={[styles.routingSubtitle, { color: theme.colors.secondaryText }]}>Convert speech to searchable text</Text>
              </View>
              <Switch
                value={callRouting.callTranscription}
                onValueChange={(v: boolean) => setCallRouting(prev => ({ ...prev, callTranscription: v }))}
                trackColor={{ false: '#767577', true: theme.colors.primary }}
                thumbColor={callRouting.callTranscription ? '#fff' : '#f4f3f4'}
              />
            </View>

            <View style={styles.routingOption}>
              <View style={styles.routingLeft}>
                <Text style={[styles.routingTitle, { color: theme.colors.text }]}>Auto Follow-Up</Text>
                <Text style={[styles.routingSubtitle, { color: theme.colors.secondaryText }]}>Send summary & next steps via SMS/Email</Text>
              </View>
              <Switch
                value={callRouting.autoFollowUp}
                onValueChange={(v: boolean) => setCallRouting(prev => ({ ...prev, autoFollowUp: v }))}
                trackColor={{ false: '#767577', true: theme.colors.primary }}
                thumbColor={callRouting.autoFollowUp ? '#fff' : '#f4f3f4'}
              />
            </View>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Quick Actions</Text>
          <View style={styles.actionsGrid}>
            {quickActions.map(action => {
              const Icon = action.icon;
              return (
                <TouchableOpacity
                  key={action.id}
                  style={[styles.actionCard, { backgroundColor: theme.colors.cardBackground }]}
                  onPress={() => handleQuickActionPress(action.route)}
                  testID={`receptionist-quick-action-${action.id}`}
                >
                  <View style={[styles.actionIcon, { backgroundColor: `${action.color}20` }]}>
                    <Icon size={24} color={action.color} />
                  </View>
                  <Text style={[styles.actionTitle, { color: theme.colors.text }]}>
                    {action.title}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>
        </View>

        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>AI Insights</Text>
          {aiInsights.map((insight, index) => {
            const Icon = insight.icon;
            return (
              <View
                key={index}
                style={[
                  styles.insightCard,
                  { backgroundColor: theme.colors.cardBackground, borderLeftColor: insight.color },
                ]}
              >
                <Icon size={20} color={insight.color} />
                <Text style={[styles.insightText, { color: theme.colors.text }]}>
                  {insight.message}
                </Text>
              </View>
            );
          })}
        </View>

        <View style={styles.section}>
          <ErrorBoundary fallbackMessage="Unable to load receptionist readiness" testID="receptionist-capability-boundary">
            <AIAssistantCapabilityMatrix
              title="Capability Control Matrix"
              capabilities={aiReceptionistCapabilities}
              testID="receptionist-capability-matrix"
            />
          </ErrorBoundary>
        </View>

        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Real-time Activity</Text>
            <View style={styles.liveIndicator}>
              <View style={styles.liveDot} />
              <Text style={[styles.liveText, { color: theme.colors.secondaryText }]}>Live</Text>
            </View>
          </View>
          {realtimeData.map(item => (
            <View
              key={item.id}
              style={[styles.activityCard, { backgroundColor: theme.colors.cardBackground }]}
            >
              <View style={styles.activityLeft}>
                <View
                  style={[
                    styles.activityStatus,
                    {
                      backgroundColor:
                        item.status === 'active'
                          ? '#34C75920'
                          : item.status === 'pending'
                            ? '#FF950020'
                            : '#007AFF20',
                    },
                  ]}
                >
                  <Phone
                    size={16}
                    color={
                      item.status === 'active'
                        ? '#34C759'
                        : item.status === 'pending'
                          ? '#FF9500'
                          : '#007AFF'
                    }
                  />
                </View>
                <View>
                  <Text style={[styles.activityName, { color: theme.colors.text }]}>
                    {item.caller}
                  </Text>
                  <Text style={[styles.activityMeta, { color: theme.colors.secondaryText }]}>
                    {item.type === 'call' ? `Duration: ${item.duration}` : `Time: ${item.time}`}
                  </Text>
                </View>
              </View>
              <View
                style={[
                  styles.priorityBadge,
                  {
                    backgroundColor:
                      item.priority === 'high'
                        ? '#FF3B3020'
                        : item.priority === 'medium'
                          ? '#FF950020'
                          : '#007AFF20',
                  },
                ]}
              >
                <Text
                  style={[
                    styles.priorityText,
                    {
                      color:
                        item.priority === 'high'
                          ? '#FF3B30'
                          : item.priority === 'medium'
                            ? '#FF9500'
                            : '#007AFF',
                    },
                  ]}
                >
                  {item.priority}
                </Text>
              </View>
            </View>
          ))}
        </View>

        <View style={styles.section}>
          <ErrorBoundary
            fallbackMessage="Unable to load AI Receptionist blueprint"
            testID="receptionist-playbook-boundary"
          >
            <AIAssistantPlaybook
              title="Enterprise Playbook"
              subtitle="Full control over every receptionist workflow, automation, and guardrail"
              stats={aiReceptionistPlaybook.heroStats}
              pages={aiReceptionistPlaybook.pages}
              testID="receptionist-playbook"
            />
          </ErrorBoundary>
        </View>

        {/* Real-time Call Status */}
        {activeCalls.length > 0 && (
          <View style={[styles.callStatusBar, { backgroundColor: '#34C759' }]}>
            <View style={styles.callStatusContent}>
              <PhoneCall size={16} color="white" />
              <Text style={styles.callStatusText}>
                Call Active: {activeCalls[0].customerName} ({Math.floor(activeCalls[0].duration / 60)}:{String(activeCalls[0].duration % 60).padStart(2, '0')})
              </Text>
            </View>
            <TouchableOpacity
              style={styles.endCallButton}
              onPress={handleEndCall}
            >
              <PhoneOff size={16} color="white" />
            </TouchableOpacity>
          </View>
        )}
      </ScrollView>

      {/* Floating Call Button */}
      {showCallButton && activeCalls.length === 0 && (
        <TouchableOpacity
          style={[styles.floatingCallButton, { backgroundColor: theme.colors.primary }]}
          onPress={handleCallPress}
          activeOpacity={0.9}
        >
          <PhoneCall size={28} color="white" strokeWidth={2.5} />
          <Text style={styles.floatingCallText}>Call {defaultPhoneNumber}</Text>
        </TouchableOpacity>
      )}
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
  settingsButton: {
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
  periodSelector: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    marginBottom: 20,
    gap: 8,
  },
  periodButton: {
    flex: 1,
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 10,
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.05)',
  },
  periodText: {
    fontSize: 14,
    fontWeight: '600',
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: 14,
    gap: 12,
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
    marginBottom: 8,
  },
  statChange: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  statChangeText: {
    fontSize: 12,
    fontWeight: '600',
  },
  section: {
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 16,
  },
  actionsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  actionCard: {
    width: (width - 52) / 2,
    padding: 16,
    borderRadius: 16,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  actionIcon: {
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  actionTitle: {
    fontSize: 14,
    fontWeight: '600',
    textAlign: 'center',
  },
  insightCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    borderLeftWidth: 4,
    gap: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  insightText: {
    flex: 1,
    fontSize: 14,
    lineHeight: 20,
  },
  liveIndicator: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  liveDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#FF3B30',
  },
  liveText: {
    fontSize: 12,
    fontWeight: '600',
  },
  activityCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  activityLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    gap: 12,
  },
  activityStatus: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  activityName: {
    fontSize: 15,
    fontWeight: '600',
    marginBottom: 2,
  },
  activityMeta: {
    fontSize: 12,
  },
  priorityBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
  },
  priorityText: {
    fontSize: 11,
    fontWeight: '600',
    textTransform: 'uppercase',
  },
  floatingCallButton: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderRadius: 30,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 12,
    elevation: 8,
    gap: 10,
  },
  floatingCallText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '700',
  },
  callStatusBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 12,
    marginHorizontal: 20,
    marginBottom: 20,
    borderRadius: 12,
  },
  callStatusContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    flex: 1,
  },
  callStatusText: {
    color: 'white',
    fontSize: 14,
    fontWeight: '600',
  },
  endCallButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: 'rgba(255,255,255,0.3)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  routingCard: {
    padding: 16,
    borderRadius: 16,
    gap: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  routingOption: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 4,
  },
  routingLeft: {
    flex: 1,
    marginRight: 12,
  },
  routingTitle: {
    fontSize: 15,
    fontWeight: '600',
    marginBottom: 2,
  },
  routingSubtitle: {
    fontSize: 12,
    lineHeight: 16,
  },
  premiumHeader: {
    paddingHorizontal: 20,
    paddingBottom: 24,
    borderBottomLeftRadius: 32,
    borderBottomRightRadius: 32,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 4,
  },
  headerTop: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  premiumTitle: {
    fontSize: 18,
    fontWeight: '900',
    flex: 1,
    textAlign: 'center',
    textTransform: 'uppercase',
    letterSpacing: 2,
  },
  plusBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerMetrics: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 20,
  },
  hMetric: {
    alignItems: 'center',
  },
  hMetricVal: {
    fontSize: 18,
    fontWeight: '900',
  },
  hMetricLab: {
    fontSize: 8,
    fontWeight: '800',
    textTransform: 'uppercase',
    opacity: 0.6,
  },
  hMetricDivider: {
    width: 1,
    height: 20,
    backgroundColor: 'rgba(150,150,150,0.1)',
  },
});

