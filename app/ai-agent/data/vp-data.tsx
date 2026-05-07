import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useTheme } from '@/providers/ThemeProvider';
import { Database, Activity, Users, CircleCheckBig, Clock, Target, Zap, ArrowRight, BarChart3, Brain, PieChart, Briefcase } from 'lucide-react-native';
import AgentFeatures from '@/components/ai-agent/AgentFeatures';
import { useRouter } from 'expo-router';

export default function VPDataPage() {
  const { theme } = useTheme();
  const router = useRouter();

  return (
    <ScrollView style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <View style={[styles.hero, { borderBottomColor: theme.colors.border || '#E5E5EA' }]}>
        <View style={[styles.heroIconWrap, { backgroundColor: '#5E35B120' }]}>
          <Database size={56} color="#5E35B1" />
        </View>
        <Text style={[styles.heroTitle, { color: theme.colors.text }]}>AI VP of Data</Text>
        <Text style={[styles.heroSubtitle, { color: theme.colors.textSecondary }]}>VP Data & Analytics</Text>
        <View style={styles.badgesRow}>
          <View style={[styles.badge, { backgroundColor: '#34C75922' }]}><Activity size={12} color="#34C759" /><Text style={[styles.badgeText, { color: '#34C759' }]}>Active</Text></View>
          <View style={[styles.badge, { backgroundColor: '#5E35B122' }]}><Briefcase size={12} color="#5E35B1" /><Text style={[styles.badgeText, { color: '#5E35B1' }]}>VP Level</Text></View>
        </View>
      </View>

      <View style={styles.statsContainer}>
        {[
          {label:'Cost Equiv',value:'$210K/yr',icon: BarChart3, color: '#34C759'},
          {label:'AI Cost',value:'$10.5K/yr',icon: Clock, color: '#007AFF'},
          {label:'Efficiency',value:'20x',icon: Target, color: '#FF9500'},
          {label:'Reports To',value:'CTO',icon: Users, color: '#5E35B1'}
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
          Leads data strategy, analytics, business intelligence, and data governance. 
          Drives data-driven decision making across the organization.
        </Text>
      </View>

      <View style={[styles.section, { backgroundColor: theme.colors.card || '#F2F2F7' }]}>
        <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Key Responsibilities</Text>
        {[
          'Data Strategy',
          'Analytics Leadership',
          'BI Development',
          'Data Governance',
          'Data Quality',
          'Insights Delivery'
        ].map((item,index)=>(
          <View key={index} style={styles.responsibilityRow}>
            <ArrowRight size={14} color="#5E35B1" />
            <Text style={[styles.responsibilityText, { color: theme.colors.textSecondary }]}>{item}</Text>
          </View>
        ))}
      </View>

      <View style={[styles.section, { backgroundColor: theme.colors.card || '#F2F2F7' }]}>
        <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Core Capabilities</Text>
        <View style={styles.tagsContainer}>
          {['Data Strategy','Analytics Leadership','BI Development','Data Governance','Quality Management','Insight Generation','Visualization','Data Architecture'].map((cap,index)=>(
            <View key={index} style={[styles.tag, { backgroundColor: '#5E35B118' }]}>
              <Text style={[styles.tagText, { color: '#5E35B1' }]}>{cap}</Text>
            </View>
          ))}
        </View>
      </View>

      <View style={[styles.section, { backgroundColor: theme.colors.card || '#F2F2F7' }]}>
        <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Key Metrics</Text>
        {[
          { label: 'Data Quality Score', value: 'Quality metric' },
          { label: 'Report Adoption', value: 'Usage rate' },
          { label: 'Insight Delivery Time', value: 'Speed metric' },
          { label: 'Data Availability', value: 'Uptime %' },
          { label: 'Governance Compliance', value: 'Compliance rate' }
        ].map((metric,index)=>(
          <View key={index} style={styles.metricRow}>
            <View style={[styles.metricDot, { backgroundColor: '#5E35B1' }]} />
            <Text style={[styles.metricLabel, { color: theme.colors.text }]}>{metric.label}:</Text>
            <Text style={[styles.metricValue, { color: theme.colors.textSecondary }]}>{metric.value}</Text>
          </View>
        ))}
      </View>

      <View style={[styles.section, { backgroundColor: theme.colors.card || '#F2F2F7' }]}>
        <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Quick Actions</Text>
        <View style={styles.actionsGrid}>
          <TouchableOpacity style={[styles.actionButton, { backgroundColor: '#5E35B112' }]} onPress={() => router.push('/ai-agent/executive/cto')}>
            <Database size={24} color="#5E35B1" />
            <Text style={[styles.actionText, { color: '#5E35B1' }]}>CTO</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.actionButton, { backgroundColor: '#8B5CF612' }]} onPress={() => router.push('/ai-agent/data-intelligence-ai')}>
            <Brain size={24} color="#8B5CF6" />
            <Text style={[styles.actionText, { color: '#8B5CF6' }]}>Data Intelligence</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.actionButton, { backgroundColor: '#10B98112' }]} onPress={() => router.push('/ai-agent/ai-data-analytics')}>
            <PieChart size={24} color="#10B981" />
            <Text style={[styles.actionText, { color: '#10B981' }]}>AI Analytics</Text>
          </TouchableOpacity>
        </View>
      </View>
    
      <AgentFeatures agentId="vp-data" agentName="VP of Data" />
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
  actionsGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 12 },
  actionButton: { flex: 1, minWidth: '45%', alignItems: 'center', padding: 16, borderRadius: 12 },
  actionText: { fontSize: 13, fontWeight: '600', marginTop: 8 },
});
