const fs=require('fs'),p=require('path');
const D=p.join(__dirname,'..','app','ai-agent','sales');
const S=p.join(D,'sub-agents');

const S2=`container:{flex:1},tabContent:{padding:20},metricsGrid:{flexDirection:'row',flexWrap:'wrap',gap:12,marginBottom:25},metricCard:{flex:1,minWidth:'45%',padding:16,borderRadius:20,gap:8},metricValue:{fontSize:22,fontWeight:'800',color:'#fff'},metricLabel:{fontSize:11,color:'rgba(255,255,255,0.8)'},section:{padding:20,borderRadius:24,marginBottom:20},sectionHeader:{flexDirection:'row',justifyContent:'space-between',alignItems:'center',marginBottom:20},sectionTitleRow:{flexDirection:'row',alignItems:'center',gap:10},sectionTitle:{fontSize:18,fontWeight:'700'},subAgentList:{gap:12},subAgentCard:{flexDirection:'row',justifyContent:'space-between',alignItems:'center',backgroundColor:'rgba(0,0,0,0.02)',padding:16,borderRadius:16},subAgentLeft:{flexDirection:'row',alignItems:'center',gap:14},subAgentIcon:{width:44,height:44,borderRadius:14,justifyContent:'center',alignItems:'center'},subAgentName:{fontSize:15,fontWeight:'700'},subAgentStat:{fontSize:12},activeDot:{width:8,height:8,borderRadius:4},pipelineItem:{flexDirection:'row',justifyContent:'space-between',alignItems:'center',paddingVertical:12,borderBottomWidth:1,borderBottomColor:'rgba(0,0,0,0.05)'},pipelineLeft:{flexDirection:'row',alignItems:'center',gap:12},pipelineNumber:{width:28,height:28,borderRadius:8,justifyContent:'center',alignItems:'center'},pipelineNumberText:{fontSize:12,fontWeight:'800'},pipelineStage:{fontSize:14,fontWeight:'600'},pipelineValue:{fontSize:11,marginTop:2},conversionBadge:{paddingHorizontal:10,paddingVertical:4,borderRadius:8},conversionText:{fontSize:12,fontWeight:'700'},insightCard:{padding:14,borderRadius:12,borderLeftWidth:4,backgroundColor:'rgba(0,0,0,0.02)',marginBottom:8},insightMessage:{fontSize:14,lineHeight:20},dataCard:{backgroundColor:'rgba(0,0,0,0.02)',padding:16,borderRadius:16,marginBottom:12},dataHeader:{flexDirection:'row',justifyContent:'space-between',alignItems:'flex-start'},dataLeft:{flex:1},dataTitle:{fontSize:15,fontWeight:'700'},dataSubtitle:{fontSize:13,fontWeight:'600',marginTop:4},dataMeta:{fontSize:12,marginTop:4},badge:{paddingHorizontal:10,paddingVertical:4,borderRadius:8},badgeText:{fontSize:11,fontWeight:'600'},grid2:{flexDirection:'row',flexWrap:'wrap',gap:12},grid2Item:{width:'48%',backgroundColor:'rgba(0,0,0,0.02)',padding:16,borderRadius:16},grid2Label:{fontSize:12,marginBottom:8},grid2Value:{fontSize:24,fontWeight:'800'},trendList:{gap:12},trendItem:{flexDirection:'row',justifyContent:'space-between',alignItems:'center',paddingVertical:12,borderBottomWidth:1,borderBottomColor:'rgba(0,0,0,0.05)'},trendPeriod:{fontSize:16,fontWeight:'700',width:50},trendMetrics:{flexDirection:'row',gap:24},trendMetric:{fontSize:14,fontWeight:'600'},lockOverlay:{...StyleSheet.absoluteFillObject,justifyContent:'center',alignItems:'center',padding:20,backgroundColor:'rgba(0,0,0,0.8)',zIndex:100},lockCard:{width:'100%',padding:30,borderRadius:32,alignItems:'center'},lockIconContainer:{width:80,height:80,borderRadius:40,justifyContent:'center',alignItems:'center',marginBottom:20},lockTitle:{fontSize:24,fontWeight:'800',marginBottom:12},lockDesc:{fontSize:16,textAlign:'center',lineHeight:24,marginBottom:30},upgradeBtn:{width:'100%',height:56,borderRadius:16,justifyContent:'center',alignItems:'center'},upgradeBtnText:{color:'#fff',fontSize:18,fontWeight:'700'}`;

function mkMain(c){
const subs=c.subs.map(s=>`{id:'${s.id}',name:'${s.n}',icon:${s.ic},handled:${s.h},color:'${s.cl}'}`).join(',');
const mets=c.metrics.map(m=>`<LinearGradient colors={['${m.g[0]}','${m.g[1]}']} style={styles.metricCard}><${m.ic} size={20} color="#fff"/><Text style={styles.metricValue}>{keyMetrics.${m.k}}</Text><Text style={styles.metricLabel}>${m.l}</Text></LinearGradient>`).join('\n');
const pipes=c.pipes?c.pipes.map((pp,i)=>`<View style={styles.pipelineItem}><View style={styles.pipelineLeft}><View style={[styles.pipelineNumber,{backgroundColor:'${c.cl}15'}]}><Text style={[styles.pipelineNumberText,{color:'${c.cl}'}]}>${i+1}</Text></View><View><Text style={[styles.pipelineStage,{color:theme.colors.text}]}>${pp.s}</Text><Text style={[styles.pipelineValue,{color:theme.colors.secondaryText}]}>${pp.c} · ${pp.v}</Text></View></View><View style={[styles.conversionBadge,{backgroundColor:parseFloat('${pp.cv}')>60?'#10B98120':'#F59E0B20'}]}><Text style={[styles.conversionText,{color:parseFloat('${pp.cv}')>60?'#10B981':'#F59E0B'}]}>${pp.cv}</Text></View></View>`).join('\n'):'';
const deals=c.deals.map(d=>`<View style={styles.dataCard}><View style={styles.dataHeader}><View style={styles.dataLeft}><Text style={[styles.dataTitle,{color:theme.colors.text}]}>${d.t}</Text><Text style={[styles.dataSubtitle,{color:'${d.vc}'}]}>${d.v}</Text></View><View style={[styles.badge,{backgroundColor:'${d.bc}20'}]}><Text style={[styles.badgeText,{color:'${d.bc}'}]}>${d.b}</Text></View></View>${d.m?`<Text style={[styles.dataMeta,{color:theme.colors.secondaryText}]}>${d.m}</Text>`:''}</View>`).join('\n');
const ins=c.ins.map((x,i)=>`<View key={${i}} style={[styles.insightCard,{borderLeftColor:'${x.c}'}]}><Text style={[styles.insightMessage,{color:theme.colors.text}]}>${x.m}</Text></View>`).join('\n');
const an=c.an.map(a=>`<View style={styles.grid2Item}><Text style={[styles.grid2Label,{color:theme.colors.secondaryText}]}>${a.l}</Text><Text style={[styles.grid2Value,{color:'${a.c}'}]}>${a.v}</Text></View>`).join('\n');
const icons=[...new Set([c.ic,'Zap','ChevronRight','TrendingUp','Sparkles','BarChart3','Lock','FileText',...c.subs.map(s=>s.ic),...c.metrics.map(m=>m.ic)])];

return `import React,{useMemo,useRef,useEffect}from'react';import{View,Text,StyleSheet,ScrollView,TouchableOpacity,Animated}from'react-native';import{${icons.join(',')}}from'lucide-react-native';import{useTheme}from'@/providers/ThemeProvider';import{aiEmployees}from'@/constants/aiEmployees';import{AgentShell}from'@/components/ai-agent/AgentShell';import{trpc}from'@/lib/trpc';import{LinearGradient}from'expo-linear-gradient';import{router}from'expo-router';

export default function ${c.fn}(){
const{theme}=useTheme();const agent=aiEmployees.find(e=>e.id==='${c.id}')!;
const{data:subscription}=trpc.enterprise.getSubscription.useQuery();
const isPremiumLocked=useMemo(()=>agent?.isPremium&&(subscription?.plan==='free'||subscription?.plan==='starter'),[agent?.isPremium,subscription]);
const fadeAnim=useRef(new Animated.Value(0)).current;
useEffect(()=>{if(isPremiumLocked)Animated.timing(fadeAnim,{toValue:1,duration:800,useNativeDriver:true}).start()},[isPremiumLocked,fadeAnim]);

const keyMetrics={${c.metrics.map(m=>`${m.k}:${typeof m.v==='string'?`'${m.v}'`:m.v}`).join(',')}};
const subAgents=[${subs}];

const renderOverview=()=>(<View style={styles.container}><ScrollView style={styles.tabContent} showsVerticalScrollIndicator={false}>
<View style={styles.metricsGrid}>${mets}</View>
<View style={[styles.section,{backgroundColor:theme.colors.cardBackground}]}><View style={styles.sectionHeader}><View style={styles.sectionTitleRow}><Zap size={20} color={theme.colors.primary}/><Text style={[styles.sectionTitle,{color:theme.colors.text}]}>Sub-Agents</Text></View></View>
<View style={styles.subAgentList}>{subAgents.map(sa=><TouchableOpacity key={sa.id} style={styles.subAgentCard} onPress={()=>router.push(\`/ai-agent/sales/sub-agents/\${sa.id}\`)}><View style={styles.subAgentLeft}><View style={[styles.subAgentIcon,{backgroundColor:sa.color+'15'}]}><sa.icon size={20} color={sa.color}/></View><View><Text style={[styles.subAgentName,{color:theme.colors.text}]}>{sa.name}</Text><Text style={[styles.subAgentStat,{color:theme.colors.secondaryText}]}>{sa.handled} tasks</Text></View></View><View style={{flexDirection:'row',alignItems:'center',gap:8}}><View style={[styles.activeDot,{backgroundColor:'#10B981'}]}/><ChevronRight size={18} color={theme.colors.secondaryText}/></View></TouchableOpacity>)}</View></View>
${c.pipes?`<View style={[styles.section,{backgroundColor:theme.colors.cardBackground}]}><View style={styles.sectionHeader}><View style={styles.sectionTitleRow}><BarChart3 size={20} color={theme.colors.primary}/><Text style={[styles.sectionTitle,{color:theme.colors.text}]}>Pipeline</Text></View></View>${pipes}</View>`:''}
<View style={[styles.section,{backgroundColor:theme.colors.cardBackground}]}><View style={styles.sectionHeader}><View style={styles.sectionTitleRow}><FileText size={20} color={theme.colors.primary}/><Text style={[styles.sectionTitle,{color:theme.colors.text}]}>${c.dt}</Text></View></View>${deals}</View>
<View style={[styles.section,{backgroundColor:theme.colors.cardBackground}]}><View style={styles.sectionHeader}><View style={styles.sectionTitleRow}><Sparkles size={20} color={theme.colors.primary}/><Text style={[styles.sectionTitle,{color:theme.colors.text}]}>AI Insights</Text></View></View>${ins}</View>
</ScrollView>
${isPremiumLocked?`<Animated.View style={[styles.lockOverlay,{opacity:fadeAnim}]}><View style={[styles.lockCard,{backgroundColor:theme.colors.cardBackground}]}><View style={[styles.lockIconContainer,{backgroundColor:theme.colors.primary+'15'}]}><Lock size={32} color={theme.colors.primary}/></View><Text style={[styles.lockTitle,{color:theme.colors.text}]}>Premium Agent</Text><Text style={[styles.lockDesc,{color:theme.colors.secondaryText}]}>The ${c.nm} is part of our Enterprise suite. Upgrade to activate.</Text><TouchableOpacity style={[styles.upgradeBtn,{backgroundColor:theme.colors.primary}]} onPress={()=>router.push('/enterprise/billing')}><Text style={styles.upgradeBtnText}>Upgrade Plan</Text></TouchableOpacity></View></Animated.View>`:''}</View>);

const renderAnalytics=()=>(<View style={styles.container}><ScrollView style={styles.tabContent} showsVerticalScrollIndicator={false}>
<View style={[styles.section,{backgroundColor:theme.colors.cardBackground}]}><View style={styles.sectionHeader}><View style={styles.sectionTitleRow}><BarChart3 size={20} color={theme.colors.primary}/><Text style={[styles.sectionTitle,{color:theme.colors.text}]}>Performance</Text></View></View><View style={styles.grid2}>${an}</View></View>
<View style={[styles.section,{backgroundColor:theme.colors.cardBackground}]}><View style={styles.sectionHeader}><View style={styles.sectionTitleRow}><TrendingUp size={20} color={theme.colors.primary}/><Text style={[styles.sectionTitle,{color:theme.colors.text}]}>Quarterly Trend</Text></View></View><View style={styles.trendList}>{[{p:'Q1',v:'${c.an[0].q1}'},{p:'Q2',v:'${c.an[0].q2}'},{p:'Q3',v:'${c.an[0].q3}'}].map(q=><View key={q.p} style={styles.trendItem}><Text style={[styles.trendPeriod,{color:theme.colors.text}]}>{q.p}</Text><View style={styles.trendMetrics}><Text style={[styles.trendMetric,{color:'${c.cl}'}]}>{q.v}</Text></View></View>)}</View></View>
</ScrollView></View>);

const customTabs=[{id:'overview',label:'Overview',icon:${c.ic},component:renderOverview()},{id:'analytics',label:'Analytics',icon:BarChart3,component:renderAnalytics()}];
if(!agent)return<View style={styles.container}><Text style={{color:theme.colors.text}}>Agent not found</Text></View>;
return<AgentShell agent={agent} customTabs={customTabs}/>;
}

const styles=StyleSheet.create({${S2}});`;
}

function mkSub(c){
const mets=c.metrics.map(m=>`<LinearGradient colors={['${m.g[0]}','${m.g[1]}']} style={styles.metricCard}><${m.ic} size={20} color="#fff"/><Text style={styles.metricValue}>{keyMetrics.${m.k}}</Text><Text style={styles.metricLabel}>${m.l}</Text></LinearGradient>`).join('\n');
const ins=c.ins.map((x,i)=>`<View key={${i}} style={[styles.insightCard,{borderLeftColor:'${x.c}'}]}><Text style={[styles.insightMessage,{color:theme.colors.text}]}>${x.m}</Text></View>`).join('\n');
const an=c.an.map(a=>`<View style={styles.grid2Item}><Text style={[styles.grid2Label,{color:theme.colors.secondaryText}]}>${a.l}</Text><Text style={[styles.grid2Value,{color:'${a.c}'}]}>${a.v}</Text></View>`).join('\n');
const deals=c.deals.map(d=>`<View style={styles.dataCard}><View style={styles.dataHeader}><View style={styles.dataLeft}><Text style={[styles.dataTitle,{color:theme.colors.text}]}>${d.t}</Text><Text style={[styles.dataSubtitle,{color:'${d.vc}'}]}>${d.v}</Text></View><View style={[styles.badge,{backgroundColor:'${d.bc}20'}]}><Text style={[styles.badgeText,{color:'${d.bc}'}]}>${d.b}</Text></View></View></View>`).join('\n');
const icons=[...new Set([c.ic,'Zap','ChevronRight','TrendingUp','Sparkles','BarChart3','Lock','FileText',...c.metrics.map(m=>m.ic)])];

return `import React,{useMemo,useRef,useEffect}from'react';import{View,Text,StyleSheet,ScrollView,TouchableOpacity,Animated}from'react-native';import{${icons.join(',')}}from'lucide-react-native';import{useTheme}from'@/providers/ThemeProvider';import{aiEmployees}from'@/constants/aiEmployees';import{AgentShell}from'@/components/ai-agent/AgentShell';import{trpc}from'@/lib/trpc';import{LinearGradient}from'expo-linear-gradient';import{router}from'expo-router';

export default function ${c.fn}(){
const{theme}=useTheme();const agent=aiEmployees.find(e=>e.id==='${c.id}')!;
const{data:subscription}=trpc.enterprise.getSubscription.useQuery();
const isPremiumLocked=useMemo(()=>agent?.isPremium&&(subscription?.plan==='free'||subscription?.plan==='starter'),[agent?.isPremium,subscription]);
const fadeAnim=useRef(new Animated.Value(0)).current;
useEffect(()=>{if(isPremiumLocked)Animated.timing(fadeAnim,{toValue:1,duration:800,useNativeDriver:true}).start()},[isPremiumLocked,fadeAnim]);

const keyMetrics={${c.metrics.map(m=>`${m.k}:${typeof m.v==='string'?`'${m.v}'`:m.v}`).join(',')}};

const renderOverview=()=>(<View style={styles.container}><ScrollView style={styles.tabContent} showsVerticalScrollIndicator={false}>
<View style={styles.metricsGrid}>${mets}</View>
<View style={[styles.section,{backgroundColor:theme.colors.cardBackground}]}><View style={styles.sectionHeader}><View style={styles.sectionTitleRow}><FileText size={20} color={theme.colors.primary}/><Text style={[styles.sectionTitle,{color:theme.colors.text}]}>${c.dt}</Text></View></View>${deals}</View>
<View style={[styles.section,{backgroundColor:theme.colors.cardBackground}]}><View style={styles.sectionHeader}><View style={styles.sectionTitleRow}><Sparkles size={20} color={theme.colors.primary}/><Text style={[styles.sectionTitle,{color:theme.colors.text}]}>AI Insights</Text></View></View>${ins}</View>
</ScrollView>
${isPremiumLocked?`<Animated.View style={[styles.lockOverlay,{opacity:fadeAnim}]}><View style={[styles.lockCard,{backgroundColor:theme.colors.cardBackground}]}><View style={[styles.lockIconContainer,{backgroundColor:theme.colors.primary+'15'}]}><Lock size={32} color={theme.colors.primary}/></View><Text style={[styles.lockTitle,{color:theme.colors.text}]}>Premium Agent</Text><Text style={[styles.lockDesc,{color:theme.colors.secondaryText}]}>The ${c.nm} is part of our Enterprise suite. Upgrade to activate.</Text><TouchableOpacity style={[styles.upgradeBtn,{backgroundColor:theme.colors.primary}]} onPress={()=>router.push('/enterprise/billing')}><Text style={styles.upgradeBtnText}>Upgrade Plan</Text></TouchableOpacity></View></Animated.View>`:''}</View>);

const renderAnalytics=()=>(<View style={styles.container}><ScrollView style={styles.tabContent} showsVerticalScrollIndicator={false}>
<View style={[styles.section,{backgroundColor:theme.colors.cardBackground}]}><View style={styles.sectionHeader}><View style={styles.sectionTitleRow}><BarChart3 size={20} color={theme.colors.primary}/><Text style={[styles.sectionTitle,{color:theme.colors.text}]}>Metrics</Text></View></View><View style={styles.grid2}>${an}</View></View>
</ScrollView></View>);

const customTabs=[{id:'overview',label:'Overview',icon:${c.ic},component:renderOverview()},{id:'analytics',label:'Analytics',icon:BarChart3,component:renderAnalytics()}];
if(!agent)return<View style={styles.container}><Text style={{color:theme.colors.text}}>Agent not found</Text></View>;
return<AgentShell agent={agent} customTabs={customTabs}/>;
}

const styles=StyleSheet.create({${S2}});`;
}

// MAIN AGENTS
const mains=[
{id:'ai-sales-rep',nm:'AI Sales Rep',fn:'AiSalesRepPage',ic:'Phone',cl:'#E65100',
subs:[{id:'discovery-questioner',n:'Discovery Questioner',ic:'Search',h:384,cl:'#06B6D4'},{id:'demo-coordinator',n:'Demo Coordinator',ic:'Eye',h:218,cl:'#10B981'},{id:'objection-handler',n:'Objection Handler',ic:'Shield',h:562,cl:'#8B5CF6'}],
metrics:[{k:'dealsClosed',v:142,l:'Deals',ic:'DollarSign',g:['#E65100','#BF360C']},{k:'pipelineValue',v:'$2.8M',l:'Pipeline',ic:'TrendingUp',g:['#10B981','#059669']},{k:'conversionRate',v:'28.4%',l:'Conversion',ic:'Target',g:['#F59E0B','#D97706']},{k:'avgCycleDays',v:'18d',l:'Cycle',ic:'Clock',g:['#8B5CF6','#6D28D9']}],
pipes:[{s:'Prospecting',c:84,v:'$420K',cv:'62%'},{s:'Discovery',c:52,v:'$780K',cv:'54%'},{s:'Demo',c:28,v:'$840K',cv:'48%'},{s:'Proposal',c:18,v:'$540K',cv:'72%'}],
deals:[{t:'TechCorp Industries',v:'$120K',b:'Won',bc:'#10B981',vc:'#10B981',m:'Closed 2 days ago'},{t:'CloudSync Ltd',v:'$84K',b:'Negotiating',bc:'#06B6D4',vc:'#06B6D4',m:'3 days in stage'},{t:'DataFlow Inc',v:'$56K',b:'Demo',bc:'#F59E0B',vc:'#F59E0B',m:'5 days in stage'}],
dt:'Recent Deals',
ins:[{m:'Discovery conversion up 12% with AI questioner',c:'#10B981'},{m:'Price objections down 18% after handler deploy',c:'#06B6D4'},{m:'3 deals stalled in Demo >7 days',c:'#EF4444'}],
an:[{l:'Win Rate',v:'92%',c:'#10B981',q1:'88%',q2:'90%',q3:'92%'},{l:'Avg Deal',v:'$68K',c:'#E65100'},{l:'Activity/Day',v:'24',c:'#06B6D4'},{l:'ROI',v:'4.2x',c:'#8B5CF6'}]},

{id:'ai-sales-executive',nm:'AI Sales Executive',fn:'AiSalesExecutivePage',ic:'Briefcase',cl:'#F59E0B',
subs:[{id:'deal-structurer',n:'Deal Structurer',ic:'FileText',h:156,cl:'#06B6D4'},{id:'stakeholder-mapper',n:'Stakeholder Mapper',ic:'Users',h:89,cl:'#10B981'},{id:'closing-strategist',n:'Closing Strategist',ic:'Award',h:234,cl:'#8B5CF6'}],
metrics:[{k:'avgDealSize',v:'$180K',l:'Avg Deal',ic:'DollarSign',g:['#F59E0B','#D97706']},{k:'closeRate',v:'68%',l:'Close Rate',ic:'Target',g:['#10B981','#059669']},{k:'activeDeals',v:24,l:'Active',ic:'Briefcase',g:['#06B6D4','#0891B2']},{k:'quotaAttainment',v:'142%',l:'Quota',ic:'TrendingUp',g:['#8B5CF6','#6D28D9']}],
pipes:[{s:'Qualification',c:12,v:'$2.1M',cv:'82%'},{s:'Solution Design',c:8,v:'$1.4M',cv:'75%'},{s:'Proposal',c:6,v:'$1.1M',cv:'68%'},{s:'Close',c:4,v:'$720K',cv:'100%'}],
deals:[{t:'Enterprise - TechCorp',v:'$340K',b:'Closing',bc:'#8B5CF6',vc:'#8B5CF6',m:'Stakeholder alignment: 92%'},{t:'Mid-Market - CloudSync',v:'$120K',b:'Proposal',bc:'#06B6D4',vc:'#06B6D4',m:'3 of 5 stakeholders engaged'},{t:'Expansion - DataFlow',v:'$85K',b:'Qualified',bc:'#10B981',vc:'#10B981',m:'Decision maker identified'}],
dt:'Active Deals',
ins:[{m:'Deal structurer optimized 3 multi-year contracts — 22% higher ACV',c:'#10B981'},{m:'Stakeholder mapper found 4 hidden decision makers',c:'#06B6D4'},{m:'Closing strategist recommends acceleration on 2 deals',c:'#8B5CF6'}],
an:[{l:'Avg Deal',v:'$180K',c:'#F59E0B',q1:'$156K',q2:'$168K',q3:'$180K'},{l:'Close Rate',v:'68%',c:'#10B981'},{l:'Cycle Days',v:'32',c:'#06B6D4'},{l:'Quota %',v:'142%',c:'#8B5CF6'}]},

{id:'ai-crm-assistant',nm:'AI CRM Assistant',fn:'AiCrmAssistantPage',ic:'Database',cl:'#06B6D4',
subs:[{id:'contact-updater',n:'Contact Updater',ic:'UserCheck',h:1240,cl:'#06B6D4'},{id:'activity-logger',n:'Activity Logger',ic:'ClipboardList',h:3840,cl:'#10B981'},{id:'pipeline-organizer',n:'Pipeline Organizer',ic:'Layers',h:568,cl:'#8B5CF6'}],
metrics:[{k:'contactsManaged',v:'4,820',l:'Contacts',ic:'Users',g:['#06B6D4','#0891B2']},{k:'activitiesLogged',v:'12.4K',l:'Activities',ic:'ClipboardList',g:['#10B981','#059669']},{k:'dataAccuracy',v:'99.2%',l:'Accuracy',ic:'CheckCircle',g:['#F59E0B','#D97706']},{k:'syncRate',v:'24/7',l:'Sync',ic:'Activity',g:['#8B5CF6','#6D28D9']}],
pipes:[{s:'Data Entry',c:840,v:'Auto',cv:'96%'},{s:'Deduplication',c:320,v:'Auto',cv:'94%'},{s:'Enrichment',c:180,v:'Auto',cv:'88%'},{s:'Sync',c:'4.8K',v:'Real-time',cv:'100%'}],
deals:[{t:'Salesforce Sync',v:'99.9%',b:'Live',bc:'#10B981',vc:'#10B981',m:'Last sync: 2 min ago'},{t:'HubSpot Sync',v:'99.7%',b:'Live',bc:'#10B981',vc:'#10B981',m:'Last sync: 5 min ago'},{t:'Data Quality Score',v:'94/100',b:'Excellent',bc:'#06B6D4',vc:'#06B6D4',m:'12 duplicates removed today'}],
dt:'CRM Status',
ins:[{m:'Contact updater enriched 340 records with LinkedIn data',c:'#10B981'},{m:'Activity logger auto-captured 890 interactions this week',c:'#06B6D4'},{m:'Pipeline organizer flagged 6 stale deals for review',c:'#F59E0B'}],
an:[{l:'Contacts',v:'4,820',c:'#06B6D4',q1:'4,200',q2:'4,540',q3:'4,820'},{l:'Accuracy',v:'99.2%',c:'#10B981'},{l:'Activities',v:'12.4K',c:'#F59E0B'},{l:'Sync Uptime',v:'99.9%',c:'#8B5CF6'}]},

{id:'ai-proposal-generator',nm:'AI Proposal Generator',fn:'AiProposalGeneratorPage',ic:'FileText',cl:'#8B5CF6',
subs:[{id:'template-selector',n:'Template Selector',ic:'LayoutDashboard',h:420,cl:'#06B6D4'},{id:'pricing-calculator',n:'Pricing Calculator',ic:'Calculator',h:312,cl:'#10B981'},{id:'proposal-reviewer',n:'Proposal Reviewer',ic:'CheckCircle',h:186,cl:'#8B5CF6'}],
metrics:[{k:'proposalsGenerated',v:284,l:'Proposals',ic:'FileText',g:['#8B5CF6','#6D28D9']},{k:'avgTime',v:'12 min',l:'Avg Time',ic:'Clock',g:['#10B981','#059669']},{k:'acceptanceRate',v:'72%',l:'Accept Rate',ic:'CheckCircle',g:['#F59E0B','#D97706']},{k:'revenueProposed',v:'$8.4M',l:'Proposed',ic:'DollarSign',g:['#06B6D4','#0891B2']}],
pipes:[{s:'Template Select',c:42,v:'Auto',cv:'98%'},{s:'Pricing Calc',c:38,v:'Auto',cv:'94%'},{s:'Content Gen',c:34,v:'12 min',cv:'88%'},{s:'Review',c:28,v:'8 min',cv:'82%'}],
deals:[{t:'Enterprise - TechCorp',v:'$340K',b:'Sent',bc:'#06B6D4',vc:'#06B6D4',m:'Viewed 3 times, 45 min engagement'},{t:'Growth - CloudSync',v:'$84K',b:'Draft',bc:'#F59E0B',vc:'#F59E0B',m:'Pricing calculator pending'},{t:'Mid-Market - DataFlow',v:'$120K',b:'Accepted',bc:'#10B981',vc:'#10B981',m:'Signed in 2.4 days'}],
dt:'Recent Proposals',
ins:[{m:'Template selector auto-matched 94% of proposals to winning templates',c:'#10B981'},{m:'Pricing calculator optimized margins by 8% on average',c:'#06B6D4'},{m:'Proposal reviewer caught 3 compliance issues before send',c:'#EF4444'}],
an:[{l:'Accept Rate',v:'72%',c:'#8B5CF6',q1:'64%',q2:'68%',q3:'72%'},{l:'Avg Time',v:'12 min',c:'#10B981'},{l:'Proposals',v:'284',c:'#F59E0B'},{l:'Revenue',v:'$8.4M',c:'#06B6D4'}]},

{id:'ai-negotiator',nm:'AI Negotiator',fn:'AiNegotiatorPage',ic:'Gavel',cl:'#DC2626',
subs:[{id:'term-analyzer',n:'Term Analyzer',ic:'ScrollText',h:412,cl:'#06B6D4'},{id:'concession-tracker',n:'Concession Tracker',ic:'Scale',h:286,cl:'#10B981'},{id:'batna-calculator',n:'BATNA Calculator',ic:'Calculator',h:168,cl:'#8B5CF6'}],
metrics:[{k:'negotiationsWon',v:86,l:'Won',ic:'Award',g:['#DC2626','#B91C1C']},{k:'avgSavings',v:'18%',l:'Savings',ic:'DollarSign',g:['#10B981','#059669']},{k:'concessionsTracked',v:342,l:'Tracked',ic:'Scale',g:['#F59E0B','#D97706']},{k:'batnaAccuracy',v:'94%',l:'BATNA Acc',ic:'Target',g:['#8B5CF6','#6D28D9']}],
pipes:[{s:'Term Analysis',c:18,v:'2h',cv:'96%'},{s:'Concession Map',c:14,v:'1h',cv:'88%'},{s:'BATNA Calc',c:12,v:'30min',cv:'94%'},{s:'Strategy',c:8,v:'1h',cv:'82%'}],
deals:[{t:'TechCorp Enterprise',v:'$340K',b:'Negotiating',bc:'#F59E0B',vc:'#F59E0B',m:'BATNA: Strong — 2 alternatives'},{t:'CloudSync Renewal',v:'$84K',b:'Conceding',bc:'#DC2626',vc:'#DC2626',m:'Concession budget: 12%'},{t:'DataFlow Expansion',v:'$120K',b:'Won',bc:'#10B981',vc:'#10B981',m:'Saved 22% vs initial ask'}],
dt:'Active Negotiations',
ins:[{m:'Term analyzer flagged 4 unfavorable clauses in TechCorp contract',c:'#EF4444'},{m:'Concession tracker recommends holding on pricing — BATNA is strong',c:'#10B981'},{m:'BATNA calculator updated: 3 alternatives identified for top deal',c:'#06B6D4'}],
an:[{l:'Win Rate',v:'86%',c:'#DC2626',q1:'78%',q2:'82%',q3:'86%'},{l:'Avg Savings',v:'18%',c:'#10B981'},{l:'Concessions',v:'342',c:'#F59E0B'},{l:'BATNA Acc',v:'94%',c:'#8B5CF6'}]}
];

// SUB AGENTS
const subs=[
{id:'ai-discovery-questioner',nm:'AI Discovery Questioner',fn:'DiscoveryQuestionerPage',ic:'Search',cl:'#06B6D4',parent:'AI Sales Rep',
metrics:[{k:'questionsGenerated',v:'1,842',l:'Questions',ic:'Search',g:['#06B6D4','#0891B2']},{k:'hitRate',v:'84%',l:'Hit Rate',ic:'Target',g:['#10B981','#059669']},{k:'avgPrepTime',v:'2 min',l:'Prep Time',ic:'Clock',g:['#F59E0B','#D97706']},{k:'insightsUncovered',v:428,l:'Insights',ic:'Sparkles',g:['#8B5CF6','#6D28D9']}],
deals:[{t:'TechCorp Discovery',v:'14 questions',b:'Complete',bc:'#10B981',vc:'#10B981'},{t:'CloudSync Discovery',v:'8 questions',b:'In Progress',bc:'#06B6D4',vc:'#06B6D4'},{t:'DataFlow Discovery',v:'12 questions',b:'Complete',bc:'#10B981',vc:'#10B981'}],
dt:'Active Sessions',
ins:[{m:'Question quality improved 18% after NLP model update',c:'#10B981'},{m:'Auto-generated follow-up questions for 3 stalled discoveries',c:'#06B6D4'}],
an:[{l:'Questions',v:'1,842',c:'#06B6D4'},{l:'Hit Rate',v:'84%',c:'#10B981'},{l:'Insights',v:'428',c:'#8B5CF6'},{l:'Prep Time',v:'2 min',c:'#F59E0B'}]},

{id:'ai-demo-coordinator',nm:'AI Demo Coordinator',fn:'DemoCoordinatorPage',ic:'Eye',cl:'#10B981',parent:'AI Sales Rep',
metrics:[{k:'demosScheduled',v:218,l:'Demos',ic:'Eye',g:['#10B981','#059669']},{k:'showRate',v:'92%',l:'Show Rate',ic:'Users',g:['#06B6D4','#0891B2']},{k:'avgPrepTime',v:'15 min',l:'Prep',ic:'Clock',g:['#F59E0B','#D97706']},{k:'conversionRate',v:'48%',l:'Conversion',ic:'Target',g:['#8B5CF6','#6D28D9']}],
deals:[{t:'TechCorp Product Demo',v:'Tomorrow 2pm',b:'Confirmed',bc:'#10B981',vc:'#10B981'},{t:'CloudSync Platform Tour',v:'Thu 10am',b:'Pending',bc:'#F59E0B',vc:'#F59E0B'},{t:'DataFlow API Demo',v:'Fri 3pm',b:'Confirmed',bc:'#10B981',vc:'#10B981'}],
dt:'Upcoming Demos',
ins:[{m:'Show rate improved 8% with automated reminders',c:'#10B981'},{m:'Demo conversion up 12% with personalized content',c:'#06B6D4'}],
an:[{l:'Demos',v:'218',c:'#10B981'},{l:'Show Rate',v:'92%',c:'#06B6D4'},{l:'Conversion',v:'48%',c:'#8B5CF6'},{l:'Prep Time',v:'15 min',c:'#F59E0B'}]},

{id:'ai-objection-handler',nm:'AI Objection Handler',fn:'ObjectionHandlerPage',ic:'Shield',cl:'#8B5CF6',parent:'AI Sales Rep',
metrics:[{k:'objectionsHandled',v:562,l:'Handled',ic:'Shield',g:['#8B5CF6','#6D28D9']},{k:'resolutionRate',v:'84%',l:'Resolved',ic:'CheckCircle',g:['#10B981','#059669']},{k:'avgResponseTime',v:'1.2s',l:'Response',ic:'Clock',g:['#F59E0B','#D97706']},{k:'dealsSaved',v:42,l:'Saved',ic:'DollarSign',g:['#06B6D4','#0891B2']}],
deals:[{t:'Price Objection - TechCorp',v:'Resolved',b:'Won',bc:'#10B981',vc:'#10B981'},{t:'Timing Objection - CloudSync',v:'Pending',b:'Active',bc:'#F59E0B',vc:'#F59E0B'},{t:'Competitor - DataFlow',v:'Resolved',b:'Won',bc:'#10B981',vc:'#10B981'}],
dt:'Recent Objections',
ins:[{m:'Price objection playbook updated with 6 new responses',c:'#10B981'},{m:'Competitor objection patterns detected — 3 new strategies generated',c:'#06B6D4'}],
an:[{l:'Handled',v:'562',c:'#8B5CF6'},{l:'Resolved',v:'84%',c:'#10B981'},{l:'Saved',v:'42 deals',c:'#06B6D4'},{l:'Response',v:'1.2s',c:'#F59E0B'}]},

{id:'ai-deal-structurer',nm:'AI Deal Structurer',fn:'DealStructurerPage',ic:'FileText',cl:'#06B6D4',parent:'AI Sales Executive',
metrics:[{k:'dealsStructured',v:156,l:'Deals',ic:'FileText',g:['#06B6D4','#0891B2']},{k:'avgACV',v:'$180K',l:'Avg ACV',ic:'DollarSign',g:['#10B981','#059669']},{k:'multiYearRate',v:'68%',l:'Multi-Year',ic:'Calendar',g:['#F59E0B','#D97706']},{k:'marginOptimized',v:'12%',l:'Margin Lift',ic:'TrendingUp',g:['#8B5CF6','#6D28D9']}],
deals:[{t:'TechCorp 3-Year Deal',v:'$340K',b:'Structured',bc:'#06B6D4',vc:'#06B6D4'},{t:'CloudSync Annual',v:'$84K',b:'Drafting',bc:'#F59E0B',vc:'#F59E0B'},{t:'DataFlow Expansion',v:'$120K',b:'Finalized',bc:'#10B981',vc:'#10B981'}],
dt:'Deal Structures',
ins:[{m:'Multi-year structuring increased ACV by 34%',c:'#10B981'},{m:'Margin optimizer saved $42K on last 5 deals',c:'#06B6D4'}],
an:[{l:'Deals',v:'156',c:'#06B6D4'},{l:'Avg ACV',v:'$180K',c:'#10B981'},{l:'Multi-Year',v:'68%',c:'#F59E0B'},{l:'Margin Lift',v:'12%',c:'#8B5CF6'}]},

{id:'ai-stakeholder-mapper',nm:'AI Stakeholder Mapper',fn:'StakeholderMapperPage',ic:'Users',cl:'#10B981',parent:'AI Sales Executive',
metrics:[{k:'stakeholdersMapped',v:892,l:'Mapped',ic:'Users',g:['#10B981','#059669']},{k:'decisionMakers',v:284,l:'DMs Found',ic:'Target',g:['#06B6D4','#0891B2']},{k:'influenceAccuracy',v:'91%',l:'Accuracy',ic:'CheckCircle',g:['#F59E0B','#D97706']},{k:'hiddenChampions',v:42,l:'Hidden',ic:'Sparkles',g:['#8B5CF6','#6D28D9']}],
deals:[{t:'TechCorp Org Map',v:'6 stakeholders',b:'Complete',bc:'#10B981',vc:'#10B981'},{t:'CloudSync Influence',v:'4 mapped',b:'In Progress',bc:'#06B6D4',vc:'#06B6D4'},{t:'DataFlow Decision Tree',v:'3 DMs',b:'Complete',bc:'#10B981',vc:'#10B981'}],
dt:'Stakeholder Maps',
ins:[{m:'Found 4 hidden champions in enterprise pipeline this week',c:'#10B981'},{m:'Influence mapping accuracy improved to 91%',c:'#06B6D4'}],
an:[{l:'Mapped',v:'892',c:'#10B981'},{l:'DMs Found',v:'284',c:'#06B6D4'},{l:'Accuracy',v:'91%',c:'#F59E0B'},{l:'Hidden',v:'42',c:'#8B5CF6'}]},

{id:'ai-closing-strategist',nm:'AI Closing Strategist',fn:'ClosingStrategistPage',ic:'Award',cl:'#8B5CF6',parent:'AI Sales Executive',
metrics:[{k:'dealsClosed',v:234,l:'Closed',ic:'Award',g:['#8B5CF6','#6D28D9']},{k:'closeRate',v:'72%',l:'Close Rate',ic:'Target',g:['#10B981','#059669']},{k:'avgCloseTime',v:'5.2
