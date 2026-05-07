import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useTheme } from '@/providers/ThemeProvider';
import { Megaphone, Activity, Star, Users, CircleCheckBig, Clock, Target, Zap, ArrowRight, ChartBarBig, TrendingUp, Award, Globe, TrendingDown } from 'lucide-react-native';
import AgentFeatures from '@/components/ai-agent/AgentFeatures';
import { useRouter } from 'expo-router';

export default function CMOPage() {
  const { theme } = useTheme();
  const router = useRouter();

  return (
    <ScrollView style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <View style={[styles.hero, { borderBottomColor: theme.colors.border || '#E5E5EA' }]}>
        <View style={[styles.heroIconWrap, { backgroundColor: '#F43F5E20' }]}>
          <Megaphone size={56} color="#F43F5E" />
        </View>
        <Text style={[styles.heroTitle, { color: theme.colors.text }]}>AI Chief Marketing Officer</Text>
        <Text style={[styles.heroSubtitle, { color: theme.colors.textSecondary }]}>CMO - Chief Marketing Officer</Text>
        <View style={styles.badgesRow}>
          <View style={[styles.badge, { backgroundColor: '#34C75922' }]}><Activity size={12} color="#34C759" /><Text style={[styles.badgeText, { color: '#34C759' }]}>Active</Text></View>
          <View style={[styles.badge, { backgroundColor: '#F43F5E22' }]}><Megaphone size={12} color="#F43F5E" /><Text style={[styles.badgeText, { color: '#F43F5E' }]}>C-Level</Text></View>
          <View style={[styles.badge, { backgroundColor: '#F59E0B22' }]}><TrendingDown size={12} color="#F59E0B" /><Text style={[styles.badgeText, { color: '#F59E0B' }]}>High</Text></View>
        </View>
      </View>

      <View style={styles.statsContainer}>
        {[
          {label:'Cost Equiv',value:'$300K/yr',icon: ChartBarBig, color: '#34C759'},
          {label:'AI Cost',value:'$15K/yr',icon: Clock, color: '#007AFF'},
          {label:'Efficiency',value:'20x',icon: Target, color: '#FF9500'},
          {label:'Reports To',value:'CEO',icon: Users, color: '#F43F5E'}
        ].map((stat,index)=>(
          <View key={index} style={[styles.statCard, { backgroundColor: theme.colors.card || '#F2F2F7' }]}>
            <stat.icon size={22} color={stat.color} />
            <Text style={[styles.statValue, { color: theme.colors.text }]}>{stat.value}</Text>
            <Text style={[styles.statLabel, { color: theme.colors.textSecondary }]}>{stat.label}</Text>
          </View>
        ))}
      </View>

      <View style={[styles.section, { backgroundColor: theme.colors.card || '#F2F2F7' }]}>
        <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Overview</Text>
        <Text style={[styles.description, { color: theme.colors.textSecondary }]}>
          Drives marketing strategy, brand management, growth initiatives, and customer acquisition. 
          Leads all marketing functions. Reports to CEO with cross-functional influence.
        </Text>
      </View>

      <View style={[styles.section, { backgroundColor: theme.colors.card || '#F2F2F7' }]}>
        <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Key Responsibilities</Text>
        {[
          'Marketing Strategy',
          'Brand Management',
          'Growth Leadership',
          'Customer Acquisition',
          'Market Research',
          'Campaign Oversight',
          'Content Strategy',
          'Digital Strategy'
        ].map((item,index)=>(
          <View key={index} style={styles.responsibilityRow}>
            <ArrowRight size={14} color="#F43F5E" />
            <Text style={[styles.responsibilityText, { color: theme.colors.textSecondary }]}>{item}</Text>
          </View>
        ))}
      </View>

      <View style={[styles.section, { backgroundColor: theme.colors.card || '#F2F2F7' }]}>
        <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Core Capabilities</Text>
        <View style={styles.tagsContainer}>
          {['Marketing Strategy','Brand Development','Growth Hacking','Campaign Management','Market Analysis','Content Strategy','Digital Marketing','Social Media Strategy','SEO Strategy','Marketing Analytics'].map((cap,index)=>(
            <View key={index} style={[styles.tag, { backgroundColor: '#F43F5E18' }]}>
              <Text style={[styles.tagText, { color: '#F43F5E' }]}>{cap}</Text>
            </View>
          ))}
        </View>
      </View>

      <View style={[styles.section, { backgroundColor: theme.colors.card || '#F2F2F7' }]}>
        <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Key Metrics</Text>
        {[
          { label: 'Marketing ROI', value: 'Return optimization' },
          { label: 'Customer Acquisition Cost', value: 'CAC efficiency' },
          { label: 'Brand Awareness', value: 'Reach metrics' },
          { label: 'Lead Generation', value: 'Pipeline growth' },
          { label: 'Conversion Rate', value: 'Funnel optimization' },
          { label: 'Marketing Qualified Leads', value: 'MQL generation' }
        ].map((metric,index)=>(
          <View key={index} style={styles.metricRow}>
            <View style={[styles.metricDot, { backgroundColor: '#F43F5E' }]} />
            <Text style={[styles.metricLabel, { color: theme.colors.text }]}>{metric.label}:</Text>
            <Text style={[styles.metricValue, { color: theme.colors.textSecondary }]}>{metric.value}</Text>
          </View>
        ))}
      </View>

      <View style={[styles.section, { backgroundColor: theme.colors.card || '#F2F2F7' }]}>
        <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>A2A Endpoints</Text>
        {['/consult/cmo', '/marketing/strategy', '/brand/manage', '/growth/lead'].map((endpoint,index)=>(
          <View key={index} style={styles.endpointRow}>
            <Zap size={14} color="#8B5CF6" />
            <Text style={[styles.endpointText, { color: theme.colors.textSecondary }]}>{endpoint}</Text>
          </View>
        ))}
      </View>

      <View style={[styles.section, { backgroundColor: theme.colors.card || '#F2F2F7' }]}>
        <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Quick Actions</Text>
        <View style={styles.actionsGrid}>
          <TouchableOpacity style={[styles.actionButton, { backgroundColor: '#F43F5E12' }]} onPress={() => router.push('/ai-agent/executive/cmo-advisor')}>
            <Award size={24} color="#F43F5E" />
            <Text style={[styles.actionText, { color: '#F43F5E' }]}>CMO Advisor</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.actionButton, { backgroundColor: '#8B5CF612' }]} onPress={() => router.push('/ai-agent/marketing')}>
            <TrendingUp size={24} color="#8B5CF6" />
            <Text style={[styles.actionText, { color: '#8B5CF6' }]}>Marketing</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.actionButton, { backgroundColor: '#10B98112' }]} onPress={() => router.push('/ai-agent/ai-cmo')}>
            <Globe size={24} color="#10B981" />
            <Text style={[styles.actionText, { color: '#10B981' }]}>AI CMO</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.actionButton, { backgroundColor: '#F59E0B12' }]} onPress={() => router.push('/ai-agent/ai-marketer')}>
            <Megaphone size={24} color="#F59E0B" />
            <Text style={[styles.actionText, { color: '#F59E0B' }]}>AI Marketer</Text>
          </TouchableOpacity>
        </View>
      </View>
    
      <AgentFeatures agentId="cmo" agentName="Chief Marketing Officer" />
      <View style={{ height: 40 }} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  hero: { alignItems: 'center', paddingVertical: 36, paddingHorizontal: 20, borderBottomWidth: 1 },
  heroIconWrap: { width: 100, height: 100, borderRadius: 50, justifyContent: 'center', alignItems: 'center', marginBottom: 16 },
  heroTitle: { fontSize: 26, fontWeight: 'bold', textAlign: 'center' },
  heroSubtitle: { fontSize: 15, marginTop: 6, fontWeight: '500' },
  badgesRow: { flexDirection: 'row', gap: 10, marginTop: 16, flexWrap: 'wrap', justifyContent: 'center' },
  badge: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 12, paddingVertical: 6, borderRadius: 20, gap: 5 },
  badgeText: { fontSize: 12, fontWeight: '600' },
  statsContainer: { flexDirection: 'row', flexWrap: 'wrap', padding: 16, gap: 12 },
  statCard: { flex: 1, minWidth: '22%', alignItems: 'center', padding: 14, borderRadius: 12 },
  statValue: { fontSize: 16, fontWeight: 'bold', marginTop: 8 },
  statLabel: { fontSize: 11, marginTop: 4, textAlign: 'center' },
  section: { marginHorizontal: 16, marginBottom: 16, padding: 20, borderRadius: 16 },
  sectionTitle: { fontSize: 18, fontWeight: '700', marginBottom: 14 },
  description: { fontSize: 14, lineHeight: 22 },
  tagsContainer: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  tag: { paddingHorizontal: 12, paddingVertical: 6, borderRadius: 20 },
  tagText: { fontSize: 12, fontWeight: '600' },
  responsibilityRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 10, gap: 8 },
  responsibilityText: { fontSize: 14, flex: 1, lineHeight: 20 },
  metricRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 8, gap: 8 },
  metricDot: { width: 8, height: 8, borderRadius: 4 },
  metricLabel: { fontSize: 14, fontWeight: '600' },
  metricValue: { fontSize: 14, flex: 1 },
  endpointRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 8, gap: 8 },
  endpointText: { fontSize: 13, fontFamily: 'monospace' },
  actionsGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 12 },
  actionButton: { flex: 1, minWidth: '45%', alignItems: 'center', padding: 16, borderRadius: 12 },
  actionText: { fontSize: 13, fontWeight: '600', marginTop: 8 },
});
