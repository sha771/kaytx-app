import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useTheme } from '@/providers/ThemeProvider';
import { Landmark, Activity, CircleCheckBig, Clock, Target, ChartBarBig, MessageSquare, Calendar, Shield, ArrowRight, Users, Zap, Star, Briefcase, Handshake, FileText, TrendingUp } from 'lucide-react-native';
import AgentFeatures from '@/components/ai-agent/AgentFeatures';
import { useRouter } from 'expo-router';

const SUB_AGENTS = [
  { id: 'public-sector-strategy-advisor', name: 'AI Public Sector Strategy Advisor', description: 'Strategic planning for public sector initiatives', icon: Briefcase, color: '#1B5E20', route: '/ai-agent/government/sub-agents/public-sector-strategy-advisor' },
  { id: 'budget-allocator', name: 'AI Budget Allocator', description: 'Budget allocation and resource management', icon: FileText, color: '#2E7D32', route: '/ai-agent/government/sub-agents/budget-allocator' },
  { id: 'inter-agency-coordinator', name: 'AI Inter-agency Coordinator', description: 'Coordination across government agencies', icon: Handshake, color: '#388E3C', route: '/ai-agent/government/sub-agents/inter-agency-coordinator' },
];

export default function ChiefAdminOfficerPage() {
  const { theme } = useTheme();
  const router = useRouter();
  return (
    <ScrollView style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <View style={[styles.hero, { backgroundColor: '#1B5E2018' }]}>
        <View style={[styles.heroIconWrap, { backgroundColor: '#1B5E2025' }]}>
          <Briefcase size={48} color="#1B5E20" />
        </View>
        <Text style={[styles.heroTitle, { color: theme.colors.text }]}>AI Chief Administrative Officer (Gov)</Text>
        <Text style={[styles.heroSubtitle, { color: theme.colors.textSecondary }]}>Government & Public Sector Department</Text>
        <View style={styles.badgesRow}>
          <View style={[styles.badge, { backgroundColor: '#34C75922' }]}><Activity size={12} color="#34C759" /><Text style={[styles.badgeText, { color: '#34C759' }]}>Active</Text></View>
          <View style={[styles.badge, { backgroundColor: '#1B5E2022' }]}><Star size={12} color="#1B5E20" /><Text style={[styles.badgeText, { color: '#1B5E20' }]}>Executive Level</Text></View>
          <View style={[styles.badge, { backgroundColor: '#FF950022' }]}><Users size={12} color="#FF9500" /><Text style={[styles.badgeText, { color: '#FF9500' }]}>3 Sub-Agents</Text></View>
        </View>
      </View>

      <View style={styles.statsContainer}>
        {[{label:'Agencies',value:'24',icon: CircleCheckBig,color:'#34C759'},{label:'Uptime',value:'99.95%',icon:Activity,color:'#007AFF'},{label:'Response',value:'0.8s',icon:Clock,color:'#FF9500'},{label:'Budget',value:'$2.4B',icon:TrendingUp,color:'#1B5E20'}].map((stat,index)=>(
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
          The AI Chief Administrative Officer (Government) provides executive leadership for government operations, managing inter-agency coordination, budget allocation, and public sector strategy. This agent ensures efficient government operations, policy implementation, and stakeholder coordination across all government functions.
        </Text>
      </View>

      <View style={[styles.section, { backgroundColor: theme.colors.card || '#F2F2F7' }]}>
        <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Capabilities</Text>
        <View style={styles.tagsContainer}>
          {['Executive Leadership','Inter-Agency Coordination','Budget Management','Public Sector Strategy','Policy Implementation','Resource Allocation','Government Relations','Strategic Planning','Operational Efficiency','Stakeholder Management'].map((cap,index)=>(
            <View key={index} style={[styles.tag, { backgroundColor: '#1B5E2018' }]}>
              <Text style={[styles.tagText, { color: '#1B5E20' }]}>{cap}</Text>
            </View>
          ))}
        </View>
      </View>

      <View style={[styles.section, { backgroundColor: theme.colors.card || '#F2F2F7' }]}>
        <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Key Responsibilities</Text>
        {['Executive Leadership of Government Operations','Inter-agency Coordination and Collaboration','Budget Allocation and Resource Management','Public Sector Strategy Development','Policy Implementation Oversight','Government-wide Operational Efficiency','Stakeholder Coordination and Relations','Strategic Planning for Government Initiatives','Cross-departmental Communication','Performance Monitoring and Reporting'].map((item,index)=>(
          <View key={index} style={styles.responsibilityRow}>
            <ArrowRight size={14} color="#1B5E20" />
            <Text style={[styles.responsibilityText, { color: theme.colors.textSecondary }]}>{item}</Text>
          </View>
        ))}
      </View>

      <View style={[styles.section, { backgroundColor: theme.colors.card || '#F2F2F7' }]}>
        <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Sub-Agents</Text>
        {SUB_AGENTS.map((agent) => (
          <TouchableOpacity key={agent.id} onPress={() => router.push(agent.route)} style={[styles.agentCard, { backgroundColor: theme.colors.background || '#F2F2F7' }]}>
            <View style={[styles.agentIcon, { backgroundColor: agent.color + '20' }]}><agent.icon size={28} color={agent.color} /></View>
            <View style={styles.agentInfo}>
              <Text style={[styles.agentName, { color: theme.colors.text }]}>{agent.name}</Text>
              <Text style={[styles.agentDesc, { color: theme.colors.textSecondary }]}>{agent.description}</Text>
            </View>
            <ArrowRight size={20} color={theme.colors.textSecondary} />
          </TouchableOpacity>
        ))}
      </View>

      <View style={[styles.section, { backgroundColor: theme.colors.card || '#F2F2F7' }]}>
        <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Recent Activity</Text>
        {[{time:'2 min ago',text:'Coordinated inter-agency budget review meeting'},{time:'15 min ago',text:'Approved quarterly budget allocation plan'},{time:'1 hour ago',text:'Reviewed public sector strategy recommendations'},{time:'3 hours ago',text:'Coordinated policy implementation across departments'},{time:'5 hours ago',text:'Completed agency performance assessment'}].map((act,index)=>(
          <View key={index} style={styles.activityRow}>
            <View style={[styles.activityIcon, { backgroundColor: '#1B5E2015' }]}>
              <Zap size={14} color="#1B5E20" />
            </View>
            <View style={styles.activityContent}>
              <Text style={[styles.activityText, { color: theme.colors.text }]}>{act.text}</Text>
              <Text style={[styles.activityTime, { color: theme.colors.textSecondary }]}>{act.time}</Text>
            </View>
          </View>
        ))}
      </View>

      <View style={[styles.section, { backgroundColor: theme.colors.card || '#F2F2F7' }]}>
        <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Quick Actions</Text>
        <View style={styles.actionsGrid}>
          {[{label:'View Reports',icon:ChartBarBig},{label:'Team Chat',icon:MessageSquare},{label:'Schedule',icon:Calendar},{label:'Settings',icon:Shield}].map((action,index)=>(
            <TouchableOpacity key={index} style={[styles.actionButton, { backgroundColor: '#1B5E2012' }]}>
              <action.icon size={24} color="#1B5E20" />
              <Text style={[styles.actionText, { color: '#1B5E20' }]}>{action.label}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>
    
      <AgentFeatures agentId="chief-admin-officer" agentName="AI Chief Administrative Officer (Gov)" />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  hero: { alignItems: 'center', paddingVertical: 32, paddingHorizontal: 20, borderBottomWidth: 1, borderBottomColor: '#E5E5EA' },
  heroIconWrap: { width: 88, height: 88, borderRadius: 44, justifyContent: 'center', alignItems: 'center', marginBottom: 16 },
  heroTitle: { fontSize: 26, fontWeight: 'bold' },
  heroSubtitle: { fontSize: 15, marginTop: 4, fontWeight: '500' },
  badgesRow: { flexDirection: 'row', marginTop: 16, gap: 8 },
  badge: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 10, paddingVertical: 5, borderRadius: 20, gap: 4 },
  badgeText: { fontSize: 12, fontWeight: '600' },
  statsContainer: { flexDirection: 'row', flexWrap: 'wrap', padding: 16, gap: 12 },
  statCard: { flex: 1, minWidth: '22%', alignItems: 'center', padding: 14, borderRadius: 12 },
  statValue: { fontSize: 18, fontWeight: 'bold', marginTop: 8 },
  statLabel: { fontSize: 11, marginTop: 4 },
  section: { marginHorizontal: 16, marginBottom: 16, padding: 20, borderRadius: 16 },
  sectionTitle: { fontSize: 18, fontWeight: '700', marginBottom: 14 },
  description: { fontSize: 14, lineHeight: 22 },
  tagsContainer: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  tag: { paddingHorizontal: 12, paddingVertical: 6, borderRadius: 20 },
  tagText: { fontSize: 12, fontWeight: '600' },
  responsibilityRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 10, gap: 8 },
  responsibilityText: { fontSize: 14, flex: 1, lineHeight: 20 },
  agentCard: { flexDirection: 'row', alignItems: 'center', padding: 16, borderRadius: 12, marginBottom: 12 },
  agentIcon: { width: 48, height: 48, borderRadius: 12, alignItems: 'center', justifyContent: 'center' },
  agentInfo: { flex: 1, marginLeft: 12 },
  agentName: { fontSize: 16, fontWeight: '600' },
  agentDesc: { fontSize: 12, marginTop: 2 },
  activityRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 12, gap: 12 },
  activityIcon: { width: 32, height: 32, borderRadius: 16, justifyContent: 'center', alignItems: 'center' },
  activityContent: { flex: 1 },
  activityText: { fontSize: 14, fontWeight: '500' },
  activityTime: { fontSize: 12, marginTop: 2 },
  actionsGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 12 },
  actionButton: { flex: 1, minWidth: '45%', alignItems: 'center', padding: 16, borderRadius: 12 },
  actionText: { fontSize: 13, fontWeight: '600', marginTop: 8 },
});
