/**
 * @copyright Copyright (c) 2026 Kaytx & Antigravity Ecosystem ("kaytx")
 * @license MIT - See LICENSE file for full terms
 */

import React, { useState } from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity, Modal } from 'react-native';
import { useRouter } from 'expo-router';
import { ChevronRight, Users, AlertTriangle, TrendingUp, Search, Filter, User, Award, Target, BookOpen, Activity, Shield, CheckCircle, X } from 'lucide-react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function CompanyBrainTeam() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const [selectedDepartment, setSelectedDepartment] = useState('all');
  const [showFilterModal, setShowFilterModal] = useState(false);

  const departments = [
    { id: 'all', name: 'All Departments' },
    { id: 'product', name: 'Product' },
    { id: 'engineering', name: 'Engineering' },
    { id: 'sales', name: 'Sales' },
    { id: 'marketing', name: 'Marketing' },
    { id: 'hr', name: 'HR' },
  ];

  const departmentStats = [
    { id: 'product', name: 'Product', coverage: 85, experts: 12, atRisk: 2, contributions: 156 },
    { id: 'engineering', name: 'Engineering', coverage: 92, experts: 18, atRisk: 1, contributions: 234 },
    { id: 'sales', name: 'Sales', coverage: 78, experts: 8, atRisk: 4, contributions: 98 },
    { id: 'marketing', name: 'Marketing', coverage: 71, experts: 6, atRisk: 5, contributions: 87 },
    { id: 'hr', name: 'HR', coverage: 88, experts: 4, atRisk: 1, contributions: 65 },
  ];

  const experts = [
    { id: 1, name: 'Sarah M.', role: 'Senior Product Manager', department: 'Product', expertise: ['Product Strategy', 'Roadmap Planning', 'Stakeholder Management'], contributionScore: 95 },
    { id: 2, name: 'John D.', role: 'Tech Lead', department: 'Engineering', expertise: ['Architecture', 'API Design', 'Team Leadership'], contributionScore: 92 },
    { id: 3, name: 'Emily R.', role: 'Marketing Director', department: 'Marketing', expertise: ['Brand Strategy', 'Campaign Management', 'Analytics'], contributionScore: 88 },
    { id: 4, name: 'Mike T.', role: 'Sales Manager', department: 'Sales', expertise: ['Enterprise Sales', 'Negotiation', 'Client Relations'], contributionScore: 85 },
  ];

  const atRiskKnowledge = [
    { id: 1, area: 'Legacy System Architecture', holder: 'John D.', riskLevel: 'high', reason: 'Single point of failure', impact: 'Critical' },
    { id: 2, area: 'Key Client Relationships', holder: 'Mike T.', riskLevel: 'high', reason: 'No documented backup', impact: 'High' },
    { id: 3, area: 'Product Launch Process', holder: 'Sarah M.', riskLevel: 'medium', reason: 'Partial documentation', impact: 'Medium' },
    { id: 4, area: 'Marketing Analytics Setup', holder: 'Emily R.', riskLevel: 'medium', reason: 'Complex configuration', impact: 'Medium' },
  ];

  const recentContributions = [
    { id: 1, contributor: 'Sarah M.', type: 'process', title: 'Updated Q4 Launch Process', time: '2 hours ago', department: 'Product' },
    { id: 2, contributor: 'John D.', type: 'technical', title: 'API Authentication Guide', time: '5 hours ago', department: 'Engineering' },
    { id: 3, contributor: 'Emily R.', type: 'decision', title: 'Brand Strategy Decision', time: '1 day ago', department: 'Marketing' },
    { id: 4, contributor: 'Mike T.', type: 'client', title: 'Enterprise Client Notes', time: '2 days ago', department: 'Sales' },
  ];

  const searchActivity = [
    { id: 1, query: 'API authentication', count: 45, trend: 'up' },
    { id: 2, query: 'Client onboarding', count: 38, trend: 'up' },
    { id: 3, query: 'Expense policy', count: 32, trend: 'stable' },
    { id: 4, query: 'Product roadmap', count: 28, trend: 'down' },
  ];

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

  const getTrendIcon = (trend: string) => {
    return trend === 'up' ? TrendingUp : Activity;
  };

  const getTrendColor = (trend: string) => {
    switch (trend) {
      case 'up':
        return '#10b981';
      case 'down':
        return '#ef4444';
      default:
        return '#64748b';
    }
  };

  const filteredStats = selectedDepartment === 'all' 
    ? departmentStats 
    : departmentStats.filter(d => d.id === selectedDepartment);

  const filteredExperts = selectedDepartment === 'all'
    ? experts
    : experts.filter(e => e.department.toLowerCase() === selectedDepartment);

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <ChevronRight size={24} color="#ffffff" style={{ transform: [{ rotate: '180deg' }] }} />
        </TouchableOpacity>
        <Text style={styles.title}>Team Knowledge Dashboard</Text>
        <TouchableOpacity style={styles.filterButton} onPress={() => setShowFilterModal(true)}>
          <Filter size={20} color="#ffffff" />
        </TouchableOpacity>
      </View>

      {/* Department Selector */}
      <ScrollView 
        horizontal 
        showsHorizontalScrollIndicator={false}
        style={styles.departmentScroll}
        contentContainerStyle={styles.departmentScrollContent}
      >
        {departments.map((dept) => (
          <TouchableOpacity
            key={dept.id}
            style={[styles.departmentChip, selectedDepartment === dept.id && styles.departmentChipActive]}
            onPress={() => setSelectedDepartment(dept.id)}
          >
            <Text style={[styles.departmentChipText, selectedDepartment === dept.id && styles.departmentChipTextActive]}>
              {dept.name}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      <ScrollView style={styles.scrollView} contentContainerStyle={[styles.scrollContent, { paddingBottom: insets.bottom + 20 }]}>
        {/* Department Stats */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Knowledge Coverage by Department</Text>
          <View style={styles.statsGrid}>
            {filteredStats.map((stat) => (
              <View key={stat.id} style={styles.statCard}>
                <View style={styles.statHeader}>
                  <Text style={styles.statName}>{stat.name}</Text>
                  <View style={[styles.statBadge, { backgroundColor: stat.coverage >= 80 ? '#10b98120' : stat.coverage >= 60 ? '#f59e0b20' : '#ef444420' }]}>
                    <Text style={[styles.statPercent, { color: stat.coverage >= 80 ? '#10b981' : stat.coverage >= 60 ? '#f59e0b' : '#ef4444' }]}>
                      {stat.coverage}%
                    </Text>
                  </View>
                </View>
                <View style={styles.statMetrics}>
                  <View style={styles.statMetric}>
                    <Users size={14} color="#6366f1" />
                    <Text style={styles.statMetricText}>{stat.experts} Experts</Text>
                  </View>
                  <View style={styles.statMetric}>
                    <AlertTriangle size={14} color={stat.atRisk > 2 ? '#ef4444' : '#f59e0b'} />
                    <Text style={styles.statMetricText}>{stat.atRisk} At Risk</Text>
                  </View>
                  <View style={styles.statMetric}>
                    <BookOpen size={14} color="#6366f1" />
                    <Text style={styles.statMetricText}>{stat.contributions} Contributions</Text>
                  </View>
                </View>
              </View>
            ))}
          </View>
        </View>

        {/* Experts */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Knowledge Experts</Text>
          <View style={styles.expertsList}>
            {filteredExperts.map((expert) => (
              <TouchableOpacity key={expert.id} style={styles.expertCard}>
                <View style={styles.expertAvatar}>
                  <User size={32} color="#6366f1" />
                </View>
                <View style={styles.expertInfo}>
                  <Text style={styles.expertName}>{expert.name}</Text>
                  <Text style={styles.expertRole}>{expert.role}</Text>
                  <View style={styles.expertExpertise}>
                    {expert.expertise.slice(0, 2).map((skill, index) => (
                      <View key={index} style={styles.skillBadge}>
                        <Text style={styles.skillText}>{skill}</Text>
                      </View>
                    ))}
                  </View>
                </View>
                <View style={styles.expertScore}>
                  <Award size={16} color="#f59e0b" />
                  <Text style={styles.expertScoreText}>{expert.contributionScore}</Text>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* At-Risk Knowledge */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>At-Risk Knowledge</Text>
            <TouchableOpacity>
              <Text style={styles.seeAll}>View All</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.atRiskList}>
            {atRiskKnowledge.map((risk) => (
              <TouchableOpacity key={risk.id} style={styles.atRiskCard}>
                <View style={[styles.atRiskIcon, { backgroundColor: `${getRiskColor(risk.riskLevel)}20` }]}>
                  <AlertTriangle size={20} color={getRiskColor(risk.riskLevel)} />
                </View>
                <View style={styles.atRiskInfo}>
                  <Text style={styles.atRiskArea}>{risk.area}</Text>
                  <Text style={styles.atRiskHolder}>Holder: {risk.holder}</Text>
                  <Text style={styles.atRiskReason}>{risk.reason}</Text>
                </View>
                <View style={[styles.atRiskImpact, { backgroundColor: `${getRiskColor(risk.riskLevel)}20` }]}>
                  <Text style={[styles.atRiskImpactText, { color: getRiskColor(risk.riskLevel) }]}>
                    {risk.impact}
                  </Text>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Recent Contributions */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Recent Contributions</Text>
            <TouchableOpacity onPress={() => router.push('/company-brain/documents' as any)}>
              <Text style={styles.seeAll}>See All</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.contributionsList}>
            {recentContributions.map((contribution) => (
              <TouchableOpacity key={contribution.id} style={styles.contributionItem}>
                <View style={styles.contributionIcon}>
                  <BookOpen size={20} color="#6366f1" />
                </View>
                <View style={styles.contributionInfo}>
                  <Text style={styles.contributionTitle}>{contribution.title}</Text>
                  <View style={styles.contributionMeta}>
                    <Text style={styles.contributionAuthor}>{contribution.contributor}</Text>
                    <Text style={styles.contributionSeparator}>•</Text>
                    <Text style={styles.contributionType}>{contribution.type}</Text>
                    <Text style={styles.contributionSeparator}>•</Text>
                    <Text style={styles.contributionTime}>{contribution.time}</Text>
                  </View>
                </View>
                <View style={styles.contributionDepartment}>
                  <Text style={styles.contributionDepartmentText}>{contribution.department}</Text>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Search Activity */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Search Activity</Text>
          <View style={styles.searchActivityList}>
            {searchActivity.map((activity) => {
              const TrendIcon = getTrendIcon(activity.trend);
              return (
                <View key={activity.id} style={styles.searchActivityItem}>
                  <Search size={20} color="#6366f1" />
                  <View style={styles.searchActivityInfo}>
                    <Text style={styles.searchActivityQuery}>{activity.query}</Text>
                    <Text style={styles.searchActivityCount}>{activity.count} searches</Text>
                  </View>
                  <TrendIcon size={20} color={getTrendColor(activity.trend)} />
                </View>
              );
            })}
          </View>
        </View>

        {/* Quick Actions */}
        <View style={styles.actionsSection}>
          <TouchableOpacity style={styles.actionButton}>
            <Shield size={20} color="#ffffff" />
            <Text style={styles.actionButtonText}>Review At-Risk Knowledge</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionButton}>
            <Target size={20} color="#ffffff" />
            <Text style={styles.actionButtonText}>Set Knowledge Goals</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionButton}>
            <Users size={20} color="#ffffff" />
            <Text style={styles.actionButtonText}>Manage Team Access</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      {/* Filter Modal */}
      <Modal
        visible={showFilterModal}
        animationType="slide"
        presentationStyle="pageSheet"
        onRequestClose={() => setShowFilterModal(false)}
      >
        <View style={[styles.modalContainer, { paddingTop: insets.top }]}>
          <View style={styles.modalHeader}>
            <Text style={styles.modalTitle}>Filter Dashboard</Text>
            <TouchableOpacity onPress={() => setShowFilterModal(false)}>
              <X size={24} color="#ffffff" />
            </TouchableOpacity>
          </View>
          <ScrollView style={styles.modalContent}>
            <View style={styles.filterSection}>
              <Text style={styles.filterSectionTitle}>Department</Text>
              {departments.slice(1).map((dept) => (
                <TouchableOpacity
                  key={dept.id}
                  style={styles.filterOption}
                  onPress={() => {
                    setSelectedDepartment(dept.id);
                    setShowFilterModal(false);
                  }}
                >
                  <View style={[styles.filterCheckbox, selectedDepartment === dept.id && styles.filterCheckboxChecked]} />
                  <Text style={styles.filterOptionText}>{dept.name}</Text>
                </TouchableOpacity>
              ))}
            </View>
            <View style={styles.filterSection}>
              <Text style={styles.filterSectionTitle}>Risk Level</Text>
              {['High', 'Medium', 'Low'].map((level) => (
                <TouchableOpacity key={level} style={styles.filterOption}>
                  <View style={styles.filterCheckbox} />
                  <Text style={styles.filterOptionText}>{level}</Text>
                </TouchableOpacity>
              ))}
            </View>
            <View style={styles.filterSection}>
              <Text style={styles.filterSectionTitle}>Contribution Score</Text>
              {['90+', '80-89', '70-79', 'Below 70'].map((range) => (
                <TouchableOpacity key={range} style={styles.filterOption}>
                  <View style={styles.filterCheckbox} />
                  <Text style={styles.filterOptionText}>{range}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </ScrollView>
          <View style={[styles.modalFooter, { paddingBottom: insets.bottom + 20 }]}>
            <TouchableOpacity style={styles.clearFiltersButton} onPress={() => setSelectedDepartment('all')}>
              <Text style={styles.clearFiltersText}>Clear All</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.applyFiltersButton} onPress={() => setShowFilterModal(false)}>
              <Text style={styles.applyFiltersText}>Apply Filters</Text>
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
  filterButton: {
    padding: 8,
    backgroundColor: '#1e293b',
    borderRadius: 8,
  },
  departmentScroll: {
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#1e293b',
  },
  departmentScrollContent: {
    gap: 8,
  },
  departmentChip: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: '#1e293b',
    borderWidth: 1,
    borderColor: '#334155',
  },
  departmentChipActive: {
    backgroundColor: '#6366f1',
    borderColor: '#6366f1',
  },
  departmentChipText: {
    fontSize: 14,
    color: '#94a3b8',
  },
  departmentChipTextActive: {
    color: '#ffffff',
    fontWeight: '600',
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: 20,
  },
  section: {
    marginBottom: 24,
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
  seeAll: {
    fontSize: 14,
    color: '#6366f1',
    fontWeight: '500',
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  statCard: {
    width: '48%',
    backgroundColor: '#1e293b',
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: '#334155',
  },
  statHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  statName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#ffffff',
  },
  statBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  statPercent: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  statMetrics: {
    gap: 8,
  },
  statMetric: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  statMetricText: {
    fontSize: 12,
    color: '#94a3b8',
  },
  expertsList: {
    gap: 12,
  },
  expertCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1e293b',
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: '#334155',
  },
  expertAvatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#6366f120',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  expertInfo: {
    flex: 1,
  },
  expertName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#ffffff',
    marginBottom: 4,
  },
  expertRole: {
    fontSize: 14,
    color: '#94a3b8',
    marginBottom: 8,
  },
  expertExpertise: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
  },
  skillBadge: {
    backgroundColor: '#6366f120',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  skillText: {
    fontSize: 12,
    color: '#6366f1',
  },
  expertScore: {
    alignItems: 'center',
    marginLeft: 12,
  },
  expertScoreText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#f59e0b',
    marginTop: 4,
  },
  atRiskList: {
    gap: 12,
  },
  atRiskCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1e293b',
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: '#334155',
  },
  atRiskIcon: {
    width: 40,
    height: 40,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  atRiskInfo: {
    flex: 1,
  },
  atRiskArea: {
    fontSize: 16,
    fontWeight: '600',
    color: '#ffffff',
    marginBottom: 4,
  },
  atRiskHolder: {
    fontSize: 14,
    color: '#94a3b8',
    marginBottom: 2,
  },
  atRiskReason: {
    fontSize: 12,
    color: '#64748b',
  },
  atRiskImpact: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
  },
  atRiskImpactText: {
    fontSize: 12,
    fontWeight: '600',
  },
  contributionsList: {
    gap: 8,
  },
  contributionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1e293b',
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: '#334155',
  },
  contributionIcon: {
    width: 40,
    height: 40,
    borderRadius: 8,
    backgroundColor: '#6366f120',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  contributionInfo: {
    flex: 1,
  },
  contributionTitle: {
    fontSize: 16,
    fontWeight: '500',
    color: '#ffffff',
    marginBottom: 4,
  },
  contributionMeta: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  contributionAuthor: {
    fontSize: 12,
    color: '#94a3b8',
  },
  contributionSeparator: {
    fontSize: 12,
    color: '#64748b',
    marginHorizontal: 4,
  },
  contributionType: {
    fontSize: 12,
    color: '#6366f1',
  },
  contributionTime: {
    fontSize: 12,
    color: '#64748b',
  },
  contributionDepartment: {
    backgroundColor: '#6366f120',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
  },
  contributionDepartmentText: {
    fontSize: 12,
    color: '#6366f1',
  },
  searchActivityList: {
    gap: 8,
  },
  searchActivityItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1e293b',
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: '#334155',
  },
  searchActivityInfo: {
    flex: 1,
    marginLeft: 12,
  },
  searchActivityQuery: {
    fontSize: 16,
    fontWeight: '500',
    color: '#ffffff',
    marginBottom: 4,
  },
  searchActivityCount: {
    fontSize: 14,
    color: '#94a3b8',
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
  filterSection: {
    marginBottom: 24,
  },
  filterSectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#ffffff',
    marginBottom: 12,
  },
  filterOption: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
  },
  filterCheckbox: {
    width: 20,
    height: 20,
    borderRadius: 4,
    borderWidth: 2,
    borderColor: '#334155',
    marginRight: 12,
  },
  filterCheckboxChecked: {
    backgroundColor: '#6366f1',
    borderColor: '#6366f1',
  },
  filterOptionText: {
    fontSize: 16,
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
  clearFiltersButton: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#334155',
    alignItems: 'center',
  },
  clearFiltersText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#94a3b8',
  },
  applyFiltersButton: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 8,
    backgroundColor: '#6366f1',
    alignItems: 'center',
  },
  applyFiltersText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#ffffff',
  },
});
