import React, { useState, useCallback, useMemo } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { useLocalSearchParams, router } from 'expo-router';
import {
  ArrowLeft,
  Brain,
  MessageCircle,
  Clock,
  CircleCheckBig,
  Send,
  Crown,
  GitBranch,
  Target,
  Sparkles,
  ChartBar,
  Shield,
  ChevronRight,
  Calendar,
  FileText,
  Zap,
  User,
} from 'lucide-react-native';
import { useTheme } from '@/providers/ThemeProvider';
import { useAgentCounseling } from '@/hooks/useAgentCounseling';

export default function CounselingSessionScreen() {
  const { id } = useLocalSearchParams();
  const { theme } = useTheme();
  const insets = useSafeAreaInsets();
  const sessionId = typeof id === 'string' ? id : '';
  
  const { sessions, loading, fetchSessions, respondToCounseling } = useAgentCounseling();

  const [response, setResponse] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [activeTab, setActiveTab] = useState<'overview' | 'discussion' | 'outcome'>('overview');

  // Find current session
  const session = useMemo(() => {
    return sessions.find(s => s.id === sessionId);
  }, [sessions, sessionId]);

  // Load session data
  React.useEffect(() => {
    if (sessionId) {
      fetchSessions({ agentId: session?.initiator.agentId || '', scope: 'all', limit: 50 });
    }
  }, [sessionId, session?.initiator.agentId, fetchSessions]);

  const handleSendResponse = useCallback(async () => {
    if (!session || !response.trim()) return;
    
    setSubmitting(true);
    try {
      const respondingAgentId = session.participants[0]?.agentId || session.initiator.agentId;
      
      await respondToCounseling({
        sessionId: session.id,
        respondingAgentId,
        response: {
          status: 'completed',
          answer: response,
          recommendations: ['Review the provided guidance', 'Implement suggested actions'],
          confidence: 0.85,
        },
      });
      
      setResponse('');
      await fetchSessions({ agentId: session.initiator.agentId, scope: 'all', limit: 50 });
    } catch (err) {
      console.error('Failed to send response:', err);
    } finally {
      setSubmitting(false);
    }
  }, [session, response, respondToCounseling, fetchSessions]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return '#34C759';
      case 'in_progress': return '#007AFF';
      case 'escalated': return '#FF9500';
      case 'pending': return '#8E8E93';
      default: return '#8E8E93';
    }
  };

  const getRelationshipIcon = (relationship?: string) => {
    switch (relationship) {
      case 'main_to_sub': return Crown;
      case 'sub_to_main': return GitBranch;
      case 'peer_to_peer': return Target;
      default: return MessageCircle;
    }
  };

  const getRelationshipLabel = (relationship?: string) => {
    switch (relationship) {
      case 'main_to_sub': return 'Main Agent Counseling Subagent';
      case 'sub_to_main': return 'Subagent Escalating to Main';
      case 'peer_to_peer': return 'Peer-to-Peer Counseling';
      default: return 'Agent Counseling';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'performance_counseling': return ChartBar;
      case 'mentorship': return Sparkles;
      case 'escalation': return Shield;
      case 'advisory': return Brain;
      case 'collaborative': return Target;
      case 'coordination': return GitBranch;
      default: return MessageCircle;
    }
  };

  const renderOverviewTab = () => {
    if (!session) return null;
    const latestRequest = session.requests[session.requests.length - 1];
    const relationship = latestRequest?.counselingContext?.relationship;
    const programType = latestRequest?.counselingContext?.programType;
    const TypeIcon = getTypeIcon(latestRequest?.type || '');
    const RelationshipIcon = getRelationshipIcon(relationship);

    return (
      <View style={styles.tabContent}>
        {/* Session Type Card */}
        <View style={[styles.card, { backgroundColor: theme.colors.cardBackground }]}>
          <View style={[styles.typeHeader, { backgroundColor: getStatusColor(session.status) + '15' }]}>
            <TypeIcon size={24} color={getStatusColor(session.status)} />
            <View style={styles.typeInfo}>
              <Text style={[styles.typeLabel, { color: theme.colors.text }]}>
                {latestRequest?.type?.replace(/_/g, ' ').toUpperCase() || 'COUNSELING'}
              </Text>
              <Text style={[styles.programType, { color: theme.colors.secondaryText }]}>
                {programType?.replace(/_/g, ' ') || 'General Session'}
              </Text>
            </View>
          </View>
          
          <View style={styles.divider} />
          
          {/* Relationship */}
          <View style={styles.infoRow}>
            <RelationshipIcon size={18} color={theme.colors.secondaryText} />
            <View style={styles.infoContent}>
              <Text style={[styles.infoLabel, { color: theme.colors.secondaryText }]}>Relationship</Text>
              <Text style={[styles.infoValue, { color: theme.colors.text }]}>
                {getRelationshipLabel(relationship)}
              </Text>
            </View>
          </View>
          
          {/* Priority */}
          <View style={styles.infoRow}>
            <Zap size={18} color={theme.colors.secondaryText} />
            <View style={styles.infoContent}>
              <Text style={[styles.infoLabel, { color: theme.colors.secondaryText }]}>Priority</Text>
              <Text 
                style={[
                  styles.infoValue, 
                  { 
                    color: latestRequest?.priority === 'critical' || latestRequest?.priority === 'emergency' 
                      ? '#FF3B30' 
                      : latestRequest?.priority === 'high' 
                        ? '#FF9500' 
                        : theme.colors.text 
                  }
                ]}
              >
                {(latestRequest?.priority || 'medium').toUpperCase()}
              </Text>
            </View>
          </View>
          
          {/* Status */}
          <View style={styles.infoRow}>
            <CircleCheckBig size={18} color={getStatusColor(session.status)} />
            <View style={styles.infoContent}>
              <Text style={[styles.infoLabel, { color: theme.colors.secondaryText }]}>Status</Text>
              <Text style={[styles.infoValue, { color: getStatusColor(session.status) }]}>
                {(session.status || 'pending').replace(/_/g, ' ').toUpperCase()}
              </Text>
            </View>
          </View>
          
          {/* Created */}
          <View style={styles.infoRow}>
            <Calendar size={18} color={theme.colors.secondaryText} />
            <View style={styles.infoContent}>
              <Text style={[styles.infoLabel, { color: theme.colors.secondaryText }]}>Created</Text>
              <Text style={[styles.infoValue, { color: theme.colors.text }]}>
                {new Date(session.createdAt).toLocaleString()}
              </Text>
            </View>
          </View>
        </View>

        {/* Participants Card */}
        <View style={[styles.card, { backgroundColor: theme.colors.cardBackground, marginTop: 16 }]}>
          <Text style={[styles.cardTitle, { color: theme.colors.text }]}>Participants</Text>
          
          {/* Initiator */}
          <View style={styles.participantSection}>
            <Text style={[styles.participantLabel, { color: theme.colors.secondaryText }]}>Initiator</Text>
            <View style={styles.participantCard}>
              <View style={[styles.participantAvatar, { backgroundColor: theme.colors.primary }]}>
                <Text style={styles.avatarText}>{session.initiator.agentName.charAt(0)}</Text>
              </View>
              <View style={styles.participantInfo}>
                <Text style={[styles.participantName, { color: theme.colors.text }]}>
                  {session.initiator.agentName}
                </Text>
                <Text style={[styles.participantRole, { color: theme.colors.secondaryText }]}>
                  {session.initiator.category}
                </Text>
              </View>
            </View>
          </View>
          
          {/* Participants */}
          {session.participants.length > 0 && (
            <View style={styles.participantSection}>
              <Text style={[styles.participantLabel, { color: theme.colors.secondaryText }]}>
                Counselor(s)
              </Text>
              {session.participants.map((participant, index) => (
                <View key={index} style={styles.participantCard}>
                  <View style={[styles.participantAvatar, { backgroundColor: '#34C759' }]}>
                    <Text style={styles.avatarText}>{participant.agentName.charAt(0)}</Text>
                  </View>
                  <View style={styles.participantInfo}>
                    <Text style={[styles.participantName, { color: theme.colors.text }]}>
                      {participant.agentName}
                    </Text>
                    <Text style={[styles.participantRole, { color: theme.colors.secondaryText }]}>
                      {participant.role.replace(/_/g, ' ')} • {participant.category}
                    </Text>
                  </View>
                </View>
              ))}
            </View>
          )}
        </View>

        {/* Original Request Card */}
        {latestRequest && (
          <View style={[styles.card, { backgroundColor: theme.colors.cardBackground, marginTop: 16 }]}>
            <Text style={[styles.cardTitle, { color: theme.colors.text }]}>Original Request</Text>
            <Text style={[styles.requestTopic, { color: theme.colors.text }]}>{latestRequest.topic}</Text>
            <Text style={[styles.requestQuestion, { color: theme.colors.secondaryText }]}>
              {latestRequest.question}
            </Text>
          </View>
        )}
      </View>
    );
  };

  const renderDiscussionTab = () => {
    if (!session) return null;

    return (
      <View style={styles.tabContent}>
        {/* Messages */}
        <View style={styles.messagesContainer}>
          {session.requests.map((request, index) => (
            <View key={request.id} style={styles.messageGroup}>
              {/* Request Message */}
              <View style={[styles.messageBubble, styles.requestBubble, { backgroundColor: theme.colors.primary + '20' }]}>
                <View style={styles.messageHeader}>
                  <User size={14} color={theme.colors.primary} />
                  <Text style={[styles.messageAuthor, { color: theme.colors.primary }]}>
                    {request.sourceAgentName}
                  </Text>
                  <Text style={[styles.messageTime, { color: theme.colors.secondaryText }]}>
                     {new Date((request as any).timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </Text>
                </View>
                <Text style={[styles.messageTopic, { color: theme.colors.text }]}>{request.topic}</Text>
                <Text style={[styles.messageText, { color: theme.colors.secondaryText }]}>
                  {request.question}
                </Text>
              </View>

              {/* Response Messages */}
              {session.responses
                .filter((r: any) => r.consultationId === request.id)
                .map((response, rIndex) => (
                  <View 
                    key={response.id} 
                    style={[styles.messageBubble, styles.responseBubble, { backgroundColor: theme.colors.cardBackground }]}
                  >
                    <View style={styles.messageHeader}>
                      <Brain size={14} color="#34C759" />
                      <Text style={[styles.messageAuthor, { color: '#34C759' }]}>
                        {response.respondingAgentName}
                      </Text>
                      <Text style={[styles.messageTime, { color: theme.colors.secondaryText }]}>
                         {new Date((response as any).timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </Text>
                    </View>
                    <Text style={[styles.messageText, { color: theme.colors.text }]}>
                      {response.answer}
                    </Text>
                    
                    {response.recommendations.length > 0 && (
                      <View style={styles.recommendations}>
                        <Text style={[styles.recommendationsTitle, { color: theme.colors.secondaryText }]}>
                          Recommendations:
                        </Text>
                        {response.recommendations.map((rec, i) => (
                          <View key={i} style={styles.recommendationItem}>
                            <ChevronRight size={12} color="#34C759" />
                            <Text style={[styles.recommendationText, { color: theme.colors.text }]}>{rec}</Text>
                          </View>
                        ))}
                      </View>
                    )}
                    
                    {response.counselingGuidance && (
                      <View style={styles.guidanceSection}>
                        {response.counselingGuidance.mentoringAdvice && (
                          <View style={styles.guidanceItem}>
                            <Sparkles size={14} color="#FF9500" />
                            <Text style={[styles.guidanceText, { color: theme.colors.text }]}>
                              {response.counselingGuidance.mentoringAdvice}
                            </Text>
                          </View>
                        )}
                        {response.counselingGuidance.performanceImprovement && (
                          <View style={styles.guidanceItem}>
                            <ChartBar size={14} color="#007AFF" />
                            <Text style={[styles.guidanceText, { color: theme.colors.text }]}>
                              Performance Plan: {response.counselingGuidance.performanceImprovement.timeline}
                            </Text>
                          </View>
                        )}
                      </View>
                    )}
                  </View>
                ))}
            </View>
          ))}
        </View>

        {/* Response Input */}
        {session.status !== 'completed' && (
          <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={styles.inputContainer}
          >
            <TextInput
              style={[styles.responseInput, { 
                backgroundColor: theme.colors.cardBackground,
                color: theme.colors.text,
                borderColor: theme.colors.border,
              }]}
              placeholder="Type your response..."
              placeholderTextColor={theme.colors.secondaryText}
              value={response}
              onChangeText={setResponse}
              multiline
              numberOfLines={3}
            />
            <TouchableOpacity
              style={[
                styles.sendButton,
                { backgroundColor: theme.colors.primary },
                (!response.trim() || submitting) && { opacity: 0.5 },
              ]}
              onPress={handleSendResponse}
              disabled={!response.trim() || submitting}
            >
              {submitting ? (
                <ActivityIndicator color="#fff" size="small" />
              ) : (
                <Send size={20} color="#fff" />
              )}
            </TouchableOpacity>
          </KeyboardAvoidingView>
        )}
      </View>
    );
  };

  const renderOutcomeTab = () => {
    if (!session) return null;
    
    const latestResponse = session.responses[session.responses.length - 1];
    
    return (
      <View style={styles.tabContent}>
        {session.status === 'completed' && latestResponse ? (
          <View style={[styles.card, { backgroundColor: theme.colors.cardBackground }]}>
            <View style={[styles.outcomeHeader, { backgroundColor: '#34C75915' }]}>
              <CircleCheckBig size={32} color="#34C759" />
              <Text style={[styles.outcomeTitle, { color: '#34C759' }]}>Session Completed</Text>
            </View>
            
            <View style={styles.divider} />
            
            {/* Summary */}
            <Text style={[styles.sectionHeader, { color: theme.colors.text }]}>Summary</Text>
            <Text style={[styles.summaryText, { color: theme.colors.secondaryText }]}>
              {latestResponse.answer}
            </Text>
            
            {/* Recommendations */}
            {latestResponse.recommendations.length > 0 && (
              <>
                <Text style={[styles.sectionHeader, { color: theme.colors.text, marginTop: 20 }]}>
                  Key Recommendations
                </Text>
                {latestResponse.recommendations.map((rec, index) => (
                  <View key={index} style={styles.outcomeItem}>
                    <View style={[styles.outcomeBullet, { backgroundColor: '#34C759' }]}>
                      <Text style={styles.bulletText}>{index + 1}</Text>
                    </View>
                    <Text style={[styles.outcomeText, { color: theme.colors.text }]}>{rec}</Text>
                  </View>
                ))}
              </>
            )}
            
            {/* Guidance */}
            {latestResponse.counselingGuidance && (
              <>
                <Text style={[styles.sectionHeader, { color: theme.colors.text, marginTop: 20 }]}>
                  Counseling Guidance
                </Text>
                
                {latestResponse.counselingGuidance.performanceImprovement && (
                  <View style={styles.guidanceCard}>
                    <ChartBar size={18} color="#007AFF" />
                    <View style={styles.guidanceInfo}>
                      <Text style={[styles.guidanceTitle, { color: theme.colors.text }]}>
                        Performance Improvement
                      </Text>
                      <Text style={[styles.guidanceDetail, { color: theme.colors.secondaryText }]}>
                        Timeline: {latestResponse.counselingGuidance.performanceImprovement.timeline}
                      </Text>
                      <Text style={[styles.guidanceDetail, { color: theme.colors.secondaryText }]}>
                        Metrics: {latestResponse.counselingGuidance.performanceImprovement.metrics.join(', ')}
                      </Text>
                    </View>
                  </View>
                )}
                
                {latestResponse.counselingGuidance.skillDevelopment && (
                  <View style={styles.guidanceCard}>
                    <Target size={18} color="#FF9500" />
                    <View style={styles.guidanceInfo}>
                      <Text style={[styles.guidanceTitle, { color: theme.colors.text }]}>
                        Skill Development
                      </Text>
                      <Text style={[styles.guidanceDetail, { color: theme.colors.secondaryText }]}>
                        Skills: {latestResponse.counselingGuidance.skillDevelopment.skills.join(', ')}
                      </Text>
                    </View>
                  </View>
                )}
              </>
            )}
            
            {/* Confidence */}
            <View style={styles.confidenceSection}>
              <Text style={[styles.confidenceLabel, { color: theme.colors.secondaryText }]}>
                Confidence Score
              </Text>
              <View style={styles.confidenceBar}>
                <View 
                  style={[
                    styles.confidenceFill, 
                    { 
                      width: `${Math.round(latestResponse.confidence * 100)}%`,
                      backgroundColor: latestResponse.confidence > 0.8 ? '#34C759' : latestResponse.confidence > 0.6 ? '#FF9500' : '#FF3B30',
                    }
                  ]} 
                />
              </View>
              <Text style={[styles.confidenceValue, { color: theme.colors.text }]}>
                {Math.round(latestResponse.confidence * 100)}%
              </Text>
            </View>
          </View>
        ) : (
          <View style={styles.emptyOutcome}>
            <Clock size={48} color={theme.colors.border} />
            <Text style={[styles.emptyTitle, { color: theme.colors.text }]}>
              Session In Progress
            </Text>
            <Text style={[styles.emptySubtitle, { color: theme.colors.secondaryText }]}>
              The session outcome will be available once counseling is complete
            </Text>
          </View>
        )}
      </View>
    );
  };

  if (!session && !loading) {
    return (
      <View style={[styles.container, { backgroundColor: theme.colors.background, paddingTop: insets.top }]}>
        <Text style={{ color: theme.colors.text }}>Session not found</Text>
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
            <Text style={styles.headerTitle}>Counseling Session</Text>
            {session && (
              <Text style={styles.headerSubtitle} numberOfLines={1}>
                {session.requests[0]?.topic || 'Untitled'}
              </Text>
            )}
          </View>
          <View style={[styles.statusIndicator, { backgroundColor: session ? getStatusColor(session.status) + '30' : '#8E8E9330' }]}>
            <View style={[styles.statusDot, { backgroundColor: session ? getStatusColor(session.status) : '#8E8E93' }]} />
            <Text style={[styles.statusText, { color: session ? getStatusColor(session.status) : '#8E8E93' }]}>
              {session?.status?.replace(/_/g, ' ') || 'Unknown'}
            </Text>
          </View>
        </View>
        
        {/* Tabs */}
        <View style={styles.tabBar}>
          <TouchableOpacity
            style={[styles.tab, activeTab === 'overview' && styles.tabActive]}
            onPress={() => setActiveTab('overview')}
          >
            <FileText size={16} color={activeTab === 'overview' ? '#fff' : 'rgba(255,255,255,0.6)'} />
            <Text style={[styles.tabText, activeTab === 'overview' && styles.tabTextActive]}>Overview</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.tab, activeTab === 'discussion' && styles.tabActive]}
            onPress={() => setActiveTab('discussion')}
          >
            <MessageCircle size={16} color={activeTab === 'discussion' ? '#fff' : 'rgba(255,255,255,0.6)'} />
            <Text style={[styles.tabText, activeTab === 'discussion' && styles.tabTextActive]}>Discussion</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.tab, activeTab === 'outcome' && styles.tabActive]}
            onPress={() => setActiveTab('outcome')}
          >
            <CircleCheckBig size={16} color={activeTab === 'outcome' ? '#fff' : 'rgba(255,255,255,0.6)'} />
            <Text style={[styles.tabText, activeTab === 'outcome' && styles.tabTextActive]}>Outcome</Text>
          </TouchableOpacity>
        </View>
      </LinearGradient>

      {/* Content */}
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {loading ? (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color={theme.colors.primary} />
            <Text style={[styles.loadingText, { color: theme.colors.secondaryText }]}>
              Loading session...
            </Text>
          </View>
        ) : (
          <>
            {activeTab === 'overview' && renderOverviewTab()}
            {activeTab === 'discussion' && renderDiscussionTab()}
            {activeTab === 'outcome' && renderOutcomeTab()}
          </>
        )}
        <View style={{ height: 40 }} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  header: { 
    paddingHorizontal: 20, 
    paddingBottom: 16, 
    borderBottomLeftRadius: 30, 
    borderBottomRightRadius: 30,
  },
  navBar: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    marginBottom: 16,
  },
  backButton: { 
    width: 40, 
    height: 40, 
    borderRadius: 12, 
    backgroundColor: 'rgba(255,255,255,0.1)', 
    justifyContent: 'center', 
    alignItems: 'center',
  },
  headerTitleContainer: { flex: 1, marginLeft: 15, marginRight: 10 },
  headerTitle: { fontSize: 18, fontWeight: '800', color: '#fff' },
  headerSubtitle: { fontSize: 12, color: 'rgba(255,255,255,0.6)', marginTop: 2 },
  statusIndicator: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 12,
    gap: 6,
  },
  statusDot: { width: 8, height: 8, borderRadius: 4 },
  statusText: { fontSize: 11, fontWeight: '700' },
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
    paddingVertical: 8, 
    borderRadius: 8,
    gap: 6,
  },
  tabActive: { backgroundColor: 'rgba(255,255,255,0.2)' },
  tabText: { fontSize: 12, fontWeight: '600', color: 'rgba(255,255,255,0.6)' },
  tabTextActive: { color: '#fff' },
  content: { flex: 1, padding: 16 },
  tabContent: { flex: 1 },
  loadingContainer: { alignItems: 'center', paddingVertical: 40 },
  loadingText: { fontSize: 14, marginTop: 12 },
  
  // Overview tab styles
  card: { 
    borderRadius: 16, 
    padding: 16,
  },
  typeHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    borderRadius: 12,
    marginBottom: 12,
  },
  typeInfo: { marginLeft: 12 },
  typeLabel: { fontSize: 14, fontWeight: '700' },
  programType: { fontSize: 12, marginTop: 2 },
  divider: {
    height: 1,
    backgroundColor: 'rgba(0,0,0,0.05)',
    marginVertical: 12,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
  },
  infoContent: { marginLeft: 12, flex: 1 },
  infoLabel: { fontSize: 11 },
  infoValue: { fontSize: 13, fontWeight: '600', marginTop: 2 },
  cardTitle: { fontSize: 16, fontWeight: '700', marginBottom: 12 },
  participantSection: { marginTop: 12 },
  participantLabel: { fontSize: 11, marginBottom: 8 },
  participantCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.03)',
    padding: 12,
    borderRadius: 12,
    marginBottom: 8,
  },
  participantAvatar: {
    width: 40,
    height: 40,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarText: { fontSize: 16, fontWeight: '700', color: '#fff' },
  participantInfo: { marginLeft: 12, flex: 1 },
  participantName: { fontSize: 14, fontWeight: '600' },
  participantRole: { fontSize: 11, marginTop: 2 },
  requestTopic: { fontSize: 15, fontWeight: '600', marginBottom: 8 },
  requestQuestion: { fontSize: 13, lineHeight: 20 },
  
  // Discussion tab styles
  messagesContainer: { gap: 16 },
  messageGroup: { gap: 8 },
  messageBubble: {
    borderRadius: 16,
    padding: 14,
  },
  requestBubble: {
    borderBottomLeftRadius: 4,
  },
  responseBubble: {
    borderBottomRightRadius: 4,
    marginLeft: 20,
  },
  messageHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
    gap: 6,
  },
  messageAuthor: { fontSize: 12, fontWeight: '700' },
  messageTime: { fontSize: 11, marginLeft: 'auto' },
  messageTopic: { fontSize: 14, fontWeight: '600', marginBottom: 6 },
  messageText: { fontSize: 13, lineHeight: 20 },
  recommendations: { marginTop: 12 },
  recommendationsTitle: { fontSize: 11, marginBottom: 6 },
  recommendationItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginTop: 4,
  },
  recommendationText: { fontSize: 12, flex: 1 },
  guidanceSection: { marginTop: 12, gap: 8 },
  guidanceItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 8,
  },
  guidanceText: { fontSize: 12, flex: 1, lineHeight: 18 },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    gap: 10,
    marginTop: 16,
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: 'rgba(0,0,0,0.1)',
  },
  responseInput: {
    flex: 1,
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: 20,
    borderWidth: 1,
    fontSize: 14,
    maxHeight: 100,
  },
  sendButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    justifyContent: 'center',
    alignItems: 'center',
  },
  
  // Outcome tab styles
  outcomeHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderRadius: 12,
    gap: 12,
  },
  outcomeTitle: { fontSize: 16, fontWeight: '700' },
  sectionHeader: { fontSize: 14, fontWeight: '700' },
  summaryText: { fontSize: 13, lineHeight: 22, marginTop: 8 },
  outcomeItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginTop: 10,
    gap: 10,
  },
  outcomeBullet: {
    width: 24,
    height: 24,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  bulletText: { fontSize: 11, fontWeight: '700', color: '#fff' },
  outcomeText: { fontSize: 13, flex: 1, lineHeight: 20 },
  guidanceCard: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    backgroundColor: 'rgba(0,0,0,0.03)',
    padding: 12,
    borderRadius: 12,
    marginTop: 10,
    gap: 10,
  },
  guidanceInfo: { flex: 1 },
  guidanceTitle: { fontSize: 13, fontWeight: '600' },
  guidanceDetail: { fontSize: 11, marginTop: 4 },
  confidenceSection: { marginTop: 20 },
  confidenceLabel: { fontSize: 11 },
  confidenceBar: {
    height: 6,
    backgroundColor: 'rgba(0,0,0,0.1)',
    borderRadius: 3,
    marginTop: 8,
    overflow: 'hidden',
  },
  confidenceFill: { height: '100%', borderRadius: 3 },
  confidenceValue: { fontSize: 14, fontWeight: '700', marginTop: 6 },
  emptyOutcome: { alignItems: 'center', paddingVertical: 60 },
  emptyTitle: { fontSize: 18, fontWeight: '700', marginTop: 16 },
  emptySubtitle: { fontSize: 14, marginTop: 8, textAlign: 'center' },
});
