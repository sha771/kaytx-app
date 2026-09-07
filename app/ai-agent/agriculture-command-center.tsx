/**
 * =============================================================================
 * AGRICULTURE AI AGENTS COMMAND CENTER
 * =============================================================================
 *
 * A futuristic enterprise-grade Agriculture AI Operating System that manages
 * autonomous AI agents responsible for crop intelligence, livestock management,
 * precision farming, irrigation systems, machinery automation, supply chain
 * intelligence, weather forecasting, sustainability analytics, and global
 * farming ecosystem operations in real time.
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
  Sprout,
  Tractor,
  CloudRain,
  Leaf,
  ShieldAlert,
  TrendingUp,
  DollarSign,
  Activity,
  Brain,
  Zap,
  Globe,
  Wheat,
  Droplets,
  Mountain,
  Truck,
  Sun,
  Wind,
  Thermometer,
  Sparkles,
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
  Crown,
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
  Package,
  Navigation,
  Satellite,
  Bug,
  Gauge,
  Cloud,
  Trees,
  Beef,
  Warehouse,
  Ship,
  Plane,
  Train,
  Battery,
  CloudLightning,
  Umbrella,
  Compass,
  MapPin,
  Route,
  Radar,
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
  Users,
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
} from 'lucide-react-native';
import { BlurView } from 'expo-blur';
import Svg, { Path, Circle, Defs, LinearGradient, Stop, Line, Rect, Ellipse } from 'react-native-svg';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

// Theme Colors
const THEME = {
  background: '#03050A',
  card: '#0A0F1E',
  cardLight: '#121829',
  emeraldGreen: '#10B981',
  neonCyan: '#00F0FF',
  earthBrown: '#8B5A2B',
  skyBlue: '#3B82F6',
  amber: '#F59E0B',
  red: '#EF4444',
  purple: '#8B5CF6',
  text: '#E2E8F0',
  textMuted: '#94A3B8',
  border: '#1E293B',
};

// Executive KPI Data
const EXECUTIVE_KPIS = {
  farm: {
    totalFarms: { value: '847', change: 12.3, trend: 'up' },
    activeFields: { value: '2,341', change: 8.7, trend: 'up' },
    totalAcres: { value: '1.2M', change: 15.2, trend: 'up' },
    activeCrops: { value: '23', change: 5.4, trend: 'up' },
    livestockCount: { value: '89K', change: 18.9, trend: 'up' },
  },
  production: {
    yieldForecast: { value: '4.8M tons', change: 22.5, trend: 'up' },
    harvestProgress: { value: '67%', change: 12.8, trend: 'up' },
    cropHealth: { value: '92%', change: 3.2, trend: 'up' },
    irrigationEfficiency: { value: '94%', change: 8.5, trend: 'up' },
    fertilizerUsage: { value: '89%', change: -5.2, trend: 'down' },
  },
  financial: {
    revenue: { value: '$2.4B', change: 28.7, trend: 'up' },
    operatingCost: { value: '$1.8B', change: -12.3, trend: 'down' },
    profitMargin: { value: '25%', change: 8.4, trend: 'up' },
    equipmentUtilization: { value: '87%', change: 6.7, trend: 'up' },
    roi: { value: '34%', change: 15.2, trend: 'up' },
  },
  sustainability: {
    waterConsumption: { value: '89%', change: -15.4, trend: 'down' },
    carbonReduction: { value: '45%', change: 28.9, trend: 'up' },
    soilHealth: { value: '91%', change: 7.2, trend: 'up' },
    renewableEnergy: { value: '67%', change: 22.5, trend: 'up' },
    sustainabilityScore: { value: '94', change: 12.8, trend: 'up' },
  },
  ai: {
    activeAgents: { value: '234', change: 45.6, trend: 'up' },
    autonomousDecisions: { value: '12.4K', change: 89.2, trend: 'up' },
    diseasePredictions: { value: '847', change: 67.8, trend: 'up' },
    yieldAccuracy: { value: '96%', change: 8.3, trend: 'up' },
    automationSuccess: { value: '98%', change: 12.5, trend: 'up' },
  },
};

// AI Agriculture Agents
const AI_AGRICULTURE_AGENTS = [
  {
    id: 'harvest',
    name: 'Agent Harvest',
    role: 'Crop Intelligence Agent',
    color: THEME.emeraldGreen,
    icon: Wheat,
    responsibilities: [
      'Crop monitoring',
      'Growth analysis',
      'Yield prediction',
      'Harvest planning',
    ],
    metrics: {
      fieldsMonitored: '2,341',
      cropAccuracy: '96%',
      yieldImprovement: '+22%',
    },
    status: 'active',
    efficiency: 94,
  },
  {
    id: 'rain',
    name: 'Agent Rain',
    role: 'Irrigation Agent',
    color: THEME.skyBlue,
    icon: CloudRain,
    responsibilities: [
      'Water optimization',
      'Irrigation scheduling',
      'Moisture analysis',
      'Water conservation',
    ],
    metrics: {
      waterSaved: '45M gallons',
      irrigationCycles: '12,847',
      efficiencyScore: '94%',
    },
    status: 'active',
    efficiency: 91,
  },
  {
    id: 'soil',
    name: 'Agent Soil',
    role: 'Soil Intelligence Agent',
    color: THEME.earthBrown,
    icon: Mountain,
    responsibilities: [
      'Nutrient analysis',
      'Soil monitoring',
      'Fertility optimization',
      'pH analysis',
    ],
    metrics: {
      soilSamples: '45,892',
      nutrientAccuracy: '97%',
      soilHealthScore: '91',
    },
    status: 'active',
    efficiency: 89,
  },
  {
    id: 'guardian',
    name: 'Agent Guardian',
    role: 'Disease Detection Agent',
    color: THEME.red,
    icon: ShieldAlert,
    responsibilities: [
      'Pest detection',
      'Disease prediction',
      'Crop protection',
      'Satellite image analysis',
    ],
    metrics: {
      diseasesDetected: '847',
      predictionAccuracy: '98%',
      cropLossPrevented: '$12.4M',
    },
    status: 'active',
    efficiency: 97,
  },
  {
    id: 'tractor',
    name: 'Agent Tractor',
    role: 'Machinery Agent',
    color: THEME.amber,
    icon: Tractor,
    responsibilities: [
      'Fleet monitoring',
      'Autonomous tractors',
      'Equipment scheduling',
      'Fuel optimization',
    ],
    metrics: {
      equipmentManaged: '1,247',
      fuelSaved: '89K gallons',
      machineUptime: '99.2%',
    },
    status: 'active',
    efficiency: 92,
  },
  {
    id: 'market',
    name: 'Agent Market',
    role: 'Agricultural Market Agent',
    color: THEME.purple,
    icon: TrendingUp,
    responsibilities: [
      'Commodity pricing',
      'Demand forecasting',
      'Supply planning',
      'Revenue optimization',
    ],
    metrics: {
      priceForecastAccuracy: '94%',
      revenueImpact: '$8.4M',
      contractsManaged: '1,247',
    },
    status: 'active',
    efficiency: 95,
  },
];

// AI Insights
const AI_INSIGHTS = [
  {
    id: 1,
    type: 'warning',
    title: 'Disease Outbreak Prediction',
    message: 'Disease outbreak predicted in Field 17. Immediate action recommended.',
    impact: 'High',
    action: 'Deploy treatment drones and alert field managers',
    timestamp: '2 hours ago',
  },
  {
    id: 2,
    type: 'opportunity',
    title: 'Harvest Optimization',
    message: 'Harvest should begin three days earlier for maximum yield.',
    impact: 'High',
    action: 'Adjust harvest schedule and coordinate equipment',
    timestamp: '4 hours ago',
  },
  {
    id: 3,
    type: 'efficiency',
    title: 'Irrigation Optimization',
    message: 'Irrigation can be reduced by 21% while maintaining crop health.',
    impact: 'Medium',
    action: 'Update irrigation schedules across all fields',
    timestamp: '6 hours ago',
  },
  {
    id: 4,
    type: 'alert',
    title: 'Nutrient Deficiency Detected',
    message: 'Nitrogen deficiency detected in Sector 4 corn fields.',
    impact: 'Medium',
    action: 'Schedule fertilizer application',
    timestamp: '8 hours ago',
  },
  {
    id: 5,
    type: 'prediction',
    title: 'Market Price Forecast',
    message: 'Corn prices expected to rise 9% in next quarter.',
    impact: 'High',
    action: 'Adjust storage and sales strategy',
    timestamp: '12 hours ago',
  },
  {
    id: 6,
    type: 'efficiency',
    title: 'Autonomous Equipment Savings',
    message: 'Autonomous tractors can save 18 operating hours this week.',
    impact: 'Medium',
    action: 'Increase autonomous deployment',
    timestamp: '18 hours ago',
  },
];

// Live Activity Feed
const ACTIVITY_FEED = [
  { id: 1, type: 'drone', message: 'Drone mission completed - Field 23 survey', time: '2 min ago', icon: Satellite },
  { id: 2, type: 'disease', message: 'Disease detected - Early blight in tomato crop', time: '5 min ago', icon: Bug },
  { id: 3, type: 'tractor', message: 'Autonomous tractor started - Harvest operation', time: '8 min ago', icon: Tractor },
  { id: 4, type: 'harvest', message: 'Harvest completed - 450 tons of wheat', time: '12 min ago', icon: Wheat },
  { id: 5, type: 'irrigation', message: 'Irrigation activated - Sector 7 moisture low', time: '15 min ago', icon: Droplets },
  { id: 6, type: 'livestock', message: 'Livestock health alert - Cattle herd 4', time: '20 min ago', icon: Beef },
  { id: 7, type: 'weather', message: 'Weather warning - Storm approaching in 2 hours', time: '25 min ago', icon: CloudLightning },
  { id: 8, type: 'yield', message: 'Yield forecast updated - Corn +12%', time: '30 min ago', icon: BarChart3 },
];

// Crop Intelligence Data
const CROP_INTELLIGENCE = {
  cropGrowth: { corn: 78, wheat: 85, soybeans: 72, rice: 90, tomatoes: 65 },
  plantHealth: { excellent: 67, good: 23, fair: 8, poor: 2 },
  ndviIndex: { average: 0.78, trend: 'up', change: 5.2 },
  growthStage: { vegetative: 34, flowering: 28, fruiting: 22, mature: 16 },
  harvestReadiness: { ready: 12, nearReady: 28, progressing: 45, early: 15 },
};

// Livestock Intelligence Data
const LIVESTOCK_INTELLIGENCE = {
  animalHealth: { excellent: 72, good: 20, fair: 6, needsAttention: 2 },
  feeding: { onSchedule: 89, delayed: 8, skipped: 3 },
  milkProduction: { daily: '45,000L', trend: 'up', change: 8.5 },
  breeding: { pregnant: 234, inHeat: 45, ready: 67 },
  locationTracking: { inPasture: 89, inBarn: 8, moving: 3 },
};

// Precision Farming Data
const PRECISION_FARMING = {
  gpsEquipment: { active: 234, calibrated: 228, needsCalibration: 6 },
  droneMissions: { completed: 1247, inProgress: 23, scheduled: 45 },
  satelliteMonitoring: { coverage: 98, lastUpdate: '2 hours ago', nextUpdate: '4 hours' },
  fieldMapping: { mapped: 847, inProgress: 23, pending: 12 },
  variableRateApplications: { fertilizer: 89, pesticide: 92, seed: 85 },
};

// Irrigation Data
const IRRIGATION_DATA = {
  waterUsage: { today: '450K gallons', week: '3.2M gallons', month: '12.8M gallons' },
  pumpStatus: { active: 89, standby: 8, maintenance: 3 },
  moistureLevels: { optimal: 67, low: 23, critical: 10 },
  reservoirCapacity: { current: 78, trend: 'down', change: -2.3 },
  rainForecast: { probability: 23, amount: '0.5 inches', timing: '3 days' },
};

// Machinery Operations Data
const MACHINERY_DATA = {
  tractors: { total: 234, active: 189, maintenance: 34, idle: 11 },
  harvesters: { total: 67, active: 45, maintenance: 18, idle: 4 },
  fuelUsage: { today: '8,500 gallons', week: '52,000 gallons', efficiency: 94 },
  maintenance: { scheduled: 23, overdue: 8, completed: 156 },
  gpsRoutes: { optimized: 89, manual: 8, planning: 3 },
};

// Supply Chain Data
const SUPPLY_CHAIN_DATA = {
  warehouses: { total: 23, capacity: 78, utilization: 67 },
  grainStorage: { current: '450K tons', capacity: '600K tons', utilization: 75 },
  logistics: { inTransit: 234, atWarehouse: 567, delivered: 1247 },
  deliveries: { onTime: 89, delayed: 8, pending: 3 },
  distribution: { local: 67, regional: 23, international: 10 },
};

// Weather & Environment Data
const WEATHER_DATA = {
  rainfall: { today: '0.2 inches', week: '1.2 inches', month: '3.4 inches' },
  temperature: { current: '72°F', high: '85°F', low: '58°F', average: '71°F' },
  wind: { speed: '12 mph', direction: 'NW', gust: '18 mph' },
  humidity: { current: '65%', average: '62%', trend: 'up' },
  climateForecast: { nextWeek: 'Sunny', nextMonth: 'Mild', season: 'Normal' },
};

// Sustainability Data
const SUSTAINABILITY_DATA = {
  carbonFootprint: { current: '12,450 tons', reduction: '15%', target: '25%' },
  waterConservation: { saved: '45M gallons', efficiency: 94, target: 90 },
  renewableEnergy: { solar: 45, wind: 23, biomass: 12, total: 80 },
  biodiversity: { speciesCount: 234, habitatScore: 87, trend: 'up' },
  esgMetrics: { environmental: 92, social: 88, governance: 95, overall: 92 },
};

// System Health Data
const SYSTEM_HEALTH = {
  iotSensors: { status: 'healthy', active: '12,847', offline: '23', health: 99.8 },
  drones: { status: 'healthy', active: '234', offline: '12', health: 94.9 },
  satellites: { status: 'healthy', active: '8', offline: '0', health: 100 },
  aiModels: { status: 'healthy', active: '45', offline: '0', health: 98.5 },
  gpsDevices: { status: 'healthy', active: '1,247', offline: '45', health: 96.4 },
  farmEquipment: { status: 'healthy', active: '892', offline: '67', health: 92.5 },
  apis: { status: 'healthy', active: '23', offline: '0', health: 99.9 },
};

export default function AgricultureCommandCenter() {
  const router = useRouter();
  const { width } = useWindowDimensions();
  const [selectedKPI, setSelectedKPI] = useState('farm');
  const [activeSection, setActiveSection] = useState('agents');

  const renderKPICard = (label: string, data: any, color: string) => (
    <Animated.View entering={FadeInUp.delay(100).springify()} style={[styles.kpiCard, { backgroundColor: THEME.cardLight, borderColor: color + '30' }]}>
      <Text style={[styles.kpiLabel, { color: THEME.textMuted }]}>{label}</Text>
      <Text style={[styles.kpiValue, { color: THEME.text }]}>{data.value}</Text>
      <View style={styles.kpiTrend}>
        {data.trend === 'up' ? (
          <ArrowUpRight size={16} color={THEME.emeraldGreen} />
        ) : data.trend === 'down' ? (
          <ArrowDownRight size={16} color={THEME.red} />
        ) : (
          <Minus size={16} color={THEME.textMuted} />
        )}
        <Text style={[styles.kpiChange, { color: data.trend === 'up' ? THEME.emeraldGreen : data.trend === 'down' ? THEME.red : THEME.textMuted }]}>
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
      warning: THEME.amber,
      opportunity: THEME.emeraldGreen,
      efficiency: THEME.skyBlue,
      alert: THEME.red,
      prediction: THEME.purple,
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
      <View style={[styles.activityIcon, { backgroundColor: THEME.neonCyan + '20' }]}>
        <activity.icon size={18} color={THEME.neonCyan} />
      </View>
      <View style={styles.activityContent}>
        <Text style={[styles.activityMessage, { color: THEME.text }]}>{activity.message}</Text>
        <Text style={[styles.activityTime, { color: THEME.textMuted }]}>{activity.time}</Text>
      </View>
    </Animated.View>
  );

  const renderSystemHealth = (system: any, key: string) => {
    const IconMap: any = {
      iotSensors: Cpu,
      drones: Satellite,
      satellites: Satellite,
      aiModels: Brain,
      gpsDevices: Navigation,
      farmEquipment: Tractor,
      apis: Server,
    };
    const Icon = IconMap[key] || Server;
    const statusColor = system.status === 'healthy' ? THEME.emeraldGreen : THEME.red;
    
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
              <Text style={[styles.healthStatValue, { color: THEME.red }]}>{system.offline}</Text>
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

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: THEME.background }]}>
      {/* Header */}
      <View style={[styles.header, { borderBottomColor: THEME.border }]}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <ChevronLeft size={24} color={THEME.text} />
        </TouchableOpacity>
        <View style={styles.headerContent}>
          <View style={[styles.headerIcon, { backgroundColor: THEME.emeraldGreen + '20' }]}>
            <Sprout size={28} color={THEME.emeraldGreen} />
          </View>
          <View>
            <Text style={[styles.headerTitle, { color: THEME.text }]}>Agriculture AI Command Center</Text>
            <Text style={[styles.headerSubtitle, { color: THEME.textMuted }]}>Autonomous Farming Operations</Text>
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
                style={[styles.kpiTab, selectedKPI === key && { backgroundColor: THEME.emeraldGreen + '20', borderColor: THEME.emeraldGreen }]}
              >
                <Text style={[styles.kpiTabText, selectedKPI === key ? { color: THEME.emeraldGreen } : { color: THEME.textMuted }]}>
                  {key.charAt(0).toUpperCase() + key.slice(1)}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.kpiScroll}>
            <View style={styles.kpiRow}>
              {Object.entries(EXECUTIVE_KPIS[selectedKPI as keyof typeof EXECUTIVE_KPIS]).map(([key, data]) => (
                renderKPICard(key.replace(/([A-Z])/g, ' $1').trim(), data as any, THEME.emeraldGreen)
              ))}
            </View>
          </ScrollView>
        </View>

        {/* AI Agriculture Agents */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={[styles.sectionTitle, { color: THEME.text }]}>AI Agriculture Agents</Text>
            <Text style={[styles.sectionSubtitle, { color: THEME.textMuted }]}>Autonomous agents managing farming operations</Text>
          </View>
          <View style={styles.agentsGrid}>
            {AI_AGRICULTURE_AGENTS.map(renderAgentCard)}
          </View>
        </View>

        {/* Agriculture Command Center */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={[styles.sectionTitle, { color: THEME.text }]}>Agriculture Command Center</Text>
            <Text style={[styles.sectionSubtitle, { color: THEME.textMuted }]}>Executive overview of farming operations</Text>
          </View>
          <View style={styles.commandGrid}>
            <Animated.View entering={FadeInUp.springify()} style={[styles.commandCard, { backgroundColor: THEME.cardLight }]}>
              <View style={[styles.commandIcon, { backgroundColor: THEME.emeraldGreen + '20' }]}>
                <Factory size={32} color={THEME.emeraldGreen} />
              </View>
              <Text style={[styles.commandValue, { color: THEME.text }]}>847</Text>
              <Text style={[styles.commandLabel, { color: THEME.textMuted }]}>Total Farms</Text>
              <View style={styles.commandTrend}>
                <ArrowUpRight size={16} color={THEME.emeraldGreen} />
                <Text style={[styles.commandChange, { color: THEME.emeraldGreen }]}>+12.3%</Text>
              </View>
            </Animated.View>
            <Animated.View entering={FadeInUp.delay(100).springify()} style={[styles.commandCard, { backgroundColor: THEME.cardLight }]}>
              <View style={[styles.commandIcon, { backgroundColor: THEME.skyBlue + '20' }]}>
                <Map size={32} color={THEME.skyBlue} />
              </View>
              <Text style={[styles.commandValue, { color: THEME.text }]}>1.2M</Text>
              <Text style={[styles.commandLabel, { color: THEME.textMuted }]}>Total Acres</Text>
              <View style={styles.commandTrend}>
                <ArrowUpRight size={16} color={THEME.emeraldGreen} />
                <Text style={[styles.commandChange, { color: THEME.emeraldGreen }]}>+15.2%</Text>
              </View>
            </Animated.View>
            <Animated.View entering={FadeInUp.delay(200).springify()} style={[styles.commandCard, { backgroundColor: THEME.cardLight }]}>
              <View style={[styles.commandIcon, { backgroundColor: THEME.emeraldGreen + '20' }]}>
                <Leaf size={32} color={THEME.emeraldGreen} />
              </View>
              <Text style={[styles.commandValue, { color: THEME.text }]}>92%</Text>
              <Text style={[styles.commandLabel, { color: THEME.textMuted }]}>Crop Health Index</Text>
              <View style={styles.commandTrend}>
                <ArrowUpRight size={16} color={THEME.emeraldGreen} />
                <Text style={[styles.commandChange, { color: THEME.emeraldGreen }]}>+3.2%</Text>
              </View>
            </Animated.View>
            <Animated.View entering={FadeInUp.delay(300).springify()} style={[styles.commandCard, { backgroundColor: THEME.cardLight }]}>
              <View style={[styles.commandIcon, { backgroundColor: THEME.amber + '20' }]}>
                <Wheat size={32} color={THEME.amber} />
              </View>
              <Text style={[styles.commandValue, { color: THEME.text }]}>4.8M</Text>
              <Text style={[styles.commandLabel, { color: THEME.textMuted }]}>Harvest Forecast (tons)</Text>
              <View style={styles.commandTrend}>
                <ArrowUpRight size={16} color={THEME.emeraldGreen} />
                <Text style={[styles.commandChange, { color: THEME.emeraldGreen }]}>+22.5%</Text>
              </View>
            </Animated.View>
            <Animated.View entering={FadeInUp.delay(400).springify()} style={[styles.commandCard, { backgroundColor: THEME.cardLight }]}>
              <View style={[styles.commandIcon, { backgroundColor: THEME.purple + '20' }]}>
                <DollarSign size={32} color={THEME.purple} />
              </View>
              <Text style={[styles.commandValue, { color: THEME.text }]}>$2.4B</Text>
              <Text style={[styles.commandLabel, { color: THEME.textMuted }]}>Revenue</Text>
              <View style={styles.commandTrend}>
                <ArrowUpRight size={16} color={THEME.emeraldGreen} />
                <Text style={[styles.commandChange, { color: THEME.emeraldGreen }]}>+28.7%</Text>
              </View>
            </Animated.View>
            <Animated.View entering={FadeInUp.delay(500).springify()} style={[styles.commandCard, { backgroundColor: THEME.cardLight }]}>
              <View style={[styles.commandIcon, { backgroundColor: THEME.neonCyan + '20' }]}>
                <Brain size={32} color={THEME.neonCyan} />
              </View>
              <Text style={[styles.commandValue, { color: THEME.text }]}>12.4K</Text>
              <Text style={[styles.commandLabel, { color: THEME.textMuted }]}>AI Decisions Today</Text>
              <View style={styles.commandTrend}>
                <ArrowUpRight size={16} color={THEME.emeraldGreen} />
                <Text style={[styles.commandChange, { color: THEME.emeraldGreen }]}>+89.2%</Text>
              </View>
            </Animated.View>
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
            <Text style={[styles.sectionSubtitle, { color: THEME.textMuted }]}>Real-time farming operations</Text>
          </View>
          <View style={[styles.feedContainer, { backgroundColor: THEME.cardLight }]}>
            {ACTIVITY_FEED.map(renderActivityItem)}
          </View>
        </View>

        {/* System Health */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={[styles.sectionTitle, { color: THEME.text }]}>System Health</Text>
            <Text style={[styles.sectionSubtitle, { color: THEME.textMuted }]}>Infrastructure and device monitoring</Text>
          </View>
          <View style={styles.healthGrid}>
            {Object.entries(SYSTEM_HEALTH).map(([key, data]) => renderSystemHealth(data, key))}
          </View>
        </View>

        {/* Crop Intelligence */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={[styles.sectionTitle, { color: THEME.text }]}>Crop Intelligence</Text>
            <Text style={[styles.sectionSubtitle, { color: THEME.textMuted }]}>Real-time crop monitoring and analysis</Text>
          </View>
          <View style={styles.intelligenceGrid}>
            <Animated.View entering={FadeInUp.springify()} style={[styles.intelCard, { backgroundColor: THEME.cardLight }]}>
              <View style={[styles.intelIcon, { backgroundColor: THEME.emeraldGreen + '20' }]}>
                <Wheat size={24} color={THEME.emeraldGreen} />
              </View>
              <Text style={[styles.intelLabel, { color: THEME.textMuted }]}>Crop Growth</Text>
              <Text style={[styles.intelValue, { color: THEME.text }]}>78%</Text>
              <Text style={[styles.intelSub, { color: THEME.emeraldGreen }]}>Average Progress</Text>
            </Animated.View>
            <Animated.View entering={FadeInUp.delay(100).springify()} style={[styles.intelCard, { backgroundColor: THEME.cardLight }]}>
              <View style={[styles.intelIcon, { backgroundColor: THEME.emeraldGreen + '20' }]}>
                <Leaf size={24} color={THEME.emeraldGreen} />
              </View>
              <Text style={[styles.intelLabel, { color: THEME.textMuted }]}>Plant Health</Text>
              <Text style={[styles.intelValue, { color: THEME.text }]}>90%</Text>
              <Text style={[styles.intelSub, { color: THEME.emeraldGreen }]}>Excellent Condition</Text>
            </Animated.View>
            <Animated.View entering={FadeInUp.delay(200).springify()} style={[styles.intelCard, { backgroundColor: THEME.cardLight }]}>
              <View style={[styles.intelIcon, { backgroundColor: THEME.skyBlue + '20' }]}>
                <BarChart3 size={24} color={THEME.skyBlue} />
              </View>
              <Text style={[styles.intelLabel, { color: THEME.textMuted }]}>NDVI Index</Text>
              <Text style={[styles.intelValue, { color: THEME.text }]}>0.78</Text>
              <Text style={[styles.intelSub, { color: THEME.emeraldGreen }]}>+5.2% Trend</Text>
            </Animated.View>
            <Animated.View entering={FadeInUp.delay(300).springify()} style={[styles.intelCard, { backgroundColor: THEME.cardLight }]}>
              <View style={[styles.intelIcon, { backgroundColor: THEME.amber + '20' }]}>
                <Sprout size={24} color={THEME.amber} />
              </View>
              <Text style={[styles.intelLabel, { color: THEME.textMuted }]}>Harvest Ready</Text>
              <Text style={[styles.intelValue, { color: THEME.text }]}>12%</Text>
              <Text style={[styles.intelSub, { color: THEME.amber }]}>Ready Now</Text>
            </Animated.View>
          </View>
        </View>

        {/* Livestock Intelligence */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={[styles.sectionTitle, { color: THEME.text }]}>Livestock Intelligence</Text>
            <Text style={[styles.sectionSubtitle, { color: THEME.textMuted }]}>Animal health and production monitoring</Text>
          </View>
          <View style={styles.intelligenceGrid}>
            <Animated.View entering={FadeInUp.springify()} style={[styles.intelCard, { backgroundColor: THEME.cardLight }]}>
              <View style={[styles.intelIcon, { backgroundColor: THEME.emeraldGreen + '20' }]}>
                <Heart size={24} color={THEME.emeraldGreen} />
              </View>
              <Text style={[styles.intelLabel, { color: THEME.textMuted }]}>Animal Health</Text>
              <Text style={[styles.intelValue, { color: THEME.text }]}>92%</Text>
              <Text style={[styles.intelSub, { color: THEME.emeraldGreen }]}>Excellent Status</Text>
            </Animated.View>
            <Animated.View entering={FadeInUp.delay(100).springify()} style={[styles.intelCard, { backgroundColor: THEME.cardLight }]}>
              <View style={[styles.intelIcon, { backgroundColor: THEME.skyBlue + '20' }]}>
                <Beef size={24} color={THEME.skyBlue} />
              </View>
              <Text style={[styles.intelLabel, { color: THEME.textMuted }]}>Feeding</Text>
              <Text style={[styles.intelValue, { color: THEME.text }]}>89%</Text>
              <Text style={[styles.intelSub, { color: THEME.emeraldGreen }]}>On Schedule</Text>
            </Animated.View>
            <Animated.View entering={FadeInUp.delay(200).springify()} style={[styles.intelCard, { backgroundColor: THEME.cardLight }]}>
              <View style={[styles.intelIcon, { backgroundColor: THEME.purple + '20' }]}>
                <Droplets size={24} color={THEME.purple} />
              </View>
              <Text style={[styles.intelLabel, { color: THEME.textMuted }]}>Milk Production</Text>
              <Text style={[styles.intelValue, { color: THEME.text }]}>45K L</Text>
              <Text style={[styles.intelSub, { color: THEME.emeraldGreen }]}>+8.5% Daily</Text>
            </Animated.View>
            <Animated.View entering={FadeInUp.delay(300).springify()} style={[styles.intelCard, { backgroundColor: THEME.cardLight }]}>
              <View style={[styles.intelIcon, { backgroundColor: THEME.amber + '20' }]}>
                <Navigation size={24} color={THEME.amber} />
              </View>
              <Text style={[styles.intelLabel, { color: THEME.textMuted }]}>Location</Text>
              <Text style={[styles.intelValue, { color: THEME.text }]}>89%</Text>
              <Text style={[styles.intelSub, { color: THEME.emeraldGreen }]}>In Pasture</Text>
            </Animated.View>
          </View>
        </View>

        {/* Precision Farming */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={[styles.sectionTitle, { color: THEME.text }]}>Precision Farming</Text>
            <Text style={[styles.sectionSubtitle, { color: THEME.textMuted }]}>GPS-guided equipment and drone operations</Text>
          </View>
          <View style={styles.intelligenceGrid}>
            <Animated.View entering={FadeInUp.springify()} style={[styles.intelCard, { backgroundColor: THEME.cardLight }]}>
              <View style={[styles.intelIcon, { backgroundColor: THEME.neonCyan + '20' }]}>
                <Navigation size={24} color={THEME.neonCyan} />
              </View>
              <Text style={[styles.intelLabel, { color: THEME.textMuted }]}>GPS Equipment</Text>
              <Text style={[styles.intelValue, { color: THEME.text }]}>234</Text>
              <Text style={[styles.intelSub, { color: THEME.emeraldGreen }]}>Active Units</Text>
            </Animated.View>
            <Animated.View entering={FadeInUp.delay(100).springify()} style={[styles.intelCard, { backgroundColor: THEME.cardLight }]}>
              <View style={[styles.intelIcon, { backgroundColor: THEME.skyBlue + '20' }]}>
                <Satellite size={24} color={THEME.skyBlue} />
              </View>
              <Text style={[styles.intelLabel, { color: THEME.textMuted }]}>Drone Missions</Text>
              <Text style={[styles.intelValue, { color: THEME.text }]}>1,247</Text>
              <Text style={[styles.intelSub, { color: THEME.emeraldGreen }]}>Completed</Text>
            </Animated.View>
            <Animated.View entering={FadeInUp.delay(200).springify()} style={[styles.intelCard, { backgroundColor: THEME.cardLight }]}>
              <View style={[styles.intelIcon, { backgroundColor: THEME.purple + '20' }]}>
                <Map size={24} color={THEME.purple} />
              </View>
              <Text style={[styles.intelLabel, { color: THEME.textMuted }]}>Field Mapping</Text>
              <Text style={[styles.intelValue, { color: THEME.text }]}>847</Text>
              <Text style={[styles.intelSub, { color: THEME.emeraldGreen }]}>Fields Mapped</Text>
            </Animated.View>
            <Animated.View entering={FadeInUp.delay(300).springify()} style={[styles.intelCard, { backgroundColor: THEME.cardLight }]}>
              <View style={[styles.intelIcon, { backgroundColor: THEME.amber + '20' }]}>
                <Target size={24} color={THEME.amber} />
              </View>
              <Text style={[styles.intelLabel, { color: THEME.textMuted }]}>Variable Rate</Text>
              <Text style={[styles.intelValue, { color: THEME.text }]}>89%</Text>
              <Text style={[styles.intelSub, { color: THEME.emeraldGreen }]}>Fertilizer</Text>
            </Animated.View>
          </View>
        </View>

        {/* Irrigation Command Center */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={[styles.sectionTitle, { color: THEME.text }]}>Irrigation Command Center</Text>
            <Text style={[styles.sectionSubtitle, { color: THEME.textMuted }]}>Smart water management and optimization</Text>
          </View>
          <View style={styles.intelligenceGrid}>
            <Animated.View entering={FadeInUp.springify()} style={[styles.intelCard, { backgroundColor: THEME.cardLight }]}>
              <View style={[styles.intelIcon, { backgroundColor: THEME.skyBlue + '20' }]}>
                <Droplets size={24} color={THEME.skyBlue} />
              </View>
              <Text style={[styles.intelLabel, { color: THEME.textMuted }]}>Water Usage</Text>
              <Text style={[styles.intelValue, { color: THEME.text }]}>450K</Text>
              <Text style={[styles.intelSub, { color: THEME.emeraldGreen }]}>Gallons Today</Text>
            </Animated.View>
            <Animated.View entering={FadeInUp.delay(100).springify()} style={[styles.intelCard, { backgroundColor: THEME.cardLight }]}>
              <View style={[styles.intelIcon, { backgroundColor: THEME.emeraldGreen + '20' }]}>
                <Activity size={24} color={THEME.emeraldGreen} />
              </View>
              <Text style={[styles.intelLabel, { color: THEME.textMuted }]}>Pump Status</Text>
              <Text style={[styles.intelValue, { color: THEME.text }]}>89%</Text>
              <Text style={[styles.intelSub, { color: THEME.emeraldGreen }]}>Active</Text>
            </Animated.View>
            <Animated.View entering={FadeInUp.delay(200).springify()} style={[styles.intelCard, { backgroundColor: THEME.cardLight }]}>
              <View style={[styles.intelIcon, { backgroundColor: THEME.amber + '20' }]}>
                <Gauge size={24} color={THEME.amber} />
              </View>
              <Text style={[styles.intelLabel, { color: THEME.textMuted }]}>Moisture</Text>
              <Text style={[styles.intelValue, { color: THEME.text }]}>67%</Text>
              <Text style={[styles.intelSub, { color: THEME.emeraldGreen }]}>Optimal</Text>
            </Animated.View>
            <Animated.View entering={FadeInUp.delay(300).springify()} style={[styles.intelCard, { backgroundColor: THEME.cardLight }]}>
              <View style={[styles.intelIcon, { backgroundColor: THEME.purple + '20' }]}>
                <CloudRain size={24} color={THEME.purple} />
              </View>
              <Text style={[styles.intelLabel, { color: THEME.textMuted }]}>Reservoir</Text>
              <Text style={[styles.intelValue, { color: THEME.text }]}>78%</Text>
              <Text style={[styles.intelSub, { color: THEME.amber }]}>Capacity</Text>
            </Animated.View>
          </View>
        </View>

        {/* Machinery Operations */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={[styles.sectionTitle, { color: THEME.text }]}>Machinery Operations</Text>
            <Text style={[styles.sectionSubtitle, { color: THEME.textMuted }]}>Fleet management and equipment tracking</Text>
          </View>
          <View style={styles.intelligenceGrid}>
            <Animated.View entering={FadeInUp.springify()} style={[styles.intelCard, { backgroundColor: THEME.cardLight }]}>
              <View style={[styles.intelIcon, { backgroundColor: THEME.amber + '20' }]}>
                <Tractor size={24} color={THEME.amber} />
              </View>
              <Text style={[styles.intelLabel, { color: THEME.textMuted }]}>Tractors</Text>
              <Text style={[styles.intelValue, { color: THEME.text }]}>189</Text>
              <Text style={[styles.intelSub, { color: THEME.emeraldGreen }]}>Active</Text>
            </Animated.View>
            <Animated.View entering={FadeInUp.delay(100).springify()} style={[styles.intelCard, { backgroundColor: THEME.cardLight }]}>
              <View style={[styles.intelIcon, { backgroundColor: THEME.emeraldGreen + '20' }]}>
                <Factory size={24} color={THEME.emeraldGreen} />
              </View>
              <Text style={[styles.intelLabel, { color: THEME.textMuted }]}>Harvesters</Text>
              <Text style={[styles.intelValue, { color: THEME.text }]}>45</Text>
              <Text style={[styles.intelSub, { color: THEME.emeraldGreen }]}>Active</Text>
            </Animated.View>
            <Animated.View entering={FadeInUp.delay(200).springify()} style={[styles.intelCard, { backgroundColor: THEME.cardLight }]}>
              <View style={[styles.intelIcon, { backgroundColor: THEME.skyBlue + '20' }]}>
                <Zap size={24} color={THEME.skyBlue} />
              </View>
              <Text style={[styles.intelLabel, { color: THEME.textMuted }]}>Fuel Usage</Text>
              <Text style={[styles.intelValue, { color: THEME.text }]}>8.5K</Text>
              <Text style={[styles.intelSub, { color: THEME.emeraldGreen }]}>Gallons Today</Text>
            </Animated.View>
            <Animated.View entering={FadeInUp.delay(300).springify()} style={[styles.intelCard, { backgroundColor: THEME.cardLight }]}>
              <View style={[styles.intelIcon, { backgroundColor: THEME.purple + '20' }]}>
                <Route size={24} color={THEME.purple} />
              </View>
              <Text style={[styles.intelLabel, { color: THEME.textMuted }]}>GPS Routes</Text>
              <Text style={[styles.intelValue, { color: THEME.text }]}>89%</Text>
              <Text style={[styles.intelSub, { color: THEME.emeraldGreen }]}>Optimized</Text>
            </Animated.View>
          </View>
        </View>

        {/* Supply Chain */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={[styles.sectionTitle, { color: THEME.text }]}>Supply Chain</Text>
            <Text style={[styles.sectionSubtitle, { color: THEME.textMuted }]}>Logistics and distribution management</Text>
          </View>
          <View style={styles.intelligenceGrid}>
            <Animated.View entering={FadeInUp.springify()} style={[styles.intelCard, { backgroundColor: THEME.cardLight }]}>
              <View style={[styles.intelIcon, { backgroundColor: THEME.emeraldGreen + '20' }]}>
                <Warehouse size={24} color={THEME.emeraldGreen} />
              </View>
              <Text style={[styles.intelLabel, { color: THEME.textMuted }]}>Warehouses</Text>
              <Text style={[styles.intelValue, { color: THEME.text }]}>23</Text>
              <Text style={[styles.intelSub, { color: THEME.emeraldGreen }]}>Total</Text>
            </Animated.View>
            <Animated.View entering={FadeInUp.delay(100).springify()} style={[styles.intelCard, { backgroundColor: THEME.cardLight }]}>
              <View style={[styles.intelIcon, { backgroundColor: THEME.amber + '20' }]}>
                <Package size={24} color={THEME.amber} />
              </View>
              <Text style={[styles.intelLabel, { color: THEME.textMuted }]}>Grain Storage</Text>
              <Text style={[styles.intelValue, { color: THEME.text }]}>450K</Text>
              <Text style={[styles.intelSub, { color: THEME.emeraldGreen }]}>Tons Current</Text>
            </Animated.View>
            <Animated.View entering={FadeInUp.delay(200).springify()} style={[styles.intelCard, { backgroundColor: THEME.cardLight }]}>
              <View style={[styles.intelIcon, { backgroundColor: THEME.skyBlue + '20' }]}>
                <Truck size={24} color={THEME.skyBlue} />
              </View>
              <Text style={[styles.intelLabel, { color: THEME.textMuted }]}>Logistics</Text>
              <Text style={[styles.intelValue, { color: THEME.text }]}>234</Text>
              <Text style={[styles.intelSub, { color: THEME.emeraldGreen }]}>In Transit</Text>
            </Animated.View>
            <Animated.View entering={FadeInUp.delay(300).springify()} style={[styles.intelCard, { backgroundColor: THEME.cardLight }]}>
              <View style={[styles.intelIcon, { backgroundColor: THEME.purple + '20' }]}>
                <Ship size={24} color={THEME.purple} />
              </View>
              <Text style={[styles.intelLabel, { color: THEME.textMuted }]}>Deliveries</Text>
              <Text style={[styles.intelValue, { color: THEME.text }]}>89%</Text>
              <Text style={[styles.intelSub, { color: THEME.emeraldGreen }]}>On Time</Text>
            </Animated.View>
          </View>
        </View>

        {/* Weather & Environment */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={[styles.sectionTitle, { color: THEME.text }]}>Weather & Environment</Text>
            <Text style={[styles.sectionSubtitle, { color: THEME.textMuted }]}>Climate monitoring and forecasting</Text>
          </View>
          <View style={styles.intelligenceGrid}>
            <Animated.View entering={FadeInUp.springify()} style={[styles.intelCard, { backgroundColor: THEME.cardLight }]}>
              <View style={[styles.intelIcon, { backgroundColor: THEME.skyBlue + '20' }]}>
                <CloudRain size={24} color={THEME.skyBlue} />
              </View>
              <Text style={[styles.intelLabel, { color: THEME.textMuted }]}>Rainfall</Text>
              <Text style={[styles.intelValue, { color: THEME.text }]}>0.2"</Text>
              <Text style={[styles.intelSub, { color: THEME.emeraldGreen }]}>Today</Text>
            </Animated.View>
            <Animated.View entering={FadeInUp.delay(100).springify()} style={[styles.intelCard, { backgroundColor: THEME.cardLight }]}>
              <View style={[styles.intelIcon, { backgroundColor: THEME.amber + '20' }]}>
                <Thermometer size={24} color={THEME.amber} />
              </View>
              <Text style={[styles.intelLabel, { color: THEME.textMuted }]}>Temperature</Text>
              <Text style={[styles.intelValue, { color: THEME.text }]}>72°F</Text>
              <Text style={[styles.intelSub, { color: THEME.emeraldGreen }]}>Current</Text>
            </Animated.View>
            <Animated.View entering={FadeInUp.delay(200).springify()} style={[styles.intelCard, { backgroundColor: THEME.cardLight }]}>
              <View style={[styles.intelIcon, { backgroundColor: THEME.skyBlue + '20' }]}>
                <Wind size={24} color={THEME.skyBlue} />
              </View>
              <Text style={[styles.intelLabel, { color: THEME.textMuted }]}>Wind</Text>
              <Text style={[styles.intelValue, { color: THEME.text }]}>12 mph</Text>
              <Text style={[styles.intelSub, { color: THEME.emeraldGreen }]}>NW Direction</Text>
            </Animated.View>
            <Animated.View entering={FadeInUp.delay(300).springify()} style={[styles.intelCard, { backgroundColor: THEME.cardLight }]}>
              <View style={[styles.intelIcon, { backgroundColor: THEME.purple + '20' }]}>
                <Sun size={24} color={THEME.purple} />
              </View>
              <Text style={[styles.intelLabel, { color: THEME.textMuted }]}>Forecast</Text>
              <Text style={[styles.intelValue, { color: THEME.text }]}>Sunny</Text>
              <Text style={[styles.intelSub, { color: THEME.emeraldGreen }]}>Next Week</Text>
            </Animated.View>
          </View>
        </View>

        {/* Sustainability */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={[styles.sectionTitle, { color: THEME.text }]}>Sustainability</Text>
            <Text style={[styles.sectionSubtitle, { color: THEME.textMuted }]}>Environmental impact and ESG metrics</Text>
          </View>
          <View style={styles.intelligenceGrid}>
            <Animated.View entering={FadeInUp.springify()} style={[styles.intelCard, { backgroundColor: THEME.cardLight }]}>
              <View style={[styles.intelIcon, { backgroundColor: THEME.emeraldGreen + '20' }]}>
                <Trees size={24} color={THEME.emeraldGreen} />
              </View>
              <Text style={[styles.intelLabel, { color: THEME.textMuted }]}>Carbon Reduction</Text>
              <Text style={[styles.intelValue, { color: THEME.text }]}>15%</Text>
              <Text style={[styles.intelSub, { color: THEME.emeraldGreen }]}>Target: 25%</Text>
            </Animated.View>
            <Animated.View entering={FadeInUp.delay(100).springify()} style={[styles.intelCard, { backgroundColor: THEME.cardLight }]}>
              <View style={[styles.intelIcon, { backgroundColor: THEME.skyBlue + '20' }]}>
                <Droplets size={24} color={THEME.skyBlue} />
              </View>
              <Text style={[styles.intelLabel, { color: THEME.textMuted }]}>Water Saved</Text>
              <Text style={[styles.intelValue, { color: THEME.text }]}>45M</Text>
              <Text style={[styles.intelSub, { color: THEME.emeraldGreen }]}>Gallons</Text>
            </Animated.View>
            <Animated.View entering={FadeInUp.delay(200).springify()} style={[styles.intelCard, { backgroundColor: THEME.cardLight }]}>
              <View style={[styles.intelIcon, { backgroundColor: THEME.amber + '20' }]}>
                <Sun size={24} color={THEME.amber} />
              </View>
              <Text style={[styles.intelLabel, { color: THEME.textMuted }]}>Renewable</Text>
              <Text style={[styles.intelValue, { color: THEME.text }]}>80%</Text>
              <Text style={[styles.intelSub, { color: THEME.emeraldGreen }]}>Energy Mix</Text>
            </Animated.View>
            <Animated.View entering={FadeInUp.delay(300).springify()} style={[styles.intelCard, { backgroundColor: THEME.cardLight }]}>
              <View style={[styles.intelIcon, { backgroundColor: THEME.purple + '20' }]}>
                <Award size={24} color={THEME.purple} />
              </View>
              <Text style={[styles.intelLabel, { color: THEME.textMuted }]}>ESG Score</Text>
              <Text style={[styles.intelValue, { color: THEME.text }]}>92</Text>
              <Text style={[styles.intelSub, { color: THEME.emeraldGreen }]}>Overall</Text>
            </Animated.View>
          </View>
        </View>

        {/* Quick Actions */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={[styles.sectionTitle, { color: THEME.text }]}>Quick Actions</Text>
            <Text style={[styles.sectionSubtitle, { color: THEME.textMuted }]}>Common operations and navigation</Text>
          </View>
          <View style={styles.actionsGrid}>
            <TouchableOpacity style={[styles.actionCard, { backgroundColor: THEME.cardLight }]} onPress={() => router.push('/ai-agent/agriculture')}>
              <Sprout size={24} color={THEME.emeraldGreen} />
              <Text style={[styles.actionText, { color: THEME.text }]}>View Agents</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.actionCard, { backgroundColor: THEME.cardLight }]} onPress={() => router.push('/ai-agent/agriculture/dashboard')}>
              <LayoutDashboard size={24} color={THEME.skyBlue} />
              <Text style={[styles.actionText, { color: THEME.text }]}>Dashboard</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.actionCard, { backgroundColor: THEME.cardLight }]}>
              <Map size={24} color={THEME.purple} />
              <Text style={[styles.actionText, { color: THEME.text }]}>Farm Map</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.actionCard, { backgroundColor: THEME.cardLight }]}>
              <Satellite size={24} color={THEME.amber} />
              <Text style={[styles.actionText, { color: THEME.text }]}>Satellite</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.actionCard, { backgroundColor: THEME.cardLight }]}>
              <BarChart3 size={24} color={THEME.neonCyan} />
              <Text style={[styles.actionText, { color: THEME.text }]}>Analytics</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.actionCard, { backgroundColor: THEME.cardLight }]}>
              <Settings size={24} color={THEME.textMuted} />
              <Text style={[styles.actionText, { color: THEME.text }]}>Settings</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={{ height: 40 }} />
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
    padding: 16,
    borderBottomWidth: 1,
  },
  backButton: {
    padding: 8,
    marginRight: 12,
  },
  headerContent: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  headerIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  headerSubtitle: {
    fontSize: 12,
  },
  settingsButton: {
    padding: 8,
  },
  scrollView: {
    flex: 1,
  },
  kpiSection: {
    padding: 16,
  },
  kpiTabs: {
    flexDirection: 'row',
    marginBottom: 16,
    gap: 8,
  },
  kpiTab: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: 'transparent',
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
    borderRadius: 12,
    borderWidth: 1,
    gap: 8,
  },
  kpiLabel: {
    fontSize: 12,
  },
  kpiValue: {
    fontSize: 24,
    fontWeight: 'bold',
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
    padding: 16,
    marginTop: 8,
  },
  sectionHeader: {
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  sectionSubtitle: {
    fontSize: 14,
  },
  agentsGrid: {
    gap: 12,
  },
  agentCard: {
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    gap: 12,
  },
  agentIcon: {
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
  },
  agentInfo: {
    gap: 8,
  },
  agentHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  agentName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  statusBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    gap: 6,
  },
  statusDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  statusText: {
    fontSize: 12,
    fontWeight: '600',
  },
  agentRole: {
    fontSize: 14,
  },
  responsibilities: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
  },
  respChip: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  respText: {
    fontSize: 11,
    fontWeight: '500',
  },
  metricsRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 8,
  },
  metricItem: {
    alignItems: 'center',
  },
  metricValue: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  metricLabel: {
    fontSize: 10,
  },
  efficiencyBar: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
    gap: 8,
  },
  efficiencyFill: {
    height: 6,
    borderRadius: 3,
    flex: 1,
  },
  efficiencyText: {
    fontSize: 12,
    fontWeight: '600',
  },
  commandGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  commandCard: {
    flex: 1,
    minWidth: 150,
    padding: 16,
    borderRadius: 12,
    gap: 8,
  },
  commandIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  commandValue: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  commandLabel: {
    fontSize: 12,
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
    borderRadius: 12,
    borderLeftWidth: 4,
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
  insightMeta: {
    flex: 1,
  },
  insightTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 2,
  },
  insightTime: {
    fontSize: 12,
  },
  impactBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  impactText: {
    fontSize: 12,
    fontWeight: '600',
  },
  insightMessage: {
    fontSize: 14,
    lineHeight: 20,
  },
  actionBox: {
    padding: 12,
    borderRadius: 8,
  },
  actionText: {
    fontSize: 13,
    fontWeight: '500',
  },
  feedContainer: {
    borderRadius: 12,
    padding: 16,
    gap: 12,
  },
  activityItem: {
    flexDirection: 'row',
    alignItems: 'center',
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
    marginBottom: 2,
  },
  activityTime: {
    fontSize: 12,
  },
  healthGrid: {
    gap: 12,
  },
  healthCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderRadius: 12,
    gap: 12,
  },
  healthIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  healthInfo: {
    flex: 1,
    gap: 8,
  },
  healthName: {
    fontSize: 16,
    fontWeight: '600',
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
    fontWeight: 'bold',
  },
  healthStatLabel: {
    fontSize: 10,
  },
  healthIndicator: {
    width: 60,
    height: 4,
    borderRadius: 2,
    overflow: 'hidden',
  },
  healthFill: {
    height: '100%',
  },
  actionsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  actionCard: {
    flex: 1,
    minWidth: 120,
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    gap: 8,
  },
  actionText: {
    fontSize: 12,
    fontWeight: '600',
  },
});
