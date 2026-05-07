import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useTheme } from '@/providers/ThemeProvider';
import { Activity, Users, Clock, Target, Zap, ArrowRight, Briefcase, Star, CircleCheckBig, Rocket, Key, Heart, Bot } from 'lucide-react-native';
import AgentFeatures from '@/components/ai-agent/AgentFeatures';
import { useRouter } from 'expo-router';

const agent = {
  name: 'AI RPA Manager',
  title: 'AI Management & Governance'
};

export default function AiRpaManagerPage() {
  const { theme } = useTheme();
  const router = useRouter();
  const stats = [
    {label:'Status',value:'Active',icon: Activity, color: '#34C759'},
    {label:'Level',value:'Manager',icon: Briefcase, color: '#14B8A6'},
    {label:'Efficiency',value:'20x',icon: Target, color: '#FF9500'},
    {label:'Dept',value:'AI Mgmt',icon: Users, color: '#007AFF'}
  ];
  const capabilities = ['Bot Deployment','License Management','Bot Health Monitoring','RPA Operations','Automation Scaling','Performance Optimization'];
  const responsibilities = ['Deploy RPA bots to production','Manage RPA software licenses','Monitor bot health and performance','Scale automation operations','Optimize bot efficiency','Ensure compliance'];
  const activities = [
    {time:'2 min ago',text:'Deployed new bot to production',icon: Rocket},
    {time:'5 min ago',text:'Renewed RPA license',icon: Key},
    {time:'8 min ago',text:'Reviewed bot health metrics',icon: Heart}
  ];

  return (
    <ScrollView style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <View style={[styles.hero, { borderBottomColor: theme.colors.border || '#E5E5EA' }]}>
        <View style={[styles.heroIconWrap, { backgroundColor: '#14B8A620' }]}>
          <Bot size={56} color="#14B8A6" />
        </View>
        <Text style={[styles.heroTitle, { color: theme.colors.text }]}>{agent.name}</Text>
        <Text style={[styles.heroSubtitle, { color: theme.colors.textSecondary }]}>{agent.title}</Text>
        <View style={styles.badgesRow}>
          <View style={[styles.badge, { backgroundColor: '#34C75922' }]}><Activity size={12} color="#34C759" /><Text style={[styles.badgeText, { color: '#34C759' }]}>Active</Text></View>
          <View style={[styles.badge, { backgroundColor: '#8B5CF622' }]}><Briefcase size={12} color="#8B5CF6" /><Text style={[styles.badgeText, { color: '#8B5CF6' }]}>Specialist</Text></View>
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
          The AI RPA Manager manages RPA bot deployment, licenses, and health monitoring to ensure efficient robotic process automation operations across the enterprise.
        </Text>
      </View>

      <View style={[styles.section, { backgroundColor: theme.colors.card || '#F2F2F7' }]}>
        <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Capabilities</Text>
        <View style={styles.tagsContainer}>
          {capabilities.map((cap,index)=>(
            <View key={index} style={[styles.tag, { backgroundColor: '#14B8A618' }]}>
              <Text style={[styles.tagText, { color: '#14B8A6' }]}>{cap}</Text>
            </View>
          ))}
        </View>
      </View>

      <View style={[styles.section, { backgroundColor: theme.colors.card || '#F2F2F7' }]}>
        <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Key Responsibilities</Text>
        {responsibilities.map((item,index)=>(
          <View key={index} style={styles.responsibilityRow}>
            <ArrowRight size={14} color="#14B8A6" />
            <Text style={[styles.responsibilityText, { color: theme.colors.textSecondary }]}>{item}</Text>
          </View>
        ))}
      </View>

      <View style={[styles.section, { backgroundColor: theme.colors.card || '#F2F2F7' }]}>
        <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Recent Activity</Text>
        {activities.map((act,index)=>(
          <View key={index} style={styles.activityRow}>
            <View style={[styles.activityIcon, { backgroundColor: '#14B8A615' }]}>
              <act.icon size={14} color="#14B8A6" />
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
        <TouchableOpacity onPress={() => router.push('/ai-agent/ai-mgmt/sub-agents/bot-deployer')} style={[styles.subAgentCard, { backgroundColor: theme.colors.background || '#F2F2F7' }]}>
          <Rocket size={20} color="#14B8A6" />
          <Text style={[styles.subAgentName, { color: theme.colors.text }]}>AI Bot Deployer</Text>
          <ArrowRight size={16} color={theme.colors.textSecondary} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => router.push('/ai-agent/ai-mgmt/sub-agents/license-manager')} style={[styles.subAgentCard, { backgroundColor: theme.colors.background || '#F2F2F7' }]}>
          <Key size={20} color="#14B8A6" />
          <Text style={[styles.subAgentName, { color: theme.colors.text }]}>AI License Manager</Text>
          <ArrowRight size={16} color={theme.colors.textSecondary} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => router.push('/ai-agent/ai-mgmt/sub-agents/bot-health-monitor')} style={[styles.subAgentCard, { backgroundColor: theme.colors.background || '#F2F2F7' }]}>
          <Heart size={20} color="#14B8A6" />
          <Text style={[styles.subAgentName, { color: theme.colors.text }]}>AI Bot Health Monitor</Text>
          <ArrowRight size={16} color={theme.colors.textSecondary} />
        </TouchableOpacity>
      </View>

      <AgentFeatures agentId="ai-rpa-manager" agentName="AI RPA Manager" />
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
