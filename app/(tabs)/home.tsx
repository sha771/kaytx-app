 
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
  Building,
  Calendar,
  Calculator,
  CheckCircle,
  Clock,
  Code,
  Database,
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
  Megaphone,
  Menu,
  MessageCircle as MessageCircleIcon,
  MessageSquare,
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
} from 'lucide-react-native';
import { useTheme } from '@/providers/ThemeProvider';
import { useMessaging } from '@/providers/MessagingProvider';
import { router } from 'expo-router';
import { QuickLinks } from '@/components/RelatedFeatures';

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
}

interface SmartFeature {
  id: string;
  title: string;
  description: string;
  icon: React.ComponentType<any>;
  color: string;
  enabled: boolean;
}

const sidebarOptions: SidebarOption[] = [
  {
    id: 'command-center',
    title: 'Command Center',
    icon: Crown,
    color: '#D4AF37',
    subItems: [
      { id: 'cc-1', title: 'Command Center', icon: Crown },
    ],
  },
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
      { id: 'sm-15', title: 'Performance Reports', icon: BarChart2 },
      { id: 'sm-16', title: 'Audience Insights', icon: Users },
      { id: 'sm-17', title: 'AI Content Generator', icon: Sparkles },
      { id: 'sm-18', title: 'Multi-Account Manager', icon: Layers },
    ],
  },
  {
    id: '2',
    title: 'AI Agents & Employees',
    icon: Bot,
    color: '#34C759',
    subItems: [
      // Line 1
      { id: '2-el', title: 'Executive & Leadership AI', icon: Crown },
      { id: '2-af', title: 'Accounting & Finance AI', icon: Calculator },
      { id: '2-ce', title: 'Customer Experience AI', icon: Headphones },
      { id: '2-sr', title: 'Sales & Revenue AI', icon: TrendingUp },
      { id: '2-mg', title: 'Marketing & Growth AI', icon: Megaphone },
      // Line 2
      { id: '2-pr', title: 'Product & R&D AI', icon: Lightbulb },
      { id: '2-om', title: 'Operations & Management AI', icon: Settings },
      { id: '2-sm', title: 'Social Media Management AI', icon: Share2 },
      { id: '2-di', title: 'Data & Intelligence AI', icon: Database },
      { id: '2-ap', title: 'Analysis & Performance AI', icon: BarChart3 },
      // Line 3
      { id: '2-hr', title: 'Human Resources AI', icon: Users },
      { id: '2-it', title: 'IT & Technology AI', icon: Monitor },
      { id: '2-lc', title: 'Legal & Compliance AI', icon: Scale },
      { id: '2-ed', title: 'Engineering & Development AI', icon: Code },
      { id: '2-pa', title: 'AI Personal Assistant', icon: Bot },
    ],
  },
  {
    id: '3',
    title: 'AI Receptionist',
    icon: Phone,
    color: '#007AFF',
    subItems: [
      { id: '3-1', title: 'Dashboard', icon: Activity },
      { id: '3-2', title: 'Phone Numbers', icon: Phone },
      { id: '3-3', title: 'Call Logs', icon: FileText },
      { id: '3-4', title: 'CRM Contacts', icon: Users },
      { id: '3-5', title: 'AI Training', icon: Brain },
      { id: '3-6', title: 'Call Transcripts', icon: MessageSquare },
      { id: '3-7', title: 'Caller Insights', icon: BarChart },
      { id: '3-8', title: 'Appointments', icon: Calendar },
      { id: '3-9', title: 'Call Scripts', icon: FileText },
      { id: '3-10', title: 'Integrations', icon: Zap },
      { id: '3-11', title: 'Notifications', icon: Bell },
      { id: '3-12', title: 'Setup', icon: Settings },
    ],
  },
  {
    id: 'negotiation',
    title: 'AI Negotiation',
    icon: Handshake,
    color: '#FF2D92',
    subItems: [
      { id: 'neg-1', title: 'Dashboard', icon: Activity },
      { id: 'neg-2', title: 'Phone Numbers', icon: Phone },
      { id: 'neg-3', title: 'Calls', icon: Phone },
      { id: 'neg-4', title: 'Call Logs', icon: FileText },
      { id: 'neg-5', title: 'AI Training', icon: Brain },
      { id: 'neg-6', title: 'Call Transcripts', icon: MessageSquare },
      { id: 'neg-7', title: 'Caller Insights', icon: BarChart },
      { id: 'neg-8', title: 'Appointments', icon: Calendar },
      { id: 'neg-9', title: 'Call Scripts', icon: FileText },
      { id: 'neg-10', title: 'CRM', icon: Building },
      { id: 'neg-11', title: 'Deals Pipeline', icon: Target },
      { id: 'neg-12', title: 'Analytics', icon: BarChart2 },
      { id: 'neg-13', title: 'Templates & Scripts', icon: FileText },
      { id: 'neg-14', title: 'Integrations', icon: Zap },
      { id: 'neg-15', title: 'Notifications', icon: Bell },
      { id: 'neg-16', title: 'Setup', icon: Settings },
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
      value: '5',
      change: '+2',
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
      // AI Agents & Employees - 15 Departments
      '2-el': '/ai-agent/executive-leadership-ai',
      '2-af': '/ai-agent/accounting-finance-ai',
      '2-ce': '/ai-agent/customer-experience-ai',
      '2-sr': '/ai-agent/sales-revenue-ai',
      '2-mg': '/ai-agent/marketing-growth-ai',
      '2-pr': '/ai-agent/product-rnd-ai',
      '2-om': '/ai-agent/operations-management-ai',
      '2-sm': '/ai-agent/social-media-management-ai',
      '2-di': '/ai-agent/data-intelligence-ai',
      '2-ap': '/ai-agent/analysis-performance-ai',
      '2-hr': '/ai-agent/human-resources-ai',
      '2-it': '/ai-agent/it-technology-ai',
      '2-lc': '/ai-agent/legal-compliance-ai',
      '2-ed': '/ai-agent/engineering-development-ai',
      '2-pa': '/ai-agent/ai-personal-assistant-ai',
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
});