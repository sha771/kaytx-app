import {
  Activity,
  ChartBarBig,
  Bell,
  Brain,
  Calendar,
  FileText,
  Handshake,
  Headphones,
  Layers,
  MessageSquare,
  Phone,
  Settings,
  Target,
  Users,
  Zap,
} from 'lucide-react-native';
import type { LucideIcon } from 'lucide-react-native';

export type AssistantPageStatus = 'live' | 'beta' | 'planned';

export interface AssistantPageMetric {
  label: string;
  value: string;
  trend?: string;
}

export interface AssistantPageDefinition {
  id: string;
  title: string;
  status: AssistantPageStatus;
  description: string;
  route: string;
  icon: LucideIcon;
  metrics: AssistantPageMetric[];
  automations: string[];
  guardrails: string[];
  escalations: string[];
}

export interface AssistantPlaybook {
  id: string;
  heroStats: AssistantPageMetric[];
  pages: AssistantPageDefinition[];
}

export const aiReceptionistPlaybook: AssistantPlaybook = {
  id: 'ai-receptionist',
  heroStats: [
    { label: 'Answer Rate', value: '96%', trend: '+4%' },
    { label: 'Appointments Booked', value: '487 / wk', trend: '+18%' },
    { label: 'Average Handle', value: '4m 32s', trend: '-36s' },
  ],
  pages: [
    {
      id: 'reception-dashboard',
      title: 'Command Dashboard',
      status: 'live',
      description: 'Live load, queue depth, satisfaction and KPI pulse for every receptionist persona.',
      route: '/ai-receptionist/dashboard',
      icon: Activity,
      metrics: [
        { label: 'Load', value: '328 calls today' },
        { label: 'CSAT', value: '4.8 / 5.0' },
      ],
      automations: ['Adaptive routing mesh', 'Predictive staffing alerts', 'AI insight streaming'],
      guardrails: ['SLA breach alarms', 'Anomaly detection on call spikes'],
      escalations: ['Escalate to Live Ops war-room', 'Trigger backup receptionist pool'],
    },
    {
      id: 'reception-phone-numbers',
      title: 'Telephony Fabric',
      status: 'live',
      description: 'Provision, geo-balance, and forward toll-free, local, and international trunks.',
      route: '/ai-receptionist/phone-numbers',
      icon: Phone,
      metrics: [
        { label: 'Active Numbers', value: '42 global' },
        { label: 'Health', value: '99.995% uptime' },
      ],
      automations: ['Auto-purchase local DID on demand', 'Forwarding blueprint templates'],
      guardrails: ['Carrier failover policies', 'STIR/SHAKEN compliance monitors'],
      escalations: ['Route to Network Ops', 'Engage carrier concierge'],
    },
    {
      id: 'reception-call-logs',
      title: 'Call Intelligence',
      status: 'live',
      description: 'Full-fidelity transcripts, AI summaries, and QoS scoring for every interaction.',
      route: '/ai-receptionist/call-logs',
      icon: FileText,
      metrics: [
        { label: 'Logged Calls', value: '2,847 / wk' },
        { label: 'Sentiment', value: '92% positive' },
      ],
      automations: ['Topic clustering + intent tagging', 'Auto follow-up drafting'],
      guardrails: ['PII redaction pipeline', 'Abusive caller flagging'],
      escalations: ['Escalate to Compliance desk', 'Notify CX leadership'],
    },
    {
      id: 'reception-contacts',
      title: 'Caller CRM',
      status: 'live',
      description: 'Unified caller graph with relationship scoring, tags, and follow-up orchestration.',
      route: '/ai-receptionist/contacts',
      icon: Users,
      metrics: [
        { label: 'Profiles', value: '18,430' },
        { label: 'Follow-ups Due', value: '142' },
      ],
      automations: ['Auto-enrich timezone + preferences', 'VIP pathing + warm intro prompts'],
      guardrails: ['Duplicate detection', 'Consent + DNC enforcement'],
      escalations: ['Escalate to Account owner', 'Sync to CRM task queue'],
    },
    {
      id: 'reception-training',
      title: 'AI Training Studio',
      status: 'live',
      description: 'Persona tuning, script sandboxes, and rapid feedback loops for new scenarios.',
      route: '/ai-receptionist/training',
      icon: Brain,
      metrics: [
        { label: 'Modules', value: '38 live' },
        { label: 'Model Quality', value: '91%' },
      ],
      automations: ['Auto-grade call replays', 'Push hotfix prompts to prod'],
      guardrails: ['Regression test harness', 'Human-in-the-loop approvals'],
      escalations: ['Escalate to AI Lab', 'Freeze deployment to prod'],
    },
    {
      id: 'reception-caller-insights',
      title: 'Caller Insights',
      status: 'live',
      description: 'Heat maps, personas, and intent funnels for every inbound cohort.',
      route: '/ai-receptionist/caller-insights',
      icon: ChartBarBig,
      metrics: [
        { label: 'Persona Accuracy', value: '88%' },
        { label: 'Top Topics', value: 'Pricing • Support • Billing' },
      ],
      automations: ['Dynamic FAQ reinforcement', 'Peak-hour staffing nudges'],
      guardrails: ['Bias watchdog', 'Outlier alerting'],
      escalations: ['Route to RevOps insights pod', 'Auto create experiment brief'],
    },
    {
      id: 'reception-scripts',
      title: 'Script Library',
      status: 'live',
      description: 'Versioned scripts, objection macros, and contextual branching logic.',
      route: '/ai-receptionist/call-scripts',
      icon: FileText,
      metrics: [
        { label: 'Active Flows', value: '64' },
        { label: 'Playbook Win Rate', value: '78%' },
      ],
      automations: ['Auto-insert call snippets', 'Compliance clause injection'],
      guardrails: ['Legal approval gates', 'Change-log + rollback'],
      escalations: ['Escalate to Policy board', 'Trigger script freeze'],
    },
    {
      id: 'reception-appointments',
      title: 'Calendar Brain',
      status: 'live',
      description: 'Multi-staff scheduling, Smart reminders, and double-booking immunity.',
      route: '/ai-receptionist/appointments',
      icon: Calendar,
      metrics: [
        { label: 'Bookings / Day', value: '64' },
        { label: 'No-Show', value: '1.9%' },
      ],
      automations: ['Channel-aware reminders', 'Waitlist auto-fill'],
      guardrails: ['Working-hours policy', 'Escalate conflicting VIP holds'],
      escalations: ['Escalate to Calendar captain', 'Sync to SalesOps scheduling'],
    },
    {
      id: 'reception-analytics',
      title: 'Analytics & Compliance',
      status: 'live',
      description: 'Audit trails, QoS dashboards, and compliance attestations.',
      route: '/ai-receptionist/analytics',
      icon: Layers,
      metrics: [
        { label: 'Audits', value: '480 / day' },
        { label: 'Policy Drift', value: '0.2%' },
      ],
      automations: ['Auto-generate SOC evidence', 'Anomaly alert webhooks'],
      guardrails: ['Immutable ledger', 'Geo-fence enforcement'],
      escalations: ['Escalate to Compliance PMO', 'Generate regulator packet'],
    },
    {
      id: 'reception-integrations',
      title: 'Integration Mesh',
      status: 'live',
      description: 'CRM, calendar, telephony, and ticketing webhooks with health scoring.',
      route: '/ai-receptionist/integrations',
      icon: Zap,
      metrics: [
        { label: 'Connected Apps', value: '32' },
        { label: 'Sync Health', value: '98.7%' },
      ],
      automations: ['Self-healing retries', 'Schema drift detection'],
      guardrails: ['Credential vaulting', 'Scoped permissions'],
      escalations: ['Escalate to Integration SRE', 'Auto-open incident'],
    },
    {
      id: 'reception-notifications',
      title: 'Signal Center',
      status: 'live',
      description: 'Alerting, threshold policies, and team routing for every incident.',
      route: '/ai-receptionist/notifications',
      icon: Bell,
      metrics: [
        { label: 'Alerts / Day', value: '58' },
        { label: 'Response Time', value: '2.1m' },
      ],
      automations: ['Auto triage by severity', 'Handoff to on-call rotations'],
      guardrails: ['Alert fatigue guard', 'Escalation SLA'],
      escalations: ['Page AI Ops lead', 'Sync to PagerDuty'],
    },
    {
      id: 'reception-setup',
      title: 'Setup Orchestrator',
      status: 'beta',
      description: 'Persona builder, pricing knowledge, hours, compliance voice, and fallback playbooks.',
      route: '/ai-receptionist/setup',
      icon: Settings,
      metrics: [
        { label: 'Personas', value: '8 active' },
        { label: 'Coverage', value: '24/7 multi-region' },
      ],
      automations: ['Voice cloning pipeline', 'Knowledge sync validation'],
      guardrails: ['Publishing approvals', 'Version lock + rollback'],
      escalations: ['Escalate to CX Architect', 'Trigger multi-tenant rollback'],
    },
  ],
};

export const aiNegotiationPlaybook: AssistantPlaybook = {
  id: 'ai-negotiation',
  heroStats: [
    { label: 'Pipeline Velocity', value: '3.2 days', trend: '-0.5d' },
    { label: 'Win Rate', value: '74%', trend: '+5%' },
    { label: 'Revenue Run-Rate', value: '$5.3M', trend: '+31%' },
  ],
  pages: [
    {
      id: 'neg-dashboard',
      title: 'Revenue Command',
      status: 'live',
      description: 'Deal radar, live negotiation monitor, and AI insight panels.',
      route: '/ai-negotiation/dashboard',
      icon: Activity,
      metrics: [
        { label: 'Live Calls', value: '57 active' },
        { label: 'Deals Today', value: '12' },
      ],
      automations: ['AI nudges during calls', 'Targeted offers based on persona'],
      guardrails: ['Discount guardrails', 'Approval thresholds'],
      escalations: ['Escalate to Deal Desk', 'Spin up executive sponsor'],
    },
    {
      id: 'neg-calls',
      title: 'Live Call Grid',
      status: 'live',
      description: 'See every negotiation call, whisper coach, and call outcome tracking.',
      route: '/ai-negotiation/calls',
      icon: Phone,
      metrics: [
        { label: 'Call Load', value: '234 / day' },
        { label: 'Coach Interventions', value: '32' },
      ],
      automations: ['Real-time objection cards', 'Auto bookmark key quotes'],
      guardrails: ['Latency watchdog', 'Sensitive topic detection'],
      escalations: ['Escalate to coaching pod', 'Notify compliance'],
    },
    {
      id: 'neg-call-logs',
      title: 'Negotiation Logs',
      status: 'live',
      description: 'Multi-channel transcripts, sentiment scoring, and outcome tagging.',
      route: '/ai-negotiation/call-logs',
      icon: FileText,
      metrics: [
        { label: 'Logged Calls', value: '1,982 / wk' },
        { label: 'Objection Categories', value: '42 tracked' },
      ],
      automations: ['Deal risk scoring', 'Auto follow-up summary'],
      guardrails: ['Confidentiality scrub', 'Contract clause redaction'],
      escalations: ['Escalate to Legal', 'Create remediation task'],
    },
    {
      id: 'neg-phone-numbers',
      title: 'Negotiation Lines',
      status: 'live',
      description: 'Dedicated hotlines per territory with conversion telemetry.',
      route: '/ai-negotiation/phone-numbers',
      icon: Headphones,
      metrics: [
        { label: 'Lines', value: '18 territories' },
        { label: 'Conversion', value: '68%' },
      ],
      automations: ['Auto-assign to closer', 'Geo-routing policies'],
      guardrails: ['Brand-safe greeting validator', 'Spam mitigation'],
      escalations: ['Escalate to Telephony team', 'Fallback to SDR queue'],
    },
    {
      id: 'neg-deals',
      title: 'Deal Pipeline',
      status: 'live',
      description: 'Kanban + forecasting with AI stage health scoring.',
      route: '/ai-negotiation/deals',
      icon: Target,
      metrics: [
        { label: 'Open Deals', value: '342' },
        { label: 'At-Risk', value: '27 flagged' },
      ],
      automations: ['Scenario modeling', 'Auto reminders to stakeholders'],
      guardrails: ['Non-standard terms tracker', 'Margin protection rules'],
      escalations: ['Escalate to CRO', 'Trigger win-room'],
    },
    {
      id: 'neg-crm',
      title: 'Deal CRM',
      status: 'live',
      description: 'Account dossier, influence maps, and contract lineage per company.',
      route: '/ai-negotiation/crm',
      icon: Handshake,
      metrics: [
        { label: 'Accounts', value: '1,126' },
        { label: 'Executive Sponsors', value: '214' },
      ],
      automations: ['Auto-surface champions', 'Renewal risk alerts'],
      guardrails: ['Data residency guard', 'PII encryption'],
      escalations: ['Escalate to Account owner', 'Sync to Success plan'],
    },
    {
      id: 'neg-analytics',
      title: 'Revenue Analytics',
      status: 'live',
      description: 'Funnel analytics, pricing impact, and AI scenario modeling.',
      route: '/ai-negotiation/analytics',
      icon: ChartBarBig,
      metrics: [
        { label: 'ARR Delta', value: '+$1.3M' },
        { label: 'Discount Drift', value: '-2.1%' },
      ],
      automations: ['Auto-generate board packets', 'Deal pacing alerts'],
      guardrails: ['Forecast variance monitors', 'Data quality audits'],
      escalations: ['Escalate to RevOps', 'Open analytics investigation'],
    },
    {
      id: 'neg-appointments',
      title: 'Negotiation Calendar',
      status: 'live',
      description: 'High-value meeting planner with prep packets and post-call automations.',
      route: '/ai-negotiation/appointments',
      icon: Calendar,
      metrics: [
        { label: 'Meetings / Day', value: '48' },
        { label: 'Prep Score', value: '91%' },
      ],
      automations: ['Send prep briefs', 'Auto-log outcomes'],
      guardrails: ['Double-booking prevention', 'Executive blackout rules'],
      escalations: ['Escalate to Deal coordinator', 'Ping executive assistant'],
    },
    {
      id: 'neg-scripts',
      title: 'Playbooks & Templates',
      status: 'live',
      description: 'Email, SMS, and call templates with AI personalization knobs.',
      route: '/ai-negotiation/scripts',
      icon: MessageSquare,
      metrics: [
        { label: 'Templates', value: '112' },
        { label: 'AI Personalization', value: 'Tier-3 ready' },
      ],
      automations: ['Auto-test variants', 'Drop-in legal clauses'],
      guardrails: ['Tone + compliance linter', 'Approval workflow'],
      escalations: ['Escalate to Enablement', 'Notify Legal reviewer'],
    },
    {
      id: 'neg-training',
      title: 'Negotiator Academy',
      status: 'live',
      description: 'Roleplay labs, scoring rubrics, and AI-coached drills.',
      route: '/ai-negotiation/training',
      icon: Brain,
      metrics: [
        { label: 'Active Modules', value: '26' },
        { label: 'Certification Rate', value: '87%' },
      ],
      automations: ['Auto generate coaching plans', 'Surface skill gaps'],
      guardrails: ['Bias review of prompts', 'Version pin for live scripts'],
      escalations: ['Escalate to Enablement lead', 'Pause certification run'],
    },
    {
      id: 'neg-notifications',
      title: 'Negotiation Alerts',
      status: 'live',
      description: 'Deal risk, approvals, and SLA notifications across channels.',
      route: '/ai-negotiation/notifications',
      icon: Bell,
      metrics: [
        { label: 'Pending Approvals', value: '14' },
        { label: 'Breach Alerts', value: '2' },
      ],
      automations: ['Route to deal owner', 'Escalate stalled approvals'],
      guardrails: ['Alert dedupe', 'Routing policies per region'],
      escalations: ['Page Legal approver', 'Trigger CRO digest'],
    },
    {
      id: 'neg-integrations',
      title: 'Integration Fabric',
      status: 'live',
      description: 'CRM, CPQ, billing, and fulfillment sync with conflict resolution.',
      route: '/ai-negotiation/integrations',
      icon: Zap,
      metrics: [
        { label: 'Connectors', value: '28' },
        { label: 'Sync Health', value: '98.2%' },
      ],
      automations: ['Two-way pipeline sync', 'Usage-based billing triggers'],
      guardrails: ['Version pinning', 'Audit logging of payloads'],
      escalations: ['Escalate to Integration squad', 'Open incident with vendor'],
    },
    {
      id: 'neg-setup',
      title: 'Negotiation Setup',
      status: 'beta',
      description: 'Playbook selection, persona tuning, compensation guardrails, and sandbox testing.',
      route: '/ai-negotiation/setup',
      icon: Settings,
      metrics: [
        { label: 'Personas', value: '5 tuned' },
        { label: 'Guardrail Coverage', value: '93%' },
      ],
      automations: ['Auto replicate configs per tenant', 'Drift monitor for pricing tables'],
      guardrails: ['Approval workflow', 'Rollback snapshotting'],
      escalations: ['Escalate to RevOps architect', 'Lock deployments'],
    },
    {
      id: 'neg-caller-insights',
      title: 'Buyer Intelligence',
      status: 'live',
      description: 'Buyer behavior graph with heat signals, objections, and coachability.',
      route: '/ai-negotiation/caller-insights',
      icon: Users,
      metrics: [
        { label: 'Accounts Monitored', value: '618' },
        { label: 'Priority Alerts', value: '19' },
      ],
      automations: ['Auto surface win stories', 'Trigger meddpicc checklist'],
      guardrails: ['Privacy segmentation', 'Compliance tagging'],
      escalations: ['Escalate to Global AE', 'Push to exec briefing'],
    },
    {
      id: 'neg-transcripts',
      title: 'Transcript Memory',
      status: 'live',
      description: 'Semantic search, clause extraction, and AI scorecards for every call.',
      route: '/ai-negotiation/transcripts',
      icon: MessageSquare,
      metrics: [
        { label: 'Transcripts Indexed', value: '12,840' },
        { label: 'Search Latency', value: '620 ms' },
      ],
      automations: ['Auto-tag competitor mentions', 'Contract-ready recap'],
      guardrails: ['PII masking', 'Data residency guard'],
      escalations: ['Escalate to Knowledge Ops', 'Trigger privacy review'],
    },
  ],
};
