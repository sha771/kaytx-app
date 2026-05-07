#!/usr/bin/env node
/**
 * Generate remaining administrative and AI Management sub-agents
 * Creates 45 sub-agent pages (27 Administrative + 18 AI Management)
 */

const fs = require('fs');
const path = require('path');

const ADMIN_SUBAGENTS = [
  // Office Manager (3 sub-agents)
  { name: 'meeting-room-booker', parent: 'ai-office-manager', parentRoute: '/ai-agent/administrative/ai-office-manager', icon: 'DoorOpen', color: '#3B82F6', badge: 'Booking', capabilities: ['Room Scheduling', 'Conflict Resolution', 'Amenity Management', 'Capacity Planning', 'Usage Analytics', 'Cleaning Coordination', 'Equipment Setup', 'Catering Coordination'], department: 'Office Manager' },
  { name: 'supply-orderer', parent: 'ai-office-manager', parentRoute: '/ai-agent/administrative/ai-office-manager', icon: 'ShoppingCart', color: '#F59E0B', badge: 'Procurement', capabilities: ['Supply Tracking', 'Vendor Management', 'Order Automation', 'Budget Control', 'Usage Forecasting', 'Quality Assurance', 'Delivery Coordination', 'Stock Optimization'], department: 'Office Manager' },
  { name: 'visitor-host', parent: 'ai-office-manager', parentRoute: '/ai-agent/administrative/ai-office-manager', icon: 'UserPlus', color: '#10B981', badge: 'Reception', capabilities: ['Visitor Check-in', 'Badge Management', 'Notification System', 'Security Coordination', 'NDA Management', 'Badge Tracking', 'Parking Coordination', 'Hospitality Services'], department: 'Office Manager' },
  
  // Executive Assistant (3 sub-agents)
  { name: 'calendar-optimizer', parent: 'ai-executive-assistant', parentRoute: '/ai-agent/administrative/ai-executive-assistant', icon: 'CalendarCheck', color: '#8B5CF6', badge: 'Calendar', capabilities: ['Schedule Optimization', 'Priority Management', 'Conflict Resolution', 'Preparation Reminders', 'Travel Buffer', 'Focus Time', 'Meeting Prep', 'Follow-up Tracking'], department: 'Executive Assistant' },
  { name: 'travel-booker', parent: 'ai-executive-assistant', parentRoute: '/ai-agent/administrative/ai-executive-assistant', icon: 'Plane', color: '#06B6D4', badge: 'Travel', capabilities: ['Flight Booking', 'Hotel Reservations', 'Ground Transport', 'Itinerary Management', 'Policy Compliance', 'Loyalty Programs', 'Expense Integration', 'Crisis Support'], department: 'Executive Assistant' },
  { name: 'correspondence-drafter', parent: 'ai-executive-assistant', parentRoute: '/ai-agent/administrative/ai-executive-assistant', icon: 'Mail', color: '#EC4899', badge: 'Comms', capabilities: ['Email Drafting', 'Letter Writing', 'Tone Matching', 'Response Prioritization', 'Follow-up Tracking', 'Template Library', 'Proofreading', 'Approval Routing'], department: 'Executive Assistant' },
  
  // Facilities Coordinator (3 sub-agents)
  { name: 'work-order-manager', parent: 'ai-facilities-coordinator', parentRoute: '/ai-agent/administrative/ai-facilities-coordinator', icon: 'ClipboardList', color: '#F97316', badge: 'Operations', capabilities: ['Ticket Creation', 'Priority Assignment', 'Vendor Dispatch', 'Progress Tracking', 'Quality Control', 'Cost Tracking', 'SLA Monitoring', 'Closure Management'], department: 'Facilities Coordinator' },
  { name: 'vendor-liaison', parent: 'ai-facilities-coordinator', parentRoute: '/ai-agent/administrative/ai-facilities-coordinator', icon: 'Handshake', color: '#84CC16', badge: 'Relations', capabilities: ['Contract Management', 'Performance Tracking', 'Issue Resolution', 'Payment Coordination', 'Service Review', 'Compliance Check', 'Escalation Handling', 'Relationship Building'], department: 'Facilities Coordinator' },
  { name: 'inspection-scheduler', parent: 'ai-facilities-coordinator', parentRoute: '/ai-agent/administrative/ai-facilities-coordinator', icon: 'Search', color: '#6366F1', badge: 'Inspection', capabilities: ['Audit Planning', 'Checklist Management', 'Inspector Coordination', 'Finding Tracking', 'Remediation Planning', 'Documentation', 'Compliance Reporting', 'Risk Assessment'], department: 'Facilities Coordinator' },
  
  // Travel Coordinator (3 sub-agents)
  { name: 'itinerary-planner', parent: 'ai-travel-coordinator', parentRoute: '/ai-agent/administrative/ai-travel-coordinator', icon: 'Map', color: '#14B8A6', badge: 'Planning', capabilities: ['Route Optimization', 'Time Zone Management', 'Activity Planning', 'Local Recommendations', 'Weather Monitoring', 'Cultural Guidelines', 'Safety Advisories', 'Emergency Contacts'], department: 'Travel Coordinator' },
  { name: 'expense-reporter', parent: 'ai-travel-coordinator', parentRoute: '/ai-agent/administrative/ai-travel-coordinator', icon: 'Receipt', color: '#EAB308', badge: 'Expenses', capabilities: ['Receipt Capture', 'Policy Compliance', 'Automatic Categorization', 'Currency Conversion', 'Report Generation', 'Approval Routing', 'Reimbursement Tracking', 'Audit Trail'], department: 'Travel Coordinator' },
  { name: 'visa-documenter', parent: 'ai-travel-coordinator', parentRoute: '/ai-agent/administrative/ai-travel-coordinator', icon: 'FileText', color: '#A855F7', badge: 'Documents', capabilities: ['Requirement Research', 'Application Preparation', 'Document Verification', 'Status Tracking', 'Renewal Alerts', 'Embassy Liaison', 'Emergency Processing', 'Compliance Check'], department: 'Travel Coordinator' },
  
  // Document Controller (3 sub-agents)
  { name: 'version-manager', parent: 'ai-document-controller', parentRoute: '/ai-agent/administrative/ai-document-controller', icon: 'GitBranch', color: '#3B82F6', badge: 'Versioning', capabilities: ['Version Control', 'Change Tracking', 'Approval Workflow', 'Comparison Analysis', 'Rollback Management', 'Audit Trail', 'Branch Management', 'Merge Resolution'], department: 'Document Controller' },
  { name: 'archive-organizer', parent: 'ai-document-controller', parentRoute: '/ai-agent/administrative/ai-document-controller', icon: 'Archive', color: '#6B7280', badge: 'Archiving', capabilities: ['Retention Planning', 'Storage Optimization', 'Search Indexing', 'Migration Management', 'Disaster Recovery', 'Legal Hold', 'Destruction Scheduling', 'Compliance Archive'], department: 'Document Controller' },
  { name: 'access-controller', parent: 'ai-document-controller', parentRoute: '/ai-agent/administrative/ai-document-controller', icon: 'Lock', color: '#DC2626', badge: 'Security', capabilities: ['Permission Management', 'Role Assignment', 'Access Logging', 'Security Review', 'Classification', 'NDA Tracking', 'Watermarking', 'Expiry Management'], department: 'Document Controller' },
];

const AI_MGMT_SUBAGENTS = [
  // Chief Automation Officer (3 sub-agents)
  { name: 'automation-strategy-advisor', parent: 'cao-automation', parentRoute: '/ai-agent/executive/cao-automation', icon: 'Lightbulb', color: '#F59E0B', badge: 'Strategy', capabilities: ['Automation Roadmap', 'ROI Analysis', 'Technology Assessment', 'Best Practice Advisory', 'Competitive Analysis', 'Innovation Scouting', 'Risk Evaluation', 'Investment Planning'], department: 'CAO' },
  { name: 'roi-calculator', parent: 'cao-automation', parentRoute: '/ai-agent/executive/cao-automation', icon: 'Calculator', color: '#10B981', badge: 'Analytics', capabilities: ['Cost-Benefit Analysis', 'Efficiency Metrics', 'Time Savings', 'Error Reduction', 'Productivity Gains', 'Payback Period', 'NPV Calculation', 'Scenario Modeling'], department: 'CAO' },
  { name: 'technology-evaluator', parent: 'cao-automation', parentRoute: '/ai-agent/executive/cao-automation', icon: 'Microscope', color: '#3B82F6', badge: 'Evaluation', capabilities: ['Vendor Assessment', 'Feature Comparison', 'Integration Analysis', 'Scalability Testing', 'Security Review', 'Support Evaluation', 'Pricing Analysis', 'Reference Checking'], department: 'CAO' },
  
  // VP Automation (3 sub-agents)
  { name: 'automation-pipeline-manager', parent: 'vp-automation', parentRoute: '/ai-agent/executive/vp-automation', icon: 'GitMerge', color: '#8B5CF6', badge: 'Pipeline', capabilities: ['Process Identification', 'Priority Ranking', 'Resource Allocation', 'Timeline Management', 'Dependency Mapping', 'Progress Tracking', 'Quality Gates', 'Deployment Coordination'], department: 'VP Automation' },
  { name: 'tool-selector', parent: 'vp-automation', parentRoute: '/ai-agent/executive/vp-automation', icon: 'Tool', color: '#06B6D4', badge: 'Tools', capabilities: ['Requirements Gathering', 'Vendor Shortlist', 'Proof of Concept', 'Integration Testing', 'User Acceptance', 'License Negotiation', 'Implementation Planning', 'Training Coordination'], department: 'VP Automation' },
  { name: 'implementation-planner', parent: 'vp-automation', parentRoute: '/ai-agent/executive/vp-automation', icon: 'ListChecks', color: '#EC4899', badge: 'Planning', capabilities: ['Project Scoping', 'Resource Planning', 'Risk Assessment', 'Timeline Creation', 'Milestone Definition', 'Stakeholder Mapping', 'Change Management', 'Go-Live Planning'], department: 'VP Automation' },
  
  // VP Process Excellence (3 sub-agents)
  { name: 'process-miner', parent: 'vp-process-excellence', parentRoute: '/ai-agent/executive/vp-process-excellence', icon: 'Pickaxe', color: '#F97316', badge: 'Mining', capabilities: ['Event Log Analysis', 'Process Discovery', 'Variant Analysis', 'Bottleneck Detection', 'Conformance Checking', 'Performance Mining', 'Social Mining', 'Predictive Analytics'], department: 'VP Process Excellence' },
  { name: 'maturity-assessor', parent: 'vp-process-excellence', parentRoute: '/ai-agent/executive/vp-process-excellence', icon: 'BarChart3', color: '#14B8A6', badge: 'Assessment', capabilities: ['Capability Mapping', 'Gap Analysis', 'Level Assessment', 'Roadmap Creation', 'Benchmark Comparison', 'Improvement Planning', 'Progress Tracking', 'Certification Support'], department: 'VP Process Excellence' },
  { name: 'benchmark-analyzer', parent: 'vp-process-excellence', parentRoute: '/ai-agent/executive/vp-process-excellence', icon: 'Scale', color: '#6366F1', badge: 'Benchmark', capabilities: ['Industry Research', 'Metric Comparison', 'Best Practice Study', 'Competitive Analysis', 'Trend Analysis', 'KPI Definition', 'Target Setting', 'Gap Closure'], department: 'VP Process Excellence' },
  
  // AOD Lead (3 sub-agents)
  { name: 'automation-runbook-author', parent: 'aod-lead', parentRoute: '/ai-agent/executive/aod-lead', icon: 'BookOpen', color: '#A855F7', badge: 'Documentation', capabilities: ['Step Documentation', 'Screenshot Capture', 'Video Recording', 'Decision Mapping', 'Exception Handling', 'Troubleshooting Guide', 'FAQ Creation', 'Version Control'], department: 'AOD Lead' },
  { name: 'exception-handler', parent: 'aod-lead', parentRoute: '/ai-agent/executive/aod-lead', icon: 'AlertTriangle', color: '#DC2626', badge: 'Exceptions', capabilities: ['Error Detection', 'Classification', 'Routing Logic', 'Escalation Rules', 'Resolution Tracking', 'Pattern Analysis', 'Prevention Planning', 'Reporting'], department: 'AOD Lead' },
  { name: 'performance-monitor', parent: 'aod-lead', parentRoute: '/ai-agent/executive/aod-lead', icon: 'Activity', color: '#22C55E', badge: 'Monitoring', capabilities: ['Real-time Dashboard', 'SLA Tracking', 'Throughput Analysis', 'Error Rate', 'Queue Depth', 'Processing Time', 'Availability', 'Trend Analysis'], department: 'AOD Lead' },
  
  // RPA Manager (3 sub-agents)
  { name: 'bot-deployer', parent: 'rpa-manager', parentRoute: '/ai-agent/executive/rpa-manager', icon: 'Rocket', color: '#3B82F6', badge: 'Deployment', capabilities: ['Environment Setup', 'Package Management', 'Configuration', 'Testing', 'Staging', 'Production', 'Rollback', 'Scheduling'], department: 'RPA Manager' },
  { name: 'license-manager', parent: 'rpa-manager', parentRoute: '/ai-agent/executive/rpa-manager', icon: 'Key', color: '#EAB308', badge: 'Licensing', capabilities: ['License Tracking', 'Usage Monitoring', 'Renewal Management', 'Optimization', 'Compliance Audit', 'Cost Analysis', 'Negotiation Support', 'Allocation'], department: 'RPA Manager' },
  { name: 'bot-health-monitor', parent: 'rpa-manager', parentRoute: '/ai-agent/executive/rpa-manager', icon: 'HeartPulse', color: '#EF4444', badge: 'Health', capabilities: ['Status Monitoring', 'Failure Detection', 'Recovery Actions', 'Performance Baseline', 'Drift Detection', 'Maintenance Scheduling', 'Version Update', 'Log Analysis'], department: 'RPA Manager' },
  
  // Workflow Specialist (3 sub-agents)
  { name: 'workflow-designer', parent: 'workflow-specialist', parentRoute: '/ai-agent/executive/workflow-specialist', icon: 'Workflow', color: '#06B6D4', badge: 'Design', capabilities: ['Flow Mapping', 'Decision Logic', 'Form Design', 'Routing Rules', 'Integration Points', 'User Interface', 'Notification Setup', 'Testing'], department: 'Workflow Specialist' },
  { name: 'integration-builder', parent: 'workflow-specialist', parentRoute: '/ai-agent/executive/workflow-specialist', icon: 'Plug', color: '#10B981', badge: 'Integration', capabilities: ['API Connection', 'Data Mapping', 'Transformation', 'Authentication', 'Error Handling', 'Retry Logic', 'Monitoring', 'Documentation'], department: 'Workflow Specialist' },
  { name: 'trigger-configurator', parent: 'workflow-specialist', parentRoute: '/ai-agent/executive/workflow-specialist', icon: 'Zap', color: '#F59E0B', badge: 'Triggers', capabilities: ['Event Setup', 'Schedule Configuration', 'Condition Rules', 'Webhook Management', 'Polling Setup', 'File Watcher', 'Email Trigger', 'API Trigger'], department: 'Workflow Specialist' },
];

// Template for sub-agent page
function generateSubAgentPage(agent) {
  const iconName = agent.icon;
  const color = agent.color;
  const badge = agent.badge;
  const parentName = agent.parent.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
  const agentNameTitle = agent.name.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
  const capabilities = agent.capabilities;
  const department = agent.department;

  return `import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useTheme } from '@/providers/ThemeProvider';
import { Activity, ${iconName}, Clock, Target, Zap, ArrowRight, Briefcase } from 'lucide-react-native';
import AgentFeatures from '@/components/ai-agent/AgentFeatures';
import { useRouter } from 'expo-router';

export default function ${agentNameTitle.replace(/\s/g, '')}Page() {
  const { theme } = useTheme();
  const router = useRouter();

  const capabilities = [
    '${capabilities[0]}', '${capabilities[1]}', '${capabilities[2]}', '${capabilities[3]}',
    '${capabilities[4]}', '${capabilities[5]}', '${capabilities[6]}', '${capabilities[7]}'
  ];

  const endpoints = [
    '/consult/${agent.name}',
    '/${agent.name}/execute',
    '/${agent.name}/analyze',
    '/${agent.name}/report'
  ];

  return (
    <ScrollView style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <View style={[styles.hero, { borderBottomColor: theme.colors.border || '#E5E5EA' }]}>
        <View style={[styles.heroIconWrap, { backgroundColor: '${color}20' }]}>
          <${iconName} size={56} color="${color}" />
        </View>
        <Text style={[styles.heroTitle, { color: theme.colors.text }]}>AI ${agentNameTitle}</Text>
        <Text style={[styles.heroSubtitle, { color: theme.colors.textSecondary }]}>Sub-Agent of AI ${parentName}</Text>
        <View style={styles.badgesRow}>
          <View style={[styles.badge, { backgroundColor: '#34C75922' }]}>
            <Activity size={12} color="#34C759" />
            <Text style={[styles.badgeText, { color: '#34C759' }]}>Active</Text>
          </View>
          <View style={[styles.badge, { backgroundColor: '${color}22' }]}>
            <${iconName} size={12} color="${color}" />
            <Text style={[styles.badgeText, { color: '${color}' }]}>${badge}</Text>
          </View>
        </View>
      </View>

      <View style={styles.statsContainer}>
        {[
          { label: 'Status', value: 'Active', icon: Activity, color: '#34C759' },
          { label: 'Level', value: '${badge}', icon: ${iconName}, color: '${color}' },
          { label: 'Efficiency', value: '20x', icon: Target, color: '#FF9500' },
          { label: 'Parent', value: '${parentName.substring(0, 15)}', icon: Briefcase, color: '#007AFF' }
        ].map((stat, index) => (
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
          The AI ${agentNameTitle} specializes in ${department.toLowerCase()} operations, providing automated capabilities to support the AI ${parentName} in achieving operational excellence.
        </Text>
      </View>

      <View style={[styles.section, { backgroundColor: theme.colors.card || '#F2F2F7' }]}>
        <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Core Capabilities</Text>
        <View style={styles.tagsContainer}>
          {capabilities.map((cap, index) => (
            <View key={index} style={[styles.tag, { backgroundColor: '${color}18' }]}>
              <Text style={[styles.tagText, { color: '${color}' }]}>{cap}</Text>
            </View>
          ))}
        </View>
      </View>

      <View style={[styles.section, { backgroundColor: theme.colors.card || '#F2F2F7' }]}>
        <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>A2A Endpoints</Text>
        {endpoints.map((endpoint, index) => (
          <View key={index} style={styles.endpointRow}>
            <Zap size={14} color="#8B5CF6" />
            <Text style={[styles.endpointText, { color: theme.colors.textSecondary }]}>{endpoint}</Text>
          </View>
        ))}
      </View>

      <View style={[styles.section, { backgroundColor: theme.colors.card || '#F2F2F7' }]}>
        <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Parent Agent</Text>
        <TouchableOpacity onPress={() => router.push('${agent.parentRoute}')} style={[styles.parentCard, { backgroundColor: theme.colors.background || '#F2F2F7' }]}>
          <Briefcase size={24} color="${color}" />
          <View style={styles.parentInfo}>
            <Text style={[styles.parentName, { color: theme.colors.text }]}>AI ${parentName}</Text>
            <Text style={[styles.parentDesc, { color: theme.colors.textSecondary }]}>Main Agent</Text>
          </View>
          <ArrowRight size={20} color={theme.colors.textSecondary} />
        </TouchableOpacity>
      </View>

      <AgentFeatures agentId="${agent.name}" agentName="AI ${agentNameTitle}" />
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

// Generate index file
function generateIndexFile(subagents, title, deptName) {
  const entries = subagents.map(sa => {
    const displayName = sa.name.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
    return `        <TouchableOpacity key="${sa.name}" onPress={() => router.push('/ai-agent/${deptName}/sub-agents/${sa.name}')} style={[styles.agentCard, { backgroundColor: theme.colors.background || '#F2F2F7' }]}>
          <View style={[styles.agentIcon, { backgroundColor: '${sa.color}20' }]}><${sa.icon} size={28} color="${sa.color}" /></View>
          <View style={styles.agentInfo}>
            <Text style={[styles.agentName, { color: theme.colors.text }]}>${displayName}</Text>
            <Text style={[styles.agentDesc, { color: theme.colors.textSecondary }]}>${sa.department} - Sub-Agent</Text>
          </View>
          <ArrowRight size={20} color={theme.colors.textSecondary} />
        </TouchableOpacity>`;
  }).join('\n');

  return `import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useTheme } from '@/providers/ThemeProvider';
import { Activity, Briefcase, ArrowRight } from 'lucide-react-native';
import { useRouter } from 'expo-router';
${subagents.map(sa => `import { ${sa.icon} } from 'lucide-react-native';`).filter((v, i, a) => a.indexOf(v) === i).join('\n')}

export default function SubAgentsIndex() {
  const { theme } = useTheme();
  const router = useRouter();

  return (
    <ScrollView style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <View style={[styles.hero, { borderBottomColor: theme.colors.border || '#E5E5EA' }]}>
        <View style={[styles.heroIconWrap, { backgroundColor: '#6366F115' }]}><Briefcase size={48} color="#6366F1" /></View>
        <Text style={[styles.heroTitle, { color: theme.colors.text }]}>${title}</Text>
        <Text style={[styles.heroSubtitle, { color: theme.colors.textSecondary }]}>Helper & Sub-Agent Workforce</Text>
        <View style={styles.badgesRow}>
          <View style={[styles.badge, { backgroundColor: '#34C75922' }]}><Activity size={12} color="#34C759" /><Text style={[styles.badgeText, { color: '#34C759' }]}>Active</Text></View>
          <View style={[styles.badge, { backgroundColor: '#6366F422' }]}><Briefcase size={12} color="#6366F1" /><Text style={[styles.badgeText, { color: '#6366F1' }]}>${subagents.length} Agents</Text></View>
        </View>
      </View>
      <View style={[styles.section, { backgroundColor: theme.colors.card || '#F2F2F7' }]}>
        <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Sub-Agents</Text>
${entries}
      </View>
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
  section: { marginHorizontal: 16, marginBottom: 16, padding: 20, borderRadius: 16 },
  sectionTitle: { fontSize: 18, fontWeight: '700', marginBottom: 14 },
  agentCard: { flexDirection: 'row', alignItems: 'center', padding: 16, borderRadius: 12, marginBottom: 12 },
  agentIcon: { width: 48, height: 48, borderRadius: 24, justifyContent: 'center', alignItems: 'center', marginRight: 16 },
  agentInfo: { flex: 1 },
  agentName: { fontSize: 16, fontWeight: '600' },
  agentDesc: { fontSize: 12, marginTop: 2 },
});
`;
}

// Main execution
console.log('Starting sub-agent generation...\n');

// Create administrative sub-agents
console.log('Creating Administrative sub-agents...');
const adminDir = path.join(__dirname, '..', 'app', 'ai-agent', 'administrative', 'sub-agents');
ADMIN_SUBAGENTS.forEach(agent => {
  const filename = path.join(adminDir, `${agent.name}.tsx`);
  fs.writeFileSync(filename, generateSubAgentPage(agent));
  console.log(`  Created: ${agent.name}.tsx`);
});

// Create AI Management sub-agents
console.log('\nCreating AI Management sub-agents...');
const execDir = path.join(__dirname, '..', 'app', 'ai-agent', 'executive', 'sub-agents');
AI_MGMT_SUBAGENTS.forEach(agent => {
  const filename = path.join(execDir, `${agent.name}.tsx`);
  fs.writeFileSync(filename, generateSubAgentPage(agent));
  console.log(`  Created: ${agent.name}.tsx`);
});

// Create index files
console.log('\nCreating index files...');
fs.writeFileSync(path.join(adminDir, 'index.tsx'), generateIndexFile(ADMIN_SUBAGENTS, 'Administrative - Sub-Agents', 'administrative'));
fs.writeFileSync(path.join(execDir, 'index.tsx'), generateIndexFile(AI_MGMT_SUBAGENTS, 'AI Management - Sub-Agents', 'executive'));
console.log('  Created: administrative/sub-agents/index.tsx');
console.log('  Created: executive/sub-agents/index.tsx');

console.log(`\n✅ Successfully generated ${ADMIN_SUBAGENTS.length + AI_MGMT_SUBAGENTS.length} sub-agent pages!`);
