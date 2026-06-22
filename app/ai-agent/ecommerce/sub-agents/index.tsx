import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useTheme } from '@/providers/ThemeProvider';
import { Activity, ShoppingBag, ArrowRight, Users } from 'lucide-react-native';
import { useRouter } from 'expo-router';

export default function SubAgentsIndex() {
  const { theme } = useTheme();
  const router = useRouter();

  const subAgents = [
    { id: 'product-listing-specialist', name: 'Product Listing Specialist', route: '/ai-agent/ecommerce/sub-agents/product-listing-specialist' },
    { id: 'category-manager', name: 'Category Manager', route: '/ai-agent/ecommerce/sub-agents/category-manager' },
    { id: 'seo-specialist', name: 'SEO Specialist', route: '/ai-agent/ecommerce/sub-agents/seo-specialist' },
    { id: 'ppc-campaign-manager', name: 'PPC Campaign Manager', route: '/ai-agent/ecommerce/sub-agents/ppc-campaign-manager' },
    { id: 'social-media-manager', name: 'Social Media Manager', route: '/ai-agent/ecommerce/sub-agents/social-media-manager' },
    { id: 'email-marketing-specialist', name: 'Email Marketing Specialist', route: '/ai-agent/ecommerce/sub-agents/email-marketing-specialist' },
    { id: 'content-creator', name: 'Content Creator', route: '/ai-agent/ecommerce/sub-agents/content-creator' },
    { id: 'photographer-coordinator', name: 'Photographer Coordinator', route: '/ai-agent/ecommerce/sub-agents/photographer-coordinator' },
    { id: 'video-producer', name: 'Video Producer', route: '/ai-agent/ecommerce/sub-agents/video-producer' },
    { id: 'copywriter', name: 'Copywriter', route: '/ai-agent/ecommerce/sub-agents/copywriter' },
    { id: 'customer-service-agent', name: 'Customer Service Agent', route: '/ai-agent/ecommerce/sub-agents/customer-service-agent' },
    { id: 'live-chat-agent', name: 'Live Chat Agent', route: '/ai-agent/ecommerce/sub-agents/live-chat-agent' },
    { id: 'returns-processor', name: 'Returns Processor', route: '/ai-agent/ecommerce/sub-agents/returns-processor' },
    { id: 'refund-specialist', name: 'Refund Specialist', route: '/ai-agent/ecommerce/sub-agents/refund-specialist' },
    { id: 'exchange-coordinator', name: 'Exchange Coordinator', route: '/ai-agent/ecommerce/sub-agents/exchange-coordinator' },
    { id: 'warehouse-manager', name: 'Warehouse Manager', route: '/ai-agent/ecommerce/sub-agents/warehouse-manager' },
    { id: 'shipping-coordinator', name: 'Shipping Coordinator', route: '/ai-agent/ecommerce/sub-agents/shipping-coordinator' },
    { id: 'last-mile-delivery-agent', name: 'Last Mile Delivery Agent', route: '/ai-agent/ecommerce/sub-agents/last-mile-delivery-agent' },
    { id: 'tracking-specialist', name: 'Tracking Specialist', route: '/ai-agent/ecommerce/sub-agents/tracking-specialist' },
    { id: 'inventory-planner', name: 'Inventory Planner', route: '/ai-agent/ecommerce/sub-agents/inventory-planner' },
    { id: 'stock-replenisher', name: 'Stock Replenisher', route: '/ai-agent/ecommerce/sub-agents/stock-replenisher' },
    { id: 'demand-forecaster', name: 'Demand Forecaster', route: '/ai-agent/ecommerce/sub-agents/demand-forecaster' },
    { id: 'supplier-manager', name: 'Supplier Manager', route: '/ai-agent/ecommerce/sub-agents/supplier-manager' },
    { id: 'quality-control-specialist', name: 'Quality Control Specialist', route: '/ai-agent/ecommerce/sub-agents/quality-control-specialist' },
    { id: 'fraud-detection-agent', name: 'Fraud Detection Agent', route: '/ai-agent/ecommerce/sub-agents/fraud-detection-agent' },
    { id: 'payment-processing-agent', name: 'Payment Processing Agent', route: '/ai-agent/ecommerce/sub-agents/payment-processing-agent' },
    { id: 'checkout-optimization-specialist', name: 'Checkout Optimization Specialist', route: '/ai-agent/ecommerce/sub-agents/checkout-optimization-specialist' },
    { id: 'conversion-rate-optimizer', name: 'Conversion Rate Optimizer', route: '/ai-agent/ecommerce/sub-agents/conversion-rate-optimizer' },
    { id: 'ab-testing-specialist', name: 'A/B Testing Specialist', route: '/ai-agent/ecommerce/sub-agents/ab-testing-specialist' },
    { id: 'user-experience-designer', name: 'User Experience Designer', route: '/ai-agent/ecommerce/sub-agents/user-experience-designer' },
    { id: 'mobile-app-manager', name: 'Mobile App Manager', route: '/ai-agent/ecommerce/sub-agents/mobile-app-manager' },
    { id: 'marketplace-integration-specialist', name: 'Marketplace Integration Specialist', route: '/ai-agent/ecommerce/sub-agents/marketplace-integration-specialist' },
    { id: 'multi-channel-manager', name: 'Multi-Channel Manager', route: '/ai-agent/ecommerce/sub-agents/multi-channel-manager' },
    { id: 'dropshipping-coordinator', name: 'Dropshipping Coordinator', route: '/ai-agent/ecommerce/sub-agents/dropshipping-coordinator' },
    { id: 'wholesale-manager', name: 'Wholesale Manager', route: '/ai-agent/ecommerce/sub-agents/wholesale-manager' },
    { id: 'b2b-sales-agent', name: 'B2B Sales Agent', route: '/ai-agent/ecommerce/sub-agents/b2b-sales-agent' },
    { id: 'affiliate-manager', name: 'Affiliate Manager', route: '/ai-agent/ecommerce/sub-agents/affiliate-manager' },
    { id: 'influencer-coordinator', name: 'Influencer Coordinator', route: '/ai-agent/ecommerce/sub-agents/influencer-coordinator' },
    { id: 'review-management-agent', name: 'Review Management Agent', route: '/ai-agent/ecommerce/sub-agents/review-management-agent' },
    { id: 'cross-selling-specialist', name: 'Cross-Selling Specialist', route: '/ai-agent/ecommerce/sub-agents/cross-selling-specialist' },
    { id: 'upselling-specialist', name: 'Upselling Specialist', route: '/ai-agent/ecommerce/sub-agents/upselling-specialist' },
    { id: 'customer-retention-agent', name: 'Customer Retention Agent', route: '/ai-agent/ecommerce/sub-agents/customer-retention-agent' },
  ];

  return (
    <ScrollView style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <View style={[styles.hero, { borderBottomColor: theme.colors.border || '#E5E5EA' }]}>
        <View style={[styles.heroIconWrap, { backgroundColor: '#E91E6315' }]}><ShoppingBag size={48} color="#E91E63" /></View>
        <Text style={[styles.heroTitle, { color: theme.colors.text }]}>E-Commerce - Sub-Agents</Text>
        <Text style={[styles.heroSubtitle, { color: theme.colors.textSecondary }]}>Helper & Sub-Agent Workforce</Text>
        <View style={styles.badgesRow}>
          <View style={[styles.badge, { backgroundColor: '#34C75922' }]}><Activity size={12} color="#34C759" /><Text style={[styles.badgeText, { color: '#34C759' }]}>Active</Text></View>
          <View style={[styles.badge, { backgroundColor: '#E91E6322' }]}><Users size={12} color="#E91E63" /><Text style={[styles.badgeText, { color: '#E91E63' }]}>42 Agents</Text></View>
        </View>
      </View>
      <View style={[styles.section, { backgroundColor: theme.colors.card || '#F2F2F7' }]}>
        <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Sub-Agents</Text>
        {subAgents.map((agent) => (
          <TouchableOpacity key={agent.id} onPress={() => router.push(agent.route as any)} style={[styles.agentCard, { backgroundColor: theme.colors.background || '#F2F2F7' }]}>
            <View style={[styles.agentIcon, { backgroundColor: '#E91E6320' }]}><ShoppingBag size={28} color="#E91E63" /></View>
            <View style={styles.agentInfo}>
              <Text style={[styles.agentName, { color: theme.colors.text }]}>{agent.name}</Text>
              <Text style={[styles.agentDesc, { color: theme.colors.textSecondary }]}>Sub-Agent</Text>
            </View>
            <ArrowRight size={20} color={theme.colors.textSecondary} />
          </TouchableOpacity>
        ))}
      </View>
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
});
