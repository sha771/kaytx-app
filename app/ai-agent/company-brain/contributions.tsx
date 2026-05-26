import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, useSafeAreaInsets } from 'react-native';
import { useRouter } from 'expo-router';
import { ArrowLeft, Plus, Edit3, CheckCircle, Star, MessageSquare, Clock, User, ThumbsUp, AlertCircle, TrendingUp, Bot, Filter, Search, Award, Shield, BookOpen } from 'lucide-react-native';

export default function KnowledgeContributionsScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();

  const CONTRIBUTION_STATS = [
    { label: 'Total Contributions', value: '1,234', icon: Edit3, color: '#3B82F6' },
    { label: 'Verified Entries', value: '892', icon: CheckCircle, color: '#10B981' },
    { label: 'Pending Review', value: '45', icon: Clock, color: '#F59E0B' },
    { label: 'Contributors', value: '48', icon: User, color: '#7C3AED' },
  ];

  const RECENT_CONTRIBUTIONS = [
    { id: 1, title: 'AWS Instance Types Guide', type: 'Technical', author: 'Sarah Chen', action: 'Created', time: '2h ago', status: 'verified', votes: 24 },
    { id: 2, title: 'Q4 Sales Comp Plan', type: 'Process', author: 'Mike Johnson', action: 'Updated', time: '5h ago', status: 'verified', votes: 18 },
    { id: 3, title: 'Client Onboarding Checklist', type: 'Process', author: 'Emily Davis', action: 'Created', time: '1d ago', status: 'pending', votes: 0 },
    { id: 4, title: 'Security Protocol v2.3', type: 'Technical', author: 'James Wilson', action: 'Verified', time: '2d ago', status: 'verified', votes: 45 },
    { id: 5, title: 'API Error Handling Patterns', type: 'Technical', author: 'David Lee', action: 'Updated', time: '3d ago', status: 'verified', votes: 32 },
  ];

  const TOP_CONTRIBUTORS = [
    { name: 'Sarah Chen', role: 'VP Engineering', contributions: 156, verified: 142, avatar: '#3B82F6' },
    { name: 'Mike Johnson', role: 'Sales Director', contributions: 134, verified: 128, avatar: '#10B981' },
    { name: 'James Wilson', role: 'Legal Counsel', contributions: 98, verified: 95, avatar: '#7C3AED' },
    { name: 'Emily Davis', role: 'Product Manager', contributions: 87, verified: 82, avatar: '#F59E0B' },
    { name: 'David Lee', role: 'Staff Engineer', contributions: 76, verified: 74, avatar: '#EC4899' },
  ];

  const EXPERT_VALIDATIONS = [
    { knowledge: 'AWS Architecture', expert: 'Sarah Chen', validated: '2 days ago', status: 'valid', accuracy: 98 },
    { knowledge: 'Legal Contracts', expert: 'James Wilson', validated: '1 week ago', status: 'valid', accuracy: 99 },
    { knowledge: 'Enterprise Sales', expert: 'Mike Johnson', validated: '3 days ago', status: 'valid', accuracy: 96 },
    { knowledge: 'Product Roadmap', expert: 'Emily Davis', validated: '5 days ago', status: 'review', accuracy: 94 },
  ];

  const KNOWLEDGE_SUGGESTIONS = [
    { title: 'Add pricing tier comparison', category: 'Sales', votes: 12, status: 'pending' },
    { title: 'Update Q3 metrics documentation', category: 'Analytics', votes: 8, status: 'in-progress' },
    { title: 'Add mobile app troubleshooting', category: 'Technical', votes: 6, status: 'pending' },
    { title: 'Clarify refund escalation process', category: 'Operations', votes: 15, status: 'approved' },
  ];

  return (
    <View style={{ flex: 1, backgroundColor: '#0F172A' }}>
      {/* Header */}
      <View style={[styles.header, { paddingTop: insets.top + 8 }]}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <ArrowLeft size={24} color="#FFFFFF" />
        </TouchableOpacity>
        <View style={styles.headerTitle}>
          <Text style={styles.headerTitleText}>Knowledge Contributions</Text>
          <Text style={styles.headerSubtitle}>Manual notes, peer review, and expert validation</Text>
        </View>
        <TouchableOpacity style={styles.addButton}>
          <Plus size={20} color="#FFFFFF" />
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Contribution Stats */}
        <View style={styles.statsRow}>
          {CONTRIBUTION_STATS.map((stat, index) => (
            <View key={index} style={[styles.statCard, { backgroundColor: '#1E293B' }]}>
              <stat.icon size={18} color={stat.color} />
              <Text style={styles.statValue}>{stat.value}</Text>
              <Text style={styles.statLabel}>{stat.label}</Text>
            </View>
          ))}
        </View>

        {/* Add Contribution Button */}
        <TouchableOpacity style={[styles.primaryButton, { backgroundColor: '#3B82F6' }]}>
          <Plus size={20} color="#FFFFFF" />
          <Text style={styles.primaryButtonText}>Add New Knowledge</Text>
        </TouchableOpacity>

        {/* Recent Contributions */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Recent Contributions</Text>
            <TouchableOpacity>
              <Filter size={18} color="#6B7280" />
            </TouchableOpacity>
          </View>
          {RECENT_CONTRIBUTIONS.map((contrib, index) => (
            <TouchableOpacity key={contrib.id} style={[styles.contribCard, { backgroundColor: '#1E293B' }]}>
              <View style={styles.contribHeader}>
                <View style={[styles.contribIcon, { backgroundColor: contrib.status === 'verified' ? '#10B98120' : '#F59E0B20' }]}>
                  {contrib.status === 'verified' ? (
                    <CheckCircle size={18} color="#10B981" />
                  ) : (
                    <Clock size={18} color="#F59E0B" />
                  )}
                </View>
                <View style={styles.contribInfo}>
                  <Text style={styles.contribTitle}>{contrib.title}</Text>
                  <View style={styles.contribMeta}>
                    <View style={[styles.typeBadge, { backgroundColor: '#3B82F620' }]}>
                      <Text style={styles.typeText}>{contrib.type}</Text>
                    </View>
                    <Text style={styles.contribAuthor}>{contrib.author}</Text>
                    <Text style={styles.contribDot}>•</Text>
                    <Text style={styles.contribAction}>{contrib.action}</Text>
                    <Text style={styles.contribDot}>•</Text>
                    <Text style={styles.contribTime}>{contrib.time}</Text>
                  </View>
                </View>
                <View style={styles.contribVotes}>
                  <ThumbsUp size={14} color="#6B7280" />
                  <Text style={styles.votesText}>{contrib.votes}</Text>
                </View>
              </View>
            </TouchableOpacity>
          ))}
        </View>

        {/* Top Contributors */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Top Contributors</Text>
            <TouchableOpacity>
              <Award size={18} color="#F59E0B" />
            </TouchableOpacity>
          </View>
          {TOP_CONTRIBUTORS.map((person, index) => (
            <View key={index} style={[styles.contributorCard, { backgroundColor: '#1E293B' }]}>
              <View style={[styles.contributorAvatar, { backgroundColor: person.avatar }]}>
                <Text style={styles.avatarText}>{person.name[0]}</Text>
              </View>
              <View style={styles.contributorInfo}>
                <View style={styles.contributorHeader}>
                  <Text style={styles.contributorName}>{person.name}</Text>
                  {index === 0 && (
                    <View style={[styles.crownBadge, { backgroundColor: '#F59E0B20' }]}>
                      <Award size={12} color="#F59E0B" />
                    </View>
                  )}
                </View>
                <Text style={styles.contributorRole}>{person.role}</Text>
                <View style={styles.contributorStats}>
                  <Text style={styles.contribStat}>{person.contributions} contributions</Text>
                  <Text style={styles.contribDot}>•</Text>
                  <Text style={styles.contribStat}>{person.verified} verified</Text>
                </View>
              </View>
              <View style={styles.contributorScore}>
                <Star size={16} color="#F59E0B" fill="#F59E0B" />
                <Text style={styles.scoreText}>{Math.round((person.verified / person.contributions) * 100)}%</Text>
              </View>
            </View>
          ))}
        </View>

        {/* Expert Validations */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Expert Validations</Text>
          {EXPERT_VALIDATIONS.map((validation, index) => (
            <View key={index} style={[styles.validationCard, { backgroundColor: '#1E293B' }]}>
              <View style={[styles.validationIcon, { backgroundColor: validation.status === 'valid' ? '#10B98120' : '#F59E0B20' }]}>
                <Shield size={18} color={validation.status === 'valid' ? '#10B981' : '#F59E0B'} />
              </View>
              <View style={styles.validationInfo}>
                <Text style={styles.validationKnowledge}>{validation.knowledge}</Text>
                <Text style={styles.validationExpert}>Validated by {validation.expert}</Text>
                <Text style={styles.validationDate}>{validation.validated}</Text>
              </View>
              <View style={styles.accuracyBadge}>
                <Text style={styles.accuracyValue}>{validation.accuracy}%</Text>
                <Text style={styles.accuracyLabel}>accuracy</Text>
              </View>
            </View>
          ))}
        </View>

        {/* Knowledge Suggestions */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Knowledge Improvement Suggestions</Text>
          {KNOWLEDGE_SUGGESTIONS.map((suggestion, index) => (
            <View key={index} style={[styles.suggestionCard, { backgroundColor: '#1E293B' }]}>
              <View style={styles.suggestionInfo}>
                <Text style={styles.suggestionTitle}>{suggestion.title}</Text>
                <View style={styles.suggestionMeta}>
                  <Text style={styles.suggestionCategory}>{suggestion.category}</Text>
                  <View style={[styles.statusBadge, { 
                    backgroundColor: suggestion.status === 'approved' ? '#10B98120' : suggestion.status === 'in-progress' ? '#3B82F620' : '#F59E0B20'
                  }]}>
                    <AlertCircle size={10} color={suggestion.status === 'approved' ? '#10B981' : suggestion.status === 'in-progress' ? '#3B82F6' : '#F59E0B'} />
                    <Text style={[styles.statusText, { 
                      color: suggestion.status === 'approved' ? '#10B981' : suggestion.status === 'in-progress' ? '#3B82F6' : '#F59E0B'
                    }]}>{suggestion.status}</Text>
                  </View>
                </View>
              </View>
              <View style={styles.suggestionVotes}>
                <TrendingUp size={14} color="#10B981" />
                <Text style={styles.voteCount}>{suggestion.votes}</Text>
              </View>
            </View>
          ))}
        </View>

        {/* Contribution Guidelines */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Contribution Guidelines</Text>
          <View style={[styles.guideCard, { backgroundColor: '#1E293B' }]}>
            <View style={styles.guideItem}>
              <CheckCircle size={16} color="#10B981" />
              <Text style={styles.guideText}>Provide clear, actionable information</Text>
            </View>
            <View style={styles.guideItem}>
              <CheckCircle size={16} color="#10B981" />
              <Text style={styles.guideText}>Include source references when possible</Text>
            </View>
            <View style={styles.guideItem}>
              <CheckCircle size={16} color="#10B981" />
              <Text style={styles.guideText}>Use consistent formatting and terminology</Text>
            </View>
            <View style={styles.guideItem}>
              <CheckCircle size={16} color="#10B981" />
              <Text style={styles.guideText}>Tag appropriate categories and departments</Text>
            </View>
            <View style={styles.guideItem}>
              <CheckCircle size={16} color="#10B981" />
              <Text style={styles.guideText}>Review existing knowledge before adding duplicates</Text>
            </View>
          </View>
        </View>

        {/* Contributions AI Agents */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Contributions AI Agents</Text>
          <View style={styles.agentsRow}>
            {[
              { name: 'Content Reviewer', color: '#3B82F6' },
              { name: 'Quality Scorer', color: '#7C3AED' },
              { name: 'Duplicate Detector', color: '#F59E0B' },
              { name: 'Suggestion Engine', color: '#10B981' },
            ].map((agent, index) => (
              <View key={index} style={[styles.agentChip, { backgroundColor: agent.color + '20' }]}>
                <Bot size={14} color={agent.color} />
                <Text style={[styles.agentChipText, { color: agent.color }]}>{agent.name}</Text>
              </View>
            ))}
          </View>
        </View>

        <View style={{ height: 40 }} />
      </ScrollView>
    </View>
  );
}

const styles = {
  header: { flexDirection: 'row', alignItems: 'center', padding: 16, backgroundColor: '#0F172A', gap: 12 },
  backButton: { padding: 4 },
  headerTitle: { flex: 1 },
  headerTitleText: { fontSize: 20, fontWeight: 'bold', color: '#FFFFFF' },
  headerSubtitle: { fontSize: 13, color: '#9CA3AF' },
  addButton: { width: 40, height: 40, borderRadius: 20, backgroundColor: '#3B82F6', justifyContent: 'center', alignItems: 'center' },
  content: { flex: 1, paddingHorizontal: 16 },
  statsRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 8, marginBottom: 20 },
  statCard: { width: '48%', padding: 14, borderRadius: 12, alignItems: 'center' },
  statValue: { fontSize: 20, fontWeight: 'bold', color: '#FFFFFF', marginTop: 6 },
  statLabel: { fontSize: 11, color: '#9CA3AF', marginTop: 2, textAlign: 'center' },
  primaryButton: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', padding: 14, borderRadius: 12, gap: 8, marginBottom: 24 },
  primaryButtonText: { fontSize: 15, fontWeight: '600', color: '#FFFFFF' },
  section: { marginBottom: 24 },
  sectionHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 },
  sectionTitle: { fontSize: 16, fontWeight: '600', color: '#FFFFFF' },
  contribCard: { padding: 14, borderRadius: 12, marginBottom: 8 },
  contribHeader: { flexDirection: 'row', alignItems: 'flex-start' },
  contribIcon: { width: 36, height: 36, borderRadius: 10, justifyContent: 'center', alignItems: 'center' },
  contribInfo: { flex: 1, marginLeft: 12 },
  contribTitle: { fontSize: 14, fontWeight: '600', color: '#FFFFFF' },
  contribMeta: { flexDirection: 'row', alignItems: 'center', marginTop: 6, flexWrap: 'wrap', gap: 4 },
  typeBadge: { paddingHorizontal: 6, paddingVertical: 2, borderRadius: 4 },
  typeText: { fontSize: 10, color: '#3B82F6', fontWeight: '500' },
  contribAuthor: { fontSize: 11, color: '#9CA3AF' },
  contribDot: { fontSize: 11, color: '#6B7280' },
  contribAction: { fontSize: 11, color: '#9CA3AF' },
  contribTime: { fontSize: 11, color: '#6B7280' },
  contribVotes: { flexDirection: 'row', alignItems: 'center', gap: 4 },
  votesText: { fontSize: 12, color: '#6B7280' },
  contributorCard: { flexDirection: 'row', alignItems: 'center', padding: 12, borderRadius: 12, marginBottom: 8 },
  contributorAvatar: { width: 44, height: 44, borderRadius: 22, justifyContent: 'center', alignItems: 'center' },
  avatarText: { fontSize: 18, fontWeight: 'bold', color: '#FFFFFF' },
  contributorInfo: { flex: 1, marginLeft: 12 },
  contributorHeader: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  contributorName: { fontSize: 14, fontWeight: '600', color: '#FFFFFF' },
  crownBadge: { padding: 4, borderRadius: 6 },
  contributorRole: { fontSize: 12, color: '#9CA3AF' },
  contributorStats: { flexDirection: 'row', alignItems: 'center', gap: 4, marginTop: 4 },
  contribStat: { fontSize: 11, color: '#6B7280' },
  contributorScore: { alignItems: 'center' },
  scoreText: { fontSize: 14, fontWeight: 'bold', color: '#F59E0B', marginTop: 2 },
  validationCard: { flexDirection: 'row', alignItems: 'center', padding: 12, borderRadius: 10, marginBottom: 6 },
  validationIcon: { width: 40, height: 40, borderRadius: 10, justifyContent: 'center', alignItems: 'center' },
  validationInfo: { flex: 1, marginLeft: 12 },
  validationKnowledge: { fontSize: 14, fontWeight: '600', color: '#FFFFFF' },
  validationExpert: { fontSize: 12, color: '#9CA3AF', marginTop: 2 },
  validationDate: { fontSize: 11, color: '#6B7280', marginTop: 2 },
  accuracyBadge: { alignItems: 'center' },
  accuracyValue: { fontSize: 18, fontWeight: 'bold', color: '#10B981' },
  accuracyLabel: { fontSize: 10, color: '#6B7280' },
  suggestionCard: { flexDirection: 'row', alignItems: 'center', padding: 12, borderRadius: 10, marginBottom: 6 },
  suggestionInfo: { flex: 1 },
  suggestionTitle: { fontSize: 14, color: '#FFFFFF', fontWeight: '500' },
  suggestionMeta: { flexDirection: 'row', alignItems: 'center', gap: 8, marginTop: 6 },
  suggestionCategory: { fontSize: 12, color: '#9CA3AF' },
  statusBadge: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 8, paddingVertical: 2, borderRadius: 6, gap: 4 },
  statusText: { fontSize: 10, fontWeight: '600', textTransform: 'capitalize' },
  suggestionVotes: { flexDirection: 'row', alignItems: 'center', gap: 4 },
  voteCount: { fontSize: 14, fontWeight: '600', color: '#10B981' },
  guideCard: { padding: 16, borderRadius: 12 },
  guideItem: { flexDirection: 'row', alignItems: 'center', gap: 10, marginBottom: 10 },
  guideText: { fontSize: 13, color: '#D1D5DB', flex: 1 },
  agentsRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  agentChip: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 12, paddingVertical: 8, borderRadius: 20, gap: 6 },
  agentChipText: { fontSize: 12, fontWeight: '500' }
};