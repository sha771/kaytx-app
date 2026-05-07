import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useTheme } from '@/providers/ThemeProvider';
import { Store, Star, Download, Shield, Zap, ChevronRight, Search, Filter, TrendingUp, Award } from 'lucide-react-native';
import { useRouter } from 'expo-router';
import AgentFeatures from '@/components/ai-agent/AgentFeatures';

const CATEGORIES = [
  { id: 'all', name: 'All', count: 248 },
  { id: 'sales', name: 'Sales', count: 42 },
  { id: 'marketing', name: 'Marketing', count: 38 },
  { id: 'support', name: 'Support', count: 35 },
  { id: 'finance', name: 'Finance', count: 28 },
  { id: 'hr', name: 'HR', count: 24 },
  { id: 'operations', name: 'Operations', count: 31 },
  { id: 'legal', name: 'Legal', count: 18 },
];

const FEATURED_AGENTS = [
  { id: 1, name: 'SalesCloser Pro', author: 'KayTx Labs', rating: 4.9, downloads: '12.5K', category: 'Sales', price: 'Free', featured: true },
  { id: 2, name: 'SupportGenius', author: 'AI Solutions', rating: 4.8, downloads: '8.2K', category: 'Support', price: '$19/mo', featured: true },
  { id: 3, name: 'MarketMaster', author: 'GrowthTeam', rating: 4.7, downloads: '6.1K', category: 'Marketing', price: '$29/mo', featured: false },
  { id: 4, name: 'FinanceGuard', author: 'FinTech AI', rating: 4.9, downloads: '4.8K', category: 'Finance', price: '$39/mo', featured: false },
];

const MY_AGENTS = [
  { id: 1, name: 'Custom Sales Rep', status: 'published', installs: 156 },
  { id: 2, name: 'Internal Helper', status: 'draft', installs: 0 },
];

export default function MarketplacePage() {
  const { theme } = useTheme();
  const router = useRouter();

  return (
    <ScrollView style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <View style={[styles.header, { borderBottomColor: theme.colors.border || '#E5E5EA' }]}>
        <View style={[styles.iconWrap, { backgroundColor: '#8B5CF620' }]}>
          <Store size={40} color="#8B5CF6" />
        </View>
        <Text style={[styles.title, { color: theme.colors.text }]}>Agent Marketplace</Text>
        <Text style={[styles.subtitle, { color: theme.colors.textSecondary }]}>Discover and deploy AI agents</Text>
      </View>

      <View style={[styles.searchBar, { backgroundColor: theme.colors.card || '#F2F2F7' }]}>
        <Search size={20} color={theme.colors.textSecondary} />
        <Text style={[styles.searchText, { color: theme.colors.textSecondary }]}>Search agents...</Text>
        <Filter size={20} color={theme.colors.textSecondary} />
      </View>

      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.categories}>
        {CATEGORIES.map((cat) => (
          <TouchableOpacity key={cat.id} style={[styles.catChip, { backgroundColor: theme.colors.card || '#F2F2F7' }]}>
            <Text style={[styles.catName, { color: theme.colors.text }]}>{cat.name}</Text>
            <Text style={[styles.catCount, { color: theme.colors.textSecondary }]}>{cat.count}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      <View style={[styles.section, { backgroundColor: theme.colors.card || '#F2F2F7' }]}>
        <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Featured Agents</Text>
        {FEATURED_AGENTS.map((agent) => (
          <TouchableOpacity key={agent.id} style={[styles.agentCard, { backgroundColor: theme.colors.background }]}>
            <View style={[styles.agentIcon, { backgroundColor: '#8B5CF620' }]}>
              <Zap size={24} color="#8B5CF6" />
            </View>
            <View style={styles.agentInfo}>
              <View style={styles.agentHeader}>
                <Text style={[styles.agentName, { color: theme.colors.text }]}>{agent.name}</Text>
                {agent.featured && <Award size={16} color="#FFD700" />}
              </View>
              <Text style={[styles.agentAuthor, { color: theme.colors.textSecondary }]}>{agent.author}</Text>
              <View style={styles.agentMeta}>
                <Star size={14} color="#F59E0B" />
                <Text style={[styles.rating, { color: theme.colors.text }]}>{agent.rating}</Text>
                <Download size={14} color={theme.colors.textSecondary} />
                <Text style={[styles.downloads, { color: theme.colors.textSecondary }]}>{agent.downloads}</Text>
              </View>
            </View>
            <View style={[styles.priceBadge, { backgroundColor: agent.price === 'Free' ? '#10B98120' : '#8B5CF620' }]}>
              <Text style={[styles.priceText, { color: agent.price === 'Free' ? '#10B981' : '#8B5CF6' }]}>{agent.price}</Text>
            </View>
          </TouchableOpacity>
        ))}
      </View>

      <View style={[styles.section, { backgroundColor: theme.colors.card || '#F2F2F7' }]}>
        <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>My Agents</Text>
        {MY_AGENTS.map((agent) => (
          <TouchableOpacity key={agent.id} style={[styles.myAgentCard, { backgroundColor: theme.colors.background }]}>
            <Text style={[styles.myAgentName, { color: theme.colors.text }]}>{agent.name}</Text>
            <View style={styles.myAgentMeta}>
              <View style={[styles.statusBadge, { backgroundColor: agent.status === 'published' ? '#10B98120' : '#F59E0B20' }]}>
                <Text style={[styles.statusText, { color: agent.status === 'published' ? '#10B981' : '#F59E0B' }]}>{agent.status}</Text>
              </View>
              {agent.installs > 0 && <Text style={[styles.installs, { color: theme.colors.textSecondary }]}>{agent.installs} installs</Text>}
            </View>
          </TouchableOpacity>
        ))}
        <TouchableOpacity style={[styles.publishBtn, { backgroundColor: '#8B5CF6' }]}>
          <Text style={styles.publishText}>Publish New Agent</Text>
        </TouchableOpacity>
      </View>

      <AgentFeatures agentId="marketplace" agentName="Agent Marketplace" />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  header: { alignItems: 'center', paddingVertical: 30, borderBottomWidth: 1 },
  iconWrap: { width: 80, height: 80, borderRadius: 40, justifyContent: 'center', alignItems: 'center', marginBottom: 16 },
  title: { fontSize: 26, fontWeight: 'bold' },
  subtitle: { fontSize: 14, marginTop: 4 },
  searchBar: { flexDirection: 'row', alignItems: 'center', margin: 16, padding: 14, borderRadius: 12, gap: 10 },
  searchText: { flex: 1, fontSize: 15 },
  categories: { paddingHorizontal: 16, marginBottom: 16 },
  catChip: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 14, paddingVertical: 8, borderRadius: 20, marginRight: 8, gap: 6 },
  catName: { fontSize: 14, fontWeight: '500' },
  catCount: { fontSize: 12 },
  section: { marginHorizontal: 16, marginBottom: 16, padding: 16, borderRadius: 16 },
  sectionTitle: { fontSize: 18, fontWeight: '700', marginBottom: 12 },
  agentCard: { flexDirection: 'row', alignItems: 'center', padding: 12, borderRadius: 12, marginBottom: 10 },
  agentIcon: { width: 48, height: 48, borderRadius: 12, justifyContent: 'center', alignItems: 'center', marginRight: 12 },
  agentInfo: { flex: 1 },
  agentHeader: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  agentName: { fontSize: 16, fontWeight: '600' },
  agentAuthor: { fontSize: 12, marginTop: 2 },
  agentMeta: { flexDirection: 'row', alignItems: 'center', gap: 8, marginTop: 4 },
  rating: { fontSize: 13, fontWeight: '600' },
  downloads: { fontSize: 12 },
  priceBadge: { paddingHorizontal: 10, paddingVertical: 4, borderRadius: 8 },
  priceText: { fontSize: 12, fontWeight: '600' },
  myAgentCard: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 14, borderRadius: 10, marginBottom: 8 },
  myAgentName: { fontSize: 15, fontWeight: '500' },
  myAgentMeta: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  statusBadge: { paddingHorizontal: 8, paddingVertical: 3, borderRadius: 6 },
  statusText: { fontSize: 11, fontWeight: '600' },
  installs: { fontSize: 12 },
  publishBtn: { paddingVertical: 14, borderRadius: 12, alignItems: 'center', marginTop: 10 },
  publishText: { color: '#fff', fontSize: 15, fontWeight: '600' },
});
