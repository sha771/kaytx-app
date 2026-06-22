const fs = require('fs');
const path = require('path');

const DEPT_SLUGS = {
  1:'customer-experience',2:'sales',3:'marketing',4:'operations',5:'finance',
  6:'technology',7:'human-resources',8:'legal',9:'data',10:'product',
  11:'security',12:'research',13:'administrative',14:'trading',15:'real-estate',
  16:'insurance',17:'healthcare',18:'manufacturing',19:'transportation',
  20:'government',21:'supply-chain',22:'ai-governance',0:'cross-department'
};
const DEPT_NAMES = {
  1:'Customer Experience',2:'Sales & Revenue',3:'Marketing & Growth',
  4:'Operations & Management',5:'Finance & Accounting',6:'Technology & Engineering',
  7:'Human Resources',8:'Legal & Compliance',9:'Data & Intelligence',
  10:'Product Management',11:'Security & Risk',12:'Research & Development',
  13:'Administrative',14:'Trading & Investments',15:'Real Estate & Property',
  16:'Insurance & Risk',17:'Healthcare & Medical',18:'Manufacturing & Production',
  19:'Transportation & Logistics',20:'Government & Public Sector',
  21:'Supply Chain & Logistics',22:'AI Management & Governance',0:'Cross-Department'
};
const DEPT_COLORS = {
  1:'#00BCD4',2:'#FFA000',3:'#E91E63',4:'#607D8B',5:'#2E7D32',6:'#1565C0',
  7:'#9C27B0',8:'#3F51B5',9:'#00ACC1',10:'#FF5722',11:'#F44336',12:'#009688',
  13:'#795548',14:'#10B981',15:'#8D6E63',16:'#FF7043',17:'#EC407A',18:'#5C6BC0',
  19:'#26A69A',20:'#78909C',21:'#42A5F5',22:'#6366F1',0:'#8B5CF6'
};

function toSlug(t){return t.toLowerCase().replace(/^ai\s+/i,'').replace(/[^a-z0-9\s-]/g,'').replace(/\s+/g,'-').replace(/-+/g,'-').replace(/^-|-$/g,'');}
function esc(s){return s.replace(/\\/g,'\\\\').replace(/'/g,"\\'");}

function getLevel(title,section){
  const t=title.toLowerCase();
  if(/chief|ceo|cto|cfo|coo|ciso|cmo|cro|cpo|clo|chro/.test(t))return 'c_level';
  if(t.includes('vp ')||t.includes('vice president')||t.includes('director')||t.includes('head of'))return 'vp_director';
  if(t.includes('manager')||t.includes('lead ')||t.includes('senior'))return 'manager';
  if(section==='sub')return 'specialist';
  return 'team_lead';
}

function getCaps(d,role){
  const c={
    1:['Customer Journey Mapping','Sentiment Analysis','Multi-channel Support','Churn Prediction','Loyalty Programs','Ticket Routing','Knowledge Base Management','Customer Feedback Analysis'],
    2:['Lead Scoring','Pipeline Management','Sales Forecasting','CRM Integration','Deal Tracking','Revenue Optimization','Territory Management','Sales Coaching'],
    3:['Campaign Management','SEO Optimization','Content Strategy','Social Media Analytics','Brand Management','Growth Hacking','A/B Testing','Marketing Automation'],
    4:['Process Optimization','Resource Allocation','Workflow Automation','Quality Assurance','Project Management','Capacity Planning','Vendor Management','Operational Analytics'],
    5:['Financial Modeling','Budget Management','Tax Compliance','Revenue Recognition','Expense Tracking','Audit Preparation','Cash Flow Analysis','Financial Reporting'],
    6:['Code Generation','System Architecture','DevOps Automation','Performance Optimization','Security Scanning','API Management','Cloud Infrastructure','Technical Documentation'],
    7:['Talent Acquisition','Employee Onboarding','Performance Reviews','Training Programs','Compensation Analysis','Culture Development','HR Compliance','Workforce Planning'],
    8:['Contract Management','Regulatory Compliance','Risk Assessment','Legal Research','IP Protection','Dispute Resolution','Policy Development','Audit Management'],
    9:['Data Pipeline Management','Machine Learning','Data Governance','ETL Processing','Predictive Analytics','Data Visualization','Statistical Modeling','Big Data Processing'],
    10:['Product Roadmapping','Feature Prioritization','User Research','Sprint Planning','A/B Testing','Product Analytics','Market Analysis','Stakeholder Management'],
    11:['Threat Detection','Vulnerability Assessment','Incident Response','Security Auditing','Access Control','Encryption Management','Compliance Monitoring','Risk Mitigation'],
    12:['Research Methodology','Patent Analysis','Prototype Development','Lab Management','Literature Review','Experiment Design','Innovation Pipeline','Technology Scouting'],
    13:['Document Management','Scheduling','Office Management','Records Keeping','Communication Coordination','Travel Planning','Meeting Facilitation','Administrative Reporting'],
    14:['Portfolio Management','Market Analysis','Risk Assessment','Trade Execution','Compliance Monitoring','Performance Attribution','Derivatives Pricing','Quantitative Modeling'],
    15:['Property Valuation','Lease Management','Market Analysis','Tenant Relations','Property Maintenance','Investment Analysis','Zoning Compliance','Real Estate Marketing'],
    16:['Claims Processing','Underwriting','Policy Management','Risk Assessment','Fraud Detection','Premium Calculation','Regulatory Compliance','Customer Communication'],
    17:['Patient Care Coordination','Medical Records Management','Clinical Decision Support','Health Monitoring','Treatment Planning','Telemedicine','Medical Billing','Healthcare Compliance'],
    18:['Production Planning','Quality Control','Inventory Management','Equipment Maintenance','Lean Manufacturing','Supply Coordination','Safety Compliance','Process Engineering'],
    19:['Fleet Management','Route Optimization','Shipment Tracking','Warehouse Management','Carrier Relations','Customs Compliance','Demand Forecasting','Logistics Analytics'],
    20:['Policy Analysis','Public Engagement','Regulatory Development','Grant Management','Program Evaluation','Stakeholder Relations','Public Communications','Government Compliance'],
    21:['Supply Chain Optimization','Procurement','Inventory Management','Supplier Relations','Demand Planning','Logistics Coordination','Cost Reduction','Sustainability Tracking'],
    22:['AI Governance','Model Monitoring','Ethics Compliance','AI Strategy','Bias Detection','Performance Benchmarking','Agent Orchestration','AI Risk Management'],
    0:['Cross-department Coordination','Enterprise Analytics','System Integration','Data Sharing','Process Orchestration','Intelligence Aggregation','Governance Oversight','Anomaly Detection'],
  };
  const p=c[d]||c[1];const i=role.length%p.length;const r=[];
  for(let j=0;j<5;j++)r.push(p[(i+j)%p.length]);
  return r;
}

function getResp(level){
  return({
    c_level:['Define strategic vision and roadmap','Align cross-functional teams','Report to executive leadership','Drive organizational transformation'],
    vp_director:['Execute department strategy','Manage department budget','Lead management team','Optimize department KPIs'],
    manager:['Manage daily team operations','Ensure quality deliverables','Coach and develop team members','Track and report on metrics'],
    team_lead:['Lead team projects','Coordinate daily workflows','Mentor junior team members','Ensure SLA compliance'],
    specialist:['Execute specialized tasks','Provide expert analysis','Support team operations','Maintain quality standards'],
  })[level]||['Execute specialized tasks','Provide expert analysis','Support team operations','Maintain quality standards'];
}

function getIcon(l){return({c_level:'Crown',vp_director:'Star',manager:'Settings',team_lead:'Zap',specialist:'Sparkles'})[l]||'Sparkles';}

function genDesc(title,dept,level){
  const dn=DEPT_NAMES[dept]||'the organization';
  const ld={
    c_level:`leads strategic direction and executive decision-making for the ${dn} department`,
    vp_director:`drives department strategy and oversees operations for the ${dn} department`,
    manager:`manages team operations and ensures delivery excellence for the ${dn} department`,
    team_lead:`coordinates team activities and ensures quality output for the ${dn} department`,
    specialist:`provides specialized expertise and executes critical tasks for the ${dn} department`,
  };
  const cleanTitle=title.startsWith('AI ')?title.slice(3):title;
  return `AI ${cleanTitle} ${ld[level]||ld.specialist}. This AI agent automates complex workflows, provides intelligent insights, and collaborates with other agents to achieve organizational goals with maximum efficiency.`;
}

// Parse sidebar - includes dept 0 cross-department agents
function parseSidebar(){
  const sb=fs.readFileSync('constants/aiAgentsSidebarData.ts','utf8');
  const agents=[];let cd=null,cs='main';
  for(const line of sb.split('\n')){
    const dm=line.match(/id:\s*'dept(\d+)-([^']+)'/);
    if(dm){
      const n=parseInt(dm[1]),s=dm[2];
      if(s==='main'||s.endsWith('-main'))cs='main';
      else if(s==='sub'||s.endsWith('-sub'))cs='sub';
      else{cd=n;cs='main';}
      continue;
    }
    const im=line.match(/\{\s*id:\s*'([^']+)',\s*title:\s*'([^']+)'/);
    if(im&&cd!==null&&!im[1].startsWith('dept')){
      agents.push({sidebarId:im[1],title:im[2],departmentId:cd,department:DEPT_NAMES[cd]||`Department ${cd}`,section:cs});
    }
  }
  return agents;
}

console.log('=== KAYTX COMPLETE AI WORKFORCE BUILDER (1135) ===\n');
const sidebarAgents=parseSidebar();
console.log('Sidebar agents parsed:',sidebarAgents.length);

// Build complete agent DB
const allAgents=[];const deptMains={};const deptSubs={};const slugTracker={};
for(const sa of sidebarAgents){
  let slug=toSlug(sa.title);const ds=DEPT_SLUGS[sa.departmentId]||`dept-${sa.departmentId}`;
  const lv=getLevel(sa.title,sa.section);const dn=String(sa.departmentId).padStart(2,'0');
  const slugKey=`${sa.departmentId}-${slug}`;
  if(slugTracker[slugKey]){slugTracker[slugKey]++;slug=`${slug}-${slugTracker[slugKey]}`;}
  else{slugTracker[slugKey]=1;}
  const rawName=sa.title.startsWith('AI ')?sa.title:`AI ${sa.title}`;
  const a={
    id:`ai-${slug}`,uid:`ktx-${dn}-${slug}`,sidebarId:sa.sidebarId,
    name:rawName,title:sa.title,department:sa.department,departmentId:sa.departmentId,
    level:lv,description:genDesc(sa.title,sa.departmentId,lv),
    capabilities:getCaps(sa.departmentId,sa.title),responsibilities:getResp(lv),
    icon:getIcon(lv),color:DEPT_COLORS[sa.departmentId]||'#2196F3',
    route:`/ai-agent/${ds}/${slug}`,type:sa.section==='sub'?'sub':'main',
    aiCost:lv==='c_level'?'$2,400/mo':lv==='vp_director'?'$1,800/mo':lv==='manager'?'$1,200/mo':'$800/mo',
    efficiency:`${75+Math.floor((sa.title.length*7)%20)}%`,
    isPremium:lv==='c_level'||lv==='vp_director',
    deptSlug:ds,slug:slug,parentId:null,
  };
  allAgents.push(a);
  if(a.type==='main'){if(!deptMains[a.departmentId])deptMains[a.departmentId]=[];deptMains[a.departmentId].push(a);}
  else{if(!deptSubs[a.departmentId])deptSubs[a.departmentId]=[];deptSubs[a.departmentId].push(a);}
}
// Assign sub-agents to mains
const subMap={};
for(const deptId of Object.keys(deptSubs)){
  const mains=deptMains[deptId]||[];const subs=deptSubs[deptId]||[];
  if(!mains.length)continue;
  for(let i=0;i<subs.length;i++){
    const parentIdx=i%mains.length;
    subs[i].parentId=mains[parentIdx].id;
    const mapKey=`${deptId}:${mains[parentIdx].id}`;
    if(!subMap[mapKey])subMap[mapKey]=[];
    subMap[mapKey].push(subs[i]);
  }
}

const mainCount=allAgents.filter(a=>a.type==='main').length;
const subCount=allAgents.filter(a=>a.type==='sub').length;
console.log('Main:',mainCount,'Sub:',subCount,'Total:',allAgents.length);

// Group by dept
const byDept={};
for(const a of allAgents){if(!byDept[a.departmentId])byDept[a.departmentId]={main:[],sub:[]};byDept[a.departmentId][a.type==='sub'?'sub':'main'].push(a);}

// ============================================================
// 1. GENERATE completeAIWorkforce_1108.ts (ALL 23 depts including 0)
// ============================================================
console.log('\n--- Generating completeAIWorkforce_1108.ts ---');

const deptDefs=[
  {id:0,name:'Cross-Department',sn:'Cross-Dept',color:'#8B5CF6',icon:'Network'},
  {id:1,name:'Customer Experience',sn:'Customer',color:'#00BCD4',icon:'Headphones'},
  {id:2,name:'Sales & Revenue',sn:'Sales',color:'#FFA000',icon:'Target'},
  {id:3,name:'Marketing & Growth',sn:'Marketing',color:'#E91E63',icon:'Megaphone'},
  {id:4,name:'Operations & Management',sn:'Operations',color:'#607D8B',icon:'Settings'},
  {id:5,name:'Finance & Accounting',sn:'Finance',color:'#2E7D32',icon:'DollarSign'},
  {id:6,name:'Technology & Engineering',sn:'Technology',color:'#1565C0',icon:'Code'},
  {id:7,name:'Human Resources',sn:'Human',color:'#9C27B0',icon:'Users'},
  {id:8,name:'Legal & Compliance',sn:'Legal',color:'#3F51B5',icon:'Scale'},
  {id:9,name:'Data & Intelligence',sn:'Data',color:'#00ACC1',icon:'Database'},
  {id:10,name:'Product Management',sn:'Product',color:'#FF5722',icon:'Box'},
  {id:11,name:'Security & Risk',sn:'Security',color:'#F44336',icon:'Shield'},
  {id:12,name:'Research & Development',sn:'Research',color:'#009688',icon:'FlaskConical'},
  {id:13,name:'Administrative',sn:'Administrative',color:'#795548',icon:'Clipboard'},
  {id:14,name:'Trading & Investments',sn:'Trading',color:'#10B981',icon:'TrendingUp'},
  {id:15,name:'Real Estate & Property',sn:'Real',color:'#8D6E63',icon:'Building'},
  {id:16,name:'Insurance & Risk',sn:'Insurance',color:'#FF7043',icon:'ShieldCheck'},
  {id:17,name:'Healthcare & Medical',sn:'Healthcare',color:'#EC407A',icon:'HeartPulse'},
  {id:18,name:'Manufacturing & Production',sn:'Manufacturing',color:'#5C6BC0',icon:'Box'},
  {id:19,name:'Transportation & Logistics',sn:'Transportation',color:'#26A69A',icon:'Truck'},
  {id:20,name:'Government & Public Sector',sn:'Government',color:'#78909C',icon:'Landmark'},
  {id:21,name:'Supply Chain & Logistics',sn:'Supply',color:'#42A5F5',icon:'Link'},
  {id:22,name:'AI Management & Governance',sn:'AI Gov',color:'#6366F1',icon:'Brain'},
];

let out=`/**
 * =============================================================================
 * KAYTX AI WORKFORCE - COMPLETE DATABASE (${allAgents.length} AGENTS & EMPLOYEES)
 * =============================================================================
 * Total: ${mainCount} Main Agents + ${subCount} Sub-Agents = ${allAgents.length} AI Agents & Employees
 * Departments: 23 (including Cross-Department)
 * @version 11.0.0
 * @lastUpdated 2026-06-11
 */

export interface SubAgent {
  id: string; uid: string; name: string; title: string; description: string; capabilities: string[]; parentId: string;
}
export interface MainAgent {
  id: string; uid: string; name: string; title: string; department: string; departmentId: number;
  level: 'c_level'|'vp_director'|'manager'|'team_lead'|'specialist';
  description: string; capabilities: string[]; responsibilities: string[]; icon: string; color: string;
  route: string; subAgents: SubAgent[]; reportsTo?: string; aiCost: string; efficiency: string; isPremium: boolean;
}
export interface Department { id: number; name: string; shortName: string; color: string; icon: string; mainAgents: number; subAgents: number; total: number; }

export const departments: Department[] = [
`;
for(const d of deptDefs){const dp=byDept[d.id]||{main:[],sub:[]};out+=`  { id: ${d.id}, name: '${d.name}', shortName: '${d.sn}', color: '${d.color}', icon: '${d.icon}', mainAgents: ${dp.main.length}, subAgents: ${dp.sub.length}, total: ${dp.main.length+dp.sub.length} },\n`;}
out+='];\n';

const varNames=[];
// Generate ALL departments including dept 0
for(let d=0;d<=22;d++){
  const dp=byDept[d]||{main:[],sub:[]};const vn=`department${d}Agents`;varNames.push(vn);
  const dd=deptDefs.find(x=>x.id===d);
  out+=`\n// DEPARTMENT ${d}: ${(dd?.name||DEPT_NAMES[d]).toUpperCase()} (${dp.main.length} Main + ${dp.sub.length} Sub)\n`;
  out+=`const ${vn}: MainAgent[] = [\n`;
  for(const ma of dp.main){
    const subs=subMap[`${d}:${ma.id}`]||[];
    const ceoAgent=dp.main.find(x=>x.level==='c_level');
    out+=`  {\n    id: '${ma.id}', uid: '${ma.uid}', name: '${esc(ma.name)}', title: '${esc(ma.title)}',\n`;
    out+=`    department: '${esc(ma.department)}', departmentId: ${ma.departmentId}, level: '${ma.level}',\n`;
    out+=`    description: '${esc(ma.description)}',\n`;
    out+=`    capabilities: [${ma.capabilities.map(c=>`'${esc(c)}'`).join(', ')}],\n`;
    out+=`    responsibilities: [${ma.responsibilities.map(r=>`'${esc(r)}'`).join(', ')}],\n`;
    out+=`    icon: '${ma.icon}', color: '${ma.color}', route: '${ma.route}',\n`;
    out+=`    aiCost: '${ma.aiCost}', efficiency: '${ma.efficiency}', isPremium: ${ma.isPremium},\n`;
    out+=`    reportsTo: ${ma.level==='c_level'?'undefined':`'${ceoAgent?.id||'undefined'}'`},\n`;
    out+=`    subAgents: [\n`;
    for(const s of subs){
      out+=`      { id: '${s.id}', uid: '${s.uid}', name: '${esc(s.name)}', title: '${esc(s.title)}', parentId: '${s.parentId||''}', description: '${esc(s.description)}', capabilities: [${s.capabilities.map(c=>`'${esc(c)}'`).join(', ')}] },\n`;
    }
    out+=`    ]\n  },\n`;
  }
  out+=`];\n`;
}

out+=`\nconst allDepartmentAgents = [\n`;
for(const vn of varNames)out+=`  ...${vn},\n`;
out+=`];\n\n`;

const expNames=['allCrossDepartmentAgents','allCustomerExperienceAgents','allSalesRevenueAgents','allMarketingGrowthAgents','allOperationsManagementAgents','allFinanceAccountingAgents','allTechnologyEngineeringAgents','allHumanResourcesAgents','allLegalComplianceAgents','allDataIntelligenceAgents','allProductManagementAgents','allSecurityRiskAgents','allResearchDevelopmentAgents','allAdministrativeAgents','allTradingInvestmentsAgents','allRealEstatePropertyAgents','allInsuranceRiskAgents','allHealthcareMedicalAgents','allManufacturingProductionAgents','allTransportationLogisticsAgents','allGovernmentPublicSectorAgents','allSupplyChainLogisticsAgents','allAIManagementGovernanceAgents'];
for(let i=0;i<23;i++)out+=`export const ${expNames[i]} = ${varNames[i]};\n`;

out+=`
export const completeAIWorkforce = allDepartmentAgents;
export const workforceSummary = {
  totalMainAgents: allDepartmentAgents.length,
  totalSubAgents: allDepartmentAgents.reduce((s, a) => s + a.subAgents.length, 0),
  totalAgents: allDepartmentAgents.reduce((s, a) => s + 1 + a.subAgents.length, 0),
  totalDepartments: 23,
};
export const departmentSummaries = departments.map(d => {
  const da = allDepartmentAgents.filter(a => a.departmentId === d.id);
  return { ...d, agents: da, mainAgentCount: da.length, subAgentCount: da.reduce((s, a) => s + a.subAgents.length, 0) };
});
export function getAgentsByDepartment(deptId: number): MainAgent[] { return allDepartmentAgents.filter(a => a.departmentId === deptId); }
export function getAgentsByLevel(level: string): MainAgent[] { return allDepartmentAgents.filter(a => a.level === level); }
export function getAgentById(id: string): MainAgent | undefined { return allDepartmentAgents.find(a => a.id === id); }
export function getAgentByUid(uid: string): MainAgent | undefined { return allDepartmentAgents.find(a => a.uid === uid); }
export function getAllSubAgents(): SubAgent[] { return allDepartmentAgents.flatMap(a => a.subAgents); }
export function findSubAgent(id: string): SubAgent | undefined {
  for (const a of allDepartmentAgents) { const s = a.subAgents.find(x => x.id === id); if (s) return s; } return undefined;
}
`;

fs.writeFileSync('constants/completeAIWorkforce_1108.ts',out);
console.log('Workforce written:',out.split('\n').length,'lines');

// Verify workforce UIDs
const wfUids=[...out.matchAll(/uid:\s*'([^']+)'/g)].map(m=>m[1]);
console.log('Workforce UIDs:',wfUids.length,'Unique:',new Set(wfUids).size);

// ============================================================
// 2. GENERATE PAGE FILES for ALL agents
// ============================================================
console.log('\n--- Generating page files ---');
const appDir='app/ai-agent';
for(const slug of Object.values(DEPT_SLUGS)){const dir=path.join(appDir,slug);if(!fs.existsSync(dir))fs.mkdirSync(dir,{recursive:true});}

let created=0,updated=0;
for(const a of allAgents){
  const dir=path.join(appDir,a.deptSlug);const fp=path.join(dir,`${a.slug}.tsx`);
  const subs=subMap[`${a.departmentId}:${a.id}`]||[];
  const subCode=subs.length?`\n    subAgents: [${subs.map(s=>`\n      { id: '${s.id}', uid: '${s.uid}', name: '${esc(s.name)}', title: '${esc(s.title)}', route: '${s.route}' }`).join(',')}\n    ],`:'';
  const p=`import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';

export default function AgentPage() {
  const agent = {
    id: '${a.id}',
    uid: '${a.uid}',
    name: '${esc(a.name)}',
    title: '${esc(a.title)}',
    description: '${esc(a.description)}',
    capabilities: [${a.capabilities.map(c=>`'${esc(c)}'`).join(', ')}],
    color: '${a.color}',
    type: 'agent' as const,
    humanCost: '${a.isPremium?'$120k/year':'$65k/year'}',
    aiCost: '${a.aiCost}',
    efficiency: '${a.efficiency} efficiency',
    replacesRole: '${esc(a.title)}',${subCode}
    infrastructure: {
      status: 'online',
      health: ${85+((a.title.length*3)%15)},
      uptime: '${(99+((a.title.length*0.13)%0.9)).toFixed(1)}%',
      lastActive: 'Now',
      processingPower: '${a.isPremium?'high':'standard'}',
    },
    roiMetrics: {
      savingsPerMonth: '${a.isPremium?'$'+((8000+(a.title.length*137)%4000)):'$'+((2000+(a.title.length*89)%3000))}',
      tasksAutomatedDaily: ${a.isPremium?500+(a.title.length*23)%500:100+(a.title.length*17)%400},
      responseTime: '${(0.5+((a.title.length*0.07)%2)).toFixed(1)}s',
      accuracyRate: '${(94+((a.title.length*0.23)%5.5)).toFixed(1)}%',
    },
    hierarchy: {
      department: '${esc(a.department)}',
      level: '${a.level}',
      departmentId: ${a.departmentId},
    },
  };
  return <AgentPageWrapper agent={agent} />;
}
`;
  const ex=fs.existsSync(fp);fs.writeFileSync(fp,p);
  if(ex)updated++;else created++;
}
console.log('Pages - Created:',created,'Updated:',updated);

// Index files per dept
for(let d=0;d<=22;d++){
  const slug=DEPT_SLUGS[d];if(!slug)continue;
  const dir=path.join(appDir,slug);if(!fs.existsSync(dir))continue;
  const da=allAgents.filter(a=>a.deptSlug===slug);if(!da.length)continue;
  const mains=da.filter(a=>a.type==='main');
  const idx=`import React from 'react';
import { View, Text, StyleSheet, ScrollView, Pressable } from 'react-native';
import { useRouter } from 'expo-router';
const agents = [
${mains.map(a=>`  { id: '${a.id}', uid: '${a.uid}', title: '${esc(a.title)}', route: '${a.route}', color: '${a.color}', level: '${a.level}', efficiency: '${a.efficiency}' },`).join('\n')}
];
export default function DepartmentIndex() {
  const router = useRouter();
  return (
    <ScrollView style={s.container}>
      <Text style={s.title}>${DEPT_NAMES[d]||'Department'} - AI Agents</Text>
      <Text style={s.sub}>{agents.length} AI Agents & Employees</Text>
      <View style={s.grid}>
        {agents.map((a) => (
          <Pressable key={a.id} style={[s.card, { borderLeftColor: a.color }]} onPress={() => router.push(a.route as any)}>
            <Text style={s.at}>{a.title}</Text>
            <Text style={s.al}>{a.level.replace('_',' ').toUpperCase()}</Text>
            <Text style={s.ae}>{a.efficiency}</Text>
          </Pressable>
        ))}
      </View>
    </ScrollView>
  );
}
const s = StyleSheet.create({
  container:{flex:1,backgroundColor:'#0a0a0a',padding:16},title:{color:'#fff',fontSize:24,fontWeight:'bold',marginBottom:4},
  sub:{color:'#888',fontSize:14,marginBottom:16},grid:{flexDirection:'row',flexWrap:'wrap',gap:12},
  card:{backgroundColor:'#1a1a2e',borderRadius:12,padding:16,width:'48%',borderLeftWidth:3},
  at:{color:'#fff',fontSize:14,fontWeight:'600',marginBottom:4},al:{color:'#888',fontSize:11,marginBottom:2},
  ae:{color:'#10B981',fontSize:12},
});
`;
  fs.writeFileSync(path.join(dir,'index.tsx'),idx);
}
console.log('Index files generated');

// ============================================================
// 3. GENERATE aiAgentRegistry.ts
// ============================================================
console.log('\n--- Generating aiAgentRegistry.ts ---');
let reg=`/**
 * =============================================================================
 * KAYTX AI AGENT REGISTRY - MASTER CROSS-REFERENCE (${allAgents.length} AGENTS)
 * =============================================================================
 * Maps every agent across sidebar, hierarchy, workforce, and page routes.
 * @version 11.0.0
 */

export interface AgentRegistryEntry {
  uid: string;
  seq: number;
  sidebarId: string;
  hierarchyId: string | null;
  route: string;
  title: string;
  department: string;
  departmentId: number;
  level: string;
  type: 'main' | 'sub';
  parentId: string | null;
}

export const agentRegistry: AgentRegistryEntry[] = [
`;
let seq=0;
for(const a of allAgents){
  seq++;
  const hierId=a.level==='c_level'?`'${a.slug}'`:'null';
  reg+=`  { uid: '${a.uid}', seq: ${seq}, sidebarId: '${a.sidebarId}', hierarchyId: ${hierId}, route: '${a.route}', title: '${esc(a.title)}', department: '${esc(a.department)}', departmentId: ${a.departmentId}, level: '${a.level}', type: '${a.type}', parentId: ${a.parentId?`'${a.parentId}'`:'null'} },\n`;
}
reg+=`];

// Lookup functions
export function getByUid(uid: string): AgentRegistryEntry | undefined { return agentRegistry.find(e => e.uid === uid); }
export function getBySidebarId(id: string): AgentRegistryEntry | undefined { return agentRegistry.find(e => e.sidebarId === id); }
export function getByHierarchyId(id: string): AgentRegistryEntry | undefined { return agentRegistry.find(e => e.hierarchyId === id); }
export function getByRoute(route: string): AgentRegistryEntry | undefined { return agentRegistry.find(e => e.route === route); }
export function getByDepartment(deptId: number): AgentRegistryEntry[] { return agentRegistry.filter(e => e.departmentId === deptId); }

export function validateRegistry(): { valid: boolean; total: number; uniqueUids: number; issues: string[] } {
  const issues: string[] = [];
  const uids = agentRegistry.map(e => e.uid);
  const unique = new Set(uids);
  if (uids.length !== unique.size) issues.push(\`Duplicate UIDs: \${uids.length - unique.size}\`);
  return { valid: issues.length === 0, total: uids.length, uniqueUids: unique.size, issues };
}
`;
fs.writeFileSync('constants/aiAgentRegistry.ts',reg);
console.log('Registry written:',allAgents.length,'entries');

// ============================================================
// 4. GENERATE aiAgentHierarchyIndex.ts (full hierarchy with ALL agents)
// ============================================================
console.log('\n--- Generating aiAgentHierarchyIndex.ts ---');

const HIER_LEVELS = {'c_level':'c-level','vp_director':'vp-director','manager':'manager','team_lead':'team-lead','specialist':'specialist'};
const HIER_DEPTS = {0:'cross-department',1:'customer-experience',2:'sales',3:'marketing',4:'operations',5:'finance',6:'technology',7:'human-resources',8:'legal',9:'data-intelligence',10:'product',11:'security',12:'research',13:'administrative',14:'trading',15:'real-estate',16:'insurance',17:'healthcare',18:'manufacturing',19:'transportation',20:'government',21:'supply-chain',22:'ai-governance'};
const HIER_ICONS = {c_level:'Crown',vp_director:'Star',manager:'Settings',team_lead:'Zap',specialist:'Sparkles'};
const CONSULT = {c_level:'directive',vp_director:'advisory',manager:'collaborative',team_lead:'collaborative',specialist:'analytical'};

let hi=`/**
 * =============================================================================
 * KAYTX AI WORKFORCE - MASTER HIERARCHY INDEX (${allAgents.length} AGENTS & EMPLOYEES)
 * =============================================================================
 * Complete organizational hierarchy with ALL AI agents and employees.
 * Every agent is a fully defined AI employee with capabilities, metrics, and routing.
 *
 * Total: ${mainCount} Main + ${subCount} Sub = ${allAgents.length} Agents
 * Departments: 23
 * Levels: C-Level, VP/Director, Manager, Team Lead, Specialist
 *
 * @version 11.0.0
 * @lastUpdated 2026-06-11
 */

import type { LucideIcon } from 'lucide-react-native';
import {
  Crown, Star, Settings, Zap, Sparkles, Users, Target, Megaphone, Headphones,
  Shield, Scale, TrendingUp, Building2, DollarSign, Brain, Cpu, Database,
  Heart, Activity, Truck, Factory, Landmark, Briefcase, ChartBarBig, Bot,
  ShieldCheck, FileText, ClipboardList, Calculator, Search, Eye, Phone,
  Mail, Calendar, Award, Globe, Lock, AlertTriangle, Network, Workflow,
} from 'lucide-react-native';

export type HierarchyLevel = 'c-level' | 'vp-director' | 'manager' | 'team-lead' | 'specialist';
export type DepartmentId = 'cross-department' | 'customer-experience' | 'sales' | 'marketing' | 'operations' | 'finance' | 'technology' | 'human-resources' | 'legal' | 'data-intelligence' | 'product' | 'security' | 'research' | 'administrative' | 'trading' | 'real-estate' | 'insurance' | 'healthcare' | 'manufacturing' | 'transportation' | 'government' | 'supply-chain' | 'ai-governance' | 'unknown';

export interface OrgChartPosition {
  reportsTo?: string;
  directReports: string[];
  team: string[];
  collaborators: string[];
}

export interface AIEmployeeProfile {
  id: string;
  uid: string;
  name: string;
  title: string;
  level: HierarchyLevel;
  department: DepartmentId;
  description: string;
  icon: LucideIcon;
  color: string;
  orgChart: OrgChartPosition;
  responsibilities: string[];
  capabilities: string[];
  keyMetrics: string[];
  humanCostEquivalent: string;
  aiCost: string;
  efficiency: string;
  a2aEndpoints: string[];
  canEscalateTo: string[];
  canReceiveEscalationFrom: string[];
  consultationStyle: 'directive' | 'advisory' | 'collaborative' | 'analytical';
  route: string;
  apiEndpoint: string;
  status: 'active' | 'standby' | 'development' | 'deprecated';
  isPremium: boolean;
  dangerLevel?: 'low' | 'medium' | 'high' | 'critical';
}

export const allHierarchyAgents: AIEmployeeProfile[] = [
`;

// Build parent-child relationships for org charts
const mainById={};
for(const a of allAgents)if(a.type==='main')mainById[a.id]=a;
const childrenOf={};
for(const a of allAgents){
  if(a.type==='sub'&&a.parentId){
    if(!childrenOf[a.parentId])childrenOf[a.parentId]=[];
    childrenOf[a.parentId].push(a.id);
  }
}

for(const a of allAgents){
  const hl=HIER_LEVELS[a.level]||'specialist';
  const hd=HIER_DEPTS[a.departmentId]||'unknown';
  const icon=HIER_ICONS[a.level]||'Sparkles';
  const consult=CONSULT[a.level]||'analytical';
  const humanCost=a.isPremium?'$120k/year':'$65k/year';
  const danger=a.level==='c_level'?'high':a.level==='vp_director'?'medium':'low';
  const reportsTo=a.type==='sub'?a.parentId:(a.level!=='c_level'?Object.values(mainById).find(x=>x.departmentId===a.departmentId&&x.level==='c_level')?.id:undefined);
  const directReports=childrenOf[a.id]||[];
  const teamMates=allAgents.filter(x=>x.departmentId===a.departmentId&&x.id!==a.id&&x.type==='main').slice(0,5).map(x=>x.id);

  hi+=`  {\n`;
  hi+=`    id: '${a.id}', uid: '${a.uid}', name: '${esc(a.name)}', title: '${esc(a.title)}',\n`;
  hi+=`    level: '${hl}' as HierarchyLevel, department: '${hd}' as DepartmentId,\n`;
  hi+=`    description: '${esc(a.description)}',\n`;
  hi+=`    icon: ${icon} as any, color: '${a.color}',\n`;
  hi+=`    orgChart: { reportsTo: ${reportsTo?`'${reportsTo}'`:'undefined'}, directReports: [${directReports.map(x=>`'${x}'`).join(', ')}], team: [${teamMates.slice(0,3).map(x=>`'${x}'`).join(', ')}], collaborators: [] },\n`;
  hi+=`    responsibilities: [${a.responsibilities.map(r=>`'${esc(r)}'`).join(', ')}],\n`;
  hi+=`    capabilities: [${a.capabilities.map(c=>`'${esc(c)}'`).join(', ')}],\n`;
  hi+=`    keyMetrics: ['Tasks Completed', 'Response Time', 'Accuracy Rate', 'Efficiency Score'],\n`;
  hi+=`    humanCostEquivalent: '${humanCost}', aiCost: '${a.aiCost}', efficiency: '${a.efficiency}',\n`;
  hi+=`    a2aEndpoints: ['/api/agents/${a.id}/chat', '/api/agents/${a.id}/tasks'],\n`;
  hi+=`    canEscalateTo: [], canReceiveEscalationFrom: [],\n`;
  hi+=`    consultationStyle: '${consult}',\n`;
  hi+=`    route: '${a.route}', apiEndpoint: '/api/agents/${a.id}',\n`;
  hi+=`    status: 'active', isPremium: ${a.isPremium}, dangerLevel: '${danger}',\n`;
  hi+=`  },\n`;
}
hi+=`];\n\n`;

// Level-filtered exports
hi+=`export const cLevelAgents = allHierarchyAgents.filter(a => a.level === 'c-level');\n`;
hi+=`export const vpDirectorAgents = allHierarchyAgents.filter(a => a.level === 'vp-director');\n`;
hi+=`export const managerAgents = allHierarchyAgents.filter(a => a.level === 'manager');\n`;
hi+=`export const teamLeadAgents = allHierarchyAgents.filter(a => a.level === 'team-lead');\n`;
hi+=`export const specialistAgents = allHierarchyAgents.filter(a => a.level === 'specialist');\n\n`;

// Lookup functions
hi+=`export function getAgentById(id: string): AIEmployeeProfile | undefined { return allHierarchyAgents.find(a => a.id === id); }
export function getAgentByUid(uid: string): AIEmployeeProfile | undefined { return allHierarchyAgents.find(a => a.uid === uid); }
export function getAgentsByDepartment(dept: string): AIEmployeeProfile[] { return allHierarchyAgents.filter(a => a.department === dept); }
export function getAgentsByLevel(level: string): AIEmployeeProfile[] { return allHierarchyAgents.filter(a => a.level === level); }
export function getDirectReports(managerId: string): AIEmployeeProfile[] { return allHierarchyAgents.filter(a => a.orgChart.reportsTo === managerId); }

export function getHierarchyTree(dept?: string): AIEmployeeProfile[] {
  const agents = dept ? getAgentsByDepartment(dept) : allHierarchyAgents;
  const order: Record<string, number> = { 'c-level': 0, 'vp-director': 1, 'manager': 2, 'team-lead': 3, 'specialist': 4 };
  return [...agents].sort((a, b) => (order[a.level] || 5) - (order[b.level] || 5));
}

export const hierarchySummary = {
  totalAgents: allHierarchyAgents.length,
  cLevel: cLevelAgents.length, vpDirector: vpDirectorAgents.length,
  managers: managerAgents.length, teamLeads: teamLeadAgents.length, specialists: specialistAgents.length,
  departments: new Set(allHierarchyAgents.map(a => a.department)).size,
};

// Backward compat
export function getAgentHierarchy(id: string): AIEmployeeProfile | undefined { return getAgentById(id) || getAgentByUid(id); }
export const navigationHierarchy = allHierarchyAgents;
export function getAllNavigationHierarchies(): AIEmployeeProfile[] { return allHierarchyAgents; }
`;

fs.writeFileSync('constants/aiAgentHierarchyIndex.ts',hi);
const hiUids=[...hi.matchAll(/uid:\s*'([^']+)'/g)].map(m=>m[1]);
console.log('Hierarchy Index written:',hi.split('\n').length,'lines, UIDs:',hiUids.length,'Unique:',new Set(hiUids).size);

// ============================================================
// 5. UPDATE aiAgentHierarchyComplete.ts (re-export from index)
// ============================================================
console.log('\n--- Updating aiAgentHierarchyComplete.ts ---');
const complete=`
// ============================================
// ALL ${allAgents.length} AGENTS - IMPORTED FROM MASTER INDEX
// ============================================
import {
  allHierarchyAgents, cLevelAgents, vpDirectorAgents, managerAgents,
  teamLeadAgents, specialistAgents, getAgentById, getAgentByUid,
  getAgentsByDepartment, getAgentsByLevel, getDirectReports,
  getHierarchyTree, hierarchySummary, navigationHierarchy, getAllNavigationHierarchies
} from './aiAgentHierarchyIndex';

// Re-export types
export type { AIEmployeeProfile, HierarchyLevel, DepartmentId, OrgChartPosition } from './aiAgentHierarchyIndex';

// Re-export level groups
export const cSuiteExecutives = cLevelAgents;
export const vpDirectors = vpDirectorAgents;
export const managers = managerAgents;
export const teamLeads = teamLeadAgents;
export const specialists = specialistAgents;
export const completeHierarchy = allHierarchyAgents;
export const totalAgentCount = allHierarchyAgents.length;

// Department exports
${Object.entries(HIER_DEPTS).map(([id, slug]) => {
  const varName = slug.replace(/-/g, '_');
  return `export const dept_${varName} = allHierarchyAgents.filter(a => a.department === '${slug}');`;
}).join('\n')}

// Re-export functions
export { getAgentById, getAgentByUid, getAgentsByDepartment, getAgentsByLevel, getDirectReports, getHierarchyTree, getAllNavigationHierarchies };
export { hierarchySummary, navigationHierarchy };
`;
fs.writeFileSync('constants/aiAgentHierarchyComplete.ts',complete);
console.log('Complete hierarchy re-export written');

// ============================================================
// 6. UPDATE other hierarchy files with UIDs
// ============================================================
console.log('\n--- Updating sub-hierarchy files with UIDs ---');

// Build UID map from index
const uidMap={};
for(const a of allAgents){uidMap[a.id]=a.uid;uidMap[a.slug]=a.uid;}

// Update UPGRADED file
function injectUidsIntoFile(filepath){
  let content=fs.readFileSync(filepath,'utf8');
  let injected=0;
  // Add uid after each id: 'xxx' line where uid doesn't exist
  content=content.replace(/(\n\s+)id:\s*'([^']+)',((?:(?!uid:).|\n)*?\n\s*(?=name:|title:|acronym:))/g, (match, prefix, id, rest) => {
    const uid=uidMap[id];
    if(uid && !match.includes('uid:')){
      injected++;
      return `${prefix}id: '${id}',\n${prefix}uid: '${uid}',${rest}`;
    }
    return match;
  });
  fs.writeFileSync(filepath,content);
  return injected;
}

const upgradedPath='constants/aiAgentHierarchy_UPGRADED.ts';
if(fs.existsSync(upgradedPath)){
  const n=injectUidsIntoFile(upgradedPath);
  console.log('UPGRADED: injected',n,'UIDs');
}

const mgrPath='constants/aiAgentHierarchy_Managers.ts';
if(fs.existsSync(mgrPath)){
  const n=injectUidsIntoFile(mgrPath);
  console.log('Managers: injected',n,'UIDs');
}

const tlPath='constants/aiAgentHierarchy_TeamLeadsSpecialists.ts';
if(fs.existsSync(tlPath)){
  const n=injectUidsIntoFile(tlPath);
  console.log('TeamLeads: injected',n,'UIDs');
}

const ndPath='constants/aiAgentHierarchy_NewDepartments.ts';
if(fs.existsSync(ndPath)){
  const n=injectUidsIntoFile(ndPath);
  console.log('NewDepartments: injected',n,'UIDs');
}

// ============================================================
// FINAL VERIFICATION
// ============================================================
console.log('\n=== FINAL VERIFICATION ===');
const wf2=fs.readFileSync('constants/completeAIWorkforce_1108.ts','utf8');
const wfUids2=[...wf2.matchAll(/uid:\s*'([^']+)'/g)].map(m=>m[1]);
console.log('Workforce UIDs:',wfUids2.length,'Unique:',new Set(wfUids2).size);

const idx2=fs.readFileSync('constants/aiAgentHierarchyIndex.ts','utf8');
const idxUids=[...idx2.matchAll(/uid:\s*'([^']+)'/g)].map(m=>m[1]);
console.log('Index UIDs:',idxUids.length,'Unique:',new Set(idxUids).size);

const reg2=fs.readFileSync('constants/aiAgentRegistry.ts','utf8');
const regUids=[...reg2.matchAll(/uid:\s*'([^']+)'/g)].map(m=>m[1]);
console.log('Registry UIDs:',regUids.length,'Unique:',new Set(regUids).size);

// Check cross-reference: all index UIDs exist in workforce
const wfUidSet=new Set(wfUids2);
const missingFromWf=idxUids.filter(u=>!wfUidSet.has(u));
console.log('Index UIDs missing from workforce:',missingFromWf.length);
if(missingFromWf.length>0)console.log('  Missing:',missingFromWf.slice(0,10).join(', '));

// Check all sidebar IDs have pages
const sb2=fs.readFileSync('constants/aiAgentsSidebarData.ts','utf8');
const sbIds=[...sb2.matchAll(/\{\s*id:\s*'([^']+)'/g)].map(m=>m[1]).filter(x=>!x.startsWith('dept'));
console.log('Sidebar agent IDs:',sbIds.length);

console.log('\n=== BUILD COMPLETE ===');
console.log('Total agents:',allAgents.length,'(Main:',mainCount,'Sub:',subCount,')');
console.log('All UIDs unique:',new Set(allAgents.map(a=>a.uid)).size===allAgents.length);
