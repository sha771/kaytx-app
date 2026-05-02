import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useTheme } from '@/providers/ThemeProvider';
import { TrendingUp, Activity, Star, Users, CircleCheckBig, Clock, Target, ArrowRight, ChartBar, MessageSquare, Calendar, Shield, Zap, Briefcase, ShieldCheck, Bitcoin, Leaf, DollarSign, Globe, ChartPie, Calculator, TriangleAlert, Monitor } from 'lucide-react-native';
import AgentFeatures from '@/components/ai-agent/AgentFeatures';
import { useRouter } from 'expo-router';

const DEPARTMENT_AGENTS = [
  { id: 'algo-trading-dev', name: 'Algorithmic Trading Developer', description: 'Algorithmic Trading Developer AI Agent', icon: TrendingUp, color: '#0277BD' },
  { id: 'cio', name: 'CIO', description: 'CIO AI Agent', icon: TrendingUp, color: '#0277BD' },
  { id: 'compliance-trading', name: 'Trading Compliance', description: 'Trading Compliance AI Agent', icon: TrendingUp, color: '#0277BD' },
  { id: 'crypto-trader', name: 'Cryptocurrency Trader', description: 'Cryptocurrency Trader AI Agent', icon: TrendingUp, color: '#0277BD' },
  { id: 'derivatives-specialist', name: 'Derivatives Specialist', description: 'Derivatives Specialist AI Agent', icon: TrendingUp, color: '#0277BD' },
  { id: 'equity-trader', name: 'Equity Trader', description: 'Equity Trader AI Agent', icon: TrendingUp, color: '#0277BD' },
  { id: 'esg-analyst', name: 'ESG Analyst', description: 'ESG Analyst AI Agent', icon: TrendingUp, color: '#0277BD' },
  { id: 'forex-trader', name: 'Forex Trader', description: 'Forex Trader AI Agent', icon: TrendingUp, color: '#0277BD' },
  { id: 'macro-analyst', name: 'Macro Analyst', description: 'Macro Analyst AI Agent', icon: TrendingUp, color: '#0277BD' },
  { id: 'portfolio-analyst', name: 'Portfolio Analyst', description: 'Portfolio Analyst AI Agent', icon: TrendingUp, color: '#0277BD' },
  { id: 'portfolio-manager', name: 'Portfolio Manager', description: 'Portfolio Manager AI Agent', icon: TrendingUp, color: '#0277BD' },
  { id: 'quant-analyst-1', name: 'Quantitative Analyst', description: 'Quantitative Analyst AI Agent', icon: TrendingUp, color: '#0277BD' },
  { id: 'risk-analyst-trading', name: 'Trading Risk Analyst', description: 'Trading Risk Analyst AI Agent', icon: TrendingUp, color: '#0277BD' },
  { id: 'risk-manager-trading', name: 'Trading Risk Manager', description: 'Trading Risk Manager AI Agent', icon: TrendingUp, color: '#0277BD' },
  { id: 'settlement-specialist', name: 'Settlement Specialist', description: 'Settlement Specialist AI Agent', icon: TrendingUp, color: '#0277BD' },
  { id: 'trading-desk-manager', name: 'Trading Desk Manager', description: 'Trading Desk Manager AI Agent', icon: TrendingUp, color: '#0277BD' },
  { id: 'vp-investments', name: 'VP Investments', description: 'VP Investments AI Agent', icon: TrendingUp, color: '#0277BD' },
  { id: 'vp-trading', name: 'VP Trading', description: 'VP Trading AI Agent', icon: TrendingUp, color: '#0277BD' }
];;

export default function TradingDepartment() {
  const { theme } = useTheme();
  const router = useRouter();
  return (
    <ScrollView style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <View style={[styles.hero, { borderBottomColor: theme.colors.border || '#E5E5EA' }]}>
        <View style={[styles.heroIconWrap, { backgroundColor: '#0277BD20' }]}><TrendingUp size={48} color="#0277BD" /></View>
        <Text style={[styles.heroTitle, { color: theme.colors.text }]}>Trading & Investment</Text>
        <Text style={[styles.heroSubtitle, { color: theme.colors.textSecondary }]}>AI Agents for Trading & Investment Operations</Text>
        <View style={styles.badgesRow}>
          <View style={[styles.badge, { backgroundColor: '#34C75922' }]}><Activity size={12} color="#34C759" /><Text style={[styles.badgeText, { color: '#34C759' }]}>Active</Text></View>
          <View style={[styles.badge, { backgroundColor: '#0277BD22' }]}><Star size={12} color="#0277BD" /><Text style={[styles.badgeText, { color: '#0277BD' }]}>Department</Text></View>
          <View style={[styles.badge, { backgroundColor: '#FF950022' }]}><Users size={12} color="#FF9500" /><Text style={[styles.badgeText, { color: '#FF9500' }]}>{DEPARTMENT_AGENTS.length} Agents</Text></View>
        </View>
      </View>
      <View style={styles.statsContainer}>
        {[{label:'Agents',value:DEPARTMENT_AGENTS.length.toString(),icon: CircleCheckBig,color:'#34C759'},{label:'Uptime',value:'99.9%',icon:Clock,color:'#007AFF'},{label:'Accuracy',value:'99.8%',icon:Target,color:'#FF9500'},{label:'Processed',value:'10K+',icon:TrendingUp,color:'#0277BD'}].map((stat,i)=>(<View key={i} style={[styles.statCard, { backgroundColor: theme.colors.card || '#F2F2F7' }]}><stat.icon size={22} color={stat.color} /><Text style={[styles.statValue, { color: theme.colors.text }]}>{stat.value}</Text><Text style={[styles.statLabel, { color: theme.colors.textSecondary }]}>{stat.label}</Text></View>))}
      </View>
      <View style={[styles.section, { backgroundColor: theme.colors.card || '#F2F2F7' }]}>
        <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Overview</Text>
        <Text style={[styles.description, { color: theme.colors.textSecondary }]}>{'"AI-powered department agents optimizing operations through intelligent automation."'}</Text>
      </View>
      <View style={[styles.section, { backgroundColor: theme.colors.card || '#F2F2F7' }]}>
        <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Department Agents</Text>
        {DEPARTMENT_AGENTS.map((agent) => (
          <TouchableOpacity key={agent.id} onPress={()=>router.push('/ai-agent/trading/'+agent.id)} style={[styles.agentCard, { backgroundColor: theme.colors.background || '#F2F2F7' }]}>
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
          {[{label:'View Reports',icon:ChartBarBig},{label:'Team Chat',icon:MessageSquare},{label:'Schedule',icon:Calendar},{label:'Settings',icon:Shield}].map((act,i)=>(<TouchableOpacity key={i} style={[styles.actionButton, { backgroundColor: '#0277BD12' }]}><act.icon size={24} color="#0277BD" /><Text style={[styles.actionText, { color: '#0277BD' }]}>{act.label}</Text></TouchableOpacity>))}
        </View>
      </View>
      <AgentFeatures agentId="trading-index" agentName="Trading & Investment Department" />
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
