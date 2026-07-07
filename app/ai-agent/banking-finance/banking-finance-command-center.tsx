import React, { useState, useEffect } from 'react';
import { View, StyleSheet, ScrollView, TouchableOpacity, Dimensions, RefreshControl, Animated } from 'react-native';
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
  Shield,
  Brain,
  Settings,
  DollarSign,
  Scale,
  Fingerprint,
  Landmark,
  Globe,
  CreditCard,
  LineChart,
  Sparkles,
  ChevronLeft,
  ChevronRight,
  X,
  Menu,
  Bell,
  Search,
  Filter,
  Zap,
  Award,
  AlertTriangle,
  CheckCircle2,
  ArrowUpRight,
  ArrowDownRight,
  Network,
  PieChart,
  Radar,
  Hexagon,
  Flame,
  Droplets,
  Clock,
  Globe2,
  Satellite,
  Radio,
  Database,
  Server,
  HardDrive,
  Wifi,
  Cpu,
  Monitor,
  Building2,
  Briefcase,
  Coins,
  PiggyBank,
  Receipt,
  ArrowRight,
  Play,
  Pause,
  SkipForward,
  RefreshCw,
  Download,
  Upload,
  Share2,
  Maximize2,
  Minimize2,
  MoreVertical,
  Eye,
  EyeOff,
  Lock,
  Unlock,
  Key,
  ShieldCheck,
  ShieldAlert,
  ShieldOff,
  FileText,
  ClipboardCheck,
  AlertOctagon,
  AlertCircle,
  Info,
  HelpCircle,
  XCircle,
  PlusCircle,
  MinusCircle,
  Layers,
  Grid3x3,
  LayoutGrid,
  LayoutList,
  Table,
  Calendar,
  CalendarClock,
  Timer,
  Stopwatch,
  Hourglass,
  Map,
  MapPin,
  Navigation,
  Compass,
  Earth,
  Signal,
  SignalHigh,
  SignalMedium,
  SignalLow,
  SignalZero,
  Battery,
  BatteryCharging,
  BatteryFull,
  BatteryMedium,
  BatteryLow,
  BatteryWarning,
  Power,
  PowerOff,
  ToggleLeft,
  ToggleRight,
  Switch,
  Slider,
  Sliders,
  Volume2,
  VolumeX,
  Mic,
  MicOff,
  Video,
  VideoOff,
  Phone,
  PhoneOff,
  Mail,
  Send,
  MessageSquare,
  MessageCircle,
  MessageSquareMore,
  AtSign,
  Hash,
  Paperclip,
  Link,
  Unlink,
  Quote,
  Smile,
  Frown,
  Meh,
  Angry,
  Laugh,
  Heart,
  Star,
  StarHalf,
  ThumbsUp,
  ThumbsDown,
  Bookmark,
  BookmarkCheck,
  Flag,
  FlagCheckered,
  Snowflake,
  Sun,
  Moon,
  Cloud,
  CloudRain,
  CloudSnow,
  CloudLightning,
  CloudDrizzle,
  CloudFog,
  Umbrella,
  Thermometer,
  ThermometerSun,
  ThermometerSnowflake,
  Wind,
  Droplet,
  Waves,
  Mountain,
  TreePine,
  Leaf,
  Flower,
  Flower2,
  Sprout,
  Seedling,
  Bird,
  Fish,
  Bug,
  Butterfly,
  Ladybug,
  Dragon,
  Cat,
  Dog,
  Rabbit,
  Horse,
  Pig,
  Cow,
  Sheep,
  Chicken,
  Duck,
  Egg,
  Apple,
  Banana,
  Cherry,
  Grape,
  Lemon,
  Orange,
  Peach,
  Pear,
  Plum,
  Strawberry,
  Watermelon,
  Carrot,
  Corn,
  Potato,
  Tomato,
  Wheat,
  Rice,
  Bread,
  Cookie,
  Cake,
  Pizza,
  Burger,
  Fries,
  HotDog,
  Popcorn,
  Candy,
  IceCream,
  Coffee,
  Tea,
  Beer,
  Wine,
  Cocktail,
  Martini,
  GlassWater,
  Utensils,
  ChefHat,
  Apron,
  Oven,
  Microwave,
  Refrigerator,
  Dishwasher,
  Blender,
  Toaster,
  Kettle,
  Pot,
  Pan,
  Knife,
  Fork,
  Spoon,
  Spatula,
  RollingPin,
  CuttingBoard,
  Weight,
  Ruler,
  TapeMeasure,
  Caliper,
  Square,
  SquareMinus,
  SquarePlus,
  Circle,
  CircleMinus,
  CirclePlus,
  Triangle,
  Pentagon,
  Octagon,
  Diamond,
  Package,
  Box,
  Archive,
  ArchiveBox,
  ArchiveRestore,
  ArchiveX,
  ArchivePlus,
  ArchiveMinus,
  Folder,
  FolderOpen,
  FolderPlus,
  FolderMinus,
  FolderCheck,
  FolderX,
  FolderHeart,
  FolderSync,
  FolderUp,
  FolderDown,
  FolderInput,
  FolderOutput,
  FolderKanban,
  FolderTree,
  File,
  FilePlus,
  FileMinus,
  FileX,
  FileCheck,
  FileHeart,
  FileSync,
  FileUp,
  FileDown,
  FileInput,
  FileOutput,
  FileSearch,
  FileImage,
  FileVideo,
  FileAudio,
  FileCode,
  FileSpreadsheet,
  FilePresentation,
  FileArchive,
  FilePieChart,
  FileBarChart,
  FileLineChart,
  FileQuery,
  FileQuestion,
  FileDigit,
  FileSignature,
  FileLock,
  FileUnlock,
  FileKey,
  FileWarning,
  FileAlert,
  FileInfo,
  FileHelp,
  FileCog,
  FileSettings,
  FileEdit,
  FileCopy,
  FileDuplicate,
  FileStack,
  Files,
  FileSymlink,
  FileSymlinkFile,
  FileJson,
  FileXml,
  FileHtml,
  FileCss,
  FileJs,
  FileTs,
  FilePython,
  FileRust,
  FileGo,
  FileJava,
  FilePhp,
  FileRuby,
  FileSwift,
  FileKotlin,
  FileDart,
  FileLua,
  FileSql,
  FileDb,
  FileCsv,
  FileMd,
  FileTxt,
  FilePdf,
  FileDoc,
  FileDocx,
  FilePpt,
  FilePptx,
  FileXls,
  FileXlsx,
  FileZip,
  FileRar,
  FileTar,
  FileGz,
  File7z,
  FileBz2,
  FileXz,
  FileLz4,
  FileLzma,
  FileZst,
  FileCab,
  FileIso,
  FileImg,
  FileDmg,
  FileExe,
  FileMsi,
  FileApp,
  FileApk,
  FileIpa,
  FileDeb,
  FileRpm,
  FileFlatpak,
  FileSnap,
  FileAppImage,
  FileBin,
  FileHex,
  FileBinary,
  FileOctal,
  FileDecimal,
  FileBase64,
  FileAscii,
  FileUtf8,
  FileUtf16,
  FileUtf32,
  FileLatin1,
  FileWindows1252,
  FileIso88591,
  FileIso88592,
  FileIso88593,
  FileIso88594,
  FileIso88595,
  FileIso88596,
  FileIso88597,
  FileIso88598,
  FileIso88599,
  FileIso885910,
  FileIso885911,
  FileIso885913,
  FileIso885914,
  FileIso885915,
  FileIso885916,
  FileCp437,
  FileCp850,
  FileCp852,
  FileCp855,
  FileCp858,
  FileCp860,
  FileCp861,
  FileCp862,
  FileCp863,
  FileCp864,
  FileCp865,
  FileCp866,
  FileCp869,
  FileCp874,
  FileCp1250,
  FileCp1251,
  FileCp1252,
  FileCp1253,
  FileCp1254,
  FileCp1255,
  FileCp1256,
  FileCp1257,
  FileCp1258,
  FileMac,
  FileMacRoman,
  FileMacCyrillic,
  FileMacGreek,
  FileMacTurkish,
  FileMacHebrew,
  FileMacArabic,
  FileMacThai,
  FileMacUkrainian,
  FileMacIcelandic,
  FileMacCentralEurRoman,
  FileMacVietnamese,
  FileMacSimpChinese,
  FileMacTradChinese,
  FileMacJapanese,
  FileMacKorean,
  FileDos,
  FileDosCp437,
  FileDosCp850,
  FileDosCp852,
  FileDosCp855,
  FileDosCp858,
  FileDosCp860,
  FileDosCp861,
  FileDosCp862,
  FileDosCp863,
  FileDosCp864,
  FileDosCp865,
  FileDosCp866,
  FileDosCp869,
  FileDosCp874,
  FileDosCp1250,
  FileDosCp1251,
  FileDosCp1252,
  FileDosCp1253,
  FileDosCp1254,
  FileDosCp1255,
  FileDosCp1256,
  FileDosCp1257,
  FileDosCp1258,
  FileEbcdic,
  FileEbcdicCp037,
  FileEbcdicCp273,
  FileEbcdicCp277,
  FileEbcdicCp278,
  FileEbcdicCp280,
  FileEbcdicCp284,
  FileEbcdicCp285,
  FileEbcdicCp297,
  FileEbcdicCp500,
  FileEbcdicCp875,
  FileEbcdicCp1025,
  FileEbcdicCp1047,
  FileEbcdicCp1140,
  FileEbcdicCp1141,
  FileEbcdicCp1142,
  FileEbcdicCp1143,
  FileEbcdicCp1144,
  FileEbcdicCp1145,
  FileEbcdicCp1146,
  FileEbcdicCp1147,
  FileEbcdicCp1148,
  FileEbcdicCp1149,
  FileEbcdicCp1153,
  FileEbcdicCp1154,
  FileEbcdicCp1155,
  FileEbcdicCp1156,
  FileEbcdicCp1157,
  FileEbcdicCp1158,
  FileUnicode,
  FileUnicodeBom,
  FileUnicodeBe,
  FileUnicodeLe,
  FileUnicode32Be,
  FileUnicode32Le,
  FileUnicodeUtf7,
  FileUnicodeUtf8,
  FileUnicodeUtf16Be,
  FileUnicodeUtf16Le,
  FileUnicodeUtf32Be,
  FileUnicodeUtf32Le
} from 'lucide-react-native';
import { useRouter } from 'expo-router';
import CFOCommandCenter from '@/components/ai-agent/dashboard/banking-finance/CFOCommandCenter';
import AIFinancialAgents from '@/components/ai-agent/dashboard/banking-finance/AIFinancialAgents';
import RealTimeTrading from '@/components/ai-agent/dashboard/banking-finance/RealTimeTrading';
import PortfolioManagement from '@/components/ai-agent/dashboard/banking-finance/PortfolioManagement';
import RiskCompliance from '@/components/ai-agent/dashboard/banking-finance/RiskCompliance';
import CreditIntelligence from '@/components/ai-agent/dashboard/banking-finance/CreditIntelligence';
import FraudDetection from '@/components/ai-agent/dashboard/banking-finance/FraudDetection';
import TreasuryLiquidity from '@/components/ai-agent/dashboard/banking-finance/TreasuryLiquidity';
import MarketIntelligenceCenter from '@/components/ai-agent/dashboard/banking-finance/MarketIntelligenceCenter';
import PaymentSettlement from '@/components/ai-agent/dashboard/banking-finance/PaymentSettlement';
import AIFinanceInsights from '@/components/ai-agent/dashboard/banking-finance/AIFinanceInsights';
import FinancialOperationsFeed from '@/components/ai-agent/dashboard/banking-finance/FinancialOperationsFeed';
import SystemHealthFintechInfrastructure from '@/components/ai-agent/dashboard/banking-finance/SystemHealthFintechInfrastructure';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

// Types
interface FinancialKPI {
  id: string;
  title: string;
  value: string;
  change: string;
  trend: 'up' | 'down' | 'stable';
  color: string;
  subtitle: string;
  icon: any;
}

interface FinancialAgent {
  id: string;
  name: string;
  specialty: string;
  avatar: string;
  status: 'active' | 'monitoring' | 'paused' | 'error';
  confidenceScore: number;
  financialImpact: string;
  metrics: {
    tradesExecuted?: string;
    winRate?: string;
    pnlImpact?: string;
    exposureMonitored?: string;
    riskAlerts?: string;
    accuracy?: string;
    transactionsMonitored?: string;
    fraudPrevented?: string;
    marketContribution?: string;
  };
  riskLevel: 'low' | 'medium' | 'high';
  activeInsights: number;
  trend: 'up' | 'down' | 'stable';
}

const BankingFinanceCommandCenter = () => {
  const router = useRouter();
  const theme = useTheme();
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [activeTab, setActiveTab] = useState('dashboard');

  // Navigation Items
  const navigationItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'agents', label: 'AI Trading Agents', icon: Bot },
    { id: 'portfolio', label: 'Portfolio Management', icon: BarChart3 },
    { id: 'risk', label: 'Risk & Compliance', icon: Shield },
    { id: 'credit', label: 'Credit Intelligence', icon: Scale },
    { id: 'fraud', label: 'Fraud Detection', icon: Fingerprint },
    { id: 'treasury', label: 'Treasury Operations', icon: Landmark },
    { id: 'liquidity', label: 'Liquidity Management', icon: DollarSign },
    { id: 'market', label: 'Market Intelligence', icon: Globe },
    { id: 'payments', label: 'Payments & Settlements', icon: CreditCard },
    { id: 'analytics', label: 'Analytics', icon: LineChart },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  // Financial KPIs - Bloomberg Terminal Style
  const financialKPIs: FinancialKPI[] = [
    { id: '1', title: 'Total AUM', value: '$48.2B', change: '+12.4%', trend: 'up', color: '#10B981', subtitle: 'Assets Under Management', icon: DollarSign },
    { id: '2', title: 'Daily PnL', value: '+$182M', change: '+8.2%', trend: 'up', color: '#10B981', subtitle: 'Net Profit/Loss', icon: TrendingUp },
    { id: '3', title: 'Portfolio Value', value: '$48.2B', change: '+2.1%', trend: 'up', color: '#06B6D4', subtitle: 'Total portfolio', icon: BarChart3 },
    { id: '4', title: 'Liquidity Ratio', value: '14.2%', change: '+0.8%', trend: 'up', color: '#8B5CF6', subtitle: 'Cash ratio', icon: Activity },
    { id: '5', title: 'Credit Exposure', value: '$12.4B', change: '-1.2%', trend: 'down', color: '#F59E0B', subtitle: 'Total exposure', icon: Shield },
    { id: '6', title: 'Sharpe Ratio', value: '2.84', change: '+0.12', trend: 'up', color: '#10B981', subtitle: 'Risk-adjusted return', icon: Target },
    { id: '7', title: 'Default Probability', value: '0.42%', change: '-0.08%', trend: 'down', color: '#10B981', subtitle: 'Portfolio risk', icon: AlertTriangle },
    { id: '8', title: 'Fraud Prevented', value: '$620M', change: '+18.4%', trend: 'up', color: '#10B981', subtitle: 'YTD prevented', icon: Shield },
    { id: '9', title: 'VIX Index', value: '18.42', change: '+2.1%', trend: 'up', color: '#F59E0B', subtitle: 'Market volatility', icon: Activity },
    { id: '10', title: 'AI Trading Accuracy', value: '94.2%', change: '+1.8%', trend: 'up', color: '#06B6D4', subtitle: 'Model accuracy', icon: Brain },
  ];

  // AI Financial Agents
  const financialAgents: FinancialAgent[] = [
    {
      id: '1',
      name: 'Agent Alpha',
      specialty: 'Trading Intelligence Agent',
      avatar: '📈',
      status: 'active',
      confidenceScore: 94,
      financialImpact: '+$4.2B',
      metrics: {
        tradesExecuted: '18.4M',
        winRate: '72%',
        pnlImpact: '+$4.2B',
        marketContribution: '+$2.8B',
      },
      riskLevel: 'medium',
      activeInsights: 156,
      trend: 'up',
    },
    {
      id: '2',
      name: 'Agent Sigma',
      specialty: 'Risk Management Agent',
      avatar: '🛡️',
      status: 'active',
      confidenceScore: 96,
      financialImpact: '$84B',
      metrics: {
        exposureMonitored: '$84B',
        riskAlerts: '12,480',
        accuracy: '96%',
      },
      riskLevel: 'low',
      activeInsights: 234,
      trend: 'stable',
    },
    {
      id: '3',
      name: 'Agent Ledger',
      specialty: 'Fraud Detection Agent',
      avatar: '🔍',
      status: 'active',
      confidenceScore: 98,
      financialImpact: '$620M',
      metrics: {
        transactionsMonitored: '2.8B',
        fraudPrevented: '$620M',
        accuracy: '98%',
      },
      riskLevel: 'low',
      activeInsights: 89,
      trend: 'up',
    },
    {
      id: '4',
      name: 'Agent Vault',
      specialty: 'Treasury Management Agent',
      avatar: '🏦',
      status: 'active',
      confidenceScore: 92,
      financialImpact: '$6.8B',
      metrics: {
        marketContribution: '$6.8B',
        accuracy: '94%',
      },
      riskLevel: 'low',
      activeInsights: 67,
      trend: 'stable',
    },
  ];

  const onRefresh = () => {
    setRefreshing(true);
    setTimeout(() => setRefreshing(false), 2000);
  };

  // Component configurations
  const cfoCommandCenterConfig = {
    totalPortfolioValue: '$48.2B',
    dailyPnL: '+$182M',
    activePositions: '128,420',
    riskExposure: 'Medium (Amber Zone)',
    liquidityAvailable: '$6.8B',
    portfolioHealth: 87,
    marketExposureBreakdown: [
      { sector: 'Equities', allocation: 45, value: '$21.7B' },
      { sector: 'Fixed Income', allocation: 25, value: '$12.1B' },
      { sector: 'Derivatives', allocation: 15, value: '$7.2B' },
      { sector: 'FX', allocation: 10, value: '$4.8B' },
      { sector: 'Commodities', allocation: 5, value: '$2.4B' },
    ],
  };

  const aiFinancialAgentsConfig = {
    agents: [
      {
        id: '1',
        name: 'Agent Alpha',
        role: 'Trading Intelligence Agent',
        confidenceScore: 94,
        riskLevel: 'medium',
        tradesExecuted: '18.4M',
        winRate: '72%',
        pnlImpact: '+$4.2B',
        marketContribution: '+$2.8B',
      },
      {
        id: '2',
        name: 'Agent Sigma',
        role: 'Risk Management Agent',
        confidenceScore: 96,
        riskLevel: 'low',
        exposureMonitored: '$84B',
        riskAlerts: '12,480',
        accuracy: '96%',
      },
      {
        id: '3',
        name: 'Agent Ledger',
        role: 'Fraud Detection Agent',
        confidenceScore: 98,
        riskLevel: 'low',
        transactionsMonitored: '2.8B',
        fraudPrevented: '$620M',
        accuracy: '98%',
      },
      {
        id: '4',
        name: 'Agent Vault',
        role: 'Treasury Management Agent',
        confidenceScore: 92,
        riskLevel: 'low',
        marketContribution: '$6.8B',
        accuracy: '94%',
      },
    ],
  };

  const realTimeTradingConfig = {
    markets: [
      { id: '1', name: 'Equity Trading', volume: '$2.4B', change: '+2.4%', trend: 'up', status: 'active' },
      { id: '2', name: 'Forex Markets', volume: '$1.8B', change: '+1.2%', trend: 'up', status: 'active' },
      { id: '3', name: 'Crypto Markets', volume: '$890M', change: '-3.2%', trend: 'down', status: 'active' },
      { id: '4', name: 'Derivatives', volume: '$1.2B', change: '+0.8%', trend: 'up', status: 'active' },
      { id: '5', name: 'Bonds & Fixed Income', volume: '$650M', change: '+0.4%', trend: 'up', status: 'monitoring' },
    ],
    workflow: [
      { step: 'Market Signal Detected', status: 'completed', duration: '12ms' },
      { step: 'AI Analysis', status: 'completed', duration: '45ms' },
      { step: 'Strategy Selection', status: 'completed', duration: '28ms' },
      { step: 'Trade Execution', status: 'active', duration: 'in progress' },
      { step: 'Risk Validation', status: 'pending', duration: 'pending' },
      { step: 'Portfolio Update', status: 'pending', duration: 'pending' },
    ],
    heatmapData: [
      { region: 'North America', intensity: 85, volume: '$4.2B' },
      { region: 'Europe', intensity: 72, volume: '$3.1B' },
      { region: 'Asia Pacific', intensity: 68, volume: '$2.8B' },
      { region: 'Latin America', intensity: 45, volume: '$890M' },
      { region: 'Middle East', intensity: 38, volume: '$420M' },
      { region: 'Africa', intensity: 28, volume: '$180M' },
    ],
  };

  const portfolioManagementConfig = {
    assetAllocation: [
      { asset: 'US Equities', allocation: 25, value: '$12.1B', performance: '+3.2%' },
      { asset: 'Intl Equities', allocation: 20, value: '$9.6B', performance: '+2.8%' },
      { asset: 'Government Bonds', allocation: 18, value: '$8.7B', performance: '+1.4%' },
      { asset: 'Corporate Bonds', allocation: 12, value: '$5.8B', performance: '+2.1%' },
      { asset: 'Real Estate', allocation: 10, value: '$4.8B', performance: '+1.8%' },
      { asset: 'Commodities', allocation: 8, value: '$3.9B', performance: '+4.2%' },
      { asset: 'Cash & Equivalents', allocation: 7, value: '$3.4B', performance: '+0.8%' },
    ],
    sectorExposure: [
      { sector: 'Technology', exposure: 22, risk: 'medium' },
      { sector: 'Healthcare', exposure: 15, risk: 'low' },
      { sector: 'Financials', exposure: 18, risk: 'medium' },
      { sector: 'Consumer', exposure: 12, risk: 'low' },
      { sector: 'Industrial', exposure: 10, risk: 'medium' },
      { sector: 'Energy', exposure: 8, risk: 'high' },
      { sector: 'Utilities', exposure: 6, risk: 'low' },
      { sector: 'Materials', exposure: 5, risk: 'medium' },
      { sector: 'Telecom', exposure: 4, risk: 'low' },
    ],
    rebalancingSuggestions: [
      { id: '1', asset: 'Technology', reason: 'Overexposed by 4%', currentAllocation: 22, targetAllocation: 18 },
      { id: '2', asset: 'Energy', reason: 'High volatility risk', currentAllocation: 8, targetAllocation: 5 },
      { id: '3', asset: 'Cash', reason: 'Liquidity buffer low', currentAllocation: 7, targetAllocation: 10 },
    ],
  };

  const riskComplianceConfig = {
    riskCategories: [
      { category: 'Credit Risk', score: 72, max: 100, trend: 'down', alerts: 3 },
      { category: 'Market Risk', score: 68, max: 100, trend: 'stable', alerts: 1 },
      { category: 'Operational Risk', score: 45, max: 100, trend: 'down', alerts: 0 },
      { category: 'Liquidity Risk', score: 58, max: 100, trend: 'up', alerts: 2 },
      { category: 'Regulatory Risk', score: 35, max: 100, trend: 'stable', alerts: 0 },
    ],
    stressTestScenarios: [
      { scenario: 'Market Crash -30%', impact: '-$8.4B', probability: 15, mitigation: 'Hedging' },
      { scenario: 'Interest Rate Spike +200bps', impact: '-$3.2B', probability: 25, mitigation: 'Duration management' },
      { scenario: 'Liquidity Crisis', impact: '-$2.1B', probability: 10, mitigation: 'Cash reserves' },
      { scenario: 'Credit Event', impact: '-$1.8B', probability: 20, mitigation: 'Diversification' },
    ],
    varMetrics: {
      var95: '$1.2B',
      var99: '$2.4B',
      timeHorizon: '1 day',
    },
  };

  const creditIntelligenceConfig = {
    loanApplications: {
      pending: 842,
      approved: 2156,
      rejected: 458,
    },
    creditScores: {
      average: 724,
      distribution: [
        { range: '800-850', count: 289 },
        { range: '740-799', count: 856 },
        { range: '670-739', count: 1245 },
        { range: '580-669', count: 782 },
        { range: '300-579', count: 284 },
      ],
    },
    defaultRisk: {
      probability: 0.42,
      highRiskLoans: 156,
      totalExposure: '$2.8B',
    },
    exposureLimits: [
      { category: 'Corporate', utilization: 78, current: '$4.2B', limit: '$5.4B' },
      { category: 'Retail', utilization: 65, current: '$1.8B', limit: '$2.8B' },
      { category: 'SME', utilization: 82, current: '$890M', limit: '$1.1B' },
      { category: 'Mortgage', utilization: 71, current: '$2.1B', limit: '$3.0B' },
    ],
  };

  const fraudDetectionConfig = {
    suspiciousTransactions: 142,
    amlFlags: 38,
    identityVerificationRate: 94.2,
    monitoringStats: {
      totalTransactions: 2845678,
      flaggedTransactions: 142,
      blockedTransactions: 89,
      falsePositives: 23,
    },
    fraudNetwork: [
      { source: 'Account A', target: 'Account B', amount: '$1.2M', risk: 'high' },
      { source: 'Account C', target: 'Account D', amount: '$890K', risk: 'medium' },
      { source: 'Account E', target: 'Account F', amount: '$450K', risk: 'high' },
    ],
  };

  const treasuryLiquidityConfig = {
    cashFlow: {
      inflow: '$2.4B',
      outflow: '$1.8B',
      netFlow: '+$600M',
    },
    liquidityPosition: {
      available: '$6.8B',
      required: '$4.2B',
      surplus: '$2.6B',
    },
    capitalReserves: '$8.4B',
    fundingRequirements: '$1.2B',
    interestRateExposure: '+$420M',
  };

  const marketIntelligenceConfig = {
    globalIndices: [
      { name: 'S&P 500', value: 4521.42, change: '+1.2%' },
      { name: 'NASDAQ', value: 14234.56, change: '+2.1%' },
      { name: 'DOW JONES', value: 34567.89, change: '+0.8%' },
      { name: 'FTSE 100', value: 7456.32, change: '-0.4%' },
      { name: 'NIKKEI 225', value: 32890.12, change: '+1.5%' },
      { name: 'SHANGHAI', value: 3123.45, change: '-0.8%' },
    ],
    macroIndicators: [
      { indicator: 'GDP Growth', value: '2.4%', trend: 'up' },
      { indicator: 'Inflation Rate', value: '3.2%', trend: 'down' },
      { indicator: 'Unemployment', value: '4.2%', trend: 'down' },
      { indicator: 'Interest Rates', value: '5.25%', trend: 'stable' },
    ],
    newsSentiment: {
      positive: 68,
      neutral: 24,
      negative: 8,
    },
    geopoliticalEvents: [
      { event: 'Trade Agreement', impact: 'Positive', probability: 75 },
      { event: 'Election', impact: 'Uncertain', probability: 100 },
      { event: 'Central Bank Policy', impact: 'Mixed', probability: 85 },
    ],
  };

  const paymentSettlementConfig = {
    transactionsProcessed: 2845678,
    settlementTimes: {
      average: '2.4 hours',
      fastest: '15 minutes',
      slowest: '24 hours',
    },
    crossBorderPayments: 45678,
    swiftMessages: 12890,
    paymentFailures: 234,
    successRate: 99.92,
  };

  const aiFinanceInsightsConfig = {
    insights: [
      { priority: 'high', message: 'Tech sector overexposure detected in portfolio', category: 'Risk' },
      { priority: 'high', message: 'Interest rate hike likely impacting bond positions', category: 'Market' },
      { priority: 'medium', message: 'Unusual trading activity detected in derivatives market', category: 'Security' },
      { priority: 'medium', message: 'Liquidity buffer below optimal threshold', category: 'Treasury' },
      { priority: 'low', message: 'Arbitrage opportunity identified in FX markets', category: 'Trading' },
    ],
  };

  const financialOperationsFeedConfig = {
    operations: [
      { type: 'Trade Executed', description: 'AAPL Buy 10,000 @ $182.50', time: '2 min ago' },
      { type: 'Position Opened', description: 'GOOGL Call Options $1.2M', time: '5 min ago' },
      { type: 'Risk Alert', description: 'Portfolio beta exceeding threshold', time: '8 min ago' },
      { type: 'Fraud Detected', description: 'Suspicious transaction blocked $45K', time: '12 min ago' },
      { type: 'Portfolio Rebalanced', description: 'Technology sector reduced by 4%', time: '15 min ago' },
      { type: 'Market Signal', description: 'Golden cross detected on SPY', time: '18 min ago' },
      { type: 'Settlement Completed', description: 'SWIFT MT300 confirmed', time: '22 min ago' },
    ],
  };

  const systemHealthConfig = {
    tradingApis: { status: 'operational', latency: '12ms', uptime: '99.99%' },
    bankingCoreSystems: { status: 'operational', latency: '24ms', uptime: '99.98%' },
    paymentGateways: { status: 'operational', latency: '18ms', uptime: '99.97%' },
    marketDataFeeds: { status: 'operational', latency: '8ms', uptime: '99.99%' },
    aiTradingEngines: { status: 'operational', latency: '45ms', uptime: '99.95%' },
  };

  // Render Functions
  const renderKPICard = (kpi: FinancialKPI) => {
    const Icon = kpi.icon;
    return (
      <View key={kpi.id} style={[styles.kpiCard, { backgroundColor: 'rgba(16, 185, 129, 0.08)', borderColor: kpi.color + '40' }]}>
        <View style={styles.kpiHeader}>
          <View style={[styles.kpiIconContainer, { backgroundColor: kpi.color + '20' }]}>
            <Icon size={20} color={kpi.color} />
          </View>
          <View style={styles.kpiTrend}>
            {kpi.trend === 'up' && <ArrowUpRight size={16} color="#10B981" />}
            {kpi.trend === 'down' && <ArrowDownRight size={16} color="#EF4444" />}
            {kpi.trend === 'stable' && <Activity size={16} color="#6B7280" />}
          </View>
        </View>
        <Text style={[styles.kpiTitle, { color: theme.colors.textSecondary }]}>{kpi.title}</Text>
        <Text style={[styles.kpiValue, { color: kpi.color }]}>{kpi.value}</Text>
        <View style={styles.kpiFooter}>
          <Text style={[styles.kpiChange, { color: kpi.trend === 'up' ? '#10B981' : kpi.trend === 'down' ? '#EF4444' : '#6B7280' }]}>
            {kpi.change}
          </Text>
          <Text style={[styles.kpiSubtitle, { color: theme.colors.textSecondary }]}>{kpi.subtitle}</Text>
        </View>
      </View>
    );
  };

  const renderAgentCard = (agent: FinancialAgent) => {
    const getRiskColor = (risk: 'low' | 'medium' | 'high') => {
      switch (risk) {
        case 'low': return '#10B981';
        case 'medium': return '#F59E0B';
        case 'high': return '#EF4444';
      }
    };

    const getStatusColor = (status: string) => {
      switch (status) {
        case 'active': return '#10B981';
        case 'monitoring': return '#3B82F6';
        case 'paused': return '#F59E0B';
        case 'error': return '#EF4444';
        default: return '#6B7280';
      }
    };

    return (
      <View key={agent.id} style={[styles.agentCard, { backgroundColor: 'rgba(16, 185, 129, 0.05)', borderColor: getRiskColor(agent.riskLevel) + '40' }]}>
        <View style={styles.agentHeader}>
          <View style={[styles.agentAvatar, { backgroundColor: getRiskColor(agent.riskLevel) + '20' }]}>
            <Text style={styles.agentAvatarText}>{agent.avatar}</Text>
          </View>
          <View style={styles.agentInfo}>
            <Text style={[styles.agentName, { color: theme.colors.text }]}>{agent.name}</Text>
            <Text style={[styles.agentSpecialty, { color: theme.colors.textSecondary }]}>{agent.specialty}</Text>
          </View>
          <View style={[styles.statusBadge, { backgroundColor: getStatusColor(agent.status) }]}>
            <Text style={styles.statusText}>{agent.status}</Text>
          </View>
        </View>
        
        <View style={styles.agentMetrics}>
          <View style={styles.metricRow}>
            <Text style={[styles.metricLabel, { color: theme.colors.textSecondary }]}>Confidence</Text>
            <Text style={[styles.metricValue, { color: '#10B981' }]}>{agent.confidenceScore}%</Text>
          </View>
          <View style={styles.metricRow}>
            <Text style={[styles.metricLabel, { color: theme.colors.textSecondary }]}>Impact</Text>
            <Text style={[styles.metricValue, { color: agent.financialImpact.startsWith('+') ? '#10B981' : theme.colors.text }]}>
              {agent.financialImpact}
            </Text>
          </View>
          <View style={styles.metricRow}>
            <Text style={[styles.metricLabel, { color: theme.colors.textSecondary }]}>Insights</Text>
            <Text style={[styles.metricValue, { color: theme.colors.text }]}>{agent.activeInsights}</Text>
          </View>
        </View>

        {agent.metrics.tradesExecuted && (
          <View style={styles.agentDetail}>
            <Text style={[styles.detailLabel, { color: theme.colors.textSecondary }]}>Trades: </Text>
            <Text style={[styles.detailValue, { color: theme.colors.text }]}>{agent.metrics.tradesExecuted}</Text>
            <Text style={[styles.detailLabel, { color: theme.colors.textSecondary }]}> | Win Rate: </Text>
            <Text style={[styles.detailValue, { color: '#10B981' }]}>{agent.metrics.winRate}</Text>
          </View>
        )}
        {agent.metrics.exposureMonitored && (
          <View style={styles.agentDetail}>
            <Text style={[styles.detailLabel, { color: theme.colors.textSecondary }]}>Exposure: </Text>
            <Text style={[styles.detailValue, { color: theme.colors.text }]}>{agent.metrics.exposureMonitored}</Text>
            <Text style={[styles.detailLabel, { color: theme.colors.textSecondary }]}> | Alerts: </Text>
            <Text style={[styles.detailValue, { color: '#F59E0B' }]}>{agent.metrics.riskAlerts}</Text>
          </View>
        )}
        {agent.metrics.transactionsMonitored && (
          <View style={styles.agentDetail}>
            <Text style={[styles.detailLabel, { color: theme.colors.textSecondary }]}>Transactions: </Text>
            <Text style={[styles.detailValue, { color: theme.colors.text }]}>{agent.metrics.transactionsMonitored}</Text>
            <Text style={[styles.detailLabel, { color: theme.colors.textSecondary }]}> | Fraud Prevented: </Text>
            <Text style={[styles.detailValue, { color: '#10B981' }]}>{agent.metrics.fraudPrevented}</Text>
          </View>
        )}
      </View>
    );
  };

  return (
    <View style={[styles.container, { backgroundColor: '#05070A' }]}>
      {/* Header */}
      <View style={[styles.header, { backgroundColor: 'rgba(5, 7, 10, 0.95)', borderBottomColor: '#10B981' + '30' }]}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <ChevronLeft size={24} color="#10B981" />
        </TouchableOpacity>
        <View style={styles.headerContent}>
          <View style={styles.headerTitleRow}>
            <Sparkles size={24} color="#10B981" />
            <Text style={[styles.headerTitle, { color: '#10B981' }]}>AI Banking & Finance Command Center</Text>
          </View>
          <Text style={[styles.headerSubtitle, { color: theme.colors.textSecondary }]}>
            Global Financial Markets Intelligence & Banking Command Center
          </Text>
        </View>
        <View style={styles.headerActions}>
          <TouchableOpacity style={[styles.headerButton, { backgroundColor: '#10B981' + '20' }]}>
            <Bell size={20} color="#10B981" />
          </TouchableOpacity>
          <TouchableOpacity style={[styles.headerButton, { backgroundColor: '#10B981' + '20' }]}>
            <Search size={20} color="#10B981" />
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView 
        style={styles.scrollView}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor="#10B981" />
        }
        showsVerticalScrollIndicator={false}
      >
        {/* Executive KPI Bar */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: '#10B981' }]}>Financial KPIs</Text>
          <View style={styles.kpiGrid}>
            {financialKPIs.map(renderKPICard)}
          </View>
        </View>

        {/* AI Financial Agents */}
        <View style={styles.section}>
          <AIFinancialAgents config={aiFinancialAgentsConfig} />
        </View>

        {/* CFO Command Center */}
        <View style={[styles.section, styles.centerSection]}>
          <CFOCommandCenter config={cfoCommandCenterConfig} />
        </View>

        {/* Real-Time Trading Control Center */}
        <View style={styles.section}>
          <RealTimeTrading config={realTimeTradingConfig} />
        </View>

        {/* Portfolio Management Hub */}
        <View style={styles.section}>
          <PortfolioManagement config={portfolioManagementConfig} />
        </View>

        {/* Risk & Compliance */}
        <View style={styles.section}>
          <RiskCompliance config={riskComplianceConfig} />
        </View>

        {/* Credit Intelligence Engine */}
        <View style={styles.section}>
          <CreditIntelligence config={creditIntelligenceConfig} />
        </View>

        {/* Fraud Detection & Transaction Security */}
        <View style={styles.section}>
          <FraudDetection config={fraudDetectionConfig} />
        </View>

        {/* Treasury & Liquidity Management */}
        <View style={styles.section}>
          <TreasuryLiquidity config={treasuryLiquidityConfig} />
        </View>

        {/* Market Intelligence Center */}
        <View style={styles.section}>
          <MarketIntelligenceCenter config={marketIntelligenceConfig} />
        </View>

        {/* Payment & Settlement Network */}
        <View style={styles.section}>
          <PaymentSettlement config={paymentSettlementConfig} />
        </View>

        {/* AI Finance Insights */}
        <View style={styles.section}>
          <AIFinanceInsights config={aiFinanceInsightsConfig} />
        </View>

        {/* Real-Time Financial Operations Feed */}
        <View style={styles.section}>
          <FinancialOperationsFeed config={financialOperationsFeedConfig} />
        </View>

        {/* System Health & Fintech Infrastructure */}
        <View style={styles.section}>
          <SystemHealthFintechInfrastructure config={systemHealthConfig} />
        </View>

        <View style={styles.spacer} />
      </ScrollView>
    </View>
  );
};

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
    marginRight: 12,
  },
  headerContent: {
    flex: 1,
  },
  headerTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '700',
    marginLeft: 8,
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
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  scrollView: {
    flex: 1,
  },
  section: {
    padding: 16,
  },
  centerSection: {
    backgroundColor: 'rgba(16, 185, 129, 0.02)',
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 12,
  },
  viewAllButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    borderWidth: 1,
  },
  viewAllText: {
    fontSize: 12,
    fontWeight: '600',
    marginRight: 4,
  },
  kpiGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginHorizontal: -4,
  },
  kpiCard: {
    width: (SCREEN_WIDTH - 32) / 2 - 8,
    margin: 4,
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
  },
  kpiHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  kpiIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  kpiTrend: {
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(16, 185, 129, 0.1)',
  },
  kpiTitle: {
    fontSize: 11,
    marginBottom: 4,
  },
  kpiValue: {
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 8,
  },
  kpiFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  kpiChange: {
    fontSize: 12,
    fontWeight: '600',
  },
  kpiSubtitle: {
    fontSize: 10,
  },
  agentsScroll: {
    marginHorizontal: -16,
    paddingHorizontal: 16,
  },
  agentCard: {
    width: 280,
    marginRight: 12,
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
  },
  agentHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  agentAvatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  agentAvatarText: {
    fontSize: 24,
  },
  agentInfo: {
    flex: 1,
  },
  agentName: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 2,
  },
  agentSpecialty: {
    fontSize: 11,
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  statusText: {
    color: '#FFFFFF',
    fontSize: 10,
    fontWeight: '600',
  },
  agentMetrics: {
    flexDirection: 'row',
    marginBottom: 12,
  },
  metricRow: {
    flex: 1,
    alignItems: 'center',
  },
  metricLabel: {
    fontSize: 10,
    marginBottom: 2,
  },
  metricValue: {
    fontSize: 12,
    fontWeight: '600',
  },
  agentDetail: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
  },
  detailLabel: {
    fontSize: 10,
  },
  detailValue: {
    fontSize: 10,
    fontWeight: '600',
  },
  commandCenterCard: {
    padding: 20,
    borderRadius: 16,
    borderWidth: 1,
  },
  commandCenterHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  commandCenterTitle: {
    marginLeft: 16,
  },
  commandCenterValue: {
    fontSize: 32,
    fontWeight: '700',
  },
  commandCenterLabel: {
    fontSize: 12,
  },
  commandCenterMetrics: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  commandMetric: {
    alignItems: 'center',
    flex: 1,
  },
  commandMetricLabel: {
    fontSize: 10,
    marginTop: 4,
    marginBottom: 2,
  },
  commandMetricValue: {
    fontSize: 14,
    fontWeight: '600',
  },
  portfolioHealth: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  healthLabel: {
    fontSize: 12,
    marginRight: 12,
  },
  healthBar: {
    flex: 1,
    height: 8,
    backgroundColor: 'rgba(16, 185, 129, 0.2)',
    borderRadius: 4,
    overflow: 'hidden',
    marginRight: 12,
  },
  healthFill: {
    height: '100%',
    borderRadius: 4,
  },
  healthValue: {
    fontSize: 16,
    fontWeight: '700',
  },
  tradingCard: {
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
  },
  marketGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 16,
  },
  marketItem: {
    width: (SCREEN_WIDTH - 64) / 2,
    padding: 12,
    borderRadius: 8,
    marginRight: 8,
    marginBottom: 8,
  },
  marketName: {
    fontSize: 11,
    marginBottom: 4,
  },
  marketValue: {
    fontSize: 16,
    fontWeight: '700',
    marginBottom: 4,
  },
  marketChange: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  changeText: {
    fontSize: 12,
    fontWeight: '600',
    marginLeft: 4,
  },
  tradingWorkflow: {
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: 'rgba(6, 182, 212, 0.2)',
  },
  workflowTitle: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 16,
  },
  workflowStep: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  stepDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    marginRight: 12,
  },
  stepText: {
    fontSize: 12,
  },
  stepLine: {
    position: 'absolute',
    left: 5,
    top: 12,
    width: 2,
    height: 24,
  },
  riskCard: {
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
  },
  riskItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  riskLabel: {
    width: 100,
    fontSize: 12,
  },
  riskBar: {
    flex: 1,
    height: 8,
    backgroundColor: 'rgba(245, 158, 11, 0.2)',
    borderRadius: 4,
    overflow: 'hidden',
    marginHorizontal: 12,
  },
  riskFill: {
    height: '100%',
    borderRadius: 4,
  },
  riskScore: {
    width: 30,
    fontSize: 12,
    fontWeight: '600',
    textAlign: 'right',
  },
  insightCard: {
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    marginBottom: 12,
  },
  insightHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  impactBadge: {
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 4,
    marginLeft: 8,
  },
  impactText: {
    color: '#FFFFFF',
    fontSize: 10,
    fontWeight: '700',
  },
  insightText: {
    fontSize: 13,
    lineHeight: 18,
    marginBottom: 12,
  },
  insightAction: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  actionText: {
    fontSize: 12,
    fontWeight: '600',
    marginLeft: 6,
  },
  operationCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    borderRadius: 8,
    marginBottom: 8,
  },
  operationDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: 12,
  },
  operationContent: {
    flex: 1,
  },
  operationEvent: {
    fontSize: 13,
    fontWeight: '500',
    marginBottom: 2,
  },
  operationTime: {
    fontSize: 11,
  },
  spacer: {
    height: 32,
  },
});

export default BankingFinanceCommandCenter;