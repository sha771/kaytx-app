import React, { useState } from 'react';
import { View, Text, ScrollView, StyleSheet, Dimensions, TouchableOpacity, SafeAreaView } from 'react-native';
import Animated, { FadeInUp, FadeIn } from 'react-native-reanimated';
import { BlurView } from 'expo-blur';
import {
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
  BarChart3,
  Factory,
  Navigation,
  Scan,
  Search,
  Filter,
  Layers,
  Grid3x3,
  List,
  Maximize2,
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
  BarChart3,
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
  PieChart as PieChartIcon,
  LineChart as LineChartIcon,
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
  Layers as LayersIcon,
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
  Sun,
} from 'lucide-react-native';

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
  {
    id: 'neural-hub',
    name: 'AI Neural Fashion Intelligence Hub',
    role: 'Central Intelligence',
    color: THEME.royalPurple,
    icon: Brain,
    responsibilities: [
      'Central coordination',
      'AI orchestration',
      'Data aggregation',
      'Strategic insights',
    ],
    metrics: {
      agentsCoordinated: '67',
      dataPoints: '12.4M',
      insightsGenerated: '234K',
    },
    status: 'active',
    efficiency: 99,
  },
  {
    id: 'trend-forecaster',
    name: 'AI Predictive Trend Forecaster',
    role: 'Trend Prediction',
    color: THEME.royalPurple,
    icon: Sparkles,
    responsibilities: [
      'Trend prediction',
      'Market analysis',
      'Consumer behavior',
      'Fashion forecasting',
    ],
    metrics: {
      predictions: '5,678',
      accuracy: '96%',
      timeToMarket: '-45%',
    },
    status: 'active',
    efficiency: 95,
  },
  {
    id: 'design-assistant',
    name: 'AI Real-Time Design Assistant',
    role: 'Design Support',
    color: THEME.luxuryGold,
    icon: Palette,
    responsibilities: [
      'Design assistance',
      'Pattern generation',
      'Material selection',
      '3D prototyping',
    ],
    metrics: {
      designsCreated: '1,234',
      timeSaved: '67%',
      adoptionRate: '89%',
    },
    status: 'active',
    efficiency: 93,
  },
  {
    id: 'supply-tracker',
    name: 'AI Cognitive Supply Chain Tracker',
    role: 'Supply Chain',
    color: THEME.sapphireBlue,
    icon: Truck,
    responsibilities: [
      'Supply tracking',
      'Route optimization',
      'Delivery monitoring',
      'Inventory sync',
    ],
    metrics: {
      shipments: '23,456',
      onTime: '97%',
      costReduction: '18%',
    },
    status: 'active',
    efficiency: 94,
  },
  {
    id: 'production-manager',
    name: 'AI Adaptive Production Manager',
    role: 'Production',
    color: THEME.emeraldGreen,
    icon: Factory,
    responsibilities: [
      'Production scheduling',
      'Capacity planning',
      'Quality control',
      'Waste reduction',
    ],
    metrics: {
      unitsProduced: '1.2M',
      efficiency: '+23%',
      wasteReduced: '34%',
    },
    status: 'active',
    efficiency: 92,
  },
  {
    id: 'inventory-optimizer',
    name: 'AI Intelligent Inventory Optimizer',
    role: 'Inventory',
    color: THEME.roseGold,
    icon: Package,
    responsibilities: [
      'Stock optimization',
      'Demand forecasting',
      'Replenishment',
      'Allocation',
    ],
    metrics: {
      stockOptimized: '89%',
      stockouts: '-67%',
      carryingCost: '-23%',
    },
    status: 'active',
    efficiency: 96,
  },
  {
    id: 'sustainability-monitor',
    name: 'AI Neural Sustainability Monitor',
    role: 'Sustainability',
    color: THEME.emeraldGreen,
    icon: Leaf,
    responsibilities: [
      'Carbon tracking',
      'Water monitoring',
      'Waste management',
      'ESG compliance',
    ],
    metrics: {
      carbonReduced: '23%',
      waterSaved: '34%',
      wasteRecycled: '67%',
    },
    status: 'active',
    efficiency: 95,
  },
  {
    id: 'consumer-analyzer',
    name: 'AI Predictive Consumer Preference Analyzer',
    role: 'Consumer Insights',
    color: THEME.royalPurple,
    icon: Users,
    responsibilities: [
      'Preference analysis',
      'Behavior prediction',
      'Segmentation',
      'Personalization',
    ],
    metrics: {
      preferences: '2.3M',
      accuracy: '94%',
      conversion: '+45%',
    },
    status: 'active',
    efficiency: 93,
  },
  {
    id: 'pricing-strategist',
    name: 'AI Real-Time Pricing Strategist',
    role: 'Pricing',
    color: THEME.luxuryGold,
    icon: DollarSign,
    responsibilities: [
      'Dynamic pricing',
      'Competitive analysis',
      'Margin optimization',
      'Promotion strategy',
    ],
    metrics: {
      priceAdjustments: '12,345',
      margin: '+15%',
      revenue: '+28%',
    },
    status: 'active',
    efficiency: 94,
  },
  {
    id: 'brand-manager',
    name: 'AI Cognitive Brand Manager',
    role: 'Brand Management',
    color: THEME.platinumSilver,
    icon: Award,
    responsibilities: [
      'Brand positioning',
      'Reputation monitoring',
      'Campaign strategy',
      'Brand equity',
    ],
    metrics: {
      brandValue: '+34%',
      sentiment: '92%',
      awareness: '+56%',
    },
    status: 'active',
    efficiency: 91,
  },
  {
    id: 'quality-inspector',
    name: 'AI Automated Quality Inspector',
    role: 'Quality Control',
    color: THEME.emeraldGreen,
    icon: CheckCircle,
    responsibilities: [
      'Quality inspection',
      'Defect detection',
      'Compliance checking',
      'Standards enforcement',
    ],
    metrics: {
      inspections: '234K',
      defectRate: '0.2%',
      compliance: '99.8%',
    },
    status: 'active',
    efficiency: 97,
  },
  {
    id: 'visual-merchandiser',
    name: 'AI Neural Visual Merchandiser',
    role: 'Visual Merchandising',
    color: THEME.roseGold,
    icon: ImageIcon,
    responsibilities: [
      'Display optimization',
      'Layout planning',
      'Product placement',
      'A/B testing',
    ],
    metrics: {
      displays: '12,345',
      engagement: '+67%',
      sales: '+34%',
    },
    status: 'active',
    efficiency: 92,
  },
  {
    id: 'ecommerce-optimizer',
    name: 'AI Adaptive E-Commerce Optimizer',
    role: 'E-Commerce',
    color: THEME.sapphireBlue,
    icon: Globe,
    responsibilities: [
      'Site optimization',
      'UX improvement',
      'Conversion optimization',
      'Personalization',
    ],
    metrics: {
      conversion: '+45%',
      bounceRate: '-23%',
      revenue: '+67%',
    },
    status: 'active',
    efficiency: 93,
  },
  {
    id: 'social-tracker',
    name: 'AI Intelligent Social Media Tracker',
    role: 'Social Media',
    color: THEME.crimson,
    icon: Radio,
    responsibilities: [
      'Social monitoring',
      'Trend tracking',
      'Influencer identification',
      'Engagement analysis',
    ],
    metrics: {
      mentions: '1.2M',
      engagement: '8.9%',
      reach: '45M',
    },
    status: 'active',
    efficiency: 90,
  },
  {
    id: 'influencer-manager',
    name: 'AI Predictive Influencer Manager',
    role: 'Influencer Marketing',
    color: THEME.luxuryGold,
    icon: Star,
    responsibilities: [
      'Influencer selection',
      'Campaign management',
      'ROI tracking',
      'Partnership optimization',
    ],
    metrics: {
      influencers: '234',
      roi: '340%',
      revenue: '$234M',
    },
    status: 'active',
    efficiency: 92,
  },
  {
    id: 'compliance-monitor',
    name: 'AI Real-Time Compliance Monitor',
    role: 'Compliance',
    color: THEME.royalPurple,
    icon: ShieldCheck,
    responsibilities: [
      'Regulatory compliance',
      'Policy enforcement',
      'Risk monitoring',
      'Audit preparation',
    ],
    metrics: {
      violations: '0',
      audits: '23',
      score: '98%',
    },
    status: 'active',
    efficiency: 98,
  },
  {
    id: 'retail-coordinator',
    name: 'AI Cognitive Retail Coordinator',
    role: 'Retail Operations',
    color: THEME.platinumSilver,
    icon: Store,
    responsibilities: [
      'Store coordination',
      'Staff scheduling',
      'Inventory sync',
      'Performance tracking',
    ],
    metrics: {
      stores: '234',
      efficiency: '+23%',
      satisfaction: '94%',
    },
    status: 'active',
    efficiency: 91,
  },
  {
    id: 'erp-integrator',
    name: 'AI Automated ERP Integrator',
    role: 'ERP Integration',
    color: THEME.sapphireBlue,
    icon: Database,
    responsibilities: [
      'ERP integration',
      'Data synchronization',
      'Process automation',
      'System optimization',
    ],
    metrics: {
      integrations: '89',
      errors: '0.1%',
      speed: '+67%',
    },
    status: 'active',
    efficiency: 95,
  },
  {
    id: 'analytics-dashboard',
    name: 'AI Neural Analytics Dashboard',
    role: 'Analytics',
    color: THEME.royalPurple,
    icon: BarChart3,
    responsibilities: [
      'Data analytics',
      'Visualization',
      'Reporting',
      'Insights generation',
    ],
    metrics: {
      reports: '12,345',
      insights: '234K',
      accuracy: '96%',
    },
    status: 'active',
    efficiency: 94,
  },
  {
    id: 'customer-insights',
    name: 'AI Adaptive Customer Insights',
    role: 'Customer Analytics',
    color: THEME.roseGold,
    icon: Heart,
    responsibilities: [
      'Customer analytics',
      'Journey mapping',
      'Churn prediction',
      'LTV optimization',
    ],
    metrics: {
      customers: '2.4M',
      churn: '-45%',
      ltv: '+34%',
    },
    status: 'active',
    efficiency: 92,
  },
  {
    id: 'style-advisor',
    name: 'AI Intelligent Style Advisor',
    role: 'Styling',
    color: THEME.luxuryGold,
    icon: Shirt,
    responsibilities: [
      'Style recommendations',
      'Outfit suggestions',
      'Wardrobe planning',
      'Trend alignment',
    ],
    metrics: {
      sessions: '234K',
      conversion: '67%',
      satisfaction: '96%',
    },
    status: 'active',
    efficiency: 93,
  },
  {
    id: 'market-analytics',
    name: 'AI Predictive Market Analytics',
    role: 'Market Intelligence',
    color: THEME.emeraldGreen,
    icon: TrendingUp,
    responsibilities: [
      'Market analysis',
      'Competitive intelligence',
      'Opportunity identification',
      'Risk assessment',
    ],
    metrics: {
      markets: '45',
      opportunities: '234',
      accuracy: '94%',
    },
    status: 'active',
    efficiency: 91,
  },
  {
    id: 'collaboration-platform',
    name: 'AI Real-Time Collaboration Platform',
    role: 'Collaboration',
    color: THEME.sapphireBlue,
    icon: Users,
    responsibilities: [
      'Team collaboration',
      'Project management',
      'Workflow automation',
      'Communication',
    ],
    metrics: {
      users: '12,345',
      projects: '890',
      efficiency: '+56%',
    },
    status: 'active',
    efficiency: 90,
  },
  {
    id: 'chief-fashion-officer',
    name: 'AI Chief Fashion Officer',
    role: 'Executive Leadership',
    color: THEME.luxuryGold,
    icon: Crown,
    responsibilities: [
      'Strategic direction',
      'Brand vision',
      'Executive decisions',
      'Industry leadership',
    ],
    metrics: {
      decisions: '1,234',
      impact: '$1.2B',
      success: '96%',
    },
    status: 'active',
    efficiency: 99,
  },
  {
    id: 'strategy-advisor',
    name: 'AI Strategy Advisor',
    role: 'Strategic Planning',
    color: THEME.platinumSilver,
    icon: Brain,
    responsibilities: [
      'Strategic planning',
      'Market positioning',
      'Growth strategy',
      'Competitive advantage',
    ],
    metrics: {
      strategies: '234',
      growth: '+45%',
      roi: '340%',
    },
    status: 'active',
    efficiency: 95,
  },
  {
    id: 'creative-director',
    name: 'AI Creative Director',
    role: 'Creative Leadership',
    color: THEME.royalPurple,
    icon: Palette,
    responsibilities: [
      'Creative direction',
      'Design leadership',
      'Brand aesthetics',
      'Innovation',
    ],
    metrics: {
      campaigns: '89',
      awards: '23',
      recognition: '94%',
    },
    status: 'active',
    efficiency: 93,
  },
  {
    id: 'merchandiser',
    name: 'AI Merchandiser',
    role: 'Merchandising',
    color: THEME.roseGold,
    icon: ShoppingBag,
    responsibilities: [
      'Product selection',
      'Assortment planning',
      'Inventory management',
      'Sales optimization',
    ],
    metrics: {
      products: '12,345',
      sales: '+34%',
      margin: '+18%',
    },
    status: 'active',
    efficiency: 91,
  },
  {
    id: 'vp-design',
    name: 'AI VP Design',
    role: 'Design Leadership',
    color: THEME.luxuryGold,
    icon: Shirt,
    responsibilities: [
      'Design oversight',
      'Team leadership',
      'Quality standards',
      'Innovation',
    ],
    metrics: {
      designs: '2,345',
      quality: '98%',
      innovation: '89%',
    },
    status: 'active',
    efficiency: 94,
  },
  {
    id: 'designer',
    name: 'AI Designer',
    role: 'Design',
    color: THEME.royalPurple,
    icon: Palette,
    responsibilities: [
      'Design creation',
      'Pattern making',
      'Material selection',
      'Prototyping',
    ],
    metrics: {
      designs: '5,678',
      approved: '94%',
      timeToMarket: '-34%',
    },
    status: 'active',
    efficiency: 92,
  },
  {
    id: 'pattern-maker',
    name: 'AI Pattern Maker',
    role: 'Pattern Making',
    color: THEME.sapphireBlue,
    icon: Scissors,
    responsibilities: [
      'Pattern creation',
      'Size grading',
      'Technical specs',
      'Production files',
    ],
    metrics: {
      patterns: '12,345',
      accuracy: '99%',
      speed: '+67%',
    },
    status: 'active',
    efficiency: 95,
  },
  {
    id: 'sample-maker',
    name: 'AI Sample Maker',
    role: 'Sample Production',
    color: THEME.emeraldGreen,
    icon: Factory,
    responsibilities: [
      'Sample creation',
      'Prototype testing',
      'Fit verification',
      'Quality assurance',
    ],
    metrics: {
      samples: '3,456',
      approval: '96%',
      time: '-45%',
    },
    status: 'active',
    efficiency: 93,
  },
  {
    id: 'vp-production',
    name: 'AI VP Production',
    role: 'Production Leadership',
    color: THEME.platinumSilver,
    icon: Factory,
    responsibilities: [
      'Production oversight',
      'Capacity planning',
      'Quality control',
      'Cost optimization',
    ],
    metrics: {
      units: '2.4M',
      quality: '98%',
      cost: '-18%',
    },
    status: 'active',
    efficiency: 94,
  },
  {
    id: 'manufacturer',
    name: 'AI Manufacturer',
    role: 'Manufacturing',
    color: THEME.sapphireBlue,
    icon: Factory,
    responsibilities: [
      'Manufacturing',
      'Assembly',
      'Quality control',
      'Packaging',
    ],
    metrics: {
      units: '1.2M',
      efficiency: '+23%',
      defects: '0.1%',
    },
    status: 'active',
    efficiency: 91,
  },
  {
    id: 'quality-control',
    name: 'AI Quality Control',
    role: 'Quality Assurance',
    color: THEME.emeraldGreen,
    icon: CheckCircle,
    responsibilities: [
      'Quality inspection',
      'Testing',
      'Compliance',
      'Standards',
    ],
    metrics: {
      inspections: '234K',
      passRate: '99.8%',
      defects: '0.2%',
    },
    status: 'active',
    efficiency: 96,
  },
  {
    id: 'logistics-coordinator',
    name: 'AI Logistics Coordinator',
    role: 'Logistics',
    color: THEME.roseGold,
    icon: Truck,
    responsibilities: [
      'Logistics coordination',
      'Shipping',
      'Delivery',
      'Tracking',
    ],
    metrics: {
      shipments: '45,678',
      onTime: '96%',
      cost: '-12%',
    },
    status: 'active',
    efficiency: 92,
  },
  {
    id: 'vp-retail',
    name: 'AI VP Retail',
    role: 'Retail Leadership',
    color: THEME.luxuryGold,
    icon: Store,
    responsibilities: [
      'Retail strategy',
      'Store operations',
      'Customer experience',
      'Revenue growth',
    ],
    metrics: {
      stores: '234',
      revenue: '+34%',
      satisfaction: '94%',
    },
    status: 'active',
    efficiency: 93,
  },
  {
    id: 'store-manager',
    name: 'AI Store Manager',
    role: 'Store Management',
    color: THEME.platinumSilver,
    icon: Store,
    responsibilities: [
      'Store operations',
      'Staff management',
      'Inventory',
      'Customer service',
    ],
    metrics: {
      efficiency: '+23%',
      sales: '+18%',
      satisfaction: '96%',
    },
    status: 'active',
    efficiency: 90,
  },
  {
    id: 'visual-merchandiser-store',
    name: 'AI Visual Merchandiser',
    role: 'Store Display',
    color: THEME.royalPurple,
    icon: ImageIcon,
    responsibilities: [
      'Visual merchandising',
      'Display design',
      'Product placement',
      'A/B testing',
    ],
    metrics: {
      displays: '8,901',
      engagement: '+45%',
      sales: '+23%',
    },
    status: 'active',
    efficiency: 91,
  },
  {
    id: 'sales-associate',
    name: 'AI Sales Associate',
    role: 'Sales',
    color: THEME.emeraldGreen,
    icon: Users,
    responsibilities: [
      'Customer service',
      'Product knowledge',
      'Sales support',
      'Clienteling',
    ],
    metrics: {
      interactions: '1.2M',
      conversion: '67%',
      satisfaction: '98%',
    },
    status: 'active',
    efficiency: 92,
  },
  {
    id: 'fashion-manager',
    name: 'AI Fashion Manager',
    role: 'Fashion Management',
    color: THEME.roseGold,
    icon: Shirt,
    responsibilities: [
      'Fashion oversight',
      'Trend management',
      'Collection coordination',
      'Brand alignment',
    ],
    metrics: {
      collections: '89',
      trends: '1,234',
      alignment: '96%',
    },
    status: 'active',
    efficiency: 94,
  },
  {
    id: 'design-manager',
    name: 'AI Design Manager',
    role: 'Design Management',
    color: THEME.luxuryGold,
    icon: Palette,
    responsibilities: [
      'Design team management',
      'Workflow coordination',
      'Quality standards',
      'Innovation',
    ],
    metrics: {
      designs: '3,456',
      quality: '98%',
      innovation: '89%',
    },
    status: 'active',
    efficiency: 93,
  },
  {
    id: 'production-manager-lead',
    name: 'AI Production Manager',
    role: 'Production Management',
    color: THEME.sapphireBlue,
    icon: Factory,
    responsibilities: [
      'Production oversight',
      'Scheduling',
      'Quality control',
      'Cost management',
    ],
    metrics: {
      units: '1.8M',
      efficiency: '+28%',
      quality: '97%',
    },
    status: 'active',
    efficiency: 92,
  },
  {
    id: 'retail-manager-lead',
    name: 'AI Retail Manager',
    role: 'Retail Management',
    color: THEME.platinumSilver,
    icon: Store,
    responsibilities: [
      'Retail operations',
      'Multi-store management',
      'Performance tracking',
      'Strategy',
    ],
    metrics: {
      stores: '45',
      revenue: '+45%',
      efficiency: '+34%',
    },
    status: 'active',
    efficiency: 91,
  },
  {
    id: 'fashion-ops-manager',
    name: 'AI Fashion Operations Manager',
    role: 'Operations',
    color: THEME.royalPurple,
    icon: Settings,
    responsibilities: [
      'Operations oversight',
      'Process optimization',
      'Resource allocation',
      'Efficiency',
    ],
    metrics: {
      processes: '234',
      efficiency: '+45%',
      cost: '-23%',
    },
    status: 'active',
    efficiency: 94,
  },
  {
    id: 'fashion-tech-manager',
    name: 'AI Fashion Technology Manager',
    role: 'Technology',
    color: THEME.sapphireBlue,
    icon: Cpu,
    responsibilities: [
      'Technology strategy',
      'System integration',
      'Innovation',
      'Digital transformation',
    ],
    metrics: {
      systems: '89',
      uptime: '99.9%',
      innovation: '94%',
    },
    status: 'active',
    efficiency: 95,
  },
  {
    id: 'fashion-data-analyst',
    name: 'AI Fashion Data Analyst',
    role: 'Data Analytics',
    color: THEME.emeraldGreen,
    icon: BarChart3,
    responsibilities: [
      'Data analysis',
      'Reporting',
      'Insights',
      'Visualization',
    ],
    metrics: {
      reports: '12,345',
      insights: '234K',
      accuracy: '96%',
    },
    status: 'active',
    efficiency: 93,
  },
  {
    id: 'fashion-product-manager',
    name: 'AI Fashion Product Manager',
    role: 'Product Management',
    color: THEME.roseGold,
    icon: Package,
    responsibilities: [
      'Product strategy',
      'Roadmap',
      'Launch planning',
      'Performance',
    ],
    metrics: {
      products: '567',
      success: '94%',
      revenue: '+56%',
    },
    status: 'active',
    efficiency: 92,
  },
  {
    id: 'fashion-marketing-manager',
    name: 'AI Fashion Marketing Manager',
    role: 'Marketing',
    color: THEME.crimson,
    icon: TrendingUp,
    responsibilities: [
      'Marketing strategy',
      'Campaign management',
      'Brand awareness',
      'Growth',
    ],
    metrics: {
      campaigns: '234',
      reach: '45M',
      roi: '340%',
    },
    status: 'active',
    efficiency: 91,
  },
  {
    id: 'fashion-sales-manager',
    name: 'AI Fashion Sales Manager',
    role: 'Sales',
    color: THEME.luxuryGold,
    icon: DollarSign,
    responsibilities: [
      'Sales strategy',
      'Team management',
      'Revenue growth',
      'Customer relationships',
    ],
    metrics: {
      revenue: '+45%',
      team: '234',
      satisfaction: '96%',
    },
    status: 'active',
    efficiency: 93,
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

// System Health Data
const SYSTEM_HEALTH = [
  { name: 'Commerce APIs', status: 'healthy', active: 23, offline: 0, health: 99.9, icon: Server },
  { name: 'Inventory Services', status: 'healthy', active: 45, offline: 0, health: 99.5, icon: Warehouse },
  { name: 'AI Models', status: 'healthy', active: 89, offline: 0, health: 98.7, icon: Brain },
  { name: 'Payment Systems', status: 'healthy', active: 12, offline: 0, health: 99.8, icon: CreditCard },
  { name: 'ERP Integration', status: 'healthy', active: 8, offline: 0, health: 99.2, icon: Building2 },
  { name: 'CRM', status: 'healthy', active: 23, offline: 0, health: 98.9, icon: Users },
  { name: 'Recommendation Engine', status: 'healthy', active: 34, offline: 0, health: 97.8, icon: Sparkles },
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

// Sustainability Data
const SUSTAINABILITY_DATA = {
  carbonFootprint: { current: '45,234 tons', reduction: '23%', target: '30%' },
  waterUsage: { saved: '12.4M gallons', efficiency: 89, target: 85 },
  renewableEnergy: { solar: 34, wind: 23, biomass: 12, total: 69 },
  ethicalSourcing: { suppliers: 234, certified: 189, score: 94 },
  circularEconomy: { recycled: 67, upcycled: 23, repaired: 12 },
  esgScore: { environmental: 92, social: 88, governance: 95, overall: 92 },
};

// Navigation Items
const NAVIGATION_ITEMS = [
  { id: 'executive', label: 'Executive Dashboard', icon: LayoutDashboard },
  { id: 'agents', label: 'AI Fashion Agents', icon: Brain },
  { id: 'collections', label: 'Collections', icon: Shirt },
  { id: 'products', label: 'Products', icon: Package },
  { id: 'inventory', label: 'Inventory', icon: Warehouse },
  { id: 'customers', label: 'Customers', icon: Users },
  { id: 'vip', label: 'VIP Clienteling', icon: Crown },
  { id: 'orders', label: 'Orders', icon: ShoppingBag },
  { id: 'boutiques', label: 'Boutiques', icon: Store },
  { id: 'ecommerce', label: 'E-Commerce', icon: Globe },
  { id: 'marketing', label: 'Marketing', icon: TrendingUp },
  { id: 'supply', label: 'Supply Chain', icon: Truck },
  { id: 'sustainability', label: 'Sustainability', icon: Leaf },
  { id: 'analytics', label: 'Analytics', icon: BarChart3 },
  { id: 'settings', label: 'Settings', icon: Settings },
];

export default function FashionLuxuryCommandCenter() {
  const [selectedKPI, setSelectedKPI] = useState('sales');
  const [selectedNav, setSelectedNav] = useState('executive');

  const renderKPICard = (label: string, data: any, color: string, index: number) => (
    <Animated.View
      entering={FadeInUp.delay(index * 50).springify()}
      key={label}
      style={[styles.kpiCard, { backgroundColor: THEME.cardLight, borderColor: color + '30' }]}
    >
      <Text style={styles.kpiLabel}>{label}</Text>
      <Text style={styles.kpiValue}>{data.value}</Text>
      <View style={styles.kpiTrend}>
        {data.trend === 'up' ? (
          <ArrowUpRight size={16} color={THEME.emeraldGreen} />
        ) : data.trend === 'down' ? (
          <ArrowDownRight size={16} color={THEME.crimson} />
        ) : (
          <Minus size={16} color={THEME.textMuted} />
        )}
        <Text style={[
          styles.kpiChange,
          { color: data.trend === 'up' ? THEME.emeraldGreen : data.trend === 'down' ? THEME.crimson : THEME.textMuted }
        ]}>
          {Math.abs(data.change)}%
        </Text>
      </View>
    </Animated.View>
  );

  const renderAgentCard = (agent: any, index: number) => (
    <Animated.View
      entering={FadeInUp.delay(index * 50).springify()}
      key={agent.id}
      style={[styles.agentCard, { backgroundColor: THEME.cardLight, borderColor: agent.color + '30' }]}
    >
      <View style={[styles.agentIcon, { backgroundColor: agent.color + '20' }]}>
        <agent.icon size={28} color={agent.color} />
      </View>
      <View style={styles.agentInfo}>
        <View style={styles.agentHeader}>
          <Text style={styles.agentName}>{agent.name}</Text>
          <View style={[styles.statusBadge, { backgroundColor: agent.color + '20' }]}>
            <View style={[styles.statusDot, { backgroundColor: agent.color }]} />
            <Text style={[styles.statusText, { color: agent.color }]}>{agent.status}</Text>
          </View>
        </View>
        <Text style={styles.agentRole}>{agent.role}</Text>
        <View style={styles.responsibilities}>
          {agent.responsibilities.slice(0, 2).map((resp: string, i: number) => (
            <View key={i} style={[styles.respChip, { backgroundColor: agent.color + '10' }]}>
              <Text style={[styles.respText, { color: agent.color }]}>{resp}</Text>
            </View>
          ))}
        </View>
        <View style={styles.metricsRow}>
          {Object.entries(agent.metrics).map(([key, value]: [string, any], i: number) => (
            <View key={key} style={styles.metricItem}>
              <Text style={styles.metricValue}>{value}</Text>
              <Text style={styles.metricLabel}>{key.replace(/([A-Z])/g, ' $1').trim()}</Text>
            </View>
          ))}
        </View>
        <View style={styles.efficiencyBar}>
          <View style={[styles.efficiencyFill, { width: `${agent.efficiency}%`, backgroundColor: agent.color }]} />
          <Text style={styles.efficiencyText}>{agent.efficiency}% Efficiency</Text>
        </View>
      </View>
    </Animated.View>
  );

  const renderInsightCard = (insight: any, index: number) => {
    const colors: any = {
      warning: THEME.luxuryGold,
      opportunity: THEME.emeraldGreen,
      efficiency: THEME.sapphireBlue,
      alert: THEME.crimson,
      prediction: THEME.royalPurple,
      positive: THEME.emeraldGreen,
    };
    const color = colors[insight.type] || THEME.textMuted;
    
    return (
      <Animated.View
        entering={FadeInUp.delay(index * 50).springify()}
        key={insight.id}
        style={[styles.insightCard, { backgroundColor: THEME.cardLight, borderLeftColor: color }]}
      >
        <View style={styles.insightHeader}>
          <View style={[styles.insightIcon, { backgroundColor: color + '20' }]}>
            {insight.type === 'warning' && <AlertTriangle size={20} color={color} />}
            {insight.type === 'opportunity' && <Sparkles size={20} color={color} />}
            {insight.type === 'efficiency' && <Zap size={20} color={color} />}
            {insight.type === 'alert' && <Shield size={20} color={color} />}
            {insight.type === 'prediction' && <Brain size={20} color={color} />}
            {insight.type === 'positive' && <CheckCircle size={20} color={color} />}
          </View>
          <View style={styles.insightMeta}>
            <Text style={styles.insightTitle}>{insight.title}</Text>
            <Text style={styles.insightTime}>{insight.timestamp}</Text>
          </View>
          <View style={[styles.impactBadge, { backgroundColor: color + '20' }]}>
            <Text style={[styles.impactText, { color }]}>{insight.impact}</Text>
          </View>
        </View>
        <Text style={styles.insightMessage}>{insight.message}</Text>
        <View style={[styles.actionBox, { backgroundColor: color + '10' }]}>
          <Text style={[styles.actionText, { color }]}>Recommended: {insight.action}</Text>
        </View>
      </Animated.View>
    );
  };

  const renderActivityItem = (activity: any, index: number) => (
    <Animated.View
      entering={FadeInUp.delay(index * 30).springify()}
      key={activity.id}
      style={styles.activityItem}
    >
      <View style={[styles.activityIcon, { backgroundColor: THEME.luxuryGold + '20' }]}>
        <activity.icon size={18} color={THEME.luxuryGold} />
      </View>
      <View style={styles.activityContent}>
        <Text style={styles.activityMessage}>{activity.message}</Text>
        <Text style={styles.activityTime}>{activity.time}</Text>
      </View>
    </Animated.View>
  );

  const renderSystemHealth = (system: any, index: number) => {
    const statusColor = system.status === 'healthy' ? THEME.emeraldGreen : THEME.crimson;
    const Icon = system.icon;
    
    return (
      <Animated.View
        entering={FadeInUp.delay(index * 50).springify()}
        key={system.name}
        style={[styles.healthCard, { backgroundColor: THEME.cardLight }]}
      >
        <View style={[styles.healthIcon, { backgroundColor: statusColor + '20' }]}>
          <Icon size={24} color={statusColor} />
        </View>
        <View style={styles.healthInfo}>
          <Text style={styles.healthName}>{system.name}</Text>
          <View style={styles.healthStats}>
            <View style={styles.healthStat}>
              <Text style={[styles.healthStatValue, { color: THEME.emeraldGreen }]}>{system.active}</Text>
              <Text style={styles.healthStatLabel}>Active</Text>
            </View>
            <View style={styles.healthStat}>
              <Text style={[styles.healthStatValue, { color: THEME.crimson }]}>{system.offline}</Text>
              <Text style={styles.healthStatLabel}>Offline</Text>
            </View>
            <View style={styles.healthStat}>
              <Text style={[styles.healthStatValue, { color: statusColor }]}>{system.health}%</Text>
              <Text style={styles.healthStatLabel}>Health</Text>
            </View>
          </View>
        </View>
        <View style={[styles.healthIndicator, { backgroundColor: statusColor + '30' }]}>
          <View style={[styles.healthFill, { width: `${system.health}%`, backgroundColor: statusColor }]} />
        </View>
      </Animated.View>
    );
  };

  const renderCollectionCard = (label: string, value: string, icon: any, color: string, index: number) => (
    <Animated.View
      entering={FadeInUp.delay(index * 50).springify()}
      key={label}
      style={[styles.metricCard, { backgroundColor: THEME.cardLight }]}
    >
      <View style={[styles.metricIcon, { backgroundColor: color + '20' }]}>
        <icon size={24} color={color} />
      </View>
      <Text style={styles.metricLabel}>{label}</Text>
      <Text style={styles.metricValue}>{value}</Text>
    </Animated.View>
  );

  const renderInventoryCard = (label: string, value: string, status: string, color: string, index: number) => (
    <Animated.View
      entering={FadeInUp.delay(index * 50).springify()}
      key={label}
      style={[styles.inventoryCard, { backgroundColor: THEME.cardLight, borderLeftColor: color }]}
    >
      <Text style={styles.inventoryLabel}>{label}</Text>
      <Text style={styles.inventoryValue}>{value}</Text>
      <View style={[styles.inventoryStatus, { backgroundColor: color + '20' }]}>
        <Text style={[styles.inventoryStatusText, { color }]}>{status}</Text>
      </View>
    </Animated.View>
  );

  const renderBoutiqueCard = (boutique: any, index: number) => (
    <Animated.View
      entering={FadeInUp.delay(index * 50).springify()}
      key={boutique.name}
      style={[styles.boutiqueCard, { backgroundColor: THEME.cardLight }]}
    >
      <View style={styles.boutiqueHeader}>
        <Store size={20} color={THEME.luxuryGold} />
        <Text style={styles.boutiqueName}>{boutique.name}</Text>
        <Text style={styles.boutiqueRank}>#{boutique.rank}</Text>
      </View>
      <Text style={styles.boutiqueRevenue}>{boutique.revenue}</Text>
      <View style={styles.boutiqueMetrics}>
        <View style={styles.boutiqueMetric}>
          <Text style={styles.boutiqueMetricValue}>{boutique.traffic}</Text>
          <Text style={styles.boutiqueMetricLabel}>Daily Traffic</Text>
        </View>
        <View style={styles.boutiqueMetric}>
          <Text style={styles.boutiqueMetricValue}>{boutique.staff}</Text>
          <Text style={styles.boutiqueMetricLabel}>Staff</Text>
        </View>
      </View>
    </Animated.View>
  );

  const renderSustainabilityCard = (label: string, value: string, target: string, color: string, index: number) => (
    <Animated.View
      entering={FadeInUp.delay(index * 50).springify()}
      key={label}
      style={[styles.sustainabilityCard, { backgroundColor: THEME.cardLight }]}
    >
      <View style={[styles.sustainabilityIcon, { backgroundColor: color + '20' }]}>
        <Leaf size={24} color={color} />
      </View>
      <Text style={styles.sustainabilityLabel}>{label}</Text>
      <Text style={styles.sustainabilityValue}>{value}</Text>
      <Text style={styles.sustainabilityTarget}>Target: {target}</Text>
      <View style={styles.sustainabilityBar}>
        <View style={[styles.sustainabilityFill, { width: `${parseInt(value)}%`, backgroundColor: color }]} />
      </View>
    </Animated.View>
  );

  const renderCommandCard = (item: any, index: number) => (
    <Animated.View
      entering={FadeInUp.delay(index * 50).springify()}
      key={item.label}
      style={[styles.commandCard, { backgroundColor: THEME.cardLight }]}
    >
      <View style={[styles.commandIcon, { backgroundColor: item.color + '20' }]}>
        <item.icon size={32} color={item.color} />
      </View>
      <Text style={styles.commandValue}>{item.value}</Text>
      <Text style={styles.commandLabel}>{item.label}</Text>
      <View style={styles.commandTrend}>
        {item.trend === 'up' ? (
          <ArrowUpRight size={16} color={THEME.emeraldGreen} />
        ) : (
          <ArrowDownRight size={16} color={THEME.crimson} />
        )}
        <Text style={[styles.commandChange, { color: item.trend === 'up' ? THEME.emeraldGreen : THEME.crimson }]}>
          {item.change}
        </Text>
      </View>
    </Animated.View>
  );

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: THEME.background }]}>
      {/* Header */}
      <View style={[styles.header, { borderBottomColor: THEME.border }]}>
        <View style={[styles.headerIcon, { backgroundColor: THEME.luxuryGold + '20' }]}>
          <Gem size={28} color={THEME.luxuryGold} />
        </View>
        <View style={styles.headerContent}>
          <Text style={styles.headerTitle}>Fashion & Luxury AI Command Center</Text>
          <Text style={styles.headerSubtitle}>Autonomous Luxury Retail Operations</Text>
        </View>
        <TouchableOpacity style={styles.settingsButton}>
          <Settings size={24} color={THEME.text} />
        </TouchableOpacity>
      </View>

      <View style={styles.mainContent}>
        {/* Left Navigation */}
        <ScrollView style={styles.navigation} showsVerticalScrollIndicator={false}>
          {NAVIGATION_ITEMS.map((item) => (
            <TouchableOpacity
              key={item.id}
              onPress={() => setSelectedNav(item.id)}
              style={[
                styles.navItem,
                selectedNav === item.id && { backgroundColor: THEME.luxuryGold + '20', borderLeftColor: THEME.luxuryGold }
              ]}
            >
              <item.icon size={20} color={selectedNav === item.id ? THEME.luxuryGold : THEME.textMuted} />
              <Text style={[
                styles.navItemText,
                selectedNav === item.id ? { color: THEME.luxuryGold } : { color: THEME.textMuted }
              ]}>
                {item.label}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* Main Content */}
        <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Executive KPI Bar */}
        <View style={styles.kpiSection}>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.kpiTabs}>
            {Object.keys(EXECUTIVE_KPIS).map((key) => (
              <TouchableOpacity
                key={key}
                onPress={() => setSelectedKPI(key)}
                style={[
                  styles.kpiTab,
                  selectedKPI === key && { backgroundColor: THEME.luxuryGold + '20', borderColor: THEME.luxuryGold }
                ]}
              >
                <Text style={[
                  styles.kpiTabText,
                  selectedKPI === key ? { color: THEME.luxuryGold } : { color: THEME.textMuted }
                ]}>
                  {key.charAt(0).toUpperCase() + key.slice(1)}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.kpiScroll}>
            <View style={styles.kpiRow}>
              {Object.entries(EXECUTIVE_KPIS[selectedKPI as keyof typeof EXECUTIVE_KPIS]).map(([key, data], index) =>
                renderKPICard(key.replace(/([A-Z])/g, ' $1').trim(), data as any, THEME.luxuryGold, index)
              )}
            </View>
          </ScrollView>
        </View>

        {/* AI Fashion Agents */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>AI Fashion Agents</Text>
          <Text style={styles.sectionSubtitle}>Autonomous agents managing luxury fashion operations</Text>
          <View style={styles.agentsGrid}>
            {AI_FASHION_AGENTS.map((agent, index) => renderAgentCard(agent, index))}
          </View>
        </View>

        {/* CEO Command Center */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>CEO Command Center</Text>
          <Text style={styles.sectionSubtitle}>Executive overview of luxury fashion operations</Text>
          <View style={styles.commandGrid}>
            {[
              { label: 'Global Revenue', value: '$4.8B', icon: DollarSign, color: THEME.luxuryGold, change: '+18.7%', trend: 'up' },
              { label: 'Active Boutiques', value: '234', icon: Store, color: THEME.royalPurple, change: '+12.3%', trend: 'up' },
              { label: 'Online Visitors', value: '89K', icon: Users, color: THEME.emeraldGreen, change: '+24.5%', trend: 'up' },
              { label: 'VIP Customers', value: '89K', icon: Crown, color: THEME.platinumSilver, change: '+22.5%', trend: 'up' },
              { label: 'AI Revenue Impact', value: '$1.2B', icon: Brain, color: THEME.roseGold, change: '+67.8%', trend: 'up' },
              { label: 'Luxury Sales', value: '$3.2B', icon: ShoppingBag, color: THEME.sapphireBlue, change: '+15.2%', trend: 'up' },
            ].map((item, index) => renderCommandCard(item, index))}
          </View>
        </View>

        {/* AI Insights */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>AI Insights</Text>
          <Text style={styles.sectionSubtitle}>Intelligent recommendations from AI agents</Text>
          <View style={styles.insightsContainer}>
            {AI_INSIGHTS.map((insight, index) => renderInsightCard(insight, index))}
          </View>
        </View>

        {/* Live Activity Feed */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Live Activity Feed</Text>
          <Text style={styles.sectionSubtitle}>Real-time luxury retail operations</Text>
          <View style={[styles.feedContainer, { backgroundColor: THEME.cardLight }]}>
            {ACTIVITY_FEED.map((activity, index) => renderActivityItem(activity, index))}
          </View>
        </View>

        {/* System Health */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>System Health</Text>
          <Text style={styles.sectionSubtitle}>Infrastructure and service monitoring</Text>
          <View style={styles.healthGrid}>
            {SYSTEM_HEALTH.map((system, index) => renderSystemHealth(system, index))}
          </View>
        </View>

        {/* Collection Intelligence */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Collection Intelligence</Text>
          <Text style={styles.sectionSubtitle}>Fashion collection performance and analytics</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.metricsScroll}>
            <View style={styles.metricsRow}>
              {renderCollectionCard('Seasonal Collections', '924', Sparkles, THEME.royalPurple, 0)}
              {renderCollectionCard('New Arrivals', '1,247', Shirt, THEME.luxuryGold, 1)}
              {renderCollectionCard('Best Sellers', '169', Flame, THEME.emeraldGreen, 2)}
              {renderCollectionCard('Product Lifecycle', '191', Clock, THEME.roseGold, 3)}
            </View>
          </ScrollView>
        </View>

        {/* Inventory Command Center */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Inventory Command Center</Text>
          <Text style={styles.sectionSubtitle}>Warehouse stock and boutique inventory</Text>
          <View style={styles.inventoryGrid}>
            {renderInventoryCard('Warehouse Stock', '$890M', 'Healthy', THEME.emeraldGreen, 0)}
            {renderInventoryCard('Low Stock Alerts', '23', 'Warning', THEME.crimson, 1)}
            {renderInventoryCard('Overstock Risks', '43', 'Attention', THEME.luxuryGold, 2)}
            {renderInventoryCard('Returns Rate', '8.4%', 'Decreasing', THEME.emeraldGreen, 3)}
          </View>
        </View>

        {/* Customer Intelligence */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Customer Intelligence</Text>
          <Text style={styles.sectionSubtitle}>VIP clienteling and customer segments</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.metricsScroll}>
            <View style={styles.metricsRow}>
              {renderCollectionCard('VIP Clients', '89K', Crown, THEME.platinumSilver, 0)}
              {renderCollectionCard('Active Customers', '2.4M', Users, THEME.royalPurple, 1)}
              {renderCollectionCard('Customer LTV', '$12.4K', DollarSign, THEME.luxuryGold, 2)}
              {renderCollectionCard('Repeat Rate', '78%', Heart, THEME.roseGold, 3)}
            </View>
          </ScrollView>
        </View>

        {/* E-Commerce Command Center */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>E-Commerce Command Center</Text>
          <Text style={styles.sectionSubtitle}>Online sales and conversion analytics</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.metricsScroll}>
            <View style={styles.metricsRow}>
              {renderCollectionCard('Website Revenue', '$67.8M', Globe, THEME.luxuryGold, 0)}
              {renderCollectionCard('Conversion Rate', '4.2%', Target, THEME.emeraldGreen, 1)}
              {renderCollectionCard('Cart Abandonment', '34%', ShoppingBag, THEME.crimson, 2)}
              {renderCollectionCard('Product Views', '1.2M', Eye, THEME.royalPurple, 3)}
            </View>
          </ScrollView>
        </View>

        {/* Boutique Operations */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Boutique Operations</Text>
          <Text style={styles.sectionSubtitle}>Store performance and rankings</Text>
          <View style={styles.boutiquesGrid}>
            {[
              { name: 'Paris', revenue: '$234M', traffic: '15,234', staff: 45, rank: 1 },
              { name: 'New York', revenue: '$245M', traffic: '18,456', staff: 52, rank: 2 },
              { name: 'Tokyo', revenue: '$198M', traffic: '12,847', staff: 38, rank: 3 },
            ].map((boutique, index) => renderBoutiqueCard(boutique, index))}
          </View>
        </View>

        {/* Marketing Intelligence */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Marketing Intelligence</Text>
          <Text style={styles.sectionSubtitle}>Campaign performance and social media</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.metricsScroll}>
            <View style={styles.metricsRow}>
              {renderCollectionCard('Campaign ROI', '340%', TrendingUp, THEME.emeraldGreen, 0)}
              {renderCollectionCard('Social Reach', '45M', Radio, THEME.royalPurple, 1)}
              {renderCollectionCard('Influencer Revenue', '$234M', Award, THEME.luxuryGold, 2)}
              {renderCollectionCard('Email Conversion', '12.4%', Mail, THEME.roseGold, 3)}
            </View>
          </ScrollView>
        </View>

        {/* Supply Chain */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Supply Chain</Text>
          <Text style={styles.sectionSubtitle}>Suppliers, shipments, and logistics</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.metricsScroll}>
            <View style={styles.metricsRow}>
              {renderCollectionCard('Active Suppliers', '189', Factory, THEME.luxuryGold, 0)}
              {renderCollectionCard('In Transit', '234', Truck, THEME.royalPurple, 1)}
              {renderCollectionCard('On-Time Rate', '94%', Clock, THEME.emeraldGreen, 2)}
              {renderCollectionCard('Manufacturing', '89', Package, THEME.roseGold, 3)}
            </View>
          </ScrollView>
        </View>

        {/* Global Operations */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Global Operations</Text>
          <Text style={styles.sectionSubtitle}>Revenue and performance by region</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.metricsScroll}>
            <View style={styles.metricsRow}>
              {renderCollectionCard('Europe', '$1.8B', Globe, THEME.luxuryGold, 0)}
              {renderCollectionCard('Americas', '$1.6B', MapPin, THEME.royalPurple, 1)}
              {renderCollectionCard('Asia-Pacific', '$1.2B', Compass, THEME.emeraldGreen, 2)}
              {renderCollectionCard('Middle East', '$200M', Navigation, THEME.roseGold, 3)}
            </View>
          </ScrollView>
        </View>

        {/* Sustainability Scorecard */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Sustainability Scorecard</Text>
          <Text style={styles.sectionSubtitle}>ESG metrics and environmental impact</Text>
          <View style={styles.sustainabilityGrid}>
            {renderSustainabilityCard('Carbon Reduction', '23%', '30%', THEME.emeraldGreen, 0)}
            {renderSustainabilityCard('Water Efficiency', '89%', '85%', THEME.sapphireBlue, 1)}
            {renderSustainabilityCard('Renewable Energy', '69%', '75%', THEME.luxuryGold, 2)}
            {renderSustainabilityCard('ESG Score', '92%', '95%', THEME.royalPurple, 3)}
          </View>
        </View>
        </ScrollView>
      </View>
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
    paddingVertical: 16,
    borderBottomWidth: 1,
  },
  mainContent: {
    flex: 1,
    flexDirection: 'row',
  },
  navigation: {
    width: 200,
    backgroundColor: '#0A0F1E',
    borderRightWidth: 1,
    borderRightColor: '#1E293B',
    paddingVertical: 16,
  },
  navItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderLeftWidth: 3,
    borderLeftColor: 'transparent',
    marginBottom: 4,
  },
  navItemText: {
    marginLeft: 12,
    fontSize: 12,
  },
  scrollView: {
    flex: 1,
    padding: 16,
  },
  headerIcon: {
    padding: 12,
    borderRadius: 12,
    marginRight: 12,
  },
  headerContent: {
    flex: 1,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#E2E8F0',
  },
  headerSubtitle: {
    fontSize: 12,
    color: '#94A3B8',
    marginTop: 2,
  },
  settingsButton: {
    padding: 8,
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderRadius: 8,
  },
  scrollView: {
    flex: 1,
    padding: 16,
  },
  kpiSection: {
    marginBottom: 24,
  },
  kpiTabs: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  kpiTab: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
    marginRight: 8,
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
    paddingHorizontal: 4,
  },
  kpiCard: {
    width: 140,
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    marginRight: 12,
  },
  kpiLabel: {
    fontSize: 10,
    color: '#94A3B8',
    marginBottom: 4,
  },
  kpiValue: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#E2E8F0',
    marginBottom: 4,
  },
  kpiTrend: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  kpiChange: {
    fontSize: 10,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#E2E8F0',
    marginBottom: 4,
  },
  sectionSubtitle: {
    fontSize: 12,
    color: '#94A3B8',
    marginBottom: 16,
  },
  agentsGrid: {
    gap: 12,
  },
  agentCard: {
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
  },
  agentIcon: {
    width: 56,
    height: 56,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  agentInfo: {
    flex: 1,
  },
  agentHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  agentName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#E2E8F0',
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
    color: '#94A3B8',
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
    fontWeight: 'bold',
    color: '#E2E8F0',
  },
  metricLabel: {
    fontSize: 9,
    color: '#94A3B8',
  },
  efficiencyBar: {
    height: 4,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 2,
    overflow: 'hidden',
    marginBottom: 4,
  },
  efficiencyFill: {
    height: '100%',
  },
  efficiencyText: {
    fontSize: 10,
    color: '#94A3B8',
  },
  commandGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  commandCard: {
    width: (SCREEN_WIDTH - 64) / 3,
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  commandIcon: {
    width: 56,
    height: 56,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  commandValue: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#E2E8F0',
    marginBottom: 4,
  },
  commandLabel: {
    fontSize: 10,
    color: '#94A3B8',
    marginBottom: 4,
    textAlign: 'center',
  },
  commandTrend: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  commandChange: {
    fontSize: 10,
  },
  insightsContainer: {
    gap: 12,
  },
  insightCard: {
    padding: 16,
    borderRadius: 12,
    borderLeftWidth: 4,
  },
  insightHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  insightIcon: {
    width: 40,
    height: 40,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  insightMeta: {
    flex: 1,
  },
  insightTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#E2E8F0',
  },
  insightTime: {
    fontSize: 10,
    color: '#94A3B8',
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
    fontSize: 12,
    color: '#94A3B8',
    marginBottom: 8,
  },
  actionBox: {
    padding: 8,
    borderRadius: 8,
  },
  actionText: {
    fontSize: 11,
  },
  feedContainer: {
    padding: 16,
    borderRadius: 12,
  },
  activityItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderRadius: 8,
    marginBottom: 8,
  },
  activityIcon: {
    width: 36,
    height: 36,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  activityContent: {
    flex: 1,
  },
  activityMessage: {
    fontSize: 12,
    color: '#E2E8F0',
  },
  activityTime: {
    fontSize: 10,
    color: '#94A3B8',
  },
  healthGrid: {
    gap: 12,
  },
  healthCard: {
    padding: 16,
    borderRadius: 12,
  },
  healthIcon: {
    width: 48,
    height: 48,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  healthInfo: {
    marginBottom: 12,
  },
  healthName: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#E2E8F0',
    marginBottom: 8,
  },
  healthStats: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  healthStat: {
    alignItems: 'center',
  },
  healthStatValue: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  healthStatLabel: {
    fontSize: 10,
    color: '#94A3B8',
  },
  healthIndicator: {
    height: 4,
    borderRadius: 2,
    overflow: 'hidden',
  },
  healthFill: {
    height: '100%',
  },
  metricsScroll: {
    marginBottom: 8,
  },
  metricsRow: {
    flexDirection: 'row',
    paddingHorizontal: 4,
  },
  metricCard: {
    width: 140,
    padding: 16,
    borderRadius: 12,
    marginRight: 12,
    alignItems: 'center',
  },
  metricIcon: {
    width: 48,
    height: 48,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  metricLabel: {
    fontSize: 10,
    color: '#94A3B8',
    marginBottom: 4,
    textAlign: 'center',
  },
  metricValue: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#E2E8F0',
  },
  inventoryGrid: {
    gap: 12,
  },
  inventoryCard: {
    padding: 16,
    borderRadius: 12,
    borderLeftWidth: 4,
  },
  inventoryLabel: {
    fontSize: 12,
    color: '#94A3B8',
    marginBottom: 4,
  },
  inventoryValue: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#E2E8F0',
    marginBottom: 8,
  },
  inventoryStatus: {
    alignSelf: 'flex-start',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  inventoryStatusText: {
    fontSize: 10,
    fontWeight: '600',
  },
  boutiquesGrid: {
    gap: 12,
  },
  boutiqueCard: {
    padding: 16,
    borderRadius: 12,
  },
  boutiqueHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  boutiqueName: {
    flex: 1,
    fontSize: 14,
    fontWeight: 'bold',
    color: '#E2E8F0',
    marginLeft: 8,
  },
  boutiqueRank: {
    fontSize: 12,
    fontWeight: 'bold',
    color: THEME.luxuryGold,
  },
  boutiqueRevenue: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#E2E8F0',
    marginBottom: 12,
  },
  boutiqueMetrics: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  boutiqueMetric: {
    alignItems: 'center',
  },
  boutiqueMetricValue: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#E2E8F0',
  },
  boutiqueMetricLabel: {
    fontSize: 10,
    color: '#94A3B8',
  },
  sustainabilityGrid: {
    gap: 12,
  },
  sustainabilityCard: {
    padding: 16,
    borderRadius: 12,
  },
  sustainabilityIcon: {
    width: 48,
    height: 48,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  sustainabilityLabel: {
    fontSize: 12,
    color: '#94A3B8',
    marginBottom: 4,
  },
  sustainabilityValue: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#E2E8F0',
    marginBottom: 4,
  },
  sustainabilityTarget: {
    fontSize: 10,
    color: '#94A3B8',
    marginBottom: 8,
  },
  sustainabilityBar: {
    height: 4,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 2,
    overflow: 'hidden',
  },
  sustainabilityFill: {
    height: '100%',
  },
});
