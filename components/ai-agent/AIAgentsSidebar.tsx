import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { useColorScheme } from '@/hooks/useColorScheme';
import { Colors } from '@/constants/Colors';
import {
  Briefcase,
  Landmark,
  Headphones,
  Target,
  Megaphone,
  FlaskConical,
  Settings,
  Share2,
  ChartBar,
  Gauge,
  Users,
  Monitor,
  Scale,
  SquareCode,
  CircleUser,
  TrendingUp,
  ChevronRight,
  HeartHandshake,
  BarChart3,
  LayoutGrid,
  LineChart,
} from 'lucide-react-native';

interface SidebarCategory {
  id: string;
  label: string;
  icon: React.ComponentType<{ size: number; color: string }>;
  color: string;
  route: string;
  count: number;
}

const categories: SidebarCategory[] = [
  { id: 'executive-leadership', label: 'Executive & Leadership AI', icon: Briefcase, color: '#1E3A5F', route: '/ai-agent/executive-leadership-ai', count: 9 },
  { id: 'accounting-finance', label: 'Accounting & Finance AI', icon: Landmark, color: '#10B981', route: '/ai-agent/accounting-finance-ai', count: 10 },
  { id: 'customer-experience', label: 'Customer Experience AI', icon: Headphones, color: '#007AFF', route: '/ai-agent/customer-experience-ai', count: 8 },
  { id: 'sales-revenue', label: 'Sales & Revenue AI', icon: Target, color: '#34C759', route: '/ai-agent/sales-revenue-ai', count: 10 },
  { id: 'marketing-growth', label: 'Marketing & Growth AI', icon: Megaphone, color: '#FF2D55', route: '/ai-agent/marketing-growth-ai', count: 10 },
  { id: 'product-rnd', label: 'Product & R&D AI', icon: FlaskConical, color: '#7B1FA2', route: '/ai-agent/product-rnd-ai', count: 6 },
  { id: 'operations-management', label: 'Operations & Management AI', icon: Settings, color: '#FF6B35', route: '/ai-agent/operations-management-ai', count: 10 },
  { id: 'social-media-management', label: 'Social Media Management AI', icon: Share2, color: '#E1306C', route: '/ai-agent/social-media-management-ai', count: 8 },
  { id: 'data-intelligence', label: 'Data & Intelligence AI', icon: ChartBar, color: '#9B59B6', route: '/ai-agent/data-intelligence-ai', count: 8 },
  { id: 'analysis-insights-performance', label: 'Analysis, Insights & Performance AI', icon: Gauge, color: '#E74C3C', route: '/ai-agent/analysis-performance-ai', count: 9 },
  { id: 'human-resources', label: 'Human Resources AI', icon: Users, color: '#00897B', route: '/ai-agent/human-resources-ai', count: 7 },
  { id: 'it-technology', label: 'IT & Technology AI', icon: Monitor, color: '#0288D1', route: '/ai-agent/it-technology-ai', count: 6 },
  { id: 'legal-compliance', label: 'Legal & Compliance AI', icon: Scale, color: '#4E342E', route: '/ai-agent/legal-compliance-ai', count: 6 },
  { id: 'engineering-development', label: 'Engineering & Development AI', icon: SquareCode, color: '#1565C0', route: '/ai-agent/engineering-development-ai', count: 7 },
  { id: 'ai-personal-assistant', label: 'AI Personal Assistant', icon: CircleUser, color: '#1976D2', route: '/ai-agent/ai-personal-assistant-ai', count: 7 },
  { id: 'trading-investment', label: 'Trading & Investment AI', icon: TrendingUp, color: '#00C853', route: '/ai-agent/trading-investment-ai', count: 16 },
];

// New Feature Categories - Social CRM, Analytics, Performance, Collaboration, Team Management
const featureCategories: SidebarCategory[] = [
  { id: 'social-crm', label: 'Social CRM', icon: HeartHandshake, color: '#3B82F6', route: '/ai-agent/social-crm', count: 5 },
  { id: 'analytics', label: 'Analytics & Insights', icon: BarChart3, color: '#8B5CF6', route: '/ai-agent/analytics', count: 4 },
  { id: 'performance', label: 'Performance & KPIs', icon: LineChart, color: '#10B981', route: '/ai-agent/performance', count: 3 },
  { id: 'collaboration', label: 'Team Collaboration', icon: LayoutGrid, color: '#F59E0B', route: '/ai-agent/collaboration', count: 4 },
  { id: 'team-management', label: 'Team Management', icon: Users, color: '#EC4899', route: '/ai-agent/team-management', count: 5 },
];

interface AIAgentsSidebarProps {
  activeCategory?: string;
  onCategoryPress?: (categoryId: string) => void;
  compact?: boolean;
}

export function AIAgentsSidebar({ activeCategory, onCategoryPress, compact }: AIAgentsSidebarProps) {
  const router = useRouter();
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];

  const handlePress = (category: SidebarCategory) => {
    if (onCategoryPress) {
      onCategoryPress(category.id);
    } else {
      router.push(category.route as any);
    }
  };

  return (
    <ScrollView style={[styles.container, { backgroundColor: colors.card }]} showsVerticalScrollIndicator={false}>
      <View style={styles.header}>
        <Text style={[styles.headerTitle, { color: colors.text }]}>AI Departments</Text>
        <Text style={[styles.headerSubtitle, { color: colors.text + '60' }]}>16 Categories</Text>
      </View>

      {/* Line 1: Executive, Accounting, Customer Experience */}
      <View style={styles.line}>
        {categories.slice(0, 3).map((cat) => (
          <TouchableOpacity
            key={cat.id}
            style={[
              styles.categoryCard,
              { backgroundColor: colors.background, borderColor: activeCategory === cat.id ? cat.color : colors.border },
              activeCategory === cat.id && { borderWidth: 2 },
            ]}
            onPress={() => handlePress(cat)}
          >
            <View style={[styles.iconContainer, { backgroundColor: cat.color + '15' }]}>
              <cat.icon size={compact ? 20 : 24} color={cat.color} />
            </View>
            <Text style={[styles.categoryLabel, { color: colors.text }]} numberOfLines={2}>
              {cat.label}
            </Text>
            <View style={[styles.countBadge, { backgroundColor: cat.color }]}>
              <Text style={styles.countText}>{cat.count}</Text>
            </View>
            <ChevronRight size={14} color={colors.text + '60'} />
          </TouchableOpacity>
        ))}
      </View>

      {/* Line 2: Sales, Marketing, Product */}
      <View style={styles.line}>
        {categories.slice(3, 6).map((cat) => (
          <TouchableOpacity
            key={cat.id}
            style={[
              styles.categoryCard,
              { backgroundColor: colors.background, borderColor: activeCategory === cat.id ? cat.color : colors.border },
              activeCategory === cat.id && { borderWidth: 2 },
            ]}
            onPress={() => handlePress(cat)}
          >
            <View style={[styles.iconContainer, { backgroundColor: cat.color + '15' }]}>
              <cat.icon size={compact ? 20 : 24} color={cat.color} />
            </View>
            <Text style={[styles.categoryLabel, { color: colors.text }]} numberOfLines={2}>
              {cat.label}
            </Text>
            <View style={[styles.countBadge, { backgroundColor: cat.color }]}>
              <Text style={styles.countText}>{cat.count}</Text>
            </View>
            <ChevronRight size={14} color={colors.text + '60'} />
          </TouchableOpacity>
        ))}
      </View>

      {/* Line 3: Operations, Social Media, Data */}
      <View style={styles.line}>
        {categories.slice(6, 9).map((cat) => (
          <TouchableOpacity
            key={cat.id}
            style={[
              styles.categoryCard,
              { backgroundColor: colors.background, borderColor: activeCategory === cat.id ? cat.color : colors.border },
              activeCategory === cat.id && { borderWidth: 2 },
            ]}
            onPress={() => handlePress(cat)}
          >
            <View style={[styles.iconContainer, { backgroundColor: cat.color + '15' }]}>
              <cat.icon size={compact ? 20 : 24} color={cat.color} />
            </View>
            <Text style={[styles.categoryLabel, { color: colors.text }]} numberOfLines={2}>
              {cat.label}
            </Text>
            <View style={[styles.countBadge, { backgroundColor: cat.color }]}>
              <Text style={styles.countText}>{cat.count}</Text>
            </View>
            <ChevronRight size={14} color={colors.text + '60'} />
          </TouchableOpacity>
        ))}
      </View>

      {/* New Features Section */}
      <View style={styles.featureSection}>
        <Text style={[styles.featureTitle, { color: colors.text + '60' }]}>New Features</Text>
        <View style={styles.featureGrid}>
          {featureCategories.map((cat) => (
            <TouchableOpacity
              key={cat.id}
              style={[
                styles.featureCard,
                { backgroundColor: colors.background, borderColor: activeCategory === cat.id ? cat.color : colors.border },
                activeCategory === cat.id && { borderWidth: 2 },
              ]}
              onPress={() => handlePress(cat)}
            >
              <View style={[styles.featureIconContainer, { backgroundColor: cat.color + '15' }]}>
                <cat.icon size={22} color={cat.color} />
              </View>
              <Text style={[styles.featureLabel, { color: colors.text }]} numberOfLines={2}>
                {cat.label}
              </Text>
              <View style={[styles.featureCountBadge, { backgroundColor: cat.color }]}>
                <Text style={styles.featureCountText}>{cat.count}</Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* Additional categories in scrollable list */}
      <View style={styles.moreSection}>
        <Text style={[styles.moreTitle, { color: colors.text + '60' }]}>More Departments</Text>
        {categories.slice(9).map((cat) => (
          <TouchableOpacity
            key={cat.id}
            style={[
              styles.moreCard,
              { backgroundColor: colors.background, borderColor: activeCategory === cat.id ? cat.color : colors.border },
              activeCategory === cat.id && { borderWidth: 2 },
            ]}
            onPress={() => handlePress(cat)}
          >
            <View style={[styles.moreIconContainer, { backgroundColor: cat.color + '15' }]}>
              <cat.icon size={20} color={cat.color} />
            </View>
            <View style={styles.moreInfo}>
              <Text style={[styles.moreLabel, { color: colors.text }]}>{cat.label}</Text>
              <Text style={[styles.moreSub, { color: colors.text + '60' }]}>{cat.count} AI Agents</Text>
            </View>
            <ChevronRight size={16} color={colors.text + '60'} />
          </TouchableOpacity>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    padding: 16,
    paddingBottom: 8,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '800',
  },
  headerSubtitle: {
    fontSize: 12,
    marginTop: 2,
  },
  line: {
    flexDirection: 'row',
    paddingHorizontal: 12,
    paddingVertical: 6,
    gap: 8,
  },
  categoryCard: {
    flex: 1,
    padding: 10,
    borderRadius: 12,
    borderWidth: 1,
    alignItems: 'center',
    position: 'relative',
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 6,
  },
  categoryLabel: {
    fontSize: 10,
    fontWeight: '600',
    textAlign: 'center',
    lineHeight: 14,
    marginBottom: 4,
  },
  countBadge: {
    position: 'absolute',
    top: 6,
    right: 6,
    width: 18,
    height: 18,
    borderRadius: 9,
    alignItems: 'center',
    justifyContent: 'center',
  },
  countText: {
    color: '#fff',
    fontSize: 9,
    fontWeight: '700',
  },
  featureSection: {
    paddingHorizontal: 12,
    paddingTop: 12,
    paddingBottom: 8,
  },
  featureTitle: {
    fontSize: 12,
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: 1,
    marginBottom: 10,
  },
  featureGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  featureCard: {
    width: '31%',
    padding: 12,
    borderRadius: 12,
    borderWidth: 1,
    alignItems: 'center',
    position: 'relative',
  },
  featureIconContainer: {
    width: 44,
    height: 44,
    borderRadius: 22,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
  },
  featureLabel: {
    fontSize: 11,
    fontWeight: '600',
    textAlign: 'center',
    lineHeight: 16,
  },
  featureCountBadge: {
    position: 'absolute',
    top: 6,
    right: 6,
    width: 18,
    height: 18,
    borderRadius: 9,
    alignItems: 'center',
    justifyContent: 'center',
  },
  featureCountText: {
    color: '#fff',
    fontSize: 9,
    fontWeight: '700',
  },
  moreSection: {
    paddingHorizontal: 12,
    paddingTop: 12,
    paddingBottom: 20,
  },
  moreTitle: {
    fontSize: 12,
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: 1,
    marginBottom: 8,
  },
  moreCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    borderRadius: 10,
    borderWidth: 1,
    marginBottom: 6,
  },
  moreIconContainer: {
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
  },
  moreInfo: {
    flex: 1,
    marginLeft: 12,
  },
  moreLabel: {
    fontSize: 13,
    fontWeight: '600',
  },
  moreSub: {
    fontSize: 11,
    marginTop: 1,
  },
});
