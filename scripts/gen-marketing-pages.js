const fs = require('fs');
const path = require('path');

const baseDir = path.join(__dirname, '..', 'app', 'ai-agent', 'marketing');
const subDir = path.join(baseDir, 'sub-agents');

const vpGrowthContent = `import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useTheme } from '@/providers/ThemeProvider';
import { TrendingUp, Activity, Star, CircleCheckBig, Clock, Target, ArrowRight, Users, FlaskConical, Filter, GitBranch, MessageSquare } from 'lucide-react-native';
import AgentFeatures from '@/components/ai-agent/AgentFeatures';
import { useRouter } from 'expo-router';

export default function VPGrowthPage() {
  const { theme } = useTheme();
  const router = useRouter();
  const stats = [
    { label: 'Experiments', value: '1,417', icon: CircleCheckBig, color: '#34C759' },
    { label: 'Uptime', value: '99.9%', icon: Activity, color: '#007AFF' },
    { label: 'Response', value: '0.2s', icon: Clock, color: '#FF9500' },
    { label: 'Accuracy', value: '98.1%', icon: Target, color: '#FF6B35' },
  ];
  const capabilities = ['Growth Experiments','Funnel Optimization','A/B Testing','Conversion Rate','User Acquisition','Retention Analytics','Viral Loops','Product-Led Growth'];
  const responsibilities = [
    'Design and execute growth experiments across channels',
    'Analyze funnel performance and identify drop-off points',
    'Coordinate A/B tests and statistical validation',
    'Optimize conversion rates at every touchpoint',
    'Drive user acquisition and retention strategies',
    'Build viral loops and referral programs',
    'Collaborate on product-led growth initiatives',
    'Report growth metrics to CMO',
  ];
  const activities = [
    { time: '3 min ago', text: 'Launched A/B test on onboarding flow', icon: GitBranch },
    { time: '20 min ago', text: 'Analyzed funnel drop-off at step 3', icon: Filter },
    { time: '1 hour ago', text: 'Designed 5 new growth experiments', icon: FlaskConical },
    { time: '3 hours ago', text: 'Reported 23% lift from CRO test', icon: TrendingUp },
  ];
  const quickActions = [
    { label: 'New Experiment', icon: FlaskConical },
    { label: 'Funnel Report', icon: Filter },
    { label: 'A/B Results', icon: GitBranch },
    { label: 'Team Chat', icon: MessageSquare },
  ];
  const subAgents = [
    { name: 'AI Experiment Designer', id: 'experiment-designer', icon: FlaskConical, desc: 'Design & configure growth experiments' },
    { name: 'AI Funnel Analyzer', id: 'funnel-analyzer', icon: Filter, desc: 'Funnel performance & drop-off analysis' },
    { name: 'AI A/B Test Coordinator', id: 'ab-test-coordinator', icon: GitBranch, desc: 'A/B test management & tracking' },
  ];
  return (
    <ScrollView style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <View style={[styles.hero, { backgroundColor: '#FF6B3518' }]}>
        <View style={[styles.heroIconWrap, { backgroundColor: '#FF6B3525' }]}><TrendingUp size={48} color="#FF6B35" /></View>
        <Text style={[styles.heroTitle, { color: theme.colors.text }]}>AI VP Growth</Text>
        <Text style={[styles.heroSubtitle, { color: theme.colors.textSecondary }]}>Marketing & Growth Department</Text>
        <View style={styles.badgesRow}>
          <View style={[styles.badge, { backgroundColor: '#34C75922' }]}><Activity size={12} color="#34C759" /><Text style={[styles.badgeText, { color: '#34C759' }]}>Active</Text></View>
          <View style={[styles.badge, { backgroundColor: '#FF6B3522' }]}><Star size={12} color="#FF6B35" /><Text style={[styles.badgeText, { color: '#FF6B35' }]}>VP Level</Text></View>
          <View style={[styles.badge, { backgroundColor: '#FF950022' }]}><Users size={12} color="#FF9500" /><Text style={[styles.badgeText, { color: '#FF9500' }]}>3 Sub-Agents</Text></View>
        </View>
      </View>
      <View style={styles.statsContainer}>{stats.map((s,i)=>(<View key={i} style={[styles.statCard,{backgroundColor:theme.colors.card||'#F2F2F7'}]}><s.icon size={22} color={s.color}/><Text style={[styles.statValue,{color:theme.colors.text}]}>{s.value}</Text><Text style={[styles.statLabel,{color:theme.colors.textSecondary}]}>{s.label}</Text></View>))}</View>
      <View style={[styles.section,{backgroundColor:theme.colors.card||'#F2F2F7'}]}><Text style={[styles.sectionTitle,{color:theme.colors.text}]}>Overview</Text><Text style={[styles.description,{color:theme.colors.textSecondary}]}>The AI VP Growth drives experimentation-led growth. It designs A/B tests, analyzes funnels, optimizes conversions, and scales user acquisition and retention strategies.</Text></View>
      <View style={[styles.section,{backgroundColor:theme.colors.card||'#F2F2F7'}]}><Text style={[styles.sectionTitle,{color:theme.colors.text}]}>Capabilities</Text><View style={styles.tagsContainer}>{capabilities.map((c,i)=>(<View key={i} style={[styles.tag,{backgroundColor:'#FF6B3518'}]}><Text style={[styles.tagText,{color:'#FF6B35'}]}>{c}</Text></View>))}</View></View>
      <View style={[styles.section,{backgroundColor:theme.colors.card||'#F2F2F7'}]}><Text style={[styles.sectionTitle,{color:theme.colors.text}]}>Key Responsibilities</Text>{responsibilities.map((r,i)=>(<View key={i} style={styles.responsibilityRow}><ArrowRight size={14} color="#FF6B35"/><Text style={[styles.responsibilityText,{color:theme.colors.textSecondary}]}>{r}</Text></View>))}</View>
      <View style={[styles.section,{backgroundColor:theme.colors.card||'#F2F2F7'}]}><Text style={[styles.sectionTitle,{color:theme.colors.text}]}>Sub-Agents</Text>{subAgents.map((a,i)=>(<TouchableOpacity key={i} onPress={()=>router.push(\`/ai-agent/marketing/sub-agents/\${a.id}\`)} style={[styles.subAgentCard,{backgroundColor:theme.colors.background||'#F2F2F7'}]}><View style={[styles.subAgentIcon,{backgroundColor:'#FF6B3515'}]}><a.icon size={20} color="#FF6B35"/></View><View style={styles.subAgentInfo}><Text style={[styles.subAgentName,{color:theme.colors.text}]}>{a.name}</Text><Text style={[styles.subAgentDesc,{color:theme.colors.textSecondary}]}>{a.desc}</Text></View><ArrowRight size={18} color={theme.colors.textSecondary}/></TouchableOpacity>))}</View>
      <View style={[styles.section,{backgroundColor:theme.colors.card||'#F2F2F7'}]}><Text style={[styles.sectionTitle,{color:theme.colors.text}]}>Recent Activity</Text>{activities.map((a,i)=>(<View key={i} style={styles.activityRow}><View style={[styles.activityIcon,{backgroundColor:'#FF6B3515'}]}><a.icon size={14} color="#FF6B35"/></View><View style={styles.activityContent}><Text style={[styles.activityText,{color:theme.colors.text}]}>{a.text}</Text><Text style={[styles.activityTime,{color:theme.colors.textSecondary}]}>{a.time}</Text></View></View>))}</View>
      <View style={[styles.section,{backgroundColor:theme.colors.card||'#F2F2F7'}]}><Text style={[styles.sectionTitle,{color:theme.colors.text}]}>Quick Actions</Text><View style={styles.actionsGrid}>{quickActions.map((a,i)=>(<TouchableOpacity key={i} style={[styles.actionButton,{backgroundColor:'#FF6B3512'}]}><a.icon size={24} color="#FF6B35"/><Text style={[styles.actionText,{color:'#FF6B35'}]}>{a.label}</Text></TouchableOpacity>))}</View></View>
      <AgentFeatures agentId="vp-growth" agentName="AI VP Growth" />
      <View style={{height:40}}/>
    </ScrollView>
  );
}
const styles = StyleSheet.create({container:{flex:1},hero:{alignItems:'center',paddingVertical:32,paddingHorizontal:20,borderBottomWidth:1,borderBottomColor:'#E5E5EA'},heroIconWrap:{width:88,height:88,borderRadius:44,justifyContent:'center',alignItems:'center',marginBottom:16},heroTitle:{fontSize:24,fontWeight:'bold',textAlign:'center'},heroSubtitle:{fontSize:15,marginTop:4,fontWeight:'500'},badgesRow:{flexDirection:'row',marginTop:16,gap:8,flexWrap:'wrap',justifyContent:'center'},badge:{flexDirection:'row',alignItems:'center',paddingHorizontal:10,paddingVertical:5,borderRadius:20,gap:4},badgeText:{fontSize:12,fontWeight:'600'},statsContainer:{flexDirection:'row',flexWrap:'wrap',padding:16,gap:12},statCard:{flex:1,minWidth:'22%',alignItems:'center',padding:14,borderRadius:12},statValue:{fontSize:18,fontWeight:'bold',marginTop:8},statLabel:{fontSize:11,marginTop:4},section:{marginHorizontal:16,marginBottom:16,padding:20,borderRadius:16},sectionTitle:{fontSize:18,fontWeight:'700',marginBottom:14},description:{fontSize:14,lineHeight:22},tagsContainer:{flexDirection:'row',flexWrap:'wrap',gap:8},tag:{paddingHorizontal:12,paddingVertical:6,borderRadius:20},tagText:{fontSize:12,fontWeight:'600'},responsibilityRow:{flexDirection:'row',alignItems:'center',marginBottom:10,gap:8},responsibilityText:{fontSize:14,flex:1,lineHeight:20},subAgentCard:{flexDirection:'row',alignItems:'center',padding:14,borderRadius:12,marginBottom:8,gap:12},subAgentIcon:{width:40,height:40,borderRadius:20,justifyContent:'center',alignItems:'center'},subAgentInfo:{flex:1},subAgentName:{fontSize:15,fontWeight:'600'},subAgentDesc:{fontSize:12,marginTop:2},activityRow:{flexDirection:'row',alignItems:'center',marginBottom:12,gap:12},activityIcon:{width:32,height:32,borderRadius:16,justifyContent:'center',alignItems:'center'},activityContent:{flex:1},activityText:{fontSize:14,fontWeight:'500'},activityTime:{fontSize:12,marginTop:2},actionsGrid:{flexDirection:'row',flexWrap:'wrap',gap:12},actionButton:{flex:1,minWidth:'45%',alignItems:'center',padding:16,borderRadius:12},actionText:{fontSize:13,fontWeight:'600',marginTop:8}});
`;

// Write VP Growth
fs.writeFileSync(path.join(baseDir, 'vp-growth.tsx'), vpGrowthContent);
console.log('Created: vp-growth.tsx');

console.log('Done generating marketing pages!');
