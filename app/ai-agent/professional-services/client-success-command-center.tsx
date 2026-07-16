import React, { useState } from 'react';
import { View, StyleSheet, Text, ScrollView, TouchableOpacity, Dimensions } from 'react-native';
import { useTheme } from '@/providers/ThemeProvider';
import { professionalServicesDashboardConfig } from '@/constants/dashboardMetrics';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import {
  Building,
  ChevronLeft,
  Target,
  TrendingUp,
  DollarSign,
  Users,
  Clock,
  AlertTriangle,
  BarChart3,
  Search,
  Filter,
  Plus,
  MoreVertical,
  Star,
  Heart,
  MessageSquare,
  Phone,
  Mail,
  Calendar,
  Award,
  Zap,
  Shield,
  Settings,
  RefreshCw,
  CheckCircle,
  XCircle,
  ArrowUpRight,
  ArrowDownRight,
  Activity,
  Globe,
  MapPin,
  Briefcase,
  FileText,
} from 'lucide-react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const { width } = Dimensions.get('window');

export default function ClientSuccessCommandCenter() {
  const { theme } = useTheme();
  const router = useRouter();
  const [selectedView, setSelectedView] = useState<'all' | 'strategic' | 'enterprise' | 'mid-market'>('all');
  const [selectedHealth, setSelectedHealth] = useState<string>('all');

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
    glassBorder: 'rgba(255, 255, 255, 0.1)',
  };

  const clientMetrics = {
    totalClients: 1240,
    strategicAccounts: 45,
    enterpriseClients: 280,
    midMarket: 580,
    smb: 335,
    avgHealthScore: 89,
    avgSatisfaction: 94,
    renewalPipeline: '$840M',
    expansionOpportunities: '$1.2B',
    atRiskClients: 18,
    churnRisk: 8
  };

  const healthDistribution = [
    { score: 'Excellent', count: 420, percentage: 34, color: colors.emeraldGreen },
    { score: 'Good', count: 560, percentage: 45, color: colors.electricBlue },
    { score: 'Fair', count: 180, percentage: 15, color: colors.amber },
    { score: 'Poor', count: 80, percentage: 6, color: colors.red }
  ];

  const clients = [
    {
      id: 1,
      name: 'Fortune 500 Tech',
      type: 'Strategic',
      healthScore: 92,
      satisfaction: 94,
      expansion: 78,
      churnRisk: 8,
      contractValue: '$2.4M',
      renewalDate: '2024-06-30',
      accountOwner: 'Sarah Chen',
      region: 'North America',
      industry: 'Technology',
      tier: 'Enterprise',
      lastContact: '2 days ago',
      nextMeeting: '2024-01-25',
      openIssues: 2,
      upsellOpportunities: 3
    },
    {
      id: 2,
      name: 'Global Bank',
      type: 'Enterprise',
      healthScore: 88,
      satisfaction: 91,
      expansion: 65,
      churnRisk: 12,
      contractValue: '$1.8M',
      renewalDate: '2024-09-15',
      accountOwner: 'Michael Roberts',
      region: 'Europe',
      industry: 'Banking',
      tier: 'Enterprise',
      lastContact: '5 days ago',
      nextMeeting: '2024-02-01',
      openIssues: 4,
      upsellOpportunities: 2
    },
    {
      id: 3,
      name: 'Healthcare System',
      type: 'Enterprise',
      healthScore: 85,
      satisfaction: 87,
      expansion: 72,
      churnRisk: 15,
      contractValue: '$1.2M',
      renewalDate: '2024-12-01',
      accountOwner: 'Emily Watson',
      region: 'North America',
      industry: 'Healthcare',
      tier: 'Enterprise',
      lastContact: '1 week ago',
      nextMeeting: '2024-02-10',
      openIssues: 6,
      upsellOpportunities: 1
    },
    {
      id: 4,
      name: 'Manufacturing Co',
      type: 'Mid-Market',
      healthScore: 91,
      satisfaction: 93,
      expansion: 82,
      churnRisk: 5,
      contractValue: '$800K',
      renewalDate: '2024-07-20',
      accountOwner: 'David Kim',
      region: 'Asia Pacific',
      industry: 'Manufacturing',
      tier: 'Mid-Market',
      lastContact: '3 days ago',
      nextMeeting: '2024-01-28',
      openIssues: 1,
      upsellOpportunities: 2
    },
    {
      id: 5,
      name: 'Insurance Giant',
      type: 'Strategic',
      healthScore: 95,
      satisfaction: 96,
      expansion: 88,
      churnRisk: 3,
      contractValue: '$3.2M',
      renewalDate: '2024-05-15',
      accountOwner: 'Lisa Martinez',
      region: 'Europe',
      industry: 'Insurance',
      tier: 'Enterprise',
      lastContact: '1 day ago',
      nextMeeting: '2024-01-22',
      openIssues: 0,
      upsellOpportunities: 4
    }
  ];

  const renewalForecast = [
    { month: 'Jan', renewals: 12, value: '$8.4M', rate: 94 },
    { month: 'Feb', renewals: 18, value: '$12.6M', rate: 92 },
    { month: 'Mar', renewals: 24, value: '$16.8M', rate: 89 },
    { month: 'Apr', renewals: 15, value: '$10.5M', rate: 91 },
    { month: 'May', renewals: 20, value: '$14.0M', rate: 93 },
    { month: 'Jun', renewals: 28, value: '$19.6M', rate: 95 }
  ];

  const renderMetricCard = (label: string, value: string | number, icon: any, color: string, subtitle?: string) => (
    <View style={[styles.metricCard, { backgroundColor: colors.card, borderColor: colors.cardBorder, borderWidth: 1 }]}>
      <View style={[styles.metricIcon, { backgroundColor: color + '20' }]}>
        {React.createElement(icon, { size: 20, color: color })}
      </View>
      <Text style={[styles.metricCardValue, { color: color }]}>{typeof value === 'number' ? value.toLocaleString() : value}</Text>
      <Text style={[styles.metricCardLabel, { color: colors.textSecondary }]}>{label}</Text>
      {subtitle && <Text style={[styles.metricCardSubtitle, { color: colors.textSecondary }]}>{subtitle}</Text>}
    </View>
  );

  const renderHealthRow = (health: any, index: number) => (
    <View key={index} style={styles.healthRow}>
      <Text style={[styles.healthLabel, { color: colors.text }]}>{health.score}</Text>
      <View style={[styles.healthBar, { backgroundColor: colors.glass }]}>
        <View style={[styles.healthFill, { width: `${health.percentage}%`, backgroundColor: health.color }]} />
      </View>
      <Text style={[styles.healthCount, { color: colors.text }]}>{health.count}</Text>
      <Text style={[styles.healthPercent, { color: colors.textSecondary }]}>{health.percentage}%</Text>
    </View>
  );

  const renderClientCard = (client: any) => (
    <View key={client.id} style={[styles.clientCard, { backgroundColor: colors.card, borderColor: colors.cardBorder, borderWidth: 1 }]}>
      <View style={styles.clientHeader}>
        <View style={styles.clientInfo}>
          <View style={styles.clientNameRow}>
            <Text style={[styles.clientName, { color: colors.text }]}>{client.name}</Text>
            <View style={[
              styles.clientTier,
              { backgroundColor: client.tier === 'Enterprise' ? colors.purple + '20' : colors.electricBlue + '20' }
            ]}>
              <Text style={[
                styles.clientTierText,
                { color: client.tier === 'Enterprise' ? colors.purple : colors.electricBlue }
              ]}>{client.tier}</Text>
            </View>
          </View>
          <Text style={[styles.clientIndustry, { color: colors.textSecondary }]}>{client.industry} • {client.region}</Text>
        </View>
        <View style={[
          styles.healthBadge,
          { backgroundColor: client.healthScore >= 90 ? colors.emeraldGreen + '20' : client.healthScore >= 80 ? colors.electricBlue + '20' : client.healthScore >= 70 ? colors.amber + '20' : colors.red + '20' }
        ]}>
          <Heart size={16} color={client.healthScore >= 90 ? colors.emeraldGreen : client.healthScore >= 80 ? colors.electricBlue : client.healthScore >= 70 ? colors.amber : colors.red} />
          <Text style={[
            styles.healthScore,
            { color: client.healthScore >= 90 ? colors.emeraldGreen : client.healthScore >= 80 ? colors.electricBlue : client.healthScore >= 70 ? colors.amber : colors.red }
          ]}>{client.healthScore}</Text>
        </View>
      </View>

      <View style={styles.clientMetrics}>
        <View style={styles.clientMetric}>
          <Star size={14} color={colors.amber} />
          <Text style={[styles.metricValue, { color: colors.text }]}>{client.satisfaction}%</Text>
          <Text style={[styles.metricLabel, { color: colors.textSecondary }]}>CSAT</Text>
        </View>
        <View style={styles.clientMetric}>
          <TrendingUp size={14} color={colors.emeraldGreen} />
          <Text style={[styles.metricValue, { color: colors.text }]}>{client.expansion}%</Text>
          <Text style={[styles.metricLabel, { color: colors.textSecondary }]}>Expansion</Text>
        </View>
        <View style={styles.clientMetric}>
          <Shield size={14} color={client.churnRisk <= 10 ? colors.emeraldGreen : client.churnRisk <= 20 ? colors.amber : colors.red} />
          <Text style={[
            styles.metricValue,
            { color: client.churnRisk <= 10 ? colors.emeraldGreen : client.churnRisk <= 20 ? colors.amber : colors.red }
          ]}>{client.churnRisk}%</Text>
          <Text style={[styles.metricLabel, { color: colors.textSecondary }]}>Churn Risk</Text>
        </View>
        <View style={styles.clientMetric}>
          <DollarSign size={14} color={colors.textSecondary} />
          <Text style={[styles.metricValue, { color: colors.text }]}>{client.contractValue}</Text>
          <Text style={[styles.metricLabel, { color: colors.textSecondary }]}>Contract</Text>
        </View>
      </View>

      <View style={styles.clientDetails}>
        <View style={styles.detailRow}>
          <Users size={12} color={colors.textSecondary} />
          <Text style={[styles.detailText, { color: colors.textSecondary }]}>Owner: {client.accountOwner}</Text>
        </View>
        <View style={styles.detailRow}>
          <Calendar size={12} color={colors.textSecondary} />
          <Text style={[styles.detailText, { color: colors.textSecondary }]}>Renewal: {client.renewalDate}</Text>
        </View>
        <View style={styles.detailRow}>
          <MessageSquare size={12} color={colors.textSecondary} />
          <Text style={[styles.detailText, { color: colors.textSecondary }]}>Last Contact: {client.lastContact}</Text>
        </View>
      </View>

      <View style={styles.clientAlerts}>
        {client.openIssues > 0 && (
          <View style={[styles.alertBadge, { backgroundColor: colors.red + '20' }]}>
            <AlertTriangle size={12} color={colors.red} />
            <Text style={[styles.alertText, { color: colors.red }]}>{client.openIssues} Open Issues</Text>
          </View>
        )}
        {client.upsellOpportunities > 0 && (
          <View style={[styles.opportunityBadge, { backgroundColor: colors.emeraldGreen + '20' }]}>
            <TrendingUp size={12} color={colors.emeraldGreen} />
            <Text style={[styles.opportunityText, { color: colors.emeraldGreen }]}>{client.upsellOpportunities} Upsell Opportunities</Text>
          </View>
        )}
      </View>

      <View style={styles.clientActions}>
        <TouchableOpacity style={[styles.actionButton, { backgroundColor: colors.glass, borderColor: colors.glassBorder }]}>
          <FileText size={16} color={colors.textSecondary} />
          <Text style={[styles.actionButtonText, { color: colors.textSecondary }]}>Profile</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.actionButton, { backgroundColor: colors.electricBlue + '20', borderColor: colors.electricBlue + '40' }]}>
          <MessageSquare size={16} color={colors.electricBlue} />
          <Text style={[styles.actionButtonText, { color: colors.electricBlue }]}>Engage</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.actionButton, { backgroundColor: colors.emeraldGreen + '20', borderColor: colors.emeraldGreen + '40' }]}>
          <TrendingUp size={16} color={colors.emeraldGreen} />
          <Text style={[styles.actionButtonText, { color: colors.emeraldGreen }]}>Upsell</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  const renderRenewalRow = (forecast: any, index: number) => (
    <View key={index} style={[styles.renewalRow, { borderBottomColor: colors.cardBorder }]}>
      <Text style={[styles.renewalMonth, { color: colors.text }]}>{forecast.month}</Text>
      <View style={styles.renewalBars}>
        <View style={styles.renewalBar}>
          <Text style={[styles.renewalBarLabel, { color: colors.textSecondary }]}>Renewals</Text>
          <View style={[styles.renewalBarTrack, { backgroundColor: colors.glass }]}>
            <View style={[styles.renewalBarFill, { width: `${(forecast.renewals / 28) * 100}%`, backgroundColor: colors.electricBlue }]} />
          </View>
          <Text style={[styles.renewalBarValue, { color: colors.text }]}>{forecast.renewals}</Text>
        </View>
        <View style={styles.renewalBar}>
          <Text style={[styles.renewalBarLabel, { color: colors.textSecondary }]}>Value</Text>
          <View style={[styles.renewalBarTrack, { backgroundColor: colors.glass }]}>
            <View style={[styles.renewalBarFill, { width: `${(parseFloat(forecast.value.replace('$', '').replace('M', '')) / 19.6) * 100}%`, backgroundColor: colors.emeraldGreen }]} />
          </View>
          <Text style={[styles.renewalBarValue, { color: colors.text }]}>{forecast.value}</Text>
        </View>
      </View>
      <View style={[
        styles.rateBadge,
        { backgroundColor: forecast.rate >= 93 ? colors.emeraldGreen + '20' : forecast.rate >= 90 ? colors.electricBlue + '20' : colors.amber + '20' }
      ]}>
        <Text style={[
          styles.rateText,
          { color: forecast.rate >= 93 ? colors.emeraldGreen : forecast.rate >= 90 ? colors.electricBlue : colors.amber }
        ]}>{forecast.rate}%</Text>
      </View>
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
            <Building size={24} color="#FFFFFF" />
          </LinearGradient>
          <View>
            <Text style={[styles.headerTitle, { color: colors.text }]}>Client Success Command Center</Text>
            <Text style={[styles.headerSubtitle, { color: colors.textSecondary }]}>Customer Relationship & Renewal Intelligence</Text>
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
        {/* Client Metrics */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>Client Overview</Text>
          <View style={styles.metricsGrid}>
            {renderMetricCard('Total Clients', clientMetrics.totalClients, Building, colors.electricBlue)}
            {renderMetricCard('Strategic Accounts', clientMetrics.strategicAccounts, Star, colors.purple)}
            {renderMetricCard('Avg Health Score', `${clientMetrics.avgHealthScore}%`, Heart, colors.emeraldGreen)}
            {renderMetricCard('Avg CSAT', `${clientMetrics.avgSatisfaction}%`, Award, colors.emeraldGreen)}
            {renderMetricCard('Renewal Pipeline', clientMetrics.renewalPipeline, DollarSign, colors.emeraldGreen)}
            {renderMetricCard('Expansion Value', clientMetrics.expansionOpportunities, TrendingUp, colors.purple)}
            {renderMetricCard('At Risk', clientMetrics.atRiskClients, AlertTriangle, colors.red)}
            {renderMetricCard('Churn Risk', `${clientMetrics.churnRisk}%`, Shield, colors.amber)}
          </View>
        </View>

        {/* Health Distribution */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={[styles.sectionTitle, { color: colors.text }]}>Client Health Distribution</Text>
            <TouchableOpacity style={[styles.filterButton, { backgroundColor: colors.glass, borderColor: colors.glassBorder }]}>
              <Filter size={16} color={colors.textSecondary} />
              <Text style={[styles.filterButtonText, { color: colors.textSecondary }]}>Filter by Health</Text>
            </TouchableOpacity>
          </View>
          <View style={[styles.healthDistribution, { backgroundColor: colors.card, borderColor: colors.cardBorder, borderWidth: 1 }]}>
            {healthDistribution.map((health, index) => renderHealthRow(health, index))}
          </View>
        </View>

        {/* Renewal Forecast */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>6-Month Renewal Forecast</Text>
          <View style={[styles.renewalCard, { backgroundColor: colors.card, borderColor: colors.cardBorder, borderWidth: 1 }]}>
            {renewalForecast.map((forecast, index) => renderRenewalRow(forecast, index))}
          </View>
        </View>

        {/* View Filters */}
        <View style={styles.section}>
          <View style={styles.filterTabs}>
            {['all', 'strategic', 'enterprise', 'mid-market'].map((view) => (
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
                  {view.charAt(0).toUpperCase() + view.slice(1).replace('-', ' ')}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Clients Grid */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={[styles.sectionTitle, { color: colors.text }]}>
              {selectedView === 'all' ? 'All Clients' : selectedView === 'strategic' ? 'Strategic Accounts' : selectedView === 'enterprise' ? 'Enterprise Clients' : 'Mid-Market Clients'}
            </Text>
            <TouchableOpacity style={[styles.addButton, { backgroundColor: colors.emeraldGreen }]}>
              <Plus size={20} color="white" />
              <Text style={styles.addButtonText}>Add Client</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.clientsGrid}>
            {clients
              .filter(c => selectedView === 'all' || c.type.toLowerCase() === selectedView.replace('-', ' ') || (selectedView === 'enterprise' && c.tier === 'Enterprise'))
              .map((client) => renderClientCard(client))}
          </View>
        </View>

        {/* AI Client Insights */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>AI Client Success Insights</Text>
          <View style={[styles.insightsCard, { backgroundColor: colors.card, borderColor: colors.cardBorder, borderWidth: 1 }]}>
            <View style={styles.insightItem}>
              <View style={[styles.insightIcon, { backgroundColor: colors.emeraldGreen + '20' }]}>
                <TrendingUp size={20} color={colors.emeraldGreen} />
              </View>
              <View style={styles.insightContent}>
                <Text style={[styles.insightTitle, { color: colors.text }]}>High Expansion Opportunity</Text>
                <Text style={[styles.insightDescription, { color: colors.textSecondary }]}>
                  Insurance Giant shows 88% expansion probability. AI recommends scheduling executive review for Q2 upsell.
                </Text>
              </View>
              <TouchableOpacity style={[styles.insightAction, { backgroundColor: colors.emeraldGreen + '20', borderColor: colors.emeraldGreen + '40', borderWidth: 1 }]}>
                <Text style={[styles.insightActionText, { color: colors.emeraldGreen }]}>Schedule</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.insightItem}>
              <View style={[styles.insightIcon, { backgroundColor: colors.red + '20' }]}>
                <AlertTriangle size={20} color={colors.red} />
              </View>
              <View style={styles.insightContent}>
                <Text style={[styles.insightTitle, { color: colors.text }]}>Churn Risk Alert</Text>
                <Text style={[styles.insightDescription, { color: colors.textSecondary }]}>
                  Healthcare System shows 15% churn risk with 6 open issues. AI recommends immediate intervention.
                </Text>
              </View>
              <TouchableOpacity style={[styles.insightAction, { backgroundColor: colors.emeraldGreen + '20', borderColor: colors.emeraldGreen + '40', borderWidth: 1 }]}>
                <Text style={[styles.insightActionText, { color: colors.emeraldGreen }]}>Intervene</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.insightItem}>
              <View style={[styles.insightIcon, { backgroundColor: colors.purple + '20' }]}>
                <Zap size={20} color={colors.purple} />
              </View>
              <View style={styles.insightContent}>
                <Text style={[styles.insightTitle, { color: colors.text }]}>Renewal Optimization</Text>
                <Text style={[styles.insightDescription, { color: colors.textSecondary }]}>
                  12 clients renewing in June with 95% predicted renewal rate. AI suggests early renewal incentives.
                </Text>
              </View>
              <TouchableOpacity style={[styles.insightAction, { backgroundColor: colors.emeraldGreen + '20', borderColor: colors.emeraldGreen + '40', borderWidth: 1 }]}>
                <Text style={[styles.insightActionText, { color: colors.emeraldGreen }]}>Optimize</Text>
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
  metricCardSubtitle: {
    fontSize: 10,
    marginTop: 2,
  },
  healthDistribution: {
    padding: 16,
    borderRadius: 12,
  },
  healthRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  healthLabel: {
    fontSize: 13,
    fontWeight: '500',
    width: 80,
  },
  healthBar: {
    flex: 1,
    height: 8,
    borderRadius: 4,
    marginHorizontal: 12,
  },
  healthFill: {
    height: '100%',
    borderRadius: 4,
  },
  healthCount: {
    fontSize: 12,
    fontWeight: '600',
    width: 40,
  },
  healthPercent: {
    fontSize: 11,
    width: 40,
  },
  renewalCard: {
    padding: 16,
    borderRadius: 12,
  },
  renewalRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
  },
  renewalMonth: {
    fontSize: 13,
    fontWeight: '500',
    width: 60,
  },
  renewalBars: {
    flex: 1,
    marginLeft: 12,
  },
  renewalBar: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  renewalBarLabel: {
    fontSize: 10,
    width: 50,
  },
  renewalBarTrack: {
    flex: 1,
    height: 6,
    borderRadius: 3,
    marginHorizontal: 8,
  },
  renewalBarFill: {
    height: '100%',
    borderRadius: 3,
  },
  renewalBarValue: {
    fontSize: 11,
    width: 50,
  },
  rateBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
    marginLeft: 12,
  },
  rateText: {
    fontSize: 11,
    fontWeight: '600',
  },
  filterButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
    gap: 6,
  },
  filterButtonText: {
    fontSize: 14,
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
  clientsGrid: {
    gap: 12,
  },
  clientCard: {
    padding: 16,
    borderRadius: 12,
  },
  clientHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  clientInfo: {
    flex: 1,
  },
  clientNameRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 4,
  },
  clientName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  clientTier: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  clientTierText: {
    fontSize: 10,
    fontWeight: '600',
  },
  clientIndustry: {
    fontSize: 14,
  },
  healthBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    gap: 4,
  },
  healthScore: {
    fontSize: 14,
    fontWeight: '600',
  },
  clientMetrics: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  clientMetric: {
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
  clientDetails: {
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
  clientAlerts: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginBottom: 12,
  },
  alertBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
    gap: 4,
  },
  alertText: {
    fontSize: 11,
    fontWeight: '500',
  },
  opportunityBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
    gap: 4,
  },
  opportunityText: {
    fontSize: 11,
    fontWeight: '500',
  },
  clientActions: {
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
