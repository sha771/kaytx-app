import React, { useState } from 'react';
import { View, StyleSheet, Text, ScrollView, TouchableOpacity, Dimensions } from 'react-native';
import { useTheme } from '@/providers/ThemeProvider';
import { professionalServicesDashboardConfig } from '@/constants/dashboardMetrics';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import {
  Shield,
  ChevronLeft,
  Target,
  TrendingUp,
  DollarSign,
  BarChart3,
  Search,
  Filter,
  Plus,
  MoreVertical,
  Calendar,
  ArrowUpRight,
  ArrowDownRight,
  Activity,
  Layers,
  Zap,
  Settings,
  RefreshCw,
  CheckCircle,
  XCircle,
  Clock,
  Award,
  Briefcase,
  Building,
  Globe,
  MapPin,
  AlertTriangle,
  Flag,
  FileText,
  Users,
  Lock,
  Eye,
  Scale,
  Gavel,
  FileCheck,
  AlertOctagon,
  Ban,
  Info,
} from 'lucide-react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const { width } = Dimensions.get('window');

export default function RiskComplianceCommandCenter() {
  const { theme } = useTheme();
  const router = useRouter();
  const [selectedView, setSelectedView] = useState<'all' | 'high' | 'medium' | 'low'>('all');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const colors = {
    background: '#050B14',
    card: 'rgba(10, 20, 40, 0.8)',
    cardBorder: 'rgba(30, 58, 95, 0.5)',
    text: '#FFFFFF',
    textSecondary: '#94A3B8',
    electricBlue: '#3B82F6',
    emeraldGreen: '#10B981',
    purple: '#8B5CF6',
    amber: '#F59E0B',
    red: '#EF4444',
    glass: 'rgba(255, 255, 255, 0.05)',
    glassBorder: 'rgba(255, 255, 255, 0.1)'
  };

  const riskMetrics = {
    totalRisks: 156,
    criticalRisks: 8,
    highRisks: 24,
    mediumRisks: 68,
    lowRisks: 56,
    openRisks: 92,
    mitigatedRisks: 64,
    avgRiskScore: 4.2,
    riskTrend: '-12%',
    complianceScore: 94
  };

  const riskCategories = [
    { category: 'Project Delivery', count: 42, critical: 4, high: 12, trend: '-8%' },
    { category: 'Financial', count: 28, critical: 2, high: 6, trend: '-15%' },
    { category: 'Operational', count: 36, critical: 1, high: 4, trend: '-5%' },
    { category: 'Compliance', count: 24, critical: 1, high: 2, trend: '-20%' },
    { category: 'Strategic', count: 18, critical: 0, high: 0, trend: '-10%' },
    { category: 'Reputation', count: 8, critical: 0, high: 0, trend: '-25%' }
  ];

  const risks = [
    {
      id: 1,
      title: 'Cloud Migration Timeline Risk',
      category: 'Project Delivery',
      severity: 'critical',
      score: 9,
      status: 'open',
      owner: 'CTO',
      likelihood: 'High',
      impact: 'Critical',
      mitigation: 'Resource augmentation',
      progress: 30,
      dueDate: '2024-02-15',
      dependencies: 3,
      lastReview: '2024-01-18'
    },
    {
      id: 2,
      title: 'Budget Overrun on AI Implementation',
      category: 'Financial',
      severity: 'high',
      score: 7,
      status: 'open',
      owner: 'CFO',
      likelihood: 'Medium',
      impact: 'High',
      mitigation: 'Scope adjustment',
      progress: 50,
      dueDate: '2024-02-01',
      dependencies: 2,
      lastReview: '2024-01-15'
    },
    {
      id: 3,
      title: 'Data Privacy Compliance',
      category: 'Compliance',
      severity: 'high',
      score: 8,
      status: 'mitigating',
      owner: 'CISO',
      likelihood: 'Medium',
      impact: 'Critical',
      mitigation: 'Policy update',
      progress: 75,
      dueDate: '2024-01-31',
      dependencies: 1,
      lastReview: '2024-01-20'
    },
    {
      id: 4,
      title: 'Key Personnel Dependency',
      category: 'Operational',
      severity: 'medium',
      score: 5,
      status: 'open',
      owner: 'CHRO',
      likelihood: 'Medium',
      impact: 'Medium',
      mitigation: 'Succession planning',
      progress: 40,
      dueDate: '2024-03-01',
      dependencies: 0,
      lastReview: '2024-01-10'
    },
    {
      id: 5,
      title: 'Vendor Concentration Risk',
      category: 'Strategic',
      severity: 'medium',
      score: 6,
      status: 'mitigating',
      owner: 'CPO',
      likelihood: 'Low',
      impact: 'High',
      mitigation: 'Diversification',
      progress: 60,
      dueDate: '2024-04-15',
      dependencies: 2,
      lastReview: '2024-01-12'
    }
  ];

  const complianceItems = [
    { area: 'Data Privacy', status: 'compliant', score: 96, lastAudit: '2024-01-15', nextAudit: '2024-07-15' },
    { area: 'Security Standards', status: 'compliant', score: 98, lastAudit: '2024-01-10', nextAudit: '2024-04-10' },
    { area: 'Financial Reporting', status: 'compliant', score: 94, lastAudit: '2024-01-20', nextAudit: '2024-04-20' },
    { area: 'Industry Regulations', status: 'minor-issues', score: 88, lastAudit: '2024-01-18', nextAudit: '2024-02-18' },
    { area: 'Environmental Compliance', status: 'compliant', score: 92, lastAudit: '2024-01-05', nextAudit: '2024-07-05' }
  ];

  const renderMetricCard = (label: string, value: string | number, icon: any, color: string, trend?: string, trendColor?: string) => (
    <View style={[styles.metricCard, { backgroundColor: colors.card, borderColor: colors.cardBorder, borderWidth: 1 }]}>
      <View style={[styles.metricIcon, { backgroundColor: color + '20' }]}>
        {React.createElement(icon, { size: 20, color: color })}
      </View>
      <Text style={[styles.metricCardValue, { color: color }]}>{typeof value === 'number' ? value.toLocaleString() : value}</Text>
      <Text style={[styles.metricCardLabel, { color: colors.textSecondary }]}>{label}</Text>
      {trend && (
        <View style={styles.trendRow}>
          {React.createElement(trend.startsWith('-') ? ArrowDownRight : ArrowUpRight, { size: 12, color: trendColor || colors.emeraldGreen })}
          <Text style={[styles.trendText, { color: trendColor || colors.emeraldGreen }]}>{trend}</Text>
        </View>
      )}
    </View>
  );

  const renderCategoryRow = (category: any, index: number) => (
    <View key={index} style={[styles.categoryRow, { borderBottomColor: colors.cardBorder }]}>
      <Text style={[styles.categoryName, { color: colors.text }]}>{category.category}</Text>
      <Text style={[styles.categoryCount, { color: colors.text }]}>{category.count}</Text>
      <View style={styles.severityBadges}>
        <View style={[styles.severityBadge, { backgroundColor: colors.red + '20' }]}>
          <Text style={[styles.severityText, { color: colors.red }]}>{category.critical}</Text>
        </View>
        <View style={[styles.severityBadge, { backgroundColor: colors.amber + '20' }]}>
          <Text style={[styles.severityText, { color: colors.amber }]}>{category.high}</Text>
        </View>
      </View>
      <View style={styles.trendBadge}>
        <TrendingUp size={12} color={colors.emeraldGreen} />
        <Text style={[styles.trendText, { color: colors.emeraldGreen }]}>{category.trend}</Text>
      </View>
    </View>
  );

  const renderRiskCard = (risk: any) => (
    <View key={risk.id} style={[styles.riskCard, { backgroundColor: colors.card, borderColor: colors.cardBorder, borderWidth: 1 }]}>
      <View style={styles.riskHeader}>
        <View style={styles.riskInfo}>
          <View style={styles.riskNameRow}>
            <Text style={[styles.riskTitle, { color: colors.text }]}>{risk.title}</Text>
            <View style={[
              styles.severityBadge,
              { backgroundColor: risk.severity === 'critical' ? colors.red + '20' : risk.severity === 'high' ? colors.amber + '20' : colors.electricBlue + '20' }
            ]}>
              <AlertTriangle size={12} color={risk.severity === 'critical' ? colors.red : risk.severity === 'high' ? colors.amber : colors.electricBlue} />
              <Text style={[
                styles.severityText,
                { color: risk.severity === 'critical' ? colors.red : risk.severity === 'high' ? colors.amber : colors.electricBlue }
              ]}>{risk.severity}</Text>
            </View>
          </View>
          <Text style={[styles.riskCategory, { color: colors.textSecondary }]}>{risk.category} • Owner: {risk.owner}</Text>
        </View>
        <View style={[
          styles.statusBadge,
          { backgroundColor: risk.status === 'mitigating' ? colors.emeraldGreen + '20' : colors.amber + '20' }
        ]}>
          <Text style={[
            styles.statusText,
            { color: risk.status === 'mitigating' ? colors.emeraldGreen : colors.amber }
          ]}>{risk.status}</Text>
        </View>
      </View>

      <View style={styles.riskScore}>
        <View style={styles.scoreRow}>
          <Text style={[styles.scoreLabel, { color: colors.textSecondary }]}>Risk Score</Text>
          <View style={[styles.scoreBar, { backgroundColor: colors.glass }]}>
            <View style={[styles.scoreFill, { width: `${(risk.score / 10) * 100}%`, backgroundColor: risk.score >= 8 ? colors.red : risk.score >= 5 ? colors.amber : colors.electricBlue }]} />
          </View>
          <Text style={[styles.scoreValue, { color: risk.score >= 8 ? colors.red : risk.score >= 5 ? colors.amber : colors.electricBlue }]}>{risk.score}/10</Text>
        </View>
      </View>

      <View style={styles.riskMetrics}>
        <View style={styles.riskMetric}>
          <Target size={14} color={colors.textSecondary} />
          <Text style={[styles.metricValue, { color: colors.text }]}>{risk.likelihood}</Text>
          <Text style={[styles.metricLabel, { color: colors.textSecondary }]}>Likelihood</Text>
        </View>
        <View style={styles.riskMetric}>
          <AlertOctagon size={14} color={colors.textSecondary} />
          <Text style={[styles.metricValue, { color: colors.text }]}>{risk.impact}</Text>
          <Text style={[styles.metricLabel, { color: colors.textSecondary }]}>Impact</Text>
        </View>
        <View style={styles.riskMetric}>
          <Shield size={14} color={colors.emeraldGreen} />
          <Text style={[styles.metricValue, { color: colors.emeraldGreen }]}>{risk.progress}%</Text>
          <Text style={[styles.metricLabel, { color: colors.textSecondary }]}>Mitigated</Text>
        </View>
        <View style={styles.riskMetric}>
          <Layers size={14} color={colors.textSecondary} />
          <Text style={[styles.metricValue, { color: colors.text }]}>{risk.dependencies}</Text>
          <Text style={[styles.metricLabel, { color: colors.textSecondary }]}>Dependencies</Text>
        </View>
      </View>

      <View style={styles.riskDetails}>
        <View style={styles.detailRow}>
          <FileText size={12} color={colors.textSecondary} />
          <Text style={[styles.detailText, { color: colors.textSecondary }]}>Mitigation: {risk.mitigation}</Text>
        </View>
        <View style={styles.detailRow}>
          <Calendar size={12} color={colors.textSecondary} />
          <Text style={[styles.detailText, { color: colors.textSecondary }]}>Due: {risk.dueDate}</Text>
        </View>
        <View style={styles.detailRow}>
          <Eye size={12} color={colors.textSecondary} />
          <Text style={[styles.detailText, { color: colors.textSecondary }]}>Last Review: {risk.lastReview}</Text>
        </View>
      </View>

      <View style={styles.riskActions}>
        <TouchableOpacity style={[styles.actionButton, { backgroundColor: colors.glass, borderColor: colors.glassBorder }]}>
          <FileText size={16} color={colors.textSecondary} />
          <Text style={[styles.actionButtonText, { color: colors.textSecondary }]}>Details</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.actionButton, { backgroundColor: colors.electricBlue + '20', borderColor: colors.electricBlue + '40' }]}>
          <Shield size={16} color={colors.electricBlue} />
          <Text style={[styles.actionButtonText, { color: colors.electricBlue }]}>Mitigate</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.actionButton, { backgroundColor: colors.emeraldGreen + '20', borderColor: colors.emeraldGreen + '40' }]}>
          <CheckCircle size={16} color={colors.emeraldGreen} />
          <Text style={[styles.actionButtonText, { color: colors.emeraldGreen }]}>Close</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  const renderComplianceRow = (item: any, index: number) => (
    <View key={index} style={[styles.complianceRow, { borderBottomColor: colors.cardBorder }]}>
      <View style={styles.complianceInfo}>
        <Scale size={16} color={colors.electricBlue} />
        <Text style={[styles.complianceArea, { color: colors.text }]}>{item.area}</Text>
      </View>
      <View style={[
        styles.complianceStatus,
        { backgroundColor: item.status === 'compliant' ? colors.emeraldGreen + '20' : colors.amber + '20' }
      ]}>
        <CheckCircle size={12} color={item.status === 'compliant' ? colors.emeraldGreen : colors.amber} />
        <Text style={[
          styles.complianceStatusText,
          { color: item.status === 'compliant' ? colors.emeraldGreen : colors.amber }
        ]}>{item.status === 'compliant' ? 'Compliant' : 'Minor Issues'}</Text>
      </View>
      <Text style={[styles.complianceScore, { color: item.score >= 95 ? colors.emeraldGreen : item.score >= 90 ? colors.electricBlue : colors.amber }]}>{item.score}%</Text>
      <Text style={[styles.complianceAudit, { color: colors.textSecondary }]}>{item.nextAudit}</Text>
    </View>
  );

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]} edges={['top']}>
      {/* Header */}
      <LinearGradient
        colors={['rgba(16, 185, 129, 0.1)', 'rgba(5, 11, 20, 0.9)']}
        style={[styles.header, { borderBottomColor: colors.cardBorder, borderBottomWidth: 1 }]}
      >
        <View style={styles.headerLeft}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => router.back()}
          >
            <ChevronLeft size={24} color={colors.text} />
          </TouchableOpacity>
          <LinearGradient
            colors={['#10B981', '#059669']}
            style={styles.headerIcon}
          >
            <Shield size={24} color="#FFFFFF" />
          </LinearGradient>
          <View>
            <Text style={[styles.headerTitle, { color: colors.text }]}>Risk & Compliance Center</Text>
            <Text style={[styles.headerSubtitle, { color: colors.textSecondary }]}>Enterprise Risk Management & Regulatory Compliance</Text>
          </View>
        </View>
        <View style={styles.headerActions}>
          <TouchableOpacity style={[styles.headerButton, { backgroundColor: colors.glass, borderColor: colors.glassBorder }]}>
            <Search size={20} color={colors.textSecondary} />
          </TouchableOpacity>
          <TouchableOpacity style={[styles.headerButton, { backgroundColor: colors.glass, borderColor: colors.glassBorder }]}>
            <Filter size={20} color={colors.textSecondary} />
          </TouchableOpacity>
          <TouchableOpacity style={[styles.headerButton, { backgroundColor: colors.glass, borderColor: colors.glassBorder }]}>
            <RefreshCw size={20} color={colors.textSecondary} />
          </TouchableOpacity>
        </View>
      </LinearGradient>

      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Risk Metrics */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>Risk Overview</Text>
          <View style={styles.metricsGrid}>
            {renderMetricCard('Total Risks', riskMetrics.totalRisks, AlertTriangle, colors.electricBlue)}
            {renderMetricCard('Critical', riskMetrics.criticalRisks, AlertOctagon, colors.red)}
            {renderMetricCard('High', riskMetrics.highRisks, AlertTriangle, colors.amber)}
            {renderMetricCard('Open', riskMetrics.openRisks, Layers, colors.electricBlue)}
            {renderMetricCard('Mitigated', riskMetrics.mitigatedRisks, CheckCircle, colors.emeraldGreen)}
            {renderMetricCard('Avg Score', riskMetrics.avgRiskScore, Scale, colors.amber)}
            {renderMetricCard('Risk Trend', riskMetrics.riskTrend, TrendingUp, colors.emeraldGreen, riskMetrics.riskTrend, colors.emeraldGreen)}
            {renderMetricCard('Compliance', `${riskMetrics.complianceScore}%`, FileCheck, colors.emeraldGreen)}
          </View>
        </View>

        {/* Risk Categories */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>Risk by Category</Text>
          <View style={[styles.categoryCard, { backgroundColor: colors.card, borderColor: colors.cardBorder, borderWidth: 1 }]}>
            <View style={styles.categoryHeader}>
              <Text style={[styles.columnHeader, { color: colors.textSecondary }]}>Category</Text>
              <Text style={[styles.columnHeader, { color: colors.textSecondary }]}>Total</Text>
              <Text style={[styles.columnHeader, { color: colors.textSecondary }]}>Severity</Text>
              <Text style={[styles.columnHeader, { color: colors.textSecondary }]}>Trend</Text>
            </View>
            {riskCategories.map((category, index) => renderCategoryRow(category, index))}
          </View>
        </View>

        {/* Compliance Status */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>Compliance Status</Text>
          <View style={[styles.complianceCard, { backgroundColor: colors.card, borderColor: colors.cardBorder, borderWidth: 1 }]}>
            {complianceItems.map((item, index) => renderComplianceRow(item, index))}
          </View>
        </View>

        {/* View Filters */}
        <View style={styles.section}>
          <View style={styles.filterTabs}>
            {['all', 'high', 'medium', 'low'].map((view) => (
              <TouchableOpacity
                key={view}
                style={[
                  styles.filterTab,
                  selectedView === view && styles.activeFilterTab,
                  { backgroundColor: selectedView === view ? colors.electricBlue : colors.glass }
                ]}
                onPress={() => setSelectedView(view as any)}
              >
                <Text style={[
                  styles.filterTabText,
                  { color: selectedView === view ? '#FFFFFF' : colors.textSecondary }
                ]}>
                  {view.charAt(0).toUpperCase() + view.slice(1)}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Risks Grid */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={[styles.sectionTitle, { color: colors.text }]}>
              {selectedView === 'all' ? 'All Risks' : selectedView === 'high' ? 'High Severity Risks' : selectedView === 'medium' ? 'Medium Severity Risks' : 'Low Severity Risks'}
            </Text>
            <TouchableOpacity style={[styles.addButton, { backgroundColor: colors.emeraldGreen }]}>
              <Plus size={20} color="white" />
              <Text style={styles.addButtonText}>Log Risk</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.risksGrid}>
            {risks
              .filter(r => selectedView === 'all' || r.severity === selectedView || (selectedView === 'high' && r.severity === 'critical'))
              .map((risk) => renderRiskCard(risk))}
          </View>
        </View>

        {/* AI Risk Insights */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>AI Risk Intelligence</Text>
          <View style={[styles.insightsCard, { backgroundColor: colors.card, borderColor: colors.cardBorder, borderWidth: 1 }]}>
            <View style={styles.insightItem}>
              <View style={[styles.insightIcon, { backgroundColor: colors.red + '20' }]}>
                <AlertTriangle size={20} color={colors.red} />
              </View>
              <View style={styles.insightContent}>
                <Text style={[styles.insightTitle, { color: colors.text }]}>Critical Risk Escalation</Text>
                <Text style={[styles.insightDescription, { color: colors.textSecondary }]}>
                  Cloud Migration timeline risk score increased to 9/10. AI recommends immediate executive escalation and resource intervention.
                </Text>
              </View>
              <TouchableOpacity style={[styles.insightAction, { backgroundColor: colors.emeraldGreen + '20', borderColor: colors.emeraldGreen + '40', borderWidth: 1 }]}>
                <Text style={[styles.insightActionText, { color: colors.emeraldGreen }]}>Escalate</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.insightItem}>
              <View style={[styles.insightIcon, { backgroundColor: colors.amber + '20' }]}>
                <AlertTriangle size={20} color={colors.amber} />
              </View>
              <View style={styles.insightContent}>
                <Text style={[styles.insightTitle, { color: colors.text }]}>Emerging Risk Pattern</Text>
                <Text style={[styles.insightDescription, { color: colors.textSecondary }]}>
                  AI detects pattern of vendor concentration risks across multiple initiatives. Recommend enterprise-wide vendor diversification strategy.
                </Text>
              </View>
              <TouchableOpacity style={[styles.insightAction, { backgroundColor: colors.emeraldGreen + '20', borderColor: colors.emeraldGreen + '40', borderWidth: 1 }]}>
                <Text style={[styles.insightActionText, { color: colors.emeraldGreen }]}>Address</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.insightItem}>
              <View style={[styles.insightIcon, { backgroundColor: colors.emeraldGreen + '20' }]}>
                <TrendingUp size={20} color={colors.emeraldGreen} />
              </View>
              <View style={styles.insightContent}>
                <Text style={[styles.insightTitle, { color: colors.text }]}>Risk Reduction Success</Text>
                <Text style={[styles.insightDescription, { color: colors.textSecondary }]}>
                  Overall risk trend improved by 12% this quarter. AI identifies key success factors for replication across organization.
                </Text>
              </View>
              <TouchableOpacity style={[styles.insightAction, { backgroundColor: colors.emeraldGreen + '20', borderColor: colors.emeraldGreen + '40', borderWidth: 1 }]}>
                <Text style={[styles.insightActionText, { color: colors.emeraldGreen }]}>Analyze</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
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
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  backButton: {
    padding: 8,
    marginRight: 12,
  },
  headerIcon: {
    width: 48,
    height: 48,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  headerSubtitle: {
    fontSize: 12,
    marginTop: 2,
  },
  headerActions: {
    flexDirection: 'row',
    gap: 8,
  },
  headerButton: {
    width: 40,
    height: 40,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
  },
  scrollView: {
    flex: 1,
  },
  section: {
    padding: 16,
    marginBottom: 8,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  metricsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  metricCard: {
    width: (width - 64) / 4,
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  metricIcon: {
    width: 40,
    height: 40,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  metricCardValue: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  metricCardLabel: {
    fontSize: 11,
    textAlign: 'center',
  },
  trendRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginTop: 4,
  },
  trendText: {
    fontSize: 11,
    fontWeight: '600',
  },
  categoryCard: {
    padding: 16,
    borderRadius: 12,
  },
  categoryHeader: {
    flexDirection: 'row',
    paddingBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255,255,255,0.1)',
    marginBottom: 8,
  },
  columnHeader: {
    flex: 1,
    fontSize: 12,
    fontWeight: '600',
  },
  categoryRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
  },
  categoryName: {
    flex: 1.5,
    fontSize: 13,
    fontWeight: '500',
  },
  categoryCount: {
    flex: 0.8,
    fontSize: 13,
    fontWeight: '600',
    textAlign: 'right',
  },
  severityBadges: {
    flexDirection: 'row',
    gap: 4,
    flex: 1,
    justifyContent: 'flex-end',
  },
  severityBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 6,
  },
  severityText: {
    fontSize: 10,
    fontWeight: '600',
  },
  trendBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  complianceCard: {
    padding: 16,
    borderRadius: 12,
  },
  complianceRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
  },
  complianceInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    flex: 1.5,
  },
  complianceArea: {
    fontSize: 13,
    fontWeight: '500',
  },
  complianceStatus: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  complianceStatusText: {
    fontSize: 11,
    fontWeight: '600',
  },
  complianceScore: {
    flex: 0.8,
    fontSize: 13,
    fontWeight: '600',
    textAlign: 'right',
  },
  complianceAudit: {
    flex: 1,
    fontSize: 12,
    textAlign: 'right',
  },
  filterTabs: {
    flexDirection: 'row',
    gap: 8,
  },
  filterTab: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 8,
  },
  activeFilterTab: {
    backgroundColor: '#3B82F6',
  },
  filterTabText: {
    fontSize: 14,
    fontWeight: '500',
  },
  addButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 8,
    gap: 6,
  },
  addButtonText: {
    color: 'white',
    fontSize: 14,
    fontWeight: '600',
  },
  risksGrid: {
    gap: 12,
  },
  riskCard: {
    padding: 16,
    borderRadius: 12,
  },
  riskHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  riskInfo: {
    flex: 1,
  },
  riskNameRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 4,
  },
  riskTitle: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  riskCategory: {
    fontSize: 14,
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  statusText: {
    fontSize: 11,
    fontWeight: '600',
  },
  riskScore: {
    marginBottom: 12,
  },
  scoreRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  scoreLabel: {
    fontSize: 12,
    width: 70,
  },
  scoreBar: {
    flex: 1,
    height: 6,
    borderRadius: 3,
    marginHorizontal: 12,
  },
  scoreFill: {
    height: '100%',
    borderRadius: 3,
  },
  scoreValue: {
    fontSize: 14,
    fontWeight: '600',
    width: 40,
    textAlign: 'right',
  },
  riskMetrics: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  riskMetric: {
    alignItems: 'center',
  },
  metricValue: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 2,
  },
  metricLabel: {
    fontSize: 10,
  },
  riskDetails: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
    marginBottom: 12,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: 'rgba(255,255,255,0.1)',
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  detailText: {
    fontSize: 12,
  },
  riskActions: {
    flexDirection: 'row',
    gap: 8,
  },
  actionButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
    borderRadius: 8,
    gap: 6,
    borderWidth: 1,
  },
  actionButtonText: {
    fontSize: 12,
    fontWeight: '500',
  },
  insightsCard: {
    padding: 16,
    borderRadius: 12,
  },
  insightItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255,255,255,0.1)',
  },
  insightIcon: {
    width: 40,
    height: 40,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  insightContent: {
    flex: 1,
  },
  insightTitle: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 4,
  },
  insightDescription: {
    fontSize: 12,
    marginBottom: 8,
  },
  insightAction: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 6,
  },
  insightActionText: {
    fontSize: 12,
    fontWeight: '600',
  },
});
