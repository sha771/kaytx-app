/**
 * @copyright Copyright (c) 2026 Kaytx & Antigravity Ecosystem ("kaytx")
 * @license MIT - See LICENSE file for full terms
 */

import React, { useState } from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity, Modal } from 'react-native';
import { useRouter } from 'expo-router';
import { ChevronRight, BarChart3, TrendingUp, AlertTriangle, Shield, Users, Search, BookOpen, Clock, Target, CheckCircle, X, Calendar, Filter, Download } from 'lucide-react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function CompanyBrainAnalytics() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const [timeRange, setTimeRange] = useState('30d');
  const [showFilterModal, setShowFilterModal] = useState(false);

  const timeRanges = [
    { id: '7d', label: '7 Days' },
    { id: '30d', label: '30 Days' },
    { id: '90d', label: '90 Days' },
    { id: '1y', label: '1 Year' },
  ];

  const knowledgeHealth = {
    coverage: 78,
    outdated: 12,
    duplicates: 8,
    lastUpdated: '2 hours ago',
  };

  const usageMetrics = {
    totalSearches: 1234,
    uniqueUsers: 45,
    avgSessionDuration: '8m 32s',
    successRate: 87,
  };

  const topSearches = [
    { id: 1, query: 'API authentication', count: 156, trend: '+12%' },
    { id: 2, query: 'Client onboarding', count: 134, trend: '+8%' },
    { id: 3, query: 'Expense policy', count: 98, trend: '-3%' },
    { id: 4, query: 'Product roadmap', count: 87, trend: '+5%' },
    { id: 5, query: 'Team structure', count: 76, trend: '+2%' },
  ];

  const knowledgeGaps = [
    { id: 1, area: 'Legacy System Documentation', department: 'Engineering', severity: 'high', impact: 'Critical' },
    { id: 2, area: 'Client Communication Protocols', department: 'Sales', severity: 'high', impact: 'High' },
    { id: 3, area: 'Marketing Analytics Setup', department: 'Marketing', severity: 'medium', impact: 'Medium' },
    { id: 4, area: 'HR Policy Updates', department: 'HR', severity: 'medium', impact: 'Medium' },
  ];

  const riskAssessment = {
    singlePointOfFailure: 3,
    atRiskDepartures: 2,
    complianceGaps: 1,
    overallRisk: 'medium',
  };

  const departureRisks = [
    { id: 1, employee: 'John D.', role: 'Tech Lead', riskLevel: 'high', knowledgeAreas: ['Architecture', 'API Design'], impactScore: 92 },
    { id: 2, employee: 'Sarah M.', role: 'Senior PM', riskLevel: 'medium', knowledgeAreas: ['Product Strategy', 'Roadmap'], impactScore: 78 },
    { id: 3, employee: 'Mike T.', role: 'Sales Manager', riskLevel: 'medium', knowledgeAreas: ['Enterprise Sales', 'Client Relations'], impactScore: 71 },
  ];

  const onboardingMetrics = {
    avgOnboardingTime: 14,
    targetOnboardingTime: 21,
    completionRate: 85,
    satisfactionScore: 4.2,
  };

  const departmentPerformance = [
    { id: 'engineering', name: 'Engineering', coverage: 92, contributions: 234, searchActivity: 456 },
    { id: 'product', name: 'Product', coverage: 85, contributions: 156, searchActivity: 312 },
    { id: 'sales', name: 'Sales', coverage: 78, contributions: 98, searchActivity: 234 },
    { id: 'marketing', name: 'Marketing', coverage: 71, contributions: 87, searchActivity: 198 },
    { id: 'hr', name: 'HR', coverage: 88, contributions: 65, searchActivity: 145 },
  ];

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'high':
        return '#ef4444';
      case 'medium':
        return '#f59e0b';
      default:
        return '#10b981';
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

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <ChevronRight size={24} color="#ffffff" style={{ transform: [{ rotate: '180deg' }] }} />
        </TouchableOpacity>
        <Text style={styles.title}>Analytics & Insights</Text>
        <TouchableOpacity style={styles.exportButton}>
          <Download size={20} color="#ffffff" />
        </TouchableOpacity>
      </View>

      {/* Time Range Selector */}
      <ScrollView 
        horizontal 
        showsHorizontalScrollIndicator={false}
        style={styles.timeRangeScroll}
        contentContainerStyle={styles.timeRangeScrollContent}
      >
        {timeRanges.map((range) => (
          <TouchableOpacity
            key={range.id}
            style={[styles.timeRangeChip, timeRange === range.id && styles.timeRangeChipActive]}
            onPress={() => setTimeRange(range.id)}
          >
            <Text style={[styles.timeRangeChipText, timeRange === range.id && styles.timeRangeChipTextActive]}>
              {range.label}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      <ScrollView style={styles.scrollView} contentContainerStyle={[styles.scrollContent, { paddingBottom: insets.bottom + 20 }]}>
        {/* Knowledge Health */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Knowledge Health</Text>
          <View style={styles.healthCard}>
            <View style={styles.healthMetric}>
              <View style={styles.healthMetricHeader}>
                <BookOpen size={20} color="#6366f1" />
                <Text style={styles.healthMetricLabel}>Coverage</Text>
              </View>
              <Text style={styles.healthMetricValue}>{knowledgeHealth.coverage}%</Text>
              <Text style={styles.healthMetricSub}>Last updated: {knowledgeHealth.lastUpdated}</Text>
            </View>
            <View style={styles.healthDivider} />
            <View style={styles.healthMetric}>
              <View style={styles.healthMetricHeader}>
                <AlertTriangle size={20} color="#f59e0b" />
                <Text style={styles.healthMetricLabel}>Outdated</Text>
              </View>
              <Text style={styles.healthMetricValue}>{knowledgeHealth.outdated}%</Text>
              <Text style={styles.healthMetricSub}>Needs review</Text>
            </View>
            <View style={styles.healthDivider} />
            <View style={styles.healthMetric}>
              <View style={styles.healthMetricHeader}>
                <Target size={20} color="#ef4444" />
                <Text style={styles.healthMetricLabel}>Duplicates</Text>
              </View>
              <Text style={styles.healthMetricValue}>{knowledgeHealth.duplicates}%</Text>
              <Text style={styles.healthMetricSub}>Can be merged</Text>
            </View>
          </View>
        </View>

        {/* Usage Metrics */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Usage Metrics</Text>
          <View style={styles.metricsGrid}>
            <View style={styles.metricCard}>
              <Search size={24} color="#6366f1" />
              <Text style={styles.metricValue}>{usageMetrics.totalSearches}</Text>
              <Text style={styles.metricLabel}>Total Searches</Text>
            </View>
            <View style={styles.metricCard}>
              <Users size={24} color="#6366f1" />
              <Text style={styles.metricValue}>{usageMetrics.uniqueUsers}</Text>
              <Text style={styles.metricLabel}>Unique Users</Text>
            </View>
            <View style={styles.metricCard}>
              <Clock size={24} color="#6366f1" />
              <Text style={styles.metricValue}>{usageMetrics.avgSessionDuration}</Text>
              <Text style={styles.metricLabel}>Avg Session</Text>
            </View>
            <View style={styles.metricCard}>
              <CheckCircle size={24} color="#10b981" />
              <Text style={styles.metricValue}>{usageMetrics.successRate}%</Text>
              <Text style={styles.metricLabel}>Success Rate</Text>
            </View>
          </View>
        </View>

        {/* Top Searches */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Top Searches</Text>
            <TouchableOpacity onPress={() => router.push('/company-brain/search' as any)}>
              <Text style={styles.seeAll}>View All</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.topSearchesList}>
            {topSearches.map((search) => (
              <View key={search.id} style={styles.topSearchItem}>
                <View style={styles.searchRank}>
                  <Text style={styles.searchRankText}>{search.id}</Text>
                </View>
                <View style={styles.searchInfo}>
                  <Text style={styles.searchQuery}>{search.query}</Text>
                  <Text style={styles.searchCount}>{search.count} searches</Text>
                </View>
                <View style={[styles.searchTrend, { backgroundColor: search.trend.startsWith('+') ? '#10b98120' : '#ef444420' }]}>
                  <Text style={[styles.searchTrendText, { color: search.trend.startsWith('+') ? '#10b981' : '#ef4444' }]}>
                    {search.trend}
                  </Text>
                </View>
              </View>
            ))}
          </View>
        </View>

        {/* Knowledge Gaps */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Knowledge Gaps</Text>
            <TouchableOpacity>
              <Text style={styles.seeAll}>View All</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.gapsList}>
            {knowledgeGaps.map((gap) => (
              <TouchableOpacity key={gap.id} style={styles.gapItem}>
                <View style={[styles.gapSeverity, { backgroundColor: `${getSeverityColor(gap.severity)}20` }]}>
                  <AlertTriangle size={20} color={getSeverityColor(gap.severity)} />
                </View>
                <View style={styles.gapInfo}>
                  <Text style={styles.gapArea}>{gap.area}</Text>
                  <Text style={styles.gapDepartment}>{gap.department}</Text>
                </View>
                <View style={[styles.gapImpact, { backgroundColor: `${getSeverityColor(gap.severity)}20` }]}>
                  <Text style={[styles.gapImpactText, { color: getSeverityColor(gap.severity) }]}>
                    {gap.impact}
                  </Text>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Risk Assessment */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Risk Assessment</Text>
          <View style={styles.riskCard}>
            <View style={styles.riskHeader}>
              <Shield size={24} color={getRiskColor(riskAssessment.overallRisk)} />
              <View style={styles.riskInfo}>
                <Text style={styles.riskTitle}>Overall Risk Level</Text>
                <Text style={[styles.riskLevel, { color: getRiskColor(riskAssessment.overallRisk) }]}>
                  {riskAssessment.overallRisk.charAt(0).toUpperCase() + riskAssessment.overallRisk.slice(1)}
                </Text>
              </View>
            </View>
            <View style={styles.riskMetrics}>
              <View style={styles.riskMetric}>
                <Text style={styles.riskMetricValue}>{riskAssessment.singlePointOfFailure}</Text>
                <Text style={styles.riskMetricLabel}>Single Point of Failure</Text>
              </View>
              <View style={styles.riskMetric}>
                <Text style={styles.riskMetricValue}>{riskAssessment.atRiskDepartures}</Text>
                <Text style={styles.riskMetricLabel}>At-Risk Departures</Text>
              </View>
              <View style={styles.riskMetric}>
                <Text style={styles.riskMetricValue}>{riskAssessment.complianceGaps}</Text>
                <Text style={styles.riskMetricLabel}>Compliance Gaps</Text>
              </View>
            </View>
          </View>
        </View>

        {/* Departure Risks */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Departure Risks</Text>
            <TouchableOpacity onPress={() => router.push('/company-brain/team' as any)}>
              <Text style={styles.seeAll}>View Team</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.departureRisksList}>
            {departureRisks.map((risk) => (
              <TouchableOpacity key={risk.id} style={styles.departureRiskItem}>
                <View style={[styles.departureRiskIcon, { backgroundColor: `${getRiskColor(risk.riskLevel)}20` }]}>
                  <AlertTriangle size={20} color={getRiskColor(risk.riskLevel)} />
                </View>
                <View style={styles.departureRiskInfo}>
                  <Text style={styles.departureRiskName}>{risk.employee}</Text>
                  <Text style={styles.departureRiskRole}>{risk.role}</Text>
                  <View style={styles.departureRiskAreas}>
                    {risk.knowledgeAreas.map((area, index) => (
                      <View key={index} style={styles.knowledgeAreaBadge}>
                        <Text style={styles.knowledgeAreaText}>{area}</Text>
                      </View>
                    ))}
                  </View>
                </View>
                <View style={styles.departureRiskScore}>
                  <Text style={styles.departureRiskScoreValue}>{risk.impactScore}</Text>
                  <Text style={styles.departureRiskScoreLabel}>Impact</Text>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Onboarding Metrics */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Onboarding Effectiveness</Text>
          <View style={styles.onboardingCard}>
            <View style={styles.onboardingMetric}>
              <Calendar size={20} color="#6366f1" />
              <View style={styles.onboardingMetricInfo}>
                <Text style={styles.onboardingMetricValue}>{onboardingMetrics.avgOnboardingTime} days</Text>
                <Text style={styles.onboardingMetricLabel}>Avg Onboarding Time</Text>
                <Text style={styles.onboardingMetricTarget}>Target: {onboardingMetrics.targetOnboardingTime} days</Text>
              </View>
            </View>
            <View style={styles.onboardingDivider} />
            <View style={styles.onboardingMetric}>
              <CheckCircle size={20} color="#10b981" />
              <View style={styles.onboardingMetricInfo}>
                <Text style={styles.onboardingMetricValue}>{onboardingMetrics.completionRate}%</Text>
                <Text style={styles.onboardingMetricLabel}>Completion Rate</Text>
              </View>
            </View>
            <View style={styles.onboardingDivider} />
            <View style={styles.onboardingMetric}>
              <Target size={20} color="#f59e0b" />
              <View style={styles.onboardingMetricInfo}>
                <Text style={styles.onboardingMetricValue}>{onboardingMetrics.satisfactionScore}/5</Text>
                <Text style={styles.onboardingMetricLabel}>Satisfaction Score</Text>
              </View>
            </View>
          </View>
        </View>

        {/* Department Performance */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Department Performance</Text>
          <View style={styles.departmentPerformanceList}>
            {departmentPerformance.map((dept) => (
              <TouchableOpacity key={dept.id} style={styles.departmentPerformanceItem}>
                <View style={styles.departmentPerformanceInfo}>
                  <Text style={styles.departmentPerformanceName}>{dept.name}</Text>
                  <View style={styles.departmentPerformanceMetrics}>
                    <View style={styles.departmentPerformanceMetric}>
                      <Text style={styles.departmentPerformanceMetricValue}>{dept.coverage}%</Text>
                      <Text style={styles.departmentPerformanceMetricLabel}>Coverage</Text>
                    </View>
                    <View style={styles.departmentPerformanceMetric}>
                      <Text style={styles.departmentPerformanceMetricValue}>{dept.contributions}</Text>
                      <Text style={styles.departmentPerformanceMetricLabel}>Contributions</Text>
                    </View>
                    <View style={styles.departmentPerformanceMetric}>
                      <Text style={styles.departmentPerformanceMetricValue}>{dept.searchActivity}</Text>
                      <Text style={styles.departmentPerformanceMetricLabel}>Searches</Text>
                    </View>
                  </View>
                </View>
                <View style={styles.departmentPerformanceBar}>
                  <View style={[styles.departmentPerformanceBarFill, { width: `${dept.coverage}%` }]} />
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Quick Actions */}
        <View style={styles.actionsSection}>
          <TouchableOpacity style={styles.actionButton}>
            <Shield size={20} color="#ffffff" />
            <Text style={styles.actionButtonText}>Review Risks</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionButton}>
            <Target size={20} color="#ffffff" />
            <Text style={styles.actionButtonText}>Address Gaps</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionButton}>
            <Filter size={20} color="#ffffff" />
            <Text style={styles.actionButtonText}>Custom Report</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
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
  timeRangeScroll: {
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#1e293b',
  },
  timeRangeScrollContent: {
    gap: 8,
  },
  timeRangeChip: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: '#1e293b',
    borderWidth: 1,
    borderColor: '#334155',
  },
  timeRangeChipActive: {
    backgroundColor: '#6366f1',
    borderColor: '#6366f1',
  },
  timeRangeChipText: {
    fontSize: 14,
    color: '#94a3b8',
  },
  timeRangeChipTextActive: {
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
  healthCard: {
    flexDirection: 'row',
    backgroundColor: '#1e293b',
    borderRadius: 12,
    padding: 20,
    borderWidth: 1,
    borderColor: '#334155',
  },
  healthMetric: {
    flex: 1,
  },
  healthMetricHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 8,
  },
  healthMetricLabel: {
    fontSize: 14,
    color: '#94a3b8',
  },
  healthMetricValue: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 4,
  },
  healthMetricSub: {
    fontSize: 12,
    color: '#64748b',
  },
  healthDivider: {
    width: 1,
    backgroundColor: '#334155',
    marginHorizontal: 16,
  },
  metricsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  metricCard: {
    width: '48%',
    backgroundColor: '#1e293b',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#334155',
  },
  metricValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#ffffff',
    marginTop: 8,
    marginBottom: 4,
  },
  metricLabel: {
    fontSize: 12,
    color: '#94a3b8',
  },
  topSearchesList: {
    gap: 8,
  },
  topSearchItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1e293b',
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: '#334155',
  },
  searchRank: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#6366f120',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  searchRankText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#6366f1',
  },
  searchInfo: {
    flex: 1,
  },
  searchQuery: {
    fontSize: 16,
    fontWeight: '500',
    color: '#ffffff',
    marginBottom: 4,
  },
  searchCount: {
    fontSize: 14,
    color: '#94a3b8',
  },
  searchTrend: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  searchTrendText: {
    fontSize: 12,
    fontWeight: '600',
  },
  gapsList: {
    gap: 8,
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
  gapSeverity: {
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
  gapDepartment: {
    fontSize: 14,
    color: '#94a3b8',
  },
  gapImpact: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
  },
  gapImpactText: {
    fontSize: 12,
    fontWeight: '600',
  },
  riskCard: {
    backgroundColor: '#1e293b',
    borderRadius: 12,
    padding: 20,
    borderWidth: 1,
    borderColor: '#334155',
  },
  riskHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  riskInfo: {
    marginLeft: 12,
  },
  riskTitle: {
    fontSize: 14,
    color: '#94a3b8',
    marginBottom: 4,
  },
  riskLevel: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  riskMetrics: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: '#334155',
  },
  riskMetric: {
    alignItems: 'center',
  },
  riskMetricValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 4,
  },
  riskMetricLabel: {
    fontSize: 12,
    color: '#94a3b8',
    textAlign: 'center',
  },
  departureRisksList: {
    gap: 8,
  },
  departureRiskItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1e293b',
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: '#334155',
  },
  departureRiskIcon: {
    width: 40,
    height: 40,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  departureRiskInfo: {
    flex: 1,
  },
  departureRiskName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#ffffff',
    marginBottom: 4,
  },
  departureRiskRole: {
    fontSize: 14,
    color: '#94a3b8',
    marginBottom: 8,
  },
  departureRiskAreas: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
  },
  knowledgeAreaBadge: {
    backgroundColor: '#6366f120',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  knowledgeAreaText: {
    fontSize: 12,
    color: '#6366f1',
  },
  departureRiskScore: {
    alignItems: 'center',
    marginLeft: 12,
  },
  departureRiskScoreValue: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#f59e0b',
  },
  departureRiskScoreLabel: {
    fontSize: 12,
    color: '#94a3b8',
  },
  onboardingCard: {
    flexDirection: 'row',
    backgroundColor: '#1e293b',
    borderRadius: 12,
    padding: 20,
    borderWidth: 1,
    borderColor: '#334155',
  },
  onboardingMetric: {
    flex: 1,
  },
  onboardingMetricInfo: {
    marginLeft: 8,
  },
  onboardingMetricValue: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 4,
  },
  onboardingMetricLabel: {
    fontSize: 12,
    color: '#94a3b8',
    marginBottom: 2,
  },
  onboardingMetricTarget: {
    fontSize: 10,
    color: '#64748b',
  },
  onboardingDivider: {
    width: 1,
    backgroundColor: '#334155',
    marginHorizontal: 16,
  },
  departmentPerformanceList: {
    gap: 12,
  },
  departmentPerformanceItem: {
    backgroundColor: '#1e293b',
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: '#334155',
  },
  departmentPerformanceInfo: {
    marginBottom: 12,
  },
  departmentPerformanceName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#ffffff',
    marginBottom: 8,
  },
  departmentPerformanceMetrics: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  departmentPerformanceMetric: {
    alignItems: 'center',
  },
  departmentPerformanceMetricValue: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 2,
  },
  departmentPerformanceMetricLabel: {
    fontSize: 12,
    color: '#94a3b8',
  },
  departmentPerformanceBar: {
    height: 6,
    backgroundColor: '#334155',
    borderRadius: 3,
    overflow: 'hidden',
  },
  departmentPerformanceBarFill: {
    height: '100%',
    backgroundColor: '#6366f1',
    borderRadius: 3,
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
});
