const fs = require('fs');
const path = require('path');
const BASE = path.join(__dirname, '..', 'app', 'ai-agent', 'healthcare', 'sub-agents');
const C = '#EF4444';

const subAgents = [
  {id:'clinical-strategy-advisor',name:'AI Clinical Strategy Advisor',parentName:'AI Chief Medical Officer',parentId:'chief-medical-officer',icon:'Heart',desc:'Strategic clinical planning and evidence-based medicine advisory for organizational clinical direction',caps:['Clinical Strategy','Evidence-Based Medicine','AI-Powered','Real-time','Analytics','Integration','Automation'],eps:['/consult/clinical-strategy-advisor','/clinical-strategy-advisor/execute','/clinical-strategy-advisor/analyze']},
  {id:'quality-standards-enforcer',name:'AI Quality Standards Enforcer',parentName:'AI Chief Medical Officer',parentId:'chief-medical-officer',icon:'ShieldCheck',desc:'Enforces clinical quality standards and compliance protocols across all medical departments',caps:['Quality Standards','Compliance Enforcement','AI-Powered','Real-time','Analytics','Automation'],eps:['/consult/quality-standards-enforcer','/quality-standards-enforcer/execute','/quality-standards-enforcer/audit']},
  {id:'medical-policy-reviewer',name:'AI Medical Policy Reviewer',parentName:'AI Chief Medical Officer',parentId:'chief-medical-officer',icon:'FileText',desc:'Reviews, develops, and implements medical policies ensuring regulatory alignment and clinical best practices',caps:['Policy Review','Regulatory Alignment','AI-Powered','Real-time','Analytics','Automation'],eps:['/consult/medical-policy-reviewer','/medical-policy-reviewer/execute','/medical-policy-reviewer/analyze']},
  {id:'workflow-optimizer',name:'AI Workflow Optimizer',parentName:'AI VP Healthcare Operations',parentId:'vp-healthcare-operations',icon:'Zap',desc:'Optimizes clinical and administrative workflows for maximum operational efficiency and patient throughput',caps:['Workflow Optimization','Process Improvement','AI-Powered','Real-time','Analytics','Automation'],eps:['/consult/workflow-optimizer','/workflow-optimizer/execute','/workflow-optimizer/analyze']},
  {id:'staff-scheduler',name:'AI Staff Scheduler',parentName:'AI VP Healthcare Operations',parentId:'vp-healthcare-operations',icon:'Calendar',desc:'Manages staff scheduling, shift optimization, and resource allocation across clinical departments',caps:['Staff Scheduling','Shift Optimization','AI-Powered','Real-time','Analytics','Automation'],eps:['/consult/staff-scheduler','/staff-scheduler/execute','/staff-scheduler/optimize']},
  {id:'regulatory-compliance-monitor',name:'AI Regulatory Compliance Monitor',parentName:'AI VP Healthcare Operations',parentId:'vp-healthcare-operations',icon:'ShieldCheck',desc:'Monitors regulatory compliance status and ensures audit readiness across healthcare operations',caps:['Regulatory Monitoring','Compliance Tracking','AI-Powered','Real-time','Analytics','Automation'],eps:['/consult/regulatory-compliance-monitor','/regulatory-compliance-monitor/execute','/regulatory-compliance-monitor/check']},
  {id:'satisfaction-analyzer',name:'AI Satisfaction Analyzer',parentName:'AI VP Patient Experience',parentId:'vp-patient-experience',icon:'Star',desc:'Analyzes patient satisfaction data and identifies trends for service quality improvement',caps:['Satisfaction Analysis','Trend Detection','AI-Powered','Real-time','Analytics','Automation'],eps:['/consult/satisfaction-analyzer','/satisfaction-analyzer/execute','/satisfaction-analyzer/analyze']},
  {id:'service-improvement-planner',name:'AI Service Improvement Planner',parentName:'AI VP Patient Experience',parentId:'vp-patient-experience',icon:'TrendingUp',desc:'Plans and implements service quality improvement initiatives based on patient feedback and analytics',caps:['Service Improvement','Quality Planning','AI-Powered','Real-time','Analytics','Automation'],eps:['/consult/service-improvement-planner','/service-improvement-planner/execute','/service-improvement-planner/plan']},
  {id:'feedback-coordinator',name:'AI Feedback Coordinator',parentName:'AI VP Patient Experience',parentId:'vp-patient-experience',icon:'MessageSquare',desc:'Coordinates patient feedback collection, analysis, and action planning across departments',caps:['Feedback Coordination','Action Planning','AI-Powered','Real-time','Analytics','Automation'],eps:['/consult/feedback-coordinator','/feedback-coordinator/execute','/feedback-coordinator/collect']},
  {id:'intake-coordinator',name:'AI Intake Coordinator',parentName:'AI Patient Services Manager',parentId:'patient-services-manager',icon:'ClipboardList',desc:'Coordinates patient intake, registration, and onboarding processes for seamless entry into care',caps:['Patient Intake','Registration','AI-Powered','Real-time','Analytics','Automation'],eps:['/consult/intake-coordinator','/intake-coordinator/execute','/intake-coordinator/process']},
  {id:'service-navigator',name:'AI Service Navigator',parentName:'AI Patient Services Manager',parentId:'patient-services-manager',icon:'Compass',desc:'Navigates patients through care pathways and service options for optimal care experience',caps:['Service Navigation','Care Pathways','AI-Powered','Real-time','Analytics','Automation'],eps:['/consult/service-navigator','/service-navigator/execute','/service-navigator/navigate']},
  {id:'discharge-planner',name:'AI Discharge Planner',parentName:'AI Patient Services Manager',parentId:'patient-services-manager',icon:'LogOut',desc:'Plans and coordinates patient discharge and post-care transitions for continuity of care',caps:['Discharge Planning','Care Transitions','AI-Powered','Real-time','Analytics','Automation'],eps:['/consult/discharge-planner','/discharge-planner/execute','/discharge-planner/plan']},
  {id:'claims-optimizer',name:'AI Claims Optimizer',parentName:'AI Medical Billing Manager',parentId:'medical-billing-manager',icon:'Zap',desc:'Optimizes claims submission for maximum reimbursement and accuracy across all payer types',caps:['Claims Optimization','Reimbursement','AI-Powered','Real-time','Analytics','Automation'],eps:['/consult/claims-optimizer','/claims-optimizer/execute','/claims-optimizer/optimize']},
  {id:'denial-manager',name:'AI Denial Manager',parentName:'AI Medical Billing Manager',parentId:'medical-billing-manager',icon:'ShieldAlert',desc:'Manages claim denials, root cause analysis, and appeals for revenue recovery',caps:['Denial Management','Root Cause Analysis','AI-Powered','Real-time','Analytics','Automation'],eps:['/consult/denial-manager','/denial-manager/execute','/denial-manager/analyze']},
  {id:'revenue-cycle-analyst',name:'AI Revenue Cycle Analyst',parentName:'AI Medical Billing Manager',parentId:'medical-billing-manager',icon:'TrendingUp',desc:'Analyzes revenue cycle performance and identifies optimization opportunities for financial improvement',caps:['Revenue Cycle Analysis','Financial Optimization','AI-Powered','Real-time','Analytics','Automation'],eps:['/consult/revenue-cycle-analyst','/revenue-cycle-analyst/execute','/revenue-cycle-analyst/analyze']},
  {id:'appointment-optimizer',name:'AI Appointment Optimizer',parentName:'AI Scheduling Manager',parentId:'scheduling-manager',icon:'Zap',desc:'Optimizes appointment scheduling for efficiency, patient satisfaction, and provider utilization',caps:['Appointment Optimization','Scheduling AI','AI-Powered','Real-time','Analytics','Automation'],eps:['/consult/appointment-optimizer','/appointment-optimizer/execute','/appointment-optimizer/optimize']},
  {id:'no-show-predictor',name:'AI No-Show Predictor',parentName:'AI Scheduling Manager',parentId:'scheduling-manager',icon:'Target',desc:'Predicts no-show risk using ML models and triggers proactive mitigation strategies',caps:['No-Show Prediction','ML Models','AI-Powered','Real-time','Analytics','Automation'],eps:['/consult/no-show-predictor','/no-show-predictor/execute','/no-show-predictor/predict']},
  {id:'provider-calendar-manager',name:'AI Provider Calendar Manager',parentName:'AI Scheduling Manager',parentId:'scheduling-manager',icon:'Calendar',desc:'Manages provider schedules, availability, and utilization for optimal resource allocation',caps:['Calendar Management','Provider Scheduling','AI-Powered','Real-time','Analytics','Automation'],eps:['/consult/provider-calendar-manager','/provider-calendar-manager/execute','/provider-calendar-manager/manage']},
  {id:'referral-processor',name:'AI Referral Processor',parentName:'AI Patient Coordinator',parentId:'patient-coordinator',icon:'ArrowRight',desc:'Processes and tracks referrals between providers and specialists for timely care delivery',caps:['Referral Processing','Provider Tracking','AI-Powered','Real-time','Analytics','Automation'],eps:['/consult/referral-processor','/referral-processor/execute','/referral-processor/process']},
  {id:'pre-authorization-agent',name:'AI Pre-Authorization Agent',parentName:'AI Patient Coordinator',parentId:'patient-coordinator',icon:'ShieldCheck',desc:'Manages insurance pre-authorizations and approval tracking for procedure coverage',caps:['Pre-Authorization','Insurance Tracking','AI-Powered','Real-time','Analytics','Automation'],eps:['/consult/pre-authorization-agent','/pre-authorization-agent/execute','/pre-authorization-agent/authorize']},
  {id:'care-transition-coordinator',name:'AI Care Transition Coordinator',parentName:'AI Patient Coordinator',parentId:'patient-coordinator',icon:'GitMerge',desc:'Coordinates care transitions across settings and providers for continuity of care',caps:['Care Transitions','Continuity Coordination','AI-Powered','Real-time','Analytics','Automation'],eps:['/consult/care-transition-coordinator','/care-transition-coordinator/execute','/care-transition-coordinator/coordinate']},
  {id:'code-assigner',name:'AI Code Assigner',parentName:'AI Medical Coder',parentId:'medical-coder',icon:'Code',desc:'Assigns accurate ICD-10, CPT, and HCPCS codes to clinical encounters with AI precision',caps:['Code Assignment','ICD-10/CPT','AI-Powered','Real-time','Analytics','Automation'],eps:['/consult/code-assigner','/code-assigner/execute','/code-assigner/assign']},
  {id:'coding-compliance-auditor',name:'AI Coding Compliance Auditor',parentName:'AI Medical Coder',parentId:'medical-coder',icon:'ShieldCheck',desc:'Audits coding compliance and identifies regulatory adherence issues for corrective action',caps:['Compliance Auditing','Coding Standards','AI-Powered','Real-time','Analytics','Automation'],eps:['/consult/coding-compliance-auditor','/coding-compliance-auditor/execute','/coding-compliance-auditor/audit']},
  {id:'coding-update-tracker',name:'AI Coding Update Tracker',parentName:'AI Medical Coder',parentId:'medical-coder',icon:'RefreshCw',desc:'Tracks coding regulatory updates and implements changes across coding operations',caps:['Update Tracking','Regulatory Changes','AI-Powered','Real-time','Analytics','Automation'],eps:['/consult/coding-update-tracker','/coding-update-tracker/execute','/coding-update-tracker/track']},
  {id:'charge-capture-agent',name:'AI Charge Capture Agent',parentName:'AI Billing Specialist',parentId:'billing-specialist',icon:'ClipboardList',desc:'Captures and verifies charges from clinical encounters for accurate billing submission',caps:['Charge Capture','Verification','AI-Powered','Real-time','Analytics','Automation'],eps:['/consult/charge-capture-agent','/charge-capture-agent/execute','/charge-capture-agent/capture']},
  {id:'payment-poster',name:'AI Payment Poster',parentName:'AI Billing Specialist',parentId:'billing-specialist',icon:'DollarSign',desc:'Posts payments and manages financial reconciliation for accurate revenue tracking',caps:['Payment Posting','Reconciliation','AI-Powered','Real-time','Analytics','Automation'],eps:['/consult/payment-poster','/payment-poster/execute','/payment-poster/post']},
  {id:'balance-collector',name:'AI Balance Collector',parentName:'AI Billing Specialist',parentId:'billing-specialist',icon:'TrendingUp',desc:'Manages balance collection strategies and past-due accounts for revenue recovery',caps:['Balance Collection','Revenue Recovery','AI-Powered','Real-time','Analytics','Automation'],eps:['/consult/balance-collector','/balance-collector/execute','/balance-collector/collect']},
  {id:'care-plan-manager',name:'AI Care Plan Manager',parentName:'AI Care Coordinator',parentId:'care-coordinator',icon:'ClipboardList',desc:'Develops and manages comprehensive patient care plans tailored to individual needs',caps:['Care Planning','Plan Management','AI-Powered','Real-time','Analytics','Automation'],eps:['/consult/care-plan-manager','/care-plan-manager/execute','/care-plan-manager/manage']},
  {id:'follow-up-scheduler',name:'AI Follow-up Scheduler',parentName:'AI Care Coordinator',parentId:'care-coordinator',icon:'Calendar',desc:'Schedules and monitors patient follow-up appointments for care continuity',caps:['Follow-up Scheduling','Appointment Tracking','AI-Powered','Real-time','Analytics','Automation'],eps:['/consult/follow-up-scheduler','/follow-up-scheduler/execute','/follow-up-scheduler/schedule']},
  {id:'outcome-tracker',name:'AI Outcome Tracker',parentName:'AI Care Coordinator',parentId:'care-coordinator',icon:'TrendingUp',desc:'Tracks clinical outcomes and quality metrics for performance improvement',caps:['Outcome Tracking','Quality Metrics','AI-Powered','Real-time','Analytics','Automation'],eps:['/consult/outcome-tracker','/outcome-tracker/execute','/outcome-tracker/track']},
  {id:'record-organizer',name:'AI Record Organizer',parentName:'AI Health Records Specialist',parentId:'health-records-specialist',icon:'FolderOpen',desc:'Organizes and maintains health record systems for efficient information retrieval',caps:['Record Organization','Filing Systems','AI-Powered','Real-time','Analytics','Automation'],eps:['/consult/record-organizer','/record-organizer/execute','/record-organizer/organize']},
  {id:'release-manager',name:'AI Release Manager',parentName:'AI Health Records Specialist',parentId:'health-records-specialist',icon:'FileText',desc:'Manages release of information and HIPAA compliance for health record access',caps:['Release Management','HIPAA Compliance','AI-Powered','Real-time','Analytics','Automation'],eps:['/consult/release-manager','/release-manager/execute','/release-manager/release']},
  {id:'data-integrity-checker',name:'AI Data Integrity Checker',parentName:'AI Health Records Specialist',parentId:'health-records-specialist',icon:'ShieldCheck',desc:'Checks and ensures data integrity across health information systems for accuracy',caps:['Data Integrity','Quality Checks','AI-Powered','Real-time','Analytics','Automation'],eps:['/consult/data-integrity-checker','/data-integrity-checker/execute','/data-integrity-checker/check']},
  {id:'virtual-visit-facilitator',name:'AI Virtual Visit Facilitator',parentName:'AI Telehealth Support',parentId:'telehealth-support',icon:'Video',desc:'Facilitates and manages virtual visit sessions end-to-end for seamless telehealth experiences',caps:['Virtual Visits','Session Management','AI-Powered','Real-time','Analytics','Automation'],eps:['/consult/virtual-visit-facilitator','/virtual-visit-facilitator/execute','/virtual-visit-facilitator/facilitate']},
  {id:'tech-troubleshooter',name:'AI Tech Troubleshooter',parentName:'AI Telehealth Support',parentId:'telehealth-support',icon:'Wrench',desc:'Troubleshoots technical issues for telehealth participants ensuring smooth virtual care delivery',caps:['Tech Support','Issue Resolution','AI-Powered','Real-time','Analytics','Automation'],eps:['/consult/tech-troubleshooter','/tech-troubleshooter/execute','/tech-troubleshooter/troubleshoot']},
  {id:'remote-monitor',name:'AI Remote Monitor',parentName:'AI Telehealth Support',parentId:'telehealth-support',icon:'Activity',desc:'Monitors remote patient data and manages clinical alerts for timely intervention',caps:['Remote Monitoring','Alert Management','AI-Powered','Real-time','Analytics','Automation'],eps:['/consult/remote-monitor','/remote-monitor/execute','/remote-monitor/monitor']},
  {id:'regulation-tracker',name:'AI Regulation Tracker',parentName:'AI Healthcare Compliance',parentId:'healthcare-compliance',icon:'Search',desc:'Tracks regulatory changes and updates across healthcare laws and standards',caps:['Regulation Tracking','Change Management','AI-Powered','Real-time','Analytics','Automation'],eps:['/consult/regulation-tracker','/regulation-tracker/execute','/regulation-tracker/track']},
  {id:'audit-preparer',name:'AI Audit Preparer',parentName:'AI Healthcare Compliance',parentId:'healthcare-compliance',icon:'FileText',desc:'Prepares documentation and readiness for regulatory audits and surveys',caps:['Audit Preparation','Documentation','AI-Powered','Real-time','Analytics','Automation'],eps:['/consult/audit-preparer','/audit-preparer/execute','/audit-preparer/prepare']},
  {id:'compliance-training-coordinator',name:'AI Compliance Training Coordinator',parentName:'AI Healthcare Compliance',parentId:'healthcare-compliance',icon:'GraduationCap',desc:'Coordinates compliance training programs and staff education for regulatory adherence',caps:['Training Coordination','Staff Education','AI-Powered','Real-time','Analytics','Automation'],eps:['/consult/compliance-training-coordinator','/compliance-training-coordinator/execute','/compliance-training-coordinator/train']},
  {id:'metric-analyzer',name:'AI Metric Analyzer',parentName:'AI Quality Improvement Specialist',parentId:'quality-improvement-specialist',icon:'BarChart3',desc:'Analyzes quality metrics and performance indicators for data-driven improvement',caps:['Metric Analysis','Performance Tracking','AI-Powered','Real-time','Analytics','Automation'],eps:['/consult/metric-analyzer','/metric-analyzer/execute','/metric-analyzer/analyze']},
  {id:'improvement-planner',name:'AI Improvement Planner',parentName:'AI Quality Improvement Specialist',parentId:'quality-improvement-specialist',icon:'Zap',desc:'Plans and implements quality improvement initiatives using evidence-based approaches',caps:['Improvement Planning','PDSA Cycles','AI-Powered','Real-time','Analytics','Automation'],eps:['/consult/improvement-planner','/improvement-planner/execute','/improvement-planner/plan']},
  {id:'benchmark-reporter',name:'AI Benchmark Reporter',parentName:'AI Quality Improvement Specialist',parentId:'quality-improvement-specialist',icon:'TrendingUp',desc:'Reports benchmark comparisons against industry standards for competitive positioning',caps:['Benchmark Reporting','Industry Comparison','AI-Powered','Real-time','Analytics','Automation'],eps:['/consult/benchmark-reporter','/benchmark-reporter/execute','/benchmark-reporter/report']}
];

function genSub(sa) {
  const icons = new Set([sa.icon, 'Activity','Briefcase','Heart','ArrowRight','Zap','Target','Clock']);
  return `import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useTheme } from '@/providers/ThemeProvider';
import { useRouter } from 'expo-router';
import {
  ${[...icons].join(', ')}
} from 'lucide-react-native';
import AgentFeatures from '@/components/ai-agent/AgentFeatures';

export default function ${sa.id.split('-').map(w=>w[0].toUpperCase()+w.slice(1)).join('')}Page() {
  const { theme } = useTheme();
  const router = useRouter();

  return (
    <ScrollView style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <View style={[styles.hero, { borderBottomColor: theme.colors.border || '#E5E5EA' }]}>
        <View style={[styles.heroIconWrap, { backgroundColor: '${C}20' }]}>
          <${sa.icon} size={56} color="${C}" />
        </View>
        <Text style={[styles.heroTitle, { color: theme.colors.text }]}>{${JSON.stringify(sa.name)}}</Text>
        <Text style={[styles.heroSubtitle, { color: theme.colors.textSecondary }]}>Sub-Agent of {${JSON.stringify(sa.parentName)}}</Text>
        <View style={styles.badgesRow}>
          <View style={[styles.badge, { backgroundColor: '#34C75922' }]}><Activity size={12} color="#34C759" /><Text style={[styles.badgeText, { color: '#34C759' }]}>Active</Text></View>
          <View style={[styles.badge, { backgroundColor: '${C}22' }]}><Briefcase size={12} color="${C}" /><Text style={[styles.badgeText, { color: '${C}' }]}>Specialist</Text></View>
        </View>
      </View>

      <View style={styles.statsContainer}>
        {[
          {label:'Status',value:'Active',icon: Activity, color: '#34C759'},
          {label:'Level',value:'Specialist',icon: Briefcase, color: '${C}'},
          {label:'Efficiency',value:'20x',icon: Target, color: '#FF9500'},
          {label:'Parent',value:'${sa.parentId}',icon: Heart, color: '#007AFF'}
        ].map((stat,index)=>(
          <View key={index} style={[styles.statCard, { backgroundColor: theme.colors.card || '#F2F2F7' }]}>
            <stat.icon size={22} color={stat.color} />
            <Text style={[styles.statValue, { color: theme.colors.text }]}>{stat.value}</Text>
            <Text style={[styles.statLabel, { color: theme.colors.textSecondary }]}>{stat.label}</Text>
          </View>
        ))}
      </View>

      <View style={[styles.section, { backgroundColor: theme.colors.card || '#F2F2F7' }]}>
        <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Overview</Text>
        <Text style={[styles.description, { color: theme.colors.textSecondary }]}>
          ${sa.name} - Sub-agent supporting ${sa.parentName}. ${sa.desc}
        </Text>
      </View>

      <View style={[styles.section, { backgroundColor: theme.colors.card || '#F2F2F7' }]}>
        <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Core Capabilities</Text>
        <View style={styles.tagsContainer}>
          {${JSON.stringify(sa.caps)}.map((cap,index)=>(
            <View key={index} style={[styles.tag, { backgroundColor: '${C}18' }]}>
              <Text style={[styles.tagText, { color: '${C}' }]}>{cap}</Text>
            </View>
          ))}
        </View>
      </View>

      <View style={[styles.section, { backgroundColor: theme.colors.card || '#F2F2F7' }]}>
        <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>A2A Endpoints</Text>
        {${JSON.stringify(sa.eps)}.map((endpoint,index)=>(
          <View key={index} style={styles.endpointRow}>
            <Zap size={14} color="#8B5CF6" />
            <Text style={[styles.endpointText, { color: theme.colors.textSecondary }]}>{endpoint}</Text>
          </View>
        ))}
      </View>

      <View style={[styles.section, { backgroundColor: theme.colors.card || '#F2F2F7' }]}>
        <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Parent Agent</Text>
        <TouchableOpacity onPress={() => router.push('/ai-agent/healthcare/${sa.parentId}')} style={[styles.parentCard, { backgroundColor: theme.colors.background || '#F2F2F7' }]}>
          <Heart size={24} color="${C}" />
          <View style={styles.parentInfo}>
            <Text style={[styles.parentName, { color: theme.colors.text }]}>{${JSON.stringify(sa.parentName)}}</Text>
            <Text style={[styles.parentDesc, { color: theme.colors.textSecondary }]}>Main Agent</Text>
          </View>
          <ArrowRight size={20} color={theme.colors.textSecondary} />
        </TouchableOpacity>
      </View>

      <AgentFeatures agentId="${sa.id}" agentName="${sa.name}" />
      <View style={{ height: 40 }} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  hero: { alignItems: 'center', paddingVertical: 36, paddingHorizontal: 20, borderBottomWidth: 1 },
  heroIconWrap: { width: 100, height: 100, borderRadius: 50, justifyContent: 'center', alignItems: 'center', marginBottom: 16 },
  heroTitle: { fontSize: 22, fontWeight: 'bold', textAlign: 'center' },
  heroSubtitle: { fontSize: 15, marginTop: 6, fontWeight: '500' },
  badgesRow: { flexDirection: 'row', gap: 10, marginTop: 16, flexWrap: 'wrap', justifyContent: 'center' },
  badge: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 12, paddingVertical: 6, borderRadius: 20, gap: 5 },
  badgeText: { fontSize: 12, fontWeight: '600' },
  statsContainer: { flexDirection: 'row', flexWrap: 'wrap', padding: 16, gap: 12 },
  statCard: { flex: 1, minWidth: '22%', alignItems: 'center', padding: 14, borderRadius: 12 },
  statValue: { fontSize: 14, fontWeight: 'bold', marginTop: 8 },
  statLabel: { fontSize: 11, marginTop: 4, textAlign: 'center' },
  section: { marginHorizontal: 16, marginBottom: 16, padding: 20, borderRadius: 16 },
  sectionTitle: { fontSize: 18, fontWeight: '700', marginBottom: 14 },
  description: { fontSize: 14, lineHeight: 22 },
  tagsContainer: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  tag: { paddingHorizontal: 12, paddingVertical: 6, borderRadius: 20 },
  tagText: { fontSize: 12, fontWeight: '600' },
  endpointRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 8, gap: 8 },
  endpointText: { fontSize: 13, fontFamily: 'monospace' },
  parentCard: { flexDirection: 'row', alignItems: 'center', padding: 16, borderRadius: 12, gap: 12 },
  parentInfo: { flex: 1 },
  parentName: { fontSize: 16, fontWeight: '600' },
  parentDesc: { fontSize: 12, marginTop: 2 },
});
`;
}

subAgents.forEach(sa => {
  const content = genSub(sa);
  fs.writeFileSync(path.join(BASE, sa.id + '.tsx'), content);
  console.log('Generated sub-agent:', sa.id);
});

console.log('Done generating', subAgents.length, 'sub-agent pages');
