const fs = require('fs');
const path = require('path');

const base = path.join(__dirname, '..', 'app', 'ai-agent', 'realestate');

const mainAgents = [
  { file:'facilities-manager.tsx', id:'facilities-manager', name:'AI Facilities Manager', sub:'Facilities Management', icon:'Shield', badge:'Manager', stats:'4,567', resp:'0.3s', acc:'99.1', caps:['Facilities Operations','Building Management','Preventive Maintenance','Energy Management','Space Planning','Safety Compliance'], resps:['Facilities operations management & oversight','Building systems management & monitoring','Preventive maintenance program management','Energy management & sustainability','Space planning & optimization','Safety compliance & regulatory adherence'], acts:['Managed 50 building facilities operations','Implemented preventive maintenance for 200 systems','Reduced energy costs by 18% across portfolio'], subAgents:[{id:'building-systems-monitor',label:'AI Building Systems Monitor'},{id:'energy-manager',label:'AI Energy Manager'},{id:'space-optimizer',label:'AI Space Optimizer'}] },
  { file:'acquisition-analyst.tsx', id:'acquisition-analyst', name:'AI Acquisition Analyst', sub:'Acquisitions & Investments', icon:'Target', badge:'Analyst', stats:'2,345', resp:'0.8s', acc:'98.7', caps:['Acquisition Analysis','Deal Underwriting','Market Research','Financial Modeling','Due Diligence','Investment Scoring'], resps:['Acquisition opportunity analysis & evaluation','Deal underwriting & financial modeling','Market research & comparable analysis','Investment scoring & ranking','Due diligence coordination','Acquisition pipeline management'], acts:['Analyzed 30 acquisition opportunities this quarter','Underwrote 5 deals totaling $150M','Scored 50 deals using investment criteria model'], subAgents:[{id:'deal-screener',label:'AI Deal Screener'},{id:'due-diligence-coordinator',label:'AI Due Diligence Coordinator'},{id:'underwriting-assistant',label:'AI Underwriting Assistant'}] },
  { file:'asset-manager.tsx', id:'asset-manager', name:'AI Asset Manager', sub:'Asset Management', icon:'TrendingUp', badge:'Manager', stats:'3,123', resp:'0.5s', acc:'98.9', caps:['Asset Management','Performance Optimization','Disposition Strategy','Return Analysis','Portfolio Monitoring','Value Enhancement'], resps:['Asset management & performance optimization','Asset performance monitoring & reporting','Disposition strategy & execution','Return analysis & benchmarking','Portfolio monitoring & rebalancing','Value enhancement program management'], acts:['Managed 25 assets totaling $750M','Identified 3 assets for disposition strategy','Enhanced portfolio returns by 15% YoY'], subAgents:[{id:'asset-performance-tracker',label:'AI Asset Performance Tracker'},{id:'disposition-advisor',label:'AI Disposition Advisor'},{id:'return-calculator',label:'AI Return Calculator'}] },
  { file:'development-coordinator.tsx', id:'development-coordinator', name:'AI Development Coordinator', sub:'Development Coordination', icon:'Calendar', badge:'Coordinator', stats:'1,890', resp:'0.7s', acc:'98.2', caps:['Development Coordination','Project Scheduling','Budget Management','Contractor Oversight','Timeline Management','Quality Assurance'], resps:['Development project coordination & management','Project scheduling & milestone tracking','Budget management & cost control','Contractor oversight & coordination','Timeline management & delivery assurance','Quality assurance & compliance verification'], acts:['Coordinated 8 development projects this quarter','Managed $300M in active development budgets','Ensured 95% on-time project delivery rate'], subAgents:[{id:'timeline-manager',label:'AI Timeline Manager'},{id:'contractor-coordinator',label:'AI Contractor Coordinator'},{id:'budget-tracker',label:'AI Budget Tracker'}] },
  { file:'property-marketing.tsx', id:'property-marketing', name:'AI Property Marketing', sub:'Property Marketing', icon:'Megaphone', badge:'Specialist', stats:'2,456', resp:'0.6s', acc:'98.4', caps:['Property Marketing','Digital Campaigns','Listing Management','Lead Generation','Brand Management','Market Positioning'], resps:['Property marketing strategy & execution','Digital campaign management & optimization','Listing management & distribution','Lead generation & qualification','Brand management & positioning','Market positioning & competitive analysis'], acts:['Launched 20 marketing campaigns this month','Generated 500 qualified leads across portfolio','Increased listing views by 35% through SEO'], subAgents:[{id:'listing-creator',label:'AI Listing Creator'},{id:'virtual-tour-builder',label:'AI Virtual Tour Builder'},{id:'lead-qualifier',label:'AI Lead Qualifier'}] },
  { file:'lease-administrator.tsx', id:'lease-administrator', name:'AI Lease Administrator', sub:'Lease Administration', icon:'FileText', badge:'Administrator', stats:'4,567', resp:'0.3s', acc:'99.4', caps:['Lease Administration','Abstraction & Analysis','Critical Date Tracking','Rent Escalation','Compliance Management','Database Management'], resps:['Lease administration & management','Lease abstraction & key term analysis','Critical date tracking & notification','Rent escalation calculation & management','Lease compliance management','Lease database management & maintenance'], acts:['Administered 1,200 leases across portfolio','Tracked 500 critical dates with zero misses','Calculated rent escalations for 300 leases'], subAgents:[{id:'lease-abstractor',label:'AI Lease Abstractor'},{id:'critical-date-tracker',label:'AI Critical Date Tracker'},{id:'rent-escalation-calculator',label:'AI Rent Escalation Calculator'}] },
  { file:'maintenance-coordinator.tsx', id:'maintenance-coordinator', name:'AI Maintenance Coordinator', sub:'Maintenance Operations', icon:'Wrench', badge:'Coordinator', stats:'5,678', resp:'0.2s', acc:'99.0', caps:['Maintenance Coordination','Work Order Management','Vendor Management','Cost Estimation','Preventive Programs','SLA Management'], resps:['Maintenance coordination & scheduling','Work order management & prioritization','Vendor management & dispatch','Cost estimation & budget tracking','Preventive maintenance program management','SLA management & compliance tracking'], acts:['Coordinated 500 work orders this month','Maintained 97% SLA compliance rate','Reduced maintenance costs by 12% YoY'], subAgents:[{id:'work-order-prioritizer',label:'AI Work Order Prioritizer'},{id:'vendor-dispatcher',label:'AI Vendor Dispatcher'},{id:'cost-estimator',label:'AI Cost Estimator'}] },
  { file:'leasing-manager.tsx', id:'leasing-manager', name:'AI Leasing Manager', sub:'Leasing Operations', icon:'Users', badge:'Manager', stats:'3,456', resp:'0.5s', acc:'98.6', caps:['Leasing Strategy','Vacancy Management','Lease Negotiation','Tenant Qualification','Market Analysis','Revenue Optimization'], resps:['Leasing strategy development & execution','Vacancy management & minimization','Lease negotiation & deal structuring','Tenant qualification & screening','Market analysis & rent optimization','Revenue optimization & growth'], acts:['Leased 40 units this month at 98% of asking','Reduced vacancy rate from 8% to 3%','Negotiated 25 renewals with favorable terms'], subAgents:[{id:'vacancy-minimizer',label:'AI Vacancy Minimizer'},{id:'lease-negotiator',label:'AI Lease Negotiator'},{id:'tenant-qualifier',label:'AI Tenant Qualifier'}] },
  { file:'property-manager.tsx', id:'property-manager', name:'AI Property Manager', sub:'Property Management', icon:'Settings', badge:'Manager', stats:'5,890', resp:'0.2s', acc:'99.5', caps:['Property Management','Rent Collection','Maintenance Dispatch','Lease Enforcement','Tenant Relations','Financial Reporting'], resps:['Property management & operations oversight','Rent collection & financial management','Maintenance dispatch & coordination','Lease enforcement & compliance','Tenant relations & service delivery','Financial reporting & budget management'], acts:['Managed 150 properties with 99% occupancy','Collected $5M in rent with 2% delinquency','Dispatched 200 maintenance requests this week'], subAgents:[{id:'rent-collector',label:'AI Rent Collector'},{id:'maintenance-dispatcher',label:'AI Maintenance Dispatcher'},{id:'lease-enforcer',label:'AI Lease Enforcer'}] },
];

const actIcons = ['CircleCheckBig', 'Clock', 'Zap'];
const actTimes = ['3 min ago', '6 min ago', '9 min ago'];

mainAgents.forEach(agent => {
  const capsStr = agent.caps.map(c => `'${c}'`).join(',');
  const respsStr = agent.resps.map(r => `'${r}'`).join(',');
  const actsStr = agent.acts.map((a, i) => `{time:'${actTimes[i]}',text:'${a}',icon:${actIcons[i]}}`).join(',');
  const subAgentsStr = agent.subAgents.map(s => `{id:'${s.id}',label:'${s.label}'}`).join(',');

  const content = `import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { useTheme } from '@/providers/ThemeProvider';
import { ${agent.icon}, Activity, Star, CircleCheckBig, Clock, Target, ArrowRight, Zap } from 'lucide-react-native';
import AgentFeatures from '@/components/ai-agent/AgentFeatures';
import SubAgentLinks from '@/components/ai-agent/SubAgentLinks';

export default function AgentPage() {
  const { theme } = useTheme();
  const stats = [{label:'Tasks',value:'${agent.stats}',icon:CircleCheckBig,color:'#34C759'},{label:'Uptime',value:'99.9%',icon:Activity,color:'#007AFF'},{label:'Response',value:'${agent.resp}',icon:Clock,color:'#FF9500'},{label:'Accuracy',value:'${agent.acc}%',icon:Target,color:'#33691E'}];
  const capabilities = [${capsStr}];
  const responsibilities = [${respsStr}];
  const activities = [${actsStr}];
  return (
    <ScrollView style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <View style={[styles.hero, { borderBottomColor: theme.colors.border || '#E5E5EA' }]}>
        <View style={[styles.heroIconWrap, { backgroundColor: '#33691E20' }]}><${agent.icon} size={48} color="#33691E" /></View>
        <Text style={[styles.heroTitle, { color: theme.colors.text }]}>${agent.name}</Text>
        <Text style={[styles.heroSubtitle, { color: theme.colors.textSecondary }]}>${agent.sub}</Text>
        <View style={styles.badgesRow}>
          <View style={[styles.badge, { backgroundColor: '#34C75922' }]}><Activity size={12} color="#34C759" /><Text style={[styles.badgeText, { color: '#34C759' }]}>Active</Text></View>
          <View style={[styles.badge, { backgroundColor: '#33691E22' }]}><Star size={12} color="#33691E" /><Text style={[styles.badgeText, { color: '#33691E' }]}>${agent.badge}</Text></View>
        </View>
      </View>
      <View style={styles.statsContainer}>{stats.map((stat,i)=>(<View key={i} style={[styles.statCard, { backgroundColor: theme.colors.card || '#F2F2F7' }]}><stat.icon size={22} color={stat.color} /><Text style={[styles.statValue, { color: theme.colors.text }]}>{stat.value}</Text><Text style={[styles.statLabel, { color: theme.colors.textSecondary }]}>{stat.label}</Text></View>))}</View>
      <View style={[styles.section, { backgroundColor: theme.colors.card || '#F2F2F7' }]}><Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Overview</Text><Text style={[styles.description, { color: theme.colors.textSecondary }]}>The ${agent.name} leads specialized operations, automates workflows, and delivers enterprise-grade performance within the Real Estate division.</Text></View>
      <View style={[styles.section, { backgroundColor: theme.colors.card || '#F2F2F7' }]}><Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Capabilities</Text><View style={styles.tagsContainer}>{capabilities.map((cap,i)=>(<View key={i} style={[styles.tag, { backgroundColor: '#33691E18' }]}><Text style={[styles.tagText, { color: '#33691E' }]}>{cap}</Text></View>))}</View></View>
      <View style={[styles.section, { backgroundColor: theme.colors.card || '#F2F2F7' }]}><Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Key Responsibilities</Text>{responsibilities.map((item,i)=>(<View key={i} style={styles.responsibilityRow}><ArrowRight size={14} color="#33691E" /><Text style={[styles.responsibilityText, { color: theme.colors.textSecondary }]}>{item}</Text></View>))}</View>
      <View style={[styles.section, { backgroundColor: theme.colors.card || '#F2F2F7' }]}><Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Recent Activity</Text>{activities.map((act,i)=>(<View key={i} style={styles.activityRow}><View style={[styles.activityIcon, { backgroundColor: '#33691E15' }]}><act.icon size={14} color="#33691E" /></View><View style={styles.activityContent}><Text style={[styles.activityText, { color: theme.colors.text }]}>{act.text}</Text><Text style={[styles.activityTime, { color: theme.colors.textSecondary }]}>{act.time}</Text></View></View>))}</View>
      <SubAgentLinks subAgents={[${subAgentsStr}]} />
      <AgentFeatures agentId="${agent.id}" agentName="${agent.name}" />
    </ScrollView>
  );
}

const styles = StyleSheet.create({container:{flex:1},hero:{alignItems:'center',paddingVertical:32,paddingHorizontal:20,borderBottomWidth:1},heroIconWrap:{width:88,height:88,borderRadius:44,justifyContent:'center',alignItems:'center',marginBottom:16},heroTitle:{fontSize:26,fontWeight:'bold'},heroSubtitle:{fontSize:15,marginTop:4,fontWeight:'500'},badgesRow:{flexDirection:'row',gap:10,marginTop:16},badge:{flexDirection:'row',alignItems:'center',paddingHorizontal:10,paddingVertical:5,borderRadius:20,gap:4},badgeText:{fontSize:12,fontWeight:'600'},statsContainer:{flexDirection:'row',flexWrap:'wrap',padding:16,gap:12},statCard:{flex:1,minWidth:'22%',alignItems:'center',padding:14,borderRadius:12},statValue:{fontSize:18,fontWeight:'bold',marginTop:8},statLabel:{fontSize:11,marginTop:4},section:{marginHorizontal:16,marginBottom:16,padding:20,borderRadius:16},sectionTitle:{fontSize:18,fontWeight:'700',marginBottom:14},description:{fontSize:14,lineHeight:22},tagsContainer:{flexDirection:'row',flexWrap:'wrap',gap:8},tag:{paddingHorizontal:12,paddingVertical:6,borderRadius:20},tagText:{fontSize:12,fontWeight:'600'},responsibilityRow:{flexDirection:'row',alignItems:'center',marginBottom:10,gap:8},responsibilityText:{fontSize:14,flex:1,lineHeight:20},activityRow:{flexDirection:'row',alignItems:'center',marginBottom:12,gap:12},activityIcon:{width:32,height:32,borderRadius:16,justifyContent:'center',alignItems:'center'},activityContent:{flex:1},activityText:{fontSize:14,fontWeight:'500'},activityTime:{fontSize:12,marginTop:2}});
`;

  const filePath = path.join(base, agent.file);
  fs.writeFileSync(filePath, content, 'utf8');
  console.log(`Updated: ${agent.file}`);
});

// Also update the ai-* prefixed files that are duplicates
const duplicateFiles = [
  'ai-acquisition-analyst.tsx', 'ai-asset-manager.tsx', 'ai-development-coordinator.tsx',
  'ai-lease-administrator.tsx', 'ai-maintenance-coordinator.tsx', 'ai-property-analyst.tsx',
  'ai-property-marketing.tsx', 'ai-tenant-relations.tsx'
];

// These duplicates should redirect to the main pages
duplicateFiles.forEach(file => {
  const baseName = file.replace('ai-', '');
  const content = `import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { useTheme } from '@/providers/ThemeProvider';
import { ArrowRight, Activity } from 'lucide-react-native';
import { useRouter } from 'expo-router';

export default function RedirectPage() {
  const { theme } = useTheme();
  const router = useRouter();
  React.useEffect(() => { router.replace('/ai-agent/realestate/${baseName}'); }, []);
  return (
    <ScrollView style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <View style={styles.center}><Activity size={32} color="#33691E" /><Text style={[styles.text, { color: theme.colors.textSecondary }]}>Redirecting...</Text></View>
    </ScrollView>
  );
}
const styles = StyleSheet.create({container:{flex:1},center:{flex:1,alignItems:'center',justifyContent:'center',paddingVertical:100},text:{fontSize:16,marginTop:12}});
`;
  const filePath = path.join(base, file);
  fs.writeFileSync(filePath, content, 'utf8');
  console.log(`Updated redirect: ${file}`);
});

console.log(`\nDone! Updated ${mainAgents.length} main agent pages and ${duplicateFiles.length} redirect files.`);
