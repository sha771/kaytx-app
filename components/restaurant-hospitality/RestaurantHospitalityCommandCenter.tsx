import React, { useState } from 'react';
import { View, Text, ScrollView, StyleSheet, Dimensions, TouchableOpacity, SafeAreaView } from 'react-native';
import Animated, { FadeInUp, FadeIn } from 'react-native-reanimated';
import {
  ChefHat,
  Utensils,
  Package,
  Pizza,
  Truck,
  Users,
  DollarSign,
  Shield,
  TrendingUp,
  Activity,
  Brain,
  Zap,
  Globe,
  Store,
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
  Settings,
  LayoutDashboard,
  User,
  ChartBarBig,
  MapPin,
  Building2,
  AlertTriangle,
  CheckCircle,
  XCircle,
  PieChart as PieChartIcon,
  LineChart as LineChartIcon,
  Server,
  Cpu,
  Gauge,
  Cloud,
  Warehouse,
  Receipt,
  Calculator,
  BadgeCheck,
  ThumbsUp,
  Smile,
  MessageSquare,
  Phone,
  Bell,
  BellRing,
  MoreHorizontal,
  MoreVertical,
  Menu,
  X,
  Plus,
  RefreshCw,
  Search,
  Filter,
  Grid3x3,
  List,
  Maximize2,
  Download,
  Upload,
  Share2,
  Printer,
  FileText,
  Image as ImageIcon,
  Video,
  Mic,
  Camera,
  Lock,
  Unlock,
  Key,
  EyeOff,
  Divide,
  Percent,
  Hash,
  AtSign,
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
  Crown,
  Monitor,
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
  Compass,
  Route,
  Radar,
  Layers as LayersIcon,
  Tag,
  Ticket,
  Scale,
  BadgeAlert,
  BadgeHelp,
  Trophy,
  Medal,
  Ribbon,
  Diamond,
  ThumbsDown,
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
  Moon,
  Coffee,
  Sandwich,
  Apple,
  Carrot,
  Beef,
  Fish,
  Egg,
  Milk,
  Wine,
  Beer,
  IceCream,
  Cookie,
  Cake,
  Radio,
  ShoppingBag,
} from 'lucide-react-native';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

// Theme Colors
const THEME = {
  background: '#040608',
  card: '#0A0F1E',
  cardLight: '#121829',
  luxuryGold: '#D4AF37',
  freshGreen: '#10B981',
  kitchenOrange: '#F97316',
  crimson: '#DC143C',
  oceanBlue: '#0F4C75',
  aiPurple: '#8B5CF6',
  text: '#E2E8F0',
  textMuted: '#94A3B8',
  border: '#1E293B',
};

// Executive KPI Data
const EXECUTIVE_KPIS = {
  restaurant: {
    totalLocations: { value: '1,247', change: 12.3, trend: 'up' },
    activeTables: { value: '8,934', change: 8.7, trend: 'up' },
    reservationsToday: { value: '12,456', change: 18.2, trend: 'up' },
    ordersToday: { value: '45,678', change: 24.5, trend: 'up' },
    avgTableTurnover: { value: '2.4x', change: 6.8, trend: 'up' },
  },
  revenue: {
    dailyRevenue: { value: '$2.8M', change: 15.7, trend: 'up' },
    monthlyRevenue: { value: '$67.4M', change: 18.3, trend: 'up' },
    avgTicketSize: { value: '$47.50', change: 8.9, trend: 'up' },
    foodRevenue: { value: '$1.9M', change: 14.2, trend: 'up' },
    beverageRevenue: { value: '$890K', change: 22.4, trend: 'up' },
  },
  operations: {
    kitchenEfficiency: { value: '94%', change: 7.8, trend: 'up' },
    orderCompletionTime: { value: '12.4m', change: -15.3, trend: 'down' },
    deliveryPerformance: { value: '96%', change: 4.2, trend: 'up' },
    foodWaste: { value: '2.8%', change: -22.5, trend: 'down' },
    inventoryAccuracy: { value: '98%', change: 3.4, trend: 'up' },
  },
  customer: {
    guestSatisfaction: { value: '94%', change: 5.2, trend: 'up' },
    loyaltyMembers: { value: '2.4M', change: 28.7, trend: 'up' },
    repeatCustomers: { value: '67%', change: 8.9, trend: 'up' },
    reviews: { value: '4.8★', change: 0.3, trend: 'up' },
    waitTime: { value: '8.4m', change: -18.7, trend: 'down' },
  },
  ai: {
    ordersOptimized: { value: '1.2M', change: 89.4, trend: 'up' },
    menuRecommendations: { value: '890K', change: 156.7, trend: 'up' },
    demandForecastAccuracy: { value: '94%', change: 8.9, trend: 'up' },
    costSavings: { value: '$12.4M', change: 67.8, trend: 'up' },
    revenueInfluenced: { value: '$34.5M', change: 78.9, trend: 'up' },
  },
};

// AI Restaurant Agents
const AI_RESTAURANT_AGENTS = [
  {
    id: 'chef',
    name: 'Agent Chef',
    role: 'Kitchen Intelligence',
    color: THEME.kitchenOrange,
    icon: ChefHat,
    responsibilities: [
      'Kitchen workflow optimization',
      'Recipe execution',
      'Preparation timing',
      'Food quality monitoring',
    ],
    metrics: {
      ordersCoordinated: '45,678',
      kitchenEfficiency: '94%',
      foodQualityScore: '96%',
    },
    status: 'active',
    efficiency: 96,
  },
  {
    id: 'table',
    name: 'Agent Table',
    role: 'Reservation & Dining',
    color: THEME.oceanBlue,
    icon: Utensils,
    responsibilities: [
      'Reservation management',
      'Table optimization',
      'Waitlist automation',
      'Seating intelligence',
    ],
    metrics: {
      reservationsManaged: '12,456',
      tableUtilization: '87%',
      waitTimeReduction: '-22%',
    },
    status: 'active',
    efficiency: 94,
  },
  {
    id: 'pantry',
    name: 'Agent Pantry',
    role: 'Inventory Intelligence',
    color: THEME.freshGreen,
    icon: Package,
    responsibilities: [
      'Inventory tracking',
      'Stock forecasting',
      'Waste reduction',
      'Procurement optimization',
    ],
    metrics: {
      inventoryAccuracy: '98%',
      wasteReduction: '-28%',
      costSavings: '$8.4M',
    },
    status: 'active',
    efficiency: 95,
  },
  {
    id: 'flavor',
    name: 'Agent Flavor',
    role: 'Menu Engineering',
    color: THEME.luxuryGold,
    icon: Pizza,
    responsibilities: [
      'Menu optimization',
      'Pricing analysis',
      'Best seller identification',
      'Seasonal recommendations',
    ],
    metrics: {
      menuProfitability: '+18%',
      salesGrowth: '+24%',
      popularItems: '89',
    },
    status: 'active',
    efficiency: 92,
  },
  {
    id: 'courier',
    name: 'Agent Courier',
    role: 'Delivery Operations',
    color: THEME.aiPurple,
    icon: Truck,
    responsibilities: [
      'Delivery routing',
      'Driver coordination',
      'ETA optimization',
      'Order tracking',
    ],
    metrics: {
      deliveriesCompleted: '23,456',
      onTimeRate: '96%',
      customerSatisfaction: '94%',
    },
    status: 'active',
    efficiency: 93,
  },
  {
    id: 'host',
    name: 'Agent Host',
    role: 'Customer Experience',
    color: THEME.oceanBlue,
    icon: Users,
    responsibilities: [
      'Guest engagement',
      'Loyalty management',
      'Feedback analysis',
      'Personalized offers',
    ],
    metrics: {
      satisfactionScore: '94%',
      loyaltyGrowth: '+28%',
      repeatVisits: '+18%',
    },
    status: 'active',
    efficiency: 91,
  },
  {
    id: 'finance',
    name: 'Agent Finance',
    role: 'Restaurant Finance',
    color: THEME.luxuryGold,
    icon: DollarSign,
    responsibilities: [
      'Revenue forecasting',
      'Cost control',
      'Profit optimization',
      'Financial reporting',
    ],
    metrics: {
      revenueGrowth: '+18%',
      marginImprovement: '+12%',
      forecastAccuracy: '94%',
    },
    status: 'active',
    efficiency: 97,
  },
  {
    id: 'guardian',
    name: 'Agent Guardian',
    role: 'Food Safety & Compliance',
    color: THEME.crimson,
    icon: Shield,
    responsibilities: [
      'HACCP compliance',
      'Temperature monitoring',
      'Food safety',
      'Health inspections',
    ],
    metrics: {
      complianceScore: '98%',
      incidentsPrevented: '234',
      auditSuccess: '100%',
    },
    status: 'active',
    efficiency: 99,
  },
  {
    id: 'neural-hub',
    name: 'AI Neural Restaurant Intelligence Hub',
    role: 'Central Intelligence',
    color: THEME.aiPurple,
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
    id: 'demand-forecaster',
    name: 'AI Predictive Demand Forecaster',
    role: 'Demand Prediction',
    color: THEME.aiPurple,
    icon: TrendingUp,
    responsibilities: [
      'Demand prediction',
      'Market analysis',
      'Consumer behavior',
      'Sales forecasting',
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
    id: 'recipe-assistant',
    name: 'AI Real-Time Recipe Assistant',
    role: 'Recipe Support',
    color: THEME.luxuryGold,
    icon: ChefHat,
    responsibilities: [
      'Recipe assistance',
      'Menu generation',
      'Ingredient selection',
      'Cost optimization',
    ],
    metrics: {
      recipesCreated: '1,234',
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
    color: THEME.oceanBlue,
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
    role: 'Kitchen Production',
    color: THEME.freshGreen,
    icon: Flame,
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
    color: THEME.kitchenOrange,
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
    color: THEME.freshGreen,
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
    color: THEME.aiPurple,
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
    color: THEME.luxuryGold,
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
    color: THEME.freshGreen,
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
    color: THEME.kitchenOrange,
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
    color: THEME.oceanBlue,
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
    color: THEME.aiPurple,
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
    id: 'restaurant-coordinator',
    name: 'AI Cognitive Restaurant Coordinator',
    role: 'Restaurant Operations',
    color: THEME.luxuryGold,
    icon: Store,
    responsibilities: [
      'Restaurant coordination',
      'Staff scheduling',
      'Inventory sync',
      'Performance tracking',
    ],
    metrics: {
      restaurants: '234',
      efficiency: '+23%',
      satisfaction: '94%',
    },
    status: 'active',
    efficiency: 91,
  },
  {
    id: 'pos-integrator',
    name: 'AI Automated POS Integrator',
    role: 'POS Integration',
    color: THEME.oceanBlue,
    icon: Receipt,
    responsibilities: [
      'POS integration',
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
    color: THEME.aiPurple,
    icon: ChartBarBig,
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
    color: THEME.kitchenOrange,
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
    id: 'menu-advisor',
    name: 'AI Intelligent Menu Advisor',
    role: 'Menu Strategy',
    color: THEME.luxuryGold,
    icon: Pizza,
    responsibilities: [
      'Menu recommendations',
      'Dish suggestions',
      'Menu planning',
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
    color: THEME.freshGreen,
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
    color: THEME.oceanBlue,
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
    id: 'chief-restaurant-officer',
    name: 'AI Chief Restaurant Officer',
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
    color: THEME.luxuryGold,
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
    name: 'AI Culinary Creative Director',
    role: 'Creative Leadership',
    color: THEME.aiPurple,
    icon: ChefHat,
    responsibilities: [
      'Creative direction',
      'Menu leadership',
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
    name: 'AI Restaurant Merchandiser',
    role: 'Merchandising',
    color: THEME.kitchenOrange,
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
    id: 'vp-kitchen',
    name: 'AI VP Kitchen Operations',
    role: 'Kitchen Leadership',
    color: THEME.kitchenOrange,
    icon: Flame,
    responsibilities: [
      'Kitchen oversight',
      'Team leadership',
      'Quality standards',
      'Innovation',
    ],
    metrics: {
      dishes: '2,345',
      quality: '98%',
      innovation: '89%',
    },
    status: 'active',
    efficiency: 94,
  },
  {
    id: 'sous-chef',
    name: 'AI Sous Chef',
    role: 'Kitchen Support',
    color: THEME.kitchenOrange,
    icon: ChefHat,
    responsibilities: [
      'Dish preparation',
      'Recipe execution',
      'Quality control',
      'Team coordination',
    ],
    metrics: {
      dishes: '5,678',
      approved: '94%',
      timeToServe: '-34%',
    },
    status: 'active',
    efficiency: 92,
  },
  {
    id: 'line-cook',
    name: 'AI Line Cook',
    role: 'Line Cooking',
    color: THEME.kitchenOrange,
    icon: Flame,
    responsibilities: [
      'Line cooking',
      'Station management',
      'Quality standards',
      'Speed optimization',
    ],
    metrics: {
      dishes: '12,345',
      accuracy: '99%',
      speed: '+67%',
    },
    status: 'active',
    efficiency: 95,
  },
  {
    id: 'prep-cook',
    name: 'AI Prep Cook',
    role: 'Food Preparation',
    color: THEME.freshGreen,
    icon: Carrot,
    responsibilities: [
      'Food preparation',
      'Ingredient processing',
      'Quality assurance',
      'Efficiency',
    ],
    metrics: {
      prep: '3,456',
      approval: '96%',
      time: '-45%',
    },
    status: 'active',
    efficiency: 93,
  },
  {
    id: 'vp-operations',
    name: 'AI VP Restaurant Operations',
    role: 'Operations Leadership',
    color: THEME.luxuryGold,
    icon: Store,
    responsibilities: [
      'Operations oversight',
      'Capacity planning',
      'Quality control',
      'Cost optimization',
    ],
    metrics: {
      locations: '2.4M',
      quality: '98%',
      cost: '-18%',
    },
    status: 'active',
    efficiency: 94,
  },
  {
    id: 'restaurant-manager',
    name: 'AI Restaurant Manager',
    role: 'Restaurant Management',
    color: THEME.oceanBlue,
    icon: Store,
    responsibilities: [
      'Restaurant operations',
      'Assembly',
      'Quality control',
      'Customer service',
    ],
    metrics: {
      locations: '1.2M',
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
    color: THEME.freshGreen,
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
    color: THEME.kitchenOrange,
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
    id: 'vp-front-house',
    name: 'AI VP Front of House',
    role: 'Front of House Leadership',
    color: THEME.luxuryGold,
    icon: Users,
    responsibilities: [
      'Front of house strategy',
      'Customer experience',
      'Service standards',
      'Revenue growth',
    ],
    metrics: {
      locations: '234',
      revenue: '+34%',
      satisfaction: '94%',
    },
    status: 'active',
    efficiency: 93,
  },
  {
    id: 'maitre-d',
    name: 'AI Maître d\'',
    role: 'Host Management',
    color: THEME.oceanBlue,
    icon: Users,
    responsibilities: [
      'Guest management',
      'Seating optimization',
      'Service coordination',
      'VIP handling',
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
    id: 'sommelier',
    name: 'AI Sommelier',
    role: 'Beverage Service',
    color: THEME.luxuryGold,
    icon: Wine,
    responsibilities: [
      'Beverage recommendations',
      'Pairing suggestions',
      'Wine service',
      'Upselling',
    ],
    metrics: {
      recommendations: '8,901',
      engagement: '+45%',
      sales: '+23%',
    },
    status: 'active',
    efficiency: 91,
  },
  {
    id: 'server',
    name: 'AI Server Assistant',
    role: 'Service Support',
    color: THEME.freshGreen,
    icon: Utensils,
    responsibilities: [
      'Service assistance',
      'Order management',
      'Customer service',
      'Table management',
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
    id: 'restaurant-ops-manager',
    name: 'AI Restaurant Operations Manager',
    role: 'Operations',
    color: THEME.aiPurple,
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
    id: 'restaurant-tech-manager',
    name: 'AI Restaurant Technology Manager',
    role: 'Technology',
    color: THEME.oceanBlue,
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
    id: 'restaurant-data-analyst',
    name: 'AI Restaurant Data Analyst',
    role: 'Data Analytics',
    color: THEME.freshGreen,
    icon: ChartBarBig,
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
    id: 'restaurant-product-manager',
    name: 'AI Restaurant Product Manager',
    role: 'Product Management',
    color: THEME.kitchenOrange,
    icon: Pizza,
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
    id: 'restaurant-marketing-manager',
    name: 'AI Restaurant Marketing Manager',
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
    id: 'restaurant-sales-manager',
    name: 'AI Restaurant Sales Manager',
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
    title: 'Weekend Dinner Demand Surge',
    message: 'Weekend dinner demand expected to increase by 24% across all locations.',
    impact: 'High',
    action: 'Increase kitchen staffing and inventory allocation for weekend peak hours',
    timestamp: '2 hours ago',
  },
  {
    id: 2,
    type: 'opportunity',
    title: 'Signature Burger Profit Leader',
    message: 'Signature burger generates the highest profit margin across all locations.',
    impact: 'High',
    action: 'Promote signature burger as featured item and expand to all locations',
    timestamp: '4 hours ago',
  },
  {
    id: 3,
    type: 'efficiency',
    title: 'Inventory Waste Reduction',
    message: 'Inventory optimization can reduce food waste by 18% saving $2.4M annually.',
    impact: 'High',
    action: 'Implement AI-driven inventory forecasting and waste reduction protocols',
    timestamp: '6 hours ago',
  },
  {
    id: 4,
    type: 'opportunity',
    title: 'Friday Evening Staffing Adjustment',
    message: 'Staffing adjustment recommended for Friday evening peak hours.',
    impact: 'Medium',
    action: 'Increase kitchen and front-of-house staff by 15% on Friday evenings',
    timestamp: '8 hours ago',
  },
  {
    id: 5,
    type: 'prediction',
    title: 'Premium Dessert Bundle Opportunity',
    message: 'Premium dessert bundle projected to increase average ticket value by 12%.',
    impact: 'High',
    action: 'Launch premium dessert bundle promotion across all locations',
    timestamp: '12 hours ago',
  },
  {
    id: 6,
    type: 'efficiency',
    title: 'Delivery Route Optimization',
    message: 'AI route optimization can reduce delivery times by 15% and fuel costs by 8%.',
    impact: 'Medium',
    action: 'Deploy AI-powered delivery routing system',
    timestamp: '18 hours ago',
  },
];

// Live Activity Feed
const ACTIVITY_FEED = [
  { id: 1, type: 'reservation', message: 'Reservation confirmed - Party of 8 at 7:30 PM', time: '2 min ago', icon: Calendar },
  { id: 2, type: 'seating', message: 'Table seated - VIP guest at Table 12', time: '5 min ago', icon: Utensils },
  { id: 3, type: 'order', message: 'Order placed - 3 signature burgers + 2 craft beers', time: '8 min ago', icon: Receipt },
  { id: 4, type: 'kitchen', message: 'Kitchen started preparation - Order #45678', time: '12 min ago', icon: ChefHat },
  { id: 5, type: 'ready', message: 'Order ready - Pickup for delivery #12345', time: '15 min ago', icon: CheckCircle },
  { id: 6, type: 'delivery', message: 'Delivery dispatched - ETA 18 minutes', time: '20 min ago', icon: Truck },
  { id: 7, type: 'review', message: 'Customer review submitted - 5 stars "Amazing food!"', time: '25 min ago', icon: Star },
  { id: 8, type: 'inventory', message: 'Inventory restocked - Fresh produce delivery arrived', time: '30 min ago', icon: Package },
  { id: 9, type: 'vip', message: 'VIP guest arrived - Platinum member', time: '35 min ago', icon: Crown },
  { id: 10, type: 'health', message: 'Health check completed - All systems operational', time: '40 min ago', icon: Shield },
];

// System Health Data
const SYSTEM_HEALTH = [
  { name: 'POS Systems', status: 'healthy', active: 1,247, offline: 0, health: 99.9, icon: Receipt },
  { name: 'Kitchen Display Systems', status: 'healthy', active: 1,247, offline: 0, health: 99.5, icon: Monitor },
  { name: 'Payment Gateways', status: 'healthy', active: 23, offline: 0, health: 99.8, icon: CreditCard },
  { name: 'Reservation Platform', status: 'healthy', active: 45, offline: 0, health: 98.9, icon: Calendar },
  { name: 'Delivery APIs', status: 'healthy', active: 12, offline: 0, health: 97.8, icon: Truck },
  { name: 'AI Services', status: 'healthy', active: 89, offline: 0, health: 98.7, icon: Brain },
  { name: 'Inventory Systems', status: 'healthy', active: 67, offline: 0, health: 99.2, icon: Warehouse },
];

// Restaurant Performance Data
const RESTAURANT_PERFORMANCE = [
  { id: 1, name: 'Downtown Flagship', location: 'New York', revenue: '$1.2M', orders: '12,456', rating: '4.9', efficiency: 96 },
  { id: 2, name: 'Times Square', location: 'New York', revenue: '$890K', orders: '9,876', rating: '4.8', efficiency: 94 },
  { id: 3, name: 'Union Square', location: 'San Francisco', revenue: '$780K', orders: '8,765', rating: '4.7', efficiency: 93 },
  { id: 4, name: 'Hollywood Blvd', location: 'Los Angeles', revenue: '$1.1M', orders: '11,234', rating: '4.8', efficiency: 95 },
  { id: 5, name: 'Michigan Ave', location: 'Chicago', revenue: '$650K', orders: '7,234', rating: '4.6', efficiency: 91 },
];

// Menu Intelligence Data
const MENU_INTELLIGENCE = [
  { id: 1, name: 'Signature Burger', category: 'Main', sales: '12,456', margin: '68%', trend: 'up', popularity: 'High' },
  { id: 2, name: 'Truffle Fries', category: 'Sides', sales: '8,765', margin: '72%', trend: 'up', popularity: 'High' },
  { id: 3, name: 'Craft Beer Flight', category: 'Beverage', sales: '6,543', margin: '78%', trend: 'up', popularity: 'Medium' },
  { id: 4, name: 'Caesar Salad', category: 'Salads', sales: '5,432', margin: '65%', trend: 'stable', popularity: 'Medium' },
  { id: 5, name: 'Chocolate Lava Cake', category: 'Dessert', sales: '4,321', margin: '75%', trend: 'up', popularity: 'High' },
];

// Kitchen Command Center Data
const KITCHEN_DATA = {
  activeOrders: { total: 234, inProgress: 189, ready: 45 },
  preparationTimes: { avg: '12.4min', fastest: '8min', slowest: '18min' },
  cookingStations: { grill: 89, fryer: 67, prep: 45, assembly: 34 },
  bottlenecks: { station: 'Grill', severity: 'Medium', impact: '15% delay' },
  foodQuality: { score: '96%', complaints: 12, compliments: 234 },
};

// Inventory & Procurement Data
const INVENTORY_DATA = {
  currentInventory: { total: '$2.4M', fresh: '$890K', frozen: '$670K', dry: '$840K' },
  lowStockAlerts: { critical: 8, warning: 23, normal: 890 },
  supplierPerformance: { onTime: 94, quality: 96, cost: 92 },
  purchaseOrders: { pending: 34, approved: 67, received: 234 },
  foodWaste: { rate: '2.8%', value: '$67K', trend: 'down' },
};

// Delivery Command Center Data
const DELIVERY_DATA = {
  deliveryOrders: { total: 12,456, active: 234, completed: 12,222 },
  driverLocations: { available: 89, onDelivery: 145, offline: 12 },
  avgDeliveryTime: { current: '18min', target: '15min', trend: 'down' },
  etaAccuracy: { current: '94%', benchmark: '90%', trend: 'up' },
  deliveryRevenue: { today: '$890K', week: '$5.6M', month: '$23.4M' },
};

// Customer Experience Data
const CUSTOMER_DATA = {
  guestSatisfaction: { overall: '94%', food: '96%', service: '92%', ambiance: '93%' },
  reviews: { total: '45,678', average: '4.8★', positive: '89%', negative: '3%' },
  loyaltyMembers: { gold: 234, platinum: 89, diamond: 23, total: '2.4M' },
  repeatVisits: { rate: '67%', avgFrequency: '2.3/month', trend: 'up' },
  diningPreferences: { online: 45, dineIn: 34, takeaway: 21 },
};

// Staff Operations Data
const STAFF_DATA = {
  staffAttendance: { present: 89, absent: 5, late: 3, onLeave: 3 },
  shiftScheduling: { morning: 234, afternoon: 345, evening: 456, night: 123 },
  productivity: { avgOrders: '45/hour', avgRevenue: '$1.2K/hour', topPerformer: '67 orders' },
  laborCosts: { today: '$45K', week: '$312K', month: '$1.2M', percentage: '28%' },
  performance: { excellent: 45, good: 234, needsImprovement: 12, critical: 3 },
};

// Global Restaurant Operations Data
const GLOBAL_OPERATIONS = {
  revenueByRegion: { northAmerica: '$34.5M', europe: '$23.4M', asia: '$18.9M', other: '$6.7M' },
  restaurantLocations: { total: 1,247, new: 23, planned: 45 },
  deliveryZones: { total: 89, covered: 78, expanding: 11 },
  supplierNetwork: { total: 234, active: 189, new: 45 },
  customerDistribution: { urban: 67, suburban: 23, rural: 10 },
};

// Navigation Items
const NAVIGATION_ITEMS = [
  { id: 'dashboard', label: 'Executive Dashboard', icon: LayoutDashboard },
  { id: 'agents', label: 'AI Restaurant Agents', icon: Brain },
  { id: 'restaurants', label: 'Restaurants', icon: Store },
  { id: 'reservations', label: 'Reservations', icon: Calendar },
  { id: 'orders', label: 'Orders', icon: Receipt },
  { id: 'kitchen', label: 'Kitchen Operations', icon: ChefHat },
  { id: 'menu', label: 'Menu Management', icon: Pizza },
  { id: 'inventory', label: 'Inventory', icon: Package },
  { id: 'procurement', label: 'Procurement', icon: Truck },
  { id: 'staff', label: 'Staff Management', icon: Users },
  { id: 'delivery', label: 'Delivery', icon: Truck },
  { id: 'customers', label: 'Customer Experience', icon: Heart },
  { id: 'marketing', label: 'Marketing', icon: TrendingUp },
  { id: 'finance', label: 'Finance', icon: DollarSign },
  { id: 'analytics', label: 'Analytics', icon: ChartBarBig },
  { id: 'settings', label: 'Settings', icon: Settings },
];

export default function RestaurantHospitalityCommandCenter() {
  const [selectedKPI, setSelectedKPI] = useState('restaurant');
  const [selectedNav, setSelectedNav] = useState('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(false);

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
          <ArrowUpRight size={16} color={THEME.freshGreen} />
        ) : data.trend === 'down' ? (
          <ArrowDownRight size={16} color={THEME.crimson} />
        ) : (
          <Minus size={16} color={THEME.textMuted} />
        )}
        <Text style={[
          styles.kpiChange,
          { color: data.trend === 'up' ? THEME.freshGreen : data.trend === 'down' ? THEME.crimson : THEME.textMuted }
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
      opportunity: THEME.freshGreen,
      efficiency: THEME.oceanBlue,
      alert: THEME.crimson,
      prediction: THEME.aiPurple,
      positive: THEME.freshGreen,
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
            {insight.type === 'opportunity' && <Zap size={20} color={color} />}
            {insight.type === 'efficiency' && <Activity size={20} color={color} />}
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
    const statusColor = system.status === 'healthy' ? THEME.freshGreen : THEME.crimson;
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
              <Text style={[styles.healthStatValue, { color: THEME.freshGreen }]}>{system.active}</Text>
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
          <ArrowUpRight size={16} color={THEME.freshGreen} />
        ) : (
          <ArrowDownRight size={16} color={THEME.crimson} />
        )}
        <Text style={[styles.commandChange, { color: item.trend === 'up' ? THEME.freshGreen : THEME.crimson }]}>
          {item.change}
        </Text>
      </View>
    </Animated.View>
  );

  const renderRestaurantCard = (restaurant: any, index: number) => (
    <Animated.View
      entering={FadeInUp.delay(index * 50).springify()}
      key={restaurant.id}
      style={[styles.restaurantCard, { backgroundColor: THEME.cardLight }]}
    >
      <View style={styles.restaurantHeader}>
        <Text style={styles.restaurantName}>{restaurant.name}</Text>
        <View style={[styles.ratingBadge, { backgroundColor: THEME.luxuryGold + '20' }]}>
          <Star size={12} color={THEME.luxuryGold} />
          <Text style={[styles.ratingText, { color: THEME.luxuryGold }]}>{restaurant.rating}</Text>
        </View>
      </View>
      <Text style={styles.restaurantLocation}>{restaurant.location}</Text>
      <View style={styles.restaurantStats}>
        <View style={styles.restaurantStat}>
          <Text style={styles.restaurantStatValue}>{restaurant.revenue}</Text>
          <Text style={styles.restaurantStatLabel}>Revenue</Text>
        </View>
        <View style={styles.restaurantStat}>
          <Text style={styles.restaurantStatValue}>{restaurant.orders}</Text>
          <Text style={styles.restaurantStatLabel}>Orders</Text>
        </View>
        <View style={styles.restaurantStat}>
          <Text style={[styles.restaurantStatValue, { color: THEME.freshGreen }]}>{restaurant.efficiency}%</Text>
          <Text style={styles.restaurantStatLabel}>Efficiency</Text>
        </View>
      </View>
    </Animated.View>
  );

  const renderMenuItem = (item: any, index: number) => (
    <Animated.View
      entering={FadeInUp.delay(index * 50).springify()}
      key={item.id}
      style={[styles.menuItem, { backgroundColor: THEME.cardLight }]}
    >
      <View style={styles.menuHeader}>
        <Text style={styles.menuName}>{item.name}</Text>
        <View style={[styles.menuBadge, { backgroundColor: item.trend === 'up' ? THEME.freshGreen + '20' : THEME.textMuted + '20' }]}>
          <Text style={[styles.menuBadgeText, { color: item.trend === 'up' ? THEME.freshGreen : THEME.textMuted }]}>
            {item.trend === 'up' ? '↑' : '→'}
          </Text>
        </View>
      </View>
      <Text style={styles.menuCategory}>{item.category}</Text>
      <View style={styles.menuStats}>
        <View style={styles.menuStat}>
          <Text style={styles.menuStatValue}>{item.sales}</Text>
          <Text style={styles.menuStatLabel}>Sales</Text>
        </View>
        <View style={styles.menuStat}>
          <Text style={[styles.menuStatValue, { color: THEME.freshGreen }]}>{item.margin}</Text>
          <Text style={styles.menuStatLabel}>Margin</Text>
        </View>
        <View style={[styles.menuStat, { backgroundColor: item.popularity === 'High' ? THEME.luxuryGold + '20' : 'transparent', paddingHorizontal: 8, borderRadius: 8 }]}>
          <Text style={[styles.menuStatValue, { color: item.popularity === 'High' ? THEME.luxuryGold : THEME.textMuted }]}>{item.popularity}</Text>
          <Text style={styles.menuStatLabel}>Popularity</Text>
        </View>
      </View>
    </Animated.View>
  );

  const renderKitchenCard = (label: string, value: string, icon: any, color: string, index: number) => (
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

  const renderDeliveryCard = (label: string, value: string, icon: any, color: string, index: number) => (
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

  const renderCustomerCard = (label: string, value: string, icon: any, color: string, index: number) => (
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

  const renderStaffCard = (label: string, value: string, icon: any, color: string, index: number) => (
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

  const renderGlobalCard = (label: string, value: string, icon: any, color: string, index: number) => (
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

  const renderNavItem = (item: any, index: number) => (
    <TouchableOpacity
      key={item.id}
      onPress={() => setSelectedNav(item.id)}
      style={[
        styles.navItem,
        selectedNav === item.id && { backgroundColor: THEME.luxuryGold + '20' }
      ]}
    >
      <View style={[styles.navIcon, { backgroundColor: selectedNav === item.id ? THEME.luxuryGold + '30' : 'transparent' }]}>
        <item.icon size={20} color={selectedNav === item.id ? THEME.luxuryGold : THEME.textMuted} />
      </View>
      <Text style={[
        styles.navLabel,
        selectedNav === item.id ? { color: THEME.luxuryGold } : { color: THEME.textMuted }
      ]}>
        {item.label}
      </Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: THEME.background }]}>
      {/* Header */}
      <View style={[styles.header, { borderBottomColor: THEME.border }]}>
        <TouchableOpacity onPress={() => setSidebarOpen(!sidebarOpen)} style={styles.menuButton}>
          <Menu size={24} color={THEME.text} />
        </TouchableOpacity>
        <View style={[styles.headerIcon, { backgroundColor: THEME.luxuryGold + '20' }]}>
          <ChefHat size={28} color={THEME.luxuryGold} />
        </View>
        <View style={styles.headerContent}>
          <Text style={styles.headerTitle}>Restaurant & Hospitality AI Command Center</Text>
          <Text style={styles.headerSubtitle}>Autonomous Restaurant Operations Platform</Text>
        </View>
        <TouchableOpacity style={styles.settingsButton}>
          <Settings size={24} color={THEME.text} />
        </TouchableOpacity>
      </View>

      {/* Sidebar */}
      {sidebarOpen && (
        <View style={[styles.sidebar, { backgroundColor: THEME.card, borderRightColor: THEME.border }]}>
          <ScrollView style={styles.sidebarScroll} showsVerticalScrollIndicator={false}>
            <View style={styles.sidebarContent}>
              {NAVIGATION_ITEMS.map((item, index) => renderNavItem(item, index))}
            </View>
          </ScrollView>
        </View>
      )}

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

        {/* AI Restaurant Agents */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>AI Restaurant Agents</Text>
          <Text style={styles.sectionSubtitle}>Autonomous agents managing restaurant operations</Text>
          <View style={styles.agentsGrid}>
            {AI_RESTAURANT_AGENTS.map((agent, index) => renderAgentCard(agent, index))}
          </View>
        </View>

        {/* CEO Command Center */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>CEO Command Center</Text>
          <Text style={styles.sectionSubtitle}>Executive overview of restaurant operations</Text>
          <View style={styles.commandGrid}>
            {[
              { label: 'Total Revenue', value: '$67.4M', icon: DollarSign, color: THEME.luxuryGold, change: '+18.3%', trend: 'up' },
              { label: 'Restaurants Online', value: '1,247', icon: Store, color: THEME.kitchenOrange, change: '+12.3%', trend: 'up' },
              { label: 'Active Orders', value: '45,678', icon: Receipt, color: THEME.freshGreen, change: '+24.5%', trend: 'up' },
              { label: 'Reservations Today', value: '12,456', icon: Calendar, color: THEME.oceanBlue, change: '+18.2%', trend: 'up' },
              { label: 'Kitchen Efficiency', value: '94%', icon: ChefHat, color: THEME.kitchenOrange, change: '+7.8%', trend: 'up' },
              { label: 'AI Revenue Impact', value: '$34.5M', icon: Brain, color: THEME.aiPurple, change: '+78.9%', trend: 'up' },
            ].map((item, index) => renderCommandCard(item, index))}
          </View>
        </View>

        {/* Restaurant Operations */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Restaurant Operations</Text>
          <Text style={styles.sectionSubtitle}>Performance across all locations</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.restaurantScroll}>
            <View style={styles.restaurantGrid}>
              {RESTAURANT_PERFORMANCE.map((restaurant, index) => renderRestaurantCard(restaurant, index))}
            </View>
          </ScrollView>
        </View>

        {/* Menu Intelligence */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Menu Intelligence</Text>
          <Text style={styles.sectionSubtitle}>Best performers and optimization opportunities</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.menuScroll}>
            <View style={styles.menuGrid}>
              {MENU_INTELLIGENCE.map((item, index) => renderMenuItem(item, index))}
            </View>
          </ScrollView>
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
          <Text style={styles.sectionSubtitle}>Real-time restaurant operations</Text>
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

        {/* Kitchen Command Center */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Kitchen Command Center</Text>
          <Text style={styles.sectionSubtitle}>Real-time kitchen operations and performance</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.kitchenScroll}>
            <View style={styles.kitchenGrid}>
              {[
                { label: 'Active Orders', value: '234', icon: Activity, color: THEME.kitchenOrange },
                { label: 'Avg Prep Time', value: '12.4min', icon: Clock, color: THEME.kitchenOrange },
                { label: 'Grill Station', value: '89 orders', icon: Flame, color: THEME.kitchenOrange },
                { label: 'Food Quality', value: '96%', icon: Award, color: THEME.freshGreen },
                { label: 'Bottleneck', value: 'Grill', icon: AlertTriangle, color: THEME.crimson },
              ].map((item, index) => renderKitchenCard(item.label, item.value, item.icon, item.color, index))}
            </View>
          </ScrollView>
        </View>

        {/* Inventory & Procurement */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Inventory & Procurement</Text>
          <Text style={styles.sectionSubtitle}>Stock levels, suppliers, and waste analytics</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.inventoryScroll}>
            <View style={styles.inventoryGrid}>
              {[
                { label: 'Total Inventory', value: '$2.4M', status: 'Normal', color: THEME.freshGreen },
                { label: 'Fresh Stock', value: '$890K', status: 'Normal', color: THEME.freshGreen },
                { label: 'Low Stock Alerts', value: '8 critical', status: 'Critical', color: THEME.crimson },
                { label: 'Supplier On-Time', value: '94%', status: 'Good', color: THEME.freshGreen },
                { label: 'Food Waste', value: '2.8%', status: 'Improving', color: THEME.kitchenOrange },
              ].map((item, index) => renderInventoryCard(item.label, item.value, item.status, item.color, index))}
            </View>
          </ScrollView>
        </View>

        {/* Delivery Command Center */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Delivery Command Center</Text>
          <Text style={styles.sectionSubtitle}>Delivery operations and driver management</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.deliveryScroll}>
            <View style={styles.deliveryGrid}>
              {[
                { label: 'Active Deliveries', value: '234', icon: Truck, color: THEME.aiPurple },
                { label: 'Available Drivers', value: '89', icon: Users, color: THEME.freshGreen },
                { label: 'Avg Delivery Time', value: '18min', icon: Clock, color: THEME.kitchenOrange },
                { label: 'ETA Accuracy', value: '94%', icon: Target, color: THEME.freshGreen },
                { label: 'Delivery Revenue', value: '$890K', icon: DollarSign, color: THEME.luxuryGold },
              ].map((item, index) => renderDeliveryCard(item.label, item.value, item.icon, item.color, index))}
            </View>
          </ScrollView>
        </View>

        {/* Customer Experience */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Customer Experience</Text>
          <Text style={styles.sectionSubtitle}>Guest satisfaction and loyalty analytics</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.customerScroll}>
            <View style={styles.customerGrid}>
              {[
                { label: 'Overall Satisfaction', value: '94%', icon: Smile, color: THEME.freshGreen },
                { label: 'Average Rating', value: '4.8★', icon: Star, color: THEME.luxuryGold },
                { label: 'Loyalty Members', value: '2.4M', icon: Heart, color: THEME.oceanBlue },
                { label: 'Repeat Rate', value: '67%', icon: TrendingUp, color: THEME.freshGreen },
                { label: 'Reviews Today', value: '234', icon: MessageSquare, color: THEME.aiPurple },
              ].map((item, index) => renderCustomerCard(item.label, item.value, item.icon, item.color, index))}
            </View>
          </ScrollView>
        </View>

        {/* Staff Operations */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Staff Operations</Text>
          <Text style={styles.sectionSubtitle}>Workforce management and performance</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.staffScroll}>
            <View style={styles.staffGrid}>
              {[
                { label: 'Staff Present', value: '89', icon: User, color: THEME.freshGreen },
                { label: 'Evening Shift', value: '456', icon: Clock, color: THEME.kitchenOrange },
                { label: 'Avg Productivity', value: '45/hr', icon: Activity, color: THEME.aiPurple },
                { label: 'Labor Cost Today', value: '$45K', icon: DollarSign, color: THEME.luxuryGold },
                { label: 'Top Performer', value: '67 orders', icon: Trophy, color: THEME.luxuryGold },
              ].map((item, index) => renderStaffCard(item.label, item.value, item.icon, item.color, index))}
            </View>
          </ScrollView>
        </View>

        {/* Global Restaurant Operations */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Global Restaurant Operations</Text>
          <Text style={styles.sectionSubtitle}>Worldwide performance and expansion</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.globalScroll}>
            <View style={styles.globalGrid}>
              {[
                { label: 'North America', value: '$34.5M', icon: Globe, color: THEME.luxuryGold },
                { label: 'Europe', value: '$23.4M', icon: MapPin, color: THEME.oceanBlue },
                { label: 'Asia', value: '$18.9M', icon: MapPin, color: THEME.aiPurple },
                { label: 'Total Locations', value: '1,247', icon: Store, color: THEME.kitchenOrange },
                { label: 'New This Month', value: '23', icon: Plus, color: THEME.freshGreen },
              ].map((item, index) => renderGlobalCard(item.label, item.value, item.icon, item.color, index))}
            </View>
          </ScrollView>
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
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 16,
    borderBottomWidth: 1,
  },
  menuButton: {
    padding: 8,
    marginRight: 8,
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderRadius: 8,
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
  sidebar: {
    position: 'absolute',
    left: 0,
    top: 0,
    bottom: 0,
    width: 240,
    borderRightWidth: 1,
    zIndex: 1000,
  },
  sidebarScroll: {
    flex: 1,
  },
  sidebarContent: {
    padding: 16,
    gap: 4,
  },
  navItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    borderRadius: 8,
    marginBottom: 4,
  },
  navIcon: {
    width: 36,
    height: 36,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  navLabel: {
    fontSize: 13,
    fontWeight: '500',
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
    marginBottom: 2,
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
    borderRadius: 12,
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
    fontSize: 14,
    fontWeight: 'bold',
    color: '#E2E8F0',
  },
  healthStatLabel: {
    fontSize: 9,
    color: '#94A3B8',
  },
  healthIndicator: {
    height: 4,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 2,
    overflow: 'hidden',
  },
  healthFill: {
    height: '100%',
  },
  restaurantScroll: {
    marginBottom: 8,
  },
  restaurantGrid: {
    flexDirection: 'row',
    paddingHorizontal: 4,
  },
  restaurantCard: {
    width: 180,
    padding: 16,
    borderRadius: 12,
    marginRight: 12,
  },
  restaurantHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  restaurantName: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#E2E8F0',
    flex: 1,
  },
  ratingBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 6,
    paddingVertical: 4,
    borderRadius: 8,
  },
  ratingText: {
    fontSize: 10,
    fontWeight: '600',
    marginLeft: 4,
  },
  restaurantLocation: {
    fontSize: 10,
    color: '#94A3B8',
    marginBottom: 12,
  },
  restaurantStats: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  restaurantStat: {
    alignItems: 'center',
  },
  restaurantStatValue: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#E2E8F0',
  },
  restaurantStatLabel: {
    fontSize: 8,
    color: '#94A3B8',
  },
  menuScroll: {
    marginBottom: 8,
  },
  menuGrid: {
    flexDirection: 'row',
    paddingHorizontal: 4,
  },
  menuItem: {
    width: 160,
    padding: 16,
    borderRadius: 12,
    marginRight: 12,
  },
  menuHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  menuName: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#E2E8F0',
    flex: 1,
  },
  menuBadge: {
    paddingHorizontal: 6,
    paddingVertical: 4,
    borderRadius: 8,
  },
  menuBadgeText: {
    fontSize: 10,
    fontWeight: '600',
  },
  menuCategory: {
    fontSize: 10,
    color: '#94A3B8',
    marginBottom: 12,
  },
  menuStats: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  menuStat: {
    alignItems: 'center',
  },
  menuStatValue: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#E2E8F0',
  },
  menuStatLabel: {
    fontSize: 8,
    color: '#94A3B8',
  },
  metricCard: {
    width: 140,
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginRight: 12,
  },
  metricIcon: {
    width: 48,
    height: 48,
    borderRadius: 12,
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
    textAlign: 'center',
  },
  inventoryCard: {
    width: 160,
    padding: 16,
    borderRadius: 12,
    borderLeftWidth: 4,
    marginRight: 12,
  },
  inventoryLabel: {
    fontSize: 10,
    color: '#94A3B8',
    marginBottom: 4,
  },
  inventoryValue: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#E2E8F0',
    marginBottom: 8,
  },
  inventoryStatus: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
    alignSelf: 'flex-start',
  },
  inventoryStatusText: {
    fontSize: 10,
    fontWeight: '600',
  },
  kitchenScroll: {
    marginBottom: 8,
  },
  kitchenGrid: {
    flexDirection: 'row',
    paddingHorizontal: 4,
  },
  inventoryScroll: {
    marginBottom: 8,
  },
  inventoryGrid: {
    flexDirection: 'row',
    paddingHorizontal: 4,
  },
  deliveryScroll: {
    marginBottom: 8,
  },
  deliveryGrid: {
    flexDirection: 'row',
    paddingHorizontal: 4,
  },
  customerScroll: {
    marginBottom: 8,
  },
  customerGrid: {
    flexDirection: 'row',
    paddingHorizontal: 4,
  },
  staffScroll: {
    marginBottom: 8,
  },
  staffGrid: {
    flexDirection: 'row',
    paddingHorizontal: 4,
  },
  globalScroll: {
    marginBottom: 8,
  },
  globalGrid: {
    flexDirection: 'row',
    paddingHorizontal: 4,
  },
});
