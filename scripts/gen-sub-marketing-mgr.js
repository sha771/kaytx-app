const fs=require('fs'),p=require('path');
const d=p.join(__dirname,'..','app','ai-agent','marketing','sub-agents');
const S=`const styles=StyleSheet.create({container:{flex:1},hero:{alignItems:'center',paddingVertical:36,paddingHorizontal:20,borderBottomWidth:1,borderBottomColor:'#E5E5EA'},heroIconWrap:{width:100,height:100,borderRadius:50,justifyContent:'center',alignItems:'center',marginBottom:16},heroTitle:{fontSize:22,fontWeight:'bold',textAlign:'center'},heroSubtitle:{fontSize:15,marginTop:6,fontWeight:'500'},badgesRow:{flexDirection:'row',gap:10,marginTop:16,flexWrap:'wrap',justifyContent:'center'},badge:{flexDirection:'row',alignItems:'center',paddingHorizontal:12,paddingVertical:6,borderRadius:20,gap:5},badgeText:{fontSize:12,fontWeight:'600'},statsContainer:{flexDirection:'row',flexWrap:'wrap',padding:16,gap:12},statCard:{flex:1,minWidth:'22%',alignItems:'center',padding:14,borderRadius:12},statValue:{fontSize:14,fontWeight:'bold',marginTop:8},statLabel:{fontSize:11,marginTop:4,textAlign:'center'},section:{marginHorizontal:16,marginBottom:16,padding:20,borderRadius:16},sectionTitle:{fontSize:18,fontWeight:'700',marginBottom:14},description:{fontSize:14,lineHeight:22},tagsContainer:{flexDirection:'row',flexWrap:'wrap',gap:8},tag:{paddingHorizontal:12,paddingVertical:6,borderRadius:20},tagText:{fontSize:12,fontWeight:'600'},responsibilityRow:{flexDirection:'row',alignItems:'center',marginBottom:10,gap:8},responsibilityText:{fontSize:14,flex:1,lineHeight:20},endpointRow:{flexDirection:'row',alignItems:'center',marginBottom:8,gap:8},endpointText:{fontSize:13,fontFamily:'monospace'},parentCard:{flexDirection:'row',alignItems:'center',padding:16,borderRadius:12,gap:12},parentInfo:{flex:1},parentName:{fontSize:16,fontWeight:'600'},parentDesc:{fontSize:12,marginTop:2},quickActionsGrid:{flexDirection:'row',flexWrap:'wrap',gap:12},quickActionButton:{flex:1,minWidth:'45%',alignItems:'center',padding:14,borderRadius:12},quickActionText:{fontSize:12,fontWeight:'600',marginTop:6}});`;

const agents=[
{id:'task-assigner',name:'AI Task Assigner',parent:'AI Marketing Manager',parentId:'marketing-manager',color:'#E65100',icon:'UserPlus',caps:['Task Assignment','Workload Balancing','Skill Matching','Priority Routing','Team Capacity','Auto-delegation'],eps:['/consult/task-assigner','/task-assigner/execute','/task-assigner/analyze'],overview:'Intelligently assigns marketing tasks to team members based on skills, capacity, and priority, ensuring balanced workloads and optimal resource utilization.',resps:['Assign tasks based on team member skills and capacity','Balance workloads across the marketing team','Route high-priority tasks to appropriate specialists','Monitor team capacity and availability','Auto-delegate routine tasks to available resources','Track task completion rates and bottlenecks','Recommend team structure adjustments','Report task assignment metrics to Marketing Manager'],acts:[{t:'1 min ago',tx:'Assigned 5 content tasks to writing team',ic:'UserPlus'},{t:'10 min ago',tx:'Rebalanced workload: moved 3 tasks to design',ic:'Target'},{t:'1 hour ago',tx:'Auto-delegated 12 routine tasks',ic:'Zap'},{t:'2 hours ago',tx:'Flagged capacity issue in social team',ic:'Activity'}],qas:[{l:'Assign Task',ic:'UserPlus'},{l:'Workload',ic:'Target'},{l:'Auto-delegate',ic:'Zap'},{l:'Capacity',ic:'Activity'}]},
{id:'deadline-tracker',name:'AI Deadline Tracker',parent:'AI Marketing Manager',parentId:'marketing-manager',color:'#E65100',icon:'Timer',caps:['Deadline Monitoring','Risk Escalation','Timeline Tracking','Milestone Alerts','Dependency Mapping','Progress Tracking'],eps:['/consult/deadline-tracker','/deadline-tracker/execute','/deadline-tracker/analyze'],overview:'Monitors all marketing deadlines, identifies at-risk deliverables, and escalates issues proactively to ensure every project is delivered on time.',resps:['Monitor all marketing project deadlines','Identify and flag at-risk deliverables early','Escalate deadline risks to appropriate stakeholders','Map task dependencies and critical path items','Send milestone alerts and deadline reminders','Track progress against planned timelines','Calculate schedule variance and slippage','Report deadline status and risk assessment to Marketing Manager'],acts:[{t:'30 sec ago',tx:'Alert: Campaign X assets due in 2 hours (at risk)',ic:'Timer'},{t:'10 min ago',tx:'Escalated 2 overdue deliverables to VP',ic:'Target'},{t:'1 hour ago',tx:'Updated critical path for Q3 launch',ic:'Zap'},{t:'3 hours ago',tx:'Generated deadline compliance report: 94%',ic:'Activity'}],qas:[{l:'Deadlines',ic:'Timer'},{l:'Escalations',ic:'Target'},{l:'Critical Path',ic:'Zap'},{l:'Compliance',ic:'Activity'}]},
{id:'marketing-spend-monitor',name:'AI Marketing Spend Monitor',parent:'AI Marketing Manager',parentId:'marketing-manager',color:'#E65100',icon:'DollarSign',caps:['Spend Tracking','Budget Monitoring','Variance Alerts','Cost Optimization','Invoice Tracking','Financial Reporting'],eps:['/consult/marketing-spend-monitor','/marketing-spend-monitor/execute','/marketing-spend-monitor/analyze'],overview:'Tracks marketing spend against budget allocations in real-time, alerting on variances and providing cost optimization recommendations to keep spending within targets.',resps:['Track marketing spend against budget in real-time','Alert on budget variances and overspend risks','Monitor invoice processing and payment status','Identify cost optimization opportunities','Track spend by channel, campaign, and team','Forecast end-of-period spend based on current trajectory','Generate financial reports for marketing leadership','Report spend status and variance analysis to Marketing Manager'],acts:[{t:'2 min ago',tx:'Alert: Social media spend at 89% of monthly budget',ic:'DollarSign'},{t:'15 min ago',tx:'Processed 8 vendor invoices ($42K total)',ic:'Target'},{t:'1 hour ago',tx:'Identified $15K in potential cost savings',ic:'Zap'},{t:'3 hours ago',tx:'Generated monthly spend variance report',ic:'Activity'}],qas:[{l:'Spend Status',ic:'DollarSign'},{l:'Variance',ic:'Target'},{l:'Cost Savings',ic:'Zap'},{l:'Financial Report',ic:'Activity'}]}
];

agents.forEach(a=>{
const fn=a.icon;
fs.writeFileSync(p.join(d,`${a.id}.tsx`),`import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useTheme } from '@/providers/ThemeProvider';
import { Activity, ${fn}, Clock, Target, Zap, ArrowRight, Briefcase, UserPlus, Timer, DollarSign } from 'lucide-react-native';
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
console.log('Marketing Manager sub-agents done!');
