import React, { useState, useEffect } from 'react';
import { View, StyleSheet, ScrollView, TouchableOpacity, Animated } from 'react-native';
import { Text } from '@/components/ui/text';
import { useTheme } from '@/providers/ThemeProvider';
import { 
  LayoutDashboard,
  Factory,
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
  Cpu,
  Wrench,
  Package,
  Truck,
  ShieldCheck,
  Thermometer,
  Droplets,
  Leaf,
  Gauge,
  Radio,
  HardDrive,
  Monitor,
  Server,
  Database,
  Wifi,
  AlertTriangle,
  CheckSquare,
  Warehouse,
  Armchair,
  Cog,
  Hammer,
  ScanLine,
  Microscope,
  ClipboardList,
  Timer,
  Gauge as GaugeIcon,
  Zap as ZapIcon,
  Factory as FactoryIcon,
  Settings2,
  Layers as LayersIcon,
  Bot,
  Workflow,
  Box
} from 'lucide-react-native';

// Types
interface ManufacturingAgent {
  id: string;
  name: string;
  specialty: string;
  avatar: string;
  status: 'active' | 'monitoring' | 'paused' | 'error';
  confidenceScore: number;
  manufacturingImpactScore: number;
  metrics: {
    unitsManaged?: number;
    throughputIncrease?: string;
    scheduleAccuracy?: number;
    machinesMonitored?: number;
    failuresPrevented?: number;
    predictionAccuracy?: number;
    inspectionsPerformed?: number;
    defectsPrevented?: number;
    qualityAccuracy?: number;
  };
  activeInsights: number;
  trend: 'up' | 'down' | 'stable';
}

interface ManufacturingKPI {
  id: string;
  title: string;
  value: string;
  change: string;
  trend: 'up' | 'down' | 'stable';
  color: string;
  subtitle: string;
}

interface ProductionLine {
  id: string;
  name: string;
  status: 'running' | 'stopped' | 'maintenance' | 'error';
  throughput: string;
  efficiency: number;
  target: string;
  actual: string;
  cycleTime: string;
}

interface Machine {
  id: string;
  name: string;
  type: string;
  status: 'operational' | 'warning' | 'critical' | 'maintenance';
  healthScore: number;
  uptime: string;
  temperature: string;
  vibration: string;
  utilization: number;
}

interface QualityMetric {
  id: string;
  metric: string;
  value: string;
  target: string;
  status: 'good' | 'warning' | 'critical';
  trend: 'up' | 'down' | 'stable';
}

interface MaintenanceAlert {
  id: string;
  machine: string;
  type: 'predictive' | 'preventive' | 'emergency';
  priority: 'high' | 'medium' | 'low';
  estimatedDowntime: string;
  scheduledDate: string;
  description: string;
}

interface InventoryItem {
  id: string;
  material: string;
  category: 'raw' | 'wip' | 'finished';
  quantity: number;
  unit: string;
  location: string;
  status: 'adequate' | 'low' | 'critical';
  reorderPoint: number;
}

interface WorkforceMetric {
  id: string;
  metric: string;
  value: string;
  change: string;
  trend: 'up' | 'down' | 'stable';
}

interface Supplier {
  id: string;
  name: string;
  category: string;
  performance: number;
  onTimeDelivery: number;
  qualityRating: number;
  riskLevel: 'low' | 'medium' | 'high';
  status: 'active' | 'warning' | 'suspended';
}

interface EnergyMetric {
  id: string;
  metric: string;
  value: string;
  unit: string;
  change: string;
  trend: 'up' | 'down' | 'stable';
  target: string;
}

interface ManufacturingInsight {
  id: string;
  insight: string;
  category: string;
  confidence: number;
  impact: 'high' | 'medium' | 'low';
  timestamp: string;
}

interface FactoryActivity {
  id: string;
  event: string;
  type: 'production' | 'maintenance' | 'quality' | 'inventory' | 'supplier' | 'safety' | 'ai';
  timestamp: string;
  details?: string;
}

interface FactorySystemHealth {
  id: string;
  system: string;
  status: 'healthy' | 'degraded' | 'down';
  uptime: string;
  latency: string;
}

const ManufacturingCommandCenter = () => {
  const theme = useTheme();
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [activeTab, setActiveTab] = useState('dashboard');
  const [animatedValues, setAnimatedValues] = useState<Record<string, Animated.Value>>({});
  const [realTimeData, setRealTimeData] = useState({
    productionOutput: 4800000,
    oee: 92.4,
    factoryUtilization: 89,
    qualityYield: 98.7,
    activeMachines: 11731,
    totalAlerts: 23,
  });

  // Navigation Items
  const navigationItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'agents', label: 'AI Factory Agents', icon: Bot },
    { id: 'production', label: 'Production Operations', icon: Workflow },
    { id: 'smart-factory', label: 'Smart Factory', icon: Factory },
    { id: 'quality', label: 'Quality Control', icon: Microscope },
    { id: 'maintenance', label: 'Maintenance', icon: Wrench },
    { id: 'inventory', label: 'Inventory & Materials', icon: Warehouse },
    { id: 'workforce', label: 'Workforce', icon: Users },
    { id: 'supply-chain', label: 'Supply Chain', icon: Truck },
    { id: 'analytics', label: 'Analytics', icon: BarChart3 },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  // Manufacturing KPIs (with real-time updates)
  const manufacturingKPIs: ManufacturingKPI[] = [
    { id: '1', title: 'Overall Equipment Effectiveness (OEE)', value: `${realTimeData.oee.toFixed(1)}%`, change: '+3.2%', trend: 'up', color: '#00D4FF', subtitle: 'World-class benchmark' },
    { id: '2', title: 'Production Output', value: `${(realTimeData.productionOutput / 1000000).toFixed(1)}M`, change: '+12.8%', trend: 'up', color: '#10B981', subtitle: 'Units produced' },
    { id: '3', title: 'Factory Utilization', value: `${realTimeData.factoryUtilization.toFixed(0)}%`, change: '+4.5%', trend: 'up', color: '#8B5CF6', subtitle: 'Capacity utilization' },
    { id: '4', title: 'Yield Rate', value: `${realTimeData.qualityYield.toFixed(1)}%`, change: '+1.2%', trend: 'up', color: '#FF6B35', subtitle: 'First-pass yield' },
    { id: '5', title: 'Quality Score', value: '96.2', change: '+2.4%', trend: 'up', color: '#EC4899', subtitle: 'Quality index' },
    { id: '6', title: 'Downtime Minutes', value: '124', change: '-18.5%', trend: 'down', color: '#EF4444', subtitle: 'Unplanned downtime' },
    { id: '7', title: 'Throughput', value: '2,840', change: '+8.2%', trend: 'up', color: '#06B6D4', subtitle: 'Units per hour' },
    { id: '8', title: 'Energy Efficiency', value: '94%', change: '+5.1%', trend: 'up', color: '#10B981', subtitle: 'Energy utilization' },
    { id: '9', title: 'Inventory Accuracy', value: '99.2%', change: '+0.8%', trend: 'up', color: '#8B5CF6', subtitle: 'Inventory precision' },
    { id: '10', title: 'AI Optimization Impact', value: '$48.2M', change: '+22.4%', trend: 'up', color: '#FF6B35', subtitle: 'Annual savings' },
  ];

  // Initialize animated values
  useEffect(() => {
    const values: Record<string, Animated.Value> = {};
    manufacturingKPIs.forEach(kpi => {
      values[kpi.id] = new Animated.Value(0);
    });
    setAnimatedValues(values);

    // Animate values on mount
    Object.entries(values).forEach(([id, value]) => {
      Animated.timing(value, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }).start();
    });
  }, []);

  // Real-time data simulation
  useEffect(() => {
    const interval = setInterval(() => {
      setRealTimeData(prev => ({
        ...prev,
        productionOutput: prev.productionOutput + Math.floor(Math.random() * 100),
        oee: Math.min(100, Math.max(0, prev.oee + (Math.random() - 0.5) * 0.2)),
        factoryUtilization: Math.min(100, Math.max(0, prev.factoryUtilization + (Math.random() - 0.5) * 0.3)),
        qualityYield: Math.min(100, Math.max(0, prev.qualityYield + (Math.random() - 0.5) * 0.1)),
        activeMachines: prev.activeMachines + Math.floor((Math.random() - 0.5) * 5),
        totalAlerts: prev.totalAlerts + Math.floor((Math.random() - 0.5) * 2),
      }));
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  // AI Manufacturing Agents
  const manufacturingAgents: ManufacturingAgent[] = [
    {
      id: '1',
      name: 'Agent Forge',
      specialty: 'Production Optimization Agent',
      avatar: '🔥',
      status: 'active',
      confidenceScore: 97,
      manufacturingImpactScore: 94,
      metrics: {
        unitsManaged: 8400000,
        throughputIncrease: '+18%',
        scheduleAccuracy: 97,
      },
      activeInsights: 142,
      trend: 'up',
    },
    {
      id: '2',
      name: 'Agent Sentinel',
      specialty: 'Predictive Maintenance Agent',
      avatar: '🛡️',
      status: 'active',
      confidenceScore: 96,
      manufacturingImpactScore: 92,
      metrics: {
        machinesMonitored: 12480,
        failuresPrevented: 842,
        predictionAccuracy: 96,
      },
      activeInsights: 186,
      trend: 'up',
    },
    {
      id: '3',
      name: 'Agent Quantum',
      specialty: 'Quality Intelligence Agent',
      avatar: '🔬',
      status: 'active',
      confidenceScore: 98,
      manufacturingImpactScore: 95,
      metrics: {
        inspectionsPerformed: 2400000,
        defectsPrevented: 18200,
        qualityAccuracy: 99.1,
      },
      activeInsights: 98,
      trend: 'stable',
    },
    {
      id: '4',
      name: 'Agent Nexus',
      specialty: 'Supply Chain Synchronization Agent',
      avatar: '🔗',
      status: 'active',
      confidenceScore: 94,
      manufacturingImpactScore: 89,
      metrics: {
        unitsManaged: 4200000,
        throughputIncrease: '+14%',
        scheduleAccuracy: 94,
      },
      activeInsights: 76,
      trend: 'up',
    },
  ];

  // Production Lines
  const productionLines: ProductionLine[] = [
    { id: '1', name: 'Production Line 1', status: 'running', throughput: '2,840/hr', efficiency: 94, target: '3,000', actual: '2,840', cycleTime: '1.26s' },
    { id: '2', name: 'Production Line 2', status: 'running', throughput: '2,720/hr', efficiency: 91, target: '3,000', actual: '2,720', cycleTime: '1.32s' },
    { id: '3', name: 'Production Line 3', status: 'maintenance', throughput: '0/hr', efficiency: 0, target: '3,000', actual: '0', cycleTime: 'N/A' },
    { id: '4', name: 'Production Line 4', status: 'running', throughput: '2,910/hr', efficiency: 97, target: '3,000', actual: '2,910', cycleTime: '1.24s' },
  ];

  // Machines
  const machines: Machine[] = [
    { id: '1', name: 'CNC Machine A-284', type: 'CNC Milling', status: 'operational', healthScore: 94, uptime: '99.2%', temperature: '42°C', vibration: '0.8mm/s', utilization: 89 },
    { id: '2', name: 'Robot Arm R-142', type: 'Assembly Robot', status: 'operational', healthScore: 97, uptime: '99.8%', temperature: '38°C', vibration: '0.3mm/s', utilization: 92 },
    { id: '3', name: 'Press Machine P-089', type: 'Hydraulic Press', status: 'warning', healthScore: 78, uptime: '94.5%', temperature: '68°C', vibration: '2.4mm/s', utilization: 85 },
    { id: '4', name: 'Conveyor System C-012', type: 'Conveyor Belt', status: 'operational', healthScore: 95, uptime: '99.5%', temperature: '35°C', vibration: '0.5mm/s', utilization: 88 },
  ];

  // Quality Metrics
  const qualityMetrics: QualityMetric[] = [
    { id: '1', metric: 'Defect Rate', value: '0.8%', target: '<1.0%', status: 'good', trend: 'down' },
    { id: '2', metric: 'Yield Rate', value: '98.7%', target: '>98.0%', status: 'good', trend: 'up' },
    { id: '3', metric: 'First Pass Yield', value: '97.2%', target: '>96.0%', status: 'good', trend: 'up' },
    { id: '4', metric: 'Customer Returns', value: '0.12%', target: '<0.5%', status: 'good', trend: 'down' },
    { id: '5', metric: 'Scrap Rate', value: '1.1%', target: '<1.5%', status: 'good', trend: 'down' },
  ];

  // Maintenance Alerts
  const maintenanceAlerts: MaintenanceAlert[] = [
    { id: '1', machine: 'Press Machine P-089', type: 'predictive', priority: 'high', estimatedDowntime: '4h', scheduledDate: '2024-01-28', description: 'Bearing replacement recommended based on vibration analysis' },
    { id: '2', machine: 'CNC Machine A-284', type: 'preventive', priority: 'medium', estimatedDowntime: '2h', scheduledDate: '2024-02-01', description: 'Scheduled lubrication and calibration' },
    { id: '3', machine: 'Robot Arm R-142', type: 'predictive', priority: 'low', estimatedDowntime: '1h', scheduledDate: '2024-02-05', description: 'Gearbox inspection recommended' },
  ];

  // Inventory Items
  const inventoryItems: InventoryItem[] = [
    { id: '1', material: 'Steel Sheets', category: 'raw', quantity: 12500, unit: 'kg', location: 'Warehouse A-1', status: 'adequate', reorderPoint: 5000 },
    { id: '2', material: 'Electronic Components', category: 'raw', quantity: 42000, unit: 'pcs', location: 'Warehouse B-2', status: 'adequate', reorderPoint: 15000 },
    { id: '3', material: 'Plastic Resin', category: 'raw', quantity: 2800, unit: 'kg', location: 'Warehouse A-3', status: 'low', reorderPoint: 5000 },
    { id: '4', material: 'Assembly Units', category: 'wip', quantity: 8400, unit: 'units', location: 'Line 2 Buffer', status: 'adequate', reorderPoint: 2000 },
    { id: '5', material: 'Finished Products', category: 'finished', quantity: 15600, unit: 'units', location: 'Warehouse C-1', status: 'adequate', reorderPoint: 8000 },
  ];

  // Workforce Metrics
  const workforceMetrics: WorkforceMetric[] = [
    { id: '1', metric: 'Workforce Utilization', value: '87%', change: '+3.2%', trend: 'up' },
    { id: '2', metric: 'Shift Performance', value: '94%', change: '+2.8%', trend: 'up' },
    { id: '3', metric: 'Productivity Index', value: '112', change: '+5.4%', trend: 'up' },
    { id: '4', metric: 'Safety Incidents', value: '2', change: '-40%', trend: 'down' },
    { id: '5', metric: 'Training Compliance', value: '96%', change: '+1.5%', trend: 'up' },
  ];

  // Suppliers
  const suppliers: Supplier[] = [
    { id: '1', name: 'Global Steel Corp', category: 'Raw Materials', performance: 94, onTimeDelivery: 96, qualityRating: 95, riskLevel: 'low', status: 'active' },
    { id: '2', name: 'Tech Components Ltd', category: 'Electronics', performance: 89, onTimeDelivery: 92, qualityRating: 91, riskLevel: 'low', status: 'active' },
    { id: '3', name: 'Polymer Solutions Inc', category: 'Plastics', performance: 78, onTimeDelivery: 82, qualityRating: 85, riskLevel: 'medium', status: 'warning' },
    { id: '4', name: 'Precision Parts Co', category: 'Components', performance: 96, onTimeDelivery: 98, qualityRating: 97, riskLevel: 'low', status: 'active' },
  ];

  // Energy Metrics
  const energyMetrics: EnergyMetric[] = [
    { id: '1', metric: 'Energy Consumption', value: '4.2M', unit: 'kWh', change: '-5.2%', trend: 'down', target: '4.5M' },
    { id: '2', metric: 'Carbon Emissions', value: '1,840', unit: 'tons', change: '-8.4%', trend: 'down', target: '2,000' },
    { id: '3', metric: 'Water Usage', value: '840K', unit: 'gal', change: '-3.2%', trend: 'down', target: '900K' },
    { id: '4', metric: 'Renewable Energy', value: '42%', unit: '%', change: '+12.4%', trend: 'up', target: '50%' },
  ];

  // Manufacturing Insights
  const manufacturingInsights: ManufacturingInsight[] = [
    { id: '1', insight: 'Production Line 4 throughput can increase by 12% with optimized cycle time adjustments.', category: 'Production Optimization', confidence: 94, impact: 'high', timestamp: '2h ago' },
    { id: '2', insight: 'Machine A-284 shows elevated failure probability within 7 days - schedule preventive maintenance.', category: 'Predictive Maintenance', confidence: 96, impact: 'high', timestamp: '4h ago' },
    { id: '3', insight: 'Inventory forecast indicates plastic resin shortage risk next week - expedite order.', category: 'Supply Chain', confidence: 89, impact: 'high', timestamp: '6h ago' },
    { id: '4', insight: 'Quality variation detected in Batch #1824 - investigate raw material quality.', category: 'Quality Control', confidence: 92, impact: 'medium', timestamp: '8h ago' },
    { id: '5', insight: 'Energy optimization could reduce costs by 8% through smart scheduling.', category: 'Sustainability', confidence: 87, impact: 'medium', timestamp: '10h ago' },
  ];

  // Factory Activities
  const factoryActivities: FactoryActivity[] = [
    { id: '1', event: 'Production order #18420 completed', type: 'production', timestamp: '2m ago', details: 'Line 4 - 2,840 units' },
    { id: '2', event: 'Machine maintenance scheduled', type: 'maintenance', timestamp: '15m ago', details: 'Press Machine P-089 - Predictive' },
    { id: '3', event: 'Defect detected in Batch #1824', type: 'quality', timestamp: '32m ago', details: 'Quality variation alert' },
    { id: '4', event: 'Inventory replenished', type: 'inventory', timestamp: '1h ago', details: 'Steel Sheets - 5,000kg received' },
    { id: '5', event: 'Supplier shipment received', type: 'supplier', timestamp: '2h ago', details: 'Global Steel Corp - Order #892' },
    { id: '6', event: 'Safety alert generated', type: 'safety', timestamp: '3h ago', details: 'Zone B - PPE compliance check' },
    { id: '7', event: 'AI optimization applied', type: 'ai', timestamp: '4h ago', details: 'Line 4 throughput +12%' },
  ];

  // Factory System Health
  const factorySystemHealth: FactorySystemHealth[] = [
    { id: '1', system: 'ERP Systems', status: 'healthy', uptime: '99.9%', latency: '45ms' },
    { id: '2', system: 'MES Platforms', status: 'healthy', uptime: '99.8%', latency: '38ms' },
    { id: '3', system: 'IoT Networks', status: 'healthy', uptime: '99.7%', latency: '22ms' },
    { id: '4', system: 'Robotics Controllers', status: 'healthy', uptime: '99.9%', latency: '15ms' },
    { id: '5', system: 'Warehouse Systems', status: 'healthy', uptime: '99.6%', latency: '52ms' },
    { id: '6', system: 'AI Agents', status: 'healthy', uptime: '99.8%', latency: '28ms' },
    { id: '7', system: 'Production Databases', status: 'healthy', uptime: '99.9%', latency: '18ms' },
  ];

  // Render Functions
  const renderKPICard = (kpi: ManufacturingKPI) => (
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

  const renderAgentCard = (agent: ManufacturingAgent) => (
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
          <Text style={[styles.agentMetricValue, { color: '#10B981' }]}>{agent.manufacturingImpactScore}</Text>
          <Text style={[styles.agentMetricLabel, { color: theme.colors.textSecondary }]}>Impact</Text>
        </View>
      </View>
      <View style={styles.agentInsights}>
        <Text style={[styles.agentInsightsCount, { color: '#8B5CF6' }]}>{agent.activeInsights}</Text>
        <Text style={[styles.agentInsightsLabel, { color: theme.colors.textSecondary }]}>Insights</Text>
      </View>
    </View>
  );

  const renderProductionLineCard = (line: ProductionLine) => (
    <View key={line.id} style={[styles.productionLineCard, { backgroundColor: theme.colors.card }]}>
      <View style={styles.productionLineHeader}>
        <Workflow size={20} color={line.status === 'running' ? '#10B981' : line.status === 'maintenance' ? '#F59E0B' : '#EF4444'} />
        <View style={styles.productionLineInfo}>
          <Text style={[styles.productionLineName, { color: theme.colors.text }]}>{line.name}</Text>
          <Text style={[styles.productionLineStatus, { color: line.status === 'running' ? '#10B981' : line.status === 'maintenance' ? '#F59E0B' : '#EF4444' }]}>{line.status}</Text>
        </View>
      </View>
      <View style={styles.productionLineMetrics}>
        <View style={styles.productionLineMetric}>
          <Text style={[styles.productionLineMetricValue, { color: '#06B6D4' }]}>{line.throughput}</Text>
          <Text style={[styles.productionLineMetricLabel, { color: theme.colors.textSecondary }]}>Throughput</Text>
        </View>
        <View style={styles.productionLineMetric}>
          <Text style={[styles.productionLineMetricValue, { color: '#10B981' }]}>{line.efficiency}%</Text>
          <Text style={[styles.productionLineMetricLabel, { color: theme.colors.textSecondary }]}>Efficiency</Text>
        </View>
        <View style={styles.productionLineMetric}>
          <Text style={[styles.productionLineMetricValue, { color: '#8B5CF6' }]}>{line.cycleTime}</Text>
          <Text style={[styles.productionLineMetricLabel, { color: theme.colors.textSecondary }]}>Cycle Time</Text>
        </View>
      </View>
      <View style={styles.productionLineProgress}>
        <Text style={[styles.productionLineProgressLabel, { color: theme.colors.textSecondary }]}>Progress: {line.actual} / {line.target}</Text>
        <View style={[styles.productionLineProgressBar, { backgroundColor: 'rgba(255,255,255,0.1)' }]}>
          <View style={[styles.productionLineProgressFill, { width: `${(parseInt(line.actual.replace(/,/g, '')) / parseInt(line.target.replace(/,/g, ''))) * 100}%`, backgroundColor: line.status === 'running' ? '#10B981' : '#F59E0B' }]} />
        </View>
      </View>
    </View>
  );

  const renderMachineCard = (machine: Machine) => (
    <View key={machine.id} style={[styles.machineCard, { backgroundColor: theme.colors.card }]}>
      <View style={styles.machineHeader}>
        <Cpu size={20} color={machine.status === 'operational' ? '#10B981' : machine.status === 'warning' ? '#F59E0B' : '#EF4444'} />
        <View style={styles.machineInfo}>
          <Text style={[styles.machineName, { color: theme.colors.text }]}>{machine.name}</Text>
          <Text style={[styles.machineType, { color: theme.colors.textSecondary }]}>{machine.type}</Text>
        </View>
      </View>
      <View style={styles.machineMetrics}>
        <View style={styles.machineMetric}>
          <Text style={[styles.machineMetricValue, { color: machine.healthScore >= 90 ? '#10B981' : machine.healthScore >= 70 ? '#F59E0B' : '#EF4444' }]}>{machine.healthScore}%</Text>
          <Text style={[styles.machineMetricLabel, { color: theme.colors.textSecondary }]}>Health</Text>
        </View>
        <View style={styles.machineMetric}>
          <Text style={[styles.machineMetricValue, { color: '#06B6D4' }]}>{machine.utilization}%</Text>
          <Text style={[styles.machineMetricLabel, { color: theme.colors.textSecondary }]}>Utilization</Text>
        </View>
      </View>
      <View style={styles.machineTelemetry}>
        <View style={styles.machineTelemetryItem}>
          <Thermometer size={14} color="rgba(255,255,255,0.5)" />
          <Text style={[styles.machineTelemetryValue, { color: theme.colors.textSecondary }]}>{machine.temperature}</Text>
        </View>
        <View style={styles.machineTelemetryItem}>
          <Activity size={14} color="rgba(255,255,255,0.5)" />
          <Text style={[styles.machineTelemetryValue, { color: theme.colors.textSecondary }]}>{machine.vibration}</Text>
        </View>
      </View>
    </View>
  );

  const renderMaintenanceAlertCard = (alert: MaintenanceAlert) => (
    <View key={alert.id} style={[styles.maintenanceAlertCard, { backgroundColor: theme.colors.card }]}>
      <View style={styles.maintenanceAlertHeader}>
        <Wrench size={20} color={alert.priority === 'high' ? '#EF4444' : alert.priority === 'medium' ? '#F59E0B' : '#10B981'} />
        <View style={styles.maintenanceAlertInfo}>
          <Text style={[styles.maintenanceAlertMachine, { color: theme.colors.text }]}>{alert.machine}</Text>
          <Text style={[styles.maintenanceAlertType, { color: theme.colors.textSecondary }]}>{alert.type}</Text>
        </View>
      </View>
      <View style={styles.maintenanceAlertMetrics}>
        <View style={[styles.maintenanceAlertBadge, { backgroundColor: alert.priority === 'high' ? 'rgba(239, 68, 68, 0.15)' : alert.priority === 'medium' ? 'rgba(245, 158, 11, 0.15)' : 'rgba(16, 185, 129, 0.15)' }]}>
          <Text style={[styles.maintenanceAlertPriority, { color: alert.priority === 'high' ? '#EF4444' : alert.priority === 'medium' ? '#F59E0B' : '#10B981' }]}>{alert.priority}</Text>
        </View>
        <View style={styles.maintenanceAlertTiming}>
          <Clock size={14} color="rgba(255,255,255,0.5)" />
          <Text style={[styles.maintenanceAlertDowntime, { color: theme.colors.textSecondary }]}>{alert.estimatedDowntime}</Text>
        </View>
      </View>
      <Text style={[styles.maintenanceAlertDescription, { color: theme.colors.textSecondary }]}>{alert.description}</Text>
      <Text style={[styles.maintenanceAlertDate, { color: 'rgba(255,255,255,0.5)' }]}>Scheduled: {alert.scheduledDate}</Text>
    </View>
  );

  const renderInventoryCard = (item: InventoryItem) => (
    <View key={item.id} style={[styles.inventoryCard, { backgroundColor: theme.colors.card }]}>
      <View style={styles.inventoryCardHeader}>
        <Package size={20} color={item.status === 'adequate' ? '#10B981' : item.status === 'low' ? '#F59E0B' : '#EF4444'} />
        <View style={styles.inventoryInfo}>
          <Text style={[styles.inventoryMaterial, { color: theme.colors.text }]}>{item.material}</Text>
          <Text style={[styles.inventoryCategory, { color: theme.colors.textSecondary }]}>{item.category}</Text>
        </View>
      </View>
      <View style={styles.inventoryMetrics}>
        <View style={styles.inventoryMetric}>
          <Text style={[styles.inventoryMetricValue, { color: '#06B6D4' }]}>{item.quantity.toLocaleString()}</Text>
          <Text style={[styles.inventoryMetricLabel, { color: theme.colors.textSecondary }]}>{item.unit}</Text>
        </View>
        <View style={[styles.inventoryStatusBadge, { backgroundColor: item.status === 'adequate' ? 'rgba(16, 185, 129, 0.15)' : item.status === 'low' ? 'rgba(245, 158, 11, 0.15)' : 'rgba(239, 68, 68, 0.15)' }]}>
          <Text style={[styles.inventoryStatusText, { color: item.status === 'adequate' ? '#10B981' : item.status === 'low' ? '#F59E0B' : '#EF4444' }]}>{item.status}</Text>
        </View>
      </View>
      <Text style={[styles.inventoryLocation, { color: 'rgba(255,255,255,0.5)' }]}>Location: {item.location}</Text>
    </View>
  );

  const renderSupplierCard = (supplier: Supplier) => (
    <View key={supplier.id} style={[styles.supplierCard, { backgroundColor: theme.colors.card }]}>
      <View style={styles.supplierHeader}>
        <Truck size={20} color={supplier.status === 'active' ? '#10B981' : supplier.status === 'warning' ? '#F59E0B' : '#EF4444'} />
        <View style={styles.supplierInfo}>
          <Text style={[styles.supplierName, { color: theme.colors.text }]}>{supplier.name}</Text>
          <Text style={[styles.supplierCategory, { color: theme.colors.textSecondary }]}>{supplier.category}</Text>
        </View>
      </View>
      <View style={styles.supplierMetrics}>
        <View style={styles.supplierMetric}>
          <Text style={[styles.supplierMetricValue, { color: '#06B6D4' }]}>{supplier.performance}%</Text>
          <Text style={[styles.supplierMetricLabel, { color: theme.colors.textSecondary }]}>Performance</Text>
        </View>
        <View style={styles.supplierMetric}>
          <Text style={[styles.supplierMetricValue, { color: '#10B981' }]}>{supplier.onTimeDelivery}%</Text>
          <Text style={[styles.supplierMetricLabel, { color: theme.colors.textSecondary }]}>On-Time</Text>
        </View>
        <View style={styles.supplierMetric}>
          <Text style={[styles.supplierMetricValue, { color: '#8B5CF6' }]}>{supplier.qualityRating}%</Text>
          <Text style={[styles.supplierMetricLabel, { color: theme.colors.textSecondary }]}>Quality</Text>
        </View>
      </View>
      <View style={[styles.supplierRiskBadge, { backgroundColor: supplier.riskLevel === 'low' ? 'rgba(16, 185, 129, 0.15)' : supplier.riskLevel === 'medium' ? 'rgba(245, 158, 11, 0.15)' : 'rgba(239, 68, 68, 0.15)' }]}>
        <Text style={[styles.supplierRiskText, { color: supplier.riskLevel === 'low' ? '#10B981' : supplier.riskLevel === 'medium' ? '#F59E0B' : '#EF4444' }]}>Risk: {supplier.riskLevel}</Text>
      </View>
    </View>
  );

  return (
    <View style={[styles.container, { backgroundColor: '#05070A' }]}>
      {/* Premium gradient overlay */}
      <View style={styles.gradientOverlay} />
      {/* Header */}
      <View style={[styles.header, { backgroundColor: 'rgba(5, 7, 10, 0.95)', borderBottomColor: 'rgba(6, 182, 212, 0.15)' }]}>
        <View style={styles.headerContent}>
          <View style={styles.headerLeft}>
            <Factory size={32} color="#06B6D4" />
            <View style={styles.headerTitle}>
              <Text style={[styles.headerTitleText, { color: '#FFFFFF', textShadowColor: 'rgba(6, 182, 212, 0.5)', textShadowOffset: { width: 0, height: 0 }, textShadowRadius: 10 }]}>AI Manufacturing & Production Command Center</Text>
              <Text style={[styles.headerSubtitle, { color: 'rgba(6, 182, 212, 0.8)' }]}>Autonomous Factory Operations & Industry 4.0 Intelligence</Text>
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
        <View style={[styles.sidebar, { backgroundColor: 'rgba(5, 7, 10, 0.85)', borderRightColor: 'rgba(6, 182, 212, 0.15)' }]}>
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
                      isActive && { backgroundColor: 'rgba(6, 182, 212, 0.2)', borderLeftColor: '#06B6D4', borderLeftWidth: 3 }
                    ]}
                    onPress={() => setActiveTab(item.id)}
                  >
                    <Icon 
                      size={18} 
                      color={isActive ? '#06B6D4' : 'rgba(255,255,255,0.6)'} 
                    />
                    <Text style={[
                      styles.sidebarItemText,
                      { color: isActive ? '#06B6D4' : 'rgba(255,255,255,0.6)', fontWeight: isActive ? '600' : '500' }
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
        
        {/* Top Executive Bar - Manufacturing KPIs */}
        <View style={[styles.topExecutiveBar, { backgroundColor: 'rgba(6, 182, 212, 0.05)', borderColor: 'rgba(6, 182, 212, 0.25)', borderWidth: 1.5 }]}>
          <View style={styles.topBarHeader}>
            <View style={styles.topBarTitle}>
              <View style={styles.pulsingIndicator}>
                <TrendingUp size={20} color="#06B6D4" />
              </View>
              <Text style={[styles.topBarTitleText, { color: '#FFFFFF' }]}>Manufacturing Executive Overview</Text>
            </View>
            <Text style={[styles.topBarPeriod, { color: 'rgba(255,255,255,0.6)' }]}>Last 24 hours</Text>
          </View>
          
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.topBarScroll}>
            <View style={styles.topBarKPIs}>
              {manufacturingKPIs.slice(0, 5).map((kpi) => (
                <View key={kpi.id} style={[styles.topBarKPI, { backgroundColor: 'rgba(255,255,255,0.03)', borderColor: kpi.color + '50', borderWidth: 1 }]}>
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

        {/* Manufacturing KPIs */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <View style={styles.sectionTitleContainer}>
              <BarChart3 size={20} color="#06B6D4" />
              <Text style={[styles.sectionTitle, { color: '#FFFFFF' }]}>Manufacturing KPIs</Text>
            </View>
            <View style={styles.liveIndicator}>
              <View style={styles.liveDot} />
              <Text style={styles.liveText}>LIVE</Text>
            </View>
          </View>
          <View style={styles.kpiGrid}>
            {manufacturingKPIs.map(renderKPICard)}
          </View>
        </View>

        {/* AI Manufacturing Agents */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <View style={styles.sectionTitleContainer}>
              <Brain size={20} color="#06B6D4" />
              <Text style={[styles.sectionTitle, { color: '#FFFFFF' }]}>AI Manufacturing Agents</Text>
            </View>
            <Text style={[styles.sectionSubtitle, { color: 'rgba(6, 182, 212, 0.7)' }]}>{manufacturingAgents.length} Active Agents</Text>
          </View>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.agentsScroll}>
            {manufacturingAgents.map(renderAgentCard)}
          </ScrollView>
        </View>

        {/* COO Command Center - Large Centerpiece */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <View style={styles.sectionTitleContainer}>
              <Gauge size={20} color="#06B6D4" />
              <Text style={[styles.sectionTitle, { color: '#FFFFFF' }]}>Chief Operations Officer Command Center</Text>
            </View>
          </View>
          <View style={[styles.commandCenter, { backgroundColor: 'rgba(6, 182, 212, 0.03)', borderColor: 'rgba(6, 182, 212, 0.3)', borderWidth: 1.5 }]}>
            
            {/* Command Center Header */}
            <View style={styles.commandCenterHeader}>
              <View style={styles.commandCenterTitle}>
                <Brain size={24} color="#06B6D4" />
                <View>
                  <Text style={[styles.commandCenterTitleText, { color: '#FFFFFF' }]}>Manufacturing Intelligence Hub</Text>
                  <Text style={[styles.commandCenterSubtitle, { color: 'rgba(255,255,255,0.6)' }]}>Real-time factory operations monitoring</Text>
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
              <View style={[styles.commandMetricCard, { backgroundColor: 'rgba(255,255,255,0.03)', borderColor: 'rgba(0, 212, 255, 0.3)' }]}>
                <View style={styles.commandMetricHeader}>
                  <Factory size={20} color="#00D4FF" />
                  <Text style={[styles.commandMetricLabel, { color: 'rgba(255,255,255,0.7)' }]}>Production Output</Text>
                </View>
                <Text style={[styles.commandMetricValue, { color: '#00D4FF' }]}>4.8M</Text>
                <View style={styles.commandMetricTrend}>
                  <TrendingUp size={14} color="#10B981" />
                  <Text style={[styles.commandMetricTrendText, { color: '#10B981' }]}>+12.8%</Text>
                  <Text style={[styles.commandMetricPeriod, { color: 'rgba(255,255,255,0.5)' }]}>Units produced</Text>
                </View>
              </View>

              <View style={[styles.commandMetricCard, { backgroundColor: 'rgba(255,255,255,0.03)', borderColor: 'rgba(16, 185, 129, 0.3)' }]}>
                <View style={styles.commandMetricHeader}>
                  <Gauge size={20} color="#10B981" />
                  <Text style={[styles.commandMetricLabel, { color: 'rgba(255,255,255,0.7)' }]}>OEE</Text>
                </View>
                <Text style={[styles.commandMetricValue, { color: '#10B981' }]}>92.4%</Text>
                <View style={styles.commandMetricTrend}>
                  <TrendingUp size={14} color="#10B981" />
                  <Text style={[styles.commandMetricTrendText, { color: '#10B981' }]}>+3.2%</Text>
                  <Text style={[styles.commandMetricPeriod, { color: 'rgba(255,255,255,0.5)' }]}>Effectiveness</Text>
                </View>
              </View>

              <View style={[styles.commandMetricCard, { backgroundColor: 'rgba(255,255,255,0.03)', borderColor: 'rgba(139, 92, 246, 0.3)' }]}>
                <View style={styles.commandMetricHeader}>
                  <Activity size={20} color="#8B5CF6" />
                  <Text style={[styles.commandMetricLabel, { color: 'rgba(255,255,255,0.7)' }]}>Factory Utilization</Text>
                </View>
                <Text style={[styles.commandMetricValue, { color: '#8B5CF6' }]}>89%</Text>
                <View style={styles.commandMetricTrend}>
                  <TrendingUp size={14} color="#10B981" />
                  <Text style={[styles.commandMetricTrendText, { color: '#10B981' }]}>+4.5%</Text>
                  <Text style={[styles.commandMetricPeriod, { color: 'rgba(255,255,255,0.5)' }]}>Capacity</Text>
                </View>
              </View>

              <View style={[styles.commandMetricCard, { backgroundColor: 'rgba(255,255,255,0.03)', borderColor: 'rgba(255, 107, 53, 0.3)' }]}>
                <View style={styles.commandMetricHeader}>
                  <CheckCircle size={20} color="#FF6B35" />
                  <Text style={[styles.commandMetricLabel, { color: 'rgba(255,255,255,0.7)' }]}>Quality Yield</Text>
                </View>
                <Text style={[styles.commandMetricValue, { color: '#FF6B35' }]}>98.7%</Text>
                <View style={styles.commandMetricTrend}>
                  <TrendingUp size={14} color="#10B981" />
                  <Text style={[styles.commandMetricTrendText, { color: '#10B981' }]}>+1.2%</Text>
                  <Text style={[styles.commandMetricPeriod, { color: 'rgba(255,255,255,0.5)' }]}>First-pass yield</Text>
                </View>
              </View>

              <View style={[styles.commandMetricCard, { backgroundColor: 'rgba(255,255,255,0.03)', borderColor: 'rgba(236, 72, 153, 0.3)' }]}>
                <View style={styles.commandMetricHeader}>
                  <Zap size={20} color="#EC4899" />
                  <Text style={[styles.commandMetricLabel, { color: 'rgba(255,255,255,0.7)' }]}>AI Cost Savings</Text>
                </View>
                <Text style={[styles.commandMetricValue, { color: '#EC4899' }]}>$48.2M</Text>
                <View style={styles.commandMetricTrend}>
                  <TrendingUp size={14} color="#10B981" />
                  <Text style={[styles.commandMetricTrendText, { color: '#10B981' }]}>+22.4%</Text>
                  <Text style={[styles.commandMetricPeriod, { color: 'rgba(255,255,255,0.5)' }]}>Annual impact</Text>
                </View>
              </View>
            </View>

            {/* Factory Health Overview */}
            <View style={styles.commandCenterHealth}>
              <View style={styles.healthOverview}>
                <Text style={[styles.healthOverviewTitle, { color: '#FFFFFF' }]}>Factory Health Score</Text>
                <View style={styles.healthScoreContainer}>
                  <Text style={[styles.healthScore, { color: '#10B981' }]}>93%</Text>
                  <View style={styles.healthScoreIndicator}>
                    <View style={[styles.healthScoreBar, { width: '93%', backgroundColor: '#10B981' }]} />
                  </View>
                </View>
                <Text style={[styles.healthScoreDescription, { color: 'rgba(255,255,255,0.6)' }]}>Excellent - All factory systems optimal</Text>
              </View>

              <View style={styles.healthBreakdown}>
                <Text style={[styles.healthBreakdownTitle, { color: '#FFFFFF' }]}>Health Breakdown</Text>
                <View style={styles.healthBreakdownItems}>
                  <View style={styles.healthBreakdownItem}>
                    <View style={[styles.healthBreakdownDot, { backgroundColor: '#00D4FF' }]} />
                    <Text style={[styles.healthBreakdownLabel, { color: 'rgba(255,255,255,0.7)' }]}>Equipment</Text>
                    <Text style={[styles.healthBreakdownValue, { color: '#00D4FF' }]}>94%</Text>
                  </View>
                  <View style={styles.healthBreakdownItem}>
                    <View style={[styles.healthBreakdownDot, { backgroundColor: '#10B981' }]} />
                    <Text style={[styles.healthBreakdownLabel, { color: 'rgba(255,255,255,0.7)' }]}>Production</Text>
                    <Text style={[styles.healthBreakdownValue, { color: '#10B981' }]}>92%</Text>
                  </View>
                  <View style={styles.healthBreakdownItem}>
                    <View style={[styles.healthBreakdownDot, { backgroundColor: '#8B5CF6' }]} />
                    <Text style={[styles.healthBreakdownLabel, { color: 'rgba(255,255,255,0.7)' }]}>Quality</Text>
                    <Text style={[styles.healthBreakdownValue, { color: '#8B5CF6' }]}>95%</Text>
                  </View>
                  <View style={styles.healthBreakdownItem}>
                    <View style={[styles.healthBreakdownDot, { backgroundColor: '#FF6B35' }]} />
                    <Text style={[styles.healthBreakdownLabel, { color: 'rgba(255,255,255,0.7)' }]}>Supply Chain</Text>
                    <Text style={[styles.healthBreakdownValue, { color: '#FF6B35' }]}>91%</Text>
                  </View>
                </View>
              </View>
            </View>

            {/* Production Trend Visualization */}
            <View style={styles.productionTrendSection}>
              <View style={styles.productionTrendHeader}>
                <LineChart size={16} color="#06B6D4" />
                <Text style={[styles.productionTrendTitle, { color: '#FFFFFF' }]}>Production Trend Analytics</Text>
              </View>
              <View style={styles.productionTrendVisualization}>
                <View style={styles.productionTrendBars}>
                  {[
                    { month: 'Jan', value: 72, target: 80 },
                    { month: 'Feb', value: 78, target: 82 },
                    { month: 'Mar', value: 81, target: 84 },
                    { month: 'Apr', value: 85, target: 86 },
                    { month: 'May', value: 89, target: 88 },
                    { month: 'Jun', value: 93, target: 90 },
                  ].map((data, index) => (
                    <View key={index} style={styles.productionTrendBar}>
                      <View style={[
                        styles.productionTrendBarFill,
                        { 
                          height: `${data.value}%`,
                          backgroundColor: data.value >= 90 ? '#10B981' : data.value >= 80 ? '#06B6D4' : '#F59E0B'
                        }
                      ]} />
                      <View style={[
                        styles.productionTrendTargetLine,
                        { 
                          bottom: `${data.target}%`,
                          backgroundColor: 'rgba(255,255,255,0.3)'
                        }
                      ]} />
                      <Text style={[styles.productionTrendLabel, { color: 'rgba(255,255,255,0.6)' }]}>{data.month}</Text>
                      <Text style={[styles.productionTrendValue, { color: data.value >= 90 ? '#10B981' : data.value >= 80 ? '#06B6D4' : '#F59E0B' }]}>{data.value}%</Text>
                    </View>
                  ))}
                </View>
              </View>
            </View>

            {/* Cost Savings Attribution */}
            <View style={styles.costSavingsAttribution}>
              <View style={styles.costSavingsHeader}>
                <PieChart size={16} color="#EC4899" />
                <Text style={[styles.costSavingsTitle, { color: '#FFFFFF' }]}>AI Cost Savings by Category</Text>
                <View style={styles.totalSavingsBadge}>
                  <Text style={styles.totalSavingsText}>$48.2M Total</Text>
                </View>
              </View>
              <View style={styles.costSavingsList}>
                {[
                  { category: 'Predictive Maintenance', value: '$18.4M', percentage: 38, color: '#00D4FF' },
                  { category: 'Production Optimization', value: '$14.2M', percentage: 29, color: '#10B981' },
                  { category: 'Quality Improvement', value: '$8.4M', percentage: 17, color: '#8B5CF6' },
                  { category: 'Energy Efficiency', value: '$4.2M', percentage: 9, color: '#FF6B35' },
                  { category: 'Supply Chain', value: '$3.0M', percentage: 7, color: '#EC4899' },
                ].map((item, index) => (
                  <View key={index} style={styles.costSavingsItem}>
                    <View style={styles.costSavingsInfo}>
                      <View style={[styles.costSavingsDot, { backgroundColor: item.color }]} />
                      <Text style={[styles.costSavingsCategory, { color: 'rgba(255,255,255,0.8)' }]}>{item.category}</Text>
                    </View>
                    <View style={styles.costSavingsMetrics}>
                      <Text style={[styles.costSavingsValue, { color: '#FFFFFF' }]}>{item.value}</Text>
                      <View style={[
                        styles.costSavingsBar,
                        { width: `${item.percentage}%`, backgroundColor: item.color }
                      ]} />
                    </View>
                  </View>
                ))}
              </View>
            </View>
          </View>
        </View>

        {/* Production Operations Center */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <View style={styles.sectionTitleContainer}>
              <Workflow size={20} color="#06B6D4" />
              <Text style={[styles.sectionTitle, { color: '#FFFFFF' }]}>Production Operations Center</Text>
            </View>
            <View style={styles.productionStats}>
              <Text style={[styles.productionStat, { color: '#10B981' }]}>3 Running</Text>
              <Text style={[styles.productionStat, { color: '#F59E0B' }]}>1 Maintenance</Text>
            </View>
          </View>
          <View style={[styles.productionOperationsContainer, { backgroundColor: theme.colors.card, borderWidth: 1.5, borderColor: 'rgba(6, 182, 212, 0.2)' }]}>
            <View style={styles.productionWorkflow}>
              <Text style={[styles.productionWorkflowTitle, { color: '#FFFFFF' }]}>Production Workflow</Text>
              <View style={styles.productionWorkflowSteps}>
                {[
                  { step: 'Raw Materials', icon: Package, status: 'complete' },
                  { step: 'Production Line', icon: Workflow, status: 'active' },
                  { step: 'Assembly', icon: Cog, status: 'active' },
                  { step: 'Quality Inspection', icon: Microscope, status: 'active' },
                  { step: 'Packaging', icon: Box, status: 'pending' },
                  { step: 'Distribution', icon: Truck, status: 'pending' },
                ].map((workflow, index) => (
                  <View key={index} style={styles.productionWorkflowStep}>
                    <View style={[
                      styles.productionWorkflowIcon,
                      { backgroundColor: workflow.status === 'complete' ? 'rgba(16, 185, 129, 0.2)' : workflow.status === 'active' ? 'rgba(6, 182, 212, 0.2)' : 'rgba(255,255,255,0.1)' }
                    ]}>
                      <workflow.icon size={20} color={workflow.status === 'complete' ? '#10B981' : workflow.status === 'active' ? '#06B6D4' : 'rgba(255,255,255,0.4)'} />
                    </View>
                    <Text style={[styles.productionWorkflowStepText, { color: workflow.status === 'complete' ? '#10B981' : workflow.status === 'active' ? '#06B6D4' : 'rgba(255,255,255,0.4)' }]}>{workflow.step}</Text>
                    {index < 5 && <ArrowDownRight size={16} color="rgba(255,255,255,0.3)" />}
                  </View>
                ))}
              </View>
            </View>
            
            <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.productionLinesScroll}>
              {productionLines.map(renderProductionLineCard)}
            </ScrollView>
          </View>
        </View>

        {/* Smart Factory Monitor */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Smart Factory Monitor</Text>
          <View style={[styles.smartFactoryContainer, { backgroundColor: theme.colors.card }]}>
            <View style={styles.smartFactoryHeader}>
              <View style={styles.smartFactoryTitle}>
                <Factory size={20} color="#06B6D4" />
                <Text style={[styles.smartFactoryTitleText, { color: '#FFFFFF' }]}>Digital Factory Twin</Text>
              </View>
              <View style={styles.smartFactoryStats}>
                <View style={styles.smartFactoryStat}>
                  <Text style={[styles.smartFactoryStatValue, { color: '#10B981' }]}>12,480</Text>
                  <Text style={[styles.smartFactoryStatLabel, { color: theme.colors.textSecondary }]}>Machines</Text>
                </View>
                <View style={styles.smartFactoryStat}>
                  <Text style={[styles.smartFactoryStatValue, { color: '#06B6D4' }]}>94%</Text>
                  <Text style={[styles.smartFactoryStatLabel, { color: theme.colors.textSecondary }]}>Operational</Text>
                </View>
                <View style={styles.smartFactoryStat}>
                  <Text style={[styles.smartFactoryStatValue, { color: '#8B5CF6' }]}>89%</Text>
                  <Text style={[styles.smartFactoryStatLabel, { color: theme.colors.textSecondary }]}>Utilization</Text>
                </View>
              </View>
            </View>
            
            {/* Digital Factory Twin Visualization */}
            <View style={styles.factoryTwinVisualization}>
              <View style={styles.factoryTwinHeader}>
                <View style={styles.pulsingIndicator}>
                  <Radio size={16} color="#06B6D4" />
                </View>
                <Text style={[styles.factoryTwinTitle, { color: '#FFFFFF' }]}>Real-time Factory Floor Map</Text>
                <View style={styles.twinStatusBadge}>
                  <Text style={styles.twinStatusText}>LIVE TWIN</Text>
                </View>
              </View>
              <View style={styles.factoryFloorGrid}>
                {[
                  { id: 1, name: 'Zone A', status: 'operational', utilization: 94, color: '#10B981' },
                  { id: 2, name: 'Zone B', status: 'operational', utilization: 89, color: '#10B981' },
                  { id: 3, name: 'Zone C', status: 'warning', utilization: 72, color: '#F59E0B' },
                  { id: 4, name: 'Zone D', status: 'operational', utilization: 91, color: '#10B981' },
                  { id: 5, name: 'Zone E', status: 'operational', utilization: 96, color: '#10B981' },
                  { id: 6, name: 'Zone F', status: 'maintenance', utilization: 0, color: '#EF4444' },
                  { id: 7, name: 'Zone G', status: 'operational', utilization: 88, color: '#10B981' },
                  { id: 8, name: 'Zone H', status: 'operational', utilization: 92, color: '#10B981' },
                ].map((zone) => (
                  <View key={zone.id} style={[styles.factoryZone, { backgroundColor: zone.color + '20', borderColor: zone.color + '50', borderWidth: 1.5 }]}>
                    <View style={styles.zoneHeader}>
                      <Text style={[styles.zoneName, { color: '#FFFFFF' }]}>{zone.name}</Text>
                      <View style={[styles.zoneStatusDot, { backgroundColor: zone.color, shadowColor: zone.color, shadowOffset: { width: 0, height: 0 }, shadowOpacity: 0.5, shadowRadius: 8 }]} />
                    </View>
                    <Text style={[styles.zoneUtilization, { color: zone.color, textShadowColor: zone.color, textShadowOffset: { width: 0, height: 0 }, textShadowRadius: 10 }]}>{zone.utilization}%</Text>
                    <Text style={[styles.zoneStatus, { color: 'rgba(255,255,255,0.7)' }]}>{zone.status}</Text>
                    <View style={styles.zoneActivityBar}>
                      <View style={[styles.zoneActivityFill, { width: `${zone.utilization}%`, backgroundColor: zone.color }]} />
                    </View>
                  </View>
                ))}
              </View>
            </View>

            {/* Production Floor Heatmap */}
            <View style={styles.heatmapSection}>
              <View style={styles.heatmapHeader}>
                <Gauge size={16} color="#F59E0B" />
                <Text style={[styles.heatmapTitle, { color: '#FFFFFF' }]}>Production Floor Heatmap</Text>
                <View style={styles.heatmapStats}>
                  <Text style={[styles.heatmapStat, { color: '#10B981' }]}>Avg: 87%</Text>
                  <Text style={[styles.heatmapStat, { color: '#06B6D4' }]}>Peak: 97%</Text>
                </View>
              </View>
              <View style={styles.heatmapLegend}>
                <View style={styles.heatmapLegendItem}>
                  <View style={[styles.heatmapLegendColor, { backgroundColor: '#10B981' }]} />
                  <Text style={[styles.heatmapLegendText, { color: 'rgba(255,255,255,0.7)' }]}>High Efficiency</Text>
                </View>
                <View style={styles.heatmapLegendItem}>
                  <View style={[styles.heatmapLegendColor, { backgroundColor: '#06B6D4' }]} />
                  <Text style={[styles.heatmapLegendText, { color: 'rgba(255,255,255,0.7)' }]}>Normal</Text>
                </View>
                <View style={styles.heatmapLegendItem}>
                  <View style={[styles.heatmapLegendColor, { backgroundColor: '#F59E0B' }]} />
                  <Text style={[styles.heatmapLegendText, { color: 'rgba(255,255,255,0.7)' }]}>Warning</Text>
                </View>
                <View style={styles.heatmapLegendItem}>
                  <View style={[styles.heatmapLegendColor, { backgroundColor: '#EF4444' }]} />
                  <Text style={[styles.heatmapLegendText, { color: 'rgba(255,255,255,0.7)' }]}>Critical</Text>
                </View>
              </View>
              <View style={styles.heatmapGrid}>
                {[
                  { efficiency: 94, label: 'Line 1' },
                  { efficiency: 89, label: 'Line 2' },
                  { efficiency: 72, label: 'Line 3' },
                  { efficiency: 91, label: 'Line 4' },
                  { efficiency: 96, label: 'Line 5' },
                  { efficiency: 0, label: 'Line 6' },
                  { efficiency: 88, label: 'Line 7' },
                  { efficiency: 92, label: 'Line 8' },
                  { efficiency: 85, label: 'Line 9' },
                  { efficiency: 97, label: 'Line 10' },
                  { efficiency: 78, label: 'Line 11' },
                  { efficiency: 93, label: 'Line 12' },
                ].map((item, index) => (
                  <View key={index} style={[
                    styles.heatmapCell,
                    { 
                      backgroundColor: item.efficiency >= 90 ? 'rgba(16, 185, 129, 0.7)' : 
                                     item.efficiency >= 80 ? 'rgba(6, 182, 212, 0.7)' :
                                     item.efficiency >= 70 ? 'rgba(245, 158, 11, 0.7)' :
                                     item.efficiency > 0 ? 'rgba(239, 68, 68, 0.7)' : 'rgba(107, 114, 128, 0.3)',
                      borderColor: item.efficiency >= 90 ? '#10B981' : 
                                   item.efficiency >= 80 ? '#06B6D4' :
                                   item.efficiency >= 70 ? '#F59E0B' :
                                   item.efficiency > 0 ? '#EF4444' : '#6B7280',
                      borderWidth: 1.5,
                      shadowColor: item.efficiency >= 90 ? '#10B981' : 
                                   item.efficiency >= 80 ? '#06B6D4' :
                                   item.efficiency >= 70 ? '#F59E0B' :
                                   item.efficiency > 0 ? '#EF4444' : '#6B7280',
                      shadowOffset: { width: 0, height: 0 },
                      shadowOpacity: 0.4,
                      shadowRadius: 8,
                    }
                  ]}>
                    <Text style={[styles.heatmapCellLabel, { color: '#FFFFFF', fontWeight: '600' }]}>{item.label}</Text>
                    <Text style={[styles.heatmapCellValue, { color: '#FFFFFF', textShadowColor: 'rgba(0,0,0,0.5)', textShadowOffset: { width: 0, height: 1 }, textShadowRadius: 3 }]}>{item.efficiency}%</Text>
                  </View>
                ))}
              </View>
            </View>
            
            <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.machinesScroll}>
              {machines.map(renderMachineCard)}
            </ScrollView>
          </View>
        </View>

        {/* Quality Control Intelligence Hub */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <View style={styles.sectionTitleContainer}>
              <Microscope size={20} color="#06B6D4" />
              <Text style={[styles.sectionTitle, { color: '#FFFFFF' }]}>Quality Control Intelligence Hub</Text>
            </View>
            <View style={styles.qualityBadge}>
              <Text style={styles.qualityBadgeText}>99.1% Accuracy</Text>
            </View>
          </View>
          <View style={[styles.qualityControlContainer, { backgroundColor: theme.colors.card, borderWidth: 1.5, borderColor: 'rgba(6, 182, 212, 0.2)' }]}>
            <View style={styles.qualityControlHeader}>
              <Microscope size={20} color="#06B6D4" />
              <Text style={[styles.qualityControlTitle, { color: '#FFFFFF' }]}>Quality Metrics Dashboard</Text>
            </View>
            <View style={styles.qualityMetricsGrid}>
              {qualityMetrics.map((metric) => (
                <View key={metric.id} style={[styles.qualityMetricCard, { backgroundColor: 'rgba(255,255,255,0.03)', borderColor: metric.status === 'good' ? 'rgba(16, 185, 129, 0.3)' : metric.status === 'warning' ? 'rgba(245, 158, 11, 0.3)' : 'rgba(239, 68, 68, 0.3)' }]}>
                  <Text style={[styles.qualityMetricName, { color: theme.colors.text }]}>{metric.metric}</Text>
                  <Text style={[styles.qualityMetricValue, { color: metric.status === 'good' ? '#10B981' : metric.status === 'warning' ? '#F59E0B' : '#EF4444' }]}>{metric.value}</Text>
                  <Text style={[styles.qualityMetricTarget, { color: theme.colors.textSecondary }]}>Target: {metric.target}</Text>
                  <View style={[
                    styles.qualityMetricTrendBadge,
                    { backgroundColor: metric.trend === 'up' ? 'rgba(16, 185, 129, 0.15)' : metric.trend === 'down' ? 'rgba(239, 68, 68, 0.15)' : 'rgba(255,255,255,0.1)' }
                  ]}>
                    {metric.trend === 'up' ? <TrendingUp size={12} color="#10B981" /> : 
                     metric.trend === 'down' ? <TrendingDown size={12} color="#EF4444" /> : 
                     <Activity size={12} color="rgba(255,255,255,0.6)" />}
                  </View>
                </View>
              ))}
            </View>
          </View>
        </View>

        {/* Predictive Maintenance War Room */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <View style={styles.sectionTitleContainer}>
              <Wrench size={20} color="#06B6D4" />
              <Text style={[styles.sectionTitle, { color: '#FFFFFF' }]}>Predictive Maintenance War Room</Text>
            </View>
            <View style={styles.maintenanceStats}>
              <Text style={[styles.maintenanceStat, { color: '#EF4444' }]}>3 Alerts</Text>
              <Text style={[styles.maintenanceStat, { color: '#10B981' }]}>96% Health</Text>
            </View>
          </View>
          <View style={[styles.maintenanceContainer, { backgroundColor: theme.colors.card, borderWidth: 1.5, borderColor: 'rgba(6, 182, 212, 0.2)' }]}>
            <View style={styles.maintenanceHeader}>
              <Wrench size={20} color="#06B6D4" />
              <Text style={[styles.maintenanceTitle, { color: '#FFFFFF' }]}>Maintenance Alerts & Schedule</Text>
            </View>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.maintenanceAlertsScroll}>
              {maintenanceAlerts.map(renderMaintenanceAlertCard)}
            </ScrollView>
          </View>
        </View>

        {/* Inventory & Materials Management */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <View style={styles.sectionTitleContainer}>
              <Warehouse size={20} color="#06B6D4" />
              <Text style={[styles.sectionTitle, { color: '#FFFFFF' }]}>Inventory & Materials Management</Text>
            </View>
            <View style={styles.inventoryStats}>
              <Text style={[styles.inventoryStat, { color: '#10B981' }]}>99.2% Accuracy</Text>
              <Text style={[styles.inventoryStat, { color: '#F59E0B' }]}>1 Low Stock</Text>
            </View>
          </View>
          <View style={[styles.inventoryContainer, { backgroundColor: theme.colors.card, borderWidth: 1.5, borderColor: 'rgba(6, 182, 212, 0.2)' }]}>
            <View style={styles.inventorySectionHeader}>
              <Warehouse size={20} color="#06B6D4" />
              <Text style={[styles.inventoryTitle, { color: '#FFFFFF' }]}>Inventory Overview</Text>
            </View>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.inventoryScroll}>
              {inventoryItems.map(renderInventoryCard)}
            </ScrollView>
          </View>
        </View>

        {/* Workforce Operations Center */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <View style={styles.sectionTitleContainer}>
              <Users size={20} color="#06B6D4" />
              <Text style={[styles.sectionTitle, { color: '#FFFFFF' }]}>Workforce Operations Center</Text>
            </View>
            <View style={styles.workforceStats}>
              <Text style={[styles.workforceStat, { color: '#10B981' }]}>87% Utilization</Text>
              <Text style={[styles.workforceStat, { color: '#8B5CF6' }]}>1,247 Active</Text>
            </View>
          </View>
          <View style={[styles.workforceContainer, { backgroundColor: theme.colors.card, borderWidth: 1.5, borderColor: 'rgba(6, 182, 212, 0.2)' }]}>
            <View style={styles.workforceHeader}>
              <Users size={20} color="#06B6D4" />
              <Text style={[styles.workforceTitle, { color: '#FFFFFF' }]}>Workforce Analytics</Text>
            </View>
            <View style={styles.workforceMetricsGrid}>
              {workforceMetrics.map((metric) => (
                <View key={metric.id} style={[styles.workforceMetricCard, { backgroundColor: 'rgba(255,255,255,0.03)', borderColor: 'rgba(6, 182, 212, 0.2)' }]}>
                  <Text style={[styles.workforceMetricName, { color: theme.colors.text }]}>{metric.metric}</Text>
                  <Text style={[styles.workforceMetricValue, { color: '#06B6D4' }]}>{metric.value}</Text>
                  <View style={[
                    styles.workforceMetricTrendBadge,
                    { backgroundColor: metric.trend === 'up' ? 'rgba(16, 185, 129, 0.15)' : metric.trend === 'down' ? 'rgba(239, 68, 68, 0.15)' : 'rgba(255,255,255,0.1)' }
                  ]}>
                    {metric.trend === 'up' ? <TrendingUp size={12} color="#10B981" /> : 
                     metric.trend === 'down' ? <TrendingDown size={12} color="#EF4444" /> : 
                     <Activity size={12} color="rgba(255,255,255,0.6)" />}
                    <Text style={[
                      styles.workforceMetricTrendText,
                      { color: metric.trend === 'up' ? '#10B981' : metric.trend === 'down' ? '#EF4444' : 'rgba(255,255,255,0.6)' }
                    ]}>{metric.change}</Text>
                  </View>
                </View>
              ))}
            </View>
          </View>
        </View>

        {/* Supply Chain Synchronization Hub */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <View style={styles.sectionTitleContainer}>
              <Truck size={20} color="#06B6D4" />
              <Text style={[styles.sectionTitle, { color: '#FFFFFF' }]}>Supply Chain Synchronization Hub</Text>
            </View>
            <View style={styles.supplyChainStats}>
              <Text style={[styles.supplyChainStat, { color: '#10B981' }]}>94% On-Time</Text>
              <Text style={[styles.supplyChainStat, { color: '#8B5CF6' }]}>42 Suppliers</Text>
            </View>
          </View>
          <View style={[styles.supplyChainContainer, { backgroundColor: theme.colors.card, borderWidth: 1.5, borderColor: 'rgba(6, 182, 212, 0.2)' }]}>
            <View style={styles.supplyChainHeader}>
              <Truck size={20} color="#06B6D4" />
              <Text style={[styles.supplyChainTitle, { color: '#FFFFFF' }]}>Supplier Performance</Text>
            </View>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.suppliersScroll}>
              {suppliers.map(renderSupplierCard)}
            </ScrollView>
          </View>
        </View>

        {/* Energy & Sustainability Center */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <View style={styles.sectionTitleContainer}>
              <Leaf size={20} color="#06B6D4" />
              <Text style={[styles.sectionTitle, { color: '#FFFFFF' }]}>Energy & Sustainability Center</Text>
            </View>
            <View style={styles.energyStats}>
              <Text style={[styles.energyStat, { color: '#10B981' }]}>-8.4% Carbon</Text>
              <Text style={[styles.energyStat, { color: '#06B6D4' }]}>42% Renewable</Text>
            </View>
          </View>
          <View style={[styles.energyContainer, { backgroundColor: theme.colors.card, borderWidth: 1.5, borderColor: 'rgba(6, 182, 212, 0.2)' }]}>
            <View style={styles.energyHeader}>
              <Leaf size={20} color="#06B6D4" />
              <Text style={[styles.energyTitle, { color: '#FFFFFF' }]}>Sustainability Metrics</Text>
            </View>
            <View style={styles.energyMetricsGrid}>
              {energyMetrics.map((metric) => (
                <View key={metric.id} style={[styles.energyMetricCard, { backgroundColor: 'rgba(255,255,255,0.03)', borderColor: 'rgba(6, 182, 212, 0.2)' }]}>
                  <Text style={[styles.energyMetricName, { color: theme.colors.text }]}>{metric.metric}</Text>
                  <Text style={[styles.energyMetricValue, { color: '#10B981' }]}>{metric.value} {metric.unit}</Text>
                  <Text style={[styles.energyMetricTarget, { color: theme.colors.textSecondary }]}>Target: {metric.target} {metric.unit}</Text>
                  <View style={[
                    styles.energyMetricTrendBadge,
                    { backgroundColor: metric.trend === 'up' ? 'rgba(16, 185, 129, 0.15)' : metric.trend === 'down' ? 'rgba(239, 68, 68, 0.15)' : 'rgba(255,255,255,0.1)' }
                  ]}>
                    {metric.trend === 'up' ? <TrendingUp size={12} color="#10B981" /> : 
                     metric.trend === 'down' ? <TrendingDown size={12} color="#EF4444" /> : 
                     <Activity size={12} color="rgba(255,255,255,0.6)" />}
                    <Text style={[
                      styles.energyMetricTrendText,
                      { color: metric.trend === 'up' ? '#10B981' : metric.trend === 'down' ? '#EF4444' : 'rgba(255,255,255,0.6)' }
                    ]}>{metric.change}</Text>
                  </View>
                </View>
              ))}
            </View>
          </View>
        </View>

        {/* AI Manufacturing Insights */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <View style={styles.sectionTitleContainer}>
              <Brain size={20} color="#06B6D4" />
              <Text style={[styles.sectionTitle, { color: '#FFFFFF' }]}>AI Manufacturing Insights</Text>
            </View>
            <View style={styles.insightsStats}>
              <Text style={[styles.insightsStat, { color: '#8B5CF6' }]}>5 Active</Text>
              <Text style={[styles.insightsStat, { color: '#10B981' }]}>94% Confidence</Text>
            </View>
          </View>
          <View style={[styles.insightsContainer, { backgroundColor: theme.colors.card, borderWidth: 1.5, borderColor: 'rgba(6, 182, 212, 0.2)' }]}>
            {manufacturingInsights.map((insight) => (
              <View key={insight.id} style={[styles.insightCard, { backgroundColor: 'rgba(255,255,255,0.03)', borderColor: insight.impact === 'high' ? 'rgba(239, 68, 68, 0.3)' : insight.impact === 'medium' ? 'rgba(245, 158, 11, 0.3)' : 'rgba(6, 182, 212, 0.3)' }]}>
                <View style={styles.insightHeader}>
                  <Brain size={16} color={insight.impact === 'high' ? '#EF4444' : insight.impact === 'medium' ? '#F59E0B' : '#06B6D4'} />
                  <Text style={[styles.insightCategory, { color: theme.colors.textSecondary }]}>{insight.category}</Text>
                  <Text style={[styles.insightConfidence, { color: '#8B5CF6' }]}>{insight.confidence}%</Text>
                </View>
                <Text style={[styles.insightText, { color: theme.colors.text }]}>{insight.insight}</Text>
                <View style={styles.insightFooter}>
                  <Text style={[styles.insightTimestamp, { color: 'rgba(255,255,255,0.5)' }]}>{insight.timestamp}</Text>
                  <View style={[styles.insightImpactBadge, { backgroundColor: insight.impact === 'high' ? 'rgba(239, 68, 68, 0.15)' : insight.impact === 'medium' ? 'rgba(245, 158, 11, 0.15)' : 'rgba(6, 182, 212, 0.15)' }]}>
                    <Text style={[styles.insightImpactText, { color: insight.impact === 'high' ? '#EF4444' : insight.impact === 'medium' ? '#F59E0B' : '#06B6D4' }]}>{insight.impact} impact</Text>
                  </View>
                </View>
              </View>
            ))}
          </View>
        </View>

        {/* Real-time Factory Activity Feed */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <View style={styles.sectionTitleContainer}>
              <Activity size={20} color="#06B6D4" />
              <Text style={[styles.sectionTitle, { color: '#FFFFFF' }]}>Real-time Factory Activity Feed</Text>
            </View>
            <View style={styles.activityStats}>
              <View style={styles.liveIndicator}>
                <View style={styles.liveDot} />
                <Text style={styles.liveText}>LIVE</Text>
              </View>
            </View>
          </View>
          <View style={[styles.activityFeedContainer, { backgroundColor: theme.colors.card, borderWidth: 1.5, borderColor: 'rgba(6, 182, 212, 0.2)' }]}>
            {factoryActivities.map((activity) => (
              <View key={activity.id} style={styles.activityFeedItem}>
                <View style={[
                  styles.activityFeedIcon,
                  { backgroundColor: activity.type === 'production' ? 'rgba(16, 185, 129, 0.15)' : 
                                 activity.type === 'maintenance' ? 'rgba(245, 158, 11, 0.15)' :
                                 activity.type === 'quality' ? 'rgba(239, 68, 68, 0.15)' :
                                 activity.type === 'inventory' ? 'rgba(6, 182, 212, 0.15)' :
                                 activity.type === 'supplier' ? 'rgba(139, 92, 246, 0.15)' :
                                 activity.type === 'safety' ? 'rgba(239, 68, 68, 0.15)' :
                                 'rgba(236, 72, 153, 0.15)' }
                ]}>
                  {activity.type === 'production' && <Factory size={16} color="#10B981" />}
                  {activity.type === 'maintenance' && <Wrench size={16} color="#F59E0B" />}
                  {activity.type === 'quality' && <Microscope size={16} color="#EF4444" />}
                  {activity.type === 'inventory' && <Package size={16} color="#06B6D4" />}
                  {activity.type === 'supplier' && <Truck size={16} color="#8B5CF6" />}
                  {activity.type === 'safety' && <ShieldCheck size={16} color="#EF4444" />}
                  {activity.type === 'ai' && <Brain size={16} color="#EC4899" />}
                </View>
                <View style={styles.activityFeedContent}>
                  <Text style={[styles.activityFeedEvent, { color: theme.colors.text }]}>{activity.event}</Text>
                  {activity.details && <Text style={[styles.activityFeedDetails, { color: theme.colors.textSecondary }]}>{activity.details}</Text>}
                  <Text style={[styles.activityFeedTimestamp, { color: 'rgba(255,255,255,0.5)' }]}>{activity.timestamp}</Text>
                </View>
              </View>
            ))}
          </View>
        </View>

        {/* Factory System Health */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <View style={styles.sectionTitleContainer}>
              <Server size={20} color="#06B6D4" />
              <Text style={[styles.sectionTitle, { color: '#FFFFFF' }]}>Factory System Health</Text>
            </View>
            <View style={styles.systemHealthStats}>
              <Text style={[styles.systemHealthStat, { color: '#10B981' }]}>99.8% Uptime</Text>
              <Text style={[styles.systemHealthStat, { color: '#06B6D4' }]}>28ms Latency</Text>
            </View>
          </View>
          <View style={[styles.systemHealthContainer, { backgroundColor: theme.colors.card, borderWidth: 1.5, borderColor: 'rgba(6, 182, 212, 0.2)' }]}>
            {factorySystemHealth.map((system) => (
              <View key={system.id} style={styles.systemHealthItem}>
                <View style={styles.systemHealthInfo}>
                  <Server size={16} color={system.status === 'healthy' ? '#10B981' : system.status === 'degraded' ? '#F59E0B' : '#EF4444'} />
                  <Text style={[styles.systemHealthName, { color: theme.colors.text }]}>{system.system}</Text>
                </View>
                <View style={styles.systemHealthMetrics}>
                  <View style={[styles.systemHealthStatusBadge, { backgroundColor: system.status === 'healthy' ? 'rgba(16, 185, 129, 0.15)' : system.status === 'degraded' ? 'rgba(245, 158, 11, 0.15)' : 'rgba(239, 68, 68, 0.15)' }]}>
                    <Text style={[styles.systemHealthStatusText, { color: system.status === 'healthy' ? '#10B981' : system.status === 'degraded' ? '#F59E0B' : '#EF4444' }]}>{system.status}</Text>
                  </View>
                  <Text style={[styles.systemHealthUptime, { color: theme.colors.textSecondary }]}>{system.uptime}</Text>
                  <Text style={[styles.systemHealthLatency, { color: theme.colors.textSecondary }]}>{system.latency}</Text>
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative',
  },
  gradientOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'linear-gradient(135deg, rgba(6, 182, 212, 0.03) 0%, rgba(139, 92, 246, 0.02) 50%, rgba(16, 185, 129, 0.03) 100%)',
    pointerEvents: 'none',
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
    flexDirection: 'row',
    flex: 1,
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
    paddingVertical: 12,
    paddingHorizontal: 16,
    marginHorizontal: 8,
    borderRadius: 8,
  },
  sidebarItemText: {
    fontSize: 14,
    fontWeight: '500',
  },
  content: {
    flex: 1,
    padding: 16,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionTitleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  sectionSubtitle: {
    fontSize: 12,
    fontWeight: '600',
  },
  liveIndicator: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 8,
    paddingVertical: 4,
    backgroundColor: 'rgba(239, 68, 68, 0.15)',
    borderRadius: 12,
  },
  liveDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#EF4444',
  },
  liveText: {
    fontSize: 10,
    fontWeight: '700',
    color: '#EF4444',
  },
  pulsingIndicator: {
    position: 'relative',
  },
  // Top Executive Bar
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
    marginBottom: 12,
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
    padding: 12,
    minWidth: 160,
    borderWidth: 1,
  },
  topBarKPITitle: {
    fontSize: 11,
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
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
    alignSelf: 'flex-start',
  },
  topBarKPITrendText: {
    fontSize: 11,
    fontWeight: '600',
  },
  topBarKPISubtitle: {
    fontSize: 10,
  },
  // KPI Cards
  kpiGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  kpiCard: {
    borderRadius: 12,
    padding: 16,
    borderWidth: 1.5,
    width: '48%',
    // Enhanced glassmorphism effect
    shadowColor: '#06B6D4',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 15,
    elevation: 5,
    backdropFilter: 'blur(10px)',
  },
  kpiHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  kpiTitle: {
    fontSize: 13,
    fontWeight: '600',
  },
  kpiTrendBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  kpiTrendText: {
    fontSize: 11,
    fontWeight: '600',
  },
  kpiValue: {
    fontSize: 24,
    fontWeight: '700',
    marginBottom: 4,
  },
  kpiSubtitle: {
    fontSize: 12,
  },
  // Agent Cards
  agentsScroll: {
    marginBottom: 8,
  },
  agentCard: {
    borderRadius: 12,
    padding: 16,
    borderWidth: 1.5,
    minWidth: 280,
    marginRight: 12,
    // Enhanced glassmorphism effect
    shadowColor: '#10B981',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.18,
    shadowRadius: 20,
    elevation: 6,
    backdropFilter: 'blur(10px)',
  },
  agentAvatar: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 12,
  },
  agentAvatarText: {
    fontSize: 28,
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
    fontSize: 15,
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
    fontSize: 16,
    fontWeight: '700',
  },
  agentMetricLabel: {
    fontSize: 11,
  },
  agentInsights: {
    flexDirection: 'row',
    gap: 4,
  },
  agentInsightsCount: {
    fontSize: 18,
    fontWeight: '700',
  },
  agentInsightsLabel: {
    fontSize: 11,
  },
  // Command Center
  commandCenter: {
    borderRadius: 16,
    padding: 20,
    borderWidth: 1.5,
    // Premium glassmorphism effect
    shadowColor: '#06B6D4',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.2,
    shadowRadius: 25,
    elevation: 10,
    backdropFilter: 'blur(15px)',
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
    borderRadius: 8,
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
    borderRadius: 12,
    padding: 16,
    borderWidth: 1.5,
    width: '31%',
    // Enhanced glassmorphism effect
    shadowColor: '#06B6D4',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.15,
    shadowRadius: 15,
    elevation: 5,
    backdropFilter: 'blur(10px)',
  },
  commandMetricHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 8,
  },
  commandMetricLabel: {
    fontSize: 13,
  },
  commandMetricValue: {
    fontSize: 28,
    fontWeight: '700',
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
    gap: 8,
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
  productionTrendSection: {
    marginBottom: 20,
  },
  productionTrendHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 12,
  },
  productionTrendTitle: {
    fontSize: 14,
    fontWeight: '600',
  },
  productionTrendVisualization: {
    backgroundColor: 'rgba(255,255,255,0.02)',
    borderRadius: 8,
    padding: 16,
  },
  productionTrendBars: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    height: 120,
  },
  productionTrendBar: {
    alignItems: 'center',
    gap: 8,
    flex: 1,
  },
  productionTrendBarFill: {
    width: 40,
    borderRadius: 4,
  },
  productionTrendTargetLine: {
    position: 'absolute',
    left: 0,
    right: 0,
    height: 1,
  },
  productionTrendLabel: {
    fontSize: 11,
  },
  productionTrendValue: {
    fontSize: 12,
    fontWeight: '600',
  },
  costSavingsAttribution: {
    marginBottom: 20,
  },
  costSavingsHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 12,
  },
  costSavingsTitle: {
    fontSize: 14,
    fontWeight: '600',
  },
  costSavingsList: {
    gap: 12,
  },
  costSavingsItem: {
    gap: 8,
  },
  costSavingsInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  costSavingsDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  costSavingsCategory: {
    flex: 1,
    fontSize: 13,
  },
  costSavingsMetrics: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  costSavingsValue: {
    fontSize: 14,
    fontWeight: '600',
    minWidth: 80,
  },
  costSavingsBar: {
    height: 6,
    borderRadius: 3,
    width: 100,
  },
  totalSavingsBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    backgroundColor: 'rgba(236, 72, 153, 0.15)',
    borderRadius: 12,
  },
  totalSavingsText: {
    fontSize: 11,
    fontWeight: '700',
    color: '#EC4899',
  },
  supplyChainStats: {
    flexDirection: 'row',
    gap: 12,
  },
  supplyChainStat: {
    fontSize: 11,
    fontWeight: '600',
  },
  maintenanceStats: {
    flexDirection: 'row',
    gap: 12,
  },
  maintenanceStat: {
    fontSize: 11,
    fontWeight: '600',
  },
  inventoryStats: {
    flexDirection: 'row',
    gap: 12,
  },
  inventoryStat: {
    fontSize: 11,
    fontWeight: '600',
  },
  workforceStats: {
    flexDirection: 'row',
    gap: 12,
  },
  workforceStat: {
    fontSize: 11,
    fontWeight: '600',
  },
  energyStats: {
    flexDirection: 'row',
    gap: 12,
  },
  energyStat: {
    fontSize: 11,
    fontWeight: '600',
  },
  insightsStats: {
    flexDirection: 'row',
    gap: 12,
  },
  insightsStat: {
    fontSize: 11,
    fontWeight: '600',
  },
  activityStats: {
    flexDirection: 'row',
    gap: 12,
  },
  systemHealthStats: {
    flexDirection: 'row',
    gap: 12,
  },
  systemHealthStat: {
    fontSize: 11,
    fontWeight: '600',
  },
  // Production Operations
  productionOperationsContainer: {
    borderRadius: 12,
    padding: 16,
  },
  productionWorkflow: {
    marginBottom: 16,
  },
  productionWorkflowTitle: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 12,
  },
  productionWorkflowSteps: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  productionWorkflowStep: {
    alignItems: 'center',
    gap: 8,
  },
  productionWorkflowIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  productionWorkflowStepText: {
    fontSize: 11,
    fontWeight: '600',
  },
  productionLinesScroll: {
    marginBottom: 8,
  },
  productionLineCard: {
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    minWidth: 240,
    marginRight: 12,
    // Glassmorphism effect
    shadowColor: '#10B981',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 4,
  },
  productionLineHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 12,
  },
  productionLineInfo: {
    gap: 4,
  },
  productionLineName: {
    fontSize: 14,
    fontWeight: '600',
  },
  productionLineStatus: {
    fontSize: 11,
    fontWeight: '600',
  },
  productionLineMetrics: {
    flexDirection: 'row',
    gap: 16,
    marginBottom: 12,
  },
  productionLineMetric: {
    gap: 4,
  },
  productionLineMetricValue: {
    fontSize: 16,
    fontWeight: '700',
  },
  productionLineMetricLabel: {
    fontSize: 11,
  },
  productionLineProgress: {
    gap: 6,
  },
  productionLineProgressLabel: {
    fontSize: 11,
  },
  productionLineProgressBar: {
    height: 6,
    borderRadius: 3,
    overflow: 'hidden',
  },
  productionLineProgressFill: {
    height: '100%',
  },
  // Smart Factory
  smartFactoryContainer: {
    borderRadius: 12,
    padding: 16,
  },
  smartFactoryHeader: {
    marginBottom: 16,
  },
  smartFactoryTitle: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 12,
  },
  smartFactoryTitleText: {
    fontSize: 14,
    fontWeight: '600',
  },
  smartFactoryStats: {
    flexDirection: 'row',
    gap: 20,
  },
  smartFactoryStat: {
    gap: 4,
  },
  smartFactoryStatValue: {
    fontSize: 18,
    fontWeight: '700',
  },
  smartFactoryStatLabel: {
    fontSize: 11,
  },
  machinesScroll: {
    marginBottom: 8,
  },
  // Digital Factory Twin
  factoryTwinVisualization: {
    marginBottom: 20,
  },
  factoryTwinHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 12,
  },
  factoryTwinTitle: {
    fontSize: 14,
    fontWeight: '600',
  },
  factoryFloorGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  factoryZone: {
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    width: '23%',
    marginBottom: 8,
  },
  zoneHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  zoneName: {
    fontSize: 13,
    fontWeight: '600',
  },
  zoneStatusDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  zoneUtilization: {
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 4,
  },
  zoneStatus: {
    fontSize: 11,
  },
  zoneActivityBar: {
    height: 4,
    backgroundColor: 'rgba(255,255,255,0.1)',
    borderRadius: 2,
    marginTop: 8,
    overflow: 'hidden',
  },
  zoneActivityFill: {
    height: '100%',
  },
  twinStatusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    backgroundColor: 'rgba(239, 68, 68, 0.15)',
    borderRadius: 12,
  },
  twinStatusText: {
    fontSize: 10,
    fontWeight: '700',
    color: '#EF4444',
  },
  heatmapStats: {
    flexDirection: 'row',
    gap: 12,
  },
  heatmapStat: {
    fontSize: 11,
    fontWeight: '600',
  },
  productionStats: {
    flexDirection: 'row',
    gap: 12,
  },
  productionStat: {
    fontSize: 11,
    fontWeight: '600',
  },
  qualityBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    backgroundColor: 'rgba(16, 185, 129, 0.15)',
    borderRadius: 12,
  },
  qualityBadgeText: {
    fontSize: 11,
    fontWeight: '700',
    color: '#10B981',
  },
  // Production Floor Heatmap
  heatmapSection: {
    marginBottom: 20,
  },
  heatmapHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 12,
  },
  heatmapTitle: {
    fontSize: 14,
    fontWeight: '600',
  },
  heatmapLegend: {
    flexDirection: 'row',
    gap: 16,
    marginBottom: 12,
  },
  heatmapLegendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  heatmapLegendColor: {
    width: 12,
    height: 12,
    borderRadius: 6,
  },
  heatmapLegendText: {
    fontSize: 11,
  },
  heatmapGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  heatmapCell: {
    borderRadius: 8,
    padding: 12,
    borderWidth: 1,
    width: '23%',
    alignItems: 'center',
    gap: 4,
  },
  heatmapCellLabel: {
    fontSize: 11,
    fontWeight: '600',
  },
  heatmapCellValue: {
    fontSize: 16,
    fontWeight: '700',
  },
  machineCard: {
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    minWidth: 220,
    marginRight: 12,
    // Glassmorphism effect
    shadowColor: '#F59E0B',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 4,
  },
  machineHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 12,
  },
  machineInfo: {
    gap: 4,
  },
  machineName: {
    fontSize: 13,
    fontWeight: '600',
  },
  machineType: {
    fontSize: 11,
  },
  machineMetrics: {
    flexDirection: 'row',
    gap: 16,
    marginBottom: 12,
  },
  machineMetric: {
    gap: 4,
  },
  machineMetricValue: {
    fontSize: 16,
    fontWeight: '700',
  },
  machineMetricLabel: {
    fontSize: 11,
  },
  machineTelemetry: {
    flexDirection: 'row',
    gap: 16,
  },
  machineTelemetryItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  machineTelemetryValue: {
    fontSize: 11,
  },
  // Quality Control
  qualityControlContainer: {
    borderRadius: 12,
    padding: 16,
  },
  qualityControlHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 16,
  },
  qualityControlTitle: {
    fontSize: 14,
    fontWeight: '600',
  },
  qualityMetricsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  qualityMetricCard: {
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    width: '31%',
    // Glassmorphism effect
    shadowColor: '#8B5CF6',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 4,
  },
  qualityMetricName: {
    fontSize: 13,
    fontWeight: '600',
    marginBottom: 8,
  },
  qualityMetricValue: {
    fontSize: 24,
    fontWeight: '700',
    marginBottom: 4,
  },
  qualityMetricTarget: {
    fontSize: 11,
    marginBottom: 8,
  },
  qualityMetricTrendBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
    alignSelf: 'flex-start',
  },
  // Maintenance
  maintenanceContainer: {
    borderRadius: 12,
    padding: 16,
  },
  maintenanceHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 16,
  },
  maintenanceTitle: {
    fontSize: 14,
    fontWeight: '600',
  },
  maintenanceAlertsScroll: {
    marginBottom: 8,
  },
  maintenanceAlertCard: {
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    minWidth: 280,
    marginRight: 12,
    // Glassmorphism effect
    shadowColor: '#EF4444',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 4,
  },
  maintenanceAlertHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 12,
  },
  maintenanceAlertInfo: {
    gap: 4,
  },
  maintenanceAlertMachine: {
    fontSize: 13,
    fontWeight: '600',
  },
  maintenanceAlertType: {
    fontSize: 11,
  },
  maintenanceAlertMetrics: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  maintenanceAlertBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  maintenanceAlertPriority: {
    fontSize: 11,
    fontWeight: '600',
  },
  maintenanceAlertTiming: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  maintenanceAlertDowntime: {
    fontSize: 11,
  },
  maintenanceAlertDescription: {
    fontSize: 12,
    marginBottom: 4,
  },
  maintenanceAlertDate: {
    fontSize: 10,
  },
  // Inventory
  inventoryContainer: {
    borderRadius: 12,
    padding: 16,
  },
  inventorySectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 16,
  },
  inventoryTitle: {
    fontSize: 14,
    fontWeight: '600',
  },
  inventoryScroll: {
    marginBottom: 8,
  },
  inventoryCard: {
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    minWidth: 240,
    marginRight: 12,
    // Glassmorphism effect
    shadowColor: '#06B6D4',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 4,
  },
  inventoryCardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 12,
  },
  inventoryInfo: {
    gap: 4,
  },
  inventoryMaterial: {
    fontSize: 13,
    fontWeight: '600',
  },
  inventoryCategory: {
    fontSize: 11,
  },
  inventoryMetrics: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  inventoryMetric: {
    gap: 4,
  },
  inventoryMetricValue: {
    fontSize: 16,
    fontWeight: '700',
  },
  inventoryMetricLabel: {
    fontSize: 11,
  },
  inventoryStatusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  inventoryStatusText: {
    fontSize: 11,
    fontWeight: '600',
  },
  inventoryLocation: {
    fontSize: 10,
  },
  // Workforce
  workforceContainer: {
    borderRadius: 12,
    padding: 16,
  },
  workforceHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 16,
  },
  workforceTitle: {
    fontSize: 14,
    fontWeight: '600',
  },
  workforceMetricsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  workforceMetricCard: {
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    width: '31%',
    // Glassmorphism effect
    shadowColor: '#10B981',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 4,
  },
  workforceMetricName: {
    fontSize: 13,
    fontWeight: '600',
    marginBottom: 8,
  },
  workforceMetricValue: {
    fontSize: 24,
    fontWeight: '700',
    marginBottom: 8,
  },
  workforceMetricTrendBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
    alignSelf: 'flex-start',
  },
  workforceMetricTrendText: {
    fontSize: 11,
    fontWeight: '600',
  },
  // Supply Chain
  supplyChainContainer: {
    borderRadius: 12,
    padding: 16,
  },
  supplyChainHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 16,
  },
  supplyChainTitle: {
    fontSize: 14,
    fontWeight: '600',
  },
  suppliersScroll: {
    marginBottom: 8,
  },
  supplierCard: {
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    minWidth: 260,
    marginRight: 12,
    // Glassmorphism effect
    shadowColor: '#8B5CF6',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 4,
  },
  supplierHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 12,
  },
  supplierInfo: {
    gap: 4,
  },
  supplierName: {
    fontSize: 13,
    fontWeight: '600',
  },
  supplierCategory: {
    fontSize: 11,
  },
  supplierMetrics: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 8,
  },
  supplierMetric: {
    gap: 4,
  },
  supplierMetricValue: {
    fontSize: 14,
    fontWeight: '700',
  },
  supplierMetricLabel: {
    fontSize: 10,
  },
  supplierRiskBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
    alignSelf: 'flex-start',
  },
  supplierRiskText: {
    fontSize: 11,
    fontWeight: '600',
  },
  // Energy
  energyContainer: {
    borderRadius: 12,
    padding: 16,
  },
  energyHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 16,
  },
  energyTitle: {
    fontSize: 14,
    fontWeight: '600',
  },
  energyMetricsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  energyMetricCard: {
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    width: '48%',
    // Glassmorphism effect
    shadowColor: '#10B981',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 4,
  },
  energyMetricName: {
    fontSize: 13,
    fontWeight: '600',
    marginBottom: 8,
  },
  energyMetricValue: {
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 4,
  },
  energyMetricTarget: {
    fontSize: 11,
    marginBottom: 8,
  },
  energyMetricTrendBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
    alignSelf: 'flex-start',
  },
  energyMetricTrendText: {
    fontSize: 11,
    fontWeight: '600',
  },
  // Insights
  insightsContainer: {
    borderRadius: 12,
    padding: 16,
    gap: 12,
  },
  insightCard: {
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    // Glassmorphism effect
    shadowColor: '#EC4899',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 4,
  },
  insightHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 8,
  },
  insightCategory: {
    flex: 1,
    fontSize: 12,
  },
  insightConfidence: {
    fontSize: 12,
    fontWeight: '600',
  },
  insightText: {
    fontSize: 14,
    marginBottom: 8,
  },
  insightFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  insightTimestamp: {
    fontSize: 11,
  },
  insightImpactBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  insightImpactText: {
    fontSize: 11,
    fontWeight: '600',
  },
  // Activity Feed
  activityFeedContainer: {
    borderRadius: 12,
    padding: 16,
    gap: 12,
  },
  activityFeedItem: {
    flexDirection: 'row',
    gap: 12,
    paddingVertical: 8,
  },
  activityFeedIcon: {
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
  },
  activityFeedContent: {
    flex: 1,
    gap: 4,
  },
  activityFeedEvent: {
    fontSize: 13,
    fontWeight: '600',
  },
  activityFeedDetails: {
    fontSize: 12,
  },
  activityFeedTimestamp: {
    fontSize: 11,
  },
  // System Health
  systemHealthContainer: {
    borderRadius: 12,
    padding: 16,
    gap: 12,
  },
  systemHealthItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
  },
  systemHealthInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  systemHealthName: {
    fontSize: 13,
    fontWeight: '600',
  },
  systemHealthMetrics: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  systemHealthStatusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  systemHealthStatusText: {
    fontSize: 11,
    fontWeight: '600',
  },
  systemHealthUptime: {
    fontSize: 11,
  },
  systemHealthLatency: {
    fontSize: 11,
  },
});

export default ManufacturingCommandCenter;
