/**
 * @copyright Copyright (c) 2026 Kaytx & Antigravity Ecosystem ("kaytx")
 * @license MIT - See LICENSE file for full terms
 */

import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity, TextInput, Modal, ActivityIndicator, RefreshControl } from 'react-native';
import { useRouter } from 'expo-router';
import { BookOpen, GraduationCap, CheckCircle, Clock, AlertCircle, MessageSquare, Search, User, Target, ChevronRight, Play, Pause, Award, TrendingUp } from 'lucide-react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import apiClient from '@/lib/api-client';

export default function CompanyBrainOnboarding() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const [activeTab, setActiveTab] = useState('learning-path');
  const [searchQuery, setSearchQuery] = useState('');
  const [showAskModal, setShowAskModal] = useState(false);
  const [askQuestion, setAskQuestion] = useState('');
  const [isAsking, setIsAsking] = useState(false);
  const [loading, setLoading] = useState(true);

  const [onboardingProgress, setOnboardingProgress] = useState<any>({
    role: 'Product Manager',
    department: 'Product',
    progress: 0,
    modulesCompleted: 0,
    totalModules: 0,
    daysOnboarded: 0,
    estimatedCompletion: 0,
  });
  const [learningPath, setLearningPath] = useState<any[]>([]);
  const [commonQuestions, setCommonQuestions] = useState<any[]>([]);
  const [knowledgeGaps, setKnowledgeGaps] = useState<any[]>([]);
  const [mentor, setMentor] = useState<any>(null);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      setLoading(true);
      const [onboardingRes, insightsRes] = await Promise.all([
        apiClient.getOnboardingProgress({ organizationId: 'default' }),
        apiClient.getAnalyticsInsights({ organizationId: 'default' }),
      ]);

      if (onboardingRes?.success && onboardingRes?.data) {
        const data = onboardingRes.data;
        if (data.progress) setOnboardingProgress(data.progress);
        if (data.learningPath) setLearningPath(data.learningPath);
        if (data.mentor) setMentor(data.mentor);
      }

      if (insightsRes?.success && insightsRes?.data) {
        const data = insightsRes.data;
        if (data.knowledgeGaps) setKnowledgeGaps(data.knowledgeGaps);
        if (data.commonQuestions) setCommonQuestions(data.commonQuestions);
      }
    } catch (err) {
      console.error('Failed to load onboarding data:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleAskQuestion = async () => {
    if (!askQuestion.trim()) return;
    setIsAsking(true);
    try {
      await apiClient.searchKnowledge({ organizationId: 'default', query: askQuestion });
      setShowAskModal(false);
      setAskQuestion('');
    } catch (err) {
      console.error('Failed to search knowledge:', err);
    } finally {
      setIsAsking(false);
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle size={16} color="#10b981" />;
      case 'in_progress':
        return <Clock size={16} color="#f59e0b" />;
      default:
        return <AlertCircle size={16} color="#64748b" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return '#10b981';
      case 'in_progress':
        return '#f59e0b';
      default:
        return '#64748b';
    }
  };

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <ChevronRight size={24} color="#ffffff" style={{ transform: [{ rotate: '180deg' }] }} />
        </TouchableOpacity>
        <Text style={styles.title}>Onboarding Assistant</Text>
        <TouchableOpacity style={styles.askButton} onPress={() => setShowAskModal(true)}>
          <MessageSquare size={20} color="#ffffff" />
        </TouchableOpacity>
      </View>

      {/* Progress Overview */}
      <View style={styles.progressCard}>
        <View style={styles.progressHeader}>
          <View style={styles.progressInfo}>
            <Text style={styles.progressTitle}>{onboardingProgress.role}</Text>
            <Text style={styles.progressSubtitle}>{onboardingProgress.department} Department</Text>
          </View>
          <View style={styles.progressCircle}>
            <Text style={styles.progressPercent}>{onboardingProgress.progress}%</Text>
          </View>
        </View>
        <View style={styles.progressStats}>
          <View style={styles.stat}>
            <BookOpen size={16} color="#6366f1" />
            <Text style={styles.statText}>{onboardingProgress.modulesCompleted}/{onboardingProgress.totalModules} Modules</Text>
          </View>
          <View style={styles.stat}>
            <Clock size={16} color="#6366f1" />
            <Text style={styles.statText}>{onboardingProgress.daysOnboarded} Days</Text>
          </View>
          <View style={styles.stat}>
            <Target size={16} color="#6366f1" />
            <Text style={styles.statText}>{onboardingProgress.estimatedCompletion} Days to Complete</Text>
          </View>
        </View>
      </View>

      {/* Tabs */}
      <View style={styles.tabs}>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'learning-path' && styles.activeTab]}
          onPress={() => setActiveTab('learning-path')}
        >
          <GraduationCap size={18} color={activeTab === 'learning-path' ? '#6366f1' : '#64748b'} />
          <Text style={[styles.tabText, activeTab === 'learning-path' && styles.activeTabText]}>Learning Path</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'questions' && styles.activeTab]}
          onPress={() => setActiveTab('questions')}
        >
          <MessageSquare size={18} color={activeTab === 'questions' ? '#6366f1' : '#64748b'} />
          <Text style={[styles.tabText, activeTab === 'questions' && styles.activeTabText]}>Questions</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'gaps' && styles.activeTab]}
          onPress={() => setActiveTab('gaps')}
        >
          <AlertCircle size={18} color={activeTab === 'gaps' ? '#6366f1' : '#64748b'} />
          <Text style={[styles.tabText, activeTab === 'gaps' && styles.activeTabText]}>Knowledge Gaps</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'mentor' && styles.activeTab]}
          onPress={() => setActiveTab('mentor')}
        >
          <User size={18} color={activeTab === 'mentor' ? '#6366f1' : '#64748b'} />
          <Text style={[styles.tabText, activeTab === 'mentor' && styles.activeTabText]}>Mentor</Text>
        </TouchableOpacity>
      </View>

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={[styles.scrollContent, { paddingBottom: insets.bottom + 20 }]}
        refreshControl={<RefreshControl refreshing={loading} onRefresh={loadData} tintColor="#6366f1" />}
      >
        {activeTab === 'learning-path' && (
          <View style={styles.tabContent}>
            <Text style={styles.sectionTitle}>Your Learning Path</Text>
            <View style={styles.learningPathList}>
              {learningPath.map((item) => (
                <TouchableOpacity key={item.id} style={styles.learningPathItem}>
                  <View style={[styles.learningPathIcon, { backgroundColor: `${getStatusColor(item.status)}20` }]}>
                    {getStatusIcon(item.status)}
                  </View>
                  <View style={styles.learningPathInfo}>
                    <Text style={styles.learningPathTitle}>{item.title}</Text>
                    <View style={styles.learningPathMeta}>
                      <Text style={styles.learningPathDuration}>{item.duration}</Text>
                      <Text style={styles.learningPathSeparator}>•</Text>
                      <Text style={styles.learningPathModules}>{item.modules} modules</Text>
                    </View>
                  </View>
                  <View style={[styles.learningPathStatus, { borderColor: getStatusColor(item.status) }]}>
                    <Text style={[styles.learningPathStatusText, { color: getStatusColor(item.status) }]}>
                      {item.status.replace('_', ' ')}
                    </Text>
                  </View>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        )}

        {activeTab === 'questions' && (
          <View style={styles.tabContent}>
            <Text style={styles.sectionTitle}>Common Questions</Text>
            <View style={styles.questionsList}>
              {commonQuestions.map((question) => (
                <TouchableOpacity key={question.id} style={styles.questionItem}>
                  <View style={styles.questionIcon}>
                    <MessageSquare size={20} color="#6366f1" />
                  </View>
                  <View style={styles.questionInfo}>
                    <Text style={styles.questionText}>{question.question}</Text>
                    <View style={styles.questionMeta}>
                      <Text style={styles.questionCategory}>{question.category}</Text>
                      <Text style={styles.questionAsked}>Asked {question.asked} times</Text>
                    </View>
                  </View>
                  <ChevronRight size={20} color="#64748b" />
                </TouchableOpacity>
              ))}
            </View>
          </View>
        )}

        {activeTab === 'gaps' && (
          <View style={styles.tabContent}>
            <Text style={styles.sectionTitle}>Knowledge Gaps Identified</Text>
            <View style={styles.gapsList}>
              {knowledgeGaps.map((gap) => (
                <View key={gap.id} style={styles.gapItem}>
                  <View style={[styles.gapPriority, { backgroundColor: gap.priority === 'high' ? '#ef444420' : '#f59e0b20' }]}>
                    <AlertCircle size={16} color={gap.priority === 'high' ? '#ef4444' : '#f59e0b'} />
                  </View>
                  <View style={styles.gapInfo}>
                    <Text style={styles.gapArea}>{gap.area}</Text>
                    <Text style={styles.gapReason}>{gap.reason}</Text>
                  </View>
                  <TouchableOpacity style={styles.gapAction}>
                    <Text style={styles.gapActionText}>Learn</Text>
                  </TouchableOpacity>
                </View>
              ))}
            </View>
          </View>
        )}

        {activeTab === 'mentor' && mentor && (
          <View style={styles.tabContent}>
            <Text style={styles.sectionTitle}>Your Mentor</Text>
            <View style={styles.mentorCard}>
              <View style={styles.mentorAvatar}>
                <User size={40} color="#6366f1" />
              </View>
              <View style={styles.mentorInfo}>
                <Text style={styles.mentorName}>{mentor.name}</Text>
                <Text style={styles.mentorRole}>{mentor.role}</Text>
                <View style={styles.mentorMeta}>
                  <View style={styles.mentorAvailability}>
                    <CheckCircle size={12} color="#10b981" />
                    <Text style={styles.mentorAvailabilityText}>{mentor.availability}</Text>
                  </View>
                  <Text style={styles.mentorMeetings}>{mentor.meetings} meetings</Text>
                </View>
              </View>
            </View>
            <View style={styles.nextMeetingCard}>
              <Clock size={20} color="#6366f1" />
              <View style={styles.nextMeetingInfo}>
                <Text style={styles.nextMeetingTitle}>Next Meeting</Text>
                <Text style={styles.nextMeetingTime}>{mentor.nextMeeting}</Text>
              </View>
              <TouchableOpacity style={styles.scheduleButton}>
                <Text style={styles.scheduleButtonText}>Schedule</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.mentorActions}>
              <TouchableOpacity style={styles.mentorActionButton}>
                <MessageSquare size={20} color="#ffffff" />
                <Text style={styles.mentorActionText}>Message</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.mentorActionButton}>
                <BookOpen size={20} color="#ffffff" />
                <Text style={styles.mentorActionText}>Resources</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.mentorActionButton}>
                <Award size={20} color="#ffffff" />
                <Text style={styles.mentorActionText}>Progress</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      </ScrollView>

      {/* Ask Question Modal */}
      <Modal
        visible={showAskModal}
        animationType="slide"
        presentationStyle="pageSheet"
        onRequestClose={() => setShowAskModal(false)}
      >
        <View style={[styles.modalContainer, { paddingTop: insets.top }]}>
          <View style={styles.modalHeader}>
            <Text style={styles.modalTitle}>Ask Anything</Text>
            <TouchableOpacity onPress={() => setShowAskModal(false)}>
              <ChevronRight size={24} color="#ffffff" style={{ transform: [{ rotate: '180deg' }] }} />
            </TouchableOpacity>
          </View>
          <View style={styles.modalContent}>
            <View style={styles.askSection}>
              <Text style={styles.askLabel}>Your Question</Text>
              <TextInput
                style={styles.askInput}
                multiline
                numberOfLines={4}
                value={askQuestion}
                onChangeText={setAskQuestion}
                placeholder="Ask anything about the company, processes, tools..."
                placeholderTextColor="#64748b"
                textAlignVertical="top"
              />
            </View>
            <View style={styles.suggestedQuestions}>
              <Text style={styles.suggestedTitle}>Suggested Questions</Text>
              {commonQuestions.slice(0, 3).map((question) => (
                <TouchableOpacity
                  key={question.id}
                  style={styles.suggestedQuestion}
                  onPress={() => setAskQuestion(question.question)}
                >
                  <MessageSquare size={16} color="#6366f1" />
                  <Text style={styles.suggestedQuestionText}>{question.question}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
          <View style={[styles.modalFooter, { paddingBottom: insets.bottom + 20 }]}>
            <TouchableOpacity
              style={[styles.askSubmitButton, (!askQuestion.trim() || isAsking) && styles.askSubmitButtonDisabled]}
              onPress={handleAskQuestion}
              disabled={!askQuestion.trim() || isAsking}
            >
              {isAsking ? (
                <ActivityIndicator size="small" color="#ffffff" />
              ) : (
                <Text style={styles.askSubmitButtonText}>Ask Question</Text>
              )}
            </TouchableOpacity>
          </View>
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
  askButton: {
    backgroundColor: '#6366f1',
    padding: 10,
    borderRadius: 8,
  },
  progressCard: {
    backgroundColor: '#1e293b',
    borderRadius: 16,
    padding: 20,
    margin: 20,
    marginTop: 0,
  },
  progressHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  progressInfo: {
    flex: 1,
  },
  progressTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 4,
  },
  progressSubtitle: {
    fontSize: 14,
    color: '#94a3b8',
  },
  progressCircle: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#6366f120',
    borderWidth: 4,
    borderColor: '#6366f1',
    justifyContent: 'center',
    alignItems: 'center',
  },
  progressPercent: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#6366f1',
  },
  progressStats: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  stat: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  statText: {
    fontSize: 14,
    color: '#e2e8f0',
  },
  tabs: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#1e293b',
    gap: 8,
  },
  tab: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
  },
  activeTab: {
    backgroundColor: '#6366f120',
  },
  tabText: {
    fontSize: 14,
    color: '#64748b',
  },
  activeTabText: {
    color: '#6366f1',
    fontWeight: '600',
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: 20,
  },
  tabContent: {
    marginTop: 8,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#ffffff',
    marginBottom: 16,
  },
  learningPathList: {
    gap: 12,
  },
  learningPathItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1e293b',
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: '#334155',
  },
  learningPathIcon: {
    width: 40,
    height: 40,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  learningPathInfo: {
    flex: 1,
  },
  learningPathTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#ffffff',
    marginBottom: 4,
  },
  learningPathMeta: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  learningPathDuration: {
    fontSize: 12,
    color: '#94a3b8',
  },
  learningPathSeparator: {
    fontSize: 12,
    color: '#64748b',
    marginHorizontal: 4,
  },
  learningPathModules: {
    fontSize: 12,
    color: '#94a3b8',
  },
  learningPathStatus: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
    borderWidth: 1,
  },
  learningPathStatusText: {
    fontSize: 12,
    fontWeight: '600',
  },
  questionsList: {
    gap: 8,
  },
  questionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1e293b',
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: '#334155',
  },
  questionIcon: {
    width: 40,
    height: 40,
    borderRadius: 8,
    backgroundColor: '#6366f120',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  questionInfo: {
    flex: 1,
  },
  questionText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#ffffff',
    marginBottom: 4,
  },
  questionMeta: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  questionCategory: {
    fontSize: 12,
    color: '#6366f1',
    marginRight: 8,
  },
  questionAsked: {
    fontSize: 12,
    color: '#94a3b8',
  },
  gapsList: {
    gap: 12,
  },
  gapItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1e293b',
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: '#334155',
  },
  gapPriority: {
    width: 40,
    height: 40,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  gapInfo: {
    flex: 1,
  },
  gapArea: {
    fontSize: 16,
    fontWeight: '600',
    color: '#ffffff',
    marginBottom: 4,
  },
  gapReason: {
    fontSize: 14,
    color: '#94a3b8',
  },
  gapAction: {
    backgroundColor: '#6366f1',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
  },
  gapActionText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#ffffff',
  },
  mentorCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1e293b',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#334155',
  },
  mentorAvatar: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: '#6366f120',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  mentorInfo: {
    flex: 1,
  },
  mentorName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 4,
  },
  mentorRole: {
    fontSize: 14,
    color: '#94a3b8',
    marginBottom: 8,
  },
  mentorMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  mentorAvailability: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  mentorAvailabilityText: {
    fontSize: 12,
    color: '#10b981',
  },
  mentorMeetings: {
    fontSize: 12,
    color: '#94a3b8',
  },
  nextMeetingCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1e293b',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#334155',
  },
  nextMeetingInfo: {
    flex: 1,
    marginLeft: 12,
  },
  nextMeetingTitle: {
    fontSize: 14,
    color: '#94a3b8',
    marginBottom: 4,
  },
  nextMeetingTime: {
    fontSize: 16,
    fontWeight: '600',
    color: '#ffffff',
  },
  scheduleButton: {
    backgroundColor: '#6366f1',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
  },
  scheduleButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#ffffff',
  },
  mentorActions: {
    flexDirection: 'row',
    gap: 12,
  },
  mentorActionButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#1e293b',
    borderRadius: 12,
    padding: 16,
    gap: 8,
    borderWidth: 1,
    borderColor: '#334155',
  },
  mentorActionText: {
    fontSize: 14,
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
  askSection: {
    marginBottom: 24,
  },
  askLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#ffffff',
    marginBottom: 8,
  },
  askInput: {
    backgroundColor: '#1e293b',
    borderRadius: 12,
    padding: 16,
    color: '#ffffff',
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#334155',
    minHeight: 120,
  },
  suggestedQuestions: {
    backgroundColor: '#1e293b',
    borderRadius: 12,
    padding: 16,
  },
  suggestedTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#ffffff',
    marginBottom: 12,
  },
  suggestedQuestion: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#334155',
  },
  suggestedQuestionText: {
    fontSize: 14,
    color: '#e2e8f0',
    marginLeft: 12,
  },
  modalFooter: {
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderTopWidth: 1,
    borderTopColor: '#1e293b',
  },
  askSubmitButton: {
    backgroundColor: '#6366f1',
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  askSubmitButtonDisabled: {
    backgroundColor: '#334155',
  },
  askSubmitButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#ffffff',
  },
});
