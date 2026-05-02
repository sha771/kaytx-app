 
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, RefreshControl } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { 
  ArrowLeft, Shield, FileText, Download, TriangleAlert, CircleCheck, 
  TrendingUp, Clock, Users, Activity, ChevronRight, ChartBarBig 
} from 'lucide-react-native';
import { useTheme } from '@/providers/ThemeProvider';
import { trpc } from '@/lib/trpc';

interface ComplianceMetrics {
  overall: number;
  completionRate: number;
  consentHealth: number;
  dataRetention: number;
  auditCompleteness: number;
}

interface ComplianceReport {
  id: string;
  type: string;
  status: string;
  createdAt: string;
  complianceScore: number;
  violationsCount: number;
}

interface Recommendation {
  category: string;
  priority: 'low' | 'medium' | 'high' | 'critical';
  title: string;
  description: string;
  dueDate: string;
}

export default function ComplianceDashboardScreen() {
  const { theme } = useTheme();
  const [refreshing, setRefreshing] = useState(false);
  const [activeTab, setActiveTab] = useState<'overview' | 'reports' | 'gdpr'>('overview');

  const { data: dashboardData, refetch } = trpc.compliance.dashboard.useQuery();
  const { data: gdprData, refetch: refetchGdpr } = trpc.gdpr.dashboard.useQuery();
  const { data: reports, refetch: refetchReports } = trpc.compliance.reports.useQuery();

  const handleRefresh = async () => {
    setRefreshing(true);
    try {
      await Promise.all([refetch(), refetchGdpr(), refetchReports()]);
    } finally {
      setRefreshing(false);
    }
  };

  const getScoreColor = (score: number) => {
    if (score >= 90) return theme.colors.success;
    if (score >= 70) return theme.colors.warning;
    return theme.colors.error;
  };

  const getScoreLabel = (score: number) => {
    if (score >= 90) return 'Excellent';
    if (score >= 70) return 'Good';
    if (score >= 50) return 'Fair';
    return 'Poor';
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'critical': return theme.colors.error;
      case 'high': return '#F97316';
      case 'medium': return theme.colors.warning;
      case 'low': return theme.colors.success;
      default: return theme.colors.secondaryText;
    }
  };

  const renderOverviewTab = () => (
    <View style={styles.tabContent}>
      {/* Compliance Score Overview */}
      <View style={[styles.card, { backgroundColor: theme.colors.cardBackground }]}>
        <View style={styles.cardHeader}>
          <ChartBarBig size={24} color={theme.colors.primary} />
          <Text style={[styles.cardHeaderTitle, { color: theme.colors.text }]}>
            Compliance Score
          </Text>
        </View>
        
        <View style={styles.scoreContainer}>
          <Text style={[
            styles.scoreValue, 
            { color: getScoreColor(dashboardData?.scores?.overall || 0) }
          ]}>
            {dashboardData?.scores?.overall || 0}%
          </Text>
          <Text style={[
            styles.scoreLabel, 
            { color: getScoreColor(dashboardData?.scores?.overall || 0) }
          ]}>
            {getScoreLabel(dashboardData?.scores?.overall || 0)}
          </Text>
        </View>

        <View style={styles.metricsGrid}>
          <View style={styles.metricItem}>
            <Text style={[styles.metricLabel, { color: theme.colors.secondaryText }]}>
              Completion Rate
            </Text>
            <Text style={[
              styles.metricValue, 
              { color: getScoreColor(dashboardData?.scores?.completionRate || 0) }
            ]}>
              {dashboardData?.scores?.completionRate || 0}%
            </Text>
          </View>
          
          <View style={styles.metricItem}>
            <Text style={[styles.metricLabel, { color: theme.colors.secondaryText }]}>
              Consent Health
            </Text>
            <Text style={[
              styles.metricValue, 
              { color: getScoreColor(dashboardData?.scores?.consentHealth || 0) }
            ]}>
              {dashboardData?.scores?.consentHealth || 0}%
            </Text>
          </View>
          
          <View style={styles.metricItem}>
            <Text style={[styles.metricLabel, { color: theme.colors.secondaryText }]}>
              Data Retention
            </Text>
            <Text style={[
              styles.metricValue, 
              { color: getScoreColor(dashboardData?.scores?.dataRetention || 0) }
            ]}>
              {dashboardData?.scores?.dataRetention || 0}%
            </Text>
          </View>
          
          <View style={styles.metricItem}>
            <Text style={[styles.metricLabel, { color: theme.colors.secondaryText }]}>
              Audit Completeness
            </Text>
            <Text style={[
              styles.metricValue, 
              { color: getScoreColor(dashboardData?.scores?.auditCompleteness || 0) }
            ]}>
              {dashboardData?.scores?.auditCompleteness || 0}%
            </Text>
          </View>
        </View>
      </View>

      {/* Key Metrics */}
      <View style={[styles.card, { backgroundColor: theme.colors.cardBackground }]}>
        <View style={styles.cardHeader}>
          <Activity size={24} color={theme.colors.primary} />
          <Text style={[styles.cardHeaderTitle, { color: theme.colors.text }]}>
            Key Metrics
          </Text>
        </View>
        
        <View style={styles.metricsList}>
          <View style={styles.metricRow}>
            <View style={styles.metricInfo}>
              <Users size={16} color={theme.colors.primary} />
              <Text style={[styles.metricTitle, { color: theme.colors.text }]}>
                Total Users
              </Text>
            </View>
            <Text style={[styles.metricNumber, { color: theme.colors.text }]}>
              {dashboardData?.metrics?.users?.totalUsers || 0}
            </Text>
          </View>
          
          <View style={styles.metricRow}>
            <View style={styles.metricInfo}>
              <CircleCheck size={16} color={theme.colors.success} />
              <Text style={[styles.metricTitle, { color: theme.colors.text }]}>
                Verified Users
              </Text>
            </View>
            <Text style={[styles.metricNumber, { color: theme.colors.success }]}>
              {dashboardData?.metrics?.users?.verifiedUsers || 0}
            </Text>
          </View>
          
          <View style={styles.metricRow}>
            <View style={styles.metricInfo}>
              <Shield size={16} color={theme.colors.warning} />
              <Text style={[styles.metricTitle, { color: theme.colors.text }]}>
                2FA Enabled
              </Text>
            </View>
            <Text style={[styles.metricNumber, { color: theme.colors.warning }]}>
              {dashboardData?.metrics?.users?.usersWith2FA || 0}
            </Text>
          </View>
          
          <View style={styles.metricRow}>
            <View style={styles.metricInfo}>
              <FileText size={16} color={theme.colors.primary} />
              <Text style={[styles.metricTitle, { color: theme.colors.text }]}>
                Audit Logs (30d)
              </Text>
            </View>
            <Text style={[styles.metricNumber, { color: theme.colors.text }]}>
              {dashboardData?.metrics?.auditLogs?.totalAuditLogs || 0}
            </Text>
          </View>
        </View>
      </View>

      {/* Recommendations */}
      <View style={[styles.card, { backgroundColor: theme.colors.cardBackground }]}>
        <View style={styles.cardHeader}>
          <TriangleAlert size={24} color={theme.colors.warning} />
          <Text style={[styles.cardHeaderTitle, { color: theme.colors.text }]}>
            Recommendations
          </Text>
        </View>
        
        <View style={styles.recommendationsList}>
          {dashboardData?.recommendations?.slice(0, 3).map((rec: Recommendation, index: number) => (
            <View key={index} style={[styles.recommendationItem, { borderColor: theme.colors.border }]}>
              <View style={styles.recommendationHeader}>
                <View style={[
                  styles.priorityBadge, 
                  { backgroundColor: getPriorityColor(rec.priority) + '20' }
                ]}>
                  <Text style={[
                    styles.priorityText, 
                    { color: getPriorityColor(rec.priority) }
                  ]}>
                    {rec.priority.toUpperCase()}
                  </Text>
                </View>
                <Text style={[styles.recommendationDate, { color: theme.colors.secondaryText }]}>
                  Due: {new Date(rec.dueDate).toLocaleDateString()}
                </Text>
              </View>
              <Text style={[styles.recommendationTitle, { color: theme.colors.text }]}>
                {rec.title}
              </Text>
              <Text style={[styles.recommendationDescription, { color: theme.colors.secondaryText }]}>
                {rec.description}
              </Text>
            </View>
          ))}
        </View>
      </View>
    </View>
  );

  const renderGdprTab = () => (
    <View style={styles.tabContent}>
      {/* GDPR Metrics */}
      <View style={[styles.card, { backgroundColor: theme.colors.cardBackground }]}>
        <View style={styles.cardHeader}>
          <Shield size={24} color={theme.colors.primary} />
          <Text style={[styles.cardHeaderTitle, { color: theme.colors.text }]}>
            GDPR Compliance
          </Text>
        </View>
        
        <View style={styles.metricsList}>
          <View style={styles.metricRow}>
            <View style={styles.metricInfo}>
              <FileText size={16} color={theme.colors.primary} />
              <Text style={[styles.metricTitle, { color: theme.colors.text }]}>
                Total Requests
              </Text>
            </View>
            <Text style={[styles.metricNumber, { color: theme.colors.text }]}>
              {gdprData?.metrics?.requests?.totalRequests || 0}
            </Text>
          </View>
          
          <View style={styles.metricRow}>
            <View style={styles.metricInfo}>
              <Clock size={16} color={theme.colors.warning} />
              <Text style={[styles.metricTitle, { color: theme.colors.text }]}>
                Pending Requests
              </Text>
            </View>
            <Text style={[styles.metricNumber, { color: theme.colors.warning }]}>
              {gdprData?.metrics?.requests?.pendingRequests || 0}
            </Text>
          </View>
          
          <View style={styles.metricRow}>
            <View style={styles.metricInfo}>
              <CircleCheck size={16} color={theme.colors.success} />
              <Text style={[styles.metricTitle, { color: theme.colors.text }]}>
                Completed Requests
              </Text>
            </View>
            <Text style={[styles.metricNumber, { color: theme.colors.success }]}>
              {gdprData?.metrics?.requests?.completedRequests || 0}
            </Text>
          </View>
          
          <View style={styles.metricRow}>
            <View style={styles.metricInfo}>
              <Users size={16} color={theme.colors.primary} />
              <Text style={[styles.metricTitle, { color: theme.colors.text }]}>
                Granted Consents
              </Text>
            </View>
            <Text style={[styles.metricNumber, { color: theme.colors.success }]}>
              {gdprData?.metrics?.consents?.grantedConsents || 0}
            </Text>
          </View>
        </View>
      </View>

      {/* Recent GDPR Requests */}
      <View style={[styles.card, { backgroundColor: theme.colors.cardBackground }]}>
        <View style={styles.cardHeader}>
          <Clock size={24} color={theme.colors.primary} />
          <Text style={[styles.cardHeaderTitle, { color: theme.colors.text }]}>
            Recent Requests
          </Text>
        </View>
        
        <View style={styles.requestsList}>
          {gdprData?.recentRequests?.slice(0, 5).map((request: any, index: number) => (
            <TouchableOpacity key={index} style={[styles.requestItem, { borderColor: theme.colors.border }]}>
              <View style={styles.requestHeader}>
                <Text style={[styles.requestType, { color: theme.colors.text }]}>
                  {request.type?.toUpperCase()}
                </Text>
                <Text style={[
                  styles.requestStatus, 
                  { 
                    color: request.status === 'completed' ? theme.colors.success : 
                           request.status === 'pending' ? theme.colors.warning : 
                           theme.colors.secondaryText 
                  }
                ]}>
                  {request.status?.toUpperCase()}
                </Text>
              </View>
              <Text style={[styles.requestDate, { color: theme.colors.secondaryText }]}>
                {new Date(request.createdAt).toLocaleDateString()}
              </Text>
              {request.user && (
                <Text style={[styles.requestUser, { color: theme.colors.secondaryText }]}>
                  {request.user.email}
                </Text>
              )}
            </TouchableOpacity>
          ))}
        </View>
      </View>
    </View>
  );

  const renderReportsTab = () => (
    <View style={styles.tabContent}>
      {/* Generate Report Button */}
      <TouchableOpacity 
        style={[styles.generateButton, { backgroundColor: theme.colors.primary }]}
        onPress={() => router.push('/compliance/reports/generate')}
      >
        <Download size={20} color="#FFFFFF" />
        <Text style={styles.generateButtonText}>Generate Compliance Report</Text>
      </TouchableOpacity>

      {/* Recent Reports */}
      <View style={[styles.card, { backgroundColor: theme.colors.cardBackground }]}>
        <View style={styles.cardHeader}>
          <FileText size={24} color={theme.colors.primary} />
          <Text style={[styles.cardHeaderTitle, { color: theme.colors.text }]}>
            Recent Reports
          </Text>
        </View>
        
        <View style={styles.reportsList}>
          {reports?.reports?.slice(0, 5).map((report: ComplianceReport, index: number) => (
            <TouchableOpacity key={index} style={[styles.reportItem, { borderColor: theme.colors.border }]}>
              <View style={styles.reportHeader}>
                <Text style={[styles.reportType, { color: theme.colors.text }]}>
                  {report.type?.toUpperCase()}
                </Text>
                <View style={styles.reportScore}>
                  <Text style={[
                    styles.reportScoreText,
                    { color: getScoreColor(report.complianceScore) }
                  ]}>
                    {report.complianceScore}%
                  </Text>
                </View>
              </View>
              <Text style={[styles.reportDate, { color: theme.colors.secondaryText }]}>
                {new Date(report.createdAt).toLocaleDateString()}
              </Text>
              <View style={styles.reportFooter}>
                <Text style={[
                  styles.reportStatus, 
                  { 
                    color: report.status === 'completed' ? theme.colors.success : 
                           report.status === 'generating' ? theme.colors.warning : 
                           theme.colors.secondaryText 
                  }
                ]}>
                  {report.status?.toUpperCase()}
                </Text>
                {report.violationsCount > 0 && (
                  <Text style={[styles.reportViolations, { color: theme.colors.error }]}>
                    {report.violationsCount} violations
                  </Text>
                )}
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <View style={[styles.header, { borderBottomColor: theme.colors.border }]}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <ArrowLeft size={24} color={theme.colors.text} />
        </TouchableOpacity>
        <Text style={[styles.title, { color: theme.colors.text }]}>Compliance Dashboard</Text>
        <View style={styles.placeholder} />
      </View>

      <View style={[styles.tabBar, { borderBottomColor: theme.colors.border }]}>
        <TouchableOpacity
          style={[
            styles.tab, 
            activeTab === 'overview' && [styles.activeTab, { borderBottomColor: theme.colors.primary }]
          ]}
          onPress={() => setActiveTab('overview')}
        >
          <Text style={[
            styles.tabText,
            { color: activeTab === 'overview' ? theme.colors.primary : theme.colors.secondaryText }
          ]}>
            Overview
          </Text>
        </TouchableOpacity>
        
        <TouchableOpacity
          style={[
            styles.tab, 
            activeTab === 'gdpr' && [styles.activeTab, { borderBottomColor: theme.colors.primary }]
          ]}
          onPress={() => setActiveTab('gdpr')}
        >
          <Text style={[
            styles.tabText,
            { color: activeTab === 'gdpr' ? theme.colors.primary : theme.colors.secondaryText }
          ]}>
            GDPR
          </Text>
        </TouchableOpacity>
        
        <TouchableOpacity
          style={[
            styles.tab, 
            activeTab === 'reports' && [styles.activeTab, { borderBottomColor: theme.colors.primary }]
          ]}
          onPress={() => setActiveTab('reports')}
        >
          <Text style={[
            styles.tabText,
            { color: activeTab === 'reports' ? theme.colors.primary : theme.colors.secondaryText }
          ]}>
            Reports
          </Text>
        </TouchableOpacity>
      </View>

      <ScrollView 
        style={styles.content}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />
        }
      >
        {activeTab === 'overview' && renderOverviewTab()}
        {activeTab === 'gdpr' && renderGdprTab()}
        {activeTab === 'reports' && renderReportsTab()}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
  },
  backButton: {
    padding: 4,
  },
  title: {
    fontSize: 20,
    fontWeight: '600' as const,
  },
  placeholder: {
    width: 32,
  },
  tabBar: {
    flexDirection: 'row',
    borderBottomWidth: 1,
  },
  tab: {
    flex: 1,
    paddingVertical: 16,
    alignItems: 'center',
  },
  activeTab: {
    borderBottomWidth: 2,
  },
  tabText: {
    fontSize: 16,
    fontWeight: '500' as const,
  },
  content: {
    flex: 1,
    padding: 20,
  },
  tabContent: {
    gap: 16,
  },
  card: {
    borderRadius: 12,
    padding: 20,
    marginBottom: 16,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    gap: 12,
  },
  cardHeaderTitle: {
    fontSize: 18,
    fontWeight: '600' as const,
  },
  scoreContainer: {
    alignItems: 'center',
    marginVertical: 20,
  },
  scoreValue: {
    fontSize: 48,
    fontWeight: '700' as const,
  },
  scoreLabel: {
    fontSize: 16,
    fontWeight: '500' as const,
    marginTop: 4,
  },
  metricsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 16,
  },
  metricItem: {
    width: '48%',
    alignItems: 'center',
  },
  metricLabel: {
    fontSize: 12,
    textAlign: 'center',
    marginBottom: 4,
  },
  metricValue: {
    fontSize: 24,
    fontWeight: '600' as const,
  },
  metricsList: {
    gap: 16,
  },
  metricRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
  },
  metricInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  metricTitle: {
    fontSize: 16,
    fontWeight: '500' as const,
  },
  metricNumber: {
    fontSize: 16,
    fontWeight: '600' as const,
  },
  recommendationsList: {
    gap: 12,
  },
  recommendationItem: {
    padding: 16,
    borderRadius: 8,
    borderWidth: 1,
  },
  recommendationHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  priorityBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
  },
  priorityText: {
    fontSize: 10,
    fontWeight: '600' as const,
  },
  recommendationDate: {
    fontSize: 12,
  },
  recommendationTitle: {
    fontSize: 16,
    fontWeight: '600' as const,
    marginBottom: 4,
  },
  recommendationDescription: {
    fontSize: 14,
    lineHeight: 20,
  },
  generateButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
    borderRadius: 12,
    marginBottom: 16,
    gap: 8,
  },
  generateButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600' as const,
  },
  requestsList: {
    gap: 12,
  },
  requestItem: {
    padding: 16,
    borderRadius: 8,
    borderWidth: 1,
  },
  requestHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  requestType: {
    fontSize: 14,
    fontWeight: '600' as const,
  },
  requestStatus: {
    fontSize: 12,
    fontWeight: '500' as const,
  },
  requestDate: {
    fontSize: 12,
    marginBottom: 4,
  },
  requestUser: {
    fontSize: 12,
  },
  reportsList: {
    gap: 12,
  },
  reportItem: {
    padding: 16,
    borderRadius: 8,
    borderWidth: 1,
  },
  reportHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  reportType: {
    fontSize: 14,
    fontWeight: '600' as const,
  },
  reportScore: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
    backgroundColor: '#F3F4F6',
  },
  reportScoreText: {
    fontSize: 12,
    fontWeight: '600' as const,
  },
  reportDate: {
    fontSize: 12,
    marginBottom: 4,
  },
  reportFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  reportStatus: {
    fontSize: 12,
    fontWeight: '500' as const,
  },
  reportViolations: {
    fontSize: 12,
    fontWeight: '500' as const,
  },
});
