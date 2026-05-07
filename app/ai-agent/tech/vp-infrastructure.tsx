import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useTheme } from '@/providers/ThemeProvider';
import { Server, Activity, Users, CircleCheckBig, Clock, Target, Zap, ArrowRight, Cloud, Database, Shield, Briefcase, DollarSign, TrendingUp } from 'lucide-react-native';
import AgentFeatures from '@/components/ai-agent/AgentFeatures';
import { useRouter } from 'expo-router';

export default function VPInfrastructurePage() {
  const { theme } = useTheme();
  const router = useRouter();

  return (
    <ScrollView style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <View style={[styles.hero, { borderBottomColor: theme.colors.border || '#E5E5EA' }]}>
        <View style={[styles.heroIconWrap, { backgroundColor: '#1565C020' }]}>
          <Server size={56} color="#1565C0" />
        </View>
        <Text style={[styles.heroTitle, { color: theme.colors.text }]}>AI VP of Infrastructure</Text>
        <Text style={[styles.heroSubtitle, { color: theme.colors.textSecondary }]}>VP Infrastructure & DevOps</Text>
        <View style={styles.badgesRow}>
          <View style={[styles.badge, { backgroundColor: '#34C75922' }]}><Activity size={12} color="#34C759" /><Text style={[styles.badgeText, { color: '#34C759' }]}>Active</Text></View>
          <View style={[styles.badge, { backgroundColor: '#1565C022' }]}><Briefcase size={12} color="#1565C0" /><Text style={[styles.badgeText, { color: '#1565C0' }]}>VP Level</Text></View>
        </View>
      </View>

      <View style={styles.statsContainer}>
        {[
          {label:'Cost Equiv',value:'$200K/yr',icon: Database, color: '#34C759'},
          {label:'AI Cost',value:'$10K/yr',icon: Clock, color: '#007AFF'},
          {label:'Efficiency',value:'20x',icon: Target, color: '#FF9500'},
          {label:'Reports To',value:'CTO',icon: Users, color: '#1565C0'}
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
          Manages cloud infrastructure, DevOps practices, and platform reliability. Ensures scalable systems 
          and cost optimization across all infrastructure.
        </Text>
      </View>

      <View style={[styles.section, { backgroundColor: theme.colors.card || '#F2F2F7' }]}>
        <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Key Responsibilities</Text>
        {[
          'Infrastructure Strategy',
          'Cloud Operations',
          'DevOps Leadership',
          'Platform Reliability',
          'Cost Optimization',
          'Scalability Planning'
        ].map((item,index)=>(
          <View key={index} style={styles.responsibilityRow}>
            <ArrowRight size={14} color="#1565C0" />
            <Text style={[styles.responsibilityText, { color: theme.colors.textSecondary }]}>{item}</Text>
          </View>
        ))}
      </View>

      <View style={[styles.section, { backgroundColor: theme.colors.card || '#F2F2F7' }]}>
        <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Core Capabilities</Text>
        <View style={styles.tagsContainer}>
          {['Cloud Architecture','DevOps Leadership','SRE Practices','Infrastructure Scaling','Cost Management','Platform Design','Automation','Monitoring Strategy'].map((cap,index)=>(
            <View key={index} style={[styles.tag, { backgroundColor: '#1565C018' }]}>
              <Text style={[styles.tagText, { color: '#1565C0' }]}>{cap}</Text>
            </View>
          ))}
        </View>
      </View>

      <View style={[styles.section, { backgroundColor: theme.colors.card || '#F2F2F7' }]}>
        <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Key Metrics</Text>
        {[
          { label: 'Uptime', value: 'Availability %' },
          { label: 'Deployment Frequency', value: 'Delivery speed' },
          { label: 'Infrastructure Cost', value: 'Cost efficiency' },
          { label: 'Incident Count', value: 'Stability metric' },
          { label: 'MTTR', value: 'Recovery time' }
        ].map((metric,index)=>(
          <View key={index} style={styles.metricRow}>
            <View style={[styles.metricDot, { backgroundColor: '#1565C0' }]} />
            <Text style={[styles.metricLabel, { color: theme.colors.text }]}>{metric.label}:</Text>
            <Text style={[styles.metricValue, { color: theme.colors.textSecondary }]}>{metric.value}</Text>
          </View>
        ))}
      </View>

      <View style={[styles.section, { backgroundColor: theme.colors.card || '#F2F2F7' }]}>
        <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Quick Actions</Text>
        <View style={styles.actionsGrid}>
          <TouchableOpacity style={[styles.actionButton, { backgroundColor: '#1565C012' }]} onPress={() => router.push('/ai-agent/executive/cto')}>
            <Server size={24} color="#1565C0" />
            <Text style={[styles.actionText, { color: '#1565C0' }]}>CTO</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.actionButton, { backgroundColor: '#8B5CF612' }]} onPress={() => router.push('/ai-agent/engineering')}>
            <Cloud size={24} color="#8B5CF6" />
            <Text style={[styles.actionText, { color: '#8B5CF6' }]}>Cloud Ops</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.actionButton, { backgroundColor: '#10B98112' }]} onPress={() => router.push('/ai-agent/tech/vp-engineering')}>
            <Database size={24} color="#10B981" />
            <Text style={[styles.actionText, { color: '#10B981' }]}>VP Engineering</Text>
          </TouchableOpacity>
        </View>
      </View>
    
      <View style={[styles.section, { backgroundColor: theme.colors.card || '#F2F2F7' }]}>
        <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Sub-Agents</Text>
        <TouchableOpacity onPress={() => router.push('/ai-agent/tech/sub-agents/cloud-cost-optimizer')} style={[styles.actionButton, { backgroundColor: theme.colors.background || '#F2F2F7', flexDirection: 'row', justifyContent: 'flex-start', padding: 16, marginBottom: 8 }]}>
          <DollarSign size={24} color="#1565C0" />
          <View style={{ marginLeft: 12, flex: 1 }}>
            <Text style={[styles.actionText, { color: theme.colors.text, marginTop: 0, textAlign: 'left' }]}>AI Cloud Cost Optimizer</Text>
            <Text style={{ fontSize: 12, color: theme.colors.textSecondary }}>Sub-Agent</Text>
          </View>
          <ArrowRight size={20} color={theme.colors.textSecondary} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => router.push('/ai-agent/tech/sub-agents/uptime-monitor')} style={[styles.actionButton, { backgroundColor: theme.colors.background || '#F2F2F7', flexDirection: 'row', justifyContent: 'flex-start', padding: 16, marginBottom: 8 }]}>
          <Activity size={24} color="#1565C0" />
          <View style={{ marginLeft: 12, flex: 1 }}>
            <Text style={[styles.actionText, { color: theme.colors.text, marginTop: 0, textAlign: 'left' }]}>AI Uptime Monitor</Text>
            <Text style={{ fontSize: 12, color: theme.colors.textSecondary }}>Sub-Agent</Text>
          </View>
          <ArrowRight size={20} color={theme.colors.textSecondary} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => router.push('/ai-agent/tech/sub-agents/scalability-planner')} style={[styles.actionButton, { backgroundColor: theme.colors.background || '#F2F2F7', flexDirection: 'row', justifyContent: 'flex-start', padding: 16 }]}>
          <TrendingUp size={24} color="#1565C0" />
          <View style={{ marginLeft: 12, flex: 1 }}>
            <Text style={[styles.actionText, { color: theme.colors.text, marginTop: 0, textAlign: 'left' }]}>AI Scalability Planner</Text>
            <Text style={{ fontSize: 12, color: theme.colors.textSecondary }}>Sub-Agent</Text>
          </View>
          <ArrowRight size={20} color={theme.colors.textSecondary} />
        </TouchableOpacity>
      </View>

      <AgentFeatures agentId="vp-infrastructure" agentName="VP of Infrastructure" />
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
