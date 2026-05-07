import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useTheme } from '@/providers/ThemeProvider';
import { useRouter } from 'expo-router';
import { Activity, Star, Clock, Target, Zap, ArrowRight, Briefcase, CircleCheckBig, TrendingUp, BarChart3 } from 'lucide-react-native';
import AgentFeatures from '@/components/ai-agent/AgentFeatures';

export default function loyaltyEngagementPage() {
  const { theme } = useTheme();
  const router = useRouter();
  const stats = [{label:'Tasks',value:'1.4K',icon:CircleCheckBig,color:'#34C759'},{label:'Uptime',value:'99.9%',icon:Activity,color:'#007AFF'},{label:'Response',value:'0.3s',icon:Clock,color:'#FF9500'},{label:'Accuracy',value:'98.2%',icon:Target,color:'#F59E0B'}];
  const capabilities = ["Points Management","Reward Recommendations","Engagement Tracking","Program Optimization","Member Communication","Loyalty Analytics"];
  const responsibilities = ["Manage loyalty points calculations","Recommend rewards to members","Track member engagement levels","Optimize loyalty program performance","Communicate with loyalty members","Analyze loyalty program metrics"];
  return (
    <ScrollView style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <View style={[styles.hero, { borderBottomColor: theme.colors.border || '#E5E5EA' }]}>
        <View style={[styles.heroIconWrap, { backgroundColor: '#F59E0B20' }]}><Star size={48} color="#F59E0B" /></View>
        <Text style={[styles.heroTitle, { color: theme.colors.text }]}>{"AI Loyalty & Engagement Agent"}</Text>
        <Text style={[styles.heroSubtitle, { color: theme.colors.textSecondary }]}>Customer Experience</Text>
        <View style={styles.badgesRow}>
          <View style={[styles.badge, { backgroundColor: '#34C75922' }]}><Activity size={12} color="#34C759" /><Text style={[styles.badgeText, { color: '#34C759' }]}>Active</Text></View>
          <View style={[styles.badge, { backgroundColor: '#F59E0B22' }]}><Star size={12} color="#F59E0B" /><Text style={[styles.badgeText, { color: '#F59E0B' }]}>VP / Executive</Text></View>
        </View>
      </View>
      <View style={styles.statsContainer}>{stats.map((stat,i)=>(<View key={i} style={[styles.statCard, { backgroundColor: theme.colors.card || '#F2F2F7' }]}><stat.icon size={22} color={stat.color} /><Text style={[styles.statValue, { color: theme.colors.text }]}>{stat.value}</Text><Text style={[styles.statLabel, { color: theme.colors.textSecondary }]}>{stat.label}</Text></View>))}</View>
      <View style={[styles.section, { backgroundColor: theme.colors.card || '#F2F2F7' }]}><Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Overview</Text><Text style={[styles.description, { color: theme.colors.textSecondary }]}>AI Loyalty & Engagement Agent - Leading departmental strategy, managing cross-functional initiatives, and driving performance optimization within the Customer Experience division.</Text></View>
      <View style={[styles.section, { backgroundColor: theme.colors.card || '#F2F2F7' }]}><Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Capabilities</Text><View style={styles.tagsContainer}>{capabilities.map((cap,i)=>(<View key={i} style={[styles.tag, { backgroundColor: '#F59E0B18' }]}><Text style={[styles.tagText, { color: '#F59E0B' }]}>{cap}</Text></View>))}</View></View>
      <View style={[styles.section, { backgroundColor: theme.colors.card || '#F2F2F7' }]}><Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Key Responsibilities</Text>{responsibilities.map((item,i)=>(<View key={i} style={styles.responsibilityRow}><ArrowRight size={14} color="#F59E0B" /><Text style={[styles.responsibilityText, { color: theme.colors.textSecondary }]}>{item}</Text></View>))}</View>
      <View style={[styles.section, { backgroundColor: theme.colors.card || '#F2F2F7' }]}><Text style={[styles.sectionTitle, { color: theme.colors.text }]}>A2A Endpoints</Text>{['/consult/loyalty-engagement','/loyalty-engagement/execute','/loyalty-engagement/analyze'].map((ep,i)=>(<View key={i} style={styles.endpointRow}><Zap size={14} color="#8B5CF6" /><Text style={[styles.endpointText, { color: theme.colors.textSecondary }]}>{ep}</Text></View>))}</View>
      <AgentFeatures agentId="loyalty-engagement" agentName="AI Loyalty & Engagement Agent" />
      <View style={{ height: 40 }} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({container:{flex:1},hero:{alignItems:'center',paddingVertical:32,paddingHorizontal:20,borderBottomWidth:1},heroIconWrap:{width:88,height:88,borderRadius:44,justifyContent:'center',alignItems:'center',marginBottom:16},heroTitle:{fontSize:26,fontWeight:'bold'},heroSubtitle:{fontSize:15,marginTop:4,fontWeight:'500'},badgesRow:{flexDirection:'row',gap:10,marginTop:16},badge:{flexDirection:'row',alignItems:'center',paddingHorizontal:10,paddingVertical:5,borderRadius:20,gap:4},badgeText:{fontSize:12,fontWeight:'600'},statsContainer:{flexDirection:'row',flexWrap:'wrap',padding:16,gap:12},statCard:{flex:1,minWidth:'22%',alignItems:'center',padding:14,borderRadius:12},statValue:{fontSize:18,fontWeight:'bold',marginTop:8},statLabel:{fontSize:11,marginTop:4},section:{marginHorizontal:16,marginBottom:16,padding:20,borderRadius:16},sectionTitle:{fontSize:18,fontWeight:'700',marginBottom:14},description:{fontSize:14,lineHeight:22},tagsContainer:{flexDirection:'row',flexWrap:'wrap',gap:8},tag:{paddingHorizontal:12,paddingVertical:6,borderRadius:20},tagText:{fontSize:12,fontWeight:'600'},responsibilityRow:{flexDirection:'row',alignItems:'center',marginBottom:10,gap:8},responsibilityText:{fontSize:14,flex:1,lineHeight:20},endpointRow:{flexDirection:'row',alignItems:'center',marginBottom:8,gap:8},endpointText:{fontSize:13,fontFamily:'monospace'},parentCard:{flexDirection:'row',alignItems:'center',padding:16,borderRadius:12,gap:12},parentInfo:{flex:1},parentName:{fontSize:16,fontWeight:'600'},parentDesc:{fontSize:12,marginTop:2}});
