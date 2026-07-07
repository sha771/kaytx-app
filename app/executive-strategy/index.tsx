import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Stack, router } from 'expo-router';
import { 
  Building2, 
  Users, 
  TrendingUp, 
  DollarSign, 
  Shield, 
  Brain,
  ArrowRight,
  Activity,
  Globe,
  LineChart,
  PieChart,
  BarChart3,
  Target,
  Zap,
  AlertTriangle,
  CheckCircle,
  ArrowUp,
  ArrowDown,
  Minus,
  Menu,
  X
} from 'lucide-react-native';
import { useTheme } from '@/providers/ThemeProvider';

interface KPICard {
  id: string;
  title: string;
  value: string;
  change: string;
  trend: 'up' | 'down' | 'stable';
  icon: any;
  color: string;
  category: 'financial' | 'growth' | 'operational' | 'risk' | 'ai';
}

const mockKPIs: KPICard[] = [
  // Financial KPIs
  {
    id: '1',
    title: 'Total Revenue',
    value: '$28.4B',
    change: '+12.5%',
    trend: 'up',
    icon: DollarSign,
    color: '#10B981',
    category: 'financial'
  },
  {
    id: '2',
    title: 'EBITDA',
    value: '$8.2B',
    change: '+8.3%',
    trend: 'up',
    icon: TrendingUp,
    color: '#10B981',
    category: 'financial'
  },
  {
    id: '3',
    title: 'Net Profit',
    value: '$4.1B',
    change: '+15.2%',
    trend: 'up',
    icon: DollarSign,
    color: '#10B981',
    category: 'financial'
  },
  {
    id: '4',
    title: 'Operating Margin',
    value: '28.9%',
    change: '+2.1%',
    trend: 'up',
    icon: Activity,
    color: '#10B981',
    category: 'financial'
  },
  {
    id: '5',
    title: 'Cash Flow',
    value: '$3.8B',
    change: '+5.7%',
    trend: 'up',
    icon: DollarSign,
    color: '#10B981',
    category: 'financial'
  },
  // Growth KPIs
  {
    id: '6',
    title: 'Revenue Growth',
    value: '12.5%',
    change: '+2.3%',
    trend: 'up',
    icon: TrendingUp,
    color: '#3B82F6',
    category: 'growth'
  },
  {
    id: '7',
    title: 'Market Share',
    value: '18.7%',
    change: '+1.8%',
    trend: 'up',
    icon: PieChart,
    color: '#3B82F6',
    category: 'growth'
  },
  {
    id: '8',
    title: 'Customer Growth',
    value: '+24.5%',
    change: '+4.2%',
    trend: 'up',
    icon: Users,
    color: '#3B82F6',
    category: 'growth'
  },
  {
    id: '9',
    title: 'Product Expansion',
    value: '8 New',
    change: '+3',
    trend: 'up',
    icon: Target,
    color: '#3B82F6',
    category: 'growth'
  },
  {
    id: '10',
    title: 'International Growth',
    value: '+15.3%',
    change: '+3.1%',
    trend: 'up',
    icon: Globe,
    color: '#3B82F6',
    category: 'growth'
  },
  // Operational KPIs
  {
    id: '11',
    title: 'Productivity Index',
    value: '94.2',
    change: '+3.5%',
    trend: 'up',
    icon: Activity,
    color: '#8B5CF6',
    category: 'operational'
  },
  {
    id: '12',
    title: 'Process Efficiency',
    value: '89.7%',
    change: '+2.8%',
    trend: 'up',
    icon: Zap,
    color: '#8B5CF6',
    category: 'operational'
  },
  {
    id: '13',
    title: 'Project Delivery',
    value: '96.4%',
    change: '+1.9%',
    trend: 'up',
    icon: Target,
    color: '#8B5CF6',
    category: 'operational'
  },
  {
    id: '14',
    title: 'Workforce Utilization',
    value: '87.3%',
    change: '+2.1%',
    trend: 'up',
    icon: Users,
    color: '#8B5CF6',
    category: 'operational'
  },
  {
    id: '15',
    title: 'Operational Excellence',
    value: '92.1',
    change: '+4.2%',
    trend: 'up',
    icon: CheckCircle,
    color: '#8B5CF6',
    category: 'operational'
  },
  // Risk KPIs
  {
    id: '16',
    title: 'Enterprise Risk Score',
    value: 'Low',
    change: '-5.2%',
    trend: 'down',
    icon: Shield,
    color: '#F59E0B',
    category: 'risk'
  },
  {
    id: '17',
    title: 'Cyber Risk',
    value: 'Medium',
    change: '0%',
    trend: 'stable',
    icon: AlertTriangle,
    color: '#F59E0B',
    category: 'risk'
  },
  {
    id: '18',
    title: 'Compliance Score',
    value: '98.5%',
    change: '+1.2%',
    trend: 'up',
    icon: CheckCircle,
    color: '#F59E0B',
    category: 'risk'
  },
  {
    id: '19',
    title: 'Supply Chain Risk',
    value: 'Low',
    change: '-3.4%',
    trend: 'down',
    icon: Shield,
    color: '#F59E0B',
    category: 'risk'
  },
  {
    id: '20',
    title: 'Financial Exposure',
    value: '$1.2B',
    change: '-8.7%',
    trend: 'down',
    icon: DollarSign,
    color: '#F59E0B',
    category: 'risk'
  },
  // AI KPIs
  {
    id: '21',
    title: 'Strategic Recommendations',
    value: '847',
    change: '+23.4%',
    trend: 'up',
    icon: Brain,
    color: '#06B6D4',
    category: 'ai'
  },
  {
    id: '22',
    title: 'AI Forecast Accuracy',
    value: '94.7%',
    change: '+2.1%',
    trend: 'up',
    icon: LineChart,
    color: '#06B6D4',
    category: 'ai'
  },
  {
    id: '23',
    title: 'Decisions Assisted',
    value: '2,847',
    change: '+18.9%',
    trend: 'up',
    icon: Brain,
    color: '#06B6D4',
    category: 'ai'
  },
  {
    id: '24',
    title: 'Automation Impact',
    value: '$7.9B',
    change: '+31.2%',
    trend: 'up',
    icon: Zap,
    color: '#06B6D4',
    category: 'ai'
  },
  {
    id: '25',
    title: 'Enterprise Value Created',
    value: '+$12.4B',
    change: '+45.7%',
    trend: 'up',
    icon: TrendingUp,
    color: '#06B6D4',
    category: 'ai'
  }
];

const navigationItems = [
  { id: '1', title: 'Executive Dashboard', icon: Building2, route: '/executive-strategy' },
  { id: '2', title: 'AI Strategy Agents', icon: Brain, route: '/executive-strategy/ai-strategy-agents' },
  { id: '3', title: 'Corporate Performance', icon: BarChart3, route: '/executive-strategy/corporate-performance' },
  { id: '4', title: 'Financial Intelligence', icon: DollarSign, route: '/executive-strategy/financial-intelligence' },
  { id: '5', title: 'Business Units', icon: Building2, route: '/executive-strategy/business-units' },
  { id: '6', title: 'Market Intelligence', icon: Globe, route: '/executive-strategy/market-intelligence' },
  { id: '7', title: 'Mergers & Acquisitions', icon: TrendingUp, route: '/executive-strategy/ma-command-center' },
  { id: '8', title: 'Innovation Lab', icon: Zap, route: '/executive-strategy/innovation-lab' },
  { id: '9', title: 'Enterprise Risk', icon: Shield, route: '/executive-strategy/enterprise-risk' },
  { id: '10', title: 'Workforce Strategy', icon: Users, route: '/executive-strategy/workforce-strategy' },
  { id: '11', title: 'Investor Relations', icon: Activity, route: '/executive-strategy/investor-relations' },
  { id: '12', title: 'Analytics', icon: LineChart, route: '/executive-strategy/analytics' },
  { id: '13', title: 'Settings', icon: Activity, route: '/executive-strategy/settings' }
];

export default function ExecutiveStrategyDashboard() {
  const { theme } = useTheme();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const categories = [
    { id: 'all', label: 'All KPIs' },
    { id: 'financial', label: 'Financial' },
    { id: 'growth', label: 'Growth' },
    { id: 'operational', label: 'Operational' },
    { id: 'risk', label: 'Risk' },
    { id: 'ai', label: 'AI' }
  ];

  const filteredKPIs = selectedCategory === 'all' 
    ? mockKPIs 
    : mockKPIs.filter(kpi => kpi.category === selectedCategory);

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'up': return <ArrowUp size={14} color="#10B981" />;
      case 'down': return <ArrowDown size={14} color="#EF4444" />;
      default: return <Minus size={14} color="#6B7280" />;
    }
  };

  const getTrendColor = (trend: string) => {
    switch (trend) {
      case 'up': return '#10B981';
      case 'down': return '#EF4444';
      default: return '#6B7280';
    }
  };

  const KPICard = ({ kpi }: { kpi: KPICard }) => (
    <TouchableOpacity style={[styles.kpiCard, { backgroundColor: theme.colors.cardBackground, borderColor: theme.colors.border }]}>
      <View style={styles.kpiCardHeader}>
        <View style={[styles.kpiIcon, { backgroundColor: `${kpi.color}20` }]}>
          <kpi.icon size={20} color={kpi.color} />
        </View>
        <Text style={[styles.kpiTitle, { color: theme.colors.secondaryText }]}>{kpi.title}</Text>
      </View>
      <View style={styles.kpiCardContent}>
        <Text style={[styles.kpiValue, { color: theme.colors.text }]}>{kpi.value}</Text>
        <View style={styles.kpiTrend}>
          {getTrendIcon(kpi.trend)}
          <Text style={[styles.kpiChange, { color: getTrendColor(kpi.trend) }]}>{kpi.change}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  const NavigationItem = ({ item }: { item: any }) => (
    <TouchableOpacity
      style={[styles.navItem, { backgroundColor: theme.colors.cardBackground }]}
      onPress={() => {
        setSidebarOpen(false);
        router.push(item.route);
      }}
    >
      <item.icon size={20} color={theme.colors.primary} />
      <Text style={[styles.navItemText, { color: theme.colors.text }]}>{item.title}</Text>
      <ArrowRight size={16} color={theme.colors.secondaryText} />
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: '#03050A' }]}>
      <Stack.Screen
        options={{
          headerShown: false,
        }}
      />

      {/* Sidebar */}
      {sidebarOpen && (
        <View style={[styles.sidebar, { backgroundColor: '#0A0F1A' }]}>
          <View style={styles.sidebarHeader}>
            <Text style={styles.sidebarTitle}>Executive & Strategy</Text>
            <TouchableOpacity onPress={() => setSidebarOpen(false)}>
              <X size={24} color="#FFFFFF" />
            </TouchableOpacity>
          </View>
          <ScrollView style={styles.sidebarContent}>
            {navigationItems.map(item => (
              <NavigationItem key={item.id} item={item} />
            ))}
          </ScrollView>
        </View>
      )}

      {/* Header */}
      <View style={[styles.header, { backgroundColor: '#0A0F1A' }]}>
        <TouchableOpacity onPress={() => setSidebarOpen(true)}>
          <Menu size={24} color="#FFFFFF" />
        </TouchableOpacity>
        <View style={styles.headerCenter}>
          <Text style={styles.headerTitle}>Executive Command Center</Text>
          <Text style={styles.headerSubtitle}>AI-Powered Strategic Intelligence</Text>
        </View>
        <View style={styles.headerRight}>
          <View style={[styles.statusDot, { backgroundColor: '#10B981' }]} />
          <Text style={styles.statusText}>Live</Text>
        </View>
      </View>

      <ScrollView style={styles.content}>


        {/* Enterprise Metrics Banner */}
        <View style={[styles.metricsBanner, { backgroundColor: '#0A0F1A' }]}>
          <View style={styles.metricBannerItem}>
            <Text style={styles.metricBannerValue}>$28.4B</Text>
            <Text style={styles.metricBannerLabel}>Enterprise Revenue</Text>
          </View>
          <View style={styles.metricBannerDivider} />
          <View style={styles.metricBannerItem}>
            <Text style={styles.metricBannerValue}>$185B</Text>
            <Text style={styles.metricBannerLabel}>Enterprise Value</Text>
          </View>
          <View style={styles.metricBannerDivider} />
          <View style={styles.metricBannerItem}>
            <Text style={styles.metricBannerValue}>126K</Text>
            <Text style={styles.metricBannerLabel}>Global Employees</Text>
          </View>
          <View style={styles.metricBannerDivider} />
          <View style={styles.metricBannerItem}>
            <Text style={styles.metricBannerValue}>87</Text>
            <Text style={styles.metricBannerLabel}>Countries</Text>
          </View>
        </View>

        {/* Category Filter */}
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.categoryFilter}>
          {categories.map(category => (
            <TouchableOpacity
              key={category.id}
              style={[
                styles.categoryChip,
                selectedCategory === category.id && styles.categoryChipActive
              ]}
              onPress={() => setSelectedCategory(category.id)}
            >
              <Text style={[
                styles.categoryChipText,
                selectedCategory === category.id && styles.categoryChipTextActive
              ]}>
                {category.label}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* KPI Grid */}
        <View style={styles.kpiSection}>
          <Text style={styles.sectionTitle}>Executive KPIs</Text>
          <View style={styles.kpiGrid}>
            {filteredKPIs.map(kpi => (
              <KPICard key={kpi.id} kpi={kpi} />
            ))}
          </View>
        </View>

        {/* Quick Actions */}
        <View style={styles.quickActionsSection}>
          <Text style={styles.sectionTitle}>Strategic Actions</Text>
          <View style={styles.quickActionsGrid}>
            <TouchableOpacity
              style={[styles.quickActionCard, { backgroundColor: '#0A0F1A' }]}
              onPress={() => router.push('/executive-strategy/ai-strategy-agents')}
            >
              <Brain size={24} color="#06B6D4" />
              <Text style={styles.quickActionTitle}>AI Strategy Agents</Text>
              <Text style={styles.quickActionDescription}>7 autonomous agents</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.quickActionCard, { backgroundColor: '#0A0F1A' }]}
              onPress={() => router.push('/executive-strategy/ceo-command-center')}
            >
              <Building2 size={24} color="#3B82F6" />
              <Text style={styles.quickActionTitle}>CEO Command Center</Text>
              <Text style={styles.quickActionDescription}>Enterprise overview</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.quickActionCard, { backgroundColor: '#0A0F1A' }]}
              onPress={() => router.push('/executive-strategy/financial-intelligence')}
            >
              <DollarSign size={24} color="#10B981" />
              <Text style={styles.quickActionTitle}>Financial Intelligence</Text>
              <Text style={styles.quickActionDescription}>Real-time analytics</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.quickActionCard, { backgroundColor: '#0A0F1A' }]}
              onPress={() => router.push('/executive-strategy/enterprise-risk')}
            >
              <Shield size={24} color="#F59E0B" />
              <Text style={styles.quickActionTitle}>Enterprise Risk</Text>
              <Text style={styles.quickActionDescription}>Risk monitoring</Text>
            </TouchableOpacity>
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
  sidebar: {
    position: 'absolute',
    left: 0,
    top: 0,
    bottom: 0,
    width: 280,
    zIndex: 1000,
    elevation: 1000,
    shadowColor: '#000',
    shadowOffset: { width: 4, height: 0 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
  },
  sidebarHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255,255,255,0.1)',
  },
  sidebarTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  sidebarContent: {
    flex: 1,
    padding: 12,
  },
  navItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderRadius: 12,
    marginBottom: 8,
    gap: 12,
  },
  navItemText: {
    flex: 1,
    fontSize: 14,
    fontWeight: '500',
    color: '#FFFFFF',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255,255,255,0.1)',
  },
  headerCenter: {
    flex: 1,
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#FFFFFF',
    letterSpacing: -0.5,
  },
  headerSubtitle: {
    fontSize: 12,
    color: '#9CA3AF',
    marginTop: 2,
  },
  headerRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  statusDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  statusText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#10B981',
  },
  content: {
    flex: 1,
  },
  metricsBanner: {
    flexDirection: 'row',
    padding: 20,
    justifyContent: 'space-around',
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255,255,255,0.1)',
  },
  metricBannerItem: {
    alignItems: 'center',
  },
  metricBannerValue: {
    fontSize: 20,
    fontWeight: '800',
    color: '#FFFFFF',
    letterSpacing: -0.5,
  },
  metricBannerLabel: {
    fontSize: 10,
    fontWeight: '600',
    color: '#9CA3AF',
    marginTop: 4,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  metricBannerDivider: {
    width: 1,
    height: 32,
    backgroundColor: 'rgba(255,255,255,0.1)',
  },
  categoryFilter: {
    paddingHorizontal: 20,
    paddingVertical: 16,
    gap: 8,
  },
  categoryChip: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: 'rgba(255,255,255,0.05)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)',
  },
  categoryChipActive: {
    backgroundColor: '#06B6D4',
    borderColor: '#06B6D4',
  },
  categoryChipText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#9CA3AF',
  },
  categoryChipTextActive: {
    color: '#FFFFFF',
  },
  kpiSection: {
    padding: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#FFFFFF',
    marginBottom: 16,
    letterSpacing: -0.5,
  },
  kpiGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  kpiCard: {
    width: '48%',
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)',
  },
  kpiCardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 12,
  },
  kpiIcon: {
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
  },
  kpiTitle: {
    flex: 1,
    fontSize: 12,
    fontWeight: '500',
  },
  kpiCardContent: {
    gap: 4,
  },
  kpiValue: {
    fontSize: 20,
    fontWeight: '800',
    letterSpacing: -0.5,
  },
  kpiTrend: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  kpiChange: {
    fontSize: 12,
    fontWeight: '600',
  },
  quickActionsSection: {
    padding: 20,
    paddingTop: 0,
  },
  quickActionsGrid: {
    gap: 12,
  },
  quickActionCard: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
    padding: 20,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)',
  },
  quickActionTitle: {
    flex: 1,
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  quickActionDescription: {
    fontSize: 12,
    color: '#9CA3AF',
  },
});
