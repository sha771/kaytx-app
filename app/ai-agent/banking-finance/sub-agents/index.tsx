import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useTheme } from '@/providers/ThemeProvider';
import { Activity, DollarSign, ArrowRight, Briefcase, Users } from 'lucide-react-native';
import { useRouter } from 'expo-router';

export default function SubAgentsIndex() {
  const { theme } = useTheme();
  const router = useRouter();

  const subAgents = [
    { id: 'mortgage-specialist', name: 'Mortgage Specialist', route: '/ai-agent/banking-finance/sub-agents/mortgage-specialist' },
    { id: 'savings-account-manager', name: 'Savings Account Manager', route: '/ai-agent/banking-finance/sub-agents/savings-account-manager' },
    { id: 'credit-card-specialist', name: 'Credit Card Specialist', route: '/ai-agent/banking-finance/sub-agents/credit-card-specialist' },
    { id: 'personal-banker', name: 'Personal Banker', route: '/ai-agent/banking-finance/sub-agents/personal-banker' },
    { id: 'business-banker', name: 'Business Banker', route: '/ai-agent/banking-finance/sub-agents/business-banker' },
    { id: 'loan-processor', name: 'Loan Processor', route: '/ai-agent/banking-finance/sub-agents/loan-processor' },
    { id: 'underwriter', name: 'Underwriter', route: '/ai-agent/banking-finance/sub-agents/underwriter' },
    { id: 'collections-agent', name: 'Collections Agent', route: '/ai-agent/banking-finance/sub-agents/collections-agent' },
    { id: 'kyc-specialist', name: 'KYC Specialist', route: '/ai-agent/banking-finance/sub-agents/kyc-specialist' },
    { id: 'aml-analyst', name: 'AML Analyst', route: '/ai-agent/banking-finance/sub-agents/aml-analyst' },
    { id: 'regulatory-reporter', name: 'Regulatory Reporter', route: '/ai-agent/banking-finance/sub-agents/regulatory-reporter' },
    { id: 'audit-specialist', name: 'Audit Specialist', route: '/ai-agent/banking-finance/sub-agents/audit-specialist' },
    { id: 'treasury-analyst', name: 'Treasury Analyst', route: '/ai-agent/banking-finance/sub-agents/treasury-analyst' },
    { id: 'liquidity-manager', name: 'Liquidity Manager', route: '/ai-agent/banking-finance/sub-agents/liquidity-manager' },
    { id: 'interest-rate-specialist', name: 'Interest Rate Specialist', route: '/ai-agent/banking-finance/sub-agents/interest-rate-specialist' },
    { id: 'foreign-exchange-trader', name: 'Foreign Exchange Trader', route: '/ai-agent/banking-finance/sub-agents/foreign-exchange-trader' },
    { id: 'derivatives-specialist', name: 'Derivatives Specialist', route: '/ai-agent/banking-finance/sub-agents/derivatives-specialist' },
    { id: 'portfolio-manager', name: 'Portfolio Manager', route: '/ai-agent/banking-finance/sub-agents/portfolio-manager' },
    { id: 'wealth-advisor', name: 'Wealth Advisor', route: '/ai-agent/banking-finance/sub-agents/wealth-advisor' },
    { id: 'private-banker', name: 'Private Banker', route: '/ai-agent/banking-finance/sub-agents/private-banker' },
    { id: 'investment-advisor', name: 'Investment Advisor', route: '/ai-agent/banking-finance/sub-agents/investment-advisor' },
    { id: 'trust-officer', name: 'Trust Officer', route: '/ai-agent/banking-finance/sub-agents/trust-officer' },
    { id: 'estate-planner', name: 'Estate Planner', route: '/ai-agent/banking-finance/sub-agents/estate-planner' },
    { id: 'relationship-manager', name: 'Relationship Manager', route: '/ai-agent/banking-finance/sub-agents/relationship-manager' },
    { id: 'digital-banking-specialist', name: 'Digital Banking Specialist', route: '/ai-agent/banking-finance/sub-agents/digital-banking-specialist' },
    { id: 'mobile-banking-manager', name: 'Mobile Banking Manager', route: '/ai-agent/banking-finance/sub-agents/mobile-banking-manager' },
    { id: 'atm-network-manager', name: 'ATM Network Manager', route: '/ai-agent/banking-finance/sub-agents/atm-network-manager' },
    { id: 'payment-systems-manager', name: 'Payment Systems Manager', route: '/ai-agent/banking-finance/sub-agents/payment-systems-manager' },
    { id: 'wire-transfer-specialist', name: 'Wire Transfer Specialist', route: '/ai-agent/banking-finance/sub-agents/wire-transfer-specialist' },
    { id: 'check-processing-agent', name: 'Check Processing Agent', route: '/ai-agent/banking-finance/sub-agents/check-processing-agent' },
    { id: 'cash-management-specialist', name: 'Cash Management Specialist', route: '/ai-agent/banking-finance/sub-agents/cash-management-specialist' },
    { id: 'trade-finance-specialist', name: 'Trade Finance Specialist', route: '/ai-agent/banking-finance/sub-agents/trade-finance-specialist' },
    { id: 'syndications-manager', name: 'Syndications Manager', route: '/ai-agent/banking-finance/sub-agents/syndications-manager' },
    { id: 'securitization-specialist', name: 'Securitization Specialist', route: '/ai-agent/banking-finance/sub-agents/securitization-specialist' },
    { id: 'capital-markets-analyst', name: 'Capital Markets Analyst', route: '/ai-agent/banking-finance/sub-agents/capital-markets-analyst' },
    { id: 'structured-finance-agent', name: 'Structured Finance Agent', route: '/ai-agent/banking-finance/sub-agents/structured-finance-agent' },
  ];

  return (
    <ScrollView style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <View style={[styles.hero, { borderBottomColor: theme.colors.border || '#E5E5EA' }]}>
        <View style={[styles.heroIconWrap, { backgroundColor: '#1565C015' }]}><DollarSign size={48} color="#1565C0" /></View>
        <Text style={[styles.heroTitle, { color: theme.colors.text }]}>Banking & Finance - Sub-Agents</Text>
        <Text style={[styles.heroSubtitle, { color: theme.colors.textSecondary }]}>Helper & Sub-Agent Workforce</Text>
        <View style={styles.badgesRow}>
          <View style={[styles.badge, { backgroundColor: '#34C75922' }]}><Activity size={12} color="#34C759" /><Text style={[styles.badgeText, { color: '#34C759' }]}>Active</Text></View>
          <View style={[styles.badge, { backgroundColor: '#1565C022' }]}><Users size={12} color="#1565C0" /><Text style={[styles.badgeText, { color: '#1565C0' }]}>36 Agents</Text></View>
        </View>
      </View>
      <View style={[styles.section, { backgroundColor: theme.colors.card || '#F2F2F7' }]}>
        <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Sub-Agents</Text>
        {subAgents.map((agent) => (
          <TouchableOpacity key={agent.id} onPress={() => router.push(agent.route as any)} style={[styles.agentCard, { backgroundColor: theme.colors.background || '#F2F2F7' }]}>
            <View style={[styles.agentIcon, { backgroundColor: '#1565C020' }]}><DollarSign size={28} color="#1565C0" /></View>
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
