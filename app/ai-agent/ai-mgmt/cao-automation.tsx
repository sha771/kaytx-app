import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useTheme } from '@/providers/ThemeProvider';
import { Activity, Users, Clock, Target, Zap, ArrowRight, Briefcase, Star, CircleCheckBig } from 'lucide-react-native';
import AgentFeatures from '@/components/ai-agent/AgentFeatures';
import { useRouter } from 'expo-router';

const agent = {
  name: 'AI Chief Automation Officer',
  title: 'AI Management & Governance'
};

export default function CaoAutomationPage() {
  const { theme } = useTheme();
  const router = useRouter();
  const stats = [
    {label:'Status',value:'Active',icon: Activity, color: '#34C759'},
    {label:'Level',value:'C-Level',icon: Briefcase, color: '#8B5CF6'},
    {label:'Efficiency',value:'20x',icon: Target, color: '#FF9500'},
    {label:'Dept',value:'AI Mgmt',icon: Users, color: '#007AFF'}
  ];
  const capabilities = ['Automation Strategy','ROI Analysis','Technology Evaluation','Process Optimization','AI Governance','Enterprise Integration'];
  const responsibilities = ['Develop enterprise-wide automation strategy','Calculate and track AI ROI metrics','Evaluate emerging automation technologies','Lead digital transformation initiatives','Ensure AI governance compliance','Drive operational efficiency'];
  const activities = [
    {time:'2 min ago',text:'Analyzed automation ROI for Q2',icon: CircleCheckBig},
    {time:'5 min ago',text:'Evaluated new RPA tools',icon: Briefcase},
    {time:'8 min ago',text:'Updated automation roadmap',icon: Target}
  ];

  return (
    <ScrollView style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <View style={[styles.hero, { borderBottomColor: theme.colors.border || '#E5E5EA' }]}>
        <View style={[styles.heroIconWrap, { backgroundColor: '#8B5CF620' }]}>
          <Briefcase size={56} color="#8B5CF6" />
        </View>
        <Text style={[styles.heroTitle, { color: theme.colors.text }]}>{agent.name}</Text>
        <Text style={[styles.heroSubtitle, { color: theme.colors.textSecondary }]}>{agent.title}</Text>
        <View style={styles.badgesRow}>
          <View style={[styles.badge, { backgroundColor: '#34C75922' }]}><Activity size={12} color="#34C759" /><Text style={[styles.badgeText, { color: '#34C759' }]}>Active</Text></View>
          <View style={[styles.badge, { backgroundColor: '#8B5CF622' }]}><Briefcase size={12} color="#8B5CF6" /><Text style={[styles.badgeText, { color: '#8B5CF6' }]}>C-Level</Text></View>
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
          The AI Chief Automation Officer leads enterprise-wide automation strategy, evaluates emerging technologies, and drives digital transformation initiatives to maximize operational efficiency and ROI.
        </Text>
      </View>

      <View style={[styles.section, { backgroundColor: theme.colors.card || '#F2F2F7' }]}>
        <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Capabilities</Text>
        <View style={styles.tagsContainer}>
          {capabilities.map((cap,index)=>(
            <View key={index} style={[styles.tag, { backgroundColor: '#8B5CF618' }]}>
              <Text style={[styles.tagText, { color: '#8B5CF6' }]}>{cap}</Text>
            </View>
          ))}
        </View>
      </View>

      <View style={[styles.section, { backgroundColor: theme.colors.card || '#F2F2F7' }]}>
        <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Key Responsibilities</Text>
        {responsibilities.map((item,index)=>(
          <View key={index} style={styles.responsibilityRow}>
            <ArrowRight size={14} color="#8B5CF6" />
            <Text style={[styles.responsibilityText, { color: theme.colors.textSecondary }]}>{item}</Text>
          </View>
        ))}
      </View>

      <View style={[styles.section, { backgroundColor: theme.colors.card || '#F2F2F7' }]}>
        <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Recent Activity</Text>
        {activities.map((act,index)=>(
          <View key={index} style={styles.activityRow}>
            <View style={[styles.activityIcon, { backgroundColor: '#8B5CF615' }]}>
              <act.icon size={14} color="#8B5CF6" />
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
        <TouchableOpacity onPress={() => router.push('/ai-agent/ai-mgmt/sub-agents/automation-strategy-advisor')} style={[styles.subAgentCard, { backgroundColor: theme.colors.background || '#F2F2F7' }]}>
          <Briefcase size={20} color="#8B5CF6" />
          <Text style={[styles.subAgentName, { color: theme.colors.text }]}>AI Automation Strategy Advisor</Text>
          <ArrowRight size={16} color={theme.colors.textSecondary} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => router.push('/ai-agent/ai-mgmt/sub-agents/roi-calculator')} style={[styles.subAgentCard, { backgroundColor: theme.colors.background || '#F2F2F7' }]}>
          <Target size={20} color="#8B5CF6" />
          <Text style={[styles.subAgentName, { color: theme.colors.text }]}>AI ROI Calculator</Text>
          <ArrowRight size={16} color={theme.colors.textSecondary} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => router.push('/ai-agent/ai-mgmt/sub-agents/technology-evaluator')} style={[styles.subAgentCard, { backgroundColor: theme.colors.background || '#F2F2F7' }]}>
          <Zap size={20} color="#8B5CF6" />
          <Text style={[styles.subAgentName, { color: theme.colors.text }]}>AI Technology Evaluator</Text>
          <ArrowRight size={16} color={theme.colors.textSecondary} />
        </TouchableOpacity>
      </View>

      <AgentFeatures agentId="cao-automation" agentName="AI Chief Automation Officer" />
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
