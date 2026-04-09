import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Switch,
  Alert,
} from 'react-native';
import { useRouter } from 'expo-router';
import {
  ChevronLeft,
  Mic,
  Volume2,
  VolumeX,
  MessageSquare,
  Phone,
  Headphones,
  Settings,
  Play,
  Pause,
  StopCircle,
  Languages,
  User,
  Bot,
  Sparkles,
} from 'lucide-react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Animated, { FadeInUp } from 'react-native-reanimated';
import { useColorScheme } from '@/hooks/useColorScheme';
import { Colors } from '@/constants/Colors';
import { allAgents, getAgentsWithVoiceEnabled } from '@/constants/aiAgentHierarchy';

export default function VoiceCenterScreen() {
  const router = useRouter();
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];
  const [isRecording, setIsRecording] = useState(false);
  const [selectedAgent, setSelectedAgent] = useState<string | null>(null);
  const [conversation, setConversation] = useState<{role: string; text: string; agent?: string}[]>([
    { role: 'system', text: 'Welcome to Voice Command Center. Select an AI Agent to start a voice conversation.' },
  ]);

  const voiceEnabledAgents = getAgentsWithVoiceEnabled();
  const selectedAgentData = allAgents.find(a => a.id === selectedAgent);

  const voiceSettings = {
    inputVolume: 80,
    outputVolume: 75,
    noiseCancellation: true,
    autoMute: true,
    voiceActivity: true,
    speechRate: 1.0,
    language: 'english',
  };

  const simulateVoiceResponse = () => {
    if (!selectedAgentData) return;
    setIsRecording(true);
    setTimeout(() => {
      setIsRecording(false);
      const responses = [
        `Hello! I'm ${selectedAgentData.name}. How can I assist you today?`,
        'I understand. Let me process that for you.',
        'Based on my analysis, here are my recommendations.',
        'Would you like me to take action on this?',
      ];
      const randomResponse = responses[Math.floor(Math.random() * responses.length)];
      setConversation(prev => [...prev, 
        { role: 'user', text: 'Voice input detected...', agent: selectedAgentData.name },
        { role: 'agent', text: randomResponse, agent: selectedAgentData.name }
      ]);
    }, 2000);
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      <View style={[styles.header, { backgroundColor: colors.card, borderBottomColor: colors.border }]}>
        <View style={styles.headerTop}>
          <TouchableOpacity onPress={() => router.back()}>
            <ChevronLeft size={24} color={colors.text} />
          </TouchableOpacity>
          <View style={styles.headerTitle}>
            <Mic size={22} color={colors.primary} />
            <Text style={[styles.titleText, { color: colors.text }]}>Voice Center</Text>
          </View>
          <TouchableOpacity onPress={() => router.push('/ai-agent/settings')}>
            <Settings size={22} color={colors.primary} />
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Active Agent */}
        {selectedAgentData ? (
          <Animated.View entering={FadeInUp} style={[styles.activeAgent, { backgroundColor: selectedAgentData.color + '15', borderColor: selectedAgentData.color }]}>
            <View style={[styles.agentIcon, { backgroundColor: selectedAgentData.color + '20' }]}>
              <selectedAgentData.icon size={32} color={selectedAgentData.color} />
            </View>
            <View style={styles.agentInfo}>
              <Text style={[styles.agentName, { color: colors.text }]}>{selectedAgentData.name}</Text>
              <Text style={[styles.agentStatus, { color: selectedAgentData.color }]}>● Voice Ready</Text>
            </View>
            <TouchableOpacity style={[styles.callButton, { backgroundColor: isRecording ? '#EF4444' : selectedAgentData.color }]} onPress={simulateVoiceResponse}>
              {isRecording ? <StopCircle size={24} color="#fff" /> : <Phone size={24} color="#fff" />}
            </TouchableOpacity>
          </Animated.View>
        ) : (
          <View style={[styles.noAgent, { backgroundColor: colors.card, borderColor: colors.border }]}>
            <Headphones size={48} color={colors.text + '20'} />
            <Text style={[styles.noAgentText, { color: colors.text }]}>Select an Agent</Text>
            <Text style={[styles.noAgentSubtext, { color: colors.text + '60' }]}>Choose from {voiceEnabledAgents.length} voice-enabled agents</Text>
          </View>
        )}

        {/* Conversation */}
        {conversation.length > 0 && (
          <View style={styles.conversationContainer}>
            <Text style={[styles.sectionLabel, { color: colors.text + '60' }]}>CONVERSATION</Text>
            <View style={[styles.conversationCard, { backgroundColor: colors.card, borderColor: colors.border }]}>
              {conversation.map((msg, idx) => (
                <View key={idx} style={[styles.message, msg.role === 'agent' && styles.agentMessage]}>
                  <View style={[styles.messageBubble, { 
                    backgroundColor: msg.role === 'system' ? colors.border + '30' : 
                                    msg.role === 'agent' ? colors.primary + '15' : colors.border + '50'
                  }]}>
                    {msg.role === 'agent' && (
                      <View style={styles.messageHeader}>
                        <Bot size={12} color={colors.primary} />
                        <Text style={[styles.messageAgent, { color: colors.primary }]}>{msg.agent}</Text>
                      </View>
                    )}
                    <Text style={[styles.messageText, { color: colors.text }]}>{msg.text}</Text>
                  </View>
                </View>
              ))}
            </View>
          </View>
        )}

        {/* Quick Voice Actions */}
        <Text style={[styles.sectionLabel, { color: colors.text + '60' }]}>QUICK COMMANDS</Text>
        <View style={styles.quickActions}>
          {['Status Report', 'Process Task', 'Schedule Meeting', 'Send Summary'].map((action, idx) => (
            <TouchableOpacity 
              key={action} 
              style={[styles.quickButton, { backgroundColor: colors.card, borderColor: colors.border }]}
              onPress={() => selectedAgent && simulateVoiceResponse()}
            >
              <Sparkles size={16} color={colors.primary} />
              <Text style={[styles.quickText, { color: colors.text }]}>{action}</Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Agent Selector */}
        <Text style={[styles.sectionLabel, { color: colors.text + '60' }]}>VOICE-ENABLED AGENTS</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.agentScroll}>
          {voiceEnabledAgents.map(agent => (
            <TouchableOpacity
              key={agent.id}
              style={[
                styles.agentChip,
                { backgroundColor: selectedAgent === agent.id ? agent.color + '30' : colors.card, borderColor: selectedAgent === agent.id ? agent.color : colors.border }
              ]}
              onPress={() => setSelectedAgent(selectedAgent === agent.id ? null : agent.id)}
            >
              <agent.icon size={20} color={agent.color} />
              <Text style={[styles.agentChipText, { color: colors.text }]} numberOfLines={1}>{agent.name}</Text>
              <View style={[styles.voiceIndicator, { backgroundColor: '#10B981' }]}>
                <Volume2 size={10} color="#fff" />
              </View>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* Voice Settings */}
        <Text style={[styles.sectionLabel, { color: colors.text + '60' }]}>VOICE SETTINGS</Text>
        <View style={[styles.settingsCard, { backgroundColor: colors.card, borderColor: colors.border }]}>
          <View style={styles.settingRow}>
            <Volume2 size={20} color={colors.text + '60'} />
            <Text style={[styles.settingLabel, { color: colors.text }]}>Input Volume</Text>
            <Text style={[styles.settingValue, { color: colors.primary }]}>{voiceSettings.inputVolume}%</Text>
          </View>
          <View style={[styles.sliderTrack, { backgroundColor: colors.border }]}>
            <View style={[styles.sliderFill, { backgroundColor: colors.primary, width: `${voiceSettings.inputVolume}%` }]} />
          </View>
          
          <View style={[styles.settingRow, { marginTop: 16 }]}>
            <Volume2 size={20} color={colors.text + '60'} />
            <Text style={[styles.settingLabel, { color: colors.text }]}>Output Volume</Text>
            <Text style={[styles.settingValue, { color: colors.primary }]}>{voiceSettings.outputVolume}%</Text>
          </View>
          <View style={[styles.sliderTrack, { backgroundColor: colors.border }]}>
            <View style={[styles.sliderFill, { backgroundColor: colors.primary, width: `${voiceSettings.outputVolume}%` }]} />
          </View>

          <View style={styles.toggleRow}>
            <View style={styles.toggleInfo}>
              <Mic size={18} color={colors.text + '60'} />
              <Text style={[styles.toggleLabel, { color: colors.text }]}>Noise Cancellation</Text>
            </View>
            <Switch 
              value={voiceSettings.noiseCancellation} 
              trackColor={{ false: '#767577', true: colors.primary + '80' }}
              thumbColor={voiceSettings.noiseCancellation ? colors.primary : '#f4f3f4'}
            />
          </View>

          <View style={styles.toggleRow}>
            <View style={styles.toggleInfo}>
              <Languages size={18} color={colors.text + '60'} />
              <Text style={[styles.toggleLabel, { color: colors.text }]}>Auto Language Detect</Text>
            </View>
            <Switch 
              value={true} 
              trackColor={{ false: '#767577', true: colors.primary + '80' }}
              thumbColor={colors.primary}
            />
          </View>
        </View>

        {/* Voice Stats */}
        <View style={[styles.statsCard, { backgroundColor: colors.card, borderColor: colors.border }]}>
          <View style={styles.statItem}>
            <Text style={[styles.statValue, { color: colors.primary }]}>{voiceEnabledAgents.length}</Text>
            <Text style={[styles.statLabel, { color: colors.text + '60' }]}>Voice Agents</Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.statItem}>
            <Text style={[styles.statValue, { color: '#10B981' }]}>12</Text>
            <Text style={[styles.statLabel, { color: colors.text + '60' }]}>Languages</Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.statItem}>
            <Text style={[styles.statValue, { color: '#8B5CF6' }]}>45ms</Text>
            <Text style={[styles.statLabel, { color: colors.text + '60' }]}>Latency</Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  header: { borderBottomWidth: 1 },
  headerTop: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', padding: 16 },
  headerTitle: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  titleText: { fontSize: 18, fontWeight: '600' },
  content: { padding: 16 },
  activeAgent: { flexDirection: 'row', alignItems: 'center', padding: 16, borderRadius: 16, borderWidth: 2, marginBottom: 16 },
  agentIcon: { width: 56, height: 56, borderRadius: 14, justifyContent: 'center', alignItems: 'center' },
  agentInfo: { flex: 1, marginLeft: 14 },
  agentName: { fontSize: 17, fontWeight: '600' },
  agentStatus: { fontSize: 13, marginTop: 2 },
  callButton: { width: 50, height: 50, borderRadius: 25, justifyContent: 'center', alignItems: 'center' },
  noAgent: { alignItems: 'center', padding: 40, borderRadius: 16, borderWidth: 1, marginBottom: 16 },
  noAgentText: { fontSize: 18, fontWeight: '600', marginTop: 12 },
  noAgentSubtext: { fontSize: 14, marginTop: 4 },
  conversationContainer: { marginBottom: 16 },
  sectionLabel: { fontSize: 12, fontWeight: '700', letterSpacing: 0.5, marginBottom: 10 },
  conversationCard: { borderRadius: 16, borderWidth: 1, padding: 16 },
  message: { marginBottom: 12 },
  agentMessage: { alignItems: 'flex-end' },
  messageBubble: { padding: 12, borderRadius: 12, maxWidth: '85%' },
  messageHeader: { flexDirection: 'row', alignItems: 'center', gap: 4, marginBottom: 4 },
  messageAgent: { fontSize: 11, fontWeight: '600' },
  messageText: { fontSize: 14, lineHeight: 20 },
  quickActions: { flexDirection: 'row', flexWrap: 'wrap', gap: 8, marginBottom: 16 },
  quickButton: { flexDirection: 'row', alignItems: 'center', gap: 6, paddingHorizontal: 14, paddingVertical: 10, borderRadius: 10, borderWidth: 1 },
  quickText: { fontSize: 13, fontWeight: '500' },
  agentScroll: { marginBottom: 16 },
  agentChip: { flexDirection: 'row', alignItems: 'center', gap: 8, padding: 12, borderRadius: 12, borderWidth: 1, marginRight: 10, minWidth: 140 },
  agentChipText: { flex: 1, fontSize: 13, fontWeight: '500' },
  voiceIndicator: { width: 20, height: 20, borderRadius: 10, justifyContent: 'center', alignItems: 'center' },
  settingsCard: { borderRadius: 16, borderWidth: 1, padding: 16, marginBottom: 16 },
  settingRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 8 },
  settingLabel: { flex: 1, marginLeft: 10, fontSize: 15 },
  settingValue: { fontSize: 14, fontWeight: '600' },
  sliderTrack: { height: 4, borderRadius: 2 },
  sliderFill: { height: 4, borderRadius: 2 },
  toggleRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginTop: 14, paddingTop: 14, borderTopWidth: 1, borderTopColor: '#00000008' },
  toggleInfo: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  toggleLabel: { fontSize: 15 },
  statsCard: { flexDirection: 'row', borderRadius: 16, borderWidth: 1, padding: 16 },
  statItem: { flex: 1, alignItems: 'center' },
  statValue: { fontSize: 20, fontWeight: '700' },
  statLabel: { fontSize: 12, marginTop: 2 },
  statDivider: { width: 1, backgroundColor: '#00000010', marginHorizontal: 10 },
});
