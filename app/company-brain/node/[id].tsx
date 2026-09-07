/**
 * @copyright Copyright (c) 2026 Kaytx & Antigravity Ecosystem ("kaytx")
 * @license MIT - See LICENSE file for full terms
 */

import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity, Modal, TextInput, Alert, ActivityIndicator } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { X, Share2, Edit3, CheckCircle, Clock, FileText, User, Calendar, Tag, Link2, History, AlertTriangle, ThumbsUp, MessageSquare } from 'lucide-react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import apiClient from '../../../lib/api-client';

export default function KnowledgeNodeView() {
  const router = useRouter();
  const params = useLocalSearchParams();
  const insets = useSafeAreaInsets();
  const [showEditModal, setShowEditModal] = useState(false);
  const [showShareModal, setShowShareModal] = useState(false);
  const [editContent, setEditContent] = useState('');
  const [showVersionHistory, setShowVersionHistory] = useState(false);
  const [node, setNode] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (params.id) {
      loadNode(params.id as string);
    }
  }, [params.id]);

  const loadNode = async (id: string) => {
    try {
      setLoading(true);
      const response = await apiClient.getKnowledgeNode(id);
      if (response?.success && response?.data) setNode(response.data);
    } catch (err) { console.error('Failed to load node:', err); }
    finally { setLoading(false); }
  };

  const handleVerify = () => {
    Alert.alert('Verify Knowledge', 'Are you sure you want to verify this knowledge node?', [
      { text: 'Cancel', style: 'cancel' },
      { text: 'Verify', onPress: () => Alert.alert('Success', 'Knowledge node verified') }
    ]);
  };

  const handleImprove = () => {
    setEditContent(node?.content || '');
    setShowEditModal(true);
  };

  const handleSaveEdit = () => {
    Alert.alert('Success', 'Your improvement has been submitted for review');
    setShowEditModal(false);
  };

  const handleShare = () => {
    setShowShareModal(true);
  };

  if (loading) {
    return (
      <View style={[styles.container, styles.loadingContainer, { paddingTop: insets.top }]}>
        <ActivityIndicator size="large" color="#6366f1" />
        <Text style={styles.loadingText}>Loading knowledge node...</Text>
      </View>
    );
  }

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <X size={24} color="#ffffff" />
        </TouchableOpacity>
        <Text style={styles.title}>Knowledge Node</Text>
        <View style={styles.headerActions}>
          <TouchableOpacity style={styles.headerButton} onPress={handleShare}>
            <Share2 size={20} color="#ffffff" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.headerButton} onPress={handleImprove}>
            <Edit3 size={20} color="#ffffff" />
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView style={styles.scrollView} contentContainerStyle={[styles.scrollContent, { paddingBottom: insets.bottom + 20 }]}>
        {/* Title and Type */}
        <View style={styles.titleSection}>
          <View style={styles.typeBadge}>
            <Text style={styles.typeText}>{node?.type}</Text>
          </View>
          <Text style={styles.nodeTitle}>{node?.label || node?.title || 'Knowledge Node'}</Text>
          <View style={styles.metaRow}>
            <View style={styles.metaItem}>
              <User size={14} color="#94a3b8" />
              <Text style={styles.metaText}>{node?.author?.name}</Text>
            </View>
            <View style={styles.metaItem}>
              <Calendar size={14} color="#94a3b8" />
              <Text style={styles.metaText}>{node?.updatedAt}</Text>
            </View>
            <View style={styles.metaItem}>
              <FileText size={14} color="#94a3b8" />
              <Text style={styles.metaText}>{node?.viewCount} views</Text>
            </View>
          </View>
        </View>

        {/* Verification Status */}
        <View style={styles.verificationCard}>
          <CheckCircle size={20} color="#10b981" />
          <View style={styles.verificationInfo}>
            <Text style={styles.verificationStatus}>Verified</Text>
            <Text style={styles.verificationDetail}>
              Verified by {node?.verifiedBy?.name} • {node?.verifiedAt}
            </Text>
          </View>
          <TouchableOpacity style={styles.verifyButton} onPress={handleVerify}>
            <Text style={styles.verifyButtonText}>Re-verify</Text>
          </TouchableOpacity>
        </View>

        {/* Content */}
        <View style={styles.contentSection}>
          <Text style={styles.sectionTitle}>Content</Text>
          <View style={styles.contentCard}>
            <Text style={styles.contentText}>{node?.content}</Text>
          </View>
        </View>

        {/* Source Information */}
        {node?.sourceType && (
          <View style={styles.sourceSection}>
            <Text style={styles.sectionTitle}>Source</Text>
            <TouchableOpacity style={styles.sourceCard}>
              <FileText size={20} color="#6366f1" />
              <View style={styles.sourceInfo}>
                <Text style={styles.sourceType}>{node?.sourceType}</Text>
                <Text style={styles.sourceUrl}>{node?.sourceUrl}</Text>
              </View>
              <Link2 size={20} color="#64748b" />
            </TouchableOpacity>
          </View>
        )}

        {/* Tags */}
        <View style={styles.tagsSection}>
          <Text style={styles.sectionTitle}>Tags</Text>
          <View style={styles.tagsContainer}>
            {(node?.tags || []).map((tag: string, index: number) => (
              <View key={index} style={styles.tag}>
                <Tag size={12} color="#6366f1" />
                <Text style={styles.tagText}>{tag}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* Related Knowledge */}
        <View style={styles.relatedSection}>
          <Text style={styles.sectionTitle}>Related Knowledge</Text>
          <View style={styles.relatedList}>
            {(node?.relatedNodes || []).map((related: any) => (
              <TouchableOpacity
                key={related.id}
                style={styles.relatedItem}
                onPress={() => router.push(`/company-brain/node/${related.id}` as any)}
              >
                <FileText size={20} color="#6366f1" />
                <Text style={styles.relatedTitle}>{related.title}</Text>
                <Text style={styles.relatedType}>{related.type}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Version History */}
        <View style={styles.versionSection}>
          <View style={styles.versionHeader}>
            <Text style={styles.sectionTitle}>Version History</Text>
            <TouchableOpacity onPress={() => setShowVersionHistory(true)}>
              <Text style={styles.seeAll}>See All</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.versionList}>
            {(node?.versions || []).slice(0, 3).map((version: any) => (
              <View key={version.id} style={styles.versionItem}>
                <View style={styles.versionBadge}>
                  <Text style={styles.versionNumber}>v{version.version}</Text>
                </View>
                <View style={styles.versionInfo}>
                  <Text style={styles.versionAuthor}>{version.author}</Text>
                  <Text style={styles.versionDate}>{version.date}</Text>
                </View>
                <Text style={styles.versionChanges}>{version.changes}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* Actions */}
        <View style={styles.actionsSection}>
          <TouchableOpacity style={styles.actionButton} onPress={handleImprove}>
            <ThumbsUp size={20} color="#ffffff" />
            <Text style={styles.actionButtonText}>Improve</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionButton} onPress={handleVerify}>
            <CheckCircle size={20} color="#ffffff" />
            <Text style={styles.actionButtonText}>Verify</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionButton} onPress={handleShare}>
            <Share2 size={20} color="#ffffff" />
            <Text style={styles.actionButtonText}>Share</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      {/* Edit Modal */}
      <Modal
        visible={showEditModal}
        animationType="slide"
        presentationStyle="pageSheet"
        onRequestClose={() => setShowEditModal(false)}
      >
        <View style={[styles.modalContainer, { paddingTop: insets.top }]}>
          <View style={styles.modalHeader}>
            <Text style={styles.modalTitle}>Improve Knowledge</Text>
            <TouchableOpacity onPress={() => setShowEditModal(false)}>
              <X size={24} color="#ffffff" />
            </TouchableOpacity>
          </View>
          <ScrollView style={styles.modalContent}>
            <View style={styles.editSection}>
              <Text style={styles.editLabel}>Your Improvement</Text>
              <TextInput
                style={styles.editInput}
                multiline
                numberOfLines={10}
                value={editContent}
                onChangeText={setEditContent}
                placeholder="Add your improvements..."
                placeholderTextColor="#64748b"
                textAlignVertical="top"
              />
            </View>
            <View style={styles.editSection}>
              <Text style={styles.editLabel}>Reason for Change</Text>
              <TextInput
                style={styles.editInput}
                placeholder="Explain why this improvement is needed..."
                placeholderTextColor="#64748b"
              />
            </View>
          </ScrollView>
          <View style={[styles.modalFooter, { paddingBottom: insets.bottom + 20 }]}>
            <TouchableOpacity style={styles.cancelButton} onPress={() => setShowEditModal(false)}>
              <Text style={styles.cancelButtonText}>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.saveButton} onPress={handleSaveEdit}>
              <Text style={styles.saveButtonText}>Submit for Review</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* Share Modal */}
      <Modal
        visible={showShareModal}
        animationType="slide"
        presentationStyle="pageSheet"
        onRequestClose={() => setShowShareModal(false)}
      >
        <View style={[styles.modalContainer, { paddingTop: insets.top }]}>
          <View style={styles.modalHeader}>
            <Text style={styles.modalTitle}>Share Knowledge</Text>
            <TouchableOpacity onPress={() => setShowShareModal(false)}>
              <X size={24} color="#ffffff" />
            </TouchableOpacity>
          </View>
          <ScrollView style={styles.modalContent}>
            <View style={styles.shareSection}>
              <Text style={styles.shareLabel}>Share with Team</Text>
              <TouchableOpacity style={styles.shareOption}>
                <MessageSquare size={20} color="#6366f1" />
                <Text style={styles.shareOptionText}>Share in Slack</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.shareOption}>
                <FileText size={20} color="#6366f1" />
                <Text style={styles.shareOptionText}>Copy Link</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.shareOption}>
                <User size={20} color="#6366f1" />
                <Text style={styles.shareOptionText}>Share with Specific Person</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.shareSection}>
              <Text style={styles.shareLabel}>Export</Text>
              <TouchableOpacity style={styles.shareOption}>
                <FileText size={20} color="#6366f1" />
                <Text style={styles.shareOptionText}>Export as PDF</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.shareOption}>
                <FileText size={20} color="#6366f1" />
                <Text style={styles.shareOptionText}>Export as Markdown</Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </View>
      </Modal>

      {/* Version History Modal */}
      <Modal
        visible={showVersionHistory}
        animationType="slide"
        presentationStyle="pageSheet"
        onRequestClose={() => setShowVersionHistory(false)}
      >
        <View style={[styles.modalContainer, { paddingTop: insets.top }]}>
          <View style={styles.modalHeader}>
            <Text style={styles.modalTitle}>Version History</Text>
            <TouchableOpacity onPress={() => setShowVersionHistory(false)}>
              <X size={24} color="#ffffff" />
            </TouchableOpacity>
          </View>
          <ScrollView style={styles.modalContent}>
            {(node?.versions || []).map((version: any) => (
              <View key={version.id} style={styles.fullVersionItem}>
                <View style={styles.fullVersionHeader}>
                  <View style={styles.versionBadge}>
                    <Text style={styles.versionNumber}>v{version.version}</Text>
                  </View>
                  <View style={styles.versionInfo}>
                    <Text style={styles.versionAuthor}>{version.author}</Text>
                    <Text style={styles.versionDate}>{version.date}</Text>
                  </View>
                </View>
                <Text style={styles.fullVersionChanges}>{version.changes}</Text>
                <TouchableOpacity style={styles.restoreButton}>
                  <Text style={styles.restoreButtonText}>Restore This Version</Text>
                </TouchableOpacity>
              </View>
            ))}
          </ScrollView>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0f172a',
  },
  loadingContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 12,
    fontSize: 16,
    color: '#94a3b8',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#1e293b',
  },
  backButton: {
    padding: 8,
  },
  title: {
    fontSize: 20,
    fontWeight: '600',
    color: '#ffffff',
  },
  headerActions: {
    flexDirection: 'row',
    gap: 8,
  },
  headerButton: {
    padding: 8,
    backgroundColor: '#1e293b',
    borderRadius: 8,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: 20,
  },
  titleSection: {
    marginBottom: 20,
  },
  typeBadge: {
    alignSelf: 'flex-start',
    backgroundColor: '#6366f120',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
    marginBottom: 12,
  },
  typeText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#6366f1',
    textTransform: 'uppercase',
  },
  nodeTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 12,
  },
  metaRow: {
    flexDirection: 'row',
    gap: 16,
  },
  metaItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  metaText: {
    fontSize: 14,
    color: '#94a3b8',
  },
  verificationCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#10b98110',
    borderRadius: 12,
    padding: 16,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#10b98130',
  },
  verificationInfo: {
    flex: 1,
    marginLeft: 12,
  },
  verificationStatus: {
    fontSize: 16,
    fontWeight: '600',
    color: '#10b981',
    marginBottom: 4,
  },
  verificationDetail: {
    fontSize: 14,
    color: '#94a3b8',
  },
  verifyButton: {
    backgroundColor: '#10b981',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
  },
  verifyButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#ffffff',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#ffffff',
    marginBottom: 12,
  },
  contentSection: {
    marginBottom: 24,
  },
  contentCard: {
    backgroundColor: '#1e293b',
    borderRadius: 12,
    padding: 20,
    borderWidth: 1,
    borderColor: '#334155',
  },
  contentText: {
    fontSize: 16,
    color: '#e2e8f0',
    lineHeight: 24,
  },
  sourceSection: {
    marginBottom: 24,
  },
  sourceCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1e293b',
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: '#334155',
  },
  sourceInfo: {
    flex: 1,
    marginLeft: 12,
  },
  sourceType: {
    fontSize: 16,
    fontWeight: '600',
    color: '#ffffff',
    marginBottom: 4,
  },
  sourceUrl: {
    fontSize: 14,
    color: '#6366f1',
  },
  tagsSection: {
    marginBottom: 24,
  },
  tagsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  tag: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#6366f120',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
    gap: 6,
  },
  tagText: {
    fontSize: 14,
    color: '#6366f1',
  },
  relatedSection: {
    marginBottom: 24,
  },
  relatedList: {
    gap: 8,
  },
  relatedItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1e293b',
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: '#334155',
  },
  relatedTitle: {
    flex: 1,
    fontSize: 16,
    fontWeight: '500',
    color: '#ffffff',
    marginLeft: 12,
  },
  relatedType: {
    fontSize: 12,
    color: '#94a3b8',
  },
  versionSection: {
    marginBottom: 24,
  },
  versionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  seeAll: {
    fontSize: 14,
    color: '#6366f1',
    fontWeight: '500',
  },
  versionList: {
    gap: 8,
  },
  versionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1e293b',
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: '#334155',
  },
  versionBadge: {
    backgroundColor: '#6366f120',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  versionNumber: {
    fontSize: 12,
    fontWeight: '600',
    color: '#6366f1',
  },
  versionInfo: {
    flex: 1,
    marginLeft: 12,
  },
  versionAuthor: {
    fontSize: 14,
    fontWeight: '500',
    color: '#ffffff',
  },
  versionDate: {
    fontSize: 12,
    color: '#94a3b8',
  },
  versionChanges: {
    fontSize: 14,
    color: '#94a3b8',
    marginLeft: 12,
  },
  actionsSection: {
    flexDirection: 'row',
    gap: 12,
  },
  actionButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#6366f1',
    borderRadius: 12,
    padding: 16,
    gap: 8,
  },
  actionButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#ffffff',
  },
  modalContainer: {
    flex: 1,
    backgroundColor: '#0f172a',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#1e293b',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#ffffff',
  },
  modalContent: {
    flex: 1,
    padding: 20,
  },
  editSection: {
    marginBottom: 20,
  },
  editLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#ffffff',
    marginBottom: 8,
  },
  editInput: {
    backgroundColor: '#1e293b',
    borderRadius: 12,
    padding: 16,
    color: '#ffffff',
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#334155',
    minHeight: 120,
  },
  modalFooter: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderTopWidth: 1,
    borderTopColor: '#1e293b',
    gap: 12,
  },
  cancelButton: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#334155',
    alignItems: 'center',
  },
  cancelButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#94a3b8',
  },
  saveButton: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 8,
    backgroundColor: '#6366f1',
    alignItems: 'center',
  },
  saveButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#ffffff',
  },
  shareSection: {
    marginBottom: 24,
  },
  shareLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#ffffff',
    marginBottom: 12,
  },
  shareOption: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1e293b',
    borderRadius: 12,
    padding: 16,
    marginBottom: 8,
    gap: 12,
  },
  shareOptionText: {
    fontSize: 16,
    color: '#ffffff',
  },
  fullVersionItem: {
    backgroundColor: '#1e293b',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#334155',
  },
  fullVersionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  fullVersionChanges: {
    fontSize: 14,
    color: '#94a3b8',
    marginBottom: 12,
  },
  restoreButton: {
    backgroundColor: '#6366f1',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  restoreButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#ffffff',
  },
});
