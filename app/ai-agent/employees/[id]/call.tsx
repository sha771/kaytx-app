import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Animated,
} from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import {
  ChevronLeft,
  Mic,
  MicOff,
  Volume2,
  VolumeX,
  PhoneOff,
  EllipsisVertical,
  MessageSquare,
  Bot,
  Signal,
  Clock,
  Sparkles,
} from 'lucide-react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';


interface CallState {
  status: 'connecting' | 'active' | 'ended' | 'hold';
  duration: number;
  isMuted: boolean;
  isSpeaker: boolean;
  transcription: string[];
  sentiment: 'positive' | 'neutral' | 'negative';
}

export default function VoiceCallScreen() {
  const router = useRouter();
  const { id } = useLocalSearchParams();
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];

  const [callState, setCallState] = useState<CallState>({
    status: 'connecting',
    duration: 0,
    isMuted: false,
    isSpeaker: false,
    transcription: [],
    sentiment: 'neutral',
  });

  const [waveformAnim] = useState(new Animated.Value(0));
  const [pulseAnim] = useState(new Animated.Value(1));

  useEffect(() => {
    // Simulate call connecting
    const connectTimer = setTimeout(() => {
      setCallState(prev => ({ ...prev, status: 'active' }));
    }, 2000);

    return () => clearTimeout(connectTimer);
  }, []);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (callState.status === 'active') {
      interval = setInterval(() => {
        setCallState(prev => ({ ...prev, duration: prev.duration + 1 }));
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [callState.status]);

  useEffect(() => {
    // Waveform animation
    Animated.loop(
      Animated.sequence([
        Animated.timing(waveformAnim, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: true,
        }),
        Animated.timing(waveformAnim, {
          toValue: 0,
          duration: 1000,
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, [waveformAnim]);

  useEffect(() => {
    // Pulse animation for connecting state
    if (callState.status === 'connecting') {
      Animated.loop(
        Animated.sequence([
          Animated.timing(pulseAnim, {
            toValue: 1.2,
            duration: 1000,
            useNativeDriver: true,
          }),
          Animated.timing(pulseAnim, {
            toValue: 1,
            duration: 1000,
            useNativeDriver: true,
          }),
        ])
      ).start();
    }
  }, [callState.status, pulseAnim]);

  const formatDuration = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;


  const toggleMute = () => {
    setCallState(prev => ({ ...prev, isMuted: !prev.isMuted }));
  };

  const toggleSpeaker = () => {
    setCallState(prev => ({ ...prev, isSpeaker: !prev.isSpeaker }));
  };

  const endCall = () => {
    setCallState(prev => ({ ...prev, status: 'ended' }));
    setTimeout(() => {
      router.back();
    }, 1000);
  };

  const renderWaveform = () => {
    return (
      <View style={styles.waveformContainer}>
        {[...Array(5)].map((_, i) => (
          <Animated.View
            key={i}
            style={[
              styles.waveformBar,
              {
                backgroundColor: colors.tint,
                transform: [
                  {
                    scaleY: waveformAnim.interpolate({
                      inputRange: [0, 1],
                      outputRange: [0.3 + i * 0.1, 1 + i * 0.15],
                    }),
                  },
                ],
              },
            ]}
          />
        ))}
      </View>
    );
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <ChevronLeft size={28} color={colors.text} />
        </TouchableOpacity>
        <View style={styles.headerCenter}>
          <Text style={[styles.headerTitle, { color: colors.text }]}>
            Voice Call
          </Text>
          <View style={styles.signalRow}>
            <Signal size={14} color="#10B981" />
            <Text style={[styles.signalText, { color: '#10B981' }]}>Excellent</Text>
          </View>
        </View>
        <TouchableOpacity>
          <EllipsisVertical size={24} color={colors.text} />
        </TouchableOpacity>
      </View>

      {/* Agent Avatar Section */}
      <View style={styles.avatarSection}>
        <Animated.View
          style={[
            styles.avatarRing,
            {
              transform: [{ scale: pulseAnim }],
              opacity: pulseAnim.interpolate({
                inputRange: [1, 1.2],
                outputRange: [0.5, 0],
              }),
            },
          ]}
        >
          <View style={[styles.avatarRingInner, { backgroundColor: colors.tint }]} />
        </Animated.View>

        <View style={[styles.avatarContainer, { backgroundColor: colors.tint }]}>
          <Bot size={64} color="white" />
        </View>

        <View style={styles.agentInfo}>
          <Text style={[styles.agentName, { color: colors.text }]}>
            Accounting & Finance AI
          </Text>
          <Text style={[styles.agentRole, { color: colors.icon }]}>
            Chief Financial Officer AI
          </Text>
        </View>

        {callState.status === 'connecting' && (
          <Text style={[styles.statusText, { color: colors.icon }]}>
            Connecting...
          </Text>
        )}

        {callState.status === 'active' && (
          <View style={styles.activeCallInfo}>
            <View style={styles.durationBadge}>
              <Clock size={14} color={colors.tint} />
              <Text style={[styles.durationText, { color: colors.tint }]}>
                {formatDuration(callState.duration)}
              </Text>
            </View>
            {renderWaveform()}
          </View>
        )}

        {callState.status === 'ended' && (
          <Text style={[styles.statusText, { color: '#EF4444' }]}>
            Call Ended
          </Text>
        )}
      </View>

      {/* Live Transcription */}
      {callState.status === 'active' && (
        <View style={[styles.transcriptionContainer, { backgroundColor: colors.card }]}>
          <View style={styles.transcriptionHeader}>
            <Sparkles size={16} color={colors.tint} />
            <Text style={[styles.transcriptionTitle, { color: colors.text }]}>
              Live Transcription
            </Text>
            <View style={[styles.sentimentBadge, { backgroundColor: '#10B981' + '20' }]}>
              <Text style={[styles.sentimentText, { color: '#10B981' }]}>
                {callState.sentiment}
              </Text>
            </View>
          </View>
          <View style={styles.transcriptionContent}>
            <Text style={[styles.transcriptionText, { color: colors.icon }]}>
              {"\""}Hello! I{"'"}m your Accounting & Finance AI. How can I help you with your financial inquiries today?{"\""}
            </Text>
          </View>
        </View>
      )}

      {/* Call Controls */}
      <View style={styles.controlsContainer}>
        <View style={styles.controlsRow}>
          <TouchableOpacity
            style={[
              styles.controlButton,
              { backgroundColor: callState.isMuted ? '#EF4444' + '20' : colors.card },
            ]}
            onPress={toggleMute}
          >
            {callState.isMuted ? (
              <MicOff size={24} color="#EF4444" />
            ) : (
              <Mic size={24} color={colors.tint} />
            )}
            <Text
              style={[
                styles.controlLabel,
                { color: callState.isMuted ? '#EF4444' : colors.icon },
              ]}
            >
              {callState.isMuted ? 'Muted' : 'Mute'}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.controlButton,
              { backgroundColor: callState.isSpeaker ? colors.tint + '20' : colors.card },
            ]}
            onPress={toggleSpeaker}
          >
            {callState.isSpeaker ? (
              <Volume2 size={24} color={colors.tint} />
            ) : (
              <VolumeX size={24} color={colors.icon} />
            )}
            <Text
              style={[
                styles.controlLabel,
                { color: callState.isSpeaker ? colors.tint : colors.icon },
              ]}
            >
              {callState.isSpeaker ? 'Speaker' : 'Earpiece'}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.controlButton, { backgroundColor: colors.card }]}
            onPress={() => router.push(`/ai-agent/employees/${id}/chat`)}
          >
            <MessageSquare size={24} color={colors.tint} />
            <Text style={[styles.controlLabel, { color: colors.icon }]}>
              Chat
            </Text>
          </TouchableOpacity>
        </View>

        {/* End Call Button */}
        <TouchableOpacity
          style={styles.endCallButton}
          onPress={endCall}
        >
          <PhoneOff size={32} color="white" />
        </TouchableOpacity>
      </View>

      {/* Quick Actions */}
      {callState.status === 'active' && (
        <View style={styles.quickActionsContainer}>
          <Text style={[styles.quickActionsTitle, { color: colors.icon }]}>
            Quick Actions
          </Text>
          <View style={styles.quickActionsRow}>
            {['Generate Report', 'Check Balance', 'Review Expenses', 'Help'].map((action, index) => (
              <TouchableOpacity
                key={index}
                style={[styles.quickActionChip, { backgroundColor: colors.tint + '15' }]}
              >
                <Text style={[styles.quickActionText, { color: colors.tint }]}>
                  {action}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingTop: 8,
    paddingBottom: 16,
  },
  headerCenter: {
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 17,
    fontWeight: '600',
  },
  signalRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginTop: 2,
  },
  signalText: {
    fontSize: 12,
    fontWeight: '500',
  },
  avatarSection: {
    alignItems: 'center',
    paddingVertical: 32,
  },
  avatarRing: {
    position: 'absolute',
    width: 200,
    height: 200,
    borderRadius: 100,
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarRingInner: {
    width: 200,
    height: 200,
    borderRadius: 100,
  },
  avatarContainer: {
    width: 140,
    height: 140,
    borderRadius: 70,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  agentInfo: {
    alignItems: 'center',
    marginTop: 24,
  },
  agentName: {
    fontSize: 24,
    fontWeight: '700',
  },
  agentRole: {
    fontSize: 15,
    marginTop: 4,
  },
  statusText: {
    fontSize: 16,
    marginTop: 12,
    fontWeight: '500',
  },
  activeCallInfo: {
    alignItems: 'center',
    marginTop: 16,
  },
  durationBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#00000010',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    gap: 6,
  },
  durationText: {
    fontSize: 14,
    fontWeight: '600',
  },
  waveformContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 4,
    marginTop: 16,
    height: 40,
  },
  waveformBar: {
    width: 6,
    height: 30,
    borderRadius: 3,
    opacity: 0.8,
  },
  transcriptionContainer: {
    marginHorizontal: 16,
    padding: 16,
    borderRadius: 16,
    marginBottom: 24,
  },
  transcriptionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 12,
  },
  transcriptionTitle: {
    fontSize: 14,
    fontWeight: '600',
    flex: 1,
  },
  sentimentBadge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  sentimentText: {
    fontSize: 11,
    fontWeight: '600',
    textTransform: 'capitalize',
  },
  transcriptionContent: {
    paddingLeft: 24,
  },
  transcriptionText: {
    fontSize: 14,
    lineHeight: 20,
    fontStyle: 'italic',
  },
  controlsContainer: {
    alignItems: 'center',
    paddingHorizontal: 32,
    marginBottom: 24,
  },
  controlsRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 24,
    marginBottom: 32,
  },
  controlButton: {
    width: 64,
    height: 64,
    borderRadius: 32,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  controlLabel: {
    fontSize: 11,
    marginTop: 6,
    fontWeight: '500',
  },
  endCallButton: {
    width: 72,
    height: 72,
    borderRadius: 36,
    backgroundColor: '#EF4444',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#EF4444',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 8,
    elevation: 6,
  },
  quickActionsContainer: {
    paddingHorizontal: 16,
  },
  quickActionsTitle: {
    fontSize: 12,
    fontWeight: '600',
    marginBottom: 12,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  quickActionsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  quickActionChip: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 20,
  },
  quickActionText: {
    fontSize: 13,
    fontWeight: '600',
  },
});
