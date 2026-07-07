import React from 'react';
import { View, StyleSheet, Text, ScrollView } from 'react-native';
import { useTheme } from '@/providers/ThemeProvider';
import { CheckCircle, Clock, AlertTriangle, TrendingUp, DollarSign, ShoppingCart, FileText, Shield, Sparkles, ArrowUpRight, ArrowDownRight, Hourglass, Zap, Filter } from 'lucide-react-native';

interface ApprovalRequest {
  id: string;
  type: 'budget' | 'procurement' | 'contract' | 'policy';
  title: string;
  amount?: string;
  status: 'pending' | 'approved' | 'rejected' | 'escalated';
  submitter: string;
  timeInQueue: string;
  priority: 'low' | 'medium' | 'high' | 'urgent';
}

interface ApprovalMetrics {
  pendingApprovals: number;
  approvalTimes: string;
  escalatedRequests: number;
  budgetRequests: number;
  procurementRequests: number;
  approvalRate: number;
  avgProcessingTime: string;
  slaCompliance: number;
}

interface ApprovalManagementCenterProps {
  metrics: ApprovalMetrics;
  recentRequests: ApprovalRequest[];
}

export default function ApprovalManagementCenter({ metrics, recentRequests }: ApprovalManagementCenterProps) {
  const { theme } = useTheme();

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return '#F59E0B';
      case 'approved': return '#10B981';
      case 'rejected': return '#EF4444';
      case 'escalated': return '#8B5CF6';
      default: return '#6B7280';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pending': return <Clock size={14} color="#F59E0B" />;
      case 'approved': return <CheckCircle size={14} color="#10B981" />;
      case 'rejected': return <AlertTriangle size={14} color="#EF4444" />;
      case 'escalated': return <Zap size={14} color="#8B5CF6" />;
      default: return <Clock size={14} color="#6B7280" />;
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'urgent': return '#EF4444';
      case 'high': return '#F59E0B';
      case 'medium': return '#3B82F6';
      case 'low': return '#10B981';
      default: return '#6B7280';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'budget': return <DollarSign size={16} color="#3B82F6" />;
      case 'procurement': return <ShoppingCart size={16} color="#10B981" />;
      case 'contract': return <FileText size={16} color="#8B5CF6" />;
      case 'policy': return <Shield size={16} color="#F59E0B" />;
      default: return <FileText size={16} color="#6B7280" />;
    }
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.card }]}>
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <View style={[styles.headerIcon, { backgroundColor: '#8B5CF6' + '20' }]}>
            <CheckCircle size={24} color="#8B5CF6" />
          </View>
          <View style={styles.headerText}>
            <Text style={[styles.headerTitle, { color: theme.colors.text }]}>
              Approval Management Command Center
            </Text>
            <Text style={[styles.headerSubtitle, { color: theme.colors.textSecondary }]}>
              Automated approval workflows
            </Text>
          </View>
        </View>
        <View style={[styles.slaBadge, { backgroundColor: metrics.slaCompliance >= 95 ? '#10B981' + '20' : '#F59E0B' + '20' }]}>
          <Sparkles size={16} color={metrics.slaCompliance >= 95 ? '#10B981' : '#F59E0B'} />
          <Text style={[styles.slaBadgeText, { color: metrics.slaCompliance >= 95 ? '#10B981' : '#F59E0B' }]}>
            {metrics.slaCompliance}% SLA
          </Text>
        </View>
      </View>

      <View style={styles.metricsGrid}>
        <View style={[styles.metricCard, { backgroundColor: 'rgba(245, 158, 11, 0.1)', borderColor: '#F59E0B' + '30' }]}>
          <View style={[styles.metricIcon, { backgroundColor: '#F59E0B' + '20' }]}>
            <Clock size={20} color="#F59E0B" />
          </View>
          <Text style={[styles.metricLabel, { color: theme.colors.textSecondary }]}>
            Pending Approvals
          </Text>
          <Text style={[styles.metricValue, { color: theme.colors.text }]}>
            {metrics.pendingApprovals}
          </Text>
          <View style={styles.metricTrend}>
            <ArrowUpRight size={12} color="#EF4444" />
            <Text style={[styles.trendText, { color: '#EF4444' }]}>
              +8.2%
            </Text>
          </View>
        </View>

        <View style={[styles.metricCard, { backgroundColor: 'rgba(16, 185, 129, 0.1)', borderColor: '#10B981' + '30' }]}>
          <View style={[styles.metricIcon, { backgroundColor: '#10B981' + '20' }]}>
            <CheckCircle size={20} color="#10B981" />
          </View>
          <Text style={[styles.metricLabel, { color: theme.colors.textSecondary }]}>
            Approval Rate
          </Text>
          <Text style={[styles.metricValue, { color: theme.colors.text }]}>
            {metrics.approvalRate}%
          </Text>
          <View style={styles.metricTrend}>
            <ArrowUpRight size={12} color="#10B981" />
            <Text style={[styles.trendText, { color: '#10B981' }]}>
              +3.5%
            </Text>
          </View>
        </View>

        <View style={[styles.metricCard, { backgroundColor: 'rgba(139, 92, 246, 0.1)', borderColor: '#8B5CF6' + '30' }]}>
          <View style={[styles.metricIcon, { backgroundColor: '#8B5CF6' + '20' }]}>
            <Zap size={20} color="#8B5CF6" />
          </View>
          <Text style={[styles.metricLabel, { color: theme.colors.textSecondary }]}>
            Escalated
          </Text>
          <Text style={[styles.metricValue, { color: theme.colors.text }]}>
            {metrics.escalatedRequests}
          </Text>
          <View style={styles.metricTrend}>
            <ArrowDownRight size={12} color="#10B981" />
            <Text style={[styles.trendText, { color: '#10B981' }]}>
              -12.8%
            </Text>
          </View>
        </View>

        <View style={[styles.metricCard, { backgroundColor: 'rgba(59, 130, 246, 0.1)', borderColor: '#3B82F6' + '30' }]}>
          <View style={[styles.metricIcon, { backgroundColor: '#3B82F6' + '20' }]}>
            <Hourglass size={20} color="#3B82F6" />
          </View>
          <Text style={[styles.metricLabel, { color: theme.colors.textSecondary }]}>
            Avg Processing
          </Text>
          <Text style={[styles.metricValue, { color: theme.colors.text }]}>
            {metrics.avgProcessingTime}
          </Text>
          <View style={styles.metricTrend}>
            <ArrowDownRight size={12} color="#10B981" />
            <Text style={[styles.trendText, { color: '#10B981' }]}>
              -18.5%
            </Text>
          </View>
        </View>
      </View>

      <View style={[styles.requestsSection, { backgroundColor: 'rgba(255,255,255,0.02)', borderColor: 'rgba(255,255,255,0.08)' }]}>
        <View style={styles.requestsHeader}>
          <Filter size={20} color="#8B5CF6" />
          <Text style={[styles.requestsTitle, { color: theme.colors.text }]}>
            Recent Approval Requests
          </Text>
          <View style={[styles.requestsBadge, { backgroundColor: '#F59E0B' + '20' }]}>
            <Clock size={14} color="#F59E0B" />
            <Text style={[styles.requestsBadgeText, { color: '#F59E0B' }]}>
              {metrics.pendingApprovals} Pending
            </Text>
          </View>
        </View>

        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.requestsScroll}>
          {recentRequests.map((request) => (
            <View key={request.id} style={[styles.requestCard, { borderColor: getStatusColor(request.status) + '30', borderWidth: 1 }]}>
              <View style={styles.requestHeader}>
                <View style={[styles.requestTypeIcon, { backgroundColor: '#8B5CF6' + '15' }]}>
                  {getTypeIcon(request.type)}
                </View>
                <View style={[styles.priorityBadge, { backgroundColor: getPriorityColor(request.priority) + '20' }]}>
                  <View style={[styles.priorityDot, { backgroundColor: getPriorityColor(request.priority) }]} />
                  <Text style={[styles.priorityText, { color: getPriorityColor(request.priority) }]}>
                    {request.priority.toUpperCase()}
                  </Text>
                </View>
              </View>

              <Text style={[styles.requestTitle, { color: theme.colors.text }]} numberOfLines={2}>
                {request.title}
              </Text>

              {request.amount && (
                <Text style={[styles.requestAmount, { color: '#10B981' }]}>
                  {request.amount}
                </Text>
              )}

              <View style={styles.requestMeta}>
                <View style={styles.requestMetaItem}>
                  {getStatusIcon(request.status)}
                  <Text style={[styles.requestMetaText, { color: theme.colors.textSecondary }]}>
                    {request.status.charAt(0).toUpperCase() + request.status.slice(1)}
                  </Text>
                </View>
                <View style={styles.requestMetaItem}>
                  <Clock size={12} color="#6B7280" />
                  <Text style={[styles.requestMetaText, { color: theme.colors.textSecondary }]}>
                    {request.timeInQueue}
                  </Text>
                </View>
              </View>

              <View style={styles.requestSubmitter}>
                <Text style={[styles.requestSubmitterLabel, { color: theme.colors.textSecondary }]}>
                  Submitted by
                </Text>
                <Text style={[styles.requestSubmitterName, { color: theme.colors.text }]}>
                  {request.submitter}
                </Text>
              </View>
            </View>
          ))}
        </ScrollView>
      </View>

      <View style={styles.funnelSection}>
        <View style={styles.funnelHeader}>
          <TrendingUp size={20} color="#8B5CF6" />
          <Text style={[styles.funnelTitle, { color: theme.colors.text }]}>
            Approval Funnel
          </Text>
        </View>

        <View style={styles.funnelMetrics}>
          <View style={styles.funnelStage}>
            <View style={[styles.funnelBar, { backgroundColor: '#3B82F6', height: '100%' }]} />
            <Text style={[styles.funnelLabel, { color: theme.colors.textSecondary }]}>
              Submitted
            </Text>
            <Text style={[styles.funnelValue, { color: theme.colors.text }]}>
              {metrics.budgetRequests + metrics.procurementRequests}
            </Text>
          </View>

          <View style={styles.funnelStage}>
            <View style={[styles.funnelBar, { backgroundColor: '#F59E0B', height: '75%' }]} />
            <Text style={[styles.funnelLabel, { color: theme.colors.textSecondary }]}>
              Pending
            </Text>
            <Text style={[styles.funnelValue, { color: theme.colors.text }]}>
              {metrics.pendingApprovals}
            </Text>
          </View>

          <View style={styles.funnelStage}>
            <View style={[styles.funnelBar, { backgroundColor: '#10B981', height: `${metrics.approvalRate}%` }]} />
            <Text style={[styles.funnelLabel, { color: theme.colors.textSecondary }]}>
              Approved
            </Text>
            <Text style={[styles.funnelValue, { color: theme.colors.text }]}>
              {Math.round((metrics.budgetRequests + metrics.procurementRequests) * (metrics.approvalRate / 100))}
            </Text>
          </View>

          <View style={styles.funnelStage}>
            <View style={[styles.funnelBar, { backgroundColor: '#EF4444', height: '15%' }]} />
            <Text style={[styles.funnelLabel, { color: theme.colors.textSecondary }]}>
              Rejected
            </Text>
            <Text style={[styles.funnelValue, { color: theme.colors.text }]}>
              {Math.round((metrics.budgetRequests + metrics.procurementRequests) * 0.15)}
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 16,
    padding: 16,
    marginVertical: 8,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  headerIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerText: {
    flex: 1,
  },
  headerTitle: {
    fontSize: 16,
    fontWeight: '600',
  },
  headerSubtitle: {
    fontSize: 12,
    marginTop: 2,
  },
  slaBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  slaBadgeText: {
    fontSize: 12,
    fontWeight: '600',
  },
  metricsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
    marginBottom: 16,
  },
  metricCard: {
    flex: 1,
    minWidth: 140,
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
  },
  metricIcon: {
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  metricLabel: {
    fontSize: 11,
    fontWeight: '500',
    textTransform: 'uppercase',
    marginBottom: 4,
  },
  metricValue: {
    fontSize: 24,
    fontWeight: '700',
    marginBottom: 8,
  },
  metricTrend: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  trendText: {
    fontSize: 12,
    fontWeight: '600',
  },
  requestsSection: {
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    marginBottom: 16,
  },
  requestsHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 16,
  },
  requestsTitle: {
    fontSize: 14,
    fontWeight: '600',
    flex: 1,
  },
  requestsBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  requestsBadgeText: {
    fontSize: 11,
    fontWeight: '600',
  },
  requestsScroll: {
    gap: 12,
  },
  requestCard: {
    width: 200,
    borderRadius: 12,
    padding: 16,
    backgroundColor: 'rgba(255,255,255,0.02)',
  },
  requestHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  requestTypeIcon: {
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  priorityBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingHorizontal: 6,
    paddingVertical: 3,
    borderRadius: 8,
  },
  priorityDot: {
    width: 4,
    height: 4,
    borderRadius: 2,
  },
  priorityText: {
    fontSize: 9,
    fontWeight: '600',
  },
  requestTitle: {
    fontSize: 13,
    fontWeight: '600',
    marginBottom: 8,
    minHeight: 32,
  },
  requestAmount: {
    fontSize: 16,
    fontWeight: '700',
    marginBottom: 12,
  },
  requestMeta: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 12,
  },
  requestMetaItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  requestMetaText: {
    fontSize: 10,
  },
  requestSubmitter: {
    paddingTop: 8,
    borderTopWidth: 1,
    borderTopColor: 'rgba(255,255,255,0.08)',
  },
  requestSubmitterLabel: {
    fontSize: 10,
    marginBottom: 2,
  },
  requestSubmitterName: {
    fontSize: 11,
    fontWeight: '600',
  },
  funnelSection: {
    marginBottom: 8,
  },
  funnelHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 12,
  },
  funnelTitle: {
    fontSize: 14,
    fontWeight: '600',
  },
  funnelMetrics: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'flex-end',
    height: 120,
  },
  funnelStage: {
    alignItems: 'center',
    flex: 1,
  },
  funnelBar: {
    width: 40,
    borderRadius: 8,
    marginBottom: 8,
  },
  funnelLabel: {
    fontSize: 10,
    marginBottom: 4,
  },
  funnelValue: {
    fontSize: 14,
    fontWeight: '700',
  },
});