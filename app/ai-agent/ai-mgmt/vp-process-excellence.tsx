import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useTheme } from '@/providers/ThemeProvider';
import { Activity, Users, Clock, Target, Zap, ArrowRight, Briefcase, Star, CircleCheckBig, Gauge } from 'lucide-react-native';
import AgentFeatures from '@/components/ai-agent/AgentFeatures';
import { useRouter } from 'expo-router';

const agent = {
  name: 'AI VP Process Excellence',
  title: 'AI Management & Governance'
};

export default function VpProcessExcellencePage() {
  const { theme } = useTheme();
  const router = useRouter();
  const stats = [
    {label:'Status',value:'Active',icon: Activity, color: '#34C759'},
    {label:'Level',value:'VP Level',icon: Briefcase, color: '#8B5CF6'},
    {label:'Efficiency',value:'20x',icon: Target, color: '#FF9500'},
    {label:'Dept',value:'AI Mgmt',icon: Users, color: '#007AFF'}
  ];
  const capabilities = ['Process Mining','Maturity Assessment','Benchmark Analysis','Process Optimization','AI Governance','Performance Analytics'];
  const responsibilities = ['Lead process mining initiatives','Assess automation maturity levels','Conduct benchmark analysis','Optimize business processes','Ensure AI governance compliance','Drive operational excellence'];
  const activities = [
    {time:'2 min ago',text:'Analyzed process efficiency metrics',icon: CircleCheckBig},
    {time:'5 min ago',text:'Completed maturity assessment',icon: Target},
    {time:'8 min ago',text:'Generated benchmark report',icon: Briefcase}
  ];

  return (
    <ScrollView style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <View style={[styles.hero, { borderBottomColor: theme.colors.border || '#E5E5EA' }]}>
        <View style={[styles.heroIconWrap, { backgroundColor: '#6366F120' }]}>
          <Target size={56} color="#6366F1" />
        </View>
        <Text style={[styles.heroTitle, { color: theme.colors.text }]}>{agent.name}</Text>
        <Text style={[styles.heroSubtitle, { color: theme.colors.textSecondary }]}>{agent.title}</Text>
        <View style={styles.badgesRow}>
          <View style={[styles.badge, { backgroundColor: '#34C75922' }]}><Activity size={12} color="#34C759" /><Text style={[styles.badgeText, { color: '#34C759' }]}>Active</Text></View>
          <View style={[styles.badge, { backgroundColor: '#8B5CF622' }]}><Briefcase size={12} color="#8B5CF6" /><Text style={[styles.badgeText, { color: '#8B5CF6' }]}>VP Level</Text></View>
        </View>
      </View>

      <View style={styles.statsContainer}>
        {stats.map((stat,index)=>(
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
          The AI VP Process Excellence leads process mining initiatives, assesses automation maturity, and conducts benchmark analysis to drive operational excellence across the organization.
        </Text>
      </View>

      <View style={[styles.section, { backgroundColor: theme.colors.card || '#F2F2F7' }]}>
        <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Capabilities</Text>
        <View style={styles.tagsContainer}>
          {capabilities.map((cap,index)=>(
            <View key={index} style={[styles.tag, { backgroundColor: '#6366F118' }]}>
              <Text style={[styles.tagText, { color: '#6366F1' }]}>{cap}</Text>
            </View>
          ))}
        </View>
      </View>

      <View style={[styles.section, { backgroundColor: theme.colors.card || '#F2F2F7' }]}>
        <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Key Responsibilities</Text>
        {responsibilities.map((item,index)=>(
          <View key={index} style={styles.responsibilityRow}>
            <ArrowRight size={14} color="#6366F1" />
            <Text style={[styles.responsibilityText, { color: theme.colors.textSecondary }]}>{item}</Text>
          </View>
        ))}
      </View>

      <View style={[styles.section, { backgroundColor: theme.colors.card || '#F2F2F7' }]}>
        <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Recent Activity</Text>
        {activities.map((act,index)=>(
          <View key={index} style={styles.activityRow}>
            <View style={[styles.activityIcon, { backgroundColor: '#6366F115' }]}>
              <act.icon size={14} color="#6366F1" />
            </View>
            <View style={styles.activityContent}>
              <Text style={[styles.activityText, { color: theme.colors.text }]}>{act.text}</Text>
              <Text style={[styles.activityTime, { color: theme.colors.textSecondary }]}>{act.time}</Text>
            </View>
          </View>
        ))}
      </View>

      <View style={[styles.section, { backgroundColor: theme.colors.card || '#F2F2F7' }]}>
        <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Sub-Agents</Text>
        <TouchableOpacity onPress={() => router.push('/ai-agent/ai-mgmt/sub-agents/process-miner')} style={[styles.subAgentCard, { backgroundColor: theme.colors.background || '#F2F2F7' }]}>
          <Target size={20} color="#6366F1" />
          <Text style={[styles.subAgentName, { color: theme.colors.text }]}>AI Process Miner</Text>
          <ArrowRight size={16} color={theme.colors.textSecondary} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => router.push('/ai-agent/ai-mgmt/sub-agents/maturity-assessor')} style={[styles.subAgentCard, { backgroundColor: theme.colors.background || '#F2F2F7' }]}>
          <Gauge size={20} color="#6366F1" />
          <Text style={[styles.subAgentName, { color: theme.colors.text }]}>AI Maturity Assessor</Text>
          <ArrowRight size={16} color={theme.colors.textSecondary} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => router.push('/ai-agent/ai-mgmt/sub-agents/benchmark-analyzer')} style={[styles.subAgentCard, { backgroundColor: theme.colors.background || '#F2F2F7' }]}>
          <Activity size={20} color="#6366F1" />
          <Text style={[styles.subAgentName, { color: theme.colors.text }]}>AI Benchmark Analyzer</Text>
          <ArrowRight size={16} color={theme.colors.textSecondary} />
        </TouchableOpacity>
      </View>

      <AgentFeatures agentId="vp-process-excellence" agentName="AI VP Process Excellence" />
      <View style={{ height: 40 }} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  hero: { alignItems: 'center', paddingVertical: 36, paddingHorizontal: 20, borderBottomWidth: 1 },
  heroIconWrap: { width: 100, height: 100, borderRadius: 50, justifyContent: 'center', alignItems: 'center', marginBottom: 16 },
  heroTitle: { fontSize: 22, fontWeight: 'bold', textAlign: 'center' },
  heroSubtitle: { fontSize: 15, marginTop: 6, fontWeight: '500' },
  badgesRow: { flexDirection: 'row', gap: 10, marginTop: 16, flexWrap: 'wrap', justifyContent: 'center' },
  badge: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 12, paddingVertical: 6, borderRadius: 20, gap: 5 },
  badgeText: { fontSize: 12, fontWeight: '600' },
  statsContainer: { flexDirection: 'row', flexWrap: 'wrap', padding: 16, gap: 12 },
  statCard: { flex: 1, minWidth: '22%', alignItems: 'center', padding: 14, borderRadius: 12 },
  statValue: { fontSize: 14, fontWeight: 'bold', marginTop: 8 },
  statLabel: { fontSize: 11, marginTop: 4, textAlign: 'center' },
  section: { marginHorizontal: 16, marginBottom: 16, padding: 20, borderRadius: 16 },
  sectionTitle: { fontSize: 18, fontWeight: '700', marginBottom: 14 },
  description: { fontSize: 14, lineHeight: 22 },
  tagsContainer: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  tag: { paddingHorizontal: 12, paddingVertical: 6, borderRadius: 20 },
  tagText: { fontSize: 12, fontWeight: '600' },
  responsibilityRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 10, gap: 8 },
  responsibilityText: { fontSize: 14, flex: 1, lineHeight: 20 },
  activityRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 12, gap: 12 },
  activityIcon: { width: 32, height: 32, borderRadius: 16, justifyContent: 'center', alignItems: 'center' },
  activityContent: { flex: 1 },
  activityText: { fontSize: 14, fontWeight: '500' },
  activityTime: { fontSize: 12, marginTop: 2 },
  subAgentCard: { flexDirection: 'row', alignItems: 'center', padding: 14, borderRadius: 12, marginBottom: 10 },
  subAgentName: { flex: 1, fontSize: 14, fontWeight: '500', marginLeft: 12 },
});
