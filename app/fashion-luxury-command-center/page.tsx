import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, StyleSheet, Dimensions, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { BlurView } from 'expo-blur';
import { 
  TrendingUp, 
  Users, 
  Package, 
  Target, 
  Brain,
  DollarSign,
  ShoppingBag,
  Store,
  Globe,
  Sparkles,
  Crown,
  Gem,
  Shield,
  Truck,
  Megaphone,
  BarChart3,
  Activity,
  Zap,
  Heart,
  Star,
  Award,
  Clock,
  AlertTriangle,
  CheckCircle,
  ArrowUpRight,
  ArrowDownRight,
  LayoutDashboard,
  Bot,
  Shirt,
  User,
  CreditCard,
  MapPin,
  Building2,
  ShoppingCart,
  MessageSquare,
  Settings
} from 'lucide-react-native';

const { width, height } = Dimensions.get('window');

// Luxury Color Palette
const COLORS = {
  obsidian: '#050505',
  luxuryGold: '#D4AF37',
  platinumSilver: '#E5E4E2',
  emeraldGreen: '#50C878',
  royalPurple: '#7851A9',
  roseGold: '#B76E79',
  crimson: '#DC143C',
  sapphireBlue: '#0F52BA',
  glass: 'rgba(255, 255, 255, 0.05)',
  glassBorder: 'rgba(255, 255, 255, 0.1)',
};

// AI Fashion Agents Data
const AI_AGENTS = [
  {
    id: 'vogue',
    name: 'Agent Vogue',
    role: 'Fashion Trend Intelligence',
    icon: <Shirt size={24} color={COLORS.luxuryGold} />,
    color: COLORS.royalPurple,
    responsibilities: ['Trend forecasting', 'Collection planning', 'Fashion analysis', 'Seasonal predictions'],
    metrics: { trends: 847, accuracy: 94, collections: 23 },
    status: 'active'
  },
  {
    id: 'couture',
    name: 'Agent Couture',
    role: 'Luxury Merchandising',
    icon: <ShoppingBag size={24} color={COLORS.luxuryGold} />,
    color: COLORS.emeraldGreen,
    responsibilities: ['Product assortment', 'Merchandising optimization', 'Collection performance', 'Category intelligence'],
    metrics: { products: 1247, sellThrough: 78, revenue: '+32%' },
    status: 'active'
  },
  {
    id: 'muse',
    name: 'Agent Muse',
    role: 'AI Personal Stylist',
    icon: <Sparkles size={24} color={COLORS.luxuryGold} />,
    color: COLORS.roseGold,
    responsibilities: ['Outfit recommendations', 'Personal styling', 'Client preferences', 'Wardrobe suggestions'],
    metrics: { sessions: 15420, conversion: 67, satisfaction: 4.8 },
    status: 'active'
  },
  {
    id: 'elite',
    name: 'Agent Elite',
    role: 'VIP Clienteling',
    icon: <Crown size={24} color={COLORS.luxuryGold} />,
    color: COLORS.luxuryGold,
    responsibilities: ['VIP engagement', 'Concierge services', 'Purchase predictions', 'Personalized experiences'],
    metrics: { revenue: '$8.4M', retention: 94, satisfaction: 4.9 },
    status: 'active'
  },
  {
    id: 'luxe',
    name: 'Agent Luxe',
    role: 'Pricing Intelligence',
    icon: <DollarSign size={24} color={COLORS.luxuryGold} />,
    color: COLORS.platinumSilver,
    responsibilities: ['Dynamic pricing', 'Promotion optimization', 'Competitive analysis', 'Margin optimization'],
    metrics: { margin: '+18%', accuracy: 91, impact: '$12.3M' },
    status: 'active'
  },
  {
    id: 'atlas',
    name: 'Agent Atlas',
    role: 'Global Supply Chain',
    icon: <Truck size={24} color={COLORS.luxuryGold} />,
    color: COLORS.sapphireBlue,
    responsibilities: ['Logistics optimization', 'Supplier monitoring', 'Warehouse intelligence', 'Delivery forecasting'],
    metrics: { delivered: 8472, onTime: 96, efficiency: 89 },
    status: 'active'
  },
  {
    id: 'nova',
    name: 'Agent Nova',
    role: 'Marketing Intelligence',
    icon: <Megaphone size={24} color={COLORS.luxuryGold} />,
    color: COLORS.crimson,
    responsibilities: ['Campaign optimization', 'Social media', 'Influencer management', 'Customer acquisition'],
    metrics: { roi: 340, leads: 12470, engagement: '+45%' },
    status: 'active'
  },
  {
    id: 'sentinel',
    name: 'Agent Sentinel',
    role: 'Fraud & Security',
    icon: <Shield size={24} color={COLORS.luxuryGold} />,
    color: COLORS.obsidian,
    responsibilities: ['Fraud detection', 'Payment monitoring', 'Counterfeit prevention', 'Risk management'],
    metrics: { prevented: 847, secure: 99.9, risk: 12 },
    status: 'active'
  },
];

// Executive KPI Data
const EXECUTIVE_KPIS = {
  sales: [
    { label: 'Total Revenue', value: '$847.2M', change: '+12.4%', trend: 'up' },
    { label: 'Online Sales', value: '$324.7M', change: '+18.2%', trend: 'up' },
    { label: 'Boutique Sales', value: '$522.5M', change: '+8.7%', trend: 'up' },
    { label: 'Average Order Value', value: '$847', change: '+5.3%', trend: 'up' },
    { label: 'Gross Margin', value: '68.4%', change: '+2.1%', trend: 'up' },
  ],
  customers: [
    { label: 'Active Customers', value: '1.24M', change: '+14.2%', trend: 'up' },
    { label: 'VIP Clients', value: '47.2K', change: '+22.8%', trend: 'up' },
    { label: 'Customer Lifetime Value', value: '$12,847', change: '+8.4%', trend: 'up' },
    { label: 'Repeat Purchase Rate', value: '67.3%', change: '+4.2%', trend: 'up' },
    { label: 'Customer Satisfaction', value: '4.8/5', change: '+0.2', trend: 'up' },
  ],
  inventory: [
    { label: 'Stock Value', value: '$124.7M', change: '-3.2%', trend: 'down' },
    { label: 'Sell-Through Rate', value: '78.4%', change: '+5.7%', trend: 'up' },
    { label: 'Out-of-Stock Alerts', value: '23', change: '-12', trend: 'down' },
    { label: 'Inventory Turnover', value: '4.2x', change: '+0.3', trend: 'up' },
    { label: 'Returns Rate', value: '8.7%', change: '-1.4%', trend: 'down' },
  ],
  marketing: [
    { label: 'Campaign ROI', value: '340%', change: '+45%', trend: 'up' },
    { label: 'Social Reach', value: '24.7M', change: '+28%', trend: 'up' },
    { label: 'Influencer Revenue', value: '$47.2M', change: '+52%', trend: 'up' },
    { label: 'Email Conversion', value: '12.4%', change: '+2.8%', trend: 'up' },
    { label: 'Website Traffic', value: '8.4M', change: '+18%', trend: 'up' },
  ],
  ai: [
    { label: 'AI Recommendations', value: '2.4M', change: '+67%', trend: 'up' },
    { label: 'Demand Forecast Accuracy', value: '94.2%', change: '+3.4%', trend: 'up' },
    { label: 'Styling Sessions', value: '15.4K', change: '+82%', trend: 'up' },
    { label: 'Automated Decisions', value: '847K', change: '+124%', trend: 'up' },
    { label: 'Revenue Influenced', value: '$124.7M', change: '+45%', trend: 'up' },
  ],
};

// Collection Intelligence Data
const COLLECTIONS = [
  { id: 1, name: 'Spring/Summer 2026', revenue: '$124.7M', growth: '+18%', status: 'active', products: 847 },
  { id: 2, name: 'Fall/Winter 2025', revenue: '$89.2M', growth: '+12%', status: 'active', products: 623 },
  { id: 3, name: 'Resort 2026', revenue: '$47.3M', growth: '+24%', status: 'active', products: 312 },
  { id: 4, name: 'Pre-Fall 2025', revenue: '$34.8M', growth: '+8%', status: 'closing', products: 287 },
  { id: 5, name: 'Cruise 2026', revenue: '$28.4M', growth: '+32%', status: 'launching', products: 198 },
];

// Boutique Operations Data
const BOUTIQUES = [
  { id: 1, name: 'Paris Champs-Élysées', revenue: '$12.4M', region: 'Europe', rank: 1, staff: 24 },
  { id: 2, name: 'New York Fifth Avenue', revenue: '$11.8M', region: 'North America', rank: 2, staff: 22 },
  { id: 3, name: 'Tokyo Ginza', revenue: '$10.2M', region: 'Asia Pacific', rank: 3, staff: 20 },
  { id: 4, name: 'London Bond Street', revenue: '$9.7M', region: 'Europe', rank: 4, staff: 18 },
  { id: 5, name: 'Milan Via Montenapoleone', revenue: '$8.9M', region: 'Europe', rank: 5, staff: 16 },
];

// E-Commerce Data
const ECOMMERCE_METRICS = [
  { label: 'Website Revenue', value: '$324.7M', change: '+18.2%' },
  { label: 'Conversion Rate', value: '3.8%', change: '+0.4%' },
  { label: 'Cart Abandonment', value: '67.2%', change: '-3.4%' },
  { label: 'Avg Session Duration', value: '4:32', change: '+0:28' },
  { label: 'Product Views', value: '24.7M', change: '+22%' },
];

// Marketing Campaigns Data
const MARKETING_CAMPAIGNS = [
  { id: 1, name: 'Spring Collection Launch', roi: 420, spend: '$4.7M', revenue: '$19.7M', status: 'active' },
  { id: 2, name: 'VIP Exclusive Access', roi: 380, spend: '$2.8M', revenue: '$10.6M', status: 'active' },
  { id: 3, name: 'Influencer Partnership', roi: 340, spend: '$1.2M', revenue: '$4.1M', status: 'completed' },
  { id: 4, name: 'Digital Fashion Week', roi: 290, spend: '$3.4M', revenue: '$9.9M', status: 'planned' },
];

// Supply Chain Data
const SUPPLY_CHAIN = [
  { id: 1, supplier: 'Italian Leather Works', status: 'operational', orders: 1247, onTime: 97 },
  { id: 2, supplier: 'French Silk Mills', status: 'operational', orders: 847, onTime: 94 },
  { id: 3, supplier: 'Swiss Textile Co', status: 'operational', orders: 623, onTime: 96 },
  { id: 4, supplier: 'Japanese Fabric Arts', status: 'delayed', orders: 312, onTime: 89 },
  { id: 5, supplier: 'British Wool Ltd', status: 'operational', orders: 198, onTime: 98 },
];

// Global Operations Data
const REGIONAL_DATA = [
  { region: 'Europe', revenue: '$347.2M', growth: '+14%', boutiques: 124, online: '+22%' },
  { region: 'North America', revenue: '$289.4M', growth: '+18%', boutiques: 67, online: '+28%' },
  { region: 'Asia Pacific', revenue: '$198.7M', growth: '+32%', boutiques: 47, online: '+45%' },
  { region: 'Middle East', revenue: '$67.2M', growth: '+24%', boutiques: 9, online: '+38%' },
  { region: 'Latin America', revenue: '$44.7M', growth: '+16%', boutiques: 0, online: '+26%' },
];

// AI Insights Data
const AI_INSIGHTS = [
  {
    id: 1,
    type: 'forecast',
    title: 'Luxury Handbag Demand Surge',
    insight: 'Demand forecast predicts 18% higher sales for luxury handbags next month driven by spring collection launch.',
    impact: '+$8.4M',
    confidence: 94,
    action: 'Increase inventory allocation'
  },
  {
    id: 2,
    type: 'customer',
    title: 'VIP Segment Growth',
    insight: 'VIP customer segment shows a 32% increase in purchase intent after personalized styling campaign.',
    impact: '+$12.7M',
    confidence: 89,
    action: 'Expand VIP program'
  },
  {
    id: 3,
    type: 'inventory',
    title: 'Inventory Optimization Opportunity',
    insight: 'AI-driven inventory optimization can reduce stock costs by $8.4M while maintaining 99% availability.',
    impact: '-$8.4M',
    confidence: 91,
    action: 'Implement optimization'
  },
  {
    id: 4,
    type: 'product',
    title: 'Premium Footwear Outperformance',
    insight: 'Premium footwear collection is outperforming forecast by 22% across all regions.',
    impact: '+$4.7M',
    confidence: 96,
    action: 'Increase production'
  },
  {
    id: 5,
    type: 'regional',
    title: 'Asia-Pacific Opportunity',
    insight: 'AI recommends increasing inventory for high-demand products in Asia-Pacific region.',
    impact: '+$15.2M',
    confidence: 87,
    action: 'Regional allocation'
  },
];

// Navigation Items
const NAV_ITEMS = [
  { id: 'dashboard', label: 'Executive Dashboard', icon: <LayoutDashboard size={20} /> },
  { id: 'agents', label: 'AI Fashion Agents', icon: <Bot size={20} /> },
  { id: 'collections', label: 'Collections', icon: <Shirt size={20} /> },
  { id: 'products', label: 'Products', icon: <Package size={20} /> },
  { id: 'inventory', label: 'Inventory', icon: <Store size={20} /> },
  { id: 'customers', label: 'Customers', icon: <Users size={20} /> },
  { id: 'vip', label: 'VIP Clienteling', icon: <Crown size={20} /> },
  { id: 'orders', label: 'Orders', icon: <ShoppingCart size={20} /> },
  { id: 'boutiques', label: 'Boutiques', icon: <Building2 size={20} /> },
  { id: 'ecommerce', label: 'E-Commerce', icon: <Globe size={20} /> },
  { id: 'marketing', label: 'Marketing', icon: <Megaphone size={20} /> },
  { id: 'supply', label: 'Supply Chain', icon: <Truck size={20} /> },
  { id: 'sustainability', label: 'Sustainability', icon: <Heart size={20} /> },
  { id: 'analytics', label: 'Analytics', icon: <BarChart3 size={20} /> },
  { id: 'settings', label: 'Settings', icon: <Settings size={20} /> },
];

export default function FashionLuxuryCommandCenter() {
  const [activeSection, setActiveSection] = useState('dashboard');
  const [selectedAgent, setSelectedAgent] = useState(null);

  return (
    <View style={styles.container}>
      {/* Header */}
      <LinearGradient
        colors={[COLORS.obsidian, '#0a0a0a']}
        style={styles.header}
      >
        <View style={styles.headerContent}>
          <View>
            <Text style={styles.headerTitle}>Fashion & Luxury AI Command Center</Text>
            <Text style={styles.headerSubtitle}>Enterprise Autonomous Operations Platform</Text>
          </View>
          <View style={styles.headerStats}>
            <View style={styles.headerStat}>
              <Activity size={16} color={COLORS.emeraldGreen} />
              <Text style={styles.headerStatText}>All Systems Operational</Text>
            </View>
          </View>
        </View>
      </LinearGradient>

      {/* Main Content */}
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Executive KPI Bar */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Executive KPI Dashboard</Text>
          
          {/* Sales KPIs */}
          <View style={styles.kpiSection}>
            <View style={styles.kpiHeader}>
              <DollarSign size={20} color={COLORS.luxuryGold} />
              <Text style={styles.kpiTitle}>Sales Performance</Text>
            </View>
            <View style={styles.kpiGrid}>
              {EXECUTIVE_KPIS.sales.map((kpi, index) => (
                <BlurView key={index} intensity={20} tint="dark" style={styles.kpiCard}>
                  <Text style={styles.kpiLabel}>{kpi.label}</Text>
                  <Text style={styles.kpiValue}>{kpi.value}</Text>
                  <View style={styles.kpiTrend}>
                    {kpi.trend === 'up' ? (
                      <ArrowUpRight size={16} color={COLORS.emeraldGreen} />
                    ) : (
                      <ArrowDownRight size={16} color={COLORS.crimson} />
                    )}
                    <Text style={[styles.kpiChange, kpi.trend === 'up' ? styles.trendUp : styles.trendDown]}>
                      {kpi.change}
                    </Text>
                  </View>
                </BlurView>
              ))}
            </View>
          </View>

          {/* Customer KPIs */}
          <View style={styles.kpiSection}>
            <View style={styles.kpiHeader}>
              <Users size={20} color={COLORS.roseGold} />
              <Text style={styles.kpiTitle}>Customer Intelligence</Text>
            </View>
            <View style={styles.kpiGrid}>
              {EXECUTIVE_KPIS.customers.map((kpi, index) => (
                <BlurView key={index} intensity={20} tint="dark" style={styles.kpiCard}>
                  <Text style={styles.kpiLabel}>{kpi.label}</Text>
                  <Text style={styles.kpiValue}>{kpi.value}</Text>
                  <View style={styles.kpiTrend}>
                    {kpi.trend === 'up' ? (
                      <ArrowUpRight size={16} color={COLORS.emeraldGreen} />
                    ) : (
                      <ArrowDownRight size={16} color={COLORS.crimson} />
                    )}
                    <Text style={[styles.kpiChange, kpi.trend === 'up' ? styles.trendUp : styles.trendDown]}>
                      {kpi.change}
                    </Text>
                  </View>
                </BlurView>
              ))}
            </View>
          </View>

          {/* Inventory KPIs */}
          <View style={styles.kpiSection}>
            <View style={styles.kpiHeader}>
              <Package size={20} color={COLORS.sapphireBlue} />
              <Text style={styles.kpiTitle}>Inventory Command</Text>
            </View>
            <View style={styles.kpiGrid}>
              {EXECUTIVE_KPIS.inventory.map((kpi, index) => (
                <BlurView key={index} intensity={20} tint="dark" style={styles.kpiCard}>
                  <Text style={styles.kpiLabel}>{kpi.label}</Text>
                  <Text style={styles.kpiValue}>{kpi.value}</Text>
                  <View style={styles.kpiTrend}>
                    {kpi.trend === 'up' ? (
                      <ArrowUpRight size={16} color={COLORS.emeraldGreen} />
                    ) : (
                      <ArrowDownRight size={16} color={COLORS.crimson} />
                    )}
                    <Text style={[styles.kpiChange, kpi.trend === 'up' ? styles.trendUp : styles.trendDown]}>
                      {kpi.change}
                    </Text>
                  </View>
                </BlurView>
              ))}
            </View>
          </View>

          {/* Marketing KPIs */}
          <View style={styles.kpiSection}>
            <View style={styles.kpiHeader}>
              <Target size={20} color={COLORS.crimson} />
              <Text style={styles.kpiTitle}>Marketing Intelligence</Text>
            </View>
            <View style={styles.kpiGrid}>
              {EXECUTIVE_KPIS.marketing.map((kpi, index) => (
                <BlurView key={index} intensity={20} tint="dark" style={styles.kpiCard}>
                  <Text style={styles.kpiLabel}>{kpi.label}</Text>
                  <Text style={styles.kpiValue}>{kpi.value}</Text>
                  <View style={styles.kpiTrend}>
                    {kpi.trend === 'up' ? (
                      <ArrowUpRight size={16} color={COLORS.emeraldGreen} />
                    ) : (
                      <ArrowDownRight size={16} color={COLORS.crimson} />
                    )}
                    <Text style={[styles.kpiChange, kpi.trend === 'up' ? styles.trendUp : styles.trendDown]}>
                      {kpi.change}
                    </Text>
                  </View>
                </BlurView>
              ))}
            </View>
          </View>

          {/* AI KPIs */}
          <View style={styles.kpiSection}>
            <View style={styles.kpiHeader}>
              <Brain size={20} color={COLORS.royalPurple} />
              <Text style={styles.kpiTitle}>AI Performance</Text>
            </View>
            <View style={styles.kpiGrid}>
              {EXECUTIVE_KPIS.ai.map((kpi, index) => (
                <BlurView key={index} intensity={20} tint="dark" style={styles.kpiCard}>
                  <Text style={styles.kpiLabel}>{kpi.label}</Text>
                  <Text style={styles.kpiValue}>{kpi.value}</Text>
                  <View style={styles.kpiTrend}>
                    {kpi.trend === 'up' ? (
                      <ArrowUpRight size={16} color={COLORS.emeraldGreen} />
                    ) : (
                      <ArrowDownRight size={16} color={COLORS.crimson} />
                    )}
                    <Text style={[styles.kpiChange, kpi.trend === 'up' ? styles.trendUp : styles.trendDown]}>
                      {kpi.change}
                    </Text>
                  </View>
                </BlurView>
              ))}
            </View>
          </View>
        </View>

        {/* AI Fashion Agents Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>AI Fashion Agents</Text>
          <Text style={styles.sectionSubtitle}>Autonomous Luxury Intelligence Agents</Text>
          
          <View style={styles.agentsGrid}>
            {AI_AGENTS.map((agent) => (
              <TouchableOpacity
                key={agent.id}
                style={[styles.agentCard, { borderColor: agent.color }]}
                onPress={() => setSelectedAgent(agent)}
              >
                <LinearGradient
                  colors={[agent.color + '20', agent.color + '05']}
                  style={styles.agentCardGradient}
                >
                  <View style={styles.agentHeader}>
                    <View style={[styles.agentIcon, { backgroundColor: agent.color + '30' }]}>
                      {agent.icon}
                    </View>
                    <View style={styles.agentStatus}>
                      <View style={[styles.statusDot, { backgroundColor: COLORS.emeraldGreen }]} />
                      <Text style={styles.statusText}>Active</Text>
                    </View>
                  </View>
                  
                  <Text style={styles.agentName}>{agent.name}</Text>
                  <Text style={styles.agentRole}>{agent.role}</Text>
                  
                  <View style={styles.agentMetrics}>
                    {Object.entries(agent.metrics).map(([key, value]) => (
                      <View key={key} style={styles.metricItem}>
                        <Text style={styles.metricValue}>{value}</Text>
                        <Text style={styles.metricLabel}>{key.charAt(0).toUpperCase() + key.slice(1)}</Text>
                      </View>
                    ))}
                  </View>
                  
                  <View style={styles.agentResponsibilities}>
                    {agent.responsibilities.slice(0, 2).map((resp, index) => (
                      <View key={index} style={styles.responsibilityItem}>
                        <CheckCircle size={12} color={COLORS.luxuryGold} />
                        <Text style={styles.responsibilityText}>{resp}</Text>
                      </View>
                    ))}
                  </View>
                </LinearGradient>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* CEO Command Center */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>CEO Command Center</Text>
          <Text style={styles.sectionSubtitle}>Global Executive Intelligence</Text>
          
          <BlurView intensity={20} tint="dark" style={styles.commandCenter}>
            <View style={styles.commandStats}>
              <View style={styles.commandStatItem}>
                <DollarSign size={32} color={COLORS.luxuryGold} />
                <Text style={styles.commandStatValue}>$847.2M</Text>
                <Text style={styles.commandStatLabel}>Global Revenue</Text>
                <Text style={[styles.commandStatChange, styles.trendUp]}>+12.4% YoY</Text>
              </View>
              
              <View style={styles.commandStatItem}>
                <Store size={32} color={COLORS.emeraldGreen} />
                <Text style={styles.commandStatValue}>247</Text>
                <Text style={styles.commandStatLabel}>Active Boutiques</Text>
                <Text style={[styles.commandStatChange, styles.trendUp]}>+18 this quarter</Text>
              </View>
              
              <View style={styles.commandStatItem}>
                <Globe size={32} color={COLORS.sapphireBlue} />
                <Text style={styles.commandStatValue}>1.24M</Text>
                <Text style={styles.commandStatLabel}>Online Visitors</Text>
                <Text style={[styles.commandStatChange, styles.trendUp]}>+28% MoM</Text>
              </View>
              
              <View style={styles.commandStatItem}>
                <Crown size={32} color={COLORS.roseGold} />
                <Text style={styles.commandStatValue}>47.2K</Text>
                <Text style={styles.commandStatLabel}>VIP Customers</Text>
                <Text style={[styles.commandStatChange, styles.trendUp]}>+22% YoY</Text>
              </View>
              
              <View style={styles.commandStatItem}>
                <Brain size={32} color={COLORS.royalPurple} />
                <Text style={styles.commandStatValue}>$124.7M</Text>
                <Text style={styles.commandStatLabel}>AI Revenue Impact</Text>
                <Text style={[styles.commandStatChange, styles.trendUp]}>+45% YoY</Text>
              </View>
            </View>
          </BlurView>
        </View>

        {/* AI Insights Center */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>AI Insights Center</Text>
          <Text style={styles.sectionSubtitle}>Executive Intelligence Recommendations</Text>
          
          <View style={styles.insightsContainer}>
            {AI_INSIGHTS.map((insight) => (
              <BlurView key={insight.id} intensity={20} tint="dark" style={styles.insightCard}>
                <View style={styles.insightHeader}>
                  <View style={[styles.insightType, { backgroundColor: insight.type === 'forecast' ? COLORS.royalPurple + '30' : insight.type === 'customer' ? COLORS.roseGold + '30' : insight.type === 'inventory' ? COLORS.sapphireBlue + '30' : COLORS.emeraldGreen + '30' }]}>
                    <Brain size={20} color={COLORS.luxuryGold} />
                  </View>
                  <View style={styles.insightMeta}>
                    <Text style={styles.insightTitle}>{insight.title}</Text>
                    <View style={styles.insightConfidence}>
                      <Text style={styles.confidenceLabel}>Confidence:</Text>
                      <Text style={styles.confidenceValue}>{insight.confidence}%</Text>
                    </View>
                  </View>
                </View>
                
                <Text style={styles.insightText}>{insight.insight}</Text>
                
                <View style={styles.insightFooter}>
                  <View style={styles.insightImpact}>
                    <Text style={styles.impactLabel}>Impact:</Text>
                    <Text style={[styles.impactValue, insight.impact.startsWith('+') ? styles.trendUp : styles.trendDown]}>
                      {insight.impact}
                    </Text>
                  </View>
                  <TouchableOpacity style={styles.insightAction}>
                    <Text style={styles.insightActionText}>{insight.action}</Text>
                    <ArrowUpRight size={16} color={COLORS.luxuryGold} />
                  </TouchableOpacity>
                </View>
              </BlurView>
            ))}
          </View>
        </View>

        {/* Collection Intelligence */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Collection Intelligence</Text>
          <Text style={styles.sectionSubtitle}>Seasonal Collection Performance</Text>
          
          <View style={styles.collectionsContainer}>
            {COLLECTIONS.map((collection) => (
              <BlurView key={collection.id} intensity={20} tint="dark" style={styles.collectionCard}>
                <View style={styles.collectionHeader}>
                  <Text style={styles.collectionName}>{collection.name}</Text>
                  <View style={[styles.collectionStatus, { backgroundColor: collection.status === 'active' ? COLORS.emeraldGreen + '30' : collection.status === 'launching' ? COLORS.luxuryGold + '30' : COLORS.platinumSilver + '30' }]}>
                    <Text style={[styles.collectionStatusText, { color: collection.status === 'active' ? COLORS.emeraldGreen : collection.status === 'launching' ? COLORS.luxuryGold : COLORS.platinumSilver }]}>
                      {collection.status.charAt(0).toUpperCase() + collection.status.slice(1)}
                    </Text>
                  </View>
                </View>
                
                <View style={styles.collectionMetrics}>
                  <View style={styles.collectionMetric}>
                    <Text style={styles.collectionMetricLabel}>Revenue</Text>
                    <Text style={styles.collectionMetricValue}>{collection.revenue}</Text>
                  </View>
                  <View style={styles.collectionMetric}>
                    <Text style={styles.collectionMetricLabel}>Growth</Text>
                    <Text style={[styles.collectionMetricValue, styles.trendUp]}>{collection.growth}</Text>
                  </View>
                  <View style={styles.collectionMetric}>
                    <Text style={styles.collectionMetricLabel}>Products</Text>
                    <Text style={styles.collectionMetricValue}>{collection.products}</Text>
                  </View>
                </View>
              </BlurView>
            ))}
          </View>
        </View>

        {/* Boutique Operations */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Boutique Operations</Text>
          <Text style={styles.sectionSubtitle}>Global Store Performance</Text>
          
          <BlurView intensity={20} tint="dark" style={styles.boutiqueContainer}>
            {BOUTIQUES.map((boutique, index) => (
              <View key={boutique.id} style={styles.boutiqueItem}>
                <View style={[styles.boutiqueRank, { backgroundColor: index < 3 ? COLORS.luxuryGold + '30' : COLORS.glass }]}>
                  <Text style={[styles.boutiqueRankText, { color: index < 3 ? COLORS.luxuryGold : COLORS.platinumSilver }]}>
                    #{boutique.rank}
                  </Text>
                </View>
                <View style={styles.boutiqueInfo}>
                  <Text style={styles.boutiqueName}>{boutique.name}</Text>
                  <Text style={styles.boutiqueRegion}>{boutique.region}</Text>
                </View>
                <View style={styles.boutiqueStats}>
                  <Text style={styles.boutiqueRevenue}>{boutique.revenue}</Text>
                  <Text style={styles.boutiqueStaff}>{boutique.staff} staff</Text>
                </View>
              </View>
            ))}
          </BlurView>
        </View>

        {/* E-Commerce Command Center */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>E-Commerce Command Center</Text>
          <Text style={styles.sectionSubtitle}>Digital Performance Analytics</Text>
          
          <View style={styles.ecommerceGrid}>
            {ECOMMERCE_METRICS.map((metric, index) => (
              <BlurView key={index} intensity={20} tint="dark" style={styles.ecommerceCard}>
                <Text style={styles.ecommerceLabel}>{metric.label}</Text>
                <Text style={styles.ecommerceValue}>{metric.value}</Text>
                <Text style={[styles.ecommerceChange, metric.change.startsWith('+') ? styles.trendUp : styles.trendDown]}>
                  {metric.change}
                </Text>
              </BlurView>
            ))}
          </View>
        </View>

        {/* Marketing Intelligence */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Marketing Intelligence</Text>
          <Text style={styles.sectionSubtitle}>Campaign Performance</Text>
          
          <View style={styles.marketingContainer}>
            {MARKETING_CAMPAIGNS.map((campaign) => (
              <BlurView key={campaign.id} intensity={20} tint="dark" style={styles.campaignCard}>
                <View style={styles.campaignHeader}>
                  <Text style={styles.campaignName}>{campaign.name}</Text>
                  <View style={[styles.campaignStatus, { backgroundColor: campaign.status === 'active' ? COLORS.emeraldGreen + '30' : campaign.status === 'completed' ? COLORS.platinumSilver + '30' : COLORS.luxuryGold + '30' }]}>
                    <Text style={[styles.campaignStatusText, { color: campaign.status === 'active' ? COLORS.emeraldGreen : campaign.status === 'completed' ? COLORS.platinumSilver : COLORS.luxuryGold }]}>
                      {campaign.status.charAt(0).toUpperCase() + campaign.status.slice(1)}
                    </Text>
                  </View>
                </View>
                
                <View style={styles.campaignMetrics}>
                  <View style={styles.campaignMetric}>
                    <Text style={styles.campaignMetricLabel}>ROI</Text>
                    <Text style={styles.campaignMetricValue}>{campaign.roi}%</Text>
                  </View>
                  <View style={styles.campaignMetric}>
                    <Text style={styles.campaignMetricLabel}>Spend</Text>
                    <Text style={styles.campaignMetricValue}>{campaign.spend}</Text>
                  </View>
                  <View style={styles.campaignMetric}>
                    <Text style={styles.campaignMetricLabel}>Revenue</Text>
                    <Text style={styles.campaignMetricValue}>{campaign.revenue}</Text>
                  </View>
                </View>
              </BlurView>
            ))}
          </View>
        </View>

        {/* Supply Chain */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Supply Chain Intelligence</Text>
          <Text style={styles.sectionSubtitle}>Global Logistics Network</Text>
          
          <View style={styles.supplyChainContainer}>
            {SUPPLY_CHAIN.map((supplier) => (
              <BlurView key={supplier.id} intensity={20} tint="dark" style={styles.supplierCard}>
                <View style={styles.supplierHeader}>
                  <Text style={styles.supplierName}>{supplier.supplier}</Text>
                  <View style={[styles.supplierStatus, { backgroundColor: supplier.status === 'operational' ? COLORS.emeraldGreen + '30' : COLORS.crimson + '30' }]}>
                    <View style={[styles.supplierStatusDot, { backgroundColor: supplier.status === 'operational' ? COLORS.emeraldGreen : COLORS.crimson }]} />
                    <Text style={[styles.supplierStatusText, { color: supplier.status === 'operational' ? COLORS.emeraldGreen : COLORS.crimson }]}>
                      {supplier.status.charAt(0).toUpperCase() + supplier.status.slice(1)}
                    </Text>
                  </View>
                </View>
                
                <View style={styles.supplierMetrics}>
                  <View style={styles.supplierMetric}>
                    <Text style={styles.supplierMetricLabel}>Orders</Text>
                    <Text style={styles.supplierMetricValue}>{supplier.orders}</Text>
                  </View>
                  <View style={styles.supplierMetric}>
                    <Text style={styles.supplierMetricLabel}>On-Time</Text>
                    <Text style={styles.supplierMetricValue}>{supplier.onTime}%</Text>
                  </View>
                </View>
              </BlurView>
            ))}
          </View>
        </View>

        {/* Global Operations */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Global Operations</Text>
          <Text style={styles.sectionSubtitle}>Regional Performance</Text>
          
          <BlurView intensity={20} tint="dark" style={styles.globalContainer}>
            {REGIONAL_DATA.map((region) => (
              <View key={region.region} style={styles.regionItem}>
                <View style={styles.regionInfo}>
                  <Text style={styles.regionName}>{region.region}</Text>
                  <Text style={styles.regionRevenue}>{region.revenue}</Text>
                </View>
                <View style={styles.regionMetrics}>
                  <View style={styles.regionMetric}>
                    <Text style={styles.regionMetricLabel}>Growth</Text>
                    <Text style={[styles.regionMetricValue, styles.trendUp]}>{region.growth}</Text>
                  </View>
                  <View style={styles.regionMetric}>
                    <Text style={styles.regionMetricLabel}>Boutiques</Text>
                    <Text style={styles.regionMetricValue}>{region.boutiques}</Text>
                  </View>
                  <View style={styles.regionMetric}>
                    <Text style={styles.regionMetricLabel}>Online</Text>
                    <Text style={[styles.regionMetricValue, styles.trendUp]}>{region.online}</Text>
                  </View>
                </View>
              </View>
            ))}
          </BlurView>
        </View>

        {/* System Health */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>System Health</Text>
          <Text style={styles.sectionSubtitle}>Infrastructure & Service Monitoring</Text>
          
          <BlurView intensity={20} tint="dark" style={styles.systemHealth}>
            <View style={styles.healthItem}>
              <CheckCircle size={20} color={COLORS.emeraldGreen} />
              <Text style={styles.healthLabel}>Commerce APIs</Text>
              <Text style={styles.healthStatus}>Operational</Text>
              <Text style={styles.healthUptime}>99.99% uptime</Text>
            </View>
            
            <View style={styles.healthItem}>
              <CheckCircle size={20} color={COLORS.emeraldGreen} />
              <Text style={styles.healthLabel}>Inventory Services</Text>
              <Text style={styles.healthStatus}>Operational</Text>
              <Text style={styles.healthUptime}>99.98% uptime</Text>
            </View>
            
            <View style={styles.healthItem}>
              <CheckCircle size={20} color={COLORS.emeraldGreen} />
              <Text style={styles.healthLabel}>AI Models</Text>
              <Text style={styles.healthStatus}>Operational</Text>
              <Text style={styles.healthUptime}>99.95% uptime</Text>
            </View>
            
            <View style={styles.healthItem}>
              <CheckCircle size={20} color={COLORS.emeraldGreen} />
              <Text style={styles.healthLabel}>Payment Systems</Text>
              <Text style={styles.healthStatus}>Operational</Text>
              <Text style={styles.healthUptime}>99.99% uptime</Text>
            </View>
            
            <View style={styles.healthItem}>
              <CheckCircle size={20} color={COLORS.emeraldGreen} />
              <Text style={styles.healthLabel}>ERP Integration</Text>
              <Text style={styles.healthStatus}>Operational</Text>
              <Text style={styles.healthUptime}>99.97% uptime</Text>
            </View>
            
            <View style={styles.healthItem}>
              <CheckCircle size={20} color={COLORS.emeraldGreen} />
              <Text style={styles.healthLabel}>CRM</Text>
              <Text style={styles.healthStatus}>Operational</Text>
              <Text style={styles.healthUptime}>99.96% uptime</Text>
            </View>
            
            <View style={styles.healthItem}>
              <CheckCircle size={20} color={COLORS.emeraldGreen} />
              <Text style={styles.healthLabel}>Recommendation Engine</Text>
              <Text style={styles.healthStatus}>Operational</Text>
              <Text style={styles.healthUptime}>99.94% uptime</Text>
            </View>
          </BlurView>
        </View>

        <View style={styles.footer}>
          <Text style={styles.footerText}>Fashion & Luxury AI Command Center v2.0</Text>
          <Text style={styles.footerSubtext}>Enterprise Autonomous Operations Platform</Text>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.obsidian,
  },
  header: {
    paddingTop: 60,
    paddingBottom: 24,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.glassBorder,
  },
  headerContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: '700',
    color: COLORS.platinumSilver,
    letterSpacing: 0.5,
  },
  headerSubtitle: {
    fontSize: 14,
    color: COLORS.luxuryGold,
    marginTop: 4,
    letterSpacing: 1,
  },
  headerStats: {
    flexDirection: 'row',
    gap: 16,
  },
  headerStat: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: COLORS.glass,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: COLORS.glassBorder,
  },
  headerStatText: {
    fontSize: 12,
    color: COLORS.emeraldGreen,
    fontWeight: '600',
  },
  scrollView: {
    flex: 1,
  },
  section: {
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.glassBorder,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: COLORS.platinumSilver,
    marginBottom: 8,
  },
  sectionSubtitle: {
    fontSize: 14,
    color: COLORS.luxuryGold,
    marginBottom: 20,
    letterSpacing: 0.5,
  },
  kpiSection: {
    marginBottom: 24,
  },
  kpiHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 16,
  },
  kpiTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: COLORS.platinumSilver,
  },
  kpiGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  kpiCard: {
    width: (width - 64) / 2,
    backgroundColor: COLORS.glass,
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: COLORS.glassBorder,
  },
  kpiLabel: {
    fontSize: 12,
    color: COLORS.platinumSilver + '80',
    marginBottom: 8,
  },
  kpiValue: {
    fontSize: 24,
    fontWeight: '700',
    color: COLORS.platinumSilver,
    marginBottom: 8,
  },
  kpiTrend: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  kpiChange: {
    fontSize: 14,
    fontWeight: '600',
  },
  trendUp: {
    color: COLORS.emeraldGreen,
  },
  trendDown: {
    color: COLORS.crimson,
  },
  agentsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 16,
  },
  agentCard: {
    width: (width - 56) / 2,
    borderRadius: 20,
    borderWidth: 2,
    overflow: 'hidden',
  },
  agentCardGradient: {
    padding: 16,
  },
  agentHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  agentIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
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
    color: COLORS.emeraldGreen,
    fontWeight: '600',
  },
  agentName: {
    fontSize: 16,
    fontWeight: '700',
    color: COLORS.platinumSilver,
    marginBottom: 4,
  },
  agentRole: {
    fontSize: 12,
    color: COLORS.luxuryGold,
    marginBottom: 12,
  },
  agentMetrics: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  metricItem: {
    alignItems: 'center',
  },
  metricValue: {
    fontSize: 14,
    fontWeight: '700',
    color: COLORS.platinumSilver,
  },
  metricLabel: {
    fontSize: 10,
    color: COLORS.platinumSilver + '60',
  },
  agentResponsibilities: {
    gap: 6,
  },
  responsibilityItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  responsibilityText: {
    fontSize: 10,
    color: COLORS.platinumSilver + '80',
    flex: 1,
  },
  commandCenter: {
    borderRadius: 20,
    padding: 20,
    borderWidth: 1,
    borderColor: COLORS.glassBorder,
  },
  commandStats: {
    gap: 20,
  },
  commandStatItem: {
    alignItems: 'center',
    padding: 16,
    backgroundColor: COLORS.glass,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: COLORS.glassBorder,
  },
  commandStatValue: {
    fontSize: 28,
    fontWeight: '700',
    color: COLORS.platinumSilver,
    marginTop: 8,
  },
  commandStatLabel: {
    fontSize: 12,
    color: COLORS.platinumSilver + '80',
    marginTop: 4,
  },
  commandStatChange: {
    fontSize: 12,
    fontWeight: '600',
    marginTop: 4,
  },
  insightsContainer: {
    gap: 16,
  },
  insightCard: {
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: COLORS.glassBorder,
  },
  insightHeader: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 12,
  },
  insightType: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  insightMeta: {
    flex: 1,
  },
  insightTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.platinumSilver,
    marginBottom: 4,
  },
  insightConfidence: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  confidenceLabel: {
    fontSize: 12,
    color: COLORS.platinumSilver + '60',
  },
  confidenceValue: {
    fontSize: 12,
    fontWeight: '600',
    color: COLORS.emeraldGreen,
  },
  insightText: {
    fontSize: 14,
    color: COLORS.platinumSilver + '90',
    lineHeight: 20,
    marginBottom: 12,
  },
  insightFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  insightImpact: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  impactLabel: {
    fontSize: 12,
    color: COLORS.platinumSilver + '60',
  },
  impactValue: {
    fontSize: 14,
    fontWeight: '600',
  },
  insightAction: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: COLORS.luxuryGold + '20',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: COLORS.luxuryGold + '40',
  },
  insightActionText: {
    fontSize: 12,
    fontWeight: '600',
    color: COLORS.luxuryGold,
  },
  systemHealth: {
    borderRadius: 20,
    padding: 20,
    borderWidth: 1,
    borderColor: COLORS.glassBorder,
    gap: 16,
  },
  healthItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    backgroundColor: COLORS.glass,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: COLORS.glassBorder,
  },
  healthLabel: {
    flex: 1,
    fontSize: 14,
    fontWeight: '600',
    color: COLORS.platinumSilver,
    marginLeft: 12,
  },
  healthStatus: {
    fontSize: 12,
    color: COLORS.emeraldGreen,
    fontWeight: '600',
  },
  healthUptime: {
    fontSize: 12,
    color: COLORS.platinumSilver + '60',
    marginLeft: 12,
  },
  footer: {
    padding: 40,
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: COLORS.glassBorder,
  },
  footerText: {
    fontSize: 14,
    color: COLORS.platinumSilver + '60',
  },
  footerSubtext: {
    fontSize: 12,
    color: COLORS.luxuryGold,
    marginTop: 4,
  },
  collectionsContainer: {
    gap: 12,
  },
  collectionCard: {
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: COLORS.glassBorder,
  },
  collectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  collectionName: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.platinumSilver,
  },
  collectionStatus: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
  },
  collectionStatusText: {
    fontSize: 12,
    fontWeight: '600',
  },
  collectionMetrics: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  collectionMetric: {
    alignItems: 'center',
  },
  collectionMetricLabel: {
    fontSize: 10,
    color: COLORS.platinumSilver + '60',
    marginBottom: 4,
  },
  collectionMetricValue: {
    fontSize: 14,
    fontWeight: '700',
    color: COLORS.platinumSilver,
  },
  boutiqueContainer: {
    borderRadius: 20,
    padding: 16,
    borderWidth: 1,
    borderColor: COLORS.glassBorder,
    gap: 12,
  },
  boutiqueItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    backgroundColor: COLORS.glass,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: COLORS.glassBorder,
  },
  boutiqueRank: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  boutiqueRankText: {
    fontSize: 14,
    fontWeight: '700',
  },
  boutiqueInfo: {
    flex: 1,
  },
  boutiqueName: {
    fontSize: 14,
    fontWeight: '600',
    color: COLORS.platinumSilver,
    marginBottom: 4,
  },
  boutiqueRegion: {
    fontSize: 12,
    color: COLORS.platinumSilver + '60',
  },
  boutiqueStats: {
    alignItems: 'flex-end',
  },
  boutiqueRevenue: {
    fontSize: 14,
    fontWeight: '700',
    color: COLORS.luxuryGold,
    marginBottom: 4,
  },
  boutiqueStaff: {
    fontSize: 12,
    color: COLORS.platinumSilver + '60',
  },
  ecommerceGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  ecommerceCard: {
    width: (width - 64) / 2,
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: COLORS.glassBorder,
  },
  ecommerceLabel: {
    fontSize: 12,
    color: COLORS.platinumSilver + '80',
    marginBottom: 8,
  },
  ecommerceValue: {
    fontSize: 20,
    fontWeight: '700',
    color: COLORS.platinumSilver,
    marginBottom: 8,
  },
  ecommerceChange: {
    fontSize: 14,
    fontWeight: '600',
  },
  marketingContainer: {
    gap: 12,
  },
  campaignCard: {
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: COLORS.glassBorder,
  },
  campaignHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  campaignName: {
    fontSize: 14,
    fontWeight: '600',
    color: COLORS.platinumSilver,
    flex: 1,
  },
  campaignStatus: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  campaignStatusText: {
    fontSize: 12,
    fontWeight: '600',
  },
  campaignMetrics: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  campaignMetric: {
    alignItems: 'center',
  },
  campaignMetricLabel: {
    fontSize: 10,
    color: COLORS.platinumSilver + '60',
    marginBottom: 4,
  },
  campaignMetricValue: {
    fontSize: 14,
    fontWeight: '700',
    color: COLORS.platinumSilver,
  },
  supplyChainContainer: {
    gap: 12,
  },
  supplierCard: {
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: COLORS.glassBorder,
  },
  supplierHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  supplierName: {
    fontSize: 14,
    fontWeight: '600',
    color: COLORS.platinumSilver,
    flex: 1,
  },
  supplierStatus: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  supplierStatusDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  supplierStatusText: {
    fontSize: 12,
    fontWeight: '600',
  },
  supplierMetrics: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  supplierMetric: {
    alignItems: 'center',
  },
  supplierMetricLabel: {
    fontSize: 10,
    color: COLORS.platinumSilver + '60',
    marginBottom: 4,
  },
  supplierMetricValue: {
    fontSize: 14,
    fontWeight: '700',
    color: COLORS.platinumSilver,
  },
  globalContainer: {
    borderRadius: 20,
    padding: 16,
    borderWidth: 1,
    borderColor: COLORS.glassBorder,
    gap: 12,
  },
  regionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    backgroundColor: COLORS.glass,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: COLORS.glassBorder,
  },
  regionInfo: {
    flex: 1,
  },
  regionName: {
    fontSize: 14,
    fontWeight: '600',
    color: COLORS.platinumSilver,
    marginBottom: 4,
  },
  regionRevenue: {
    fontSize: 16,
    fontWeight: '700',
    color: COLORS.luxuryGold,
  },
  regionMetrics: {
    flexDirection: 'row',
    gap: 16,
  },
  regionMetric: {
    alignItems: 'center',
  },
  regionMetricLabel: {
    fontSize: 10,
    color: COLORS.platinumSilver + '60',
    marginBottom: 4,
  },
  regionMetricValue: {
    fontSize: 12,
    fontWeight: '700',
    color: COLORS.platinumSilver,
  },
});
