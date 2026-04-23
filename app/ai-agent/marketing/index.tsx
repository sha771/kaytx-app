import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useTheme } from '@/providers/ThemeProvider';
import { Megaphone, Activity, Star, Users, CheckCircle2, Clock, Target, ArrowRight, BarChart3, MessageSquare, Calendar, Shield, TrendingUp, Palette, Mail, Share2 } from 'lucide-react-native';
import AgentFeatures from '@/components/ai-agent/AgentFeatures';
import { useRouter } from 'expo-router';

const DEPARTMENT_AGENTS = [
  { id: 'cmo', name: 'CMO', description: 'CMO AI Agent', icon: Megaphone, color: '#E91E63' },
  { id: 'marketing-ads', name: 'Marketing Ads', description: 'Marketing Ads AI Agent', icon: Megaphone, color: '#E91E63' },
  { id: 'marketing-analytics', name: 'Marketing Analytics', description: 'Marketing Analytics AI Agent', icon: Megaphone, color: '#E91E63' },
  { id: 'marketing-brand', name: 'Marketing Brand', description: 'Marketing Brand AI Agent', icon: Megaphone, color: '#E91E63' },
  { id: 'marketing-content', name: 'Marketing Content', description: 'Marketing Content AI Agent', icon: Megaphone, color: '#E91E63' },
  { id: 'marketing-email', name: 'Marketing Email', description: 'Marketing Email AI Agent', icon: Megaphone, color: '#E91E63' },
  { id: 'marketing-growth', name: 'Marketing Growth', description: 'Marketing Growth AI Agent', icon: Megaphone, color: '#E91E63' },
  { id: 'marketing-manager', name: 'Marketing Manager', description: 'Marketing Manager AI Agent', icon: Megaphone, color: '#E91E63' },
  { id: 'marketing-seo', name: 'Marketing SEO', description: 'Marketing SEO AI Agent', icon: Megaphone, color: '#E91E63' },
  { id: 'marketing-social', name: 'Marketing Social', description: 'Marketing Social AI Agent', icon: Megaphone, color: '#E91E63' },
  { id: 'vp-brand', name: 'VP Brand', description: 'VP Brand AI Agent', icon: Megaphone, color: '#E91E63' },
  { id: 'vp-content', name: 'VP Content', description: 'VP Content AI Agent', icon: Megaphone, color: '#E91E63' },
  { id: 'vp-digital', name: 'VP Digital', description: 'VP Digital AI Agent', icon: Megaphone, color: '#E91E63' },
  { id: 'vp-growth', name: 'VP Growth', description: 'VP Growth AI Agent', icon: Megaphone, color: '#E91E63' },
  { id: 'vp-marketing', name: 'VP Marketing', description: 'VP Marketing AI Agent', icon: Megaphone, color: '#E91E63' }
];;

export default function MarketingDepartment() {
  const { theme } = useTheme();
  return (
    <ScrollView style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <View style={[styles.hero, { borderBottomColor: theme.colors.border || '#E5E5EA' }]}>
        <View style={[styles.heroIconWrap, { backgroundColor: '#E91E6320' }]}><Megaphone size={48} color="#E91E63" /></View>
        <Text style={[styles.heroTitle, { color: theme.colors.text }]}>Marketing & Growth</Text>
        <Text style={[styles.heroSubtitle, { color: theme.colors.textSecondary }]}>AI Agents for Growth Engine</Text>
        <View style={styles.badgesRow}>
          <View style={[styles.badge, { backgroundColor: '#34C75922' }]}><Activity size={12} color="#34C759" /><Text style={[styles.badgeText, { color: '#34C759' }]}>Active</Text></View>
          <View style={[styles.badge, { backgroundColor: '#E91E6322' }]}><Star size={12} color="#E91E63" /><Text style={[styles.badgeText, { color: '#E91E63' }]}>Department</Text></View>
          <View style={[styles.badge, { backgroundColor: '#FF950022' }]}><Users size={12} color="#FF9500" /><Text style={[styles.badgeText, { color: '#FF9500' }]}>{DEPARTMENT_AGENTS.length} Agents</Text></View>
        </View>
      </View>
      <View style={styles.statsContainer}>
        {[{label:'Agents',value:DEPARTMENT_AGENTS.length.toString(),icon:CheckCircle2,color:'#34C759'},{label:'Uptime',value:'99.9%',icon:Activity,color:'#007AFF'},{label:'Campaigns',value:'100+',icon:Clock,color:'#FF9500'},{label:'Reach',value:'1M+',icon:Target,color:'#E91E63'}].map((stat,i)=>(<View key={i} style={[styles.statCard, { backgroundColor: theme.colors.card || '#F2F2F7' }]}><stat.icon size={22} color={stat.color} /><Text style={[styles.statValue, { color: theme.colors.text }]}>{stat.value}</Text><Text style={[styles.statLabel, { color: theme.colors.textSecondary }]}>{stat.label}</Text></View>))}
      </View>
      <View style={[styles.section, { backgroundColor: theme.colors.card || '#F2F2F7' }]}>
        <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Overview</Text>
        <Text style={[styles.description, { color: theme.colors.textSecondary }]}>The Marketing & Growth department drives brand awareness and customer acquisition through AI-powered content creation, social media management, and growth strategies. Our agents maximize marketing ROI.</Text>
      </View>
      <View style={[styles.section, { backgroundColor: theme.colors.card || '#F2F2F7' }]}>
        <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Department Agents</Text>
        {DEPARTMENT_AGENTS.map((agent) => (
          <TouchableOpacity key={agent.id} onPress={()=>router.push('/ai-agent/marketing/'+agent.id)} style={[styles.agentCard, { backgroundColor: theme.colors.background || '#F2F2F7' }]}>
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
        <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Quick Actions</Text>
        <View style={styles.actionsGrid}>
          {[{label:'View Reports',icon:BarChart3},{label:'Team Chat',icon:MessageSquare},{label:'Schedule',icon:Calendar},{label:'Settings',icon:Shield}].map((act,i)=>(<TouchableOpacity key={i} style={[styles.actionButton, { backgroundColor: '#E91E6312' }]}><act.icon size={24} color="#E91E63" /><Text style={[styles.actionText, { color: '#E91E63' }]}>{act.label}</Text></TouchableOpacity>))}
        </View>
      </View>
    <AgentFeatures agentId="marketing-index" agentName="Marketing Department" />

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
  actionsGrid:{flexDirection:'row',flexWrap:'wrap',gap:12},
  actionButton:{flex:1,minWidth:'45%',alignItems:'center',padding:16,borderRadius:12},
  actionText:{fontSize:13,fontWeight:'600',marginTop:8}
});
