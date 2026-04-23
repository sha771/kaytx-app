import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useTheme } from '@/providers/ThemeProvider';
import { Lightbulb, Activity, Star, Users, CheckCircle2, Clock, Target, ArrowRight, BarChart3, MessageSquare, Calendar, Shield, FlaskConical, Palette, Code, Rocket } from 'lucide-react-native';
import AgentFeatures from '@/components/ai-agent/AgentFeatures';
import { useRouter } from 'expo-router';

const DEPARTMENT_AGENTS = [
  { id: 'ab-test-agent', name: 'AI A/B Test Agent', description: 'AI A/B Test Agent AI Agent', icon: Layout, color: '#6A1B9A' },
  { id: 'ai-product-analyst', name: 'AI Product Analyst', description: 'AI Product Analyst AI Agent', icon: Layout, color: '#6A1B9A' },
  { id: 'ai-product-manager', name: 'AI Product Manager', description: 'AI Product Manager AI Agent', icon: Layout, color: '#6A1B9A' },
  { id: 'ai-product-marketer', name: 'AI Product Marketer', description: 'AI Product Marketer AI Agent', icon: Layout, color: '#6A1B9A' },
  { id: 'ai-release-manager', name: 'AI Release Manager', description: 'AI Release Manager AI Agent', icon: Layout, color: '#6A1B9A' },
  { id: 'ai-ux-researcher', name: 'AI UX Researcher', description: 'AI UX Researcher AI Agent', icon: Layout, color: '#6A1B9A' },
  { id: 'feature-analyst', name: 'AI Feature Analyst', description: 'AI Feature Analyst AI Agent', icon: Layout, color: '#6A1B9A' },
  { id: 'product-manager-1', name: 'Product Manager', description: 'Product Manager AI Agent', icon: Layout, color: '#6A1B9A' },
  { id: 'product-owner-1', name: 'Product Owner', description: 'Product Owner AI Agent', icon: Layout, color: '#6A1B9A' },
  { id: 'prototype-builder', name: 'AI Prototype Builder', description: 'AI Prototype Builder AI Agent', icon: Layout, color: '#6A1B9A' },
  { id: 'roadmap-planner', name: 'AI Roadmap Planner', description: 'AI Roadmap Planner AI Agent', icon: Layout, color: '#6A1B9A' },
  { id: 'ux-researcher', name: 'AI UX Researcher', description: 'AI UX Researcher AI Agent', icon: Layout, color: '#6A1B9A' },
  { id: 'vp-product-operations', name: 'VP Product Operations', description: 'VP Product Operations AI Agent', icon: Layout, color: '#6A1B9A' },
  { id: 'vp-product-strategy', name: 'VP Product Strategy', description: 'VP Product Strategy AI Agent', icon: Layout, color: '#6A1B9A' },
  { id: 'vp-product', name: 'VP Product', description: 'VP Product AI Agent', icon: Layout, color: '#6A1B9A' }
];;

export default function ProductDevelopmentIndex() {
  const { theme } = useTheme();
  return (
    <ScrollView style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <View style={[styles.hero, { borderBottomColor: theme.colors.border || '#E5E5EA' }]}>
        <View style={[styles.heroIconWrap, { backgroundColor: theme.colors.primary + '15' }]}><Lightbulb size={48} color={theme.colors.primary} /></View>
        <Text style={[styles.heroTitle, { color: theme.colors.text }]}>Product Development</Text>
        <Text style={[styles.heroSubtitle, { color: theme.colors.textSecondary }]}>AI Agents for Product Excellence</Text>
        <View style={styles.badgesRow}>
          <View style={[styles.badge, { backgroundColor: '#34C75922' }]}><Activity size={12} color="#34C759" /><Text style={[styles.badgeText, { color: '#34C759' }]}>Active</Text></View>
          <View style={[styles.badge, { backgroundColor: theme.colors.primary + '22' }]}><Star size={12} color={theme.colors.primary} /><Text style={[styles.badgeText, { color: theme.colors.primary }]}>Department</Text></View>
          <View style={[styles.badge, { backgroundColor: '#FF950022' }]}><Users size={12} color="#FF9500" /><Text style={[styles.badgeText, { color: '#FF9500' }]}>9 Agents</Text></View>
        </View>
      </View>
      <View style={styles.statsContainer}>
        {[{label:'Agents',value:'9',icon:CheckCircle2,color:'#34C759'},{label:'Uptime',value:'99.9%',icon:Activity,color:'#007AFF'},{label:'Sprints',value:'2/week',icon:Clock,color:'#FF9500'},{label:'Features',value:'50+',icon:Target,color:'#AF52DE'}].map((stat,i)=>(<View key={i} style={[styles.statCard, { backgroundColor: theme.colors.card || '#F2F2F7' }]}><stat.icon size={22} color={stat.color} /><Text style={[styles.statValue, { color: theme.colors.text }]}>{stat.value}</Text><Text style={[styles.statLabel, { color: theme.colors.textSecondary }]}>{stat.label}</Text></View>))}
      </View>
      <View style={[styles.section, { backgroundColor: theme.colors.card || '#F2F2F7' }]}>
        <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Overview</Text>
        <Text style={[styles.description, { color: theme.colors.textSecondary }]}>The Product Development department drives innovation through AI-powered product management, UX research, and experimentation. Our agents accelerate the product lifecycle from ideation to launch.</Text>
      </View>
      <View style={[styles.section, { backgroundColor: theme.colors.card || '#F2F2F7' }]}>
        <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>AI Agents</Text>
        {DEPARTMENT_AGENTS.map((agent) => (
          <TouchableOpacity key={agent.id} onPress={()=>router.push('/ai-agent/product/'+agent.id)} style={[styles.agentCard, { backgroundColor: theme.colors.background || '#F2F2F7' }]}>
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
          {[{label:'View Reports',icon:BarChart3},{label:'Team Chat',icon:MessageSquare},{label:'Schedule',icon:Calendar},{label:'Settings',icon:Shield}].map((act,i)=>(<TouchableOpacity key={i} style={[styles.actionButton, { backgroundColor: theme.colors.primary + '12' }]}><act.icon size={24} color={theme.colors.primary} /><Text style={[styles.actionText, { color: theme.colors.primary }]}>{act.label}</Text></TouchableOpacity>))}
        </View>
      </View>
    <AgentFeatures agentId="product-index" agentName="Product Department" />

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
