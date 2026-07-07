import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Dimensions } from 'react-native';
import { 
  LayoutDashboard, Store, Users, Package, TrendingUp, 
  DollarSign, Activity, Brain, Zap, Globe, Shield, 
  BarChart3, ShoppingCart, Target, ArrowUpRight, 
  ArrowDownRight, ChevronRight, Sparkles, AlertTriangle,
  CheckCircle, Clock, MapPin, Truck, Settings, Menu,
  LineChart, PieChart, MoreHorizontal
} from 'lucide-react-native';

const { width } = Dimensions.get('window');

export default function RetailOSDashboard() {
  const [activeSection, setActiveSection] = useState('executive');

  const KPI_DATA = {
    sales: [
      { label: 'Total Revenue', value: '$8.4B', trend: '+12.5%', trendUp: true, icon: DollarSign, color: '#10B981' },
      { label: 'Daily Sales', value: '$23.2M', trend: '+8.3%', trendUp: true, icon: TrendingUp, color: '#3B82F6' },
      { label: 'Monthly Sales', value: '$698M', trend: '+15.2%', trendUp: true, icon: BarChart3, color: '#8B5CF6' },
      { label: 'Avg Order Value', value: '$142', trend: '+5.8%', trendUp: true, icon: ShoppingCart, color: '#F59E0B' },
      { label: 'Sales Growth', value: '22.4%', trend: '+3.2%', trendUp: true, icon: Activity, color: '#EC4899' },
    ],
    customer: [
      { label: 'Active Customers', value: '48M', trend: '+18.2%', trendUp: true, icon: Users, color: '#3B82F6' },
      { label: 'Repeat Purchase Rate', value: '34.2%', trend: '+4.1%', trendUp: true, icon: Target, color: '#10B981' },
      { label: 'Customer Satisfaction', value: '94.8%', trend: '+2.3%', trendUp: true, icon: CheckCircle, color: '#8B5CF6' },
      { label: 'Loyalty Members', value: '28.5M', trend: '+12.7%', trendUp: true, icon: Sparkles, color: '#F59E0B' },
      { label: 'Customer LTV', value: '$1,840', trend: '+9.4%', trendUp: true, icon: DollarSign, color: '#EC4899' },
    ],
    inventory: [
      { label: 'Inventory Value', value: '$1.9B', trend: '-2.1%', trendUp: false, icon: Package, color: '#F59E0B' },
      { label: 'Stock Availability', value: '96.8%', trend: '+1.5%', trendUp: true, icon: CheckCircle, color: '#10B981' },
      { label: 'Inventory Turnover', value: '8.2x', trend: '+0.8%', trendUp: true, icon: Activity, color: '#3B82F6' },
      { label: 'Stockout Rate', value: '1.2%', trend: '-0.4%', trendUp: true, icon: AlertTriangle, color: '#EF4444' },
      { label: 'Replenishment Accuracy', value: '97.4%', trend: '+1.2%', trendUp: true, icon: Target, color: '#8B5CF6' },
    ],
    store: [
      { label: 'Active Stores', value: '3,850', trend: '+45', trendUp: true, icon: Store, color: '#3B82F6' },
      { label: 'Store Performance', value: '94.2%', trend: '+2.8%', trendUp: true, icon: BarChart3, color: '#10B981' },
      { label: 'Employee Productivity', value: '87.3%', trend: '+4.5%', trendUp: true, icon: Users, color: '#8B5CF6' },
      { label: 'Foot Traffic', value: '2.8M', trend: '+12.3%', trendUp: true, icon: MapPin, color: '#F59E0B' },
      { label: 'Conversion Rate', value: '7.8%', trend: '+1.1%', trendUp: true, icon: Target, color: '#EC4899' },
    ],
    ai: [
      { label: 'Forecast Accuracy', value: '94.6%', trend: '+2.4%', trendUp: true, icon: Brain, color: '#8B5CF6' },
      { label: 'Pricing Optimizations', value: '12.4K', trend: '+18.7%', trendUp: true, icon: DollarSign, color: '#10B981' },
      { label: 'Automated Reorders', value: '8.2K', trend: '+22.3%', trendUp: true, icon: Package, color: '#3B82F6' },
      { label: 'Revenue Impact', value: '+$520M', trend: '+15.8%', trendUp: true, icon: TrendingUp, color: '#F59E0B' },
      { label: 'Demand Predictions', value: '98.2%', trend: '+3.1%', trendUp: true, icon: Activity, color: '#EC4899' },
    ],
  };

  const AI_AGENTS = [
    {
      id: 'mercury',
      name: 'Agent Mercury',
      title: 'Sales Optimization Agent',
      icon: TrendingUp,
      color: '#10B981',
      responsibilities: ['Revenue growth', 'Conversion optimization', 'Sales forecasting', 'Promotion analysis'],
      metrics: [
        { label: 'Revenue Influenced', value: '$340M' },
        { label: 'Conversion Lift', value: '+18.4%' },
        { label: 'Forecast Accuracy', value: '96.2%' },
      ],
      status: 'active',
      health: 98,
    },
    {
      id: 'atlas',
      name: 'Agent Atlas',
      title: 'Inventory Intelligence Agent',
      icon: Package,
      color: '#3B82F6',
      responsibilities: ['Inventory forecasting', 'Replenishment automation', 'Demand planning', 'Stock optimization'],
      metrics: [
        { label: 'Stockouts Prevented', value: '2,847' },
        { label: 'Forecast Accuracy', value: '94.8%' },
        { label: 'Inventory Efficiency', value: '+23.5%' },
      ],
      status: 'active',
      health: 97,
    },
    {
      id: 'nova',
      name: 'Agent Nova',
      title: 'Customer Intelligence Agent',
      icon: Users,
      color: '#8B5CF6',
      responsibilities: ['Customer segmentation', 'Behavioral analytics', 'Loyalty optimization', 'Retention management'],
      metrics: [
        { label: 'Customers Analyzed', value: '48M' },
        { label: 'Retention Improvement', value: '+14.2%' },
        { label: 'Loyalty Growth', value: '+22.8%' },
      ],
      status: 'active',
      health: 99,
    },
    {
      id: 'pulse',
      name: 'Agent Pulse',
      title: 'Store Operations Agent',
      icon: Store,
      color: '#F59E0B',
      responsibilities: ['Store performance', 'Workforce optimization', 'Operational monitoring', 'Compliance tracking'],
      metrics: [
        { label: 'Stores Managed', value: '3,850' },
        { label: 'Operational Efficiency', value: '+16.7%' },
        { label: 'Productivity Improvement', value: '+19.2%' },
      ],
      status: 'active',
      health: 96,
    },
    {
      id: 'orbit',
      name: 'Agent Orbit',
      title: 'Supply Chain Agent',
      icon: Truck,
      color: '#EC4899',
      responsibilities: ['Supplier monitoring', 'Logistics optimization', 'Distribution management', 'Fulfillment intelligence'],
      metrics: [
        { label: 'Deliveries Optimized', value: '18.4K' },
        { label: 'Supply Chain Efficiency', value: '+21.3%' },
        { label: 'Cost Savings', value: '$42.8M' },
      ],
      status: 'active',
      health: 98,
    },
    {
      id: 'prism',
      name: 'Agent Prism',
      title: 'Pricing Intelligence Agent',
      icon: DollarSign,
      color: '#06B6D4',
      responsibilities: ['Dynamic pricing', 'Competitive analysis', 'Margin optimization', 'Promotion recommendations'],
      metrics: [
        { label: 'Margin Growth', value: '+8.4%' },
        { label: 'Pricing Adjustments', value: '12.4K' },
        { label: 'Revenue Impact', value: '$180M' },
      ],
      status: 'active',
      health: 97,
    },
  ];

  const AI_INSIGHTS = [
    {
      type: 'forecast',
      icon: Brain,
      color: '#8B5CF6',
      title: 'Demand Forecast Alert',
      message: 'Demand forecast predicts a 22% increase for electronics next month. Consider increasing inventory by 15-20%.',
      impact: 'high',
      timestamp: '2 min ago',
    },
    {
      type: 'inventory',
      icon: Package,
      color: '#F59E0B',
      title: 'Inventory Shortage Risk',
      message: 'Inventory shortage risk detected for 14 high-demand products. Automated reorders initiated.',
      impact: 'high',
      timestamp: '5 min ago',
    },
    {
      type: 'pricing',
      icon: DollarSign,
      color: '#10B981',
      title: 'Dynamic Pricing Opportunity',
      message: 'Dynamic pricing opportunity identified worth $18M in additional revenue. Recommended price adjustments ready.',
      impact: 'high',
      timestamp: '8 min ago',
    },
    {
      type: 'customer',
      icon: Users,
      color: '#3B82F6',
      title: 'Retention Campaign',
      message: 'Customer retention campaign could increase repeat purchases by 11%. Targeting 2.4M at-risk customers.',
      impact: 'medium',
      timestamp: '12 min ago',
    },
    {
      type: 'operations',
      icon: Store,
      color: '#EC4899',
      title: 'Store Productivity Alert',
      message: 'Store productivity variance detected across 28 locations. Performance optimization recommendations available.',
      impact: 'medium',
      timestamp: '15 min ago',
    },
  ];

  const ACTIVITY_FEED = [
    { type: 'purchase', message: 'Purchase completed - $2,847.32', location: 'Store #1842', time: '2s ago', icon: ShoppingCart },
    { type: 'inventory', message: 'Inventory replenished - 847 units', location: 'Warehouse #7', time: '15s ago', icon: Package },
    { type: 'customer', message: 'New customer registered', location: 'Online', time: '32s ago', icon: Users },
    { type: 'promotion', message: 'Promotion launched - Summer Sale', location: 'All Stores', time: '1m ago', icon: Sparkles },
    { type: 'trending', message: 'Product trending - Wireless Earbuds', location: 'Online', time: '2m ago', icon: TrendingUp },
    { type: 'delivery', message: 'Delivery completed - Order #84729', location: 'Customer #2847', time: '3m ago', icon: Truck },
    { type: 'loyalty', message: 'Loyalty milestone achieved - Gold Member', location: 'Store #923', time: '4m ago', icon: CheckCircle },
    { type: 'ai', message: 'AI recommendation executed - Price adjustment', location: 'System', time: '5m ago', icon: Brain },
  ];

  const NAVIGATION_ITEMS = [
    { id: 'executive', label: 'Executive Dashboard', icon: LayoutDashboard },
    { id: 'agents', label: 'AI Retail Agents', icon: Brain },
    { id: 'operations', label: 'Store Operations', icon: Store },
    { id: 'inventory', label: 'Inventory Intelligence', icon: Package },
    { id: 'customer', label: 'Customer Intelligence', icon: Users },
    { id: 'merchandising', label: 'Merchandising', icon: ShoppingCart },
    { id: 'pricing', label: 'Pricing Engine', icon: DollarSign },
    { id: 'supply', label: 'Supply Chain', icon: Truck },
    { id: 'workforce', label: 'Workforce Management', icon: Users },
    { id: 'marketing', label: 'Marketing & Loyalty', icon: Target },
    { id: 'global', label: 'Global Operations', icon: Globe },
    { id: 'system', label: 'System Health', icon: Shield },
    { id: 'analytics', label: 'Analytics', icon: BarChart3 },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  const renderKPIBar = () => (
    <View style={styles.kpiBar}>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {KPI_DATA.sales.map((kpi, index) => (
          <View key={index} style={[styles.kpiCard, { borderLeftColor: kpi.color }]}>
            <kpi.icon size={20} color={kpi.color} />
            <Text style={styles.kpiValue}>{kpi.value}</Text>
            <Text style={styles.kpiLabel}>{kpi.label}</Text>
            <View style={styles.kpiTrend}>
              {kpi.trendUp ? <ArrowUpRight size={12} color="#10B981" /> : <ArrowDownRight size={12} color="#EF4444" />}
              <Text style={[styles.kpiTrendText, { color: kpi.trendUp ? '#10B981' : '#EF4444' }]}>{kpi.trend}</Text>
            </View>
          </View>
        ))}
      </ScrollView>
    </View>
  );

  const renderExecutiveCommandCenter = () => (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>Chief Retail Officer Command Center</Text>
      <View style={styles.commandCenterGrid}>
        <View style={[styles.commandCard, { backgroundColor: '#10B98115', borderColor: '#10B981' }]}>
          <DollarSign size={32} color="#10B981" />
          <Text style={styles.commandValue}>$8.4B</Text>
          <Text style={styles.commandLabel}>Total Revenue</Text>
          <Text style={[styles.commandTrend, { color: '#10B981' }]}>+12.5% YoY</Text>
        </View>
        <View style={[styles.commandCard, { backgroundColor: '#3B82F615', borderColor: '#3B82F6' }]}>
          <Users size={32} color="#3B82F6" />
          <Text style={styles.commandValue}>48M</Text>
          <Text style={styles.commandLabel}>Active Customers</Text>
          <Text style={[styles.commandTrend, { color: '#3B82F6' }]}>+18.2% YoY</Text>
        </View>
        <View style={[styles.commandCard, { backgroundColor: '#F59E0B15', borderColor: '#F59E0B' }]}>
          <Package size={32} color="#F59E0B" />
          <Text style={styles.commandValue}>$1.9B</Text>
          <Text style={styles.commandLabel}>Inventory Value</Text>
          <Text style={[styles.commandTrend, { color: '#F59E0B' }]}>-2.1% optimized</Text>
        </View>
        <View style={[styles.commandCard, { backgroundColor: '#8B5CF615', borderColor: '#8B5CF6' }]}>
          <Store size={32} color="#8B5CF6" />
          <Text style={styles.commandValue}>3,850</Text>
          <Text style={styles.commandLabel}>Active Stores</Text>
          <Text style={[styles.commandTrend, { color: '#8B5CF6' }]}>+45 new</Text>
        </View>
        <View style={[styles.commandCard, { backgroundColor: '#EC489915', borderColor: '#EC4899' }]}>
          <Target size={32} color="#EC4899" />
          <Text style={styles.commandValue}>7.8%</Text>
          <Text style={styles.commandLabel}>Conversion Rate</Text>
          <Text style={[styles.commandTrend, { color: '#EC4899' }]}>+1.1% improvement</Text>
        </View>
        <View style={[styles.commandCard, { backgroundColor: '#06B6D415', borderColor: '#06B6D4' }]}>
          <Brain size={32} color="#06B6D4" />
          <Text style={styles.commandValue}>+$520M</Text>
          <Text style={styles.commandLabel}>AI Revenue Impact</Text>
          <Text style={[styles.commandTrend, { color: '#06B6D4' }]}>+15.8% contribution</Text>
        </View>
      </View>
    </View>
  );

  const renderAIAgents = () => (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>AI Retail Agents</Text>
      <View style={styles.agentsGrid}>
        {AI_AGENTS.map((agent) => (
          <View key={agent.id} style={[styles.agentCard, { backgroundColor: agent.color + '10', borderColor: agent.color }]}>
            <View style={styles.agentHeader}>
              <View style={[styles.agentIcon, { backgroundColor: agent.color + '20' }]}>
                <agent.icon size={28} color={agent.color} />
              </View>
              <View style={styles.agentStatus}>
                <View style={[styles.statusDot, { backgroundColor: agent.status === 'active' ? '#10B981' : '#EF4444' }]} />
                <Text style={styles.statusText}>{agent.status}</Text>
              </View>
            </View>
            <Text style={styles.agentName}>{agent.name}</Text>
            <Text style={styles.agentTitle}>{agent.title}</Text>
            <View style={styles.agentMetrics}>
              {agent.metrics.map((metric, i) => (
                <View key={i} style={styles.metricItem}>
                  <Text style={styles.metricValue}>{metric.value}</Text>
                  <Text style={styles.metricLabel}>{metric.label}</Text>
                </View>
              ))}
            </View>
            <View style={styles.agentHealth}>
              <Text style={styles.healthLabel}>Health Score</Text>
              <View style={styles.healthBar}>
                <View style={[styles.healthFill, { width: `${agent.health}%`, backgroundColor: agent.color }]} />
              </View>
              <Text style={styles.healthValue}>{agent.health}%</Text>
            </View>
          </View>
        ))}
      </View>
    </View>
  );

  const renderAIInsights = () => (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>AI Insights Center</Text>
      {AI_INSIGHTS.map((insight, index) => (
        <View key={index} style={[styles.insightCard, { backgroundColor: insight.color + '10', borderLeftWidth: 3, borderLeftColor: insight.color }]}>
          <View style={styles.insightHeader}>
            <View style={[styles.insightIcon, { backgroundColor: insight.color + '20' }]}>
              <insight.icon size={20} color={insight.color} />
            </View>
            <Text style={styles.insightTitle}>{insight.title}</Text>
            <View style={[styles.impactBadge, { backgroundColor: insight.impact === 'high' ? '#EF444420' : '#F59E0B20' }]}>
              <Text style={[styles.impactText, { color: insight.impact === 'high' ? '#EF4444' : '#F59E0B' }]}>{insight.impact.toUpperCase()}</Text>
            </View>
          </View>
          <Text style={styles.insightMessage}>{insight.message}</Text>
          <View style={styles.insightFooter}>
            <Clock size={12} color="#6B7280" />
            <Text style={styles.insightTime}>{insight.timestamp}</Text>
          </View>
        </View>
      ))}
    </View>
  );

  const renderActivityFeed = () => (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>Real-Time Retail Activity Feed</Text>
      <View style={styles.activityFeed}>
        {ACTIVITY_FEED.map((activity, index) => (
          <View key={index} style={styles.activityItem}>
            <View style={[styles.activityIcon, { backgroundColor: '#3B82F615' }]}>
              <activity.icon size={16} color="#3B82F6" />
            </View>
            <View style={styles.activityContent}>
              <Text style={styles.activityMessage}>{activity.message}</Text>
              <View style={styles.activityMeta}>
                <Text style={styles.activityLocation}>{activity.location}</Text>
                <Text style={styles.activityTime}>{activity.time}</Text>
              </View>
            </View>
          </View>
        ))}
      </View>
    </View>
  );

  const renderNavigation = () => (
    <View style={styles.navigation}>
      <View style={styles.navHeader}>
        <Store size={28} color="#8B5CF6" />
        <Text style={styles.navTitle}>Retail OS</Text>
      </View>
      <ScrollView style={styles.navScroll}>
        {NAVIGATION_ITEMS.map((item) => (
          <TouchableOpacity
            key={item.id}
            style={[styles.navItem, activeSection === item.id && { backgroundColor: '#8B5CF620' }]}
            onPress={() => setActiveSection(item.id)}
          >
            <item.icon size={20} color={activeSection === item.id ? '#8B5CF6' : '#6B7280'} />
            <Text style={[styles.navLabel, activeSection === item.id && { color: '#8B5CF6' }]}>{item.label}</Text>
            {activeSection === item.id && <ChevronRight size={16} color="#8B5CF6" />}
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );

  const renderSectionContent = () => {
    switch (activeSection) {
      case 'executive':
        return (
          <>
            {renderKPIBar()}
            {renderExecutiveCommandCenter()}
            {renderAIAgents()}
            {renderAIInsights()}
            {renderActivityFeed()}
          </>
        );
      case 'agents':
        return (
          <>
            {renderAIAgents()}
            {renderAIInsights()}
          </>
        );
      case 'operations':
        return (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Store Operations Command Center</Text>
            <Text style={styles.placeholderText}>Navigate to detailed Store Operations page for full functionality.</Text>
          </View>
        );
      case 'inventory':
        return (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Inventory Intelligence Hub</Text>
            <Text style={styles.placeholderText}>Navigate to detailed Inventory Intelligence page for full functionality.</Text>
          </View>
        );
      case 'customer':
        return (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Customer Intelligence Center</Text>
            <Text style={styles.placeholderText}>Navigate to detailed Customer Intelligence page for full functionality.</Text>
          </View>
        );
      case 'merchandising':
        return (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Merchandising Command Center</Text>
            <Text style={styles.placeholderText}>Navigate to detailed Merchandising page for full functionality.</Text>
          </View>
        );
      case 'pricing':
        return (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Pricing Intelligence Engine</Text>
            <Text style={styles.placeholderText}>Navigate to detailed Pricing Intelligence page for full functionality.</Text>
          </View>
        );
      case 'supply':
        return (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Supply Chain Command Center</Text>
            <Text style={styles.placeholderText}>Navigate to detailed Supply Chain page for full functionality.</Text>
          </View>
        );
      case 'workforce':
        return (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Workforce Management Hub</Text>
            <Text style={styles.placeholderText}>Navigate to detailed Workforce Management page for full functionality.</Text>
          </View>
        );
      case 'marketing':
        return (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Marketing & Loyalty Center</Text>
            <Text style={styles.placeholderText}>Navigate to detailed Marketing & Loyalty page for full functionality.</Text>
          </View>
        );
      case 'global':
        return (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Global Retail Operations</Text>
            <Text style={styles.placeholderText}>Navigate to detailed Global Operations page for full functionality.</Text>
          </View>
        );
      case 'system':
        return (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>System Health & AI Infrastructure</Text>
            <Text style={styles.placeholderText}>Navigate to detailed System Health page for full functionality.</Text>
          </View>
        );
      case 'analytics':
        return (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Analytics Dashboard</Text>
            {renderKPIBar()}
            {renderExecutiveCommandCenter()}
          </View>
        );
      case 'settings':
        return (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Settings</Text>
            <Text style={styles.placeholderText}>System settings and configuration options.</Text>
          </View>
        );
      default:
        return (
          <>
            {renderKPIBar()}
            {renderExecutiveCommandCenter()}
            {renderAIAgents()}
            {renderAIInsights()}
            {renderActivityFeed()}
          </>
        );
    }
  };

  return (
    <View style={styles.container}>
      {renderNavigation()}
      <ScrollView style={styles.content}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Retail & Stores AI Operating System</Text>
          <Text style={styles.headerSubtitle}>Enterprise-Grade Retail Intelligence Platform</Text>
        </View>
        
        {renderSectionContent()}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#03050A',
    flexDirection: 'row',
  },
  navigation: {
    width: 240,
    backgroundColor: '#0A0F1A',
    borderRightWidth: 1,
    borderRightColor: '#1E293B',
    paddingTop: 20,
  },
  navHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginBottom: 20,
    gap: 12,
  },
  navTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  navScroll: {
    flex: 1,
  },
  navItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 14,
    gap: 12,
  },
  navLabel: {
    flex: 1,
    fontSize: 14,
    color: '#6B7280',
  },
  content: {
    flex: 1,
  },
  header: {
    padding: 24,
    borderBottomWidth: 1,
    borderBottomColor: '#1E293B',
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 4,
  },
  headerSubtitle: {
    fontSize: 14,
    color: '#6B7280',
  },
  kpiBar: {
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#1E293B',
  },
  kpiCard: {
    width: 160,
    marginLeft: 16,
    padding: 16,
    backgroundColor: '#0A0F1A',
    borderRadius: 12,
    borderLeftWidth: 3,
    gap: 8,
  },
  kpiValue: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  kpiLabel: {
    fontSize: 12,
    color: '#6B7280',
  },
  kpiTrend: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  kpiTrendText: {
    fontSize: 12,
    fontWeight: '600',
  },
  section: {
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#1E293B',
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 16,
  },
  commandCenterGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  commandCard: {
    width: (width - 280) / 3 - 16,
    padding: 20,
    borderRadius: 16,
    borderWidth: 1,
    gap: 12,
  },
  commandValue: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  commandLabel: {
    fontSize: 14,
    color: '#6B7280',
  },
  commandTrend: {
    fontSize: 12,
    fontWeight: '600',
  },
  agentsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  agentCard: {
    width: (width - 280) / 2 - 16,
    padding: 20,
    borderRadius: 16,
    borderWidth: 1,
    gap: 12,
  },
  agentHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  agentIcon: {
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
  },
  agentStatus: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  statusDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  statusText: {
    fontSize: 12,
    color: '#6B7280',
  },
  agentName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  agentTitle: {
    fontSize: 14,
    color: '#6B7280',
  },
  agentMetrics: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#1E293B',
  },
  metricItem: {
    alignItems: 'center',
  },
  metricValue: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  metricLabel: {
    fontSize: 11,
    color: '#6B7280',
  },
  agentHealth: {
    paddingTop: 12,
  },
  healthLabel: {
    fontSize: 12,
    color: '#6B7280',
    marginBottom: 6,
  },
  healthBar: {
    height: 6,
    backgroundColor: '#1E293B',
    borderRadius: 3,
    overflow: 'hidden',
    marginBottom: 4,
  },
  healthFill: {
    height: '100%',
  },
  healthValue: {
    fontSize: 12,
    fontWeight: '600',
    color: '#FFFFFF',
    textAlign: 'right',
  },
  insightCard: {
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    gap: 12,
  },
  insightHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  insightIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  insightTitle: {
    flex: 1,
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  impactBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  impactText: {
    fontSize: 10,
    fontWeight: 'bold',
  },
  insightMessage: {
    fontSize: 14,
    color: '#9CA3AF',
    lineHeight: 20,
  },
  insightFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  insightTime: {
    fontSize: 12,
    color: '#6B7280',
  },
  activityFeed: {
    gap: 8,
  },
  activityItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    backgroundColor: '#0A0F1A',
    borderRadius: 8,
    gap: 12,
  },
  activityIcon: {
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
  },
  activityContent: {
    flex: 1,
  },
  activityMessage: {
    fontSize: 14,
    color: '#FFFFFF',
    marginBottom: 4,
  },
  activityMeta: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  activityLocation: {
    fontSize: 12,
    color: '#6B7280',
  },
  activityTime: {
    fontSize: 12,
    color: '#6B7280',
  },
  placeholderText: {
    fontSize: 16,
    color: '#6B7280',
    textAlign: 'center',
    paddingVertical: 40,
  },
});
