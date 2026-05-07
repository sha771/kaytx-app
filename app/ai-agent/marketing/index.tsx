import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useTheme } from '@/providers/ThemeProvider';
import { Megaphone, Activity, Star, Users, CircleCheckBig, Clock, Target, ArrowRight, ChartBarBig, MessageSquare, Calendar, Shield, TrendingUp, Search, Share2, Mail, Zap, Briefcase, Palette, Globe, FileText, DollarSign, BarChart3 } from 'lucide-react-native';
import AgentFeatures from '@/components/ai-agent/AgentFeatures';
import { useRouter } from 'expo-router';

const HIERARCHY = {
  cSuite: [
    { id: 'cmo', name: 'AI Chief Marketing Officer', icon: Megaphone, color: '#C62828', subCount: 3, subs: ['Marketing Strategy Analyst','Budget Allocator','Campaign ROI Evaluator'] },
  ],
  vp: [
    { id: 'vp-marketing', name: 'AI VP Marketing', icon: Megaphone, color: '#D81B60', subCount: 3, subs: ['Channel Planner','Marketing Calendar Manager','Campaign Coordinator'] },
    { id: 'vp-brand', name: 'AI VP Brand', icon: Palette, color: '#F43F5E', subCount: 3, subs: ['Brand Perception Monitor','Brand Guidelines Enforcer','Visual Identity Auditor'] },
    { id: 'vp-growth', name: 'AI VP Growth', icon: TrendingUp, color: '#FF6D00', subCount: 3, subs: ['Experiment Designer','Funnel Analyzer','A/B Test Coordinator'] },
    { id: 'vp-content', name: 'AI VP Content', icon: FileText, color: '#6A1B9A', subCount: 3, subs: ['Editorial Calendar Planner','Content Quality Reviewer','Repurposing Strategist'] },
    { id: 'vp-digital', name: 'AI VP Digital', icon: Globe, color: '#0097A7', subCount: 3, subs: ['Digital Channel Optimizer','Web Performance Tracker','Conversion Analyst'] },
  ],
  manager: [
    { id: 'marketing-manager', name: 'AI Marketing Manager', icon: Megaphone, color: '#E65100', subCount: 3, subs: ['Task Assigner','Deadline Tracker','Marketing Spend Monitor'] },
  ],
  specialist: [
    { id: 'ai-content-marketing-agent', name: 'AI Content Marketing Agent', icon: FileText, color: '#6A1B9A', subCount: 3, subs: ['Blog Writer','Copy Editor','Content Distributor'] },
    { id: 'ai-seo-specialist-agent', name: 'AI SEO Specialist', icon: Search, color: '#2E7D32', subCount: 3, subs: ['Keyword Researcher','On-page Optimizer','Backlink Analyzer'] },
    { id: 'ai-social-media-manager-agent', name: 'AI Social Media Manager', icon: Share2, color: '#1DA1F2', subCount: 3, subs: ['Post Scheduler','Engagement Responder','Trend Monitor'] },
    { id: 'ai-email-marketing-agent', name: 'AI Email Marketing Agent', icon: Mail, color: '#0D47A1', subCount: 3, subs: ['List Segmenter','Template Designer','Deliverability Monitor'] },
    { id: 'ai-ad-campaign-manager-agent', name: 'AI Ad Campaign Manager', icon: Target, color: '#FF6D00', subCount: 3, subs: ['Bid Optimizer','Creative Tester','Audience Targeter'] },
    { id: 'ai-marketing-analytics-agent', name: 'AI Marketing Analytics Agent', icon: ChartBarBig, color: '#5856D6', subCount: 3, subs: ['Attribution Modeler','KPI Dashboard Builder','Insight Summarizer'] },
    { id: 'ai-brand-manager', name: 'AI Brand Manager', icon: Briefcase, color: '#F43F5E', subCount: 3, subs: ['Competitor Brand Tracker','Brand Health Surveyor','Messaging Aligner'] },
    { id: 'ai-growth-hacker', name: 'AI Growth Hacker', icon: Zap, color: '#34C759', subCount: 3, subs: ['Viral Loop Designer','Referral Program Builder','Acquisition Channel Tester'] },
  ],
};

export default function MarketingDepartment() {
  const { theme } = useTheme();
  const router = useRouter();

  const renderGroup = (agents: any[], title: string) => (
    <View style={[styles.section, { backgroundColor: theme.colors.card || '#F2F2F7' }]}>
      <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>{title}</Text>
      {agents.map((agent: any) => {
        const AgentIcon = agent.icon;
        return (
          <TouchableOpacity key={agent.id} onPress={() => router.push('/ai-agent/marketing/' + agent.id)} style={[styles.agentCard, { backgroundColor: theme.colors.background || '#F2F2F7' }]}>
            <View style={[styles.agentIcon, { backgroundColor: agent.color + '20' }]}><AgentIcon size={28} color={agent.color} /></View>
            <View style={styles.agentInfo}>
              <Text style={[styles.agentName, { color: theme.colors.text }]}>{agent.name}</Text>
              <Text style={[styles.agentDesc, { color: theme.colors.textSecondary }]}>{agent.subCount} Sub-Agents: {agent.subs.join(', ')}</Text>
            </View>
            <ArrowRight size={20} color={theme.colors.textSecondary} />
          </TouchableOpacity>
        );
      })}
    </View>
  );

  return (
    <ScrollView style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <View style={[styles.hero, { borderBottomColor: theme.colors.border || '#E5E5EA' }]}>
        <View style={[styles.heroIconWrap, { backgroundColor: '#E91E6320' }]}><Megaphone size={48} color="#E91E63" /></View>
        <Text style={[styles.heroTitle, { color: theme.colors.text }]}>Marketing & Growth</Text>
        <Text style={[styles.heroSubtitle, { color: theme.colors.textSecondary }]}>AI Agents & Employees — Enterprise Workforce</Text>
        <View style={styles.badgesRow}>
          <View style={[styles.badge, { backgroundColor: '#34C75922' }]}><Activity size={12} color="#34C759" /><Text style={[styles.badgeText, { color: '#34C759' }]}>Active</Text></View>
          <View style={[styles.badge, { backgroundColor: '#E91E6322' }]}><Star size={12} color="#E91E63" /><Text style={[styles.badgeText, { color: '#E91E63' }]}>Department</Text></View>
          <View style={[styles.badge, { backgroundColor: '#FF950022' }]}><Users size={12} color="#FF9500" /><Text style={[styles.badgeText, { color: '#FF9500' }]}>15 Agents</Text></View>
        </View>
      </View>
      <View style={styles.statsContainer}>
        {[{label:'Main Agents',value:'15',icon:CircleCheckBig,color:'#34C759'},{label:'Sub-Agents',value:'45',icon:Users,color:'#007AFF'},{label:'Uptime',value:'99.9%',icon:Clock,color:'#FF9500'},{label:'Efficiency',value:'20x',icon:Target,color:'#E91E63'}].map((stat,i)=>(<View key={i} style={[styles.statCard, { backgroundColor: theme.colors.card || '#F2F2F7' }]}><stat.icon size={22} color={stat.color} /><Text style={[styles.statValue, { color: theme.colors.text }]}>{stat.value}</Text><Text style={[styles.statLabel, { color: theme.colors.textSecondary }]}>{stat.label}</Text></View>))}
      </View>
      <View style={[styles.section, { backgroundColor: theme.colors.card || '#F2F2F7' }]}>
        <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Overview</Text>
        <Text style={[styles.description, { color: theme.colors.textSecondary }]}>The Marketing & Growth department operates through a structured hierarchy of AI agents — from C-Suite leadership down to specialist workers. Each agent manages dedicated sub-agents for granular task execution, ensuring enterprise-grade performance at every level.</Text>
      </View>
      {renderGroup(HIERARCHY.cSuite, 'C-Suite Leadership')}
      {renderGroup(HIERARCHY.vp, 'VP Level')}
      {renderGroup(HIERARCHY.manager, 'Manager Level')}
      {renderGroup(HIERARCHY.specialist, 'Specialist Level')}
      <View style={[styles.section, { backgroundColor: theme.colors.card || '#F2F2F7' }]}>
        <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Sub-Agents Hub</Text>
        <Text style={[styles.description, { color: theme.colors.textSecondary }]}>45 helper and sub-agent AI workers supporting the main agents.</Text>
        <TouchableOpacity onPress={() => router.push('/ai-agent/marketing/sub-agents')} style={[styles.subAgentButton, { backgroundColor: '#E91E6315' }]}>
          <Megaphone size={20} color="#E91E63" />
          <Text style={[styles.subAgentButtonText, { color: '#E91E63' }]}>View All 45 Sub-Agents</Text>
          <ArrowRight size={18} color="#E91E63" />
        </TouchableOpacity>
      </View>
      <View style={[styles.section, { backgroundColor: theme.colors.card || '#F2F2F7' }]}>
        <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Quick Actions</Text>
        <View style={styles.actionsGrid}>
          {[{label:'View Reports',icon:ChartBarBig},{label:'Team Chat',icon:MessageSquare},{label:'Schedule',icon:Calendar},{label:'Settings',icon:Shield}].map((act,i)=>(<TouchableOpacity key={i} style={[styles.actionButton, { backgroundColor: '#E91E6312' }]}><act.icon size={24} color="#E91E63" /><Text style={[styles.actionText, { color: '#E91E63' }]}>{act.label}</Text></TouchableOpacity>))}
        </View>
      </View>
      <AgentFeatures agentId="marketing-index" agentName="Marketing & Growth Department" />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container:{flex:1},
  hero:{alignItems:'center',paddingVertical:32,paddingHorizontal:20,borderBottomWidth:1},
  heroIconWrap:{width:88,height:88,borderRadius:44,justifyContent:'center',alignItems:'center',marginBottom:16},
  heroTitle:{fontSize:26,fontWeight:'bold'},
  heroSubtitle:{fontSize:15,marginTop:4,fontWeight:'500'},
  badgesRow:{flexDirection:'row',gap:10,marginTop:16},
  badge:{flexDirection:'row',alignItems:'center',paddingHorizontal:10,paddingVertical:5,borderRadius:20,gap:4},
  badgeText:{fontSize:12,fontWeight:'600'},
  statsContainer:{flexDirection:'row',flexWrap:'wrap',padding:16,gap:12},
  statCard:{flex:1,minWidth:'22%',alignItems:'center',padding:14,borderRadius:12},
  statValue:{fontSize:18,fontWeight:'bold',marginTop:8},
  statLabel:{fontSize:11,marginTop:4},
  section:{marginHorizontal:16,marginBottom:16,padding:20,borderRadius:16},
  sectionTitle:{fontSize:18,fontWeight:'700',marginBottom:14},
  description:{fontSize:14,lineHeight:22},
  agentCard:{flexDirection:'row',alignItems:'center',padding:16,borderRadius:12,marginBottom:12},
  agentIcon:{width:48,height:48,borderRadius:12,alignItems:'center',justifyContent:'center'},
  agentInfo:{flex:1,marginLeft:12},
  agentName:{fontSize:16,fontWeight:'600'},
  agentDesc:{fontSize:12,marginTop:2},
  subAgentButton:{flexDirection:'row',alignItems:'center',padding:16,borderRadius:12,marginTop:12,gap:10},
  subAgentButtonText:{fontSize:15,fontWeight:'600',flex:1},
  actionsGrid:{flexDirection:'row',flexWrap:'wrap',gap:12},
  actionButton:{flex:1,minWidth:'45%',alignItems:'center',padding:16,borderRadius:12},
  actionText:{fontSize:13,fontWeight:'600',marginTop:8}
});
