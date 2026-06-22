import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, TextInput, useSafeAreaInsets } from 'react-native';
import { useRouter } from 'expo-router';
import { ArrowLeft, Plus, Edit3, CheckCircle, Star, MessageSquare, Clock, User, ThumbsUp, AlertCircle, TrendingUp, Bot, Filter, Search, Award, Shield, BookOpen, X, Check } from 'lucide-react-native';

export default function KnowledgeContributionsScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();

  // Core Contribution States
  const [totalContributions, setTotalContributions] = useState(1234);
  const [verifiedEntries, setVerifiedEntries] = useState(892);
  const [pendingCount, setPendingCount] = useState(45);
  
  const [contributions, setContributions] = useState([
    { id: 1, title: 'AWS Instance Types Guide', type: 'Technical', author: 'Sarah Chen', action: 'Created', time: '2h ago', status: 'verified', votes: 24, content: 'Comprehensive review of ec2 instance structures, compute-optimized instances for database indexing.' },
    { id: 2, title: 'Q4 Sales Comp Plan', type: 'Process', author: 'Mike Johnson', action: 'Updated', time: '5h ago', status: 'verified', votes: 18, content: 'Pricing overrides commission adjustments for enterprise customer acquisitions.' },
    { id: 3, title: 'Client Onboarding Checklist', type: 'Process', author: 'Emily Davis', action: 'Created', time: '1d ago', status: 'pending', votes: 0, content: 'Interactive check steps for client onboarding, including mentor syncs and Salesforce mappings.' },
    { id: 4, title: 'Security Protocol v2.3', type: 'Technical', author: 'James Wilson', action: 'Verified', time: '2d ago', status: 'verified', votes: 45, content: 'Compliance frameworks regarding SOC2 security audit check logs.' },
    { id: 5, title: 'API Error Handling Patterns', type: 'Technical', author: 'David Lee', action: 'Updated', time: '3d ago', status: 'verified', votes: 32, content: 'Centralized error formatting structures across all serverless endpoints.' }
  ]);

  const [topContributors, setTopContributors] = useState([
    { name: 'Sarah Chen', role: 'VP Engineering', contributions: 156, verified: 142, avatar: '#3B82F6' },
    { name: 'Mike Johnson', role: 'Sales Director', contributions: 134, verified: 128, avatar: '#10B981' },
    { name: 'James Wilson', role: 'Legal Counsel', contributions: 98, verified: 95, avatar: '#7C3AED' },
    { name: 'Emily Davis', role: 'Product Manager', contributions: 87, verified: 82, avatar: '#F59E0B' },
    { name: 'David Lee', role: 'Staff Engineer', contributions: 76, verified: 74, avatar: '#EC4899' }
  ]);

  // Form States
  const [showAddModal, setShowAddModal] = useState(false);
  const [contribTitle, setContribTitle] = useState('');
  const [contribType, setContribType] = useState('Technical');
  const [contribContent, setContribContent] = useState('');
  const [contribDept, setContribDept] = useState('Engineering');

  // Peer review states
  const [selectedContrib, setSelectedContrib] = useState<any>(null);

  // Manual Note submission
  const handleAddContribution = () => {
    if (!contribTitle.trim() || !contribContent.trim()) return;

    const newEntry = {
      id: Date.now(),
      title: contribTitle,
      type: contribType,
      author: 'Corporate User',
      action: 'Created',
      time: 'Just now',
      status: 'pending',
      votes: 0,
      content: contribContent,
    };

    setContributions([newEntry, ...contributions]);
    setTotalContributions(c => c + 1);
    setPendingCount(p => p + 1);

    // Reset Form
    setShowAddModal(false);
    setContribTitle('');
    setContribContent('');
  };

  // Peer review verify
  const approveAndVerifyNode = (id: number) => {
    setContributions(contributions.map(c => 
      c.id === id ? { ...c, status: 'verified' as const } : c
    ));
    setVerifiedEntries(v => v + 1);
    setPendingCount(p => p - 1);
    setSelectedContrib(null);
  };

  const rejectContribution = (id: number) => {
    setContributions(contributions.filter(c => c.id !== id));
    setTotalContributions(c => c - 1);
    setPendingCount(p => p - 1);
    setSelectedContrib(null);
  };

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
          <View style={[styles.statCard, { backgroundColor: '#1E293B' }]}>
            <Text style={styles.statValue}>{totalContributions}</Text>
            <Text style={styles.statLabel}>Total</Text>
          </View>
          <View style={[styles.statCard, { backgroundColor: '#1E293B' }]}>
            <Text style={styles.statValue}>{verifiedEntries}</Text>
            <Text style={styles.statLabel}>Verified</Text>
          </View>
          <View style={[styles.statCard, { backgroundColor: '#1E293B' }]}>
            <Text style={styles.statValue}>{pendingCount}</Text>
            <Text style={styles.statLabel}>Pending</Text>
          </View>
          <View style={[styles.statCard, { backgroundColor: '#1E293B' }]}>
            <Text style={styles.statValue}>89%</Text>
            <Text style={styles.statLabel}>Accuracy</Text>
          </View>
        </View>

        {/* Primary Action */}
        <TouchableOpacity 
          style={[styles.primaryButton, { backgroundColor: '#3B82F6' }]}
          onPress={() => setShowAddModal(true)}
        >
          <Plus size={20} color="#FFFFFF" />
          <Text style={styles.primaryButtonText}>Add Knowledge Note</Text>
        </TouchableOpacity>

        {/* Contributions Section */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Recent Contributions</Text>
            <TouchableOpacity style={styles.filterButton}>
              <Filter size={16} color="#9CA3AF" />
            </TouchableOpacity>
          </View>
          
          {contributions.map((contrib) => (
            <TouchableOpacity 
              key={contrib.id} 
              style={[styles.contribCard, { backgroundColor: '#1E293B' }]}
              onPress={() => setSelectedContrib(contrib)}
            >
              <View style={styles.contribHeader}>
                <View style={[styles.contribIcon, { backgroundColor: contrib.type === 'Technical' ? '#3B82F6' : '#10B981' }]}>
                  <BookOpen size={18} color="#FFFFFF" />
                </View>
                <View style={styles.contribInfo}>
                  <Text style={styles.contribTitle}>{contrib.title}</Text>
                  <View style={styles.contribMeta}>
                    <View style={[styles.typeBadge, { backgroundColor: contrib.type === 'Technical' ? '#3B82F620' : '#10B98120' }]}>
                      <Text style={[styles.typeText, { color: contrib.type === 'Technical' ? '#3B82F6' : '#10B981' }]}>{contrib.type}</Text>
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

        {/* Top Contributors Section */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Top Contributors</Text>
            <TouchableOpacity style={styles.filterButton}>
              <Award size={16} color="#9CA3AF" />
            </TouchableOpacity>
          </View>
          
          {topContributors.map((contributor, index) => (
            <View key={contributor.name} style={[styles.contributorCard, { backgroundColor: '#1E293B' }]}>
              <View style={[styles.contributorAvatar, { backgroundColor: contributor.avatar }]}>
                <Text style={styles.avatarText}>{contributor.name.charAt(0)}</Text>
              </View>
              <View style={styles.contributorInfo}>
                <View style={styles.contributorHeader}>
                  <Text style={styles.contributorName}>{contributor.name}</Text>
                  {index === 0 && <View style={[styles.crownBadge, { backgroundColor: '#F59E0B' }]}><Star size={12} color="#FFFFFF" /></View>}
                </View>
                <Text style={styles.contributorRole}>{contributor.role}</Text>
                <View style={styles.contributorStats}>
                  <Text style={styles.contribStat}>{contributor.contributions} contributions</Text>
                  <Text style={styles.contribDot}>•</Text>
                  <Text style={styles.contribStat}>{contributor.verified} verified</Text>
                </View>
              </View>
              <View style={styles.contributorScore}>
                <Text style={styles.scoreText}>{Math.round((contributor.verified / contributor.contributions) * 100)}%</Text>
              </View>
            </View>
          ))}
        </View>
      </ScrollView>

      {/* Add Modal */}
      {showAddModal && (
        <View style={styles.modalOverlay}>
          <View style={styles.modalCard}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Add Knowledge Note</Text>
              <TouchableOpacity onPress={() => setShowAddModal(false)}>
                <X size={20} color="#FFFFFF" />
              </TouchableOpacity>
            </View>
            
            <Text style={styles.inputLabel}>Title</Text>
            <TextInput
              style={styles.configInput}
              value={contribTitle}
              onChangeText={setContribTitle}
              placeholder="Enter contribution title..."
              placeholderTextColor="#6B7280"
            />

            <Text style={styles.inputLabel}>Type</Text>
            <View style={styles.typeButtonsRow}>
              {['Technical', 'Process'].map((type) => (
                <TouchableOpacity
                  key={type}
                  style={[styles.typeBtnOption, { backgroundColor: contribType === type ? '#3B82F6' : '#374151' }]}
                  onPress={() => setContribType(type)}
                >
                  <Text style={styles.typeBtnText}>{type}</Text>
                </TouchableOpacity>
              ))}
            </View>

            <Text style={styles.inputLabel}>Content</Text>
            <TextInput
              style={[styles.configInput, { height: 100, textAlignVertical: 'top' }]}
              value={contribContent}
              onChangeText={setContribContent}
              placeholder="Enter detailed content..."
              placeholderTextColor="#6B7280"
              multiline
            />

            <View style={styles.modalActions}>
              <TouchableOpacity 
                style={[styles.btnCancel, { backgroundColor: '#374151' }]}
                onPress={() => setShowAddModal(false)}
              >
                <Text style={styles.btnText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity 
                style={[styles.btnSave, { backgroundColor: '#3B82F6' }]}
                onPress={handleAddContribution}
              >
                <Text style={styles.btnText}>Submit</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      )}

      {/* Review Modal */}
      {selectedContrib && (
        <View style={styles.modalOverlay}>
          <View style={styles.modalCard}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Review Contribution</Text>
              <TouchableOpacity onPress={() => setSelectedContrib(null)}>
                <X size={20} color="#FFFFFF" />
              </TouchableOpacity>
            </View>
            
            <View style={styles.reviewContentCard}>
              <Text style={styles.reviewContentText}>{selectedContrib.content}</Text>
            </View>

            <View style={styles.modalActions}>
              <TouchableOpacity
                style={[styles.btnSave, { backgroundColor: '#EF4444' }]}
                onPress={() => rejectContribution(selectedContrib.id)}
              >
                <Text style={styles.btnText}>Reject & Delete</Text>
              </TouchableOpacity>

              {selectedContrib.status === 'pending' ? (
                <TouchableOpacity
                  style={[styles.btnSave, { backgroundColor: '#10B981' }]}
                  onPress={() => approveAndVerifyNode(selectedContrib.id)}
                >
                  <Text style={styles.btnText}>Approve & Verify</Text>
                </TouchableOpacity>
              ) : (
                <TouchableOpacity
                  style={[styles.btnSave, { backgroundColor: '#374151' }]}
                  onPress={() => setSelectedContrib(null)}
                >
                  <Text style={styles.btnText}>Close Viewer</Text>
                </TouchableOpacity>
              )}
            </View>
          </View>
        </View>
      )}
    </View>
  );
}

const styles = {
  header: { flexDirection: 'row', alignItems: 'center', padding: 16, backgroundColor: '#0F172A', gap: 12 },
  backButton: { padding: 4 },
  headerTitle: { flex: 1 },
  headerTitleText: { fontSize: 20, fontWeight: 'bold', color: '#FFFFFF' },
  headerSubtitle: { fontSize: 13, color: '#9CA3AF' },
  headerAddBtn: { width: 40, height: 40, borderRadius: 20, backgroundColor: '#3B82F620', justifyContent: 'center', alignItems: 'center' },
  content: { flex: 1, paddingHorizontal: 16 },
  statsRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 8, marginBottom: 20 },
  statCard: { width: '23.5%', padding: 12, borderRadius: 12, alignItems: 'center' },
  statValue: { fontSize: 16, fontWeight: 'bold', color: '#FFFFFF', marginTop: 6 },
  statLabel: { fontSize: 9, color: '#9CA3AF', marginTop: 2, textAlign: 'center' },
  primaryButton: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', padding: 14, borderRadius: 12, gap: 8, marginBottom: 24 },
  primaryButtonText: { fontSize: 14, fontWeight: 'bold', color: '#FFFFFF' },
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
  modalOverlay: { position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: '#000000BA', justifyContent: 'center', alignItems: 'center', padding: 16, zIndex: 999 },
  modalCard: { width: '100%', maxWidth: 400, backgroundColor: '#1E293B', borderRadius: 16, padding: 20, borderWidth: 1, borderColor: '#374151' },
  modalHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12, borderBottomWidth: 1, borderBottomColor: '#37415150', paddingBottom: 8 },
  modalTitle: { fontSize: 16, fontWeight: 'bold', color: '#FFFFFF' },
  modalSubtitle: { fontSize: 11, color: '#9CA3AF', marginTop: 2 },
  inputLabel: { fontSize: 11, fontWeight: '600', color: '#9CA3AF', marginTop: 12, marginBottom: 6 },
  configInput: { backgroundColor: '#0F172A', color: '#FFFFFF', paddingHorizontal: 12, paddingVertical: 10, borderRadius: 8, fontSize: 12, borderWidth: 1, borderColor: '#374151' },
  typeButtonsRow: { flexDirection: 'row', gap: 6, marginTop: 4 },
  typeBtnOption: { flex: 1, paddingVertical: 8, borderRadius: 8, alignItems: 'center' },
  typeBtnText: { color: '#FFFFFF', fontSize: 10, fontWeight: '600' },
  modalActions: { flexDirection: 'row', gap: 8, marginTop: 20, borderTopWidth: 1, borderTopColor: '#37415150', paddingTop: 14 },
  btnCancel: { flex: 1, paddingVertical: 10, borderRadius: 8, alignItems: 'center' },
  btnSave: { flex: 1, paddingVertical: 10, borderRadius: 8, alignItems: 'center' },
  btnText: { fontSize: 13, fontWeight: '600', color: '#FFFFFF' },
  reviewContentCard: { backgroundColor: '#0F172A', padding: 12, borderRadius: 8, marginTop: 10, borderWidth: 1, borderColor: '#374151' },
  reviewContentText: { color: '#D1D5DB', fontSize: 12, lineHeight: 18 }
};
