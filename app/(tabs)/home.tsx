 
import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  FlatList,
  Image,
  useWindowDimensions,
  Alert,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import {
  Activity,
  ArrowUpRight,
  BarChart,
  BarChart2,
  BarChart3,
  Bell,
  Bot,
  Brain,
  Briefcase,
  Building,
  Building2,
  Calendar,
  Calculator,
  CheckCircle,
  Clock,
  Code,
  Database,
  DollarSign,
  Eye,
  FileText,
  Filter,
  Globe,
  Handshake,
  Hash,
  Headphones,
  HelpCircle,
  Image as ImageIcon,
  Inbox,
  Info,
  Layers,
  Lightbulb,
  LineChart,
  Mail,
  MapPin,
  Megaphone,
  Menu,
  MessageCircle as MessageCircleIcon,
  MessageSquare,
  Microscope,
  Monitor,
  Phone,
  PieChart,
  Plus,
  Radio,
  Scale,
  Search,
  SearchCheck,
  Send,
  Settings,
  Share2,
  Shield,
  Sparkles,
  Star,
  Sunrise,
  Target,
  TestTube,
  TrendingUp,
  UserCheck,
  UserPlus,
  Users,
  Video,
  Workflow,
  X,
  Zap,
  Crown,
  AlertTriangle,
  Truck,
  ServerIcon,
  Cpu,
  Palette,
  Trophy,
  Heart,
  Smile,
  GraduationCap,
  ShieldCheck,
  Landmark,
  HardDrive,
  Package,
  ShieldAlert,
  Siren,
  Lock,
  Fingerprint,
  Cog,
  Home,
  Navigation,
  ClipboardList,
  FileCheck,
  FileSignature,
  CheckSquare,
  Factory,
  Command,
  Network,
} from 'lucide-react-native';
import { useTheme } from '@/providers/ThemeProvider';
import { useMessaging } from '@/providers/MessagingProvider';
import { router } from 'expo-router';
import { QuickLinks } from '@/components/RelatedFeatures';
import aiAgentsSidebarSections from '@/constants/aiAgentsSidebarData';

interface QuickAction {
  id: string;
  title: string;
  icon: React.ComponentType<any>;
  color: string;
  onPress: () => void;
}

interface StatCard {
  title: string;
  value: string;
  change: string;
  icon: React.ComponentType<any>;
  color: string;
}

interface SidebarOption {
  id: string;
  title: string;
  icon: React.ComponentType<any>;
  color: string;
  subItems?: SidebarSubItem[];
}

interface SidebarSubItem {
  id: string;
  title: string;
  icon: React.ComponentType<any>;
  isHeader?: boolean;
  subSections?: SidebarSubSection[];
}

interface SidebarSubSection {
  id: string;
  title: string;
  icon: React.ComponentType<any>;
  items: SidebarSubSectionItem[];
}

interface SidebarSubSectionItem {
  id: string;
  title: string;
  icon: React.ComponentType<any>;
}

// ... (rest of the code remains the same)

const sidebarOptions: SidebarOption[] = [
  {
    id: 'social-media',
    title: 'Social Media Management',
    icon: Share2,
    color: '#E91E63',
    subItems: [
      { id: 'sm-1', title: 'Dashboard', icon: Activity },
      { id: 'sm-2', title: 'Content Calendar', icon: Calendar },
      { id: 'sm-3', title: 'Post Scheduler', icon: Clock },
      { id: 'sm-4', title: 'Social Analytics', icon: LineChart },
      { id: 'sm-5', title: 'Engagement Hub', icon: MessageCircleIcon },
      { id: 'sm-6', title: 'Hashtag Manager', icon: Hash },
      { id: 'sm-7', title: 'Competitor Analysis', icon: Eye },
      { id: 'sm-8', title: 'Content Library', icon: ImageIcon },
      { id: 'sm-9', title: 'Social Listening', icon: Radio },
      { id: 'sm-10', title: 'Influencer Tracking', icon: UserPlus },
      { id: 'sm-11', title: 'Brand Monitoring', icon: Shield },
      { id: 'sm-12', title: 'Stories & Reels', icon: Video },
      { id: 'sm-13', title: 'Social Inbox', icon: Inbox },
      { id: 'sm-14', title: 'Cross-Platform Publishing', icon: Send },
    ],
  },
  {
    id: '2',
    title: 'AI Agents & Employees',
    icon: Bot,
    color: '#34C759',
    subItems: [
      {
        id: '2-section-csuite',
        title: '1: C-Suite Executives (17)',
        icon: Crown,
        subSections: [
          {
            id: '2-csuite-tier0',
            title: 'Tier 0: Governance',
            icon: Shield,
            items: [
              { id: '2-ethics', title: 'AI Ethics Board', icon: Scale },
              { id: '2-ciso-ai', title: 'CISO-AI Oversight', icon: Shield },
            ]
          },
          {
            id: '2-csuite-tier1',
            title: 'Tier 1: C-Suite (17)',
            icon: Crown,
            items: [
              { id: '2-ceo', title: 'CEO - Chief Executive Officer', icon: Crown },
              { id: '2-cfo', title: 'CFO - Chief Financial Officer', icon: Calculator },
              { id: '2-cto', title: 'CTO - Chief Technology Officer', icon: Monitor },
              { id: '2-cmo', title: 'CMO - Chief Marketing Officer', icon: Megaphone },
              { id: '2-cco', title: 'CCO - Chief Customer Officer', icon: Headphones },
              { id: '2-coo', title: 'COO - Chief Operating Officer', icon: Settings },
              { id: '2-chro', title: 'CHRO - Chief HR Officer', icon: Users },
              { id: '2-clo', title: 'CLO - Chief Legal Officer', icon: Scale },
              { id: '2-ciso', title: 'CISO - Chief Security Officer', icon: ShieldCheck },
              { id: '2-cio', title: 'CIO - Chief Investment Officer', icon: TrendingUp },
              { id: '2-creo', title: 'CREO - Chief Real Estate Officer', icon: Building },
              { id: '2-cro', title: 'CRO - Chief Risk Officer', icon: ShieldAlert },
              { id: '2-cmo-hc', title: 'CMO - Chief Medical Officer', icon: Activity },
              { id: '2-cpo', title: 'CPO - Chief Production Officer', icon: Zap },
              { id: '2-clo-log', title: 'CLO - Chief Logistics Officer', icon: Truck },
              { id: '2-cao', title: 'CAO - Chief Admin Officer', icon: Building2 },
              { id: '2-cdao', title: 'CDAO - Chief Data & AI Officer', icon: Database },
            ]
          },
        ]
      },
      {
        id: '2-section-command',
        title: '2: Command Center (7)',
        icon: Command,
        subSections: [
          {
            id: '2-cmd-tier4',
            title: 'Tier 4: Command Center',
            icon: Command,
            items: [
              { id: '2-cdoo', title: 'CDOO - Chief Digital & Ops Officer', icon: Crown },
              { id: '2-ddo', title: 'DDO - Digital Deployment Officer', icon: Zap },
              { id: '2-wol', title: 'WOL - Workforce Optimization Lead', icon: Users },
              { id: '2-aod', title: 'AOD - Automation Ops Director', icon: Bot },
              { id: '2-pred', title: 'PRED - Predictive Ops Controller', icon: Brain },
              { id: '2-swarm', title: 'SWARM - Swarm Intelligence', icon: Network },
              { id: '2-learn', title: 'LEARN - Learning & Adaptation', icon: Sparkles },
              { id: '2-cc', title: '🎯 Open Command Center', icon: Target },
            ]
          },
          {
            id: '2-intel-tier2',
            title: 'Tier 2: Intelligence Layer',
            icon: Brain,
            items: [
              { id: '2-pred-engine', title: 'PRED - Predictive Engine', icon: TrendingUp },
              { id: '2-sentiment', title: 'SENTIMENT - Sentiment Core', icon: Heart },
              { id: '2-anomaly', title: 'ANOMALY - Anomaly Detector', icon: AlertTriangle },
            ]
          },
          {
            id: '2-bridge-tier3',
            title: 'Tier 3: Layer Bridge',
            icon: Layers,
            items: [
              { id: '2-layer-bridge', title: 'Digital Interface', icon: Layers },
            ]
          },
        ]
      },
      ...aiAgentsSidebarSections,
      {
        id: '2-section-workforce',
        title: '4: AI Workforce (199)',
        icon: Bot,
        subSections: [
          {
            id: '2-wf-agents-employees',
            title: 'AI agents and employees',
            icon: Users,
            items: [
              { id: '2-show-all-agents', title: 'Show all (199) AI agents and employees', icon: Bot },
            ]
          },
          {
            id: '2-wf-dashboard',
            title: 'Dashboard & Overview',
            icon: BarChart2,
            items: [
              { id: '2-main', title: '📊 View All Agents Dashboard', icon: Bot },
              { id: '2-agent-reactive', title: '⚡ Reactive Agents (199)', icon: Zap },
              { id: '2-agent-learning', title: '📚 Learning Agents (120)', icon: Brain },
              { id: '2-agent-swarm', title: '🐝 Swarm Agents (Unlimited)', icon: Network },
            ]
          },
          {
            id: '2-wf-hierarchy',
            title: 'Hierarchy Levels',
            icon: Layers,
            items: [
              { id: '2-vp-directors', title: 'VP/Directors (23)', icon: Users },
              { id: '2-managers', title: 'Managers (28)', icon: UserCheck },
              { id: '2-team-leads', title: 'Team Leads (28)', icon: Users },
              { id: '2-specialists', title: 'Specialists (97+)', icon: Bot },
            ]
          },
          {
            id: '2-wf-teams',
            title: 'Specialized Teams',
            icon: Users,
            items: [
              { id: '2-team-sales', title: 'Sales Team - SDRs & AEs', icon: TrendingUp },
              { id: '2-team-support', title: 'Support Team - Tiers 1-3', icon: Headphones },
              { id: '2-team-recruiting', title: 'Recruiting Team', icon: UserPlus },
              { id: '2-team-analytics', title: 'Analytics Team', icon: BarChart2 },
              { id: '2-team-creative', title: 'Creative Team', icon: Palette },
              { id: '2-team-legal', title: 'Legal Team', icon: Scale },
              { id: '2-team-finance', title: 'Finance Team', icon: Calculator },
              { id: '2-team-engineering', title: 'Engineering Team', icon: Code },
              { id: '2-team-hr', title: 'HR Team', icon: Users },
              { id: '2-team-marketing', title: 'Marketing Team', icon: Megaphone },
              { id: '2-team-ops', title: 'Operations Team', icon: Settings },
              { id: '2-team-security', title: 'Security Team', icon: Shield },
              { id: '2-team-product', title: 'Product Team', icon: Lightbulb },
            ]
          },
        ]
      },
      {
        id: '2-section-builder',
        title: '5: AI Agents Builder',
        icon: Sparkles,
        subSections: [
          {
            id: '2-build-tools',
            title: 'Builder Tools',
            icon: Sparkles,
            items: [
              { id: '2-builder', title: '✨ AI Agent Builder', icon: Bot },
              { id: '2-builder-emp', title: '👤 Employee Builder', icon: Users },
              { id: '2-builder-dept', title: '🏢 Department Builder', icon: Building2 },
            ]
          },
          {
            id: '2-build-specialized',
            title: 'Specialized Agents',
            icon: Bot,
            items: [
              { id: '2-pa', title: '🤖 AI Personal Assistant', icon: Bot },
              { id: '2-ar', title: '📞 AI Receptionist', icon: Phone },
              { id: '2-an', title: '🤝 AI Negotiation', icon: Handshake },
            ]
          },
        ]
      },
    ],
  },
  {
    id: '4',
    title: 'Collaboration & Team Management',
    icon: UserCheck,
    color: '#5AC8FA',
    subItems: [
      { id: '4-1', title: 'Team Collaboration', icon: Users },
      { id: '4-2', title: 'Team Management', icon: UserCheck },
    ],
  },
  {
    id: '5',
    title: 'CRM',
    icon: Building,
    color: '#FF2D92',
    subItems: [
      { id: '5-1', title: 'CRM', icon: Building },
      { id: '5-5', title: 'Cohort Analysis', icon: PieChart },
    ],
  },
  {
    id: '6',
    title: 'Analysis & Performance',
    icon: BarChart,
    color: '#FF3B30',
    subItems: [
      { id: '6-1', title: 'Reports', icon: FileText },
      { id: '6-2', title: 'Insights', icon: BarChart2 },
      { id: '6-3', title: 'Performance Insights', icon: Activity },
    ],
  },
  {
    id: '7',
    title: 'Marketing',
    icon: Target,
    color: '#FFCC02',
    subItems: [
      { id: '7-1', title: 'SMS Marketing', icon: MessageCircleIcon },
      { id: '7-2', title: 'Email Marketing', icon: Mail },
      { id: '7-3', title: 'A/B Testing', icon: TestTube },
      { id: '7-4', title: 'Campaign', icon: Megaphone },
    ],
  },
  {
    id: '8',
    title: 'Notifications',
    icon: Bell,
    color: '#AF52DE',
  },
  {
    id: '9',
    title: 'Support',
    icon: HelpCircle,
    color: '#5AC8FA',
  },
  {
    id: '10',
    title: 'Settings',
    icon: Settings,
    color: '#8E8E93',
  },
];

export default function HomeScreen() {
  const { theme } = useTheme();
  const { conversations } = useMessaging();
  const { width } = useWindowDimensions();
  const insets = useSafeAreaInsets();
  const [selectedPeriod, setSelectedPeriod] = useState<'today' | 'week' | 'month'>('today');
  const [showSidebar, setShowSidebar] = useState<boolean>(false);
  const [notifications] = useState<number>(3);
  const [systemStatus] = useState<'online' | 'maintenance' | 'issues'>('online');
  const [expandedSections, setExpandedSections] = useState<Set<string>>(new Set());
  const [expandedSubSections, setExpandedSubSections] = useState<Set<string>>(new Set());
  const [smartFeatures, setSmartFeatures] = useState<SmartFeature[]>([
    {
      id: 'universal-search',
      title: 'Universal Search',
      description: 'Search across all messages, contacts, and files',
      icon: SearchCheck,
      color: '#007AFF',
      enabled: true,
    },
    {
      id: 'prioritised-messaging',
      title: 'Prioritised Messaging',
      description: 'AI-powered message prioritization',
      icon: Star,
      color: '#FF9500',
      enabled: true,
    },
    {
      id: 'daily-briefing',
      title: 'Daily Briefing',
      description: 'Your personalized morning summary',
      icon: Sunrise,
      color: '#34C759',
      enabled: true,
    },
  ]);

  const toggleSmartFeature = (featureId: string) => {
    setSmartFeatures(prev => 
      prev.map(f => f.id === featureId ? { ...f, enabled: !f.enabled } : f)
    );
  };

  const handleSmartFeaturePress = (feature: SmartFeature) => {
    switch (feature.id) {
      case 'universal-search':
        Alert.alert(
          'Universal Search',
          'Search across all your messages, contacts, files, and conversations from one place.',
          [{ text: 'Open Search', onPress: () => console.log('Open universal search') }, { text: 'Cancel' }]
        );
        break;
      case 'prioritised-messaging':
        Alert.alert(
          'Prioritised Messaging',
          'AI automatically prioritizes your messages based on urgency, sender importance, and content analysis.',
          [{ text: 'View Priority Inbox', onPress: () => router.push('/(tabs)/messages') }, { text: 'Cancel' }]
        );
        break;
      case 'daily-briefing':
        Alert.alert(
          'Daily Briefing',
          'Your personalized morning summary includes:\n\n• Today\'s meetings & tasks\n• Important messages\n• Key updates from your team\n• AI-generated insights',
          [{ text: 'View Briefing', onPress: () => console.log('Open daily briefing') }, { text: 'Cancel' }]
        );
        break;
    }
  };

  const quickActions: QuickAction[] = [
    {
      id: '1',
      title: 'New Message',
      icon: MessageSquare,
      color: '#007AFF',
      onPress: () => router.push('/(tabs)/messages'),
    },
    {
      id: '2',
      title: 'Add Platform',
      icon: Plus,
      color: '#34C759',
      onPress: () => router.push('/add-service'),
    },
    {
      id: '3',
      title: 'Analytics',
      icon: BarChart3,
      color: '#FF9500',
      onPress: () => {},
    },
    {
      id: '4',
      title: 'Settings',
      icon: Settings,
      color: '#8E8E93',
      onPress: () => router.push('/settings'),
    },
  ];

  const stats: StatCard[] = [
    {
      title: 'Total Messages',
      value: '1,247',
      change: '+12%',
      icon: MessageSquare,
      color: '#007AFF',
    },
    {
      title: 'Active Chats',
      value: conversations.filter(c => c.unreadCount > 0).length.toString(),
      change: '+5%',
      icon: Users,
      color: '#34C759',
    },
    {
      title: 'Response Rate',
      value: '94%',
      change: '+2%',
      icon: TrendingUp,
      color: '#FF9500',
    },
    {
      title: 'Avg Response',
      value: '2.3m',
      change: '-8%',
      icon: Clock,
      color: '#FF3B30',
    },
    {
      title: 'Automations',
      value: '12',
      change: '+3%',
      icon: Zap,
      color: '#AF52DE',
    },
    {
      title: 'Platforms',
      value: '8',
      change: '+1%',
      icon: Globe,
      color: '#5AC8FA',
    },
    {
      title: 'AI Agents',
      value: '199+',
      change: '+15',
      icon: Bot,
      color: '#FF2D92',
    },
    {
      title: 'Revenue',
      value: '$45K',
      change: '+18%',
      icon: BarChart,
      color: '#32D74B',
    },
  ];

  const recentConversations = conversations.slice(0, 5);

  const getSystemStatusColor = () => {
    switch (systemStatus) {
      case 'online':
        return '#34C759';
      case 'maintenance':
        return '#FF9500';
      case 'issues':
        return '#FF3B30';
      default:
        return '#8E8E93';
    }
  };

  const getSystemStatusIcon = () => {
    switch (systemStatus) {
      case 'online':
        return CheckCircle;
      case 'maintenance':
        return Info;
      case 'issues':
        return AlertTriangle;
      default:
        return Activity;
    }
  };

  const handleSidebarOptionPress = (option: SidebarOption) => {
    if (option.subItems && option.subItems.length > 0) {
      const newExpanded = new Set(expandedSections);
      if (expandedSections.has(option.id)) {
        newExpanded.delete(option.id);
      } else {
        newExpanded.add(option.id);
      }
      setExpandedSections(newExpanded);
    } else {
      setShowSidebar(false);
      // Navigate to specific pages based on option
      switch (option.id) {
        case '2': // AI Agents & Employees
          router.push('/ai-agent');
          break;
        case '7': // Marketing
          router.push('/marketing/marketing-hub');
          break;
        case '8': // Notifications
          router.push('/notification');
          break;
        case '9': // Support
          router.push('/support');
          break;
        case '10': // Settings
          router.push('/settings');
          break;
        default:
          Alert.alert(
            option.title,
            'This feature is coming soon! Stay tuned for updates.',
            [{ text: 'OK', style: 'default' }]
          );
      }
    }
  };

  const handleSubItemPress = (subItem: SidebarSubItem) => {
    setShowSidebar(false);
    // Navigate to specific pages based on subItem
    const routeMap: { [key: string]: string } = {
      // AI Agents & Employees - Main Dashboard
      '2-main': '/ai-agent',
      // AI Agents & Employees - Show All
      '2-show-all-agents': '/ai-agent',
      // AI Agents & Employees - C-Suite Executives
      '2-ceo': '/ai-agent/executive/ceo-advisor',
      '2-cfo': '/ai-agent/executive/cfo-analyst',
      '2-cto': '/ai-agent/executive/cto-advisor',
      '2-cmo': '/ai-agent/executive/cmo-advisor',
      '2-cco': '/ai-agent/executive/cco-advisor',
      '2-coo': '/ai-agent/executive/coo-strategist',
      '2-chro': '/ai-agent/executive/chro-advisor',
      '2-clo': '/ai-agent/executive/clo-advisor',
      '2-ciso': '/ai-agent/executive/ciso-advisor',
      '2-cio': '/ai-agent/executive/cio-advisor',
      '2-creo': '/ai-agent/executive/creo-advisor',
      '2-cro': '/ai-agent/executive/cro-risk',
      '2-cmo-hc': '/ai-agent/executive/cmo-healthcare',
      '2-cpo': '/ai-agent/product',
      '2-clo-log': '/ai-agent/executive/clo-logistics',
      '2-cao': '/ai-agent/executive/cao-automation',
      '2-cdao': '/ai-agent/executive/cdao-advisor',
      '2-ethics': '/ai-agent/executive/ceo-advisor',
      '2-ciso-ai': '/ai-agent/executive/ciso-advisor',
      // AI Agents & Employees - Command Center
      '2-cdoo': '/command-center',
      '2-ddo': '/command-center',
      '2-wol': '/command-center',
      '2-aod': '/command-center',
      '2-pred': '/command-center',
      '2-swarm': '/command-center',
      '2-learn': '/command-center',
      '2-layer-bridge': '/command-center',
      '2-pred-engine': '/ai-agent/data',
      '2-sentiment': '/ai-agent/customer',
      '2-anomaly': '/ai-agent/data/fraud-detection',
      // AI Agents & Employees - Agent Types
      '2-agent-reactive': '/ai-agent',
      '2-agent-learning': '/ai-agent',
      '2-agent-swarm': '/ai-agent',
      // AI Agents & Employees - Hierarchy Levels
      '2-vp-directors': '/ai-agent',
      '2-managers': '/ai-agent',
      '2-team-leads': '/ai-agent',
      '2-specialists': '/ai-agent',
      // AI Agents & Employees - Specialized Teams
      '2-team-sales': '/ai-agent/sales',
      '2-team-support': '/ai-agent/customer',
      '2-team-recruiting': '/ai-agent/hr/recruiter',
      '2-team-analytics': '/ai-agent/data',
      '2-team-creative': '/ai-agent/marketing',
      '2-team-legal': '/ai-agent/legal',
      '2-team-finance': '/ai-agent/accounting',
      '2-team-engineering': '/ai-agent/engineering',
      '2-team-hr': '/ai-agent/hr',
      '2-team-marketing': '/ai-agent/marketing',
      '2-team-ops': '/ai-agent/operations',
      '2-team-security': '/ai-agent/it',
      '2-team-product': '/ai-agent/product',
      // AI Agents & Employees - Builder Tools
      '2-builder-emp': '/ai-agents-employees-builder',
      '2-builder-dept': '/ai-agents-employees-builder',
      // AI Agents & Employees - Main Features
      '2-cc': '/command-center',
      '2-ar': '/ai-receptionist/dashboard',
      '2-an': '/ai-negotiation/dashboard',
      '2-builder': '/ai-agents-employees-builder',
      // AI Agents & Employees - 15 Departments
      '2-el': '/ai-agent/executive',
      '2-af': '/ai-agent/accounting',
      '2-ce': '/ai-agent/customer',
      '2-sr': '/ai-agent/sales',
      '2-mg': '/ai-agent/marketing',
      '2-pr': '/ai-agent/product',
      '2-om': '/ai-agent/operations',
      '2-sm': '/ai-agent/social-media',
      '2-di': '/ai-agent/data',
      '2-ap': '/ai-agent/analysis',
      '2-hr': '/ai-agent/hr',
      '2-it': '/ai-agent/it',
      '2-lc': '/ai-agent/legal',
      '2-ed': '/ai-agent/engineering',
      '2-pa': '/ai-agent/customer',
      '3-1': '/ai-receptionist/dashboard',
      '3-2': '/ai-receptionist/phone-numbers',
      '3-3': '/ai-receptionist/call-logs',
      '3-4': '/ai-receptionist/contacts',
      '3-5': '/ai-receptionist/training',
      '3-6': '/ai-receptionist/transcripts',
      '3-7': '/ai-receptionist/analytics',
      '3-8': '/ai-receptionist/appointments',
      '3-9': '/ai-receptionist/scripts',
      '3-10': '/ai-receptionist/integrations',
      '3-11': '/ai-receptionist/notifications',
      '3-12': '/ai-receptionist/setup',
      'neg-1': '/ai-negotiation/dashboard',
      'neg-2': '/ai-negotiation/phone-numbers',
      'neg-3': '/ai-negotiation/calls',
      'neg-4': '/ai-negotiation/call-logs',
      'neg-5': '/ai-negotiation/training',
      'neg-6': '/ai-negotiation/transcripts',
      'neg-7': '/ai-negotiation/analytics',
      'neg-8': '/ai-negotiation/appointments',
      'neg-9': '/ai-negotiation/scripts',
      'neg-10': '/ai-negotiation/crm',
      'neg-11': '/ai-negotiation/deals',
      'neg-12': '/ai-negotiation/analytics',
      'neg-13': '/ai-negotiation/templates',
      'neg-14': '/ai-negotiation/integrations',
      'neg-15': '/ai-negotiation/notifications',
      'neg-16': '/ai-negotiation/setup',
      '4-1': '/collaboration/team-collaboration',
      '4-2': '/collaboration/team-management',
      '5-1': '/business/crm',
      '5-5': '/business/cohort-analysis',
      '6-1': '/analytics/reports-insights',
      '6-2': '/analytics/analytics-performance',
      '6-3': '/analytics/analytics-performance',
      '7-1': '/marketing/sms-marketing-hub',
      '7-2': '/marketing/email-marketing-hub',
      '7-3': '/analytics/ab-testing',
      '7-4': '/marketing/campaign',
      'sm-1': '/social-media/dashboard',
      'sm-2': '/social-media/content-calendar',
      'sm-3': '/social-media/post-scheduler',
      'sm-4': '/social-media/analytics',
      'sm-5': '/social-media/engagement',
      'sm-6': '/social-media/hashtags',
      'sm-7': '/social-media/competitor-analysis',
      'sm-8': '/social-media/content-library',
      'sm-9': '/social-media/social-listening',
      'sm-10': '/social-media/influencer-tracking',
      'sm-11': '/social-media/brand-monitoring',
      'sm-12': '/social-media/stories-reels',
      'sm-13': '/social-media/social-inbox',
      'sm-14': '/social-media/cross-platform',
      'sm-15': '/social-media/reports',
      'sm-16': '/social-media/audience-insights',
      'sm-17': '/social-media/ai-content',
      'sm-18': '/social-media/multi-account',
    };
    
    const route = routeMap[subItem.id];
    if (route) {
      router.push(route as any);
    } else {
      Alert.alert(
        subItem.title,
        'This feature is coming soon! Stay tuned for updates.',
        [{ text: 'OK', style: 'default' }]
      );
    }
  };

  const renderQuickAction = ({ item }: { item: QuickAction }) => {
    const IconComponent = item.icon;
    return (
      <TouchableOpacity
        style={[styles.quickActionCard, { backgroundColor: theme.colors.cardBackground }]}
        onPress={item.onPress}
      >
        <View style={[styles.quickActionIcon, { backgroundColor: item.color }]}>
          <IconComponent size={24} color="white" />
        </View>
        <Text style={[styles.quickActionTitle, { color: theme.colors.text }]}>
          {item.title}
        </Text>
      </TouchableOpacity>
    );
  };

  const renderStatCard = ({ item }: { item: StatCard }) => {
    const IconComponent = item.icon;
    const isPositive = item.change.startsWith('+');
    
    return (
      <View style={[styles.statCard, { backgroundColor: theme.colors.cardBackground }]}>
        <View style={styles.statHeader}>
          <View style={[styles.statIcon, { backgroundColor: `${item.color}20` }]}>
            <IconComponent size={20} color={item.color} />
          </View>
          <Text style={[styles.statChange, { color: isPositive ? '#34C759' : '#FF3B30' }]}>
            {item.change}
          </Text>
        </View>
        <Text style={[styles.statValue, { color: theme.colors.text }]}>{item.value}</Text>
        <Text style={[styles.statTitle, { color: theme.colors.secondaryText }]}>{item.title}</Text>
      </View>
    );
  };

  const renderRecentConversation = ({ item }: { item: any }) => (
    <TouchableOpacity
      style={[styles.recentConversationItem, { backgroundColor: theme.colors.cardBackground }]}
      onPress={() => router.push('/(tabs)/messages')}
    >
      <Image source={{ uri: item.avatar }} style={styles.recentAvatar} />
      <View style={styles.recentContent}>
        <Text style={[styles.recentName, { color: theme.colors.text }]} numberOfLines={1}>
          {item.name}
        </Text>
        <Text style={[styles.recentMessage, { color: theme.colors.secondaryText }]} numberOfLines={1}>
          {item.lastMessage}
        </Text>
      </View>
      <View style={styles.recentMeta}>
        <Text style={[styles.recentTime, { color: theme.colors.secondaryText }]}>
          {item.timestamp}
        </Text>
        {item.unreadCount > 0 && (
          <View style={[styles.recentBadge, { backgroundColor: theme.colors.primary }]}>
            <Text style={styles.recentBadgeText}>{item.unreadCount}</Text>
          </View>
        )}
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      {/* Header */}
      <View style={[styles.header, { backgroundColor: theme.colors.background, paddingTop: insets.top + 10 }]}>
        <TouchableOpacity 
          style={styles.menuButton}
          onPress={() => setShowSidebar(true)}
        >
          <Menu size={24} color={theme.colors.text} />
        </TouchableOpacity>
        <View style={styles.headerCenter}>
          <Text style={[styles.greeting, { color: theme.colors.secondaryText }]}>
            Good morning
          </Text>
          <Text style={[styles.title, { color: theme.colors.text }]}>
            Welcome back
          </Text>
        </View>
        <View style={styles.headerActions}>
          <TouchableOpacity style={styles.headerButton}>
            <Search size={20} color={theme.colors.text} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.headerButton}>
            <View style={styles.notificationContainer}>
              <Bell size={20} color={theme.colors.text} />
              {notifications > 0 && (
                <View style={[styles.notificationBadge, { backgroundColor: theme.colors.primary }]}>
                  <Text style={styles.notificationCount}>{notifications}</Text>
                </View>
              )}
            </View>
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView 
        style={styles.content} 
        showsVerticalScrollIndicator={false}
      >
        {/* System Status & Key Metrics */}
        <View style={[styles.statusCard, { backgroundColor: theme.colors.cardBackground }]}>
          <View style={styles.statusHeader}>
            <View style={styles.statusIndicator}>
              {React.createElement(getSystemStatusIcon(), {
                size: 16,
                color: getSystemStatusColor(),
              })}
              <Text style={[styles.statusText, { color: getSystemStatusColor() }]}>
                System {systemStatus === 'online' ? 'Online' : systemStatus === 'maintenance' ? 'Maintenance' : 'Issues'}
              </Text>
            </View>
            <Text style={[styles.statusTime, { color: theme.colors.secondaryText }]}>
              Last updated: 2 min ago
            </Text>
          </View>
          <View style={styles.statusMetrics}>
            <View style={styles.statusMetricItem}>
              <Activity size={14} color="#34C759" />
              <Text style={[styles.statusMetricText, { color: theme.colors.secondaryText }]}>Uptime: 99.9%</Text>
            </View>
            <View style={styles.statusMetricItem}>
              <Users size={14} color="#007AFF" />
              <Text style={[styles.statusMetricText, { color: theme.colors.secondaryText }]}>127 active users</Text>
            </View>
          </View>
        </View>
        {/* Smart Features */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>
              Smart Features
            </Text>
            <TouchableOpacity>
              <Filter size={18} color={theme.colors.secondaryText} />
            </TouchableOpacity>
          </View>
          <View style={styles.smartFeaturesContainer}>
            {smartFeatures.map((feature) => {
              const FeatureIcon = feature.icon;
              return (
                <TouchableOpacity
                  key={feature.id}
                  style={[
                    styles.smartFeatureCard,
                    { 
                      backgroundColor: theme.colors.cardBackground,
                      borderLeftColor: feature.color,
                      opacity: feature.enabled ? 1 : 0.6,
                    },
                  ]}
                  onPress={() => handleSmartFeaturePress(feature)}
                  onLongPress={() => toggleSmartFeature(feature.id)}
                >
                  <View style={[styles.smartFeatureIcon, { backgroundColor: `${feature.color}15` }]}>
                    <FeatureIcon size={22} color={feature.color} />
                  </View>
                  <View style={styles.smartFeatureContent}>
                    <Text style={[styles.smartFeatureTitle, { color: theme.colors.text }]}>
                      {feature.title}
                    </Text>
                    <Text style={[styles.smartFeatureDesc, { color: theme.colors.secondaryText }]} numberOfLines={1}>
                      {feature.description}
                    </Text>
                  </View>
                  <View style={[
                    styles.smartFeatureStatus,
                    { backgroundColor: feature.enabled ? '#34C75920' : '#8E8E9320' }
                  ]}>
                    <View style={[
                      styles.smartFeatureStatusDot,
                      { backgroundColor: feature.enabled ? '#34C759' : '#8E8E93' }
                    ]} />
                  </View>
                </TouchableOpacity>
              );
            })}
          </View>
        </View>

        {/* Quick Actions */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>
            Quick Actions
          </Text>
          <FlatList
            data={quickActions}
            renderItem={renderQuickAction}
            keyExtractor={(item) => item.id}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.quickActionsContainer}
          />
        </View>

        {/* Stats */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>
              Overview
            </Text>
            <View style={styles.periodSelector}>
              {(['today', 'week', 'month'] as const).map((period) => (
                <TouchableOpacity
                  key={period}
                  style={[
                    styles.periodButton,
                    selectedPeriod === period && {
                      backgroundColor: theme.colors.primary,
                    },
                  ]}
                  onPress={() => setSelectedPeriod(period)}
                >
                  <Text
                    style={[
                      styles.periodText,
                      {
                        color: selectedPeriod === period ? 'white' : theme.colors.secondaryText,
                      },
                    ]}
                  >
                    {period.charAt(0).toUpperCase() + period.slice(1)}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
          <FlatList
            key={width > 768 ? 'stats-grid-3' : 'stats-grid-2'}
            data={stats}
            renderItem={renderStatCard}
            keyExtractor={(item) => item.title}
            numColumns={width > 768 ? 3 : 2}
            scrollEnabled={false}
            contentContainerStyle={styles.statsContainer}
          />
        </View>

        {/* Recent Conversations */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>
              Recent Conversations
            </Text>
            <TouchableOpacity onPress={() => router.push('/(tabs)/messages')}>
              <Text style={[styles.seeAllText, { color: theme.colors.primary }]}>
                See All
              </Text>
            </TouchableOpacity>
          </View>
          <FlatList
            data={recentConversations}
            renderItem={renderRecentConversation}
            keyExtractor={(item) => item.id}
            scrollEnabled={false}
          />
        </View>

        {/* Related Features - AI & Automation */}
        <QuickLinks
          groupId="ai"
          title="AI Features"
          maxItems={6}
        />

        {/* Related Features - Automation */}
        <QuickLinks
          groupId="automation"
          title="Automation Tools"
          maxItems={6}
        />

        {/* Related Features - Business */}
        <QuickLinks
          groupId="business"
          title="Business Management"
          maxItems={6}
        />

        {/* Related Features - Marketing */}
        <QuickLinks
          groupId="marketing"
          title="Marketing Tools"
          maxItems={6}
        />
      </ScrollView>

      {/* Sidebar Overlay */}
      {showSidebar && (
        <View style={styles.sidebarOverlay}>
          <TouchableOpacity 
            style={styles.sidebarBackdrop}
            onPress={() => setShowSidebar(false)}
          />
          <View style={[styles.sidebar, { backgroundColor: theme.colors.background }]}>
            <View style={styles.sidebarHeader}>
              <Text style={[styles.sidebarTitle, { color: theme.colors.text }]}>
                Features & Services
              </Text>
              <TouchableOpacity 
                style={styles.sidebarCloseButton}
                onPress={() => setShowSidebar(false)}
              >
                <X size={24} color={theme.colors.text} />
              </TouchableOpacity>
            </View>
            
            <ScrollView style={styles.sidebarContent} showsVerticalScrollIndicator={false}>
              {sidebarOptions.map((option) => {
                const IconComponent = option.icon;
                const isExpanded = expandedSections.has(option.id);
                return (
                  <View key={option.id}>
                    <TouchableOpacity
                      style={[styles.sidebarOption, { backgroundColor: theme.colors.cardBackground }]}
                      onPress={() => handleSidebarOptionPress(option)}
                    >
                      <View style={[styles.sidebarOptionIcon, { backgroundColor: option.color + '20' }]}>
                        <IconComponent size={20} color={option.color} />
                      </View>
                      <Text style={[styles.sidebarOptionText, { color: theme.colors.text }]}>
                        {option.title}
                      </Text>
                      {option.subItems && option.subItems.length > 0 && (
                        <View style={[styles.expandIcon, { transform: [{ rotate: isExpanded ? '90deg' : '0deg' }] }]}>
                          <ArrowUpRight size={16} color={theme.colors.secondaryText} />
                        </View>
                      )}
                    </TouchableOpacity>
                    
                    {isExpanded && option.subItems && (
                      <View style={styles.subItemsContainer}>
                        {option.subItems.map((subItem) => {
                          const SubIconComponent = subItem.icon;
                          const hasSubSections = subItem.subSections && subItem.subSections.length > 0;
                          const isSubSectionExpanded = expandedSubSections.has(subItem.id);

                          // Render subItem with nested subSections
                          if (hasSubSections) {
                            return (
                              <View key={subItem.id}>
                                <TouchableOpacity
                                  style={[styles.subSectionHeader, { backgroundColor: theme.colors.cardBackground }]}
                                  onPress={() => {
                                    const newExpanded = new Set(expandedSubSections);
                                    if (newExpanded.has(subItem.id)) {
                                      newExpanded.delete(subItem.id);
                                    } else {
                                      newExpanded.add(subItem.id);
                                    }
                                    setExpandedSubSections(newExpanded);
                                  }}
                                >
                                  <View style={styles.subSectionIcon}>
                                    <SubIconComponent size={16} color={theme.colors.primary} />
                                  </View>
                                  <Text style={[styles.subSectionTitle, { color: theme.colors.text }]}>
                                    {subItem.title}
                                  </Text>
                                  <View style={[styles.expandIcon, { transform: [{ rotate: isSubSectionExpanded ? '90deg' : '0deg' }] }]}>
                                    <ArrowUpRight size={14} color={theme.colors.secondaryText} />
                                  </View>
                                </TouchableOpacity>

                                {isSubSectionExpanded && subItem.subSections && (
                                  <View style={styles.nestedSectionsContainer}>
                                    {subItem.subSections.map((section) => {
                                      const SectionIcon = section.icon;
                                      const isSectionExpanded = expandedSubSections.has(section.id);

                                      return (
                                        <View key={section.id}>
                                          <TouchableOpacity
                                            style={[styles.nestedSectionHeader, { backgroundColor: theme.colors.background }]}
                                            onPress={() => {
                                              const newExpanded = new Set(expandedSubSections);
                                              if (newExpanded.has(section.id)) {
                                                newExpanded.delete(section.id);
                                              } else {
                                                newExpanded.add(section.id);
                                              }
                                              setExpandedSubSections(newExpanded);
                                            }}
                                          >
                                            <View style={styles.nestedSectionIcon}>
                                              <SectionIcon size={14} color={theme.colors.secondaryText} />
                                            </View>
                                            <Text style={[styles.nestedSectionTitle, { color: theme.colors.secondaryText }]}>
                                              {section.title}
                                            </Text>
                                            <View style={[styles.expandIconSmall, { transform: [{ rotate: isSectionExpanded ? '90deg' : '0deg' }] }]}>
                                              <ArrowUpRight size={12} color={theme.colors.secondaryText} />
                                            </View>
                                          </TouchableOpacity>

                                          {isSectionExpanded && (
                                            <View style={styles.nestedItemsContainer}>
                                              {section.items.map((item) => {
                                                const ItemIcon = item.icon;
                                                return (
                                                  <TouchableOpacity
                                                    key={item.id}
                                                    style={[styles.nestedItem, { backgroundColor: theme.colors.background }]}
                                                    onPress={() => handleSubItemPress(item)}
                                                  >
                                                    <View style={styles.nestedItemIcon}>
                                                      <ItemIcon size={12} color={theme.colors.secondaryText} />
                                                    </View>
                                                    <Text style={[styles.nestedItemText, { color: theme.colors.secondaryText }]}>
                                                      {item.title}
                                                    </Text>
                                                  </TouchableOpacity>
                                                );
                                              })}
                                            </View>
                                          )}
                                        </View>
                                      );
                                    })}
                                  </View>
                                )}
                              </View>
                            );
                          }

                          // Render regular subItem (no subSections)
                          if (subItem.isHeader) {
                            return (
                              <View
                                key={subItem.id}
                                style={[styles.subItemHeader, { backgroundColor: theme.colors.cardBackground }]}
                              >
                                <View style={styles.subItemIcon}>
                                  <SubIconComponent size={14} color={theme.colors.primary} />
                                </View>
                                <Text style={[styles.subItemHeaderText, { color: theme.colors.primary }]}>
                                  {subItem.title}
                                </Text>
                              </View>
                            );
                          }
                          return (
                            <TouchableOpacity
                              key={subItem.id}
                              style={[styles.subItem, { backgroundColor: theme.colors.background }]}
                              onPress={() => handleSubItemPress(subItem)}
                            >
                              <View style={styles.subItemIcon}>
                                <SubIconComponent size={16} color={theme.colors.secondaryText} />
                              </View>
                              <Text style={[styles.subItemText, { color: theme.colors.secondaryText }]}>
                                {subItem.title}
                              </Text>
                            </TouchableOpacity>
                          );
                        })}
                      </View>
                    )}
                  </View>
                );
              })}
            </ScrollView>
          </View>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingBottom: 16,
  },
  menuButton: {
    padding: 8,
    marginRight: 16,
  },
  headerCenter: {
    flex: 1,
  },
  greeting: {
    fontSize: 14,
    marginBottom: 4,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
  },
  headerActions: {
    flexDirection: 'row',
    gap: 12,
  },
  headerButton: {
    padding: 8,
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
  },
  section: {
    marginBottom: 32,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
  },
  seeAllText: {
    fontSize: 14,
    fontWeight: '500',
  },
  quickActionsContainer: {
    paddingRight: 20,
  },
  quickActionCard: {
    width: 120,
    padding: 16,
    borderRadius: 16,
    alignItems: 'center',
    marginRight: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  quickActionIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  quickActionTitle: {
    fontSize: 14,
    fontWeight: '500',
    textAlign: 'center',
  },
  periodSelector: {
    flexDirection: 'row',
    backgroundColor: 'rgba(0,0,0,0.05)',
    borderRadius: 8,
    padding: 2,
  },
  periodButton: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 6,
  },
  periodText: {
    fontSize: 12,
    fontWeight: '500',
  },
  statsContainer: {
    gap: 12,
  },
  statCard: {
    flex: 1,
    padding: 16,
    borderRadius: 16,
    marginHorizontal: 6,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  statHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  statIcon: {
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  statChange: {
    fontSize: 12,
    fontWeight: '600',
  },
  statValue: {
    fontSize: 24,
    fontWeight: '700',
    marginBottom: 4,
  },
  statTitle: {
    fontSize: 12,
    fontWeight: '500',
  },
  recentConversationItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderRadius: 12,
    marginBottom: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  recentAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 12,
  },
  recentContent: {
    flex: 1,
  },
  recentName: {
    fontSize: 15,
    fontWeight: '600',
    marginBottom: 2,
  },
  recentMessage: {
    fontSize: 13,
  },
  recentMeta: {
    alignItems: 'flex-end',
  },
  recentTime: {
    fontSize: 11,
    marginBottom: 4,
  },
  recentBadge: {
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 10,
  },
  recentBadgeText: {
    color: 'white',
    fontSize: 10,
    fontWeight: '600',
  },
  sidebarOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 1000,
  },
  sidebarBackdrop: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  sidebar: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    width: 320,
    shadowColor: '#000',
    shadowOffset: { width: 2, height: 0 },
    shadowOpacity: 0.25,
    shadowRadius: 10,
    elevation: 10,
  },
  sidebarHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 60,
    paddingBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0,0,0,0.1)',
  },
  sidebarTitle: {
    fontSize: 20,
    fontWeight: '700',
  },
  sidebarCloseButton: {
    padding: 8,
  },
  sidebarContent: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  sidebarOption: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
    paddingHorizontal: 16,
    borderRadius: 12,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  sidebarOptionIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  sidebarOptionText: {
    flex: 1,
    fontSize: 15,
    fontWeight: '500',
    lineHeight: 20,
  },
  statusCard: {
    marginBottom: 20,
    padding: 16,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  statusHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  statusIndicator: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statusText: {
    fontSize: 14,
    fontWeight: '600',
    marginLeft: 6,
  },
  statusTime: {
    fontSize: 12,
  },
  statusMetrics: {
    flexDirection: 'row',
    gap: 16,
    marginTop: 12,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: 'rgba(0,0,0,0.05)',
  },
  statusMetricItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  statusMetricText: {
    fontSize: 12,
    fontWeight: '500',
  },
  notificationContainer: {
    position: 'relative',
  },
  notificationBadge: {
    position: 'absolute',
    top: -4,
    right: -4,
    width: 16,
    height: 16,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  notificationCount: {
    color: 'white',
    fontSize: 10,
    fontWeight: '600',
  },
  expandIcon: {
    marginLeft: 8,
  },
  subItemsContainer: {
    marginLeft: 20,
    marginTop: 8,
    marginBottom: 8,
  },
  subItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    marginBottom: 4,
  },
  subItemIcon: {
    width: 24,
    height: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  subItemText: {
    flex: 1,
    fontSize: 14,
    fontWeight: '400',
  },
  subItemHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 6,
    marginBottom: 4,
    marginTop: 8,
  },
  subItemHeaderText: {
    flex: 1,
    fontSize: 12,
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  smartFeaturesContainer: {
    gap: 12,
  },
  smartFeatureCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderRadius: 14,
    borderLeftWidth: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 3,
  },
  smartFeatureIcon: {
    width: 44,
    height: 44,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 14,
  },
  smartFeatureContent: {
    flex: 1,
  },
  smartFeatureTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 3,
  },
  smartFeatureDesc: {
    fontSize: 13,
  },
  smartFeatureStatus: {
    width: 28,
    height: 28,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 8,
  },
  smartFeatureStatusDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
  },
  subSectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderRadius: 8,
    marginBottom: 4,
    marginTop: 4,
  },
  subSectionIcon: {
    width: 28,
    height: 28,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  subSectionTitle: {
    flex: 1,
    fontSize: 13,
    fontWeight: '600',
  },
  nestedSectionsContainer: {
    paddingLeft: 8,
    marginBottom: 4,
  },
  nestedSectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    paddingHorizontal: 10,
    borderRadius: 6,
    marginBottom: 2,
  },
  nestedSectionIcon: {
    width: 24,
    height: 24,
    borderRadius: 6,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 8,
  },
  nestedSectionTitle: {
    flex: 1,
    fontSize: 12,
    fontWeight: '500',
  },
  expandIconSmall: {
    width: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  nestedItemsContainer: {
    paddingLeft: 12,
    paddingBottom: 4,
  },
  nestedItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 6,
    paddingHorizontal: 8,
    borderRadius: 4,
    marginBottom: 2,
  },
  nestedItemIcon: {
    width: 20,
    height: 20,
    borderRadius: 4,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 6,
  },
  nestedItemText: {
    flex: 1,
    fontSize: 11,
    fontWeight: '400',
  },
});