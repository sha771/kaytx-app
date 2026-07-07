import React, { useState, useEffect } from 'react';
import { View, StyleSheet, ScrollView, TouchableOpacity, Animated } from 'react-native';
import { Text } from '@/components/ui/text';
import { useTheme } from '@/providers/ThemeProvider';
import { 
  LayoutDashboard,
  Building2,
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
  Shield,
  ShieldCheck,
  ShieldAlert,
  Map,
  MapPin,
  Navigation,
  Landmark,
  Banknote,
  AlertTriangle,
  AlertOctagon,
  Siren,
  Radio,
  RadioTower,
  Monitor,
  Server,
  Database,
  Wifi,
  HardDrive,
  Cpu,
  Thermometer,
  Droplets,
  Leaf,
  Gauge,
  Car,
  Bus,
  Train,
  Plane,
  Anchor,
  Factory,
  Home,
  Building,
  Store,
  School,
  Hospital,
  Gavel,
  Scale,
  FileCheck,
  ClipboardCheck,
  Stamp,
  FileSignature,
  UserCheck,
  Users2,
  UserCog,
  UserShield,
  BadgeCheck,
  Fingerprint,
  Lock,
  Unlock,
  Key,
  EyeOff,
  Bot,
  Workflow,
  ChevronDown,
  ChevronUp,
  Maximize2,
  Minimize2,
  ExternalLink,
  Link,
  Unlink,
  Zap as ZapIcon,
  Shield as ShieldIcon,
  Map as MapIcon,
} from 'lucide-react-native';

// Types
interface GovernmentAgent {
  id: string;
  name: string;
  specialty: string;
  avatar: string;
  status: 'active' | 'monitoring' | 'paused' | 'error';
  confidenceScore: number;
  publicImpactScore: number;
  metrics: {
    requestsProcessed?: number;
    resolutionRate?: number;
    satisfactionScore?: number;
    incidentsMonitored?: number;
    alertsGenerated?: number;
    responseOptimization?: string;
    assetsManaged?: number;
    maintenancePredicted?: number;
    forecastAccuracy?: number;
  };
  activeInsights: number;
  trend: 'up' | 'down' | 'stable';
}

interface GovernmentKPI {
  id: string;
  title: string;
  value: string;
  change: string;
  trend: 'up' | 'down' | 'stable';
  color: string;
  subtitle: string;
}

interface CitizenService {
  id: string;
  service: string;
  status: 'pending' | 'in-progress' | 'approved' | 'rejected';
  priority: 'high' | 'medium' | 'low';
  submittedBy: string;
  department: string;
  submittedDate: string;
  estimatedResolution: string;
}

interface SafetyIncident {
  id: string;
  incident: string;
  type: 'emergency' | 'law-enforcement' | 'disaster' | 'community';
  severity: 'critical' | 'high' | 'medium' | 'low';
  location: string;
  status: 'active' | 'responding' | 'resolved';
  reportedTime: string;
}

interface InfrastructureAsset {
  id: string;
  asset: string;
  category: 'road' | 'bridge' | 'utility' | 'building' | 'transport';
  healthScore: number;
  status: 'operational' | 'maintenance' | 'critical' | 'degraded';
  lastInspection: string;
  nextMaintenance: string;
  utilization: number;
}

interface BudgetItem {
  id: string;
  department: string;
  allocated: string;
  spent: string;
  remaining: string;
  utilization: number;
  status: 'on-track' | 'over-budget' | 'under-budget';
}

interface EmergencyEvent {
  id: string;
  event: string;
  type: 'natural-disaster' | 'public-health' | 'infrastructure' | 'crisis';
  severity: 'critical' | 'high' | 'medium' | 'low';
  status: 'detected' | 'responding' | 'recovery' | 'resolved';
  location: string;
  resourcesDeployed: number;
  estimatedImpact: string;
}

interface WorkforceMetric {
  id: string;
  metric: string;
  value: string;
  change: string;
  trend: 'up' | 'down' | 'stable';
}

interface PolicyItem {
  id: string;
  policy: string;
  status: 'implementing' | 'compliant' | 'non-compliant' | 'review';
  complianceScore: number;
  lastAudit: string;
  nextReview: string;
}

interface SmartCityMetric {
  id: string;
  metric: string;
  value: string;
  change: string;
  trend: 'up' | 'down' | 'stable';
  category: 'traffic' | 'transit' | 'utilities' | 'environment' | 'engagement';
}

interface GovernmentInsight {
  id: string;
  insight: string;
  category: string;
  confidence: number;
  impact: 'high' | 'medium' | 'low';
  timestamp: string;
}

interface GovernmentActivity {
  id: string;
  event: string;
  type: 'citizen-request' | 'permit' | 'emergency' | 'infrastructure' | 'budget' | 'policy' | 'ai';
  timestamp: string;
  details?: string;
}

interface GovernmentSystemHealth {
  id: string;
  system: string;
  status: 'healthy' | 'degraded' | 'down';
  uptime: string;
  latency: string;
}

const GovernmentCommandCenter = () => {
  const theme = useTheme();
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [activeTab, setActiveTab] = useState('dashboard');
  const [animatedValues, setAnimatedValues] = useState<Record<string, Animated.Value>>({});
  const [realTimeData, setRealTimeData] = useState({
    citizensServed: 12800000,
    servicePerformance: 96,
    budgetUtilization: 82,
    publicSafetyScore: 94,
    infrastructureHealth: 91,
  });

  // Navigation Items
  const navigationItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'agents', label: 'AI Government Agents', icon: Bot },
    { id: 'citizen-services', label: 'Citizen Services', icon: Users },
    { id: 'public-safety', label: 'Public Safety', icon: Shield },
    { id: 'infrastructure', label: 'Infrastructure', icon: Building2 },
    { id: 'budget', label: 'Budget & Finance', icon: Banknote },
    { id: 'emergency', label: 'Emergency Management', icon: Siren },
    { id: 'workforce', label: 'Workforce Operations', icon: Users2 },
    { id: 'compliance', label: 'Compliance & Policy', icon: Gavel },
    { id: 'smart-city', label: 'Smart City', icon: Map },
    { id: 'analytics', label: 'Analytics', icon: BarChart3 },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  // Government KPIs
  const governmentKPIs: GovernmentKPI[] = [
    { id: '1', title: 'Citizen Satisfaction Index', value: '92', change: '+4.2%', trend: 'up', color: '#06B6D4', subtitle: 'Satisfaction score' },
    { id: '2', title: 'Service Delivery Performance', value: `${realTimeData.servicePerformance}%`, change: '+2.8%', trend: 'up', color: '#10B981', subtitle: 'Delivery efficiency' },
    { id: '3', title: 'Budget Utilization', value: `${realTimeData.budgetUtilization}%`, change: '+1.5%', trend: 'up', color: '#8B5CF6', subtitle: 'Budget efficiency' },
    { id: '4', title: 'Infrastructure Health Score', value: `${realTimeData.infrastructureHealth}%`, change: '+3.1%', trend: 'up', color: '#F59E0B', subtitle: 'Asset health' },
    { id: '5', title: 'Emergency Response Time', value: '4.2m', change: '-18%', trend: 'down', color: '#EF4444', subtitle: 'Average response' },
    { id: '6', title: 'Public Safety Index', value: `${realTimeData.publicSafetyScore}%`, change: '+2.4%', trend: 'up', color: '#06B6D4', subtitle: 'Safety score' },
    { id: '7', title: 'Active Government Programs', value: '842', change: '+12', trend: 'up', color: '#10B981', subtitle: 'Programs running' },
    { id: '8', title: 'Compliance Rate', value: '96.8%', change: '+1.2%', trend: 'up', color: '#8B5CF6', subtitle: 'Regulatory compliance' },
    { id: '9', title: 'Workforce Productivity', value: '87%', change: '+3.5%', trend: 'up', color: '#F59E0B', subtitle: 'Staff efficiency' },
    { id: '10', title: 'AI Operational Impact', value: '$284M', change: '+24.2%', trend: 'up', color: '#EC4899', subtitle: 'Annual savings' },
  ];

  // Initialize animated values
  useEffect(() => {
    const values: Record<string, Animated.Value> = {};
    governmentKPIs.forEach(kpi => {
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
        citizensServed: prev.citizensServed + Math.floor(Math.random() * 50),
        servicePerformance: Math.min(100, Math.max(0, prev.servicePerformance + (Math.random() - 0.5) * 0.1)),
        budgetUtilization: Math.min(100, Math.max(0, prev.budgetUtilization + (Math.random() - 0.5) * 0.2)),
        publicSafetyScore: Math.min(100, Math.max(0, prev.publicSafetyScore + (Math.random() - 0.5) * 0.15)),
        infrastructureHealth: Math.min(100, Math.max(0, prev.infrastructureHealth + (Math.random() - 0.5) * 0.1)),
      }));
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  // AI Government Agents
  const governmentAgents: GovernmentAgent[] = [
    {
      id: '1',
      name: 'Agent Civic',
      specialty: 'Citizen Services Agent',
      avatar: '🏛️',
      status: 'active',
      confidenceScore: 97,
      publicImpactScore: 94,
      metrics: {
        requestsProcessed: 8400000,
        resolutionRate: 96,
        satisfactionScore: 92,
      },
      activeInsights: 142,
      trend: 'up',
    },
    {
      id: '2',
      name: 'Agent Sentinel',
      specialty: 'Public Safety Agent',
      avatar: '🛡️',
      status: 'active',
      confidenceScore: 96,
      publicImpactScore: 92,
      metrics: {
        incidentsMonitored: 482000,
        alertsGenerated: 18420,
        responseOptimization: '+24%',
      },
      activeInsights: 186,
      trend: 'up',
    },
    {
      id: '3',
      name: 'Agent Atlas',
      specialty: 'Infrastructure Intelligence Agent',
      avatar: '🗺️',
      status: 'active',
      confidenceScore: 98,
      publicImpactScore: 95,
      metrics: {
        assetsManaged: 82400,
        maintenancePredicted: 4281,
        forecastAccuracy: 95,
      },
      activeInsights: 98,
      trend: 'stable',
    },
  ];

  // Citizen Services
  const citizenServices: CitizenService[] = [
    { id: '1', service: 'Building Permit Application', status: 'in-progress', priority: 'high', submittedBy: 'John Smith', department: 'Planning', submittedDate: '2024-01-25', estimatedResolution: '2024-02-01' },
    { id: '2', service: 'Business License Renewal', status: 'approved', priority: 'medium', submittedBy: 'ABC Corp', department: 'Commerce', submittedDate: '2024-01-20', estimatedResolution: '2024-01-22' },
    { id: '3', service: 'Public Records Request', status: 'pending', priority: 'low', submittedBy: 'Jane Doe', department: 'Clerk', submittedDate: '2024-01-26', estimatedResolution: '2024-02-05' },
  ];

  // Safety Incidents
  const safetyIncidents: SafetyIncident[] = [
    { id: '1', incident: 'Traffic Accident - Highway 101', type: 'emergency', severity: 'high', location: 'Highway 101, Mile 42', status: 'responding', reportedTime: '15m ago' },
    { id: '2', incident: 'Power Outage - Downtown', type: 'infrastructure', severity: 'medium', location: 'Downtown District', status: 'active', reportedTime: '1h ago' },
    { id: '3', incident: 'Missing Person Report', type: 'law-enforcement', severity: 'high', location: 'Riverside Park', status: 'responding', reportedTime: '30m ago' },
  ];

  // Infrastructure Assets
  const infrastructureAssets: InfrastructureAsset[] = [
    { id: '1', asset: 'Main Street Bridge', category: 'bridge', healthScore: 94, status: 'operational', lastInspection: '2024-01-15', nextMaintenance: '2024-06-15', utilization: 85 },
    { id: '2', asset: 'Water Treatment Plant A', category: 'utility', healthScore: 89, status: 'maintenance', lastInspection: '2024-01-10', nextMaintenance: '2024-02-01', utilization: 92 },
    { id: '3', asset: 'City Hall Building', category: 'building', healthScore: 97, status: 'operational', lastInspection: '2024-01-20', nextMaintenance: '2024-07-20', utilization: 78 },
  ];

  // Budget Items
  const budgetItems: BudgetItem[] = [
    { id: '1', department: 'Public Safety', allocated: '$45.2M', spent: '$38.4M', remaining: '$6.8M', utilization: 85, status: 'on-track' },
    { id: '2', department: 'Infrastructure', allocated: '$32.8M', spent: '$28.1M', remaining: '$4.7M', utilization: 86, status: 'on-track' },
    { id: '3', department: 'Health Services', allocated: '$28.5M', spent: '$26.8M', remaining: '$1.7M', utilization: 94, status: 'over-budget' },
  ];

  // Emergency Events
  const emergencyEvents: EmergencyEvent[] = [
    { id: '1', event: 'Severe Weather Warning', type: 'natural-disaster', severity: 'high', status: 'detected', location: 'Northern District', resourcesDeployed: 42, estimatedImpact: 'Medium' },
    { id: '2', event: 'Water Main Break', type: 'infrastructure', severity: 'medium', status: 'responding', location: 'Industrial Zone', resourcesDeployed: 18, estimatedImpact: 'Low' },
  ];

  // Workforce Metrics
  const workforceMetrics: WorkforceMetric[] = [
    { id: '1', metric: 'Workforce Utilization', value: '87%', change: '+3.2%', trend: 'up' },
    { id: '2', metric: 'Department Productivity', value: '92%', change: '+2.8%', trend: 'up' },
    { id: '3', metric: 'Staffing Levels', value: '94%', change: '+1.5%', trend: 'up' },
    { id: '4', metric: 'Training Compliance', value: '96%', change: '+4.2%', trend: 'up' },
    { id: '5', metric: 'Workforce Capacity', value: '89%', change: '+2.1%', trend: 'up' },
  ];

  // Policy Items
  const policyItems: PolicyItem[] = [
    { id: '1', policy: 'Data Privacy Regulation', status: 'compliant', complianceScore: 98, lastAudit: '2024-01-15', nextReview: '2024-07-15' },
    { id: '2', policy: 'Environmental Standards', status: 'implementing', complianceScore: 87, lastAudit: '2024-01-10', nextReview: '2024-04-10' },
    { id: '3', policy: 'Accessibility Compliance', status: 'compliant', complianceScore: 94, lastAudit: '2024-01-20', nextReview: '2024-07-20' },
  ];

  // Smart City Metrics
  const smartCityMetrics: SmartCityMetric[] = [
    { id: '1', metric: 'Traffic Flow', value: '78%', change: '+5.2%', trend: 'up', category: 'traffic' },
    { id: '2', metric: 'Public Transit Usage', value: '124K', change: '+8.4%', trend: 'up', category: 'transit' },
    { id: '3', metric: 'Utilities Efficiency', value: '92%', change: '+3.1%', trend: 'up', category: 'utilities' },
    { id: '4', metric: 'Air Quality Index', value: '42', change: '-12%', trend: 'down', category: 'environment' },
    { id: '5', metric: 'Community Engagement', value: '68%', change: '+6.2%', trend: 'up', category: 'engagement' },
  ];

  // Government Insights
  const governmentInsights: GovernmentInsight[] = [
    { id: '1', insight: 'Permit processing delays detected in Region 4 - recommend additional staffing.', category: 'Citizen Services', confidence: 94, impact: 'high', timestamp: '2h ago' },
    { id: '2', insight: 'Emergency response resources should be repositioned to Northern District.', category: 'Public Safety', confidence: 96, impact: 'high', timestamp: '4h ago' },
    { id: '3', insight: 'Infrastructure asset failure risk elevated in transportation network.', category: 'Infrastructure', confidence: 89, impact: 'high', timestamp: '6h ago' },
    { id: '4', insight: 'Budget utilization below target in public services division.', category: 'Budget', confidence: 87, impact: 'medium', timestamp: '8h ago' },
    { id: '5', insight: 'Citizen satisfaction declining in digital service category.', category: 'Citizen Experience', confidence: 92, impact: 'medium', timestamp: '10h ago' },
  ];

  // Government Activities
  const governmentActivities: GovernmentActivity[] = [
    { id: '1', event: 'Citizen request submitted', type: 'citizen-request', timestamp: '2m ago', details: 'Permit application #18420' },
    { id: '2', event: 'Permit approved', type: 'permit', timestamp: '15m ago', details: 'Business license renewal' },
    { id: '3', event: 'Emergency alert triggered', type: 'emergency', timestamp: '32m ago', details: 'Traffic accident response' },
    { id: '4', event: 'Infrastructure maintenance completed', type: 'infrastructure', timestamp: '1h ago', details: 'Water treatment plant' },
    { id: '5', event: 'Budget milestone reached', type: 'budget', timestamp: '2h ago', details: 'Q1 spending target met' },
    { id: '6', event: 'Policy compliance event recorded', type: 'policy', timestamp: '3h ago', details: 'Data privacy audit passed' },
    { id: '7', event: 'AI recommendation generated', type: 'ai', timestamp: '4h ago', details: 'Resource optimization proposal' },
  ];

  // Government System Health
  const governmentSystemHealth: GovernmentSystemHealth[] = [
    { id: '1', system: 'Citizen Service Platforms', status: 'healthy', uptime: '99.9%', latency: '45ms' },
    { id: '2', system: 'Financial Systems', status: 'healthy', uptime: '99.8%', latency: '38ms' },
    { id: '3', system: 'Public Safety Systems', status: 'healthy', uptime: '99.7%', latency: '22ms' },
    { id: '4', system: 'Infrastructure Sensors', status: 'healthy', uptime: '99.9%', latency: '15ms' },
    { id: '5', system: 'Smart City Networks', status: 'healthy', uptime: '99.6%', latency: '52ms' },
    { id: '6', system: 'AI Agents', status: 'healthy', uptime: '99.8%', latency: '28ms' },
    { id: '7', system: 'Data Platforms', status: 'healthy', uptime: '99.9%', latency: '18ms' },
  ];

  // Render Functions
  const renderKPICard = (kpi: GovernmentKPI) => (
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

  const renderAgentCard = (agent: GovernmentAgent) => (
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
          <Text style={[styles.agentMetricValue, { color: '#10B981' }]}>{agent.publicImpactScore}</Text>
          <Text style={[styles.agentMetricLabel, { color: theme.colors.textSecondary }]}>Impact</Text>
        </View>
      </View>
      <View style={styles.agentInsights}>
        <Text style={[styles.agentInsightsCount, { color: '#8B5CF6' }]}>{agent.activeInsights}</Text>
        <Text style={[styles.agentInsightsLabel, { color: theme.colors.textSecondary }]}>Insights</Text>
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
            <Building2 size={32} color="#06B6D4" />
            <View style={styles.headerTitle}>
              <Text style={[styles.headerTitleText, { color: '#FFFFFF', textShadowColor: 'rgba(6, 182, 212, 0.5)', textShadowOffset: { width: 0, height: 0 }, textShadowRadius: 10 }]}>AI Government & Public Sector Command Center</Text>
              <Text style={[styles.headerSubtitle, { color: 'rgba(6, 182, 212, 0.8)' }]}>National Operations & Public Services Intelligence Platform</Text>
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
        
        {/* Top Government Bar - Prominent KPI Display */}
        <View style={[styles.topGovernmentBar, { backgroundColor: 'rgba(6, 182, 212, 0.08)', borderColor: 'rgba(6, 182, 212, 0.2)' }]}>
          <View style={styles.topBarHeader}>
            <View style={styles.topBarTitle}>
              <TrendingUp size={20} color="#06B6D4" />
              <Text style={[styles.topBarTitleText, { color: '#FFFFFF' }]}>Government Performance Overview</Text>
            </View>
            <Text style={[styles.topBarPeriod, { color: 'rgba(255,255,255,0.6)' }]}>Last 24 hours</Text>
          </View>
          
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.topBarScroll}>
            <View style={styles.topBarKPIs}>
              {governmentKPIs.slice(0, 5).map((kpi) => (
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

        {/* Government KPIs */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Government KPIs</Text>
          <View style={styles.kpiGrid}>
            {governmentKPIs.map(renderKPICard)}
          </View>
        </View>

        {/* SECTION 1: AI Government Agents */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>AI Government Agents</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.agentsScroll}>
            {governmentAgents.map(renderAgentCard)}
          </ScrollView>
        </View>

        {/* SECTION 2: Government Executive Command Center */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Government Executive Command Center</Text>
          <View style={[styles.commandCenter, { backgroundColor: 'rgba(6, 182, 212, 0.05)', borderColor: 'rgba(6, 182, 212, 0.2)' }]}>
            
            {/* Command Center Header */}
            <View style={styles.commandCenterHeader}>
              <View style={styles.commandCenterTitle}>
                <Landmark size={24} color="#06B6D4" />
                <View>
                  <Text style={[styles.commandCenterTitleText, { color: '#FFFFFF' }]}>National Operations Dashboard</Text>
                  <Text style={[styles.commandCenterSubtitle, { color: 'rgba(255,255,255,0.6)' }]}>Real-time government performance monitoring</Text>
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
                  <Users size={20} color="#06B6D4" />
                  <Text style={[styles.commandMetricLabel, { color: 'rgba(255,255,255,0.7)' }]}>Citizens Served</Text>
                </View>
                <Text style={[styles.commandMetricValue, { color: '#06B6D4' }]}>{(realTimeData.citizensServed / 1000000).toFixed(1)}M</Text>
                <View style={styles.commandMetricTrend}>
                  <TrendingUp size={14} color="#10B981" />
                  <Text style={[styles.commandMetricTrendText, { color: '#10B981' }]}>+12.8%</Text>
                  <Text style={[styles.commandMetricPeriod, { color: 'rgba(255,255,255,0.5)' }]}>Total served</Text>
                </View>
              </View>

              <View style={[styles.commandMetricCard, { backgroundColor: 'rgba(255,255,255,0.03)', borderColor: 'rgba(16, 185, 129, 0.3)' }]}>
                <View style={styles.commandMetricHeader}>
                  <Activity size={20} color="#10B981" />
                  <Text style={[styles.commandMetricLabel, { color: 'rgba(255,255,255,0.7)' }]}>Service Performance</Text>
                </View>
                <Text style={[styles.commandMetricValue, { color: '#10B981' }]}>{realTimeData.servicePerformance}%</Text>
                <View style={styles.commandMetricTrend}>
                  <TrendingUp size={14} color="#10B981" />
                  <Text style={[styles.commandMetricTrendText, { color: '#10B981' }]}>+2.8%</Text>
                  <Text style={[styles.commandMetricPeriod, { color: 'rgba(255,255,255,0.5)' }]}>Delivery rate</Text>
                </View>
              </View>

              <View style={[styles.commandMetricCard, { backgroundColor: 'rgba(255,255,255,0.03)', borderColor: 'rgba(139, 92, 246, 0.3)' }]}>
                <View style={styles.commandMetricHeader}>
                  <Banknote size={20} color="#8B5CF6" />
                  <Text style={[styles.commandMetricLabel, { color: 'rgba(255,255,255,0.7)' }]}>Budget Utilization</Text>
                </View>
                <Text style={[styles.commandMetricValue, { color: '#8B5CF6' }]}>{realTimeData.budgetUtilization}%</Text>
                <View style={styles.commandMetricTrend}>
                  <TrendingUp size={14} color="#10B981" />
                  <Text style={[styles.commandMetricTrendText, { color: '#10B981' }]}>+1.5%</Text>
                  <Text style={[styles.commandMetricPeriod, { color: 'rgba(255,255,255,0.5)' }]}>Budget efficiency</Text>
                </View>
              </View>

              <View style={[styles.commandMetricCard, { backgroundColor: 'rgba(255,255,255,0.03)', borderColor: 'rgba(245, 158, 11, 0.3)' }]}>
                <View style={styles.commandMetricHeader}>
                  <Shield size={20} color="#F59E0B" />
                  <Text style={[styles.commandMetricLabel, { color: 'rgba(255,255,255,0.7)' }]}>Public Safety Score</Text>
                </View>
                <Text style={[styles.commandMetricValue, { color: '#F59E0B' }]}>{realTimeData.publicSafetyScore}%</Text>
                <View style={styles.commandMetricTrend}>
                  <TrendingUp size={14} color="#10B981" />
                  <Text style={[styles.commandMetricTrendText, { color: '#10B981' }]}>+2.4%</Text>
                  <Text style={[styles.commandMetricPeriod, { color: 'rgba(255,255,255,0.5)' }]}>Safety index</Text>
                </View>
              </View>

              <View style={[styles.commandMetricCard, { backgroundColor: 'rgba(255,255,255,0.03)', borderColor: 'rgba(236, 72, 153, 0.3)' }]}>
                <View style={styles.commandMetricHeader}>
                  <Building2 size={20} color="#EC4899" />
                  <Text style={[styles.commandMetricLabel, { color: 'rgba(255,255,255,0.7)' }]}>Infrastructure Health</Text>
                </View>
                <Text style={[styles.commandMetricValue, { color: '#EC4899' }]}>{realTimeData.infrastructureHealth}%</Text>
                <View style={styles.commandMetricTrend}>
                  <TrendingUp size={14} color="#10B981" />
                  <Text style={[styles.commandMetricTrendText, { color: '#10B981' }]}>+3.1%</Text>
                  <Text style={[styles.commandMetricPeriod, { color: 'rgba(255,255,255,0.5)' }]}>Asset health</Text>
                </View>
              </View>
            </View>

            {/* Government Health Overview */}
            <View style={styles.commandCenterHealth}>
              <View style={styles.healthOverview}>
                <Text style={[styles.healthOverviewTitle, { color: '#FFFFFF' }]}>Government Health Score</Text>
                <View style={styles.healthScoreContainer}>
                  <Text style={[styles.healthScore, { color: '#10B981' }]}>91%</Text>
                  <View style={styles.healthScoreIndicator}>
                    <View style={[styles.healthScoreBar, { width: '91%', backgroundColor: '#10B981' }]} />
                  </View>
                </View>
                <Text style={[styles.healthScoreDescription, { color: 'rgba(255,255,255,0.6)' }]}>Excellent - All government systems optimal</Text>
              </View>

              <View style={styles.healthBreakdown}>
                <Text style={[styles.healthBreakdownTitle, { color: '#FFFFFF' }]}>Health Breakdown</Text>
                <View style={styles.healthBreakdownItems}>
                  <View style={styles.healthBreakdownItem}>
                    <View style={[styles.healthBreakdownDot, { backgroundColor: '#06B6D4' }]} />
                    <Text style={[styles.healthBreakdownLabel, { color: 'rgba(255,255,255,0.7)' }]}>Citizen Services</Text>
                    <Text style={[styles.healthBreakdownValue, { color: '#06B6D4' }]}>94%</Text>
                  </View>
                  <View style={styles.healthBreakdownItem}>
                    <View style={[styles.healthBreakdownDot, { backgroundColor: '#10B981' }]} />
                    <Text style={[styles.healthBreakdownLabel, { color: 'rgba(255,255,255,0.7)' }]}>Public Safety</Text>
                    <Text style={[styles.healthBreakdownValue, { color: '#10B981' }]}>92%</Text>
                  </View>
                  <View style={styles.healthBreakdownItem}>
                    <View style={[styles.healthBreakdownDot, { backgroundColor: '#8B5CF6' }]} />
                    <Text style={[styles.healthBreakdownLabel, { color: 'rgba(255,255,255,0.7)' }]}>Infrastructure</Text>
                    <Text style={[styles.healthBreakdownValue, { color: '#8B5CF6' }]}>89%</Text>
                  </View>
                  <View style={styles.healthBreakdownItem}>
                    <View style={[styles.healthBreakdownDot, { backgroundColor: '#F59E0B' }]} />
                    <Text style={[styles.healthBreakdownLabel, { color: 'rgba(255,255,255,0.7)' }]}>Budget Health</Text>
                    <Text style={[styles.healthBreakdownValue, { color: '#F59E0B' }]}>88%</Text>
                  </View>
                </View>
              </View>
            </View>
          </View>
        </View>

        {/* SECTION 3: Citizen Services Center */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Citizen Services Center</Text>
          <View style={[styles.citizenServicesContainer, { backgroundColor: theme.colors.card }]}>
            <View style={styles.citizenServicesHeader}>
              <Users size={20} color="#06B6D4" />
              <Text style={[styles.citizenServicesTitle, { color: '#FFFFFF' }]}>Service Request Workflow</Text>
            </View>
            
            <View style={styles.workflowSteps}>
              {['Citizen Request', 'AI Classification', 'Department Routing', 'Review', 'Approval', 'Resolution'].map((step, index) => (
                <View key={index} style={styles.workflowStep}>
                  <View style={[styles.workflowStepDot, { backgroundColor: index < 4 ? '#10B981' : index === 4 ? '#F59E0B' : '#6B7280' }]} />
                  <Text style={[styles.workflowStepText, { color: index < 4 ? '#10B981' : index === 4 ? '#F59E0B' : 'rgba(255,255,255,0.5)' }]}>{step}</Text>
                  {index < 5 && <ChevronRight size={16} color="rgba(255,255,255,0.3)" />}
                </View>
              ))}
            </View>

            <View style={styles.citizenServicesList}>
              {citizenServices.map((service) => (
                <View key={service.id} style={[styles.citizenServiceCard, { backgroundColor: 'rgba(255,255,255,0.03)', borderColor: service.priority === 'high' ? '#EF4444' + '30' : service.priority === 'medium' ? '#F59E0B' + '30' : '#10B981' + '30' }]}>
                  <View style={styles.citizenServiceHeader}>
                    <MessageSquare size={18} color={service.status === 'approved' ? '#10B981' : service.status === 'in-progress' ? '#F59E0B' : '#6B7280'} />
                    <View style={styles.citizenServiceInfo}>
                      <Text style={[styles.citizenServiceName, { color: theme.colors.text }]}>{service.service}</Text>
                      <Text style={[styles.citizenServiceDepartment, { color: theme.colors.textSecondary }]}>{service.department}</Text>
                    </View>
                    <View style={[styles.citizenServiceStatusBadge, { backgroundColor: service.status === 'approved' ? 'rgba(16, 185, 129, 0.15)' : service.status === 'in-progress' ? 'rgba(245, 158, 11, 0.15)' : 'rgba(107, 114, 128, 0.15)' }]}>
                      <Text style={[styles.citizenServiceStatusText, { color: service.status === 'approved' ? '#10B981' : service.status === 'in-progress' ? '#F59E0B' : '#6B7280' }]}>{service.status}</Text>
                    </View>
                  </View>
                  <View style={styles.citizenServiceDetails}>
                    <Text style={[styles.citizenServiceSubmittedBy, { color: theme.colors.textSecondary }]}>Submitted by: {service.submittedBy}</Text>
                    <Text style={[styles.citizenServiceDate, { color: 'rgba(255,255,255,0.5)' }]}>Submitted: {service.submittedDate}</Text>
                  </View>
                </View>
              ))}
            </View>
          </View>
        </View>

        {/* SECTION 4: Public Safety Command Center */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Public Safety Command Center</Text>
          <View style={[styles.publicSafetyContainer, { backgroundColor: theme.colors.card }]}>
            <View style={styles.publicSafetyHeader}>
              <Shield size={20} color="#EF4444" />
              <Text style={[styles.publicSafetyTitle, { color: '#FFFFFF' }]}>Incident Monitoring</Text>
            </View>
            
            <View style={styles.publicSafetyList}>
              {safetyIncidents.map((incident) => (
                <View key={incident.id} style={[styles.publicSafetyCard, { backgroundColor: 'rgba(255,255,255,0.03)', borderColor: incident.severity === 'critical' ? '#EF4444' + '30' : incident.severity === 'high' ? '#F59E0B' + '30' : '#10B981' + '30' }]}>
                  <View style={styles.publicSafetyCardHeader}>
                    <AlertTriangle size={18} color={incident.severity === 'critical' ? '#EF4444' : incident.severity === 'high' ? '#F59E0B' : '#10B981'} />
                    <View style={styles.publicSafetyInfo}>
                      <Text style={[styles.publicSafetyIncident, { color: theme.colors.text }]}>{incident.incident}</Text>
                      <Text style={[styles.publicSafetyType, { color: theme.colors.textSecondary }]}>{incident.type}</Text>
                    </View>
                    <View style={[styles.publicSafetyStatusBadge, { backgroundColor: incident.status === 'active' ? 'rgba(239, 68, 68, 0.15)' : incident.status === 'responding' ? 'rgba(245, 158, 11, 0.15)' : 'rgba(16, 185, 129, 0.15)' }]}>
                      <Text style={[styles.publicSafetyStatusText, { color: incident.status === 'active' ? '#EF4444' : incident.status === 'responding' ? '#F59E0B' : '#10B981' }]}>{incident.status}</Text>
                    </View>
                  </View>
                  <View style={styles.publicSafetyDetails}>
                    <View style={styles.publicSafetyLocation}>
                      <MapPin size={14} color="rgba(255,255,255,0.5)" />
                      <Text style={[styles.publicSafetyLocationText, { color: theme.colors.textSecondary }]}>{incident.location}</Text>
                    </View>
                    <Text style={[styles.publicSafetyTime, { color: 'rgba(255,255,255,0.5)' }]}>Reported: {incident.reportedTime}</Text>
                  </View>
                </View>
              ))}
            </View>
          </View>
        </View>

        {/* SECTION 5: Infrastructure Intelligence Hub */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Infrastructure Intelligence Hub</Text>
          <View style={[styles.infrastructureContainer, { backgroundColor: theme.colors.card }]}>
            <View style={styles.infrastructureHeader}>
              <Building2 size={20} color="#06B6D4" />
              <Text style={[styles.infrastructureTitle, { color: '#FFFFFF' }]}>Asset Monitoring</Text>
            </View>
            
            <View style={styles.infrastructureList}>
              {infrastructureAssets.map((asset) => (
                <View key={asset.id} style={[styles.infrastructureCard, { backgroundColor: 'rgba(255,255,255,0.03)', borderColor: asset.status === 'critical' ? '#EF4444' + '30' : asset.status === 'maintenance' ? '#F59E0B' + '30' : '#10B981' + '30' }]}>
                  <View style={styles.infrastructureCardHeader}>
                    <Factory size={18} color={asset.status === 'operational' ? '#10B981' : asset.status === 'maintenance' ? '#F59E0B' : '#EF4444'} />
                    <View style={styles.infrastructureInfo}>
                      <Text style={[styles.infrastructureAsset, { color: theme.colors.text }]}>{asset.asset}</Text>
                      <Text style={[styles.infrastructureCategory, { color: theme.colors.textSecondary }]}>{asset.category}</Text>
                    </View>
                    <View style={styles.infrastructureHealth}>
                      <Text style={[styles.infrastructureHealthScore, { color: asset.healthScore >= 90 ? '#10B981' : asset.healthScore >= 70 ? '#F59E0B' : '#EF4444' }]}>{asset.healthScore}%</Text>
                      <Text style={[styles.infrastructureHealthLabel, { color: theme.colors.textSecondary }]}>Health</Text>
                    </View>
                  </View>
                  <View style={styles.infrastructureDetails}>
                    <Text style={[styles.infrastructureUtilization, { color: theme.colors.textSecondary }]}>Utilization: {asset.utilization}%</Text>
                    <Text style={[styles.infrastructureNextMaintenance, { color: 'rgba(255,255,255,0.5)' }]}>Next maintenance: {asset.nextMaintenance}</Text>
                  </View>
                </View>
              ))}
            </View>
          </View>
        </View>

        {/* SECTION 6: Budget & Financial Oversight Center */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Budget & Financial Oversight Center</Text>
          <View style={[styles.budgetContainer, { backgroundColor: theme.colors.card }]}>
            <View style={styles.budgetHeader}>
              <Banknote size={20} color="#8B5CF6" />
              <Text style={[styles.budgetTitle, { color: '#FFFFFF' }]}>Budget Allocation & Spending</Text>
            </View>
            
            <View style={styles.budgetList}>
              {budgetItems.map((budget) => (
                <View key={budget.id} style={[styles.budgetCard, { backgroundColor: 'rgba(255,255,255,0.03)', borderColor: budget.status === 'over-budget' ? '#EF4444' + '30' : budget.status === 'under-budget' ? '#10B981' + '30' : '#8B5CF6' + '30' }]}>
                  <View style={styles.budgetCardHeader}>
                    <Landmark size={18} color={budget.status === 'on-track' ? '#8B5CF6' : budget.status === 'over-budget' ? '#EF4444' : '#10B981'} />
                    <View style={styles.budgetInfo}>
                      <Text style={[styles.budgetDepartment, { color: theme.colors.text }]}>{budget.department}</Text>
                      <Text style={[styles.budgetStatus, { color: theme.colors.textSecondary }]}>{budget.status}</Text>
                    </View>
                  </View>
                  <View style={styles.budgetMetrics}>
                    <View style={styles.budgetMetric}>
                      <Text style={[styles.budgetMetricLabel, { color: 'rgba(255,255,255,0.6)' }]}>Allocated</Text>
                      <Text style={[styles.budgetMetricValue, { color: '#06B6D4' }]}>{budget.allocated}</Text>
                    </View>
                    <View style={styles.budgetMetric}>
                      <Text style={[styles.budgetMetricLabel, { color: 'rgba(255,255,255,0.6)' }]}>Spent</Text>
                      <Text style={[styles.budgetMetricValue, { color: '#F59E0B' }]}>{budget.spent}</Text>
                    </View>
                    <View style={styles.budgetMetric}>
                      <Text style={[styles.budgetMetricLabel, { color: 'rgba(255,255,255,0.6)' }]}>Remaining</Text>
                      <Text style={[styles.budgetMetricValue, { color: '#10B981' }]}>{budget.remaining}</Text>
                    </View>
                  </View>
                  <View style={styles.budgetProgressBar}>
                    <View style={[styles.budgetProgressFill, { width: `${budget.utilization}%`, backgroundColor: budget.utilization > 90 ? '#EF4444' : budget.utilization > 75 ? '#F59E0B' : '#10B981' }]} />
                  </View>
                  <Text style={[styles.budgetUtilizationText, { color: theme.colors.textSecondary }]}>Utilization: {budget.utilization}%</Text>
                </View>
              ))}
            </View>
          </View>
        </View>

        {/* SECTION 7: Emergency Management War Room */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Emergency Management War Room</Text>
          <View style={[styles.emergencyContainer, { backgroundColor: theme.colors.card }]}>
            <View style={styles.emergencyHeader}>
              <Siren size={20} color="#EF4444" />
              <Text style={[styles.emergencyTitle, { color: '#FFFFFF' }]}>Crisis Response Monitoring</Text>
            </View>
            
            <View style={styles.emergencyWorkflow}>
              {['Incident Detected', 'Risk Assessment', 'Resource Allocation', 'Response Coordination', 'Recovery', 'After-Action Review'].map((step, index) => (
                <View key={index} style={styles.emergencyWorkflowStep}>
                  <View style={[styles.emergencyWorkflowDot, { backgroundColor: index < 2 ? '#EF4444' : index === 2 ? '#F59E0B' : '#6B7280' }]} />
                  <Text style={[styles.emergencyWorkflowText, { color: index < 2 ? '#EF4444' : index === 2 ? '#F59E0B' : 'rgba(255,255,255,0.5)' }]}>{step}</Text>
                  {index < 5 && <ChevronRight size={16} color="rgba(255,255,255,0.3)" />}
                </View>
              ))}
            </View>

            <View style={styles.emergencyList}>
              {emergencyEvents.map((event) => (
                <View key={event.id} style={[styles.emergencyCard, { backgroundColor: 'rgba(255,255,255,0.03)', borderColor: event.severity === 'critical' ? '#EF4444' + '30' : event.severity === 'high' ? '#F59E0B' + '30' : '#10B981' + '30' }]}>
                  <View style={styles.emergencyCardHeader}>
                    <AlertOctagon size={18} color={event.severity === 'critical' ? '#EF4444' : event.severity === 'high' ? '#F59E0B' : '#10B981'} />
                    <View style={styles.emergencyInfo}>
                      <Text style={[styles.emergencyEvent, { color: theme.colors.text }]}>{event.event}</Text>
                      <Text style={[styles.emergencyType, { color: theme.colors.textSecondary }]}>{event.type}</Text>
                    </View>
                    <View style={[styles.emergencyStatusBadge, { backgroundColor: event.status === 'detected' ? 'rgba(239, 68, 68, 0.15)' : event.status === 'responding' ? 'rgba(245, 158, 11, 0.15)' : event.status === 'recovery' ? 'rgba(6, 182, 212, 0.15)' : 'rgba(16, 185, 129, 0.15)' }]}>
                      <Text style={[styles.emergencyStatusText, { color: event.status === 'detected' ? '#EF4444' : event.status === 'responding' ? '#F59E0B' : event.status === 'recovery' ? '#06B6D4' : '#10B981' }]}>{event.status}</Text>
                    </View>
                  </View>
                  <View style={styles.emergencyDetails}>
                    <View style={styles.emergencyLocation}>
                      <MapPin size={14} color="rgba(255,255,255,0.5)" />
                      <Text style={[styles.emergencyLocationText, { color: theme.colors.textSecondary }]}>{event.location}</Text>
                    </View>
                    <Text style={[styles.emergencyResources, { color: 'rgba(255,255,255,0.5)' }]}>Resources deployed: {event.resourcesDeployed}</Text>
                  </View>
                </View>
              ))}
            </View>
          </View>
        </View>

        {/* SECTION 8: Government Workforce Operations */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Government Workforce Operations</Text>
          <View style={[styles.workforceContainer, { backgroundColor: theme.colors.card }]}>
            <View style={styles.workforceHeader}>
              <Users2 size={20} color="#10B981" />
              <Text style={[styles.workforceTitle, { color: '#FFFFFF' }]}>Workforce Analytics</Text>
            </View>
            
            <View style={styles.workforceMetrics}>
              {workforceMetrics.map((metric) => (
                <View key={metric.id} style={[styles.workforceMetricCard, { backgroundColor: 'rgba(255,255,255,0.03)' }]}>
                  <Text style={[styles.workforceMetricName, { color: theme.colors.text }]}>{metric.metric}</Text>
                  <Text style={[styles.workforceMetricValue, { color: '#06B6D4' }]}>{metric.value}</Text>
                  <View style={styles.workforceMetricTrend}>
                    {metric.trend === 'up' ? <TrendingUp size={12} color="#10B981" /> : 
                     metric.trend === 'down' ? <TrendingDown size={12} color="#EF4444" /> : 
                     <Activity size={12} color="rgba(255,255,255,0.6)" />}
                    <Text style={[
                      styles.workforceMetricChange,
                      { color: metric.trend === 'up' ? '#10B981' : metric.trend === 'down' ? '#EF4444' : 'rgba(255,255,255,0.6)' }
                    ]}>{metric.change}</Text>
                  </View>
                </View>
              ))}
            </View>
          </View>
        </View>

        {/* SECTION 9: Policy & Compliance Center */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Policy & Compliance Center</Text>
          <View style={[styles.policyContainer, { backgroundColor: theme.colors.card }]}>
            <View style={styles.policyHeader}>
              <Gavel size={20} color="#8B5CF6" />
              <Text style={[styles.policyTitle, { color: '#FFFFFF' }]}>Regulatory Compliance</Text>
            </View>
            
            <View style={styles.policyList}>
              {policyItems.map((policy) => (
                <View key={policy.id} style={[styles.policyListCard, { backgroundColor: 'rgba(255,255,255,0.03)', borderColor: policy.status === 'non-compliant' ? '#EF4444' + '30' : policy.status === 'implementing' ? '#F59E0B' + '30' : '#10B981' + '30' }]}>
                  <View style={styles.policyListCardHeader}>
                    <FileCheck size={18} color={policy.status === 'compliant' ? '#10B981' : policy.status === 'implementing' ? '#F59E0B' : '#EF4444'} />
                    <View style={styles.policyListInfo}>
                      <Text style={[styles.policyListPolicy, { color: theme.colors.text }]}>{policy.policy}</Text>
                      <Text style={[styles.policyListStatus, { color: theme.colors.textSecondary }]}>{policy.status}</Text>
                    </View>
                    <View style={styles.policyListCompliance}>
                      <Text style={[styles.policyListComplianceScore, { color: policy.complianceScore >= 90 ? '#10B981' : policy.complianceScore >= 70 ? '#F59E0B' : '#EF4444' }]}>{policy.complianceScore}%</Text>
                      <Text style={[styles.policyListComplianceLabel, { color: theme.colors.textSecondary }]}>Compliance</Text>
                    </View>
                  </View>
                  <View style={styles.policyListDetails}>
                    <Text style={[styles.policyListLastAudit, { color: theme.colors.textSecondary }]}>Last audit: {policy.lastAudit}</Text>
                    <Text style={[styles.policyListNextReview, { color: 'rgba(255,255,255,0.5)' }]}>Next review: {policy.nextReview}</Text>
                  </View>
                </View>
              ))}
            </View>
          </View>
        </View>

        {/* SECTION 10: Smart City & Community Intelligence */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Smart City & Community Intelligence</Text>
          <View style={[styles.smartCityContainer, { backgroundColor: theme.colors.card }]}>
            <View style={styles.smartCityHeader}>
              <Map size={20} color="#06B6D4" />
              <Text style={[styles.smartCityTitle, { color: '#FFFFFF' }]}>Urban Analytics</Text>
            </View>
            
            <View style={styles.smartCityMetrics}>
              {smartCityMetrics.map((metric) => (
                <View key={metric.id} style={[styles.smartCityMetricCard, { backgroundColor: 'rgba(255,255,255,0.03)' }]}>
                  <View style={styles.smartCityMetricHeader}>
                    {metric.category === 'traffic' && <Car size={16} color="#06B6D4" />}
                    {metric.category === 'transit' && <Bus size={16} color="#10B981" />}
                    {metric.category === 'utilities' && <Zap size={16} color="#8B5CF6" />}
                    {metric.category === 'environment' && <Leaf size={16} color="#10B981" />}
                    {metric.category === 'engagement' && <Users size={16} color="#F59E0B" />}
                    <Text style={[styles.smartCityMetricName, { color: theme.colors.text }]}>{metric.metric}</Text>
                  </View>
                  <Text style={[styles.smartCityMetricValue, { color: '#06B6D4' }]}>{metric.value}</Text>
                  <View style={styles.smartCityMetricTrend}>
                    {metric.trend === 'up' ? <TrendingUp size={12} color="#10B981" /> : 
                     metric.trend === 'down' ? <TrendingDown size={12} color="#EF4444" /> : 
                     <Activity size={12} color="rgba(255,255,255,0.6)" />}
                    <Text style={[
                      styles.smartCityMetricChange,
                      { color: metric.trend === 'up' ? '#10B981' : metric.trend === 'down' ? '#EF4444' : 'rgba(255,255,255,0.6)' }
                    ]}>{metric.change}</Text>
                  </View>
                </View>
              ))}
            </View>
          </View>
        </View>

        {/* SECTION 11: AI Government Insights */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>AI Government Insights</Text>
          <View style={[styles.insightsContainer, { backgroundColor: theme.colors.card }]}>
            <View style={styles.insightsHeader}>
              <Brain size={20} color="#8B5CF6" />
              <Text style={[styles.insightsTitle, { color: '#FFFFFF' }]}>Executive Recommendations</Text>
            </View>
            
            <View style={styles.insightsList}>
              {governmentInsights.map((insight) => (
                <View key={insight.id} style={[styles.insightCard, { backgroundColor: 'rgba(255,255,255,0.03)', borderColor: insight.impact === 'high' ? '#EF4444' + '30' : insight.impact === 'medium' ? '#F59E0B' + '30' : '#10B981' + '30' }]}>
                  <View style={styles.insightCardHeader}>
                    <Sparkles size={18} color={insight.impact === 'high' ? '#EF4444' : insight.impact === 'medium' ? '#F59E0B' : '#10B981'} />
                    <View style={styles.insightInfo}>
                      <Text style={[styles.insightCategory, { color: theme.colors.textSecondary }]}>{insight.category}</Text>
                      <Text style={[styles.insightConfidence, { color: '#8B5CF6' }]}>Confidence: {insight.confidence}%</Text>
                    </View>
                    <View style={[styles.insightImpactBadge, { backgroundColor: insight.impact === 'high' ? 'rgba(239, 68, 68, 0.15)' : insight.impact === 'medium' ? 'rgba(245, 158, 11, 0.15)' : 'rgba(16, 185, 129, 0.15)' }]}>
                      <Text style={[styles.insightImpactText, { color: insight.impact === 'high' ? '#EF4444' : insight.impact === 'medium' ? '#F59E0B' : '#10B981' }]}>{insight.impact}</Text>
                    </View>
                  </View>
                  <Text style={[styles.insightText, { color: theme.colors.text }]}>{insight.insight}</Text>
                  <Text style={[styles.insightTimestamp, { color: 'rgba(255,255,255,0.5)' }]}>{insight.timestamp}</Text>
                </View>
              ))}
            </View>
          </View>
        </View>

        {/* SECTION 12: Real-time Government Operations Feed */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Real-time Government Operations Feed</Text>
          <View style={[styles.operationsFeedContainer, { backgroundColor: theme.colors.card }]}>
            <View style={styles.operationsFeedHeader}>
              <Activity size={20} color="#06B6D4" />
              <Text style={[styles.operationsFeedTitle, { color: '#FFFFFF' }]}>Live Operations Timeline</Text>
            </View>
            
            <View style={styles.operationsFeedList}>
              {governmentActivities.map((activity) => (
                <View key={activity.id} style={styles.operationFeedItem}>
                  <View style={[
                    styles.operationFeedDot,
                    { backgroundColor: activity.type === 'emergency' ? '#EF4444' : activity.type === 'ai' ? '#8B5CF6' : activity.type === 'permit' ? '#10B981' : '#06B6D4' }
                  ]} />
                  <View style={styles.operationFeedContent}>
                    <Text style={[styles.operationFeedEvent, { color: theme.colors.text }]}>{activity.event}</Text>
                    {activity.details && <Text style={[styles.operationFeedDetails, { color: theme.colors.textSecondary }]}>{activity.details}</Text>}
                    <Text style={[styles.operationFeedTimestamp, { color: 'rgba(255,255,255,0.5)' }]}>{activity.timestamp}</Text>
                  </View>
                </View>
              ))}
            </View>
          </View>
        </View>

        {/* SECTION 13: Government Platform Health */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Government Platform Health</Text>
          <View style={[styles.platformHealthContainer, { backgroundColor: theme.colors.card }]}>
            <View style={styles.platformHealthHeader}>
              <Server size={20} color="#10B981" />
              <Text style={[styles.platformHealthTitle, { color: '#FFFFFF' }]}>System Health Monitoring</Text>
            </View>
            
            <View style={styles.platformHealthList}>
              {governmentSystemHealth.map((system) => (
                <View key={system.id} style={[styles.platformHealthCard, { backgroundColor: 'rgba(255,255,255,0.03)', borderColor: system.status === 'healthy' ? '#10B981' + '30' : system.status === 'degraded' ? '#F59E0B' + '30' : '#EF4444' + '30' }]}>
                  <View style={styles.platformHealthCardHeader}>
                    <Monitor size={18} color={system.status === 'healthy' ? '#10B981' : system.status === 'degraded' ? '#F59E0B' : '#EF4444'} />
                    <View style={styles.platformHealthInfo}>
                      <Text style={[styles.platformHealthSystem, { color: theme.colors.text }]}>{system.system}</Text>
                      <Text style={[styles.platformHealthStatus, { color: system.status === 'healthy' ? '#10B981' : system.status === 'degraded' ? '#F59E0B' : '#EF4444' }]}>{system.status}</Text>
                    </View>
                  </View>
                  <View style={styles.platformHealthMetrics}>
                    <View style={styles.platformHealthMetric}>
                      <Text style={[styles.platformHealthMetricLabel, { color: 'rgba(255,255,255,0.6)' }]}>Uptime</Text>
                      <Text style={[styles.platformHealthMetricValue, { color: '#06B6D4' }]}>{system.uptime}</Text>
                    </View>
                    <View style={styles.platformHealthMetric}>
                      <Text style={[styles.platformHealthMetricLabel, { color: 'rgba(255,255,255,0.6)' }]}>Latency</Text>
                      <Text style={[styles.platformHealthMetricValue, { color: '#10B981' }]}>{system.latency}</Text>
                    </View>
                  </View>
                </View>
              ))}
            </View>
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
  gradientOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'linear-gradient(135deg, rgba(6, 182, 212, 0.05) 0%, rgba(139, 92, 246, 0.05) 100%)',
    pointerEvents: 'none',
  },
  header: {
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    zIndex: 10,
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
    letterSpacing: 0.5,
  },
  headerSubtitle: {
    fontSize: 12,
    fontWeight: '400',
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
    flex: 1,
    flexDirection: 'row',
  },
  sidebar: {
    width: 240,
    borderRightWidth: 1,
    paddingVertical: 16,
  },
  sidebarToggle: {
    alignItems: 'center',
    paddingVertical: 8,
    marginBottom: 8,
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
    borderRadius: 8,
  },
  sidebarItemText: {
    fontSize: 14,
    fontWeight: '500',
  },
  content: {
    flex: 1,
    padding: 20,
  },
  topGovernmentBar: {
    borderRadius: 12,
    padding: 16,
    marginBottom: 24,
    borderWidth: 1,
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
    fontWeight: '400',
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
    minWidth: 140,
    borderWidth: 1,
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
    fontWeight: '400',
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
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
    width: '48%',
    marginBottom: 8,
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
    flex: 1,
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
    fontWeight: '400',
  },
  agentsScroll: {
    marginBottom: 8,
  },
  agentCard: {
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
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
    bottom: 0,
    right: 0,
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
    fontWeight: '400',
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
    fontSize: 18,
    fontWeight: '700',
  },
  agentMetricLabel: {
    fontSize: 10,
    fontWeight: '400',
  },
  agentInsights: {
    flexDirection: 'row',
    gap: 4,
    alignItems: 'baseline',
  },
  agentInsightsCount: {
    fontSize: 20,
    fontWeight: '700',
  },
  agentInsightsLabel: {
    fontSize: 10,
    fontWeight: '400',
  },
  commandCenter: {
    borderRadius: 12,
    padding: 20,
    borderWidth: 1,
    marginBottom: 8,
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
    fontWeight: '400',
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
    borderRadius: 8,
    padding: 16,
    borderWidth: 1,
    width: '48%',
  },
  commandMetricHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 8,
  },
  commandMetricLabel: {
    fontSize: 12,
    fontWeight: '500',
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
    fontWeight: '400',
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
    fontWeight: '400',
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
    fontSize: 12,
    fontWeight: '400',
    flex: 1,
  },
  healthBreakdownValue: {
    fontSize: 12,
    fontWeight: '600',
  },
  citizenServicesContainer: {
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    marginBottom: 8,
  },
  citizenServicesHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 16,
  },
  citizenServicesTitle: {
    fontSize: 16,
    fontWeight: '600',
  },
  workflowSteps: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 16,
    flexWrap: 'wrap',
  },
  workflowStep: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  workflowStepDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  workflowStepText: {
    fontSize: 12,
    fontWeight: '500',
  },
  citizenServicesList: {
    gap: 12,
  },
  citizenServiceCard: {
    borderRadius: 8,
    padding: 12,
    borderWidth: 1,
  },
  citizenServiceHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 8,
  },
  citizenServiceInfo: {
    flex: 1,
  },
  citizenServiceName: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 2,
  },
  citizenServiceDepartment: {
    fontSize: 11,
    fontWeight: '400',
  },
  citizenServiceStatusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
  },
  citizenServiceStatusText: {
    fontSize: 10,
    fontWeight: '600',
    textTransform: 'capitalize',
  },
  citizenServiceDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  citizenServiceSubmittedBy: {
    fontSize: 11,
    fontWeight: '400',
  },
  citizenServiceDate: {
    fontSize: 10,
    fontWeight: '400',
  },
  publicSafetyContainer: {
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    marginBottom: 8,
  },
  publicSafetyHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 16,
  },
  publicSafetyTitle: {
    fontSize: 16,
    fontWeight: '600',
  },
  publicSafetyList: {
    gap: 12,
  },
  publicSafetyCard: {
    borderRadius: 8,
    padding: 12,
    borderWidth: 1,
  },
  publicSafetyCardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 8,
  },
  publicSafetyInfo: {
    flex: 1,
  },
  publicSafetyIncident: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 2,
  },
  publicSafetyType: {
    fontSize: 11,
    fontWeight: '400',
  },
  publicSafetyStatusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
  },
  publicSafetyStatusText: {
    fontSize: 10,
    fontWeight: '600',
    textTransform: 'capitalize',
  },
  publicSafetyDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  publicSafetyLocation: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  publicSafetyLocationText: {
    fontSize: 11,
    fontWeight: '400',
  },
  publicSafetyTime: {
    fontSize: 10,
    fontWeight: '400',
  },
  infrastructureContainer: {
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    marginBottom: 8,
  },
  infrastructureHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 16,
  },
  infrastructureTitle: {
    fontSize: 16,
    fontWeight: '600',
  },
  infrastructureList: {
    gap: 12,
  },
  infrastructureCard: {
    borderRadius: 8,
    padding: 12,
    borderWidth: 1,
  },
  infrastructureCardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 8,
  },
  infrastructureInfo: {
    flex: 1,
  },
  infrastructureAsset: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 2,
  },
  infrastructureCategory: {
    fontSize: 11,
    fontWeight: '400',
  },
  infrastructureHealth: {
    alignItems: 'flex-end',
  },
  infrastructureHealthScore: {
    fontSize: 16,
    fontWeight: '700',
  },
  infrastructureHealthLabel: {
    fontSize: 10,
    fontWeight: '400',
  },
  healthBreakdown: {
    flex: 1,
  },
  infrastructureDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  infrastructureUtilization: {
    fontSize: 11,
    fontWeight: '400',
  },
  infrastructureNextMaintenance: {
    fontSize: 10,
    fontWeight: '400',
  },
  budgetContainer: {
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    marginBottom: 8,
  },
  budgetHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 16,
  },
  budgetTitle: {
    fontSize: 16,
    fontWeight: '600',
  },
  budgetList: {
    gap: 12,
  },
  budgetCard: {
    borderRadius: 8,
    padding: 12,
    borderWidth: 1,
  },
  budgetCardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 12,
  },
  budgetInfo: {
    flex: 1,
  },
  budgetDepartment: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 2,
  },
  budgetStatus: {
    fontSize: 11,
    fontWeight: '400',
  },
  budgetMetrics: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  budgetMetric: {
    alignItems: 'center',
  },
  budgetMetricLabel: {
    fontSize: 10,
    fontWeight: '400',
    marginBottom: 2,
  },
  budgetMetricValue: {
    fontSize: 14,
    fontWeight: '700',
  },
  budgetProgressBar: {
    height: 6,
    backgroundColor: 'rgba(255,255,255,0.1)',
    borderRadius: 3,
    overflow: 'hidden',
    marginBottom: 4,
  },
  budgetProgressFill: {
    height: '100%',
  },
  budgetUtilizationText: {
    fontSize: 10,
    fontWeight: '400',
  },
  emergencyContainer: {
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    marginBottom: 8,
  },
  emergencyHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 16,
  },
  emergencyTitle: {
    fontSize: 16,
    fontWeight: '600',
  },
  emergencyWorkflow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 16,
    flexWrap: 'wrap',
  },
  emergencyWorkflowStep: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  emergencyWorkflowDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  emergencyWorkflowText: {
    fontSize: 12,
    fontWeight: '500',
  },
  emergencyList: {
    gap: 12,
  },
  emergencyCard: {
    borderRadius: 8,
    padding: 12,
    borderWidth: 1,
  },
  emergencyCardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 8,
  },
  emergencyInfo: {
    flex: 1,
  },
  emergencyEvent: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 2,
  },
  emergencyType: {
    fontSize: 11,
    fontWeight: '400',
  },
  emergencyStatusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
  },
  emergencyStatusText: {
    fontSize: 10,
    fontWeight: '600',
    textTransform: 'capitalize',
  },
  emergencyDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  emergencyLocation: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  emergencyLocationText: {
    fontSize: 11,
    fontWeight: '400',
  },
  emergencyResources: {
    fontSize: 10,
    fontWeight: '400',
  },
  workforceContainer: {
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    marginBottom: 8,
  },
  workforceHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 16,
  },
  workforceTitle: {
    fontSize: 16,
    fontWeight: '600',
  },
  workforceMetrics: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  workforceMetricCard: {
    borderRadius: 8,
    padding: 12,
    width: '48%',
  },
  workforceMetricName: {
    fontSize: 12,
    fontWeight: '500',
    marginBottom: 8,
  },
  workforceMetricValue: {
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 8,
  },
  workforceMetricTrend: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  workforceMetricChange: {
    fontSize: 11,
    fontWeight: '600',
  },
  policyContainer: {
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    marginBottom: 8,
  },
  policyHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 16,
  },
  policyTitle: {
    fontSize: 16,
    fontWeight: '600',
  },
  policyList: {
    gap: 12,
  },
  policyListCard: {
    borderRadius: 8,
    padding: 12,
    borderWidth: 1,
  },
  policyListCardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 8,
  },
  policyListInfo: {
    flex: 1,
  },
  policyListPolicy: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 2,
  },
  policyListStatus: {
    fontSize: 11,
    fontWeight: '400',
  },
  policyListCompliance: {
    alignItems: 'flex-end',
  },
  policyListComplianceScore: {
    fontSize: 16,
    fontWeight: '700',
  },
  policyListComplianceLabel: {
    fontSize: 10,
    fontWeight: '400',
  },
  policyListDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  policyListLastAudit: {
    fontSize: 11,
    fontWeight: '400',
  },
  policyListNextReview: {
    fontSize: 10,
    fontWeight: '400',
  },
  smartCityContainer: {
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    marginBottom: 8,
  },
  smartCityHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 16,
  },
  smartCityTitle: {
    fontSize: 16,
    fontWeight: '600',
  },
  smartCityMetrics: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  smartCityMetricCard: {
    borderRadius: 8,
    padding: 12,
    width: '48%',
  },
  smartCityMetricHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 8,
  },
  smartCityMetricName: {
    fontSize: 12,
    fontWeight: '500',
  },
  smartCityMetricValue: {
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 8,
  },
  smartCityMetricTrend: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  smartCityMetricChange: {
    fontSize: 11,
    fontWeight: '600',
  },
  insightsContainer: {
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    marginBottom: 8,
  },
  insightsHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 16,
  },
  insightsTitle: {
    fontSize: 16,
    fontWeight: '600',
  },
  insightsList: {
    gap: 12,
  },
  insightCard: {
    borderRadius: 8,
    padding: 12,
    borderWidth: 1,
  },
  insightCardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 8,
  },
  insightInfo: {
    flex: 1,
  },
  insightCategory: {
    fontSize: 11,
    fontWeight: '400',
    marginBottom: 2,
  },
  insightConfidence: {
    fontSize: 10,
    fontWeight: '600',
  },
  insightImpactBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
  },
  insightImpactText: {
    fontSize: 10,
    fontWeight: '600',
    textTransform: 'capitalize',
  },
  insightText: {
    fontSize: 13,
    fontWeight: '500',
    marginBottom: 8,
  },
  insightTimestamp: {
    fontSize: 10,
    fontWeight: '400',
  },
  operationsFeedContainer: {
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    marginBottom: 8,
  },
  operationsFeedHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 16,
  },
  operationsFeedTitle: {
    fontSize: 16,
    fontWeight: '600',
  },
  operationsFeedList: {
    gap: 12,
  },
  operationFeedItem: {
    flexDirection: 'row',
    gap: 12,
    alignItems: 'flex-start',
  },
  operationFeedDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginTop: 6,
  },
  operationFeedContent: {
    flex: 1,
  },
  operationFeedEvent: {
    fontSize: 13,
    fontWeight: '600',
    marginBottom: 4,
  },
  operationFeedDetails: {
    fontSize: 11,
    fontWeight: '400',
    marginBottom: 4,
  },
  operationFeedTimestamp: {
    fontSize: 10,
    fontWeight: '400',
  },
  platformHealthContainer: {
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    marginBottom: 8,
  },
  platformHealthHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 16,
  },
  platformHealthTitle: {
    fontSize: 16,
    fontWeight: '600',
  },
  platformHealthList: {
    gap: 12,
  },
  platformHealthCard: {
    borderRadius: 8,
    padding: 12,
    borderWidth: 1,
  },
  platformHealthCardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 8,
  },
  platformHealthInfo: {
    flex: 1,
  },
  platformHealthSystem: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 2,
  },
  platformHealthStatus: {
    fontSize: 11,
    fontWeight: '600',
  },
  platformHealthMetrics: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  platformHealthMetric: {
    alignItems: 'center',
  },
  platformHealthMetricLabel: {
    fontSize: 10,
    fontWeight: '400',
    marginBottom: 2,
  },
  platformHealthMetricValue: {
    fontSize: 12,
    fontWeight: '700',
  },
});

export default GovernmentCommandCenter;
