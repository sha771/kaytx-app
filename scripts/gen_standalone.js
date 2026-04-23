const fs = require('fs');
const path = require('path');

function makeStandalonePage(config) {
  const { name, title, description, color, parentName, metricsConfig } = config;
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
          {[
            { label: 'Task Completion Rate', value: 96, color: '#00C853' },
            { label: 'Quality Score', value: 94, color: ACCENT },
            { label: 'Speed Efficiency', value: 98, color: '#007AFF' },
            { label: 'Learning Progress', value: 88, color: '#5856D6' },
          ].map((bar, i) => (
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

const standaloneAgents = [
  { file: 'app/ai-agent/standalone/ai-account-manager.tsx', name: 'AI Account Manager', title: 'Account Management AI', description: 'Manages client accounts, tracks health scores, and drives retention and expansion revenue.', color: '#007AFF', parentName: 'Standalone Agents', metricsConfig: { tasksToday: '45', successRate: '94%', speed: '1.5s', accuracy: '94.8%', recentTasks: [{action:'Reviewed 8 client health scores',time:'5m ago'},{action:'Sent renewal reminder to Acme Corp',time:'20m ago'},{action:'Created QBR presentation',time:'45m ago'},{action:'Flagged 3 at-risk accounts',time:'1h ago'},{action:'Updated CRM with account notes',time:'2h ago'}], capabilities: ['Account Health Scoring','Renewal Management','QBR Preparation','Churn Risk Detection','Upsell Identification','Client Communication','CRM Integration','Revenue Forecasting'] } },
  { file: 'app/ai-agent/standalone/ai-campaign-optimizer.tsx', name: 'AI Campaign Optimizer', title: 'Marketing Campaign AI', description: 'Optimizes ad campaigns across channels in real-time, maximizing ROAS and conversion efficiency.', color: '#FF6D00', parentName: 'Standalone Agents', metricsConfig: { tasksToday: '234', successRate: '91%', speed: '0.8s', accuracy: '92.1%', recentTasks: [{action:'Reallocated $5K budget to top ad',time:'3m ago'},{action:'Paused 3 underperforming creatives',time:'12m ago'},{action:'A/B tested 2 ad headlines',time:'30m ago'},{action:'Generated campaign performance report',time:'1h ago'},{action:'Updated keyword bids for Google',time:'2h ago'}], capabilities: ['Real-Time Bid Optimization','Budget Reallocation','A/B Creative Testing','ROAS Maximization','Multi-Channel Management','Audience Targeting','KPI Alerting','Competitor Ad Analysis'] } },
  { file: 'app/ai-agent/standalone/ai-cmo.tsx', name: 'AI CMO', title: 'Chief Marketing Officer AI', description: 'Drives marketing strategy, brand vision, and growth at CMO level with AI precision.', color: '#E91E63', parentName: 'Standalone Agents', metricsConfig: { tasksToday: '18', successRate: '93%', speed: '3.0s', accuracy: '93.5%', recentTasks: [{action:'Defined Q4 marketing strategy',time:'10m ago'},{action:'Approved brand campaign brief',time:'35m ago'},{action:'Reviewed MQL funnel performance',time:'1h ago'},{action:'Competitive positioning analysis',time:'2h ago'},{action:'Presented marketing ROI to board',time:'3h ago'}], capabilities: ['Marketing Strategy','Brand Vision','Growth Planning','Budget Allocation','Team Leadership','Campaign Oversight','Market Positioning','Investor Reporting'] } },
  { file: 'app/ai-agent/standalone/ai-competitive-analyst.tsx', name: 'AI Competitive Analyst', title: 'Market Intelligence AI', description: 'Tracks competitors, analyzes market shifts, and provides real-time battlecards and positioning insights.', color: '#9C27B0', parentName: 'Standalone Agents', metricsConfig: { tasksToday: '34', successRate: '92%', speed: '2.5s', accuracy: '92.9%', recentTasks: [{action:'Updated competitor battlecards',time:'8m ago'},{action:'Tracked Salesforce product launch',time:'25m ago'},{action:'Analyzed pricing page changes',time:'45m ago'},{action:'Generated win/loss analysis',time:'1h ago'},{action:'Monitored 12 competitor mentions',time:'2h ago'}], capabilities: ['Competitor Monitoring','Battlecard Creation','Pricing Analysis','Win/Loss Analysis','Market Share Tracking','SWOT Analysis','Feature Comparison','Share of Voice'] } },
  { file: 'app/ai-agent/standalone/ai-competitive-intel.tsx', name: 'AI Competitive Intel', title: 'Competitive Intelligence AI', description: 'Gathers and synthesizes competitive intelligence from news, reviews, job boards, and social signals.', color: '#673AB7', parentName: 'Standalone Agents', metricsConfig: { tasksToday: '89', successRate: '90%', speed: '1.2s', accuracy: '91.2%', recentTasks: [{action:'Scanned 500 reviews on G2/Capterra',time:'5m ago'},{action:'Detected competitor job posting surge',time:'20m ago'},{action:'Tracked product roadmap signals',time:'40m ago'},{action:'Generated intel brief for sales',time:'1h ago'},{action:'Monitored 8 competitor LinkedIn pages',time:'2h ago'}], capabilities: ['Web Scraping','Review Monitoring','Job Board Signals','Social Listening','Patent Tracking','News Monitoring','Tech Stack Detection','Funding Intelligence'] } },
  { file: 'app/ai-agent/standalone/ai-crm-assistant.tsx', name: 'AI CRM Assistant', title: 'CRM Automation AI', description: 'Keeps CRM data clean, enriches records, and automates data entry so sales teams focus on selling.', color: '#00BCD4', parentName: 'Standalone Agents', metricsConfig: { tasksToday: '312', successRate: '97%', speed: '0.3s', accuracy: '97.8%', recentTasks: [{action:'Enriched 45 contact records',time:'2m ago'},{action:'Deduplicated 12 accounts',time:'10m ago'},{action:'Auto-logged 28 email activities',time:'20m ago'},{action:'Updated 5 deal stages',time:'35m ago'},{action:'Synced LinkedIn data to CRM',time:'1h ago'}], capabilities: ['Data Enrichment','Deduplication','Auto-Logging','Sync Automation','Lead Scoring','Pipeline Hygiene','Contact Verification','Activity Capture'] } },
  { file: 'app/ai-agent/standalone/ai-customer-support.tsx', name: 'AI Customer Support', title: 'Customer Support AI', description: 'Resolves customer inquiries instantly across channels with human-quality empathy and accuracy.', color: '#26A69A', parentName: 'Standalone Agents', metricsConfig: { tasksToday: '456', successRate: '94%', speed: '0.5s', accuracy: '94.3%', recentTasks: [{action:'Resolved 45 chat inquiries',time:'1m ago'},{action:'Escalated 3 complex tickets',time:'5m ago'},{action:'Sent 12 proactive follow-ups',time:'15m ago'},{action:'Updated knowledge base with FAQ',time:'30m ago'},{action:'Handled billing dispute for client',time:'45m ago'}], capabilities: ['Multi-Channel Support','Ticket Resolution','Live Chat','Escalation Management','Knowledge Base','CSAT Tracking','Sentiment Analysis','SLA Monitoring'] } },
  { file: 'app/ai-agent/standalone/ai-data-analyst.tsx', name: 'AI Data Analyst', title: 'Business Intelligence AI', description: 'Transforms raw data into actionable insights, dashboards, and predictive forecasts automatically.', color: '#42A5F5', parentName: 'Standalone Agents', metricsConfig: { tasksToday: '78', successRate: '95%', speed: '2.0s', accuracy: '95.7%', recentTasks: [{action:'Analyzed Q3 revenue breakdown',time:'8m ago'},{action:'Built cohort retention analysis',time:'25m ago'},{action:'Flagged anomaly in conversion data',time:'45m ago'},{action:'Created executive dashboard',time:'1h ago'},{action:'Ran predictive churn model',time:'2h ago'}], capabilities: ['Data Analysis','Dashboard Creation','Predictive Modeling','Cohort Analysis','Anomaly Detection','SQL Queries','Data Visualization','Statistical Testing'] } },
  { file: 'app/ai-agent/standalone/ai-lead-dev-rep.tsx', name: 'AI Lead Dev Rep', title: 'Lead Development AI', description: 'Qualifies inbound leads, enriches prospect data, and books meetings for sales reps automatically.', color: '#4CAF50', parentName: 'Standalone Agents', metricsConfig: { tasksToday: '123', successRate: '88%', speed: '1.0s', accuracy: '89.2%', recentTasks: [{action:'Qualified 28 inbound leads',time:'3m ago'},{action:'Booked 5 enterprise demos',time:'18m ago'},{action:'Enriched 34 prospect profiles',time:'35m ago'},{action:'Sent personalized outreach to 20 leads',time:'1h ago'},{action:'Scored leads by ICP fit',time:'2h ago'}], capabilities: ['Lead Qualification','ICP Scoring','Meeting Booking','Data Enrichment','Email Sequencing','CRM Handoff','Intent Signal Tracking','Account Research'] } },
  { file: 'app/ai-agent/standalone/ai-manager.tsx', name: 'AI Manager', title: 'Team Management AI', description: 'Coordinates team tasks, tracks OKRs, manages project timelines, and removes blockers.', color: '#FF7043', parentName: 'Standalone Agents', metricsConfig: { tasksToday: '56', successRate: '91%', speed: '1.5s', accuracy: '91.8%', recentTasks: [{action:'Assigned 12 tasks across team',time:'5m ago'},{action:'Updated project timeline',time:'20m ago'},{action:'Identified 2 critical blockers',time:'35m ago'},{action:'Generated team productivity report',time:'1h ago'},{action:'Ran standup summary digest',time:'2h ago'}], capabilities: ['Task Assignment','OKR Tracking','Project Management','Blocker Detection','Team Reporting','Capacity Planning','1:1 Prep','Performance Summaries'] } },
  { file: 'app/ai-agent/standalone/ai-marketer.tsx', name: 'AI Marketer', title: 'Digital Marketing AI', description: 'Executes multi-channel marketing campaigns, creates content, and optimizes for growth.', color: '#AB47BC', parentName: 'Standalone Agents', metricsConfig: { tasksToday: '89', successRate: '90%', speed: '1.8s', accuracy: '90.9%', recentTasks: [{action:'Scheduled 8 social media posts',time:'5m ago'},{action:'Wrote 3 blog post outlines',time:'20m ago'},{action:'Launched email nurture sequence',time:'40m ago'},{action:'Optimized landing page copy',time:'1h ago'},{action:'Generated weekly marketing report',time:'2h ago'}], capabilities: ['Content Creation','Email Marketing','Social Media','SEO Optimization','Campaign Management','Landing Pages','Performance Tracking','Audience Segmentation'] } },
  { file: 'app/ai-agent/standalone/ai-memory-context.tsx', name: 'AI Memory Context', title: 'Persistent Memory AI', description: 'Maintains long-term context and memory across all agent interactions for consistent personalization.', color: '#78909C', parentName: 'Standalone Agents', metricsConfig: { tasksToday: '1204', successRate: '99%', speed: '0.05s', accuracy: '99.9%', recentTasks: [{action:'Stored context from sales call',time:'1m ago'},{action:'Retrieved user preference for report format',time:'3m ago'},{action:'Updated contact relationship map',time:'8m ago'},{action:'Synced memory across 5 agents',time:'15m ago'},{action:'Compressed 30-day interaction log',time:'30m ago'}], capabilities: ['Long-Term Memory','Context Retrieval','User Preference Learning','Cross-Agent Memory Sync','Interaction History','Personalization Engine','Memory Compression','Privacy Controls'] } },
  { file: 'app/ai-agent/standalone/ai-negotiation-specialist.tsx', name: 'AI Negotiation Specialist', title: 'Deal Negotiation AI', description: 'Optimizes deal terms, coaches negotiation strategy, and helps close deals at best possible terms.', color: '#EF5350', parentName: 'Standalone Agents', metricsConfig: { tasksToday: '23', successRate: '89%', speed: '2.5s', accuracy: '90.1%', recentTasks: [{action:'Analyzed 3 contract redlines',time:'10m ago'},{action:'Suggested counter-offer strategy',time:'30m ago'},{action:'Prepared negotiation brief',time:'1h ago'},{action:'Coached rep on pricing objection',time:'2h ago'},{action:'Saved $28K in procurement deal',time:'3h ago'}], capabilities: ['Deal Analysis','Counter-Offer Strategy','Contract Review','Objection Coaching','BATNA Analysis','Pricing Defense','Concession Mapping','Win Probability'] } },
  { file: 'app/ai-agent/standalone/ai-negotiator.tsx', name: 'AI Negotiator', title: 'Autonomous Negotiation AI', description: 'Conducts real-time negotiations autonomously within defined parameters to close favorable deals.', color: '#F44336', parentName: 'Standalone Agents', metricsConfig: { tasksToday: '12', successRate: '87%', speed: '3.0s', accuracy: '88.4%', recentTasks: [{action:'Negotiated vendor renewal — saved 15%',time:'15m ago'},{action:'Counter-offered on SaaS contract',time:'45m ago'},{action:'Reached agreement on SLA terms',time:'1h ago'},{action:'Escalated deal above authority',time:'2h ago'},{action:'Completed procurement negotiation',time:'3h ago'}], capabilities: ['Real-Time Negotiation','Autonomous Offers','Parameter-Bound Decisions','Escalation Logic','Deal Documentation','Savings Tracking','Compliance Guardrails','Post-Deal Summary'] } },
  { file: 'app/ai-agent/standalone/ai-operations-manager.tsx', name: 'AI Operations Manager', title: 'Operations Coordination AI', description: 'Manages day-to-day operational workflows, vendor coordination, and cross-functional execution.', color: '#FF8F00', parentName: 'Standalone Agents', metricsConfig: { tasksToday: '67', successRate: '93%', speed: '1.5s', accuracy: '93.7%', recentTasks: [{action:'Coordinated 5 cross-team workflows',time:'5m ago'},{action:'Resolved supply chain delay',time:'20m ago'},{action:'Updated SOP documentation',time:'40m ago'},{action:'Managed vendor onboarding',time:'1h ago'},{action:'Generated operations status report',time:'2h ago'}], capabilities: ['Workflow Coordination','Vendor Management','Process Documentation','SOP Management','Resource Allocation','Incident Management','Ops Reporting','KPI Monitoring'] } },
  { file: 'app/ai-agent/standalone/ai-pricing-strategist.tsx', name: 'AI Pricing Strategist', title: 'Dynamic Pricing AI', description: 'Analyzes market conditions, competitor pricing, and elasticity to optimize pricing for maximum revenue.', color: '#00897B', parentName: 'Standalone Agents', metricsConfig: { tasksToday: '34', successRate: '92%', speed: '2.0s', accuracy: '92.6%', recentTasks: [{action:'Analyzed competitor pricing changes',time:'8m ago'},{action:'Recommended 8% price increase for Pro',time:'25m ago'},{action:'Built price elasticity model',time:'50m ago'},{action:'Simulated discount impact on margin',time:'1h ago'},{action:'Updated pricing tier recommendations',time:'2h ago'}], capabilities: ['Price Elasticity Modeling','Competitive Pricing','Discount Analysis','Revenue Optimization','Margin Protection','Tiered Packaging','Dynamic Rules','A/B Price Testing'] } },
  { file: 'app/ai-agent/standalone/ai-product-manager.tsx', name: 'AI Product Manager', title: 'Product Intelligence AI', description: 'Manages product lifecycle from discovery to launch with data-driven prioritization and roadmapping.', color: '#5E35B1', parentName: 'Standalone Agents', metricsConfig: { tasksToday: '28', successRate: '92%', speed: '2.2s', accuracy: '92.3%', recentTasks: [{action:'Updated product roadmap Q4',time:'10m ago'},{action:'Prioritized 8 backlog items by RICE',time:'30m ago'},{action:'Created PRD for auth redesign',time:'1h ago'},{action:'Defined success metrics for feature',time:'2h ago'},{action:'Ran product review with engineering',time:'3h ago'}], capabilities: ['Roadmap Management','Feature Prioritization','PRD Writing','Stakeholder Alignment','Metrics Definition','Launch Planning','User Feedback Synthesis','OKR Alignment'] } },
  { file: 'app/ai-agent/standalone/ai-proposal-generator.tsx', name: 'AI Proposal Generator', title: 'Sales Proposal AI', description: 'Creates compelling, personalized sales proposals and RFP responses that close deals faster.', color: '#1976D2', parentName: 'Standalone Agents', metricsConfig: { tasksToday: '34', successRate: '91%', speed: '3.5s', accuracy: '91.8%', recentTasks: [{action:'Generated proposal for Acme Corp',time:'5m ago'},{action:'Responded to RFP from TechCo',time:'25m ago'},{action:'Personalized deck for enterprise deal',time:'45m ago'},{action:'Created ROI calculator for client',time:'1h ago'},{action:'Drafted SOW for new project',time:'2h ago'}], capabilities: ['Proposal Writing','RFP Responses','ROI Calculators','SOW Creation','Personalization','Competitive Positioning','Deal Summary','eSign Integration'] } },
  { file: 'app/ai-agent/standalone/ai-receptionist.tsx', name: 'AI Receptionist', title: 'Virtual Receptionist AI', description: 'Handles inbound calls, routes inquiries, schedules appointments, and greets visitors professionally.', color: '#00ACC1', parentName: 'Standalone Agents', metricsConfig: { tasksToday: '189', successRate: '96%', speed: '0.3s', accuracy: '96.4%', recentTasks: [{action:'Answered 45 inbound calls',time:'1m ago'},{action:'Scheduled 12 appointments',time:'10m ago'},{action:'Routed 8 calls to departments',time:'20m ago'},{action:'Handled visitor check-in',time:'30m ago'},{action:'Sent meeting confirmations',time:'45m ago'}], capabilities: ['Call Handling','Appointment Scheduling','Call Routing','Visitor Management','Message Taking','After-Hours Coverage','Multi-Language','CRM Logging'] } },
  { file: 'app/ai-agent/standalone/ai-recruiter.tsx', name: 'AI Recruiter', title: 'Standalone Recruiting AI', description: 'Autonomously sources, screens, and pipelines top talent for any role at scale.', color: '#43A047', parentName: 'Standalone Agents', metricsConfig: { tasksToday: '78', successRate: '93%', speed: '1.2s', accuracy: '93.8%', recentTasks: [{action:'Sourced 30 senior engineers',time:'3m ago'},{action:'Screened 45 resumes by JD match',time:'15m ago'},{action:'Sent outreach to 20 passives',time:'30m ago'},{action:'Scheduled 8 phone screens',time:'1h ago'},{action:'Updated candidate pipeline in ATS',time:'2h ago'}], capabilities: ['Talent Sourcing','Resume Screening','Outreach Automation','Interview Scheduling','Candidate Ranking','Diversity Sourcing','ATS Integration','Offer Coordination'] } },
  { file: 'app/ai-agent/standalone/ai-retention-specialist.tsx', name: 'AI Retention Specialist', title: 'Customer Retention AI', description: 'Predicts churn risk, deploys retention interventions, and drives net revenue retention.', color: '#039BE5', parentName: 'Standalone Agents', metricsConfig: { tasksToday: '56', successRate: '90%', speed: '1.8s', accuracy: '91.3%', recentTasks: [{action:'Identified 5 high-churn risk accounts',time:'8m ago'},{action:'Triggered save campaign for at-risk customer',time:'25m ago'},{action:'Generated NRR report for Q3',time:'45m ago'},{action:'Analyzed cancel survey responses',time:'1h ago'},{action:'Created win-back email sequence',time:'2h ago'}], capabilities: ['Churn Prediction','Risk Scoring','Save Campaigns','Win-Back Sequences','NRR Optimization','Usage Analytics','NPS Correlation','Expansion Revenue'] } },
  { file: 'app/ai-agent/standalone/ai-sales-agent.tsx', name: 'AI Sales Agent', title: 'Autonomous Sales AI', description: 'Prospects, qualifies, pitches, and closes deals autonomously within your defined sales process.', color: '#388E3C', parentName: 'Standalone Agents', metricsConfig: { tasksToday: '145', successRate: '87%', speed: '1.0s', accuracy: '88.2%', recentTasks: [{action:'Sent 50 personalized outreach emails',time:'2m ago'},{action:'Qualified 12 new leads',time:'12m ago'},{action:'Moved 5 deals to proposal stage',time:'30m ago'},{action:'Closed $24K SMB deal autonomously',time:'1h ago'},{action:'Scheduled 8 discovery calls',time:'2h ago'}], capabilities: ['Prospecting','Lead Qualification','Personalized Outreach','Pipeline Management','Demo Scheduling','Objection Handling','Deal Closing','CRM Automation'] } },
  { file: 'app/ai-agent/standalone/ai-sales-data-analyst.tsx', name: 'AI Sales Data Analyst', title: 'Sales Intelligence AI', description: 'Transforms sales data into actionable insights, forecasts, and performance recommendations.', color: '#2E7D32', parentName: 'Standalone Agents', metricsConfig: { tasksToday: '67', successRate: '94%', speed: '2.0s', accuracy: '94.6%', recentTasks: [{action:'Built Q3 sales performance dashboard',time:'10m ago'},{action:'Identified top 5 revenue drivers',time:'30m ago'},{action:'Forecasted Q4 pipeline accuracy',time:'1h ago'},{action:'Analyzed win/loss by segment',time:'2h ago'},{action:'Generated rep leaderboard report',time:'3h ago'}], capabilities: ['Sales Forecasting','Pipeline Analysis','Win/Loss Analytics','Rep Performance','Territory Analysis','Revenue Attribution','Quota Attainment','Deal Velocity Tracking'] } },
  { file: 'app/ai-agent/standalone/ai-sales-executive.tsx', name: 'AI Sales Executive', title: 'Enterprise Sales AI', description: 'Manages complex enterprise sales cycles, builds executive relationships, and drives strategic deals.', color: '#1B5E20', parentName: 'Standalone Agents', metricsConfig: { tasksToday: '23', successRate: '89%', speed: '3.0s', accuracy: '89.7%', recentTasks: [{action:'Managed Fortune 500 deal at $500K',time:'15m ago'},{action:'Prepared executive briefing doc',time:'45m ago'},{action:'Coordinated multi-stakeholder demo',time:'1h ago'},{action:'Navigated procurement negotiation',time:'2h ago'},{action:'Created champion enablement kit',time:'3h ago'}], capabilities: ['Enterprise Sales Cycles','Executive Engagement','Multi-Stakeholder Navigation','Procurement Management','Deal Strategy','Champion Building','Contract Negotiation','Revenue Forecasting'] } },
  { file: 'app/ai-agent/standalone/ai-sales-rep.tsx', name: 'AI Sales Rep', title: 'Outbound Sales AI', description: 'Executes high-volume outbound prospecting, personalized outreach, and meeting generation at scale.', color: '#558B2F', parentName: 'Standalone Agents', metricsConfig: { tasksToday: '200', successRate: '88%', speed: '0.8s', accuracy: '89.1%', recentTasks: [{action:'Sent 100 personalized sequences',time:'2m ago'},{action:'Booked 8 qualified meetings',time:'15m ago'},{action:'Researched 20 target accounts',time:'30m ago'},{action:'Updated sequences in Outreach',time:'45m ago'},{action:'Tracked reply rates across campaigns',time:'1h ago'}], capabilities: ['Outbound Prospecting','Email Sequences','LinkedIn Automation','Meeting Booking','Account Research','Cadence Management','Reply Detection','Calendar Integration'] } },
  { file: 'app/ai-agent/standalone/ai-social-media-manager.tsx', name: 'AI Social Media Manager', title: 'Social Content AI', description: 'Creates, schedules, and analyzes social content across all platforms to grow brand presence.', color: '#F06292', parentName: 'Standalone Agents', metricsConfig: { tasksToday: '89', successRate: '92%', speed: '1.2s', accuracy: '92.7%', recentTasks: [{action:'Scheduled 12 posts across platforms',time:'5m ago'},{action:'Generated 5 viral thread concepts',time:'20m ago'},{action:'Replied to 34 comments',time:'40m ago'},{action:'Analyzed top performing content',time:'1h ago'},{action:'Created Instagram Reel script',time:'2h ago'}], capabilities: ['Content Creation','Multi-Platform Scheduling','Engagement Monitoring','Performance Analytics','Trend Identification','Brand Voice Consistency','Hashtag Strategy','Community Management'] } },
  { file: 'app/ai-agent/standalone/ai-upsell-crosssell.tsx', name: 'AI Upsell & Cross-Sell', title: 'Revenue Expansion AI', description: 'Identifies upsell and cross-sell opportunities across the customer base to expand revenue automatically.', color: '#F4511E', parentName: 'Standalone Agents', metricsConfig: { tasksToday: '78', successRate: '88%', speed: '1.5s', accuracy: '89.4%', recentTasks: [{action:'Identified 12 upsell opportunities',time:'8m ago'},{action:'Triggered cross-sell for Acme Corp',time:'25m ago'},{action:'Generated expansion playbook',time:'45m ago'},{action:'Tracked $45K expansion pipeline',time:'1h ago'},{action:'Sent personalized upgrade offers',time:'2h ago'}], capabilities: ['Usage-Based Signals','Upsell Identification','Cross-Sell Triggers','Expansion Playbooks','Product Adoption Tracking','Revenue Forecasting','Personalized Offers','ROI Case Studies'] } },
];

let created = 0;
standaloneAgents.forEach(agent => {
  const page = makeStandalonePage(agent);
  const filePath = path.join(process.cwd(), agent.file);
  fs.writeFileSync(filePath, page, 'utf8');
  created++;
  console.log('Created:', agent.file);
});
console.log('\nTotal created:', created, 'standalone agent pages');
