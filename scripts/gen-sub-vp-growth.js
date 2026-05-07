const fs=require('fs'),p=require('path');
const d=p.join(__dirname,'..','app','ai-agent','marketing','sub-agents');
const S=`const styles=StyleSheet.create({container:{flex:1},hero:{alignItems:'center',paddingVertical:36,paddingHorizontal:20,borderBottomWidth:1,borderBottomColor:'#E5E5EA'},heroIconWrap:{width:100,height:100,borderRadius:50,justifyContent:'center',alignItems:'center',marginBottom:16},heroTitle:{fontSize:22,fontWeight:'bold',textAlign:'center'},heroSubtitle:{fontSize:15,marginTop:6,fontWeight:'500'},badgesRow:{flexDirection:'row',gap:10,marginTop:16,flexWrap:'wrap',justifyContent:'center'},badge:{flexDirection:'row',alignItems:'center',paddingHorizontal:12,paddingVertical:6,borderRadius:20,gap:5},badgeText:{fontSize:12,fontWeight:'600'},statsContainer:{flexDirection:'row',flexWrap:'wrap',padding:16,gap:12},statCard:{flex:1,minWidth:'22%',alignItems:'center',padding:14,borderRadius:12},statValue:{fontSize:14,fontWeight:'bold',marginTop:8},statLabel:{fontSize:11,marginTop:4,textAlign:'center'},section:{marginHorizontal:16,marginBottom:16,padding:20,borderRadius:16},sectionTitle:{fontSize:18,fontWeight:'700',marginBottom:14},description:{fontSize:14,lineHeight:22},tagsContainer:{flexDirection:'row',flexWrap:'wrap',gap:8},tag:{paddingHorizontal:12,paddingVertical:6,borderRadius:20},tagText:{fontSize:12,fontWeight:'600'},responsibilityRow:{flexDirection:'row',alignItems:'center',marginBottom:10,gap:8},responsibilityText:{fontSize:14,flex:1,lineHeight:20},endpointRow:{flexDirection:'row',alignItems:'center',marginBottom:8,gap:8},endpointText:{fontSize:13,fontFamily:'monospace'},parentCard:{flexDirection:'row',alignItems:'center',padding:16,borderRadius:12,gap:12},parentInfo:{flex:1},parentName:{fontSize:16,fontWeight:'600'},parentDesc:{fontSize:12,marginTop:2},quickActionsGrid:{flexDirection:'row',flexWrap:'wrap',gap:12},quickActionButton:{flex:1,minWidth:'45%',alignItems:'center',padding:14,borderRadius:12},quickActionText:{fontSize:12,fontWeight:'600',marginTop:6}});`;

const agents=[
{id:'experiment-designer',name:'AI Experiment Designer',parent:'AI VP Growth',parentId:'vp-growth',color:'#FF6B35',icon:'FlaskConical',caps:['Experiment Design','Hypothesis Testing','Variable Control','Statistical Planning','Test Protocols','Result Prediction'],eps:['/consult/experiment-designer','/experiment-designer/execute','/experiment-designer/analyze'],overview:'Creates rigorous growth experiments with proper statistical controls, defining hypotheses, variables, sample sizes, and success criteria to ensure reliable and actionable results.',resps:['Design growth experiments with proper statistical controls','Define hypotheses and success criteria','Calculate required sample sizes and test duration','Configure variable isolation and control groups','Create experiment protocols and documentation','Predict expected outcomes and confidence intervals','Recommend experiment prioritization based on impact','Report experiment designs to VP Growth'],acts:[{t:'3 min ago',tx:'Designed checkout optimization experiment',ic:'FlaskConical'},{t:'20 min ago',tx:'Calculated sample size: 12,500 users',ic:'Target'},{t:'1 hour ago',tx:'Created 5 experiment protocols for Q3',ic:'Zap'},{t:'3 hours ago',tx:'Prioritized experiments by expected impact',ic:'Activity'}],qas:[{l:'New Experiment',ic:'FlaskConical'},{l:'Sample Calc',ic:'Target'},{l:'Protocols',ic:'Zap'},{l:'Prioritize',ic:'Activity'}]},
{id:'funnel-analyzer',name:'AI Funnel Analyzer',parent:'AI VP Growth',parentId:'vp-growth',color:'#FF6B35',icon:'Filter',caps:['Funnel Analysis','Drop-off Detection','Conversion Paths','User Journey','Bottleneck ID','Stage Optimization'],eps:['/consult/funnel-analyzer','/funnel-analyzer/execute','/funnel-analyzer/analyze'],overview:'Identifies drop-off points and bottlenecks across conversion funnels, providing actionable recommendations to improve flow-through rates at every customer journey stage.',resps:['Analyze conversion funnels across all touchpoints','Identify drop-off points and bottlenecks','Map user journey paths and friction points','Quantify conversion rate impact per stage','Recommend optimizations for each funnel stage','Track funnel performance trends over time','Compare funnel performance across segments','Report funnel insights to VP Growth'],acts:[{t:'1 min ago',tx:'Identified 34% drop-off at payment step',ic:'Filter'},{t:'15 min ago',tx:'Mobile funnel conversion improved 12%',ic:'Target'},{t:'1 hour ago',tx:'Mapped 5 user journey paths',ic:'Zap'},{t:'2 hours ago',tx:'Generated funnel comparison report',ic:'Activity'}],qas:[{l:'Funnel Report',ic:'Filter'},{l:'Drop-off Map',ic:'Target'},{l:'Journey Paths',ic:'Zap'},{l:'Optimize',ic:'Activity'}]},
{id:'ab-test-coordinator',name:'AI A/B Test Coordinator',parent:'AI VP Growth',parentId:'vp-growth',color:'#FF6B35',icon:'GitBranch',caps:['A/B Test Management','Significance Testing','Variant Control','Result Analysis','Test Scheduling','Multi-variant'],eps:['/consult/ab-test-coordinator','/ab-test-coordinator/execute','/ab-test-coordinator/analyze'],overview:'Manages the full lifecycle of A/B tests, from variant creation and traffic splitting to statistical significance validation and winner declaration.',resps:['Manage A/B test lifecycle from setup to conclusion','Configure traffic splitting and variant assignment','Monitor statistical significance in real-time','Declare winners and document results','Schedule and queue tests to avoid conflicts','Manage multi-variant test configurations','Prevent sample ratio mismatch and data quality issues','Report test results and recommendations to VP Growth'],acts:[{t:'2 min ago',tx:'Test #47 reached 95% significance',ic:'GitBranch'},{t:'18 min ago',tx:'Declared variant B winner in pricing test',ic:'Target'},{t:'1 hour ago',tx:'Queued 3 new tests for next sprint',ic:'Zap'},{t:'3 hours ago',tx:'Detected sample ratio mismatch in test #44',ic:'Activity'}],qas:[{l:'Test Status',ic:'GitBranch'},{l:'Significance',ic:'Target'},{l:'Queue Test',ic:'Zap'},{l:'Results',ic:'Activity'}]}
];

agents.forEach(a=>{
const fn=a.icon;
fs.writeFileSync(p.join(d,`${a.id}.tsx`),`import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useTheme } from '@/providers/ThemeProvider';
import { Activity, ${fn}, Clock, Target, Zap, ArrowRight, Briefcase, FlaskConical, Filter, GitBranch } from 'lucide-react-native';
import AgentFeatures from '@/components/ai-agent/AgentFeatures';
import { useRouter } from 'expo-router';

export default function ${a.id.split('-').map(w=>w[0].toUpperCase()+w.slice(1)).join('')}Page() {
  const { theme } = useTheme();
  const router = useRouter();
  const stats = [
    {label:'Status',value:'Active',icon:Activity,color:'#34C759'},
    {label:'Level',value:'Specialist',icon:Briefcase,color:'${a.color}'},
    {label:'Efficiency',value:'20x',icon:Target,color:'#FF9500'},
    {label:'Parent',value:'${a.parentId}',icon:${fn},color:'#007AFF'}
  ];
  const capabilities = ${JSON.stringify(a.caps)};
  const responsibilities = ${JSON.stringify(a.resps)};
  const activities = ${JSON.stringify(a.acts).replace(/"ic":/g,'icon:').replace(/"tx":/g,'text:').replace(/"t":/g,'time:')};
  const endpoints = ${JSON.stringify(a.eps)};
  const quickActions = ${JSON.stringify(a.qas).replace(/"ic":/g,'icon:').replace(/"l":/g,'label:')};
  return (
    <ScrollView style={[styles.container,{backgroundColor:theme.colors.background}]}>
      <View style={[styles.hero,{backgroundColor:'${a.color}18'}]}>
        <View style={[styles.heroIconWrap,{backgroundColor:'${a.color}25'}]}><${fn} size={56} color="${a.color}"/></View>
        <Text style={[styles.heroTitle,{color:theme.colors.text}]}>${a.name}</Text>
        <Text style={[styles.heroSubtitle,{color:theme.colors.textSecondary}]}>Sub-Agent of ${a.parent}</Text>
        <View style={styles.badgesRow}>
          <View style={[styles.badge,{backgroundColor:'#34C75922'}]}><Activity size={12} color="#34C759"/><Text style={[styles.badgeText,{color:'#34C759'}]}>Active</Text></View>
          <View style={[styles.badge,{backgroundColor:'${a.color}22'}]}><Briefcase size={12} color="${a.color}"/><Text style={[styles.badgeText,{color:'${a.color}'}]}>Specialist</Text></View>
        </View>
      </View>
      <View style={styles.statsContainer}>{stats.map((s,i)=>(<View key={i} style={[styles.statCard,{backgroundColor:theme.colors.card||'#F2F2F7'}]}><s.icon size={22} color={s.color}/><Text style={[styles.statValue,{color:theme.colors.text}]}>{s.value}</Text><Text style={[styles.statLabel,{color:theme.colors.textSecondary}]}>{s.label}</Text></View>))}</View>
      <View style={[styles.section,{backgroundColor:theme.colors.card||'#F2F2F7'}]}><Text style={[styles.sectionTitle,{color:theme.colors.text}]}>Overview</Text><Text style={[styles.description,{color:theme.colors.textSecondary}]}>${a.overview}</Text></View>
      <View style={[styles.section,{backgroundColor:theme.colors.card||'#F2F2F7'}]}><Text style={[styles.sectionTitle,{color:theme.colors.text}]}>Core Capabilities</Text><View style={styles.tagsContainer}>{capabilities.map((c,i)=>(<View key={i} style={[styles.tag,{backgroundColor:'${a.color}18'}]}><Text style={[styles.tagText,{color:'${a.color}'}]}>{c}</Text></View>))}</View></View>
      <View style={[styles.section,{backgroundColor:theme.colors.card||'#F2F2F7'}]}><Text style={[styles.sectionTitle,{color:theme.colors.text}]}>Key Responsibilities</Text>{responsibilities.map((r,i)=>(<View key={i} style={styles.responsibilityRow}><ArrowRight size={14} color="${a.color}"/><Text style={[styles.responsibilityText,{color:theme.colors.textSecondary}]}>{r}</Text></View>))}</View>
      <View style={[styles.section,{backgroundColor:theme.colors.card||'#F2F2F7'}]}><Text style={[styles.sectionTitle,{color:theme.colors.text}]}>A2A Endpoints</Text>{endpoints.map((e,i)=>(<View key={i} style={styles.endpointRow}><Zap size={14} color="#8B5CF6"/><Text style={[styles.endpointText,{color:theme.colors.textSecondary}]}>{e}</Text></View>))}</View>
      <View style={[styles.section,{backgroundColor:theme.colors.card||'#F2F2F7'}]}><Text style={[styles.sectionTitle,{color:theme.colors.text}]}>Recent Activity</Text>{activities.map((a2,i)=>(<View key={i} style={{flexDirection:'row',alignItems:'center',marginBottom:12,gap:12}}><View style={{width:32,height:32,borderRadius:16,justifyContent:'center',alignItems:'center',backgroundColor:'${a.color}15'}}><a2.icon size={14} color="${a.color}"/></View><View style={{flex:1}}><Text style={{fontSize:14,fontWeight:'500',color:theme.colors.text}}>{a2.text}</Text><Text style={{fontSize:12,marginTop:2,color:theme.colors.textSecondary}}>{a2.time}</Text></View></View>))}</View>
      <View style={[styles.section,{backgroundColor:theme.colors.card||'#F2F2F7'}]}><Text style={[styles.sectionTitle,{color:theme.colors.text}]}>Quick Actions</Text><View style={styles.quickActionsGrid}>{quickActions.map((qa,i)=>(<TouchableOpacity key={i} style={[styles.quickActionButton,{backgroundColor:'${a.color}12'}]}><qa.icon size={22} color="${a.color}"/><Text style={[styles.quickActionText,{color:'${a.color}'}]}>{qa.label}</Text></TouchableOpacity>))}</View></View>
      <View style={[styles.section,{backgroundColor:theme.colors.card||'#F2F2F7'}]}><Text style={[styles.sectionTitle,{color:theme.colors.text}]}>Parent Agent</Text><TouchableOpacity onPress={()=>router.push('/ai-agent/marketing/${a.parentId}')} style={[styles.parentCard,{backgroundColor:theme.colors.background||'#F2F2F7'}]}><${fn} size={24} color="${a.color}"/><View style={styles.parentInfo}><Text style={[styles.parentName,{color:theme.colors.text}]}>${a.parent}</Text><Text style={[styles.parentDesc,{color:theme.colors.textSecondary}]}>Main Agent</Text></View><ArrowRight size={20} color={theme.colors.textSecondary}/></TouchableOpacity></View>
      <AgentFeatures agentId="${a.id}" agentName="${a.name}" />
      <View style={{height:40}}/>
    </ScrollView>
  );
}
${S}`);
console.log('Written: '+a.id+'.tsx');
});
console.log('VP Growth sub-agents done!');
