const fs=require('fs'),p=require('path');
const d=p.join(__dirname,'..','app','ai-agent','marketing','sub-agents');
const S=`const styles=StyleSheet.create({container:{flex:1},hero:{alignItems:'center',paddingVertical:36,paddingHorizontal:20,borderBottomWidth:1,borderBottomColor:'#E5E5EA'},heroIconWrap:{width:100,height:100,borderRadius:50,justifyContent:'center',alignItems:'center',marginBottom:16},heroTitle:{fontSize:22,fontWeight:'bold',textAlign:'center'},heroSubtitle:{fontSize:15,marginTop:6,fontWeight:'500'},badgesRow:{flexDirection:'row',gap:10,marginTop:16,flexWrap:'wrap',justifyContent:'center'},badge:{flexDirection:'row',alignItems:'center',paddingHorizontal:12,paddingVertical:6,borderRadius:20,gap:5},badgeText:{fontSize:12,fontWeight:'600'},statsContainer:{flexDirection:'row',flexWrap:'wrap',padding:16,gap:12},statCard:{flex:1,minWidth:'22%',alignItems:'center',padding:14,borderRadius:12},statValue:{fontSize:14,fontWeight:'bold',marginTop:8},statLabel:{fontSize:11,marginTop:4,textAlign:'center'},section:{marginHorizontal:16,marginBottom:16,padding:20,borderRadius:16},sectionTitle:{fontSize:18,fontWeight:'700',marginBottom:14},description:{fontSize:14,lineHeight:22},tagsContainer:{flexDirection:'row',flexWrap:'wrap',gap:8},tag:{paddingHorizontal:12,paddingVertical:6,borderRadius:20},tagText:{fontSize:12,fontWeight:'600'},responsibilityRow:{flexDirection:'row',alignItems:'center',marginBottom:10,gap:8},responsibilityText:{fontSize:14,flex:1,lineHeight:20},endpointRow:{flexDirection:'row',alignItems:'center',marginBottom:8,gap:8},endpointText:{fontSize:13,fontFamily:'monospace'},parentCard:{flexDirection:'row',alignItems:'center',padding:16,borderRadius:12,gap:12},parentInfo:{flex:1},parentName:{fontSize:16,fontWeight:'600'},parentDesc:{fontSize:12,marginTop:2},quickActionsGrid:{flexDirection:'row',flexWrap:'wrap',gap:12},quickActionButton:{flex:1,minWidth:'45%',alignItems:'center',padding:14,borderRadius:12},quickActionText:{fontSize:12,fontWeight:'600',marginTop:6}});`;

const agents=[
{id:'brand-perception-monitor',name:'AI Brand Perception Monitor',parent:'AI VP Brand',parentId:'vp-brand',color:'#9C27B0',icon:'Eye',caps:['Sentiment Analysis','Perception Tracking','Social Listening','Brand Health','Competitor Monitoring','Reputation Alerts'],eps:['/consult/brand-perception-monitor','/brand-perception-monitor/execute','/brand-perception-monitor/analyze'],overview:'Continuously tracks brand sentiment across all channels, providing real-time alerts on perception shifts, competitive positioning changes, and reputation risks.',resps:['Monitor brand sentiment across social and review platforms','Track perception shifts and alert on significant changes','Analyze competitor brand positioning in real-time','Generate brand health scorecards','Identify reputation risks before they escalate','Measure brand awareness and recall metrics','Correlate perception data with marketing activities','Report brand health insights to VP Brand'],acts:[{t:'2 min ago',tx:'Detected positive sentiment spike on Twitter',ic:'Eye'},{t:'20 min ago',tx:'Brand health score: 87/100 (+3)',ic:'Target'},{t:'1 hour ago',tx:'Flagged competitor rebranding activity',ic:'Zap'},{t:'3 hours ago',tx:'Generated weekly perception report',ic:'Activity'}],qas:[{l:'Sentiment Scan',ic:'Eye'},{l:'Brand Health',ic:'Target'},{l:'Competitor Alert',ic:'Zap'},{l:'Weekly Report',ic:'Activity'}]},
{id:'brand-guidelines-enforcer',name:'AI Brand Guidelines Enforcer',parent:'AI VP Brand',parentId:'vp-brand',color:'#9C27B0',icon:'Shield',caps:['Guideline Compliance','Asset Validation','Brand Police','Template Enforcement','Color/Typography','Logo Usage'],eps:['/consult/brand-guidelines-enforcer','/brand-guidelines-enforcer/execute','/brand-guidelines-enforcer/analyze'],overview:'Automatically validates all marketing assets against brand guidelines, ensuring consistent use of logos, colors, typography, and messaging across every touchpoint.',resps:['Validate marketing assets against brand guidelines','Enforce logo usage and placement rules','Check color palette compliance in all materials','Verify typography standards across documents','Flag guideline violations and suggest corrections','Maintain brand template library','Audit external partner materials for compliance','Generate compliance reports for VP Brand'],acts:[{t:'5 min ago',tx:'Flagged 3 color violations in campaign assets',ic:'Shield'},{t:'30 min ago',tx:'Approved 12 assets for brand compliance',ic:'Target'},{t:'1 hour ago',tx:'Updated brand template library v4.2',ic:'Zap'},{t:'2 hours ago',tx:'Rejected partner asset for logo misuse',ic:'Activity'}],qas:[{l:'Validate Asset',ic:'Shield'},{l:'Compliance Report',ic:'Target'},{l:'Templates',ic:'Zap'},{l:'Violations',ic:'Activity'}]},
{id:'visual-identity-auditor',name:'AI Visual Identity Auditor',parent:'AI VP Brand',parentId:'vp-brand',color:'#9C27B0',icon:'Image',caps:['Visual Auditing','Asset Consistency','Design Compliance','Image Analysis','Brand Standards','Template Validation'],eps:['/consult/visual-identity-auditor','/visual-identity-auditor/execute','/visual-identity-auditor/analyze'],overview:'Performs automated visual consistency checks across all brand assets, ensuring design elements, imagery, and layouts conform to established brand standards.',resps:['Audit visual consistency across all brand touchpoints','Analyze image and design element compliance','Check layout and composition standards','Verify photography style guidelines','Identify visual drift from brand standards','Generate visual audit reports with fix recommendations','Track visual identity evolution over time','Report visual compliance metrics to VP Brand'],acts:[{t:'3 min ago',tx:'Completed visual audit of 45 social assets',ic:'Image'},{t:'25 min ago',tx:'Detected visual drift in email templates',ic:'Target'},{t:'1 hour ago',tx:'Approved new photography style guide',ic:'Zap'},{t:'3 hours ago',tx:'Generated monthly visual audit report',ic:'Activity'}],qas:[{l:'Visual Audit',ic:'Image'},{l:'Drift Report',ic:'Target'},{l:'Style Guide',ic:'Zap'},{l:'Compliance',ic:'Activity'}]}
];

agents.forEach(a=>{
const fn=a.icon;
fs.writeFileSync(p.join(d,`${a.id}.tsx`),`import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useTheme } from '@/providers/ThemeProvider';
import { Activity, ${fn}, Clock, Target, Zap, ArrowRight, Briefcase, Eye, Shield, Image as ImageIcon } from 'lucide-react-native';
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
console.log('VP Brand sub-agents done!');
