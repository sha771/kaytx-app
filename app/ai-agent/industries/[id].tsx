import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native';
import { Stack, useLocalSearchParams, router } from 'expo-router';
import { useTheme } from '@/providers/ThemeProvider';
import { LinearGradient } from 'expo-linear-gradient';
import { ArrowLeft, CheckCircle, ArrowRight, Shield, Zap, Users , Activity, ShoppingBag, Wifi } from 'lucide-react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';



import { trpc } from '@/lib/trpc';

// This would typically come from a constant file or API
const INDUSTRY_DATA: Record<string, any> = {
  'financial-services': {
    name: 'Financial Services',
    tagline: 'Secure, Compliant, Automated Financial Operations',
    description: 'Handle ID checks, card issues, and claims securely at scale. Deployed with bank-grade encryption and full audit trails.',
    icon: Shield,
    color: '#007AFF',
    stats: [
      { label: 'Fraud Reduction', value: '99.8%' },
      { label: 'Process Cost', value: '-60%' },
      { label: 'Compliance', value: '100%' }
    ],
    features: [
      'Automated KYC/AML Verification',
      'Instant Claims Processing',
      '24/7 Wealth Management Support',
      'Regulatory Reporting Automation'
    ],
    recommendedAgents: ['ai-manager', 'ai-data-analyst']
  },
  'utilities': {
    name: 'Utilities',
    tagline: 'Grid-Scale Support & Outage Management',
    description: 'Automate high-volume outage reporting and billing questions without wait times. predictive maintenance alerts integrated.',
    icon: Zap,
    color: '#FF9500',
    stats: [
      { label: 'Response Time', value: '<1s' },
      { label: 'Call Deflection', value: '85%' },
      { label: 'Uptime', value: '99.99%' }
    ],
    features: [
      'Real-time Outage Maps & Alerts',
      'Smart Meter Billing Analysis',
      'Field Crew Dispatch Automation',
      'Emergency Response Coordination'
    ],
    recommendedAgents: ['ai-receptionist', 'ai-ops-manager']
  },
  'healthcare': {
    name: 'Healthcare',
    tagline: 'Patient-First AI Care Coordination',
    description: 'Streamline appointment bookings, prescription refills, and patient support with HIPAA-compliant autonomous agents.',
    icon: Activity,
    color: '#FF3B30',
    stats: [
      { label: 'Patient Sat', value: '4.8/5' },
      { label: 'No-Shows', value: '-45%' },
      { label: 'Admin Time', value: '-12h/wk' }
    ],
    features: [
      'Zero-Wait Appointment Booking',
      'Triage & Symptom Checking',
      'Insurance Verification',
      'Post-Op Follow-up Automation'
    ],
    recommendedAgents: ['ai-receptionist', 'ai-data-analyst']
  },
  'ecommerce': {
    name: 'eCommerce & Retail',
    tagline: 'Hyper-Personalized Shopping Concierge',
    description: 'Manage returns, track orders, and provide personalized product recommendations 24/7.',
    icon: ShoppingBag,
    color: '#34C759',
    stats: [
      { label: 'Conv. Rate', value: '+22%' },
      { label: 'Support Cost', value: '-70%' },
      { label: 'CSAT', value: '95%' }
    ],
    features: [
      'Instant Order Tracking',
      'Visual Product Search',
      'Automated Returns & Refunds',
      'Cart Abandonment Recovery'
    ],
    recommendedAgents: ['ai-sales-rep', 'ai-cmo']
  },
  'telecommunications': {
    name: 'Telecommunications',
    tagline: 'Next-Gen Network Support',
    description: 'Resolve connectivity issues and optimize plans automatically. Reduce truck rolls with AI diagnostics.',
    icon: Wifi,
    color: '#5856D6',
    stats: [
      { label: 'Resolution', value: 'FCR 78%' },
      { label: 'Churn', value: '-15%' },
      { label: 'NPS', value: '+40' }
    ],
    features: [
      'Remote Router Diagnostics',
      'Plan Optimization Engine',
      'Technical Support Sandbox',
      'Activation & Provisioning'
    ],
    recommendedAgents: ['ai-customer-support', 'ai-ops-manager']
  }
};

export default function IndustryDetailScreen() {
  const { id } = useLocalSearchParams();
  const { theme } = useTheme();
  const insets = useSafeAreaInsets();

  const industry = INDUSTRY_DATA[id as string];

  // Fetch real industry operations activity from tRPC
  const category: 'all' | 'customer-experience' | 'sales-revenue' | 'marketing-growth' | 'operations-management' | 'data-intelligence' | 'analysis-performance' | 'core-intelligence' =
    id === 'retail'
      ? 'sales-revenue'
      : id === 'telecom'
        ? 'customer-experience'
        : id === 'healthcare'
          ? 'customer-experience'
          : id === 'finance'
            ? 'data-intelligence'
            : id === 'real-estate'
              ? 'sales-revenue'
              : id === 'legal'
                ? 'operations-management'
                : 'all';

  const { data: activityData } = trpc.aiAgents.getActivity.useQuery({ 
    category,
    limit: 5 
  });

  if (!industry) {
    return (
      <View style={[styles.container, { paddingTop: insets.top }]}>
        <Text style={{ color: '#fff', textAlign: 'center', marginTop: 100 }}>Industry not found</Text>
        <TouchableOpacity onPress={() => router.back()} style={{ padding: 20, alignItems: 'center' }}>
          <Text style={{ color: theme.colors.primary }}>Go Back</Text>
        </TouchableOpacity>
      </View>
    );
  }

  const Icon = industry.icon;

  return (
    <View style={[styles.container, { backgroundColor: '#000' }]}>
      <Stack.Screen options={{ headerShown: false }} />

      <ScrollView contentContainerStyle={{ paddingBottom: 100 }} showsVerticalScrollIndicator={false}>
        {/* Hero Section */}
        <View style={styles.heroContainer}>
          <Image
            source={{ uri: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2072&auto=format&fit=crop' }}
            style={StyleSheet.absoluteFillObject}
            blurRadius={10}
          />
          <LinearGradient
            colors={['rgba(0,0,0,0.3)', '#000']}
            style={StyleSheet.absoluteFillObject}
          />

          <View style={[styles.header, { paddingTop: insets.top + 20 }]}>
            <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
              <ArrowLeft size={24} color="#fff" />
            </TouchableOpacity>
          </View>

          <View style={styles.heroContent}>
            <View style={[styles.iconCircle, { backgroundColor: industry.color }]}>
              <Icon size={40} color="#fff" />
            </View>
            <Text style={styles.heroTitle}>{industry.name}</Text>
            <Text style={styles.desc}>{industry.description}</Text>

            <View style={styles.statsRow}>
              {industry.stats.map((stat: any, i: number) => (
                <View key={i} style={styles.statItem}>
                  <Text style={[styles.statValue, { color: industry.color }]}>{stat.value}</Text>
                  <Text style={styles.statLabel}>{stat.label}</Text>
                </View>
              ))}
            </View>
          </View>
        </View>

        {/* Live Sector Activity Feed */}
        <View style={styles.section}>
          <View style={styles.liveHeader}>
            <View style={[styles.pulseDot, { backgroundColor: industry.color }]} />
            <Text style={[styles.sectionTitle, { marginBottom: 0 }]}>Live Sector Operations</Text>
          </View>
          <View style={styles.consoleContainer}>
            {(!activityData?.activities || activityData.activities.length === 0) ? (
              [1, 2, 3].map((_, i) => (
                <View key={i} style={styles.consoleRow}>
                  <Text style={styles.consoleTime}>10:42:{15 + i}</Text>
                  <Text style={[styles.consoleText, { color: '#ccc' }]}>
                    {getIndustryLogMessage(id as string, i)}
                  </Text>
                </View>
              ))
            ) : (
              activityData.activities.map((activity: any, i: number) => (
                <View key={activity.id} style={styles.consoleRow}>
                  <Text style={styles.consoleTime}>
                    {new Date(activity.timestamp).toLocaleTimeString([], { hour12: false, hour: '2-digit', minute: '2-digit', second: '2-digit' })}
                  </Text>
                  <Text style={[styles.consoleText, { color: '#ccc' }]}>
                    {activity.action}: {activity.description}
                  </Text>
                </View>
              ))
            )}
          </View>
        </View>

        {/* Features Grid */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Enterprise Capabilities</Text>
          <View style={styles.featuresGrid}>
            {industry.features.map((feature: string, i: number) => (
              <View key={i} style={styles.featureCard}>
                <CheckCircle size={20} color={industry.color} />
                <Text style={styles.featureText}>{feature}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* Recommended Agents */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Recommended Workforce</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ gap: 15, paddingRight: 20 }}>
            {industry.recommendedAgents.map((agentId: string, i: number) => (
              <TouchableOpacity key={i} style={styles.agentCard}>
                <View style={[styles.agentIcon, { backgroundColor: '#333' }]}>
                  <Users size={24} color="#fff" />
                </View>
                <Text style={styles.agentName}>{agentId.replace('ai-', ' ').toUpperCase()}</Text>
                <Text style={{ color: '#666', fontSize: 10 }}>View Configuration</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* CTA */}
        <View style={styles.ctaContainer}>
          <LinearGradient
            colors={[industry.color, industry.color + '99']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={styles.ctaGradient}
          >
            <View>
              <Text style={styles.ctaTitle}>Deploy Solution</Text>
              <Text style={styles.ctaSub}>Start 14-day enterprise trial</Text>
            </View>
            <ArrowRight size={24} color="#fff" />
          </LinearGradient>
        </View>

      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  header: { paddingHorizontal: 20 },
  backBtn: { width: 40, height: 40, borderRadius: 20, backgroundColor: 'rgba(255,255,255,0.1)', justifyContent: 'center', alignItems: 'center' },
  heroContainer: { height: 500, justifyContent: 'flex-end', paddingBottom: 40 },
  heroContent: { paddingHorizontal: 24 },
  iconCircle: { width: 80, height: 80, borderRadius: 25, justifyContent: 'center', alignItems: 'center', marginBottom: 20, shadowColor: '#000', shadowOpacity: 0.5, shadowRadius: 20 },
  heroTitle: { fontSize: 42, fontWeight: '900', color: '#fff', marginBottom: 15, letterSpacing: -1 },
  desc: { fontSize: 16, color: 'rgba(255,255,255,0.8)', lineHeight: 24, marginBottom: 30 },
  statsRow: { flexDirection: 'row', justifyContent: 'space-between', backgroundColor: 'rgba(255,255,255,0.05)', padding: 20, borderRadius: 20, borderColor: 'rgba(255,255,255,0.1)', borderWidth: 1 },
  statItem: { alignItems: 'center' },
  statValue: { fontSize: 24, fontWeight: '900', marginBottom: 4 },
  statLabel: { color: '#888', fontSize: 10, fontWeight: '700', textTransform: 'uppercase' },
  section: { paddingHorizontal: 24, marginBottom: 40 },
  sectionTitle: { fontSize: 20, fontWeight: '800', color: '#fff', marginBottom: 20 },
  featuresGrid: { gap: 12 },
  featureCard: { flexDirection: 'row', alignItems: 'center', gap: 15, padding: 20, backgroundColor: 'rgba(255,255,255,0.03)', borderRadius: 16, borderWidth: 1, borderColor: 'rgba(255,255,255,0.05)' },
  featureText: { color: '#fff', fontSize: 15, fontWeight: '600' },
  agentCard: { width: 140, padding: 15, backgroundColor: 'rgba(255,255,255,0.03)', borderRadius: 16, borderWidth: 1, borderColor: 'rgba(255,255,255,0.05)' },
  agentIcon: { width: 40, height: 40, borderRadius: 12, justifyContent: 'center', alignItems: 'center', marginBottom: 12 },
  agentName: { color: '#fff', fontWeight: '800', fontSize: 12, marginBottom: 4 },
  ctaContainer: { marginHorizontal: 24, marginBottom: 20 },
  ctaGradient: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 24, borderRadius: 24 },
  ctaTitle: { color: '#fff', fontSize: 20, fontWeight: '800' },
  ctaSub: { color: 'rgba(255,255,255,0.8)', fontSize: 12, fontWeight: '600' },
  liveHeader: { flexDirection: 'row', alignItems: 'center', gap: 10, marginBottom: 15 },
  pulseDot: { width: 8, height: 8, borderRadius: 4 },
  consoleContainer: { backgroundColor: '#111', padding: 20, borderRadius: 16, borderLeftWidth: 2, borderLeftColor: 'rgba(255,255,255,0.2)' },
  consoleRow: { flexDirection: 'row', marginBottom: 8, gap: 10 },
  consoleTime: { fontFamily: 'monospace', color: '#666', fontSize: 11 },
  consoleText: { fontFamily: 'monospace', fontSize: 11, flex: 1 }
});

function getIndustryLogMessage(id: string, index: number): string {
  const templates: Record<string, string[]> = {
    'financial-services': ['Verifying KYC Doc #8821...', 'Flagging Transaction $9,000 > Threshold', 'Syncing Ledger'],
    'healthcare': ['Booking Appt: Dr. Smith (Avail)', 'Refill Request: Metformin 500mg', 'Updating Patient Record'],
    'utilities': ['Outage Detected: Grid 44-B', 'Dispatching Crew #22', 'Meter Read: 44,201 kWh'],
    'retail-ecommerce': ['Order Placed #9921', 'Inventory Check: SKU-2201', 'Refund Processed'],
  };
  const defaultLogs = ['Optimizing workflow...', 'analyzing data stream...', 'Syncing agent context...'];
  return (templates[id] || defaultLogs)[index] || 'Processing...';
}
