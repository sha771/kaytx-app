import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useTheme } from '@/providers/ThemeProvider';
import { useRouter } from 'expo-router';
import { 
  Briefcase, Users, Headphones, Megaphone, DollarSign, Cpu, 
  Heart, Scale, Database, Target, Shield, Flask, 
  Settings, TrendingUp, Building, Factory, Truck, Landmark,
  ArrowRight, Activity, Layers, Brain, Banknote, ShoppingCart,
  Tv, Gamepad2, GraduationCap, Store, Plane, Lightbulb,
  Crown, Calendar, Sprout, Gem, Utensils
} from 'lucide-react-native';

export default function DepartmentsPage() {
  const { theme } = useTheme();
  const router = useRouter();

  const DEPARTMENTS = [
    // Core Departments (22)
    {
      id: 'customer',
      name: 'Customer',
      icon: Headphones,
      color: '#00BCD4',
      agents: 132,
      subAgents: 0,
      description: 'Customer support, success, and experience management',
      route: '/ai-agent/customer-agents'
    },
    {
      id: 'sales',
      name: 'Sales',
      icon: DollarSign,
      color: '#10B981',
      agents: 139,
      subAgents: 0,
      description: 'Sales operations, revenue generation, and client acquisition',
      route: '/ai-agent/sales-agents'
    },
    {
      id: 'marketing',
      name: 'Marketing',
      icon: Megaphone,
      color: '#F59E0B',
      agents: 169,
      subAgents: 0,
      description: 'Marketing strategy, brand management, and growth initiatives',
      route: '/ai-agent/marketing-agents'
    },
    {
      id: 'operations',
      name: 'Operations',
      icon: Briefcase,
      color: '#3B82F6',
      agents: 178,
      subAgents: 0,
      description: 'Operational excellence and process management',
      route: '/ai-agent/operations-agents'
    },
    {
      id: 'accounting',
      name: 'Accounting',
      icon: TrendingUp,
      color: '#8B5CF6',
      agents: 163,
      subAgents: 0,
      description: 'Financial planning, accounting, and fiscal management',
      route: '/ai-agent/accounting-agents'
    },
    {
      id: 'finance',
      name: 'Finance',
      icon: DollarSign,
      color: '#10B981',
      agents: 120,
      subAgents: 0,
      description: 'Financial operations and treasury management',
      route: '/ai-agent/finance-agents'
    },
    {
      id: 'technology',
      name: 'Technology',
      icon: Cpu,
      color: '#EC4899',
      agents: 198,
      subAgents: 0,
      description: 'Technology development and engineering operations',
      route: '/ai-agent/technology-agents'
    },
    {
      id: 'hr',
      name: 'HR',
      icon: Users,
      color: '#EF4444',
      agents: 138,
      subAgents: 0,
      description: 'Talent management and HR operations',
      route: '/ai-agent/hr-agents'
    },
    {
      id: 'legal',
      name: 'Legal',
      icon: Scale,
      color: '#DC2626',
      agents: 184,
      subAgents: 0,
      description: 'Legal affairs and regulatory compliance',
      route: '/ai-agent/legal-agents'
    },
    {
      id: 'data',
      name: 'Data',
      icon: Database,
      color: '#7C3AED',
      agents: 147,
      subAgents: 0,
      description: 'Data analytics and business intelligence',
      route: '/ai-agent/data-agents'
    },
    {
      id: 'product',
      name: 'Product',
      icon: Target,
      color: '#06B6D4',
      agents: 126,
      subAgents: 0,
      description: 'Product strategy and development management',
      route: '/ai-agent/product-agents'
    },
    {
      id: 'security',
      name: 'Security & Risk',
      icon: Shield,
      color: '#F97316',
      agents: 60,
      subAgents: 0,
      description: 'Security operations and risk management',
      route: '/ai-agent/security-agents'
    },
    {
      id: 'research',
      name: 'Research',
      icon: Flask,
      color: '#14B8A6',
      agents: 122,
      subAgents: 0,
      description: 'Research initiatives and innovation development',
      route: '/ai-agent/research-agents'
    },
    {
      id: 'admin',
      name: 'Admin',
      icon: Settings,
      color: '#6B7280',
      agents: 65,
      subAgents: 0,
      description: 'Administrative services and office management',
      route: '/ai-agent/admin-agents'
    },
    {
      id: 'trading',
      name: 'Trading',
      icon: TrendingUp,
      color: '#22C55E',
      agents: 175,
      subAgents: 0,
      description: 'Trading operations and investment management',
      route: '/ai-agent/trading-agents'
    },
    {
      id: 'real-estate',
      name: 'Real Estate',
      icon: Building,
      color: '#A855F7',
      agents: 263,
      subAgents: 0,
      description: 'Real estate operations and property management',
      route: '/ai-agent/real-estate-agents'
    },
    {
      id: 'insurance',
      name: 'Insurance',
      icon: Shield,
      color: '#EA580C',
      agents: 139,
      subAgents: 0,
      description: 'Insurance operations and risk assessment',
      route: '/ai-agent/insurance-agents'
    },
    {
      id: 'healthcare',
      name: 'Healthcare',
      icon: Heart,
      color: '#E11D48',
      agents: 129,
      subAgents: 0,
      description: 'Healthcare operations and medical services',
      route: '/ai-agent/healthcare-agents'
    },
    {
      id: 'manufacturing',
      name: 'Manufacturing',
      icon: Factory,
      color: '#0EA5E9',
      agents: 130,
      subAgents: 0,
      description: 'Manufacturing operations and production management',
      route: '/ai-agent/manufacturing-agents'
    },
    {
      id: 'transportation',
      name: 'Transportation',
      icon: Truck,
      color: '#F59E0B',
      agents: 129,
      subAgents: 0,
      description: 'Transportation operations and logistics management',
      route: '/ai-agent/transportation-agents'
    },
    {
      id: 'logistics-warehousing',
      name: 'Logistics & Warehousing',
      icon: Truck,
      color: '#64748B',
      agents: 250,
      subAgents: 0,
      description: 'Logistics operations and warehousing management',
      route: '/ai-agent/logistics-warehousing-agents'
    },
    {
      id: 'government',
      name: 'Government',
      icon: Landmark,
      color: '#1E40AF',
      agents: 126,
      subAgents: 0,
      description: 'Government operations and public sector services',
      route: '/ai-agent/government-agents'
    },
    {
      id: 'supply-chain',
      name: 'Supply Chain',
      icon: Truck,
      color: '#71717A',
      agents: 166,
      subAgents: 0,
      description: 'Supply chain operations and logistics coordination',
      route: '/ai-agent/supplychain-agents'
    },
    {
      id: 'ai-governance',
      name: 'AI Management & Governance',
      icon: Brain,
      color: '#8B5CF6',
      agents: 60,
      subAgents: 0,
      description: 'AI system management and governance oversight',
      route: '/ai-agent/ai-governance-agents'
    },
    // Industry-Specific Departments (14 new)
    {
      id: 'banking-finance',
      name: 'Banking & Finance',
      icon: Banknote,
      color: '#059669',
      agents: 60,
      subAgents: 0,
      description: 'Banking operations and financial services',
      route: '/ai-agent/banking-finance-agents'
    },
    {
      id: 'e-commerce',
      name: 'E-Commerce',
      icon: ShoppingCart,
      color: '#7C3AED',
      agents: 82,
      subAgents: 0,
      description: 'E-commerce operations and online retail',
      route: '/ai-agent/e-commerce-agents'
    },
    {
      id: 'professional-services',
      name: 'Professional Services',
      icon: Briefcase,
      color: '#0891B2',
      agents: 60,
      subAgents: 0,
      description: 'Professional services and consulting',
      route: '/ai-agent/professional-services-agents'
    },
    {
      id: 'media-entertainment',
      name: 'Media & Entertainment',
      icon: Tv,
      color: '#E11D48',
      agents: 60,
      subAgents: 0,
      description: 'Media operations and entertainment services',
      route: '/ai-agent/media-entertainment-agents'
    },
    {
      id: 'gaming-esports',
      name: 'Gaming & Esports',
      icon: Gamepad2,
      color: '#8B5CF6',
      agents: 60,
      subAgents: 0,
      description: 'Gaming operations and esports management',
      route: '/ai-agent/gaming-esports-agents'
    },
    {
      id: 'education',
      name: 'Education',
      icon: GraduationCap,
      color: '#2563EB',
      agents: 60,
      subAgents: 0,
      description: 'Educational services and learning management',
      route: '/ai-agent/education-agents'
    },
    {
      id: 'retail-stores',
      name: 'Retail & Stores',
      icon: Store,
      color: '#DC2626',
      agents: 60,
      subAgents: 0,
      description: 'Retail operations and store management',
      route: '/ai-agent/retail-stores-agents'
    },
    {
      id: 'travel-tourism',
      name: 'Travel & Tourism',
      icon: Plane,
      color: '#0891B2',
      agents: 60,
      subAgents: 0,
      description: 'Travel operations and tourism services',
      route: '/ai-agent/travel-tourism-agents'
    },
    {
      id: 'energy-utilities',
      name: 'Energy & Utilities',
      icon: Lightbulb,
      color: '#F59E0B',
      agents: 60,
      subAgents: 0,
      description: 'Energy operations and utilities management',
      route: '/ai-agent/energy-utilities-agents'
    },
    {
      id: 'executive-strategy',
      name: 'Executive & Strategy',
      icon: Crown,
      color: '#7C3AED',
      agents: 60,
      subAgents: 0,
      description: 'Executive management and strategic planning',
      route: '/ai-agent/executive-strategy-agents'
    },
    {
      id: 'event-management',
      name: 'Event Management',
      icon: Calendar,
      color: '#EC4899',
      agents: 60,
      subAgents: 0,
      description: 'Event planning and management services',
      route: '/ai-agent/event-management-agents'
    },
    {
      id: 'agriculture',
      name: 'Agriculture',
      icon: Sprout,
      color: '#22C55E',
      agents: 60,
      subAgents: 0,
      description: 'Agricultural operations and farming management',
      route: '/ai-agent/agriculture-agents'
    },
    {
      id: 'fashion-luxury',
      name: 'Fashion & Luxury',
      icon: Gem,
      color: '#EC4899',
      agents: 60,
      subAgents: 0,
      description: 'Fashion operations and luxury brand management',
      route: '/ai-agent/fashion-luxury-agents'
    },
    {
      id: 'restaurants',
      name: 'Restaurants',
      icon: Utensils,
      color: '#F59E0B',
      agents: 60,
      subAgents: 0,
      description: 'Restaurant operations and food services',
      route: '/ai-agent/restaurants-agents'
    }
  ];

  const DEPARTMENT_STATS = [
    { label: 'Total Departments', value: '36', icon: Briefcase, color: '#3B82F6' },
    { label: 'Total Agents', value: '2,160', icon: Users, color: '#10B981' },
    { label: 'Agents per Dept', value: '60', icon: Layers, color: '#8B5CF6' },
    { label: 'Active Now', value: '2,160', icon: Activity, color: '#F59E0B' }
  ];

  return (
    <ScrollView style={[styles.container, { backgroundColor: theme.colors.background }]}>
      {/* Hero Section */}
      <View style={[styles.hero, { borderBottomColor: theme.colors.border || '#E5E5EA' }]}>
        <View style={[styles.heroIconWrap, { backgroundColor: '#3B82F620' }]}>
          <Briefcase size={56} color="#3B82F6" />
        </View>
        <Text style={[styles.heroTitle, { color: theme.colors.text }]}>Departments</Text>
        <Text style={[styles.heroSubtitle, { color: theme.colors.textSecondary }]}>
          Tier 5 - 36 Major Business Functions
        </Text>
        <View style={styles.badgesRow}>
          <View style={[styles.badge, { backgroundColor: '#3B82F622' }]}>
            <Briefcase size={12} color="#3B82F6" />
            <Text style={[styles.badgeText, { color: '#3B82F6' }]}>36 Departments</Text>
          </View>
          <View style={[styles.badge, { backgroundColor: '#10B98122' }]}>
            <Users size={12} color="#10B981" />
            <Text style={[styles.badgeText, { color: '#10B981' }]}>2,160 Agents</Text>
          </View>
          <View style={[styles.badge, { backgroundColor: '#F59E0B22' }]}>
            <Activity size={12} color="#F59E0B" />
            <Text style={[styles.badgeText, { color: '#F59E0B' }]}>All Active</Text>
          </View>
        </View>
      </View>

      {/* Department Stats */}
      <View style={styles.statsContainer}>
        {DEPARTMENT_STATS.map((stat, i) => (
          <View key={i} style={[styles.statCard, { backgroundColor: theme.colors.card || '#F2F2F7' }]}>
            <stat.icon size={24} color={stat.color} />
            <Text style={[styles.statValue, { color: theme.colors.text }]}>{stat.value}</Text>
            <Text style={[styles.statLabel, { color: theme.colors.textSecondary }]}>{stat.label}</Text>
          </View>
        ))}
      </View>

      {/* Overview */}
      <View style={[styles.section, { backgroundColor: theme.colors.card || '#F2F2F7' }]}>
        <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Overview</Text>
        <Text style={[styles.description, { color: theme.colors.textSecondary }]}>
          The Departments tier represents the 21 major business functions that make up the AI workforce. 
          Each department has specialized main agents and sub-agents that handle specific operational 
          areas. These departments work in coordination under the Advanced Command Center to deliver 
          comprehensive business capabilities.
        </Text>
      </View>

      {/* Departments List */}
      <View style={[styles.section, { backgroundColor: theme.colors.card || '#F2F2F7' }]}>
        <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>All Departments</Text>
        {DEPARTMENTS.map((dept) => (
          <TouchableOpacity
            key={dept.id}
            onPress={() => router.push(dept.route)}
            style={[styles.departmentCard, { backgroundColor: theme.colors.background || '#F2F2F7' }]}
          >
            <View style={[styles.deptIcon, { backgroundColor: dept.color + '20' }]}>
              <dept.icon size={32} color={dept.color} />
            </View>
            <View style={styles.deptInfo}>
              <View style={styles.deptHeader}>
                <Text style={[styles.deptName, { color: theme.colors.text }]}>{dept.name}</Text>
                <View style={styles.agentCounts}>
                  <View style={[styles.countBadge, { backgroundColor: dept.color + '20' }]}>
                    <Text style={[styles.countText, { color: dept.color }]}>{dept.agents} Main</Text>
                  </View>
                  <View style={[styles.countBadge, { backgroundColor: dept.color + '20' }]}>
                    <Text style={[styles.countText, { color: dept.color }]}>{dept.subAgents} Sub</Text>
                  </View>
                </View>
              </View>
              <Text style={[styles.deptDesc, { color: theme.colors.textSecondary }]}>{dept.description}</Text>
            </View>
            <ArrowRight size={24} color={dept.color} />
          </TouchableOpacity>
        ))}
      </View>

      {/* Department Categories */}
      <View style={[styles.section, { backgroundColor: theme.colors.card || '#F2F2F7' }]}>
        <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Department Categories</Text>
        
        <View style={styles.categorySection}>
          <Text style={[styles.categoryTitle, { color: theme.colors.text }]}>Core Business</Text>
          <Text style={[styles.categoryDesc, { color: theme.colors.textSecondary }]}>
            Customer Experience, Sales, Marketing, Operations, Finance
          </Text>
        </View>

        <View style={styles.categorySection}>
          <Text style={[styles.categoryTitle, { color: theme.colors.text }]}>Technology & Innovation</Text>
          <Text style={[styles.categoryDesc, { color: theme.colors.textSecondary }]}>
            Technology, Data & Intelligence, Product, Research & Development
          </Text>
        </View>

        <View style={styles.categorySection}>
          <Text style={[styles.categoryTitle, { color: theme.colors.text }]}>Corporate Services</Text>
          <Text style={[styles.categoryDesc, { color: theme.colors.textSecondary }]}>
            Human Resources, Legal & Compliance, Security & Risk, Administrative
          </Text>
        </View>

        <View style={styles.categorySection}>
          <Text style={[styles.categoryTitle, { color: theme.colors.text }]}>Specialized Industries</Text>
          <Text style={[styles.categoryDesc, { color: theme.colors.textSecondary }]}>
            Trading & Investments, Real Estate, Insurance, Healthcare, Manufacturing, Transportation
          </Text>
        </View>

        <View style={styles.categorySection}>
          <Text style={[styles.categoryTitle, { color: theme.colors.text }]}>Public Sector</Text>
          <Text style={[styles.categoryDesc, { color: theme.colors.textSecondary }]}>
            Government & Public Sector, Supply Chain & Logistics
          </Text>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  hero: {
    padding: 24,
    borderBottomWidth: 1,
  },
  heroIconWrap: {
    width: 80,
    height: 80,
    borderRadius: 40,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  heroTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  heroSubtitle: {
    fontSize: 16,
    marginBottom: 16,
  },
  badgesRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  badge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    gap: 6,
  },
  badgeText: {
    fontSize: 12,
    fontWeight: '600',
  },
  statsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    padding: 16,
    gap: 12,
  },
  statCard: {
    flex: 1,
    minWidth: 140,
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    gap: 8,
  },
  statValue: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  statLabel: {
    fontSize: 12,
    textAlign: 'center',
  },
  section: {
    padding: 20,
    marginTop: 8,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  description: {
    fontSize: 14,
    lineHeight: 20,
  },
  departmentCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    gap: 16,
  },
  deptIcon: {
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
  },
  deptInfo: {
    flex: 1,
  },
  deptHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  deptName: {
    fontSize: 16,
    fontWeight: '600',
  },
  agentCounts: {
    flexDirection: 'row',
    gap: 8,
  },
  countBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  countText: {
    fontSize: 11,
    fontWeight: '600',
  },
  deptDesc: {
    fontSize: 14,
  },
  categorySection: {
    padding: 16,
    borderRadius: 12,
    backgroundColor: '#F2F2F7',
    marginBottom: 12,
  },
  categoryTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
  },
  categoryDesc: {
    fontSize: 14,
    lineHeight: 20,
  },
});