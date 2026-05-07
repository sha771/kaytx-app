const fs=require('fs'),p=require('path');
const d=p.join(__dirname,'..','app','ai-agent','marketing','sub-agents');
const S=`const styles=StyleSheet.create({container:{flex:1},hero:{alignItems:'center',paddingVertical:36,paddingHorizontal:20,borderBottomWidth:1,borderBottomColor:'#E5E5EA'},heroIconWrap:{width:100,height:100,borderRadius:50,justifyContent:'center',alignItems:'center',marginBottom:16},heroTitle:{fontSize:22,fontWeight:'bold',textAlign:'center'},heroSubtitle:{fontSize:15,marginTop:6,fontWeight:'500'},badgesRow:{flexDirection:'row',gap:10,marginTop:16,flexWrap:'wrap',justifyContent:'center'},badge:{flexDirection:'row',alignItems:'center',paddingHorizontal:12,paddingVertical:6,borderRadius:20,gap:5},badgeText:{fontSize:12,fontWeight:'600'},statsContainer:{flexDirection:'row',flexWrap:'wrap',padding:16,gap:12},statCard:{flex:1,minWidth:'22%',alignItems:'center',padding:14,borderRadius:12},statValue:{fontSize:14,fontWeight:'bold',marginTop:8},statLabel:{fontSize:11,marginTop:4,textAlign:'center'},section:{marginHorizontal:16,marginBottom:16,padding:20,borderRadius:16},sectionTitle:{fontSize:18,fontWeight:'700',marginBottom:14},description:{fontSize:14,lineHeight:22},tagsContainer:{flexDirection:'row',flexWrap:'wrap',gap:8},tag:{paddingHorizontal:12,paddingVertical:6,borderRadius:20},tagText:{fontSize:12,fontWeight:'600'},responsibilityRow:{flexDirection:'row',alignItems:'center',marginBottom:10,gap:8},responsibilityText:{fontSize:14,flex:1,lineHeight:20},endpointRow:{flexDirection:'row',alignItems:'center',marginBottom:8,gap:8},endpointText:{fontSize:13,fontFamily:'monospace'},parentCard:{flexDirection:'row',alignItems:'center',padding:16,borderRadius:12,gap:12},parentInfo:{flex:1},parentName:{fontSize:16,fontWeight:'600'},parentDesc:{fontSize:12,marginTop:2},quickActionsGrid:{flexDirection:'row',flexWrap:'wrap',gap:12},quickActionButton:{flex:1,minWidth:'45%',alignItems:'center',padding:14,borderRadius:12},quickActionText:{fontSize:12,fontWeight:'600',marginTop:6}});`;

const agents=[
{id:'channel-planner',name:'AI Channel Planner',parent:'AI VP Marketing',parentId:'vp-marketing',color:'#D81B60',icon:'Layers',caps:['Channel Strategy','Media Planning','Audience Targeting','Channel Mix','Budget Split','Cross-channel'],eps:['/consult/channel-planner','/channel-planner/execute','/channel-planner/analyze'],overview:'Designs and optimizes channel strategies, determining the ideal media mix and budget allocation across channels to maximize reach and engagement with target audiences.',resps:['Design channel strategies aligned with campaign goals','Determine optimal media mix for target audiences','Plan budget splits across paid, owned, and earned channels','Evaluate channel performance and reallocate spend','Identify new channel opportunities for expansion','Coordinate cross-channel messaging consistency','Forecast channel-specific ROI projections','Report channel performance to VP Marketing'],acts:[{t:'4 min ago',tx:'Optimized channel mix for Q3 campaign',ic:'Layers'},{t:'25 min ago',tx:'Identified TikTok as high-potential channel',ic:'Target'},{t:'1 hour ago',tx:'Rebalanced budget across 6 channels',ic:'Zap'},{t:'3 hours ago',tx:'Delivered channel performance report',ic:'Activity'}],qas:[{l:'Channel Mix',ic:'Layers'},{l:'Budget Split',ic:'Target'},{l:'New Channels',ic:'Zap'},{l:'Performance',ic:'Activity'}]},
{id:'marketing-calendar-manager',name:'AI Marketing Calendar Manager',parent:'AI VP Marketing',parentId:'vp-marketing',color:'#D81B60',icon:'Calendar',caps:['Calendar Management','Campaign Scheduling','Timeline Planning','Event Coordination','Deadline Tracking','Cross-team Sync'],eps:['/consult/marketing-calendar-manager','/marketing-calendar-manager/execute','/marketing-calendar-manager/analyze'],overview:'Orchestrates all marketing timelines, scheduling campaigns, content, and events across teams. Ensures no conflicts, optimal timing, and seamless cross-functional coordination.',resps:['Manage master marketing calendar across teams','Schedule campaigns with optimal timing windows','Coordinate cross-team dependencies and deadlines','Track and escalate at-risk deliverables','Align content publishing with campaign launches','Manage seasonal and event-driven planning','Sync calendar with sales and product teams','Generate weekly calendar status reports'],acts:[{t:'1 min ago',tx:'Scheduled 12 content pieces for next week',ic:'Calendar'},{t:'15 min ago',tx:'Resolved scheduling conflict between 2 campaigns',ic:'Target'},{t:'1 hour ago',tx:'Synced Q3 calendar with product launches',ic:'Zap'},{t:'2 hours ago',tx:'Sent deadline reminders to 3 teams',ic:'Activity'}],qas:[{l:'View Calendar',ic:'Calendar'},{l:'Schedule',ic:'Target'},{l:'Conflicts',ic:'Zap'},{l:'Weekly Report',ic:'Activity'}]},
{id:'campaign-coordinator',name:'AI Campaign Coordinator',parent:'AI VP Marketing',parentId:'vp-marketing',color:'#D81B60',icon:'GitMerge',caps:['Campaign Orchestration','Cross-team Coordination','Milestone Tracking','Status Reporting','Issue Escalation','Launch Management'],eps:['/consult/campaign-coordinator','/campaign-coordinator/execute','/campaign-coordinator/analyze'],overview:'Manages end-to-end campaign execution, coordinating across teams, tracking milestones, and ensuring every campaign launches on time with all components in place.',resps:['Coordinate end-to-end campaign execution','Track campaign milestones and deliverables','Manage cross-team dependencies and handoffs','Escalate issues and blockers proactively','Ensure all campaign assets are ready for launch','Run pre-launch checklists and quality gates','Monitor campaign health during execution','Generate campaign status reports for leadership'],acts:[{t:'2 min ago',tx:'Cleared 3 campaigns for launch readiness',ic:'GitMerge'},{t:'20 min ago',tx:'Escalated design asset delay for Campaign X',ic:'Target'},{t:'1 hour ago',tx:'Completed pre-launch checklist for Q3 push',ic:'Zap'},{t:'3 hours ago',tx:'Generated campaign status dashboard',ic:'Activity'}],qas:[{l:'Launch Check',ic:'GitMerge'},{l:'Milestones',ic:'Target'},{l:'Escalations',ic:'Zap'},{l:'Status Report',ic:'Activity'}]}
];

agents.forEach(a=>{
const fn=a.icon;
fs.writeFileSync(p.join(d,`${a.id}.tsx`),`import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useTheme } from '@/providers/ThemeProvider';
import { Activity, ${fn}, Clock, Target, Zap, ArrowRight, Briefcase, Layers, Calendar, GitMerge } from 'lucide-react-native';
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
console.log('VP Marketing sub-agents done!');
