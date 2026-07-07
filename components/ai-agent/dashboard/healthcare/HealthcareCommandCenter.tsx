import React, { useState } from 'react';
import { View, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Text } from '@/components/ui/text';
import { useTheme } from '@/providers/ThemeProvider';
import { 
  LayoutDashboard,
  HeartPulse,
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
  Stethoscope,
  Activity as ActivityIcon,
  MonitorHeart,
  Hospital,
  BedDouble,
  UserCheck,
  ShieldCheck,
  FileMedical,
  TestTube,
  Microscope,
  Syringe,
  Pill,
  Baby,
  Wheelchair,
  Crutch,
  Bone,
  Brain as BrainIcon,
  Eye as EyeIcon,
  Ear,
  Tooth,
  Thermometer,
  Bandage,
  ClipboardList,
  CalendarCheck,
  Clock as ClockIcon,
  MapPin,
  Building2,
  Truck,
  Package,
  Warehouse,
  Factory,
  Cpu,
  Wifi,
  Database,
  Server,
  HardDrive,
  Network as NetworkIcon,
  Radio,
  Smartphone,
  Laptop,
  Watch,
  Fingerprint,
  Scan,
  Barcode,
  QrCode,
  FileSearch,
  Search as SearchIcon,
  Filter as FilterIcon,
  Sort,
  ArrowUpDown,
  ArrowLeftRight,
  Maximize2,
  Minimize2,
  Expand,
  Shrink,
  Fullscreen,
  ZoomIn,
  ZoomOut,
  RotateCw,
  RotateCcw,
  FlipHorizontal,
  FlipVertical,
  Crop,
  Scissors,
  Eraser,
  Pen,
  Pencil,
  Highlighter,
  Type,
  Bold,
  Italic,
  Underline,
  Strikethrough,
  AlignLeft,
  AlignCenter,
  AlignRight,
  AlignJustify,
  List,
  ListOrdered,
  ListTodo,
  CheckSquare,
  Square,
  Circle,
  CircleDot,
  MinusCircle,
  PlusCircle,
  XCircle,
  AlertTriangle,
  AlertOctagon,
  Shield,
  ShieldAlert,
  ShieldCheck as ShieldCheckIcon,
  Lock,
  Unlock,
  Key,
  KeyRound,
  Fingerprint as FingerprintIcon,
  User,
  UserPlus,
  UserMinus,
  UserX,
  Users as UsersIcon,
  Users2,
  Users3,
  UserCog,
  UserCheck as UserCheckIcon,
  UserCircle,
  UserSquare,
  Crown,
  Gem,
  Medal,
  Award as AwardIcon,
  Trophy,
  Star as StarIcon,
  StarHalf,
  StarOff,
  Heart as HeartIcon,
  HeartHandshake,
  HeartPulse as HeartPulseIcon,
  Activity as ActivityIcon2,
  Zap as ZapIcon,
  Flame as FlameIcon,
  Snowflake,
  Sun,
  Moon,
  Cloud,
  CloudRain,
  CloudSnow,
  CloudLightning,
  CloudDrizzle,
  CloudFog,
  Wind,
  Thermometer as ThermometerIcon,
  Droplets,
  Waves,
  Navigation,
  Compass,
  Map,
  MapPin as MapPinIcon,
  Globe as GlobeIcon,
  Earth,
  Satellite,
  Rocket as RocketIcon,
  Plane,
  Car,
  Train,
  Bus,
  Bike,
  Motorcycle,
  Ship,
  Anchor,
  Anchor as AnchorIcon,
  Home,
  Building,
  Building2 as Building2Icon,
  Store,
  Warehouse as WarehouseIcon,
  Factory as FactoryIcon,
  Briefcase as BriefcaseIcon,
  Calendar as CalendarIcon,
  CalendarDays,
  CalendarRange,
  Clock as ClockIcon2,
  Timer,
  Stopwatch,
  Hourglass,
  AlarmClock,
  Watch as WatchIcon,
  DollarSign,
} from 'lucide-react-native';

// Types
interface HealthcareAgent {
  id: string;
  name: string;
  specialty: string;
  avatar: string;
  status: 'active' | 'monitoring' | 'paused' | 'error';
  confidenceScore: number;
  healthcareImpactScore: number;
  metrics: {
    casesReviewed?: number;
    diagnosticAccuracy?: number;
    clinicalRecommendations?: number;
    patientsMonitored?: number;
    earlyWarningsGenerated?: number;
    interventionSuccessRate?: number;
    bedsOptimized?: number;
    resourceEfficiencyGain?: string;
    schedulingAccuracy?: number;
  };
  activeInsights: number;
  trend: 'up' | 'down' | 'stable';
}

interface HealthcareKPI {
  id: string;
  title: string;
  value: string;
  change: string;
  trend: 'up' | 'down' | 'stable';
  color: string;
  subtitle: string;
}

interface Patient {
  id: string;
  patientId: string;
  name: string;
  age: number;
  condition: string;
  status: 'admitted' | 'outpatient' | 'discharged' | 'critical';
  admissionDate: string;
  department: string;
}

interface DiagnosticCase {
  id: string;
  caseNumber: string;
  patientId: string;
  patientName: string;
  type: string;
  priority: 'routine' | 'urgent' | 'critical';
  status: 'pending' | 'in-progress' | 'completed' | 'reviewed';
  submittedDate: string;
  aiConfidence: number;
}

interface CarePlan {
  id: string;
  planId: string;
  patientId: string;
  patientName: string;
  condition: string;
  status: 'active' | 'monitoring' | 'completed';
  startDate: string;
  nextReview: string;
  adherence: number;
}

interface HealthcareInsight {
  id: string;
  insight: string;
  category: string;
  confidence: number;
  impact: 'high' | 'medium' | 'low';
  timestamp: string;
}

interface HealthcareActivity {
  id: string;
  event: string;
  type: 'admission' | 'discharge' | 'diagnostic' | 'treatment' | 'alert' | 'resource' | 'compliance';
  timestamp: string;
  details?: string;
}

interface HealthcareSystemHealth {
  id: string;
  system: string;
  status: 'healthy' | 'degraded' | 'down';
  uptime: string;
  latency: string;
}

const HealthcareCommandCenter = () => {
  const theme = useTheme();
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [activeTab, setActiveTab] = useState('dashboard');

  // Navigation Items
  const navigationItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'agents', label: 'AI Medical Agents', icon: HeartPulse },
    { id: 'patients', label: 'Patient Operations', icon: Users },
    { id: 'clinical', label: 'Clinical Intelligence', icon: Brain },
    { id: 'diagnostics', label: 'Diagnostics', icon: Microscope },
    { id: 'care', label: 'Care Management', icon: ClipboardList },
    { id: 'population', label: 'Population Health', icon: Globe },
    { id: 'resources', label: 'Resource Management', icon: Hospital },
    { id: 'compliance', label: 'Compliance & Quality', icon: ShieldCheck },
    { id: 'analytics', label: 'Analytics', icon: BarChart3 },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  // Healthcare KPIs
  const healthcareKPIs: HealthcareKPI[] = [
    { id: '1', title: 'Patients Monitored', value: '18,482', change: '+8.4%', trend: 'up', color: '#10B981', subtitle: 'Active patients' },
    { id: '2', title: 'Bed Occupancy Rate', value: '87%', change: '+2.1%', trend: 'up', color: '#06B6D4', subtitle: 'Hospital capacity' },
    { id: '3', title: 'Average Length of Stay', value: '4.2d', change: '-0.3d', trend: 'down', color: '#F59E0B', subtitle: 'Days per stay' },
    { id: '4', title: 'Patient Satisfaction', value: '94', change: '+3.2%', trend: 'up', color: '#8B5CF6', subtitle: 'Satisfaction score' },
    { id: '5', title: 'Readmission Rate', value: '6.2%', change: '-1.4%', trend: 'down', color: '#10B981', subtitle: '30-day readmission' },
    { id: '6', title: 'Clinical Outcome Score', value: '94', change: '+2.8%', trend: 'up', color: '#06B6D4', subtitle: 'Outcome quality' },
    { id: '7', title: 'ED Wait Time', value: '18m', change: '-3m', trend: 'down', color: '#F59E0B', subtitle: 'Emergency department' },
    { id: '8', title: 'Staff Utilization', value: '89%', change: '+4.2%', trend: 'up', color: '#8B5CF6', subtitle: 'Resource efficiency' },
    { id: '9', title: 'AI Diagnostic Accuracy', value: '97%', change: '+1.8%', trend: 'up', color: '#10B981', subtitle: 'AI model accuracy' },
    { id: '10', title: 'Operational Efficiency', value: '92', change: '+5.4%', trend: 'up', color: '#EC4899', subtitle: 'Efficiency index' },
  ];

  // AI Medical Agents
  const healthcareAgents: HealthcareAgent[] = [
    {
      id: '1',
      name: 'Agent MedAI',
      specialty: 'Clinical Decision Support Agent',
      avatar: '🏥',
      status: 'active',
      confidenceScore: 97,
      healthcareImpactScore: 94,
      metrics: {
        casesReviewed: 248000,
        diagnosticAccuracy: 97,
        clinicalRecommendations: 82400,
      },
      activeInsights: 156,
      trend: 'up',
    },
    {
      id: '2',
      name: 'Agent Pulse',
      specialty: 'Patient Monitoring Agent',
      avatar: '💓',
      status: 'active',
      confidenceScore: 96,
      healthcareImpactScore: 91,
      metrics: {
        patientsMonitored: 18200,
        earlyWarningsGenerated: 4281,
        interventionSuccessRate: 92,
      },
      activeInsights: 234,
      trend: 'up',
    },
    {
      id: '3',
      name: 'Agent CareFlow',
      specialty: 'Hospital Operations Agent',
      avatar: '🔄',
      status: 'active',
      confidenceScore: 95,
      healthcareImpactScore: 88,
      metrics: {
        bedsOptimized: 4820,
        resourceEfficiencyGain: '+21%',
        schedulingAccuracy: 96,
      },
      activeInsights: 89,
      trend: 'stable',
    },
    {
      id: '4',
      name: 'Agent Diagno',
      specialty: 'Diagnostic Intelligence Agent',
      avatar: '🔬',
      status: 'active',
      confidenceScore: 98,
      healthcareImpactScore: 93,
      metrics: {
        casesReviewed: 156000,
        diagnosticAccuracy: 98,
        clinicalRecommendations: 42100,
      },
      activeInsights: 178,
      trend: 'up',
    },
  ];

  // Patients
  const patients: Patient[] = [
    { id: '1', patientId: 'PAT-2024-001', name: 'John Smith', age: 54, condition: 'Cardiac Arrhythmia', status: 'admitted', admissionDate: '2024-01-15', department: 'Cardiology' },
    { id: '2', patientId: 'PAT-2024-002', name: 'Sarah Johnson', age: 42, condition: 'Diabetes Type 2', status: 'outpatient', admissionDate: '2024-01-18', department: 'Endocrinology' },
    { id: '3', patientId: 'PAT-2024-003', name: 'Michael Davis', age: 67, condition: 'Stroke Recovery', status: 'critical', admissionDate: '2024-01-20', department: 'Neurology' },
  ];

  // Diagnostic Cases
  const diagnosticCases: DiagnosticCase[] = [
    { id: '1', caseNumber: 'DXG-2024-001', patientId: 'PAT-2024-001', patientName: 'John Smith', type: 'Cardiac MRI', priority: 'urgent', status: 'in-progress', submittedDate: '2024-01-21', aiConfidence: 94 },
    { id: '2', caseNumber: 'DXG-2024-002', patientId: 'PAT-2024-002', patientName: 'Sarah Johnson', type: 'Blood Panel', priority: 'routine', status: 'completed', submittedDate: '2024-01-20', aiConfidence: 98 },
    { id: '3', caseNumber: 'DXG-2024-003', patientId: 'PAT-2024-003', patientName: 'Michael Davis', type: 'CT Scan', priority: 'critical', status: 'pending', submittedDate: '2024-01-22', aiConfidence: 91 },
  ];

  // Care Plans
  const carePlans: CarePlan[] = [
    { id: '1', planId: 'CP-2024-001', patientId: 'PAT-2024-001', patientName: 'John Smith', condition: 'Cardiac Arrhythmia', status: 'active', startDate: '2024-01-15', nextReview: '2024-02-15', adherence: 94 },
    { id: '2', planId: 'CP-2024-002', patientId: 'PAT-2024-002', patientName: 'Sarah Johnson', condition: 'Diabetes Type 2', status: 'monitoring', startDate: '2024-01-18', nextReview: '2024-02-18', adherence: 87 },
    { id: '3', planId: 'CP-2024-003', patientId: 'PAT-2024-003', patientName: 'Michael Davis', condition: 'Stroke Recovery', status: 'active', startDate: '2024-01-20', nextReview: '2024-01-27', adherence: 92 },
  ];

  // Healthcare Insights
  const healthcareInsights: HealthcareInsight[] = [
    { id: '1', insight: 'High readmission risk identified in cardiac patient cohort - proactive care coordination recommended.', category: 'Population Health', confidence: 94, impact: 'high', timestamp: '2h ago' },
    { id: '2', insight: 'Emergency department capacity expected to exceed threshold in next 4 hours based on admission patterns.', category: 'Operations', confidence: 89, impact: 'high', timestamp: '4h ago' },
    { id: '3', insight: 'AI diagnostics indicate elevated sepsis risk in 12 patients - immediate clinical review recommended.', category: 'Clinical Intelligence', confidence: 96, impact: 'high', timestamp: '6h ago' },
    { id: '4', insight: 'Operating room utilization can improve by 14% through optimized scheduling algorithms.', category: 'Resource Optimization', confidence: 87, impact: 'medium', timestamp: '8h ago' },
    { id: '5', insight: 'Preventive care outreach recommended for at-risk population in zip code 90210.', category: 'Population Health', confidence: 92, impact: 'high', timestamp: '10h ago' },
  ];

  // Healthcare Activities
  const healthcareActivities: HealthcareActivity[] = [
    { id: '1', event: 'Patient admitted - PAT-2024-004', type: 'admission', timestamp: '2m ago', details: 'Emergency - Chest pain' },
    { id: '2', event: 'Critical alert generated - Sepsis risk', type: 'alert', timestamp: '15m ago', details: 'Patient PAT-2024-003' },
    { id: '3', event: 'Diagnostic completed - DXG-2024-002', type: 'diagnostic', timestamp: '32m ago', details: 'Blood Panel - Normal' },
    { id: '4', event: 'Treatment plan updated - CP-2024-001', type: 'treatment', timestamp: '1h ago', details: 'Medication adjustment' },
    { id: '5', event: 'Care milestone achieved - PAT-2024-002', type: 'treatment', timestamp: '2h ago', details: 'Blood glucose target met' },
    { id: '6', event: 'Resource reallocated - ICU Bed 4', type: 'resource', timestamp: '3h ago', details: 'Capacity optimization' },
    { id: '7', event: 'Compliance event logged - Audit', type: 'compliance', timestamp: '4h ago', details: 'HIPAA documentation verified' },
  ];

  // Healthcare System Health
  const healthcareSystemHealth: HealthcareSystemHealth[] = [
    { id: '1', system: 'Electronic Health Records (EHR)', status: 'healthy', uptime: '99.9%', latency: '45ms' },
    { id: '2', system: 'Clinical Decision Support', status: 'healthy', uptime: '99.8%', latency: '32ms' },
    { id: '3', system: 'Diagnostic Platforms', status: 'healthy', uptime: '99.7%', latency: '58ms' },
    { id: '4', system: 'Telehealth Services', status: 'healthy', uptime: '99.6%', latency: '89ms' },
    { id: '5', system: 'Data Integrations', status: 'healthy', uptime: '99.5%', latency: '67ms' },
    { id: '6', system: 'AI Agents', status: 'healthy', uptime: '99.8%', latency: '42ms' },
    { id: '7', system: 'Medical Devices', status: 'healthy', uptime: '99.4%', latency: '28ms' },
  ];

  // Render Functions
  const renderKPICard = (kpi: HealthcareKPI) => (
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

  const renderAgentCard = (agent: HealthcareAgent) => (
    <View key={agent.id} style={[styles.agentCard, { backgroundColor: theme.colors.card, borderColor: agent.status === 'active' ? '#10B981' + '30' : '#6B7280' + '30' }]}>
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
          <Text style={[styles.agentMetricValue, { color: '#10B981' }]}>{agent.confidenceScore}%</Text>
          <Text style={[styles.agentMetricLabel, { color: theme.colors.textSecondary }]}>Confidence</Text>
        </View>
        <View style={styles.agentMetric}>
          <Text style={[styles.agentMetricValue, { color: '#06B6D4' }]}>{agent.healthcareImpactScore}</Text>
          <Text style={[styles.agentMetricLabel, { color: theme.colors.textSecondary }]}>Impact</Text>
        </View>
      </View>
      <View style={styles.agentInsights}>
        <Text style={[styles.agentInsightsCount, { color: '#8B5CF6' }]}>{agent.activeInsights}</Text>
        <Text style={[styles.agentInsightsLabel, { color: theme.colors.textSecondary }]}>Insights</Text>
      </View>
    </View>
  );

  const renderPatientCard = (patient: Patient) => (
    <View key={patient.id} style={[styles.patientCard, { backgroundColor: theme.colors.card }]}>
      <View style={styles.patientHeader}>
        <Users size={20} color="#10B981" />
        <View style={styles.patientInfo}>
          <Text style={[styles.patientId, { color: theme.colors.text }]}>{patient.patientId}</Text>
          <Text style={[styles.patientName, { color: theme.colors.textSecondary }]}>{patient.name}</Text>
        </View>
      </View>
      <View style={styles.patientMetrics}>
        <View style={styles.patientMetric}>
          <Text style={[styles.patientMetricValue, { color: '#06B6D4' }]}>{patient.age}</Text>
          <Text style={[styles.patientMetricLabel, { color: theme.colors.textSecondary }]}>Age</Text>
        </View>
        <View style={styles.patientMetric}>
          <Text style={[styles.patientMetricValue, { color: '#8B5CF6' }]}>{patient.condition}</Text>
          <Text style={[styles.patientMetricLabel, { color: theme.colors.textSecondary }]}>Condition</Text>
        </View>
      </View>
      <View style={[styles.patientStatusBadge, { backgroundColor: patient.status === 'admitted' ? 'rgba(16, 185, 129, 0.15)' : patient.status === 'critical' ? 'rgba(239, 68, 68, 0.15)' : patient.status === 'outpatient' ? 'rgba(6, 182, 212, 0.15)' : 'rgba(245, 158, 11, 0.15)' }]}>
        <Text style={[styles.patientStatusText, { color: patient.status === 'admitted' ? '#10B981' : patient.status === 'critical' ? '#EF4444' : patient.status === 'outpatient' ? '#06B6D4' : '#F59E0B' }]}>{patient.status}</Text>
      </View>
    </View>
  );

  const renderDiagnosticCard = (diagnostic: DiagnosticCase) => (
    <View key={diagnostic.id} style={[styles.diagnosticCard, { backgroundColor: theme.colors.card }]}>
      <View style={styles.diagnosticHeader}>
        <Microscope size={20} color="#06B6D4" />
        <View style={styles.diagnosticInfo}>
          <Text style={[styles.diagnosticNumber, { color: theme.colors.text }]}>{diagnostic.caseNumber}</Text>
          <Text style={[styles.diagnosticPatient, { color: theme.colors.textSecondary }]}>{diagnostic.patientName}</Text>
        </View>
      </View>
      <View style={styles.diagnosticMetrics}>
        <View style={styles.diagnosticMetric}>
          <Text style={[styles.diagnosticMetricValue, { color: '#8B5CF6' }]}>{diagnostic.type}</Text>
          <Text style={[styles.diagnosticMetricLabel, { color: theme.colors.textSecondary }]}>Type</Text>
        </View>
        <View style={styles.diagnosticMetric}>
          <Text style={[styles.diagnosticMetricValue, { color: '#10B981' }]}>{diagnostic.aiConfidence}%</Text>
          <Text style={[styles.diagnosticMetricLabel, { color: theme.colors.textSecondary }]}>AI Confidence</Text>
        </View>
      </View>
      <View style={[styles.diagnosticStatusBadge, { backgroundColor: diagnostic.status === 'completed' ? 'rgba(16, 185, 129, 0.15)' : diagnostic.status === 'in-progress' ? 'rgba(6, 182, 212, 0.15)' : diagnostic.status === 'pending' ? 'rgba(245, 158, 11, 0.15)' : 'rgba(139, 92, 246, 0.15)' }]}>
        <Text style={[styles.diagnosticStatusText, { color: diagnostic.status === 'completed' ? '#10B981' : diagnostic.status === 'in-progress' ? '#06B6D4' : diagnostic.status === 'pending' ? '#F59E0B' : '#8B5CF6' }]}>{diagnostic.status}</Text>
      </View>
    </View>
  );

  return (
    <View style={[styles.container, { backgroundColor: '#0B0F14' }]}>
      {/* Header */}
      <View style={[styles.header, { backgroundColor: 'rgba(11, 15, 20, 0.8)', borderBottomColor: 'rgba(255,255,255,0.1)' }]}>
        <View style={styles.headerContent}>
          <View style={styles.headerLeft}>
            <HeartPulse size={32} color="#10B981" />
            <View style={styles.headerTitle}>
              <Text style={[styles.headerTitleText, { color: '#FFFFFF' }]}>AI Healthcare & Medical Command Center</Text>
              <Text style={[styles.headerSubtitle, { color: 'rgba(255,255,255,0.6)' }]}>Autonomous Healthcare Operations & Clinical Intelligence</Text>
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
        <View style={[styles.sidebar, { backgroundColor: 'rgba(11, 15, 20, 0.6)', borderRightColor: 'rgba(255,255,255,0.1)' }]}>
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
        
        {/* Top Executive Bar - Prominent KPI Display */}
        <View style={[styles.topExecutiveBar, { backgroundColor: 'rgba(16, 185, 129, 0.08)', borderColor: 'rgba(16, 185, 129, 0.2)' }]}>
          <View style={styles.topBarHeader}>
            <View style={styles.topBarTitle}>
              <TrendingUp size={20} color="#10B981" />
              <Text style={[styles.topBarTitleText, { color: '#FFFFFF' }]}>Healthcare Executive Overview</Text>
            </View>
            <Text style={[styles.topBarPeriod, { color: 'rgba(255,255,255,0.6)' }]}>Last 24 hours</Text>
          </View>
          
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.topBarScroll}>
            <View style={styles.topBarKPIs}>
              {healthcareKPIs.slice(0, 5).map((kpi) => (
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

        {/* Healthcare KPIs */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Healthcare KPIs</Text>
          <View style={styles.kpiGrid}>
            {healthcareKPIs.map(renderKPICard)}
          </View>
        </View>

        {/* AI Medical Agents */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>AI Medical Agents</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.agentsScroll}>
            {healthcareAgents.map(renderAgentCard)}
          </ScrollView>
        </View>

        {/* Chief Medical Officer Command Center */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Chief Medical Officer Command Center</Text>
          <View style={[styles.commandCenter, { backgroundColor: 'rgba(16, 185, 129, 0.05)', borderColor: 'rgba(16, 185, 129, 0.2)' }]}>
            
            {/* Command Center Header */}
            <View style={styles.commandCenterHeader}>
              <View style={styles.commandCenterTitle}>
                <Brain size={24} color="#10B981" />
                <View>
                  <Text style={[styles.commandCenterTitleText, { color: '#FFFFFF' }]}>Healthcare Intelligence Hub</Text>
                  <Text style={[styles.commandCenterSubtitle, { color: 'rgba(255,255,255,0.6)' }]}>Real-time clinical operations monitoring</Text>
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

            {/* Primary Metrics Grid */}
            <View style={styles.commandCenterMetrics}>
              <View style={[styles.commandMetricCard, { backgroundColor: 'rgba(16, 185, 129, 0.08)', borderColor: 'rgba(16, 185, 129, 0.3)' }]}>
                <View style={styles.commandMetricHeader}>
                  <Users size={20} color="#10B981" />
                  <Text style={[styles.commandMetricLabel, { color: 'rgba(255,255,255,0.7)' }]}>Active Patients</Text>
                </View>
                <Text style={[styles.commandMetricValue, { color: '#10B981' }]}>18,482</Text>
                <View style={styles.commandMetricTrend}>
                  <TrendingUp size={14} color="#10B981" />
                  <Text style={[styles.commandMetricTrendText, { color: '#10B981' }]}>+8.4%</Text>
                  <Text style={[styles.commandMetricPeriod, { color: 'rgba(255,255,255,0.5)' }]}>Monitored</Text>
                </View>
              </View>

              <View style={[styles.commandMetricCard, { backgroundColor: 'rgba(6, 182, 212, 0.08)', borderColor: 'rgba(6, 182, 212, 0.3)' }]}>
                <View style={styles.commandMetricHeader}>
                  <BedDouble size={20} color="#06B6D4" />
                  <Text style={[styles.commandMetricLabel, { color: 'rgba(255,255,255,0.7)' }]}>Bed Occupancy</Text>
                </View>
                <Text style={[styles.commandMetricValue, { color: '#06B6D4' }]}>87%</Text>
                <View style={styles.commandMetricTrend}>
                  <TrendingUp size={14} color="#F59E0B" />
                  <Text style={[styles.commandMetricTrendText, { color: '#F59E0B' }]}>+2.1%</Text>
                  <Text style={[styles.commandMetricPeriod, { color: 'rgba(255,255,255,0.5)' }]}>Capacity</Text>
                </View>
              </View>

              <View style={[styles.commandMetricCard, { backgroundColor: 'rgba(139, 92, 246, 0.08)', borderColor: 'rgba(139, 92, 246, 0.3)' }]}>
                <View style={styles.commandMetricHeader}>
                  <Award size={20} color="#8B5CF6" />
                  <Text style={[styles.commandMetricLabel, { color: 'rgba(255,255,255,0.7)' }]}>Clinical Outcome Score</Text>
                </View>
                <Text style={[styles.commandMetricValue, { color: '#8B5CF6' }]}>94</Text>
                <View style={styles.commandMetricTrend}>
                  <TrendingUp size={14} color="#10B981" />
                  <Text style={[styles.commandMetricTrendText, { color: '#10B981' }]}>+2.8%</Text>
                  <Text style={[styles.commandMetricPeriod, { color: 'rgba(255,255,255,0.5)' }]}>Quality</Text>
                </View>
              </View>

              <View style={[styles.commandMetricCard, { backgroundColor: 'rgba(245, 158, 11, 0.08)', borderColor: 'rgba(245, 158, 11, 0.3)' }]}>
                <View style={styles.commandMetricHeader}>
                  <Activity size={20} color="#F59E0B" />
                  <Text style={[styles.commandMetricLabel, { color: 'rgba(255,255,255,0.7)' }]}>Readmission Rate</Text>
                </View>
                <Text style={[styles.commandMetricValue, { color: '#F59E0B' }]}>6.2%</Text>
                <View style={styles.commandMetricTrend}>
                  <TrendingDown size={14} color="#10B981" />
                  <Text style={[styles.commandMetricTrendText, { color: '#10B981' }]}>-1.4%</Text>
                  <Text style={[styles.commandMetricPeriod, { color: 'rgba(255,255,255,0.5)' }]}>30-day</Text>
                </View>
              </View>

              <View style={[styles.commandMetricCard, { backgroundColor: 'rgba(236, 72, 153, 0.08)', borderColor: 'rgba(236, 72, 153, 0.3)' }]}>
                <View style={styles.commandMetricHeader}>
                  <Brain size={20} color="#EC4899" />
                  <Text style={[styles.commandMetricLabel, { color: 'rgba(255,255,255,0.7)' }]}>AI Care Recommendations</Text>
                </View>
                <Text style={[styles.commandMetricValue, { color: '#EC4899' }]}>4,281</Text>
                <View style={styles.commandMetricTrend}>
                  <TrendingUp size={14} color="#10B981" />
                  <Text style={[styles.commandMetricTrendText, { color: '#10B981' }]}>+12.2%</Text>
                  <Text style={[styles.commandMetricPeriod, { color: 'rgba(255,255,255,0.5)' }]}>Today</Text>
                </View>
              </View>
            </View>

            {/* Healthcare Health Overview */}
            <View style={styles.commandCenterHealth}>
              <View style={styles.healthOverview}>
                <Text style={[styles.healthOverviewTitle, { color: '#FFFFFF' }]}>Healthcare System Health</Text>
                <View style={styles.healthScoreContainer}>
                  <Text style={[styles.healthScore, { color: '#10B981' }]}>94%</Text>
                  <View style={styles.healthScoreIndicator}>
                    <View style={[styles.healthScoreBar, { width: '94%', backgroundColor: '#10B981' }]} />
                  </View>
                </View>
                <Text style={[styles.healthScoreDescription, { color: 'rgba(255,255,255,0.6)' }]}>Excellent - All healthcare systems optimal</Text>
              </View>

              <View style={styles.healthBreakdown}>
                <Text style={[styles.healthBreakdownTitle, { color: '#FFFFFF' }]}>Health Breakdown</Text>
                <View style={styles.healthBreakdownItems}>
                  <View style={styles.healthBreakdownItem}>
                    <View style={[styles.healthBreakdownDot, { backgroundColor: '#10B981' }]} />
                    <Text style={[styles.healthBreakdownLabel, { color: 'rgba(255,255,255,0.7)' }]}>Patient Outcomes</Text>
                    <Text style={[styles.healthBreakdownValue, { color: '#10B981' }]}>96%</Text>
                  </View>
                  <View style={styles.healthBreakdownItem}>
                    <View style={[styles.healthBreakdownDot, { backgroundColor: '#06B6D4' }]} />
                    <Text style={[styles.healthBreakdownLabel, { color: 'rgba(255,255,255,0.7)' }]}>Clinical Quality</Text>
                    <Text style={[styles.healthBreakdownValue, { color: '#06B6D4' }]}>94%</Text>
                  </View>
                  <View style={styles.healthBreakdownItem}>
                    <View style={[styles.healthBreakdownDot, { backgroundColor: '#8B5CF6' }]} />
                    <Text style={[styles.healthBreakdownLabel, { color: 'rgba(255,255,255,0.7)' }]}>Operational Efficiency</Text>
                    <Text style={[styles.healthBreakdownValue, { color: '#8B5CF6' }]}>92%</Text>
                  </View>
                  <View style={styles.healthBreakdownItem}>
                    <View style={[styles.healthBreakdownDot, { backgroundColor: '#F59E0B' }]} />
                    <Text style={[styles.healthBreakdownLabel, { color: 'rgba(255,255,255,0.7)' }]}>Resource Utilization</Text>
                    <Text style={[styles.healthBreakdownValue, { color: '#F59E0B' }]}>89%</Text>
                  </View>
                </View>
              </View>
            </View>

            {/* Patient Flow Visualization */}
            <View style={styles.patientFlowSection}>
              <View style={styles.patientFlowHeader}>
                <Users size={16} color="#10B981" />
                <Text style={[styles.patientFlowTitle, { color: '#FFFFFF' }]}>Patient Flow Analytics</Text>
              </View>
              <View style={styles.patientFlowVisualization}>
                <View style={styles.patientFlowBars}>
                  {[
                    { category: 'Admissions', value: 142 },
                    { category: 'Discharges', value: 128 },
                    { category: 'Transfers', value: 45 },
                    { category: 'Emergency', value: 89 },
                    { category: 'Outpatient', value: 312 },
                  ].map((data, index) => (
                    <View key={index} style={styles.patientFlowBar}>
                      <View style={[
                        styles.patientFlowBarFill,
                        { 
                          height: `${data.value / 3.5}%`,
                          backgroundColor: data.value >= 200 ? '#10B981' : data.value >= 100 ? '#06B6D4' : '#F59E0B'
                        }
                      ]} />
                      <Text style={[styles.patientFlowLabel, { color: 'rgba(255,255,255,0.6)' }]}>{data.category}</Text>
                    </View>
                  ))}
                </View>
              </View>
            </View>

            {/* Clinical Performance Attribution */}
            <View style={styles.clinicalPerformance}>
              <View style={styles.clinicalPerformanceHeader}>
                <Award size={16} color="#8B5CF6" />
                <Text style={[styles.clinicalPerformanceTitle, { color: '#FFFFFF' }]}>Clinical Performance by Department</Text>
              </View>
              <View style={styles.clinicalPerformanceList}>
                {[
                  { department: 'Cardiology', score: 96, percentage: 96, color: '#10B981' },
                  { department: 'Neurology', score: 94, percentage: 94, color: '#06B6D4' },
                  { department: 'Oncology', score: 92, percentage: 92, color: '#8B5CF6' },
                  { department: 'Emergency', score: 89, percentage: 89, color: '#F59E0B' },
                  { department: 'Surgery', score: 91, percentage: 91, color: '#EC4899' },
                ].map((item, index) => (
                  <View key={index} style={styles.clinicalPerformanceItem}>
                    <View style={styles.clinicalPerformanceInfo}>
                      <View style={[styles.clinicalPerformanceDot, { backgroundColor: item.color }]} />
                      <Text style={[styles.clinicalPerformanceDept, { color: 'rgba(255,255,255,0.8)' }]}>{item.department}</Text>
                    </View>
                    <View style={styles.clinicalPerformanceMetrics}>
                      <Text style={[styles.clinicalPerformanceScore, { color: '#FFFFFF' }]}>{item.score}</Text>
                      <View style={[
                        styles.clinicalPerformanceBar,
                        { width: `${item.percentage}%`, backgroundColor: item.color }
                      ]} />
                    </View>
                  </View>
                ))}
              </View>
            </View>
          </View>
        </View>

        {/* Patient Operations Center */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Patient Operations Center</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.patientsScroll}>
            {patients.map(renderPatientCard)}
          </ScrollView>
        </View>

        {/* Clinical Intelligence Hub */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Clinical Intelligence Hub</Text>
          <View style={[styles.clinicalIntelligence, { backgroundColor: theme.colors.card }]}>
            <View style={styles.intelligenceGrid}>
              <View style={[styles.intelligenceCard, { backgroundColor: 'rgba(16, 185, 129, 0.05)', borderColor: 'rgba(16, 185, 129, 0.2)' }]}>
                <Award size={24} color="#10B981" />
                <Text style={[styles.intelligenceValue, { color: '#10B981' }]}>94%</Text>
                <Text style={[styles.intelligenceLabel, { color: theme.colors.textSecondary }]}>Treatment Outcomes</Text>
              </View>
              <View style={[styles.intelligenceCard, { backgroundColor: 'rgba(6, 182, 212, 0.05)', borderColor: 'rgba(6, 182, 212, 0.2)' }]}>
                <Target size={24} color="#06B6D4" />
                <Text style={[styles.intelligenceValue, { color: '#06B6D4' }]}>91%</Text>
                <Text style={[styles.intelligenceLabel, { color: theme.colors.textSecondary }]}>Clinical Pathways</Text>
              </View>
              <View style={[styles.intelligenceCard, { backgroundColor: 'rgba(139, 92, 246, 0.05)', borderColor: 'rgba(139, 92, 246, 0.2)' }]}>
                <Star size={24} color="#8B5CF6" />
                <Text style={[styles.intelligenceValue, { color: '#8B5CF6' }]}>89%</Text>
                <Text style={[styles.intelligenceLabel, { color: theme.colors.textSecondary }]}>Care Quality</Text>
              </View>
              <View style={[styles.intelligenceCard, { backgroundColor: 'rgba(245, 158, 11, 0.05)', borderColor: 'rgba(245, 158, 11, 0.2)' }]}>
                <Users size={24} color="#F59E0B" />
                <Text style={[styles.intelligenceValue, { color: '#F59E0B' }]}>87%</Text>
                <Text style={[styles.intelligenceLabel, { color: theme.colors.textSecondary }]}>Physician Performance</Text>
              </View>
            </View>
          </View>
        </View>

        {/* Diagnostics Command Center */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Diagnostics Command Center</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.diagnosticsScroll}>
            {diagnosticCases.map(renderDiagnosticCard)}
          </ScrollView>
          
          {/* Diagnostic Workflow */}
          <View style={[styles.diagnosticWorkflow, { backgroundColor: theme.colors.card }]}>
            <Text style={[styles.workflowTitle, { color: theme.colors.text }]}>Diagnostic Workflow</Text>
            <View style={styles.workflowSteps}>
              {[
                { step: 'Patient Assessment', status: 'completed' },
                { step: 'Data Collection', status: 'completed' },
                { step: 'AI Analysis', status: 'in-progress' },
                { step: 'Clinical Review', status: 'pending' },
                { step: 'Diagnosis', status: 'pending' },
                { step: 'Treatment Plan', status: 'pending' },
              ].map((item, index) => (
                <View key={index} style={styles.workflowStep}>
                  <View style={[
                    styles.workflowStepDot,
                    { backgroundColor: item.status === 'completed' ? '#10B981' : item.status === 'in-progress' ? '#06B6D4' : '#6B7280' }
                  ]} />
                  <Text style={[
                    styles.workflowStepText,
                    { color: item.status === 'completed' ? '#10B981' : item.status === 'in-progress' ? '#06B6D4' : 'rgba(255,255,255,0.5)' }
                  ]}>{item.step}</Text>
                  {index < 5 && <View style={[styles.workflowStepLine, { backgroundColor: item.status === 'completed' ? '#10B981' : '#6B7280' }]} />}
                </View>
              ))}
            </View>
          </View>
        </View>

        {/* Care Management Hub */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Care Management Hub</Text>
          <View style={[styles.careManagement, { backgroundColor: theme.colors.card }]}>
            <View style={styles.careStats}>
              <View style={styles.careStat}>
                <Text style={[styles.careStatValue, { color: '#10B981' }]}>2,842</Text>
                <Text style={[styles.careStatLabel, { color: theme.colors.textSecondary }]}>Active Care Plans</Text>
              </View>
              <View style={styles.careStat}>
                <Text style={[styles.careStatValue, { color: '#06B6D4' }]}>89%</Text>
                <Text style={[styles.careStatLabel, { color: theme.colors.textSecondary }]}>Average Adherence</Text>
              </View>
              <View style={styles.careStat}>
                <Text style={[styles.careStatValue, { color: '#8B5CF6' }]}>412</Text>
                <Text style={[styles.careStatLabel, { color: theme.colors.textSecondary }]}>High-Risk Patients</Text>
              </View>
              <View style={styles.careStat}>
                <Text style={[styles.careStatValue, { color: '#F59E0B' }]}>94%</Text>
                <Text style={[styles.careStatLabel, { color: theme.colors.textSecondary }]}>Follow-Up Compliance</Text>
              </View>
            </View>
          </View>
        </View>

        {/* Population Health Intelligence */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Population Health Intelligence</Text>
          <View style={[styles.populationHealth, { backgroundColor: theme.colors.card }]}>
            <View style={styles.populationMetrics}>
              <View style={[styles.populationMetric, { backgroundColor: 'rgba(16, 185, 129, 0.05)', borderColor: 'rgba(16, 185, 129, 0.2)' }]}>
                <Globe size={20} color="#10B981" />
                <Text style={[styles.populationMetricValue, { color: '#10B981' }]}>127,420</Text>
                <Text style={[styles.populationMetricLabel, { color: theme.colors.textSecondary }]}>Population Monitored</Text>
              </View>
              <View style={[styles.populationMetric, { backgroundColor: 'rgba(6, 182, 212, 0.05)', borderColor: 'rgba(6, 182, 212, 0.2)' }]}>
                <Activity size={20} color="#06B6D4" />
                <Text style={[styles.populationMetricValue, { color: '#06B6D4' }]}>8.2%</Text>
                <Text style={[styles.populationMetricLabel, { color: theme.colors.textSecondary }]}>Disease Trend</Text>
              </View>
              <View style={[styles.populationMetric, { backgroundColor: 'rgba(139, 92, 246, 0.05)', borderColor: 'rgba(139, 92, 246, 0.2)' }]}>
                <ShieldCheck size={20} color="#8B5CF6" />
                <Text style={[styles.populationMetricValue, { color: '#8B5CF6' }]}>76%</Text>
                <Text style={[styles.populationMetricLabel, { color: theme.colors.textSecondary }]}>Preventive Care Rate</Text>
              </View>
              <View style={[styles.populationMetric, { backgroundColor: 'rgba(245, 158, 11, 0.05)', borderColor: 'rgba(245, 158, 11, 0.2)' }]}>
                <AlertTriangle size={20} color="#F59E0B" />
                <Text style={[styles.populationMetricValue, { color: '#F59E0B' }]}>18,420</Text>
                <Text style={[styles.populationMetricLabel, { color: theme.colors.textSecondary }]}>Risk Population</Text>
              </View>
            </View>
          </View>
        </View>

        {/* Resource Management Center */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Resource Management Center</Text>
          <View style={[styles.resourceManagement, { backgroundColor: theme.colors.card }]}>
            <View style={styles.resourceGrid}>
              <View style={[styles.resourceCard, { backgroundColor: 'rgba(16, 185, 129, 0.05)', borderColor: 'rgba(16, 185, 129, 0.2)' }]}>
                <BedDouble size={24} color="#10B981" />
                <Text style={[styles.resourceValue, { color: '#10B981' }]}>342</Text>
                <Text style={[styles.resourceLabel, { color: theme.colors.textSecondary }]}>Bed Availability</Text>
              </View>
              <View style={[styles.resourceCard, { backgroundColor: 'rgba(6, 182, 212, 0.05)', borderColor: 'rgba(6, 182, 212, 0.2)' }]}>
                <Users size={24} color="#06B6D4" />
                <Text style={[styles.resourceValue, { color: '#06B6D4' }]}>1,248</Text>
                <Text style={[styles.resourceLabel, { color: theme.colors.textSecondary }]}>Staff Allocation</Text>
              </View>
              <View style={[styles.resourceCard, { backgroundColor: 'rgba(139, 92, 246, 0.05)', borderColor: 'rgba(139, 92, 246, 0.2)' }]}>
                <Activity size={24} color="#8B5CF6" />
                <Text style={[styles.resourceValue, { color: '#8B5CF6' }]}>89%</Text>
                <Text style={[styles.resourceLabel, { color: theme.colors.textSecondary }]}>Equipment Utilization</Text>
              </View>
              <View style={[styles.resourceCard, { backgroundColor: 'rgba(245, 158, 11, 0.05)', borderColor: 'rgba(245, 158, 11, 0.2)' }]}>
                <Hospital size={24} color="#F59E0B" />
                <Text style={[styles.resourceValue, { color: '#F59E0B' }]}>24</Text>
                <Text style={[styles.resourceLabel, { color: theme.colors.textSecondary }]}>OR Capacity</Text>
              </View>
            </View>
          </View>
        </View>

        {/* Quality & Compliance Dashboard */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Quality & Compliance Dashboard</Text>
          <View style={[styles.qualityCompliance, { backgroundColor: theme.colors.card }]}>
            <View style={styles.qualityMetrics}>
              <View style={styles.qualityMetric}>
                <Text style={[styles.qualityMetricValue, { color: '#10B981' }]}>96%</Text>
                <Text style={[styles.qualityMetricLabel, { color: theme.colors.textSecondary }]}>Clinical Quality Measures</Text>
              </View>
              <View style={styles.qualityMetric}>
                <Text style={[styles.qualityMetricValue, { color: '#06B6D4' }]}>100%</Text>
                <Text style={[styles.qualityMetricLabel, { color: theme.colors.textSecondary }]}>Accreditation Status</Text>
              </View>
              <View style={styles.qualityMetric}>
                <Text style={[styles.qualityMetricValue, { color: '#8B5CF6' }]}>98%</Text>
                <Text style={[styles.qualityMetricLabel, { color: theme.colors.textSecondary }]}>Regulatory Compliance</Text>
              </View>
              <View style={styles.qualityMetric}>
                <Text style={[styles.qualityMetricValue, { color: '#F59E0B' }]}>0.2%</Text>
                <Text style={[styles.qualityMetricLabel, { color: theme.colors.textSecondary }]}>Patient Safety Events</Text>
              </View>
            </View>
          </View>
        </View>

        {/* Healthcare Analytics Engine */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Healthcare Analytics Engine</Text>
          <View style={[styles.analyticsEngine, { backgroundColor: theme.colors.card }]}>
            <View style={styles.analyticsGrid}>
              <View style={[styles.analyticsCard, { backgroundColor: 'rgba(16, 185, 129, 0.05)', borderColor: 'rgba(16, 185, 129, 0.2)' }]}>
                <DollarSign size={24} color="#10B981" />
                <Text style={[styles.analyticsValue, { color: '#10B981' }]}>$842M</Text>
                <Text style={[styles.analyticsLabel, { color: theme.colors.textSecondary }]}>Financial Performance</Text>
              </View>
              <View style={[styles.analyticsCard, { backgroundColor: 'rgba(6, 182, 212, 0.05)', borderColor: 'rgba(6, 182, 212, 0.2)' }]}>
                <Zap size={24} color="#06B6D4" />
                <Text style={[styles.analyticsValue, { color: '#06B6D4' }]}>92%</Text>
                <Text style={[styles.analyticsLabel, { color: theme.colors.textSecondary }]}>Operational Efficiency</Text>
              </View>
              <View style={[styles.analyticsCard, { backgroundColor: 'rgba(139, 92, 246, 0.05)', borderColor: 'rgba(139, 92, 246, 0.2)' }]}>
                <Award size={24} color="#8B5CF6" />
                <Text style={[styles.analyticsValue, { color: '#8B5CF6' }]}>94%</Text>
                <Text style={[styles.analyticsLabel, { color: theme.colors.textSecondary }]}>Clinical Performance</Text>
              </View>
              <View style={[styles.analyticsCard, { backgroundColor: 'rgba(245, 158, 11, 0.05)', borderColor: 'rgba(245, 158, 11, 0.2)' }]}>
                <Star size={24} color="#F59E0B" />
                <Text style={[styles.analyticsValue, { color: '#F59E0B' }]}>94</Text>
                <Text style={[styles.analyticsLabel, { color: theme.colors.textSecondary }]}>Patient Experience</Text>
              </View>
            </View>
          </View>
        </View>

        {/* AI Healthcare Insights */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>AI Healthcare Insights</Text>
          <View style={[styles.insightsContainer, { backgroundColor: theme.colors.card }]}>
            {healthcareInsights.map((insight) => (
              <View key={insight.id} style={[styles.insightCard, { backgroundColor: 'rgba(16, 185, 129, 0.05)', borderColor: insight.impact === 'high' ? 'rgba(239, 68, 68, 0.3)' : insight.impact === 'medium' ? 'rgba(245, 158, 11, 0.3)' : 'rgba(6, 182, 212, 0.3)' }]}>
                <View style={styles.insightHeader}>
                  <Brain size={16} color="#10B981" />
                  <Text style={[styles.insightCategory, { color: theme.colors.textSecondary }]}>{insight.category}</Text>
                  <View style={[styles.insightConfidence, { backgroundColor: 'rgba(16, 185, 129, 0.15)' }]}>
                    <Text style={[styles.insightConfidenceText, { color: '#10B981' }]}>{insight.confidence}%</Text>
                  </View>
                </View>
                <Text style={[styles.insightText, { color: theme.colors.text }]}>{insight.insight}</Text>
                <Text style={[styles.insightTimestamp, { color: theme.colors.textSecondary }]}>{insight.timestamp}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* Real-time Clinical Operations Feed */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Real-time Clinical Operations Feed</Text>
          <View style={[styles.operationsFeed, { backgroundColor: theme.colors.card }]}>
            {healthcareActivities.map((activity) => (
              <View key={activity.id} style={styles.activityItem}>
                <View style={[
                  styles.activityDot,
                  { backgroundColor: activity.type === 'alert' ? '#EF4444' : activity.type === 'admission' ? '#10B981' : activity.type === 'diagnostic' ? '#06B6D4' : activity.type === 'treatment' ? '#8B5CF6' : '#F59E0B' }
                ]} />
                <View style={styles.activityContent}>
                  <Text style={[styles.activityEvent, { color: theme.colors.text }]}>{activity.event}</Text>
                  {activity.details && <Text style={[styles.activityDetails, { color: theme.colors.textSecondary }]}>{activity.details}</Text>}
                  <Text style={[styles.activityTimestamp, { color: theme.colors.textSecondary }]}>{activity.timestamp}</Text>
                </View>
              </View>
            ))}
          </View>
        </View>

        {/* Healthcare System Health */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Healthcare System Health</Text>
          <View style={[styles.systemHealth, { backgroundColor: theme.colors.card }]}>
            {healthcareSystemHealth.map((system) => (
              <View key={system.id} style={styles.systemHealthItem}>
                <View style={[
                  styles.systemHealthDot,
                  { backgroundColor: system.status === 'healthy' ? '#10B981' : system.status === 'degraded' ? '#F59E0B' : '#EF4444' }
                ]} />
                <Text style={[styles.systemHealthName, { color: theme.colors.text }]}>{system.system}</Text>
                <View style={styles.systemHealthMetrics}>
                  <Text style={[styles.systemHealthUptime, { color: '#10B981' }]}>{system.uptime}</Text>
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
    padding: 12,
    alignItems: 'center',
  },
  sidebarContent: {
    gap: 4,
  },
  sidebarItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    padding: 12,
    marginHorizontal: 8,
    borderRadius: 8,
  },
  sidebarItemText: {
    fontSize: 14,
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
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 8,
    borderWidth: 1,
    minWidth: 180,
  },
  topBarKPITitle: {
    fontSize: 12,
    marginBottom: 4,
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
    width: 'calc(20% - 10px)',
    padding: 16,
    borderRadius: 16,
    borderWidth: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
  },
  kpiHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
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
    fontSize: 11,
  },
  agentsScroll: {
    marginBottom: 8,
  },
  agentCard: {
    width: 280,
    padding: 16,
    borderRadius: 16,
    borderWidth: 1,
    marginRight: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 8,
    elevation: 4,
  },
  agentAvatar: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  agentAvatarText: {
    fontSize: 32,
    marginRight: 8,
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
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  agentInsightsCount: {
    fontSize: 16,
    fontWeight: '700',
  },
  agentInsightsLabel: {
    fontSize: 10,
  },
  commandCenter: {
    borderRadius: 20,
    padding: 24,
    borderWidth: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.4,
    shadowRadius: 16,
    elevation: 8,
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
    gap: 12,
    marginBottom: 20,
  },
  commandMetricCard: {
    flex: 1,
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
    elevation: 3,
  },
  commandMetricHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 12,
  },
  commandMetricLabel: {
    fontSize: 12,
    fontWeight: '600',
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
  patientFlowSection: {
    marginBottom: 20,
  },
  patientFlowHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 12,
  },
  patientFlowTitle: {
    fontSize: 14,
    fontWeight: '600',
  },
  patientFlowVisualization: {
    backgroundColor: 'rgba(255,255,255,0.02)',
    borderRadius: 8,
    padding: 16,
  },
  patientFlowBars: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'flex-end',
    height: 120,
  },
  patientFlowBar: {
    alignItems: 'center',
    gap: 8,
  },
  patientFlowBarFill: {
    width: 40,
    borderRadius: 4,
  },
  patientFlowLabel: {
    fontSize: 10,
  },
  clinicalPerformance: {
    marginBottom: 20,
  },
  clinicalPerformanceHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 12,
  },
  clinicalPerformanceTitle: {
    fontSize: 14,
    fontWeight: '600',
  },
  clinicalPerformanceList: {
    gap: 12,
  },
  clinicalPerformanceItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  clinicalPerformanceInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    width: 120,
  },
  clinicalPerformanceDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  clinicalPerformanceDept: {
    fontSize: 12,
  },
  clinicalPerformanceMetrics: {
    flex: 1,
    alignItems: 'flex-end',
    gap: 4,
  },
  clinicalPerformanceScore: {
    fontSize: 14,
    fontWeight: '600',
  },
  clinicalPerformanceBar: {
    height: 6,
    borderRadius: 3,
  },
  patientsScroll: {
    marginBottom: 8,
  },
  patientCard: {
    width: 280,
    padding: 16,
    borderRadius: 16,
    marginRight: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 4,
  },
  patientHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  patientInfo: {
    marginLeft: 12,
    flex: 1,
  },
  patientId: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 4,
  },
  patientName: {
    fontSize: 12,
  },
  patientMetrics: {
    flexDirection: 'row',
    gap: 16,
    marginBottom: 12,
  },
  patientMetric: {
    gap: 4,
  },
  patientMetricValue: {
    fontSize: 16,
    fontWeight: '600',
  },
  patientMetricLabel: {
    fontSize: 10,
  },
  patientStatusBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 6,
    alignSelf: 'flex-start',
  },
  patientStatusText: {
    fontSize: 11,
    fontWeight: '600',
  },
  clinicalIntelligence: {
    borderRadius: 20,
    padding: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.3,
    shadowRadius: 12,
    elevation: 6,
  },
  intelligenceGrid: {
    flexDirection: 'row',
    gap: 12,
  },
  intelligenceCard: {
    flex: 1,
    padding: 20,
    borderRadius: 12,
    borderWidth: 1,
    alignItems: 'center',
    gap: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
    elevation: 3,
  },
  intelligenceValue: {
    fontSize: 24,
    fontWeight: '700',
  },
  intelligenceLabel: {
    fontSize: 12,
  },
  diagnosticsScroll: {
    marginBottom: 16,
  },
  diagnosticCard: {
    width: 280,
    padding: 16,
    borderRadius: 16,
    marginRight: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 4,
  },
  diagnosticHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  diagnosticInfo: {
    marginLeft: 12,
    flex: 1,
  },
  diagnosticNumber: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 4,
  },
  diagnosticPatient: {
    fontSize: 12,
  },
  diagnosticMetrics: {
    flexDirection: 'row',
    gap: 16,
    marginBottom: 12,
  },
  diagnosticMetric: {
    gap: 4,
  },
  diagnosticMetricValue: {
    fontSize: 16,
    fontWeight: '600',
  },
  diagnosticMetricLabel: {
    fontSize: 10,
  },
  diagnosticStatusBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 6,
    alignSelf: 'flex-start',
  },
  diagnosticStatusText: {
    fontSize: 11,
    fontWeight: '600',
  },
  diagnosticWorkflow: {
    borderRadius: 20,
    padding: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 8,
    elevation: 5,
  },
  workflowTitle: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 16,
  },
  workflowSteps: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  workflowStep: {
    alignItems: 'center',
    flex: 1,
  },
  workflowStepDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    marginBottom: 8,
  },
  workflowStepText: {
    fontSize: 10,
    textAlign: 'center',
  },
  workflowStepLine: {
    height: 2,
    flex: 1,
    marginHorizontal: 4,
  },
  careManagement: {
    borderRadius: 20,
    padding: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 8,
    elevation: 5,
  },
  careStats: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  careStat: {
    alignItems: 'center',
    gap: 8,
  },
  careStatValue: {
    fontSize: 24,
    fontWeight: '700',
  },
  careStatLabel: {
    fontSize: 12,
  },
  populationHealth: {
    borderRadius: 20,
    padding: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 8,
    elevation: 5,
  },
  populationMetrics: {
    flexDirection: 'row',
    gap: 12,
  },
  populationMetric: {
    flex: 1,
    padding: 20,
    borderRadius: 12,
    borderWidth: 1,
    alignItems: 'center',
    gap: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
    elevation: 3,
  },
  populationMetricValue: {
    fontSize: 20,
    fontWeight: '700',
  },
  populationMetricLabel: {
    fontSize: 11,
  },
  resourceManagement: {
    borderRadius: 20,
    padding: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 8,
    elevation: 5,
  },
  resourceGrid: {
    flexDirection: 'row',
    gap: 12,
  },
  resourceCard: {
    flex: 1,
    padding: 20,
    borderRadius: 12,
    borderWidth: 1,
    alignItems: 'center',
    gap: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
    elevation: 3,
  },
  resourceValue: {
    fontSize: 24,
    fontWeight: '700',
  },
  resourceLabel: {
    fontSize: 12,
  },
  qualityCompliance: {
    borderRadius: 20,
    padding: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 8,
    elevation: 5,
  },
  qualityMetrics: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  qualityMetric: {
    alignItems: 'center',
    gap: 8,
  },
  qualityMetricValue: {
    fontSize: 24,
    fontWeight: '700',
  },
  qualityMetricLabel: {
    fontSize: 11,
  },
  analyticsEngine: {
    borderRadius: 20,
    padding: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 8,
    elevation: 5,
  },
  analyticsGrid: {
    flexDirection: 'row',
    gap: 12,
  },
  analyticsCard: {
    flex: 1,
    padding: 20,
    borderRadius: 12,
    borderWidth: 1,
    alignItems: 'center',
    gap: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
    elevation: 3,
  },
  analyticsValue: {
    fontSize: 24,
    fontWeight: '700',
  },
  analyticsLabel: {
    fontSize: 12,
  },
  insightsContainer: {
    borderRadius: 20,
    padding: 20,
    gap: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 8,
    elevation: 5,
  },
  insightCard: {
    padding: 20,
    borderRadius: 12,
    borderWidth: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
    elevation: 3,
  },
  insightHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 8,
  },
  insightCategory: {
    fontSize: 12,
    flex: 1,
  },
  insightConfidence: {
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
    marginBottom: 8,
  },
  insightTimestamp: {
    fontSize: 11,
  },
  operationsFeed: {
    borderRadius: 20,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 8,
    elevation: 5,
  },
  activityItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 12,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255,255,255,0.05)',
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
    fontSize: 13,
    fontWeight: '600',
    marginBottom: 4,
  },
  activityDetails: {
    fontSize: 12,
    marginBottom: 4,
  },
  activityTimestamp: {
    fontSize: 11,
  },
  systemHealth: {
    borderRadius: 20,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 8,
    elevation: 5,
  },
  systemHealthItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255,255,255,0.05)',
  },
  systemHealthDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  systemHealthName: {
    flex: 1,
    fontSize: 13,
  },
  systemHealthMetrics: {
    flexDirection: 'row',
    gap: 16,
  },
  systemHealthUptime: {
    fontSize: 12,
    fontWeight: '600',
  },
  systemHealthLatency: {
    fontSize: 12,
  },
});

export default HealthcareCommandCenter;
