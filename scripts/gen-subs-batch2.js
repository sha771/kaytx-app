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
  container:{flex:1},hero:{alignItems:'center',paddingVertical:32,paddingHorizontal:20,borderBottomWidth:1},heroIconWrap:{width:88,height:88,borderRadius:44,justifyContent:'center',alignItems:'center',marginBottom:16},heroTitle:{fontSize:26,fontWeight:'bold'},heroSubtitle:{fontSize:15,marginTop:4,fontWeight:'500'},badgesRow:{flexDirection:'row',gap:10,marginTop:16,flexWrap:'wrap',justifyContent:'center'},badge:{flexDirection:'row',alignItems:'center',paddingHorizontal:10,paddingVertical:5,borderRadius:20,gap:4},badgeText:{fontSize:12,fontWeight:'600'},statsContainer:{flexDirection:'row',flexWrap:'wrap',padding:16,gap:12},statCard:{flex:1,minWidth:'22%',alignItems:'center',padding:14,borderRadius:12},statValue:{fontSize:18,fontWeight:'bold',marginTop:8},statLabel:{fontSize:11,marginTop:4},section:{marginHorizontal:16,marginBottom:16,padding:20,borderRadius:16},sectionTitle:{fontSize:18,fontWeight:'700',marginBottom:14},description:{fontSize:14,lineHeight:22},tagsContainer:{flexDirection:'row',flexWrap:'wrap',gap:8},tag:{paddingHorizontal:12,paddingVertical:6,borderRadius:20},tagText:{fontSize:12,fontWeight:'600'},responsibilityRow:{flexDirection:'row',alignItems:'center',marginBottom:10,gap:8},responsibilityText:{fontSize:14,flex:1,lineHeight:20},metricsGrid:{flexDirection:'row',flexWrap:'wrap',gap:12},metricCard:{flex:1,minWidth:'45%',alignItems:'center',padding:16,borderRadius:12},metricValue:{fontSize:20,fontWeight:'bold'},metricLabel:{fontSize:12,marginTop:4},metricTrend:{flexDirection:'row',alignItems:'center',gap:4,marginTop:6},activityRow:{flexDirection:'row',alignItems:'center',marginBottom:12,gap:12},activityIcon:{width:32,height:32,borderRadius:16,justifyContent:'center',alignItems:'center'},activityContent:{flex:1},activityText:{fontSize:14,fontWeight:'500'},activityTime:{fontSize:12,marginTop:2},agentCard:{flexDirection:'row',alignItems:'center',padding:16,borderRadius:12,marginBottom:12},agentIcon:{width:48,height:48,borderRadius:12,alignItems:'center',justifyContent:'center'},agentInfo:{flex:1,marginLeft:12},agentName:{fontSize:16,fontWeight:'600'},agentDesc:{fontSize:12,marginTop:2},
});
`;

const D=[
// Trading Desk Manager subs
{id:'order-flow-optimizer',t:'AI Order Flow Optimizer',sub:'Smart Order Routing & Execution Optimization',ic:'Zap',c:'#0288D1',pt:'AI Trading Desk Manager',pr:'/ai-agent/trading/trading-desk-manager',pi:'Monitor',pc:'#0288D1',
cap:['Smart Order Routing','Algorithm Selection','Venue Optimization','Market Impact Model','Dark Pool Routing','Block Trading','Crossing Network','Parent/Child Orders'],
resp:['Optimize order routing across venues and dark pools','Select optimal execution algorithms per order type','Minimize market impact through sophisticated slicing','Route block trades through crossing networks','Manage parent/child order relationships','Monitor venue fill rates and rebalance routing'],
st:[{l:'Orders',v:'12,847',i:'Zap',c:'#34C759'},{l:'Venues',v:'18',i:'Globe',c:'#007AFF'},{l:'Fill Rate',v:'99.4%',i:'Target',c:'#FF9500'},{l:'Saved',v:'$2.4M',i:'DollarSign',c:'#AF52DE'}],
act:[{t:'1 min ago',x:'Routed 847 orders across 18 venues',i:'Zap'},{t:'4 min ago',x:'Selected VWAP for large block trade',i:'Target'},{t:'12 min ago',x:'Updated dark pool fill rate model',i:'Activity'},{t:'28 min ago',x:'Rebalanced venue allocation weights',i:'Globe'},{t:'1 hr ago',x:'Published venue performance scorecard',i:'FileText'}],
met:[{l:'Fill Rate',v:'99.4%',ch:'+0.2%'},{l:'Cost Savings',v:'$2.4M',ch:'+$340K'},{l:'Venue Score',v:'94.2',ch:'+1.4'},{l:'Impact Red',v:'-42%',ch:'-8%'}]},

{id:'trader-performance-evaluator',t:'AI Trader Performance Evaluator',sub:'KPI Tracking & Performance Scoring',ic:'BarChart3',c:'#0288D1',pt:'AI Trading Desk Manager',pr:'/ai-agent/trading/trading-desk-manager',pi:'Monitor',pc:'#0288D1',
cap:['KPI Tracking','Benchmark Scoring','P&L Attribution','Behavioral Analysis','Skill Assessment','Compliance Scoring','Peer Ranking','Development Plans'],
resp:['Track trader KPIs and performance metrics','Score traders against execution benchmarks','Attribute P&L to skill vs market factors','Analyze behavioral patterns and risk-taking','Assess trader skill and development areas','Produce peer ranking and development plans'],
st:[{l:'Traders',v:'24',i:'Users',c:'#34C759'},{l:'KPIs',v:'847',i:'Target',c:'#007AFF'},{l:'Top Score',v:'96.4',i:'Star',c:'#FF9500'},{l:'Reviews',v:'312',i:'FileText',c:'#AF52DE'}],
act:[{t:'2 min ago',x:'Scored 24 traders on daily KPIs',i:'BarChart3'},{t:'6 min ago',x:'Attributed P&L to skill vs market',i:'Target'},{t:'14 min ago',x:'Flagged risk-taking behavior pattern',i:'AlertTriangle'},{t:'28 min ago',x:'Updated peer ranking leaderboard',i:'Users'},{t:'1 hr ago',x:'Published weekly performance review',i:'FileText'}],
met:[{l:'Avg Score',v:'87.4',ch:'+2.1'},{l:'Top Score',v:'96.4',ch:'+1.2'},{l:'Skill Ratio',v:'72%',ch:'+4%'},{l:'Compliance',v:'100%',ch:'0%'}]},

{id:'market-openclosing-coordinator',t:'AI Market Open/Close Coordinator',sub:'Pre-market & Post-market Coordination',ic:'Clock',c:'#0288D1',pt:'AI Trading Desk Manager',pr:'/ai-agent/trading/trading-desk-manager',pi:'Monitor',pc:'#0288D1',
cap:['Pre-market Analysis','Opening Auction','Closing Auction','VWAP Management','MOC/LOC Orders','Gap Analysis','Volume Forecast','Liquidity Assessment'],
resp:['Coordinate pre-market preparation and analysis','Manage opening auction order submission','Execute closing auction and MOC/LOC orders','Monitor VWAP performance throughout the day','Analyze overnight gaps and opening conditions','Forecast volume and assess liquidity conditions'],
st:[{l:'Sessions',v:'847',i:'Clock',c:'#34C759'},{l:'Auctions',v:'1,694',i:'Activity',c:'#007AFF'},{l:'VWAP Hit',v:'96.2%',i:'Target',c:'#FF9500'},{l:'On-time',v:'100%',i:'CircleCheckBig',c:'#AF52DE'}],
act:[{t:'1 min ago',x:'Prepared pre-market order basket',i:'Clock'},{t:'4 min ago',x:'Submitted opening auction orders',i:'Zap'},{t:'12 min ago',x:'Analyzed overnight gap in S&P futures',i:'TrendingUp'},{t:'28 min ago',x:'Forecasted today volume at 1.2x avg',i:'Activity'},{t:'1 hr ago',x:'Published previous close report',i:'FileText'}],
met:[{l:'VWAP Hit',v:'96.2%',ch:'+0.8%'},{l:'Auction Fill',v:'99.1%',ch:'+0.3%'},{l:'Gap Predict',v:'92%',ch:'+2%'},{l:'Volume Acc',v:'94.8%',ch:'+1.4%'}]},

// Portfolio Manager subs
{id:'asset-allocator',t:'AI Asset Allocator',sub:'Strategic & Tactical Allocation Optimization',ic:'PieChart',c:'#388E3C',pt:'AI Portfolio Manager',pr:'/ai-agent/trading/portfolio-manager',pi:'PieChart',pc:'#388E3C',
cap:['Strategic Allocation','Tactical Tilts','Mean-Variance Opt','Black-Litterman','Risk Parity','Factor Allocation','Liquidity Budget','Constraint Engine'],
resp:['Execute strategic asset allocation per investment policy','Implement tactical tilts based on market views','Run mean-variance and Black-Litterman optimization','Manage risk parity and factor allocation','Ensure liquidity budget compliance','Apply custom constraints and regulatory limits'],
st:[{l:'Allocations',v:'42',i:'PieChart',c:'#34C759'},{l:'AUM',v:'$1.2B',i:'DollarSign',c:'#007AFF'},{l:'Optimizations',v:'847',i:'Activity',c:'#FF9500'},{l:'Sharpe',v:'1.84',i:'TrendingUp',c:'#AF52DE'}],
act:[{t:'2 min ago',x:'Ran Black-Litterman optimization for Q3',i:'PieChart'},{t:'6 min ago',x:'Implemented tactical tilt to emerging markets',i:'Zap'},{t:'14 min ago',x:'Updated risk parity weights',i:'Activity'},{t:'28 min ago',x:'Applied regulatory constraint set',i:'Shield'},{t:'1 hr ago',x:'Published allocation efficiency report',i:'FileText'}],
met:[{l:'Opt Sharpe',v:'1.84',ch:'+0.12'},{l:'Constraint Met',v:'100%',ch:'0%'},{l:'Risk Parity',v:'Balanced',ch:'Stable'},{l:'Liquidity',v:'98%',ch:'+1%'}]},

{id:'rebalancing-scheduler',t:'AI Rebalancing Scheduler',sub:'Automated Rebalancing Trigger & Execution',ic:'Calendar',c:'#388E3C',pt:'AI Portfolio Manager',pr:'/ai-agent/trading/portfolio-manager',pi:'PieChart',pc:'#388E3C',
cap:['Drift Monitoring','Threshold Alerts','Calendar Rebalancing','Tax-aware Execution','Trade Sizing','Multi-portfolio','Cash Flow Adj','Transaction Cost'],
resp:['Monitor portfolio drift against target weights','Generate threshold-based rebalancing alerts','Schedule calendar-based rebalancing events','Execute tax-aware rebalancing with loss harvesting','Size trades to minimize transaction costs','Manage rebalancing across multiple portfolios'],
st:[{l:'Rebalances',v:'847',i:'Calendar',c:'#34C759'},{l:'Drift Alerts',v:'42',i:'AlertTriangle',c:'#007AFF'},{l:'Tax Saved',v:'$4.2M',i:'DollarSign',c:'#FF9500'},{l:'On-schedule',v:'100%',i:'CircleCheckBig',c:'#AF52DE'}],
act:[{t:'1 min ago',x:'Triggered drift rebalance for 3 portfolios',i:'Calendar'},{t:'4 min ago',x:'Harvested $840K in tax losses',i:'DollarSign'},{t:'12 min ago',x:'Sized rebalance trades for min cost',i:'Target'},{t:'28 min ago',x:'Adjusted cash flow for upcoming rebalance',i:'Activity'},{t:'1 hr ago',x:'Published rebalancing execution report',i:'FileText'}],
met:[{l:'Drift Catch',v:'99.2%',ch:'+0.4%'},{l:'Tax Saved',v:'$4.2M',ch:'+$640K'},{l:'Avg Cost',v:'0.8bps',ch:'-0.2bps'},{l:'On-time',v:'100%',ch:'0%'}]},

{id:'performance-attribution-analyst',t:'AI Performance Attribution Analyst',sub:'Multi-factor Attribution & Contribution Analysis',ic:'BarChart3',c:'#388E3C',pt:'AI Portfolio Manager',pr:'/ai-agent/trading/portfolio-manager',pi:'PieChart',pc:'#388E3C',
cap:['Brinson Attribution','Factor Attribution','Risk Decomposition','Sector Contribution','Security Selection','Interaction Effects','Multi-period','Benchmark Analysis'],
resp:['Produce Brinson-style performance attribution','Decompose returns by factor exposures','Analyze sector and security selection contribution','Calculate interaction effects and residual','Generate multi-period attribution analysis','Compare attribution across benchmarks'],
st:[{l:'Reports',v:'1,247',i:'FileText',c:'#34C759'},{l:'Factors',v:'12',i:'Target',c:'#007AFF'},{l:'Accuracy',v:'98.4%',i:'CircleCheckBig',c:'#FF9500'},{l:'Coverage',v:'100%',i:'Activity',c:'#AF52DE'}],
act:[{t:'2 min ago',x:'Completed Brinson attribution for Q3',i:'BarChart3'},{t:'6 min ago',x:'Decomposed factor contribution by sector',i:'Activity'},{t:'14 min ago',x:'Calculated security selection alpha',i:'TrendingUp'},{t:'28 min ago',x:'Generated multi-period attribution',i:'Target'},{t:'1 hr ago',x:'Published monthly attribution report',i:'FileText'}],
met:[{l:'Attribution R²',v:'0.96',ch:'+0.02'},{l:'Factor Count',v:'12',ch:'+2'},{l:'Accuracy',v:'98.4%',ch:'+0.8%'},{l:'Coverage',v:'100%',ch:'0%'}]},

// Trading Risk Manager subs
{id:'var-calculator',t:'AI VaR Calculator',sub:'Historical, Parametric & Monte Carlo VaR',ic:'Calculator',c:'#C62828',pt:'AI Trading Risk Manager',pr:'/ai-agent/trading/trading-risk-manager',pi:'ShieldAlert',pc:'#C62828',
cap:['Historical VaR','Parametric VaR','Monte Carlo VaR','Conditional VaR','Component VaR','Marginal VaR','Incremental VaR','Backtesting'],
resp:['Calculate VaR using historical, parametric, and Monte Carlo methods','Compute Conditional VaR (Expected Shortfall) metrics','Decompose portfolio VaR into component and marginal contributions','Run VaR backtesting and exception analysis','Produce intraday VaR updates and trend reports','Validate VaR model assumptions and parameter choices'],
st:[{l:'VaR Models',v:'6',i:'Calculator',c:'#34C759'},{l:'Calculations',v:'24,000',i:'Activity',c:'#007AFF'},{l:'Backtest Pass',v:'99.2%',i:'CircleCheckBig',c:'#FF9500'},{l:'Speed',v:'0.4ms',i:'Clock',c:'#AF52DE'}],
act:[{t:'1 min ago',x:'Calculated Monte Carlo VaR with 100K paths',i:'Calculator'},{t:'4 min ago',x:'Updated parametric VaR with new cov matrix',i:'Activity'},{t:'12 min ago',x:'Decomposed portfolio VaR by risk factor',i:'BarChart3'},{t:'28 min ago',x:'Ran VaR backtest exception analysis',i:'Target'},{t:'1 hr ago',x:'Published intraday VaR trend report',i:'FileText'}],
met:[{l:'Backtest Pass',v:'99.2%',ch:'+0.4%'},{l:'Calc Speed',v:'0.4ms',ch:'-0.1ms'},{l:'Model Count',v:'6',ch:'+1'},{l:'CVaR Ratio',v:'1.4',ch:'-0.02'}]},

{id:'stress-test-designer',t:'AI Stress Test Designer',sub:'Custom Scenario Creation & Historical Replay',ic:'AlertTriangle',c:'#C62828',pt:'AI Trading Risk Manager',pr:'/ai-agent/trading/trading-risk-manager',pi:'ShieldAlert',pc:'#C62828',
cap:['Scenario Design','Historical Replay','Hypothetical Scenarios','Reverse Stress','Multi-factor Shocks','Liquidity Stress','Contagion Model','CCAR/DFAST'],
resp:['Design custom stress testing scenarios','Run historical replay stress tests','Create hypothetical extreme scenarios','Conduct reverse stress testing','Model multi-factor shock scenarios','Produce CCAR/DFAST-style stress reports'],
st:[{l:'Scenarios',v:'847',i:'AlertTriangle',c:'#34C759'},{l:'Historical',v:'24',i:'History',c:'#007AFF'},{l:'Custom',v:'42',i:'Layers',c:'#FF9500'},{l:'Reports',v:'312',i:'FileText',c:'#AF52DE'}],
act:[{t:'2 min ago',x:'Designed new liquidity stress scenario',i:'AlertTriangle'},{t:'6 min ago',x:'Ran 2008 financial crisis replay',i:'History'},{t:'14 min ago',x:'Created reverse stress on credit book',i:'Layers'},{t:'28 min ago',x:'Modeled multi-factor shock scenario',i:'Activity'},{t:'1 hr ago',x:'Published CCAR-style stress report',i:'FileText'}],
met:[{l:'Scenarios',v:'847',ch:'+42'},{l:'Max Loss',v:'-$128M',ch:'-$12M'},{l:'Coverage',v:'100%',ch:'0%'},{l:'Auto-pass',v:'94%',ch:'+2%'}]},

{id:'limit-breach-alerter',t:'AI Limit Breach Alerter',sub:'Real-time Limit Monitoring & Escalation',ic:'Zap',c:'#C62828',pt:'AI Trading Risk Manager',pr:'/ai-agent/trading/trading-risk-manager',pi:'ShieldAlert',pc:'#C62828',
cap:['Real-time Monitoring','Breach Detection','Auto-escalation','Kill Switch','Notification Engine','Workflow Trigger','Historical Log','Root Cause Analysis'],
resp:['Monitor risk limits in real-time across all dimensions','Detect limit breaches and threshold violations','Auto-escalate breaches to appropriate management','Activate kill switches for critical breaches','Generate breach notifications and workflow triggers','Maintain historical breach log and root cause analysis'],
st:[{l:'Monitored',v:'847',i:'Shield',c:'#34C759'},{l:'Breaches',v:'0',i:'CircleCheckBig',c:'#007AFF'},{l:'Escalations',v:'12',i:'AlertTriangle',c:'#FF9500'},{l:'Response',v:'0.3s',i:'Clock',c:'#AF52DE'}],
act:[{t:'1 min ago',x:'Cleared all 847 limit checks',i:'Shield'},{t:'4 min ago',x:'Escalated near-breach on FX desk',i:'AlertTriangle'},{t:'12 min ago',x:'Triggered notification for VaR threshold',i:'Zap'},{t:'28 min ago',x:'Resolved escalation from morning session',i:'CircleCheckBig'},{t:'1 hr ago',x:'Published breach analytics report',i:'FileText'}],
met:[{l:'Breach Rate',v:'0%',ch:'0%'},{l:'Detection',v:'100%',ch:'0%'},{l:'Avg Response',v:'0.3s',ch:'-0.1s'},{l:'Kill Switch',v:'Ready',ch:'Ready'}]},

// Equity Trader subs
{id:'order-executor',t:'AI Order Executor',sub:'Automated Order Slicing & Routing',ic:'Zap',c:'#7B1FA2',pt:'AI Equity Trader',pr:'/ai-agent/trading/equity-trader',pi:'TrendingUp',pc:'#7B1FA2',
cap:['Order Slicing','Smart Routing','VWAP Execution','TWAP Execution','Implementation Shortfall','Participation Rate','Dark Pool Access','Block Execution'],
resp:['Slice large orders for optimal execution','Route orders to best venues including dark pools','Execute VWAP and TWAP strategies','Manage implementation shortfall algorithms','Control participation rate and market impact','Execute block trades with minimal information leakage'],
st:[{l:'Orders',v:'8,421',i:'Zap',c:'#34C759'},{l:'Fill Rate',v:'98.6%',i:'Target',c:'#007AFF'},{l:'Slippage',v:'0.3bps',i:'Activity',c:'#FF9500'},{l:'Speed',v:'0.2ms',i:'Clock',c:'#AF52DE'}],
act:[{t:'1 min ago',x:'Sliced 50K share order into 847 child orders',i:'Zap'},{t:'4 min ago',x:'Routed 200K to dark pool for block fill',i:'Globe'},{t:'12 min ago',x:'Completed VWAP execution for large order',i:'Target'},{t:'28 min ago',x:'Adjusted participation rate from 15% to 12%',i:'Activity'},{t:'1 hr ago',x:'Published execution quality summary',i:'FileText'}],
met:[{l:'Fill Rate',v:'98.6%',ch:'+0.4%'},{l:'Avg Slippage',v:'0.3bps',ch:'-0.1bps'},{l:'VWAP Dev',v:'-0.2bps',ch:'-0.1bps'},{l:'Speed',v:'0.2ms',ch:'-0.05ms'}]},

{id:'market-depth-analyzer',t:'AI Market Depth Analyzer',sub:'Order Book Analysis & Liquidity Mapping',ic:'Search',c:'#7B1FA2',pt:'AI Equity Trader',pr:'/ai-agent/trading/equity-trader',pi:'TrendingUp',pc:'#7B1FA2',
cap:['Order Book Analysis','Liquidity Mapping','Bid-Ask Spread','Depth Charts','Hidden Liquidity','Venue Comparison','Imbalance Detection','Auction Analysis'],
resp:['Analyze real-time order book depth and liquidity','Map liquidity across venues and dark pools','Monitor bid-ask spread dynamics and trends','Detect hidden liquidity and iceberg orders','Compare venue depth and fill probability','Identify order imbalance and auction signals'],
st:[{l:'Books',v:'847',i:'Search',c:'#34C759'},{l:'Liquidity',v:'Real-time',i:'Activity',c:'#007AFF'},{l:'Signals',v:'42',i:'Zap',c:'#FF9500'},{l:'Depth',v:'L3',i:'Layers',c:'#AF52DE'}],
act:[{t:'1 min ago',x:'Detected iceberg order in AAPL book',i:'Search'},{t:'4 min ago',x:'Mapped liquidity across 18 venues',i:'Activity'},{t:'12 min ago',x:'Flagged imbalance signal for NVDA',i:'Zap'},{t:'28 min ago',x:'Updated depth chart visualization',i:'Layers'},{t:'1 hr ago',x:'Published liquidity assessment report',i:'FileText'}],
met:[{l:'Signal Acc',v:'91.4%',ch:'+2.1%'},{l:'Imbalance Det',v:'87%',ch:'+3%'},{l:'Hidden Liq',v:'$4.2B',ch:'+$600M'},{l:'Spread Track',v:'Real-time',ch:'Stable'}]},

{id:'execution-quality-reporter',t:'AI Execution Quality Reporter',sub:'TCA Reporting & Venue Performance Scoring',ic:'FileText',c:'#7B1FA2',pt:'AI Equity Trader',pr:'/ai-agent/trading/equity-trader',pi:'TrendingUp',pc:'#7B1FA2',
cap:['TCA Reporting','Slippage Analysis','Venue Scorecard','Fill Rate Metrics','Benchmark Comparison','Cost Attribution','Real-time QC','Historical Trending'],
resp:['Produce transaction cost analysis (TCA) reports','Analyze slippage by venue, strategy, and time period','Score venues on execution quality metrics','Track fill rates and partial fill statistics','Compare execution costs against VWAP/arrival benchmarks','Maintain historical execution quality trending'],
st:[{l:'TCA Reports',v:'847',i:'FileText',c:'#34C759'},{l:'Venues',v:'18',i:'Globe',c:'#007AFF'},{l:'Slippage',v:'0.3bps',i:'Activity',c:'#FF9500'},{l:'Score',v:'94.2',i:'Star',c:'#AF52DE'}],
act:[{t:'2 min ago',x:'Generated TCA report for 8,421 trades',i:'FileText'},{t:'6 min ago',x:'Scored 18 venues on execution quality',i:'Star'},{t:'14 min ago',x:'Analyzed slippage by strategy type',i:'Activity'},{t:'28 min ago',x:'Compared costs vs arrival price',i:'Target'},{t:'1 hr ago',x:'Published monthly venue scorecard',i:'ChartBarBig'}],
met:[{l:'TCA Coverage',v:'100%',ch:'0%'},{l:'Avg Slippage',v:'0.3bps',ch:'-0.1bps'},{l:'Venue Score',v:'94.2',ch:'+1.4'},{l:'Reports',v:'847',ch:'+42'}]},

// Forex Trader subs
{id:'currency-pair-analyzer',t:'AI Currency Pair Analyzer',sub:'Technical & Fundamental FX Analysis',ic:'Globe',c:'#00897B',pt:'AI Forex Trader',pr:'/ai-agent/trading/forex-trader',pi:'Globe',pc:'#00897B',
cap:['Technical Analysis','Fundamental Analysis','Carry Calculation','Volatility Surface','Correlation Matrix','Momentum Signals','Mean-reversion','Pattern Recognition'],
resp:['Analyze currency pairs using technical and fundamental methods','Calculate carry trade returns and roll-down metrics','Build FX volatility surfaces and term structures','Monitor cross-pair correlations and dependencies','Generate momentum and mean-reversion signals','Detect chart patterns and breakout levels'],
st:[{l:'Pairs',v:'42',i:'Globe',c:'#34C759'},{l:'Signals',v:'847',i:'Zap',c:'#007AFF'},{l:'Accuracy',v:'92.4%',i:'Target',c:'#FF9500'},{l:'Coverage',v:'100%',i:'Activity',c:'#AF52DE'}],
act:[{t:'2 min ago',x:'Generated momentum signal on EUR/JPY',i:'Zap'},{t:'6 min ago',x:'Updated carry calculation for 42 pairs',i:'DollarSign'},{t:'14 min ago',x:'Detected correlation break in AUD/NZD',i:'Activity'},{t:'28 min ago',x:'Identified head-and-shoulders on GBP/USD',i:'TrendingUp'},{t:'1 hr ago',x:'Published FX technical analysis report',i:'FileText'}],
met:[{l:'Signal Acc',v:'92.4%',ch:'+1.8%'},{l:'Carry Yield',v:'+6.2%',ch:'+0.4%'},{l:'Correlation Det',v:'94%',ch:'+2%'},{l:'Pattern Rec',v:'87%',ch:'+3%'}]},

{id:'fx-hedging-coordinator',t:'AI FX Hedging Coordinator',sub:'Automated Hedge Ratio & Overlay Execution',ic:'Shield',c:'#00897B',pt:'AI Forex Trader',pr:'/ai-agent/trading/forex-trader',pi:'Globe',pc:'#00897B',
cap:['Hedge Ratio Calc','Forward Hedging','Options Hedging','Natural Hedging','Overlay Strategy','Hedge Effectiveness','Roll Management','Cost Optimization'],
resp:['Calculate optimal hedge ratios for FX exposures','Execute forward and options hedging strategies','Identify natural hedging opportunities across portfolios','Implement overlay hedging strategies','Monitor and report hedge effectiveness metrics','Manage hedge roll schedules and cost optimization'],
st:[{l:'Hedges',v:'847',i:'Shield',c:'#34C759'},{l:'Coverage',v:'94%',i:'Target',c:'#007AFF'},{l:'Effectiveness',v:'98.2%',i:'CircleCheckBig',c:'#FF9500'},{l:'Saved',v:'$12.4M',i:'DollarSign',c:'#AF52DE'}],
act:[{t:'1 min ago',x:'Calculated hedge ratios for 42 exposures',i:'Shield'},{t:'4 min ago',x:'Executed EUR forward hedge for $200M',i:'DollarSign'},{t:'12 min ago',x:'Identified natural hedge in JPY/USD',i:'Activity'},{t:'28 min ago',x:'Rolled 3-month forward contracts',i:'Calendar'},{t:'1 hr ago',x:'Published hedge effectiveness report',i:'FileText'}],
met:[{l:'Hedge Ratio',v:'94%',ch:'+2%'},{l:'Effectiveness',v:'98.2%',ch:'+0.4%'},{l:'Cost Saved',v:'$12.4M',ch:'+$1.8M'},{l:'Roll P&L',v:'+$840K',ch:'+$120K'}]},

{id:'cross-border-payment-optimizer',t:'AI Cross-border Payment Optimizer',sub:'Settlement Route Optimization & FX Conversion',ic:'DollarSign',c:'#00897B',pt:'AI Forex Trader',pr:'/ai-agent/trading/forex-trader',pi:'Globe',pc:'#00897B',
cap:['Route Optimization','FX Conversion','Settlement Network','Compliance Check','Cost Minimization','Speed Optimization','Multi-currency','Beneficiary Mgmt'],
resp:['Optimize cross-border payment routing and settlement','Minimize FX conversion costs through netting and batching','Select optimal settlement networks per currency pair','Ensure compliance with cross-border payment regulations','Balance cost vs speed for different payment priorities','Manage multi-currency beneficiary information'],
st:[{l:'Payments',v:'2,400',i:'DollarSign',c:'#34C759'},{l:'Currencies',v:'42',i:'Globe',c:'#007AFF'},{l:'Avg Cost',v:'0.12%',i:'Target',c:'#FF9500'},{l:'Speed',v:'T+0',i:'Clock',c:'#AF52DE'}],
act:[{t:'2 min ago',x:'Optimized CNY payment route via HK network',i:'DollarSign'},{t:'6 min ago',x:'Netted 42 EUR payments for cost savings',i:'Activity'},{t:'14 min ago',x:'Selected SWIFT gpi for urgent USD transfer',i:'Globe'},{t:'28 min ago',x:'Cleared compliance for 18 cross-border payments',i:'Shield'},{t:'1 hr ago',x:'Published payment cost analysis report',i:'FileText'}],
met:[{l:'Cost Saved',v:'$840K',ch:'+$120K'},{l:'Avg Speed',v:'T+0',ch:'-T+0.2'},{l:'Route Opt',v:'98.4%',ch:'+1.2%'},{l:'Compliance',v:'100%',ch:'0%'}]},

// Crypto Trader subs
{id:'on-chain-analyzer',t:'AI On-chain Analyzer',sub:'Blockchain Monitoring & Whale Tracking',ic:'Eye',c:'#F59E0B',pt:'AI Crypto Trader',pr:'/ai-agent/trading/crypto-trader',pi:'Bitcoin',pc:'#F59E0B',
cap:['Whale Tracking','Flow Analysis','Mempool Monitor','Token Flow','Exchange Flows','Smart Contract Events','NFT Tracking','Bridge Activity'],
resp:['Track whale wallet movements and large transfers','Analyze on-chain flow patterns and exchange deposits','Monitor mempool for transaction priority and fee optimization','Track token flows between wallets and protocols','Monitor exchange inflows/outflows for sell pressure signals','Track smart contract events and bridge activity'],
st:[{l:'Addresses',v:'847K',i:'Eye',c:'#34C759'},{l:'Whale Alerts',v:'42',i:'AlertTriangle',c:'#007AFF'},{l:'Flows',v:'Real-time',i:'Activity',c:'#FF9500'},{l:'Chains',v:'12',i:'Globe',c:'#AF52DE'}],
act:[{t:'1 min ago',x:'Detected 5K ETH transfer to Binance',i:'Eye'},{t:'4 min ago',x:'Analyzed mempool fee distribution',i:'Activity'},{t:'12 min ago',x:'Tracked $24M USDC bridge transfer',i:'Globe'},{t:'28 min ago',x:'Flagged whale accumulation pattern',i:'AlertTriangle'},{t:'1 hr ago',x:'Published on-chain flow analysis',i:'FileText'}],
met:[{l:'Whale Det',v:'42',ch:'+8'},{l:'Flow Track',v:'847K',ch:'+42K'},{l:'Mempool',v:'Real-time',ch:'Stable'},{l:'Alert Speed',v:'0.4s',ch:'-0.1s'}]},

{id:'liquidity-pool-monitor',t:'AI Liquidity Pool Monitor',sub:'DEX Pool Tracking & Impermanent Loss',ic:'Activity',c:'#F59E0B',pt:'AI Crypto Trader',pr:'/ai-agent/trading/crypto-trader',pi:'Bitcoin',pc:'#F59E0B',
cap:['TVL Tracking','Pool Analytics','Impermanent Loss','APY Monitoring','Concentration Analysis','Fee Revenue','Volume Tracking','Protocol Comparison'],
resp:['Track total value locked across DeFi protocols','Analyze pool composition and concentration risk','Calculate impermanent loss for LP positions','Monitor APY changes and yield opportunity signals','Track fee revenue and volume for pool profitability','Compare protocol metrics for allocation decisions'],
st:[{l:'Pools',v:'847',i:'Activity',c:'#34C759'},{l:'TVL',v:'$89M',i:'DollarSign',c:'#007AFF'},{l:'APY',v:'14.2%',i:'TrendingUp',c:'#FF9500'},{l:'IL Track',v:'Real-time',i:'AlertTriangle',c:'#AF52DE'}],
act:[{t:'2 min ago',x:'Updated TVL across 847 pools',i:'Activity'},{t:'6 min ago',x:'Calculated IL for 42 LP positions',i:'AlertTriangle'},{t:'14 min ago',x:'Detected APY spike in ETH/USDC pool',i:'TrendingUp'},{t:'28 min ago',x:'Compared Uniswap vs Curve metrics',i:'BarChart3'},{t:'1 hr ago',x:'Published DeFi pool performance report',i:'FileText'}],
met:[{l:'TVL Tracked',v:'$89M',ch:'+$12M'},{l:'Avg APY',v:'14.2%',ch:'+1.8%'},{l:'IL Minimized',v:'94%',ch:'+2%'},{l:'Pool Count',v:'847',ch:'+42'}]},

{id:'wallet-security-checker',t:'AI Wallet Security Checker',sub:'Multi-sig Verification & Vulnerability Scan',ic:'ShieldCheck',c:'#F59E0B',pt:'AI Crypto Trader',pr:'/ai-agent/trading/crypto-trader',pi:'Bitcoin',pc:'#F59E0B',
cap:['Multi-sig Verification','Cold Storage Audit','Vulnerability Scan','Approval Checker','Phishing Detection','Contract Interaction','Key Management','Incident Response'],
resp:['Verify multi-sig wallet configurations and quorum settings','Audit cold storage procedures and key management protocols','Scan for known vulnerabilities in connected contracts','Check token approval exposure and revoke risky approvals','Detect phishing and social engineering attack vectors','Maintain incident response procedures for security events'],
st:[{l:'Audits',v:'847',i:'ShieldCheck',c:'#34C759'},{l:'Vulnerabilities',v:'0',i:'Shield',c:'#007AFF'},{l:'Approvals',v:'42K',i:'Eye',c:'#FF9500'},{l:'Score',v:'98/100',i:'Star',c:'#AF52DE'}],
act:[{t:'1 min ago',x:'Verified multi-sig quorum for treasury wallet',i:'ShieldCheck'},{t:'4 min ago',x:'Scanned 42 contracts for vulnerabilities',i:'Shield'},{t:'12 min ago',x:'Revoked 3 risky token approvals',i:'Eye'},{t:'28 min ago',x:'Audited cold storage key rotation',i:'Key'},{t:'1 hr ago',x:'Published security audit report',i:'FileText'}],
met:[{l:'Security Score',v:'98/100',ch:'+2'},{l:'Vuln Found',v:'0',ch:'0'},{l:'Approval Rev',v:'42',ch:'+8'},{l:'Audit Coverage',v:'100%',ch:'0%'}]},

// Derivatives Specialist subs
{id:'options-pricer',t:'AI Options Pricer',sub:'Real-time Options Pricing Engine',ic:'Calculator',c:'#E65100',pt:'AI Derivatives Specialist',pr:'/ai-agent/trading/derivatives-specialist',pi:'Calculator',pc:'#E65100',
cap:['Black-Scholes','Binomial Model','Monte Carlo','Local Vol','Stochastic Vol','American Options','Exotic Pricing','Dividend Adjustment'],
resp:['Price European and American options using multiple models','Run Monte Carlo simulations for exotic and path-dependent options','Apply local and stochastic volatility models for surface fitting','Price exotic options including barriers, Asians, and lookbacks','Adjust pricing for dividend and corporate action impacts','Validate model outputs against market observed prices'],
st:[{l:'Models',v:'8',i:'Calculator',c:'#34C759'},{l:'Priced',v:'24,000',i:'Activity',c:'#007AFF'},{l:'Speed',v:'0.1ms',i:'Clock',c:'#FF9500'},{l:'Accuracy',v:'99.8%',i:'Target',c:'#AF52DE'}],
act:[{t:'1 min ago',x:'Priced 847 SPX options in 0.8ms batch',i:'Calculator'},{t:'4 min ago',x:'Ran Monte Carlo for barrier option',i:'Activity'},{t:'12 min ago',x:'Calibrated local vol model',i:'Target'},{t:'28 min ago',x:'Adjusted pricing for AAPL dividend',i:'DollarSign'},{t:'1 hr ago',x:'Published pricing model validation report',i:'FileText'}],
met:[{l:'Pricing Acc',v:'99.8%',ch:'+0.1%'},{l:'Batch Speed',v:'0.8ms',ch:'-0.2ms'},{l:'Model Count',v:'8',ch:'+1'},{l:'Exotic Support',v:'6 types',ch:'+1'}]},

{id:'greeks-calculator',t:'AI Greeks Calculator',sub:'Portfolio Greeks Aggregation & Sensitivity',ic:'BarChart3',c:'#E65100',pt:'AI Derivatives Specialist',pr:'/ai-agent/trading/derivatives-specialist',pi:'Calculator',pc:'#E65100',
cap:['Delta Calculation','Gamma Analysis','Vega Exposure','Theta Decay','Rho Sensitivity','Higher-order Greeks','Portfolio Aggregation','Hedge Ratio Calc'],
resp:['Calculate first-order Greeks (Delta, Vega, Theta, Rho)','Compute second-order Greeks (Gamma, Vanna, Volga, Charm)','Aggregate Greeks across portfolio positions','Calculate hedge ratios for risk management','Monitor Greek exposure limits and concentration','Produce Greeks sensitivity reports and dashboards'],
st:[{l:'Positions',v:'2,847',i:'BarChart3',c:'#34C759'},{l:'Greeks',v:'Real-time',i:'Activity',c:'#007AFF'},{l:'Delta',v:'$12M',i:'TrendingUp',c:'#FF9500'},{l:'Vega',v:'$8.4M',i:'Zap',c:'#AF52DE'}],
act:[{t:'1 min ago',x:'Aggregated portfolio delta across 2,847 positions',i:'BarChart3'},{t:'4 min ago',x:'Computed Vanna and Volga for vol book',i:'Activity'},{t:'12 min ago',x:'Calculated hedge ratios for delta-neutral',i:'Target'},{t:'28 min ago',x:'Monitored gamma exposure limits',i:'AlertTriangle'},{t:'1 hr ago',x:'Published Greeks sensitivity dashboard',i:'FileText'}],
met:[{l:'Calc Speed',v:'0.2ms',ch:'-0.05ms'},{l:'Greeks Acc',v:'99.6%',ch:'+0.2%'},{l:'Hedge Ratio',v:'0.98',ch:'+0.01'},{l:'Coverage',v:'100%',ch:'0%'}]},

{id:'volatility-surface-mapper',t:'AI Volatility Surface Mapper',sub:'Implied Vol Surface Construction & Fitting',ic:'TrendingUp',c:'#E65100',pt:'AI Derivatives Specialist',pr:'/ai-agent/trading/derivatives-specialist',pi:'Calculator',pc:'#E65100',
cap:['Surface Construction','Smile Fitting','Term Structure','Arbitrage Detection','Surface Interpolation','Sticky Strike','Surface Dynamics','Model Calibration'],
resp:['Construct implied volatility surfaces from market data','Fit volatility smile and skew using parametric models','Build volatility term structure across expirations','Detect calendar and vertical arbitrage in surfaces','Interpolate surface for pricing at arbitrary strikes/expirations','Monitor surface dynamics and regime changes'],
st:[{l:'Surfaces',v:'42',i:'TrendingUp',c:'#34C759'},{l:'Points',v:'847K',i:'Activity',c:'#007AFF'},{l:'Arb Det',v:'99.4%',i:'Shield',c:'#FF9500'},{l:'Fit R²',v:'0.98',i:'Target',c:'#AF52DE'}],
act:[{t:'2 min ago',x:'Constructed SPX vol surface from 847K points',i:'TrendingUp'},{t:'6 min ago',x:'Fitted SABR model to skew surface',i:'Activity'},{t:'14 min ago',x:'Detected vertical arbitrage in SPY surface',i:'Shield'},{t:'28 min ago',x:'Interpolated surface for 6-month 105% strike',i:'Target'},{t:'1 hr ago',x:'Published vol surface dynamics report',i:'FileText'}],
met:[{l:'Fit R²',v:'0.98',ch:'+0.01'},{l:'Arb Free',v:'99.4%',ch:'+0.2%'},{l:'Surface Count',v:'42',ch:'+3'},{l:'Update Freq',v:'1s',ch:'Stable'}]},
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
console.log('Batch 2: '+D.length+' sub-agent pages');
