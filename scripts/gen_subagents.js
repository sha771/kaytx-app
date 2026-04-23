const fs = require('fs');
const path = require('path');

function makeSubAgentPage(config) {
  const { id, name, title, description, color, icon, parentName, metricsConfig } = config;
  const tasks = JSON.stringify(metricsConfig.recentTasks, null, 4);
  const caps = JSON.stringify(metricsConfig.capabilities, null, 4);
  return `import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { Activity, BarChart3, CheckCircle, Zap, ChevronLeft } from 'lucide-react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { useColorScheme } from '@/hooks/useColorScheme';
import { Colors } from '@/constants/Colors';
import { LinearGradient } from 'expo-linear-gradient';

const ACCENT = '${color}';
const AGENT_NAME = '${name}';
const AGENT_TITLE = '${title}';
const AGENT_DESC = '${description}';
const PARENT_NAME = '${parentName}';

const METRICS = [
  { label: 'Tasks Today', value: '${metricsConfig.tasksToday}', color: ACCENT },
  { label: 'Success Rate', value: '${metricsConfig.successRate}', color: '#00C853' },
  { label: 'Avg Speed', value: '${metricsConfig.speed}', color: '#007AFF' },
  { label: 'Accuracy', value: '${metricsConfig.accuracy}', color: '#5856D6' },
];

const RECENT_TASKS = ${tasks};

const CAPABILITIES = ${caps};

const PERFORMANCE_BARS = [
  { label: 'Task Completion Rate', value: 96, color: '#00C853' },
  { label: 'Quality Score', value: 94, color: ACCENT },
  { label: 'Speed Efficiency', value: 98, color: '#007AFF' },
  { label: 'Learning Progress', value: 88, color: '#5856D6' },
];

export default function AgentScreen() {
  const router = useRouter();
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      <View style={[styles.header, { backgroundColor: colors.card, borderBottomColor: colors.border }]}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <ChevronLeft size={24} color={colors.text} />
        </TouchableOpacity>
        <View style={styles.headerCenter}>
          <Text style={[styles.headerTitle, { color: colors.text }]}>{AGENT_NAME}</Text>
          <Text style={[styles.headerSub, { color: colors.text + '70' }]}>{PARENT_NAME}</Text>
        </View>
        <View style={styles.headerRight} />
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <LinearGradient colors={[ACCENT, ACCENT + 'BB']} style={styles.hero}>
          <View style={styles.heroIcon}>
            <Activity size={32} color="#fff" />
          </View>
          <Text style={styles.heroTitle}>{AGENT_NAME}</Text>
          <Text style={styles.heroSub}>{AGENT_TITLE}</Text>
          <Text style={styles.heroDesc}>{AGENT_DESC}</Text>
          <View style={styles.statusRow}>
            <View style={styles.onlineDot} />
            <Text style={styles.statusText}>Online · Active</Text>
          </View>
        </LinearGradient>

        <View style={styles.metricsGrid}>
          {METRICS.map((m, i) => (
            <View key={i} style={[styles.metricCard, { backgroundColor: colors.card }]}>
              <Text style={[styles.metricValue, { color: m.color }]}>{m.value}</Text>
              <Text style={[styles.metricLabel, { color: colors.text + '70' }]}>{m.label}</Text>
            </View>
          ))}
        </View>

        <View style={[styles.section, { backgroundColor: colors.card }]}>
          <View style={styles.sectionHeader}>
            <Activity size={18} color={ACCENT} />
            <Text style={[styles.sectionTitle, { color: colors.text }]}>Live Activity</Text>
            <View style={styles.liveBadge}>
              <View style={styles.liveDot} />
              <Text style={styles.liveText}>LIVE</Text>
            </View>
          </View>
          {RECENT_TASKS.map((task, i) => (
            <View key={i} style={[styles.taskRow, { borderBottomColor: colors.border }]}>
              <CheckCircle size={16} color="#00C853" />
              <Text style={[styles.taskText, { color: colors.text }]}>{task.action}</Text>
              <Text style={[styles.taskTime, { color: colors.text + '60' }]}>{task.time}</Text>
            </View>
          ))}
        </View>

        <View style={[styles.section, { backgroundColor: colors.card }]}>
          <View style={styles.sectionHeader}>
            <Zap size={18} color={ACCENT} />
            <Text style={[styles.sectionTitle, { color: colors.text }]}>Capabilities</Text>
          </View>
          <View style={styles.capGrid}>
            {CAPABILITIES.map((cap, i) => (
              <View key={i} style={[styles.capChip, { backgroundColor: ACCENT + '18', borderColor: ACCENT + '40' }]}>
                <Text style={[styles.capText, { color: ACCENT }]}>{cap}</Text>
              </View>
            ))}
          </View>
        </View>

        <View style={[styles.section, { backgroundColor: colors.card }]}>
          <View style={styles.sectionHeader}>
            <BarChart3 size={18} color={ACCENT} />
            <Text style={[styles.sectionTitle, { color: colors.text }]}>Performance</Text>
          </View>
          {PERFORMANCE_BARS.map((bar, i) => (
            <View key={i} style={{ marginBottom: 14 }}>
              <View style={styles.barLabelRow}>
                <Text style={[styles.barLabel, { color: colors.text }]}>{bar.label}</Text>
                <Text style={[styles.barPct, { color: bar.color }]}>{bar.value}%</Text>
              </View>
              <View style={[styles.barBg, { backgroundColor: colors.border }]}>
                <View style={[styles.barFill, { width: bar.value + '%', backgroundColor: bar.color }]} />
              </View>
            </View>
          ))}
        </View>

        <View style={{ height: 60 }} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  header: { flexDirection: 'row', alignItems: 'center', padding: 16, borderBottomWidth: 1 },
  backButton: { padding: 8 },
  headerCenter: { flex: 1, alignItems: 'center' },
  headerTitle: { fontSize: 16, fontWeight: '700' },
  headerSub: { fontSize: 11, marginTop: 1 },
  headerRight: { width: 40 },
  content: { flex: 1 },
  hero: { margin: 16, borderRadius: 24, padding: 24, alignItems: 'center' },
  heroIcon: { width: 72, height: 72, borderRadius: 22, backgroundColor: 'rgba(255,255,255,0.2)', justifyContent: 'center', alignItems: 'center', marginBottom: 14 },
  heroTitle: { fontSize: 22, fontWeight: '800', color: '#fff', marginBottom: 4 },
  heroSub: { fontSize: 13, color: 'rgba(255,255,255,0.8)', marginBottom: 10 },
  heroDesc: { fontSize: 13, color: 'rgba(255,255,255,0.7)', textAlign: 'center', lineHeight: 18, marginBottom: 14 },
  statusRow: { flexDirection: 'row', alignItems: 'center', gap: 6, backgroundColor: 'rgba(255,255,255,0.15)', paddingHorizontal: 14, paddingVertical: 6, borderRadius: 20 },
  onlineDot: { width: 8, height: 8, borderRadius: 4, backgroundColor: '#00FF88' },
  statusText: { color: '#fff', fontSize: 12, fontWeight: '600' },
  metricsGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 10, paddingHorizontal: 16, marginBottom: 16 },
  metricCard: { flex: 1, minWidth: '45%', padding: 16, borderRadius: 16, alignItems: 'center' },
  metricValue: { fontSize: 22, fontWeight: '800', marginBottom: 4 },
  metricLabel: { fontSize: 11, textTransform: 'uppercase', textAlign: 'center' },
  section: { marginHorizontal: 16, marginBottom: 14, padding: 18, borderRadius: 20 },
  sectionHeader: { flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: 16 },
  sectionTitle: { flex: 1, fontSize: 16, fontWeight: '700' },
  liveBadge: { flexDirection: 'row', alignItems: 'center', gap: 4, backgroundColor: '#FF3B3018', paddingHorizontal: 8, paddingVertical: 3, borderRadius: 8 },
  liveDot: { width: 6, height: 6, borderRadius: 3, backgroundColor: '#FF3B30' },
  liveText: { fontSize: 10, color: '#FF3B30', fontWeight: '700' },
  taskRow: { flexDirection: 'row', alignItems: 'center', paddingVertical: 10, borderBottomWidth: StyleSheet.hairlineWidth, gap: 10 },
  taskText: { flex: 1, fontSize: 13 },
  taskTime: { fontSize: 11 },
  capGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  capChip: { paddingHorizontal: 12, paddingVertical: 6, borderRadius: 20, borderWidth: 1 },
  capText: { fontSize: 12, fontWeight: '600' },
  barLabelRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 6 },
  barLabel: { fontSize: 13, fontWeight: '500' },
  barPct: { fontSize: 13, fontWeight: '700' },
  barBg: { height: 7, borderRadius: 4, overflow: 'hidden' },
  barFill: { height: '100%', borderRadius: 4 },
});
`;
}

const agents = [
  // ACCOUNTING
  { file: 'app/ai-agent/accounting/bookkeeper.tsx', name: 'AI Bookkeeper', title: 'Automated Bookkeeping AI', description: 'Records transactions, reconciles accounts, and maintains accurate financial ledgers 24/7.', color: '#10B981', parentName: 'Accounting & Finance AI', metricsConfig: { tasksToday: '234', successRate: '99%', speed: '0.3s', accuracy: '99.8%', recentTasks: [{action:'Reconciled 150 bank transactions',time:'2m ago'},{action:'Categorized 89 expenses',time:'5m ago'},{action:'Generated trial balance',time:'12m ago'},{action:'Posted journal entries',time:'18m ago'},{action:'Detected duplicate entry #4821',time:'25m ago'}], capabilities: ['Bank Reconciliation','Transaction Recording','Ledger Management','Journal Entries','Account Categorization','Error Detection','Month-End Close','Financial Statements'] } },
  { file: 'app/ai-agent/accounting/tax-analyst.tsx', name: 'AI Tax Analyst', title: 'Tax Planning & Compliance AI', description: 'Monitors tax obligations, identifies deductions, and ensures full compliance across jurisdictions.', color: '#059669', parentName: 'Accounting & Finance AI', metricsConfig: { tasksToday: '45', successRate: '97%', speed: '2.1s', accuracy: '97.6%', recentTasks: [{action:'Reviewed Q3 tax provisions',time:'5m ago'},{action:'Identified $42K savings opportunity',time:'15m ago'},{action:'Updated compliance checklist',time:'30m ago'},{action:'Prepared estimated tax filing',time:'1h ago'},{action:'Analyzed multi-state tax impact',time:'2h ago'}], capabilities: ['Tax Planning','Deduction Optimization','Multi-jurisdiction','Filing Prep','Audit Support','Corporate Tax','VAT/GST Compliance','Tax Forecasting'] } },
  { file: 'app/ai-agent/accounting/financial-planner.tsx', name: 'AI Financial Planner', title: 'Financial Strategy AI', description: 'Builds budget forecasts, models financial scenarios, and aligns spending with strategic goals.', color: '#34D399', parentName: 'Accounting & Finance AI', metricsConfig: { tasksToday: '34', successRate: '94%', speed: '2.5s', accuracy: '95.2%', recentTasks: [{action:'Updated annual budget forecast',time:'8m ago'},{action:'Modeled 3 growth scenarios',time:'22m ago'},{action:'Analyzed investment returns',time:'45m ago'},{action:'Reviewed cash flow projections',time:'1h ago'},{action:'Generated financial dashboard',time:'2h ago'}], capabilities: ['Budget Forecasting','Scenario Modeling','Cash Flow Planning','Investment Analysis','Risk Assessment','KPI Tracking','Board Reporting','Cost Optimization'] } },
  { file: 'app/ai-agent/accounting/auditor.tsx', name: 'AI Auditor', title: 'Internal Audit AI', description: 'Performs continuous internal audits, flags anomalies, and ensures SOX compliance.', color: '#6EE7B7', parentName: 'Accounting & Finance AI', metricsConfig: { tasksToday: '18', successRate: '96%', speed: '3.2s', accuracy: '98.1%', recentTasks: [{action:'Completed SOX compliance review',time:'15m ago'},{action:'Tested 45 internal controls',time:'30m ago'},{action:'Flagged anomaly in travel expenses',time:'1h ago'},{action:'Generated audit report v2',time:'2h ago'},{action:'Reviewed AP disbursements',time:'3h ago'}], capabilities: ['Internal Audit','Fraud Detection','SOX Compliance','Control Testing','Risk Assessment','Audit Reports','Expense Review','GAAP Verification'] } },
  { file: 'app/ai-agent/accounting/expense-manager.tsx', name: 'AI Expense Manager', title: 'Expense Tracking AI', description: 'Automates expense tracking, enforces policies, and processes reimbursements in real-time.', color: '#A7F3D0', parentName: 'Accounting & Finance AI', metricsConfig: { tasksToday: '156', successRate: '98%', speed: '0.5s', accuracy: '98.4%', recentTasks: [{action:'Processed 45 expense reports',time:'2m ago'},{action:'Flagged 3 policy violations',time:'8m ago'},{action:'Generated weekly spend report',time:'20m ago'},{action:'Approved 23 reimbursements',time:'35m ago'},{action:'Synced with corporate cards',time:'1h ago'}], capabilities: ['Receipt Scanning','Policy Enforcement','Approval Workflows','Auto-Reimbursement','Spend Analytics','Budget Alerts','Category Rules','Multi-Currency'] } },
  { file: 'app/ai-agent/accounting/invoice-processor.tsx', name: 'AI Invoice Processor', title: 'AP/AR Automation AI', description: 'Captures invoices via OCR, matches POs, and schedules payments automatically.', color: '#10B981', parentName: 'Accounting & Finance AI', metricsConfig: { tasksToday: '189', successRate: '97%', speed: '0.8s', accuracy: '99.1%', recentTasks: [{action:'Processed 67 vendor invoices',time:'3m ago'},{action:'Matched 45 purchase orders',time:'10m ago'},{action:'Scheduled 12 payments',time:'25m ago'},{action:'Resolved 2 invoice disputes',time:'40m ago'},{action:'Sent payment confirmations',time:'1h ago'}], capabilities: ['OCR Capture','PO Matching','Validation Rules','Payment Scheduling','Vendor Management','Dispute Resolution','3-Way Matching','Early Pay Discounts'] } },
  { file: 'app/ai-agent/accounting/payroll-manager.tsx', name: 'AI Payroll Manager', title: 'Payroll Processing AI', description: 'Automates payroll runs, tax withholding, and benefits administration for any team size.', color: '#059669', parentName: 'Accounting & Finance AI', metricsConfig: { tasksToday: '0', successRate: '99%', speed: '1.5s', accuracy: '99.9%', recentTasks: [{action:'Processed monthly payroll run',time:'3d ago'},{action:'Filed payroll tax deposits',time:'4d ago'},{action:'Updated benefit deductions',time:'5d ago'},{action:'Generated pay stubs',time:'1w ago'},{action:'Reconciled payroll accounts',time:'1w ago'}], capabilities: ['Payroll Processing','Tax Withholding','Benefits Admin','Direct Deposit','Time Tracking','Compliance','W2/1099 Generation','Multi-State Payroll'] } },

  // EXECUTIVE
  { file: 'app/ai-agent/executive/ceo-advisor.tsx', name: 'AI CEO Advisor', title: 'Strategic Executive Intelligence', description: 'Provides strategic decision support, vision alignment, and executive-level intelligence for CEOs.', color: '#FFD700', parentName: 'Executive & Leadership AI', metricsConfig: { tasksToday: '34', successRate: '96%', speed: '2.1s', accuracy: '96.5%', recentTasks: [{action:'Prepared board briefing deck',time:'2m ago'},{action:'Analyzed M&A opportunity $50M',time:'15m ago'},{action:'Updated strategic roadmap Q3',time:'35m ago'},{action:'Competitive intelligence report',time:'1h ago'},{action:'Risk assessment for expansion',time:'2h ago'}], capabilities: ['Strategic Planning','Board Briefings','M&A Analysis','Market Strategy','Vision Alignment','Competitive Intelligence','Executive Reporting','Decision Support'] } },
  { file: 'app/ai-agent/executive/cfo-analyst.tsx', name: 'AI CFO Analyst', title: 'Financial Leadership AI', description: 'Delivers financial strategy, investor reporting, and fiscal decision intelligence at CFO level.', color: '#FBBF24', parentName: 'Executive & Leadership AI', metricsConfig: { tasksToday: '67', successRate: '98%', speed: '1.5s', accuracy: '98.2%', recentTasks: [{action:'Generated P&L report for board',time:'1m ago'},{action:'Updated cash flow forecast',time:'10m ago'},{action:'Analyzed investment ROI',time:'30m ago'},{action:'Prepared investor update',time:'1h ago'},{action:'Modeled 3 financial scenarios',time:'2h ago'}], capabilities: ['Financial Strategy','P&L Management','Cash Flow Analysis','Investor Relations','Budget Forecasting','Risk Modeling','Revenue Optimization','EPS Analysis'] } },
  { file: 'app/ai-agent/executive/coo-strategist.tsx', name: 'AI COO Strategist', title: 'Operations Leadership AI', description: 'Drives operational excellence and cross-department coordination at COO scale.', color: '#F59E0B', parentName: 'Executive & Leadership AI', metricsConfig: { tasksToday: '45', successRate: '94%', speed: '1.8s', accuracy: '94.8%', recentTasks: [{action:'Optimized supply chain process',time:'5m ago'},{action:'Coordinated Q4 cross-dept initiatives',time:'20m ago'},{action:'Reviewed department KPIs',time:'45m ago'},{action:'Identified operational bottleneck',time:'1h ago'},{action:'Streamlined approval workflow',time:'2h ago'}], capabilities: ['Operations Strategy','Process Optimization','KPI Management','Cross-team Coordination','Resource Planning','Efficiency Audits','Supply Chain','Performance Reviews'] } },
  { file: 'app/ai-agent/executive/board-advisor.tsx', name: 'AI Board Advisor', title: 'Corporate Governance AI', description: 'Handles board prep, governance compliance, ESG reporting, and shareholder communications.', color: '#D97706', parentName: 'Executive & Leadership AI', metricsConfig: { tasksToday: '12', successRate: '92%', speed: '3.5s', accuracy: '93.1%', recentTasks: [{action:'Prepared AGM presentation',time:'15m ago'},{action:'Reviewed governance policies',time:'45m ago'},{action:'Compiled ESG report Q3',time:'2h ago'},{action:'Analyzed shareholder proposals',time:'3h ago'},{action:'Updated board committee charters',time:'4h ago'}], capabilities: ['Board Meeting Prep','Corporate Governance','ESG Reporting','Shareholder Reports','Policy Review','Vote Analysis','Regulatory Filings','Director Briefings'] } },
  { file: 'app/ai-agent/executive/strategy-planner.tsx', name: 'AI Strategy Planner', title: 'Strategic Intelligence AI', description: 'Develops long-term strategic plans, competitive positioning, and market opportunity assessments.', color: '#92400E', parentName: 'Executive & Leadership AI', metricsConfig: { tasksToday: '23', successRate: '91%', speed: '2.8s', accuracy: '91.7%', recentTasks: [{action:'Updated 5-year strategic roadmap',time:'8m ago'},{action:'Identified new market opportunity',time:'30m ago'},{action:'Analyzed competitor landscape',time:'1h ago'},{action:'Drafted OKR framework Q4',time:'2h ago'},{action:'Scenario planned market entry',time:'3h ago'}], capabilities: ['Long-Term Planning','Competitive Analysis','Market Research','Innovation Pipeline','Partnership Strategy','OKR Framework','Trend Forecasting','Go-To-Market'] } },
  { file: 'app/ai-agent/executive/decision-engine.tsx', name: 'AI Decision Engine', title: 'Data-Driven Decision AI', description: 'Powers executive decisions with scenario modeling, impact analysis, and probability mapping.', color: '#78350F', parentName: 'Executive & Leadership AI', metricsConfig: { tasksToday: '0', successRate: '95%', speed: '0.9s', accuracy: '95.4%', recentTasks: [{action:'Modeled 4 expansion scenarios',time:'2h ago'},{action:'Quantified risk of market entry',time:'3h ago'},{action:'Decision tree for acquisition',time:'4h ago'},{action:'Impact analysis for price change',time:'6h ago'},{action:'Probability mapping Q3 forecast',time:'8h ago'}], capabilities: ['Scenario Modeling','Impact Analysis','Decision Trees','Risk Quantification','Probability Mapping','Outcome Prediction','Data Synthesis','Executive Briefs'] } },

  // HR
  { file: 'app/ai-agent/hr/recruiter.tsx', name: 'AI Recruiter', title: 'Talent Acquisition AI', description: 'Sources, screens, and manages candidates end-to-end from job posting to offer letter.', color: '#EC4899', parentName: 'Human Resources AI', metricsConfig: { tasksToday: '78', successRate: '94%', speed: '1.2s', accuracy: '94.7%', recentTasks: [{action:'Screened 45 resumes for Eng role',time:'2m ago'},{action:'Scheduled 12 technical interviews',time:'15m ago'},{action:'Sourced 30 candidates via LinkedIn',time:'30m ago'},{action:'Sent offer letter to candidate',time:'1h ago'},{action:'Updated ATS pipeline status',time:'2h ago'}], capabilities: ['Candidate Sourcing','Resume Screening','Interview Scheduling','Pipeline Management','Offer Management','Culture Fit Analysis','ATS Integration','Diversity Sourcing'] } },
  { file: 'app/ai-agent/hr/onboarding-agent.tsx', name: 'AI Onboarding Agent', title: 'New Hire Experience AI', description: 'Personalizes onboarding journeys with automated workflows, training paths, and buddy matching.', color: '#DB2777', parentName: 'Human Resources AI', metricsConfig: { tasksToday: '34', successRate: '97%', speed: '0.8s', accuracy: '97.3%', recentTasks: [{action:'Onboarded 5 new hires today',time:'5m ago'},{action:'Assigned 8 training modules',time:'15m ago'},{action:'Set up buddy program matching',time:'30m ago'},{action:'Collected documents from 3 hires',time:'1h ago'},{action:'Sent day-1 welcome kits',time:'2h ago'}], capabilities: ['Welcome Programs','Document Collection','Training Assignment','Buddy Matching','Progress Tracking','First 90 Days','Benefits Enrollment','Equipment Setup'] } },
  { file: 'app/ai-agent/hr/performance-reviewer.tsx', name: 'AI Performance Reviewer', title: 'Performance Intelligence AI', description: 'Runs continuous performance cycles with 360 feedback, goal tracking, and development plans.', color: '#BE185D', parentName: 'Human Resources AI', metricsConfig: { tasksToday: '45', successRate: '92%', speed: '2.0s', accuracy: '92.8%', recentTasks: [{action:'Generated 15 performance reports',time:'10m ago'},{action:'Tracked 89 OKR updates',time:'25m ago'},{action:'Collected 360 feedback responses',time:'45m ago'},{action:'Created development plans',time:'1h ago'},{action:'Flagged underperformance alert',time:'2h ago'}], capabilities: ['360 Reviews','OKR Tracking','Feedback Collection','Performance Scoring','Development Plans','Compensation Analysis','Succession Planning','Team Benchmarks'] } },
  { file: 'app/ai-agent/hr/benefits-manager.tsx', name: 'AI Benefits Manager', title: 'Benefits & Wellness AI', description: 'Manages benefits enrollment, plan comparison, wellness programs, and claims processing.', color: '#9D174D', parentName: 'Human Resources AI', metricsConfig: { tasksToday: '23', successRate: '96%', speed: '1.5s', accuracy: '96.4%', recentTasks: [{action:'Processed 12 benefit enrollments',time:'15m ago'},{action:'Updated health plan options',time:'40m ago'},{action:'Launched Q4 wellness challenge',time:'1h ago'},{action:'Processed 8 FSA claims',time:'2h ago'},{action:'Generated benefits utilization report',time:'3h ago'}], capabilities: ['Plan Comparison','Enrollment Automation','Claim Processing','Wellness Programs','Cost Optimization','Compliance','COBRA Management','Dental/Vision/Life'] } },
  { file: 'app/ai-agent/hr/training-coordinator.tsx', name: 'AI Training Coordinator', title: 'L&D Management AI', description: 'Designs personalized learning paths, tracks certifications, and analyzes skill development ROI.', color: '#831843', parentName: 'Human Resources AI', metricsConfig: { tasksToday: '15', successRate: '90%', speed: '2.8s', accuracy: '90.6%', recentTasks: [{action:'Created 3 personalized learning paths',time:'20m ago'},{action:'Identified skill gaps in Tech team',time:'40m ago'},{action:'Assigned 5 new certifications',time:'1h ago'},{action:'Calculated L&D ROI report',time:'2h ago'},{action:'Enrolled team in leadership course',time:'3h ago'}], capabilities: ['Skill Gap Analysis','Learning Paths','Course Assignment','Progress Tracking','Certification Management','ROI Analysis','LMS Integration','Manager Coaching'] } },
  { file: 'app/ai-agent/hr/culture-agent.tsx', name: 'AI Culture Agent', title: 'Employee Engagement AI', description: 'Measures engagement, runs pulse surveys, plans team events, and monitors culture health.', color: '#500724', parentName: 'Human Resources AI', metricsConfig: { tasksToday: '28', successRate: '91%', speed: '1.5s', accuracy: '91.4%', recentTasks: [{action:'Launched monthly pulse survey',time:'8m ago'},{action:'Analyzed engagement scores',time:'25m ago'},{action:'Planned Q4 team offsite event',time:'40m ago'},{action:'Recognized 5 top performers',time:'1h ago'},{action:'Generated culture health report',time:'2h ago'}], capabilities: ['Pulse Surveys','Engagement Tracking','Culture Metrics','Event Planning','Recognition Programs','Diversity Analytics','eNPS Tracking','Manager Scores'] } },
  { file: 'app/ai-agent/hr/hr-compliance.tsx', name: 'AI HR Compliance', title: 'Labor Law Compliance AI', description: 'Monitors labor laws, manages policy updates, and prepares audit-ready HR documentation.', color: '#EC4899', parentName: 'Human Resources AI', metricsConfig: { tasksToday: '0', successRate: '98%', speed: '1.2s', accuracy: '98.6%', recentTasks: [{action:'Updated FMLA compliance tracking',time:'1h ago'},{action:'Distributed new handbook policy',time:'3h ago'},{action:'Prepared HR audit documentation',time:'5h ago'},{action:'Monitored ADA compliance',time:'6h ago'},{action:'Reviewed termination checklist',time:'8h ago'}], capabilities: ['Labor Law Compliance','Policy Management','Regulatory Alerts','I-9 Management','Audit Preparation','EEOC Reporting','Training Compliance','Document Management'] } },

  // IT
  { file: 'app/ai-agent/it/devops-agent.tsx', name: 'AI DevOps Agent', title: 'CI/CD Automation AI', description: 'Manages CI/CD pipelines, automates deployments, and monitors infrastructure health 24/7.', color: '#6366F1', parentName: 'IT & Technology AI', metricsConfig: { tasksToday: '156', successRate: '97%', speed: '0.5s', accuracy: '97.8%', recentTasks: [{action:'Deployed v2.4.1 to production',time:'1m ago'},{action:'Scaled K8s cluster from 3 to 5 nodes',time:'10m ago'},{action:'Fixed broken CI pipeline build',time:'25m ago'},{action:'Rolled back failed migration',time:'40m ago'},{action:'Synced staging environment',time:'1h ago'}], capabilities: ['CI/CD Automation','Container Orchestration','Infrastructure as Code','Deployment Strategies','Environment Management','Rollback Management','Docker/K8s','GitOps'] } },
  { file: 'app/ai-agent/it/security-analyst.tsx', name: 'AI Security Analyst', title: 'Cybersecurity Intelligence AI', description: 'Detects threats, scans vulnerabilities, and manages incident response with zero-latency precision.', color: '#4F46E5', parentName: 'IT & Technology AI', metricsConfig: { tasksToday: '234', successRate: '99%', speed: '0.2s', accuracy: '99.4%', recentTasks: [{action:'Blocked 12 suspicious IPs',time:'30s ago'},{action:'Completed full vulnerability scan',time:'5m ago'},{action:'Updated firewall ACL rules',time:'15m ago'},{action:'Investigated phishing attempt',time:'30m ago'},{action:'Generated SIEM alert report',time:'45m ago'}], capabilities: ['Threat Detection','Vulnerability Scanning','Incident Response','Compliance Monitoring','Penetration Testing','SIEM Integration','SOC Automation','Zero-Day Response'] } },
  { file: 'app/ai-agent/it/help-desk.tsx', name: 'AI Help Desk', title: 'IT Support Automation AI', description: 'Resolves IT tickets instantly, manages assets, and provisions user accounts automatically.', color: '#7C3AED', parentName: 'IT & Technology AI', metricsConfig: { tasksToday: '189', successRate: '93%', speed: '0.8s', accuracy: '93.6%', recentTasks: [{action:'Resolved 45 support tickets',time:'2m ago'},{action:'Reset passwords for 8 users',time:'10m ago'},{action:'Provisioned 3 new accounts',time:'20m ago'},{action:'Updated 7 knowledge base articles',time:'40m ago'},{action:'Remote-fixed printer connectivity',time:'1h ago'}], capabilities: ['Ticket Resolution','Remote Troubleshooting','Knowledge Base','Asset Management','User Provisioning','Password Management','Software Licensing','Hardware Requests'] } },
  { file: 'app/ai-agent/it/infrastructure-manager.tsx', name: 'AI Infrastructure Manager', title: 'IT Infrastructure AI', description: 'Optimizes server performance, plans capacity, and manages disaster recovery automatically.', color: '#6D28D9', parentName: 'IT & Technology AI', metricsConfig: { tasksToday: '67', successRate: '96%', speed: '1.2s', accuracy: '96.3%', recentTasks: [{action:'Optimized server resource allocation',time:'5m ago'},{action:'Updated disaster recovery plan',time:'20m ago'},{action:'Analyzed 30-day capacity trends',time:'45m ago'},{action:'Migrated old storage arrays',time:'2h ago'},{action:'Patched 12 server vulnerabilities',time:'3h ago'}], capabilities: ['Server Management','Capacity Planning','Performance Monitoring','Cost Optimization','Disaster Recovery','Backup Management','Patch Management','Config Drift Detection'] } },
  { file: 'app/ai-agent/it/cloud-architect.tsx', name: 'AI Cloud Architect', title: 'Cloud Strategy AI', description: 'Designs cloud-native architectures, plans migrations, and optimizes multi-cloud spending.', color: '#5B21B6', parentName: 'IT & Technology AI', metricsConfig: { tasksToday: '18', successRate: '94%', speed: '3.5s', accuracy: '94.1%', recentTasks: [{action:'Designed microservices architecture',time:'15m ago'},{action:'Optimized AWS spend by 18%',time:'1h ago'},{action:'Planned on-prem to cloud migration',time:'2h ago'},{action:'Created serverless API blueprint',time:'3h ago'},{action:'Evaluated Azure vs GCP options',time:'4h ago'}], capabilities: ['Cloud Architecture','Migration Planning','Multi-Cloud Strategy','Cost Optimization','Security Architecture','Serverless Design','FinOps','Well-Architected Reviews'] } },
  { file: 'app/ai-agent/it/network-monitor.tsx', name: 'AI Network Monitor', title: 'Network Intelligence AI', description: 'Monitors network performance, detects anomalies, and manages topology across all locations.', color: '#4338CA', parentName: 'IT & Technology AI', metricsConfig: { tasksToday: '0', successRate: '98%', speed: '0.1s', accuracy: '98.9%', recentTasks: [{action:'Detected latency spike on node-12',time:'1h ago'},{action:'Updated network topology map',time:'3h ago'},{action:'Managed bandwidth allocation',time:'5h ago'},{action:'Patched VPN gateway firmware',time:'6h ago'},{action:'Analyzed packet loss report',time:'8h ago'}], capabilities: ['Network Monitoring','Anomaly Detection','Bandwidth Management','Topology Mapping','DNS Management','VPN Management','QoS Optimization','WAN Monitoring'] } },

  // LEGAL
  { file: 'app/ai-agent/legal/contract-reviewer.tsx', name: 'AI Contract Reviewer', title: 'Contract Analysis AI', description: 'Analyzes contracts, identifies risky clauses, and suggests redlines in seconds.', color: '#F59E0B', parentName: 'Legal & Compliance AI', metricsConfig: { tasksToday: '45', successRate: '96%', speed: '2.5s', accuracy: '96.8%', recentTasks: [{action:'Reviewed 8 vendor MSAs',time:'3m ago'},{action:'Flagged liability clause in Section 4',time:'15m ago'},{action:'Generated contract summary',time:'30m ago'},{action:'Identified missing SLA terms',time:'1h ago'},{action:'Compared contract vs template',time:'2h ago'}], capabilities: ['Clause Analysis','Risk Detection','Redline Suggestions','Template Generation','Version Comparison','Obligation Tracking','NDA Review','IP Assignment Review'] } },
  { file: 'app/ai-agent/legal/compliance-monitor.tsx', name: 'AI Compliance Monitor', title: 'Regulatory Compliance AI', description: 'Tracks regulatory changes, enforces policies, and prepares audit-ready compliance evidence.', color: '#D97706', parentName: 'Legal & Compliance AI', metricsConfig: { tasksToday: '156', successRate: '99%', speed: '0.5s', accuracy: '99.2%', recentTasks: [{action:'Updated GDPR compliance status',time:'1m ago'},{action:'Monitored 23 regulatory changes',time:'10m ago'},{action:'Prepared audit documentation',time:'25m ago'},{action:'Flagged CCPA requirement gap',time:'45m ago'},{action:'Updated compliance matrix',time:'1h ago'}], capabilities: ['Regulatory Tracking','Policy Enforcement','Audit Prep','Gap Analysis','Risk Rating','GDPR/CCPA/SOC2','Compliance Dashboards','Regulatory Calendar'] } },
  { file: 'app/ai-agent/legal/risk-assessor.tsx', name: 'AI Risk Assessor', title: 'Enterprise Risk AI', description: 'Identifies, quantifies, and mitigates enterprise risks across legal, operational, and financial domains.', color: '#B45309', parentName: 'Legal & Compliance AI', metricsConfig: { tasksToday: '34', successRate: '94%', speed: '2.0s', accuracy: '94.5%', recentTasks: [{action:'Updated enterprise risk register',time:'8m ago'},{action:'Assessed 5 vendor risk scores',time:'22m ago'},{action:'Created mitigation plans for 3 risks',time:'45m ago'},{action:'Generated risk heat map',time:'1h ago'},{action:'Reviewed M&A risk factors',time:'2h ago'}], capabilities: ['Risk Identification','Impact Analysis','Mitigation Plans','Risk Registers','Heat Maps','Scenario Planning','Third-Party Risk','ISO 31000'] } },
  { file: 'app/ai-agent/legal/policy-analyst.tsx', name: 'AI Policy Analyst', title: 'Policy Management AI', description: 'Drafts, reviews, and distributes corporate policies with automated acknowledgment tracking.', color: '#92400E', parentName: 'Legal & Compliance AI', metricsConfig: { tasksToday: '23', successRate: '95%', speed: '2.2s', accuracy: '95.3%', recentTasks: [{action:'Drafted updated privacy policy',time:'12m ago'},{action:'Distributed 5 policy changes',time:'30m ago'},{action:'Tracked 89% acknowledgment rate',time:'45m ago'},{action:'Assessed policy impact on ops',time:'1h ago'},{action:'Archived deprecated policy v1',time:'2h ago'}], capabilities: ['Policy Drafting','Review Workflows','Distribution Management','Acknowledgment Tracking','Version Control','Impact Assessment','Policy Matrix','Regulatory Alignment'] } },
  { file: 'app/ai-agent/legal/legal-researcher.tsx', name: 'AI Legal Researcher', title: 'Legal Research AI', description: 'Performs deep legal research, finds case precedents, and synthesizes statute changes rapidly.', color: '#78350F', parentName: 'Legal & Compliance AI', metricsConfig: { tasksToday: '12', successRate: '92%', speed: '4.0s', accuracy: '92.6%', recentTasks: [{action:'Researched 3 case precedents',time:'20m ago'},{action:'Summarized recent statute changes',time:'45m ago'},{action:'Prepared legal brief for CFO',time:'1h ago'},{action:'Identified case law for IP dispute',time:'2h ago'},{action:'Updated regulatory change log',time:'3h ago'}], capabilities: ['Case Research','Precedent Analysis','Statute Review','Legal Briefs','Citation Management','Litigation Support','Westlaw Integration','Memo Drafting'] } },
  { file: 'app/ai-agent/legal/regulatory-agent.tsx', name: 'AI Regulatory Agent', title: 'Regulatory Filing AI', description: 'Manages regulatory filings, tracks deadlines, and submits compliance reports automatically.', color: '#44403C', parentName: 'Legal & Compliance AI', metricsConfig: { tasksToday: '0', successRate: '98%', speed: '1.5s', accuracy: '99.0%', recentTasks: [{action:'Filed quarterly regulatory report',time:'2d ago'},{action:'Tracked 5 upcoming deadlines',time:'3d ago'},{action:'Submitted SEC compliance form',time:'1w ago'},{action:'Updated regulatory calendar',time:'1w ago'},{action:'Monitored cross-jurisdiction rules',time:'2w ago'}], capabilities: ['Filing Management','Deadline Tracking','Submission Automation','Regulatory Calendar','Cross-jurisdiction','Change Alerts','SEC/FINRA Filing','Compliance Archiving'] } },

  // ENGINEERING
  { file: 'app/ai-agent/engineering/code-reviewer.tsx', name: 'AI Code Reviewer', title: 'Code Quality AI', description: 'Reviews pull requests, enforces standards, and catches security vulnerabilities before production.', color: '#14B8A6', parentName: 'Engineering & Development AI', metricsConfig: { tasksToday: '156', successRate: '95%', speed: '1.2s', accuracy: '95.4%', recentTasks: [{action:'Reviewed PR #842 — approved with notes',time:'1m ago'},{action:'Flagged SQL injection in auth module',time:'8m ago'},{action:'Suggested 12 performance optimizations',time:'20m ago'},{action:'Enforced naming conventions',time:'35m ago'},{action:'Blocked PR with critical XSS bug',time:'50m ago'}], capabilities: ['Code Analysis','Security Scanning','Best Practices','Performance Issues','Style Enforcement','Refactoring Suggestions','OWASP Rules','Complexity Metrics'] } },
  { file: 'app/ai-agent/engineering/test-automation.tsx', name: 'AI Test Automation', title: 'QA Automation AI', description: 'Generates and runs automated test suites with 92%+ coverage and instant regression detection.', color: '#0D9488', parentName: 'Engineering & Development AI', metricsConfig: { tasksToday: '234', successRate: '97%', speed: '0.8s', accuracy: '97.1%', recentTasks: [{action:'Generated 45 new test cases',time:'2m ago'},{action:'Achieved 92% test coverage',time:'15m ago'},{action:'Detected 3 regressions in v2.5',time:'30m ago'},{action:'Ran full E2E test suite',time:'45m ago'},{action:'Updated test fixtures',time:'1h ago'}], capabilities: ['Test Generation','E2E Testing','Unit Tests','Integration Tests','Coverage Analysis','Regression Detection','Test Data Management','CI Integration'] } },
  { file: 'app/ai-agent/engineering/architecture-advisor.tsx', name: 'AI Architecture Advisor', title: 'System Design AI', description: 'Reviews system designs, recommends patterns, and analyzes scalability bottlenecks.', color: '#0F766E', parentName: 'Engineering & Development AI', metricsConfig: { tasksToday: '18', successRate: '93%', speed: '3.0s', accuracy: '93.8%', recentTasks: [{action:'Reviewed microservices design',time:'10m ago'},{action:'Proposed Redis caching strategy',time:'35m ago'},{action:'Evaluated event-driven vs REST',time:'1h ago'},{action:'API design review for v3',time:'2h ago'},{action:'Migration strategy for monolith',time:'3h ago'}], capabilities: ['System Design','Pattern Analysis','Scalability Review','Tech Stack Evaluation','Migration Planning','API Design','Database Design','Architecture Docs'] } },
  { file: 'app/ai-agent/engineering/sprint-manager.tsx', name: 'AI Sprint Manager', title: 'Agile Sprint AI', description: 'Plans sprints, tracks velocity, detects blockers, and runs retrospectives automatically.', color: '#134E4A', parentName: 'Engineering & Development AI', metricsConfig: { tasksToday: '45', successRate: '91%', speed: '1.5s', accuracy: '91.9%', recentTasks: [{action:'Planned Sprint 24 — 42 story points',time:'5m ago'},{action:'Updated velocity: 38 pts avg',time:'20m ago'},{action:'Identified 2 critical blockers',time:'35m ago'},{action:'Generated burndown chart',time:'1h ago'},{action:'Ran automated retrospective',time:'2h ago'}], capabilities: ['Sprint Planning','Velocity Tracking','Burndown Charts','Capacity Planning','Blocker Detection','Retrospective Analysis','Jira Integration','Story Point Estimation'] } },
  { file: 'app/ai-agent/engineering/documentation-agent.tsx', name: 'AI Documentation Agent', title: 'Technical Docs AI', description: 'Auto-generates API docs, READMEs, changelogs, and architecture diagrams from code.', color: '#115E59', parentName: 'Engineering & Development AI', metricsConfig: { tasksToday: '67', successRate: '94%', speed: '1.0s', accuracy: '94.2%', recentTasks: [{action:'Generated API docs for v3.2',time:'8m ago'},{action:'Updated README with setup guide',time:'25m ago'},{action:'Created architecture diagram',time:'45m ago'},{action:'Published release notes v2.5',time:'1h ago'},{action:'Synced docs to Confluence',time:'2h ago'}], capabilities: ['Auto-documentation','API Docs (OpenAPI)','README Generation','Changelog','Wiki Management','Diagram Generation','JSDoc/TSDoc','Docs CI/CD'] } },
  { file: 'app/ai-agent/engineering/bug-triager.tsx', name: 'AI Bug Triager', title: 'Bug Management AI', description: 'Prioritizes bug reports, finds duplicates, analyzes root causes, and routes to the right engineer.', color: '#14B8A6', parentName: 'Engineering & Development AI', metricsConfig: { tasksToday: '34', successRate: '90%', speed: '1.8s', accuracy: '90.7%', recentTasks: [{action:'Triaged 23 new bug reports',time:'15m ago'},{action:'Found 5 duplicate issues',time:'30m ago'},{action:'Identified root cause for crash',time:'50m ago'},{action:'Routed P0 to on-call engineer',time:'1h ago'},{action:'SLA alert: 3 bugs past deadline',time:'2h ago'}], capabilities: ['Bug Prioritization','Duplicate Detection','Root Cause Analysis','Impact Assessment','Assignment Routing','SLA Tracking','Reproduction Steps','Severity Classification'] } },
  { file: 'app/ai-agent/engineering/cicd-agent.tsx', name: 'AI CI/CD Agent', title: 'Pipeline Automation AI', description: 'Optimizes build pipelines, monitors deployments, and automates release management end-to-end.', color: '#0D9488', parentName: 'Engineering & Development AI', metricsConfig: { tasksToday: '0', successRate: '98%', speed: '0.5s', accuracy: '98.4%', recentTasks: [{action:'Optimized pipeline — 40% faster builds',time:'2h ago'},{action:'Monitored 3 deployment jobs',time:'4h ago'},{action:'Generated release notes v2.5',time:'6h ago'},{action:'Synced environments dev/staging',time:'8h ago'},{action:'Managed rollback for hotfix release',time:'10h ago'}], capabilities: ['Pipeline Optimization','Build Monitoring','Deploy Automation','Rollback Management','Environment Sync','Release Notes','Artifact Management','Deployment Gates'] } },

  // PRODUCT
  { file: 'app/ai-agent/product/roadmap-planner.tsx', name: 'AI Roadmap Planner', title: 'Product Roadmap AI', description: 'Builds and maintains product roadmaps aligned with user needs, business goals, and engineering capacity.', color: '#8B5CF6', parentName: 'Product & R&D AI', metricsConfig: { tasksToday: '18', successRate: '93%', speed: '2.5s', accuracy: '93.4%', recentTasks: [{action:'Updated Q4 product roadmap',time:'10m ago'},{action:'Prioritized 12 backlog items',time:'30m ago'},{action:'Aligned roadmap with OKRs',time:'1h ago'},{action:'Created feature dependency map',time:'2h ago'},{action:'Roadmap review with stakeholders',time:'3h ago'}], capabilities: ['Roadmap Planning','Feature Prioritization','OKR Alignment','Dependency Mapping','Stakeholder Management','Capacity Planning','Quarterly Planning','Release Management'] } },
  { file: 'app/ai-agent/product/feature-analyst.tsx', name: 'AI Feature Analyst', title: 'Feature Intelligence AI', description: 'Analyzes feature requests, scores impact using RICE, and provides data-driven prioritization.', color: '#7C3AED', parentName: 'Product & R&D AI', metricsConfig: { tasksToday: '23', successRate: '91%', speed: '2.0s', accuracy: '91.8%', recentTasks: [{action:'Analyzed 15 feature requests',time:'8m ago'},{action:'Scored features by RICE model',time:'25m ago'},{action:'Identified top user-requested feature',time:'45m ago'},{action:'Built impact vs effort matrix',time:'1h ago'},{action:'Feature spec completed for v3.2',time:'2h ago'}], capabilities: ['Feature Analysis','RICE Scoring','Impact Assessment','User Story Creation','Acceptance Criteria','Competitive Benchmarking','Feature Flags','Launch Readiness'] } },
  { file: 'app/ai-agent/product/ux-researcher.tsx', name: 'AI UX Researcher', title: 'User Research AI', description: 'Conducts user research, synthesizes session recordings, and generates actionable UX insights.', color: '#6D28D9', parentName: 'Product & R&D AI', metricsConfig: { tasksToday: '12', successRate: '90%', speed: '3.0s', accuracy: '90.5%', recentTasks: [{action:'Analyzed 50 heat map sessions',time:'15m ago'},{action:'Synthesized user interview findings',time:'40m ago'},{action:'Generated usability test report',time:'1h ago'},{action:'Identified drop-off in checkout flow',time:'2h ago'},{action:'Created user journey map v2',time:'3h ago'}], capabilities: ['User Interviews','Session Analysis','Heatmap Analysis','Usability Testing','Journey Mapping','Persona Creation','Competitive UX','Accessibility Audit'] } },
  { file: 'app/ai-agent/product/ab-test-agent.tsx', name: 'AI A/B Test Agent', title: 'Experimentation AI', description: 'Designs, runs, and analyzes A/B tests to optimize conversion rates and user experience.', color: '#5B21B6', parentName: 'Product & R&D AI', metricsConfig: { tasksToday: '8', successRate: '88%', speed: '1.5s', accuracy: '89.2%', recentTasks: [{action:'Launched A/B test for CTA button',time:'20m ago'},{action:'Declared variant B winner p<0.05',time:'1h ago'},{action:'Designed multivariate test plan',time:'2h ago'},{action:'Calculated statistical significance',time:'3h ago'},{action:'Shipped winning variant to 100%',time:'4h ago'}], capabilities: ['A/B Test Design','Multivariate Testing','Statistical Analysis','Significance Testing','Conversion Optimization','Feature Flags','Experiment Tracking','Segmentation'] } },
  { file: 'app/ai-agent/product/prototype-builder.tsx', name: 'AI Prototype Builder', title: 'Rapid Prototyping AI', description: 'Creates interactive prototypes, wireframes, and user flow diagrams to validate ideas fast.', color: '#4C1D95', parentName: 'Product & R&D AI', metricsConfig: { tasksToday: '6', successRate: '87%', speed: '4.0s', accuracy: '87.6%', recentTasks: [{action:'Built checkout flow prototype',time:'30m ago'},{action:'Created onboarding wireframes',time:'1h ago'},{action:'Generated user flow diagram',time:'2h ago'},{action:'Prototyped mobile nav redesign',time:'3h ago'},{action:'Shared prototype for user testing',time:'4h ago'}], capabilities: ['Wireframing','Interactive Prototypes','User Flows','Design Handoff','Figma Integration','Click-Through Demos','Rapid Iteration','Design Systems'] } },
];

let created = 0;
agents.forEach(agent => {
  const page = makeSubAgentPage(agent);
  const filePath = path.join(process.cwd(), agent.file);
  fs.writeFileSync(filePath, page, 'utf8');
  created++;
  console.log('Created:', agent.file);
});
console.log('\nTotal created:', created, 'files');
