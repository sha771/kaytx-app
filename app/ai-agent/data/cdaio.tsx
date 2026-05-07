import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useTheme } from '@/providers/ThemeProvider';
import { Activity, Users, Clock, Target, Zap, ArrowRight, Briefcase, Database, Shield, DollarSign, Star } from 'lucide-react-native';
import AgentFeatures from '@/components/ai-agent/AgentFeatures';
import { useRouter } from 'expo-router';

export default function CdaioPage() {
  const { theme } = useTheme();
  const router = useRouter();
  const stats = [
    {label:'Tasks',value:'1,847',icon: Activity,color:'#34C759'},
    {label:'Uptime',value:'99.9%',icon:Clock,color:'#007AFF'},
    {label:'Response',value:'0.4s',icon:Target,color:'#FF9500'},
    {label:'Accuracy',value:'99.2%',icon:Users,color:'#5E35B1'}
  ];
  const capabilities = ['Data Strategy','AI Governance','Data Monetization','Enterprise Data Architecture','ML/AI Oversight','Regulatory Compliance','Data Quality Management','Digital Transformation'];
  const responsibilities = ['Define and execute enterprise data strategy','Enforce AI governance and ethical AI frameworks','Drive data monetization and revenue optimization','Oversee data architecture and platform decisions','Ensure regulatory compliance for data and AI','Champion data-driven culture across organization','Manage data quality and stewardship programs','Lead digital transformation initiatives'];
  const subAgents = [
    {name:'AI Data Strategy Advisor',route:'/ai-agent/data/sub-agents/data-strategy-advisor',icon:Database},
    {name:'AI AI Governance Enforcer',route:'/ai-agent/data/sub-agents/ai-governance-enforcer',icon:Shield},
    {name:'AI Data Monetization Planner',route:'/ai-agent/data/sub-agents/data-monetization-planner',icon:DollarSign},
  ];
  const activities = [
    {time:'2 min ago',text:'Approved enterprise data governance framework v3.2',icon:Activity},
    {time:'8 min ago',text:'Reviewed AI ethics compliance report for Q4',icon:Clock},
    {time:'15 min ago',text:'Initiated data monetization strategy for APAC region',icon:Zap},
  ];

  return (
    <ScrollView style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <View style={[styles.hero, { borderBottomColor: theme.colors.border || '#E5E5EA' }]}>
        <View style={[styles.heroIconWrap, { backgroundColor: '#5E35B120' }]}>
          <Briefcase size={56} color="#5E35B1" />
        </View>
        <Text style={[styles.heroTitle, { color: theme.colors.text }]}>Chief Data & AI Officer</Text>
        <Text style={[styles.heroSubtitle, { color: theme.colors.textSecondary }]}>Data & AI Leadership • C-Level</Text>
        <View style={styles.badgesRow}>
          <View style={[styles.badge, { backgroundColor: '#34C75922' }]}><Activity size={12} color="#34C759" /><Text style={[styles.badgeText, { color: '#34C759' }]}>Active</Text></View>
          <View style={[styles.badge, { backgroundColor: '#5E35B122' }]}><Briefcase size={12} color="#5E35B1" /><Text style={[styles.badgeText, { color: '#5E35B1' }]}>C-Level</Text></View>
          <View style={[styles.badge, { backgroundColor: '#FF950022' }]}><Star size={12} color="#FF9500" /><Text style={[styles.badgeText, { color: '#FF9500' }]}>3 Sub-Agents</Text></View>
        </View>
      </View>

      <View style={styles.statsContainer}>
        {stats.map((stat,i)=>(
          <View key={i} style={[styles.statCard, { backgroundColor: theme.colors.card || '#F2F2F7' }]}>
            <stat.icon size={22} color={stat.color} />
            <Text style={[styles.statValue, { color: theme.colors.text }]}>{stat.value}</Text>
            <Text style={[styles.statLabel, { color: theme.colors.textSecondary }]}>{stat.label}</Text>
          </View>
        ))}
      </View>

      <View style={[styles.section, { backgroundColor: theme.colors.card || '#F2F2F7' }]}>
        <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Overview</Text>
        <Text style={[styles.description, { color: theme.colors.textSecondary }]}>
          The AI Chief Data & AI Officer (CDAIO) is the highest-ranking data and AI executive, responsible for enterprise-wide data strategy, AI governance enforcement, and data monetization. This C-level agent orchestrates all data and AI initiatives, ensures ethical AI practices, and drives organizational transformation through data-driven decision making.
        </Text>
      </View>

      <View style={[styles.section, { backgroundColor: theme.colors.card || '#F2F2F7' }]}>
        <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Core Capabilities</Text>
        <View style={styles.tagsContainer}>
          {capabilities.map((cap,i)=>(
            <View key={i} style={[styles.tag, { backgroundColor: '#5E35B118' }]}>
              <Text style={[styles.tagText, { color: '#5E35B1' }]}>{cap}</Text>
            </View>
          ))}
        </View>
      </View>

      <View style={[styles.section, { backgroundColor: theme.colors.card || '#F2F2F7' }]}>
        <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Key Responsibilities</Text>
        {responsibilities.map((item,i)=>(
          <View key={i} style={styles.responsibilityRow}>
            <ArrowRight size={14} color="#5E35B1" />
            <Text style={[styles.responsibilityText, { color: theme.colors.textSecondary }]}>{item}</Text>
          </View>
        ))}
      </View>

      <View style={[styles.section, { backgroundColor: theme.colors.card || '#F2F2F7' }]}>
        <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Sub-Agents</Text>
        {subAgents.map((sub,i)=>(
          <TouchableOpacity key={i} onPress={() => router.push(sub.route as any)} style={[styles.parentCard, { backgroundColor: theme.colors.background || '#F2F2F7' }]}>
            <sub.icon size={24} color="#5E35B1" />
            <View style={styles.parentInfo}>
              <Text style={[styles.parentName, { color: theme.colors.text }]}>{sub.name}</Text>
              <Text style={[styles.parentDesc, { color: theme.colors.textSecondary }]}>Sub-Agent</Text>
            </View>
            <ArrowRight size={20} color={theme.colors.textSecondary} />
          </TouchableOpacity>
        ))}
      </View>

      <View style={[styles.section, { backgroundColor: theme.colors.card || '#F2F2F7' }]}>
        <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>A2A Endpoints</Text>
        {['/consult/cdaio','/cdaio/execute','/cdaio/analyze','/cdaio/govern','/cdaio/strategy'].map((endpoint,i)=>(
          <View key={i} style={styles.endpointRow}>
            <Zap size={14} color="#8B5CF6" />
            <Text style={[styles.endpointText, { color: theme.colors.textSecondary }]}>{endpoint}</Text>
          </View>
        ))}
      </View>

      <View style={[styles.section, { backgroundColor: theme.colors.card || '#F2F2F7' }]}>
        <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Recent Activity</Text>
        {activities.map((act,i)=>(
          <View key={i} style={styles.activityRow}>
            <View style={[styles.activityIcon, { backgroundColor: '#5E35B115' }]}>
              <act.icon size={14} color="#5E35B1" />
            </View>
            <View style={styles.activityContent}>
              <Text style={[styles.activityText, { color: theme.colors.text }]}>{act.text}</Text>
              <Text style={[styles.activityTime, { color: theme.colors.textSecondary }]}>{act.time}</Text>
            </View>
          </View>
        ))}
      </View>

      <AgentFeatures agentId="cdaio" agentName="AI Chief Data & AI Officer" />
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
  endpointRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 8, gap: 8 },
  endpointText: { fontSize: 13, fontFamily: 'monospace' },
  parentCard: { flexDirection: 'row', alignItems: 'center', padding: 16, borderRadius: 12, gap: 12 },
  parentInfo: { flex: 1 },
  parentName: { fontSize: 16, fontWeight: '600' },
  parentDesc: { fontSize: 12, marginTop: 2 },
  responsibilityRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 10, gap: 8 },
  responsibilityText: { fontSize: 14, flex: 1, lineHeight: 20 },
  activityRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 12, gap: 12 },
  activityIcon: { width: 32, height: 32, borderRadius: 16, justifyContent: 'center', alignItems: 'center' },
  activityContent: { flex: 1 },
  activityText: { fontSize: 14, fontWeight: '500' },
  activityTime: { fontSize: 12, marginTop: 2 },
});
