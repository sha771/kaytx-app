import {
  PhoneCall,
  Calendar,
  Shield,
  MessageSquare,
  Server,
  GitBranch,
  Layers,
  Target,
  Lock,
  Award,
} from 'lucide-react-native';
import type { LucideIcon } from 'lucide-react-native';

export type CapabilityStatus = 'operational' | 'at-risk' | 'expanding';

export interface CapabilityMetric {
  label: string;
  value: string;
  change: string;
  trend: 'up' | 'down' | 'flat';
}

export interface CapabilityAction {
  label: string;
  route: string;
  critical?: boolean;
}

export interface AIAssistantCapability {
  id: string;
  title: string;
  description: string;
  owner: string;
  status: CapabilityStatus;
  readinessScore: number;
  automations: string[];
  metrics: CapabilityMetric[];
  actions: CapabilityAction[];
  icon: LucideIcon;
}

export const aiReceptionistCapabilities: AIAssistantCapability[] = [
  {
    id: 'routing-orchestrator',
    title: 'Omnichannel Routing',
    description: 'Dynamic call, SMS, and chat routing with persona-aware greetings.',
    owner: 'Voice Ops',
    status: 'operational',
    readinessScore: 94,
    automations: ['Adaptive IVR Flows', 'Language detection', 'VIP prioritization'],
    metrics: [
      { label: 'SLA', value: '99.4%', change: '+0.8%', trend: 'up' },
      { label: 'Wait', value: '17s', change: '-5s', trend: 'up' },
    ],
    actions: [
      { label: 'View Call Mesh', route: '/ai-receptionist/call-logs' },
      { label: 'Tune Routing Rules', route: '/ai-receptionist/setup', critical: true },
    ],
    icon: PhoneCall,
  },
  {
    id: 'calendar-savant',
    title: 'Scheduling Brain',
    description: 'Calendar aware booking with conflict resolution + reminders.',
    owner: 'Revenue Ops',
    status: 'expanding',
    readinessScore: 88,
    automations: ['Multi-staff matching', 'Fallback SMS confirmations'],
    metrics: [
      { label: 'Fill Rate', value: '92%', change: '+6%', trend: 'up' },
      { label: 'No-shows', value: '1.9%', change: '-0.4%', trend: 'up' },
    ],
    actions: [
      { label: 'Open Calendar Graph', route: '/ai-receptionist/appointments' },
      { label: 'Configure Templates', route: '/ai-receptionist/training' },
    ],
    icon: Calendar,
  },
  {
    id: 'compliance-guardian',
    title: 'Compliance Guardian',
    description: 'PII redaction, consent capture, and jurisdiction-aware disclaimers.',
    owner: 'Security',
    status: 'operational',
    readinessScore: 90,
    automations: ['Consent playback', 'Auto redaction pipeline'],
    metrics: [
      { label: 'Audit Logs', value: '480 / day', change: '+12%', trend: 'up' },
      { label: 'Escalations', value: '2', change: '+1', trend: 'down' },
    ],
    actions: [
      { label: 'Review Audit Timeline', route: '/ai-receptionist/analytics' },
      { label: 'Policy Studio', route: '/security-privacy', critical: true },
    ],
    icon: Shield,
  },
  {
    id: 'conversation-memory',
    title: 'Conversation Memory',
    description: 'Unified transcript intelligence with topic clustering + emotion cues.',
    owner: 'CX Lab',
    status: 'at-risk',
    readinessScore: 76,
    automations: ['Auto follow-up drafts', 'Knowledge gap detection'],
    metrics: [
      { label: 'Insights', value: '128', change: '+14', trend: 'up' },
      { label: 'Latency', value: '740ms', change: '+120ms', trend: 'down' },
    ],
    actions: [
      { label: 'Open Insight Board', route: '/ai-receptionist/analytics' },
      { label: 'Sync Knowledge Base', route: '/collaboration/file-sharing', critical: true },
    ],
    icon: MessageSquare,
  },
  {
    id: 'infrastructure-watch',
    title: 'Telephony Fabric',
    description: 'Carrier health, failover orchestration, and auto-scaling trunks.',
    owner: 'Platform',
    status: 'operational',
    readinessScore: 89,
    automations: ['Predictive scaling', 'Geo-failover drills'],
    metrics: [
      { label: 'Capacity', value: '12.4k cps', change: '+1.1k', trend: 'up' },
      { label: 'Incidents', value: '0', change: 'flat', trend: 'flat' },
    ],
    actions: [
      { label: 'Open Infrastructure Map', route: '/cloud-infrastructure' },
      { label: 'Run Recovery Drill', route: '/backup', critical: true },
    ],
    icon: Server,
  },
];

export const aiNegotiationCapabilities: AIAssistantCapability[] = [
  {
    id: 'deal-orchestrator',
    title: 'Deal Orchestrator',
    description: 'Pipeline-aware negotiation engine with AI counter tactics.',
    owner: 'Sales Ops',
    status: 'operational',
    readinessScore: 93,
    automations: ['Terms suggestion', 'Stage-based nudges'],
    metrics: [
      { label: 'Velocity', value: '3.2 days', change: '-0.5d', trend: 'up' },
      { label: 'Win Rate', value: '74%', change: '+4%', trend: 'up' },
    ],
    actions: [
      { label: 'Inspect Deal Board', route: '/ai-negotiation/deals' },
      { label: 'Recalibrate Playbooks', route: '/ai-negotiation/scripts' },
    ],
    icon: Target,
  },
  {
    id: 'intel-layer',
    title: 'Market Intelligence',
    description: 'Competitive signals, objection libraries, and pricing guardrails.',
    owner: 'Strategy',
    status: 'expanding',
    readinessScore: 85,
    automations: ['Competitor rebuttals', 'Real-time objection cards'],
    metrics: [
      { label: 'Insight Hits', value: '312', change: '+18', trend: 'up' },
      { label: 'Coverage', value: '86%', change: '+3%', trend: 'up' },
    ],
    actions: [
      { label: 'Launch Intelligence Hub', route: '/analytics/analytics-performance' },
      { label: 'Sync Battlecards', route: '/marketing/content-creation' },
    ],
    icon: Award,
  },
  {
    id: 'risk-governor',
    title: 'Risk Governor',
    description: 'M-score risk tagging, approval thresholds, and legal trails.',
    owner: 'Legal',
    status: 'at-risk',
    readinessScore: 72,
    automations: ['Auto escalation to legal', 'Clause anomaly detection'],
    metrics: [
      { label: 'Approvals', value: '58', change: '+7', trend: 'up' },
      { label: 'Breaches', value: '1', change: '+1', trend: 'down' },
    ],
    actions: [
      { label: 'Open Approval Center', route: '/ai-negotiation/notifications' },
      { label: 'Review Clause Library', route: '/ai-negotiation/templates', critical: true },
    ],
    icon: Lock,
  },
  {
    id: 'automation-stack',
    title: 'Automation Stack',
    description: 'Workflow hand-offs to CRM, CPQ, billing, and fulfillment.',
    owner: 'Integrations',
    status: 'expanding',
    readinessScore: 81,
    automations: ['Bi-directional CRM sync', 'Usage-based pricing pushes'],
    metrics: [
      { label: 'Sync Health', value: '98.2%', change: '+1.1%', trend: 'up' },
      { label: 'APIs', value: '42', change: '+6', trend: 'up' },
    ],
    actions: [
      { label: 'Open Integration Mesh', route: '/automation/integrations' },
      { label: 'Deploy Workflow', route: '/automation/workflow-builder' },
    ],
    icon: GitBranch,
  },
  {
    id: 'conversation-engine',
    title: 'Conversation Engine',
    description: 'Tone-adaptive voice + chat negotiation with transcript labeling.',
    owner: 'AI Lab',
    status: 'operational',
    readinessScore: 91,
    automations: ['Emotion mirroring', 'Coupon guardrails'],
    metrics: [
      { label: 'CSAT', value: '4.8', change: '+0.3', trend: 'up' },
      { label: 'Latency', value: '620ms', change: '-80ms', trend: 'up' },
    ],
    actions: [
      { label: 'Monitor Live Calls', route: '/ai-negotiation/calls' },
      { label: 'Train Models', route: '/ai-negotiation/training' },
    ],
    icon: MessageSquare,
  },
  {
    id: 'governance-matrix',
    title: 'Governance Matrix',
    description: 'Tenant aware access, audit logging, and geo contract routing.',
    owner: 'Enterprise IT',
    status: 'operational',
    readinessScore: 87,
    automations: ['Geo policy enforcement', 'Audit export scheduling'],
    metrics: [
      { label: 'Audit Trails', value: '1.8k', change: '+210', trend: 'up' },
      { label: 'Policies', value: '54', change: '+5', trend: 'up' },
    ],
    actions: [
      { label: 'Open Compliance Hub', route: '/enterprise/compliance' },
      { label: 'Sync Tenants', route: '/enterprise/organization' },
    ],
    icon: Layers,
  },
];
