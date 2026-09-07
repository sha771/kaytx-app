/**
 * @copyright Copyright (c) 2026 Kaytx & Antigravity Ecosystem ("kaytx")
 * @license MIT - See LICENSE file for full terms
 */

import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity, Modal, TextInput, ActivityIndicator, RefreshControl } from 'react-native';
import { useRouter } from 'expo-router';
import { ChevronRight, AlertTriangle, User, Target, TrendingUp, FileText, Users, Calendar, Shield, CheckCircle, X, Download, Mail, Clock } from 'lucide-react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import apiClient from '@/lib/api-client';

export default function CompanyBrainSuccession() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const [selectedTab, setSelectedTab] = useState('risks');
  const [showTransferModal, setShowTransferModal] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  const [criticalKnowledgeHolders, setCriticalKnowledgeHolders] = useState<any[]>([]);
  const [departureRisks, setDepartureRisks] = useState<any[]>([]);
  const [knowledgeTransferPlans, setKnowledgeTransferPlans] = useState<any[]>([]);
  const [backupDocumentation, setBackupDocumentation] = useState<any[]>([]);
  const [recommendations, setRecommendations] = useState<any[]>([]);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      setLoading(true);
      const [expertsRes, insightsRes, healthRes] = await Promise.all([
        apiClient.getTeamExperts({ organizationId: 'default' }),
        apiClient.getAnalyticsInsights({ organizationId: 'default' }),
        apiClient.getKnowledgeHealth({ organizationId: 'default' }),
      ]);

      if (expertsRes?.success && expertsRes?.data) {
        const data = expertsRes.data;
        setCriticalKnowledgeHolders(data.holders || data.experts || data);
      }

      if (insightsRes?.success && insightsRes?.data) {
        const data = insightsRes.data;
        if (data.departureRisks) setDepartureRisks(data.departureRisks);
        if (data.knowledgeTransferPlans || data.transferPlans) setKnowledgeTransferPlans(data.knowledgeTransferPlans || data.transferPlans);
        if (data.recommendations) setRecommendations(data.recommendations);
      }

      if (healthRes?.success && healthRes?.data) {
        const data = healthRes.data;
        if (data.backupDocumentation || data.backupDocs) setBackupDocumentation(data.backupDocumentation || data.backupDocs);
        if (!healthRes?.data?.recommendations && data.recommendations) setRecommendations(data.recommendations);
      }
    } catch (err) {
      console.error('Failed to load succession data:', err);
    } finally {
      setLoading(false);
    }
  };

  const getRiskColor = (level: string) => {
    switch (level) {
      case 'high':
        return '#ef4444';
      case 'medium':
        return '#f59e0b';
      default:
        return '#10b981';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'complete':
        return '#10b981';
      case 'in_progress':
        return '#f59e0b';
      default:
        return '#64748b';
    }
  };

  const handleInitiateTransfer = (employee: any) => {
    setSelectedEmployee(employee);
    setShowTransferModal(true);
  };

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <ChevronRight size={24} color="#ffffff" style={{ transform: [{ rotate: '180deg' }] }} />
        </TouchableOpacity>
        <Text style={styles.title}>Succession Planning</Text>
        <TouchableOpacity style={styles.exportButton}>
          <Download size={20} color="#ffffff" />
        </TouchableOpacity>
      </View>

      {/* Tabs */}
      <ScrollView 
        horizontal 
        showsHorizontalScrollIndicator={false}
        style={styles.tabsScroll}
        contentContainerStyle={styles.tabsScrollContent}
      >
        <TouchableOpacity
          style={[styles.tab, selectedTab === 'risks' && styles.activeTab]}
          onPress={() => setSelectedTab('risks')}
        >
          <AlertTriangle size={18} color={selectedTab === 'risks' ? '#6366f1' : '#64748b'} />
          <Text style={[styles.tabText, selectedTab === 'risks' && styles.activeTabText]}>Risks</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tab, selectedTab === 'holders' && styles.activeTab]}
          onPress={() => setSelectedTab('holders')}
        >
          <User size={18} color={selectedTab === 'holders' ? '#6366f1' : '#64748b'} />
          <Text style={[styles.tabText, selectedTab === 'holders' && styles.activeTabText]}>Knowledge Holders</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tab, selectedTab === 'transfer' && styles.activeTab]}
          onPress={() => setSelectedTab('transfer')}
        >
          <Target size={18} color={selectedTab === 'transfer' ? '#6366f1' : '#64748b'} />
          <Text style={[styles.tabText, selectedTab === 'transfer' && styles.activeTabText]}>Transfer Plans</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tab, selectedTab === 'backup' && styles.activeTab]}
          onPress={() => setSelectedTab('backup')}
        >
          <FileText size={18} color={selectedTab === 'backup' ? '#6366f1' : '#64748b'} />
          <Text style={[styles.tabText, selectedTab === 'backup' && styles.activeTabText]}>Backup Docs</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tab, selectedTab === 'recommendations' && styles.activeTab]}
          onPress={() => setSelectedTab('recommendations')}
        >
          <TrendingUp size={18} color={selectedTab === 'recommendations' ? '#6366f1' : '#64748b'} />
          <Text style={[styles.tabText, selectedTab === 'recommendations' && styles.activeTabText]}>Recommendations</Text>
        </TouchableOpacity>
      </ScrollView>

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={[styles.scrollContent, { paddingBottom: insets.bottom + 20 }]}
        refreshControl={<RefreshControl refreshing={loading} onRefresh={loadData} tintColor="#6366f1" />}
      >
        {selectedTab === 'risks' && (
          <View style={styles.tabContent}>
            <View style={styles.riskSummary}>
              <View style={styles.riskSummaryItem}>
                <AlertTriangle size={24} color="#ef4444" />
                <View style={styles.riskSummaryInfo}>
                  <Text style={styles.riskSummaryValue}>{departureRisks.filter(r => r.riskScore > 80).length}</Text>
                  <Text style={styles.riskSummaryLabel}>High Risk</Text>
                </View>
              </View>
              <View style={styles.riskSummaryItem}>
                <AlertTriangle size={24} color="#f59e0b" />
                <View style={styles.riskSummaryInfo}>
                  <Text style={styles.riskSummaryValue}>{departureRisks.filter(r => r.riskScore > 60 && r.riskScore <= 80).length}</Text>
                  <Text style={styles.riskSummaryLabel}>Medium Risk</Text>
                </View>
              </View>
              <View style={styles.riskSummaryItem}>
                <Shield size={24} color="#10b981" />
                <View style={styles.riskSummaryInfo}>
                  <Text style={styles.riskSummaryValue}>{departureRisks.filter(r => r.riskScore <= 60).length}</Text>
                  <Text style={styles.riskSummaryLabel}>Protected</Text>
                </View>
              </View>
            </View>

            <Text style={styles.sectionTitle}>Departure Risk Assessment</Text>
            <View style={styles.risksList}>
              {departureRisks.map((risk) => (
                <TouchableOpacity key={risk.id} style={styles.riskCard}>
                  <View style={[styles.riskLevelBadge, { backgroundColor: `${getRiskColor(risk.riskScore > 80 ? 'high' : risk.riskScore > 60 ? 'medium' : 'low')}20` }]}>
                    <AlertTriangle size={20} color={getRiskColor(risk.riskScore > 80 ? 'high' : risk.riskScore > 60 ? 'medium' : 'low')} />
                  </View>
                  <View style={styles.riskInfo}>
                    <Text style={styles.riskEmployee}>{risk.employee}</Text>
                    <Text style={styles.riskRole}>{risk.role}</Text>
                    <View style={styles.riskFactors}>
                      {risk.riskFactors.map((factor: string, index: number) => (
                        <View key={index} style={styles.riskFactorBadge}>
                          <Text style={styles.riskFactorText}>{factor}</Text>
                        </View>
                      ))}
                    </View>
                  </View>
                  <View style={styles.riskScore}>
                    <Text style={styles.riskScoreValue}>{risk.riskScore}</Text>
                    <Text style={styles.riskScoreLabel}>Impact</Text>
                  </View>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        )}

        {selectedTab === 'holders' && (
          <View style={styles.tabContent}>
            <Text style={styles.sectionTitle}>Critical Knowledge Holders</Text>
            <View style={styles.holdersList}>
              {criticalKnowledgeHolders.map((holder) => (
                <TouchableOpacity key={holder.id} style={styles.holderCard}>
                  <View style={styles.holderAvatar}>
                    <User size={32} color="#6366f1" />
                  </View>
                  <View style={styles.holderInfo}>
                    <Text style={styles.holderName}>{holder.name}</Text>
                    <Text style={styles.holderRole}>{holder.role} • {holder.department}</Text>
                    <Text style={styles.holderTenure}>Tenure: {holder.tenure}</Text>
                    <View style={styles.holderAreas}>
                      {holder.knowledgeAreas.slice(0, 2).map((area: string, index: number) => (
                        <View key={index} style={styles.areaBadge}>
                          <Text style={styles.areaText}>{area}</Text>
                        </View>
                      ))}
                    </View>
                  </View>
                  <View style={styles.holderActions}>
                    <TouchableOpacity style={styles.transferButton} onPress={() => handleInitiateTransfer(holder)}>
                      <Target size={16} color="#ffffff" />
                      <Text style={styles.transferButtonText}>Plan Transfer</Text>
                    </TouchableOpacity>
                  </View>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        )}

        {selectedTab === 'transfer' && (
          <View style={styles.tabContent}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>Knowledge Transfer Plans</Text>
              <TouchableOpacity style={styles.newPlanButton}>
                <Target size={16} color="#ffffff" />
                <Text style={styles.newPlanButtonText}>New Plan</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.transferPlansList}>
              {knowledgeTransferPlans.map((plan) => (
                <TouchableOpacity key={plan.id} style={styles.transferPlanCard}>
                  <View style={styles.transferPlanHeader}>
                    <View style={styles.transferPlanParticipants}>
                      <View style={styles.transferParticipant}>
                        <User size={20} color="#6366f1" />
                        <Text style={styles.transferParticipantName}>{plan.from}</Text>
                      </View>
                      <ChevronRight size={16} color="#64748b" />
                      <View style={styles.transferParticipant}>
                        <User size={20} color="#10b981" />
                        <Text style={styles.transferParticipantName}>{plan.to}</Text>
                      </View>
                    </View>
                    <View style={[styles.transferStatus, { backgroundColor: `${getStatusColor(plan.status)}20` }]}>
                      <Text style={[styles.transferStatusText, { color: getStatusColor(plan.status) }]}>
                        {plan.status.replace('_', ' ')}
                      </Text>
                    </View>
                  </View>
                  <View style={styles.transferPlanProgress}>
                    <View style={styles.transferProgressBar}>
                      <View style={[styles.transferProgressFill, { width: `${plan.progress}%` }]} />
                    </View>
                    <Text style={styles.transferProgressText}>{plan.progress}% complete</Text>
                  </View>
                  <View style={styles.transferPlanDetails}>
                    <View style={styles.transferPlanDetail}>
                      <Calendar size={14} color="#94a3b8" />
                      <Text style={styles.transferPlanDetailText}>Start: {plan.startDate}</Text>
                    </View>
                    <View style={styles.transferPlanDetail}>
                      <Clock size={14} color="#94a3b8" />
                      <Text style={styles.transferPlanDetailText}>Target: {plan.targetDate}</Text>
                    </View>
                  </View>
                  <View style={styles.transferPlanAreas}>
                    {plan.areas.map((area: string, index: number) => (
                      <View key={index} style={styles.transferAreaBadge}>
                        <Text style={styles.transferAreaText}>{area}</Text>
                      </View>
                    ))}
                  </View>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        )}

        {selectedTab === 'backup' && (
          <View style={styles.tabContent}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>Backup Documentation</Text>
              <TouchableOpacity style={styles.newDocButton}>
                <FileText size={16} color="#ffffff" />
                <Text style={styles.newDocButtonText}>Generate</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.backupDocsList}>
              {backupDocumentation.map((doc) => (
                <TouchableOpacity key={doc.id} style={styles.backupDocCard}>
                  <View style={styles.backupDocIcon}>
                    <FileText size={24} color="#6366f1" />
                  </View>
                  <View style={styles.backupDocInfo}>
                    <Text style={styles.backupDocTitle}>{doc.title}</Text>
                    <Text style={styles.backupDocEmployee}>{doc.employee}</Text>
                    <View style={styles.backupDocMeta}>
                      <Text style={styles.backupDocStatus}>Status: {doc.status.replace('_', ' ')}</Text>
                      <Text style={styles.backupDocSeparator}>•</Text>
                      <Text style={styles.backupDocUpdated}>Updated: {doc.lastUpdated}</Text>
                    </View>
                  </View>
                  <View style={styles.backupDocCompleteness}>
                    <Text style={styles.backupDocCompletenessValue}>{doc.completeness}%</Text>
                    <Text style={styles.backupDocCompletenessLabel}>Complete</Text>
                  </View>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        )}

        {selectedTab === 'recommendations' && (
          <View style={styles.tabContent}>
            <Text style={styles.sectionTitle}>Action Recommendations</Text>
            <View style={styles.recommendationsList}>
              {recommendations.map((rec) => (
                <TouchableOpacity key={rec.id} style={styles.recommendationCard}>
                  <View style={[styles.recommendationPriority, { backgroundColor: rec.priority === 'high' ? '#ef444420' : '#f59e0b20' }]}>
                    <AlertTriangle size={16} color={rec.priority === 'high' ? '#ef4444' : '#f59e0b'} />
                  </View>
                  <View style={styles.recommendationInfo}>
                    <Text style={styles.recommendationDescription}>{rec.description}</Text>
                    <View style={styles.recommendationMeta}>
                      <View style={styles.recommendationMetaItem}>
                        <Shield size={14} color="#6366f1" />
                        <Text style={styles.recommendationMetaText}>{rec.impact}</Text>
                      </View>
                      <View style={styles.recommendationMetaItem}>
                        <Clock size={14} color="#6366f1" />
                        <Text style={styles.recommendationMetaText}>{rec.effort}</Text>
                      </View>
                    </View>
                  </View>
                  <TouchableOpacity style={styles.recommendationAction}>
                    <CheckCircle size={20} color="#10b981" />
                  </TouchableOpacity>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        )}

        {/* Quick Actions */}
        <View style={styles.actionsSection}>
          <TouchableOpacity style={styles.actionButton}>
            <Users size={20} color="#ffffff" />
            <Text style={styles.actionButtonText}>Review All Risks</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionButton}>
            <Target size={20} color="#ffffff" />
            <Text style={styles.actionButtonText}>Start Transfer Plan</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionButton}>
            <FileText size={20} color="#ffffff" />
            <Text style={styles.actionButtonText}>Generate Documentation</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      {/* Knowledge Transfer Modal */}
      <Modal
        visible={showTransferModal}
        animationType="slide"
        presentationStyle="pageSheet"
        onRequestClose={() => setShowTransferModal(false)}
      >
        <View style={[styles.modalContainer, { paddingTop: insets.top }]}>
          <View style={styles.modalHeader}>
            <Text style={styles.modalTitle}>Initiate Knowledge Transfer</Text>
            <TouchableOpacity onPress={() => setShowTransferModal(false)}>
              <X size={24} color="#ffffff" />
            </TouchableOpacity>
          </View>
          <ScrollView style={styles.modalContent}>
            {selectedEmployee && (
              <View style={styles.transferModalContent}>
                <View style={styles.transferModalEmployee}>
                  <User size={40} color="#6366f1" />
                  <View style={styles.transferModalEmployeeInfo}>
                    <Text style={styles.transferModalEmployeeName}>{selectedEmployee.name}</Text>
                    <Text style={styles.transferModalEmployeeRole}>{selectedEmployee.role}</Text>
                  </View>
                </View>
                <View style={styles.transferModalSection}>
                  <Text style={styles.transferModalLabel}>Knowledge Areas to Transfer</Text>
                  {selectedEmployee.knowledgeAreas.map((area: string, index: number) => (
                    <TouchableOpacity key={index} style={styles.transferModalArea}>
                      <CheckCircle size={16} color="#6366f1" />
                      <Text style={styles.transferModalAreaText}>{area}</Text>
                    </TouchableOpacity>
                  ))}
                </View>
                <View style={styles.transferModalSection}>
                  <Text style={styles.transferModalLabel}>Select Successor</Text>
                  <TouchableOpacity style={styles.transferModalInput}>
                    <Text style={styles.transferModalInputText}>Search for employee...</Text>
                  </TouchableOpacity>
                </View>
                <View style={styles.transferModalSection}>
                  <Text style={styles.transferModalLabel}>Timeline</Text>
                  <View style={styles.transferModalTimeline}>
                    <View style={styles.transferModalTimelineItem}>
                      <Text style={styles.transferModalTimelineLabel}>Start Date</Text>
                      <TouchableOpacity style={styles.transferModalDateInput}>
                        <Calendar size={16} color="#6366f1" />
                        <Text style={styles.transferModalDateText}>Select date</Text>
                      </TouchableOpacity>
                    </View>
                    <View style={styles.transferModalTimelineItem}>
                      <Text style={styles.transferModalTimelineLabel}>Target Date</Text>
                      <TouchableOpacity style={styles.transferModalDateInput}>
                        <Calendar size={16} color="#6366f1" />
                        <Text style={styles.transferModalDateText}>Select date</Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>
              </View>
            )}
          </ScrollView>
          <View style={[styles.modalFooter, { paddingBottom: insets.bottom + 20 }]}>
            <TouchableOpacity style={styles.cancelButton} onPress={() => setShowTransferModal(false)}>
              <Text style={styles.cancelButtonText}>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.confirmButton} onPress={() => { setShowTransferModal(false); }}>
              <Text style={styles.confirmButtonText}>Create Transfer Plan</Text>
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
  exportButton: {
    padding: 8,
    backgroundColor: '#1e293b',
    borderRadius: 8,
  },
  tabsScroll: {
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#1e293b',
  },
  tabsScrollContent: {
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
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  newPlanButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#6366f1',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
    gap: 8,
  },
  newPlanButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#ffffff',
  },
  newDocButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#6366f1',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
    gap: 8,
  },
  newDocButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#ffffff',
  },
  riskSummary: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: '#1e293b',
    borderRadius: 12,
    padding: 20,
    marginBottom: 24,
    borderWidth: 1,
    borderColor: '#334155',
  },
  riskSummaryItem: {
    alignItems: 'center',
  },
  riskSummaryInfo: {
    marginTop: 8,
  },
  riskSummaryValue: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  riskSummaryLabel: {
    fontSize: 12,
    color: '#94a3b8',
  },
  risksList: {
    gap: 12,
  },
  riskCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1e293b',
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: '#334155',
  },
  riskLevelBadge: {
    width: 40,
    height: 40,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  riskInfo: {
    flex: 1,
  },
  riskEmployee: {
    fontSize: 16,
    fontWeight: '600',
    color: '#ffffff',
    marginBottom: 4,
  },
  riskRole: {
    fontSize: 14,
    color: '#94a3b8',
    marginBottom: 8,
  },
  riskFactors: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
  },
  riskFactorBadge: {
    backgroundColor: '#6366f120',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  riskFactorText: {
    fontSize: 12,
    color: '#6366f1',
  },
  riskScore: {
    alignItems: 'center',
    marginLeft: 12,
  },
  riskScoreValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#f59e0b',
  },
  riskScoreLabel: {
    fontSize: 12,
    color: '#94a3b8',
  },
  holdersList: {
    gap: 12,
  },
  holderCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1e293b',
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: '#334155',
  },
  holderAvatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#6366f120',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  holderInfo: {
    flex: 1,
  },
  holderName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#ffffff',
    marginBottom: 4,
  },
  holderRole: {
    fontSize: 14,
    color: '#94a3b8',
    marginBottom: 4,
  },
  holderTenure: {
    fontSize: 12,
    color: '#64748b',
    marginBottom: 8,
  },
  holderAreas: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
  },
  areaBadge: {
    backgroundColor: '#6366f120',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  areaText: {
    fontSize: 12,
    color: '#6366f1',
  },
  holderActions: {
    marginLeft: 12,
  },
  transferButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#6366f1',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
    gap: 6,
  },
  transferButtonText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#ffffff',
  },
  transferPlansList: {
    gap: 12,
  },
  transferPlanCard: {
    backgroundColor: '#1e293b',
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: '#334155',
  },
  transferPlanHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  transferPlanParticipants: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  transferParticipant: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  transferParticipantName: {
    fontSize: 14,
    fontWeight: '500',
    color: '#ffffff',
  },
  transferStatus: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
  },
  transferStatusText: {
    fontSize: 12,
    fontWeight: '600',
  },
  transferPlanProgress: {
    marginBottom: 12,
  },
  transferProgressBar: {
    height: 6,
    backgroundColor: '#334155',
    borderRadius: 3,
    overflow: 'hidden',
    marginBottom: 4,
  },
  transferProgressFill: {
    height: '100%',
    backgroundColor: '#6366f1',
    borderRadius: 3,
  },
  transferProgressText: {
    fontSize: 12,
    color: '#94a3b8',
  },
  transferPlanDetails: {
    flexDirection: 'row',
    gap: 16,
    marginBottom: 12,
  },
  transferPlanDetail: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  transferPlanDetailText: {
    fontSize: 12,
    color: '#94a3b8',
  },
  transferPlanAreas: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
  },
  transferAreaBadge: {
    backgroundColor: '#6366f120',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  transferAreaText: {
    fontSize: 12,
    color: '#6366f1',
  },
  backupDocsList: {
    gap: 12,
  },
  backupDocCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1e293b',
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: '#334155',
  },
  backupDocIcon: {
    width: 48,
    height: 48,
    borderRadius: 8,
    backgroundColor: '#6366f120',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  backupDocInfo: {
    flex: 1,
  },
  backupDocTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#ffffff',
    marginBottom: 4,
  },
  backupDocEmployee: {
    fontSize: 14,
    color: '#94a3b8',
    marginBottom: 4,
  },
  backupDocMeta: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  backupDocStatus: {
    fontSize: 12,
    color: '#6366f1',
  },
  backupDocSeparator: {
    fontSize: 12,
    color: '#64748b',
    marginHorizontal: 4,
  },
  backupDocUpdated: {
    fontSize: 12,
    color: '#94a3b8',
  },
  backupDocCompleteness: {
    alignItems: 'center',
    marginLeft: 12,
  },
  backupDocCompletenessValue: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#10b981',
  },
  backupDocCompletenessLabel: {
    fontSize: 10,
    color: '#94a3b8',
  },
  recommendationsList: {
    gap: 12,
  },
  recommendationCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1e293b',
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: '#334155',
  },
  recommendationPriority: {
    width: 40,
    height: 40,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  recommendationInfo: {
    flex: 1,
  },
  recommendationDescription: {
    fontSize: 16,
    fontWeight: '500',
    color: '#ffffff',
    marginBottom: 8,
  },
  recommendationMeta: {
    flexDirection: 'row',
    gap: 12,
  },
  recommendationMetaItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  recommendationMetaText: {
    fontSize: 12,
    color: '#94a3b8',
  },
  recommendationAction: {
    padding: 8,
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
  transferModalContent: {
    gap: 24,
  },
  transferModalEmployee: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1e293b',
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: '#334155',
  },
  transferModalEmployeeInfo: {
    marginLeft: 12,
  },
  transferModalEmployeeName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 4,
  },
  transferModalEmployeeRole: {
    fontSize: 14,
    color: '#94a3b8',
  },
  transferModalSection: {
    gap: 12,
  },
  transferModalLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#ffffff',
    marginBottom: 8,
  },
  transferModalArea: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1e293b',
    borderRadius: 8,
    padding: 12,
    borderWidth: 1,
    borderColor: '#334155',
    gap: 12,
  },
  transferModalAreaText: {
    fontSize: 14,
    color: '#e2e8f0',
  },
  transferModalInput: {
    backgroundColor: '#1e293b',
    borderRadius: 8,
    padding: 12,
    borderWidth: 1,
    borderColor: '#334155',
  },
  transferModalInputText: {
    fontSize: 14,
    color: '#94a3b8',
  },
  transferModalTimeline: {
    gap: 12,
  },
  transferModalTimelineItem: {
    gap: 8,
  },
  transferModalTimelineLabel: {
    fontSize: 14,
    color: '#94a3b8',
  },
  transferModalDateInput: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1e293b',
    borderRadius: 8,
    padding: 12,
    borderWidth: 1,
    borderColor: '#334155',
    gap: 12,
  },
  transferModalDateText: {
    fontSize: 14,
    color: '#e2e8f0',
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
  confirmButton: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 8,
    backgroundColor: '#6366f1',
    alignItems: 'center',
  },
  confirmButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#ffffff',
  },
});
