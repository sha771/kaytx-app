import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useTheme } from '@/providers/ThemeProvider';
import { Building, TrendingUp, Users, DollarSign, Shield, Cpu, Heart, Zap, Truck, Factory, Globe, Briefcase, GraduationCap, Shirt, Gamepad2, Film, Utensils, Leaf, Scale, Gavel, Lock, Database, BarChart3, Activity, Target, Clock, CheckCircle, AlertCircle, ShoppingCart, FileText, PieChart, LineChart, MessageSquare, Calendar, MapPin, Lightbulb, Box, Landmark, Sparkles, Mic, Wheat, Video, Plane, Trophy } from 'lucide-react-native';
import { useRouter } from 'expo-router';

interface DepartmentCardProps {
  name: string;
  route: string;
  icon: React.ElementType;
  color: string;
  agentCount?: number;
}

function DepartmentCard({ name, route, icon: Icon, color, agentCount }: DepartmentCardProps) {
  const { theme } = useTheme();
  const router = useRouter();

  return (
    <TouchableOpacity
      style={[styles.card, { backgroundColor: theme.colors.card }]}
      onPress={() => router.push(route)}
      activeOpacity={0.7}
    >
      <View style={[styles.iconContainer, { backgroundColor: color + '20' }]}>
        <Icon size={28} color={color} />
      </View>
      <Text style={[styles.cardTitle, { color: theme.colors.text }]} numberOfLines={2}>
        {name}
      </Text>
      {agentCount && (
        <Text style={[styles.cardSubtitle, { color: theme.colors.textSecondary }]}>
          {agentCount} agents
        </Text>
      )}
    </TouchableOpacity>
  );
}

export default function DashboardHub() {
  const { theme } = useTheme();

  const departments: DepartmentCardProps[] = [
    { name: 'Customer Experience', route: '/ai-agent/customer-support/dashboard', icon: Users, color: '#EC4899', agentCount: 89 },
    { name: 'Sales & Revenue', route: '/ai-agent/sales/revenue-command-center', icon: Target, color: '#F59E0B', agentCount: 112 },
    { name: 'Marketing', route: '/ai-agent/marketing/dashboard', icon: BarChart3, color: '#EC4899', agentCount: 134 },
    { name: 'Operations', route: '/ai-agent/operations/dashboard', icon: Activity, color: '#6366F1', agentCount: 145 },
    { name: 'Finance', route: '/ai-agent/finance/dashboard', icon: DollarSign, color: '#3B82F6', agentCount: 167 },
    { name: 'Human Resources', route: '/ai-agent/human-resources/dashboard', icon: Users, color: '#8B5CF6', agentCount: 156 },
    { name: 'Legal', route: '/ai-agent/legal/dashboard', icon: Gavel, color: '#3F51B5', agentCount: 123 },
    { name: 'Data & Intelligence', route: '/ai-agent/data/dashboard', icon: Database, color: '#00ACC1', agentCount: 178 },
    { name: 'Product', route: '/ai-agent/product-management/dashboard', icon: Briefcase, color: '#8B5CF6', agentCount: 134 },
    { name: 'Security', route: '/ai-agent/security/dashboard', icon: Lock, color: '#EF4444', agentCount: 189 },
    { name: 'Research & Development', route: '/ai-agent/research-development/dashboard', icon: Lightbulb, color: '#14B8A6', agentCount: 145 },
    { name: 'Administrative', route: '/ai-agent/administrative/dashboard', icon: FileText, color: '#64748B', agentCount: 98 },
    { name: 'Trading & Investments', route: '/ai-agent/trading-investment/dashboard', icon: TrendingUp, color: '#22C55E', agentCount: 213 },
    { name: 'Real Estate', route: '/ai-agent/real-estate/dashboard', icon: Building, color: '#059669', agentCount: 134 },
    { name: 'Banking & Finance', route: '/ai-agent/banking-finance/dashboard', icon: Landmark, color: '#2563EB', agentCount: 198 },
    { name: 'E-Commerce', route: '/ai-agent/e-commerce/dashboard', icon: ShoppingCart, color: '#F59E0B', agentCount: 156 },
    { name: 'Professional Services', route: '/ai-agent/consulting-advisory/dashboard', icon: Briefcase, color: '#6366F1', agentCount: 134 },
    { name: 'Media & Entertainment', route: '/ai-agent/media-entertainment/dashboard', icon: Film, color: '#EC4899', agentCount: 145 },
    { name: 'Gaming & Esports', route: '/ai-agent/gaming-esports/dashboard', icon: Gamepad2, color: '#A855F7', agentCount: 123 },
    { name: 'Education', route: '/ai-agent/education/dashboard', icon: GraduationCap, color: '#14B8A6', agentCount: 189 },
    { name: 'Retail', route: '/ai-agent/retail-stores/dashboard', icon: ShoppingCart, color: '#F97316', agentCount: 167 },
    { name: 'Travel & Tourism', route: '/ai-agent/travel-tourism/dashboard', icon: Plane, color: '#0EA5E9', agentCount: 134 },
    { name: 'Energy & Utilities', route: '/ai-agent/energy-utilities/dashboard', icon: Zap, color: '#F59E0B', agentCount: 156 },
    { name: 'Event Management', route: '/ai-agent/event-management/dashboard', icon: Calendar, color: '#DB2777', agentCount: 112 },
    { name: 'Healthcare', route: '/ai-agent/healthcare-medical/dashboard', icon: Heart, color: '#EC4899', agentCount: 201 },
    { name: 'Manufacturing', route: '/ai-agent/manufacturing/dashboard', icon: Factory, color: '#F97316', agentCount: 189 },
    { name: 'Transportation', route: '/ai-agent/transportation/dashboard', icon: Truck, color: '#7C3AED', agentCount: 145 },
    { name: 'Insurance', route: '/ai-agent/insurance/dashboard', icon: Shield, color: '#DC2626', agentCount: 167 },
    { name: 'Agriculture', route: '/ai-agent/agriculture/dashboard', icon: Wheat, color: '#65A30D', agentCount: 145 },
    { name: 'Fashion & Luxury', route: '/ai-agent/fashion-luxury/dashboard', icon: Shirt, color: '#BE185D', agentCount: 134 },
    { name: 'Restaurants', route: '/ai-agent/restaurants/dashboard', icon: Utensils, color: '#DC2626', agentCount: 167 },
    { name: 'Supply Chain', route: '/ai-agent/supply-chain/dashboard', icon: Box, color: '#0891B2', agentCount: 178 },
    { name: 'Executive Strategy', route: '/ai-agent/executive/dashboard', icon: TrendingUp, color: '#1E293B', agentCount: 89 },
    { name: 'Technology', route: '/ai-agent/ai-and-technology/dashboard', icon: Cpu, color: '#06B6D4', agentCount: 198 },
    { name: 'AI Management', route: '/ai-agent/ai-management-governance/dashboard', icon: Cpu, color: '#8B5CF6', agentCount: 167 },
    { name: 'Government', route: '/ai-agent/public-sector/dashboard', icon: Building, color: '#1E40AF', agentCount: 234 },
    { name: 'Engineering', route: '/ai-agent/engineering/dashboard', icon: Wrench, color: '#F97316', agentCount: 90 },
  ];

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <View style={[styles.header, { borderBottomColor: theme.colors.border }]}>
        <Text style={[styles.title, { color: theme.colors.text }]}>
          Enterprise Dashboard Hub
        </Text>
        <Text style={[styles.subtitle, { color: theme.colors.textSecondary }]}>
          37 Departments • 6,535+ AI Agents
        </Text>
      </View>

      <ScrollView 
        style={styles.scrollContent}
        contentContainerStyle={styles.scrollContainer}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.grid}>
          {departments.map((dept, index) => (
            <View key={index} style={styles.gridItem}>
              <DepartmentCard {...dept} />
            </View>
          ))}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    padding: 20,
    borderBottomWidth: 1,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 14,
  },
  scrollContent: {
    flex: 1,
  },
  scrollContainer: {
    padding: 16,
    paddingBottom: 32,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginHorizontal: -8,
  },
  gridItem: {
    width: '50%',
    padding: 8,
  },
  card: {
    borderRadius: 16,
    padding: 16,
    minHeight: 140,
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconContainer: {
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  cardTitle: {
    fontSize: 14,
    fontWeight: '600',
    textAlign: 'center',
    marginBottom: 4,
  },
  cardSubtitle: {
    fontSize: 12,
    textAlign: 'center',
  },
});
