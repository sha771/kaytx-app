import React, { useState, useMemo, useRef, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  FlatList,
  Animated,
} from 'react-native';
import {
  ShoppingCart,
  Package,
  Users,
  DollarSign,
  CheckCircle,
  ArrowLeft,
  ChevronRight,
  TrendingUp,
  Tag,
  Zap,
  Lock,
} from 'lucide-react-native';
import { useTheme } from '@/providers/ThemeProvider';
import { Stack, router } from 'expo-router';
import { aiEmployees } from '@/constants/aiEmployees';
import { trpc } from '@/lib/trpc';
import { LinearGradient } from 'expo-linear-gradient';

export default function EcommerceScreen() {
  const { theme } = useTheme();
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  // Fetch real-time industry-specific metrics from tRPC
  const { data: statsData } = trpc.aiAgents.getStats.useQuery({ category: 'marketing-growth' });
  const { data: subscription } = trpc.enterprise.getSubscription.useQuery();

  const isEnterprise = useMemo(() => {
    return subscription?.plan === 'enterprise' || subscription?.plan === 'professional';
  }, [subscription]);

  const industryMetrics = useMemo(() => [
    { label: 'Orders Processed/Day', value: statsData?.tasksToday ? `${(statsData.tasksToday / 8).toFixed(1)}K+` : '85K+', icon: ShoppingCart, color: '#007AFF' },
    { label: 'Avg Fulfillment Time', value: '1.5 hrs', icon: TrendingUp, color: '#34C759' },
    { label: 'Inventory Health', value: statsData?.avgHealthScore ? `${statsData.avgHealthScore}%` : '98.5%', icon: Tag, color: '#FF9500' },
    { label: 'Revenue Growth', value: statsData?.avgSuccessRate ? `${(statsData.avgSuccessRate / 4).toFixed(1)}%` : '24%', icon: Zap, color: '#5856D6' },
  ], [statsData]);

  const industryAgents = useMemo(() => aiEmployees.filter(emp =>
    emp.capabilities.some(cap =>
      cap.toLowerCase().includes('ecommerce') ||
      cap.toLowerCase().includes('retail') ||
      cap.toLowerCase().includes('shopping') ||
      cap.toLowerCase().includes('inventory') ||
      (emp as any).category === 'marketing-growth' ||
      emp.category === 'support' ||
      emp.category === 'marketing'
    )
  ), []);

  const categories = [
    { id: 'all', label: 'All', icon: ShoppingCart },
    { id: 'support', label: 'Support', icon: Package },
    { id: 'sales', label: 'Sales', icon: DollarSign },
    { id: 'marketing', label: 'Marketing', icon: Tag },
  ];

  const filteredAgents = selectedCategory === 'all'
    ? industryAgents
    : industryAgents.filter(emp => emp.category === selectedCategory);

  const renderAgent = ({ item }: { item: typeof aiEmployees[0] }) => {
    const IconComponent = item.icon;
    const isLocked = item.isPremium && !isEnterprise;

    return (
      <TouchableOpacity
        style={[styles.agentCard, { backgroundColor: theme.colors.cardBackground }]}
        onPress={() => {
          if (isLocked) {
            router.push('/enterprise/billing');
            return;
          }
          router.push(item.route as any);
        }}
      >
        <View style={[styles.agentIcon, { backgroundColor: item.color + '15' }]}>
          <IconComponent size={24} color={item.color} />
        </View>
        <View style={styles.agentInfo}>
          <View style={styles.agentTitleRow}>
            <Text style={[styles.agentName, { color: theme.colors.text }]}>
              {item.name}
            </Text>
            {isLocked ? (
              <Lock size={12} color={theme.colors.secondaryText} />
            ) : (
              <View style={[styles.statusDot, { backgroundColor: item.infrastructure.status === 'online' ? '#34C759' : '#8E8E93' }]} />
            )}
          </View>
          <Text style={[styles.agentDescription, { color: theme.colors.secondaryText }]} numberOfLines={2}>
            {item.description}
          </Text>
          <View style={styles.agentMetrics}>
            <View style={styles.metric}>
              <TrendingUp size={12} color="#34C759" />
              <Text style={[styles.metricText, { color: '#34C759' }]}>{item.efficiency}</Text>
            </View>
            <View style={styles.metric}>
              <CheckCircle size={12} color={theme.colors.primary} />
              <Text style={[styles.metricText, { color: theme.colors.primary }]}>{item.roiMetrics.accuracyRate}</Text>
            </View>
          </View>
        </View>
        <ChevronRight size={20} color={theme.colors.border} />
      </TouchableOpacity>
    );
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <Stack.Screen options={{ headerShown: false }} />

      <LinearGradient colors={['#34C759', '#30B050']} style={[styles.header, { paddingTop: 50 }]}>
        <View style={styles.navBar}>
          <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
            <ArrowLeft size={24} color="#fff" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>eCommerce & Retail</Text>
        </View>
        
        <View style={styles.headerContent}>
          <View style={styles.headerIconContainer}>
            <ShoppingCart size={40} color="#fff" />
          </View>
          <View style={styles.headerTextContainer}>
            <Text style={styles.industryTitle}>Retail Automation</Text>
            <Text style={styles.industrySubtitle}>End-to-End Shopping Experience</Text>
          </View>
        </View>

        <View style={styles.statsRow}>
          <View style={styles.statItem}>
            <Text style={styles.statValue}>{filteredAgents.length}</Text>
            <Text style={styles.statLabel}>Retail Agents</Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.heroStats}>
            {industryMetrics.map((metric, index) => {
              const IconComponent = metric.icon;
              return (
                <View key={index} style={styles.statItem}>
                  <IconComponent size={20} color={metric.color} />
                  <Text style={styles.statValue}>{metric.value}</Text>
                  <Text style={styles.statLabel}>{metric.label}</Text>
                </View>
              );
            })}
          </View>
        </View>
      </LinearGradient>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        <View style={styles.categoriesSection}>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.categoryScroll}>
            {categories.map((cat) => (
              <TouchableOpacity
                key={cat.id}
                style={[
                  styles.categoryChip,
                  { backgroundColor: selectedCategory === cat.id ? theme.colors.primary : theme.colors.cardBackground }
                ]}
                onPress={() => setSelectedCategory(cat.id)}
              >
                <cat.icon size={14} color={selectedCategory === cat.id ? '#fff' : theme.colors.secondaryText} />
                <Text style={[styles.categoryLabel, { color: selectedCategory === cat.id ? '#fff' : theme.colors.text }]}>
                  {cat.label}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Recommended Solutions</Text>
        <FlatList
          data={filteredAgents}
          renderItem={renderAgent}
          keyExtractor={(item) => item.id}
          scrollEnabled={false}
        />
        <View style={{ height: 40 }} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  header: { paddingHorizontal: 20, paddingBottom: 25, borderBottomLeftRadius: 30, borderBottomRightRadius: 30 },
  navBar: { flexDirection: 'row', alignItems: 'center', marginBottom: 20 },
  backButton: { width: 40, height: 40, borderRadius: 12, backgroundColor: 'rgba(255,255,255,0.2)', justifyContent: 'center', alignItems: 'center' },
  headerTitle: { fontSize: 20, fontWeight: '800', color: '#fff', marginLeft: 15 },
  headerContent: { flexDirection: 'row', alignItems: 'center', marginBottom: 25 },
  headerIconContainer: { width: 64, height: 64, borderRadius: 20, backgroundColor: 'rgba(255,255,255,0.2)', justifyContent: 'center', alignItems: 'center', marginRight: 15 },
  headerTextContainer: { flex: 1 },
  industryTitle: { fontSize: 24, fontWeight: '800', color: '#fff' },
  industrySubtitle: { fontSize: 14, color: 'rgba(255,255,255,0.8)', marginTop: 2 },
  statsRow: { flexDirection: 'row', backgroundColor: 'rgba(255,255,255,0.15)', borderRadius: 20, padding: 15, alignItems: 'center' },
  statItem: { flex: 1, alignItems: 'center' },
  statValue: { fontSize: 18, fontWeight: '800', color: '#fff' },
  statLabel: { fontSize: 10, color: 'rgba(255,255,255,0.6)', marginTop: 4, textTransform: 'uppercase' },
  statDivider: { width: 1, height: 30, backgroundColor: 'rgba(255,255,255,0.2)' },
  heroStats: { flex: 3, flexDirection: 'row', flexWrap: 'wrap', gap: 12, justifyContent: 'space-around' },
  content: { flex: 1 },
  scrollContent: { paddingTop: 20, paddingHorizontal: 20 },
  categoriesSection: { marginBottom: 20 },
  categoryScroll: { gap: 10 },
  categoryChip: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 15, paddingVertical: 10, borderRadius: 20, gap: 8 },
  categoryLabel: { fontSize: 14, fontWeight: '600' },
  sectionTitle: { fontSize: 18, fontWeight: '800', marginBottom: 15 },
  agentCard: { flexDirection: 'row', alignItems: 'center', padding: 15, borderRadius: 20, marginBottom: 12 },
  agentIcon: { width: 50, height: 50, borderRadius: 15, justifyContent: 'center', alignItems: 'center', marginRight: 15 },
  agentInfo: { flex: 1 },
  agentTitleRow: { flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: 4 },
  agentName: { fontSize: 16, fontWeight: '700' },
  statusDot: { width: 8, height: 8, borderRadius: 4 },
  agentDescription: { fontSize: 13, lineHeight: 18, marginBottom: 10 },
  agentMetrics: { flexDirection: 'row', gap: 15 },
  metric: { flexDirection: 'row', alignItems: 'center', gap: 4 },
  metricText: { fontSize: 12, fontWeight: '700' },
});
