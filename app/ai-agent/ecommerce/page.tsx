import React, { useState, useEffect } from 'react';
import { View, StyleSheet, ScrollView, TouchableOpacity, Dimensions } from 'react-native';
import { Text } from '@/components/ui/text';
import { useTheme } from '@/providers/ThemeProvider';
import {
  LayoutDashboard,
  Bot,
  BarChart3,
  TrendingUp,
  TrendingDown,
  Activity,
  Target,
  Users,
  Zap,
  DollarSign,
  ShoppingCart,
  Package,
  CreditCard,
  Shield,
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
  Funnel,
  ArrowRight,
  Route,
  Server,
  Code,
  Layers,
  Network,
  Sparkles,
  Info,
  Beaker,
  ChevronLeft,
  ChevronRight,
  AlertTriangle,
  CheckCircle2,
  AlertCircle,
  ArrowUpRight,
  ArrowDownRight,
  ChartBarBig,
  User,
  Truck,
  Warehouse,
  Tag,
  Megaphone,
  Percent,
  Gauge,
  Fingerprint,
  Lock,
  Database,
  Cpu,
  Wifi,
  Globe2,
  MapPin,
  Building2,
  Store,
  Receipt
} from 'lucide-react-native';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

// Types
interface ECommerceKPI {
  id: string;
  title: string;
  value: string;
  change: string;
  trend: 'up' | 'down' | 'stable';
  color: string;
  subtitle: string;
  icon: any;
}

interface CommerceAgent {
  id: string;
  name: string;
  specialty: string;
  avatar: string;
  status: 'active' | 'monitoring' | 'paused' | 'error';
  confidenceScore: number;
  revenueImpact: number;
  metrics: {
    revenueManaged?: string;
    conversionLift?: string;
    usersTracked?: string;
    predictionsMade?: string;
    accuracy?: number;
    pricesOptimized?: string;
    marginImprovement?: string;
    optimizationActions?: string;
  };
  activeInsights: number;
  trend: 'up' | 'down' | 'stable';
}

interface FunnelStage {
  id: string;
  name: string;
  value: number;
  percentage: number;
  dropoff: number;
  color: string;
}

interface AdChannel {
  id: string;
  name: string;
  spend: string;
  revenue: string;
  roas: string;
  conversions: string;
  trend: 'up' | 'down' | 'stable';
  color: string;
}

interface ProductItem {
  id: string;
  name: string;
  sku: string;
  revenue: string;
  orders: string;
  trend: 'up' | 'down' | 'stable';
  status: 'trending' | 'stable' | 'declining';
  stock: number;
}

interface PricingData {
  id: string;
  product: string;
  currentPrice: string;
  optimalPrice: string;
  elasticity: string;
  competitorPrice: string;
  recommendation: string;
  impact: string;
}

interface InventoryItem {
  id: string;
  product: string;
  sku: string;
  currentStock: number;
  reorderPoint: number;
  warehouse: string;
  status: 'healthy' | 'low' | 'critical' | 'overstocked';
  daysOfSupply: number;
}

interface CustomerSegment {
  id: string;
  name: string;
  count: string;
  clv: string;
  retention: string;
  churnRisk: string;
  color: string;
}

interface PersonalizationMetric {
  id: string;
  type: string;
  accuracy: number;
  lift: string;
  revenue: string;
  color: string;
}

interface FraudAlert {
  id: string;
  type: string;
  severity: 'high' | 'medium' | 'low';
  amount: string;
  status: 'detected' | 'investigating' | 'resolved';
  timestamp: string;
}

interface CommerceInsight {
  id: string;
  insight: string;
  category: string;
  confidence: number;
  impact: 'high' | 'medium' | 'low';
  timestamp: string;
  action: string;
}

interface CommerceActivity {
  id: string;
  event: string;
  type: 'order' | 'payment' | 'cart' | 'ad' | 'price' | 'product' | 'inventory';
  timestamp: string;
  details: string;
}

interface SystemHealth {
  id: string;
  system: string;
  status: 'healthy' | 'degraded' | 'down';
  uptime: string;
  latency: string;
  throughput: string;
}

interface CommerceRegion {
  id: string;
  region: string;
  revenue: string;
  orders: string;
  growth: string;
  color: string;
}

interface RevenueFlow {
  id: string;
  source: string;
  amount: string;
  trend: 'up' | 'down' | 'stable';
  percentage: number;
  color: string;
}

interface JourneyStage {
  id: string;
  stage: string;
  users: string;
  time: string;
  conversion: string;
  color: string;
}

interface DemandForecast {
  id: string;
  product: string;
  currentDemand: string;
  forecastDemand: string;
  growth: string;
  confidence: number;
  color: string;
}

interface AttributionChannel {
  id: string;
  channel: string;
  touchpoints: string;
  conversions: string;
  revenue: string;
  attribution: string;
  color: string;
}

interface PricingOptimization {
  id: string;
  product: string;
  currentPrice: string;
  optimalPrice: string;
  elasticity: string;
  competitorPrice: string;
  demandImpact: string;
  revenueImpact: string;
  color: string;
}

interface FunnelMonitor {
  id: string;
  stage: string;
  volume: string;
  conversionRate: string;
  dropOff: string;
  trend: 'up' | 'down' | 'stable';
  color: string;
}

interface ExecutiveKPI {
  id: string;
  metric: string;
  value: string;
  target: string;
  variance: string;
  trend: 'up' | 'down' | 'stable';
  color: string;
}

interface RecommendationItem {
  id: string;
  product: string;
  recommendation: string;
  confidence: number;
  lift: string;
  color: string;
}

const ECommerceCommandCenter = () => {
  const theme = useTheme();
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [activeTab, setActiveTab] = useState('dashboard');

  // Navigation Items
  const navigationItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'agents', label: 'AI Commerce Agents', icon: Bot },
    { id: 'sales', label: 'Sales Analytics', icon: BarChart3 },
    { id: 'marketing', label: 'Marketing & Ads', icon: Megaphone },
    { id: 'catalog', label: 'Product Catalog', icon: Package },
    { id: 'pricing', label: 'Pricing Engine', icon: Tag },
    { id: 'inventory', label: 'Inventory', icon: Warehouse },
    { id: 'orders', label: 'Orders & Fulfillment', icon: Truck },
    { id: 'customers', label: 'Customer Intelligence', icon: Users },
    { id: 'personalization', label: 'Personalization', icon: Sparkles },
    { id: 'fraud', label: 'Fraud & Risk', icon: Shield },
    { id: 'analytics', label: 'Analytics', icon: LineChart },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  // E-Commerce KPIs
  const ecommerceKPIs: ECommerceKPI[] = [
    { id: '1', title: 'Total Revenue', value: '$4.2B', change: '+18.4%', trend: 'up', color: '#10B981', subtitle: 'Last 30 days', icon: RevenueIcon },
    { id: '2', title: 'Conversion Rate', value: '3.8%', change: '+0.6%', trend: 'up', color: '#06B6D4', subtitle: 'Site-wide CR', icon: ConversionIcon },
    { id: '3', title: 'Average Order Value', value: '$142', change: '+8.2%', trend: 'up', color: '#8B5CF6', subtitle: 'AOV', icon: AOVIcon },
    { id: '4', title: 'Customer Acquisition Cost', value: '$28', change: '-5.4%', trend: 'down', color: '#F59E0B', subtitle: 'CAC', icon: DollarSign },
    { id: '5', title: 'Customer Lifetime Value', value: '$892', change: '+12.1%', trend: 'up', color: '#EC4899', subtitle: 'LTV', icon: CustomerIcon },
    { id: '6', title: 'Cart Abandonment Rate', value: '68.4%', change: '-2.3%', trend: 'down', color: '#EF4444', subtitle: 'Cart drop-off', icon: CartAbandonIcon },
    { id: '7', title: 'ROAS', value: '4.2x', change: '+0.8x', trend: 'up', color: '#10B981', subtitle: 'Return on Ad Spend', icon: ROASIcon },
    { id: '8', title: 'Gross Margin', value: '42.8%', change: '+1.2%', trend: 'up', color: '#06B6D4', subtitle: 'Margin', icon: GrossMarginIcon },
    { id: '9', title: 'Inventory Turnover', value: '8.4x', change: '+0.6x', trend: 'up', color: '#8B5CF6', subtitle: 'Annual turnover', icon: InventoryIcon },
    { id: '10', title: 'AI Revenue Uplift', value: '+$184M', change: '+22.4%', trend: 'up', color: '#10B981', subtitle: 'AI optimization impact', icon: AIUpliftIcon },
  ];

  // AI Commerce Agents
  const commerceAgents: CommerceAgent[] = [
    {
      id: '1',
      name: 'Agent Nova',
      specialty: 'Revenue Optimization Agent',
      avatar: '💰',
      status: 'active',
      confidenceScore: 98,
      revenueImpact: 92,
      metrics: {
        revenueManaged: '$2.8B',
        conversionLift: '+18%',
        optimizationActions: '842K',
      },
      activeInsights: 156,
      trend: 'up',
    },
    {
      id: '2',
      name: 'Agent Pulse',
      specialty: 'Customer Behavior Agent',
      avatar: '📊',
      status: 'active',
      confidenceScore: 96,
      revenueImpact: 85,
      metrics: {
        usersTracked: '48M',
        predictionsMade: '128M',
        accuracy: 96,
      },
      activeInsights: 234,
      trend: 'up',
    },
    {
      id: '3',
      name: 'Agent Prism',
      specialty: 'Pricing Intelligence Agent',
      avatar: '🏷️',
      status: 'active',
      confidenceScore: 94,
      revenueImpact: 88,
      metrics: {
        pricesOptimized: '82M SKUs',
        marginImprovement: '+14%',
      },
      activeInsights: 89,
      trend: 'stable',
    },
    {
      id: '4',
      name: 'Agent Velocity',
      specialty: 'Marketing Automation Agent',
      avatar: '🚀',
      status: 'active',
      confidenceScore: 95,
      revenueImpact: 90,
      metrics: {
        revenueManaged: '$1.2B',
        conversionLift: '+12%',
      },
      activeInsights: 178,
      trend: 'up',
    },
    {
      id: '5',
      name: 'Agent Scout',
      specialty: 'Inventory Forecasting Agent',
      avatar: '📦',
      status: 'active',
      confidenceScore: 93,
      revenueImpact: 82,
      metrics: {
        pricesOptimized: '156K SKUs',
        marginImprovement: '+8%',
        optimizationActions: '234K',
      },
      activeInsights: 67,
      trend: 'up',
    },
    {
      id: '6',
      name: 'Agent Shield',
      specialty: 'Fraud Detection Agent',
      avatar: '🛡️',
      status: 'active',
      confidenceScore: 97,
      revenueImpact: 78,
      metrics: {
        usersTracked: '24M',
        predictionsMade: '89M',
        accuracy: 99,
      },
      activeInsights: 45,
      trend: 'stable',
    },
    {
      id: '7',
      name: 'Agent Aura',
      specialty: 'Personalization Engine',
      avatar: '✨',
      status: 'active',
      confidenceScore: 95,
      revenueImpact: 87,
      metrics: {
        revenueManaged: '$890M',
        conversionLift: '+22%',
        optimizationActions: '567K',
      },
      activeInsights: 123,
      trend: 'up',
    },
    {
      id: '8',
      name: 'Agent Nexus',
      specialty: 'Supply Chain Optimizer',
      avatar: '🔗',
      status: 'active',
      confidenceScore: 92,
      revenueImpact: 75,
      metrics: {
        pricesOptimized: '45K Routes',
        marginImprovement: '+6%',
      },
      activeInsights: 34,
      trend: 'up',
    },
  ];

  // Funnel Stages
  const funnelStages: FunnelStage[] = [
    { id: '1', name: 'Visitors', value: 2800000, percentage: 100, dropoff: 0, color: '#06B6D4' },
    { id: '2', name: 'Product Views', value: 1680000, percentage: 60, dropoff: 40, color: '#8B5CF6' },
    { id: '3', name: 'Add to Cart', value: 840000, percentage: 30, dropoff: 50, color: '#EC4899' },
    { id: '4', name: 'Checkout Started', value: 504000, percentage: 18, dropoff: 40, color: '#F59E0B' },
    { id: '5', name: 'Payment Info', value: 336000, percentage: 12, dropoff: 33, color: '#F59E0B' },
    { id: '6', name: 'Purchase', value: 106400, percentage: 3.8, dropoff: 68, color: '#10B981' },
  ];

  // Ad Channels
  const adChannels: AdChannel[] = [
    { id: '1', name: 'Google Ads', spend: '$2.4M', revenue: '$8.2M', roas: '3.4x', conversions: '284K', trend: 'up', color: '#4285F4' },
    { id: '2', name: 'Meta Ads', spend: '$1.8M', revenue: '$6.8M', roas: '3.8x', conversions: '242K', trend: 'up', color: '#1877F2' },
    { id: '3', name: 'TikTok Ads', spend: '$840K', revenue: '$2.1M', roas: '2.5x', conversions: '89K', trend: 'down', color: '#000000' },
    { id: '4', name: 'Amazon Ads', spend: '$1.2M', revenue: '$4.8M', roas: '4.0x', conversions: '168K', trend: 'up', color: '#FF9900' },
    { id: '5', name: 'LinkedIn Ads', spend: '$620K', revenue: '$1.8M', roas: '2.9x', conversions: '45K', trend: 'up', color: '#0A66C2' },
    { id: '6', name: 'YouTube Ads', spend: '$980K', revenue: '$3.2M', roas: '3.3x', conversions: '124K', trend: 'up', color: '#FF0000' },
    { id: '7', name: 'Pinterest Ads', spend: '$340K', revenue: '$890K', roas: '2.6x', conversions: '34K', trend: 'stable', color: '#E60023' },
    { id: '8', name: 'Snapchat Ads', spend: '$280K', revenue: '$620K', roas: '2.2x', conversions: '28K', trend: 'down', color: '#FFFC00' },
  ];

  // Product Items
  const productItems: ProductItem[] = [
    { id: '1', name: 'Smart Watch Pro', sku: 'SWP-001', revenue: '$8.4M', orders: '84K', trend: 'up', status: 'trending', stock: 12400 },
    { id: '2', name: 'Wireless Earbuds', sku: 'WE-002', revenue: '$6.2M', orders: '124K', trend: 'up', status: 'trending', stock: 8900 },
    { id: '3', name: 'Power Bank Ultra', sku: 'PBU-003', revenue: '$4.8M', orders: '96K', trend: 'stable', status: 'stable', stock: 15600 },
    { id: '4', name: 'Phone Case Premium', sku: 'PCP-004', revenue: '$2.1M', orders: '210K', trend: 'down', status: 'declining', stock: 42000 },
    { id: '5', name: 'USB-C Hub Pro', sku: 'UCH-005', revenue: '$3.6M', orders: '72K', trend: 'up', status: 'trending', stock: 9800 },
    { id: '6', name: 'Laptop Stand Ergo', sku: 'LSE-006', revenue: '$1.8M', orders: '45K', trend: 'up', status: 'trending', stock: 6700 },
    { id: '7', name: 'Wireless Charger Fast', sku: 'WCF-007', revenue: '$2.9M', orders: '58K', trend: 'stable', status: 'stable', stock: 11200 },
    { id: '8', name: 'Bluetooth Speaker Mini', sku: 'BSM-008', revenue: '$1.4M', orders: '35K', trend: 'down', status: 'declining', stock: 8400 },
  ];

  // Pricing Data
  const pricingData: PricingData[] = [
    { id: '1', product: 'Smart Watch Pro', currentPrice: '$299', optimalPrice: '$319', elasticity: '-1.2', competitorPrice: '$289', recommendation: 'Increase price', impact: '+$840K' },
    { id: '2', product: 'Wireless Earbuds', currentPrice: '$79', optimalPrice: '$89', elasticity: '-0.8', competitorPrice: '$84', recommendation: 'Increase price', impact: '+$620K' },
    { id: '3', product: 'Power Bank Ultra', currentPrice: '$49', optimalPrice: '$44', elasticity: '-1.5', competitorPrice: '$39', recommendation: 'Decrease price', impact: '+$480K' },
    { id: '4', product: 'USB-C Hub Pro', currentPrice: '$69', optimalPrice: '$74', elasticity: '-1.0', competitorPrice: '$64', recommendation: 'Increase price', impact: '+$360K' },
    { id: '5', product: 'Laptop Stand Ergo', currentPrice: '$45', optimalPrice: '$42', elasticity: '-1.3', competitorPrice: '$38', recommendation: 'Decrease price', impact: '+$180K' },
    { id: '6', product: 'Wireless Charger Fast', currentPrice: '$39', optimalPrice: '$44', elasticity: '-0.9', competitorPrice: '$35', recommendation: 'Increase price', impact: '+$290K' },
  ];

  // Inventory Items
  const inventoryItems: InventoryItem[] = [
    { id: '1', product: 'Smart Watch Pro', sku: 'SWP-001', currentStock: 12400, reorderPoint: 5000, warehouse: 'US-East', status: 'healthy', daysOfSupply: 45 },
    { id: '2', product: 'Wireless Earbuds', sku: 'WE-002', currentStock: 8900, reorderPoint: 8000, warehouse: 'EU-West', status: 'low', daysOfSupply: 12 },
    { id: '3', product: 'Power Bank Ultra', sku: 'PBU-003', currentStock: 15600, reorderPoint: 10000, warehouse: 'Asia-Pacific', status: 'healthy', daysOfSupply: 62 },
    { id: '4', product: 'Phone Case Premium', sku: 'PCP-004', currentStock: 42000, reorderPoint: 15000, warehouse: 'US-West', status: 'overstocked', daysOfSupply: 180 },
    { id: '5', product: 'USB-C Hub Pro', sku: 'UCH-005', currentStock: 6700, reorderPoint: 4000, warehouse: 'US-East', status: 'healthy', daysOfSupply: 38 },
    { id: '6', product: 'Laptop Stand Ergo', sku: 'LSE-006', currentStock: 3400, reorderPoint: 3000, warehouse: 'EU-Central', status: 'low', daysOfSupply: 8 },
    { id: '7', product: 'Wireless Charger Fast', sku: 'WCF-007', currentStock: 8900, reorderPoint: 5000, warehouse: 'Asia-South', status: 'healthy', daysOfSupply: 52 },
    { id: '8', product: 'Bluetooth Speaker Mini', sku: 'BSM-008', currentStock: 5600, reorderPoint: 4000, warehouse: 'US-West', status: 'healthy', daysOfSupply: 41 },
  ];

  // Customer Segments
  const customerSegments: CustomerSegment[] = [
    { id: '1', name: 'High Value Customers', count: '284K', clv: '$2,840', retention: '94%', churnRisk: 'Low', color: '#10B981' },
    { id: '2', name: 'Regular Shoppers', count: '1.2M', clv: '$420', retention: '78%', churnRisk: 'Medium', color: '#06B6D4' },
    { id: '3', name: 'New Customers', count: '842K', clv: '$89', retention: '42%', churnRisk: 'High', color: '#F59E0B' },
    { id: '4', name: 'At-Risk Customers', count: '156K', clv: '$620', retention: '28%', churnRisk: 'Critical', color: '#EF4444' },
    { id: '5', name: 'VIP Members', count: '45K', clv: '$4,200', retention: '98%', churnRisk: 'Very Low', color: '#8B5CF6' },
    { id: '6', name: 'Seasonal Buyers', count: '680K', clv: '$180', retention: '35%', churnRisk: 'High', color: '#EC4899' },
  ];

  // Personalization Metrics
  const personalizationMetrics: PersonalizationMetric[] = [
    { id: '1', type: 'Product Recommendations', accuracy: 94, lift: '+28%', revenue: '$12.4M', color: '#06B6D4' },
    { id: '2', type: 'Homepage Personalization', accuracy: 89, lift: '+18%', revenue: '$6.8M', color: '#8B5CF6' },
    { id: '3', type: 'Email Personalization', accuracy: 86, lift: '+22%', revenue: '$4.2M', color: '#EC4899' },
    { id: '4', type: 'On-site AI Suggestions', accuracy: 92, lift: '+15%', revenue: '$3.8M', color: '#10B981' },
    { id: '5', type: 'Search Results Ranking', accuracy: 91, lift: '+12%', revenue: '$2.9M', color: '#F59E0B' },
    { id: '6', type: 'Dynamic Content Blocks', accuracy: 88, lift: '+20%', revenue: '$5.6M', color: '#06B6D4' },
  ];

  // Fraud Alerts
  const fraudAlerts: FraudAlert[] = [
    { id: '1', type: 'Suspicious Transaction Pattern', severity: 'high', amount: '$12,400', status: 'investigating', timestamp: '5m ago' },
    { id: '2', type: 'Account Takeover Attempt', severity: 'high', amount: '$8,200', status: 'detected', timestamp: '12m ago' },
    { id: '3', type: 'Card Testing Attack', severity: 'medium', amount: '$2,100', status: 'resolved', timestamp: '28m ago' },
    { id: '4', type: 'IP Velocity Anomaly', severity: 'medium', amount: '$4,800', status: 'investigating', timestamp: '45m ago' },
    { id: '5', type: 'Promo Abuse Pattern', severity: 'low', amount: '$1,200', status: 'resolved', timestamp: '1h ago' },
    { id: '6', type: 'Device Fingerprint Mismatch', severity: 'high', amount: '$15,600', status: 'detected', timestamp: '2h ago' },
  ];

  // Commerce Insights
  const commerceInsights: CommerceInsight[] = [
    { id: '1', insight: 'Cart abandonment increased by 12% in mobile users. Checkout flow optimization recommended.', category: 'Conversion', confidence: 94, impact: 'high', timestamp: '2h ago', action: 'Optimize mobile checkout' },
    { id: '2', insight: 'High ROI audience segment identified in Gen Z buyers. Targeted campaign could increase revenue by 18%.', category: 'Marketing', confidence: 89, impact: 'high', timestamp: '4h ago', action: 'Launch Gen Z campaign' },
    { id: '3', insight: 'Product pricing adjustment for Smart Watch Pro could increase revenue by 9% with optimal price of $319.', category: 'Pricing', confidence: 92, impact: 'high', timestamp: '6h ago', action: 'Adjust pricing' },
    { id: '4', insight: 'Inventory risk detected for top-selling SKU in EU region. Reorder recommended within 7 days.', category: 'Inventory', confidence: 96, impact: 'high', timestamp: '8h ago', action: 'Place reorder' },
    { id: '5', insight: 'Ad spend inefficiency detected in social campaigns. Reallocation could improve ROAS by 22%.', category: 'Marketing', confidence: 87, impact: 'medium', timestamp: '12h ago', action: 'Reallocate budget' },
    { id: '6', insight: 'Cross-sell opportunity identified: 34% of Wireless Earbuds buyers also view Power Bank Ultra. Bundle recommended.', category: 'Revenue', confidence: 91, impact: 'high', timestamp: '16h ago', action: 'Create product bundle' },
    { id: '7', insight: 'Customer retention campaign for VIP members showing 23% lift in repeat purchases. Expand to similar segments.', category: 'Retention', confidence: 88, impact: 'medium', timestamp: '24h ago', action: 'Expand retention program' },
    { id: '8', insight: 'Seasonal demand forecast predicts 45% increase in USB-C Hub Pro sales next quarter. Stock up recommended.', category: 'Inventory', confidence: 93, impact: 'high', timestamp: '28h ago', action: 'Increase inventory' },
    { id: '9', insight: 'Payment gateway latency increased by 15ms on weekends. Consider load balancing optimization.', category: 'Infrastructure', confidence: 85, impact: 'medium', timestamp: '36h ago', action: 'Optimize load balancing' },
    { id: '10', insight: 'Personalization engine accuracy improved to 94% after model retraining. Revenue impact: +$2.4M monthly.', category: 'AI', confidence: 97, impact: 'high', timestamp: '48h ago', action: 'Schedule regular retraining' },
  ];

  // Commerce Activities
  const commerceActivities: CommerceActivity[] = [
    { id: '1', event: 'Order #842910 placed', type: 'order', timestamp: '1m ago', details: '$299 - Smart Watch Pro' },
    { id: '2', event: 'Payment confirmed', type: 'payment', timestamp: '2m ago', details: 'Order #842909 - $79' },
    { id: '3', event: 'Cart abandoned', type: 'cart', timestamp: '3m ago', details: '2 items - $178' },
    { id: '4', event: 'Ad campaign optimized', type: 'ad', timestamp: '5m ago', details: 'Google Ads - ROAS +12%' },
    { id: '5', event: 'Price updated', type: 'price', timestamp: '8m ago', details: 'Wireless Earbuds - $79 → $89' },
    { id: '6', event: 'Product trending', type: 'product', timestamp: '12m ago', details: 'Smart Watch Pro +42% views' },
    { id: '7', event: 'Inventory updated', type: 'inventory', timestamp: '15m ago', details: 'Wireless Earbuds - 8,900 units' },
  ];

  // System Health
  const systemHealth: SystemHealth[] = [
    { id: '1', system: 'API Performance', status: 'healthy', uptime: '99.9%', latency: '32ms', throughput: '8.4K req/s' },
    { id: '2', system: 'Payment Gateways', status: 'healthy', uptime: '99.8%', latency: '28ms', throughput: '2.1K tx/s' },
    { id: '3', system: 'Checkout Systems', status: 'healthy', uptime: '99.9%', latency: '45ms', throughput: '1.8K chk/s' },
    { id: '4', system: 'Recommendation Engine', status: 'healthy', uptime: '99.7%', latency: '68ms', throughput: '4.2K rec/s' },
    { id: '5', system: 'AI Systems', status: 'healthy', uptime: '99.9%', latency: '52ms', throughput: '128K req/s' },
    { id: '6', system: 'Database Cluster', status: 'healthy', uptime: '99.95%', latency: '18ms', throughput: '12.4K q/s' },
    { id: '7', system: 'CDN Network', status: 'healthy', uptime: '99.98%', latency: '24ms', throughput: '45.6GB/s' },
    { id: '8', system: 'Search Service', status: 'degraded', uptime: '99.2%', latency: '85ms', throughput: '3.2K q/s' },
  ];

  // Global Commerce Regions
  const commerceRegions: CommerceRegion[] = [
    { id: '1', region: 'North America', revenue: '$1.8B', orders: '840K', growth: '+22%', color: '#10B981' },
    { id: '2', region: 'Europe', revenue: '$1.2B', orders: '560K', growth: '+18%', color: '#06B6D4' },
    { id: '3', region: 'Asia Pacific', revenue: '$890M', orders: '340K', growth: '+28%', color: '#8B5CF6' },
    { id: '4', region: 'Latin America', revenue: '$210M', orders: '84K', growth: '+15%', color: '#EC4899' },
    { id: '5', region: 'Middle East', revenue: '$84M', orders: '34K', growth: '+12%', color: '#F59E0B' },
    { id: '6', region: 'Africa', revenue: '$16M', orders: '12K', growth: '+8%', color: '#EF4444' },
  ];

  // Revenue Flow Sources
  const revenueFlow: RevenueFlow[] = [
    { id: '1', source: 'Direct Traffic', amount: '$1.4B', trend: 'up', percentage: 33, color: '#10B981' },
    { id: '2', source: 'Paid Search', amount: '$890M', trend: 'up', percentage: 21, color: '#06B6D4' },
    { id: '3', source: 'Social Media', amount: '$680M', trend: 'up', percentage: 16, color: '#8B5CF6' },
    { id: '4', source: 'Email Marketing', amount: '$520M', trend: 'stable', percentage: 12, color: '#EC4899' },
    { id: '5', source: 'Affiliate', amount: '$340M', trend: 'up', percentage: 8, color: '#F59E0B' },
    { id: '6', source: 'Organic Search', amount: '$280M', trend: 'down', percentage: 7, color: '#EF4444' },
    { id: '7', source: 'Referral', amount: '$90M', trend: 'stable', percentage: 3, color: '#6B7280' },
  ];

  // Customer Journey Stages
  const journeyStages: JourneyStage[] = [
    { id: '1', stage: 'Awareness', users: '2.8M', time: '0-24h', conversion: '100%', color: '#06B6D4' },
    { id: '2', stage: 'Consideration', users: '1.68M', time: '1-3d', conversion: '60%', color: '#8B5CF6' },
    { id: '3', stage: 'Intent', users: '840K', time: '3-7d', conversion: '30%', color: '#EC4899' },
    { id: '4', stage: 'Evaluation', users: '504K', time: '7-14d', conversion: '18%', color: '#F59E0B' },
    { id: '5', stage: 'Purchase', users: '106K', time: '14-30d', conversion: '3.8%', color: '#10B981' },
  ];

  // Demand Forecasts
  const demandForecasts: DemandForecast[] = [
    { id: '1', product: 'Smart Watch Pro', currentDemand: '84K', forecastDemand: '112K', growth: '+33%', confidence: 94, color: '#10B981' },
    { id: '2', product: 'Wireless Earbuds', currentDemand: '124K', forecastDemand: '156K', growth: '+26%', confidence: 91, color: '#06B6D4' },
    { id: '3', product: 'USB-C Hub Pro', currentDemand: '72K', forecastDemand: '98K', growth: '+36%', confidence: 88, color: '#8B5CF6' },
    { id: '4', product: 'Wireless Charger Fast', currentDemand: '58K', forecastDemand: '78K', growth: '+34%', confidence: 92, color: '#EC4899' },
    { id: '5', product: 'Laptop Stand Ergo', currentDemand: '45K', forecastDemand: '62K', growth: '+38%', confidence: 85, color: '#F59E0B' },
  ];

  // Attribution Channels
  const attributionChannels: AttributionChannel[] = [
    { id: '1', channel: 'Google Ads', touchpoints: '2.4M', conversions: '284K', revenue: '$8.2M', attribution: '34%', color: '#4285F4' },
    { id: '2', channel: 'Meta Ads', touchpoints: '1.8M', conversions: '242K', revenue: '$6.8M', attribution: '28%', color: '#1877F2' },
    { id: '3', channel: 'Email', touchpoints: '3.2M', conversions: '198K', revenue: '$5.6M', attribution: '18%', color: '#10B981' },
    { id: '4', channel: 'Direct', touchpoints: '1.4M', conversions: '156K', revenue: '$4.2M', attribution: '12%', color: '#8B5CF6' },
    { id: '5', channel: 'Organic Search', touchpoints: '890K', conversions: '89K', revenue: '$2.4M', attribution: '8%', color: '#06B6D4' },
  ];

  // Pricing Optimizations
  const pricingOptimizations: PricingOptimization[] = [
    { id: '1', product: 'Smart Watch Pro', currentPrice: '$299', optimalPrice: '$319', elasticity: '-1.2', competitorPrice: '$289', demandImpact: '-8%', revenueImpact: '+$840K', color: '#10B981' },
    { id: '2', product: 'Wireless Earbuds', currentPrice: '$79', optimalPrice: '$89', elasticity: '-0.8', competitorPrice: '$84', demandImpact: '-12%', revenueImpact: '+$620K', color: '#06B6D4' },
    { id: '3', product: 'USB-C Hub Pro', currentPrice: '$69', optimalPrice: '$74', elasticity: '-1.0', competitorPrice: '$64', demandImpact: '-10%', revenueImpact: '+$360K', color: '#8B5CF6' },
    { id: '4', product: 'Wireless Charger Fast', currentPrice: '$39', optimalPrice: '$44', elasticity: '-0.9', competitorPrice: '$35', demandImpact: '-15%', revenueImpact: '+$290K', color: '#EC4899' },
  ];

  // Funnel Monitors
  const funnelMonitors: FunnelMonitor[] = [
    { id: '1', stage: 'Visitors', volume: '2.8M', conversionRate: '100%', dropOff: '0%', trend: 'up', color: '#06B6D4' },
    { id: '2', stage: 'Product Views', volume: '1.68M', conversionRate: '60%', dropOff: '40%', trend: 'up', color: '#8B5CF6' },
    { id: '3', stage: 'Add to Cart', volume: '840K', conversionRate: '30%', dropOff: '50%', trend: 'stable', color: '#EC4899' },
    { id: '4', stage: 'Checkout Started', volume: '504K', conversionRate: '18%', dropOff: '40%', trend: 'down', color: '#F59E0B' },
    { id: '5', stage: 'Payment Info', volume: '336K', conversionRate: '12%', dropOff: '33%', trend: 'stable', color: '#F59E0B' },
    { id: '6', stage: 'Purchase', volume: '106K', conversionRate: '3.8%', dropOff: '68%', trend: 'up', color: '#10B981' },
  ];

  // Executive KPIs
  const executiveKPIs: ExecutiveKPI[] = [
    { id: '1', metric: 'Total Revenue', value: '$4.2B', target: '$4.0B', variance: '+5%', trend: 'up', color: '#10B981' },
    { id: '2', metric: 'Conversion Rate', value: '3.8%', target: '3.5%', variance: '+8.6%', trend: 'up', color: '#06B6D4' },
    { id: '3', metric: 'AOV', value: '$142', target: '$135', variance: '+5.2%', trend: 'up', color: '#8B5CF6' },
    { id: '4', metric: 'CAC', value: '$28', target: '$30', variance: '-6.7%', trend: 'down', color: '#10B981' },
    { id: '5', metric: 'LTV', value: '$482', target: '$450', variance: '+7.1%', trend: 'up', color: '#EC4899' },
    { id: '6', metric: 'ROAS', value: '4.2x', target: '4.0x', variance: '+5%', trend: 'up', color: '#F59E0B' },
    { id: '7', metric: 'Gross Margin', value: '42%', target: '40%', variance: '+5%', trend: 'up', color: '#10B981' },
    { id: '8', metric: 'Cart Abandonment', value: '68%', target: '70%', variance: '-2.9%', trend: 'down', color: '#10B981' },
  ];

  // Recommendation Items
  const recommendationItems: RecommendationItem[] = [
    { id: '1', product: 'Smart Watch Pro', recommendation: 'Cross-sell with Wireless Earbuds', confidence: 92, lift: '+24%', color: '#10B981' },
    { id: '2', product: 'Wireless Earbuds', recommendation: 'Bundle with USB-C Hub', confidence: 88, lift: '+18%', color: '#06B6D4' },
    { id: '3', product: 'USB-C Hub Pro', recommendation: 'Upsell to Laptop Stand', confidence: 85, lift: '+15%', color: '#8B5CF6' },
    { id: '4', product: 'Wireless Charger Fast', recommendation: 'Cross-sell with Phone Case', confidence: 82, lift: '+12%', color: '#EC4899' },
  ];

  // Render Functions
  const renderKPICard = (kpi: ECommerceKPI) => {
    const Icon = kpi.icon;
    return (
      <View key={kpi.id} style={[styles.kpiCard, { backgroundColor: 'rgba(255,255,255,0.03)', borderColor: kpi.color + '30' }]}>
        <View style={styles.kpiHeader}>
          <View style={styles.kpiIconContainer}>
            <Icon size={20} color={kpi.color} />
          </View>
          <Text style={[styles.kpiTitle, { color: 'rgba(255,255,255,0.7)' }]}>{kpi.title}</Text>
        </View>
        <View style={styles.kpiValueContainer}>
          <Text style={[styles.kpiValue, { color: kpi.color }]}>{kpi.value}</Text>
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
        <Text style={[styles.kpiSubtitle, { color: 'rgba(255,255,255,0.5)' }]}>{kpi.subtitle}</Text>
      </View>
    );
  };

  const renderAgentCard = (agent: CommerceAgent) => (
    <View key={agent.id} style={[styles.agentCard, { backgroundColor: 'rgba(255,255,255,0.03)', borderColor: agent.status === 'active' ? '#06B6D4' + '30' : '#6B7280' + '30' }]}>
      <View style={styles.agentAvatar}>
        <Text style={styles.agentAvatarText}>{agent.avatar}</Text>
        <View style={[
          styles.agentStatusDot,
          { backgroundColor: agent.status === 'active' ? '#10B981' : agent.status === 'error' ? '#EF4444' : '#6B7280' }
        ]} />
      </View>
      <View style={styles.agentInfo}>
        <Text style={[styles.agentName, { color: '#FFFFFF' }]}>{agent.name}</Text>
        <Text style={[styles.agentSpecialty, { color: 'rgba(255,255,255,0.6)' }]}>{agent.specialty}</Text>
      </View>
      <View style={styles.agentMetrics}>
        <View style={styles.agentMetric}>
          <Text style={[styles.agentMetricValue, { color: '#06B6D4' }]}>{agent.confidenceScore}%</Text>
          <Text style={[styles.agentMetricLabel, { color: 'rgba(255,255,255,0.5)' }]}>Confidence</Text>
        </View>
        <View style={styles.agentMetric}>
          <Text style={[styles.agentMetricValue, { color: '#10B981' }]}>{agent.revenueImpact}</Text>
          <Text style={[styles.agentMetricLabel, { color: 'rgba(255,255,255,0.5)' }]}>Impact</Text>
        </View>
      </View>
      <View style={styles.agentInsights}>
        <Text style={[styles.agentInsightsCount, { color: '#8B5CF6' }]}>{agent.activeInsights}</Text>
        <Text style={[styles.agentInsightsLabel, { color: 'rgba(255,255,255,0.5)' }]}>Insights</Text>
      </View>
    </View>
  );

  const renderFunnelStage = (stage: FunnelStage, index: number) => (
    <View key={stage.id} style={styles.funnelStage}>
      <View style={styles.funnelStageInfo}>
        <Text style={[styles.funnelStageName, { color: '#FFFFFF' }]}>{stage.name}</Text>
        <Text style={[styles.funnelStageValue, { color: stage.color }]}>{stage.value.toLocaleString()}</Text>
        <Text style={[styles.funnelStagePercentage, { color: 'rgba(255,255,255,0.6)' }]}>{stage.percentage}%</Text>
      </View>
      <View style={[
        styles.funnelBar,
        { 
          width: `${stage.percentage}%`,
          backgroundColor: stage.color,
          opacity: 1 - (index * 0.15)
        }
      ]} />
      {stage.dropoff > 0 && (
        <Text style={[styles.funnelDropoff, { color: '#EF4444' }]}>-{stage.dropoff}%</Text>
      )}
    </View>
  );

  const renderAdChannel = (channel: AdChannel) => (
    <View key={channel.id} style={[styles.adChannelCard, { backgroundColor: 'rgba(255,255,255,0.03)', borderColor: channel.color + '30' }]}>
      <View style={styles.adChannelHeader}>
        <View style={[styles.adChannelDot, { backgroundColor: channel.color }]} />
        <Text style={[styles.adChannelName, { color: '#FFFFFF' }]}>{channel.name}</Text>
        <View style={[
          styles.adChannelTrend,
          { backgroundColor: channel.trend === 'up' ? 'rgba(16, 185, 129, 0.2)' : channel.trend === 'down' ? 'rgba(239, 68, 68, 0.2)' : 'rgba(107, 114, 128, 0.2)' }
        ]}>
          {channel.trend === 'up' ? <TrendingUp size={12} color="#10B981" /> : 
           channel.trend === 'down' ? <TrendingDown size={12} color="#EF4444" /> : 
           <Activity size={12} color="rgba(255,255,255,0.6)" />}
        </View>
      </View>
      <View style={styles.adChannelMetrics}>
        <View style={styles.adChannelMetric}>
          <Text style={[styles.adChannelMetricValue, { color: '#FFFFFF' }]}>{channel.spend}</Text>
          <Text style={[styles.adChannelMetricLabel, { color: 'rgba(255,255,255,0.5)' }]}>Spend</Text>
        </View>
        <View style={styles.adChannelMetric}>
          <Text style={[styles.adChannelMetricValue, { color: '#10B981' }]}>{channel.revenue}</Text>
          <Text style={[styles.adChannelMetricLabel, { color: 'rgba(255,255,255,0.5)' }]}>Revenue</Text>
        </View>
        <View style={styles.adChannelMetric}>
          <Text style={[styles.adChannelMetricValue, { color: '#06B6D4' }]}>{channel.roas}</Text>
          <Text style={[styles.adChannelMetricLabel, { color: 'rgba(255,255,255,0.5)' }]}>ROAS</Text>
        </View>
        <View style={styles.adChannelMetric}>
          <Text style={[styles.adChannelMetricValue, { color: '#8B5CF6' }]}>{channel.conversions}</Text>
          <Text style={[styles.adChannelMetricLabel, { color: 'rgba(255,255,255,0.5)' }]}>Conversions</Text>
        </View>
      </View>
    </View>
  );

  const renderProductItem = (product: ProductItem) => (
    <View key={product.id} style={[styles.productCard, { backgroundColor: 'rgba(255,255,255,0.03)', borderColor: product.status === 'trending' ? '#10B981' + '30' : product.status === 'declining' ? '#EF4444' + '30' : '#6B7280' + '30' }]}>
      <View style={styles.productInfo}>
        <Text style={[styles.productName, { color: '#FFFFFF' }]}>{product.name}</Text>
        <Text style={[styles.productSKU, { color: 'rgba(255,255,255,0.5)' }]}>{product.sku}</Text>
      </View>
      <View style={styles.productMetrics}>
        <View style={styles.productMetric}>
          <Text style={[styles.productMetricValue, { color: '#10B981' }]}>{product.revenue}</Text>
          <Text style={[styles.productMetricLabel, { color: 'rgba(255,255,255,0.5)' }]}>Revenue</Text>
        </View>
        <View style={styles.productMetric}>
          <Text style={[styles.productMetricValue, { color: '#06B6D4' }]}>{product.orders}</Text>
          <Text style={[styles.productMetricLabel, { color: 'rgba(255,255,255,0.5)' }]}>Orders</Text>
        </View>
        <View style={styles.productMetric}>
          <Text style={[styles.productMetricValue, { color: '#8B5CF6' }]}>{product.stock.toLocaleString()}</Text>
          <Text style={[styles.productMetricLabel, { color: 'rgba(255,255,255,0.5)' }]}>Stock</Text>
        </View>
      </View>
      <View style={[
        styles.productStatusBadge,
        { backgroundColor: product.status === 'trending' ? 'rgba(16, 185, 129, 0.2)' : product.status === 'declining' ? 'rgba(239, 68, 68, 0.2)' : 'rgba(107, 114, 128, 0.2)' }
      ]}>
        <Text style={[
          styles.productStatusText,
          { color: product.status === 'trending' ? '#10B981' : product.status === 'declining' ? '#EF4444' : '#6B7280' }
        ]}>{product.status}</Text>
      </View>
    </View>
  );

  const renderPricingData = (data: PricingData) => (
    <View key={data.id} style={[styles.pricingCard, { backgroundColor: 'rgba(255,255,255,0.03)', borderColor: '#06B6D4' + '30' }]}>
      <View style={styles.pricingInfo}>
        <Text style={[styles.pricingProduct, { color: '#FFFFFF' }]}>{data.product}</Text>
        <View style={styles.pricingPrices}>
          <View style={styles.pricingPrice}>
            <Text style={[styles.pricingPriceLabel, { color: 'rgba(255,255,255,0.5)' }]}>Current</Text>
            <Text style={[styles.pricingPriceValue, { color: 'rgba(255,255,255,0.7)' }]}>{data.currentPrice}</Text>
          </View>
          <ArrowUpRight size={16} color="#10B981" />
          <View style={styles.pricingPrice}>
            <Text style={[styles.pricingPriceLabel, { color: 'rgba(255,255,255,0.5)' }]}>Optimal</Text>
            <Text style={[styles.pricingPriceValue, { color: '#10B981' }]}>{data.optimalPrice}</Text>
          </View>
        </View>
      </View>
      <View style={styles.pricingMetrics}>
        <View style={styles.pricingMetric}>
          <Text style={[styles.pricingMetricValue, { color: '#06B6D4' }]}>{data.elasticity}</Text>
          <Text style={[styles.pricingMetricLabel, { color: 'rgba(255,255,255,0.5)' }]}>Elasticity</Text>
        </View>
        <View style={styles.pricingMetric}>
          <Text style={[styles.pricingMetricValue, { color: '#8B5CF6' }]}>{data.competitorPrice}</Text>
          <Text style={[styles.pricingMetricLabel, { color: 'rgba(255,255,255,0.5)' }]}>Competitor</Text>
        </View>
        <View style={styles.pricingMetric}>
          <Text style={[styles.pricingMetricValue, { color: '#10B981' }]}>{data.impact}</Text>
          <Text style={[styles.pricingMetricLabel, { color: 'rgba(255,255,255,0.5)' }]}>Impact</Text>
        </View>
      </View>
      <View style={[styles.pricingRecommendation, { backgroundColor: 'rgba(6, 182, 212, 0.1)' }]}>
        <Lightbulb size={14} color="#06B6D4" />
        <Text style={[styles.pricingRecommendationText, { color: '#06B6D4' }]}>{data.recommendation}</Text>
      </View>
    </View>
  );

  const renderInventoryItem = (item: InventoryItem) => (
    <View key={item.id} style={[styles.inventoryCard, { backgroundColor: 'rgba(255,255,255,0.03)', borderColor: item.status === 'healthy' ? '#10B981' + '30' : item.status === 'low' ? '#F59E0B' + '30' : item.status === 'critical' ? '#EF4444' + '30' : '#8B5CF6' + '30' }]}>
      <View style={styles.inventoryInfo}>
        <Text style={[styles.inventoryProduct, { color: '#FFFFFF' }]}>{item.product}</Text>
        <Text style={[styles.inventorySKU, { color: 'rgba(255,255,255,0.5)' }]}>{item.sku}</Text>
      </View>
      <View style={styles.inventoryMetrics}>
        <View style={styles.inventoryMetric}>
          <Text style={[styles.inventoryMetricValue, { color: item.status === 'healthy' ? '#10B981' : item.status === 'low' ? '#F59E0B' : item.status === 'critical' ? '#EF4444' : '#8B5CF6' }]}>{item.currentStock.toLocaleString()}</Text>
          <Text style={[styles.inventoryMetricLabel, { color: 'rgba(255,255,255,0.5)' }]}>Stock</Text>
        </View>
        <View style={styles.inventoryMetric}>
          <Text style={[styles.inventoryMetricValue, { color: '#06B6D4' }]}>{item.reorderPoint.toLocaleString()}</Text>
          <Text style={[styles.inventoryMetricLabel, { color: 'rgba(255,255,255,0.5)' }]}>Reorder</Text>
        </View>
        <View style={styles.inventoryMetric}>
          <Text style={[styles.inventoryMetricValue, { color: '#8B5CF6' }]}>{item.daysOfSupply}d</Text>
          <Text style={[styles.inventoryMetricLabel, { color: 'rgba(255,255,255,0.5)' }]}>Supply</Text>
        </View>
      </View>
      <View style={styles.inventoryLocation}>
        <MapPin size={14} color="rgba(255,255,255,0.5)" />
        <Text style={[styles.inventoryWarehouse, { color: 'rgba(255,255,255,0.5)' }]}>{item.warehouse}</Text>
      </View>
      <View style={[
        styles.inventoryStatusBadge,
        { backgroundColor: item.status === 'healthy' ? 'rgba(16, 185, 129, 0.2)' : item.status === 'low' ? 'rgba(245, 158, 11, 0.2)' : item.status === 'critical' ? 'rgba(239, 68, 68, 0.2)' : 'rgba(139, 92, 246, 0.2)' }
      ]}>
        <Text style={[
          styles.inventoryStatusText,
          { color: item.status === 'healthy' ? '#10B981' : item.status === 'low' ? '#F59E0B' : item.status === 'critical' ? '#EF4444' : '#8B5CF6' }
        ]}>{item.status}</Text>
      </View>
    </View>
  );

  const renderCustomerSegment = (segment: CustomerSegment) => (
    <View key={segment.id} style={[styles.segmentCard, { backgroundColor: 'rgba(255,255,255,0.03)', borderColor: segment.color + '30' }]}>
      <View style={[styles.segmentDot, { backgroundColor: segment.color }]} />
      <View style={styles.segmentInfo}>
        <Text style={[styles.segmentName, { color: '#FFFFFF' }]}>{segment.name}</Text>
        <Text style={[styles.segmentCount, { color: 'rgba(255,255,255,0.6)' }]}>{segment.count} customers</Text>
      </View>
      <View style={styles.segmentMetrics}>
        <View style={styles.segmentMetric}>
          <Text style={[styles.segmentMetricValue, { color: '#10B981' }]}>{segment.clv}</Text>
          <Text style={[styles.segmentMetricLabel, { color: 'rgba(255,255,255,0.5)' }]}>CLV</Text>
        </View>
        <View style={styles.segmentMetric}>
          <Text style={[styles.segmentMetricValue, { color: '#06B6D4' }]}>{segment.retention}</Text>
          <Text style={[styles.segmentMetricLabel, { color: 'rgba(255,255,255,0.5)' }]}>Retention</Text>
        </View>
        <View style={styles.segmentMetric}>
          <Text style={[styles.segmentMetricValue, { color: segment.churnRisk === 'Low' ? '#10B981' : segment.churnRisk === 'Medium' ? '#F59E0B' : '#EF4444' }]}>{segment.churnRisk}</Text>
          <Text style={[styles.segmentMetricLabel, { color: 'rgba(255,255,255,0.5)' }]}>Churn Risk</Text>
        </View>
      </View>
    </View>
  );

  const renderPersonalizationMetric = (metric: PersonalizationMetric) => (
    <View key={metric.id} style={[styles.personalizationCard, { backgroundColor: 'rgba(255,255,255,0.03)', borderColor: metric.color + '30' }]}>
      <View style={styles.personalizationInfo}>
        <Text style={[styles.personalizationType, { color: '#FFFFFF' }]}>{metric.type}</Text>
        <View style={styles.personalizationMetrics}>
          <View style={styles.personalizationMetric}>
            <Text style={[styles.personalizationMetricValue, { color: metric.color }]}>{metric.accuracy}%</Text>
            <Text style={[styles.personalizationMetricLabel, { color: 'rgba(255,255,255,0.5)' }]}>Accuracy</Text>
          </View>
          <View style={styles.personalizationMetric}>
            <Text style={[styles.personalizationMetricValue, { color: '#10B981' }]}>{metric.lift}</Text>
            <Text style={[styles.personalizationMetricLabel, { color: 'rgba(255,255,255,0.5)' }]}>Lift</Text>
          </View>
          <View style={styles.personalizationMetric}>
            <Text style={[styles.personalizationMetricValue, { color: '#06B6D4' }]}>{metric.revenue}</Text>
            <Text style={[styles.personalizationMetricLabel, { color: 'rgba(255,255,255,0.5)' }]}>Revenue</Text>
          </View>
        </View>
      </View>
    </View>
  );

  const renderFraudAlert = (alert: FraudAlert) => (
    <View key={alert.id} style={[styles.fraudCard, { backgroundColor: 'rgba(255,255,255,0.03)', borderColor: alert.severity === 'high' ? '#EF4444' + '30' : alert.severity === 'medium' ? '#F59E0B' + '30' : '#6B7280' + '30' }]}>
      <View style={styles.fraudHeader}>
        <Shield size={18} color={alert.severity === 'high' ? '#EF4444' : alert.severity === 'medium' ? '#F59E0B' : '#6B7280'} />
        <Text style={[styles.fraudType, { color: '#FFFFFF' }]}>{alert.type}</Text>
        <View style={[
          styles.fraudSeverityBadge,
          { backgroundColor: alert.severity === 'high' ? 'rgba(239, 68, 68, 0.2)' : alert.severity === 'medium' ? 'rgba(245, 158, 11, 0.2)' : 'rgba(107, 114, 128, 0.2)' }
        ]}>
          <Text style={[
            styles.fraudSeverityText,
            { color: alert.severity === 'high' ? '#EF4444' : alert.severity === 'medium' ? '#F59E0B' : '#6B7280' }
          ]}>{alert.severity}</Text>
        </View>
      </View>
      <View style={styles.fraudDetails}>
        <Text style={[styles.fraudAmount, { color: '#FFFFFF' }]}>{alert.amount}</Text>
        <Text style={[styles.fraudTimestamp, { color: 'rgba(255,255,255,0.5)' }]}>{alert.timestamp}</Text>
      </View>
      <View style={[
        styles.fraudStatusBadge,
        { backgroundColor: alert.status === 'detected' ? 'rgba(239, 68, 68, 0.2)' : alert.status === 'investigating' ? 'rgba(245, 158, 11, 0.2)' : 'rgba(16, 185, 129, 0.2)' }
      ]}>
        <Text style={[
          styles.fraudStatusText,
          { color: alert.status === 'detected' ? '#EF4444' : alert.status === 'investigating' ? '#F59E0B' : '#10B981' }
        ]}>{alert.status}</Text>
      </View>
    </View>
  );

  const renderCommerceInsight = (insight: CommerceInsight) => (
    <View key={insight.id} style={[styles.insightCard, { backgroundColor: 'rgba(255,255,255,0.03)', borderColor: insight.impact === 'high' ? '#10B981' + '30' : insight.impact === 'medium' ? '#F59E0B' + '30' : '#6B7280' + '30' }]}>
      <View style={styles.insightHeader}>
        <Brain size={18} color="#06B6D4" />
        <View style={styles.insightMeta}>
          <Text style={[styles.insightCategory, { color: '#06B6D4' }]}>{insight.category}</Text>
          <Text style={[styles.insightTimestamp, { color: 'rgba(255,255,255,0.5)' }]}>{insight.timestamp}</Text>
        </View>
        <View style={[
          styles.insightConfidenceBadge,
          { backgroundColor: 'rgba(6, 182, 212, 0.2)' }
        ]}>
          <Text style={[styles.insightConfidenceText, { color: '#06B6D4' }]}>{insight.confidence}%</Text>
        </View>
      </View>
      <Text style={[styles.insightText, { color: '#FFFFFF' }]}>{insight.insight}</Text>
      <View style={[styles.insightAction, { backgroundColor: 'rgba(16, 185, 129, 0.1)' }]}>
        <Zap size={14} color="#10B981" />
        <Text style={[styles.insightActionText, { color: '#10B981' }]}>{insight.action}</Text>
      </View>
    </View>
  );

  const renderCommerceActivity = (activity: CommerceActivity) => {
    const getIcon = () => {
      switch (activity.type) {
        case 'order': return ShoppingCart;
        case 'payment': return CreditCard;
        case 'cart': return CartIcon;
        case 'ad': return Megaphone;
        case 'price': return Tag;
        case 'product': return Package;
        case 'inventory': return Warehouse;
        default: return Activity;
      }
    };
    const Icon = getIcon();
    return (
      <View key={activity.id} style={styles.activityItem}>
        <View style={[styles.activityIcon, { backgroundColor: 'rgba(6, 182, 212, 0.2)' }]}>
          <Icon size={14} color="#06B6D4" />
        </View>
        <View style={styles.activityContent}>
          <Text style={[styles.activityEvent, { color: '#FFFFFF' }]}>{activity.event}</Text>
          <Text style={[styles.activityDetails, { color: 'rgba(255,255,255,0.5)' }]}>{activity.details}</Text>
        </View>
        <Text style={[styles.activityTimestamp, { color: 'rgba(255,255,255,0.4)' }]}>{activity.timestamp}</Text>
      </View>
    );
  };

  const renderSystemHealth = (health: SystemHealth) => (
    <View key={health.id} style={[styles.healthCard, { backgroundColor: 'rgba(255,255,255,0.03)', borderColor: health.status === 'healthy' ? '#10B981' + '30' : health.status === 'degraded' ? '#F59E0B' + '30' : '#EF4444' + '30' }]}>
      <View style={styles.healthHeader}>
        <Server size={18} color={health.status === 'healthy' ? '#10B981' : health.status === 'degraded' ? '#F59E0B' : '#EF4444'} />
        <Text style={[styles.healthSystem, { color: '#FFFFFF' }]}>{health.system}</Text>
        <View style={[
          styles.healthStatusBadge,
          { backgroundColor: health.status === 'healthy' ? 'rgba(16, 185, 129, 0.2)' : health.status === 'degraded' ? 'rgba(245, 158, 11, 0.2)' : 'rgba(239, 68, 68, 0.2)' }
        ]}>
          <Text style={[
            styles.healthStatusText,
            { color: health.status === 'healthy' ? '#10B981' : health.status === 'degraded' ? '#F59E0B' : '#EF4444' }
          ]}>{health.status}</Text>
        </View>
      </View>
      <View style={styles.healthMetrics}>
        <View style={styles.healthMetric}>
          <Text style={[styles.healthMetricValue, { color: '#10B981' }]}>{health.uptime}</Text>
          <Text style={[styles.healthMetricLabel, { color: 'rgba(255,255,255,0.5)' }]}>Uptime</Text>
        </View>
        <View style={styles.healthMetric}>
          <Text style={[styles.healthMetricValue, { color: '#06B6D4' }]}>{health.latency}</Text>
          <Text style={[styles.healthMetricLabel, { color: 'rgba(255,255,255,0.5)' }]}>Latency</Text>
        </View>
        <View style={styles.healthMetric}>
          <Text style={[styles.healthMetricValue, { color: '#8B5CF6' }]}>{health.throughput}</Text>
          <Text style={[styles.healthMetricLabel, { color: 'rgba(255,255,255,0.5)' }]}>Throughput</Text>
        </View>
      </View>
    </View>
  );

  const renderCommerceRegion = (region: CommerceRegion) => (
    <View key={region.id} style={[styles.regionCard, { backgroundColor: 'rgba(255,255,255,0.03)', borderColor: region.color + '30' }]}>
      <View style={styles.regionHeader}>
        <Globe size={18} color={region.color} />
        <Text style={[styles.regionName, { color: '#FFFFFF' }]}>{region.region}</Text>
      </View>
      <View style={styles.regionMetrics}>
        <View style={styles.regionMetric}>
          <Text style={[styles.regionMetricValue, { color: region.color }]}>{region.revenue}</Text>
          <Text style={[styles.regionMetricLabel, { color: 'rgba(255,255,255,0.5)' }]}>Revenue</Text>
        </View>
        <View style={styles.regionMetric}>
          <Text style={[styles.regionMetricValue, { color: '#FFFFFF' }]}>{region.orders}</Text>
          <Text style={[styles.regionMetricLabel, { color: 'rgba(255,255,255,0.5)' }]}>Orders</Text>
        </View>
        <View style={styles.regionMetric}>
          <Text style={[styles.regionMetricValue, { color: '#10B981' }]}>{region.growth}</Text>
          <Text style={[styles.regionMetricLabel, { color: 'rgba(255,255,255,0.5)' }]}>Growth</Text>
        </View>
      </View>
    </View>
  );

  const renderRevenueFlow = (flow: RevenueFlow) => (
    <View key={flow.id} style={styles.revenueFlowItem}>
      <View style={[styles.revenueFlowBar, { backgroundColor: flow.color + '40', width: flow.percentage }]} />
      <View style={styles.revenueFlowContent}>
        <Text style={[styles.revenueFlowSource, { color: '#FFFFFF' }]}>{flow.source}</Text>
        <Text style={[styles.revenueFlowAmount, { color: flow.color }]}>{flow.amount}</Text>
        <View style={[
          styles.revenueFlowTrend,
          { backgroundColor: flow.trend === 'up' ? 'rgba(16, 185, 129, 0.2)' : flow.trend === 'down' ? 'rgba(239, 68, 68, 0.2)' : 'rgba(107, 114, 128, 0.2)' }
        ]}>
          {flow.trend === 'up' ? <TrendingUp size={12} color="#10B981" /> : 
           flow.trend === 'down' ? <TrendingDown size={12} color="#EF4444" /> : 
           <Activity size={12} color="rgba(255,255,255,0.6)" />}
          <Text style={[styles.revenueFlowPercentage, { color: 'rgba(255,255,255,0.6)' }]}>{flow.percentage}%</Text>
        </View>
      </View>
    </View>
  );

  const renderJourneyStage = (stage: JourneyStage) => (
    <View key={stage.id} style={styles.journeyStage}>
      <View style={[styles.journeyStageDot, { backgroundColor: stage.color }]} />
      <View style={styles.journeyStageContent}>
        <Text style={[styles.journeyStageName, { color: '#FFFFFF' }]}>{stage.stage}</Text>
        <View style={styles.journeyStageMetrics}>
          <Text style={[styles.journeyStageUsers, { color: 'rgba(255,255,255,0.7)' }]}>{stage.users}</Text>
          <Text style={[styles.journeyStageTime, { color: 'rgba(255,255,255,0.5)' }]}>• {stage.time}</Text>
          <Text style={[styles.journeyStageConversion, { color: stage.color }]}>{stage.conversion}</Text>
        </View>
      </View>
    </View>
  );

  const renderDemandForecast = (forecast: DemandForecast) => (
    <View key={forecast.id} style={[styles.demandCard, { backgroundColor: 'rgba(255,255,255,0.03)', borderColor: forecast.color + '30' }]}>
      <View style={styles.demandHeader}>
        <TrendingUp size={18} color={forecast.color} />
        <Text style={[styles.demandProduct, { color: '#FFFFFF' }]}>{forecast.product}</Text>
      </View>
      <View style={styles.demandMetrics}>
        <View style={styles.demandMetric}>
          <Text style={[styles.demandMetricLabel, { color: 'rgba(255,255,255,0.5)' }]}>Current</Text>
          <Text style={[styles.demandMetricValue, { color: '#FFFFFF' }]}>{forecast.currentDemand}</Text>
        </View>
        <View style={styles.demandMetric}>
          <Text style={[styles.demandMetricLabel, { color: 'rgba(255,255,255,0.5)' }]}>Forecast</Text>
          <Text style={[styles.demandMetricValue, { color: forecast.color }]}>{forecast.forecastDemand}</Text>
        </View>
        <View style={styles.demandMetric}>
          <Text style={[styles.demandMetricLabel, { color: 'rgba(255,255,255,0.5)' }]}>Growth</Text>
          <Text style={[styles.demandMetricValue, { color: '#10B981' }]}>{forecast.growth}</Text>
        </View>
      </View>
      <View style={styles.demandConfidence}>
        <Text style={[styles.demandConfidenceLabel, { color: 'rgba(255,255,255,0.5)' }]}>AI Confidence</Text>
        <View style={styles.demandConfidenceBar}>
          <View style={[styles.demandConfidenceFill, { width: `${forecast.confidence}%`, backgroundColor: forecast.color }]} />
        </View>
        <Text style={[styles.demandConfidenceValue, { color: forecast.color }]}>{forecast.confidence}%</Text>
      </View>
    </View>
  );

  const renderAttributionChannel = (channel: AttributionChannel) => (
    <View key={channel.id} style={[styles.attributionCard, { backgroundColor: 'rgba(255,255,255,0.03)', borderColor: channel.color + '30' }]}>
      <View style={styles.attributionHeader}>
        <View style={[styles.attributionDot, { backgroundColor: channel.color }]} />
        <Text style={[styles.attributionChannel, { color: '#FFFFFF' }]}>{channel.channel}</Text>
        <Text style={[styles.attributionValue, { color: channel.color }]}>{channel.attribution}</Text>
      </View>
      <View style={styles.attributionMetrics}>
        <View style={styles.attributionMetric}>
          <Text style={[styles.attributionMetricValue, { color: '#FFFFFF' }]}>{channel.touchpoints}</Text>
          <Text style={[styles.attributionMetricLabel, { color: 'rgba(255,255,255,0.5)' }]}>Touchpoints</Text>
        </View>
        <View style={styles.attributionMetric}>
          <Text style={[styles.attributionMetricValue, { color: '#10B981' }]}>{channel.conversions}</Text>
          <Text style={[styles.attributionMetricLabel, { color: 'rgba(255,255,255,0.5)' }]}>Conversions</Text>
        </View>
        <View style={styles.attributionMetric}>
          <Text style={[styles.attributionMetricValue, { color: '#06B6D4' }]}>{channel.revenue}</Text>
          <Text style={[styles.attributionMetricLabel, { color: 'rgba(255,255,255,0.5)' }]}>Revenue</Text>
        </View>
      </View>
    </View>
  );

  const renderPricingOptimization = (pricing: PricingOptimization) => (
    <View key={pricing.id} style={[styles.pricingCard, { backgroundColor: 'rgba(255,255,255,0.03)', borderColor: pricing.color + '30' }]}>
      <View style={styles.pricingHeader}>
        <DollarSign size={18} color={pricing.color} />
        <Text style={[styles.pricingProduct, { color: '#FFFFFF' }]}>{pricing.product}</Text>
      </View>
      <View style={styles.pricingComparison}>
        <View style={styles.pricingPrice}>
          <Text style={[styles.pricingPriceLabel, { color: 'rgba(255,255,255,0.5)' }]}>Current</Text>
          <Text style={[styles.pricingPriceValue, { color: '#FFFFFF' }]}>{pricing.currentPrice}</Text>
        </View>
        <ArrowRight size={16} color="rgba(255,255,255,0.3)" />
        <View style={styles.pricingPrice}>
          <Text style={[styles.pricingPriceLabel, { color: pricing.color }]}>Optimal</Text>
          <Text style={[styles.pricingPriceValue, { color: pricing.color }]}>{pricing.optimalPrice}</Text>
        </View>
      </View>
      <View style={styles.pricingMetrics}>
        <View style={styles.pricingMetric}>
          <Text style={[styles.pricingMetricValue, { color: '#FFFFFF' }]}>{pricing.elasticity}</Text>
          <Text style={[styles.pricingMetricLabel, { color: 'rgba(255,255,255,0.5)' }]}>Elasticity</Text>
        </View>
        <View style={styles.pricingMetric}>
          <Text style={[styles.pricingMetricValue, { color: '#06B6D4' }]}>{pricing.competitorPrice}</Text>
          <Text style={[styles.pricingMetricLabel, { color: 'rgba(255,255,255,0.5)' }]}>Competitor</Text>
        </View>
        <View style={styles.pricingMetric}>
          <Text style={[styles.pricingMetricValue, { color: '#10B981' }]}>{pricing.revenueImpact}</Text>
          <Text style={[styles.pricingMetricLabel, { color: 'rgba(255,255,255,0.5)' }]}>Revenue Impact</Text>
        </View>
      </View>
      <View style={styles.pricingImpact}>
        <Text style={[styles.pricingImpactLabel, { color: 'rgba(255,255,255,0.5)' }]}>Demand Impact</Text>
        <Text style={[styles.pricingImpactValue, { color: pricing.demandImpact.startsWith('-') ? '#EF4444' : '#10B981' }]}>{pricing.demandImpact}</Text>
      </View>
    </View>
  );

  const renderFunnelMonitor = (funnel: FunnelMonitor) => (
    <View key={funnel.id} style={styles.funnelStage}>
      <View style={styles.funnelStageHeader}>
        <View style={[styles.funnelStageDot, { backgroundColor: funnel.color }]} />
        <Text style={[styles.funnelStageName, { color: '#FFFFFF' }]}>{funnel.stage}</Text>
        <View style={[
          styles.funnelStageTrend,
          { backgroundColor: funnel.trend === 'up' ? 'rgba(16, 185, 129, 0.2)' : funnel.trend === 'down' ? 'rgba(239, 68, 68, 0.2)' : 'rgba(107, 114, 128, 0.2)' }
        ]}>
          {funnel.trend === 'up' ? <TrendingUp size={12} color="#10B981" /> :
           funnel.trend === 'down' ? <TrendingDown size={12} color="#EF4444" /> :
           <Activity size={12} color="rgba(255,255,255,0.6)" />}
        </View>
      </View>
      <View style={styles.funnelStageMetrics}>
        <View style={styles.funnelStageMetric}>
          <Text style={[styles.funnelStageMetricValue, { color: '#FFFFFF' }]}>{funnel.volume}</Text>
          <Text style={[styles.funnelStageMetricLabel, { color: 'rgba(255,255,255,0.5)' }]}>Volume</Text>
        </View>
        <View style={styles.funnelStageMetric}>
          <Text style={[styles.funnelStageMetricValue, { color: funnel.color }]}>{funnel.conversionRate}</Text>
          <Text style={[styles.funnelStageMetricLabel, { color: 'rgba(255,255,255,0.5)' }]}>CR</Text>
        </View>
        <View style={styles.funnelStageMetric}>
          <Text style={[styles.funnelStageMetricValue, { color: funnel.dropOff === '0%' ? '#10B981' : '#EF4444' }]}>{funnel.dropOff}</Text>
          <Text style={[styles.funnelStageMetricLabel, { color: 'rgba(255,255,255,0.5)' }]}>Drop-off</Text>
        </View>
      </View>
    </View>
  );

  const renderExecutiveKPI = (kpi: ExecutiveKPI) => (
    <View key={kpi.id} style={[styles.executiveKpiCard, { backgroundColor: 'rgba(255,255,255,0.03)', borderColor: kpi.color + '30' }]}>
      <View style={styles.executiveKpiHeader}>
        <Text style={[styles.executiveKpiMetric, { color: '#FFFFFF' }]}>{kpi.metric}</Text>
        <View style={[
          styles.executiveKpiTrend,
          { backgroundColor: kpi.trend === 'up' ? 'rgba(16, 185, 129, 0.2)' : kpi.trend === 'down' ? 'rgba(239, 68, 68, 0.2)' : 'rgba(107, 114, 128, 0.2)' }
        ]}>
          {kpi.trend === 'up' ? <TrendingUp size={12} color="#10B981" /> :
           kpi.trend === 'down' ? <TrendingDown size={12} color="#EF4444" /> :
           <Activity size={12} color="rgba(255,255,255,0.6)" />}
        </View>
      </View>
      <View style={styles.executiveKpiMetrics}>
        <View style={styles.executiveKpiMetricValue}>
          <Text style={[styles.executiveKpiValue, { color: kpi.color }]}>{kpi.value}</Text>
          <Text style={[styles.executiveKpiTarget, { color: 'rgba(255,255,255,0.5)' }]}>Target: {kpi.target}</Text>
        </View>
        <View style={styles.executiveKpiVariance}>
          <Text style={[styles.executiveKpiVarianceValue, { color: kpi.variance.startsWith('+') ? '#10B981' : '#EF4444' }]}>{kpi.variance}</Text>
          <Text style={[styles.executiveKpiVarianceLabel, { color: 'rgba(255,255,255,0.5)' }]}>Variance</Text>
        </View>
      </View>
    </View>
  );

  const renderRecommendationItem = (item: RecommendationItem) => (
    <View key={item.id} style={[styles.recommendationCard, { backgroundColor: 'rgba(255,255,255,0.03)', borderColor: item.color + '30' }]}>
      <View style={styles.recommendationHeader}>
        <Sparkles size={16} color={item.color} />
        <Text style={[styles.recommendationProduct, { color: '#FFFFFF' }]}>{item.product}</Text>
      </View>
      <Text style={[styles.recommendationText, { color: 'rgba(255,255,255,0.8)' }]}>{item.recommendation}</Text>
      <View style={styles.recommendationMetrics}>
        <View style={styles.recommendationMetric}>
          <Text style={[styles.recommendationMetricLabel, { color: 'rgba(255,255,255,0.5)' }]}>Confidence</Text>
          <Text style={[styles.recommendationMetricValue, { color: item.color }]}>{item.confidence}%</Text>
        </View>
        <View style={styles.recommendationMetric}>
          <Text style={[styles.recommendationMetricLabel, { color: 'rgba(255,255,255,0.5)' }]}>Lift</Text>
          <Text style={[styles.recommendationMetricValue, { color: '#10B981' }]}>{item.lift}</Text>
        </View>
      </View>
    </View>
  );

  return (
    <View style={[styles.container, { backgroundColor: '#05070A' }]}>
      {/* Header */}
      <View style={[styles.header, { backgroundColor: 'rgba(5, 7, 10, 0.95)', borderBottomColor: 'rgba(255,255,255,0.1)' }]}>
        <View style={styles.headerContent}>
          <View style={styles.headerLeft}>
            <Store size={32} color="#10B981" />
            <View style={styles.headerTitle}>
              <Text style={[styles.headerTitleText, { color: '#FFFFFF' }]}>AI E-Commerce Command Center</Text>
              <Text style={[styles.headerSubtitle, { color: 'rgba(255,255,255,0.6)' }]}>Global Digital Commerce Intelligence & Revenue Operating System</Text>
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
        <View style={[styles.sidebar, { backgroundColor: 'rgba(5, 7, 10, 0.95)', borderRightColor: 'rgba(255,255,255,0.1)' }]}>
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
                      isActive && { backgroundColor: 'rgba(16, 185, 129, 0.15)' }
                    ]}
                    onPress={() => setActiveTab(item.id)}
                  >
                    <Icon 
                      size={18} 
                      color={isActive ? '#10B981' : 'rgba(255,255,255,0.6)'} 
                    />
                    <Text style={[
                      styles.sidebarItemText,
                      { color: isActive ? '#10B981' : 'rgba(255,255,255,0.6)' }
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
        
        {/* Top Executive Bar - E-Commerce KPIs */}
        <View style={[styles.topExecutiveBar, { backgroundColor: 'rgba(16, 185, 129, 0.05)', borderColor: 'rgba(16, 185, 129, 0.2)' }]}>
          <View style={styles.topBarHeader}>
            <View style={styles.topBarTitle}>
              <TrendingUp size={20} color="#10B981" />
              <Text style={[styles.topBarTitleText, { color: '#FFFFFF' }]}>E-Commerce Executive Overview</Text>
            </View>
            <Text style={[styles.topBarPeriod, { color: 'rgba(255,255,255,0.6)' }]}>Last 24 hours</Text>
          </View>
          
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.topBarScroll}>
            <View style={styles.topBarKPIs}>
              {ecommerceKPIs.map((kpi) => (
                <View key={kpi.id} style={[styles.topBarKPI, { backgroundColor: 'rgba(255,255,255,0.03)', borderColor: kpi.color + '40' }]}>
                  <View style={styles.topBarKPIIcon}>
                    {React.createElement(kpi.icon, { size: 16, color: kpi.color })}
                  </View>
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

        {/* AI E-Commerce Agents */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: '#FFFFFF' }]}>AI E-Commerce Agents</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.agentsScroll}>
            {commerceAgents.map(renderAgentCard)}
          </ScrollView>
        </View>

        {/* Chief Commerce Officer Dashboard */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: '#FFFFFF' }]}>Chief Commerce Officer Dashboard</Text>
          <View style={[styles.commandCenter, { backgroundColor: 'rgba(16, 185, 129, 0.03)', borderColor: 'rgba(16, 185, 129, 0.2)' }]}>
            
            {/* CCO Dashboard Header */}
            <View style={styles.commandCenterHeader}>
              <View style={styles.commandCenterTitle}>
                <Brain size={24} color="#10B981" />
                <View>
                  <Text style={[styles.commandCenterTitleText, { color: '#FFFFFF' }]}>Commerce Intelligence Hub</Text>
                  <Text style={[styles.commandCenterSubtitle, { color: 'rgba(255,255,255,0.6)' }]}>Real-time commerce performance monitoring</Text>
                </View>
              </View>
              <View style={styles.commandCenterActions}>
                <TouchableOpacity style={[styles.commandCenterButton, { backgroundColor: 'rgba(16, 185, 129, 0.2)' }]}>
                  <RefreshCw size={16} color="#10B981" />
                  <Text style={[styles.commandCenterButtonText, { color: '#10B981' }]}>Refresh</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.commandCenterButton, { backgroundColor: 'rgba(255,255,255,0.1)' }]}>
                  <Download size={16} color="rgba(255,255,255,0.7)" />
                  <Text style={[styles.commandCenterButtonText, { color: 'rgba(255,255,255,0.7)' }]}>Export</Text>
                </TouchableOpacity>
              </View>
            </View>

            {/* Primary Commerce Metrics */}
            <View style={styles.commandCenterMetrics}>
              <View style={[styles.commandMetricCard, { backgroundColor: 'rgba(255,255,255,0.03)', borderColor: 'rgba(16, 185, 129, 0.3)' }]}>
                <View style={styles.commandMetricHeader}>
                  <DollarSign size={20} color="#10B981" />
                  <Text style={[styles.commandMetricLabel, { color: 'rgba(255,255,255,0.7)' }]}>Total Revenue</Text>
                </View>
                <Text style={[styles.commandMetricValue, { color: '#10B981' }]}>$4.2B</Text>
                <View style={styles.commandMetricTrend}>
                  <TrendingUp size={14} color="#10B981" />
                  <Text style={[styles.commandMetricTrendText, { color: '#10B981' }]}>+18.4%</Text>
                  <Text style={[styles.commandMetricPeriod, { color: 'rgba(255,255,255,0.5)' }]}>Last 30 days</Text>
                </View>
              </View>

              <View style={[styles.commandMetricCard, { backgroundColor: 'rgba(255,255,255,0.03)', borderColor: 'rgba(6, 182, 212, 0.3)' }]}>
                <View style={styles.commandMetricHeader}>
                  <Target size={20} color="#06B6D4" />
                  <Text style={[styles.commandMetricLabel, { color: 'rgba(255,255,255,0.7)' }]}>Conversion Rate</Text>
                </View>
                <Text style={[styles.commandMetricValue, { color: '#06B6D4' }]}>3.8%</Text>
                <View style={styles.commandMetricTrend}>
                  <TrendingUp size={14} color="#10B981" />
                  <Text style={[styles.commandMetricTrendText, { color: '#10B981' }]}>+0.6%</Text>
                  <Text style={[styles.commandMetricPeriod, { color: 'rgba(255,255,255,0.5)' }]}>Site-wide</Text>
                </View>
              </View>

              <View style={[styles.commandMetricCard, { backgroundColor: 'rgba(255,255,255,0.03)', borderColor: 'rgba(139, 92, 246, 0.3)' }]}>
                <View style={styles.commandMetricHeader}>
                  <Users size={20} color="#8B5CF6" />
                  <Text style={[styles.commandMetricLabel, { color: 'rgba(255,255,255,0.7)' }]}>Active Customers</Text>
                </View>
                <Text style={[styles.commandMetricValue, { color: '#8B5CF6' }]}>28.4M</Text>
                <View style={styles.commandMetricTrend}>
                  <TrendingUp size={14} color="#10B981" />
                  <Text style={[styles.commandMetricTrendText, { color: '#10B981' }]}>+12.8%</Text>
                  <Text style={[styles.commandMetricPeriod, { color: 'rgba(255,255,255,0.5)' }]}>Active users</Text>
                </View>
              </View>

              <View style={[styles.commandMetricCard, { backgroundColor: 'rgba(255,255,255,0.03)', borderColor: 'rgba(236, 72, 153, 0.3)' }]}>
                <View style={styles.commandMetricHeader}>
                  <ShoppingCart size={20} color="#EC4899" />
                  <Text style={[styles.commandMetricLabel, { color: 'rgba(255,255,255,0.7)' }]}>Orders Today</Text>
                </View>
                <Text style={[styles.commandMetricValue, { color: '#EC4899' }]}>1.8M</Text>
                <View style={styles.commandMetricTrend}>
                  <TrendingUp size={14} color="#10B981" />
                  <Text style={[styles.commandMetricTrendText, { color: '#10B981' }]}>+8.4%</Text>
                  <Text style={[styles.commandMetricPeriod, { color: 'rgba(255,255,255,0.5)' }]}>Daily orders</Text>
                </View>
              </View>

              <View style={[styles.commandMetricCard, { backgroundColor: 'rgba(255,255,255,0.03)', borderColor: 'rgba(245, 158, 11, 0.3)' }]}>
                <View style={styles.commandMetricHeader}>
                  <Zap size={20} color="#F59E0B" />
                  <Text style={[styles.commandMetricLabel, { color: 'rgba(255,255,255,0.7)' }]}>AI Revenue Impact</Text>
                </View>
                <Text style={[styles.commandMetricValue, { color: '#F59E0B' }]}>+$184M</Text>
                <View style={styles.commandMetricTrend}>
                  <TrendingUp size={14} color="#10B981" />
                  <Text style={[styles.commandMetricTrendText, { color: '#10B981' }]}>+22.4%</Text>
                  <Text style={[styles.commandMetricPeriod, { color: 'rgba(255,255,255,0.5)' }]}>AI uplift</Text>
                </View>
              </View>
            </View>

            {/* Commerce Health Overview */}
            <View style={styles.commandCenterHealth}>
              <View style={styles.healthOverview}>
                <Text style={[styles.healthOverviewTitle, { color: '#FFFFFF' }]}>Commerce Health Score</Text>
                <View style={styles.healthScoreContainer}>
                  <Text style={[styles.healthScore, { color: '#10B981' }]}>92%</Text>
                  <View style={styles.healthScoreIndicator}>
                    <View style={[styles.healthScoreBar, { width: '92%', backgroundColor: '#10B981' }]} />
                  </View>
                </View>
                <Text style={[styles.healthScoreDescription, { color: 'rgba(255,255,255,0.6)' }]}>Excellent - All commerce systems optimal</Text>
              </View>

              <View style={styles.healthBreakdown}>
                <Text style={[styles.healthBreakdownTitle, { color: '#FFFFFF' }]}>Health Breakdown</Text>
                <View style={styles.healthBreakdownItems}>
                  <View style={styles.healthBreakdownItem}>
                    <View style={[styles.healthBreakdownDot, { backgroundColor: '#10B981' }]} />
                    <Text style={[styles.healthBreakdownLabel, { color: 'rgba(255,255,255,0.7)' }]}>Revenue Growth</Text>
                    <Text style={[styles.healthBreakdownValue, { color: '#10B981' }]}>94%</Text>
                  </View>
                  <View style={styles.healthBreakdownItem}>
                    <View style={[styles.healthBreakdownDot, { backgroundColor: '#06B6D4' }]} />
                    <Text style={[styles.healthBreakdownLabel, { color: 'rgba(255,255,255,0.7)' }]}>Conversion Rate</Text>
                    <Text style={[styles.healthBreakdownValue, { color: '#06B6D4' }]}>91%</Text>
                  </View>
                  <View style={styles.healthBreakdownItem}>
                    <View style={[styles.healthBreakdownDot, { backgroundColor: '#8B5CF6' }]} />
                    <Text style={[styles.healthBreakdownLabel, { color: 'rgba(255,255,255,0.7)' }]}>Customer Retention</Text>
                    <Text style={[styles.healthBreakdownValue, { color: '#8B5CF6' }]}>89%</Text>
                  </View>
                  <View style={styles.healthBreakdownItem}>
                    <View style={[styles.healthBreakdownDot, { backgroundColor: '#F59E0B' }]} />
                    <Text style={[styles.healthBreakdownLabel, { color: 'rgba(255,255,255,0.7)' }]}>Inventory Health</Text>
                    <Text style={[styles.healthBreakdownValue, { color: '#F59E0B' }]}>93%</Text>
                  </View>
                  <View style={styles.healthBreakdownItem}>
                    <View style={[styles.healthBreakdownDot, { backgroundColor: '#EC4899' }]} />
                    <Text style={[styles.healthBreakdownLabel, { color: 'rgba(255,255,255,0.7)' }]}>Marketing ROI</Text>
                    <Text style={[styles.healthBreakdownValue, { color: '#EC4899' }]}>96%</Text>
                  </View>
                  <View style={styles.healthBreakdownItem}>
                    <View style={[styles.healthBreakdownDot, { backgroundColor: '#EF4444' }]} />
                    <Text style={[styles.healthBreakdownLabel, { color: 'rgba(255,255,255,0.7)' }]}>Fraud Prevention</Text>
                    <Text style={[styles.healthBreakdownValue, { color: '#EF4444' }]}>99%</Text>
                  </View>
                </View>
              </View>
            </View>

            {/* Revenue Growth Trajectory */}
            <View style={styles.revenueTrajectory}>
              <Text style={[styles.revenueTrajectoryTitle, { color: '#FFFFFF' }]}>Revenue Growth Trajectory</Text>
              <View style={styles.revenueTrajectoryChart}>
                <View style={styles.revenueTrajectoryBars}>
                  <View style={styles.revenueTrajectoryBar}>
                    <View style={[styles.revenueTrajectoryBarFill, { height: '45%', backgroundColor: '#06B6D4' }]} />
                    <Text style={[styles.revenueTrajectoryBarLabel, { color: 'rgba(255,255,255,0.6)' }]}>Jan</Text>
                  </View>
                  <View style={styles.revenueTrajectoryBar}>
                    <View style={[styles.revenueTrajectoryBarFill, { height: '52%', backgroundColor: '#06B6D4' }]} />
                    <Text style={[styles.revenueTrajectoryBarLabel, { color: 'rgba(255,255,255,0.6)' }]}>Feb</Text>
                  </View>
                  <View style={styles.revenueTrajectoryBar}>
                    <View style={[styles.revenueTrajectoryBarFill, { height: '58%', backgroundColor: '#8B5CF6' }]} />
                    <Text style={[styles.revenueTrajectoryBarLabel, { color: 'rgba(255,255,255,0.6)' }]}>Mar</Text>
                  </View>
                  <View style={styles.revenueTrajectoryBar}>
                    <View style={[styles.revenueTrajectoryBarFill, { height: '65%', backgroundColor: '#8B5CF6' }]} />
                    <Text style={[styles.revenueTrajectoryBarLabel, { color: 'rgba(255,255,255,0.6)' }]}>Apr</Text>
                  </View>
                  <View style={styles.revenueTrajectoryBar}>
                    <View style={[styles.revenueTrajectoryBarFill, { height: '72%', backgroundColor: '#EC4899' }]} />
                    <Text style={[styles.revenueTrajectoryBarLabel, { color: 'rgba(255,255,255,0.6)' }]}>May</Text>
                  </View>
                  <View style={styles.revenueTrajectoryBar}>
                    <View style={[styles.revenueTrajectoryBarFill, { height: '78%', backgroundColor: '#EC4899' }]} />
                    <Text style={[styles.revenueTrajectoryBarLabel, { color: 'rgba(255,255,255,0.6)' }]}>Jun</Text>
                  </View>
                  <View style={styles.revenueTrajectoryBar}>
                    <View style={[styles.revenueTrajectoryBarFill, { height: '85%', backgroundColor: '#10B981' }]} />
                    <Text style={[styles.revenueTrajectoryBarLabel, { color: 'rgba(255,255,255,0.6)' }]}>Jul</Text>
                  </View>
                  <View style={styles.revenueTrajectoryBar}>
                    <View style={[styles.revenueTrajectoryBarFill, { height: '92%', backgroundColor: '#10B981' }]} />
                    <Text style={[styles.revenueTrajectoryBarLabel, { color: '#FFFFFF' }]}>Aug</Text>
                  </View>
                </View>
              </View>
              <View style={styles.revenueTrajectorySummary}>
                <View style={styles.revenueTrajectorySummaryItem}>
                  <Text style={[styles.revenueTrajectorySummaryLabel, { color: 'rgba(255,255,255,0.6)' }]}>Monthly Growth</Text>
                  <Text style={[styles.revenueTrajectorySummaryValue, { color: '#10B981' }]}>+18.4%</Text>
                </View>
                <View style={styles.revenueTrajectorySummaryItem}>
                  <Text style={[styles.revenueTrajectorySummaryLabel, { color: 'rgba(255,255,255,0.6)' }]}>YTD Revenue</Text>
                  <Text style={[styles.revenueTrajectorySummaryValue, { color: '#06B6D4' }]}>$28.6B</Text>
                </View>
                <View style={styles.revenueTrajectorySummaryItem}>
                  <Text style={[styles.revenueTrajectorySummaryLabel, { color: 'rgba(255,255,255,0.6)' }]}>Projected Annual</Text>
                  <Text style={[styles.revenueTrajectorySummaryValue, { color: '#8B5CF6' }]}>$42.8B</Text>
                </View>
              </View>
            </View>
          </View>
        </View>

        {/* Real-Time Sales & Conversion Engine */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: '#FFFFFF' }]}>Real-Time Sales & Conversion Engine</Text>
          <View style={[styles.funnelContainer, { backgroundColor: 'rgba(6, 182, 212, 0.03)', borderColor: 'rgba(6, 182, 212, 0.2)' }]}>
            <View style={styles.funnelHeader}>
              <LineChart size={20} color="#06B6D4" />
              <Text style={[styles.funnelTitle, { color: '#FFFFFF' }]}>Conversion Funnel Analysis</Text>
            </View>
            <View style={styles.funnelStages}>
              {funnelStages.map(renderFunnelStage)}
            </View>
            <View style={styles.funnelWorkflow}>
              <Text style={[styles.funnelWorkflowTitle, { color: 'rgba(255,255,255,0.7)' }]}>Conversion Workflow</Text>
              <View style={styles.funnelWorkflowSteps}>
                <Text style={[styles.funnelWorkflowStep, { color: '#06B6D4' }]}>Visitor →</Text>
                <Text style={[styles.funnelWorkflowStep, { color: '#8B5CF6' }]}>Product View →</Text>
                <Text style={[styles.funnelWorkflowStep, { color: '#EC4899' }]}>Add to Cart →</Text>
                <Text style={[styles.funnelWorkflowStep, { color: '#F59E0B' }]}>Checkout →</Text>
                <Text style={[styles.funnelWorkflowStep, { color: '#F59E0B' }]}>Payment →</Text>
                <Text style={[styles.funnelWorkflowStep, { color: '#10B981' }]}>Purchase</Text>
              </View>
            </View>
          </View>
        </View>

        {/* Marketing & Ad Intelligence Center */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: '#FFFFFF' }]}>Marketing & Ad Intelligence Center</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.adChannelsScroll}>
            {adChannels.map(renderAdChannel)}
          </ScrollView>
        </View>

        {/* Product & Catalog Intelligence */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: '#FFFFFF' }]}>Product & Catalog Intelligence</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.productsScroll}>
            {productItems.map(renderProductItem)}
          </ScrollView>
        </View>

        {/* Dynamic Pricing Engine */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: '#FFFFFF' }]}>Dynamic Pricing Engine</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.pricingScroll}>
            {pricingData.map(renderPricingData)}
          </ScrollView>
        </View>

        {/* Inventory & Fulfillment Hub */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: '#FFFFFF' }]}>Inventory & Fulfillment Hub</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.inventoryScroll}>
            {inventoryItems.map(renderInventoryItem)}
          </ScrollView>
        </View>

        {/* Customer Intelligence Hub */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: '#FFFFFF' }]}>Customer Intelligence Hub</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.segmentsScroll}>
            {customerSegments.map(renderCustomerSegment)}
          </ScrollView>
        </View>

        {/* Personalization Engine */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: '#FFFFFF' }]}>Personalization Engine</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.personalizationScroll}>
            {personalizationMetrics.map(renderPersonalizationMetric)}
          </ScrollView>
        </View>

        {/* Fraud & Payment Security */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: '#FFFFFF' }]}>Fraud & Payment Security</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.fraudScroll}>
            {fraudAlerts.map(renderFraudAlert)}
          </ScrollView>
        </View>

        {/* AI E-Commerce Insights */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: '#FFFFFF' }]}>AI E-Commerce Insights</Text>
          <View style={styles.insightsGrid}>
            {commerceInsights.map(renderCommerceInsight)}
          </View>
        </View>

        {/* Real-Time Commerce Activity Feed */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: '#FFFFFF' }]}>Real-Time Commerce Activity Feed</Text>
          <View style={[styles.activityFeed, { backgroundColor: 'rgba(255,255,255,0.02)', borderColor: 'rgba(6, 182, 212, 0.2)' }]}>
            {commerceActivities.map(renderCommerceActivity)}
          </View>
        </View>

        {/* System Health & Platform Infrastructure */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: '#FFFFFF' }]}>System Health & Platform Infrastructure</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.healthScroll}>
            {systemHealth.map(renderSystemHealth)}
          </ScrollView>
        </View>

        {/* Global Commerce Heatmap */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: '#FFFFFF' }]}>Global Commerce Heatmap</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.regionsScroll}>
            {commerceRegions.map(renderCommerceRegion)}
          </ScrollView>
        </View>

        {/* Real-Time Revenue Flow Dashboard */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: '#FFFFFF' }]}>Real-Time Revenue Flow Dashboard</Text>
          <View style={[styles.revenueFlowContainer, { backgroundColor: 'rgba(16, 185, 129, 0.03)', borderColor: 'rgba(16, 185, 129, 0.2)', borderWidth: 1, borderRadius: 12, padding: 20 }]}>
            <View style={styles.revenueFlowHeader}>
              <Globe size={20} color="#10B981" />
              <Text style={[styles.revenueFlowTitle, { color: '#FFFFFF' }]}>Revenue by Source</Text>
              <Text style={[styles.revenueFlowTotal, { color: '#10B981' }]}>$4.2B Total</Text>
            </View>
            {revenueFlow.map(renderRevenueFlow)}
          </View>
        </View>

        {/* Customer Journey Visualization */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: '#FFFFFF' }]}>Customer Journey Visualization</Text>
          <View style={[styles.journeyContainer, { backgroundColor: 'rgba(139, 92, 246, 0.03)', borderColor: 'rgba(139, 92, 246, 0.2)', borderWidth: 1, borderRadius: 12, padding: 20 }]}>
            <View style={styles.journeyHeader}>
              <Route size={20} color="#8B5CF6" />
              <Text style={[styles.journeyTitle, { color: '#FFFFFF' }]}>Customer Journey Stages</Text>
            </View>
            {journeyStages.map(renderJourneyStage)}
          </View>
        </View>

        {/* Product Demand Intelligence System */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: '#FFFFFF' }]}>Product Demand Intelligence System</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.demandScroll}>
            {demandForecasts.map(renderDemandForecast)}
          </ScrollView>
        </View>

        {/* Marketing Attribution Network */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: '#FFFFFF' }]}>Marketing Attribution Network</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.attributionScroll}>
            {attributionChannels.map(renderAttributionChannel)}
          </ScrollView>
        </View>

        {/* AI Pricing Optimization Engine */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: '#FFFFFF' }]}>AI Pricing Optimization Engine</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.pricingScroll}>
            {pricingOptimizations.map(renderPricingOptimization)}
          </ScrollView>
        </View>

        {/* Conversion Funnel Monitoring Wall */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: '#FFFFFF' }]}>Conversion Funnel Monitoring Wall</Text>
          <View style={[styles.funnelContainer, { backgroundColor: 'rgba(236, 72, 153, 0.03)', borderColor: 'rgba(236, 72, 153, 0.2)', borderWidth: 1, borderRadius: 12, padding: 20 }]}>
            <View style={styles.funnelHeader}>
              <Funnel size={20} color="#EC4899" />
              <Text style={[styles.funnelTitle, { color: '#FFFFFF' }]}>Real-Time Funnel Stages</Text>
            </View>
            {funnelMonitors.map(renderFunnelMonitor)}
          </View>
        </View>

        {/* Executive Commerce KPI Cockpit */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: '#FFFFFF' }]}>Executive Commerce KPI Cockpit</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.executiveKpiScroll}>
            {executiveKPIs.map(renderExecutiveKPI)}
          </ScrollView>
        </View>

        {/* AI Recommendation Intelligence Grid */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: '#FFFFFF' }]}>AI Recommendation Intelligence Grid</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.recommendationScroll}>
            {recommendationItems.map(renderRecommendationItem)}
          </ScrollView>
        </View>

        </ScrollView>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    paddingHorizontal: 20,
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
    fontWeight: '700',
  },
  headerSubtitle: {
    fontSize: 12,
  },
  headerActions: {
    flexDirection: 'row',
    gap: 8,
  },
  headerButton: {
    width: 40,
    height: 40,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
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
    alignItems: 'flex-end',
  },
  sidebarContent: {
    gap: 4,
  },
  sidebarItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    padding: 12,
    borderRadius: 8,
    marginHorizontal: 8,
  },
  sidebarItemText: {
    fontSize: 14,
    fontWeight: '500',
  },
  content: {
    flex: 1,
    padding: 20,
  },
  topExecutiveBar: {
    borderRadius: 12,
    padding: 16,
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
  topBarKPIIcon: {
    marginBottom: 8,
  },
  topBarKPITitle: {
    fontSize: 11,
    fontWeight: '500',
    marginBottom: 4,
  },
  topBarKPIValue: {
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 8,
  },
  topBarKPIMetrics: {
    gap: 4,
  },
  topBarKPITrend: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    alignSelf: 'flex-start',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
  },
  topBarKPITrendText: {
    fontSize: 11,
    fontWeight: '600',
  },
  topBarKPISubtitle: {
    fontSize: 10,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 16,
  },
  kpiCard: {
    borderRadius: 8,
    padding: 16,
    minWidth: 180,
    borderWidth: 1,
  },
  kpiHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 8,
  },
  kpiIconContainer: {
    marginBottom: 8,
  },
  kpiTitle: {
    fontSize: 11,
    fontWeight: '500',
    marginBottom: 4,
  },
  kpiValueContainer: {
    marginBottom: 8,
  },
  kpiValue: {
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 8,
  },
  kpiTrendBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    alignSelf: 'flex-start',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
  },
  kpiTrendText: {
    fontSize: 11,
    fontWeight: '600',
  },
  kpiSubtitle: {
    fontSize: 10,
  },
  agentsScroll: {
    marginBottom: 8,
  },
  agentCard: {
    borderRadius: 12,
    padding: 16,
    minWidth: 280,
    borderWidth: 1,
    marginRight: 12,
  },
  agentAvatar: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 12,
  },
  agentAvatarText: {
    fontSize: 32,
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
    fontWeight: '700',
  },
  agentMetricLabel: {
    fontSize: 10,
  },
  agentInsights: {
    gap: 4,
  },
  agentInsightsCount: {
    fontSize: 20,
    fontWeight: '700',
  },
  agentInsightsLabel: {
    fontSize: 10,
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
    fontWeight: '700',
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
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 6,
  },
  commandCenterButtonText: {
    fontSize: 12,
    fontWeight: '600',
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
    minWidth: 180,
    flex: 1,
    borderWidth: 1,
  },
  commandMetricHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 8,
  },
  commandMetricLabel: {
    fontSize: 12,
  },
  commandMetricValue: {
    fontSize: 24,
    fontWeight: '700',
    marginBottom: 8,
  },
  commandMetricTrend: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  commandMetricTrendText: {
    fontSize: 12,
    fontWeight: '600',
  },
  commandMetricPeriod: {
    fontSize: 10,
  },
  commandCenterHealth: {
    flexDirection: 'row',
    gap: 20,
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
    fontWeight: '700',
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
    fontSize: 12,
    fontWeight: '600',
  },
  revenueTrajectory: {
    marginTop: 20,
    borderRadius: 12,
    padding: 20,
    backgroundColor: 'rgba(255,255,255,0.02)',
    borderWidth: 1,
    borderColor: 'rgba(16, 185, 129, 0.2)',
  },
  revenueTrajectoryTitle: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 16,
  },
  revenueTrajectoryChart: {
    marginBottom: 16,
  },
  revenueTrajectoryBars: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    height: 120,
    paddingHorizontal: 8,
  },
  revenueTrajectoryBar: {
    flex: 1,
    marginHorizontal: 4,
    alignItems: 'center',
  },
  revenueTrajectoryBarFill: {
    width: '100%',
    borderRadius: 4,
    minHeight: 20,
  },
  revenueTrajectoryBarLabel: {
    fontSize: 10,
    marginTop: 8,
  },
  revenueTrajectorySummary: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: 'rgba(255,255,255,0.1)',
  },
  revenueTrajectorySummaryItem: {
    alignItems: 'center',
  },
  revenueTrajectorySummaryLabel: {
    fontSize: 11,
    marginBottom: 4,
  },
  revenueTrajectorySummaryValue: {
    fontSize: 16,
    fontWeight: '700',
  },
  funnelContainer: {
    borderRadius: 12,
    padding: 20,
    borderWidth: 1,
  },
  funnelHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 20,
  },
  funnelTitle: {
    fontSize: 16,
    fontWeight: '600',
  },
  funnelStages: {
    gap: 12,
    marginBottom: 20,
  },
  funnelStage: {
    gap: 8,
  },
  funnelStageInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  funnelStageName: {
    fontSize: 14,
    fontWeight: '600',
    width: 120,
  },
  funnelStageValue: {
    fontSize: 16,
    fontWeight: '700',
    width: 100,
  },
  funnelStagePercentage: {
    fontSize: 12,
  },
  funnelBar: {
    height: 24,
    borderRadius: 4,
  },
  funnelDropoff: {
    fontSize: 11,
    fontWeight: '600',
    marginLeft: 12,
  },
  funnelWorkflow: {
    padding: 12,
    backgroundColor: 'rgba(255,255,255,0.02)',
    borderRadius: 8,
  },
  funnelWorkflowTitle: {
    fontSize: 12,
    fontWeight: '600',
    marginBottom: 8,
  },
  funnelWorkflowSteps: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  funnelWorkflowStep: {
    fontSize: 11,
    fontWeight: '600',
  },
  adChannelsScroll: {
    marginBottom: 8,
  },
  adChannelCard: {
    borderRadius: 12,
    padding: 16,
    minWidth: 260,
    borderWidth: 1,
    marginRight: 12,
  },
  adChannelHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 12,
  },
  adChannelDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  adChannelName: {
    flex: 1,
    fontSize: 14,
    fontWeight: '600',
  },
  adChannelTrend: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 6,
    paddingVertical: 4,
    borderRadius: 4,
  },
  adChannelMetrics: {
    flexDirection: 'row',
    gap: 12,
  },
  adChannelMetric: {
    gap: 4,
  },
  adChannelMetricValue: {
    fontSize: 14,
    fontWeight: '700',
  },
  adChannelMetricLabel: {
    fontSize: 10,
  },
  productsScroll: {
    marginBottom: 8,
  },
  productCard: {
    borderRadius: 12,
    padding: 16,
    minWidth: 240,
    borderWidth: 1,
    marginRight: 12,
  },
  productInfo: {
    marginBottom: 12,
  },
  productName: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 4,
  },
  productSKU: {
    fontSize: 11,
  },
  productMetrics: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 12,
  },
  productMetric: {
    gap: 4,
  },
  productMetricValue: {
    fontSize: 14,
    fontWeight: '700',
  },
  productMetricLabel: {
    fontSize: 10,
  },
  productStatusBadge: {
    alignSelf: 'flex-start',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
  },
  productStatusText: {
    fontSize: 10,
    fontWeight: '600',
  },
  pricingScroll: {
    marginBottom: 8,
  },
  pricingCard: {
    borderRadius: 12,
    padding: 16,
    minWidth: 280,
    borderWidth: 1,
    marginRight: 12,
  },
  pricingInfo: {
    marginBottom: 12,
  },
  pricingProduct: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 8,
  },
  pricingPrices: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  pricingPrice: {
    gap: 4,
  },
  pricingPriceLabel: {
    fontSize: 10,
  },
  pricingPriceValue: {
    fontSize: 14,
    fontWeight: '600',
  },
  pricingMetrics: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 12,
  },
  pricingMetric: {
    gap: 4,
  },
  pricingMetricValue: {
    fontSize: 14,
    fontWeight: '700',
  },
  pricingMetricLabel: {
    fontSize: 10,
  },
  pricingRecommendation: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderRadius: 6,
  },
  pricingRecommendationText: {
    fontSize: 11,
    fontWeight: '600',
  },
  inventoryScroll: {
    marginBottom: 8,
  },
  inventoryCard: {
    borderRadius: 12,
    padding: 16,
    minWidth: 260,
    borderWidth: 1,
    marginRight: 12,
  },
  inventoryInfo: {
    marginBottom: 12,
  },
  inventoryProduct: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 4,
  },
  inventorySKU: {
    fontSize: 11,
  },
  inventoryMetrics: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 12,
  },
  inventoryMetric: {
    gap: 4,
  },
  inventoryMetricValue: {
    fontSize: 14,
    fontWeight: '700',
  },
  inventoryMetricLabel: {
    fontSize: 10,
  },
  inventoryLocation: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginBottom: 12,
  },
  inventoryWarehouse: {
    fontSize: 11,
  },
  inventoryStatusBadge: {
    alignSelf: 'flex-start',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
  },
  inventoryStatusText: {
    fontSize: 10,
    fontWeight: '600',
  },
  segmentsScroll: {
    marginBottom: 8,
  },
  segmentCard: {
    borderRadius: 12,
    padding: 16,
    minWidth: 260,
    borderWidth: 1,
    marginRight: 12,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  segmentDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  segmentInfo: {
    flex: 1,
  },
  segmentName: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 4,
  },
  segmentCount: {
    fontSize: 11,
  },
  segmentMetrics: {
    flexDirection: 'row',
    gap: 12,
  },
  segmentMetric: {
    gap: 4,
  },
  segmentMetricValue: {
    fontSize: 12,
    fontWeight: '700',
  },
  segmentMetricLabel: {
    fontSize: 9,
  },
  personalizationScroll: {
    marginBottom: 8,
  },
  personalizationCard: {
    borderRadius: 12,
    padding: 16,
    minWidth: 240,
    borderWidth: 1,
    marginRight: 12,
  },
  personalizationInfo: {
    marginBottom: 12,
  },
  personalizationType: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 12,
  },
  personalizationMetrics: {
    flexDirection: 'row',
    gap: 12,
  },
  personalizationMetric: {
    gap: 4,
  },
  personalizationMetricValue: {
    fontSize: 14,
    fontWeight: '700',
  },
  personalizationMetricLabel: {
    fontSize: 10,
  },
  fraudScroll: {
    marginBottom: 8,
  },
  fraudCard: {
    borderRadius: 12,
    padding: 16,
    minWidth: 260,
    borderWidth: 1,
    marginRight: 12,
  },
  fraudHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 12,
  },
  fraudType: {
    flex: 1,
    fontSize: 13,
    fontWeight: '600',
  },
  fraudSeverityBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
  },
  fraudSeverityText: {
    fontSize: 10,
    fontWeight: '600',
  },
  fraudDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  fraudAmount: {
    fontSize: 16,
    fontWeight: '700',
  },
  fraudTimestamp: {
    fontSize: 11,
  },
  fraudStatusBadge: {
    alignSelf: 'flex-start',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
  },
  fraudStatusText: {
    fontSize: 10,
    fontWeight: '600',
  },
  insightsGrid: {
    gap: 12,
  },
  insightCard: {
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
  },
  insightHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 12,
  },
  insightMeta: {
    flex: 1,
    gap: 2,
  },
  insightCategory: {
    fontSize: 12,
    fontWeight: '600',
  },
  insightTimestamp: {
    fontSize: 10,
  },
  insightConfidenceBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
  },
  insightConfidenceText: {
    fontSize: 11,
    fontWeight: '600',
  },
  insightText: {
    fontSize: 14,
    lineHeight: 20,
    marginBottom: 12,
  },
  insightAction: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderRadius: 6,
    alignSelf: 'flex-start',
  },
  insightActionText: {
    fontSize: 11,
    fontWeight: '600',
  },
  activityFeed: {
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
  },
  activityItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255,255,255,0.05)',
  },
  activityIcon: {
    width: 32,
    height: 32,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  activityContent: {
    flex: 1,
    gap: 4,
  },
  activityEvent: {
    fontSize: 13,
    fontWeight: '600',
  },
  activityDetails: {
    fontSize: 11,
  },
  activityTimestamp: {
    fontSize: 10,
  },
  healthScroll: {
    marginBottom: 8,
  },
  healthCard: {
    borderRadius: 12,
    padding: 16,
    minWidth: 220,
    borderWidth: 1,
    marginRight: 12,
  },
  healthHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 12,
  },
  healthSystem: {
    flex: 1,
    fontSize: 13,
    fontWeight: '600',
  },
  healthStatusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
  },
  healthStatusText: {
    fontSize: 10,
    fontWeight: '600',
  },
  healthMetrics: {
    flexDirection: 'row',
    gap: 12,
  },
  healthMetric: {
    gap: 4,
  },
  healthMetricValue: {
    fontSize: 12,
    fontWeight: '700',
  },
  healthMetricLabel: {
    fontSize: 9,
  },
  regionCard: {
    borderRadius: 12,
    padding: 16,
    minWidth: 200,
    borderWidth: 1,
    marginRight: 12,
  },
  regionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 12,
  },
  regionName: {
    flex: 1,
    fontSize: 14,
    fontWeight: '600',
  },
  regionMetrics: {
    gap: 8,
  },
  regionMetric: {
    gap: 4,
  },
  regionMetricValue: {
    fontSize: 16,
    fontWeight: '700',
  },
  regionMetricLabel: {
    fontSize: 10,
  },
  revenueFlowItem: {
    marginBottom: 12,
  },
  revenueFlowBar: {
    height: 8,
    borderRadius: 4,
    marginBottom: 8,
  },
  revenueFlowContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  revenueFlowSource: {
    fontSize: 13,
    fontWeight: '600',
  },
  revenueFlowAmount: {
    fontSize: 14,
    fontWeight: '700',
  },
  revenueFlowTrend: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
  },
  revenueFlowPercentage: {
    fontSize: 11,
    fontWeight: '600',
  },
  journeyStage: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 12,
  },
  journeyStageDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
  },
  journeyStageContent: {
    flex: 1,
  },
  journeyStageName: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 4,
  },
  journeyStageMetrics: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  journeyStageUsers: {
    fontSize: 12,
    fontWeight: '600',
  },
  journeyStageTime: {
    fontSize: 11,
  },
  journeyStageConversion: {
    fontSize: 12,
    fontWeight: '700',
  },
  regionsScroll: {
    marginBottom: 8,
  },
  revenueFlowContainer: {
    marginBottom: 8,
  },
  revenueFlowHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 20,
  },
  revenueFlowTitle: {
    flex: 1,
    fontSize: 16,
    fontWeight: '600',
  },
  revenueFlowTotal: {
    fontSize: 16,
    fontWeight: '700',
  },
  journeyContainer: {
    marginBottom: 8,
  },
  journeyHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 20,
  },
  journeyTitle: {
    fontSize: 16,
    fontWeight: '600',
  },
  demandScroll: {
    marginBottom: 8,
  },
  demandCard: {
    borderRadius: 12,
    padding: 16,
    minWidth: 260,
    borderWidth: 1,
    marginRight: 12,
  },
  demandHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 12,
  },
  demandProduct: {
    flex: 1,
    fontSize: 14,
    fontWeight: '600',
  },
  demandMetrics: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 12,
  },
  demandMetric: {
    gap: 4,
  },
  demandMetricLabel: {
    fontSize: 10,
  },
  demandMetricValue: {
    fontSize: 14,
    fontWeight: '700',
  },
  demandConfidence: {
    gap: 6,
  },
  demandConfidenceLabel: {
    fontSize: 11,
  },
  demandConfidenceBar: {
    height: 6,
    backgroundColor: 'rgba(255,255,255,0.1)',
    borderRadius: 3,
    overflow: 'hidden',
  },
  demandConfidenceFill: {
    height: '100%',
    borderRadius: 3,
  },
  demandConfidenceValue: {
    fontSize: 12,
    fontWeight: '700',
  },
  attributionScroll: {
    marginBottom: 8,
  },
  attributionCard: {
    borderRadius: 12,
    padding: 16,
    minWidth: 240,
    borderWidth: 1,
    marginRight: 12,
  },
  attributionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 12,
  },
  attributionDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
  },
  attributionChannel: {
    flex: 1,
    fontSize: 14,
    fontWeight: '600',
  },
  attributionValue: {
    fontSize: 16,
    fontWeight: '700',
  },
  attributionMetrics: {
    flexDirection: 'row',
    gap: 12,
  },
  attributionMetric: {
    gap: 4,
  },
  attributionMetricValue: {
    fontSize: 13,
    fontWeight: '700',
  },
  attributionMetricLabel: {
    fontSize: 10,
  },
  pricingScroll: {
    marginBottom: 8,
  },
  pricingCard: {
    borderRadius: 12,
    padding: 16,
    minWidth: 280,
    borderWidth: 1,
    marginRight: 12,
  },
  pricingHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 12,
  },
  pricingProduct: {
    flex: 1,
    fontSize: 14,
    fontWeight: '600',
  },
  pricingComparison: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 12,
  },
  pricingPrice: {
    gap: 4,
  },
  pricingPriceLabel: {
    fontSize: 10,
  },
  pricingPriceValue: {
    fontSize: 16,
    fontWeight: '700',
  },
  pricingMetrics: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 12,
  },
  pricingMetric: {
    gap: 4,
  },
  pricingMetricValue: {
    fontSize: 13,
    fontWeight: '700',
  },
  pricingMetricLabel: {
    fontSize: 10,
  },
  pricingImpact: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 8,
    borderTopWidth: 1,
    borderTopColor: 'rgba(255,255,255,0.1)',
  },
  pricingImpactLabel: {
    fontSize: 11,
  },
  pricingImpactValue: {
    fontSize: 13,
    fontWeight: '700',
  },
  funnelContainer: {
    marginBottom: 8,
  },
  funnelHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 20,
  },
  funnelTitle: {
    fontSize: 16,
    fontWeight: '600',
  },
  funnelStage: {
    marginBottom: 16,
  },
  funnelStageHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 12,
  },
  funnelStageDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
  },
  funnelStageName: {
    flex: 1,
    fontSize: 14,
    fontWeight: '600',
  },
  funnelStageTrend: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
  },
  funnelStageMetrics: {
    flexDirection: 'row',
    gap: 16,
  },
  funnelStageMetric: {
    gap: 4,
  },
  funnelStageMetricValue: {
    fontSize: 14,
    fontWeight: '700',
  },
  funnelStageMetricLabel: {
    fontSize: 10,
  },
  executiveKpiScroll: {
    marginBottom: 8,
  },
  executiveKpiCard: {
    borderRadius: 12,
    padding: 16,
    minWidth: 200,
    borderWidth: 1,
    marginRight: 12,
  },
  executiveKpiHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  executiveKpiMetric: {
    fontSize: 13,
    fontWeight: '600',
  },
  executiveKpiTrend: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
  },
  executiveKpiMetrics: {
    gap: 8,
  },
  executiveKpiMetricValue: {
    gap: 4,
  },
  executiveKpiValue: {
    fontSize: 18,
    fontWeight: '700',
  },
  executiveKpiTarget: {
    fontSize: 11,
  },
  executiveKpiVariance: {
    gap: 4,
  },
  executiveKpiVarianceValue: {
    fontSize: 14,
    fontWeight: '700',
  },
  executiveKpiVarianceLabel: {
    fontSize: 10,
  },
  recommendationScroll: {
    marginBottom: 8,
  },
  recommendationCard: {
    borderRadius: 12,
    padding: 16,
    minWidth: 280,
    borderWidth: 1,
    marginRight: 12,
  },
  recommendationHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 8,
  },
  recommendationProduct: {
    flex: 1,
    fontSize: 14,
    fontWeight: '600',
  },
  recommendationText: {
    fontSize: 13,
    marginBottom: 12,
    lineHeight: 18,
  },
  recommendationMetrics: {
    flexDirection: 'row',
    gap: 16,
  },
  recommendationMetric: {
    gap: 4,
  },
  recommendationMetricLabel: {
    fontSize: 10,
  },
  recommendationMetricValue: {
    fontSize: 13,
    fontWeight: '700',
  },
});

export default ECommerceCommandCenter;
