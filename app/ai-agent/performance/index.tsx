import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useTheme } from '@/providers/ThemeProvider';
import { 
  TrendingUp, Activity, Star, Users, CircleCheckBig, Clock, Target, ArrowRight, 
  ChartBar, MessageSquare, Calendar, Shield, ChartPie, Lightbulb, Globe, Sparkles, 
  DollarSign, Target as TargetIcon, Trophy, Zap
} from 'lucide-react-native';
import AgentFeatures from '@/components/ai-agent/AgentFeatures';
import { useRouter } from 'expo-router';

const DEPARTMENT_AGENTS = [
  { id: 'business-intelligence', name: 'Business Intelligence AI', description: 'Business Intelligence AI AI Agent', icon: TrendingUp, color: '#1B5E20' },
  { id: 'customer-behavior-analysis', name: 'Customer Behavior Analysis AI', description: 'Customer Behavior Analysis AI AI Agent', icon: TrendingUp, color: '#1B5E20' },
  { id: 'executive-intelligence', name: 'Executive Intelligence AI', description: 'Executive Intelligence AI AI Agent', icon: TrendingUp, color: '#1B5E20' },
  { id: 'goal-tracking', name: 'Goal & OKR Tracking AI', description: 'Goal & OKR Tracking AI AI Agent', icon: TrendingUp, color: '#1B5E20' },
  { id: 'insight-generation', name: 'Insight Generation AI', description: 'Insight Generation AI AI Agent', icon: TrendingUp, color: '#1B5E20' },
  { id: 'market-insights', name: 'Customer & Market Insights AI', description: 'Customer & Market Insights AI AI Agent', icon: TrendingUp, color: '#1B5E20' },
  { id: 'performance-monitoring', name: 'Performance Monitoring AI', description: 'Performance Monitoring AI AI Agent', icon: TrendingUp, color: '#1B5E20' },
  { id: 'predictive-analytics', name: 'Predictive Analytics AI', description: 'Predictive Analytics AI AI Agent', icon: TrendingUp, color: '#1B5E20' },
  { id: 'roi-analysis', name: 'ROI & Profitability Analysis AI', description: 'ROI & Profitability Analysis AI AI Agent', icon: TrendingUp, color: '#1B5E20' }
];;

export default function PerformanceDepartment() {
  const { theme } = useTheme();
  const router = useRouter();
  return (
    <ScrollView style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <View style={[styles.hero, { borderBottomColor: theme.colors.border || '#E5E5EA' }]}>
        <View style={[styles.heroIconWrap, { backgroundColor: '#1B5E2020' }]}><TrendingUp size={48} color="#1B5E20" /></View>
        <Text style={[styles.heroTitle, { color: theme.colors.text }]}>Performance & Analytics</Text>
        <Text style={[styles.heroSubtitle, { color: theme.colors.textSecondary }]}>AI Agents for Performance & Analytics Operations</Text>
        <View style={styles.badgesRow}>
          <View style={[styles.badge, { backgroundColor: '#34C75922' }]}><Activity size={12} color="#34C759" /><Text style={[styles.badgeText, { color: '#34C759' }]}>Active</Text></View>
          <View style={[styles.badge, { backgroundColor: '#1B5E2022' }]}><Star size={12} color="#1B5E20" /><Text style={[styles.badgeText, { color: '#1B5E20' }]}>Department</Text></View>
          <View style={[styles.badge, { backgroundColor: '#FF950022' }]}><Users size={12} color="#FF9500" /><Text style={[styles.badgeText, { color: '#FF9500' }]}>{DEPARTMENT_AGENTS.length} Agents</Text></View>
        </View>
      </View>
      <View style={styles.statsContainer}>
        {[{label:'Agents',value:DEPARTMENT_AGENTS.length.toString(),icon: CircleCheckBig,color:'#34C759'},{label:'Uptime',value:'99.9%',icon:Clock,color:'#007AFF'},{label:'Accuracy',value:'99.8%',icon:Target,color:'#FF9500'},{label:'Processed',value:'10K+',icon:TrendingUp,color:'#1B5E20'}].map((stat,i)=>(<View key={i} style={[styles.statCard, { backgroundColor: theme.colors.card || '#F2F2F7' }]}><stat.icon size={22} color={stat.color} /><Text style={[styles.statValue, { color: theme.colors.text }]}>{stat.value}</Text><Text style={[styles.statLabel, { color: theme.colors.textSecondary }]}>{stat.label}</Text></View>))}
      </View>
      <View style={[styles.section, { backgroundColor: theme.colors.card || '#F2F2F7' }]}>
        <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Overview</Text>
        <Text style={[styles.description, { color: theme.colors.textSecondary }]}>{'"AI-powered department agents optimizing operations through intelligent automation."'}</Text>
      </View>
      <View style={[styles.section, { backgroundColor: theme.colors.card || '#F2F2F7' }]}>
        <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Department Agents</Text>
        {DEPARTMENT_AGENTS.map((agent) => (
          <TouchableOpacity key={agent.id} onPress={()=>router.push('/ai-agent/performance/'+agent.id)} style={[styles.agentCard, { backgroundColor: theme.colors.background || '#F2F2F7' }]}>
            <View style={[styles.agentIcon, { backgroundColor: agent.color + '20' }]}><agent.icon size={28} color={agent.color} /></View>
            <View style={styles.agentInfo}>
              <Text style={[styles.agentName, { color: theme.colors.text }]}>{agent.name}</Text>
              <Text style={[styles.agentDesc, { color: theme.colors.textSecondary }]}>{agent.description}</Text>
            </View>
            <ArrowRight size={20} color={theme.colors.textSecondary} />
          </TouchableOpacity>
        ))}
      </View>
      {/* Performance Tools - New Features */}
      <View style={[styles.section, { backgroundColor: theme.colors.card || '#F2F2F7' }]}>
        <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Performance Tools</Text>
        <View style={styles.toolsGrid}>
          <TouchableOpacity 
            onPress={() => router.push('/ai-agent/performance/kpi-dashboard')}
            style={[styles.toolCard, { backgroundColor: '#10B98115' }]}
          >
            <View style={[styles.toolIcon, { backgroundColor: '#10B981' }]}>
              <TargetIcon size={24} color="#fff" />
            </View>
            <Text style={[styles.toolName, { color: theme.colors.text }]}>KPI Dashboard</Text>
            <Text style={[styles.toolDesc, { color: theme.colors.textSecondary }]}>
              Track key metrics
            </Text>
          </TouchableOpacity>
          <TouchableOpacity 
            onPress={() => router.push('/ai-agent/performance/benchmarking')}
            style={[styles.toolCard, { backgroundColor: '#3B82F615' }]}
          >
            <View style={[styles.toolIcon, { backgroundColor: '#3B82F6' }]}>
              <Trophy size={24} color="#fff" />
            </View>
            <Text style={[styles.toolName, { color: theme.colors.text }]}>Benchmarking</Text>
            <Text style={[styles.toolDesc, { color: theme.colors.textSecondary }]}>
              Compare performance
            </Text>
          </TouchableOpacity>
        </View>
      </View>
      <View style={[styles.section, { backgroundColor: theme.colors.card || '#F2F2F7' }]}>
        <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Quick Actions</Text>
        <View style={styles.actionsGrid}>
          [{label:'View Reports',icon:ChartBar},{label:'Team Chat',icon:MessageSquare},{label:'Schedule',icon:Calendar},{label:'Settings',icon:Shield}].map((act,i)=>(<TouchableOpacity key={i} style={[styles.actionButton, { backgroundColor: '#1B5E2012' }]}><act.icon size={24} color="#1B5E20" /><Text style={[styles.actionText, { color: '#1B5E20' }]}>{act.label}</Text></TouchableOpacity>))}
        </View>
      </View>
      <AgentFeatures agentId="performance-index" agentName="Performance & Analytics Department" />
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
  actionText:{fontSize:13,fontWeight:'600',marginTop:8},
  toolsGrid:{flexDirection:'row',gap:12},
  toolCard:{flex:1,alignItems:'center',padding:16,borderRadius:12},
  toolIcon:{width:50,height:50,borderRadius:12,alignItems:'center',justifyContent:'center',marginBottom:10},
  toolName:{fontSize:14,fontWeight:'600',marginBottom:4},
  toolDesc:{fontSize:12}
});

