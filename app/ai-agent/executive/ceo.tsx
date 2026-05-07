import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useTheme } from '@/providers/ThemeProvider';
import { Crown, Activity, Star, Users, CircleCheckBig, Clock, Target, Zap, ArrowRight, ChartBarBig, MessageSquare, Calendar, Shield, TrendingUp, Globe, Brain } from 'lucide-react-native';
import AgentFeatures from '@/components/ai-agent/AgentFeatures';
import { useRouter } from 'expo-router';

export default function CEOPage() {
  const { theme } = useTheme();
  const router = useRouter();

  return (
    <ScrollView style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <View style={[styles.hero, { borderBottomColor: theme.colors.border || '#E5E5EA' }]}>
        <View style={[styles.heroIconWrap, { backgroundColor: '#FFD70020' }]}>
          <Crown size={56} color="#FFD700" />
        </View>
        <Text style={[styles.heroTitle, { color: theme.colors.text }]}>AI Chief Executive Officer</Text>
        <Text style={[styles.heroSubtitle, { color: theme.colors.textSecondary }]}>CEO - Chief Executive Officer</Text>
        <View style={styles.badgesRow}>
          <View style={[styles.badge, { backgroundColor: '#34C75922' }]}><Activity size={12} color="#34C759" /><Text style={[styles.badgeText, { color: '#34C759' }]}>Active</Text></View>
          <View style={[styles.badge, { backgroundColor: '#FFD70022' }]}><Crown size={12} color="#FFD700" /><Text style={[styles.badgeText, { color: '#FFD700' }]}>C-Level</Text></View>
          <View style={[styles.badge, { backgroundColor: '#FF950022' }]}><Star size={12} color="#FF9500" /><Text style={[styles.badgeText, { color: '#FF9500' }]}>Critical</Text></View>
        </View>
      </View>

      <View style={styles.statsContainer}>
        {[
          {label:'Cost Equiv',value:'$500K/yr',icon: ChartBarBig, color: '#34C759'},
          {label:'AI Cost',value:'$25K/yr',icon: Clock, color: '#007AFF'},
          {label:'Efficiency',value:'20x',icon: Target, color: '#FF9500'},
          {label:'Direct Reports',value:'16',icon: Users, color: '#FFD700'}
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
          The ultimate AI leader responsible for overall business strategy, vision, and organizational alignment. 
          Oversees all departments and makes final decisions on major initiatives. Reports to no one; all other executives report to the CEO.
        </Text>
      </View>

      <View style={[styles.section, { backgroundColor: theme.colors.card || '#F2F2F7' }]}>
        <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Key Responsibilities</Text>
        {[
          'Overall Business Strategy',
          'Organizational Vision & Mission',
          'Cross-Department Coordination',
          'Major Initiative Approval',
          'Stakeholder Communication',
          'Executive Decision Making',
          'Performance Oversight'
        ].map((item,index)=>(
          <View key={index} style={styles.responsibilityRow}>
            <ArrowRight size={14} color="#FFD700" />
            <Text style={[styles.responsibilityText, { color: theme.colors.textSecondary }]}>{item}</Text>
          </View>
        ))}
      </View>

      <View style={[styles.section, { backgroundColor: theme.colors.card || '#F2F2F7' }]}>
        <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Core Capabilities</Text>
        <View style={styles.tagsContainer}>
          {['Strategic Planning','Executive Decision Support','Cross-Functional Coordination','Vision Casting','Stakeholder Management','Crisis Leadership','Board Reporting','Market Analysis','Competitive Intelligence','Organizational Alignment'].map((cap,index)=>(
            <View key={index} style={[styles.tag, { backgroundColor: '#FFD70018' }]}>
              <Text style={[styles.tagText, { color: '#FFD700' }]}>{cap}</Text>
            </View>
          ))}
        </View>
      </View>

      <View style={[styles.section, { backgroundColor: theme.colors.card || '#F2F2F7' }]}>
        <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Key Metrics</Text>
        {[
          { label: 'Revenue Growth', value: 'Driving force' },
          { label: 'Market Share', value: 'Strategic expansion' },
          { label: 'Employee Satisfaction', value: 'Cultural alignment' },
          { label: 'Customer Satisfaction', value: 'Experience excellence' },
          { label: 'Operational Efficiency', value: 'Process optimization' },
          { label: 'Strategic Goal Progress', value: 'Vision execution' }
        ].map((metric,index)=>(
          <View key={index} style={styles.metricRow}>
            <View style={[styles.metricDot, { backgroundColor: '#FFD700' }]} />
            <Text style={[styles.metricLabel, { color: theme.colors.text }]}>{metric.label}:</Text>
            <Text style={[styles.metricValue, { color: theme.colors.textSecondary }]}>{metric.value}</Text>
          </View>
        ))}
      </View>

      <View style={[styles.section, { backgroundColor: theme.colors.card || '#F2F2F7' }]}>
        <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>A2A Endpoints</Text>
        {['/consult/ceo', '/strategy/vision', '/decision/executive', '/coordinate/c-suite'].map((endpoint,index)=>(
          <View key={index} style={styles.endpointRow}>
            <Zap size={14} color="#8B5CF6" />
            <Text style={[styles.endpointText, { color: theme.colors.textSecondary }]}>{endpoint}</Text>
          </View>
        ))}
      </View>

      <View style={[styles.section, { backgroundColor: theme.colors.card || '#F2F2F7' }]}>
        <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Quick Actions</Text>
        <View style={styles.actionsGrid}>
          <TouchableOpacity style={[styles.actionButton, { backgroundColor: '#FFD70012' }]} onPress={() => router.push('/ai-agent/executive/ceo-advisor')}>
            <Brain size={24} color="#FFD700" />
            <Text style={[styles.actionText, { color: '#FFD700' }]}>CEO Advisor</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.actionButton, { backgroundColor: '#8B5CF612' }]} onPress={() => router.push('/ai-agent/executive/strategy-planner')}>
            <TrendingUp size={24} color="#8B5CF6" />
            <Text style={[styles.actionText, { color: '#8B5CF6' }]}>Strategy Planner</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.actionButton, { backgroundColor: '#10B98112' }]} onPress={() => router.push('/ai-agent/executive/decision-engine')}>
            <Brain size={24} color="#10B981" />
            <Text style={[styles.actionText, { color: '#10B981' }]}>Decision Engine</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.actionButton, { backgroundColor: '#F59E0B12' }]} onPress={() => router.push('/ai-agent/executive/board-advisor')}>
            <Users size={24} color="#F59E0B" />
            <Text style={[styles.actionText, { color: '#F59E0B' }]}>Board Advisor</Text>
          </TouchableOpacity>
        </View>
      </View>
    
      <AgentFeatures agentId="ceo" agentName="Chief Executive Officer" />
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
