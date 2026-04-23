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
  // SALES REVENUE
  { file: 'app/ai-agent/sales-revenue/account-manager.tsx', name: 'AI Account Manager', title: 'Account Growth AI', description: 'Manages key accounts, tracks health scores, and plans strategic growth for each client.', color: '#34C759', parentName: 'Sales & Revenue AI', metricsConfig: { tasksToday: '65', successRate: '95%', speed: '1.2s', accuracy: '95.5%', recentTasks: [{action:'Reviewed Q3 account health',time:'5m ago'},{action:'Flagged 2 at-risk accounts',time:'15m ago'},{action:'Scheduled 5 QBRs',time:'30m ago'},{action:'Sent renewal reminders',time:'1h ago'},{action:'Updated success metrics for Acme Corp',time:'2h ago'}], capabilities: ['Account Health Scoring','QBR Generation','Renewal Forecasting','Risk Mitigation','Up-Sell Identification','Relationship Mapping'] } },
  { file: 'app/ai-agent/sales-revenue/proposal-generator.tsx', name: 'AI Proposal Generator', title: 'Sales Proposal AI', description: 'Creates fully customized, data-driven sales proposals and RFP responses in seconds.', color: '#30B050', parentName: 'Sales & Revenue AI', metricsConfig: { tasksToday: '42', successRate: '98%', speed: '2.5s', accuracy: '98.2%', recentTasks: [{action:'Generated $120k enterprise proposal',time:'10m ago'},{action:'Responded to 80-question RFP',time:'45m ago'},{action:'Applied negotiated dynamic pricing',time:'1h ago'},{action:'Sent proposal for e-signature',time:'2h ago'},{action:'Updated case study references',time:'3h ago'}], capabilities: ['Dynamic Pricing','RFP Responses','E-Signature Integration','Template Customization','Competitor Battlecards','ROI Calculators'] } },
  { file: 'app/ai-agent/sales-revenue/upsell-crosssell.tsx', name: 'AI Upsell & Cross-Sell', title: 'Revenue Expansion AI', description: 'Identifies expansion opportunities across the customer base using usage metrics and behavior triggers.', color: '#28A745', parentName: 'Sales & Revenue AI', metricsConfig: { tasksToday: '112', successRate: '88%', speed: '0.8s', accuracy: '89.5%', recentTasks: [{action:'Identified 15 new upsell targets',time:'2m ago'},{action:'Triggered automated cross-sell sequence',time:'20m ago'},{action:'Analyzed product adoption metrics',time:'40m ago'},{action:'Generated personalized upgrade offer',time:'1h ago'},{action:'Alerted AE to expansion opportunity',time:'2h ago'}], capabilities: ['Usage Monitoring','Behavior Triggers','Expansion Forecasting','Personalized Offers','Bundle Recommendations','Cohort Analysis'] } },

  // MARKETING
  { file: 'app/ai-agent/marketing/audience-targeting.tsx', name: 'AI Audience Targeting', title: 'Precise Segmentation AI', description: 'Creates hyper-targeted audience segments using intent data, behavior, and predictive modeling.', color: '#FF2D55', parentName: 'Marketing & Growth AI', metricsConfig: { tasksToday: '89', successRate: '92%', speed: '1.5s', accuracy: '93.1%', recentTasks: [{action:'Updated retargeting audience lists',time:'5m ago'},{action:'Identified 5k high-intent lookalikes',time:'25m ago'},{action:'Segmented Q2 webinar attendees',time:'1h ago'},{action:'Refined ICP based on won deals',time:'3h ago'},{action:'Synced audiences to ad platforms',time:'4h ago'}], capabilities: ['Intent Scoring','Lookalike Modeling','Predictive Segmentation','Cross-channel Sync','LTV Prediction','Churn Propensity'] } },
  { file: 'app/ai-agent/marketing/content-generator.tsx', name: 'AI Content Generator', title: 'Content Creation AI', description: 'Produces blog posts, whitepapers, social copy, and ad creatives tailored to your brand voice.', color: '#FF3B30', parentName: 'Marketing & Growth AI', metricsConfig: { tasksToday: '134', successRate: '94%', speed: '2.8s', accuracy: '94.6%', recentTasks: [{action:'Drafted 3 SEO-optimized blog posts',time:'12m ago'},{action:'Generated 15 ad copy variations',time:'30m ago'},{action:'Created webinar promotional sequence',time:'1h ago'},{action:'Wrote newsletter for 50k subscribers',time:'2h ago'},{action:'Repurposed video into 5 social posts',time:'4h ago'}], capabilities: ['Brand Voice Matching','SEO Optimization','Multi-format Creation','A/B Copy Variations','Localization','Pillar Content Strategy'] } },
  { file: 'app/ai-agent/marketing/digital-marketer.tsx', name: 'AI Digital Marketer', title: 'Campaign Execution AI', description: 'Executes and optimizes digital campaigns across Search, Social, and Display networks continuously.', color: '#FF453A', parentName: 'Marketing & Growth AI', metricsConfig: { tasksToday: '215', successRate: '91%', speed: '0.6s', accuracy: '92.4%', recentTasks: [{action:'Adjusted bids for 150 keywords',time:'3m ago'},{action:'Paused 3 underperforming ad sets',time:'18m ago'},{action:'Launched holiday promo campaign',time:'1h ago'},{action:'Reallocated budget to top performer',time:'2h ago'},{action:'Generated weekly ROAS report',time:'5h ago'}], capabilities: ['Bid Optimization','Budget Reallocation','A/B Test Management','ROAS Tracking','Cross-channel Execution','Creative Rotation'] } },
  { file: 'app/ai-agent/marketing/email-marketing.tsx', name: 'AI Email Marketing', title: 'Email Nurture AI', description: 'Builds logic-driven email sequences, personalizes content, and optimizes send times for maximum open rates.', color: '#FF375F', parentName: 'Marketing & Growth AI', metricsConfig: { tasksToday: '1.2M', successRate: '99%', speed: '0.1s', accuracy: '99.5%', recentTasks: [{action:'Sent 50k personalized newsletters',time:'1m ago'},{action:'Optimized send time for cohort B',time:'15m ago'},{action:'Triggered cart abandonment series',time:'30m ago'},{action:'A/B tested subject lines',time:'1h ago'},{action:'Cleaned 2,500 bounced emails',time:'4h ago'}], capabilities: ['Dynamic Personalization','Send Time Optimization','List Hygiene','Nurture Sequencing','Deliverability Monitoring','Subject Line Testing'] } },
  { file: 'app/ai-agent/marketing/seo-agent.tsx', name: 'AI SEO Agent', title: 'Search Optimization AI', description: 'Monitors rankings, conducts keyword research, audits technical SEO, and suggests content gaps.', color: '#FF6482', parentName: 'Marketing & Growth AI', metricsConfig: { tasksToday: '78', successRate: '95%', speed: '3.2s', accuracy: '96.1%', recentTasks: [{action:'Crawled 500 pages for 404 errors',time:'10m ago'},{action:'Identified 12 new keyword opportunities',time:'45m ago'},{action:'Updated meta tags across 50 posts',time:'2h ago'},{action:'Analyzed competitor backlink profile',time:'3h ago'},{action:'Generated weekly search visibility report',time:'6h ago'}], capabilities: ['Technical Audits','Keyword Tracking','Backlink Analysis','Content Gap Detection','On-page Optimization','Core Web Vitals Monitoring'] } },

  // OPERATIONS
  { file: 'app/ai-agent/operations/compliance-monitoring.tsx', name: 'AI Compliance Monitor', title: 'Operations Compliance AI', description: 'Ensures all operational processes adhere to internal policies and external regulations.', color: '#8E8E93', parentName: 'Operations Management AI', metricsConfig: { tasksToday: '145', successRate: '99%', speed: '0.4s', accuracy: '99.7%', recentTasks: [{action:'Scanned 500 transactions for AML',time:'5m ago'},{action:'Verified 50 user KYC documents',time:'20m ago'},{action:'Flagged 3 out-of-policy requests',time:'1h ago'},{action:'Updated internal policy database',time:'3h ago'},{action:'Generated daily compliance log',time:'8h ago'}], capabilities: ['KYC/AML Checks','Policy Enforcement','Audit Logging','Regulatory Updates','Exception Handling','Fraud Prevention'] } },
  { file: 'app/ai-agent/operations/operations-manager.tsx', name: 'AI Operations Manager', title: 'Core Operations AI', description: 'Orchestrates the entire operations floor, manages resource allocation, and tracks enterprise KPIs.', color: '#98989D', parentName: 'Operations Management AI', metricsConfig: { tasksToday: '56', successRate: '94%', speed: '1.2s', accuracy: '94.8%', recentTasks: [{action:'Reallocated resources to Queue A',time:'12m ago'},{action:'Generated daily operational briefing',time:'30m ago'},{action:'Resolved 2 cross-department blockers',time:'1h ago'},{action:'Updated executive KPI dashboard',time:'2h ago'},{action:'Initiated disaster recovery drill',time:'5h ago'}], capabilities: ['Resource Orchestration','KPI Dashboarding','Incident Management','Cross-functional Comms','SLA Tracking','Capacity Planning'] } },
  { file: 'app/ai-agent/operations/process-optimization.tsx', name: 'AI Process Optimizer', title: 'Workflow Efficiency AI', description: 'Continuously analyzes workflows to identify bottlenecks and suggests automated process improvements.', color: '#AEAEB2', parentName: 'Operations Management AI', metricsConfig: { tasksToday: '34', successRate: '92%', speed: '3.5s', accuracy: '93.1%', recentTasks: [{action:'Identified bottleneck in approval flow',time:'15m ago'},{action:'Proposed 3 process automations',time:'45m ago'},{action:'Simulated new workflow efficiency',time:'2h ago'},{action:'Measured time-savings since v2',time:'4h ago'},{action:'Updated standard operating procedures',time:'6h ago'}], capabilities: ['Process Mining','Bottleneck Detection','Simulation Modeling','SOP Generation','Efficiency Tracking','Waste Reduction'] } },
  { file: 'app/ai-agent/operations/quality-control.tsx', name: 'AI Quality Control', title: 'QA & Standards AI', description: 'Monitors outputs, catches defects, and ensures all operational deliverables meet quality standards.', color: '#C7C7CC', parentName: 'Operations Management AI', metricsConfig: { tasksToday: '890', successRate: '97%', speed: '0.2s', accuracy: '98.5%', recentTasks: [{action:'Inspected 250 outgoing deliverables',time:'2m ago'},{action:'Flagged 5 items for manual review',time:'18m ago'},{action:'Analyzed defect root causes',time:'1h ago'},{action:'Updated quality threshold parameters',time:'3h ago'},{action:'Sent QA report to production team',time:'4h ago'}], capabilities: ['Automated Inspection','Defect Routing','Root Cause Analysis','Standardization Checks','Quality Scorecards','Continuous Feedback'] } },
  { file: 'app/ai-agent/operations/resource-planner.tsx', name: 'AI Resource Planner', title: 'Capacity & Logistics AI', description: 'Forecasts demand and optimally allocates human and systems resources ahead of time.', color: '#D1D1D6', parentName: 'Operations Management AI', metricsConfig: { tasksToday: '42', successRate: '95%', speed: '2.1s', accuracy: '95.9%', recentTasks: [{action:'Forecasted Q4 support ticket volume',time:'10m ago'},{action:'Adjusted shift schedules for next week',time:'1h ago'},{action:'Allocated server capacity for launch',time:'2h ago'},{action:'Identified upcoming resource shortage',time:'4h ago'},{action:'Optimized supply chain routing',time:'6h ago'}], capabilities: ['Demand Forecasting','Shift Scheduling','Capacity Allocation','Logistics Routing','Shortage Prediction','Vendor Synchronization'] } },
  { file: 'app/ai-agent/operations/task-coordinator.tsx', name: 'AI Task Coordinator', title: 'Workflow Dispatch AI', description: 'Automatically routes tasks to the best-suited human or AI agent based on availability and skills.', color: '#E5E5EA', parentName: 'Operations Management AI', metricsConfig: { tasksToday: '1.2k', successRate: '98%', speed: '0.1s', accuracy: '99.1%', recentTasks: [{action:'Routed 50 high-priority tasks',time:'1m ago'},{action:'Reassigned task due to timeout',time:'5m ago'},{action:'Matched skill requirement to Agent-8',time:'12m ago'},{action:'Balanced queue load across team',time:'30m ago'},{action:'Escalated aged ticket to manager',time:'1h ago'}], capabilities: ['Skill-based Routing','Load Balancing','Timeout Management','Priority Escalation','Queue Management','Round-robin Distribution'] } },
  { file: 'app/ai-agent/operations/vendor-management.tsx', name: 'AI Vendor Manager', title: 'Third-Party Operations AI', description: 'Tracks vendor performance, manages SLAs, and handles procurement approvals automatically.', color: '#8E8E93', parentName: 'Operations Management AI', metricsConfig: { tasksToday: '28', successRate: '93%', speed: '1.5s', accuracy: '94.2%', recentTasks: [{action:'Reviewed AWS monthly SLA',time:'20m ago'},{action:'Processed 5 procurement requests',time:'45m ago'},{action:'Flagged missed SLA by Vendor C',time:'2h ago'},{action:'Evaluated 3 new RFPs',time:'4h ago'},{action:'Updated vendor risk scorecard',time:'6h ago'}], capabilities: ['SLA Monitoring','Procurement Approvals','RFP Evaluation','Risk Scoring','Contract Compliance','Spend Tracking'] } },
  { file: 'app/ai-agent/operations/workflow-automation.tsx', name: 'AI Workflow Automation', title: 'Robotic Process AI', description: 'Builds and maintains internal integrations and automates repetitive operational tasks across systems.', color: '#98989D', parentName: 'Operations Management AI', metricsConfig: { tasksToday: '5.4k', successRate: '99%', speed: '0.05s', accuracy: '99.8%', recentTasks: [{action:'Synced CRM data to ERP',time:'30s ago'},{action:'Executed daily database backup',time:'2h ago'},{action:'Triggered onboarding workflow',time:'3h ago'},{action:'Handled API webhook failure',time:'5h ago'},{action:'Processed 500 batch records',time:'6h ago'}], capabilities: ['Data Syncing','API Orchestration','Batch Processing','Error Handling','Trigger Management','System Integration'] } },

  // CUSTOMER EXPERIENCE
  { file: 'app/ai-agent/customer-experience/billing-support.tsx', name: 'AI Billing Support', title: 'Financial Support AI', description: 'Handles all billing queries, processes refunds, and explains complex invoices to customers clearly.', color: '#007AFF', parentName: 'Customer Experience AI', metricsConfig: { tasksToday: '345', successRate: '96%', speed: '0.5s', accuracy: '97.2%', recentTasks: [{action:'Explained pro-rated invoice charge',time:'2m ago'},{action:'Processed $45 refund request',time:'15m ago'},{action:'Updated payment method for Sub-12',time:'25m ago'},{action:'Sent dunning notice for failed payment',time:'1h ago'},{action:'Resolved subscription tier dispute',time:'2h ago'}], capabilities: ['Invoice Explanation','Refund Processing','Payment Updates','Dunning Management','Subscription Upgrades','Dispute Resolution'] } },
  { file: 'app/ai-agent/customer-experience/complaint-handling.tsx', name: 'AI Complaint Handler', title: 'De-escalation AI', description: 'Manages incoming complaints with high emotional intelligence, de-escalates anger, and offers resolutions.', color: '#5AC8FA', parentName: 'Customer Experience AI', metricsConfig: { tasksToday: '89', successRate: '91%', speed: '1.2s', accuracy: '92.5%', recentTasks: [{action:'De-escalated frustrated customer',time:'5m ago'},{action:'Issued 20% apology discount',time:'18m ago'},{action:'Routed severe complaint to supervisor',time:'35m ago'},{action:'Logged product safety issue',time:'1h ago'},{action:'Followed up on resolved complaint',time:'3h ago'}], capabilities: ['Sentiment Analysis','Empathy Engine','Resolution Offers','Supervisor Routing','Root Cause Logging','Follow-up Checks'] } },
  { file: 'app/ai-agent/customer-experience/feedback-survey.tsx', name: 'AI Feedback & Survey', title: 'Voice of Customer AI', description: 'Triggers contextual surveys, categorizes open-text feedback, and identifies product friction points.', color: '#5856D6', parentName: 'Customer Experience AI', metricsConfig: { tasksToday: '1.2k', successRate: '98%', speed: '0.2s', accuracy: '98.8%', recentTasks: [{action:'Categorized 50 NPS comments',time:'10m ago'},{action:'Triggered post-resolution CSAT survey',time:'12m ago'},{action:'Identified trending UX complaint',time:'45m ago'},{action:'Aggregated weekly feature requests',time:'2h ago'},{action:'Flagged 5 at-risk promoters',time:'4h ago'}], capabilities: ['Survey Triggering','NLP Categorization','Trend Analysis','CSAT/NPS Tracking','Churn Risk Detection','Insight Extraction'] } },
  { file: 'app/ai-agent/customer-experience/loyalty-engagement.tsx', name: 'AI Loyalty Program', title: 'Customer Engagement AI', description: 'Manages reward points, triggers milestone celebrations, and drives repeat purchases through engagement.', color: '#AF52DE', parentName: 'Customer Experience AI', metricsConfig: { tasksToday: '450', successRate: '95%', speed: '0.8s', accuracy: '96.3%', recentTasks: [{action:'Awarded 500 points for referral',time:'8m ago'},{action:'Sent VIP tier upgrade email',time:'30m ago'},{action:'Reminded customer of expiring points',time:'1h ago'},{action:'Customized birthday offer',time:'3h ago'},{action:'Analyzed loyalty program ROI',time:'1d ago'}], capabilities: ['Points Management','Milestone Triggers','VIP Tiering','Referral Tracking','Program ROI Analytics','Personalized Rewards'] } },
  { file: 'app/ai-agent/customer-experience/ticket-resolution.tsx', name: 'AI Ticket Resolver', title: 'Tech Support AI', description: 'Diagnoses technical issues, provides step-by-step troubleshooting, and resolves common helpdesk tickets instantly.', color: '#FF9500', parentName: 'Customer Experience AI', metricsConfig: { tasksToday: '890', successRate: '94%', speed: '0.5s', accuracy: '95.1%', recentTasks: [{action:'Resolved password reset ticket',time:'1m ago'},{action:'Diagnosed API connection error',time:'15m ago'},{action:'Provided setup instructions for iOS',time:'22m ago'},{action:'Escalated P1 outage ticket',time:'30m ago'},{action:'Updated knowledge base article flow',time:'2h ago'}], capabilities: ['Diagnostic Trees','Instant Resolution','Documentation Linking','P1/P2 Escalation','Log Analysis','Cross-lingual Support'] } },

  // SOCIAL MEDIA
  { file: 'app/ai-agent/social-media/brand-monitor.tsx', name: 'AI Brand Monitor', title: 'Social Listening AI', description: 'Monitors brand mentions 24/7 across the web, tracks sentiment, and alerts you to PR crises before they blow up.', color: '#1DA1F2', parentName: 'Social Media AI', metricsConfig: { tasksToday: '15.4k', successRate: '99%', speed: '0.1s', accuracy: '99.5%', recentTasks: [{action:'Analyzed 500 Twitter mentions',time:'2m ago'},{action:'Flagged negative sentiment spike',time:'15m ago'},{action:'Tracked competitor campaign hashtag',time:'45m ago'},{action:'Generated daily brand health score',time:'2h ago'},{action:'Identified 3 viral user posts',time:'3h ago'}], capabilities: ['Real-time Listening','Sentiment Scoring','Crisis Alerting','Competitor Tracking','Trend Detection','Share of Voice'] } },
  { file: 'app/ai-agent/social-media/community-manager.tsx', name: 'AI Community Manager', title: 'Community Engagement AI', description: 'Replies to comments, welcomes new members, moderates discussions, and builds a thriving online community.', color: '#007AFF', parentName: 'Social Media AI', metricsConfig: { tasksToday: '850', successRate: '94%', speed: '0.5s', accuracy: '95.2%', recentTasks: [{action:'Replied to 45 IG comments',time:'5m ago'},{action:'Welcomed 12 new Discord members',time:'20m ago'},{action:'Removed 3 spam links from Facebook',time:'35m ago'},{action:'Started weekly discussion thread',time:'1h ago'},{action:'Answered 15 DM product questions',time:'2h ago'}], capabilities: ['Comment Moderation','DM Auto-Replies','Spam Filtering','Discussion Prompts','Member Welcoming','Tone Matching'] } },
  { file: 'app/ai-agent/social-media/content-creator.tsx', name: 'AI Social Content Creator', title: 'Social Content AI', description: 'Generates viral tweets, LinkedIn posts, Instagram captions, and short-form video scripts on demand.', color: '#E1306C', parentName: 'Social Media AI', metricsConfig: { tasksToday: '124', successRate: '93%', speed: '1.5s', accuracy: '94.1%', recentTasks: [{action:'Wrote 5 LinkedIn thought leadership posts',time:'10m ago'},{action:'Drafted TikTok script for feature launch',time:'30m ago'},{action:'Generated 10 Twitter thread hooks',time:'1h ago'},{action:'Created IG carousel copy',time:'2h ago'},{action:'Researched trending audio tracks',time:'4h ago'}], capabilities: ['Hook Generation','Thread Writing','Script Drafting','Hashtag Research','Format Adaptation','Viral Prediction'] } },
  { file: 'app/ai-agent/social-media/engagement-optimizer.tsx', name: 'AI Engagement Optimizer', title: 'Algorithm Optimization AI', description: 'Analyzes past performance to determine the exact best times to post, formats to use, and lengths for maximum reach.', color: '#F56040', parentName: 'Social Media AI', metricsConfig: { tasksToday: '56', successRate: '96%', speed: '2.0s', accuracy: '97.2%', recentTasks: [{action:'Adjusted posting schedule for UTC+1',time:'15m ago'},{action:'Analyzed drop-off in video watch time',time:'45m ago'},{action:'Recommended shorter captions for IG',time:'2h ago'},{action:'Cross-referenced engagement vs time',time:'4h ago'},{action:'Updated content pillar split',time:'6h ago'}], capabilities: ['Timing Optimization','Format Analytics','Retention Analysis','Algorithm Tracking','A/B Test Design','Reach Forecasting'] } },
  { file: 'app/ai-agent/social-media/influencer-outreach.tsx', name: 'AI Influencer Outreach', title: 'Partnerships AI', description: 'Finds niche influencers, verifies their engagement rates, pitches collaborations, and manages campaigns.', color: '#C13584', parentName: 'Social Media AI', metricsConfig: { tasksToday: '312', successRate: '90%', speed: '1.2s', accuracy: '91.5%', recentTasks: [{action:'Scanned 1,000 profiles for brand fit',time:'10m ago'},{action:'Filtered out 45 fake follower accounts',time:'30m ago'},{action:'Sent 50 personalized pitch DMs',time:'1h ago'},{action:'Followed up on 20 pending deals',time:'3h ago'},{action:'Tracked promo code usage for Campaign X',time:'5h ago'}], capabilities: ['Profile Vetting','Fake Follower Detection','Pitch Automation','Contract Negotiation','ROI Tracking','Relationship Management'] } },
  { file: 'app/ai-agent/social-media/post-scheduler.tsx', name: 'AI Post Scheduler', title: 'Content Distribution AI', description: 'Takes approved content and automatically schedules and formats it natively for every specific social platform.', color: '#405DE6', parentName: 'Social Media AI', metricsConfig: { tasksToday: '430', successRate: '99%', speed: '0.2s', accuracy: '99.8%', recentTasks: [{action:'Scheduled 15 posts for next week',time:'5m ago'},{action:'Resized images for Pinterest format',time:'25m ago'},{action:'Cross-posted YouTube short to TikTok',time:'1h ago'},{action:'Added location tags to IG posts',time:'2h ago'},{action:'Verified all API connections',time:'6h ago'}], capabilities: ['Cross-platform Posting','Auto-formatting','Queue Management','Media Resizing','Tagging & Mentions','Evergreen Recycling'] } },
  { file: 'app/ai-agent/social-media/social-ad-manager.tsx', name: 'AI Social Ad Manager', title: 'Paid Social AI', description: 'Manages budgets, optimizes creatives, and shifts ad spend between Facebook, IG, TikTok, and LinkedIn in real-time.', color: '#833AB4', parentName: 'Social Media AI', metricsConfig: { tasksToday: '185', successRate: '92%', speed: '0.8s', accuracy: '93.4%', recentTasks: [{action:'Shifted $500 from FB to TikTok ads',time:'12m ago'},{action:'Paused 5 ad sets with high CPA',time:'40m ago'},{action:'Duplicated winning ad set to scale',time:'1h ago'},{action:'Created 3 new lookalike audiences',time:'3h ago'},{action:'Generated daily ROAS dashboard',time:'4h ago'}], capabilities: ['Budget Shifting','CPA Optimization','Creative Testing','Audience Scaling','Bid Adjustments','Ad Fatigue Detection'] } },
  { file: 'app/ai-agent/social-media/social-analytics.tsx', name: 'AI Social Analytics', title: 'Data Reporting AI', description: 'Aggregates data across all platforms into clean, understandable reports highlighting what worked and why.', color: '#5851DB', parentName: 'Social Media AI', metricsConfig: { tasksToday: '42', successRate: '98%', speed: '2.5s', accuracy: '98.6%', recentTasks: [{action:'Compiled end-of-month social report',time:'10m ago'},{action:'Calculated cross-platform engagement rate',time:'45m ago'},{action:'Attributed 50 website conversions to Social',time:'2h ago'},{action:'Analyzed competitor growth rate',time:'4h ago'},{action:'Presented ROI deck to management',time:'8h ago'}], capabilities: ['Data Aggregation','Conversion Tracking','Executive Reporting','Benchmarking','Visual Charts','Growth Projections'] } },

  // DATA
  { file: 'app/ai-agent/data/competitive-analyst.tsx', name: 'AI Competitive Analyst', title: 'Market Intelligence AI', description: 'Scrapes competitor pricing, features, and reviews to provide real-time battlecards and market positioning data.', color: '#34C759', parentName: 'Data Intelligence AI', metricsConfig: { tasksToday: '215', successRate: '95%', speed: '1.2s', accuracy: '96.1%', recentTasks: [{action:'Detected pricing change on Competitor A',time:'5m ago'},{action:'Scraped 500 new G2 reviews',time:'30m ago'},{action:'Updated sales battlecards',time:'1h ago'},{action:'Analyzed competitor feature release',time:'2h ago'},{action:'Generated market share estimate',time:'6h ago'}], capabilities: ['Web Scraping','Pricing Tracking','Review Sentiment','Battlecard Updates','Feature Comparison','Market Mapping'] } },
  { file: 'app/ai-agent/data/customer-insights.tsx', name: 'AI Customer Insights', title: 'Behavior Analytics AI', description: 'Analyzes user behavior across apps and websites to identify friction points and predict future actions.', color: '#28A745', parentName: 'Data Intelligence AI', metricsConfig: { tasksToday: '3.4k', successRate: '96%', speed: '0.4s', accuracy: '96.8%', recentTasks: [{action:'Analyzed 1,000 onboarding sessions',time:'12m ago'},{action:'Identified 40% drop-off at Step 3',time:'45m ago'},{action:'Segmented power users by feature usage',time:'2h ago'},{action:'Predicted churn for 15 accounts',time:'3h ago'},{action:'Correlated NPS score with usage time',time:'5h ago'}], capabilities: ['Funnel Analysis','Cohort Tracking','Churn Prediction','Usage Segmentation','Friction Detection','LTV Modeling'] } },
  { file: 'app/ai-agent/data/data-analyst.tsx', name: 'AI Data Analyst', title: 'Business Intelligence AI', description: 'Processes complex datasets into clean dashboards and answers ad-hoc business questions via natural language SQL.', color: '#30B050', parentName: 'Data Intelligence AI', metricsConfig: { tasksToday: '128', successRate: '97%', speed: '1.8s', accuracy: '97.5%', recentTasks: [{action:'Wrote complex SQL join for sales data',time:'8m ago'},{action:'Built real-time KPI dashboard',time:'30m ago'},{action:'Cleaned dataset of 50k messy rows',time:'1h ago'},{action:'Answered CEO query on Q3 margins',time:'2h ago'},{action:'Detected anomaly in daily active users',time:'4h ago'}], capabilities: ['Natural Language to SQL','Dashboard Creation','Data Cleansing','Ad-hoc Queries','Anomaly Detection','Statistical Analysis'] } },
  { file: 'app/ai-agent/data/financial-analyst.tsx', name: 'AI Financial Analyst', title: 'Financial Modeling AI', description: 'Builds complex financial models, analyzes P&L statements, and identifies cost-saving opportunities.', color: '#20C997', parentName: 'Data Intelligence AI', metricsConfig: { tasksToday: '45', successRate: '98%', speed: '2.5s', accuracy: '98.7%', recentTasks: [{action:'Updated 3-year P&L projection',time:'15m ago'},{action:'Identified $15k AWS overspend',time:'1h ago'},{action:'Compiled board investor deck',time:'3h ago'},{action:'Modeled impact of 5% price increase',time:'4h ago'},{action:'Calculated departmental CAC/LTV',time:'1d ago'}], capabilities: ['Scenario Modeling','Cost Optimization','P&L Analysis','Unit Economics','Investor Reporting','Margin Analysis'] } },
  { file: 'app/ai-agent/data/forecasting-agent.tsx', name: 'AI Forecasting Agent', title: 'Predictive Modeling AI', description: 'Uses machine learning on historical data to accurately forecast revenue, demand, and resource needs.', color: '#00C7BE', parentName: 'Data Intelligence AI', metricsConfig: { tasksToday: '89', successRate: '93%', speed: '3.1s', accuracy: '94.5%', recentTasks: [{action:'Forecasted Q4 sales revenue +/- 2%',time:'20m ago'},{action:'Predicted inventory requirement for Nov',time:'1h ago'},{action:'Adjusted model for seasonality',time:'3h ago'},{action:'Simulated best/worst case scenarios',time:'5h ago'},{action:'Updated pipeline conversion probabilities',time:'8h ago'}], capabilities: ['Time Series Forecasting','Demand Prediction','Seasonality Adjustments','Revenue Projections','Machine Learning Models','Confidence Intervals'] } },
  { file: 'app/ai-agent/data/fraud-detection.tsx', name: 'AI Fraud Detection', title: 'Security Analytics AI', description: 'Scans thousands of transactions per second to detect and block fraudulent activity with near-zero false positives.', color: '#FF3B30', parentName: 'Data Intelligence AI', metricsConfig: { tasksToday: '45.2k', successRate: '99%', speed: '0.01s', accuracy: '99.9%', recentTasks: [{action:'Blocked 3 high-risk transactions',time:'1m ago'},{action:'Flagged login from unfamiliar IP',time:'5m ago'},{action:'Analyzed behavioral biometric pattern',time:'12m ago'},{action:'Approved $5k wire transfer post-verification',time:'30m ago'},{action:'Updated machine learning ruleset',time:'2h ago'}], capabilities: ['Real-time Blocking','Pattern Recognition','Biometric Analysis','False Positive Reduction','Risk Scoring','Regulatory Compliance'] } },
  { file: 'app/ai-agent/data/risk-analyst.tsx', name: 'AI Risk Analyst', title: 'Enterprise Risk AI', description: 'Quantifies operational and market risks, performs stress testing, and ensures business continuity.', color: '#FF9500', parentName: 'Data Intelligence AI', metricsConfig: { tasksToday: '34', successRate: '96%', speed: '4.0s', accuracy: '96.8%', recentTasks: [{action:'Ran macro-economic stress test',time:'45m ago'},{action:'Updated enterprise risk matrix',time:'2h ago'},{action:'Assessed supply chain vulnerabilities',time:'4h ago'},{action:'Calculated Value at Risk (VaR)',time:'6h ago'},{action:'Generated compliance audit report',time:'1d ago'}], capabilities: ['Stress Testing','VaR Calculation','Risk Matrix Generation','Supply Chain Auditing','Market Volatility Assessment','Mitigation Planning'] } },
  { file: 'app/ai-agent/data/sales-data-analyst.tsx', name: 'AI Sales Data Analyst', title: 'Sales Performance AI', description: 'Analyzes rep performance, optimizes sales territories, and uncovers the highest converting lead sources.', color: '#5AC8FA', parentName: 'Data Intelligence AI', metricsConfig: { tasksToday: '76', successRate: '95%', speed: '1.5s', accuracy: '96.2%', recentTasks: [{action:'Analyzed pipeline velocity by rep',time:'10m ago'},{action:'Re-balanced 3 sales territories',time:'1h ago'},{action:'Identified top performing lead source',time:'2h ago'},{action:'Generated weekly quota attainment report',time:'4h ago'},{action:'Correlated win rate with demo length',time:'7h ago'}], capabilities: ['Pipeline Analytics','Territory Optimization','Rep Scorecards','Lead Source Attribution','Win/Loss Analysis','Quota Tracking'] } },

];

let created = 0;
agents.forEach(agent => {
  const page = makeSubAgentPage(agent);
  // check if dir exists, if not make it
  const dirPath = path.dirname(path.join(process.cwd(), agent.file));
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
  }
  const filePath = path.join(process.cwd(), agent.file);
  fs.writeFileSync(filePath, page, 'utf8');
  created++;
  console.log('Created:', agent.file);
});
console.log('\nTotal created:', created, 'files');
