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
  MapPin,
  Navigation,
  Fuel,
  Warehouse,
  Ship,
  Plane,
  Train,
  Car,
  Gauge,
  Thermometer,
  Droplets,
  Leaf,
  Radio,
  HardDrive,
  Monitor,
  Server,
  Database,
  Wifi,
  AlertTriangle,
  CheckSquare,
  Box,
  Armchair,
  Cog,
  Hammer,
  ScanLine,
  Microscope,
  ClipboardList,
  Timer,
  Gauge as GaugeIcon,
  Zap as ZapIcon,
  Settings2,
  Layers as LayersIcon,
  Workflow,
  Compass,
  Radar,
  Map,
  Wrench,
  ShieldCheck,
  Anchor,
  Bike,
  Bus,
} from 'lucide-react-native';

// Types
interface TransportationAgent {
  id: string;
  name: string;
  specialty: string;
  avatar: string;
  status: 'active' | 'monitoring' | 'paused' | 'error';
  confidenceScore: number;
  logisticsImpactScore: number;
  metrics: {
    routesOptimized?: number;
    fuelSavings?: string;
    efficiencyGain?: string;
    shipmentsManaged?: number;
    trackingAccuracy?: number;
    deliverySuccess?: number;
    risksDetected?: number;
    disruptionsPrevented?: number;
    predictionAccuracy?: number;
  };
  activeInsights: number;
  trend: 'up' | 'down' | 'stable';
}

interface TransportationKPI {
  id: string;
  title: string;
  value: string;
  change: string;
  trend: 'up' | 'down' | 'stable';
  color: string;
  subtitle: string;
}

interface Shipment {
  id: string;
  trackingNumber: string;
  origin: string;
  destination: string;
  status: 'in-transit' | 'delivered' | 'delayed' | 'pending';
  carrier: string;
  eta: string;
  weight: string;
  priority: 'standard' | 'priority' | 'express';
}

interface Vehicle {
  id: string;
  vehicleId: string;
  type: 'truck' | 'van' | 'trailer' | 'container';
  driver: string;
  status: 'active' | 'idle' | 'maintenance' | 'out-of-service';
  location: string;
  fuelLevel: number;
  utilization: number;
  healthScore: number;
}

interface Route {
  id: string;
  routeId: string;
  origin: string;
  destination: string;
  distance: string;
  estimatedTime: string;
  fuelConsumption: string;
  efficiency: number;
  status: 'optimal' | 'suboptimal' | 'congested';
}

interface Warehouse {
  id: string;
  name: string;
  location: string;
  capacity: number;
  utilization: number;
  throughput: string;
  status: 'operational' | 'near-capacity' | 'over-capacity';
  inventoryAccuracy: number;
}

interface Carrier {
  id: string;
  name: string;
  type: string;
  reliability: number;
  costPerformance: number;
  transitTime: string;
  capacityUtilization: number;
  slaCompliance: number;
  status: 'active' | 'warning' | 'suspended';
}

interface SupplyChainNode {
  id: string;
  name: string;
  type: 'supplier' | 'warehouse' | 'distribution-center' | 'retailer';
  location: string;
  status: 'healthy' | 'warning' | 'critical';
  inventoryLevel: number;
  riskLevel: 'low' | 'medium' | 'high';
}

interface DemandForecast {
  id: string;
  region: string;
  period: string;
  forecastVolume: number;
  actualVolume?: number;
  accuracy: number;
  trend: 'increasing' | 'stable' | 'decreasing';
}

interface RiskEvent {
  id: string;
  type: 'weather' | 'port-congestion' | 'carrier-disruption' | 'fuel-price' | 'geopolitical';
  severity: 'low' | 'medium' | 'high' | 'critical';
  location: string;
  description: string;
  impact: string;
  status: 'active' | 'mitigated' | 'resolved';
}

interface LogisticsInsight {
  id: string;
  insight: string;
  category: string;
  confidence: number;
  impact: 'high' | 'medium' | 'low';
  timestamp: string;
}

interface LogisticsActivity {
  id: string;
  event: string;
  type: 'shipment' | 'fleet' | 'route' | 'warehouse' | 'carrier' | 'risk' | 'ai';
  timestamp: string;
  details?: string;
}

interface TransportationSystemHealth {
  id: string;
  system: string;
  status: 'healthy' | 'degraded' | 'down';
  uptime: string;
  latency: string;
}

const TransportationCommandCenter = () => {
  const theme = useTheme();
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [activeTab, setActiveTab] = useState('dashboard');

  // Navigation Items
  const navigationItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'agents', label: 'AI Logistics Agents', icon: Bot },
    { id: 'fleet', label: 'Fleet Operations', icon: Truck },
    { id: 'shipments', label: 'Shipment Tracking', icon: Package },
    { id: 'routes', label: 'Route Optimization', icon: Route },
    { id: 'warehouses', label: 'Warehouses', icon: Warehouse },
    { id: 'carriers', label: 'Carrier Management', icon: Ship },
    { id: 'supply-chain', label: 'Supply Chain Control Tower', icon: Network },
    { id: 'risk', label: 'Risk Management', icon: ShieldCheck },
    { id: 'analytics', label: 'Analytics', icon: BarChart3 },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  // Transportation KPIs
  const transportationKPIs: TransportationKPI[] = [
    { id: '1', title: 'Shipments In Transit', value: '482,400', change: '+8.2%', trend: 'up', color: '#06B6D4', subtitle: 'Active shipments' },
    { id: '2', title: 'On-Time Delivery Rate', value: '97.2%', change: '+1.4%', trend: 'up', color: '#10B981', subtitle: 'Delivery performance' },
    { id: '3', title: 'Fleet Utilization', value: '91%', change: '+3.8%', trend: 'up', color: '#8B5CF6', subtitle: 'Vehicle utilization' },
    { id: '4', title: 'Transportation Cost per Mile', value: '$2.84', change: '-5.2%', trend: 'down', color: '#F59E0B', subtitle: 'Cost efficiency' },
    { id: '5', title: 'Warehouse Throughput', value: '1.8M', change: '+12.4%', trend: 'up', color: '#EC4899', subtitle: 'Units per day' },
    { id: '6', title: 'Fuel Efficiency', value: '8.2 MPG', change: '+4.1%', trend: 'up', color: '#06B6D4', subtitle: 'Fleet average' },
    { id: '7', title: 'Order Fulfillment Rate', value: '98.4%', change: '+0.8%', trend: 'up', color: '#10B981', subtitle: 'Fulfillment accuracy' },
    { id: '8', title: 'Carrier Performance Score', value: '94', change: '+2.2%', trend: 'up', color: '#8B5CF6', subtitle: 'Carrier quality' },
    { id: '9', title: 'Supply Chain Risk Index', value: '12', change: '-18.5%', trend: 'down', color: '#EF4444', subtitle: 'Risk level' },
    { id: '10', title: 'AI Optimization Savings', value: '$82M', change: '+24.6%', trend: 'up', color: '#F59E0B', subtitle: 'Annual savings' },
  ];

  // AI Logistics Agents
  const transportationAgents: TransportationAgent[] = [
    {
      id: '1',
      name: 'Agent Atlas',
      specialty: 'Route Optimization Agent',
      avatar: '🗺️',
      status: 'active',
      confidenceScore: 97,
      logisticsImpactScore: 94,
      metrics: {
        routesOptimized: 482000,
        fuelSavings: '$24M',
        efficiencyGain: '+18%',
      },
      activeInsights: 156,
      trend: 'up',
    },
    {
      id: '2',
      name: 'Agent Transit',
      specialty: 'Shipment Intelligence Agent',
      avatar: '📦',
      status: 'active',
      confidenceScore: 96,
      logisticsImpactScore: 92,
      metrics: {
        shipmentsManaged: 8400000,
        trackingAccuracy: 99.7,
        deliverySuccess: 97,
      },
      activeInsights: 234,
      trend: 'up',
    },
    {
      id: '3',
      name: 'Agent Sentinel',
      specialty: 'Supply Chain Risk Agent',
      avatar: '🛡️',
      status: 'active',
      confidenceScore: 95,
      logisticsImpactScore: 89,
      metrics: {
        risksDetected: 2481,
        disruptionsPrevented: 842,
        predictionAccuracy: 95,
      },
      activeInsights: 89,
      trend: 'stable',
    },
  ];

  // Shipments
  const shipments: Shipment[] = [
    { id: '1', trackingNumber: 'TRK-1842947', origin: 'Los Angeles, CA', destination: 'New York, NY', status: 'in-transit', carrier: 'FedEx', eta: '2 days', weight: '450 lbs', priority: 'priority' },
    { id: '2', trackingNumber: 'TRK-1842948', origin: 'Chicago, IL', destination: 'Miami, FL', status: 'delivered', carrier: 'UPS', eta: 'Delivered', weight: '280 lbs', priority: 'standard' },
    { id: '3', trackingNumber: 'TRK-1842949', origin: 'Seattle, WA', destination: 'Boston, MA', status: 'delayed', carrier: 'DHL', eta: '3 days', weight: '620 lbs', priority: 'express' },
    { id: '4', trackingNumber: 'TRK-1842950', origin: 'Houston, TX', destination: 'Denver, CO', status: 'in-transit', carrier: 'FedEx', eta: '1 day', weight: '180 lbs', priority: 'standard' },
  ];

  // Vehicles
  const vehicles: Vehicle[] = [
    { id: '1', vehicleId: 'VH-2847', type: 'truck', driver: 'John Smith', status: 'active', location: 'I-95, Virginia', fuelLevel: 78, utilization: 92, healthScore: 95 },
    { id: '2', vehicleId: 'VH-2848', type: 'trailer', driver: 'Sarah Johnson', status: 'active', location: 'I-80, Pennsylvania', fuelLevel: 65, utilization: 88, healthScore: 97 },
    { id: '3', vehicleId: 'VH-2849', type: 'van', driver: 'Mike Davis', status: 'idle', location: 'Distribution Center A', fuelLevel: 92, utilization: 0, healthScore: 98 },
    { id: '4', vehicleId: 'VH-2850', type: 'truck', driver: 'Emily Brown', status: 'maintenance', location: 'Service Center', fuelLevel: 45, utilization: 0, healthScore: 72 },
  ];

  // Routes
  const routes: Route[] = [
    { id: '1', routeId: 'RT-001', origin: 'Los Angeles', destination: 'New York', distance: '2,789 mi', estimatedTime: '42h', fuelConsumption: '340 gal', efficiency: 94, status: 'optimal' },
    { id: '2', routeId: 'RT-002', origin: 'Chicago', destination: 'Miami', distance: '1,381 mi', estimatedTime: '21h', fuelConsumption: '168 gal', efficiency: 89, status: 'suboptimal' },
    { id: '3', routeId: 'RT-003', origin: 'Seattle', destination: 'Boston', distance: '3,005 mi', estimatedTime: '45h', fuelConsumption: '368 gal', efficiency: 76, status: 'congested' },
  ];

  // Warehouses
  const warehouses: Warehouse[] = [
    { id: '1', name: 'Distribution Center A', location: 'Atlanta, GA', capacity: 100000, utilization: 87, throughput: '420K units/day', status: 'operational', inventoryAccuracy: 99.2 },
    { id: '2', name: 'Distribution Center B', location: 'Dallas, TX', capacity: 75000, utilization: 94, throughput: '380K units/day', status: 'near-capacity', inventoryAccuracy: 98.8 },
    { id: '3', name: 'Distribution Center C', location: 'Phoenix, AZ', capacity: 50000, utilization: 78, throughput: '250K units/day', status: 'operational', inventoryAccuracy: 99.5 },
  ];

  // Carriers
  const carriers: Carrier[] = [
    { id: '1', name: 'FedEx', type: 'Express', reliability: 96, costPerformance: 88, transitTime: '2-3 days', capacityUtilization: 82, slaCompliance: 97, status: 'active' },
    { id: '2', name: 'UPS', type: 'Ground', reliability: 94, costPerformance: 92, transitTime: '3-5 days', capacityUtilization: 78, slaCompliance: 95, status: 'active' },
    { id: '3', name: 'DHL', type: 'International', reliability: 92, costPerformance: 85, transitTime: '5-7 days', capacityUtilization: 88, slaCompliance: 91, status: 'warning' },
  ];

  // Supply Chain Nodes
  const supplyChainNodes: SupplyChainNode[] = [
    { id: '1', name: 'Supplier Alpha', type: 'supplier', location: 'Shanghai, China', status: 'healthy', inventoryLevel: 85, riskLevel: 'low' },
    { id: '2', name: 'DC Atlanta', type: 'distribution-center', location: 'Atlanta, GA', status: 'healthy', inventoryLevel: 87, riskLevel: 'low' },
    { id: '3', name: 'DC Dallas', type: 'distribution-center', location: 'Dallas, TX', status: 'warning', inventoryLevel: 94, riskLevel: 'medium' },
    { id: '4', name: 'Retailer East', type: 'retailer', location: 'New York, NY', status: 'healthy', inventoryLevel: 72, riskLevel: 'low' },
  ];

  // Demand Forecasts
  const demandForecasts: DemandForecast[] = [
    { id: '1', region: 'North America', period: 'Q2 2024', forecastVolume: 1240000, accuracy: 94, trend: 'increasing' },
    { id: '2', region: 'Europe', period: 'Q2 2024', forecastVolume: 840000, accuracy: 91, trend: 'stable' },
    { id: '3', region: 'Asia Pacific', period: 'Q2 2024', forecastVolume: 1820000, accuracy: 89, trend: 'increasing' },
  ];

  // Risk Events
  const riskEvents: RiskEvent[] = [
    { id: '1', type: 'weather', severity: 'high', location: 'Gulf Coast', description: 'Hurricane warning affecting port operations', impact: '24-48h delay', status: 'active' },
    { id: '2', type: 'port-congestion', severity: 'medium', location: 'Los Angeles Port', description: 'Increased container backlog', impact: '12-24h delay', status: 'active' },
    { id: '3', type: 'fuel-price', severity: 'low', location: 'National', description: 'Fuel price volatility monitoring', impact: 'Cost variance +3%', status: 'active' },
  ];

  // Logistics Insights
  const logisticsInsights: LogisticsInsight[] = [
    { id: '1', insight: 'Route optimization could reduce fuel costs by 11% on West Coast corridor.', category: 'Route Optimization', confidence: 94, impact: 'high', timestamp: '2h ago' },
    { id: '2', insight: 'Distribution Center Dallas nearing capacity threshold - recommend expansion.', category: 'Capacity Planning', confidence: 96, impact: 'high', timestamp: '4h ago' },
    { id: '3', insight: 'High congestion risk detected at Los Angeles Port - consider alternate routing.', category: 'Risk Management', confidence: 89, impact: 'high', timestamp: '6h ago' },
    { id: '4', insight: 'Carrier DHL performance declining in western region - review SLA compliance.', category: 'Carrier Performance', confidence: 87, impact: 'medium', timestamp: '8h ago' },
    { id: '5', insight: 'Demand forecast indicates increased staffing requirements for Q2 peak season.', category: 'Workforce Planning', confidence: 92, impact: 'medium', timestamp: '10h ago' },
  ];

  // Logistics Activities
  const logisticsActivities: LogisticsActivity[] = [
    { id: '1', event: 'Shipment TRK-1842947 dispatched', type: 'shipment', timestamp: '2m ago', details: 'Los Angeles to New York' },
    { id: '2', event: 'Vehicle VH-2850 delayed for maintenance', type: 'fleet', timestamp: '15m ago', details: 'Scheduled service' },
    { id: '3', event: 'Route RT-003 optimized', type: 'route', timestamp: '32m ago', details: 'Efficiency improved by 8%' },
    { id: '4', event: 'Warehouse order fulfilled', type: 'warehouse', timestamp: '1h ago', details: 'DC Atlanta - 2,840 units' },
    { id: '5', event: 'Carrier alert received', type: 'carrier', timestamp: '2h ago', details: 'DHL - SLA warning' },
    { id: '6', event: 'Delivery completed', type: 'shipment', timestamp: '3h ago', details: 'TRK-1842948 - Chicago to Miami' },
    { id: '7', event: 'Supply chain risk detected', type: 'risk', timestamp: '4h ago', details: 'Port congestion - Los Angeles' },
  ];

  // Transportation System Health
  const transportationSystemHealth: TransportationSystemHealth[] = [
    { id: '1', system: 'Transportation Management System (TMS)', status: 'healthy', uptime: '99.9%', latency: '45ms' },
    { id: '2', system: 'Warehouse Management System (WMS)', status: 'healthy', uptime: '99.8%', latency: '38ms' },
    { id: '3', system: 'Fleet Telematics', status: 'healthy', uptime: '99.7%', latency: '22ms' },
    { id: '4', system: 'GPS Networks', status: 'healthy', uptime: '99.9%', latency: '15ms' },
    { id: '5', system: 'Carrier Integrations', status: 'healthy', uptime: '99.6%', latency: '52ms' },
    { id: '6', system: 'AI Logistics Agents', status: 'healthy', uptime: '99.8%', latency: '28ms' },
    { id: '7', system: 'IoT Sensors', status: 'healthy', uptime: '99.7%', latency: '18ms' },
  ];

  // Render Functions
  const renderKPICard = (kpi: TransportationKPI) => (
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

  const renderAgentCard = (agent: TransportationAgent) => (
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
          <Text style={[styles.agentMetricValue, { color: '#10B981' }]}>{agent.logisticsImpactScore}</Text>
          <Text style={[styles.agentMetricLabel, { color: theme.colors.textSecondary }]}>Impact</Text>
        </View>
      </View>
      <View style={styles.agentInsights}>
        <Text style={[styles.agentInsightsCount, { color: '#8B5CF6' }]}>{agent.activeInsights}</Text>
        <Text style={[styles.agentInsightsLabel, { color: theme.colors.textSecondary }]}>Insights</Text>
      </View>
    </View>
  );

  const renderShipmentCard = (shipment: Shipment) => (
    <View key={shipment.id} style={[styles.shipmentCard, { backgroundColor: theme.colors.card }]}>
      <View style={styles.shipmentHeader}>
        <Package size={20} color={shipment.status === 'in-transit' ? '#06B6D4' : shipment.status === 'delivered' ? '#10B981' : shipment.status === 'delayed' ? '#EF4444' : '#F59E0B'} />
        <View style={styles.shipmentInfo}>
          <Text style={[styles.shipmentTracking, { color: theme.colors.text }]}>{shipment.trackingNumber}</Text>
          <Text style={[styles.shipmentRoute, { color: theme.colors.textSecondary }]}>{shipment.origin} → {shipment.destination}</Text>
        </View>
      </View>
      <View style={styles.shipmentDetails}>
        <View style={styles.shipmentDetail}>
          <Text style={[styles.shipmentDetailLabel, { color: theme.colors.textSecondary }]}>Carrier</Text>
          <Text style={[styles.shipmentDetailValue, { color: theme.colors.text }]}>{shipment.carrier}</Text>
        </View>
        <View style={styles.shipmentDetail}>
          <Text style={[styles.shipmentDetailLabel, { color: theme.colors.textSecondary }]}>ETA</Text>
          <Text style={[styles.shipmentDetailValue, { color: theme.colors.text }]}>{shipment.eta}</Text>
        </View>
        <View style={styles.shipmentDetail}>
          <Text style={[styles.shipmentDetailLabel, { color: theme.colors.textSecondary }]}>Weight</Text>
          <Text style={[styles.shipmentDetailValue, { color: theme.colors.text }]}>{shipment.weight}</Text>
        </View>
      </View>
      <View style={[styles.shipmentStatusBadge, { backgroundColor: shipment.status === 'in-transit' ? 'rgba(6, 182, 212, 0.15)' : shipment.status === 'delivered' ? 'rgba(16, 185, 129, 0.15)' : shipment.status === 'delayed' ? 'rgba(239, 68, 68, 0.15)' : 'rgba(245, 158, 11, 0.15)' }]}>
        <Text style={[styles.shipmentStatusText, { color: shipment.status === 'in-transit' ? '#06B6D4' : shipment.status === 'delivered' ? '#10B981' : shipment.status === 'delayed' ? '#EF4444' : '#F59E0B' }]}>{shipment.status}</Text>
      </View>
    </View>
  );

  const renderVehicleCard = (vehicle: Vehicle) => (
    <View key={vehicle.id} style={[styles.vehicleCard, { backgroundColor: theme.colors.card }]}>
      <View style={styles.vehicleHeader}>
        <Truck size={20} color={vehicle.status === 'active' ? '#10B981' : vehicle.status === 'idle' ? '#F59E0B' : vehicle.status === 'maintenance' ? '#EF4444' : '#6B7280'} />
        <View style={styles.vehicleInfo}>
          <Text style={[styles.vehicleId, { color: theme.colors.text }]}>{vehicle.vehicleId}</Text>
          <Text style={[styles.vehicleDriver, { color: theme.colors.textSecondary }]}>{vehicle.driver}</Text>
        </View>
      </View>
      <View style={styles.vehicleMetrics}>
        <View style={styles.vehicleMetric}>
          <Text style={[styles.vehicleMetricValue, { color: '#06B6D4' }]}>{vehicle.utilization}%</Text>
          <Text style={[styles.vehicleMetricLabel, { color: theme.colors.textSecondary }]}>Utilization</Text>
        </View>
        <View style={styles.vehicleMetric}>
          <Text style={[styles.vehicleMetricValue, { color: vehicle.healthScore >= 90 ? '#10B981' : vehicle.healthScore >= 70 ? '#F59E0B' : '#EF4444' }]}>{vehicle.healthScore}%</Text>
          <Text style={[styles.vehicleMetricLabel, { color: theme.colors.textSecondary }]}>Health</Text>
        </View>
        <View style={styles.vehicleMetric}>
          <Text style={[styles.vehicleMetricValue, { color: vehicle.fuelLevel >= 50 ? '#10B981' : vehicle.fuelLevel >= 25 ? '#F59E0B' : '#EF4444' }]}>{vehicle.fuelLevel}%</Text>
          <Text style={[styles.vehicleMetricLabel, { color: theme.colors.textSecondary }]}>Fuel</Text>
        </View>
      </View>
      <View style={styles.vehicleLocation}>
        <MapPin size={14} color="rgba(255,255,255,0.5)" />
        <Text style={[styles.vehicleLocationText, { color: theme.colors.textSecondary }]}>{vehicle.location}</Text>
      </View>
    </View>
  );

  const renderRouteCard = (route: Route) => (
    <View key={route.id} style={[styles.routeCard, { backgroundColor: theme.colors.card }]}>
      <View style={styles.routeHeader}>
        <Route size={20} color={route.status === 'optimal' ? '#10B981' : route.status === 'suboptimal' ? '#F59E0B' : '#EF4444'} />
        <View style={styles.routeInfo}>
          <Text style={[styles.routeId, { color: theme.colors.text }]}>{route.routeId}</Text>
          <Text style={[styles.routePath, { color: theme.colors.textSecondary }]}>{route.origin} → {route.destination}</Text>
        </View>
      </View>
      <View style={styles.routeMetrics}>
        <View style={styles.routeMetric}>
          <Text style={[styles.routeMetricValue, { color: '#06B6D4' }]}>{route.distance}</Text>
          <Text style={[styles.routeMetricLabel, { color: theme.colors.textSecondary }]}>Distance</Text>
        </View>
        <View style={styles.routeMetric}>
          <Text style={[styles.routeMetricValue, { color: '#10B981' }]}>{route.estimatedTime}</Text>
          <Text style={[styles.routeMetricLabel, { color: theme.colors.textSecondary }]}>Time</Text>
        </View>
        <View style={styles.routeMetric}>
          <Text style={[styles.routeMetricValue, { color: '#8B5CF6' }]}>{route.efficiency}%</Text>
          <Text style={[styles.routeMetricLabel, { color: theme.colors.textSecondary }]}>Efficiency</Text>
        </View>
      </View>
      <View style={[styles.routeStatusBadge, { backgroundColor: route.status === 'optimal' ? 'rgba(16, 185, 129, 0.15)' : route.status === 'suboptimal' ? 'rgba(245, 158, 11, 0.15)' : 'rgba(239, 68, 68, 0.15)' }]}>
        <Text style={[styles.routeStatusText, { color: route.status === 'optimal' ? '#10B981' : route.status === 'suboptimal' ? '#F59E0B' : '#EF4444' }]}>{route.status}</Text>
      </View>
    </View>
  );

  const renderWarehouseCard = (warehouse: Warehouse) => (
    <View key={warehouse.id} style={[styles.warehouseCard, { backgroundColor: theme.colors.card }]}>
      <View style={styles.warehouseHeader}>
        <Warehouse size={20} color={warehouse.status === 'operational' ? '#10B981' : warehouse.status === 'near-capacity' ? '#F59E0B' : '#EF4444'} />
        <View style={styles.warehouseInfo}>
          <Text style={[styles.warehouseName, { color: theme.colors.text }]}>{warehouse.name}</Text>
          <Text style={[styles.warehouseLocation, { color: theme.colors.textSecondary }]}>{warehouse.location}</Text>
        </View>
      </View>
      <View style={styles.warehouseMetrics}>
        <View style={styles.warehouseMetric}>
          <Text style={[styles.warehouseMetricValue, { color: '#06B6D4' }]}>{warehouse.utilization}%</Text>
          <Text style={[styles.warehouseMetricLabel, { color: theme.colors.textSecondary }]}>Utilization</Text>
        </View>
        <View style={styles.warehouseMetric}>
          <Text style={[styles.warehouseMetricValue, { color: '#10B981' }]}>{warehouse.throughput}</Text>
          <Text style={[styles.warehouseMetricLabel, { color: theme.colors.textSecondary }]}>Throughput</Text>
        </View>
        <View style={styles.warehouseMetric}>
          <Text style={[styles.warehouseMetricValue, { color: '#8B5CF6' }]}>{warehouse.inventoryAccuracy}%</Text>
          <Text style={[styles.warehouseMetricLabel, { color: theme.colors.textSecondary }]}>Accuracy</Text>
        </View>
      </View>
      <View style={[styles.warehouseStatusBadge, { backgroundColor: warehouse.status === 'operational' ? 'rgba(16, 185, 129, 0.15)' : warehouse.status === 'near-capacity' ? 'rgba(245, 158, 11, 0.15)' : 'rgba(239, 68, 68, 0.15)' }]}>
        <Text style={[styles.warehouseStatusText, { color: warehouse.status === 'operational' ? '#10B981' : warehouse.status === 'near-capacity' ? '#F59E0B' : '#EF4444' }]}>{warehouse.status}</Text>
      </View>
    </View>
  );

  const renderCarrierCard = (carrier: Carrier) => (
    <View key={carrier.id} style={[styles.carrierCard, { backgroundColor: theme.colors.card }]}>
      <View style={styles.carrierHeader}>
        <Ship size={20} color={carrier.status === 'active' ? '#10B981' : carrier.status === 'warning' ? '#F59E0B' : '#EF4444'} />
        <View style={styles.carrierInfo}>
          <Text style={[styles.carrierName, { color: theme.colors.text }]}>{carrier.name}</Text>
          <Text style={[styles.carrierType, { color: theme.colors.textSecondary }]}>{carrier.type}</Text>
        </View>
      </View>
      <View style={styles.carrierMetrics}>
        <View style={styles.carrierMetric}>
          <Text style={[styles.carrierMetricValue, { color: '#06B6D4' }]}>{carrier.reliability}%</Text>
          <Text style={[styles.carrierMetricLabel, { color: theme.colors.textSecondary }]}>Reliability</Text>
        </View>
        <View style={styles.carrierMetric}>
          <Text style={[styles.carrierMetricValue, { color: '#10B981' }]}>{carrier.slaCompliance}%</Text>
          <Text style={[styles.carrierMetricLabel, { color: theme.colors.textSecondary }]}>SLA</Text>
        </View>
        <View style={styles.carrierMetric}>
          <Text style={[styles.carrierMetricValue, { color: '#8B5CF6' }]}>{carrier.capacityUtilization}%</Text>
          <Text style={[styles.carrierMetricLabel, { color: theme.colors.textSecondary }]}>Capacity</Text>
        </View>
      </View>
      <View style={[styles.carrierStatusBadge, { backgroundColor: carrier.status === 'active' ? 'rgba(16, 185, 129, 0.15)' : carrier.status === 'warning' ? 'rgba(245, 158, 11, 0.15)' : 'rgba(239, 68, 68, 0.15)' }]}>
        <Text style={[styles.carrierStatusText, { color: carrier.status === 'active' ? '#10B981' : carrier.status === 'warning' ? '#F59E0B' : '#EF4444' }]}>{carrier.status}</Text>
      </View>
    </View>
  );

  const renderRiskEventCard = (event: RiskEvent) => (
    <View key={event.id} style={[styles.riskEventCard, { backgroundColor: theme.colors.card }]}>
      <View style={styles.riskEventHeader}>
        <AlertTriangle size={20} color={event.severity === 'critical' ? '#EF4444' : event.severity === 'high' ? '#F59E0B' : event.severity === 'medium' ? '#06B6D4' : '#10B981'} />
        <View style={styles.riskEventInfo}>
          <Text style={[styles.riskEventType, { color: theme.colors.text }]}>{event.type}</Text>
          <Text style={[styles.riskEventLocation, { color: theme.colors.textSecondary }]}>{event.location}</Text>
        </View>
      </View>
      <View style={[styles.riskEventSeverityBadge, { backgroundColor: event.severity === 'critical' ? 'rgba(239, 68, 68, 0.15)' : event.severity === 'high' ? 'rgba(245, 158, 11, 0.15)' : event.severity === 'medium' ? 'rgba(6, 182, 212, 0.15)' : 'rgba(16, 185, 129, 0.15)' }]}>
        <Text style={[styles.riskEventSeverityText, { color: event.severity === 'critical' ? '#EF4444' : event.severity === 'high' ? '#F59E0B' : event.severity === 'medium' ? '#06B6D4' : '#10B981' }]}>{event.severity}</Text>
      </View>
      <Text style={[styles.riskEventDescription, { color: theme.colors.textSecondary }]}>{event.description}</Text>
      <Text style={[styles.riskEventImpact, { color: '#F59E0B' }]}>Impact: {event.impact}</Text>
    </View>
  );

  return (
    <View style={[styles.container, { backgroundColor: '#05070A' }]}>
      {/* Header */}
      <View style={[styles.header, { backgroundColor: 'rgba(5, 7, 10, 0.8)', borderBottomColor: 'rgba(255,255,255,0.1)' }]}>
        <View style={styles.headerContent}>
          <View style={styles.headerLeft}>
            <Truck size={32} color="#06B6D4" />
            <View style={styles.headerTitle}>
              <Text style={[styles.headerTitleText, { color: '#FFFFFF' }]}>AI Transportation & Logistics Command Center</Text>
              <Text style={[styles.headerSubtitle, { color: 'rgba(255,255,255,0.6)' }]}>Autonomous Fleet Operations & Global Supply Chain Intelligence</Text>
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
        
        {/* Top Executive Bar - Transportation KPIs */}
        <View style={[styles.topExecutiveBar, { backgroundColor: 'rgba(6, 182, 212, 0.08)', borderColor: 'rgba(6, 182, 212, 0.2)' }]}>
          <View style={styles.topBarHeader}>
            <View style={styles.topBarTitle}>
              <TrendingUp size={20} color="#06B6D4" />
              <Text style={[styles.topBarTitleText, { color: '#FFFFFF' }]}>Logistics Executive Overview</Text>
            </View>
            <Text style={[styles.topBarPeriod, { color: 'rgba(255,255,255,0.6)' }]}>Last 24 hours</Text>
          </View>
          
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.topBarScroll}>
            <View style={styles.topBarKPIs}>
              {transportationKPIs.slice(0, 5).map((kpi) => (
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

        {/* Transportation KPIs */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Logistics KPIs</Text>
          <View style={styles.kpiGrid}>
            {transportationKPIs.map(renderKPICard)}
          </View>
        </View>

        {/* AI Logistics Agents */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>AI Logistics Agents</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.agentsScroll}>
            {transportationAgents.map(renderAgentCard)}
          </ScrollView>
        </View>

        {/* Chief Logistics Officer Command Center */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Chief Logistics Officer Command Center</Text>
          <View style={[styles.commandCenter, { backgroundColor: 'rgba(6, 182, 212, 0.05)', borderColor: 'rgba(6, 182, 212, 0.2)' }]}>
            
            {/* Command Center Header */}
            <View style={styles.commandCenterHeader}>
              <View style={styles.commandCenterTitle}>
                <Brain size={24} color="#06B6D4" />
                <View>
                  <Text style={[styles.commandCenterTitleText, { color: '#FFFFFF' }]}>Global Logistics Intelligence Hub</Text>
                  <Text style={[styles.commandCenterSubtitle, { color: 'rgba(255,255,255,0.6)' }]}>Real-time transportation operations monitoring</Text>
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
                  <Package size={20} color="#06B6D4" />
                  <Text style={[styles.commandMetricLabel, { color: 'rgba(255,255,255,0.7)' }]}>Active Shipments</Text>
                </View>
                <Text style={[styles.commandMetricValue, { color: '#06B6D4' }]}>482,400</Text>
                <View style={styles.commandMetricTrend}>
                  <TrendingUp size={14} color="#10B981" />
                  <Text style={[styles.commandMetricTrendText, { color: '#10B981' }]}>+8.2%</Text>
                  <Text style={[styles.commandMetricPeriod, { color: 'rgba(255,255,255,0.5)' }]}>In transit</Text>
                </View>
              </View>

              <View style={[styles.commandMetricCard, { backgroundColor: 'rgba(255,255,255,0.03)', borderColor: 'rgba(16, 185, 129, 0.3)' }]}>
                <View style={styles.commandMetricHeader}>
                  <CheckCircle size={20} color="#10B981" />
                  <Text style={[styles.commandMetricLabel, { color: 'rgba(255,255,255,0.7)' }]}>On-Time Delivery</Text>
                </View>
                <Text style={[styles.commandMetricValue, { color: '#10B981' }]}>97.2%</Text>
                <View style={styles.commandMetricTrend}>
                  <TrendingUp size={14} color="#10B981" />
                  <Text style={[styles.commandMetricTrendText, { color: '#10B981' }]}>+1.4%</Text>
                  <Text style={[styles.commandMetricPeriod, { color: 'rgba(255,255,255,0.5)' }]}>Delivery rate</Text>
                </View>
              </View>

              <View style={[styles.commandMetricCard, { backgroundColor: 'rgba(255,255,255,0.03)', borderColor: 'rgba(139, 92, 246, 0.3)' }]}>
                <View style={styles.commandMetricHeader}>
                  <Truck size={20} color="#8B5CF6" />
                  <Text style={[styles.commandMetricLabel, { color: 'rgba(255,255,255,0.7)' }]}>Fleet Utilization</Text>
                </View>
                <Text style={[styles.commandMetricValue, { color: '#8B5CF6' }]}>91%</Text>
                <View style={styles.commandMetricTrend}>
                  <TrendingUp size={14} color="#10B981" />
                  <Text style={[styles.commandMetricTrendText, { color: '#10B981' }]}>+3.8%</Text>
                  <Text style={[styles.commandMetricPeriod, { color: 'rgba(255,255,255,0.5)' }]}>Vehicle usage</Text>
                </View>
              </View>

              <View style={[styles.commandMetricCard, { backgroundColor: 'rgba(255,255,255,0.03)', borderColor: 'rgba(245, 158, 11, 0.3)' }]}>
                <View style={styles.commandMetricHeader}>
                  <Warehouse size={20} color="#F59E0B" />
                  <Text style={[styles.commandMetricLabel, { color: 'rgba(255,255,255,0.7)' }]}>Warehouse Throughput</Text>
                </View>
                <Text style={[styles.commandMetricValue, { color: '#F59E0B' }]}>1.8M</Text>
                <View style={styles.commandMetricTrend}>
                  <TrendingUp size={14} color="#10B981" />
                  <Text style={[styles.commandMetricTrendText, { color: '#10B981' }]}>+12.4%</Text>
                  <Text style={[styles.commandMetricPeriod, { color: 'rgba(255,255,255,0.5)' }]}>Units/day</Text>
                </View>
              </View>

              <View style={[styles.commandMetricCard, { backgroundColor: 'rgba(255,255,255,0.03)', borderColor: 'rgba(236, 72, 153, 0.3)' }]}>
                <View style={styles.commandMetricHeader}>
                  <Zap size={20} color="#EC4899" />
                  <Text style={[styles.commandMetricLabel, { color: 'rgba(255,255,255,0.7)' }]}>AI Savings</Text>
                </View>
                <Text style={[styles.commandMetricValue, { color: '#EC4899' }]}>$82M</Text>
                <View style={styles.commandMetricTrend}>
                  <TrendingUp size={14} color="#10B981" />
                  <Text style={[styles.commandMetricTrendText, { color: '#10B981' }]}>+24.6%</Text>
                  <Text style={[styles.commandMetricPeriod, { color: 'rgba(255,255,255,0.5)' }]}>Annual savings</Text>
                </View>
              </View>
            </View>

            {/* Logistics Health Overview */}
            <View style={styles.commandCenterHealth}>
              <View style={styles.healthOverview}>
                <Text style={[styles.healthOverviewTitle, { color: '#FFFFFF' }]}>Logistics Health Score</Text>
                <View style={styles.healthScoreContainer}>
                  <Text style={[styles.healthScore, { color: '#10B981' }]}>94%</Text>
                  <View style={styles.healthScoreIndicator}>
                    <View style={[styles.healthScoreBar, { width: '94%', backgroundColor: '#10B981' }]} />
                  </View>
                </View>
                <Text style={[styles.healthScoreDescription, { color: 'rgba(255,255,255,0.6)' }]}>Excellent - All logistics systems optimal</Text>
              </View>

              <View style={styles.healthBreakdown}>
                <Text style={[styles.healthBreakdownTitle, { color: '#FFFFFF' }]}>Health Breakdown</Text>
                <View style={styles.healthBreakdownItems}>
                  <View style={styles.healthBreakdownItem}>
                    <View style={[styles.healthBreakdownDot, { backgroundColor: '#06B6D4' }]} />
                    <Text style={[styles.healthBreakdownLabel, { color: 'rgba(255,255,255,0.7)' }]}>Shipment Performance</Text>
                    <Text style={[styles.healthBreakdownValue, { color: '#06B6D4' }]}>97%</Text>
                  </View>
                  <View style={styles.healthBreakdownItem}>
                    <View style={[styles.healthBreakdownDot, { backgroundColor: '#10B981' }]} />
                    <Text style={[styles.healthBreakdownLabel, { color: 'rgba(255,255,255,0.7)' }]}>Fleet Health</Text>
                    <Text style={[styles.healthBreakdownValue, { color: '#10B981' }]}>95%</Text>
                  </View>
                  <View style={styles.healthBreakdownItem}>
                    <View style={[styles.healthBreakdownDot, { backgroundColor: '#8B5CF6' }]} />
                    <Text style={[styles.healthBreakdownLabel, { color: 'rgba(255,255,255,0.7)' }]}>Warehouse Efficiency</Text>
                    <Text style={[styles.healthBreakdownValue, { color: '#8B5CF6' }]}>92%</Text>
                  </View>
                  <View style={styles.healthBreakdownItem}>
                    <View style={[styles.healthBreakdownDot, { backgroundColor: '#F59E0B' }]} />
                    <Text style={[styles.healthBreakdownLabel, { color: 'rgba(255,255,255,0.7)' }]}>Carrier Performance</Text>
                    <Text style={[styles.healthBreakdownValue, { color: '#F59E0B' }]}>91%</Text>
                  </View>
                </View>
              </View>
            </View>

            {/* Global Operations Map Visualization */}
            <View style={styles.globalOperationsSection}>
              <View style={styles.globalOperationsHeader}>
                <Globe size={16} color="#06B6D4" />
                <Text style={[styles.globalOperationsTitle, { color: '#FFFFFF' }]}>Global Operations Overview</Text>
              </View>
              <View style={styles.globalOperationsVisualization}>
                <View style={styles.globalOperationsStats}>
                  {[
                    { region: 'North America', shipments: '184K', status: 'optimal' },
                    { region: 'Europe', shipments: '142K', status: 'optimal' },
                    { region: 'Asia Pacific', shipments: '156K', status: 'warning' },
                  ].map((item, index) => (
                    <View key={index} style={styles.globalOperationsStat}>
                      <Text style={[styles.globalOperationsRegion, { color: 'rgba(255,255,255,0.8)' }]}>{item.region}</Text>
                      <Text style={[styles.globalOperationsShipments, { color: '#06B6D4' }]}>{item.shipments}</Text>
                      <View style={[styles.globalOperationsStatus, { backgroundColor: item.status === 'optimal' ? 'rgba(16, 185, 129, 0.15)' : 'rgba(245, 158, 11, 0.15)' }]}>
                        <Text style={[styles.globalOperationsStatusText, { color: item.status === 'optimal' ? '#10B981' : '#F59E0B' }]}>{item.status}</Text>
                      </View>
                    </View>
                  ))}
                </View>
              </View>
            </View>
          </View>
        </View>

        {/* Global Shipment Control Tower */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Global Shipment Control Tower</Text>
          <View style={[styles.shipmentControlTower, { backgroundColor: theme.colors.card }]}>
            
            {/* Shipment Statistics */}
            <View style={styles.shipmentStats}>
              <View style={styles.shipmentStat}>
                <Text style={[styles.shipmentStatValue, { color: '#06B6D4' }]}>284K</Text>
                <Text style={[styles.shipmentStatLabel, { color: theme.colors.textSecondary }]}>Domestic Shipments</Text>
              </View>
              <View style={styles.shipmentStat}>
                <Text style={[styles.shipmentStatValue, { color: '#10B981' }]}>198K</Text>
                <Text style={[styles.shipmentStatLabel, { color: theme.colors.textSecondary }]}>International Shipments</Text>
              </View>
              <View style={styles.shipmentStat}>
                <Text style={[styles.shipmentStatValue, { color: '#F59E0B' }]}>1,240</Text>
                <Text style={[styles.shipmentStatLabel, { color: theme.colors.textSecondary }]}>Delayed Shipments</Text>
              </View>
              <View style={styles.shipmentStat}>
                <Text style={[styles.shipmentStatValue, { color: '#8B5CF6' }]}>42K</Text>
                <Text style={[styles.shipmentStatLabel, { color: theme.colors.textSecondary }]}>Priority Freight</Text>
              </View>
            </View>

            {/* Shipment Lifecycle Workflow */}
            <View style={styles.shipmentWorkflow}>
              <Text style={[styles.shipmentWorkflowTitle, { color: '#FFFFFF' }]}>Shipment Lifecycle</Text>
              <View style={styles.shipmentWorkflowSteps}>
                {[
                  { step: 'Order Created', status: 'completed' },
                  { step: 'Warehouse Pick', status: 'completed' },
                  { step: 'Carrier Assigned', status: 'completed' },
                  { step: 'In Transit', status: 'active' },
                  { step: 'Last Mile', status: 'pending' },
                  { step: 'Delivered', status: 'pending' },
                ].map((item, index) => (
                  <View key={index} style={styles.shipmentWorkflowStep}>
                    <View style={[
                      styles.shipmentWorkflowStepDot,
                      { backgroundColor: item.status === 'completed' ? '#10B981' : item.status === 'active' ? '#06B6D4' : '#6B7280' }
                    ]} />
                    <Text style={[
                      styles.shipmentWorkflowStepText,
                      { color: item.status === 'completed' ? '#10B981' : item.status === 'active' ? '#06B6D4' : 'rgba(255,255,255,0.5)' }
                    ]}>{item.step}</Text>
                    {index < 5 && <View style={[styles.shipmentWorkflowStepLine, { backgroundColor: item.status === 'completed' ? '#10B981' : '#6B7280' }]} />}
                  </View>
                ))}
              </View>
            </View>

            {/* Recent Shipments */}
            <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.shipmentsScroll}>
              {shipments.map(renderShipmentCard)}
            </ScrollView>
          </View>
        </View>

        {/* Fleet Operations Center */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Fleet Operations Center</Text>
          <View style={[styles.fleetOperationsCenter, { backgroundColor: theme.colors.card }]}>
            
            {/* Fleet Statistics */}
            <View style={styles.fleetStats}>
              <View style={styles.fleetStat}>
                <Text style={[styles.fleetStatValue, { color: '#06B6D4' }]}>2,840</Text>
                <Text style={[styles.fleetStatLabel, { color: theme.colors.textSecondary }]}>Vehicles Active</Text>
              </View>
              <View style={styles.fleetStat}>
                <Text style={[styles.fleetStatValue, { color: '#10B981' }]}>91%</Text>
                <Text style={[styles.fleetStatLabel, { color: theme.colors.textSecondary }]}>Fleet Utilization</Text>
              </View>
              <View style={styles.fleetStat}>
                <Text style={[styles.fleetStatValue, { color: '#8B5CF6' }]}>94%</Text>
                <Text style={[styles.fleetStatLabel, { color: theme.colors.textSecondary }]}>Driver Performance</Text>
              </View>
              <View style={styles.fleetStat}>
                <Text style={[styles.fleetStatValue, { color: '#F59E0B' }]}>92%</Text>
                <Text style={[styles.fleetStatLabel, { color: theme.colors.textSecondary }]}>Vehicle Health</Text>
              </View>
            </View>

            {/* Vehicle Fleet */}
            <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.vehiclesScroll}>
              {vehicles.map(renderVehicleCard)}
            </ScrollView>
          </View>
        </View>

        {/* Route Optimization Engine */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Route Optimization Engine</Text>
          <View style={[styles.routeOptimizationEngine, { backgroundColor: theme.colors.card }]}>
            
            {/* Route Statistics */}
            <View style={styles.routeStats}>
              <View style={styles.routeStat}>
                <Text style={[styles.routeStatValue, { color: '#06B6D4' }]}>94%</Text>
                <Text style={[styles.routeStatLabel, { color: theme.colors.textSecondary }]}>Route Efficiency</Text>
              </View>
              <View style={styles.routeStat}>
                <Text style={[styles.routeStatValue, { color: '#10B981' }]}>-11%</Text>
                <Text style={[styles.routeStatLabel, { color: theme.colors.textSecondary }]}>Travel Time</Text>
              </View>
              <View style={styles.routeStat}>
                <Text style={[styles.routeStatValue, { color: '#8B5CF6' }]}>-8%</Text>
                <Text style={[styles.routeStatLabel, { color: theme.colors.textSecondary }]}>Fuel Usage</Text>
              </View>
              <View style={styles.routeStat}>
                <Text style={[styles.routeStatValue, { color: '#F59E0B' }]}>+15%</Text>
                <Text style={[styles.routeStatLabel, { color: theme.colors.textSecondary }]}>Delivery Density</Text>
              </View>
            </View>

            {/* Optimized Routes */}
            <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.routesScroll}>
              {routes.map(renderRouteCard)}
            </ScrollView>
          </View>
        </View>

        {/* Warehouse Intelligence Hub */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Warehouse Intelligence Hub</Text>
          <View style={[styles.warehouseIntelligenceHub, { backgroundColor: theme.colors.card }]}>
            
            {/* Warehouse Statistics */}
            <View style={styles.warehouseStats}>
              <View style={styles.warehouseStat}>
                <Text style={[styles.warehouseStatValue, { color: '#06B6D4' }]}>1.8M</Text>
                <Text style={[styles.warehouseStatLabel, { color: theme.colors.textSecondary }]}>Inventory Movement</Text>
              </View>
              <View style={styles.warehouseStat}>
                <Text style={[styles.warehouseStatValue, { color: '#10B981' }]}>94%</Text>
                <Text style={[styles.warehouseStatLabel, { color: theme.colors.textSecondary }]}>Picking Efficiency</Text>
              </View>
              <View style={styles.warehouseStat}>
                <Text style={[styles.warehouseStatValue, { color: '#8B5CF6' }]}>92%</Text>
                <Text style={[styles.warehouseStatLabel, { color: theme.colors.textSecondary }]}>Packing Operations</Text>
              </View>
              <View style={styles.warehouseStat}>
                <Text style={[styles.warehouseStatValue, { color: '#F59E0B' }]}>87%</Text>
                <Text style={[styles.warehouseStatLabel, { color: theme.colors.textSecondary }]}>Dock Utilization</Text>
              </View>
            </View>

            {/* Warehouses */}
            <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.warehousesScroll}>
              {warehouses.map(renderWarehouseCard)}
            </ScrollView>
          </View>
        </View>

        {/* Carrier Performance Management */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Carrier Performance Management</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.carriersScroll}>
            {carriers.map(renderCarrierCard)}
          </ScrollView>
        </View>

        {/* Supply Chain Control Tower */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Supply Chain Control Tower</Text>
          <View style={[styles.supplyChainControlTower, { backgroundColor: theme.colors.card }]}>
            
            {/* Supply Chain Statistics */}
            <View style={styles.supplyChainStats}>
              <View style={styles.supplyChainStat}>
                <Text style={[styles.supplyChainStatValue, { color: '#06B6D4' }]}>94%</Text>
                <Text style={[styles.supplyChainStatLabel, { color: theme.colors.textSecondary }]}>Supplier Status</Text>
              </View>
              <View style={styles.supplyChainStat}>
                <Text style={[styles.supplyChainStatValue, { color: '#10B981' }]}>86%</Text>
                <Text style={[styles.supplyChainStatLabel, { color: theme.colors.textSecondary }]}>Inventory Levels</Text>
              </View>
              <View style={styles.supplyChainStat}>
                <Text style={[styles.supplyChainStatValue, { color: '#8B5CF6' }]}>92%</Text>
                <Text style={[styles.supplyChainStatLabel, { color: theme.colors.textSecondary }]}>Distribution Centers</Text>
              </View>
              <View style={styles.supplyChainStat}>
                <Text style={[styles.supplyChainStatValue, { color: '#F59E0B' }]}>15</Text>
                <Text style={[styles.supplyChainStatLabel, { color: theme.colors.textSecondary }]}>Supply Risks</Text>
              </View>
            </View>

            {/* Supply Chain Nodes */}
            <View style={styles.supplyChainNodes}>
              {supplyChainNodes.map((node) => (
                <View key={node.id} style={[styles.supplyChainNode, { backgroundColor: 'rgba(255,255,255,0.03)', borderColor: node.status === 'healthy' ? 'rgba(16, 185, 129, 0.3)' : node.status === 'warning' ? 'rgba(245, 158, 11, 0.3)' : 'rgba(239, 68, 68, 0.3)' }]}>
                  <View style={styles.supplyChainNodeHeader}>
                    <Network size={16} color={node.status === 'healthy' ? '#10B981' : node.status === 'warning' ? '#F59E0B' : '#EF4444'} />
                    <Text style={[styles.supplyChainNodeName, { color: theme.colors.text }]}>{node.name}</Text>
                  </View>
                  <Text style={[styles.supplyChainNodeType, { color: theme.colors.textSecondary }]}>{node.type}</Text>
                  <Text style={[styles.supplyChainNodeLocation, { color: 'rgba(255,255,255,0.5)' }]}>{node.location}</Text>
                  <View style={styles.supplyChainNodeMetrics}>
                    <View style={styles.supplyChainNodeMetric}>
                      <Text style={[styles.supplyChainNodeMetricLabel, { color: theme.colors.textSecondary }]}>Inventory</Text>
                      <Text style={[styles.supplyChainNodeMetricValue, { color: '#06B6D4' }]}>{node.inventoryLevel}%</Text>
                    </View>
                    <View style={[styles.supplyChainNodeRiskBadge, { backgroundColor: node.riskLevel === 'low' ? 'rgba(16, 185, 129, 0.15)' : node.riskLevel === 'medium' ? 'rgba(245, 158, 11, 0.15)' : 'rgba(239, 68, 68, 0.15)' }]}>
                      <Text style={[styles.supplyChainNodeRiskText, { color: node.riskLevel === 'low' ? '#10B981' : node.riskLevel === 'medium' ? '#F59E0B' : '#EF4444' }]}>Risk: {node.riskLevel}</Text>
                    </View>
                  </View>
                </View>
              ))}
            </View>
          </View>
        </View>

        {/* Demand Forecasting & Capacity Planning */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Demand Forecasting & Capacity Planning</Text>
          <View style={[styles.demandForecastingSection, { backgroundColor: theme.colors.card }]}>
            
            {/* Forecast Statistics */}
            <View style={styles.forecastStats}>
              <View style={styles.forecastStat}>
                <Text style={[styles.forecastStatValue, { color: '#06B6D4' }]}>3.9M</Text>
                <Text style={[styles.forecastStatLabel, { color: theme.colors.textSecondary }]}>Shipment Forecasts</Text>
              </View>
              <View style={styles.forecastStat}>
                <Text style={[styles.forecastStatValue, { color: '#10B981' }]}>+18%</Text>
                <Text style={[styles.forecastStatLabel, { color: theme.colors.textSecondary }]}>Seasonal Demand</Text>
              </View>
              <View style={styles.forecastStat}>
                <Text style={[styles.forecastStatValue, { color: '#8B5CF6' }]}>92%</Text>
                <Text style={[styles.forecastStatLabel, { color: theme.colors.textSecondary }]}>Capacity Requirements</Text>
              </View>
              <View style={styles.forecastStat}>
                <Text style={[styles.forecastStatValue, { color: '#F59E0B' }]}>+12%</Text>
                <Text style={[styles.forecastStatLabel, { color: theme.colors.textSecondary }]}>Workforce Planning</Text>
              </View>
            </View>

            {/* Demand Forecasts */}
            <View style={styles.demandForecasts}>
              {demandForecasts.map((forecast) => (
                <View key={forecast.id} style={[styles.demandForecastCard, { backgroundColor: 'rgba(255,255,255,0.03)', borderColor: forecast.trend === 'increasing' ? 'rgba(16, 185, 129, 0.3)' : forecast.trend === 'stable' ? 'rgba(6, 182, 212, 0.3)' : 'rgba(245, 158, 11, 0.3)' }]}>
                  <Text style={[styles.demandForecastRegion, { color: theme.colors.text }]}>{forecast.region}</Text>
                  <Text style={[styles.demandForecastPeriod, { color: theme.colors.textSecondary }]}>{forecast.period}</Text>
                  <View style={styles.demandForecastMetrics}>
                    <View style={styles.demandForecastMetric}>
                      <Text style={[styles.demandForecastMetricLabel, { color: theme.colors.textSecondary }]}>Forecast</Text>
                      <Text style={[styles.demandForecastMetricValue, { color: '#06B6D4' }]}>{forecast.forecastVolume.toLocaleString()}</Text>
                    </View>
                    <View style={styles.demandForecastMetric}>
                      <Text style={[styles.demandForecastMetricLabel, { color: theme.colors.textSecondary }]}>Accuracy</Text>
                      <Text style={[styles.demandForecastMetricValue, { color: '#10B981' }]}>{forecast.accuracy}%</Text>
                    </View>
                  </View>
                  <View style={[styles.demandForecastTrendBadge, { backgroundColor: forecast.trend === 'increasing' ? 'rgba(16, 185, 129, 0.15)' : forecast.trend === 'stable' ? 'rgba(6, 182, 212, 0.15)' : 'rgba(245, 158, 11, 0.15)' }]}>
                    <Text style={[styles.demandForecastTrendText, { color: forecast.trend === 'increasing' ? '#10B981' : forecast.trend === 'stable' ? '#06B6D4' : '#F59E0B' }]}>{forecast.trend}</Text>
                  </View>
                </View>
              ))}
            </View>
          </View>
        </View>

        {/* Risk & Disruption Management */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Risk & Disruption Management</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.riskEventsScroll}>
            {riskEvents.map(renderRiskEventCard)}
          </ScrollView>
        </View>

        {/* AI Logistics Insights */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>AI Logistics Insights</Text>
          <View style={styles.insightsContainer}>
            {logisticsInsights.map((insight) => (
              <View key={insight.id} style={[styles.insightCard, { backgroundColor: theme.colors.card, borderColor: insight.impact === 'high' ? '#EF4444' + '30' : insight.impact === 'medium' ? '#F59E0B' + '30' : '#10B981' + '30' }]}>
                <View style={styles.insightHeader}>
                  <Lightbulb size={16} color={insight.impact === 'high' ? '#EF4444' : insight.impact === 'medium' ? '#F59E0B' : '#10B981'} />
                  <Text style={[styles.insightCategory, { color: theme.colors.textSecondary }]}>{insight.category}</Text>
                </View>
                <Text style={[styles.insightText, { color: theme.colors.text }]}>{insight.insight}</Text>
                <View style={styles.insightFooter}>
                  <View style={styles.insightConfidence}>
                    <Text style={[styles.insightConfidenceLabel, { color: theme.colors.textSecondary }]}>Confidence</Text>
                    <Text style={[styles.insightConfidenceValue, { color: '#06B6D4' }]}>{insight.confidence}%</Text>
                  </View>
                  <Text style={[styles.insightTimestamp, { color: 'rgba(255,255,255,0.5)' }]}>{insight.timestamp}</Text>
                </View>
              </View>
            ))}
          </View>
        </View>

        {/* Real-Time Operations Feed */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Real-Time Operations Feed</Text>
          <View style={[styles.operationsFeed, { backgroundColor: theme.colors.card }]}>
            {logisticsActivities.map((activity) => (
              <View key={activity.id} style={styles.activityItem}>
                <View style={[
                  styles.activityDot,
                  { backgroundColor: activity.type === 'shipment' ? '#06B6D4' : activity.type === 'fleet' ? '#10B981' : activity.type === 'route' ? '#8B5CF6' : activity.type === 'warehouse' ? '#F59E0B' : activity.type === 'carrier' ? '#EC4899' : activity.type === 'risk' ? '#EF4444' : '#06B6D4' }
                ]} />
                <View style={styles.activityContent}>
                  <Text style={[styles.activityEvent, { color: theme.colors.text }]}>{activity.event}</Text>
                  {activity.details && <Text style={[styles.activityDetails, { color: theme.colors.textSecondary }]}>{activity.details}</Text>}
                  <Text style={[styles.activityTimestamp, { color: 'rgba(255,255,255,0.5)' }]}>{activity.timestamp}</Text>
                </View>
              </View>
            ))}
          </View>
        </View>

        {/* Transportation System Health */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Transportation System Health</Text>
          <View style={styles.systemHealthGrid}>
            {transportationSystemHealth.map((system) => (
              <View key={system.id} style={[styles.systemHealthCard, { backgroundColor: theme.colors.card, borderColor: system.status === 'healthy' ? '#10B981' + '30' : system.status === 'degraded' ? '#F59E0B' + '30' : '#EF4444' + '30' }]}>
                <View style={styles.systemHealthHeader}>
                  <Server size={16} color={system.status === 'healthy' ? '#10B981' : system.status === 'degraded' ? '#F59E0B' : '#EF4444'} />
                  <Text style={[styles.systemHealthName, { color: theme.colors.text }]}>{system.system}</Text>
                </View>
                <View style={styles.systemHealthMetrics}>
                  <View style={styles.systemHealthMetric}>
                    <Text style={[styles.systemHealthMetricLabel, { color: theme.colors.textSecondary }]}>Uptime</Text>
                    <Text style={[styles.systemHealthMetricValue, { color: '#10B981' }]}>{system.uptime}</Text>
                  </View>
                  <View style={styles.systemHealthMetric}>
                    <Text style={[styles.systemHealthMetricLabel, { color: theme.colors.textSecondary }]}>Latency</Text>
                    <Text style={[styles.systemHealthMetricValue, { color: '#06B6D4' }]}>{system.latency}</Text>
                  </View>
                </View>
                <View style={[styles.systemHealthStatusBadge, { backgroundColor: system.status === 'healthy' ? 'rgba(16, 185, 129, 0.15)' : system.status === 'degraded' ? 'rgba(245, 158, 11, 0.15)' : 'rgba(239, 68, 68, 0.15)' }]}>
                  <Text style={[styles.systemHealthStatusText, { color: system.status === 'healthy' ? '#10B981' : system.status === 'degraded' ? '#F59E0B' : '#EF4444' }]}>{system.status}</Text>
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
  },
  header: {
    borderBottomWidth: 1,
    paddingHorizontal: 20,
    paddingVertical: 16,
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
    padding: 10,
    borderRadius: 8,
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
    alignItems: 'flex-end',
    paddingRight: 16,
    paddingBottom: 12,
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
  topExecutiveBar: {
    borderWidth: 1,
    borderRadius: 12,
    padding: 16,
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
    borderWidth: 1,
    borderRadius: 8,
    padding: 16,
    minWidth: 180,
  },
  topBarKPITitle: {
    fontSize: 12,
    marginBottom: 8,
  },
  topBarKPIValue: {
    fontSize: 24,
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
    marginBottom: 32,
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
    borderWidth: 1,
    borderRadius: 12,
    padding: 16,
    width: '48%',
  },
  kpiHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  kpiTitle: {
    fontSize: 13,
    fontWeight: '500',
  },
  kpiTrendBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
  },
  kpiTrendText: {
    fontSize: 11,
    fontWeight: '600',
  },
  kpiValue: {
    fontSize: 28,
    fontWeight: '700',
    marginBottom: 4,
  },
  kpiSubtitle: {
    fontSize: 12,
  },
  agentsScroll: {
    marginBottom: 8,
  },
  agentCard: {
    borderWidth: 1,
    borderRadius: 12,
    padding: 16,
    minWidth: 280,
    marginRight: 12,
  },
  agentAvatar: {
    position: 'relative',
    marginBottom: 12,
  },
  agentAvatarText: {
    fontSize: 32,
  },
  agentStatusDot: {
    position: 'absolute',
    right: -4,
    top: 0,
    width: 12,
    height: 12,
    borderRadius: 6,
    borderWidth: 2,
    borderColor: '#05070A',
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
    fontWeight: '600',
  },
  agentMetricLabel: {
    fontSize: 11,
  },
  agentInsights: {
    flexDirection: 'row',
    gap: 4,
  },
  agentInsightsCount: {
    fontSize: 20,
    fontWeight: '600',
  },
  agentInsightsLabel: {
    fontSize: 11,
  },
  commandCenter: {
    borderWidth: 1,
    borderRadius: 16,
    padding: 20,
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
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
  },
  commandCenterButtonText: {
    fontSize: 13,
    fontWeight: '500',
  },
  commandCenterMetrics: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
    marginBottom: 20,
  },
  commandMetricCard: {
    borderWidth: 1,
    borderRadius: 12,
    padding: 16,
    width: '31%',
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
    fontSize: 32,
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
    fontSize: 12,
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
    fontSize: 16,
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
    fontSize: 16,
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
    fontSize: 13,
  },
  healthBreakdownValue: {
    fontSize: 14,
    fontWeight: '600',
  },
  globalOperationsSection: {
    marginBottom: 8,
  },
  globalOperationsHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 12,
  },
  globalOperationsTitle: {
    fontSize: 16,
    fontWeight: '600',
  },
  globalOperationsVisualization: {
    backgroundColor: 'rgba(255,255,255,0.03)',
    borderRadius: 12,
    padding: 16,
  },
  globalOperationsStats: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  globalOperationsStat: {
    alignItems: 'center',
    gap: 8,
  },
  globalOperationsRegion: {
    fontSize: 13,
    fontWeight: '500',
  },
  globalOperationsShipments: {
    fontSize: 24,
    fontWeight: '700',
  },
  globalOperationsStatus: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 4,
  },
  globalOperationsStatusText: {
    fontSize: 11,
    fontWeight: '600',
  },
  shipmentControlTower: {
    borderWidth: 1,
    borderRadius: 12,
    padding: 20,
  },
  shipmentStats: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 20,
  },
  shipmentStat: {
    alignItems: 'center',
    gap: 4,
  },
  shipmentStatValue: {
    fontSize: 24,
    fontWeight: '700',
  },
  shipmentStatLabel: {
    fontSize: 12,
  },
  shipmentWorkflow: {
    marginBottom: 20,
  },
  shipmentWorkflowTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 16,
  },
  shipmentWorkflowSteps: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  shipmentWorkflowStep: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  shipmentWorkflowStepDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
  },
  shipmentWorkflowStepText: {
    fontSize: 12,
    fontWeight: '500',
    marginLeft: 8,
  },
  shipmentWorkflowStepLine: {
    flex: 1,
    height: 2,
    marginLeft: 8,
  },
  shipmentsScroll: {
    marginBottom: 8,
  },
  shipmentCard: {
    borderWidth: 1,
    borderRadius: 12,
    padding: 16,
    minWidth: 280,
    marginRight: 12,
  },
  shipmentHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 12,
  },
  shipmentInfo: {
    flex: 1,
  },
  shipmentTracking: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 4,
  },
  shipmentRoute: {
    fontSize: 12,
  },
  shipmentDetails: {
    flexDirection: 'row',
    gap: 16,
    marginBottom: 12,
  },
  shipmentDetail: {
    gap: 4,
  },
  shipmentDetailLabel: {
    fontSize: 11,
  },
  shipmentDetailValue: {
    fontSize: 13,
    fontWeight: '500',
  },
  shipmentStatusBadge: {
    alignSelf: 'flex-start',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 4,
  },
  shipmentStatusText: {
    fontSize: 11,
    fontWeight: '600',
  },
  fleetOperationsCenter: {
    borderWidth: 1,
    borderRadius: 12,
    padding: 20,
  },
  fleetStats: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 20,
  },
  fleetStat: {
    alignItems: 'center',
    gap: 4,
  },
  fleetStatValue: {
    fontSize: 24,
    fontWeight: '700',
  },
  fleetStatLabel: {
    fontSize: 12,
  },
  vehiclesScroll: {
    marginBottom: 8,
  },
  vehicleCard: {
    borderWidth: 1,
    borderRadius: 12,
    padding: 16,
    minWidth: 280,
    marginRight: 12,
  },
  vehicleHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 12,
  },
  vehicleInfo: {
    flex: 1,
  },
  vehicleId: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 4,
  },
  vehicleDriver: {
    fontSize: 12,
  },
  vehicleMetrics: {
    flexDirection: 'row',
    gap: 16,
    marginBottom: 12,
  },
  vehicleMetric: {
    gap: 4,
  },
  vehicleMetricValue: {
    fontSize: 18,
    fontWeight: '600',
  },
  vehicleMetricLabel: {
    fontSize: 11,
  },
  vehicleLocation: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  vehicleLocationText: {
    fontSize: 12,
  },
  routeOptimizationEngine: {
    borderWidth: 1,
    borderRadius: 12,
    padding: 20,
  },
  routeStats: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 20,
  },
  routeStat: {
    alignItems: 'center',
    gap: 4,
  },
  routeStatValue: {
    fontSize: 24,
    fontWeight: '700',
  },
  routeStatLabel: {
    fontSize: 12,
  },
  routesScroll: {
    marginBottom: 8,
  },
  routeCard: {
    borderWidth: 1,
    borderRadius: 12,
    padding: 16,
    minWidth: 280,
    marginRight: 12,
  },
  routeHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 12,
  },
  routeInfo: {
    flex: 1,
  },
  routeId: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 4,
  },
  routePath: {
    fontSize: 12,
  },
  routeMetrics: {
    flexDirection: 'row',
    gap: 16,
    marginBottom: 12,
  },
  routeMetric: {
    gap: 4,
  },
  routeMetricValue: {
    fontSize: 18,
    fontWeight: '600',
  },
  routeMetricLabel: {
    fontSize: 11,
  },
  routeStatusBadge: {
    alignSelf: 'flex-start',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 4,
  },
  routeStatusText: {
    fontSize: 11,
    fontWeight: '600',
  },
  warehouseIntelligenceHub: {
    borderWidth: 1,
    borderRadius: 12,
    padding: 20,
  },
  warehouseStats: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 20,
  },
  warehouseStat: {
    alignItems: 'center',
    gap: 4,
  },
  warehouseStatValue: {
    fontSize: 24,
    fontWeight: '700',
  },
  warehouseStatLabel: {
    fontSize: 12,
  },
  warehousesScroll: {
    marginBottom: 8,
  },
  warehouseCard: {
    borderWidth: 1,
    borderRadius: 12,
    padding: 16,
    minWidth: 280,
    marginRight: 12,
  },
  warehouseHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 12,
  },
  warehouseInfo: {
    flex: 1,
  },
  warehouseName: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 4,
  },
  warehouseLocation: {
    fontSize: 12,
  },
  warehouseMetrics: {
    flexDirection: 'row',
    gap: 16,
    marginBottom: 12,
  },
  warehouseMetric: {
    gap: 4,
  },
  warehouseMetricValue: {
    fontSize: 18,
    fontWeight: '600',
  },
  warehouseMetricLabel: {
    fontSize: 11,
  },
  warehouseStatusBadge: {
    alignSelf: 'flex-start',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 4,
  },
  warehouseStatusText: {
    fontSize: 11,
    fontWeight: '600',
  },
  carriersScroll: {
    marginBottom: 8,
  },
  carrierCard: {
    borderWidth: 1,
    borderRadius: 12,
    padding: 16,
    minWidth: 280,
    marginRight: 12,
  },
  carrierHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 12,
  },
  carrierInfo: {
    flex: 1,
  },
  carrierName: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 4,
  },
  carrierType: {
    fontSize: 12,
  },
  carrierMetrics: {
    flexDirection: 'row',
    gap: 16,
    marginBottom: 12,
  },
  carrierMetric: {
    gap: 4,
  },
  carrierMetricValue: {
    fontSize: 18,
    fontWeight: '600',
  },
  carrierMetricLabel: {
    fontSize: 11,
  },
  carrierStatusBadge: {
    alignSelf: 'flex-start',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 4,
  },
  carrierStatusText: {
    fontSize: 11,
    fontWeight: '600',
  },
  supplyChainControlTower: {
    borderWidth: 1,
    borderRadius: 12,
    padding: 20,
  },
  supplyChainStats: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 20,
  },
  supplyChainStat: {
    alignItems: 'center',
    gap: 4,
  },
  supplyChainStatValue: {
    fontSize: 24,
    fontWeight: '700',
  },
  supplyChainStatLabel: {
    fontSize: 12,
  },
  supplyChainNodes: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  supplyChainNode: {
    borderWidth: 1,
    borderRadius: 12,
    padding: 16,
    width: '31%',
  },
  supplyChainNodeHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 8,
  },
  supplyChainNodeName: {
    fontSize: 14,
    fontWeight: '600',
  },
  supplyChainNodeType: {
    fontSize: 12,
    marginBottom: 4,
  },
  supplyChainNodeLocation: {
    fontSize: 11,
    marginBottom: 12,
  },
  supplyChainNodeMetrics: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  supplyChainNodeMetric: {
    gap: 4,
  },
  supplyChainNodeMetricLabel: {
    fontSize: 11,
  },
  supplyChainNodeMetricValue: {
    fontSize: 14,
    fontWeight: '600',
  },
  supplyChainNodeRiskBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
  },
  supplyChainNodeRiskText: {
    fontSize: 11,
    fontWeight: '600',
  },
  demandForecastingSection: {
    borderWidth: 1,
    borderRadius: 12,
    padding: 20,
  },
  forecastStats: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 20,
  },
  forecastStat: {
    alignItems: 'center',
    gap: 4,
  },
  forecastStatValue: {
    fontSize: 24,
    fontWeight: '700',
  },
  forecastStatLabel: {
    fontSize: 12,
  },
  demandForecasts: {
    flexDirection: 'row',
    gap: 12,
  },
  demandForecastCard: {
    borderWidth: 1,
    borderRadius: 12,
    padding: 16,
    flex: 1,
  },
  demandForecastRegion: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 4,
  },
  demandForecastPeriod: {
    fontSize: 12,
    marginBottom: 12,
  },
  demandForecastMetrics: {
    flexDirection: 'row',
    gap: 16,
    marginBottom: 12,
  },
  demandForecastMetric: {
    gap: 4,
  },
  demandForecastMetricLabel: {
    fontSize: 11,
  },
  demandForecastMetricValue: {
    fontSize: 14,
    fontWeight: '600',
  },
  demandForecastTrendBadge: {
    alignSelf: 'flex-start',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
  },
  demandForecastTrendText: {
    fontSize: 11,
    fontWeight: '600',
  },
  riskEventsScroll: {
    marginBottom: 8,
  },
  riskEventCard: {
    borderWidth: 1,
    borderRadius: 12,
    padding: 16,
    minWidth: 280,
    marginRight: 12,
  },
  riskEventHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 8,
  },
  riskEventInfo: {
    flex: 1,
  },
  riskEventType: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 4,
  },
  riskEventLocation: {
    fontSize: 12,
  },
  riskEventSeverityBadge: {
    alignSelf: 'flex-start',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
    marginBottom: 8,
  },
  riskEventSeverityText: {
    fontSize: 11,
    fontWeight: '600',
  },
  riskEventDescription: {
    fontSize: 13,
    marginBottom: 8,
  },
  riskEventImpact: {
    fontSize: 12,
    fontWeight: '500',
  },
  insightsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  insightCard: {
    borderWidth: 1,
    borderRadius: 12,
    padding: 16,
    width: '48%',
  },
  insightHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 8,
  },
  insightCategory: {
    fontSize: 12,
  },
  insightText: {
    fontSize: 14,
    marginBottom: 12,
  },
  insightFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  insightConfidence: {
    flexDirection: 'row',
    gap: 4,
  },
  insightConfidenceLabel: {
    fontSize: 11,
  },
  insightConfidenceValue: {
    fontSize: 12,
    fontWeight: '600',
  },
  insightTimestamp: {
    fontSize: 11,
  },
  operationsFeed: {
    borderWidth: 1,
    borderRadius: 12,
    padding: 16,
  },
  activityItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 12,
    marginBottom: 16,
  },
  activityDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginTop: 6,
  },
  activityContent: {
    flex: 1,
  },
  activityEvent: {
    fontSize: 14,
    fontWeight: '500',
    marginBottom: 4,
  },
  activityDetails: {
    fontSize: 12,
    marginBottom: 4,
  },
  activityTimestamp: {
    fontSize: 11,
  },
  systemHealthGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  systemHealthCard: {
    borderWidth: 1,
    borderRadius: 12,
    padding: 16,
    width: '31%',
  },
  systemHealthHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 12,
  },
  systemHealthName: {
    fontSize: 13,
    fontWeight: '500',
  },
  systemHealthMetrics: {
    flexDirection: 'row',
    gap: 16,
    marginBottom: 12,
  },
  systemHealthMetric: {
    gap: 4,
  },
  systemHealthMetricLabel: {
    fontSize: 11,
  },
  systemHealthMetricValue: {
    fontSize: 14,
    fontWeight: '600',
  },
  systemHealthStatusBadge: {
    alignSelf: 'flex-start',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
  },
  systemHealthStatusText: {
    fontSize: 11,
    fontWeight: '600',
  },
});

export default TransportationCommandCenter;
