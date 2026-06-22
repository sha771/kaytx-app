import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useTheme } from '@/providers/ThemeProvider';
import { ShoppingBag, Activity, Users } from 'lucide-react-native';
import { useRouter } from 'expo-router';

export default function ECommerceIndex() {
  const { theme } = useTheme();
  const router = useRouter();

  const mainAgents = [
    { id: 'chief-ecommerce-officer', name: 'Chief E-Commerce Officer', route: '/ai-agent/ecommerce/chief-ecommerce-officer' },
    { id: 'vp-marketplace-operations', name: 'VP Marketplace Operations', route: '/ai-agent/ecommerce/vp-marketplace-operations' },
    { id: 'vp-digital-sales', name: 'VP Digital Sales', route: '/ai-agent/ecommerce/vp-digital-sales' },
    { id: 'vp-customer-experience', name: 'VP Customer Experience', route: '/ai-agent/ecommerce/vp-customer-experience' },
    { id: 'vp-logistics-fulfillment', name: 'VP Logistics & Fulfillment', route: '/ai-agent/ecommerce/vp-logistics-fulfillment' },
    { id: 'vp-product-management', name: 'VP Product Management', route: '/ai-agent/ecommerce/vp-product-management' },
    { id: 'store-manager', name: 'Store Manager', route: '/ai-agent/ecommerce/store-manager' },
    { id: 'inventory-manager', name: 'Inventory Manager', route: '/ai-agent/ecommerce/inventory-manager' },
    { id: 'order-processing-manager', name: 'Order Processing Manager', route: '/ai-agent/ecommerce/order-processing-manager' },
    { id: 'customer-support-lead', name: 'Customer Support Lead', route: '/ai-agent/ecommerce/customer-support-lead' },
    { id: 'marketing-manager', name: 'Marketing Manager', route: '/ai-agent/ecommerce/marketing-manager' },
    { id: 'pricing-strategist', name: 'Pricing Strategist', route: '/ai-agent/ecommerce/pricing-strategist' },
    { id: 'analytics-manager', name: 'Analytics Manager', route: '/ai-agent/ecommerce/analytics-manager' },
    { id: 'returns-refunds-manager', name: 'Returns & Refunds Manager', route: '/ai-agent/ecommerce/returns-refunds-manager' },
  ];

  return (
    <ScrollView style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <View style={[styles.hero, { borderBottomColor: theme.colors.border || '#E5E5EA' }]}>
        <View style={[styles.heroIconWrap, { backgroundColor: '#E91E6315' }]}><ShoppingBag size={48} color="#E91E63" /></View>
        <Text style={[styles.heroTitle, { color: theme.colors.text }]}>E-Commerce Department</Text>
        <Text style={[styles.heroSubtitle, { color: theme.colors.textSecondary }]}>Digital Commerce & Sales Operations</Text>
        <View style={styles.badgesRow}>
          <View style={[styles.badge, { backgroundColor: '#34C75922' }]}><Activity size={12} color="#34C759" /><Text style={[styles.badgeText, { color: '#34C759' }]}>Active</Text></View>
          <View style={[styles.badge, { backgroundColor: '#E91E6322' }]}><Users size={12} color="#E91E63" /><Text style={[styles.badgeText, { color: '#E91E63' }]}>14 Main Agents</Text></View>
        </View>
      </View>
      <View style={[styles.section, { backgroundColor: theme.colors.card || '#F2F2F7' }]}>
        <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Main Agents</Text>
        {mainAgents.map((agent) => (
          <TouchableOpacity key={agent.id} onPress={() => router.push(agent.route as any)} style={[styles.agentCard, { backgroundColor: theme.colors.background || '#F2F2F7' }]}>
            <View style={[styles.agentIcon, { backgroundColor: '#E91E6320' }]}><ShoppingBag size={28} color="#E91E63" /></View>
            <View style={styles.agentInfo}>
              <Text style={[styles.agentName, { color: theme.colors.text }]}>{agent.name}</Text>
              <Text style={[styles.agentDesc, { color: theme.colors.textSecondary }]}>E-Commerce Agent</Text>
            </View>
          </TouchableOpacity>
        ))}
      </View>
      <TouchableOpacity onPress={() => router.push('/ai-agent/ecommerce/sub-agents' as any)} style={[styles.subAgentsBtn, { backgroundColor: '#E91E63' }]}>
        <Text style={styles.subAgentsBtnText}>View 42 Sub-Agents</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  hero: { alignItems: 'center', paddingVertical: 32, paddingHorizontal: 20, borderBottomWidth: 1 },
  heroIconWrap: { width: 88, height: 88, borderRadius: 44, justifyContent: 'center', alignItems: 'center', marginBottom: 16 },
  heroTitle: { fontSize: 26, fontWeight: 'bold' },
  heroSubtitle: { fontSize: 15, marginTop: 4, fontWeight: '500' },
  badgesRow: { flexDirection: 'row', gap: 10, marginTop: 16 },
  badge: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 10, paddingVertical: 5, borderRadius: 20, gap: 4 },
  badgeText: { fontSize: 12, fontWeight: '600' },
  section: { marginHorizontal: 16, marginBottom: 16, padding: 20, borderRadius: 16 },
  sectionTitle: { fontSize: 18, fontWeight: '700', marginBottom: 14 },
  agentCard: { flexDirection: 'row', alignItems: 'center', padding: 16, borderRadius: 12, marginBottom: 12 },
  agentIcon: { width: 48, height: 48, borderRadius: 12, alignItems: 'center', justifyContent: 'center' },
  agentInfo: { flex: 1, marginLeft: 12 },
  agentName: { fontSize: 16, fontWeight: '600' },
  agentDesc: { fontSize: 12, marginTop: 2 },
  subAgentsBtn: { marginHorizontal: 16, marginBottom: 24, padding: 16, borderRadius: 12, alignItems: 'center' },
  subAgentsBtnText: { color: '#fff', fontSize: 16, fontWeight: '600' },
});
