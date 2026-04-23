import { Shield, Eye, Lock, Fingerprint, Filter, Ban, Trash2, ClipboardCheck, FileText } from 'lucide-react-native';
import type { AIEmployee } from './aiEmployeesEnhanced';

function createPrivacyAgent(
  id: string, name: string, title: string, desc: string,
  icon: any, color: string, caps: string[], danger: any,
  roi: any, endpoints: string[], avgTime: number
): AIEmployee {
  return {
    id, name, title, description: desc, icon, color, capabilities: caps,
    category: 'security_risk', type: 'agent', dangerLevel: danger,
    hierarchy: { parentId: 'privacy-layer', level: 'specialist', department: 'security_risk' },
    infrastructure: { status: 'online', health: 99, uptime: '99.9%', processingPower: 'enterprise', version: '1.0.0', lastActive: new Date().toISOString() },
    roiMetrics: roi,
    consultingConfig: { canConsult: true, canBeConsulted: true, consultingDomains: ['data_privacy','security','compliance'], expertiseAreas: caps.slice(0,3), consultationPriority: danger === 'critical' ? 'critical' : 'high' },
    a2aCapabilities: { supportsA2A: true, a2aEndpoints: endpoints, consultationStyle: 'analytical', canInitiateConsultation: true, canRespondToConsultation: true, maxConcurrentConsultations: 100, averageResponseTime: avgTime },
  };
}

export const privacyDataClassifier = createPrivacyAgent(
  'privacy-data-classifier','AI Data Classifier','Data Classification Agent',
  'Classifies data sensitivity and type. Detects PII, financial, health, business data.',
  Eye,'#FF5252',
  ['Classify sensitivity levels','Identify data types','Detect PII patterns','Determine masking requirements','Return confidence scores'],
  'critical',
  { savingsPerMonth: '$50,000', tasksAutomatedDaily: 10000, responseTime: '<50ms', accuracyRate: '99.5%' },
  ['/privacy/classify'], 50
);

export const privacyPurposeValidator = createPrivacyAgent(
  'privacy-purpose-validator','AI Purpose Validator','Purpose Validation Agent',
  'Validates business purpose for data access. Checks consent and aggregation rules.',
  ClipboardCheck,'#448AFF',
  ['Validate business purpose','Check consent status','Verify aggregation rules','Set access expiration','Log validation results'],
  'high',
  { savingsPerMonth: '$30,000', tasksAutomatedDaily: 5000, responseTime: '<30ms', accuracyRate: '99.0%' },
  ['/privacy/validate-purpose'], 30
);

export const privacyAccessController = createPrivacyAgent(
  'privacy-access-controller','AI Access Controller','Access Control Agent',
  'Manages role-based permissions with real-time checks and approval workflows.',
  Lock,'#7C4DFF',
  ['RBAC enforcement','Real-time permission checks','Temporary access grants','Approval workflow management','Permission caching'],
  'critical',
  { savingsPerMonth: '$40,000', tasksAutomatedDaily: 8000, responseTime: '<20ms', accuracyRate: '99.9%' },
  ['/privacy/check-permission'], 20
);

export const privacyDataMasker = createPrivacyAgent(
  'privacy-data-masker','AI Data Masker','Data Masking Agent',
  'Sanitizes sensitive data with masking, tokenization, redaction, and encryption.',
  Fingerprint,'#FF6E40',
  ['Partial masking','Tokenization','Redaction','Hashing','Encryption','Format-preserving masking','Batch masking'],
  'high',
  { savingsPerMonth: '$35,000', tasksAutomatedDaily: 15000, responseTime: '<40ms', accuracyRate: '100%' },
  ['/privacy/mask'], 40
);

export const privacyContextFilter = createPrivacyAgent(
  'privacy-context-filter','AI Context Filter','Context Filtering Agent',
  'Filters data based on agent role and task. Enforces need-to-know principle.',
  Filter,'#00BFA5',
  ['Role-based filtering','Task-relevance scoring','Department boundaries','Remove irrelevant fields','Context-aware access'],
  'medium',
  { savingsPerMonth: '$25,000', tasksAutomatedDaily: 12000, responseTime: '<25ms', accuracyRate: '98.5%' },
  ['/privacy/filter'], 25
);

export const privacyPermissionEnforcer = createPrivacyAgent(
  'privacy-permission-enforcer','AI Permission Enforcer','Permission Enforcement Agent',
  'Enforces data access rules in real-time with ALLOW, BLOCK, MASK, REQUIRE_APPROVAL, LOG_ONLY.',
  Ban,'#D50000',
  ['Real-time enforcement','Action determination','Policy rule engine','Dynamic rule evaluation','Violation detection','Real-time blocking'],
  'critical',
  { savingsPerMonth: '$60,000', tasksAutomatedDaily: 20000, responseTime: '<10ms', accuracyRate: '99.9%' },
  ['/privacy/enforce'], 10
);

export const privacyOutputSanitizer = createPrivacyAgent(
  'privacy-output-sanitizer','AI Output Sanitizer','Output Sanitization Agent',
  'Removes internal system data, debug info, and agent traces from outputs before delivery.',
  Trash2,'#00B8D4',
  ['Remove system IDs','Strip debug information','Remove internal notes','Clean agent traces','Filter other customer data','Remove performance metrics'],
  'high',
  { savingsPerMonth: '$20,000', tasksAutomatedDaily: 18000, responseTime: '<35ms', accuracyRate: '99.0%' },
  ['/privacy/sanitize-output'], 35
);

export const privacyComplianceChecker = createPrivacyAgent(
  'privacy-compliance-checker','AI Compliance Checker','Compliance Validation Agent',
  'Validates GDPR, CCPA, HIPAA, PCI DSS, SOC2 compliance with consent and retention checks.',
  Shield,'#00C853',
  ['GDPR validation','CCPA validation','HIPAA PHI protection','PCI DSS security','SOC2 controls','Consent verification','Data minimization','Retention enforcement'],
  'critical',
  { savingsPerMonth: '$100,000', tasksAutomatedDaily: 5000, responseTime: '<60ms', accuracyRate: '99.5%' },
  ['/privacy/check-gdpr','/privacy/check-ccpa'], 60
);

export const privacyAuditLogger = createPrivacyAgent(
  'privacy-audit-logger','AI Audit Logger','Audit Logging Agent',
  'Logs all data access and sharing events. Generates compliance reports and detects anomalies.',
  FileText,'#6200EA',
  ['Log all data access','Record data sharing','Track policy violations','Monitor consent changes','Generate compliance reports','Real-time audit dashboard','Historical search','Anomaly detection'],
  'high',
  { savingsPerMonth: '$45,000', tasksAutomatedDaily: 25000, responseTime: '<15ms', accuracyRate: '99.9%' },
  ['/privacy/log-access','/privacy/audit-report'], 15
);

export const allPrivacyAgents: AIEmployee[] = [
  privacyDataClassifier,
  privacyPurposeValidator,
  privacyAccessController,
  privacyDataMasker,
  privacyContextFilter,
  privacyPermissionEnforcer,
  privacyOutputSanitizer,
  privacyComplianceChecker,
  privacyAuditLogger,
];

export function getPrivacyAgentById(id: string): AIEmployee | undefined {
  return allPrivacyAgents.find(agent => agent.id === id);
}

export function getPrivacyAgentsByGate(gate: 'input' | 'agent' | 'output'): AIEmployee[] {
  const gateMap: Record<string, string[]> = {
    input: ['privacy-data-classifier','privacy-purpose-validator','privacy-access-controller'],
    agent: ['privacy-data-masker','privacy-context-filter','privacy-permission-enforcer'],
    output: ['privacy-output-sanitizer','privacy-compliance-checker','privacy-audit-logger'],
  };
  return allPrivacyAgents.filter(agent => gateMap[gate]?.includes(agent.id));
}
