import React, { useState } from 'react';
import { View, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
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
  Truck,
  Package,
  Warehouse,
  ShoppingCart,
  AlertTriangle,
  Shield,
  DollarSign,
  TrendingUp as TrendingUpIcon,
  Map,
  Navigation,
  Ship,
  Plane,
  Train,
  Factory,
  ArrowRight,
  BarChart2,
  PieChart as PieChartIcon,
  Scan,
  Radio,
  Database,
  Server,
  Cpu,
  HardDrive,
  Wifi,
  Signal,
  Thermometer,
  Wind,
  Cloud,
  Zap as ZapIcon,
  Globe2,
  MapPin,
  Compass,
  Navigation2,
  Route as RouteIcon,
  ShoppingCart2,
  ShoppingCart as ShoppingCartIcon,
  Truck as TruckIcon,
  Ship as ShipIcon,
  Plane as PlaneIcon,
  Train as TrainIcon,
  Factory as FactoryIcon,
  Warehouse as WarehouseIcon,
  Building2,
  Store,
  Building,
  Layers as LayersIcon,
  GitBranch as GitBranchIcon,
  Network as NetworkIcon,
  Activity as ActivityIcon,
  Target as TargetIcon,
  CheckCircle2,
  XCircle,
  AlertOctagon,
  AlertTriangle as AlertTriangleIcon,
  Shield as ShieldIcon,
  ShieldCheck,
  ShieldAlert,
  DollarSign as DollarSignIcon,
  Coins,
  CreditCard,
  Banknote,
  TrendingDown as TrendingDownIcon,
  MinusCircle,
  PlusCircle,
  ArrowUp,
  ArrowDown,
  ArrowRight as ArrowRightIcon,
  ArrowLeft,
  ArrowUpCircle,
  ArrowDownCircle,
  MoreHorizontal,
  Ellipsis,
  Menu,
  Grid,
  List,
  LayoutGrid,
  LayoutList,
  Columns,
  Rows,
  Table,
  Table2,
  Calendar as CalendarIcon,
  CalendarClock,
  CalendarDays,
  Clock as ClockIcon,
  Timer,
  Stopwatch,
  Hourglass,
  AlarmClock,
  Watch,
} from 'lucide-react-native';

// Types
interface SupplyChainAgent {
  id: string;
  name: string;
  specialty: string;
  avatar: string;
  status: 'active' | 'monitoring' | 'paused' | 'error';
  confidenceScore: number;
  economicImpactScore: number;
  metrics: {
    skusManaged?: number;
    forecastAccuracy?: number;
    stockoutReduction?: number;
    suppliersManaged?: number;
    costSavings?: string;
    contractEfficiency?: number;
    risksDetected?: number;
    disruptionsPrevented?: number;
    predictionAccuracy?: number;
  };
  activeInsights: number;
  trend: 'up' | 'down' | 'stable';
}

interface SupplyChainKPI {
  id: string;
  title: string;
  value: string;
  change: string;
  trend: 'up' | 'down' | 'stable';
  color: string;
  subtitle: string;
  riskLevel?: 'low' | 'medium' | 'high' | 'critical';
}

interface SupplyChainNode {
  id: string;
  name: string;
  type: 'supplier' | 'factory' | 'warehouse' | 'distribution' | 'retail' | 'customer';
  status: 'operational' | 'delayed' | 'at-risk' | 'offline';
  capacity: number;
  utilization: number;
  location: string;
}

interface Supplier {
  id: string;
  name: string;
  category: string;
  performance: number;
  onTimeDelivery: number;
  riskScore: number;
  contractStatus: 'active' | 'expiring' | 'expiring-soon' | 'expired';
  spend: string;
  leadTime: number;
}

interface InventoryItem {
  id: string;
  sku: string;
  name: string;
  category: string;
  currentStock: number;
  safetyStock: number;
  reorderPoint: number;
  turnoverRate: number;
  location: string;
  status: 'healthy' | 'low' | 'critical' | 'overstock';
}

interface Shipment {
  id: string;
  origin: string;
  destination: string;
  status: 'in-transit' | 'delivered' | 'delayed' | 'pending';
  carrier: string;
  mode: 'truck' | 'ship' | 'plane' | 'train';
  eta: string;
  progress: number;
}

interface RiskAlert {
  id: string;
  type: 'supplier' | 'geopolitical' | 'weather' | 'port' | 'fuel' | 'demand';
  severity: 'low' | 'medium' | 'high' | 'critical';
  title: string;
  description: string;
  location: string;
  impact: string;
  timestamp: string;
}

interface SupplyChainInsight {
  id: string;
  insight: string;
  category: string;
  confidence: number;
  impact: 'high' | 'medium' | 'low';
  timestamp: string;
  actionRequired: boolean;
}

interface SupplyChainActivity {
  id: string;
  event: string;
  type: 'procurement' | 'inventory' | 'logistics' | 'manufacturing' | 'risk' | 'demand' | 'fulfillment';
  timestamp: string;
  location?: string;
}

interface SystemHealth {
  id: string;
  system: string;
  status: 'healthy' | 'degraded' | 'down';
  uptime: string;
  latency: string;
}

const SupplyChainCommandCenter = () => {
  const theme = useTheme();
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [activeTab, setActiveTab] = useState('dashboard');

  // Navigation Items
  const navigationItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'agents', label: 'AI Supply Chain Agents', icon: Bot },
    { id: 'procurement', label: 'Procurement', icon: ShoppingCart },
    { id: 'suppliers', label: 'Suppliers', icon: Building2 },
    { id: 'inventory', label: 'Inventory', icon: Package },
    { id: 'warehouses', label: 'Warehouses', icon: Warehouse },
    { id: 'manufacturing', label: 'Manufacturing Sync', icon: Factory },
    { id: 'logistics', label: 'Logistics & Transport', icon: Truck },
    { id: 'demand', label: 'Demand Planning', icon: TrendingUp },
    { id: 'risk', label: 'Risk Management', icon: Shield },
    { id: 'analytics', label: 'Analytics', icon: BarChart3 },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  // Supply Chain KPIs
  const supplyChainKPIs: SupplyChainKPI[] = [
    { id: '1', title: 'Fulfillment Rate', value: '97.8%', change: '+2.3%', trend: 'up', color: '#06B6D4', subtitle: 'End-to-end fulfillment', riskLevel: 'low' },
    { id: '2', title: 'Order Cycle Time', value: '4.2d', change: '-0.8d', trend: 'down', color: '#10B981', subtitle: 'Average cycle time', riskLevel: 'low' },
    { id: '3', title: 'Inventory Turnover', value: '8.4', change: '+0.6', trend: 'up', color: '#8B5CF6', subtitle: 'Annual turnover', riskLevel: 'low' },
    { id: '4', title: 'Supplier OTD', value: '94%', change: '+1.2%', trend: 'up', color: '#F59E0B', subtitle: 'On-time delivery', riskLevel: 'medium' },
    { id: '5', title: 'Logistics Cost/Unit', value: '$2.84', change: '-0.12', trend: 'down', color: '#EC4899', subtitle: 'Per unit cost', riskLevel: 'low' },
    { id: '6', title: 'Stockout Risk Index', value: '12', change: '+3', trend: 'up', color: '#EF4444', subtitle: 'Risk score (lower better)', riskLevel: 'medium' },
    { id: '7', title: 'Forecast Accuracy', value: '96%', change: '+2.1%', trend: 'up', color: '#06B6D4', subtitle: 'Demand prediction', riskLevel: 'low' },
    { id: '8', title: 'Warehouse Efficiency', value: '89%', change: '+4.2%', trend: 'up', color: '#10B981', subtitle: 'Throughput rate', riskLevel: 'low' },
    { id: '9', title: 'Transport Utilization', value: '78%', change: '+5.1%', trend: 'up', color: '#8B5CF6', subtitle: 'Fleet utilization', riskLevel: 'low' },
    { id: '10', title: 'AI Savings', value: '$284M', change: '+42M', trend: 'up', color: '#F59E0B', subtitle: 'Annual optimization', riskLevel: 'low' },
  ];

  // AI Supply Chain Agents
  const supplyChainAgents: SupplyChainAgent[] = [
    {
      id: '1',
      name: 'Agent Atlas',
      specialty: 'Demand Forecasting Agent',
      avatar: '🔮',
      status: 'active',
      confidenceScore: 96,
      economicImpactScore: 92,
      metrics: {
        skusManaged: 12800000,
        forecastAccuracy: 96,
        stockoutReduction: 34,
      },
      activeInsights: 156,
      trend: 'up',
    },
    {
      id: '2',
      name: 'Agent Nexus',
      specialty: 'Procurement Optimization Agent',
      avatar: '🛒',
      status: 'active',
      confidenceScore: 94,
      economicImpactScore: 95,
      metrics: {
        suppliersManaged: 48200,
        costSavings: '$184M',
        contractEfficiency: 22,
      },
      activeInsights: 89,
      trend: 'up',
    },
    {
      id: '3',
      name: 'Agent Sentinel',
      specialty: 'Supply Chain Risk Agent',
      avatar: '🛡️',
      status: 'active',
      confidenceScore: 95,
      economicImpactScore: 88,
      metrics: {
        risksDetected: 8420,
        disruptionsPrevented: 1842,
        predictionAccuracy: 95,
      },
      activeInsights: 234,
      trend: 'stable',
    },
    {
      id: '4',
      name: 'Agent Velocity',
      specialty: 'Logistics Optimization Agent',
      avatar: '🚚',
      status: 'active',
      confidenceScore: 93,
      economicImpactScore: 90,
      metrics: {
        costSavings: '$68M',
      },
      activeInsights: 112,
      trend: 'up',
    },
    {
      id: '5',
      name: 'Agent Inventory',
      specialty: 'Inventory Intelligence Agent',
      avatar: '📦',
      status: 'active',
      confidenceScore: 97,
      economicImpactScore: 91,
      metrics: {
        skusManaged: 12800000,
        costSavings: '$32M',
      },
      activeInsights: 178,
      trend: 'up',
    },
  ];

  // Supply Chain Nodes
  const supplyChainNodes: SupplyChainNode[] = [
    { id: '1', name: 'APAC Raw Materials', type: 'supplier', status: 'operational', capacity: 100, utilization: 78, location: 'Shanghai, China' },
    { id: '2', name: 'EU Manufacturing Hub', type: 'factory', status: 'operational', capacity: 100, utilization: 85, location: 'Munich, Germany' },
    { id: '3', name: 'US East Distribution', type: 'warehouse', status: 'operational', capacity: 100, utilization: 72, location: 'New Jersey, USA' },
    { id: '4', name: 'US West Distribution', type: 'warehouse', status: 'delayed', capacity: 100, utilization: 68, location: 'California, USA' },
    { id: '5', name: 'LATAM Distribution', type: 'distribution', status: 'operational', capacity: 100, utilization: 65, location: 'São Paulo, Brazil' },
    { id: '6', name: 'APAC Retail Network', type: 'retail', status: 'operational', capacity: 100, utilization: 82, location: 'Tokyo, Japan' },
  ];

  // Suppliers
  const suppliers: Supplier[] = [
    { id: '1', name: 'Global Materials Corp', category: 'Raw Materials', performance: 94, onTimeDelivery: 96, riskScore: 12, contractStatus: 'active', spend: '$42M', leadTime: 14 },
    { id: '2', name: 'Tech Components Ltd', category: 'Electronics', performance: 89, onTimeDelivery: 92, riskScore: 18, contractStatus: 'active', spend: '$28M', leadTime: 21 },
    { id: '3', name: 'Packaging Solutions Inc', category: 'Packaging', performance: 97, onTimeDelivery: 98, riskScore: 8, contractStatus: 'active', spend: '$15M', leadTime: 7 },
    { id: '4', name: 'Logistics Partners Co', category: 'Transportation', performance: 85, onTimeDelivery: 88, riskScore: 24, contractStatus: 'expiring', spend: '$22M', leadTime: 3 },
  ];

  // Inventory Items
  const inventoryItems: InventoryItem[] = [
    { id: '1', sku: 'SKU-001', name: 'Premium Widget A', category: 'Finished Goods', currentStock: 4520, safetyStock: 1200, reorderPoint: 1500, turnoverRate: 8.4, location: 'US East', status: 'healthy' },
    { id: '2', sku: 'SKU-002', name: 'Standard Component B', category: 'Raw Materials', currentStock: 890, safetyStock: 500, reorderPoint: 600, turnoverRate: 12.2, location: 'EU Factory', status: 'low' },
    { id: '3', sku: 'SKU-003', name: 'Custom Assembly C', category: 'Work-in-Progress', currentStock: 2340, safetyStock: 800, reorderPoint: 1000, turnoverRate: 6.8, location: 'APAC Factory', status: 'healthy' },
    { id: '4', sku: 'SKU-004', name: 'Fastener Kit D', category: 'Components', currentStock: 15600, safetyStock: 3000, reorderPoint: 4000, turnoverRate: 4.2, location: 'US West', status: 'overstock' },
  ];

  // Shipments
  const shipments: Shipment[] = [
    { id: '1', origin: 'Shanghai, China', destination: 'New Jersey, USA', status: 'in-transit', carrier: 'Maersk', mode: 'ship', eta: '2024-01-28', progress: 68 },
    { id: '2', origin: 'Munich, Germany', destination: 'São Paulo, Brazil', status: 'in-transit', carrier: 'DHL', mode: 'plane', eta: '2024-01-26', progress: 45 },
    { id: '3', origin: 'California, USA', destination: 'Tokyo, Japan', status: 'delayed', carrier: 'FedEx', mode: 'plane', eta: '2024-01-27', progress: 32 },
    { id: '4', origin: 'New Jersey, USA', destination: 'Texas, USA', status: 'delivered', carrier: 'UPS', mode: 'truck', eta: '2024-01-25', progress: 100 },
  ];

  // Risk Alerts
  const riskAlerts: RiskAlert[] = [
    { id: '1', type: 'port', severity: 'high', title: 'Port Congestion Alert', description: 'Los Angeles port experiencing 40% delay due to labor strike', location: 'Los Angeles, USA', impact: '2-3 day delay on West Coast shipments', timestamp: '2h ago' },
    { id: '2', type: 'supplier', severity: 'medium', title: 'Supplier Risk Detected', description: 'Tech Components Ltd showing increased delivery variance', location: 'Taiwan', impact: 'Potential 1-2 day lead time increase', timestamp: '4h ago' },
    { id: '3', type: 'weather', severity: 'low', title: 'Weather Disruption', description: 'Typhoon warning in APAC region may affect shipments', location: 'Philippines', impact: 'Minor route adjustments required', timestamp: '6h ago' },
    { id: '4', type: 'fuel', severity: 'medium', title: 'Fuel Price Volatility', description: 'Jet fuel prices up 15% this week', location: 'Global', impact: 'Air freight costs may increase 8-10%', timestamp: '8h ago' },
  ];

  // Supply Chain Insights
  const supplyChainInsights: SupplyChainInsight[] = [
    { id: '1', insight: 'Supplier lead times increasing in APAC region by 12%. Recommend diversifying suppliers or increasing safety stock.', category: 'Procurement', confidence: 94, impact: 'high', timestamp: '2h ago', actionRequired: true },
    { id: '2', insight: 'Inventory imbalance detected across 3 distribution centers. Rebalancing could carrying costs by $2.4M annually.', category: 'Inventory', confidence: 89, impact: 'high', timestamp: '4h ago', actionRequired: true },
    { id: '3', insight: 'Demand surge predicted for Q4 seasonal SKUs. Recommend increasing production capacity by 25% in September.', category: 'Demand', confidence: 87, impact: 'medium', timestamp: '6h ago', actionRequired: false },
    { id: '4', insight: 'Route optimization could reduce logistics cost by 12% through consolidation and mode shift.', category: 'Logistics', confidence: 92, impact: 'high', timestamp: '8h ago', actionRequired: true },
    { id: '5', insight: 'Manufacturing delay risk affecting downstream fulfillment. EU factory at 92% capacity.', category: 'Manufacturing', confidence: 85, impact: 'medium', timestamp: '10h ago', actionRequired: false },
  ];

  // Supply Chain Activities
  const supplyChainActivities: SupplyChainActivity[] = [
    { id: '1', event: 'Supplier shipment delayed - Tech Components Ltd', type: 'procurement', timestamp: '2m ago', location: 'Taiwan' },
    { id: '2', event: 'Inventory replenished - SKU-001 at US East', type: 'inventory', timestamp: '5m ago', location: 'New Jersey, USA' },
    { id: '3', event: 'Order #452847 fulfilled - 2.4 day cycle time', type: 'fulfillment', timestamp: '12m ago', location: 'Global' },
    { id: '4', event: 'Factory output updated - EU Hub at 85% capacity', type: 'manufacturing', timestamp: '18m ago', location: 'Munich, Germany' },
    { id: '5', event: 'Risk detected - Port congestion at Los Angeles', type: 'risk', timestamp: '25m ago', location: 'Los Angeles, USA' },
    { id: '6', event: 'Logistics route optimized - Shanghai to New Jersey', type: 'logistics', timestamp: '32m ago', location: 'Global' },
    { id: '7', event: 'Demand forecast updated - Q4 seasonal SKUs +25%', type: 'demand', timestamp: '45m ago', location: 'Global' },
  ];

  // System Health
  const systemHealth: SystemHealth[] = [
    { id: '1', system: 'ERP System', status: 'healthy', uptime: '99.9%', latency: '45ms' },
    { id: '2', system: 'SCM Platform', status: 'healthy', uptime: '99.8%', latency: '32ms' },
    { id: '3', system: 'WMS Systems', status: 'healthy', uptime: '99.7%', latency: '58ms' },
    { id: '4', system: 'TMS Systems', status: 'healthy', uptime: '99.9%', latency: '28ms' },
    { id: '5', system: 'Supplier APIs', status: 'degraded', uptime: '98.2%', latency: '145ms' },
    { id: '6', system: 'IoT Sensors', status: 'healthy', uptime: '99.5%', latency: '12ms' },
    { id: '7', system: 'AI Agents', status: 'healthy', uptime: '99.9%', latency: '8ms' },
  ];

  // Render Functions
  const renderKPICard = (kpi: SupplyChainKPI) => (
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
      {kpi.riskLevel && (
        <View style={[
          styles.kpiRiskBadge,
          { 
            backgroundColor: kpi.riskLevel === 'critical' ? 'rgba(239, 68, 68, 0.2)' :
                           kpi.riskLevel === 'high' ? 'rgba(245, 158, 11, 0.2)' :
                           kpi.riskLevel === 'medium' ? 'rgba(6, 182, 212, 0.2)' :
                           'rgba(16, 185, 129, 0.2)',
            borderColor: kpi.riskLevel === 'critical' ? '#EF4444' :
                        kpi.riskLevel === 'high' ? '#F59E0B' :
                        kpi.riskLevel === 'medium' ? '#06B6D4' :
                        '#10B981'
          }
        ]}>
          <AlertTriangle size={10} color={
            kpi.riskLevel === 'critical' ? '#EF4444' :
            kpi.riskLevel === 'high' ? '#F59E0B' :
            kpi.riskLevel === 'medium' ? '#06B6D4' :
            '#10B981'
          } />
          <Text style={[
            styles.kpiRiskText,
            { 
              color: kpi.riskLevel === 'critical' ? '#EF4444' :
                     kpi.riskLevel === 'high' ? '#F59E0B' :
                     kpi.riskLevel === 'medium' ? '#06B6D4' :
                     '#10B981'
            }
          ]}>{kpi.riskLevel.toUpperCase()}</Text>
        </View>
      )}
    </View>
  );

  const renderAgentCard = (agent: SupplyChainAgent) => (
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
          <Text style={[styles.agentMetricValue, { color: '#10B981' }]}>{agent.economicImpactScore}</Text>
          <Text style={[styles.agentMetricLabel, { color: theme.colors.textSecondary }]}>Impact</Text>
        </View>
      </View>
      <View style={styles.agentInsights}>
        <Text style={[styles.agentInsightsCount, { color: '#8B5CF6' }]}>{agent.activeInsights}</Text>
        <Text style={[styles.agentInsightsLabel, { color: theme.colors.textSecondary }]}>Insights</Text>
      </View>
    </View>
  );

  const renderSupplyChainNode = (node: SupplyChainNode) => {
    const Icon = node.type === 'supplier' ? Factory :
                 node.type === 'factory' ? FactoryIcon :
                 node.type === 'warehouse' ? Warehouse :
                 node.type === 'distribution' ? Building2 :
                 node.type === 'retail' ? Store :
                 Building;
    
    const statusColor = node.status === 'operational' ? '#10B981' :
                       node.status === 'delayed' ? '#F59E0B' :
                       node.status === 'at-risk' ? '#EF4444' :
                       '#6B7280';
    
    return (
      <View key={node.id} style={[styles.nodeCard, { backgroundColor: theme.colors.card, borderColor: statusColor + '30' }]}>
        <View style={styles.nodeHeader}>
          <View style={[styles.nodeIcon, { backgroundColor: statusColor + '20' }]}>
            <Icon size={20} color={statusColor} />
          </View>
          <View style={styles.nodeInfo}>
            <Text style={[styles.nodeName, { color: theme.colors.text }]}>{node.name}</Text>
            <Text style={[styles.nodeLocation, { color: theme.colors.textSecondary }]}>{node.location}</Text>
          </View>
          <View style={[
            styles.nodeStatusBadge,
            { backgroundColor: statusColor + '20', borderColor: statusColor }
          ]}>
            <View style={[styles.nodeStatusDot, { backgroundColor: statusColor }]} />
            <Text style={[styles.nodeStatusText, { color: statusColor }]}>{node.status}</Text>
          </View>
        </View>
        <View style={styles.nodeMetrics}>
          <View style={styles.nodeMetric}>
            <Text style={[styles.nodeMetricValue, { color: '#06B6D4' }]}>{node.utilization}%</Text>
            <Text style={[styles.nodeMetricLabel, { color: theme.colors.textSecondary }]}>Utilization</Text>
          </View>
          <View style={styles.nodeMetric}>
            <Text style={[styles.nodeMetricValue, { color: '#10B981' }]}>{node.capacity}%</Text>
            <Text style={[styles.nodeMetricLabel, { color: theme.colors.textSecondary }]}>Capacity</Text>
          </View>
        </View>
      </View>
    );
  };

  const renderSupplierCard = (supplier: Supplier) => (
    <View key={supplier.id} style={[styles.supplierCard, { backgroundColor: theme.colors.card }]}>
      <View style={styles.supplierHeader}>
        <Text style={[styles.supplierName, { color: theme.colors.text }]}>{supplier.name}</Text>
        <View style={[
          styles.supplierContractBadge,
          { 
            backgroundColor: supplier.contractStatus === 'active' ? 'rgba(16, 185, 129, 0.2)' :
                           supplier.contractStatus === 'expiring' ? 'rgba(245, 158, 11, 0.2)' :
                           supplier.contractStatus === 'expiring-soon' ? 'rgba(239, 68, 68, 0.2)' :
                           'rgba(107, 114, 128, 0.2)',
            borderColor: supplier.contractStatus === 'active' ? '#10B981' :
                        supplier.contractStatus === 'expiring' ? '#F59E0B' :
                        supplier.contractStatus === 'expiring-soon' ? '#EF4444' :
                        '#6B7280'
          }
        ]}>
          <Text style={[
            styles.supplierContractText,
            { 
              color: supplier.contractStatus === 'active' ? '#10B981' :
                     supplier.contractStatus === 'expiring' ? '#F59E0B' :
                     supplier.contractStatus === 'expiring-soon' ? '#EF4444' :
                     '#6B7280'
            }
          ]}>{supplier.contractStatus.toUpperCase()}</Text>
        </View>
      </View>
      <Text style={[styles.supplierCategory, { color: theme.colors.textSecondary }]}>{supplier.category}</Text>
      <View style={styles.supplierMetrics}>
        <View style={styles.supplierMetric}>
          <Text style={[styles.supplierMetricValue, { color: '#10B981' }]}>{supplier.performance}%</Text>
          <Text style={[styles.supplierMetricLabel, { color: theme.colors.textSecondary }]}>Performance</Text>
        </View>
        <View style={styles.supplierMetric}>
          <Text style={[styles.supplierMetricValue, { color: '#06B6D4' }]}>{supplier.onTimeDelivery}%</Text>
          <Text style={[styles.supplierMetricLabel, { color: theme.colors.textSecondary }]}>OTD</Text>
        </View>
        <View style={styles.supplierMetric}>
          <Text style={[styles.supplierMetricValue, { color: '#F59E0B' }]}>{supplier.riskScore}</Text>
          <Text style={[styles.supplierMetricLabel, { color: theme.colors.textSecondary }]}>Risk</Text>
        </View>
      </View>
      <View style={styles.supplierDetails}>
        <View style={styles.supplierDetail}>
          <DollarSign size={14} color="rgba(255,255,255,0.6)" />
          <Text style={[styles.supplierDetailText, { color: theme.colors.textSecondary }]}>{supplier.spend}</Text>
        </View>
        <View style={styles.supplierDetail}>
          <Clock size={14} color="rgba(255,255,255,0.6)" />
          <Text style={[styles.supplierDetailText, { color: theme.colors.textSecondary }]}>{supplier.leadTime} days</Text>
        </View>
      </View>
    </View>
  );

  const renderInventoryItem = (item: InventoryItem) => (
    <View key={item.id} style={[styles.inventoryCard, { backgroundColor: theme.colors.card, borderColor: 
      item.status === 'healthy' ? '#10B981' + '30' :
      item.status === 'low' ? '#F59E0B' + '30' :
      item.status === 'critical' ? '#EF4444' + '30' :
      '#8B5CF6' + '30'
    }]}>
      <View style={styles.inventoryHeader}>
        <Text style={[styles.inventorySku, { color: theme.colors.textSecondary }]}>{item.sku}</Text>
        <View style={[
          styles.inventoryStatusBadge,
          { 
            backgroundColor: item.status === 'healthy' ? 'rgba(16, 185, 129, 0.2)' :
                           item.status === 'low' ? 'rgba(245, 158, 11, 0.2)' :
                           item.status === 'critical' ? 'rgba(239, 68, 68, 0.2)' :
                           'rgba(139, 92, 246, 0.2)',
            borderColor: item.status === 'healthy' ? '#10B981' :
                        item.status === 'low' ? '#F59E0B' :
                        item.status === 'critical' ? '#EF4444' :
                        '#8B5CF6'
          }
        ]}>
          <Text style={[
            styles.inventoryStatusText,
            { 
              color: item.status === 'healthy' ? '#10B981' :
                     item.status === 'low' ? '#F59E0B' :
                     item.status === 'critical' ? '#EF4444' :
                     '#8B5CF6'
            }
          ]}>{item.status.toUpperCase()}</Text>
        </View>
      </View>
      <Text style={[styles.inventoryName, { color: theme.colors.text }]}>{item.name}</Text>
      <Text style={[styles.inventoryCategory, { color: theme.colors.textSecondary }]}>{item.category}</Text>
      <View style={styles.inventoryMetrics}>
        <View style={styles.inventoryMetric}>
          <Text style={[styles.inventoryMetricValue, { color: '#06B6D4' }]}>{item.currentStock.toLocaleString()}</Text>
          <Text style={[styles.inventoryMetricLabel, { color: theme.colors.textSecondary }]}>Current</Text>
        </View>
        <View style={styles.inventoryMetric}>
          <Text style={[styles.inventoryMetricValue, { color: '#10B981' }]}>{item.safetyStock.toLocaleString()}</Text>
          <Text style={[styles.inventoryMetricLabel, { color: theme.colors.textSecondary }]}>Safety</Text>
        </View>
        <View style={styles.inventoryMetric}>
          <Text style={[styles.inventoryMetricValue, { color: '#F59E0B' }]}>{item.turnoverRate}</Text>
          <Text style={[styles.inventoryMetricLabel, { color: theme.colors.textSecondary }]}>Turnover</Text>
        </View>
      </View>
      <View style={styles.inventoryLocation}>
        <MapPin size={14} color="rgba(255,255,255,0.6)" />
        <Text style={[styles.inventoryLocationText, { color: theme.colors.textSecondary }]}>{item.location}</Text>
      </View>
    </View>
  );

  const renderShipmentCard = (shipment: Shipment) => {
    const Icon = shipment.mode === 'truck' ? TruckIcon :
                 shipment.mode === 'ship' ? ShipIcon :
                 shipment.mode === 'plane' ? PlaneIcon :
                 TrainIcon;
    
    const statusColor = shipment.status === 'in-transit' ? '#06B6D4' :
                       shipment.status === 'delivered' ? '#10B981' :
                       shipment.status === 'delayed' ? '#EF4444' :
                       '#6B7280';
    
    return (
      <View key={shipment.id} style={[styles.shipmentCard, { backgroundColor: theme.colors.card, borderColor: statusColor + '30' }]}>
        <View style={styles.shipmentHeader}>
          <View style={[styles.shipmentIcon, { backgroundColor: statusColor + '20' }]}>
            <Icon size={20} color={statusColor} />
          </View>
          <View style={styles.shipmentInfo}>
            <Text style={[styles.shipmentCarrier, { color: theme.colors.text }]}>{shipment.carrier}</Text>
            <Text style={[styles.shipmentRoute, { color: theme.colors.textSecondary }]}>{shipment.origin} → {shipment.destination}</Text>
          </View>
          <View style={[
            styles.shipmentStatusBadge,
            { backgroundColor: statusColor + '20', borderColor: statusColor }
          ]}>
            <Text style={[styles.shipmentStatusText, { color: statusColor }]}>{shipment.status.toUpperCase()}</Text>
          </View>
        </View>
        <View style={styles.shipmentProgress}>
          <View style={styles.shipmentProgressBar}>
            <View style={[styles.shipmentProgressFill, { width: `${shipment.progress}%`, backgroundColor: statusColor }]} />
          </View>
          <Text style={[styles.shipmentProgressText, { color: theme.colors.textSecondary }]}>{shipment.progress}%</Text>
        </View>
        <View style={styles.shipmentDetails}>
          <View style={styles.shipmentDetail}>
            <Calendar size={14} color="rgba(255,255,255,0.6)" />
            <Text style={[styles.shipmentDetailText, { color: theme.colors.textSecondary }]}>ETA: {shipment.eta}</Text>
          </View>
        </View>
      </View>
    );
  };

  const renderRiskAlert = (alert: RiskAlert) => (
    <View key={alert.id} style={[styles.riskCard, { backgroundColor: theme.colors.card, borderColor: 
      alert.severity === 'critical' ? '#EF4444' + '40' :
      alert.severity === 'high' ? '#F59E0B' + '40' :
      alert.severity === 'medium' ? '#06B6D4' + '40' :
      '#10B981' + '40'
    }]}>
      <View style={styles.riskHeader}>
        <View style={[
          styles.riskSeverityBadge,
          { 
            backgroundColor: alert.severity === 'critical' ? 'rgba(239, 68, 68, 0.2)' :
                           alert.severity === 'high' ? 'rgba(245, 158, 11, 0.2)' :
                           alert.severity === 'medium' ? 'rgba(6, 182, 212, 0.2)' :
                           'rgba(16, 185, 129, 0.2)',
            borderColor: alert.severity === 'critical' ? '#EF4444' :
                        alert.severity === 'high' ? '#F59E0B' :
                        alert.severity === 'medium' ? '#06B6D4' :
                        '#10B981'
          }
        ]}>
          <AlertTriangle size={12} color={
            alert.severity === 'critical' ? '#EF4444' :
            alert.severity === 'high' ? '#F59E0B' :
            alert.severity === 'medium' ? '#06B6D4' :
            '#10B981'
          } />
          <Text style={[
            styles.riskSeverityText,
            { 
              color: alert.severity === 'critical' ? '#EF4444' :
                     alert.severity === 'high' ? '#F59E0B' :
                     alert.severity === 'medium' ? '#06B6D4' :
                     '#10B981'
            }
          ]}>{alert.severity.toUpperCase()}</Text>
        </View>
        <Text style={[styles.riskTimestamp, { color: theme.colors.textSecondary }]}>{alert.timestamp}</Text>
      </View>
      <Text style={[styles.riskTitle, { color: theme.colors.text }]}>{alert.title}</Text>
      <Text style={[styles.riskDescription, { color: theme.colors.textSecondary }]}>{alert.description}</Text>
      <View style={styles.riskDetails}>
        <View style={styles.riskDetail}>
          <MapPin size={14} color="rgba(255,255,255,0.6)" />
          <Text style={[styles.riskDetailText, { color: theme.colors.textSecondary }]}>{alert.location}</Text>
        </View>
        <View style={styles.riskDetail}>
          <AlertCircle size={14} color="rgba(255,255,255,0.6)" />
          <Text style={[styles.riskDetailText, { color: theme.colors.textSecondary }]}>{alert.impact}</Text>
        </View>
      </View>
    </View>
  );

  const renderInsightCard = (insight: SupplyChainInsight) => (
    <View key={insight.id} style={[styles.insightCard, { backgroundColor: theme.colors.card, borderLeftWidth: insight.actionRequired ? 3 : 0, borderLeftColor: insight.actionRequired ? '#F59E0B' : 'transparent' }]}>
      <View style={styles.insightHeader}>
        <View style={styles.insightCategoryBadge}>
          <Brain size={12} color="#06B6D4" />
          <Text style={[styles.insightCategoryText, { color: '#06B6D4' }]}>{insight.category}</Text>
        </View>
        <View style={styles.insightMeta}>
          <Text style={[styles.insightConfidence, { color: theme.colors.textSecondary }]}>{insight.confidence}% confidence</Text>
          {insight.actionRequired && (
            <View style={[styles.insightActionBadge, { backgroundColor: 'rgba(245, 158, 11, 0.2)' }]}>
              <AlertCircle size={10} color="#F59E0B" />
              <Text style={[styles.insightActionText, { color: '#F59E0B' }]}>Action Required</Text>
            </View>
          )}
        </View>
      </View>
      <Text style={[styles.insightText, { color: theme.colors.text }]}>{insight.insight}</Text>
      <View style={styles.insightFooter}>
        <View style={[
          styles.insightImpactBadge,
          { 
            backgroundColor: insight.impact === 'high' ? 'rgba(239, 68, 68, 0.2)' :
                           insight.impact === 'medium' ? 'rgba(245, 158, 11, 0.2)' :
                           'rgba(16, 185, 129, 0.2)',
            borderColor: insight.impact === 'high' ? '#EF4444' :
                        insight.impact === 'medium' ? '#F59E0B' :
                        '#10B981'
          }
        ]}>
          <Text style={[
            styles.insightImpactText,
            { 
              color: insight.impact === 'high' ? '#EF4444' :
                     insight.impact === 'medium' ? '#F59E0B' :
                     '#10B981'
            }
          ]}>{insight.impact.toUpperCase()} IMPACT</Text>
        </View>
        <Text style={[styles.insightTimestamp, { color: theme.colors.textSecondary }]}>{insight.timestamp}</Text>
      </View>
    </View>
  );

  const renderActivityItem = (activity: SupplyChainActivity) => {
    const Icon = activity.type === 'procurement' ? ShoppingCart :
                 activity.type === 'inventory' ? Package :
                 activity.type === 'logistics' ? Truck :
                 activity.type === 'manufacturing' ? Factory :
                 activity.type === 'risk' ? Shield :
                 activity.type === 'demand' ? TrendingUp :
                 CheckCircle;
    
    const iconColor = activity.type === 'procurement' ? '#06B6D4' :
                      activity.type === 'inventory' ? '#10B981' :
                      activity.type === 'logistics' ? '#8B5CF6' :
                      activity.type === 'manufacturing' ? '#F59E0B' :
                      activity.type === 'risk' ? '#EF4444' :
                      activity.type === 'demand' ? '#EC4899' :
                      '#06B6D4';
    
    return (
      <View key={activity.id} style={styles.activityItem}>
        <View style={[styles.activityIcon, { backgroundColor: iconColor + '20' }]}>
          <Icon size={16} color={iconColor} />
        </View>
        <View style={styles.activityContent}>
          <Text style={[styles.activityEvent, { color: theme.colors.text }]}>{activity.event}</Text>
          <View style={styles.activityMeta}>
            <Text style={[styles.activityTimestamp, { color: theme.colors.textSecondary }]}>{activity.timestamp}</Text>
            {activity.location && (
              <>
                <Text style={[styles.activitySeparator, { color: theme.colors.textSecondary }]}>•</Text>
                <Text style={[styles.activityLocation, { color: theme.colors.textSecondary }]}>{activity.location}</Text>
              </>
            )}
          </View>
        </View>
      </View>
    );
  };

  const renderSystemHealth = (health: SystemHealth) => (
    <View key={health.id} style={[styles.healthCard, { backgroundColor: theme.colors.card }]}>
      <View style={styles.healthHeader}>
        <Text style={[styles.healthSystem, { color: theme.colors.text }]}>{health.system}</Text>
        <View style={[
          styles.healthStatusBadge,
          { 
            backgroundColor: health.status === 'healthy' ? 'rgba(16, 185, 129, 0.2)' :
                           health.status === 'degraded' ? 'rgba(245, 158, 11, 0.2)' :
                           'rgba(239, 68, 68, 0.2)',
            borderColor: health.status === 'healthy' ? '#10B981' :
                        health.status === 'degraded' ? '#F59E0B' :
                        '#EF4444'
          }
        ]}>
          <View style={[styles.healthStatusDot, { backgroundColor: health.status === 'healthy' ? '#10B981' : health.status === 'degraded' ? '#F59E0B' : '#EF4444' }]} />
          <Text style={[
            styles.healthStatusText,
            { color: health.status === 'healthy' ? '#10B981' : health.status === 'degraded' ? '#F59E0B' : '#EF4444' }
          ]}>{health.status.toUpperCase()}</Text>
        </View>
      </View>
      <View style={styles.healthMetrics}>
        <View style={styles.healthMetric}>
          <Activity size={12} color="rgba(255,255,255,0.6)" />
          <Text style={[styles.healthMetricValue, { color: '#10B981' }]}>{health.uptime}</Text>
          <Text style={[styles.healthMetricLabel, { color: theme.colors.textSecondary }]}>Uptime</Text>
        </View>
        <View style={styles.healthMetric}>
          <Zap size={12} color="rgba(255,255,255,0.6)" />
          <Text style={[styles.healthMetricValue, { color: '#06B6D4' }]}>{health.latency}</Text>
          <Text style={[styles.healthMetricLabel, { color: theme.colors.textSecondary }]}>Latency</Text>
        </View>
      </View>
    </View>
  );

  return (
    <View style={[styles.container, { backgroundColor: '#05070A' }]}>
      {/* Header */}
      <View style={[styles.header, { backgroundColor: 'rgba(5, 7, 10, 0.8)', borderBottomColor: 'rgba(255,255,255,0.1)' }]}>
        <View style={styles.headerContent}>
          <View style={styles.headerLeft}>
            <LayoutDashboard size={32} color="#06B6D4" />
            <View style={styles.headerTitle}>
              <Text style={[styles.headerTitleText, { color: '#FFFFFF' }]}>AI Supply Chain & Logistics Command Center</Text>
              <Text style={[styles.headerSubtitle, { color: 'rgba(255,255,255,0.6)' }]}>Global End-to-End Supply Chain Intelligence & Control Tower</Text>
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
        <View style={[styles.sidebar, { backgroundColor: 'rgba(5, 7, 10, 0.6)', borderRightColor: 'rgba(255,255,255,0.1)' }]}>
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
        
        {/* Top Supply Chain Bar - Prominent KPI Display */}
        <View style={[styles.topBar, { backgroundColor: 'rgba(6, 182, 212, 0.08)', borderColor: 'rgba(6, 182, 212, 0.2)' }]}>
          <View style={styles.topBarHeader}>
            <View style={styles.topBarTitle}>
              <TrendingUp size={20} color="#06B6D4" />
              <Text style={[styles.topBarTitleText, { color: '#FFFFFF' }]}>Supply Chain Performance Overview</Text>
            </View>
            <Text style={[styles.topBarPeriod, { color: 'rgba(255,255,255,0.6)' }]}>Last 24 hours</Text>
          </View>
          
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.topBarScroll}>
            <View style={styles.topBarKPIs}>
              {supplyChainKPIs.slice(0, 5).map((kpi) => (
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

        {/* Supply Chain KPIs */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Supply Chain KPIs</Text>
          <View style={styles.kpiGrid}>
            {supplyChainKPIs.map(renderKPICard)}
          </View>
        </View>

        {/* AI Supply Chain Agents */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>AI Supply Chain Agents</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.agentsScroll}>
            {supplyChainAgents.map(renderAgentCard)}
          </ScrollView>
        </View>

        {/* Chief Supply Chain Officer Command Center */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Chief Supply Chain Officer Command Center</Text>
          <View style={[styles.commandCenter, { backgroundColor: 'rgba(6, 182, 212, 0.05)', borderColor: 'rgba(6, 182, 212, 0.2)' }]}>
            
            {/* Command Center Header */}
            <View style={styles.commandCenterHeader}>
              <View style={styles.commandCenterTitle}>
                <Brain size={24} color="#06B6D4" />
                <View>
                  <Text style={[styles.commandCenterTitleText, { color: '#FFFFFF' }]}>Global Supply Chain Intelligence Hub</Text>
                  <Text style={[styles.commandCenterSubtitle, { color: 'rgba(255,255,255,0.6)' }]}>Real-time end-to-end supply chain visibility</Text>
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
                  <ShoppingCart size={20} color="#06B6D4" />
                  <Text style={[styles.commandMetricLabel, { color: 'rgba(255,255,255,0.7)' }]}>Global Orders In Flow</Text>
                </View>
                <Text style={[styles.commandMetricValue, { color: '#06B6D4' }]}>8.4M</Text>
                <View style={styles.commandMetricTrend}>
                  <TrendingUp size={14} color="#10B981" />
                  <Text style={[styles.commandMetricTrendText, { color: '#10B981' }]}>+12.3%</Text>
                  <Text style={[styles.commandMetricPeriod, { color: 'rgba(255,255,255,0.5)' }]}>Active orders</Text>
                </View>
              </View>

              <View style={[styles.commandMetricCard, { backgroundColor: 'rgba(255,255,255,0.03)', borderColor: 'rgba(16, 185, 129, 0.3)' }]}>
                <View style={styles.commandMetricHeader}>
                  <CheckCircle size={20} color="#10B981" />
                  <Text style={[styles.commandMetricLabel, { color: 'rgba(255,255,255,0.7)' }]}>Fulfillment Rate</Text>
                </View>
                <Text style={[styles.commandMetricValue, { color: '#10B981' }]}>97.8%</Text>
                <View style={styles.commandMetricTrend}>
                  <TrendingUp size={14} color="#10B981" />
                  <Text style={[styles.commandMetricTrendText, { color: '#10B981' }]}>+2.3%</Text>
                  <Text style={[styles.commandMetricPeriod, { color: 'rgba(255,255,255,0.5)' }]}>End-to-end</Text>
                </View>
              </View>

              <View style={[styles.commandMetricCard, { backgroundColor: 'rgba(255,255,255,0.03)', borderColor: 'rgba(139, 92, 246, 0.3)' }]}>
                <View style={styles.commandMetricHeader}>
                  <Package size={20} color="#8B5CF6" />
                  <Text style={[styles.commandMetricLabel, { color: 'rgba(255,255,255,0.7)' }]}>Inventory Health</Text>
                </View>
                <Text style={[styles.commandMetricValue, { color: '#8B5CF6' }]}>94%</Text>
                <View style={styles.commandMetricTrend}>
                  <TrendingUp size={14} color="#10B981" />
                  <Text style={[styles.commandMetricTrendText, { color: '#10B981' }]}>+4.2%</Text>
                  <Text style={[styles.commandMetricPeriod, { color: 'rgba(255,255,255,0.5)' }]}>Global health</Text>
                </View>
              </View>

              <View style={[styles.commandMetricCard, { backgroundColor: 'rgba(255,255,255,0.03)', borderColor: 'rgba(245, 158, 11, 0.3)' }]}>
                <View style={styles.commandMetricHeader}>
                  <Building2 size={20} color="#F59E0B" />
                  <Text style={[styles.commandMetricLabel, { color: 'rgba(255,255,255,0.7)' }]}>Supplier Performance</Text>
                </View>
                <Text style={[styles.commandMetricValue, { color: '#F59E0B' }]}>92%</Text>
                <View style={styles.commandMetricTrend}>
                  <TrendingUp size={14} color="#10B981" />
                  <Text style={[styles.commandMetricTrendText, { color: '#10B981' }]}>+1.2%</Text>
                  <Text style={[styles.commandMetricPeriod, { color: 'rgba(255,255,255,0.5)' }]}>OTD rate</Text>
                </View>
              </View>

              <View style={[styles.commandMetricCard, { backgroundColor: 'rgba(255,255,255,0.03)', borderColor: 'rgba(236, 72, 153, 0.3)' }]}>
                <View style={styles.commandMetricHeader}>
                  <DollarSign size={20} color="#EC4899" />
                  <Text style={[styles.commandMetricLabel, { color: 'rgba(255,255,255,0.7)' }]}>Cost Optimization</Text>
                </View>
                <Text style={[styles.commandMetricValue, { color: '#EC4899' }]}>$284M</Text>
                <View style={styles.commandMetricTrend}>
                  <TrendingUp size={14} color="#10B981" />
                  <Text style={[styles.commandMetricTrendText, { color: '#10B981' }]}>+$42M</Text>
                  <Text style={[styles.commandMetricPeriod, { color: 'rgba(255,255,255,0.5)' }]}>Annual savings</Text>
                </View>
              </View>
            </View>

            {/* Supply Chain Health Overview */}
            <View style={styles.commandCenterHealth}>
              <View style={styles.healthOverview}>
                <Text style={[styles.healthOverviewTitle, { color: '#FFFFFF' }]}>Supply Chain Health Score</Text>
                <View style={styles.healthScoreContainer}>
                  <Text style={[styles.healthScore, { color: '#10B981' }]}>94%</Text>
                  <View style={styles.healthScoreIndicator}>
                    <View style={[styles.healthScoreBar, { width: '94%', backgroundColor: '#10B981' }]} />
                  </View>
                </View>
                <Text style={[styles.healthScoreDescription, { color: 'rgba(255,255,255,0.6)' }]}>Excellent - All supply chain systems optimal</Text>
              </View>

              <View style={styles.healthBreakdown}>
                <Text style={[styles.healthBreakdownTitle, { color: '#FFFFFF' }]}>Health Breakdown</Text>
                <View style={styles.healthBreakdownItems}>
                  <View style={styles.healthBreakdownItem}>
                    <View style={[styles.healthBreakdownDot, { backgroundColor: '#06B6D4' }]} />
                    <Text style={[styles.healthBreakdownLabel, { color: 'rgba(255,255,255,0.7)' }]}>Fulfillment</Text>
                    <Text style={[styles.healthBreakdownValue, { color: '#06B6D4' }]}>98%</Text>
                  </View>
                  <View style={styles.healthBreakdownItem}>
                    <View style={[styles.healthBreakdownDot, { backgroundColor: '#10B981' }]} />
                    <Text style={[styles.healthBreakdownLabel, { color: 'rgba(255,255,255,0.7)' }]}>Inventory</Text>
                    <Text style={[styles.healthBreakdownValue, { color: '#10B981' }]}>94%</Text>
                  </View>
                  <View style={styles.healthBreakdownItem}>
                    <View style={[styles.healthBreakdownDot, { backgroundColor: '#8B5CF6' }]} />
                    <Text style={[styles.healthBreakdownLabel, { color: 'rgba(255,255,255,0.7)' }]}>Suppliers</Text>
                    <Text style={[styles.healthBreakdownValue, { color: '#8B5CF6' }]}>92%</Text>
                  </View>
                  <View style={styles.healthBreakdownItem}>
                    <View style={[styles.healthBreakdownDot, { backgroundColor: '#F59E0B' }]} />
                    <Text style={[styles.healthBreakdownLabel, { color: 'rgba(255,255,255,0.7)' }]}>Logistics</Text>
                    <Text style={[styles.healthBreakdownValue, { color: '#F59E0B' }]}>91%</Text>
                  </View>
                </View>
              </View>
            </View>
          </View>
        </View>

        {/* Global Supply Chain Control Tower */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Global Supply Chain Control Tower</Text>
          <View style={[styles.controlTower, { backgroundColor: theme.colors.card }]}>
            <View style={styles.controlTowerHeader}>
              <Globe size={20} color="#06B6D4" />
              <Text style={[styles.controlTowerTitle, { color: '#FFFFFF' }]}>End-to-End Supply Network</Text>
            </View>
            
            {/* Supply Chain Flow Visualization */}
            <View style={styles.supplyChainFlow}>
              {supplyChainNodes.map((node, index) => (
                <View key={node.id} style={styles.flowNode}>
                  {renderSupplyChainNode(node)}
                  {index < supplyChainNodes.length - 1 && (
                    <View style={styles.flowArrow}>
                      <ArrowRight size={24} color="rgba(6, 182, 212, 0.5)" />
                    </View>
                  )}
                </View>
              ))}
            </View>
          </View>
        </View>

        {/* Procurement & Supplier Intelligence Hub */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Procurement & Supplier Intelligence Hub</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.suppliersScroll}>
            {suppliers.map(renderSupplierCard)}
          </ScrollView>
        </View>

        {/* Inventory Optimization Center */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Inventory Optimization Center</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.inventoryScroll}>
            {inventoryItems.map(renderInventoryItem)}
          </ScrollView>
        </View>

        {/* Active Shipments */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Active Shipments</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.shipmentsScroll}>
            {shipments.map(renderShipmentCard)}
          </ScrollView>
        </View>

        {/* Risk & Disruption Intelligence */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Risk & Disruption Intelligence</Text>
          <View style={styles.riskGrid}>
            {riskAlerts.map(renderRiskAlert)}
          </View>
        </View>

        {/* AI Supply Chain Insights */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>AI Supply Chain Insights</Text>
          <View style={styles.insightsList}>
            {supplyChainInsights.map(renderInsightCard)}
          </View>
        </View>

        {/* Real-time Operations Feed */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Real-time Operations Feed</Text>
          <View style={[styles.operationsFeed, { backgroundColor: theme.colors.card }]}>
            {supplyChainActivities.map(renderActivityItem)}
          </View>
        </View>

        {/* System Health & Data Network */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>System Health & Data Network</Text>
          <View style={styles.healthGrid}>
            {systemHealth.map(renderSystemHealth)}
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
    paddingHorizontal: 16,
    paddingVertical: 8,
    alignItems: 'flex-end',
  },
  sidebarContent: {
    gap: 4,
  },
  sidebarItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  sidebarItemText: {
    fontSize: 14,
  },
  content: {
    flex: 1,
    padding: 20,
  },
  topBar: {
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
    marginBottom: -8,
  },
  topBarKPIs: {
    flexDirection: 'row',
    gap: 12,
  },
  topBarKPI: {
    borderRadius: 8,
    padding: 12,
    borderWidth: 1,
    minWidth: 180,
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
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  topBarKPITrend: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingHorizontal: 6,
    paddingVertical: 2,
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
    flex: 1,
    minWidth: 180,
  },
  kpiHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  kpiTitle: {
    fontSize: 12,
    fontWeight: '500',
  },
  kpiTrendBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
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
    fontSize: 11,
    marginBottom: 8,
  },
  kpiRiskBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
    borderWidth: 1,
    alignSelf: 'flex-start',
  },
  kpiRiskText: {
    fontSize: 10,
    fontWeight: '600',
  },
  agentsScroll: {
    marginBottom: -8,
  },
  agentCard: {
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    width: 280,
    marginRight: 12,
  },
  agentAvatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: 'rgba(6, 182, 212, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
    position: 'relative',
  },
  agentAvatarText: {
    fontSize: 24,
  },
  agentStatusDot: {
    position: 'absolute',
    bottom: 2,
    right: 2,
    width: 12,
    height: 12,
    borderRadius: 6,
    borderWidth: 2,
    borderColor: '#0B0F14',
  },
  agentInfo: {
    marginBottom: 12,
  },
  agentName: {
    fontSize: 14,
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
    gap: 2,
  },
  agentMetricValue: {
    fontSize: 16,
    fontWeight: '700',
  },
  agentMetricLabel: {
    fontSize: 10,
  },
  agentInsights: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  agentInsightsCount: {
    fontSize: 14,
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
    borderRadius: 8,
  },
  commandCenterButtonText: {
    fontSize: 12,
    fontWeight: '600',
  },
  commandCenterMetrics: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 20,
  },
  commandMetricCard: {
    flex: 1,
    borderRadius: 8,
    padding: 16,
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
    fontSize: 28,
    fontWeight: '700',
    marginBottom: 8,
  },
  commandMetricTrend: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
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
    fontSize: 48,
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
    fontSize: 14,
    fontWeight: '600',
  },
  controlTower: {
    borderRadius: 12,
    padding: 20,
  },
  controlTowerHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 16,
  },
  controlTowerTitle: {
    fontSize: 16,
    fontWeight: '600',
  },
  supplyChainFlow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  flowNode: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  nodeCard: {
    borderRadius: 8,
    padding: 12,
    borderWidth: 1,
    width: 180,
  },
  nodeHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 8,
  },
  nodeIcon: {
    width: 32,
    height: 32,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  nodeInfo: {
    flex: 1,
  },
  nodeName: {
    fontSize: 12,
    fontWeight: '600',
    marginBottom: 2,
  },
  nodeLocation: {
    fontSize: 10,
  },
  nodeStatusBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
    borderWidth: 1,
  },
  nodeStatusDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
  },
  nodeStatusText: {
    fontSize: 9,
    fontWeight: '600',
  },
  nodeMetrics: {
    flexDirection: 'row',
    gap: 12,
  },
  nodeMetric: {
    gap: 2,
  },
  nodeMetricValue: {
    fontSize: 14,
    fontWeight: '700',
  },
  nodeMetricLabel: {
    fontSize: 10,
  },
  flowArrow: {
    paddingHorizontal: 8,
  },
  suppliersScroll: {
    marginBottom: -8,
  },
  supplierCard: {
    borderRadius: 8,
    padding: 12,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)',
    width: 240,
    marginRight: 12,
  },
  supplierHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  supplierName: {
    fontSize: 13,
    fontWeight: '600',
  },
  supplierContractBadge: {
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
    borderWidth: 1,
  },
  supplierContractText: {
    fontSize: 9,
    fontWeight: '600',
  },
  supplierCategory: {
    fontSize: 11,
    marginBottom: 8,
  },
  supplierMetrics: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 8,
  },
  supplierMetric: {
    gap: 2,
  },
  supplierMetricValue: {
    fontSize: 14,
    fontWeight: '700',
  },
  supplierMetricLabel: {
    fontSize: 10,
  },
  supplierDetails: {
    flexDirection: 'row',
    gap: 12,
  },
  supplierDetail: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  supplierDetailText: {
    fontSize: 11,
  },
  inventoryScroll: {
    marginBottom: -8,
  },
  inventoryCard: {
    borderRadius: 8,
    padding: 12,
    borderWidth: 1,
    width: 240,
    marginRight: 12,
  },
  inventoryHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  inventorySku: {
    fontSize: 10,
  },
  inventoryStatusBadge: {
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
    borderWidth: 1,
  },
  inventoryStatusText: {
    fontSize: 9,
    fontWeight: '600',
  },
  inventoryName: {
    fontSize: 13,
    fontWeight: '600',
    marginBottom: 2,
  },
  inventoryCategory: {
    fontSize: 11,
    marginBottom: 8,
  },
  inventoryMetrics: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 8,
  },
  inventoryMetric: {
    gap: 2,
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
    gap: 4,
  },
  inventoryLocationText: {
    fontSize: 11,
  },
  shipmentsScroll: {
    marginBottom: -8,
  },
  shipmentCard: {
    borderRadius: 8,
    padding: 12,
    borderWidth: 1,
    width: 280,
    marginRight: 12,
  },
  shipmentHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 8,
  },
  shipmentIcon: {
    width: 36,
    height: 36,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  shipmentInfo: {
    flex: 1,
  },
  shipmentCarrier: {
    fontSize: 13,
    fontWeight: '600',
    marginBottom: 2,
  },
  shipmentRoute: {
    fontSize: 11,
  },
  shipmentStatusBadge: {
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
    borderWidth: 1,
  },
  shipmentStatusText: {
    fontSize: 9,
    fontWeight: '600',
  },
  shipmentProgress: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 8,
  },
  shipmentProgressBar: {
    flex: 1,
    height: 6,
    backgroundColor: 'rgba(255,255,255,0.1)',
    borderRadius: 3,
    overflow: 'hidden',
  },
  shipmentProgressFill: {
    height: '100%',
  },
  shipmentProgressText: {
    fontSize: 11,
    fontWeight: '600',
  },
  shipmentDetails: {
    flexDirection: 'row',
    gap: 12,
  },
  shipmentDetail: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  shipmentDetailText: {
    fontSize: 11,
  },
  riskGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  riskCard: {
    borderRadius: 8,
    padding: 12,
    borderWidth: 1,
    flex: 1,
    minWidth: 300,
  },
  riskHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  riskSeverityBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
    borderWidth: 1,
  },
  riskSeverityText: {
    fontSize: 10,
    fontWeight: '600',
  },
  riskTimestamp: {
    fontSize: 11,
  },
  riskTitle: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 4,
  },
  riskDescription: {
    fontSize: 12,
    marginBottom: 8,
  },
  riskDetails: {
    flexDirection: 'row',
    gap: 12,
  },
  riskDetail: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  riskDetailText: {
    fontSize: 11,
  },
  insightsList: {
    gap: 12,
  },
  insightCard: {
    borderRadius: 8,
    padding: 12,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)',
  },
  insightHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  insightCategoryBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
    backgroundColor: 'rgba(6, 182, 212, 0.1)',
  },
  insightCategoryText: {
    fontSize: 11,
    fontWeight: '600',
  },
  insightMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  insightConfidence: {
    fontSize: 11,
  },
  insightActionBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
  },
  insightActionText: {
    fontSize: 10,
    fontWeight: '600',
  },
  insightText: {
    fontSize: 13,
    marginBottom: 8,
  },
  insightFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  insightImpactBadge: {
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
    borderWidth: 1,
  },
  insightImpactText: {
    fontSize: 9,
    fontWeight: '600',
  },
  insightTimestamp: {
    fontSize: 11,
  },
  operationsFeed: {
    borderRadius: 8,
    padding: 12,
  },
  activityItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 12,
    paddingVertical: 8,
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
  },
  activityEvent: {
    fontSize: 13,
    marginBottom: 4,
  },
  activityMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  activityTimestamp: {
    fontSize: 11,
  },
  activitySeparator: {
    fontSize: 11,
  },
  activityLocation: {
    fontSize: 11,
  },
  healthGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  healthCard: {
    borderRadius: 8,
    padding: 12,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)',
    flex: 1,
    minWidth: 200,
  },
  healthHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  healthSystem: {
    fontSize: 13,
    fontWeight: '600',
  },
  healthStatusBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
    borderWidth: 1,
  },
  healthStatusDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
  },
  healthStatusText: {
    fontSize: 9,
    fontWeight: '600',
  },
  healthMetrics: {
    flexDirection: 'row',
    gap: 12,
  },
  healthMetric: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  healthMetricValue: {
    fontSize: 12,
    fontWeight: '600',
  },
  healthMetricLabel: {
    fontSize: 10,
  },
});

export default SupplyChainCommandCenter;

