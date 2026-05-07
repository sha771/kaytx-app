const fs=require('fs'),p=require('path'),B=p.join(__dirname,'..','app','ai-agent','trading','sub-agents');
const tpl=(d)=>`import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useTheme } from '@/providers/ThemeProvider';
import { useRouter } from 'expo-router';
import { ${d.icons} } from 'lucide-react-native';
import AgentFeatures from '@/components/ai-agent/AgentFeatures';

const METRICS = ${JSON.stringify(d.met.map(m=>({label:m.l,value:m.v,change:m.ch,trend:'up'})))};

export default function ${d.fn}Page() {
  const { theme } = useTheme();
  const router = useRouter();
  const stats = [${d.statsJs}];
  const capabilities = ${JSON.stringify(d.cap)};
  const responsibilities = ${JSON.stringify(d.resp)};
  const activities = [${d.actJs}];

  return (
    <ScrollView style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <View style={[styles.hero, { borderBottomColor: theme.colors.border || '#E5E5EA' }]}>
        <TouchableOpacity onPress={() => router.push('${d.pr}')} style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 12 }}>
          <${d.pi} size={16} color="${d.pc}" />
          <Text style={{ fontSize: 13, color: '${d.pc}', marginLeft: 6, fontWeight: '600' }}>← ${d.pt}</Text>
        </TouchableOpacity>
        <View style={[styles.heroIconWrap, { backgroundColor: '${d.c}20' }]}>
          <${d.ic} size={48} color="${d.c}" />
        </View>
        <Text style={[styles.heroTitle, { color: theme.colors.text }]}>{d.t}</Text>
        <Text style={[styles.heroSubtitle, { color: theme.colors.textSecondary }]}>{d.sub}</Text>
        <View style={styles.badgesRow}>
          <View style={[styles.badge, { backgroundColor: '#34C75922' }]}><Activity size={12} color="#34C759" /><Text style={[styles.badgeText, { color: '#34C759' }]}>Active</Text></View>
          <View style={[styles.badge, { backgroundColor: '${d.c}22' }]}><Star size={12} color="${d.c}" /><Text style={[styles.badgeText, { color: '${d.c}' }]}>Sub-Agent</Text></View>
          <View style={[styles.badge, { backgroundColor: '#FF950022' }]}><Users size={12} color="#FF9500" /><Text style={[styles.badgeText, { color: '#FF9500' }]}>Trading Dept</Text></View>
          <View style={[styles.badge, { backgroundColor: '#AF52DE22' }]}><Shield size={12} color="#AF52DE" /><Text style={[styles.badgeText, { color: '#AF52DE' }]}>Enterprise</Text></View>
        </View>
      </View>
      <View style={styles.statsContainer}>
        {stats.map((s,i)=>(<View key={i} style={[styles.statCard,{backgroundColor:theme.colors.card||'#F2F2F7'}]}><s.icon size={22} color={s.color}/><Text style={[styles.statValue,{color:theme.colors.text}]}>{s.value}</Text><Text style={[styles.statLabel,{color:theme.colors.textSecondary}]}>{s.label}</Text></View>))}
      </View>
      <View style={[styles.section,{backgroundColor:theme.colors.card||'#F2F2F7'}]}>
        <Text style={[styles.sectionTitle,{color:theme.colors.text}]}>Overview</Text>
        <Text style={[styles.description,{color:theme.colors.textSecondary}]}>The ${d.t} operates as a specialized sub-agent under ${d.pt}, delivering enterprise-grade capabilities in ${d.sub.toLowerCase()} within the Trading & Investments department.</Text>
      </View>
      <View style={[styles.section,{backgroundColor:theme.colors.card||'#F2F2F7'}]}>
        <Text style={[styles.sectionTitle,{color:theme.colors.text}]}>Enterprise Capabilities</Text>
        <View style={styles.tagsContainer}>{capabilities.map((c,i)=>(<View key={i} style={[styles.tag,{backgroundColor:'${d.c}18'}]}><Text style={[styles.tagText,{color:'${d.c}'}]}>{c}</Text></View>))}</View>
      </View>
      <View style={[styles.section,{backgroundColor:theme.colors.card||'#F2F2F7'}]}>
        <Text style={[styles.sectionTitle,{color:theme.colors.text}]}>Key Responsibilities</Text>
        {responsibilities.map((r,i)=>(<View key={i} style={styles.responsibilityRow}><ArrowRight size={14} color="${d.c}"/><Text style={[styles.responsibilityText,{color:theme.colors.textSecondary}]}>{r}</Text></View>))}
      </View>
      <View style={[styles.section,{backgroundColor:theme.colors.card||'#F2F2F7'}]}>
        <Text style={[styles.sectionTitle,{color:theme.colors.text}]}>Performance Metrics</Text>
        <View style={styles.metricsGrid}>{METRICS.map((m,i)=>(<View key={i} style={[styles.metricCard,{backgroundColor:theme.colors.background||'#F2F2F7'}]}><Text style={[styles.metricValue,{color:theme.colors.text}]}>{m.value}</Text><Text style={[styles.metricLabel,{color:theme.colors.textSecondary}]}>{m.label}</Text><View style={styles.metricTrend}><TrendingUp size={12} color="#34C759"/><Text style={{fontSize:11,color:'#34C759',fontWeight:'600'}}>{m.change}</Text></View></View>))}</View>
      </View>
      <View style={[styles.section,{backgroundColor:theme.colors.card||'#F2F2F7'}]}>
        <Text style={[styles.sectionTitle,{color:theme.colors.text}]}>Recent Activity</Text>
        {activities.map((a,i)=>(<View key={i} style={styles.activityRow}><View style={[styles.activityIcon,{backgroundColor:'${d.c}15'}]}><a.icon size={14} color="${d.c}"/></View><View style={styles.activityContent}><Text style={[styles.activityText,{color:theme.colors.text}]}>{a.text}</Text><Text style={[styles.activityTime,{color:theme.colors.textSecondary}]}>{a.time}</Text></View></View>))}
      </View>
      <View style={[styles.section,{backgroundColor:theme.colors.card||'#F2F2F7'}]}>
        <Text style={[styles.sectionTitle,{color:theme.colors.text}]}>Parent Agent</Text>
        <TouchableOpacity onPress={()=>router.push('${d.pr}')} style={[styles.agentCard,{backgroundColor:theme.colors.background||'#F2F2F7'}]}>
          <View style={[styles.agentIcon,{backgroundColor:'${d.pc}20'}]}><${d.pi} size={28} color="${d.pc}"/></View>
          <View style={styles.agentInfo}><Text style={[styles.agentName,{color:theme.colors.text}]}>{d.pt}</Text><Text style={[styles.agentDesc,{color:theme.colors.textSecondary}]}>Parent Agent</Text></View>
          <ChevronRight size={20} color={theme.colors.textSecondary}/>
        </TouchableOpacity>
      </View>
      <AgentFeatures agentId="${d.id}" agentName="${d.t}"/>
      <View style={{height:40}}/>
    </ScrollView>
  );
}
const styles = StyleSheet.create({
  container:{flex:1},hero:{alignItems:'center',paddingVertical:32,paddingHorizontal:20,borderBottomWidth:1},heroIconWrap:{width:88,height:88,borderRadius:44,justifyContent:'center',alignItems:'center',marginBottom:16},heroTitle:{fontSize:26,fontWeight:'bold'},heroSubtitle:{fontSize:15,marginTop:4,fontWeight:'500'},badgesRow:{flexDirection:'row',gap:10,marginTop:16,flexWrap:'wrap',justifyContent:'center'},badge:{flexDirection:'row',alignItems:'center',paddingHorizontal:10,paddingVertical:5,borderRadius:20,gap:4},badgeText:{fontSize:12,fontWeight:'600'},statsContainer:{flexDirection:'row',flexWrap:'wrap',padding:16,gap:12},statCard:{flex:1,minWidth:'22%',alignItems:'center',padding:14,borderRadius:12},statValue:{fontSize:18,fontWeight:'bold',marginTop:8},statLabel:{fontSize:11,marginTop:4},section:{marginHorizontal:16,marginBottom:16,padding:20,borderRadius:16},sectionTitle:{fontSize:18,fontWeight:'700',marginBottom:14},description:{fontSize:14,lineHeight:22},tagsContainer:{flexDirection:'row',flexWrap:'wrap',gap:8},tag:{paddingHorizontal:12,paddingVertical:6,borderRadius:20},tagText:{fontSize:12,fontWeight:'600'},responsibilityRow:{flexDirection:'row',alignItems:'center',marginBottom:10,gap:8},responsibilityText:{fontSize:14,flex:1,lineHeight:20},metricsGrid:{flexDirection:'row',flexWrap:'wrap',gap:12},metricCard:{flex:1,minWidth:'45%',alignItems:'center',padding:16,borderRadius:12},metricValue:{fontSize:20,fontWeight:'bold'},metricLabel:{fontSize:12,marginTop:4},metricTrend:{flexDirection:'row',alignItems:'center',gap:4,marginTop:6},activityRow:{flexDirection:'row',alignItems:'center',marginBottom:12,gap:12},activityIcon:{width:32,height:32,borderRadius:16,justifyContent:'center',alignItems:'center'},activityContent:{flex:1},activityText:{fontSize:14,fontWeight:'500'},activityTime:{fontSize:12,marginTop:2},agentCard:{flexDirection:'row',alignItems:'center',padding:16,borderRadius:12,marginBottom:12},agentIcon:{width:48,height:48,borderRadius:12,alignItems:'center',justifyContent:'center'},agentInfo:{flex:1,marginLeft:12},agentName:{fontSize:16,fontWeight:'600'},agentDesc:{fontSize:12,marginTop:2},actionButton:{flex:1,minWidth:'45%',alignItems:'center',padding:16,borderRadius:12},actionText:{fontSize:13,fontWeight:'600',marginTop:8},
});
`;

const D=[
{id:'investment-strategy-advisor',t:'AI Investment Strategy Advisor',sub:'Strategy Framework & Alpha Signal Research',ic:'TrendingUp',c:'#0277BD',pt:'AI Chief Investment Officer',pr:'/ai-agent/trading/chief-investment-officer',pi:'Briefcase',pc:'#0277BD',
cap:['Strategy Formulation','Alpha Research','Factor Analysis','Market Regime Detection','Asset Class Research','Tactical Overlay','Investment Thesis','Portfolio Construction Input'],
resp:['Develop and maintain investment strategy frameworks','Conduct alpha research and signal validation','Analyze factor exposures and regime shifts','Produce tactical overlay recommendations','Build investment thesis documentation','Support portfolio construction with strategy inputs'],
st:[{l:'Strategies',v:'24',i:'Target',c:'#34C759'},{l:'Alpha Signals',v:'847',i:'Zap',c:'#007AFF'},{l:'Accuracy',v:'96.4%',i:'CircleCheckBig',c:'#FF9500'},{l:'Uptime',v:'99.9%',i:'Activity',c:'#AF52DE'}],
act:[{t:'3 min ago',x:'Published Q3 tactical overlay update',i:'FileText'},{t:'8 min ago',x:'Validated new alpha signal with 1.9 Sharpe',i:'Zap'},{t:'15 min ago',x:'Detected regime shift in credit spreads',i:'Activity'},{t:'30 min ago',x:'Updated factor exposure model',i:'Target'},{t:'1 hr ago',x:'Completed asset class research note',i:'Search'}],
met:[{l:'Signal Sharpe',v:'1.92',ch:'+0.14'},{l:'Strategy Win',v:'68%',ch:'+3%'},{l:'Alpha Gen',v:'+2.8%',ch:'+0.4%'},{l:'Regime Det',v:'94%',ch:'+2%'}]},

{id:'portfolio-allocation-director',t:'AI Portfolio Allocation Director',sub:'Multi-Asset Allocation & Rebalancing Execution',ic:'PieChart',c:'#0277BD',pt:'AI Chief Investment Officer',pr:'/ai-agent/trading/chief-investment-officer',pi:'Briefcase',pc:'#0277BD',
cap:['Multi-Asset Allocation','Optimization Engine','Risk Budgeting','Rebalancing Triggers','Liquidity Constraints','Tax Efficiency','Factor Allocation','ESG Integration'],
resp:['Execute strategic and tactical asset allocation','Run portfolio optimization with constraints','Manage risk budget allocation across strategies','Monitor and trigger rebalancing events','Ensure liquidity and tax efficiency in allocation','Integrate ESG criteria into allocation framework'],
st:[{l:'Portfolios',v:'42',i:'PieChart',c:'#34C759'},{l:'AUM',v:'$1.2B',i:'DollarSign',c:'#007AFF'},{l:'Rebalances',v:'847',i:'Activity',c:'#FF9500'},{l:'Tracking',v:'0.8%',i:'Target',c:'#AF52DE'}],
act:[{t:'2 min ago',x:'Rebalanced 8 portfolios after drift alert',i:'PieChart'},{t:'6 min ago',x:'Updated optimization constraints',i:'Activity'},{t:'14 min ago',x:'Allocated risk budget across 6 strategies',i:'Target'},{t:'28 min ago',x:'Adjusted ESG screening weights',i:'Shield'},{t:'1 hr ago',x:'Published allocation performance report',i:'FileText'}],
met:[{l:'Alloc Accuracy',v:'99.2%',ch:'+0.3%'},{l:'Rebal ROI',v:'+1.4%',ch:'+0.2%'},{l:'Risk Budget',v:'$42M',ch:'-$3M'},{l:'ESG Score',v:'82',ch:'+4'}]},

{id:'market-outlook-analyst',t:'AI Market Outlook Analyst',sub:'Macro Forecasting & Economic Indicator Analysis',ic:'BarChart3',c:'#0277BD',pt:'AI Chief Investment Officer',pr:'/ai-agent/trading/chief-investment-officer',pi:'Briefcase',pc:'#0277BD',
cap:['Macro Forecasting','Economic Indicators','Yield Curve Analysis','Sentiment Analysis','Regime Detection','Scenario Modeling','Cross-Asset Signals','Geopolitical Assessment'],
resp:['Produce macro market outlook and forecasts','Track economic indicators and surprise indices','Analyze yield curve signals and recession risk','Monitor sentiment and positioning data','Detect market regime changes','Assess geopolitical impacts on markets'],
st:[{l:'Indicators',v:'847',i:'BarChart3',c:'#34C759'},{l:'Forecasts',v:'94.2%',i:'Target',c:'#007AFF'},{l:'Scenarios',v:'24',i:'Layers',c:'#FF9500'},{l:'Reports',v:'312',i:'FileText',c:'#AF52DE'}],
act:[{t:'2 min ago',x:'Updated US GDP nowcast to 2.1%',i:'BarChart3'},{t:'6 min ago',x:'Detected yield curve flattening signal',i:'TrendingUp'},{t:'14 min ago',x:'Raised recession probability to 18%',i:'AlertTriangle'},{t:'28 min ago',x:'Updated sentiment composite score',i:'Activity'},{t:'1 hr ago',x:'Published weekly market outlook',i:'FileText'}],
met:[{l:'Forecast Acc',v:'94.2%',ch:'+1.4%'},{l:'Signal Lead',v:'3.2 days',ch:'+0.4d'},{l:'Regime Calls',v:'89%',ch:'+3%'},{l:'Surprise Index',v:'0.14',ch:'+0.02'}]},

{id:'trading-strategy-validator',t:'AI Trading Strategy Validator',sub:'Strategy Backtesting & Performance Benchmarking',ic:'Target',c:'#1565C0',pt:'AI VP Trading',pr:'/ai-agent/trading/vp-trading',pi:'TrendingUp',pc:'#1565C0',
cap:['Strategy Backtesting','Performance Benchmarking','Walk-forward Analysis','Parameter Sensitivity','Overfitting Detection','Sharpe Validation','Drawdown Testing','Correlation Check'],
resp:['Validate new trading strategies before deployment','Run comprehensive backtests with realistic assumptions','Conduct walk-forward and out-of-sample testing','Detect overfitting and parameter sensitivity issues','Benchmark strategy performance against peers','Validate drawdown and risk-adjusted return metrics'],
st:[{l:'Validated',v:'128',i:'CircleCheckBig',c:'#34C759'},{l:'Backtests',v:'24,000',i:'History',c:'#007AFF'},{l:'Pass Rate',v:'94.2%',i:'Target',c:'#FF9500'},{l:'Avg Sharpe',v:'1.84',i:'TrendingUp',c:'#AF52DE'}],
act:[{t:'2 min ago',x:'Validated momentum strategy with 2.1 Sharpe',i:'Target'},{t:'6 min ago',x:'Completed walk-forward analysis on 3 strategies',i:'History'},{t:'14 min ago',x:'Detected overfitting in parameter grid',i:'AlertTriangle'},{t:'28 min ago',x:'Benchmarked strategy vs peer universe',i:'BarChart3'},{t:'1 hr ago',x:'Published validation report',i:'FileText'}],
met:[{l:'Pass Rate',v:'94.2%',ch:'+1.8%'},{l:'Avg Sharpe',v:'1.84',ch:'+0.12'},{l:'Overfit Det',v:'98.4%',ch:'+0.6%'},{l:'Backtest Speed',v:'8ms',ch:'-2ms'}]},

{id:'desk-performance-monitor',t:'AI Desk Performance Monitor',sub:'Real-time P&L Tracking & Trader Analytics',ic:'Activity',c:'#1565C0',pt:'AI VP Trading',pr:'/ai-agent/trading/vp-trading',pi:'TrendingUp',pc:'#1565C0',
cap:['P&L Tracking','Trader Scoring','Execution Analytics','Benchmark Comparison','Real-time Dashboard','Attribution Analysis','Alert Generation','Historical Trending'],
resp:['Track real-time desk and individual trader P&L','Score trader performance against benchmarks','Analyze execution quality and fill rates','Generate performance alerts and exception reports','Produce daily and weekly performance summaries','Maintain historical performance trending'],
st:[{l:'Traders',v:'24',i:'Users',c:'#34C759'},{l:'P&L Real-time',v:'+$4.2M',i:'DollarSign',c:'#007AFF'},{l:'Alerts',v:'12',i:'AlertTriangle',c:'#FF9500'},{l:'Reports',v:'847',i:'FileText',c:'#AF52DE'}],
act:[{t:'1 min ago',x:'Updated real-time desk P&L dashboard',i:'Activity'},{t:'4 min ago',x:'Scored 24 traders on execution quality',i:'Users'},{t:'12 min ago',x:'Generated performance exception alert',i:'AlertTriangle'},{t:'28 min ago',x:'Published daily desk performance summary',i:'FileText'},{t:'1 hr ago',x:'Completed weekly attribution analysis',i:'BarChart3'}],
met:[{l:'Desk P&L',v:'+$4.2M',ch:'+$840K'},{l:'Avg Score',v:'87.4',ch:'+2.1'},{l:'Alerts',v:'12',ch:'-3'},{l:'Reports',v:'847',ch:'+42'}]},

{id:'risk-limit-enforcer',t:'AI Risk Limit Enforcer',sub:'Automated Limit Monitoring & Breach Alerts',ic:'Shield',c:'#1565C0',pt:'AI VP Trading',pr:'/ai-agent/trading/vp-trading',pi:'TrendingUp',pc:'#1565C0',
cap:['Limit Monitoring','Breach Detection','Auto-hedging','Escalation Workflow','Position Sizing','Greeks Limits','Notional Caps','Concentration Limits'],
resp:['Monitor risk limits across all trading desks and instruments','Detect and alert on limit breaches in real-time','Execute auto-hedging protocols when thresholds breached','Manage escalation workflows for limit violations','Enforce position sizing and notional caps','Monitor concentration and Greeks limits'],
st:[{l:'Limits',v:'847',i:'Shield',c:'#34C759'},{l:'Breaches',v:'0',i:'CircleCheckBig',c:'#007AFF'},{l:'Auto-hedges',v:'42',i:'Zap',c:'#FF9500'},{l:'Coverage',v:'100%',i:'Target',c:'#AF52DE'}],
act:[{t:'1 min ago',x:'Cleared limit check for all 847 positions',i:'Shield'},{t:'4 min ago',x:'Auto-hedged delta exposure on FX desk',i:'Zap'},{t:'12 min ago',x:'Escalated concentration alert to VP',i:'AlertTriangle'},{t:'28 min ago',x:'Updated position sizing parameters',i:'Target'},{t:'1 hr ago',x:'Published limit utilization report',i:'FileText'}],
met:[{l:'Breach Rate',v:'0%',ch:'0%'},{l:'Auto-hedge',v:'42',ch:'+8'},{l:'Avg Response',v:'0.3s',ch:'-0.1s'},{l:'Coverage',v:'100%',ch:'0%'}]},

{id:'investment-committee-coordinator',t:'AI Investment Committee Coordinator',sub:'Committee Scheduling & Approval Tracking',ic:'Users',c:'#1565C0',pt:'AI VP Investments',pr:'/ai-agent/trading/vp-investments',pi:'Briefcase',pc:'#1565C0',
cap:['Meeting Scheduling','Agenda Management','Approval Tracking','Memo Distribution','Vote Recording','Action Item Tracking','Quorum Verification','Document Repository'],
resp:['Schedule and coordinate Investment Committee meetings','Prepare and distribute meeting agendas and materials','Track approval status for investment decisions','Record votes and maintain decision audit trail','Manage action items and follow-up tracking','Ensure quorum and governance compliance'],
st:[{l:'Meetings',v:'84',i:'Calendar',c:'#34C759'},{l:'Approvals',v:'312',i:'CircleCheckBig',c:'#007AFF'},{l:'Action Items',v:'128',i:'Target',c:'#FF9500'},{l:'On-time',v:'100%',i:'Clock',c:'#AF52DE'}],
act:[{t:'3 min ago',x:'Scheduled weekly IC meeting for Thursday',i:'Calendar'},{t:'8 min ago',x:'Distributed diligence memo to committee',i:'FileText'},{t:'15 min ago',x:'Recorded unanimous approval for Series B',i:'CircleCheckBig'},{t:'30 min ago',x:'Updated 12 action items from last session',i:'Target'},{t:'1 hr ago',x:'Verified quorum for special session',i:'Users'}],
met:[{l:'Meetings Held',v:'84',ch:'+4'},{l:'Approval Rate',v:'78%',ch:'+2%'},{l:'Action Close',v:'94%',ch:'+3%'},{l:'On-time',v:'100%',ch:'0%'}]},

{id:'deal-flow-manager',t:'AI Deal Flow Manager',sub:'Pipeline Management & Deal Scoring',ic:'TrendingUp',c:'#1565C0',pt:'AI VP Investments',pr:'/ai-agent/trading/vp-investments',pi:'Briefcase',pc:'#1565C0',
cap:['Pipeline Management','Deal Scoring','Prioritization Engine','Source Tracking','CRM Integration','Funnel Analytics','Conversion Metrics','Relationship Mapping'],
resp:['Manage the investment deal pipeline end-to-end','Score and rank deals using multi-factor evaluation','Prioritize deals based on strategic fit and return potential','Track deal sources and relationship mapping','Analyze pipeline funnel and conversion metrics','Produce pipeline status reports for leadership'],
st:[{l:'Pipeline',v:'47',i:'TrendingUp',c:'#34C759'},{l:'Active',v:'18',i:'Activity',c:'#007AFF'},{l:'Conversion',v:'32%',i:'Target',c:'#FF9500'},{l:'Avg Score',v:'8.4',i:'Star',c:'#AF52DE'}],
act:[{t:'2 min ago',x:'Scored 3 new deals with multi-factor model',i:'Target'},{t:'6 min ago',x:'Updated pipeline conversion funnel',i:'Activity'},{t:'14 min ago',x:'Flagged 2 deals for priority review',i:'AlertTriangle'},{t:'28 min ago',x:'Mapped relationship for Series C lead',i:'Users'},{t:'1 hr ago',x:'Published weekly pipeline report',i:'FileText'}],
met:[{l:'Pipeline Size',v:'47',ch:'+6'},{l:'Conversion',v:'32%',ch:'+4%'},{l:'Avg Score',v:'8.4',ch:'+0.3'},{l:'Source Mix',v:'Diversified',ch:'Stable'}]},

{id:'diligence-overseer',t:'AI Diligence Overseer',sub:'Due Diligence Process Coordination',ic:'Search',c:'#1565C0',pt:'AI VP Investments',pr:'/ai-agent/trading/vp-investments',pi:'Briefcase',pc:'#1565C0',
cap:['Due Diligence Workflow','Checklist Management','Vendor Coordination','Document Review','Risk Flagging','Compliance Check','Timeline Tracking','Quality Assurance'],
resp:['Orchestrate due diligence workflows across workstreams','Manage diligence checklists and milestone tracking','Coordinate with external vendors and consultants','Review and flag issues in diligence documentation','Ensure compliance requirements are met in diligence','Track timeline and escalate delays and blockers'],
st:[{l:'Diligence',v:'24',i:'Search',c:'#34C759'},{l:'Checklists',v:'847',i:'ClipboardCheck',c:'#007AFF'},{l:'Completion',v:'94%',i:'CircleCheckBig',c:'#FF9500'},{l:'Flags',v:'12',i:'AlertTriangle',c:'#AF52DE'}],
act:[{t:'2 min ago',x:'Completed financial diligence on 2 deals',i:'Search'},{t:'6 min ago',x:'Flagged legal risk in term sheet',i:'AlertTriangle'},{t:'14 min ago',x:'Updated 847 checklist items',i:'ClipboardCheck'},{t:'28 min ago',x:'Coordinated vendor call for tech audit',i:'Users'},{t:'1 hr ago',x:'Published diligence status dashboard',i:'FileText'}],
met:[{l:'Completion',v:'94%',ch:'+2%'},{l:'Avg Duration',v:'18 days',ch:'-2 days'},{l:'Risk Flags',v:'12',ch:'+3'},{l:'Quality Score',v:'96.4%',ch:'+1.2%'}]},
];

D.forEach(d=>{
  const icons=new Set(['Activity','Star','CircleCheckBig','Clock','Target','ArrowRight','Zap','Users','MessageSquare','Calendar','ChartBarBig','TrendingUp','AlertTriangle','FileText','ChevronRight','Shield']);
  d.st.forEach(s=>icons.add(s.i));d.act.forEach(a=>icons.add(a.i));icons.add(d.ic);icons.add(d.pi);
  d.icons=[...icons].join(', ');
  d.fn=d.id.replace(/-([a-z])/g,(_,c)=>c.toUpperCase()).replace(/^./,c=>c.toUpperCase());
  d.statsJs=d.st.map(s=>`{label:'${s.l}',value:'${s.v}',icon:${s.i},color:'${s.c}'}`).join(',');
  d.actJs=d.act.map(a=>`{time:'${a.t}',text:'${a.x}',icon:${a.i}}`).join(',');
  fs.writeFileSync(p.join(B,d.id+'.tsx'),tpl(d));
});
console.log('Batch 1: '+D.length+' sub-agent pages');
