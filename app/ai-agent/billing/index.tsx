import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useTheme } from '@/providers/ThemeProvider';
import { CreditCard, DollarSign, TrendingUp, Zap, Users, Activity, Download, ChevronRight, CheckCircle2, AlertCircle } from 'lucide-react-native';
import { useRouter } from 'expo-router';
import AgentFeatures from '@/components/ai-agent/AgentFeatures';

const PLANS = [
  {
    id: 'starter',
    name: 'Starter',
    price: '$49',
    period: '/month',
    description: 'Perfect for small teams',
    color: '#3B82F6',
    features: ['10 AI Agents', '1,000 tasks/month', 'Basic analytics', 'Email support'],
    current: false,
  },
  {
    id: 'professional',
    name: 'Professional',
    price: '$199',
    period: '/month',
    description: 'For growing businesses',
    color: '#8B5CF6',
    features: ['50 AI Agents', '10,000 tasks/month', 'Advanced analytics', 'Priority support', 'Custom workflows'],
    current: true,
  },
  {
    id: 'enterprise',
    name: 'Enterprise',
    price: 'Custom',
    period: '',
    description: 'For large organizations',
    color: '#F59E0B',
    features: ['Unlimited agents', 'Unlimited tasks', 'Enterprise analytics', '24/7 dedicated support', 'Custom integrations', 'SLA guarantee'],
    current: false,
  },
];

const USAGE_STATS = [
  { label: 'Current Usage', value: '8,432', unit: 'tasks', percent: 84, color: '#8B5CF6' },
  { label: 'Active Agents', value: '42', unit: '/ 50', percent: 84, color: '#3B82F6' },
  { label: 'Storage Used', value: '78', unit: 'GB', percent: 78, color: '#10B981' },
];

const INVOICES = [
  { id: 'INV-2026-004', date: 'May 1, 2026', amount: '$199.00', status: 'paid' },
  { id: 'INV-2026-003', date: 'Apr 1, 2026', amount: '$199.00', status: 'paid' },
  { id: 'INV-2026-002', date: 'Mar 1, 2026', amount: '$199.00', status: 'paid' },
  { id: 'INV-2026-001', date: 'Feb 1, 2026', amount: '$199.00', status: 'paid' },
];

const SAVINGS_CALCULATOR = {
  hoursSaved: 2840,
  costPerHour: 50,
  totalSavings: 142000,
  roi: '712%',
};

export default function BillingPage() {
  const { theme } = useTheme();
  const router = useRouter();

  return (
    <ScrollView style={[styles.container, { backgroundColor: theme.colors.background }]}>
      {/* Header */}
      <View style={[styles.header, { borderBottomColor: theme.colors.border || '#E5E5EA' }]}>
        <View style={styles.headerTop}>
          <View>
            <Text style={[styles.headerTitle, { color: theme.colors.text }]}>Billing & Usage</Text>
            <Text style={[styles.headerSubtitle, { color: theme.colors.textSecondary }]}>
              Manage your subscription and view usage
            </Text>
          </View>
          <TouchableOpacity style={styles.downloadBtn}>
            <Download size={20} color={theme.colors.text} />
          </TouchableOpacity>
        </View>

        {/* Current Plan Card */}
        <View style={[styles.currentPlan, { backgroundColor: '#8B5CF620' }]}>
          <View style={styles.planHeader}>
            <View>
              <Text style={[styles.planLabel, { color: theme.colors.textSecondary }]}>Current Plan</Text>
              <Text style={[styles.planName, { color: theme.colors.text }]}>Professional</Text>
            </View>
            <View style={[styles.planBadge, { backgroundColor: '#8B5CF6' }]}>
              <Text style={styles.planBadgeText}>Active</Text>
            </View>
          </View>
          <Text style={[styles.planPrice, { color: theme.colors.text }]}>$199<Text style={[styles.planPeriod, { color: theme.colors.textSecondary }]}>/month</Text></Text>
          <Text style={[styles.renewalText, { color: theme.colors.textSecondary }]}>
            Renews on June 1, 2026
          </Text>
        </View>
      </View>

      {/* Usage Stats */}
      <View style={[styles.section, { backgroundColor: theme.colors.card || '#F2F2F7' }]}>
        <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Usage This Month</Text>
        <View style={styles.usageGrid}>
          {USAGE_STATS.map((stat) => (
            <View key={stat.label} style={[styles.usageCard, { backgroundColor: theme.colors.background }]}>
              <View style={styles.usageHeader}>
                <Text style={[styles.usageLabel, { color: theme.colors.textSecondary }]}>{stat.label}</Text>
                <Text style={[styles.usagePercent, { color: stat.color }]}>{stat.percent}%</Text>
              </View>
              <View style={styles.usageBar}>
                <View style={[styles.usageFill, { width: `${stat.percent}%`, backgroundColor: stat.color }]} />
              </View>
              <Text style={[styles.usageValue, { color: theme.colors.text }]}>
                {stat.value} <Text style={[styles.usageUnit, { color: theme.colors.textSecondary }]}>{stat.unit}</Text>
              </Text>
            </View>
          ))}
        </View>
      </View>

      {/* ROI Calculator */}
      <View style={[styles.section, { backgroundColor: '#10B98120' }]}>
        <View style={styles.roiHeader}>
          <View style={[styles.roiIcon, { backgroundColor: '#10B981' }]}>
            <TrendingUp size={24} color="#fff" />
          </View>
          <View>
            <Text style={[styles.roiTitle, { color: theme.colors.text }]}>AI Workforce ROI</Text>
            <Text style={[styles.roiSubtitle, { color: theme.colors.textSecondary }]}>
              Estimated savings this month
            </Text>
          </View>
        </View>
        <View style={styles.roiGrid}>
          <View style={styles.roiItem}>
            <Text style={[styles.roiValue, { color: theme.colors.text }]}>{SAVINGS_CALCULATOR.hoursSaved.toLocaleString()}</Text>
            <Text style={[styles.roiLabel, { color: theme.colors.textSecondary }]}>Hours Saved</Text>
          </View>
          <View style={styles.roiItem}>
            <Text style={[styles.roiValue, { color: '#10B981' }]}>${(SAVINGS_CALCULATOR.totalSavings / 1000).toFixed(0)}K</Text>
            <Text style={[styles.roiLabel, { color: theme.colors.textSecondary }]}>Cost Savings</Text>
          </View>
          <View style={styles.roiItem}>
            <Text style={[styles.roiValue, { color: '#F59E0B' }]}>{SAVINGS_CALCULATOR.roi}</Text>
            <Text style={[styles.roiLabel, { color: theme.colors.textSecondary }]}>ROI</Text>
          </View>
        </View>
      </View>

      {/* Plans Comparison */}
      <View style={[styles.section, { backgroundColor: theme.colors.card || '#F2F2F7' }]}>
        <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Plans</Text>
        {PLANS.map((plan) => (
          <View key={plan.id} style={[styles.planCard, { backgroundColor: theme.colors.background }, plan.current && { borderColor: plan.color, borderWidth: 2 }]}>
            <View style={styles.planCardHeader}>
              <View>
                <Text style={[styles.planCardName, { color: theme.colors.text }]}>{plan.name}</Text>
                <Text style={[styles.planCardDesc, { color: theme.colors.textSecondary }]}>{plan.description}</Text>
              </View>
              <View style={styles.planCardPrice}>
                <Text style={[styles.planCardAmount, { color: plan.color }]}>{plan.price}</Text>
                <Text style={[styles.planCardPeriod, { color: theme.colors.textSecondary }]}>{plan.period}</Text>
              </View>
            </View>
            <View style={styles.featuresList}>
              {plan.features.map((feature, i) => (
                <View key={i} style={styles.featureItem}>
                  <CheckCircle2 size={14} color={plan.color} />
                  <Text style={[styles.featureText, { color: theme.colors.textSecondary }]}>{feature}</Text>
                </View>
              ))}
            </View>
            {plan.current ? (
              <View style={[styles.currentBadge, { backgroundColor: plan.color + '20' }]}>
                <Text style={[styles.currentBadgeText, { color: plan.color }]}>Current Plan</Text>
              </View>
            ) : (
              <TouchableOpacity style={[styles.upgradeBtn, { backgroundColor: plan.color }]}>
                <Text style={styles.upgradeBtnText}>
                  {plan.id === 'enterprise' ? 'Contact Sales' : 'Upgrade'}
                </Text>
              </TouchableOpacity>
            )}
          </View>
        ))}
      </View>

      {/* Invoices */}
      <View style={[styles.section, { backgroundColor: theme.colors.card || '#F2F2F7' }]}>
        <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Recent Invoices</Text>
        {INVOICES.map((invoice) => (
          <TouchableOpacity key={invoice.id} style={[styles.invoiceItem, { backgroundColor: theme.colors.background }]}>
            <View style={styles.invoiceInfo}>
              <Text style={[styles.invoiceId, { color: theme.colors.text }]}>{invoice.id}</Text>
              <Text style={[styles.invoiceDate, { color: theme.colors.textSecondary }]}>{invoice.date}</Text>
            </View>
            <Text style={[styles.invoiceAmount, { color: theme.colors.text }]}>{invoice.amount}</Text>
            <View style={[styles.invoiceStatus, { backgroundColor: invoice.status === 'paid' ? '#10B98120' : '#F59E0B20' }]}>
              <Text style={[styles.invoiceStatusText, { color: invoice.status === 'paid' ? '#10B981' : '#F59E0B' }]}>
                {invoice.status}
              </Text>
            </View>
          </TouchableOpacity>
        ))}
        <TouchableOpacity style={styles.viewAllBtn}>
          <Text style={[styles.viewAllText, { color: '#3B82F6' }]}>View All Invoices</Text>
        </TouchableOpacity>
      </View>

      {/* Payment Method */}
      <TouchableOpacity style={[styles.paymentCard, { backgroundColor: theme.colors.card || '#F2F2F7' }]}>
        <View style={styles.paymentInfo}>
          <View style={[styles.cardIcon, { backgroundColor: '#3B82F6' }]}>
            <CreditCard size={20} color="#fff" />
          </View>
          <View>
            <Text style={[styles.paymentTitle, { color: theme.colors.text }]}>Payment Method</Text>
            <Text style={[styles.paymentDesc, { color: theme.colors.textSecondary }]}>
              Visa ending in 4242
            </Text>
          </View>
        </View>
        <ChevronRight size={20} color={theme.colors.textSecondary} />
      </TouchableOpacity>

      <AgentFeatures agentId="billing" agentName="Billing & Usage" />
      <View style={{ height: 40 }} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  header: { padding: 20, borderBottomWidth: 1 },
  headerTop: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 },
  headerTitle: { fontSize: 26, fontWeight: 'bold' },
  headerSubtitle: { fontSize: 14, marginTop: 2 },
  downloadBtn: { width: 44, height: 44, borderRadius: 22, justifyContent: 'center', alignItems: 'center', backgroundColor: '#00000010' },
  currentPlan: { padding: 20, borderRadius: 16 },
  planHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 },
  planLabel: { fontSize: 13 },
  planName: { fontSize: 20, fontWeight: 'bold', marginTop: 2 },
  planBadge: { paddingHorizontal: 12, paddingVertical: 4, borderRadius: 12 },
  planBadgeText: { color: '#fff', fontSize: 12, fontWeight: '600' },
  planPrice: { fontSize: 32, fontWeight: 'bold' },
  planPeriod: { fontSize: 16, fontWeight: 'normal' },
  renewalText: { fontSize: 13, marginTop: 4 },
  section: { marginHorizontal: 16, marginBottom: 16, padding: 20, borderRadius: 16 },
  sectionTitle: { fontSize: 18, fontWeight: '700', marginBottom: 14 },
  usageGrid: { gap: 12 },
  usageCard: { padding: 14, borderRadius: 12 },
  usageHeader: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 8 },
  usageLabel: { fontSize: 13 },
  usagePercent: { fontSize: 13, fontWeight: '600' },
  usageBar: { height: 6, backgroundColor: '#E5E5EA', borderRadius: 3, marginBottom: 8 },
  usageFill: { height: '100%', borderRadius: 3 },
  usageValue: { fontSize: 20, fontWeight: 'bold' },
  usageUnit: { fontSize: 14, fontWeight: 'normal' },
  roiHeader: { flexDirection: 'row', alignItems: 'center', gap: 12, marginBottom: 16 },
  roiIcon: { width: 48, height: 48, borderRadius: 12, justifyContent: 'center', alignItems: 'center' },
  roiTitle: { fontSize: 18, fontWeight: '600' },
  roiSubtitle: { fontSize: 13, marginTop: 2 },
  roiGrid: { flexDirection: 'row', gap: 20 },
  roiItem: { flex: 1 },
  roiValue: { fontSize: 22, fontWeight: 'bold' },
  roiLabel: { fontSize: 12, marginTop: 2 },
  planCard: { padding: 16, borderRadius: 14, marginBottom: 12 },
  planCardHeader: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 12 },
  planCardName: { fontSize: 18, fontWeight: '600' },
  planCardDesc: { fontSize: 12, marginTop: 2 },
  planCardPrice: { alignItems: 'flex-end' },
  planCardAmount: { fontSize: 24, fontWeight: 'bold' },
  planCardPeriod: { fontSize: 12 },
  featuresList: { marginBottom: 12 },
  featureItem: { flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: 6 },
  featureText: { fontSize: 13 },
  currentBadge: { alignSelf: 'flex-start', paddingHorizontal: 12, paddingVertical: 6, borderRadius: 8 },
  currentBadgeText: { fontSize: 13, fontWeight: '600' },
  upgradeBtn: { paddingVertical: 12, borderRadius: 10, alignItems: 'center' },
  upgradeBtnText: { color: '#fff', fontSize: 15, fontWeight: '600' },
  invoiceItem: { flexDirection: 'row', alignItems: 'center', padding: 14, borderRadius: 10, marginBottom: 8 },
  invoiceInfo: { flex: 1 },
  invoiceId: { fontSize: 14, fontWeight: '500' },
  invoiceDate: { fontSize: 12, marginTop: 2 },
  invoiceAmount: { fontSize: 15, fontWeight: '600', marginRight: 12 },
  invoiceStatus: { paddingHorizontal: 10, paddingVertical: 4, borderRadius: 8 },
  invoiceStatusText: { fontSize: 11, fontWeight: '600', textTransform: 'capitalize' },
  viewAllBtn: { alignItems: 'center', marginTop: 8, paddingVertical: 8 },
  viewAllText: { fontSize: 14, fontWeight: '600' },
  paymentCard: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginHorizontal: 16, marginBottom: 16, padding: 16, borderRadius: 16 },
  paymentInfo: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  cardIcon: { width: 40, height: 40, borderRadius: 10, justifyContent: 'center', alignItems: 'center' },
  paymentTitle: { fontSize: 15, fontWeight: '600' },
  paymentDesc: { fontSize: 13, marginTop: 1 },
});
