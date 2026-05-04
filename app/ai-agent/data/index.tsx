import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useTheme } from '@/providers/ThemeProvider';
import { Database, Activity, Star, Users, CircleCheckBig, Clock, Target, ArrowRight, ChartBar, MessageSquare, Calendar, Shield, ChartPie, TrendingUp, Search, ChartBar } from 'lucide-react-native';
import AgentFeatures from '@/components/ai-agent/AgentFeatures';
import { useRouter } from 'expo-router';

const DEPARTMENT_AGENTS = [
  { id: 'analytics-manager', name: 'Analytics Manager', description: 'Analytics Manager AI Agent', icon: Database, color: '#1A237E' },
  { id: 'analytics-specialist', name: 'Analytics Specialist', description: 'Analytics Specialist AI Agent', icon: Database, color: '#1A237E' },
  { id: 'bi-developer-1', name: 'BI Developer', description: 'BI Developer AI Agent', icon: Database, color: '#1A237E' },
  { id: 'cdao', name: 'CDAO', description: 'CDAO AI Agent', icon: Database, color: '#1A237E' },
  { id: 'competitive-analyst', name: 'AI Competitive Analyst', description: 'AI Competitive Analyst AI Agent', icon: Database, color: '#1A237E' },
  { id: 'customer-insights', name: 'AI Customer Insights Agent', description: 'AI Customer Insights Agent AI Agent', icon: Database, color: '#1A237E' },
  { id: 'data-analyst-1', name: 'Data Analyst', description: 'Data Analyst AI Agent', icon: Database, color: '#1A237E' },
  { id: 'data-analyst', name: 'AI Data Analyst', description: 'AI Data Analyst AI Agent', icon: Database, color: '#1A237E' },
  { id: 'data-manager', name: 'Data Manager', description: 'Data Manager AI Agent', icon: Database, color: '#1A237E' },
  { id: 'data-scientist-1', name: 'Data Scientist', description: 'Data Scientist AI Agent', icon: Database, color: '#1A237E' },
  { id: 'data-steward-1', name: 'Data Steward', description: 'Data Steward AI Agent', icon: Database, color: '#1A237E' },
  { id: 'financial-analyst', name: 'AI Financial Analyst', description: 'AI Financial Analyst AI Agent', icon: Database, color: '#1A237E' },
  { id: 'forecasting-agent', name: 'AI Forecasting Agent', description: 'AI Forecasting Agent AI Agent', icon: Database, color: '#1A237E' },
  { id: 'fraud-detection', name: 'AI Fraud Detection Agent', description: 'AI Fraud Detection Agent AI Agent', icon: Database, color: '#1A237E' },
  { id: 'ml-engineer-1', name: 'ML Engineer', description: 'ML Engineer AI Agent', icon: Database, color: '#1A237E' },
  { id: 'risk-analyst', name: 'AI Risk Analyst', description: 'AI Risk Analyst AI Agent', icon: Database, color: '#1A237E' },
  { id: 'sales-data-analyst', name: 'AI Sales Data Analyst', description: 'AI Sales Data Analyst AI Agent', icon: Database, color: '#1A237E' },
  { id: 'vp-analytics', name: 'VP Analytics', description: 'VP Analytics AI Agent', icon: Database, color: '#1A237E' },
  { id: 'vp-business-intelligence', name: 'VP Business Intelligence', description: 'VP Business Intelligence AI Agent', icon: Database, color: '#1A237E' },
  { id: 'vp-data-engineering', name: 'VP Data Engineering', description: 'VP Data Engineering AI Agent', icon: Database, color: '#1A237E' },
  { id: 'vp-data-science', name: 'VP Data Science', description: 'VP Data Science AI Agent', icon: Database, color: '#1A237E' }
];;

export default function DataIntelligenceIndex() {
  const { theme } = useTheme();
  const router = useRouter();
  return (
    <ScrollView style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <View style={[styles.hero, { borderBottomColor: theme.colors.border || '#E5E5EA' }]}>
        <View style={[styles.heroIconWrap, { backgroundColor: theme.colors.primary + '15' }]}><Database size={48} color={theme.colors.primary} /></View>
        <Text style={[styles.heroTitle, { color: theme.colors.text }]}>Data & Intelligence</Text>
        <Text style={[styles.heroSubtitle, { color: theme.colors.textSecondary }]}>AI Agents for Data Analytics</Text>
        <View style={styles.badgesRow}>
          <View style={[styles.badge, { backgroundColor: '#34C75922' }]}><Activity size={12} color="#34C759" /><Text style={[styles.badgeText, { color: '#34C759' }]}>Active</Text></View>
          <View style={[styles.badge, { backgroundColor: theme.colors.primary + '22' }]}><Star size={12} color={theme.colors.primary} /><Text style={[styles.badgeText, { color: theme.colors.primary }]}>Department</Text></View>
          <View style={[styles.badge, { backgroundColor: '#FF950022' }]}><Users size={12} color="#FF9500" /><Text style={[styles.badgeText, { color: '#FF9500' }]}>10 Agents</Text></View>
        </View>
      </View>
      <View style={styles.statsContainer}>
        {[{label:'Agents',value:'10',icon: CircleCheckBig,color:'#34C759'},{label:'Uptime',value:'99.9%',icon:Activity,color:'#007AFF'},{label:'Queries',value:'50K/hr',icon:Clock,color:'#FF9500'},{label:'Accuracy',value:'99.7%',icon:Target,color:'#AF52DE'}].map((stat,i)=>(<View key={i} style={[styles.statCard, { backgroundColor: theme.colors.card || '#F2F2F7' }]}><stat.icon size={22} color={stat.color} /><Text style={[styles.statValue, { color: theme.colors.text }]}>{stat.value}</Text><Text style={[styles.statLabel, { color: theme.colors.textSecondary }]}>{stat.label}</Text></View>))}
      </View>
      <View style={[styles.section, { backgroundColor: theme.colors.card || '#F2F2F7' }]}>
        <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Overview</Text>
        <Text style={[styles.description, { color: theme.colors.textSecondary }]}>The Data & Intelligence department powers data-driven decision making through AI analytics. Our agents deliver insights, forecasts, and competitive intelligence across all business functions.</Text>
      </View>
      <View style={[styles.section, { backgroundColor: theme.colors.card || '#F2F2F7' }]}>
        <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>AI Agents</Text>
        {DEPARTMENT_AGENTS.map((agent) => (
          <TouchableOpacity key={agent.id} onPress={()=>router.push('/ai-agent/data/'+agent.id)} style={[styles.agentCard, { backgroundColor: theme.colors.background || '#F2F2F7' }]}>
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
          {[{label:'View Reports',icon:ChartBar},{label:'Team Chat',icon:MessageSquare},{label:'Schedule',icon:Calendar},{label:'Settings',icon:Shield}].map((act,i)=>(<TouchableOpacity key={i} style={[styles.actionButton, { backgroundColor: theme.colors.primary + '12' }]}><act.icon size={24} color={theme.colors.primary} /><Text style={[styles.actionText, { color: theme.colors.primary }]}>{act.label}</Text></TouchableOpacity>))}
        </View>
      </View>
    
      <AgentFeatures agentId="data-index" agentName="Index" />
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

