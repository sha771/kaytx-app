import React, { useState } from 'react';
import { View, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Text } from '@/components/ui/text';
import { useTheme } from '@/providers/ThemeProvider';
import { 
  LayoutDashboard,
  Building2,
  BarChart3,
  TrendingUp,
  TrendingDown,
  Activity,
  Target,
  Users,
  Zap,
  Star,
  MessageSquare,
  CheckCircle,
  AlertCircle,
  ArrowUpRight,
  ArrowDownRight,
  Brain,
  Settings,
  Search,
  Bell,
  Filter,
  MoreVertical,
  RefreshCw,
  Download,
  Share2,
  Eye,
  Plus,
  Minus,
  X,
  Save,
  Edit2,
  Trash2,
  Copy,
  LineChart,
  PieChart,
  Calendar,
  Clock,
  Globe,
  FileText,
  Briefcase,
  Lightbulb,
  Rocket,
  GitBranch,
  Flame,
  Heart,
  Award,
  Flag,
  Code,
  Layers,
  Network,
  Sparkles,
  Info,
  Beaker,
  Route,
  ChevronLeft,
  ChevronRight,
  Home,
  DollarSign,
  MapPin,
  Wrench,
  Shield,
  Calculator,
  TrendingUp as TrendingUpIcon,
  Building,
  Key,
  UserCheck,
  Hammer,
  Search as SearchIcon,
  Landmark,
  PieChart as PieChartIcon,
  BarChart,
} from 'lucide-react-native';

// Types
interface PropertyAgent {
  id: string;
  name: string;
  specialty: string;
  avatar: string;
  status: 'active' | 'monitoring' | 'paused' | 'error';
  confidenceScore: number;
  propertyImpactScore: number;
  metrics: {
    assetsManaged?: number;
    portfolioValue?: string;
    optimizationGains?: string;
    activeLeases?: number;
    occupancyOptimization?: string;
    renewalSuccessRate?: string;
    risksIdentified?: number;
    maintenanceEventsPredicted?: number;
    forecastAccuracy?: number;
  };
  activeInsights: number;
  trend: 'up' | 'down' | 'stable';
}

interface RealEstateKPI {
  id: string;
  title: string;
  value: string;
  change: string;
  trend: 'up' | 'down' | 'stable';
  color: string;
  subtitle: string;
}

interface Property {
  id: string;
  name: string;
  type: 'residential' | 'commercial' | 'industrial' | 'retail' | 'mixed-use';
  value: string;
  occupancy: number;
  location: string;
  status: string;
}

interface Lease {
  id: string;
  tenant: string;
  property: string;
  value: string;
  startDate: string;
  endDate: string;
  status: 'active' | 'expiring' | 'renewed';
}

interface MaintenanceRequest {
  id: string;
  property: string;
  type: string;
  priority: 'high' | 'medium' | 'low';
  status: 'open' | 'in-progress' | 'completed';
  assignedTo: string;
}

interface AcquisitionOpportunity {
  id: string;
  property: string;
  location: string;
  askingPrice: string;
  estimatedValue: string;
  capRate: string;
  irr: string;
  status: 'analyzing' | 'underwriting' | 'pending' | 'approved';
}

interface MarketInsight {
  id: string;
  insight: string;
  category: string;
  confidence: number;
  impact: 'high' | 'medium' | 'low';
  timestamp: string;
}

interface PropertyActivity {
  id: string;
  event: string;
  type: 'lease' | 'tenant' | 'maintenance' | 'acquisition' | 'payment' | 'inspection' | 'forecast';
  timestamp: string;
  property?: string;
}

interface SystemHealth {
  id: string;
  system: string;
  status: 'healthy' | 'degraded' | 'down';
  uptime: string;
  latency: string;
}

const RealEstateCommandCenter = () => {
  const theme = useTheme();
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [activeTab, setActiveTab] = useState('dashboard');

  // Navigation Items
  const navigationItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'agents', label: 'AI Property Agents', icon: Building2 },
    { id: 'portfolio', label: 'Portfolio Management', icon: Briefcase },
    { id: 'properties', label: 'Properties', icon: Building },
    { id: 'leasing', label: 'Leasing', icon: Key },
    { id: 'tenants', label: 'Tenants', icon: Users },
    { id: 'maintenance', label: 'Maintenance', icon: Wrench },
    { id: 'acquisitions', label: 'Acquisitions', icon: SearchIcon },
    { id: 'market', label: 'Market Intelligence', icon: Globe },
    { id: 'financial', label: 'Financial Analytics', icon: DollarSign },
    { id: 'reports', label: 'Reports', icon: FileText },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  // Real Estate KPIs
  const realEstateKPIs: RealEstateKPI[] = [
    { id: '1', title: 'Total Portfolio Value', value: '$8.4B', change: '+12.4%', trend: 'up', color: '#10B981', subtitle: 'Asset value' },
    { id: '2', title: 'Occupancy Rate', value: '94.8%', change: '+2.3%', trend: 'up', color: '#06B6D4', subtitle: 'Portfolio occupancy' },
    { id: '3', title: 'Net Operating Income', value: '$34.2M', change: '+8.7%', trend: 'up', color: '#F59E0B', subtitle: 'Monthly NOI' },
    { id: '4', title: 'Rental Revenue', value: '$82M', change: '+6.2%', trend: 'up', color: '#8B5CF6', subtitle: 'Monthly revenue' },
    { id: '5', title: 'Cap Rate', value: '6.8%', change: '+0.4%', trend: 'up', color: '#EC4899', subtitle: 'Portfolio average' },
    { id: '6', title: 'Cash Flow', value: '$18.4M', change: '+11.2%', trend: 'up', color: '#10B981', subtitle: 'Monthly cash flow' },
    { id: '7', title: 'Assets Under Management', value: '428', change: '+12', trend: 'up', color: '#06B6D4', subtitle: 'Total properties' },
    { id: '8', title: 'Average Lease Term', value: '3.2y', change: '+0.3y', trend: 'up', color: '#F59E0B', subtitle: 'Years' },
    { id: '9', title: 'Property Appreciation', value: '+12.4%', change: '+2.1%', trend: 'up', color: '#8B5CF6', subtitle: 'YoY growth' },
    { id: '10', title: 'AI Forecast Accuracy', value: '95%', change: '+3%', trend: 'up', color: '#EC4899', subtitle: 'Prediction accuracy' },
  ];

  // AI Property Agents
  const propertyAgents: PropertyAgent[] = [
    {
      id: '1',
      name: 'Agent Atlas',
      specialty: 'Portfolio Intelligence Agent',
      avatar: '🏢',
      status: 'active',
      confidenceScore: 97,
      propertyImpactScore: 94,
      metrics: {
        assetsManaged: 428,
        portfolioValue: '$4.8B',
        optimizationGains: '+18%',
      },
      activeInsights: 156,
      trend: 'up',
    },
    {
      id: '2',
      name: 'Agent Lease',
      specialty: 'Leasing Operations Agent',
      avatar: '🔑',
      status: 'active',
      confidenceScore: 95,
      propertyImpactScore: 91,
      metrics: {
        activeLeases: 18240,
        occupancyOptimization: '+9%',
        renewalSuccessRate: '92%',
      },
      activeInsights: 124,
      trend: 'up',
    },
    {
      id: '3',
      name: 'Agent Sentinel',
      specialty: 'Property Risk Agent',
      avatar: '🛡️',
      status: 'active',
      confidenceScore: 96,
      propertyImpactScore: 88,
      metrics: {
        risksIdentified: 842,
        maintenanceEventsPredicted: 2481,
        forecastAccuracy: 95,
      },
      activeInsights: 89,
      trend: 'stable',
    },
    {
      id: '4',
      name: 'Agent Value',
      specialty: 'Valuation Forecast Agent',
      avatar: '📊',
      status: 'active',
      confidenceScore: 94,
      propertyImpactScore: 90,
      metrics: {
        assetsManaged: 156,
        portfolioValue: '$2.1B',
        optimizationGains: '+14%',
      },
      activeInsights: 67,
      trend: 'up',
    },
  ];

  // Properties
  const properties: Property[] = [
    { id: '1', name: 'Manhattan Tower', type: 'commercial', value: '$850M', occupancy: 96, location: 'New York, NY', status: 'Active' },
    { id: '2', name: 'Sunset Apartments', type: 'residential', value: '$420M', occupancy: 94, location: 'Los Angeles, CA', status: 'Active' },
    { id: '3', name: 'Tech Park Industrial', type: 'industrial', value: '$320M', occupancy: 98, location: 'Austin, TX', status: 'Active' },
    { id: '4', name: 'Downtown Retail Center', type: 'retail', value: '$180M', occupancy: 89, location: 'Chicago, IL', status: 'Active' },
    { id: '5', name: 'Harbor Mixed-Use', type: 'mixed-use', value: '$650M', occupancy: 92, location: 'Miami, FL', status: 'Active' },
  ];

  // Leases
  const leases: Lease[] = [
    { id: '1', tenant: 'Tech Corp Inc', property: 'Manhattan Tower', value: '$2.4M/year', startDate: '2023-01-01', endDate: '2026-12-31', status: 'active' },
    { id: '2', tenant: 'Global Finance LLC', property: 'Sunset Apartments', value: '$1.8M/year', startDate: '2023-06-01', endDate: '2025-05-31', status: 'expiring' },
    { id: '3', tenant: 'Logistics Partners', property: 'Tech Park Industrial', value: '$3.2M/year', startDate: '2022-03-01', endDate: '2027-02-28', status: 'active' },
  ];

  // Maintenance Requests
  const maintenanceRequests: MaintenanceRequest[] = [
    { id: '1', property: 'Manhattan Tower', type: 'HVAC Repair', priority: 'high', status: 'in-progress', assignedTo: 'ABC Mechanical' },
    { id: '2', property: 'Sunset Apartments', type: 'Plumbing', priority: 'medium', status: 'open', assignedTo: 'City Plumbing Co' },
    { id: '3', property: 'Tech Park Industrial', type: 'Electrical', priority: 'high', status: 'completed', assignedTo: 'Power Solutions Inc' },
  ];

  // Acquisition Opportunities
  const acquisitionOpportunities: AcquisitionOpportunity[] = [
    { id: '1', property: 'Pacific Heights Complex', location: 'San Francisco, CA', askingPrice: '$320M', estimatedValue: '$380M', capRate: '6.2%', irr: '14.5%', status: 'underwriting' },
    { id: '2', property: 'Midtown Office Park', location: 'Atlanta, GA', askingPrice: '$180M', estimatedValue: '$210M', capRate: '7.1%', irr: '16.2%', status: 'analyzing' },
    { id: '3', property: 'Harbor Logistics Center', location: 'Seattle, WA', askingPrice: '$145M', estimatedValue: '$175M', capRate: '6.8%', irr: '15.8%', status: 'pending' },
  ];

  // Market Insights
  const marketInsights: MarketInsight[] = [
    { id: '1', insight: 'Commercial office demand increasing in tech hubs, 15% YoY growth expected.', category: 'Market Trends', confidence: 94, impact: 'high', timestamp: '2h ago' },
    { id: '2', insight: 'Industrial rental rates projected to rise 8% in Q3 due to supply constraints.', category: 'Rental Analysis', confidence: 89, impact: 'high', timestamp: '4h ago' },
    { id: '3', insight: 'Multi-family assets showing strongest appreciation in Sun Belt markets.', category: 'Valuation', confidence: 87, impact: 'medium', timestamp: '6h ago' },
    { id: '4', insight: 'Cap rate compression expected in core markets, secondary markets offer better yields.', category: 'Investment', confidence: 92, impact: 'high', timestamp: '8h ago' },
  ];

  // Property Activities
  const propertyActivities: PropertyActivity[] = [
    { id: '1', event: 'Lease signed - Tech Corp Inc', type: 'lease', timestamp: '2m ago', property: 'Manhattan Tower' },
    { id: '2', event: 'Tenant onboarded - Global Finance LLC', type: 'tenant', timestamp: '15m ago', property: 'Sunset Apartments' },
    { id: '3', event: 'Maintenance request created - HVAC Repair', type: 'maintenance', timestamp: '32m ago', property: 'Manhattan Tower' },
    { id: '4', event: 'Property inspection completed', type: 'inspection', timestamp: '1h ago', property: 'Tech Park Industrial' },
    { id: '5', event: 'Acquisition opportunity added - Pacific Heights', type: 'acquisition', timestamp: '2h ago' },
    { id: '6', event: 'Rental payment received - $2.4M', type: 'payment', timestamp: '3h ago', property: 'Manhattan Tower' },
    { id: '7', event: 'AI forecast updated - Occupancy 97%', type: 'forecast', timestamp: '4h ago' },
  ];

  // System Health
  const systemHealth: SystemHealth[] = [
    { id: '1', system: 'Property Management Platform', status: 'healthy', uptime: '99.9%', latency: '45ms' },
    { id: '2', system: 'Leasing Systems', status: 'healthy', uptime: '99.8%', latency: '32ms' },
    { id: '3', system: 'CRM Integrations', status: 'healthy', uptime: '99.7%', latency: '58ms' },
    { id: '4', system: 'Accounting Systems', status: 'healthy', uptime: '99.9%', latency: '28ms' },
    { id: '5', system: 'Maintenance Platforms', status: 'healthy', uptime: '99.6%', latency: '67ms' },
    { id: '6', system: 'AI Agents', status: 'healthy', uptime: '99.8%', latency: '42ms' },
    { id: '7', system: 'Market Data Feeds', status: 'healthy', uptime: '99.5%', latency: '89ms' },
  ];

  // Render Functions
  const renderKPICard = (kpi: RealEstateKPI) => (
    <View key={kpi.id} style={[styles.kpiCard, { backgroundColor: theme.colors.card, borderColor: kpi.color + '30' }]}>
      <View style={styles.kpiHeader}>
        <Text style={[styles.kpiTitle, { color: theme.colors.text }]}>{kpi.title}</Text>
        <View style={[
          styles.kpiTrendBadge,
          { backgroundColor: kpi.trend === 'up' ? 'rgba(16, 185, 129, 0.2)' : kpi.trend === 'down' ? 'rgba(239, 68, 68, 0.2)' : 'rgba(255,255,255,0.1)' }
        ]}>
          {kpi.trend === 'up' ? <TrendingUp size={12} color="#10B981" /> : 
           kpi.trend === 'down' ? <TrendingDown size={12} color="#EF4444" /> : 
           <Activity size={12} color="rgba(255,255,255,0.6)" />}
          <Text style={[
            styles.kpiTrendText,
            { color: kpi.trend === 'up' ? '#10B981' : kpi.trend === 'down' ? '#EF4444' : 'rgba(255,255,255,0.6)' }
          ]}>{kpi.change}</Text>
        </View>
      </View>
      <Text style={[styles.kpiValue, { color: kpi.color }]}>{kpi.value}</Text>
      <Text style={[styles.kpiSubtitle, { color: theme.colors.textSecondary }]}>{kpi.subtitle}</Text>
    </View>
  );

  const renderAgentCard = (agent: PropertyAgent) => (
    <View key={agent.id} style={[styles.agentCard, { backgroundColor: theme.colors.card, borderColor: agent.status === 'active' ? '#06B6D4' + '30' : '#6B7280' + '30' }]}>
      <View style={styles.agentAvatar}>
        <Text style={styles.agentAvatarText}>{agent.avatar}</Text>
        <View style={[
          styles.agentStatusDot,
          { backgroundColor: agent.status === 'active' ? '#10B981' : agent.status === 'error' ? '#EF4444' : '#6B7280' }
        ]} />
      </View>
      <View style={styles.agentInfo}>
        <Text style={[styles.agentName, { color: theme.colors.text }]}>{agent.name}</Text>
        <Text style={[styles.agentSpecialty, { color: theme.colors.textSecondary }]}>{agent.specialty}</Text>
      </View>
      <View style={styles.agentMetrics}>
        <View style={styles.agentMetric}>
          <Text style={[styles.agentMetricValue, { color: '#06B6D4' }]}>{agent.confidenceScore}%</Text>
          <Text style={[styles.agentMetricLabel, { color: theme.colors.textSecondary }]}>Confidence</Text>
        </View>
        <View style={styles.agentMetric}>
          <Text style={[styles.agentMetricValue, { color: '#10B981' }]}>{agent.propertyImpactScore}</Text>
          <Text style={[styles.agentMetricLabel, { color: theme.colors.textSecondary }]}>Impact</Text>
        </View>
      </View>
      <View style={styles.agentInsights}>
        <Text style={[styles.agentInsightsCount, { color: '#8B5CF6' }]}>{agent.activeInsights}</Text>
        <Text style={[styles.agentInsightsLabel, { color: theme.colors.textSecondary }]}>Insights</Text>
      </View>
    </View>
  );

  const renderPropertyCard = (property: Property) => (
    <View key={property.id} style={[styles.propertyCard, { backgroundColor: theme.colors.card }]}>
      <View style={styles.propertyHeader}>
        <Building2 size={20} color="#06B6D4" />
        <View style={styles.propertyInfo}>
          <Text style={[styles.propertyName, { color: theme.colors.text }]}>{property.name}</Text>
          <Text style={[styles.propertyLocation, { color: theme.colors.textSecondary }]}>{property.location}</Text>
        </View>
      </View>
      <View style={styles.propertyMetrics}>
        <View style={styles.propertyMetric}>
          <Text style={[styles.propertyMetricValue, { color: '#10B981' }]}>{property.value}</Text>
          <Text style={[styles.propertyMetricLabel, { color: theme.colors.textSecondary }]}>Value</Text>
        </View>
        <View style={styles.propertyMetric}>
          <Text style={[styles.propertyMetricValue, { color: '#06B6D4' }]}>{property.occupancy}%</Text>
          <Text style={[styles.propertyMetricLabel, { color: theme.colors.textSecondary }]}>Occupancy</Text>
        </View>
      </View>
      <View style={[styles.propertyTypeBadge, { backgroundColor: 'rgba(6, 182, 212, 0.15)' }]}>
        <Text style={[styles.propertyTypeText, { color: '#06B6D4' }]}>{property.type}</Text>
      </View>
    </View>
  );

  return (
    <View style={[styles.container, { backgroundColor: '#0B0F14' }]}>
      {/* Header */}
      <View style={[styles.header, { backgroundColor: 'rgba(11, 15, 20, 0.8)', borderBottomColor: 'rgba(255,255,255,0.1)' }]}>
        <View style={styles.headerContent}>
          <View style={styles.headerLeft}>
            <Building2 size={32} color="#06B6D4" />
            <View style={styles.headerTitle}>
              <Text style={[styles.headerTitleText, { color: '#FFFFFF' }]}>AI Real Estate & Property Command Center</Text>
              <Text style={[styles.headerSubtitle, { color: 'rgba(255,255,255,0.6)' }]}>Autonomous Property Operations & Portfolio Intelligence</Text>
            </View>
          </View>
          <View style={styles.headerActions}>
            <TouchableOpacity style={[styles.headerButton, { backgroundColor: 'rgba(255,255,255,0.05)' }]}>
              <Search size={20} color="rgba(255,255,255,0.6)" />
            </TouchableOpacity>
            <TouchableOpacity style={[styles.headerButton, { backgroundColor: 'rgba(255,255,255,0.05)' }]}>
              <Bell size={20} color="rgba(255,255,255,0.6)" />
            </TouchableOpacity>
            <TouchableOpacity style={[styles.headerButton, { backgroundColor: 'rgba(255,255,255,0.05)' }]}>
              <Settings size={20} color="rgba(255,255,255,0.6)" />
            </TouchableOpacity>
          </View>
        </View>
      </View>

      <View style={styles.mainContent}>
        {/* Left Sidebar */}
        <View style={[styles.sidebar, { backgroundColor: 'rgba(11, 15, 20, 0.6)', borderRightColor: 'rgba(255,255,255,0.1)' }]}>
          <TouchableOpacity 
            style={styles.sidebarToggle}
            onPress={() => setSidebarCollapsed(!sidebarCollapsed)}
          >
            {sidebarCollapsed ? <ChevronRight size={20} color="rgba(255,255,255,0.6)" /> : <ChevronLeft size={20} color="rgba(255,255,255,0.6)" />}
          </TouchableOpacity>
          
          {!sidebarCollapsed && (
            <View style={styles.sidebarContent}>
              {navigationItems.map((item) => {
                const Icon = item.icon;
                const isActive = activeTab === item.id;
                return (
                  <TouchableOpacity
                    key={item.id}
                    style={[
                      styles.sidebarItem,
                      isActive && { backgroundColor: 'rgba(6, 182, 212, 0.15)' }
                    ]}
                    onPress={() => setActiveTab(item.id)}
                  >
                    <Icon 
                      size={18} 
                      color={isActive ? '#06B6D4' : 'rgba(255,255,255,0.6)'} 
                    />
                    <Text style={[
                      styles.sidebarItemText,
                      { color: isActive ? '#06B6D4' : 'rgba(255,255,255,0.6)' }
                    ]}>
                      {item.label}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </View>
          )}
        </View>

        {/* Main Content Area */}
        <ScrollView style={styles.content}>
        
        {/* Top Executive Bar - Prominent KPI Display */}
        <View style={[styles.topExecutiveBar, { backgroundColor: 'rgba(6, 182, 212, 0.08)', borderColor: 'rgba(6, 182, 212, 0.2)' }]}>
          <View style={styles.topBarHeader}>
            <View style={styles.topBarTitle}>
              <TrendingUpIcon size={20} color="#06B6D4" />
              <Text style={[styles.topBarTitleText, { color: '#FFFFFF' }]}>Real Estate Executive Overview</Text>
            </View>
            <Text style={[styles.topBarPeriod, { color: 'rgba(255,255,255,0.6)' }]}>Last 24 hours</Text>
          </View>
          
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.topBarScroll}>
            <View style={styles.topBarKPIs}>
              {realEstateKPIs.slice(0, 5).map((kpi) => (
                <View key={kpi.id} style={[styles.topBarKPI, { backgroundColor: 'rgba(255,255,255,0.05)', borderColor: kpi.color + '40' }]}>
                  <Text style={[styles.topBarKPITitle, { color: 'rgba(255,255,255,0.7)' }]}>{kpi.title}</Text>
                  <Text style={[styles.topBarKPIValue, { color: kpi.color }]}>{kpi.value}</Text>
                  <View style={styles.topBarKPIMetrics}>
                    <View style={[
                      styles.topBarKPITrend,
                      { backgroundColor: kpi.trend === 'up' ? 'rgba(16, 185, 129, 0.2)' : kpi.trend === 'down' ? 'rgba(239, 68, 68, 0.2)' : 'rgba(255,255,255,0.1)' }
                    ]}>
                      {kpi.trend === 'up' ? <TrendingUp size={12} color="#10B981" /> : 
                       kpi.trend === 'down' ? <TrendingDown size={12} color="#EF4444" /> : 
                       <Activity size={12} color="rgba(255,255,255,0.6)" />}
                      <Text style={[
                        styles.topBarKPITrendText,
                        { color: kpi.trend === 'up' ? '#10B981' : kpi.trend === 'down' ? '#EF4444' : 'rgba(255,255,255,0.6)' }
                      ]}>{kpi.change}</Text>
                    </View>
                    <Text style={[styles.topBarKPISubtitle, { color: 'rgba(255,255,255,0.5)' }]}>{kpi.subtitle}</Text>
                  </View>
                </View>
              ))}
            </View>
          </ScrollView>
        </View>

        {/* Real Estate KPIs */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Real Estate KPIs</Text>
          <View style={styles.kpiGrid}>
            {realEstateKPIs.map(renderKPICard)}
          </View>
        </View>

        {/* AI Property Agents */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>AI Property Agents</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.agentsScroll}>
            {propertyAgents.map(renderAgentCard)}
          </ScrollView>
        </View>

        {/* CIO / Real Estate Executive Command Center */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>CIO / Real Estate Executive Command Center</Text>
          <View style={[styles.commandCenter, { backgroundColor: 'rgba(6, 182, 212, 0.05)', borderColor: 'rgba(6, 182, 212, 0.2)' }]}>
            
            {/* Command Center Header */}
            <View style={styles.commandCenterHeader}>
              <View style={styles.commandCenterTitle}>
                <Brain size={24} color="#06B6D4" />
                <View>
                  <Text style={[styles.commandCenterTitleText, { color: '#FFFFFF' }]}>Portfolio Intelligence Hub</Text>
                  <Text style={[styles.commandCenterSubtitle, { color: 'rgba(255,255,255,0.6)' }]}>Real-time portfolio performance monitoring</Text>
                </View>
              </View>
              <View style={styles.commandCenterActions}>
                <TouchableOpacity style={[styles.commandCenterButton, { backgroundColor: 'rgba(6, 182, 212, 0.2)' }]}>
                  <RefreshCw size={16} color="#06B6D4" />
                  <Text style={[styles.commandCenterButtonText, { color: '#06B6D4' }]}>Refresh</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.commandCenterButton, { backgroundColor: 'rgba(255,255,255,0.1)' }]}>
                  <Download size={16} color="rgba(255,255,255,0.7)" />
                  <Text style={[styles.commandCenterButtonText, { color: 'rgba(255,255,255,0.7)' }]}>Export</Text>
                </TouchableOpacity>
              </View>
            </View>

            {/* Primary Metrics Grid */}
            <View style={styles.commandCenterMetrics}>
              <View style={[styles.commandMetricCard, { backgroundColor: 'rgba(255,255,255,0.03)', borderColor: 'rgba(6, 182, 212, 0.3)' }]}>
                <View style={styles.commandMetricHeader}>
                  <DollarSign size={20} color="#06B6D4" />
                  <Text style={[styles.commandMetricLabel, { color: 'rgba(255,255,255,0.7)' }]}>Total Portfolio Value</Text>
                </View>
                <Text style={[styles.commandMetricValue, { color: '#06B6D4' }]}>$8.4B</Text>
                <View style={styles.commandMetricTrend}>
                  <TrendingUp size={14} color="#10B981" />
                  <Text style={[styles.commandMetricTrendText, { color: '#10B981' }]}>+12.4%</Text>
                  <Text style={[styles.commandMetricPeriod, { color: 'rgba(255,255,255,0.5)' }]}>YoY growth</Text>
                </View>
              </View>

              <View style={[styles.commandMetricCard, { backgroundColor: 'rgba(255,255,255,0.03)', borderColor: 'rgba(16, 185, 129, 0.3)' }]}>
                <View style={styles.commandMetricHeader}>
                  <Activity size={20} color="#10B981" />
                  <Text style={[styles.commandMetricLabel, { color: 'rgba(255,255,255,0.7)' }]}>Occupancy Rate</Text>
                </View>
                <Text style={[styles.commandMetricValue, { color: '#10B981' }]}>94.8%</Text>
                <View style={styles.commandMetricTrend}>
                  <TrendingUp size={14} color="#10B981" />
                  <Text style={[styles.commandMetricTrendText, { color: '#10B981' }]}>+2.3%</Text>
                  <Text style={[styles.commandMetricPeriod, { color: 'rgba(255,255,255,0.5)' }]}>Portfolio avg</Text>
                </View>
              </View>

              <View style={[styles.commandMetricCard, { backgroundColor: 'rgba(255,255,255,0.03)', borderColor: 'rgba(245, 158, 11, 0.3)' }]}>
                <View style={styles.commandMetricHeader}>
                  <DollarSign size={20} color="#F59E0B" />
                  <Text style={[styles.commandMetricLabel, { color: 'rgba(255,255,255,0.7)' }]}>Monthly Rental Revenue</Text>
                </View>
                <Text style={[styles.commandMetricValue, { color: '#F59E0B' }]}>$82M</Text>
                <View style={styles.commandMetricTrend}>
                  <TrendingUp size={14} color="#10B981" />
                  <Text style={[styles.commandMetricTrendText, { color: '#10B981' }]}>+6.2%</Text>
                  <Text style={[styles.commandMetricPeriod, { color: 'rgba(255,255,255,0.5)' }]}>Monthly</Text>
                </View>
              </View>

              <View style={[styles.commandMetricCard, { backgroundColor: 'rgba(255,255,255,0.03)', borderColor: 'rgba(139, 92, 246, 0.3)' }]}>
                <View style={styles.commandMetricHeader}>
                  <Calculator size={20} color="#8B5CF6" />
                  <Text style={[styles.commandMetricLabel, { color: 'rgba(255,255,255,0.7)' }]}>Net Operating Income</Text>
                </View>
                <Text style={[styles.commandMetricValue, { color: '#8B5CF6' }]}>$34.2M</Text>
                <View style={styles.commandMetricTrend}>
                  <TrendingUp size={14} color="#10B981" />
                  <Text style={[styles.commandMetricTrendText, { color: '#10B981' }]}>+8.7%</Text>
                  <Text style={[styles.commandMetricPeriod, { color: 'rgba(255,255,255,0.5)' }]}>Monthly NOI</Text>
                </View>
              </View>

              <View style={[styles.commandMetricCard, { backgroundColor: 'rgba(255,255,255,0.03)', borderColor: 'rgba(236, 72, 153, 0.3)' }]}>
                <View style={styles.commandMetricHeader}>
                  <TrendingUpIcon size={20} color="#EC4899" />
                  <Text style={[styles.commandMetricLabel, { color: 'rgba(255,255,255,0.7)' }]}>Property Appreciation</Text>
                </View>
                <Text style={[styles.commandMetricValue, { color: '#EC4899' }]}>+12.4%</Text>
                <View style={styles.commandMetricTrend}>
                  <TrendingUp size={14} color="#10B981" />
                  <Text style={[styles.commandMetricTrendText, { color: '#10B981' }]}>+2.1%</Text>
                  <Text style={[styles.commandMetricPeriod, { color: 'rgba(255,255,255,0.5)' }]}>YoY growth</Text>
                </View>
              </View>
            </View>

            {/* Portfolio Health Overview */}
            <View style={styles.commandCenterHealth}>
              <View style={styles.healthOverview}>
                <Text style={[styles.healthOverviewTitle, { color: '#FFFFFF' }]}>Portfolio Health Score</Text>
                <View style={styles.healthScoreContainer}>
                  <Text style={[styles.healthScore, { color: '#10B981' }]}>94%</Text>
                  <View style={styles.healthScoreIndicator}>
                    <View style={[styles.healthScoreBar, { width: '94%', backgroundColor: '#10B981' }]} />
                  </View>
                </View>
                <Text style={[styles.healthScoreDescription, { color: 'rgba(255,255,255,0.6)' }]}>Excellent - All portfolio systems optimal</Text>
              </View>

              <View style={styles.healthBreakdown}>
                <Text style={[styles.healthBreakdownTitle, { color: '#FFFFFF' }]}>Health Breakdown</Text>
                <View style={styles.healthBreakdownItems}>
                  <View style={styles.healthBreakdownItem}>
                    <View style={[styles.healthBreakdownDot, { backgroundColor: '#06B6D4' }]} />
                    <Text style={[styles.healthBreakdownLabel, { color: 'rgba(255,255,255,0.7)' }]}>Occupancy</Text>
                    <Text style={[styles.healthBreakdownValue, { color: '#06B6D4' }]}>95%</Text>
                  </View>
                  <View style={styles.healthBreakdownItem}>
                    <View style={[styles.healthBreakdownDot, { backgroundColor: '#10B981' }]} />
                    <Text style={[styles.healthBreakdownLabel, { color: 'rgba(255,255,255,0.7)' }]}>Leasing</Text>
                    <Text style={[styles.healthBreakdownValue, { color: '#10B981' }]}>92%</Text>
                  </View>
                  <View style={styles.healthBreakdownItem}>
                    <View style={[styles.healthBreakdownDot, { backgroundColor: '#8B5CF6' }]} />
                    <Text style={[styles.healthBreakdownLabel, { color: 'rgba(255,255,255,0.7)' }]}>Maintenance</Text>
                    <Text style={[styles.healthBreakdownValue, { color: '#8B5CF6' }]}>94%</Text>
                  </View>
                  <View style={styles.healthBreakdownItem}>
                    <View style={[styles.healthBreakdownDot, { backgroundColor: '#F59E0B' }]} />
                    <Text style={[styles.healthBreakdownLabel, { color: 'rgba(255,255,255,0.7)' }]}>Financial</Text>
                    <Text style={[styles.healthBreakdownValue, { color: '#F59E0B' }]}>96%</Text>
                  </View>
                </View>
              </View>
            </View>

            {/* Portfolio Performance Trend */}
            <View style={styles.growthTrendSection}>
              <View style={styles.growthTrendHeader}>
                <LineChart size={16} color="#06B6D4" />
                <Text style={[styles.growthTrendTitle, { color: '#FFFFFF' }]}>Portfolio Performance Trend</Text>
              </View>
              <View style={styles.growthTrendVisualization}>
                <View style={styles.growthTrendBars}>
                  {[
                    { month: 'Jan', value: 78 },
                    { month: 'Feb', value: 82 },
                    { month: 'Mar', value: 85 },
                    { month: 'Apr', value: 88 },
                    { month: 'May', value: 91 },
                    { month: 'Jun', value: 94 },
                  ].map((data, index) => (
                    <View key={index} style={styles.growthTrendBar}>
                      <View style={[
                        styles.growthTrendBarFill,
                        { 
                          height: `${data.value}%`,
                          backgroundColor: data.value >= 90 ? '#10B981' : data.value >= 85 ? '#06B6D4' : '#F59E0B'
                        }
                      ]} />
                      <Text style={[styles.growthTrendLabel, { color: 'rgba(255,255,255,0.6)' }]}>{data.month}</Text>
                    </View>
                  ))}
                </View>
              </View>
            </View>

            {/* Portfolio Composition */}
            <View style={styles.revenueAttribution}>
              <View style={styles.revenueAttributionHeader}>
                <PieChartIcon size={16} color="#EC4899" />
                <Text style={[styles.revenueAttributionTitle, { color: '#FFFFFF' }]}>Portfolio Composition by Asset Type</Text>
              </View>
              <View style={styles.revenueAttributionList}>
                {[
                  { feature: 'Commercial', value: '$3.2B', percentage: 38, color: '#06B6D4' },
                  { feature: 'Residential', value: '$2.5B', percentage: 30, color: '#10B981' },
                  { feature: 'Industrial', value: '$1.5B', percentage: 18, color: '#8B5CF6' },
                  { feature: 'Retail', value: '$0.8B', percentage: 9, color: '#F59E0B' },
                  { feature: 'Mixed-Use', value: '$0.4B', percentage: 5, color: '#EC4899' },
                ].map((item, index) => (
                  <View key={index} style={styles.revenueAttributionItem}>
                    <View style={styles.revenueAttributionInfo}>
                      <View style={[styles.revenueAttributionDot, { backgroundColor: item.color }]} />
                      <Text style={[styles.revenueAttributionFeature, { color: 'rgba(255,255,255,0.8)' }]}>{item.feature}</Text>
                    </View>
                    <View style={styles.revenueAttributionMetrics}>
                      <Text style={[styles.revenueAttributionRevenue, { color: '#FFFFFF' }]}>{item.value}</Text>
                      <View style={[
                        styles.revenueAttributionBar,
                        { width: `${item.percentage}%`, backgroundColor: item.color }
                      ]} />
                    </View>
                  </View>
                ))}
              </View>
            </View>
          </View>
        </View>

        {/* Property Portfolio Management */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Property Portfolio Management</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.propertiesScroll}>
            {properties.map(renderPropertyCard)}
          </ScrollView>
        </View>

        {/* Leasing & Occupancy Center */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Leasing & Occupancy Center</Text>
          <View style={[styles.leasingCenter, { backgroundColor: theme.colors.card }]}>
            <View style={styles.leasingMetrics}>
              <View style={styles.leasingMetric}>
                <Text style={[styles.leasingMetricValue, { color: '#06B6D4' }]}>18,240</Text>
                <Text style={[styles.leasingMetricLabel, { color: theme.colors.textSecondary }]}>Active Leases</Text>
              </View>
              <View style={styles.leasingMetric}>
                <Text style={[styles.leasingMetricValue, { color: '#10B981' }]}>94.8%</Text>
                <Text style={[styles.leasingMetricLabel, { color: theme.colors.textSecondary }]}>Occupancy Rate</Text>
              </View>
              <View style={styles.leasingMetric}>
                <Text style={[styles.leasingMetricValue, { color: '#F59E0B' }]}>842</Text>
                <Text style={[styles.leasingMetricLabel, { color: theme.colors.textSecondary }]}>Vacant Units</Text>
              </View>
              <View style={styles.leasingMetric}>
                <Text style={[styles.leasingMetricValue, { color: '#8B5CF6' }]}>92%</Text>
                <Text style={[styles.leasingMetricLabel, { color: theme.colors.textSecondary }]}>Renewal Rate</Text>
              </View>
            </View>
            
            {/* Leasing Funnel */}
            <View style={styles.leasingFunnel}>
              <Text style={[styles.leasingFunnelTitle, { color: '#FFFFFF' }]}>Leasing Funnel</Text>
              {[
                { stage: 'Lead', count: 2450, conversion: 100 },
                { stage: 'Inquiry', count: 1820, conversion: 74 },
                { stage: 'Tour', count: 1240, conversion: 51 },
                { stage: 'Application', count: 890, conversion: 36 },
                { stage: 'Lease Signed', count: 642, conversion: 26 },
                { stage: 'Move-In', count: 598, conversion: 24 },
              ].map((stage, index) => (
                <View key={index} style={styles.leasingFunnelStage}>
                  <View style={styles.leasingFunnelStageInfo}>
                    <Text style={[styles.leasingFunnelStageName, { color: theme.colors.text }]}>{stage.stage}</Text>
                    <Text style={[styles.leasingFunnelStageCount, { color: '#06B6D4' }]}>{stage.count}</Text>
                  </View>
                  <View style={[
                    styles.leasingFunnelStageBar,
                    { width: `${stage.conversion}%`, backgroundColor: `rgba(6, 182, 212, ${0.3 + (index * 0.1)})` }
                  ]} />
                  <Text style={[styles.leasingFunnelStageConversion, { color: theme.colors.textSecondary }]}>{stage.conversion}%</Text>
                </View>
              ))}
            </View>
          </View>
        </View>

        {/* Tenant Experience Hub */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Tenant Experience Hub</Text>
          <View style={[styles.tenantHub, { backgroundColor: theme.colors.card }]}>
            <View style={styles.tenantMetrics}>
              <View style={styles.tenantMetric}>
                <UserCheck size={24} color="#06B6D4" />
                <Text style={[styles.tenantMetricValue, { color: '#06B6D4' }]}>4.7</Text>
                <Text style={[styles.tenantMetricLabel, { color: theme.colors.textSecondary }]}>Satisfaction Score</Text>
              </View>
              <View style={styles.tenantMetric}>
                <MessageSquare size={24} color="#10B981" />
                <Text style={[styles.tenantMetricValue, { color: '#10B981' }]}>1,248</Text>
                <Text style={[styles.tenantMetricLabel, { color: theme.colors.textSecondary }]}>Service Requests</Text>
              </View>
              <View style={styles.tenantMetric}>
                <Heart size={24} color="#F59E0B" />
                <Text style={[styles.tenantMetricValue, { color: '#F59E0B' }]}>89%</Text>
                <Text style={[styles.tenantMetricLabel, { color: theme.colors.textSecondary }]}>Renewal Intent</Text>
              </View>
              <View style={styles.tenantMetric}>
                <Clock size={24} color="#8B5CF6" />
                <Text style={[styles.tenantMetricValue, { color: '#8B5CF6' }]}>2.4h</Text>
                <Text style={[styles.tenantMetricLabel, { color: theme.colors.textSecondary }]}>Avg Response Time</Text>
              </View>
            </View>
          </View>
        </View>

        {/* Maintenance Operations Command Center */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Maintenance Operations Command Center</Text>
          <View style={[styles.maintenanceCenter, { backgroundColor: theme.colors.card }]}>
            <View style={styles.maintenanceMetrics}>
              <View style={styles.maintenanceMetric}>
                <Wrench size={24} color="#06B6D4" />
                <Text style={[styles.maintenanceMetricValue, { color: '#06B6D4' }]}>847</Text>
                <Text style={[styles.maintenanceMetricLabel, { color: theme.colors.textSecondary }]}>Open Work Orders</Text>
              </View>
              <View style={styles.maintenanceMetric}>
                <Shield size={24} color="#10B981" />
                <Text style={[styles.maintenanceMetricValue, { color: '#10B981' }]}>2,481</Text>
                <Text style={[styles.maintenanceMetricLabel, { color: theme.colors.textSecondary }]}>Preventive Maintenance</Text>
              </View>
              <View style={styles.maintenanceMetric}>
                <AlertCircle size={24} color="#EF4444" />
                <Text style={[styles.maintenanceMetricValue, { color: '#EF4444' }]}>42</Text>
                <Text style={[styles.maintenanceMetricLabel, { color: theme.colors.textSecondary }]}>Emergency Repairs</Text>
              </View>
              <View style={styles.maintenanceMetric}>
                <Activity size={24} color="#F59E0B" />
                <Text style={[styles.maintenanceMetricValue, { color: '#F59E0B' }]}>94%</Text>
                <Text style={[styles.maintenanceMetricLabel, { color: theme.colors.textSecondary }]}>Asset Health</Text>
              </View>
            </View>

            {/* Recent Maintenance Requests */}
            <View style={styles.maintenanceRequests}>
              <Text style={[styles.maintenanceRequestsTitle, { color: '#FFFFFF' }]}>Recent Maintenance Requests</Text>
              {maintenanceRequests.slice(0, 3).map((request) => (
                <View key={request.id} style={[styles.maintenanceRequestItem, { backgroundColor: 'rgba(255,255,255,0.03)' }]}>
                  <View style={styles.maintenanceRequestInfo}>
                    <Text style={[styles.maintenanceRequestProperty, { color: theme.colors.text }]}>{request.property}</Text>
                    <Text style={[styles.maintenanceRequestType, { color: theme.colors.textSecondary }]}>{request.type}</Text>
                  </View>
                  <View style={[
                    styles.maintenanceRequestPriority,
                    { backgroundColor: request.priority === 'high' ? 'rgba(239, 68, 68, 0.2)' : request.priority === 'medium' ? 'rgba(245, 158, 11, 0.2)' : 'rgba(16, 185, 129, 0.2)' }
                  ]}>
                    <Text style={[
                      styles.maintenanceRequestPriorityText,
                      { color: request.priority === 'high' ? '#EF4444' : request.priority === 'medium' ? '#F59E0B' : '#10B981' }
                    ]}>{request.priority}</Text>
                  </View>
                  <View style={[
                    styles.maintenanceRequestStatus,
                    { backgroundColor: request.status === 'completed' ? 'rgba(16, 185, 129, 0.2)' : request.status === 'in-progress' ? 'rgba(6, 182, 212, 0.2)' : 'rgba(255,255,255,0.1)' }
                  ]}>
                    <Text style={[
                      styles.maintenanceRequestStatusText,
                      { color: request.status === 'completed' ? '#10B981' : request.status === 'in-progress' ? '#06B6D4' : 'rgba(255,255,255,0.6)' }
                    ]}>{request.status}</Text>
                  </View>
                </View>
              ))}
            </View>
          </View>
        </View>

        {/* Acquisition & Investment Analytics */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Acquisition & Investment Analytics</Text>
          <View style={[styles.acquisitionCenter, { backgroundColor: theme.colors.card }]}>
            <View style={styles.acquisitionMetrics}>
              <View style={styles.acquisitionMetric}>
                <SearchIcon size={24} color="#06B6D4" />
                <Text style={[styles.acquisitionMetricValue, { color: '#06B6D4' }]}>24</Text>
                <Text style={[styles.acquisitionMetricLabel, { color: theme.colors.textSecondary }]}>Potential Acquisitions</Text>
              </View>
              <View style={styles.acquisitionMetric}>
                <Calculator size={24} color="#10B981" />
                <Text style={[styles.acquisitionMetricValue, { color: '#10B981' }]}>18</Text>
                <Text style={[styles.acquisitionMetricLabel, { color: theme.colors.textSecondary }]}>Underwriting Pipeline</Text>
              </View>
              <View style={styles.acquisitionMetric}>
                <TrendingUpIcon size={24} color="#F59E0B" />
                <Text style={[styles.acquisitionMetricValue, { color: '#F59E0B' }]}>15.8%</Text>
                <Text style={[styles.acquisitionMetricLabel, { color: theme.colors.textSecondary }]}>Avg IRR Projection</Text>
              </View>
              <View style={styles.acquisitionMetric}>
                <DollarSign size={24} color="#8B5CF6" />
                <Text style={[styles.acquisitionMetricValue, { color: '#8B5CF6' }]}>8.2%</Text>
                <Text style={[styles.acquisitionMetricLabel, { color: theme.colors.textSecondary }]}>Cash-on-Cash Return</Text>
              </View>
            </View>

            {/* Acquisition Opportunities */}
            <View style={styles.acquisitionOpportunities}>
              <Text style={[styles.acquisitionOpportunitiesTitle, { color: '#FFFFFF' }]}>Top Acquisition Opportunities</Text>
              {acquisitionOpportunities.map((opportunity) => (
                <View key={opportunity.id} style={[styles.acquisitionOpportunityItem, { backgroundColor: 'rgba(255,255,255,0.03)' }]}>
                  <View style={styles.acquisitionOpportunityInfo}>
                    <Text style={[styles.acquisitionOpportunityProperty, { color: theme.colors.text }]}>{opportunity.property}</Text>
                    <Text style={[styles.acquisitionOpportunityLocation, { color: theme.colors.textSecondary }]}>{opportunity.location}</Text>
                  </View>
                  <View style={styles.acquisitionOpportunityMetrics}>
                    <View style={styles.acquisitionOpportunityMetric}>
                      <Text style={[styles.acquisitionOpportunityMetricLabel, { color: theme.colors.textSecondary }]}>Asking</Text>
                      <Text style={[styles.acquisitionOpportunityMetricValue, { color: '#FFFFFF' }]}>{opportunity.askingPrice}</Text>
                    </View>
                    <View style={styles.acquisitionOpportunityMetric}>
                      <Text style={[styles.acquisitionOpportunityMetricLabel, { color: theme.colors.textSecondary }]}>Est. Value</Text>
                      <Text style={[styles.acquisitionOpportunityMetricValue, { color: '#10B981' }]}>{opportunity.estimatedValue}</Text>
                    </View>
                    <View style={styles.acquisitionOpportunityMetric}>
                      <Text style={[styles.acquisitionOpportunityMetricLabel, { color: theme.colors.textSecondary }]}>Cap Rate</Text>
                      <Text style={[styles.acquisitionOpportunityMetricValue, { color: '#06B6D4' }]}>{opportunity.capRate}</Text>
                    </View>
                    <View style={styles.acquisitionOpportunityMetric}>
                      <Text style={[styles.acquisitionOpportunityMetricLabel, { color: theme.colors.textSecondary }]}>IRR</Text>
                      <Text style={[styles.acquisitionOpportunityMetricValue, { color: '#F59E0B' }]}>{opportunity.irr}</Text>
                    </View>
                  </View>
                  <View style={[
                    styles.acquisitionOpportunityStatus,
                    { backgroundColor: getStatusColor(opportunity.status) + '20' }
                  ]}>
                    <Text style={[styles.acquisitionOpportunityStatusText, { color: getStatusColor(opportunity.status) }]}>
                      {opportunity.status}
                    </Text>
                  </View>
                </View>
              ))}
            </View>
          </View>
        </View>

        {/* Market Intelligence Center */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Market Intelligence Center</Text>
          <View style={[styles.marketCenter, { backgroundColor: theme.colors.card }]}>
            <View style={styles.marketMetrics}>
              <View style={styles.marketMetric}>
                <Globe size={24} color="#06B6D4" />
                <Text style={[styles.marketMetricValue, { color: '#06B6D4' }]}>+8.2%</Text>
                <Text style={[styles.marketMetricLabel, { color: theme.colors.textSecondary }]}>Market Growth</Text>
              </View>
              <View style={styles.marketMetric}>
                <TrendingUpIcon size={24} color="#10B981" />
                <Text style={[styles.marketMetricValue, { color: '#10B981' }]}>+6.4%</Text>
                <Text style={[styles.marketMetricLabel, { color: theme.colors.textSecondary }]}>Rent Growth</Text>
              </View>
              <View style={styles.marketMetric}>
                <Landmark size={24} color="#F59E0B" />
                <Text style={[styles.marketMetricValue, { color: '#F59E0B' }]}>6.8%</Text>
                <Text style={[styles.marketMetricLabel, { color: theme.colors.textSecondary }]}>Avg Cap Rate</Text>
              </View>
              <View style={styles.marketMetric}>
                <Building2 size={24} color="#8B5CF6" />
                <Text style={[styles.marketMetricValue, { color: '#8B5CF6' }]}>12</Text>
                <Text style={[styles.marketMetricLabel, { color: theme.colors.textSecondary }]}>Active Markets</Text>
              </View>
            </View>

            {/* Market Insights */}
            <View style={styles.marketInsights}>
              <Text style={[styles.marketInsightsTitle, { color: '#FFFFFF' }]}>AI Market Insights</Text>
              {marketInsights.map((insight) => (
                <View key={insight.id} style={[styles.marketInsightItem, { backgroundColor: 'rgba(255,255,255,0.03)', borderColor: insight.impact === 'high' ? '#06B6D4' + '30' : insight.impact === 'medium' ? '#F59E0B' + '30' : '#6B7280' + '30' }]}>
                  <View style={styles.marketInsightHeader}>
                    <View style={styles.marketInsightCategory}>
                      <Text style={[styles.marketInsightCategoryText, { color: '#06B6D4' }]}>{insight.category}</Text>
                    </View>
                    <View style={styles.marketInsightMeta}>
                      <Text style={[styles.marketInsightConfidence, { color: theme.colors.textSecondary }]}>{insight.confidence}% confidence</Text>
                      <Text style={[styles.marketInsightTimestamp, { color: theme.colors.textSecondary }]}>{insight.timestamp}</Text>
                    </View>
                  </View>
                  <Text style={[styles.marketInsightText, { color: theme.colors.text }]}>{insight.insight}</Text>
                  <View style={[
                    styles.marketInsightImpact,
                    { backgroundColor: insight.impact === 'high' ? 'rgba(6, 182, 212, 0.2)' : insight.impact === 'medium' ? 'rgba(245, 158, 11, 0.2)' : 'rgba(107, 114, 128, 0.2)' }
                  ]}>
                    <Text style={[
                      styles.marketInsightImpactText,
                      { color: insight.impact === 'high' ? '#06B6D4' : insight.impact === 'medium' ? '#F59E0B' : '#6B7280' }
                    ]}>{insight.impact} impact</Text>
                  </View>
                </View>
              ))}
            </View>
          </View>
        </View>

        {/* Financial Performance Analytics */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Financial Performance Analytics</Text>
          <View style={[styles.financialCenter, { backgroundColor: theme.colors.card }]}>
            <View style={styles.financialMetrics}>
              <View style={styles.financialMetric}>
                <DollarSign size={24} color="#06B6D4" />
                <Text style={[styles.financialMetricValue, { color: '#06B6D4' }]}>$82M</Text>
                <Text style={[styles.financialMetricLabel, { color: theme.colors.textSecondary }]}>Rental Revenue</Text>
              </View>
              <View style={styles.financialMetric}>
                <Calculator size={24} color="#10B981" />
                <Text style={[styles.financialMetricValue, { color: '#10B981' }]}>$34.2M</Text>
                <Text style={[styles.financialMetricLabel, { color: theme.colors.textSecondary }]}>Net Operating Income</Text>
              </View>
              <View style={styles.financialMetric}>
                <TrendingDown size={24} color="#EF4444" />
                <Text style={[styles.financialMetricValue, { color: '#EF4444' }]}>$47.8M</Text>
                <Text style={[styles.financialMetricLabel, { color: theme.colors.textSecondary }]}>Operating Expenses</Text>
              </View>
              <View style={styles.financialMetric}>
                <Activity size={24} color="#F59E0B" />
                <Text style={[styles.financialMetricValue, { color: '#F59E0B' }]}>$18.4M</Text>
                <Text style={[styles.financialMetricLabel, { color: theme.colors.textSecondary }]}>Cash Flow</Text>
              </View>
            </View>

            {/* Financial Breakdown */}
            <View style={styles.financialBreakdown}>
              <Text style={[styles.financialBreakdownTitle, { color: '#FFFFFF' }]}>Revenue Waterfall</Text>
              {[
                { item: 'Gross Potential Revenue', value: '$95.2M', color: '#06B6D4' },
                { item: 'Vacancy Loss', value: '-$4.8M', color: '#EF4444' },
                { item: 'Concessions', value: '-$2.4M', color: '#F59E0B' },
                { item: 'Other Income', value: '+$6.0M', color: '#10B981' },
                { item: 'Net Operating Income', value: '$34.2M', color: '#8B5CF6' },
              ].map((item, index) => (
                <View key={index} style={styles.financialBreakdownItem}>
                  <Text style={[styles.financialBreakdownItemName, { color: theme.colors.text }]}>{item.item}</Text>
                  <Text style={[styles.financialBreakdownItemValue, { color: item.color }]}>{item.value}</Text>
                  <View style={[
                    styles.financialBreakdownItemBar,
                    { backgroundColor: item.color, width: `${Math.abs(parseFloat(item.value.replace(/[$,M]/g, ''))) / 1.5}%` }
                  ]} />
                </View>
              ))}
            </View>
          </View>
        </View>

        {/* Property Valuation Engine */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Property Valuation Engine</Text>
          <View style={[styles.valuationCenter, { backgroundColor: theme.colors.card }]}>
            <View style={styles.valuationMetrics}>
              <View style={styles.valuationMetric}>
                <Landmark size={24} color="#06B6D4" />
                <Text style={[styles.valuationMetricValue, { color: '#06B6D4' }]}>$8.4B</Text>
                <Text style={[styles.valuationMetricLabel, { color: theme.colors.textSecondary }]}>Total Asset Valuations</Text>
              </View>
              <View style={styles.valuationMetric}>
                <TrendingUpIcon size={24} color="#10B981" />
                <Text style={[styles.valuationMetricValue, { color: '#10B981' }]}>+12.4%</Text>
                <Text style={[styles.valuationMetricLabel, { color: theme.colors.textSecondary }]}>Appreciation Forecast</Text>
              </View>
              <View style={styles.valuationMetric}>
                <Calculator size={24} color="#F59E0B" />
                <Text style={[styles.valuationMetricValue, { color: '#F59E0B' }]}>6.8%</Text>
                <Text style={[styles.valuationMetricLabel, { color: theme.colors.textSecondary }]}>Avg Cap Rate</Text>
              </View>
              <View style={styles.valuationMetric}>
                <BarChart size={24} color="#8B5CF6" />
                <Text style={[styles.valuationMetricValue, { color: '#8B5CF6' }]}>156</Text>
                <Text style={[styles.valuationMetricLabel, { color: theme.colors.textSecondary }]}>Market Comparables</Text>
              </View>
            </View>

            {/* Valuation Forecast */}
            <View style={styles.valuationForecast}>
              <Text style={[styles.valuationForecastTitle, { color: '#FFFFFF' }]}>Valuation Forecast Model</Text>
              <View style={styles.valuationForecastChart}>
                {[
                  { year: '2024', value: 78 },
                  { year: '2025', value: 85 },
                  { year: '2026', value: 92 },
                  { year: '2027', value: 98 },
                  { year: '2028', value: 105 },
                ].map((data, index) => (
                  <View key={index} style={styles.valuationForecastBar}>
                    <View style={[
                      styles.valuationForecastBarFill,
                      { 
                        height: `${data.value}%`,
                        backgroundColor: data.value >= 100 ? '#10B981' : data.value >= 90 ? '#06B6D4' : '#F59E0B'
                      }
                    ]} />
                    <Text style={[styles.valuationForecastLabel, { color: 'rgba(255,255,255,0.6)' }]}>{data.year}</Text>
                    <Text style={[styles.valuationForecastValue, { color: '#FFFFFF' }]}>${data.value}0M</Text>
                  </View>
                ))}
              </View>
            </View>
          </View>
        </View>

        {/* AI Real Estate Insights */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>AI Real Estate Insights</Text>
          <View style={[styles.insightsCenter, { backgroundColor: theme.colors.card }]}>
            {[
              { insight: 'Property occupancy forecast to reach 97% within 60 days based on current leasing velocity.', icon: '📈', impact: 'high' },
              { insight: 'Lease renewal campaign recommended for 842 expiring contracts in Q3 to optimize retention.', icon: '🔑', impact: 'high' },
              { insight: 'Industrial asset segment outperforming portfolio average with 15% YoY appreciation.', icon: '🏭', impact: 'medium' },
              { insight: 'Preventive maintenance program could reduce repair costs by 22% over next 12 months.', icon: '🔧', impact: 'high' },
              { insight: 'Acquisition target in Pacific Heights shows above-market appreciation potential of 18%.', icon: '🎯', impact: 'high' },
              { insight: 'Multi-family assets in Sun Belt markets showing strongest rental growth at 9.2%.', icon: '🏠', impact: 'medium' },
            ].map((item, index) => (
              <View key={index} style={[styles.insightCard, { backgroundColor: 'rgba(255,255,255,0.03)', borderColor: item.impact === 'high' ? '#06B6D4' + '30' : '#F59E0B' + '30' }]}>
                <Text style={styles.insightIcon}>{item.icon}</Text>
                <Text style={[styles.insightText, { color: theme.colors.text }]}>{item.insight}</Text>
                <View style={[
                  styles.insightImpact,
                  { backgroundColor: item.impact === 'high' ? 'rgba(6, 182, 212, 0.2)' : 'rgba(245, 158, 11, 0.2)' }
                ]}>
                  <Text style={[
                    styles.insightImpactText,
                    { color: item.impact === 'high' ? '#06B6D4' : '#F59E0B' }
                  ]}>{item.impact} impact</Text>
                </View>
              </View>
            ))}
          </View>
        </View>

        {/* Real-Time Property Operations Feed */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Real-Time Property Operations Feed</Text>
          <View style={[styles.operationsFeed, { backgroundColor: theme.colors.card }]}>
            {propertyActivities.map((activity) => (
              <View key={activity.id} style={styles.activityItem}>
                <View style={[
                  styles.activityDot,
                  { backgroundColor: getActivityColor(activity.type) }
                ]} />
                <View style={styles.activityContent}>
                  <Text style={[styles.activityEvent, { color: theme.colors.text }]}>{activity.event}</Text>
                  {activity.property && (
                    <Text style={[styles.activityProperty, { color: theme.colors.textSecondary }]}>{activity.property}</Text>
                  )}
                  <Text style={[styles.activityTimestamp, { color: theme.colors.textSecondary }]}>{activity.timestamp}</Text>
                </View>
              </View>
            ))}
          </View>
        </View>

        {/* Property System Health */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Property System Health</Text>
          <View style={[styles.systemHealthCenter, { backgroundColor: theme.colors.card }]}>
            {systemHealth.map((system) => (
              <View key={system.id} style={[styles.systemHealthItem, { backgroundColor: 'rgba(255,255,255,0.03)' }]}>
                <View style={styles.systemHealthInfo}>
                  <Text style={[styles.systemHealthName, { color: theme.colors.text }]}>{system.system}</Text>
                  <View style={styles.systemHealthMeta}>
                    <Text style={[styles.systemHealthUptime, { color: '#10B981' }]}>{system.uptime} uptime</Text>
                    <Text style={[styles.systemHealthLatency, { color: theme.colors.textSecondary }]}>{system.latency}</Text>
                  </View>
                </View>
                <View style={[
                  styles.systemHealthStatus,
                  { backgroundColor: system.status === 'healthy' ? 'rgba(16, 185, 129, 0.2)' : system.status === 'degraded' ? 'rgba(245, 158, 11, 0.2)' : 'rgba(239, 68, 68, 0.2)' }
                ]}>
                  <View style={[
                    styles.systemHealthStatusDot,
                    { backgroundColor: system.status === 'healthy' ? '#10B981' : system.status === 'degraded' ? '#F59E0B' : '#EF4444' }
                  ]} />
                  <Text style={[
                    styles.systemHealthStatusText,
                    { color: system.status === 'healthy' ? '#10B981' : system.status === 'degraded' ? '#F59E0B' : '#EF4444' }
                  ]}>{system.status}</Text>
                </View>
              </View>
            ))}
          </View>
        </View>

        </ScrollView>
      </View>
    </View>
  );
};

// Helper Functions
const getStatusColor = (status: string): string => {
  switch (status) {
    case 'analyzing': return '#06B6D4';
    case 'underwriting': return '#F59E0B';
    case 'pending': return '#8B5CF6';
    case 'approved': return '#10B981';
    default: return '#6B7280';
  }
};

const getActivityColor = (type: string): string => {
  switch (type) {
    case 'lease': return '#06B6D4';
    case 'tenant': return '#10B981';
    case 'maintenance': return '#F59E0B';
    case 'acquisition': return '#8B5CF6';
    case 'payment': return '#EC4899';
    case 'inspection': return '#06B6D4';
    case 'forecast': return '#10B981';
    default: return '#6B7280';
  }
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    paddingHorizontal: 24,
    paddingVertical: 16,
    borderBottomWidth: 1,
  },
  headerContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  headerTitle: {
    gap: 4,
  },
  headerTitleText: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  headerSubtitle: {
    fontSize: 12,
  },
  headerActions: {
    flexDirection: 'row',
    gap: 8,
  },
  headerButton: {
    padding: 10,
    borderRadius: 8,
  },
  mainContent: {
    flex: 1,
    flexDirection: 'row',
  },
  sidebar: {
    width: 240,
    borderRightWidth: 1,
    paddingVertical: 16,
  },
  sidebarToggle: {
    padding: 12,
    alignItems: 'center',
  },
  sidebarContent: {
    gap: 4,
  },
  sidebarItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    padding: 12,
    marginHorizontal: 8,
    borderRadius: 8,
  },
  sidebarItemText: {
    fontSize: 14,
  },
  content: {
    flex: 1,
    padding: 20,
  },
  topExecutiveBar: {
    borderRadius: 12,
    padding: 20,
    borderWidth: 1,
    marginBottom: 24,
  },
  topBarHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  topBarTitle: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  topBarTitleText: {
    fontSize: 16,
    fontWeight: '600',
  },
  topBarPeriod: {
    fontSize: 12,
  },
  topBarScroll: {
    marginBottom: 8,
  },
  topBarKPIs: {
    flexDirection: 'row',
    gap: 12,
  },
  topBarKPI: {
    borderRadius: 8,
    padding: 16,
    minWidth: 180,
    borderWidth: 1,
  },
  topBarKPITitle: {
    fontSize: 12,
    marginBottom: 8,
  },
  topBarKPIValue: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  topBarKPIMetrics: {
    gap: 4,
  },
  topBarKPITrend: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    padding: 4,
    borderRadius: 4,
    alignSelf: 'flex-start',
  },
  topBarKPITrendText: {
    fontSize: 12,
    fontWeight: '600',
  },
  topBarKPISubtitle: {
    fontSize: 11,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 16,
  },
  kpiGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  kpiCard: {
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    width: 'calc(20% - 10px)',
    minWidth: 180,
  },
  kpiHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  kpiTitle: {
    fontSize: 13,
    fontWeight: '500',
  },
  kpiTrendBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    padding: 4,
    borderRadius: 4,
  },
  kpiTrendText: {
    fontSize: 11,
    fontWeight: '600',
  },
  kpiValue: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  kpiSubtitle: {
    fontSize: 12,
  },
  agentsScroll: {
    marginBottom: 8,
  },
  agentCard: {
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    minWidth: 280,
    marginRight: 12,
  },
  agentAvatar: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 12,
  },
  agentAvatarText: {
    fontSize: 24,
  },
  agentStatusDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  agentInfo: {
    marginBottom: 12,
  },
  agentName: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  agentSpecialty: {
    fontSize: 12,
  },
  agentMetrics: {
    flexDirection: 'row',
    gap: 16,
    marginBottom: 12,
  },
  agentMetric: {
    gap: 4,
  },
  agentMetricValue: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  agentMetricLabel: {
    fontSize: 11,
  },
  agentInsights: {
    gap: 4,
  },
  agentInsightsCount: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  agentInsightsLabel: {
    fontSize: 11,
  },
  commandCenter: {
    borderRadius: 12,
    padding: 20,
    borderWidth: 1,
  },
  commandCenterHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  commandCenterTitle: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  commandCenterTitleText: {
    fontSize: 18,
    fontWeight: '600',
  },
  commandCenterSubtitle: {
    fontSize: 12,
  },
  commandCenterActions: {
    flexDirection: 'row',
    gap: 8,
  },
  commandCenterButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    padding: 8,
    borderRadius: 6,
  },
  commandCenterButtonText: {
    fontSize: 12,
    fontWeight: '500',
  },
  commandCenterMetrics: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
    marginBottom: 20,
  },
  commandMetricCard: {
    borderRadius: 8,
    padding: 16,
    borderWidth: 1,
    width: 'calc(20% - 10px)',
    minWidth: 180,
  },
  commandMetricHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 12,
  },
  commandMetricLabel: {
    fontSize: 12,
  },
  commandMetricValue: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  commandMetricTrend: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  commandMetricTrendText: {
    fontSize: 14,
    fontWeight: '600',
  },
  commandMetricPeriod: {
    fontSize: 11,
  },
  commandCenterHealth: {
    flexDirection: 'row',
    gap: 20,
    marginBottom: 20,
  },
  healthOverview: {
    flex: 1,
  },
  healthOverviewTitle: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 12,
  },
  healthScoreContainer: {
    marginBottom: 8,
  },
  healthScore: {
    fontSize: 36,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  healthScoreIndicator: {
    height: 8,
    backgroundColor: 'rgba(255,255,255,0.1)',
    borderRadius: 4,
    overflow: 'hidden',
  },
  healthScoreBar: {
    height: '100%',
    borderRadius: 4,
  },
  healthScoreDescription: {
    fontSize: 12,
  },
  healthBreakdown: {
    flex: 1,
  },
  healthBreakdownTitle: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 12,
  },
  healthBreakdownItems: {
    gap: 12,
  },
  healthBreakdownItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  healthBreakdownDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  healthBreakdownLabel: {
    flex: 1,
    fontSize: 12,
  },
  healthBreakdownValue: {
    fontSize: 14,
    fontWeight: '600',
  },
  growthTrendSection: {
    marginBottom: 20,
  },
  growthTrendHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 16,
  },
  growthTrendTitle: {
    fontSize: 14,
    fontWeight: '600',
  },
  growthTrendVisualization: {
    paddingHorizontal: 8,
  },
  growthTrendBars: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    height: 120,
    gap: 16,
  },
  growthTrendBar: {
    flex: 1,
    alignItems: 'center',
    gap: 8,
  },
  growthTrendBarFill: {
    width: '100%',
    borderRadius: 4,
  },
  growthTrendLabel: {
    fontSize: 11,
  },
  revenueAttribution: {
    marginBottom: 20,
  },
  revenueAttributionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 16,
  },
  revenueAttributionTitle: {
    fontSize: 14,
    fontWeight: '600',
  },
  revenueAttributionList: {
    gap: 12,
  },
  revenueAttributionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  revenueAttributionInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    width: 180,
  },
  revenueAttributionDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  revenueAttributionFeature: {
    fontSize: 12,
  },
  revenueAttributionMetrics: {
    flex: 1,
    gap: 4,
  },
  revenueAttributionRevenue: {
    fontSize: 14,
    fontWeight: '600',
  },
  revenueAttributionBar: {
    height: 6,
    borderRadius: 3,
  },
  propertiesScroll: {
    marginBottom: 8,
  },
  propertyCard: {
    borderRadius: 12,
    padding: 16,
    minWidth: 280,
    marginRight: 12,
  },
  propertyHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 12,
  },
  propertyInfo: {
    flex: 1,
  },
  propertyName: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 4,
  },
  propertyLocation: {
    fontSize: 12,
  },
  propertyMetrics: {
    flexDirection: 'row',
    gap: 16,
    marginBottom: 12,
  },
  propertyMetric: {
    gap: 4,
  },
  propertyMetricValue: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  propertyMetricLabel: {
    fontSize: 11,
  },
  propertyTypeBadge: {
    alignSelf: 'flex-start',
    padding: 6,
    borderRadius: 4,
  },
  propertyTypeText: {
    fontSize: 11,
    fontWeight: '500',
  },
  leasingCenter: {
    borderRadius: 12,
    padding: 20,
  },
  leasingMetrics: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 20,
  },
  leasingMetric: {
    alignItems: 'center',
    gap: 4,
  },
  leasingMetricValue: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  leasingMetricLabel: {
    fontSize: 12,
  },
  leasingFunnel: {
    gap: 12,
  },
  leasingFunnelTitle: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 12,
  },
  leasingFunnelStage: {
    gap: 8,
  },
  leasingFunnelStageInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  leasingFunnelStageName: {
    fontSize: 12,
  },
  leasingFunnelStageCount: {
    fontSize: 14,
    fontWeight: '600',
  },
  leasingFunnelStageBar: {
    height: 24,
    borderRadius: 4,
  },
  leasingFunnelStageConversion: {
    fontSize: 11,
    textAlign: 'right',
  },
  tenantHub: {
    borderRadius: 12,
    padding: 20,
  },
  tenantMetrics: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  tenantMetric: {
    alignItems: 'center',
    gap: 8,
  },
  tenantMetricValue: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  tenantMetricLabel: {
    fontSize: 12,
  },
  maintenanceCenter: {
    borderRadius: 12,
    padding: 20,
  },
  maintenanceMetrics: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 20,
  },
  maintenanceMetric: {
    alignItems: 'center',
    gap: 8,
  },
  maintenanceMetricValue: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  maintenanceMetricLabel: {
    fontSize: 12,
  },
  maintenanceRequests: {
    gap: 12,
  },
  maintenanceRequestsTitle: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 12,
  },
  maintenanceRequestItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 12,
    borderRadius: 8,
  },
  maintenanceRequestInfo: {
    flex: 1,
    gap: 4,
  },
  maintenanceRequestProperty: {
    fontSize: 13,
    fontWeight: '500',
  },
  maintenanceRequestType: {
    fontSize: 11,
  },
  maintenanceRequestPriority: {
    padding: 4,
    borderRadius: 4,
  },
  maintenanceRequestPriorityText: {
    fontSize: 11,
    fontWeight: '600',
    textTransform: 'capitalize',
  },
  maintenanceRequestStatus: {
    padding: 4,
    borderRadius: 4,
  },
  maintenanceRequestStatusText: {
    fontSize: 11,
    fontWeight: '600',
    textTransform: 'capitalize',
  },
  acquisitionCenter: {
    borderRadius: 12,
    padding: 20,
  },
  acquisitionMetrics: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 20,
  },
  acquisitionMetric: {
    alignItems: 'center',
    gap: 8,
  },
  acquisitionMetricValue: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  acquisitionMetricLabel: {
    fontSize: 12,
  },
  acquisitionOpportunities: {
    gap: 12,
  },
  acquisitionOpportunitiesTitle: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 12,
  },
  acquisitionOpportunityItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 12,
    borderRadius: 8,
  },
  acquisitionOpportunityInfo: {
    flex: 1,
    gap: 4,
  },
  acquisitionOpportunityProperty: {
    fontSize: 13,
    fontWeight: '500',
  },
  acquisitionOpportunityLocation: {
    fontSize: 11,
  },
  acquisitionOpportunityMetrics: {
    flexDirection: 'row',
    gap: 16,
  },
  acquisitionOpportunityMetric: {
    gap: 4,
  },
  acquisitionOpportunityMetricLabel: {
    fontSize: 10,
  },
  acquisitionOpportunityMetricValue: {
    fontSize: 12,
    fontWeight: '600',
  },
  acquisitionOpportunityStatus: {
    padding: 6,
    borderRadius: 4,
  },
  acquisitionOpportunityStatusText: {
    fontSize: 11,
    fontWeight: '600',
    textTransform: 'capitalize',
  },
  marketCenter: {
    borderRadius: 12,
    padding: 20,
  },
  marketMetrics: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 20,
  },
  marketMetric: {
    alignItems: 'center',
    gap: 8,
  },
  marketMetricValue: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  marketMetricLabel: {
    fontSize: 12,
  },
  marketInsights: {
    gap: 12,
  },
  marketInsightsTitle: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 12,
  },
  marketInsightItem: {
    padding: 16,
    borderRadius: 8,
    borderWidth: 1,
  },
  marketInsightHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  marketInsightCategory: {
    padding: 4,
    borderRadius: 4,
    backgroundColor: 'rgba(6, 182, 212, 0.15)',
  },
  marketInsightCategoryText: {
    fontSize: 11,
    fontWeight: '600',
  },
  marketInsightMeta: {
    gap: 8,
  },
  marketInsightConfidence: {
    fontSize: 11,
  },
  marketInsightTimestamp: {
    fontSize: 11,
  },
  marketInsightText: {
    fontSize: 13,
    marginBottom: 12,
    lineHeight: 18,
  },
  marketInsightImpact: {
    alignSelf: 'flex-start',
    padding: 4,
    borderRadius: 4,
  },
  marketInsightImpactText: {
    fontSize: 11,
    fontWeight: '600',
    textTransform: 'capitalize',
  },
  financialCenter: {
    borderRadius: 12,
    padding: 20,
  },
  financialMetrics: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 20,
  },
  financialMetric: {
    alignItems: 'center',
    gap: 8,
  },
  financialMetricValue: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  financialMetricLabel: {
    fontSize: 12,
  },
  financialBreakdown: {
    gap: 12,
  },
  financialBreakdownTitle: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 12,
  },
  financialBreakdownItem: {
    gap: 8,
  },
  financialBreakdownItemName: {
    fontSize: 12,
  },
  financialBreakdownItemValue: {
    fontSize: 14,
    fontWeight: '600',
  },
  financialBreakdownItemBar: {
    height: 6,
    borderRadius: 3,
  },
  valuationCenter: {
    borderRadius: 12,
    padding: 20,
  },
  valuationMetrics: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 20,
  },
  valuationMetric: {
    alignItems: 'center',
    gap: 8,
  },
  valuationMetricValue: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  valuationMetricLabel: {
    fontSize: 12,
  },
  valuationForecast: {
    gap: 12,
  },
  valuationForecastTitle: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 12,
  },
  valuationForecastChart: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    height: 140,
    paddingHorizontal: 8,
  },
  valuationForecastBar: {
    flex: 1,
    alignItems: 'center',
    gap: 8,
  },
  valuationForecastBarFill: {
    width: '100%',
    borderRadius: 4,
  },
  valuationForecastLabel: {
    fontSize: 11,
  },
  valuationForecastValue: {
    fontSize: 12,
    fontWeight: '600',
  },
  insightsCenter: {
    borderRadius: 12,
    padding: 20,
    gap: 12,
  },
  insightCard: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    padding: 16,
    borderRadius: 8,
    borderWidth: 1,
  },
  insightIcon: {
    fontSize: 24,
  },
  insightText: {
    flex: 1,
    fontSize: 13,
    lineHeight: 18,
  },
  insightImpact: {
    padding: 4,
    borderRadius: 4,
  },
  insightImpactText: {
    fontSize: 11,
    fontWeight: '600',
    textTransform: 'capitalize',
  },
  operationsFeed: {
    borderRadius: 12,
    padding: 20,
    gap: 12,
  },
  activityItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 12,
  },
  activityDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginTop: 6,
  },
  activityContent: {
    flex: 1,
    gap: 4,
  },
  activityEvent: {
    fontSize: 13,
    fontWeight: '500',
  },
  activityProperty: {
    fontSize: 11,
  },
  activityTimestamp: {
    fontSize: 11,
  },
  systemHealthCenter: {
    borderRadius: 12,
    padding: 20,
    gap: 12,
  },
  systemHealthItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 12,
    borderRadius: 8,
  },
  systemHealthInfo: {
    gap: 4,
  },
  systemHealthName: {
    fontSize: 13,
    fontWeight: '500',
  },
  systemHealthMeta: {
    flexDirection: 'row',
    gap: 12,
  },
  systemHealthUptime: {
    fontSize: 11,
  },
  systemHealthLatency: {
    fontSize: 11,
  },
  systemHealthStatus: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    padding: 6,
    borderRadius: 4,
  },
  systemHealthStatusDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
  },
  systemHealthStatusText: {
    fontSize: 11,
    fontWeight: '600',
    textTransform: 'capitalize',
  },
});

export default RealEstateCommandCenter;
