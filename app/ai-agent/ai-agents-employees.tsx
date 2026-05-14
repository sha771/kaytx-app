 
import React, { useState, useRef, useEffect, useMemo } from 'react';
import {
  ArrowLeft,
  Crown,
  ChevronRight,
  Award,
  Lightbulb,
  Search,
  Monitor,
  MessageCircle,
  Brain,
  TrendingUp,
  Megaphone,
  Settings,
  ChartBarBig,
  Layers,
  Activity,
  Users,
  Calculator,
  Headphones,
  Share2,
  Database,
  Gauge,
  UserPlus,
  User,
  Monitor as MonitorIcon,
  Scale,
  Code,
  History,
  ToggleRight,
  Shield,
  Building,
  Factory,
  Truck,
  Package,
  Sparkles,
  Heart,
  Microscope,
  Menu,
} from 'lucide-react-native';
import { Animated, TouchableOpacity, View, Text, ScrollView, TextInput, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useTheme } from '@/providers/ThemeProvider';
import { router } from 'expo-router';
import { aiEmployees, AIEmployee } from '@/constants/aiEmployees';
import { useAIAssistant } from '@/providers/AIAssistantProvider';
import { trpc } from '@/lib/trpc';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { AIWorkforceSidebar } from '@/components/AIWorkforceSidebar';

interface QuickAction {
  id: string;
  title: string;
  subtitle: string;
  icon: React.ComponentType<any>;
  color: string;
  bgGradient: readonly [string, string];
  route: string;
}

const quickActions: QuickAction[] = [
  { id: 'activation', title: 'Activation', subtitle: 'Manage all', icon: ToggleRight, color: '#34C759', bgGradient: ['#34C759', '#30B050'], route: '/ai-agent/agent-activation' },
  { id: 'performance', title: 'Stats', subtitle: 'Rankings', icon: Award, color: '#FF2D55', bgGradient: ['#FF2D55', '#FF6B6B'], route: '/ai-agent/agent-performance' },
  { id: 'activity', title: 'Live', subtitle: 'Real-time', icon: Activity, color: '#5856D6', bgGradient: ['#5856D6', '#7B68EE'], route: '/ai-agent/agent-activity' },
  { id: 'insights', title: 'Insights', subtitle: 'Intelligence', icon: Lightbulb, color: '#FF9500', bgGradient: ['#FF9500', '#FFCC00'], route: '/ai-agent/agent-insights' },
  { id: 'history', title: 'History', subtitle: 'Logs', icon: History, color: '#007AFF', bgGradient: ['#007AFF', '#5AC8FA'], route: '/ai-agent/agent-history' },
  { id: 'work', title: 'Work', subtitle: 'Progress', icon: Layers, color: '#AF52DE', bgGradient: ['#AF52DE', '#DA70D6'], route: '/ai-agent/agent-work' },
  // NEW FEATURES
  { id: 'roi', title: 'ROI', subtitle: 'Savings', icon: TrendingUp, color: '#10B981', bgGradient: ['#10B981', '#059669'], route: '/ai-agent/roi-dashboard' },
  { id: 'computer', title: 'Computer', subtitle: 'Automation', icon: Monitor, color: '#6366f1', bgGradient: ['#6366f1', '#8b5cf6'], route: '/ai-agent/computer-use' },
  { id: 'chat', title: 'Chat', subtitle: 'Platforms', icon: MessageCircle, color: '#3b82f6', bgGradient: ['#3b82f6', '#2563eb'], route: '/ai-agent/chat-platforms' },
  { id: 'memory', title: 'Memory', subtitle: 'Personal', icon: Brain, color: '#ec4899', bgGradient: ['#ec4899', '#db2777'], route: '/ai-agent/personal-memory' },
];

export default function AIAgentsEmployeesScreen() {
  const { theme } = useTheme();
  const { activeAgents, stats: providerStats } = useAIAssistant();
  const insets = useSafeAreaInsets();
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [showSidebar, setShowSidebar] = useState<boolean>(false);

  const statsCategory = useMemo(() => {
    const map: Record<typeof activeCategory, 'all' | 'customer-experience' | 'sales-revenue' | 'marketing-growth' | 'operations-management' | 'data-intelligence'> = {
      all: 'all',
      sales: 'sales-revenue',
      marketing: 'marketing-growth',
      support: 'customer-experience',
      operations: 'operations-management',
      analytics: 'data-intelligence',
    };
    return map[activeCategory];
  }, [activeCategory]);
  
  // Fetch real aggregate data from tRPC
  trpc.aiAgents.getStats.useQuery({ category: statsCategory });
  const { data: globalStats } = trpc.aiAgents.getStats.useQuery({ category: 'all' });
  const pulseAnim = useRef(new Animated.Value(1)).current;
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 800,
      useNativeDriver: true,
    }).start();

    Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, { toValue: 1.1, duration: 1500, useNativeDriver: true }),
        Animated.timing(pulseAnim, { toValue: 1, duration: 1500, useNativeDriver: true }),
      ])
    ).start();
  }, [fadeAnim, pulseAnim]);

  const departmentRoutes: Record<string, string> = {
    'customer-experience': '/ai-agent/customer-experience-ai',
    'sales-revenue': '/ai-agent/sales-revenue-ai',
    'marketing-growth': '/ai-agent/marketing-growth-ai',
    'operations-management': '/ai-agent/operations-management-ai',
    'finance-accounting': '/ai-agent/accounting-finance-ai',
    'technology-engineering': '/ai-agent/engineering-development-ai',
    'human-resources': '/ai-agent/human-resources-ai',
    'legal-compliance': '/ai-agent/legal-compliance-ai',
    'data-intelligence': '/ai-agent/data-intelligence-ai',
    'product-management': '/ai-agent/product-rnd-ai',
    'security-risk': '/ai-agent/security',
    'research-development': '/ai-agent/research',
    'administrative': '/ai-agent/admin',
    'trading-investments': '/ai-agent/trading-investment-ai',
    'real-estate-property': '/ai-agent/realestate',
    'insurance-risk': '/ai-agent/insurance',
    'healthcare-medical': '/ai-agent/healthcare',
    'manufacturing-production': '/ai-agent/manufacturing',
    'transportation-logistics': '/ai-agent/transportation',
    'government-public-sector': '/ai-agent/government',
    'supply-chain-logistics': '/ai-agent/supply-chain',
    'ai-management-governance': '/ai-agent/ai-mgmt',
  };

  const departments = [
    { id: 'customer-experience', label: '1. Customer Experience (56)', icon: Headphones, color: '#007AFF' },
    { id: 'sales-revenue', label: '2. Sales & Revenue (56)', icon: TrendingUp, color: '#34C759' },
    { id: 'marketing-growth', label: '3. Marketing & Growth (60)', icon: Megaphone, color: '#FF2D55' },
    { id: 'operations-management', label: '4. Operations & Management (52)', icon: Settings, color: '#FF6482' },
    { id: 'finance-accounting', label: '5. Finance & Accounting (52)', icon: Calculator, color: '#10B981' },
    { id: 'technology-engineering', label: '6. Technology & Engineering (64)', icon: Code, color: '#14B8A6' },
    { id: 'human-resources', label: '7. Human Resources (44)', icon: Users, color: '#EC4899' },
    { id: 'legal-compliance', label: '8. Legal & Compliance (40)', icon: Scale, color: '#F59E0B' },
    { id: 'data-intelligence', label: '9. Data & Intelligence (52)', icon: Database, color: '#06B6D4' },
    { id: 'product-management', label: '10. Product Management (40)', icon: Lightbulb, color: '#8B5CF6' },
    { id: 'security-risk', label: '11. Security & Risk (48)', icon: Shield, color: '#F97316' },
    { id: 'research-development', label: '12. Research & Development (36)', icon: Microscope, color: '#06B6D4' },
    { id: 'administrative', label: '13. Administrative (36)', icon: Building, color: '#64748B' },
    { id: 'trading-investments', label: '14. Trading & Investments (72)', icon: TrendingUp, color: '#00C853' },
    { id: 'real-estate-property', label: '15. Real Estate & Property (56)', icon: Building, color: '#F59E0B' },
    { id: 'insurance-risk', label: '16. Insurance & Risk (64)', icon: Shield, color: '#EF4444' },
    { id: 'healthcare-medical', label: '17. Healthcare & Medical (56)', icon: Heart, color: '#EF4444' },
    { id: 'manufacturing-production', label: '18. Manufacturing & Production (56)', icon: Factory, color: '#78716C' },
    { id: 'transportation-logistics', label: '19. Transportation & Logistics (56)', icon: Truck, color: '#3B82F6' },
    { id: 'government-public-sector', label: '20. Government & Public Sector (48)', icon: Building, color: '#6366F1' },
    { id: 'supply-chain-logistics', label: '21. Supply Chain & Logistics (40)', icon: Package, color: '#8B5CF6' },
    { id: 'ai-management-governance', label: '22. AI Management & Governance (24)', icon: Sparkles, color: '#A855F7' },
  ];

  const categories = [
    { id: 'all', label: 'All (1108)', icon: Layers },
    { id: 'customer-experience', label: 'CX (56)', icon: Headphones },
    { id: 'sales-revenue', label: 'Sales (56)', icon: TrendingUp },
    { id: 'marketing-growth', label: 'Marketing (60)', icon: Megaphone },
    { id: 'operations-management', label: 'Operations (52)', icon: Settings },
    { id: 'finance-accounting', label: 'Finance (52)', icon: Calculator },
    { id: 'technology-engineering', label: 'Tech (64)', icon: Code },
    { id: 'human-resources', label: 'HR (44)', icon: Users },
    { id: 'legal-compliance', label: 'Legal (40)', icon: Scale },
    { id: 'data-intelligence', label: 'Data (52)', icon: Database },
    { id: 'product-management', label: 'Product (40)', icon: Lightbulb },
    { id: 'security-risk', label: 'Security (48)', icon: Shield },
    { id: 'research-development', label: 'R&D (36)', icon: Microscope },
    { id: 'administrative', label: 'Admin (36)', icon: Building },
    { id: 'trading-investments', label: 'Trading (72)', icon: TrendingUp },
    { id: 'real-estate-property', label: 'Real Estate (56)', icon: Building },
    { id: 'insurance-risk', label: 'Insurance (64)', icon: Shield },
    { id: 'healthcare-medical', label: 'Healthcare (56)', icon: Heart },
    { id: 'manufacturing-production', label: 'Manufacturing (56)', icon: Factory },
    { id: 'transportation-logistics', label: 'Transport (56)', icon: Truck },
    { id: 'government-public-sector', label: 'Government (48)', icon: Building },
    { id: 'supply-chain-logistics', label: 'Supply Chain (40)', icon: Package },
    { id: 'ai-management-governance', label: 'AI Mgmt (24)', icon: Sparkles },
  ];

  const filteredEmployees = useMemo(() => {
    return aiEmployees.filter(emp => {
      const matchesSearch = emp.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          emp.title.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = activeCategory === 'all' || emp.category === activeCategory;
      return matchesSearch && matchesCategory;
    }).map(emp => ({
      ...emp,
      isActive: !!activeAgents[emp.id]
    }));
  }, [searchQuery, activeCategory, activeAgents]);

  const stats = useMemo(() => ({
    total: globalStats?.totalAgents || 1108,
    active: globalStats?.activeAgents || providerStats.activeCount,
    savings: '$145K',
    uptime: '99.99%',
  }), [globalStats, providerStats]);

  const renderQuickAction = (action: QuickAction) => (
    <TouchableOpacity
      key={action.id}
      style={[styles.quickActionCard, { backgroundColor: theme.colors.cardBackground }]}
      onPress={() => router.push(action.route)}
    >
      <LinearGradient colors={action.bgGradient} style={styles.quickActionIcon}>
        <action.icon size={20} color="#fff" />
      </LinearGradient>
      <Text style={[styles.quickActionTitle, { color: theme.colors.text }]}>{action.title}</Text>
    </TouchableOpacity>
  );

  const renderEmployeeCard = (emp: AIEmployee & { isActive?: boolean }) => (
    <TouchableOpacity
      key={emp.id}
      style={[
        styles.employeeCard, 
        { 
          backgroundColor: theme.colors.cardBackground,
          borderLeftColor: emp.isActive ? '#34C759' : theme.colors.border
        }
      ]}
      onPress={() => {
        console.log('Navigating to agent:', emp.id, 'route:', emp.route);
        router.push(emp.route);
      }}
    >
      <View style={styles.employeeHeader}>
        <View style={[styles.employeeIconContainer, { backgroundColor: emp.color + '15' }]}>
          <emp.icon size={24} color={emp.color} />
          {emp.isActive && (
            <Animated.View style={[styles.onlineIndicator, { transform: [{ scale: pulseAnim }] }]} />
          )}
        </View>
        <View style={styles.employeeInfo}>
          <View style={styles.nameRow}>
            <Text style={[styles.employeeName, { color: theme.colors.text }]}>{emp.name}</Text>
            {emp.isPremium && <Crown size={14} color="#FFD700" />}
          </View>
          <Text style={[styles.employeeTitle, { color: theme.colors.secondaryText }]} numberOfLines={1}>
            {emp.title}
          </Text>
        </View>
        <ChevronRight size={20} color={theme.colors.border} />
      </View>

      <View style={styles.employeeStats}>
        <View style={styles.statMini}>
          <Text style={[styles.statMiniLabel, { color: theme.colors.secondaryText }]}>ROI</Text>
          <Text style={[styles.statMiniValue, { color: '#34C759' }]}>{emp.roiMetrics.savingsPerMonth}</Text>
        </View>
        <View style={styles.statMini}>
          <Text style={[styles.statMiniLabel, { color: theme.colors.secondaryText }]}>Health</Text>
          <Text style={[styles.statMiniValue, { color: theme.colors.text }]}>{emp.infrastructure.health}%</Text>
        </View>
        <View style={styles.statMini}>
          <Text style={[styles.statMiniLabel, { color: theme.colors.secondaryText }]}>Tasks</Text>
          <Text style={[styles.statMiniValue, { color: theme.colors.text }]}>{emp.roiMetrics.tasksAutomatedDaily}</Text>
        </View>
      </View>

      <View style={styles.tagContainer}>
        {emp.capabilities.slice(0, 2).map((cap, i) => (
          <View key={i} style={[styles.tag, { backgroundColor: theme.colors.background }]}>
            <Text style={[styles.tagText, { color: theme.colors.secondaryText }]}>{cap}</Text>
          </View>
        ))}
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <LinearGradient colors={['#0f172a', '#1e293b']} style={[styles.header, { paddingTop: insets.top + 10 }]}>
        <View style={styles.navBar}>
          <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
            <ArrowLeft size={24} color="#fff" />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setShowSidebar(true)} style={styles.menuButton}>
            <Menu size={24} color="#fff" />
          </TouchableOpacity>
          <View style={styles.headerTitleContainer}>
            <Text style={styles.headerTitle}>AI Workforce</Text>
            <Text style={styles.headerSubtitle}>{stats.active}/{stats.total} Agents Online</Text>
          </View>
          <TouchableOpacity style={styles.moreButton}>
            <Settings size={22} color="#fff" />
          </TouchableOpacity>
        </View>

        <View style={styles.overviewCard}>
          <View style={styles.overviewItem}>
            <Text style={styles.overviewValue}>{stats.savings}</Text>
            <Text style={styles.overviewLabel}>Monthly Savings</Text>
          </View>
          <View style={styles.overviewDivider} />
          <View style={styles.overviewItem}>
            <Text style={styles.overviewValue}>{stats.uptime}</Text>
            <Text style={styles.overviewLabel}>System Uptime</Text>
          </View>
          <View style={styles.overviewDivider} />
          <View style={styles.overviewItem}>
            <View style={styles.statusRow}>
              <View style={styles.pulseDot} />
              <Text style={styles.overviewValue}>Live</Text>
            </View>
            <Text style={styles.overviewLabel}>Global Status</Text>
          </View>
        </View>
      </LinearGradient>

      {/* 3-Line Sidebar with all 1108 AI Agents */}
      <AIWorkforceSidebar isVisible={showSidebar} onClose={() => setShowSidebar(false)} />

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        <View style={styles.searchSection}>
          <View style={[styles.searchBar, { backgroundColor: theme.colors.cardBackground }]}>
            <Search size={20} color={theme.colors.secondaryText} />
            <TextInput
              style={[styles.searchInput, { color: theme.colors.text }]}
              placeholder="Search AI agents..."
              placeholderTextColor={theme.colors.secondaryText}
              value={searchQuery}
              onChangeText={setSearchQuery}
            />
          </View>
        </View>

        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.quickActionsScroll}>
          {quickActions.map(renderQuickAction)}
        </ScrollView>

        {/* 3-Line Department Sidebar */}
        <View style={styles.deptSection}>
          <Text style={[styles.deptSectionTitle, { color: theme.colors.text }]}>AI Departments</Text>
          <View style={styles.deptGrid}>
            {departments.map(dept => (
              <TouchableOpacity
                key={dept.id}
                style={[styles.deptCard, { backgroundColor: theme.colors.cardBackground }]}
                onPress={() => router.push(departmentRoutes[dept.id])}
              >
                <View style={[styles.deptIconBox, { backgroundColor: dept.color + '15' }]}>
                  <dept.icon size={18} color={dept.color} />
                </View>
                <Text style={[styles.deptLabel, { color: theme.colors.text }]} numberOfLines={1}>
                  {dept.label}
                </Text>
                <ChevronRight size={14} color={theme.colors.secondaryText} />
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <View style={styles.categorySection}>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.categoryContent}>
            {categories.map(cat => (
              <TouchableOpacity
                key={cat.id}
                onPress={() => {
                  if (cat.id !== 'all' && departmentRoutes[cat.id]) {
                    setActiveCategory(cat.id);
                  } else {
                    setActiveCategory(cat.id);
                  }
                }}
                style={[
                  styles.categoryChip,
                  { backgroundColor: activeCategory === cat.id ? theme.colors.primary : theme.colors.cardBackground }
                ]}
              >
                <cat.icon size={16} color={activeCategory === cat.id ? '#fff' : theme.colors.secondaryText} />
                <Text style={[styles.categoryLabel, { color: activeCategory === cat.id ? '#fff' : theme.colors.text }]}>
                  {cat.label}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        <View style={styles.employeeGrid}>
          {filteredEmployees.map(renderEmployeeCard)}
        </View>
        
        <View style={{ height: 100 }} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  header: { paddingHorizontal: 20, paddingBottom: 25, borderBottomLeftRadius: 30, borderBottomRightRadius: 30 },
  navBar: { flexDirection: 'row', alignItems: 'center', marginBottom: 25 },
  backButton: { width: 40, height: 40, borderRadius: 12, backgroundColor: 'rgba(255,255,255,0.1)', justifyContent: 'center', alignItems: 'center' },
  menuButton: { width: 40, height: 40, borderRadius: 12, backgroundColor: 'rgba(255,255,255,0.1)', justifyContent: 'center', alignItems: 'center' },
  headerTitleContainer: { flex: 1, marginLeft: 15 },
  headerTitle: { fontSize: 22, fontWeight: '800', color: '#fff' },
  headerSubtitle: { fontSize: 13, color: 'rgba(255,255,255,0.6)', marginTop: 2 },
  moreButton: { width: 40, height: 40, borderRadius: 12, backgroundColor: 'rgba(255,255,255,0.1)', justifyContent: 'center', alignItems: 'center' },
  overviewCard: { flexDirection: 'row', backgroundColor: 'rgba(255,255,255,0.1)', borderRadius: 20, padding: 15, alignItems: 'center' },
  overviewItem: { flex: 1, alignItems: 'center' },
  overviewValue: { fontSize: 18, fontWeight: '800', color: '#fff' },
  overviewLabel: { fontSize: 10, color: 'rgba(255,255,255,0.5)', marginTop: 4, textTransform: 'uppercase' },
  overviewDivider: { width: 1, height: 30, backgroundColor: 'rgba(255,255,255,0.1)' },
  statusRow: { flexDirection: 'row', alignItems: 'center' },
  pulseDot: { width: 8, height: 8, borderRadius: 4, backgroundColor: '#34C759', marginRight: 6 },
  scrollContent: { paddingTop: 20 },
  searchSection: { paddingHorizontal: 20, marginBottom: 20 },
  searchBar: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 15, height: 50, borderRadius: 15 },
  searchInput: { flex: 1, marginLeft: 10, fontSize: 16 },
  quickActionsScroll: { paddingLeft: 20, marginBottom: 25 },
  quickActionCard: { width: 85, alignItems: 'center', marginRight: 15 },
  quickActionIcon: { width: 50, height: 50, borderRadius: 15, justifyContent: 'center', alignItems: 'center', marginBottom: 8 },
  quickActionTitle: { fontSize: 12, fontWeight: '600' },
  deptSection: { paddingHorizontal: 20, marginBottom: 20 },
  deptSectionTitle: { fontSize: 18, fontWeight: '700', marginBottom: 12 },
  deptGrid: { gap: 8 },
  deptCard: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 14, paddingVertical: 12, borderRadius: 14, gap: 10 },
  deptIconBox: { width: 36, height: 36, borderRadius: 10, justifyContent: 'center', alignItems: 'center' },
  deptLabel: { flex: 1, fontSize: 14, fontWeight: '600' },
  categorySection: { marginBottom: 20 },
  categoryContent: { paddingHorizontal: 20, gap: 10 },
  categoryChip: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 15, paddingVertical: 10, borderRadius: 20, gap: 8 },
  categoryLabel: { fontSize: 14, fontWeight: '600' },
  employeeGrid: { paddingHorizontal: 20, gap: 15 },
  employeeCard: { padding: 15, borderRadius: 20, borderLeftWidth: 4, borderLeftColor: '#007AFF' },
  employeeHeader: { flexDirection: 'row', alignItems: 'center', marginBottom: 15 },
  employeeIconContainer: { width: 50, height: 50, borderRadius: 15, justifyContent: 'center', alignItems: 'center', position: 'relative' },
  onlineIndicator: { position: 'absolute', top: -2, right: -2, width: 12, height: 12, borderRadius: 6, backgroundColor: '#34C759', borderWidth: 2, borderColor: '#fff' },
  employeeInfo: { flex: 1, marginLeft: 12 },
  nameRow: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  employeeName: { fontSize: 16, fontWeight: '700' },
  employeeTitle: { fontSize: 12, marginTop: 2 },
  employeeStats: { flexDirection: 'row', marginBottom: 15, gap: 20 },
  statMini: { flex: 1 },
  statMiniLabel: { fontSize: 10, textTransform: 'uppercase', marginBottom: 2 },
  statMiniValue: { fontSize: 14, fontWeight: '700' },
  tagContainer: { flexDirection: 'row', gap: 8 },
  tag: { paddingHorizontal: 10, paddingVertical: 5, borderRadius: 8 },
  tagText: { fontSize: 10, fontWeight: '600' },
});
