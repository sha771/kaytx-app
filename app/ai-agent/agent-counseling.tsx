import React, { useState, useCallback, useMemo } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Modal,
  ActivityIndicator,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { useLocalSearchParams, router } from 'expo-router';
import {
  ArrowLeft,
  Brain,
  Users,
  MessageCircle,
  ChevronRight,
  Clock,
  CircleCheckBig,
  TriangleAlert,
  Send,
  User,
  Crown,
  GitBranch,
  Target,
  Sparkles,
  ChartBar,
  Calendar,
  Shield,
  Zap,
} from 'lucide-react-native';
import { useTheme } from '@/providers/ThemeProvider';
import { useAgentCounseling, CounselingSession } from '@/hooks/useAgentCounseling';
import { getAgentById, getAgentHierarchy, AIAgentDefinition } from '@/constants/aiAgentHierarchy';
import { aiEmployees } from '@/constants/aiEmployees';

interface CounselingType {
  id: string;
  label: string;
  description: string;
  icon: React.ComponentType<any>;
  color: string;
  applicableModes: ('main_to_sub' | 'sub_to_main' | 'peer_to_peer')[];
}

const counselingTypes: CounselingType[] = [
  {
    id: 'performance',
    label: 'Performance Review',
    description: 'Review and improve agent performance',
    icon: ChartBar,
    color: '#007AFF',
    applicableModes: ['main_to_sub', 'peer_to_peer'],
  },
  {
    id: 'development',
    label: 'Development',
    description: 'Skill building and growth planning',
    icon: Target,
    color: '#34C759',
    applicableModes: ['main_to_sub', 'peer_to_peer'],
  },
  {
    id: 'coordination',
    label: 'Coordination',
    description: 'Align efforts and strategies',
    icon: GitBranch,
    color: '#5856D6',
    applicableModes: ['main_to_sub', 'sub_to_main', 'peer_to_peer'],
  },
  {
    id: 'crisis',
    label: 'Crisis Intervention',
    description: 'Urgent issue resolution',
    icon: TriangleAlert,
    color: '#FF3B30',
    applicableModes: ['main_to_sub', 'sub_to_main'],
  },
  {
    id: 'guidance',
    label: 'Guidance',
    description: 'Request expert advice',
    icon: Sparkles,
    color: '#FF9500',
    applicableModes: ['sub_to_main'],
  },
  {
    id: 'escalation',
    label: 'Escalation',
    description: 'Escalate critical issues',
    icon: Shield,
    color: '#FF2D55',
    applicableModes: ['sub_to_main'],
  },
  {
    id: 'collaboration',
    label: 'Collaboration',
    description: 'Work together on challenges',
    icon: Users,
    color: '#AF52DE',
    applicableModes: ['peer_to_peer'],
  },
  {
    id: 'knowledge_sharing',
    label: 'Knowledge Sharing',
    description: 'Share expertise and insights',
    icon: Brain,
    color: '#5AC8FA',
    applicableModes: ['peer_to_peer'],
  },
];

export default function AgentCounselingScreen() {
  const { id } = useLocalSearchParams();
  const { theme } = useTheme();
  const insets = useSafeAreaInsets();
  
  const agentId = typeof id === 'string' ? id : '';
  const agent = useMemo(() => getAgentById(agentId), [agentId]);
  const hierarchy = useMemo(() => getAgentHierarchy(agentId), [agentId]);
  const employee = useMemo(() => aiEmployees.find(e => e.id === agentId), [agentId]);
  
  const {
    sessions,
    loading,
    error,
    fetchSessions,
    mainToSub,
    subToMain,
    peer,
    employeeToAgent,
  } = useAgentCounseling();

  const [activeTab, setActiveTab] = useState<'sessions' | 'new'>('sessions');
  const [selectedMode, setSelectedMode] = useState<'main_to_sub' | 'sub_to_main' | 'peer_to_peer'>('main_to_sub');
  const [selectedCounselingType, setSelectedCounselingType] = useState<string>('');
  const [selectedTargetAgent, setSelectedTargetAgent] = useState<string>('');
  const [topic, setTopic] = useState('');
  const [details, setDetails] = useState('');
  const [priority, setPriority] = useState<'low' | 'medium' | 'high' | 'critical'>('medium');
  const [submitting, setSubmitting] = useState(false);
  const [showNewSessionModal, setShowNewSessionModal] = useState(false);

  // Determine available counseling modes based on agent type
  const availableModes = useMemo(() => {
    if (!agent) return [];
    const modes: { id: typeof selectedMode; label: string; icon: any }[] = [];
    
    if (agent.type === 'main_agent' && hierarchy.subAgents.length > 0) {
      modes.push({ id: 'main_to_sub', label: 'Counsel Subagents', icon: Crown });
    }
    if (agent.type === 'subagent' && hierarchy.mainAgent) {
      modes.push({ id: 'sub_to_main', label: 'Escalate to Main', icon: ArrowLeft });
    }
    modes.push({ id: 'peer_to_peer', label: 'Peer Counseling', icon: Users });
    
    return modes;
  }, [agent, hierarchy]);

  // Get target agents based on selected mode
  const targetAgents = useMemo(() => {
    switch (selectedMode) {
      case 'main_to_sub':
        return hierarchy.subAgents;
      case 'sub_to_main':
        return hierarchy.mainAgent ? [hierarchy.mainAgent] : [];
      case 'peer_to_peer':
        return hierarchy.peers || [];
      default:
        return [];
    }
  }, [selectedMode, hierarchy]);

  // Filter counseling types by mode
  const availableCounselingTypes = useMemo(() => {
    return counselingTypes.filter(type => type.applicableModes.includes(selectedMode));
  }, [selectedMode]);

  // Load sessions on mount
  React.useEffect(() => {
    if (agentId) {
      fetchSessions({ agentId, scope: 'all', limit: 50 });
    }
  }, [agentId, fetchSessions]);

  const handleCreateSession = useCallback(async () => {
    if (!selectedTargetAgent || !selectedCounselingType || !topic) return;
    
    setSubmitting(true);
    try {
      const counselingType = counselingTypes.find(t => t.id === selectedCounselingType);
      if (!counselingType) return;

      switch (selectedMode) {
        case 'main_to_sub':
          await mainToSub({
            mainAgentId: agentId,
            subagentId: selectedTargetAgent,
            counselingType: selectedCounselingType as CounselingType['id'],
            topic,
            details: { issue: details },
            options: { priority },
          });
          break;
        case 'sub_to_main':
          await subToMain({
            subagentId: agentId,
            mainAgentId: selectedTargetAgent,
            requestType: selectedCounselingType as CounselingType['id'],
            topic,
            details: { challenge: details },
            options: { priority },
          });
          break;
        case 'peer_to_peer':
          await peer({
            agentId1: agentId,
            agentId2: selectedTargetAgent,
            counselingType: selectedCounselingType as CounselingType['id'],
            topic,
            details: { sharedChallenge: details },
            options: { priority },
          });
          break;
      }
      
      setShowNewSessionModal(false);
      setActiveTab('sessions');
      await fetchSessions({ agentId, scope: 'all', limit: 50 });
    } catch (err) {
      console.error('Failed to create counseling session:', err);
    } finally {
      setSubmitting(false);
    }
  }, [selectedMode, selectedTargetAgent, selectedCounselingType, topic, details, priority, agentId, mainToSub, subToMain, peer, fetchSessions]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return '#34C759';
      case 'in_progress': return '#007AFF';
      case 'escalated': return '#FF9500';
      case 'pending': return '#8E8E93';
      default: return '#8E8E93';
    }
  };

  const getRelationshipLabel = (relationship?: string) => {
    switch (relationship) {
      case 'main_to_sub': return 'Main → Sub';
      case 'sub_to_main': return 'Sub → Main';
      case 'peer_to_peer': return 'Peer';
      default: return 'Unknown';
    }
  };

  const renderSessionCard = (session: CounselingSession) => {
    const latestRequest = session.requests[session.requests.length - 1];
    const relationship = latestRequest?.counselingContext?.relationship || 'peer_to_peer';
    
    return (
      <TouchableOpacity
        key={session.id}
        style={[styles.sessionCard, { backgroundColor: theme.colors.cardBackground }]}
        onPress={() => {
          // Navigate to session detail
          router.push(`/ai-agent/counseling/${session.id}`);
        }}
      >
        <View style={styles.sessionHeader}>
          <View style={[styles.relationshipBadge, { backgroundColor: theme.colors.background }]}>
            <Text style={[styles.relationshipText, { color: theme.colors.secondaryText }]}>
              {getRelationshipLabel(relationship)}
            </Text>
          </View>
          <View style={[styles.statusBadge, { backgroundColor: getStatusColor(session.status) + '20' }]}>
            <Text style={[styles.statusText, { color: getStatusColor(session.status) }]}>
              {session.status.replace('_', ' ')}
            </Text>
          </View>
        </View>
        
        <Text style={[styles.sessionTopic, { color: theme.colors.text }]} numberOfLines={1}>
          {latestRequest?.topic || 'Untitled Session'}
        </Text>
        
        <View style={styles.sessionParticipants}>
          <View style={styles.participantRow}>
            <User size={14} color={theme.colors.secondaryText} />
            <Text style={[styles.participantText, { color: theme.colors.secondaryText }]}>
              From: {session.initiator.agentName}
            </Text>
          </View>
          {session.participants.length > 0 && (
            <View style={styles.participantRow}>
              <MessageCircle size={14} color={theme.colors.secondaryText} />
              <Text style={[styles.participantText, { color: theme.colors.secondaryText }]}>
                To: {session.participants.map(p => p.agentName).join(', ')}
              </Text>
            </View>
          )}
        </View>
        
        <View style={styles.sessionFooter}>
          <View style={styles.timeRow}>
            <Clock size={12} color={theme.colors.secondaryText} />
            <Text style={[styles.timeText, { color: theme.colors.secondaryText }]}>
              {new Date(session.createdAt).toLocaleDateString()}
            </Text>
          </View>
          <ChevronRight size={18} color={theme.colors.secondaryText} />
        </View>
      </TouchableOpacity>
    );
  };

  const renderNewSessionModal = () => (
    <Modal
      visible={showNewSessionModal}
      animationType="slide"
      transparent={true}
      onRequestClose={() => setShowNewSessionModal(false)}
    >
      <View style={[styles.modalOverlay, { backgroundColor: 'rgba(0,0,0,0.7)' }]}>
        <View style={[styles.modalContent, { backgroundColor: theme.colors.background }]}>
          <View style={styles.modalHeader}>
            <Text style={[styles.modalTitle, { color: theme.colors.text }]}>
              New Counseling Session
            </Text>
            <TouchableOpacity onPress={() => setShowNewSessionModal(false)}>
              <Text style={[styles.closeButton, { color: theme.colors.primary }]}>Close</Text>
            </TouchableOpacity>
          </View>
          
          <ScrollView style={styles.modalBody} showsVerticalScrollIndicator={false}>
            {/* Step 1: Select Mode */}
            <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Counseling Mode</Text>
            <View style={styles.modeGrid}>
              {availableModes.map(mode => (
                <TouchableOpacity
                  key={mode.id}
                  style={[
                    styles.modeButton,
                    { 
                      backgroundColor: selectedMode === mode.id 
                        ? theme.colors.primary 
                        : theme.colors.cardBackground,
                      borderColor: theme.colors.border,
                    },
                  ]}
                  onPress={() => {
                    setSelectedMode(mode.id);
                    setSelectedTargetAgent('');
                    setSelectedCounselingType('');
                  }}
                >
                  <mode.icon 
                    size={20} 
                    color={selectedMode === mode.id ? '#fff' : theme.colors.text} 
                  />
                  <Text 
                    style={[
                      styles.modeLabel, 
                      { color: selectedMode === mode.id ? '#fff' : theme.colors.text }
                    ]}
                  >
                    {mode.label}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
            
            {/* Step 2: Select Target Agent */}
            {targetAgents.length > 0 && (
              <>
                <Text style={[styles.sectionTitle, { color: theme.colors.text, marginTop: 20 }]}>
                  Select Target Agent
                </Text>
                <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.agentScroll}>
                  {targetAgents.map(targetAgent => (
                    <TouchableOpacity
                      key={targetAgent.id}
                      style={[
                        styles.agentButton,
                        { 
                          backgroundColor: selectedTargetAgent === targetAgent.id 
                            ? theme.colors.primary 
                            : theme.colors.cardBackground,
                          borderColor: theme.colors.border,
                        },
                      ]}
                      onPress={() => setSelectedTargetAgent(targetAgent.id)}
                    >
                      <View style={styles.agentIcon}>
                        <Text style={styles.agentInitial}>
                          {targetAgent.name.charAt(0)}
                        </Text>
                      </View>
                      <Text 
                        style={[
                          styles.agentName, 
                          { color: selectedTargetAgent === targetAgent.id ? '#fff' : theme.colors.text }
                        ]}
                        numberOfLines={1}
                      >
                        {targetAgent.name}
                      </Text>
                      <Text 
                        style={[
                          styles.agentRole, 
                          { color: selectedTargetAgent === targetAgent.id ? 'rgba(255,255,255,0.7)' : theme.colors.secondaryText }
                        ]}
                      >
                        {targetAgent.type === 'main_agent' ? 'Main Agent' : 'Subagent'}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </ScrollView>
              </>
            )}
            
            {/* Step 3: Select Counseling Type */}
            <Text style={[styles.sectionTitle, { color: theme.colors.text, marginTop: 20 }]}>
              Counseling Type
            </Text>
            <View style={styles.typeGrid}>
              {availableCounselingTypes.map(type => (
                <TouchableOpacity
                  key={type.id}
                  style={[
                    styles.typeButton,
                    { 
                      backgroundColor: selectedCounselingType === type.id 
                        ? type.color + '20'
                        : theme.colors.cardBackground,
                      borderColor: selectedCounselingType === type.id 
                        ? type.color 
                        : theme.colors.border,
                    },
                  ]}
                  onPress={() => setSelectedCounselingType(type.id)}
                >
                  <type.icon size={20} color={type.color} />
                  <Text style={[styles.typeLabel, { color: theme.colors.text }]}>
                    {type.label}
                  </Text>
                  <Text style={[styles.typeDescription, { color: theme.colors.secondaryText }]}>
                    {type.description}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
            
            {/* Step 4: Topic and Details */}
            <Text style={[styles.sectionTitle, { color: theme.colors.text, marginTop: 20 }]}>
              Session Details
            </Text>
            <TextInput
              style={[styles.input, { 
                backgroundColor: theme.colors.cardBackground,
                color: theme.colors.text,
                borderColor: theme.colors.border,
              }]}
              placeholder="Session Topic"
              placeholderTextColor={theme.colors.secondaryText}
              value={topic}
              onChangeText={setTopic}
            />
            <TextInput
              style={[styles.textArea, { 
                backgroundColor: theme.colors.cardBackground,
                color: theme.colors.text,
                borderColor: theme.colors.border,
                marginTop: 12,
              }]}
              placeholder="Details, challenges, or context..."
              placeholderTextColor={theme.colors.secondaryText}
              value={details}
              onChangeText={setDetails}
              multiline
              numberOfLines={4}
            />
            
            {/* Priority */}
            <Text style={[styles.sectionTitle, { color: theme.colors.text, marginTop: 20 }]}>
              Priority
            </Text>
            <View style={styles.priorityRow}>
              {(['low', 'medium', 'high', 'critical'] as const).map(p => (
                <TouchableOpacity
                  key={p}
                  style={[
                    styles.priorityButton,
                    { 
                      backgroundColor: priority === p 
                        ? p === 'critical' ? '#FF3B30' : p === 'high' ? '#FF9500' : p === 'medium' ? '#007AFF' : '#34C759'
                        : theme.colors.cardBackground,
                    },
                  ]}
                  onPress={() => setPriority(p)}
                >
                  <Text 
                    style={[
                      styles.priorityText, 
                      { color: priority === p ? '#fff' : theme.colors.text }
                    ]}
                  >
                    {p.charAt(0).toUpperCase() + p.slice(1)}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
            
            {/* Submit Button */}
            <TouchableOpacity
              style={[
                styles.submitButton,
                { 
                  backgroundColor: theme.colors.primary,
                  opacity: !selectedTargetAgent || !selectedCounselingType || !topic || submitting ? 0.5 : 1,
                },
              ]}
              onPress={handleCreateSession}
              disabled={!selectedTargetAgent || !selectedCounselingType || !topic || submitting}
            >
              {submitting ? (
                <ActivityIndicator color="#fff" />
              ) : (
                <>
                  <Send size={18} color="#fff" />
                  <Text style={styles.submitButtonText}>Start Counseling Session</Text>
                </>
              )}
            </TouchableOpacity>
          </ScrollView>
        </View>
      </View>
    </Modal>
  );

  if (!agent) {
    return (
      <View style={[styles.container, { backgroundColor: theme.colors.background, paddingTop: insets.top }]}>
        <Text style={{ color: theme.colors.text }}>Agent not found</Text>
      </View>
    );
  }

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      {/* Header */}
      <LinearGradient colors={['#0f172a', '#1e293b']} style={[styles.header, { paddingTop: insets.top + 10 }]}>
        <View style={styles.navBar}>
          <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
            <ArrowLeft size={24} color="#fff" />
          </TouchableOpacity>
          <View style={styles.headerTitleContainer}>
            <Text style={styles.headerTitle}>Agent Counseling</Text>
            <Text style={styles.headerSubtitle}>{agent.name}</Text>
          </View>
        </View>
        
        {/* Agent Info Card */}
        <View style={styles.agentInfoCard}>
          <View style={[styles.agentAvatar, { backgroundColor: employee?.color || '#007AFF' }]}>
            <Text style={styles.agentInitialLarge}>{agent.name.charAt(0)}</Text>
          </View>
          <View style={styles.agentInfo}>
            <Text style={styles.agentInfoName}>{agent.name}</Text>
            <Text style={styles.agentInfoRole}>
              {agent.type === 'main_agent' ? 'Main Agent' : 'Subagent'} • {agent.category}
            </Text>
            <View style={styles.hierarchyInfo}>
              {agent.type === 'main_agent' && hierarchy.subAgents.length > 0 && (
                <View style={styles.hierarchyBadge}>
                  <Crown size={12} color="#FFD700" />
                  <Text style={styles.hierarchyText}>{hierarchy.subAgents.length} subagents</Text>
                </View>
              )}
              {agent.type === 'subagent' && hierarchy.mainAgent && (
                <View style={styles.hierarchyBadge}>
                  <GitBranch size={12} color="#34C759" />
                  <Text style={styles.hierarchyText}>Reports to {hierarchy.mainAgent.name}</Text>
                </View>
              )}
            </View>
          </View>
        </View>
        
        {/* Tabs */}
        <View style={styles.tabBar}>
          <TouchableOpacity
            style={[styles.tab, activeTab === 'sessions' && styles.tabActive]}
            onPress={() => setActiveTab('sessions')}
          >
            <MessageCircle size={16} color={activeTab === 'sessions' ? '#fff' : 'rgba(255,255,255,0.6)'} />
            <Text style={[styles.tabText, activeTab === 'sessions' && styles.tabTextActive]}>
              Sessions ({sessions.length})
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.tab, activeTab === 'new' && styles.tabActive]}
            onPress={() => setShowNewSessionModal(true)}
          >
            <Zap size={16} color="#fff" />
            <Text style={[styles.tabText, styles.tabTextActive]}>New Session</Text>
          </TouchableOpacity>
        </View>
      </LinearGradient>

      {/* Content */}
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {error && (
          <View style={[styles.errorBanner, { backgroundColor: '#FF3B3020' }]}>
            <TriangleAlert size={16} color="#FF3B30" />
            <Text style={[styles.errorText, { color: '#FF3B30' }]}>{error}</Text>
          </View>
        )}
        
        {loading ? (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color={theme.colors.primary} />
            <Text style={[styles.loadingText, { color: theme.colors.secondaryText }]}>
              Loading counseling sessions...
            </Text>
          </View>
        ) : sessions.length === 0 ? (
          <View style={styles.emptyState}>
            <Brain size={48} color={theme.colors.border} />
            <Text style={[styles.emptyTitle, { color: theme.colors.text }]}>
              No Counseling Sessions Yet
            </Text>
            <Text style={[styles.emptySubtitle, { color: theme.colors.secondaryText }]}>
              Start a new session to counsel with other agents
            </Text>
            <TouchableOpacity
              style={[styles.emptyButton, { backgroundColor: theme.colors.primary }]}
              onPress={() => setShowNewSessionModal(true)}
            >
              <Zap size={18} color="#fff" />
              <Text style={styles.emptyButtonText}>Start New Session</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <View style={styles.sessionsList}>
            {sessions.map(renderSessionCard)}
          </View>
        )}
        
        <View style={{ height: 100 }} />
      </ScrollView>

      {renderNewSessionModal()}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  header: { 
    paddingHorizontal: 20, 
    paddingBottom: 20, 
    borderBottomLeftRadius: 30, 
    borderBottomRightRadius: 30,
  },
  navBar: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    marginBottom: 20,
  },
  backButton: { 
    width: 40, 
    height: 40, 
    borderRadius: 12, 
    backgroundColor: 'rgba(255,255,255,0.1)', 
    justifyContent: 'center', 
    alignItems: 'center',
  },
  headerTitleContainer: { flex: 1, marginLeft: 15 },
  headerTitle: { fontSize: 20, fontWeight: '800', color: '#fff' },
  headerSubtitle: { fontSize: 13, color: 'rgba(255,255,255,0.6)', marginTop: 2 },
  agentInfoCard: {
    flexDirection: 'row',
    backgroundColor: 'rgba(255,255,255,0.1)',
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
  },
  agentAvatar: {
    width: 56,
    height: 56,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  agentInitialLarge: { fontSize: 24, fontWeight: '800', color: '#fff' },
  agentInfo: { flex: 1, marginLeft: 14, justifyContent: 'center' },
  agentInfoName: { fontSize: 17, fontWeight: '700', color: '#fff' },
  agentInfoRole: { fontSize: 13, color: 'rgba(255,255,255,0.7)', marginTop: 2 },
  hierarchyInfo: { flexDirection: 'row', marginTop: 6, gap: 10 },
  hierarchyBadge: { flexDirection: 'row', alignItems: 'center', gap: 4 },
  hierarchyText: { fontSize: 11, color: 'rgba(255,255,255,0.6)' },
  tabBar: { 
    flexDirection: 'row', 
    backgroundColor: 'rgba(255,255,255,0.1)', 
    borderRadius: 12, 
    padding: 4,
  },
  tab: { 
    flex: 1, 
    flexDirection: 'row', 
    alignItems: 'center', 
    justifyContent: 'center', 
    paddingVertical: 10, 
    borderRadius: 8,
    gap: 6,
  },
  tabActive: { backgroundColor: 'rgba(255,255,255,0.2)' },
  tabText: { fontSize: 13, fontWeight: '600', color: 'rgba(255,255,255,0.6)' },
  tabTextActive: { color: '#fff' },
  content: { flex: 1, padding: 20 },
  errorBanner: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    padding: 12, 
    borderRadius: 12, 
    marginBottom: 16,
    gap: 8,
  },
  errorText: { fontSize: 13, fontWeight: '600' },
  loadingContainer: { alignItems: 'center', paddingVertical: 40 },
  loadingText: { fontSize: 14, marginTop: 12 },
  emptyState: { alignItems: 'center', paddingVertical: 60 },
  emptyTitle: { fontSize: 18, fontWeight: '700', marginTop: 16 },
  emptySubtitle: { fontSize: 14, marginTop: 8, textAlign: 'center' },
  emptyButton: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    paddingHorizontal: 20, 
    paddingVertical: 12, 
    borderRadius: 12, 
    marginTop: 20,
    gap: 8,
  },
  emptyButtonText: { color: '#fff', fontSize: 14, fontWeight: '700' },
  sessionsList: { gap: 12 },
  sessionCard: { 
    borderRadius: 16, 
    padding: 16,
  },
  sessionHeader: { 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    marginBottom: 10,
  },
  relationshipBadge: { 
    paddingHorizontal: 8, 
    paddingVertical: 4, 
    borderRadius: 6,
  },
  relationshipText: { fontSize: 11, fontWeight: '600' },
  statusBadge: { 
    paddingHorizontal: 8, 
    paddingVertical: 4, 
    borderRadius: 6,
  },
  statusText: { fontSize: 11, fontWeight: '600' },
  sessionTopic: { fontSize: 15, fontWeight: '700', marginBottom: 10 },
  sessionParticipants: { gap: 4 },
  participantRow: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  participantText: { fontSize: 12 },
  sessionFooter: { 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    alignItems: 'center',
    marginTop: 12,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: 'rgba(0,0,0,0.05)',
  },
  timeRow: { flexDirection: 'row', alignItems: 'center', gap: 4 },
  timeText: { fontSize: 11 },
  
  // Modal styles
  modalOverlay: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  modalContent: {
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    maxHeight: '90%',
    paddingBottom: 30,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0,0,0,0.1)',
  },
  modalTitle: { fontSize: 18, fontWeight: '700' },
  closeButton: { fontSize: 15, fontWeight: '600' },
  modalBody: { padding: 20 },
  sectionTitle: { fontSize: 16, fontWeight: '700', marginBottom: 12 },
  modeGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 10 },
  modeButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: 12,
    borderWidth: 1,
    gap: 8,
  },
  modeLabel: { fontSize: 13, fontWeight: '600' },
  agentScroll: { marginTop: 8 },
  agentButton: {
    width: 100,
    padding: 12,
    borderRadius: 16,
    borderWidth: 1,
    marginRight: 10,
    alignItems: 'center',
  },
  agentIcon: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: 'rgba(0,0,0,0.1)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  agentInitial: { fontSize: 16, fontWeight: '700' },
  agentName: { fontSize: 12, fontWeight: '600', textAlign: 'center' },
  agentRole: { fontSize: 10, textAlign: 'center', marginTop: 2 },
  typeGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 10 },
  typeButton: {
    width: '47%',
    padding: 14,
    borderRadius: 16,
    borderWidth: 1,
  },
  typeLabel: { fontSize: 13, fontWeight: '700', marginTop: 8 },
  typeDescription: { fontSize: 11, marginTop: 4 },
  input: {
    paddingHorizontal: 14,
    paddingVertical: 12,
    borderRadius: 12,
    borderWidth: 1,
    fontSize: 15,
  },
  textArea: {
    paddingHorizontal: 14,
    paddingVertical: 12,
    borderRadius: 12,
    borderWidth: 1,
    fontSize: 15,
    textAlignVertical: 'top',
    minHeight: 100,
  },
  priorityRow: { flexDirection: 'row', gap: 8 },
  priorityButton: {
    flex: 1,
    paddingVertical: 10,
    borderRadius: 10,
    alignItems: 'center',
  },
  priorityText: { fontSize: 12, fontWeight: '600' },
  submitButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 14,
    borderRadius: 14,
    marginTop: 24,
    gap: 8,
  },
  submitButtonText: { color: '#fff', fontSize: 15, fontWeight: '700' },
});
