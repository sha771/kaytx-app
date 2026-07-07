/**
 * =============================================================================
 * FASHION & LUXURY AI AGENTS COMMAND CENTER
 * =============================================================================
 *
 * A futuristic enterprise-grade Fashion & Luxury AI Operating System that manages
 * autonomous AI agents responsible for luxury retail operations, fashion merchandising,
 * inventory optimization, customer intelligence, omnichannel commerce, demand forecasting,
 * pricing, marketing, styling, logistics, sustainability, VIP clienteling, and executive
 * decision-making in real time.
 *
 * @version 1.0.0
 * @lastUpdated 2026-06-26
 */

import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Dimensions,
  useWindowDimensions,
} from 'react-native';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import Animated, { FadeInUp, FadeIn } from 'react-native-reanimated';
import {
  ChevronLeft,
  Sparkles,
  Crown,
  Gem,
  ShoppingBag,
  Users,
  TrendingUp,
  DollarSign,
  Activity,
  Brain,
  Zap,
  Globe,
  Package,
  Truck,
  Target,
  Flame,
  Award,
  Clock,
  Calendar,
  ArrowUpRight,
  ArrowDownRight,
  Minus,
  Eye,
  Heart,
  Star,
  Radio,
  Monitor,
  Wifi,
  Database,
  Settings,
  ChevronRight,
  LayoutDashboard,
  User,
  ChartBarBig,
  Factory,
  Navigation,
  Scan,
  Search,
  Filter,
  Layers,
  Grid3x3,
  List,
  Maximize2,
  Minimize2,
  RefreshCw,
  Download,
  Upload,
  Share2,
  Printer,
  FileText,
  Image as ImageIcon,
  Video,
  Mic,
  Camera,
  Bell,
  BellRing,
  MessageSquare,
  Mail,
  Phone,
  UserPlus,
  UserMinus,
  UserCheck,
  UserX,
  Shield,
  ShieldCheck,
  Lock,
  Unlock,
  Key,
  Fingerprint,
  EyeOff,
  MoreHorizontal,
  MoreVertical,
  Menu,
  X,
  Plus,
  Divide,
  Percent,
  Hash,
  AtSign,
  Euro,
  PoundSterling,
  Bitcoin,
  CreditCard,
  Banknote,
  Wallet,
  PiggyBank,
  TrendingDown,
  BarChart,
  BarChart2,
  BarChart4,
  AreaChart,
  Box,
  Package2,
  PackageCheck,
  PackageX,
  PackageSearch,
  PackageOpen,
  Archive,
  ArchiveRestore,
  ArchiveX,
  Folder,
  FolderOpen,
  FolderPlus,
  FolderMinus,
  File,
  FilePlus,
  FileMinus,
  FileCheck,
  FileX,
  FileSearch,
  FileCode,
  FileImage,
  FileVideo,
  FileAudio,
  FileArchive,
  FileSpreadsheet,
  FileQuestion,
  FileLock,
  FileWarning,
  FileHeart,
  FileClock,
  FileUser,
  FileEdit,
  FileDiff,
  FileKey,
  FileDigit,
  FileJson,
  Shirt,
  Scissors,
  Ruler,
  Palette,
  Store,
  MapPin,
  Building2,
  Briefcase,
  AlertTriangle,
  CheckCircle,
  XCircle,
  Play,
  Pause,
  BarChart3,
  PieChart,
  LineChart,
  Map,
  Server,
  Cpu,
  Gauge,
  Cloud,
  Warehouse,
  Ship,
  Plane,
  Train,
  Battery,
  CloudLightning,
  Umbrella,
  Compass,
  Route,
  Radar,
  Tag,
  Ticket,
  Receipt,
  Calculator,
  Scale,
  BadgeCheck,
  BadgeAlert,
  BadgeHelp,
  Trophy,
  Medal,
  Ribbon,
  Diamond,
  ThumbsUp,
  ThumbsDown,
  Smile,
  Frown,
  Meh,
  Laugh,
  HeartHandshake,
  Handshake,
  HandCoins,
  Coins,
  Bank,
  Building,
  Landmark,
  Leaf,
  Droplets,
  Sun
} from 'lucide-react-native';
import { BlurView } from 'expo-blur';
import Svg, { Path, Circle, Defs, LinearGradient, Stop, Line, Rect, Ellipse } from 'react-native-svg';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

// Theme Colors
const THEME = {
  background: '#050505',
  card: '#0A0F1E',
  cardLight: '#121829',
  luxuryGold: '#D4AF37',
  platinumSilver: '#E5E4E2',
  emeraldGreen: '#10B981',
  royalPurple: '#8B5CF6',
  roseGold: '#B76E79',
  crimson: '#DC143C',
  sapphireBlue: '#0F4C75',
  text: '#E2E8F0',
  textMuted: '#94A3B8',
  border: '#1E293B',
};

// Executive KPI Data
const EXECUTIVE_KPIS = {
  sales: {
    totalRevenue: { value: '$4.8B', change: 18.7, trend: 'up' },
    onlineSales: { value: '$2.1B', change: 24.3, trend: 'up' },
    boutiqueSales: { value: '$2.7B', change: 14.2, trend: 'up' },
    averageOrderValue: { value: '$847', change: 8.5, trend: 'up' },
    grossMargin: { value: '67%', change: 3.2, trend: 'up' },
  },
  customer: {
    activeCustomers: { value: '2.4M', change: 12.8, trend: 'up' },
    vipClients: { value: '89K', change: 22.5, trend: 'up' },
    customerLifetimeValue: { value: '$12.4K', change: 15.3, trend: 'up' },
    repeatPurchaseRate: { value: '78%', change: 5.7, trend: 'up' },
    customerSatisfaction: { value: '94%', change: 2.4, trend: 'up' },
  },
  inventory: {
    stockValue: { value: '$890M', change: -8.3, trend: 'down' },
    sellThroughRate: { value: '87%', change: 6.2, trend: 'up' },
    outOfStockAlerts: { value: '23', change: -34.5, trend: 'down' },
    inventoryTurnover: { value: '4.2x', change: 12.8, trend: 'up' },
    returnsRate: { value: '8.4%', change: -15.7, trend: 'down' },
  },
  marketing: {
    campaignROI: { value: '340%', change: 28.5, trend: 'up' },
    socialReach: { value: '45M', change: 42.3, trend: 'up' },
    influencerRevenue: { value: '$234M', change: 67.8, trend: 'up' },
    emailConversion: { value: '12.4%', change: 8.9, trend: 'up' },
    websiteTraffic: { value: '8.9M', change: 34.2, trend: 'up' },
  },
  ai: {
    aiRecommendations: { value: '1.2M', change: 89.4, trend: 'up' },
    demandForecastAccuracy: { value: '94%', change: 7.8, trend: 'up' },
    stylingSessions: { value: '234K', change: 156.7, trend: 'up' },
    automatedDecisions: { value: '45.6K', change: 234.5, trend: 'up' },
    revenueInfluenced: { value: '$1.2B', change: 67.8, trend: 'up' },
  },
};

// AI Fashion Agents
const AI_FASHION_AGENTS = [
  {
    id: 'vogue',
    name: 'Agent Vogue',
    role: 'Fashion Trend Intelligence',
    color: THEME.royalPurple,
    icon: Sparkles,
    responsibilities: [
      'Trend forecasting',
      'Collection planning',
      'Fashion analysis',
      'Seasonal predictions',
    ],
    metrics: {
      trendsIdentified: '2,347',
      forecastAccuracy: '94%',
      collectionsOptimized: '89',
    },
    status: 'active',
    efficiency: 96,
  },
  {
    id: 'couture',
    name: 'Agent Couture',
    role: 'Luxury Merchandising',
    color: THEME.luxuryGold,
    icon: Gem,
    responsibilities: [
      'Product assortment',
      'Merchandising optimization',
      'Collection performance',
      'Category intelligence',
    ],
    metrics: {
      productsOptimized: '12,847',
      sellThroughRate: '+18%',
      revenueGrowth: '+24%',
    },
    status: 'active',
    efficiency: 94,
  },
  {
    id: 'muse',
    name: 'Agent Muse',
    role: 'AI Personal Stylist',
    color: THEME.roseGold,
    icon: Heart,
    responsibilities: [
      'Outfit recommendations',
      'Personal styling',
      'Client preferences',
      'Wardrobe suggestions',
    ],
    metrics: {
      stylingSessions: '234K',
      conversionRate: '67%',
      customerSatisfaction: '96%',
    },
    status: 'active',
    efficiency: 92,
  },
  {
    id: 'elite',
    name: 'Agent Elite',
    role: 'VIP Clienteling',
    color: THEME.platinumSilver,
    icon: Crown,
    responsibilities: [
      'VIP engagement',
      'Concierge services',
      'Purchase predictions',
      'Personalized experiences',
    ],
    metrics: {
      vipRevenue: '$890M',
      retentionRate: '94%',
      clientSatisfaction: '98%',
    },
    status: 'active',
    efficiency: 97,
  },
  {
    id: 'luxe',
    name: 'Agent Luxe',
    role: 'Pricing Intelligence',
    color: THEME.emeraldGreen,
    icon: Calculator,
    responsibilities: [
      'Dynamic pricing',
      'Promotion optimization',
      'Competitive analysis',
      'Margin optimization',
    ],
    metrics: {
      marginImprovement: '+12%',
      priceAccuracy: '96%',
      revenueImpact: '$234M',
    },
    status: 'active',
    efficiency: 93,
  },
  {
    id: 'atlas',
    name: 'Agent Atlas',
    role: 'Global Supply Chain',
    color: THEME.sapphireBlue,
    icon: Globe,
    responsibilities: [
      'Logistics optimization',
      'Supplier monitoring',
      'Warehouse intelligence',
      'Delivery forecasting',
    ],
    metrics: {
      ordersDelivered: '1.2M',
      onTimeRate: '96%',
      supplyEfficiency: '92%',
    },
    status: 'active',
    efficiency: 95,
  },
  {
    id: 'nova',
    name: 'Agent Nova',
    role: 'Marketing Intelligence',
    color: THEME.crimson,
    icon: TrendingUp,
    responsibilities: [
      'Campaign optimization',
      'Social media',
      'Influencer management',
      'Customer acquisition',
    ],
    metrics: {
      campaignROI: '340%',
      leadsGenerated: '890K',
      engagementGrowth: '+67%',
    },
    status: 'active',
    efficiency: 91,
  },
  {
    id: 'sentinel',
    name: 'Agent Sentinel',
    role: 'Fraud & Security',
    color: THEME.crimson,
    icon: Shield,
    responsibilities: [
      'Fraud detection',
      'Payment monitoring',
      'Counterfeit prevention',
      'Risk management',
    ],
    metrics: {
      fraudPrevented: '2,347',
      secureTransactions: '99.8%',
      riskScore: 'Low',
    },
    status: 'active',
    efficiency: 98,
  },
];

// AI Insights
const AI_INSIGHTS = [
  {
    id: 1,
    type: 'opportunity',
    title: 'Luxury Handbag Demand Surge',
    message: 'Demand forecast predicts 18% higher sales for luxury handbags next month.',
    impact: 'High',
    action: 'Increase inventory allocation for premium handbag collection',
    timestamp: '2 hours ago',
  },
  {
    id: 2,
    type: 'opportunity',
    title: 'VIP Customer Intent Increase',
    message: 'VIP customer segment shows a 32% increase in purchase intent.',
    impact: 'High',
    action: 'Launch personalized VIP campaign with exclusive offers',
    timestamp: '4 hours ago',
  },
  {
    id: 3,
    type: 'efficiency',
    title: 'Inventory Cost Optimization',
    message: 'Inventory optimization can reduce stock costs by $8.4M.',
    impact: 'High',
    action: 'Implement AI-driven inventory allocation strategy',
    timestamp: '6 hours ago',
  },
  {
    id: 4,
    type: 'opportunity',
    title: 'Premium Footwear Outperformance',
    message: 'Premium footwear collection is outperforming forecast by 22%.',
    impact: 'Medium',
    action: 'Expand premium footwear assortment and marketing',
    timestamp: '8 hours ago',
  },
  {
    id: 5,
    type: 'prediction',
    title: 'Asia-Pacific Inventory Recommendation',
    message: 'AI recommends increasing inventory for high-demand products in Asia-Pacific.',
    impact: 'High',
    action: 'Adjust regional inventory distribution strategy',
    timestamp: '12 hours ago',
  },
  {
    id: 6,
    type: 'efficiency',
    title: 'Styling Conversion Optimization',
    message: 'AI styling recommendations can increase conversion by 15%.',
    impact: 'Medium',
    action: 'Deploy personalized styling engine across all channels',
    timestamp: '18 hours ago',
  },
];

// Live Activity Feed
const ACTIVITY_FEED = [
  { id: 1, type: 'order', message: 'VIP order completed - $45,000 Chanel handbag', time: '2 min ago', icon: ShoppingBag },
  { id: 2, type: 'styling', message: 'AI styling session - 234 recommendations generated', time: '5 min ago', icon: Sparkles },
  { id: 3, type: 'inventory', message: 'Stock alert - Limited edition Gucci collection low', time: '8 min ago', icon: Package },
  { id: 4, type: 'customer', message: 'New VIP client - Luxury tier assigned', time: '12 min ago', icon: Crown },
  { id: 5, type: 'marketing', message: 'Campaign launched - Spring collection promotion', time: '15 min ago', icon: TrendingUp },
  { id: 6, type: 'supply', message: 'Shipment arrived - Paris boutique restocked', time: '20 min ago', icon: Truck },
  { id: 7, type: 'fraud', message: 'Fraud prevented - Suspicious transaction blocked', time: '25 min ago', icon: Shield },
  { id: 8, type: 'pricing', message: 'Dynamic pricing adjusted - Premium collection +5%', time: '30 min ago', icon: Calculator },
];

// Collection Intelligence Data
const COLLECTION_INTELLIGENCE = {
  seasonalCollections: { spring: 234, summer: 189, fall: 234, winter: 267 },
  newArrivals: { thisWeek: 89, thisMonth: 234, total: 1247 },
  bestSellers: { handbags: 45, footwear: 34, accessories: 23, apparel: 67 },
  slowMovers: { category1: 12, category2: 8, category3: 5 },
  productLifecycle: { launch: 23, growth: 67, maturity: 89, decline: 12 },
};

// Inventory Command Center Data
const INVENTORY_DATA = {
  warehouseStock: { total: '$890M', luxury: '$456M', premium: '$234M', standard: '$200M' },
  boutiqueInventory: { paris: 89, milan: 78, london: 67, newyork: 92, tokyo: 85 },
  lowStockAlerts: { critical: 12, warning: 34, normal: 890 },
  overstockRisks: { category1: 23, category2: 12, category3: 8 },
  returns: { rate: '8.4%', value: '$23.4M', trend: 'down' },
};

// Customer Intelligence Data
const CUSTOMER_INTELLIGENCE = {
  customerSegments: { vip: 89, premium: 234, standard: 890, new: 456 },
  vipClients: { total: '89K', active: '78K', new: '11K' },
  loyalty: { gold: 23, platinum: 45, diamond: 12, black: 8 },
  purchaseHistory: { avgFrequency: '2.3/month', avgValue: '$847', trend: 'up' },
  shoppingBehavior: { online: 67, boutique: 23, omnichannel: 10 },
};

// E-Commerce Data
const ECOMMERCE_DATA = {
  websiteRevenue: { today: '$2.3M', week: '$15.6M', month: '$67.8M' },
  conversionRate: { current: '4.2%', benchmark: '3.8%', trend: 'up' },
  cartAbandonment: { rate: '34%', value: '$8.9M', trend: 'down' },
  checkoutPerformance: { completion: '89%', abandonment: '11%', time: '2.3min' },
  productViews: { today: '1.2M', unique: '890K', avgTime: '2.4min' },
};

// Boutique Operations Data
const BOUTIQUE_DATA = {
  storeRevenue: { paris: '$234M', milan: '$189M', london: '$167M', newyork: '$245M', tokyo: '$198M' },
  footTraffic: { avgDaily: '12,847', peak: '23,456', trend: 'up' },
  staffPerformance: { topPerformers: 23, avgSales: '$45K', satisfaction: '94%' },
  regionalSales: { europe: '45%', americas: '34%', asia: '21%' },
  boutiqueRankings: { first: 'Paris', second: 'New York', third: 'Tokyo' },
};

// Marketing Intelligence Data
const MARKETING_DATA = {
  campaignPerformance: { active: 23, completed: 89, planned: 45 },
  socialMedia: { followers: '12.4M', engagement: '8.9%', reach: '45M' },
  influencers: { total: 234, active: 189, revenue: '$234M' },
  luxuryEvents: { upcoming: 12, attended: 89, impact: 'High' },
  emailMarketing: { subscribers: '2.4M', openRate: '34%', conversion: '12.4%' },
};

// Supply Chain Data
const SUPPLY_CHAIN_DATA = {
  suppliers: { total: 234, active: 189, new: 45 },
  shipments: { inTransit: 234, atWarehouse: 567, delivered: 1247 },
  manufacturing: { inProduction: 89, completed: 234, planned: 45 },
  logistics: { onTime: 94, delayed: 4, pending: 2 },
  distribution: { direct: 67, warehouse: 23, boutique: 10 },
};

// Global Operations Data
const GLOBAL_OPERATIONS = {
  revenueByRegion: { europe: '$1.8B', americas: '$1.6B', asia: '$1.2B', middleEast: '$200M' },
  boutiqueLocations: { total: 234, new: 12, planned: 8 },
  warehouseNetwork: { total: 23, capacity: 89, utilization: 78 },
  customerDistribution: { local: 45, regional: 34, international: 21 },
  supplyChain: { suppliers: 234, manufacturers: 89, distributors: 45 },
};

// System Health Data
const SYSTEM_HEALTH = {
  commerceApis: { status: 'healthy', active: '23', offline: '0', health: 99.9 },
  inventoryServices: { status: 'healthy', active: '45', offline: '0', health: 99.5 },
  aiModels: { status: 'healthy', active: '89', offline: '0', health: 98.7 },
  paymentSystems: { status: 'healthy', active: '12', offline: '0', health: 99.8 },
  erpIntegration: { status: 'healthy', active: '8', offline: '0', health: 99.2 },
  crm: { status: 'healthy', active: '23', offline: '0', health: 98.9 },
  recommendationEngine: { status: 'healthy', active: '34', offline: '0', health: 97.8 },
};

// Sustainability Data
const SUSTAINABILITY_DATA = {
  carbonFootprint: { current: '45,234 tons', reduction: '23%', target: '30%' },
  waterUsage: { saved: '12.4M gallons', efficiency: 89, target: 85 },
  renewableEnergy: { solar: 34, wind: 23, biomass: 12, total: 69 },
  ethicalSourcing: { suppliers: 234, certified: 189, score: 94 },
  circularEconomy: { recycled: 67, upcycled: 23, repaired: 12 },
  esgScore: { environmental: 92, social: 88, governance: 95, overall: 92 },
};

export default function FashionLuxuryCommandCenter() {
  const router = useRouter();
  const { width } = useWindowDimensions();
  const [selectedKPI, setSelectedKPI] = useState('sales');
  const [activeSection, setActiveSection] = useState('agents');

  const renderKPICard = (label: string, data: any, color: string) => (
    <Animated.View entering={FadeInUp.delay(100).springify()} style={[styles.kpiCard, { backgroundColor: THEME.cardLight, borderColor: color + '30' }]}>
      <Text style={[styles.kpiLabel, { color: THEME.textMuted }]}>{label}</Text>
      <Text style={[styles.kpiValue, { color: THEME.text }]}>{data.value}</Text>
      <View style={styles.kpiTrend}>
        {data.trend === 'up' ? (
          <ArrowUpRight size={16} color={THEME.emeraldGreen} />
        ) : data.trend === 'down' ? (
          <ArrowDownRight size={16} color={THEME.crimson} />
        ) : (
          <Minus size={16} color={THEME.textMuted} />
        )}
        <Text style={[styles.kpiChange, { color: data.trend === 'up' ? THEME.emeraldGreen : data.trend === 'down' ? THEME.crimson : THEME.textMuted }]}>
          {Math.abs(data.change)}%
        </Text>
      </View>
    </Animated.View>
  );

  const renderAgentCard = (agent: any) => (
    <Animated.View entering={FadeInUp.springify()} key={agent.id} style={[styles.agentCard, { backgroundColor: THEME.cardLight, borderColor: agent.color + '30' }]}>
      <View style={[styles.agentIcon, { backgroundColor: agent.color + '20' }]}>
        <agent.icon size={32} color={agent.color} />
      </View>
      <View style={styles.agentInfo}>
        <View style={styles.agentHeader}>
          <Text style={[styles.agentName, { color: THEME.text }]}>{agent.name}</Text>
          <View style={[styles.statusBadge, { backgroundColor: agent.color + '20' }]}>
            <View style={[styles.statusDot, { backgroundColor: agent.color }]} />
            <Text style={[styles.statusText, { color: agent.color }]}>{agent.status}</Text>
          </View>
        </View>
        <Text style={[styles.agentRole, { color: THEME.textMuted }]}>{agent.role}</Text>
        <View style={styles.responsibilities}>
          {agent.responsibilities.slice(0, 2).map((resp: string, i: number) => (
            <View key={i} style={[styles.respChip, { backgroundColor: agent.color + '10' }]}>
              <Text style={[styles.respText, { color: agent.color }]}>{resp}</Text>
            </View>
          ))}
        </View>
        <View style={styles.metricsRow}>
          {Object.entries(agent.metrics).map(([key, value]: [string, any]) => (
            <View key={key} style={styles.metricItem}>
              <Text style={[styles.metricValue, { color: THEME.text }]}>{value}</Text>
              <Text style={[styles.metricLabel, { color: THEME.textMuted }]}>{key.replace(/([A-Z])/g, ' $1').trim()}</Text>
            </View>
          ))}
        </View>
        <View style={styles.efficiencyBar}>
          <View style={[styles.efficiencyFill, { width: `${agent.efficiency}%`, backgroundColor: agent.color }]} />
          <Text style={[styles.efficiencyText, { color: THEME.text }]}>{agent.efficiency}% Efficiency</Text>
        </View>
      </View>
    </Animated.View>
  );

  const renderInsightCard = (insight: any) => {
    const colors = {
      warning: THEME.luxuryGold,
      opportunity: THEME.emeraldGreen,
      efficiency: THEME.sapphireBlue,
      alert: THEME.crimson,
      prediction: THEME.royalPurple,
      positive: THEME.emeraldGreen,
    };
    const color = colors[insight.type as keyof typeof colors] || THEME.textMuted;
    
    return (
      <Animated.View entering={FadeInUp.springify()} key={insight.id} style={[styles.insightCard, { backgroundColor: THEME.cardLight, borderLeftColor: color }]}>
        <View style={styles.insightHeader}>
          <View style={[styles.insightIcon, { backgroundColor: color + '20' }]}>
            {insight.type === 'warning' && <AlertTriangle size={20} color={color} />}
            {insight.type === 'opportunity' && <Sparkles size={20} color={color} />}
            {insight.type === 'efficiency' && <Zap size={20} color={color} />}
            {insight.type === 'alert' && <ShieldAlert size={20} color={color} />}
            {insight.type === 'prediction' && <Brain size={20} color={color} />}
            {insight.type === 'positive' && <CheckCircle size={20} color={color} />}
          </View>
          <View style={styles.insightMeta}>
            <Text style={[styles.insightTitle, { color: THEME.text }]}>{insight.title}</Text>
            <Text style={[styles.insightTime, { color: THEME.textMuted }]}>{insight.timestamp}</Text>
          </View>
          <View style={[styles.impactBadge, { backgroundColor: color + '20' }]}>
            <Text style={[styles.impactText, { color: color }]}>{insight.impact}</Text>
          </View>
        </View>
        <Text style={[styles.insightMessage, { color: THEME.textMuted }]}>{insight.message}</Text>
        <View style={[styles.actionBox, { backgroundColor: color + '10' }]}>
          <Text style={[styles.actionText, { color: color }]}>Recommended: {insight.action}</Text>
        </View>
      </Animated.View>
    );
  };

  const renderActivityItem = (activity: any) => (
    <Animated.View entering={FadeInUp.springify()} key={activity.id} style={styles.activityItem}>
      <View style={[styles.activityIcon, { backgroundColor: THEME.luxuryGold + '20' }]}>
        <activity.icon size={18} color={THEME.luxuryGold} />
      </View>
      <View style={styles.activityContent}>
        <Text style={[styles.activityMessage, { color: THEME.text }]}>{activity.message}</Text>
        <Text style={[styles.activityTime, { color: THEME.textMuted }]}>{activity.time}</Text>
      </View>
    </Animated.View>
  );

  const renderSystemHealth = (system: any, key: string) => {
    const IconMap: any = {
      commerceApis: Server,
      inventoryServices: Warehouse,
      aiModels: Brain,
      paymentSystems: CreditCard,
      erpIntegration: Building2,
      crm: Users,
      recommendationEngine: Sparkles,
    };
    const Icon = IconMap[key] || Server;
    const statusColor = system.status === 'healthy' ? THEME.emeraldGreen : THEME.crimson;
    
    return (
      <Animated.View entering={FadeInUp.springify()} key={key} style={[styles.healthCard, { backgroundColor: THEME.cardLight }]}>
        <View style={[styles.healthIcon, { backgroundColor: statusColor + '20' }]}>
          <Icon size={24} color={statusColor} />
        </View>
        <View style={styles.healthInfo}>
          <Text style={[styles.healthName, { color: THEME.text }]}>{key.replace(/([A-Z])/g, ' $1').trim()}</Text>
          <View style={styles.healthStats}>
            <View style={styles.healthStat}>
              <Text style={[styles.healthStatValue, { color: THEME.emeraldGreen }]}>{system.active}</Text>
              <Text style={[styles.healthStatLabel, { color: THEME.textMuted }]}>Active</Text>
            </View>
            <View style={styles.healthStat}>
              <Text style={[styles.healthStatValue, { color: THEME.crimson }]}>{system.offline}</Text>
              <Text style={[styles.healthStatLabel, { color: THEME.textMuted }]}>Offline</Text>
            </View>
            <View style={styles.healthStat}>
              <Text style={[styles.healthStatValue, { color: statusColor }]}>{system.health}%</Text>
              <Text style={[styles.healthStatLabel, { color: THEME.textMuted }]}>Health</Text>
            </View>
          </View>
        </View>
        <View style={[styles.healthIndicator, { backgroundColor: statusColor + '30' }]}>
          <View style={[styles.healthFill, { width: `${system.health}%`, backgroundColor: statusColor }]} />
        </View>
      </Animated.View>
    );
  };

  const renderCommandCard = (label: string, value: string, icon: any, color: string, change: string, trend: string, delay: number) => (
    <Animated.View entering={FadeInUp.delay(delay).springify()} style={[styles.commandCard, { backgroundColor: THEME.cardLight }]}>
      <View style={[styles.commandIcon, { backgroundColor: color + '20' }]}>
        <icon size={32} color={color} />
      </View>
      <Text style={[styles.commandValue, { color: THEME.text }]}>{value}</Text>
      <Text style={[styles.commandLabel, { color: THEME.textMuted }]}>{label}</Text>
      <View style={styles.commandTrend}>
        {trend === 'up' ? (
          <ArrowUpRight size={16} color={THEME.emeraldGreen} />
        ) : (
          <ArrowDownRight size={16} color={THEME.crimson} />
        )}
        <Text style={[styles.commandChange, { color: trend === 'up' ? THEME.emeraldGreen : THEME.crimson }]}>{change}</Text>
      </View>
    </Animated.View>
  );

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: THEME.background }]}>
      {/* Header */}
      <View style={[styles.header, { borderBottomColor: THEME.border }]}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <ChevronLeft size={24} color={THEME.text} />
        </TouchableOpacity>
        <View style={styles.headerContent}>
          <View style={[styles.headerIcon, { backgroundColor: THEME.luxuryGold + '20' }]}>
            <Gem size={28} color={THEME.luxuryGold} />
          </View>
          <View>
            <Text style={[styles.headerTitle, { color: THEME.text }]}>Fashion & Luxury AI Command Center</Text>
            <Text style={[styles.headerSubtitle, { color: THEME.textMuted }]}>Autonomous Luxury Retail Operations</Text>
          </View>
        </View>
        <TouchableOpacity style={styles.settingsButton}>
          <Settings size={24} color={THEME.text} />
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Executive KPI Bar */}
        <View style={styles.kpiSection}>
          <View style={styles.kpiTabs}>
            {Object.keys(EXECUTIVE_KPIS).map((key) => (
              <TouchableOpacity
                key={key}
                onPress={() => setSelectedKPI(key)}
                style={[styles.kpiTab, selectedKPI === key && { backgroundColor: THEME.luxuryGold + '20', borderColor: THEME.luxuryGold }]}
              >
                <Text style={[styles.kpiTabText, selectedKPI === key ? { color: THEME.luxuryGold } : { color: THEME.textMuted }]}>
                  {key.charAt(0).toUpperCase() + key.slice(1)}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.kpiScroll}>
            <View style={styles.kpiRow}>
              {Object.entries(EXECUTIVE_KPIS[selectedKPI as keyof typeof EXECUTIVE_KPIS]).map(([key, data]) => (
                renderKPICard(key.replace(/([A-Z])/g, ' $1').trim(), data as any, THEME.luxuryGold)
              ))}
            </View>
          </ScrollView>
        </View>

        {/* AI Fashion Agents */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={[styles.sectionTitle, { color: THEME.text }]}>AI Fashion Agents</Text>
            <Text style={[styles.sectionSubtitle, { color: THEME.textMuted }]}>Autonomous agents managing luxury fashion operations</Text>
          </View>
          <View style={styles.agentsGrid}>
            {AI_FASHION_AGENTS.map(renderAgentCard)}
          </View>
        </View>

        {/* CEO Command Center */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={[styles.sectionTitle, { color: THEME.text }]}>CEO Command Center</Text>
            <Text style={[styles.sectionSubtitle, { color: THEME.textMuted }]}>Executive overview of luxury fashion operations</Text>
          </View>
          <View style={styles.commandGrid}>
            {renderCommandCard('Global Revenue', '$4.8B', DollarSign, THEME.luxuryGold, '+18.7%', 'up', 0)}
            {renderCommandCard('Active Boutiques', '234', Store, THEME.royalPurple, '+12.3%', 'up', 100)}
            {renderCommandCard('Online Visitors', '89K', Users, THEME.emeraldGreen, '+24.5%', 'up', 200)}
            {renderCommandCard('VIP Customers', '89K', Crown, THEME.platinumSilver, '+22.5%', 'up', 300)}
            {renderCommandCard('AI Revenue Impact', '$1.2B', Brain, THEME.roseGold, '+67.8%', 'up', 400)}
            {renderCommandCard('Luxury Sales', '$3.2B', ShoppingBag, THEME.sapphireBlue, '+15.2%', 'up', 500)}
          </View>
        </View>

        {/* AI Insights */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={[styles.sectionTitle, { color: THEME.text }]}>AI Insights</Text>
            <Text style={[styles.sectionSubtitle, { color: THEME.textMuted }]}>Intelligent recommendations from AI agents</Text>
          </View>
          <View style={styles.insightsContainer}>
            {AI_INSIGHTS.map(renderInsightCard)}
          </View>
        </View>

        {/* Live Activity Feed */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={[styles.sectionTitle, { color: THEME.text }]}>Live Activity Feed</Text>
            <Text style={[styles.sectionSubtitle, { color: THEME.textMuted }]}>Real-time luxury retail operations</Text>
          </View>
          <View style={[styles.feedContainer, { backgroundColor: THEME.cardLight }]}>
            {ACTIVITY_FEED.map(renderActivityItem)}
          </View>
        </View>

        {/* Collection Intelligence */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={[styles.sectionTitle, { color: THEME.text }]}>Collection Intelligence</Text>
            <Text style={[styles.sectionSubtitle, { color: THEME.textMuted }]}>Fashion collection performance and analytics</Text>
          </View>
          <View style={styles.intelligenceGrid}>
            <Animated.View entering={FadeInUp.springify()} style={[styles.intelCard, { backgroundColor: THEME.cardLight }]}>
              <View style={[styles.intelIcon, { backgroundColor: THEME.royalPurple + '20' }]}>
                <Sparkles size={24} color={THEME.royalPurple} />
              </View>
              <Text style={[styles.intelLabel, { color: THEME.textMuted }]}>Seasonal Collections</Text>
              <Text style={[styles.intelValue, { color: THEME.text }]}>924</Text>
              <Text style={[styles.intelTrend, { color: THEME.emeraldGreen }]}>+12.4%</Text>
            </Animated.View>
            <Animated.View entering={FadeInUp.delay(100)
.springify()} style={[styles.intelCard, { backgroundColor: THEME.cardLight }]}>
              <View style={[styles.intelIcon, { backgroundColor: THEME.emeraldGreen + '20' }]}>
                <Package size={24} color={THEME.emeraldGreen} />
              </View>
              <Text style={[styles.intelLabel, { color: THEME.textMuted }]}>New Arrivals</Text>
              <Text style={[styles.intelValue, { color: THEME.text }]}>1247</Text>
              <Text style={[styles.intelTrend, { color: THEME.emeraldGreen }]}>+18.7%</Text>
            </Animated.View>
            <Animated.View entering={FadeInUp.delay(200).springify()} style={[styles.intelCard, { backgroundColor: THEME.cardLight }]}>
              <View style={[styles.intelIcon, { backgroundColor: THEME.luxuryGold + '20' }]}>
                <Award size={24} color={THEME.luxuryGold} />
              </View>
              <Text style={[styles.intelLabel, { color: THEME.textMuted }]}>Best Sellers</Text>
              <Text style={[styles.intelValue, { color: THEME.text }]}>169</Text>
              <Text style={[styles.intelTrend, { color: THEME.emeraldGreen }]}>+15.2%</Text>
            </Animated.View>
            <Animated.View entering={FadeInUp.delay(300).springify()} style={[styles.intelCard, { backgroundColor: THEME.cardLight }]}>
              <View style={[styles.intelIcon, { backgroundColor: THEME.crimson + '20' }]}>
                <AlertTriangle size={24} color={THEME.crimson} />
              </View>
              <Text style={[styles.intelLabel, { color: THEME.textMuted }]}>Slow Movers</Text>
              <Text style={[styles.intelValue, { color: THEME.text }]}>25</Text>
              <Text style={[styles.intelTrend, { color: THEME.emeraldGreen }]}>-8.3%</Text>
            </Animated.View>
          </View>
        </View>

        {/* Inventory Command Center */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={[styles.sectionTitle, { color: THEME.text }]}>Inventory Command Center</Text>
            <Text style={[styles.sectionSubtitle, { color: THEME.textMuted }]}>Real-time inventory monitoring and optimization</Text>
          </View>
          <View style={styles.intelligenceGrid}>
            <Animated.View entering={FadeInUp.springify()} style={[styles.intelCard, { backgroundColor: THEME.cardLight }]}>
              <View style={[styles.intelIcon, { backgroundColor: THEME.sapphireBlue + '20' }]}>
                <Warehouse size={24} color={THEME.sapphireBlue} />
              </View>
              <Text style={[styles.intelLabel, { color: THEME.textMuted }]}>Warehouse Stock</Text>
              <Text style={[styles.intelValue, { color: THEME.text }]}>$890M</Text>
              <Text style={[styles.intelTrend, { color: THEME.emeraldGreen }]}>-8.3%</Text>
            </Animated.View>
            <Animated.View entering={FadeInUp.delay(100).springify()} style={[styles.intelCard, { backgroundColor: THEME.cardLight }]}>
              <View style={[styles.intelIcon, { backgroundColor: THEME.roseGold + '20' }]}>
                <Store size={24} color={THEME.roseGold} />
              </View>
              <Text style={[styles.intelLabel, { color: THEME.textMuted }]}>Boutique Inventory</Text>
              <Text style={[styles.intelValue, { color: THEME.text }]}>411</Text>
              <Text style={[styles.intelTrend, { color: THEME.emeraldGreen }]}>+6.2%</Text>
            </Animated.View>
            <Animated.View entering={FadeInUp.delay(200).springify()} style={[styles.intelCard, { backgroundColor: THEME.cardLight }]}>
              <View style={[styles.intelIcon, { backgroundColor: THEME.crimson + '20' }]}>
                <AlertTriangle size={24} color={THEME.crimson} />
              </View>
              <Text style={[styles.intelLabel, { color: THEME.textMuted }]}>Low Stock Alerts</Text>
              <Text style={[styles.intelValue, { color: THEME.text }]}>46</Text>
              <Text style={[styles.intelTrend, { color: THEME.emeraldGreen }]}>-34.5%</Text>
            </Animated.View>
            <Animated.View entering={FadeInUp.delay(300).springify()} style={[styles.intelCard, { backgroundColor: THEME.cardLight }]}>
              <View style={[styles.intelIcon, { backgroundColor: THEME.emeraldGreen + '20' }]}>
                <Package size={24} color={THEME.emeraldGreen} />
              </View>
              <Text style={[styles.intelLabel, { color: THEME.textMuted }]}>Sell-Through Rate</Text>
              <Text style={[styles.intelValue, { color: THEME.text }]}>87%</Text>
              <Text style={[styles.intelTrend, { color: THEME.emeraldGreen }]}>+6.2%</Text>
            </Animated.View>
          </View>
        </View>

        {/* Customer Intelligence */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={[styles.sectionTitle, { color: THEME.text }]}>Customer Intelligence</Text>
            <Text style={[styles.sectionSubtitle, { color: THEME.textMuted }]}>VIP clienteling and customer analytics</Text>
          </View>
          <View style={styles.intelligenceGrid}>
            <Animated.View entering={FadeInUp.springify()} style={[styles.intelCard, { backgroundColor: THEME.cardLight }]}>
              <View style={[styles.intelIcon, { backgroundColor: THEME.platinumSilver + '20' }]}>
                <Crown size={24} color={THEME.platinumSilver} />
              </View>
              <Text style={[styles.intelLabel, { color: THEME.textMuted }]}>VIP Clients</Text>
              <Text style={[styles.intelValue, { color: THEME.text }]}>89K</Text>
              <Text style={[styles.intelTrend, { color: THEME.emeraldGreen }]}>+22.5%</Text>
            </Animated.View>
            <Animated.View entering={FadeInUp.delay(100).springify()} style={[styles.intelCard, { backgroundColor: THEME.cardLight }]}>
              <View style={[styles.intelIcon, { backgroundColor: THEME.roseGold + '20' }]}>
                <Heart size={24} color={THEME.roseGold} />
              </View>
              <Text style={[styles.intelLabel, { color: THEME.textMuted }]}>Customer LTV</Text>
              <Text style={[styles.intelValue, { color: THEME.text }]}>$12.4K</Text>
              <Text style={[styles.intelTrend, { color: THEME.emeraldGreen }]}>+15.3%</Text>
            </Animated.View>
            <Animated.View entering={FadeInUp.delay(200).springify()} style={[styles.intelCard, { backgroundColor: THEME.cardLight }]}>
              <View style={[styles.intelIcon, { backgroundColor: THEME.emeraldGreen + '20' }]}>
                <Users size={24} color={THEME.emeraldGreen} />
              </View>
              <Text style={[styles.intelLabel, { color: THEME.textMuted }]}>Repeat Rate</Text>
              <Text style={[styles.intelValue, { color: THEME.text }]}>78%</Text>
              <Text style={[styles.intelTrend, { color: THEME.emeraldGreen }]}>+5.7%</Text>
            </Animated.View>
            <Animated.View entering={FadeInUp.delay(300).springify()} style={[styles.intelCard, { backgroundColor: THEME.cardLight }]}>
              <View style={[styles.intelIcon, { backgroundColor: THEME.luxuryGold + '20' }]}>
                <Star size={24} color={THEME.luxuryGold} />
              </View>
              <Text style={[styles.intelLabel, { color: THEME.textMuted }]}>Satisfaction</Text>
              <Text style={[styles.intelValue, { color: THEME.text }]}>94%</Text>
              <Text style={[styles.intelTrend, { color: THEME.emeraldGreen }]}>+2.4%</Text>
            </Animated.View>
          </View>
        </View>

        {/* E-Commerce Command Center */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={[styles.sectionTitle, { color: THEME.text }]}>E-Commerce Command Center</Text>
            <Text style={[styles.sectionSubtitle, { color: THEME.textMuted }]}>Digital commerce performance and analytics</Text>
          </View>
          <View style={styles.intelligenceGrid}>
            <Animated.View entering={FadeInUp.springify()} style={[styles.intelCard, { backgroundColor: THEME.cardLight }]}>
              <View style={[styles.intelIcon, { backgroundColor: THEME.emeraldGreen + '20' }]}>
                <DollarSign size={24} color={THEME.emeraldGreen} />
              </View>
              <Text style={[styles.intelLabel, { color: THEME.textMuted }]}>Website Revenue</Text>
              <Text style={[styles.intelValue, { color: THEME.text }]}>$67.8M</Text>
              <Text style={[styles.intelTrend, { color: THEME.emeraldGreen }]}>+24.3%</Text>
            </Animated.View>
            <Animated.View entering={FadeInUp.delay(100).springify()} style={[styles.intelCard, { backgroundColor: THEME.cardLight }]}>
              <View style={[styles.intelIcon, { backgroundColor: THEME.royalPurple + '20' }]}>
                <Target size={24} color={THEME.royalPurple} />
              </View>
              <Text style={[styles.intelLabel, { color: THEME.textMuted }]}>Conversion Rate</Text>
              <Text style={[styles.intelValue, { color: THEME.text }]}>4.2%</Text>
              <Text style={[styles.intelTrend, { color: THEME.emeraldGreen }]}>+8.5%</Text>
            </Animated.View>
            <Animated.View entering={FadeInUp.delay(200).springify()} style={[styles.intelCard, { backgroundColor: THEME.cardLight }]}>
              <View style={[styles.intelIcon, { backgroundColor: THEME.crimson + '20' }]}>
                <ShoppingBag size={24} color={THEME.crimson} />
              </View>
              <Text style={[styles.intelLabel, { color: THEME.textMuted }]}>Cart Abandonment</Text>
              <Text style={[styles.intelValue, { color: THEME.text }]}>34%</Text>
              <Text style={[styles.intelTrend, { color: THEME.emeraldGreen }]}>-12.4%</Text>
            </Animated.View>
            <Animated.View entering={FadeInUp.delay(300).springify()} style={[styles.intelCard, { backgroundColor: THEME.cardLight }]}>
              <View style={[styles.intelIcon, { backgroundColor: THEME.luxuryGold + '20' }]}>
                <Eye size={24} color={THEME.luxuryGold} />
              </View>
              <Text style={[styles.intelLabel, { color: THEME.textMuted }]}>Product Views</Text>
              <Text style={[styles.intelValue, { color: THEME.text }]}>1.2M</Text>
              <Text style={[styles.intelTrend, { color: THEME.emeraldGreen }]}>+34.2%</Text>
            </Animated.View>
          </View>
        </View>

        {/* Boutique Operations */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={[styles.sectionTitle, { color: THEME.text }]}>Boutique Operations</Text>
            <Text style={[styles.sectionSubtitle, { color: THEME.textMuted }]}>Global boutique performance and operations</Text>
          </View>
          <View style={styles.intelligenceGrid}>
            <Animated.View entering={FadeInUp.springify()} style={[styles.intelCard, { backgroundColor: THEME.cardLight }]}>
              <View style={[styles.intelIcon, { backgroundColor: THEME.luxuryGold + '20' }]}>
                <DollarSign size={24} color={THEME.luxuryGold} />
              </View>
              <Text style={[styles.intelLabel, { color: THEME.textMuted }]}>Store Revenue</Text>
              <Text style={[styles.intelValue, { color: THEME.text }]}>$1.03B</Text>
              <Text style={[styles.intelTrend, { color: THEME.emeraldGreen }]}>+14.2%</Text>
            </Animated.View>
            <Animated.View entering={FadeInUp.delay(100).springify()} style={[styles.intelCard, { backgroundColor: THEME.cardLight }]}>
              <View style={[styles.intelIcon, { backgroundColor: THEME.emeraldGreen + '20' }]}>
                <Users size={24} color={THEME.emeraldGreen} />
              </View>
              <Text style={[styles.intelLabel, { color: THEME.textMuted }]}>Foot Traffic</Text>
              <Text style={[styles.intelValue, { color: THEME.text }]}>12.8K</Text>
              <Text style={[styles.intelTrend, { color: THEME.emeraldGreen }]}>+18.7%</Text>
            </Animated.View>
            <Animated.View entering={FadeInUp.delay(200).springify()} style={[styles.intelCard, { backgroundColor: THEME.cardLight }]}>
              <View style={[styles.intelIcon, { backgroundColor: THEME.roseGold + '20' }]}>
                <Award size={24} color={THEME.roseGold} />
              </View>
              <Text style={[styles.intelLabel, { color: THEME.textMuted }]}>Staff Performance</Text>
              <Text style={[styles.intelValue, { color: THEME.text }]}>94%</Text>
              <Text style={[styles.intelTrend, { color: THEME.emeraldGreen }]}>+5.2%</Text>
            </Animated.View>
            <Animated.View entering={FadeInUp.delay(300).springify()} style={[styles.intelCard, { backgroundColor: THEME.cardLight }]}>
              <View style={[styles.intelIcon, { backgroundColor: THEME.royalPurple + '20' }]}>
                <Globe size={24} color={THEME.royalPurple} />
              </View>
              <Text style={[styles.intelLabel, { color: THEME.textMuted }]}>Regional Sales</Text>
              <Text style={[styles.intelValue, { color: THEME.text }]}>Europe 45%</Text>
              <Text style={[styles.intelTrend, { color: THEME.emeraldGreen }]}>+8.3%</Text>
            </Animated.View>
          </View>
        </View>

        {/* Marketing Intelligence */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={[styles.sectionTitle, { color: THEME.text }]}>Marketing Intelligence</Text>
            <Text style={[styles.sectionSubtitle, { color: THEME.textMuted }]}>Campaign performance and marketing analytics</Text>
          </View>
          <View style={styles.intelligenceGrid}>
            <Animated.View entering={FadeInUp.springify()} style={[styles.intelCard, { backgroundColor: THEME.cardLight }]}>
              <View style={[styles.intelIcon, { backgroundColor: THEME.luxuryGold + '20' }]}>
                <TrendingUp size={24} color={THEME.luxuryGold} />
              </View>
              <Text style={[styles.intelLabel, { color: THEME.textMuted }]}>Campaign ROI</Text>
              <Text style={[styles.intelValue, { color: THEME.text }]}>340%</Text>
              <Text style={[styles.intelTrend, { color: THEME.emeraldGreen }]}>+28.5%</Text>
            </Animated.View>
            <Animated.View entering={FadeInUp.delay(100).springify()} style={[styles.intelCard, { backgroundColor: THEME.cardLight }]}>
              <View style={[styles.intelIcon, { backgroundColor: THEME.royalPurple + '20' }]}>
                <Radio size={24} color={THEME.royalPurple} />
              </View>
              <Text style={[styles.intelLabel, { color: THEME.textMuted }]}>Social Reach</Text>
              <Text style={[styles.intelValue, { color: THEME.text }]}>45M</Text>
              <Text style={[styles.intelTrend, { color: THEME.emeraldGreen }]}>+42.3%</Text>
            </Animated.View>
            <Animated.View entering={FadeInUp.delay(200).springify()} style={[styles.intelCard, { backgroundColor: THEME.cardLight }]}>
              <View style={[styles.intelIcon, { backgroundColor: THEME.roseGold + '20' }]}>
                <Star size={24} color={THEME.roseGold} />
              </View>
              <Text style={[styles.intelLabel, { color: THEME.textMuted }]}>Influencer Revenue</Text>
              <Text style={[styles.intelValue, { color: THEME.text }]}>$234M</Text>
              <Text style={[styles.intelTrend, { color: THEME.emeraldGreen }]}>+67.8%</Text>
            </Animated.View>
            <Animated.View entering={FadeInUp.delay(300).springify()} style={[styles.intelCard, { backgroundColor: THEME.cardLight }]}>
              <View style={[styles.intelIcon, { backgroundColor: THEME.emeraldGreen + '20' }]}>
                <Mail size={24} color={THEME.emeraldGreen} />
              </View>
              <Text style={[styles.intelLabel, { color: THEME.textMuted }]}>Email Conversion</Text>
              <Text style={[styles.intelValue, { color: THEME.text }]}>12.4%</Text>
              <Text style={[styles.intelTrend, { color: THEME.emeraldGreen }]}>+8.9%</Text>
            </Animated.View>
          </View>
        </View>

        {/* Supply Chain */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={[styles.sectionTitle, { color: THEME.text }]}>Supply Chain</Text>
            <Text style={[styles.sectionSubtitle, { color: THEME.textMuted }]}>Global supply chain and logistics intelligence</Text>
          </View>
          <View style={styles.intelligenceGrid}>
            <Animated.View entering={FadeInUp.springify()} style={[styles.intelCard, { backgroundColor: THEME.cardLight }]}>
              <View style={[styles.intelIcon, { backgroundColor: THEME.sapphireBlue + '20' }]}>
                <Building2 size={24} color={THEME.sapphireBlue} />
              </View>
              <Text style={[styles.intelLabel, { color: THEME.textMuted }]}>Suppliers</Text>
              <Text style={[styles.intelValue, { color: THEME.text }]}>234</Text>
              <Text style={[styles.intelTrend, { color: THEME.emeraldGreen }]}>+12.5%</Text>
            </Animated.View>
            <Animated.View entering={FadeInUp.delay(100).springify()} style={[styles.intelCard, { backgroundColor: THEME.cardLight }]}>
              <View style={[styles.intelIcon, { backgroundColor: THEME.emeraldGreen + '20' }]}>
                <Truck size={24} color={THEME.emeraldGreen} />
              </View>
              <Text style={[styles.intelLabel, { color: THEME.textMuted }]}>Shipments</Text>
              <Text style={[styles.intelValue, { color: THEME.text }]}>2,048</Text>
              <Text style={[styles.intelTrend, { color: THEME.emeraldGreen }]}>+18.7%</Text>
            </Animated.View>
            <Animated.View entering={FadeInUp.delay(200).springify()} style={[styles.intelCard, { backgroundColor: THEME.cardLight }]}>
              <View style={[styles.intelIcon, { backgroundColor: THEME.luxuryGold + '20' }]}>
                <Factory size={24} color={THEME.luxuryGold} />
              </View>
              <Text style={[styles.intelLabel, { color: THEME.textMuted }]}>Manufacturing</Text>
              <Text style={[styles.intelValue, { color: THEME.text }]}>368</Text>
              <Text style={[styles.intelTrend, { color: THEME.emeraldGreen }]}>+15.2%</Text>
            </Animated.View>
            <Animated.View entering={FadeInUp.delay(300).springify()} style={[styles.intelCard, { backgroundColor: THEME.cardLight }]}>
              <View style={[styles.intelIcon, { backgroundColor: THEME.roseGold + '20' }]}>
                <Navigation size={24} color={THEME.roseGold} />
              </View>
              <Text style={[styles.intelLabel, { color: THEME.textMuted }]}>On-Time Delivery</Text>
              <Text style={[styles.intelValue, { color: THEME.text }]}>94%</Text>
              <Text style={[styles.intelTrend, { color: THEME.emeraldGreen }]}>+6.8%</Text>
            </Animated.View>
          </View>
        </View>

        {/* Global Operations */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={[styles.sectionTitle, { color: THEME.text }]}>Global Operations</Text>
            <Text style={[styles.sectionSubtitle, { color: THEME.textMuted }]}>Worldwide operations and regional performance</Text>
          </View>
          <View style={styles.intelligenceGrid}>
            <Animated.View entering={FadeInUp.springify()} style={[styles.intelCard, { backgroundColor: THEME.cardLight }]}>
              <View style={[styles.intelIcon, { backgroundColor: THEME.luxuryGold + '20' }]}>
                <DollarSign size={24} color={THEME.luxuryGold} />
              </View>
              <Text style={[styles.intelLabel, { color: THEME.textMuted }]}>Europe Revenue</Text>
              <Text style={[styles.intelValue, { color: THEME.text }]}>$1.8B</Text>
              <Text style={[styles.intelTrend, { color: THEME.emeraldGreen }]}>+12.3%</Text>
            </Animated.View>
            <Animated.View entering={FadeInUp.delay(100).springify()} style={[styles.intelCard, { backgroundColor: THEME.cardLight }]}>
              <View style={[styles.intelIcon, { backgroundColor: THEME.emeraldGreen + '20' }]}>
                <DollarSign size={24} color={THEME.emeraldGreen} />
              </View>
              <Text style={[styles.intelLabel, { color: THEME.textMuted }]}>Americas Revenue</Text>
              <Text style={[styles.intelValue, { color: THEME.text }]}>$1.6B</Text>
              <Text style={[styles.intelTrend, { color: THEME.emeraldGreen }]}>+15.7%</Text>
            </Animated.View>
            <Animated.View entering={FadeInUp.delay(200).springify()} style={[styles.intelCard, { backgroundColor: THEME.cardLight }]}>
              <View style={[styles.intelIcon, { backgroundColor: THEME.royalPurple + '20' }]}>
                <DollarSign size={24} color={THEME.royalPurple} />
              </View>
              <Text style={[styles.intelLabel, { color: THEME.textMuted }]}>Asia Revenue</Text>
              <Text style={[styles.intelValue, { color: THEME.text }]}>$1.2B</Text>
              <Text style={[styles.intelTrend, { color: THEME.emeraldGreen }]}>+22.5%</Text>
            </Animated.View>
            <Animated.View entering={FadeInUp.delay(300).springify()} style={[styles.intelCard, { backgroundColor: THEME.cardLight }]}>
              <View style={[styles.intelIcon, { backgroundColor: THEME.roseGold + '20' }]}>
                <Store size={24} color={THEME.roseGold} />
              </View>
              <Text style={[styles.intelLabel, { color: THEME.textMuted }]}>Boutique Locations</Text>
              <Text style={[styles.intelValue, { color: THEME.text }]}>234</Text>
              <Text style={[styles.intelTrend, { color: THEME.emeraldGreen }]}>+8.4%</Text>
            </Animated.View>
          </View>
        </View>

        {/* Sustainability Scorecard */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={[styles.sectionTitle, { color: THEME.text }]}>Sustainability Scorecard</Text>
            <Text style={[styles.sectionSubtitle, { color: THEME.textMuted }]}>Environmental impact and ESG metrics</Text>
          </View>
          <View style={styles.intelligenceGrid}>
            <Animated.View entering={FadeInUp.springify()} style={[styles.intelCard, { backgroundColor: THEME.cardLight }]}>
              <View style={[styles.intelIcon, { backgroundColor: THEME.emeraldGreen + '20' }]}>
                <Leaf size={24} color={THEME.emeraldGreen} />
              </View>
              <Text style={[styles.intelLabel, { color: THEME.textMuted }]}>Carbon Reduction</Text>
              <Text style={[styles.intelValue, { color: THEME.text }]}>23%</Text>
              <Text style={[styles.intelTrend, { color: THEME.emeraldGreen }]}>Target: 30%</Text>
            </Animated.View>
            <Animated.View entering={FadeInUp.delay(100).springify()} style={[styles.intelCard, { backgroundColor: THEME.cardLight }]}>
              <View style={[styles.intelIcon, { backgroundColor: THEME.sapphireBlue + '20' }]}>
                <Droplets size={24} color={THEME.sapphireBlue} />
              </View>
              <Text style={[styles.intelLabel, { color: THEME.textMuted }]}>Water Saved</Text>
              <Text style={[styles.intelValue, { color: THEME.text }]}>12.4M</Text>
              <Text style={[styles.intelTrend, { color: THEME.emeraldGreen }]}>Efficiency: 89%</Text>
            </Animated.View>
            <Animated.View entering={FadeInUp.delay(200).springify()} style={[styles.intelCard, { backgroundColor: THEME.cardLight }]}>
              <View style={[styles.intelIcon, { backgroundColor: THEME.luxuryGold + '20' }]}>
                <Sun size={24} color={THEME.luxuryGold} />
              </View>
              <Text style={[styles.intelLabel, { color: THEME.textMuted }]}>Renewable Energy</Text>
              <Text style={[styles.intelValue, { color: THEME.text }]}>69%</Text>
              <Text style={[styles.intelTrend, { color: THEME.emeraldGreen }]}>+12.4%</Text>
            </Animated.View>
            <Animated.View entering={FadeInUp.delay(300).springify()} style={[styles.intelCard, { backgroundColor: THEME.cardLight }]}>
              <View style={[styles.intelIcon, { backgroundColor: THEME.royalPurple + '20' }]}>
                <Award size={24} color={THEME.royalPurple} />
              </View>
              <Text style={[styles.intelLabel, { color: THEME.textMuted }]}>ESG Score</Text>
              <Text style={[styles.intelValue, { color: THEME.text }]}>92</Text>
              <Text style={[styles.intelTrend, { color: THEME.emeraldGreen }]}>Overall</Text>
            </Animated.View>
          </View>
        </View>

        {/* System Health */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={[styles.sectionTitle, { color: THEME.text }]}>System Health</Text>
            <Text style={[styles.sectionSubtitle, { color: THEME.textMuted }]}>Infrastructure and service monitoring</Text>
          </View>
          <View style={styles.healthGrid}>
            {Object.entries(SYSTEM_HEALTH).map(([key, data]) => renderSystemHealth(data, key))}
          </View>
        </View>

        <View style={styles.spacer} />
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
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
  },
  backButton: {
    padding: 8,
  },
  headerContent: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 8,
  },
  headerIcon: {
    width: 44,
    height: 44,
    borderRadius: 22,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '700',
  },
  headerSubtitle: {
    fontSize: 12,
    marginTop: 2,
  },
  settingsButton: {
    padding: 8,
  },
  scrollView: {
    padding: 16,
  },
  kpiSection: {
    marginBottom: 24,
  },
  kpiTabs: {
    flexDirection: 'row',
    marginBottom: 12,
    gap: 8,
  },
  kpiTab: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: THEME.border,
  },
  kpiTabText: {
    fontSize: 12,
    fontWeight: '600',
  },
  kpiScroll: {
    marginBottom: 8,
  },
  kpiRow: {
    flexDirection: 'row',
    gap: 12,
  },
  kpiCard: {
    minWidth: 140,
    padding: 16,
    borderRadius: 16,
    borderWidth: 1,
  },
  kpiLabel: {
    fontSize: 11,
    marginBottom: 4,
  },
  kpiValue: {
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 8,
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
  section: {
    marginBottom: 24,
  },
  sectionHeader: {
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 4,
  },
  sectionSubtitle: {
    fontSize: 13,
  },
  agentsGrid: {
    gap: 12,
  },
  agentCard: {
    flexDirection: 'row',
    padding: 16,
    borderRadius: 16,
    borderWidth: 1,
  },
  agentIcon: {
    width: 56,
    height: 56,
    borderRadius: 28,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  agentInfo: {
    flex: 1,
  },
  agentHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 4,
  },
  agentName: {
    fontSize: 16,
    fontWeight: '700',
  },
  statusBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  statusDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    marginRight: 4,
  },
  statusText: {
    fontSize: 10,
    fontWeight: '600',
  },
  agentRole: {
    fontSize: 12,
    marginBottom: 8,
  },
  responsibilities: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
    marginBottom: 12,
  },
  respChip: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  respText: {
    fontSize: 10,
    fontWeight: '500',
  },
  metricsRow: {
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
    marginBottom: 2,
  },
  metricLabel: {
    fontSize: 10,
  },
  efficiencyBar: {
    height: 6,
    backgroundColor: THEME.border,
    borderRadius: 3,
    overflow: 'hidden',
    position: 'relative',
  },
  efficiencyFill: {
    height: '100%',
  },
  efficiencyText: {
    position: 'absolute',
    right: 0,
    top: -16,
    fontSize: 10,
    fontWeight: '600',
  },
  commandGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  commandCard: {
    width: (SCREEN_WIDTH - 48) / 2,
    padding: 16,
    borderRadius: 16,
  },
  commandIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },
  commandValue: {
    fontSize: 24,
    fontWeight: '700',
    marginBottom: 4,
  },
  commandLabel: {
    fontSize: 12,
    marginBottom: 8,
  },
  commandTrend: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  commandChange: {
    fontSize: 12,
    fontWeight: '600',
  },
  insightsContainer: {
    gap: 12,
  },
  insightCard: {
    padding: 16,
    borderRadius: 16,
    borderLeftWidth: 4,
  },
  insightHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  insightIcon: {
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  insightMeta: {
    flex: 1,
  },
  insightTitle: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 2,
  },
  insightTime: {
    fontSize: 11,
  },
  impactBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  impactText: {
    fontSize: 10,
    fontWeight: '600',
  },
  insightMessage: {
    fontSize: 13,
    marginBottom: 12,
    lineHeight: 18,
  },
  actionBox: {
    padding: 12,
    borderRadius: 8,
  },
  actionText: {
    fontSize: 12,
    fontWeight: '500',
  },
  feedContainer: {
    padding: 16,
    borderRadius: 16,
    gap: 12,
  },
  activityItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  activityIcon: {
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  activityContent: {
    flex: 1,
  },
  activityMessage: {
    fontSize: 13,
    marginBottom: 2,
  },
  activityTime: {
    fontSize: 11,
  },
  intelligenceGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  intelCard: {
    width: (SCREEN_WIDTH - 48) / 2,
    padding: 16,
    borderRadius: 16,
  },
  intelIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },
  intelLabel: {
    fontSize: 11,
    marginBottom: 4,
  },
  intelValue: {
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 4,
  },
  intelTrend: {
    fontSize: 12,
    fontWeight: '600',
  },
  healthGrid: {
    gap: 12,
  },
  healthCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderRadius: 16,
  },
  healthIcon: {
    width: 44,
    height: 44,
    borderRadius: 22,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  healthInfo: {
    flex: 1,
  },
  healthName: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 8,
  },
  healthStats: {
    flexDirection: 'row',
    gap: 16,
  },
  healthStat: {
    alignItems: 'center',
  },
  healthStatValue: {
    fontSize: 14,
    fontWeight: '700',
    marginBottom: 2,
  },
  healthStatLabel: {
    fontSize: 10,
  },
  healthIndicator: {
    width: 60,
    height: 6,
    backgroundColor: THEME.border,
    borderRadius: 3,
    overflow: 'hidden',
  },
  healthFill: {
    height: '100%',
  },
  spacer: {
    height: 24,
  },
});
