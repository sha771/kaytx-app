import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Dimensions } from 'react-native';
import { Stack, router } from 'expo-router';
import { useTheme } from '@/providers/ThemeProvider';
import { industries } from '@/constants/industries';
import {
  Building2,
  ArrowRight,
  Plane,
  Radio,
  Shield,
  Zap,
  Tv,
  Monitor,
  Landmark,
  ShoppingBag,
  Heart,
  GraduationCap,
  House,
  Factory,
  Scale,
  Briefcase,
  Hotel,
  Building,
  Activity
} from 'lucide-react-native';
import { LinearGradient } from 'expo-linear-gradient';

const { width } = Dimensions.get('window');

// Industry icons and colors mapping
const industryConfig: { [key: string]: { icon: any; colors: readonly [string, string, ...string[]] } } = {
  'airline': { icon: Plane, colors: ['#1a1a2e', '#16213e'] },
  'telecommunications': { icon: Radio, colors: ['#1e3c72', '#2a5298'] },
  'insurance': { icon: Shield, colors: ['#2c3e50', '#3498db'] },
  'utilities': { icon: Zap, colors: ['#1a472a', '#2d5a3f'] },
  'media-entertainment': { icon: Tv, colors: ['#8e2de2', '#4a00e0'] },
  'information-technology': { icon: Monitor, colors: ['#0f0c29', '#302b63'] },
  'finance-banking': { icon: Landmark, colors: ['#0d2137', '#1a3a5c'] },
  'banking': { icon: Landmark, colors: ['#0d2137', '#1a3a5c'] },
  'financial-services': { icon: Landmark, colors: ['#0d2137', '#2d5a87'] },
  'ecommerce-retail': { icon: ShoppingBag, colors: ['#c31432', '#240b36'] },
  'ecommerce': { icon: ShoppingBag, colors: ['#c31432', '#240b36'] },
  'retail-ecommerce': { icon: ShoppingBag, colors: ['#c31432', '#240b36'] },
  'healthcare': { icon: Heart, colors: ['#11998e', '#38ef7d'] },
  'education-training': { icon: GraduationCap, colors: ['#2193b0', '#6dd5ed'] },
  'real-estate': { icon: House, colors: ['#834d9b', '#d04ed6'] },
  'manufacturing': { icon: Factory, colors: ['#3a6073', '#16222a'] },
  'legal-services': { icon: Scale, colors: ['#373B44', '#4286f4'] },
  'professional-services': { icon: Briefcase, colors: ['#4b6cb7', '#182848'] },
  'travel-hospitality': { icon: Hotel, colors: ['#ff7e5f', '#feb47b'] },
  'government-public-sector': { icon: Building, colors: ['#1c3a5f', '#4a7c9b'] },
  'technology': { icon: Monitor, colors: ['#000428', '#004e92'] },
};

const getIndustryConfig = (id: string) => {
  return industryConfig[id] || { icon: Building2, colors: ['#667eea', '#764ba2'] };
};

export default function IndustriesIndexScreen() {
  const { theme } = useTheme();

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <Stack.Screen
        options={{
          title: 'Industries',
          headerStyle: { backgroundColor: theme.colors.background },
          headerTintColor: theme.colors.text,
        }}
      />

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Global Command Center Hero */}
        <View style={styles.hero}>
          <LinearGradient
            colors={['#0f0c29', '#302b63', '#24243e']}
            style={styles.heroGradient}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
          >
            <View style={styles.heroHeader}>
              <View style={styles.heroIcon}>
                <Activity size={24} color="#4CD964" />
              </View>
              <View>
                <Text style={styles.heroTitle}>Global Operations Center</Text>
                <Text style={styles.heroSub}>Live Enterprise Neural Network</Text>
              </View>
            </View>

            {/* Real-time Global Stats */}
            <View style={styles.globalStats}>
              <View style={styles.gStat}>
                <Text style={styles.gVal}>24,312</Text>
                <Text style={styles.gLab}>Active Agents</Text>
              </View>
              <View style={styles.gDivider} />
              <View style={styles.gStat}>
                <Text style={styles.gVal}>1.4M/s</Text>
                <Text style={styles.gLab}>Ops Processed</Text>
              </View>
              <View style={styles.gDivider} />
              <View style={styles.gStat}>
                <Text style={[styles.gVal, { color: '#4CD964' }]}>99.99%</Text>
                <Text style={styles.gLab}>Uptime</Text>
              </View>
            </View>

            {/* Live Activity Ticker */}
            <View style={styles.tickerBox}>
              <Text style={styles.tickerLabel}>LIVE NETWORK ACTIVITY:</Text>
              <View style={styles.tickerContent}>
                {[
                  { sector: 'FIN', action: 'KYC Verified #9921', time: 'Now' },
                  { sector: 'HLT', action: 'Patient Triage: Urgency High', time: '1s ago' },
                  { sector: 'RET', action: 'Inventory Auto-Restock', time: '2s ago' },
                  { sector: 'MFG', action: 'Supply Chain Opt: Route B', time: '3s ago' },
                ].map((log, i) => (
                  <View key={i} style={styles.tickerItem}>
                    <Text style={styles.tickSector}>{log.sector}</Text>
                    <Text style={styles.tickAction}>{log.action}</Text>
                    <Text style={styles.tickTime}>{log.time}</Text>
                  </View>
                ))}
              </View>
            </View>
          </LinearGradient>
        </View>

        {/* Categories Header */}
        <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Industry Sectors</Text>

        {/* Industry Cards */}
        <View style={styles.cardsContainer}>
          {industries.map((industry) => {
            const config = getIndustryConfig(industry.id);
            const IconComponent = config.icon;

            return (
              <TouchableOpacity
                key={industry.id}
                style={[styles.card, { backgroundColor: theme.colors.cardBackground }]}
                onPress={() => router.push(`/ai-agent/industries/${industry.id}`)}
                activeOpacity={0.7}
              >
                <LinearGradient
                  colors={config.colors}
                  style={styles.cardIcon}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 1 }}
                >
                  <IconComponent size={24} color="#fff" />
                </LinearGradient>
                <View style={styles.cardContent}>
                  <Text style={[styles.cardTitle, { color: theme.colors.text }]}>{industry.name}</Text>
                  <Text style={[styles.cardSub, { color: theme.colors.secondaryText }]} numberOfLines={2}>
                    {industry.tagline}
                  </Text>
                  <View style={styles.cardMeta}>
                    <View style={[styles.metaBadge, { backgroundColor: theme.colors.primary + '20' }]}>
                      <Text style={[styles.metaText, { color: theme.colors.primary }]}>
                        {industry.recommendedRoleIds.length} AI Agents
                      </Text>
                    </View>
                    <View style={[styles.metaBadge, { backgroundColor: '#34C75920' }]}>
                      <Text style={[styles.metaText, { color: '#34C759' }]}>
                        {industry.primaryUseCases.length} Use Cases
                      </Text>
                    </View>
                  </View>
                </View>
                <ArrowRight size={20} color={theme.colors.secondaryText} />
              </TouchableOpacity>
            );
          })}
        </View>

        <View style={{ height: 40 }} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  content: { paddingHorizontal: 16, paddingTop: 16 },
  hero: { marginBottom: 24, borderRadius: 24, overflow: 'hidden' },
  heroGradient: { padding: 24 },
  heroHeader: { flexDirection: 'row', alignItems: 'center', marginBottom: 24, gap: 16 },
  heroIcon: { width: 48, height: 48, borderRadius: 14, backgroundColor: 'rgba(76, 217, 100, 0.1)', justifyContent: 'center', alignItems: 'center', borderWidth: 1, borderColor: 'rgba(76, 217, 100, 0.3)' },
  heroTitle: { fontSize: 22, fontWeight: '900', color: '#fff', letterSpacing: -0.5 },
  heroSub: { fontSize: 13, color: 'rgba(255,255,255,0.6)', fontWeight: '600', letterSpacing: 1, textTransform: 'uppercase' },
  globalStats: { flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 20, borderTopWidth: 1, borderBottomWidth: 1, borderColor: 'rgba(255,255,255,0.1)', marginBottom: 20 },
  gStat: { alignItems: 'center' },
  gVal: { fontSize: 20, fontWeight: '900', color: '#fff', marginBottom: 4 },
  gLab: { fontSize: 10, color: 'rgba(255,255,255,0.5)', fontWeight: '700' },
  gDivider: { width: 1, height: '80%', backgroundColor: 'rgba(255,255,255,0.1)', alignSelf: 'center' },
  tickerBox: { backgroundColor: 'rgba(0,0,0,0.3)', borderRadius: 12, padding: 16, borderLeftWidth: 3, borderLeftColor: '#4CD964' },
  tickerLabel: { fontSize: 10, color: '#4CD964', fontWeight: '900', marginBottom: 8, letterSpacing: 1 },
  tickerContent: { gap: 8 },
  tickerItem: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  tickSector: { fontSize: 11, fontWeight: '800', color: '#fff', width: 30 },
  tickAction: { fontSize: 11, color: 'rgba(255,255,255,0.9)', flex: 1, fontFamily: 'monospace' },
  tickTime: { fontSize: 10, color: 'rgba(255,255,255,0.4)' },
  sectionTitle: { fontSize: 20, fontWeight: '800', marginBottom: 16, marginLeft: 4 },
  cardsContainer: { gap: 12, paddingBottom: 40 },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderRadius: 18,
    gap: 14
  },
  cardIcon: {
    width: 52,
    height: 52,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cardContent: { flex: 1 },
  cardTitle: { fontSize: 16, fontWeight: '700', marginBottom: 4 },
  cardSub: { fontSize: 12, lineHeight: 18, marginBottom: 8 },
  cardMeta: { flexDirection: 'row', gap: 8 },
  metaBadge: { paddingHorizontal: 8, paddingVertical: 4, borderRadius: 6 },
  metaText: { fontSize: 10, fontWeight: '700' },
  quickActions: { flexDirection: 'row', gap: 12, marginBottom: 30 },
  actionBtn: { flex: 1, backgroundColor: 'rgba(255,255,255,0.05)', borderRadius: 16, padding: 12, alignItems: 'center', borderWidth: 1, borderColor: 'rgba(255,255,255,0.05)' },
  actionIcon: { width: 40, height: 40, borderRadius: 12, alignItems: 'center', justifyContent: 'center', marginBottom: 8 },
  actionText: { color: '#fff', fontSize: 11, fontWeight: '700' },
});
