 
import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { useRouter } from 'expo-router';
import {
  ChevronLeft,
  ChevronRight,
  Play,
  Pause,
  Square,
  RotateCcw,
  CircleCheck,
  CircleX,
  Clock,
  CircleAlert,
  Zap,
  GitBranch,
  ArrowRight,
  Database,
  Mail,
  FileText,
  Calculator,
  Globe,
  ChartBarBig,
  Layers,
  Download,
  User,
} from 'lucide-react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Animated, { FadeInUp } from 'react-native-reanimated';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';

// Types
interface Workflow {
  id: string;
  name: string;
  description: string;
  status: 'running' | 'completed' | 'failed' | 'paused' | 'queued';
  progress: number;
  nodes: WorkflowNode[];
  startedAt: string;
  duration: string;
  trigger: 'manual' | 'scheduled' | 'webhook';
  runCount: number;
  successRate: number;
}

interface WorkflowNode {
  id: string;
  type: 'trigger' | 'agent' | 'condition' | 'action' | 'end';
  name: string;
  status: 'pending' | 'running' | 'completed' | 'failed';
  agent?: string;
  icon: any;
  outputs: string[];
}

// Mock Data
const WORKFLOWS: Workflow[] = [
  {
    id: '1',
    name: 'Customer Onboarding',
    description: 'Automated customer onboarding with welcome emails and account setup',
    status: 'running',
    progress: 67,
    nodes: [
      { id: 'n1', type: 'trigger', name: 'New Signup', status: 'completed', icon: Globe, outputs: ['n2'] },
      { id: 'n2', type: 'agent', name: 'Welcome Email', status: 'completed', agent: 'Email AI', icon: Mail, outputs: ['n3'] },
      { id: 'n3', type: 'agent', name: 'Account Setup', status: 'running', agent: 'Support AI', icon: User, outputs: ['n4'] },
      { id: 'n4', type: 'condition', name: 'Verify Email?', status: 'pending', icon: GitBranch, outputs: ['n5', 'n6'] },
      { id: 'n5', type: 'action', name: 'Send Reminder', status: 'pending', icon: Clock, outputs: ['n7'] },
      { id: 'n6', type: 'action', name: 'Activate Account', status: 'pending', icon: CircleCheck, outputs: ['n7'] },
      { id: 'n7', type: 'end', name: 'Complete', status: 'pending', icon: Layers, outputs: [] },
    ],
    startedAt: '2026-03-01 09:23:15',
    duration: '2m 34s',
    trigger: 'webhook',
    runCount: 1247,
    successRate: 98.5,
  },
  {
    id: '2',
    name: 'Lead Qualification',
    description: 'Automatically qualify leads and assign to sales team',
    status: 'completed',
    progress: 100,
    nodes: [
      { id: 'n1', type: 'trigger', name: 'New Lead', status: 'completed', icon: Globe, outputs: ['n2'] },
      { id: 'n2', type: 'agent', name: 'Score Lead', status: 'completed', agent: 'Sales AI', icon: Calculator, outputs: ['n3'] },
      { id: 'n3', type: 'condition', name: 'Score > 70?', status: 'completed', icon: GitBranch, outputs: ['n4', 'n5'] },
      { id: 'n4', type: 'agent', name: 'Assign to Rep', status: 'completed', agent: 'Sales AI', icon: User, outputs: ['n6'] },
      { id: 'n5', type: 'action', name: 'Add to Nurture', status: 'completed', icon: Database, outputs: ['n6'] },
      { id: 'n6', type: 'end', name: 'Done', status: 'completed', icon: Layers, outputs: [] },
    ],
    startedAt: '2026-03-01 08:45:00',
    duration: '45s',
    trigger: 'scheduled',
    runCount: 3421,
    successRate: 96.8,
  },
  {
    id: '3',
    name: 'Monthly Financial Report',
    description: 'Generate and distribute monthly financial reports',
    status: 'failed',
    progress: 45,
    nodes: [
      { id: 'n1', type: 'trigger', name: '1st of Month', status: 'completed', icon: Clock, outputs: ['n2'] },
      { id: 'n2', type: 'agent', name: 'Collect Data', status: 'completed', agent: 'Accounting AI', icon: Database, outputs: ['n3'] },
      { id: 'n3', type: 'agent', name: 'Generate Report', status: 'failed', agent: 'Finance AI', icon: FileText, outputs: [] },
    ],
    startedAt: '2026-03-01 00:00:00',
    duration: '3m 12s',
    trigger: 'scheduled',
    runCount: 12,
    successRate: 91.7,
  },
  {
    id: '4',
    name: 'Support Ticket Routing',
    description: 'Route support tickets to appropriate agents based on category',
    status: 'queued',
    progress: 0,
    nodes: [
      { id: 'n1', type: 'trigger', name: 'New Ticket', status: 'pending', icon: Globe, outputs: ['n2'] },
      { id: 'n2', type: 'agent', name: 'Classify', status: 'pending', agent: 'Support AI', icon: User, outputs: ['n3'] },
      { id: 'n3', type: 'condition', name: 'Priority?', status: 'pending', icon: GitBranch, outputs: ['n4', 'n5', 'n6'] },
      { id: 'n4', type: 'action', name: 'High Priority', status: 'pending', icon: CircleAlert, outputs: ['n7'] },
      { id: 'n5', type: 'action', name: 'Medium Priority', status: 'pending', icon: Clock, outputs: ['n7'] },
      { id: 'n6', type: 'action', name: 'Low Priority', status: 'pending', icon: CircleCheck, outputs: ['n7'] },
      { id: 'n7', type: 'end', name: 'Routed', status: 'pending', icon: Layers, outputs: [] },
    ],
    startedAt: 'Pending',
    duration: '-',
    trigger: 'manual',
    runCount: 8934,
    successRate: 99.2,
  },
];

const NODE_STATUS_COLORS = {
  pending: '#9CA3AF',
  running: '#3B82F6',
  completed: '#10B981',
  failed: '#EF4444',
    comprehensiveFeatures: {
  "communicationChannels": {
    "call": {
      "enabled": true,
      "provider": "Twilio",
      "features": [
        "PBX Integration",
        "IVR Menu",
        "Call Routing",
        "Call Recording",
        "Transcriptions"
      ],
      "recordingRetention": "90 days",
      "consentLogging": true
    },
    "chatSystem": {
      "enabled": true,
      "platforms": [
        "Web Widget",
        "Slack",
        "Intercom",
        "Microsoft Teams"
      ],
      "persistentThreads": true,
      "transcriptExport": true
    },
    "sms": {
      "enabled": true,
      "provider": "Twilio",
      "features": [
        "Templated Messages",
        "Two-Way Support",
        "Opt-Out Handling"
      ],
      "number": "TBD"
    },
    "voice": {
      "enabled": true,
      "primaryDID": "TBD",
      "ttsVoice": "default",
      "failoverNumbers": [],
      "geoRouting": true
    },
    "recording": {
      "enabled": true,
      "autoRecording": true,
      "consentLogging": true,
      "transcriptGeneration": true,
      "scriptTemplates": []
    },
    "location": {
      "allowedRegions": [
        "Global"
      ],
      "timezoneAware": true,
      "localeFormats": [
        "en-US",
        "en-GB",
        "es-ES",
        "fr-FR",
        "de-DE"
      ]
    }
  },
  "companySetup": {
    "profile": {
      "enabled": true,
      "fields": [
        "Company Name",
        "Industry",
        "Size",
        "Location"
      ]
    },
    "products": {
      "enabled": true,
      "catalog": true,
      "pricingTiers": true
    },
    "negotiationRules": {
      "enabled": true,
      "templates": true,
      "maxConcession": "10%"
    }
  },
  "generalInfo": {
    "name": "",
    "role": "",
    "availability": "24/7",
    "personality": "professional",
    "tone": "conversational",
    "voice": "neutral"
  },
  "modelConfig": {
    "modelName": "LLM-X v2",
    "modelFamily": "GPT-4",
    "version": "latest",
    "primaryLanguage": "en-US",
    "fallbackLanguages": [
      "es",
      "fr",
      "de"
    ],
    "multilingualSupport": true
  },
  "timing": {
    "businessHours": {
      "enabled": true,
      "schedule": "Mon-Fri 09:00-18:00 local",
      "timezone": "UTC",
      "holidays": []
    },
    "waitingDuration": {
      "call": 120,
      "chat": 30,
      "sms": 0
    },
    "appointmentScheduling": {
      "enabled": true,
      "calendars": [
        "Google",
        "Outlook"
      ],
      "timezoneHandling": "automatic"
    }
  },
  "pricing": {
    "pricingModel": "fixed monthly",
    "priceLimit": "TBD",
    "negotiationRules": {
      "enabled": true,
      "maxConcession": "10%",
      "autoNegotiation": false
    }
  },
  "integrations": {
    "crm": [
      "Salesforce",
      "HubSpot",
      "Zendesk"
    ],
    "ticketing": [
      "Zendesk",
      "Freshdesk",
      "Jira"
    ],
    "calendar": [
      "Google Calendar",
      "Outlook Calendar"
    ],
    "telephony": [
      "Twilio",
      "Vonage",
      "RingCentral"
    ],
    "analytics": [
      "Google Analytics",
      "Mixpanel",
      "Amplitude"
    ],
    "mcpConnectors": []
  },
  "responsibilities": {
    "taskRouting": {
      "method": "intent-based",
      "escalationPath": "human after 3 failed handoffs",
      "slaEnforcement": true
    },
    "appointmentScheduling": {
      "enabled": true,
      "rules": []
    }
  },
  "taskManagement": {
    "assignedTasks": {
      "queue": true,
      "slaTimers": true,
      "dependencies": true
    },
    "progressTracking": {
      "enabled": true,
      "metrics": [
        "completion percentage",
        "time remaining"
      ]
    }
  },
  "behaviour": {
    "safetyFilters": {
      "enabled": true,
      "restrictedDomains": [
        "legal",
        "medical",
        "financial advice"
      ]
    },
    "refusalTemplates": {
      "enabled": true
    },
    "rateLimits": {
      "enabled": true,
      "requestsPerMinute": 60
    }
  },
  "performance": {
    "metrics": {
      "latency": true,
      "accuracy": true,
      "successRate": true,
      "userSatisfaction": true
    },
    "reporting": {
      "dashboards": true,
      "scheduledReports": true,
      "cadence": [
        "daily",
        "weekly",
        "monthly"
      ]
    }
  },
  "summary": {
    "enabled": true,
    "adminNotes": "",
    "handoverContext": true
  },
  "predictive": {
    "forecasting": {
      "enabled": true,
      "models": []
    },
    "anomalyDetection": {
      "enabled": true,
      "triggers": []
    }
  },
  "regulations": {
    "compliance": {
      "gdpr": true,
      "hipaa": false,
      "soc2": false,
      "regional": true
    },
    "dataResidency": {
      "enabled": true,
      "regions": []
    },
    "consentPolicies": {
      "enabled": true
    }
  },
  "memory": {
    "session": {
      "duration": "30 minutes",
      "retention": true
    },
    "longTerm": {
      "duration": "365 days",
      "retention": true
    },
    "piiRedaction": {
      "enabled": true
    },
    "purgeSchedule": "quarterly"
  },
  "detailedSetup": {
    "onboardingFlow": true,
    "productPricingSetup": true,
    "negotiationRulesSetup": true,
    "trainingPlan": true,
    "knowledgeBaseImport": true,
    "voicePersonalityTuning": true,
    "businessHoursSetup": true,
    "additionalConfigs": []
  },
  "twoStepVerification": {
    "enabled": true,
    "criticalActions": [
      "billing",
      "admin modifications",
      "data export"
    ],
    "deviceCheck": true
  },
  "importExport": {
    "endpoints": [
      "CSV",
      "JSON"
    ],
    "scheduledExports": true,
    "retentionPolicy": true,
    "complianceControls": true
  },
  "reports": {
    "types": [
      "performance",
      "usage",
      "errors",
      "compliance"
    ],
    "cadence": [
      "daily",
      "weekly",
      "monthly"
    ],
    "deliveryChannels": [
      "email",
      "dashboard",
      "webhook"
    ]
  },
  "mcpIntegrations": {
    "connectors": [],
    "apiSpecs": [],
    "mapping": []
  }
}};

const WORKFLOW_STATUS_COLORS = {
  running: '#3B82F6',
  completed: '#10B981',
  failed: '#EF4444',
  paused: '#F59E0B',
  queued: '#6B7280',
};

export default function WorkflowExecutionScreen() {
  const router = useRouter();
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];

  const [workflows] = useState<Workflow[]>(WORKFLOWS);
  const [selectedWorkflow, setSelectedWorkflow] = useState<Workflow | null>(null);
  const [activeTab, setActiveTab] = useState<'active' | 'history'>('active');

  const activeWorkflows = workflows.filter(w => w.status === 'running');
  const completedToday = workflows.filter(w => w.status === 'completed').length;
  const failedToday = workflows.filter(w => w.status === 'failed').length;

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'running':
        return <Zap size={16} color="#3B82F6" />;
      case 'completed':
        return <CircleCheck size={16} color="#10B981" />;
      case 'failed':
        return <CircleX size={16} color="#EF4444" />;
      case 'paused':
        return <Pause size={16} color="#F59E0B" />;
      case 'queued':
        return <Clock size={16} color="#6B7280" />;
      default:
        return <Clock size={16} color="#6B7280" />;
    }
  };

  const renderWorkflowCard = (workflow: Workflow, index: number) => {
    const isExpanded = selectedWorkflow?.id === workflow.id;

    return (
      <Animated.View
        key={workflow.id}
        entering={FadeInUp.delay(index * 50)}
        style={[styles.workflowCard, { backgroundColor: colors.card }]}
      >
        <TouchableOpacity
          style={styles.workflowHeader}
          onPress={() => setSelectedWorkflow(isExpanded ? null : workflow)}
        >
          <View style={styles.workflowInfo}>
            <View style={styles.titleRow}>
              <Text style={[styles.workflowName, { color: colors.text }]}>
                {workflow.name}
              </Text>
              <View
                style={[
                  styles.statusBadge,
                  { backgroundColor: WORKFLOW_STATUS_COLORS[workflow.status] + '15' },
                ]}
              >
                {getStatusIcon(workflow.status)}
                <Text
                  style={[
                    styles.statusText,
                    { color: WORKFLOW_STATUS_COLORS[workflow.status] },
                  ]}
                >
                  {workflow.status.charAt(0).toUpperCase() + workflow.status.slice(1)}
                </Text>
              </View>
            </View>
            <Text style={[styles.workflowDescription, { color: colors.icon }]}>
              {workflow.description}
            </Text>
            <View style={styles.workflowMeta}>
              <View style={styles.metaItem}>
                <Clock size={12} color={colors.icon} />
                <Text style={[styles.metaText, { color: colors.icon }]}>
                  {workflow.startedAt}
                </Text>
              </View>
              <View style={styles.metaItem}>
                <ChartBarBig size={12} color={colors.icon} />
                <Text style={[styles.metaText, { color: colors.icon }]}>
                  {workflow.runCount.toLocaleString()} runs
                </Text>
              </View>
              <View style={styles.metaItem}>
                <CircleCheck size={12} color="#10B981" />
                <Text style={[styles.metaText, { color: '#10B981' }]}>
                  {workflow.successRate}% success
                </Text>
              </View>
            </View>
          </View>
          <ChevronRight
            size={20}
            color={colors.icon}
            style={[styles.expandIcon, isExpanded && styles.expandIconRotated]}
          />
        </TouchableOpacity>

        {/* Progress Bar */}
        {workflow.status === 'running' && (
          <View style={styles.progressContainer}>
            <View style={[styles.progressBar, { backgroundColor: colors.background }]}>
              <View
                style={[
                  styles.progressFill,
                  { width: `${workflow.progress}%`, backgroundColor: colors.tint },
                ]}
              />
            </View>
            <Text style={[styles.progressText, { color: colors.tint }]}>
              {workflow.progress}%
            </Text>
          </View>
        )}

        {/* Expanded View - Node Flow */}
        {isExpanded && (
          <View style={styles.nodeFlow}>
            <Text style={[styles.nodesTitle, { color: colors.text }]}>
              Execution Flow
            </Text>
            <View style={styles.nodesContainer}>
              {workflow.nodes.map((node, nodeIndex) => {
                const Icon = node.icon;
                return (
                  <View key={node.id} style={styles.nodeWrapper}>
                    <View
                      style={[
                        styles.node,
                        { borderColor: NODE_STATUS_COLORS[node.status] },
                      ]}
                    >
                      <View
                        style={[
                          styles.nodeIcon,
                          { backgroundColor: NODE_STATUS_COLORS[node.status] + '15' },
                        ]}
                      >
                        <Icon size={18} color={NODE_STATUS_COLORS[node.status]} />
                      </View>
                      <View style={styles.nodeInfo}>
                        <Text style={[styles.nodeName, { color: colors.text }]}>
                          {node.name}
                        </Text>
                        {node.agent && (
                          <Text style={[styles.nodeAgent, { color: colors.icon }]}>
                            {node.agent}
                          </Text>
                        )}
                      </View>
                      <View
                        style={[
                          styles.nodeStatus,
                          { backgroundColor: NODE_STATUS_COLORS[node.status] + '15' },
                        ]}
                      >
                        <Text
                          style={[
                            styles.nodeStatusText,
                            { color: NODE_STATUS_COLORS[node.status] },
                          ]}
                        >
                          {node.status}
                        </Text>
                      </View>
                    </View>
                    {nodeIndex < workflow.nodes.length - 1 && (
                      <View style={styles.nodeConnector}>
                        <ArrowRight size={16} color={colors.icon} />
                      </View>
                    )}
                  </View>
                );
              })}
            </View>

            {/* Action Buttons */}
            <View style={styles.workflowActions}>
              {workflow.status === 'running' && (
                <>
                  <TouchableOpacity style={[styles.actionButton, { backgroundColor: '#F59E0B' + '15' }]}>
                    <Pause size={16} color="#F59E0B" />
                    <Text style={[styles.actionText, { color: '#F59E0B' }]}>Pause</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={[styles.actionButton, { backgroundColor: '#EF4444' + '15' }]}>
                    <Square size={16} color="#EF4444" />
                    <Text style={[styles.actionText, { color: '#EF4444' }]}>Stop</Text>
                  </TouchableOpacity>
                </>
              )}
              {(workflow.status === 'completed' || workflow.status === 'failed') && (
                <TouchableOpacity style={[styles.actionButton, { backgroundColor: colors.tint + '15' }]}>
                  <RotateCcw size={16} color={colors.tint} />
                  <Text style={[styles.actionText, { color: colors.tint }]}>Rerun</Text>
                </TouchableOpacity>
              )}
              <TouchableOpacity style={[styles.actionButton, { backgroundColor: colors.background }]}>
                <Download size={16} color={colors.icon} />
                <Text style={[styles.actionText, { color: colors.icon }]}>Logs</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      </Animated.View>
    );
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <TouchableOpacity onPress={() => router.back()}>
            <ChevronLeft size={28} color={colors.text} />
          </TouchableOpacity>
          <View>
            <Text style={[styles.headerTitle, { color: colors.text }]}>
              Workflow Monitor
            </Text>
            <Text style={[styles.headerSubtitle, { color: colors.icon }]}>
              Track and manage workflow executions
            </Text>
          </View>
        </View>
        <TouchableOpacity style={[styles.newButton, { backgroundColor: colors.tint }]}>
          <Play size={18} color="white" />
        </TouchableOpacity>
      </View>

      {/* Stats Row */}
      <View style={styles.statsRow}>
        <View style={[styles.statCard, { backgroundColor: '#3B82F6' + '10' }]}>
          <View style={[styles.statIcon, { backgroundColor: '#3B82F6' + '15' }]}>
            <Zap size={20} color="#3B82F6" />
          </View>
          <Text style={[styles.statValue, { color: '#3B82F6' }]}>
            {activeWorkflows.length}
          </Text>
          <Text style={[styles.statLabel, { color: colors.icon }]}>Running</Text>
        </View>
        <View style={[styles.statCard, { backgroundColor: '#10B981' + '10' }]}>
          <View style={[styles.statIcon, { backgroundColor: '#10B981' + '15' }]}>
            <CircleCheck size={20} color="#10B981" />
          </View>
          <Text style={[styles.statValue, { color: '#10B981' }]}>{completedToday}</Text>
          <Text style={[styles.statLabel, { color: colors.icon }]}>Completed</Text>
        </View>
        <View style={[styles.statCard, { backgroundColor: '#EF4444' + '10' }]}>
          <View style={[styles.statIcon, { backgroundColor: '#EF4444' + '15' }]}>
            <CircleX size={20} color="#EF4444" />
          </View>
          <Text style={[styles.statValue, { color: '#EF4444' }]}>{failedToday}</Text>
          <Text style={[styles.statLabel, { color: colors.icon }]}>Failed</Text>
        </View>
      </View>

      {/* Tab Selector */}
      <View style={styles.tabContainer}>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'active' && { backgroundColor: colors.tint }]}
          onPress={() => setActiveTab('active')}
        >
          <Zap size={16} color={activeTab === 'active' ? 'white' : colors.icon} />
          <Text style={[styles.tabText, { color: activeTab === 'active' ? 'white' : colors.text }]}>
            Active
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'history' && { backgroundColor: colors.tint }]}
          onPress={() => setActiveTab('history')}
        >
          <Clock size={16} color={activeTab === 'history' ? 'white' : colors.icon} />
          <Text style={[styles.tabText, { color: activeTab === 'history' ? 'white' : colors.text }]}>
            History
          </Text>
        </TouchableOpacity>
      </View>

      {/* Workflows List */}
      <ScrollView
        style={styles.content}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.contentContainer}
      >
        {workflows.map((workflow, index) => renderWorkflowCard(workflow, index))}

        {workflows.length === 0 && (
          <View style={styles.emptyState}>
            <GitBranch size={48} color={colors.icon} />
            <Text style={[styles.emptyTitle, { color: colors.text }]}>
              No workflows found
            </Text>
            <Text style={[styles.emptyText, { color: colors.icon }]}>
              Create your first workflow to get started
            </Text>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingTop: 8,
    paddingBottom: 16,
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: '700',
  },
  headerSubtitle: {
    fontSize: 13,
    marginTop: 2,
  },
  newButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  statsRow: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    gap: 12,
    marginBottom: 16,
  },
  statCard: {
    flex: 1,
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  statIcon: {
    width: 40,
    height: 40,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
  },
  statValue: {
    fontSize: 24,
    fontWeight: '700',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
  },
  tabContainer: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    gap: 12,
    marginBottom: 16,
  },
  tab: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    borderRadius: 10,
    gap: 8,
  },
  tabText: {
    fontSize: 14,
    fontWeight: '600',
  },
  content: {
    flex: 1,
  },
  contentContainer: {
    padding: 16,
    paddingTop: 0,
  },
  workflowCard: {
    borderRadius: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
    overflow: 'hidden',
  },
  workflowHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
  },
  workflowInfo: {
    flex: 1,
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 6,
  },
  workflowName: {
    fontSize: 16,
    fontWeight: '600',
  },
  statusBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 6,
    gap: 5,
  },
  statusText: {
    fontSize: 12,
    fontWeight: '600',
    textTransform: 'capitalize',
  },
  workflowDescription: {
    fontSize: 13,
    marginBottom: 8,
    lineHeight: 18,
  },
  workflowMeta: {
    flexDirection: 'row',
    gap: 16,
  },
  metaItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  metaText: {
    fontSize: 11,
  },
  expandIcon: {
    marginLeft: 12,
  },
  expandIconRotated: {
    transform: [{ rotate: '90deg' }],
  },
  progressContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingBottom: 16,
    gap: 12,
  },
  progressBar: {
    flex: 1,
    height: 6,
    borderRadius: 3,
  },
  progressFill: {
    height: 6,
    borderRadius: 3,
  },
  progressText: {
    fontSize: 12,
    fontWeight: '600',
    minWidth: 35,
  },
  nodeFlow: {
    padding: 16,
    paddingTop: 0,
    borderTopWidth: 1,
    borderTopColor: '#E5E7EB',
  },
  nodesTitle: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 12,
    marginTop: 16,
  },
  nodesContainer: {
    gap: 8,
  },
  nodeWrapper: {
    gap: 8,
  },
  node: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    borderRadius: 12,
    borderWidth: 2,
    backgroundColor: '#00000003',
  },
  nodeIcon: {
    width: 36,
    height: 36,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  nodeInfo: {
    flex: 1,
    marginLeft: 12,
  },
  nodeName: {
    fontSize: 14,
    fontWeight: '600',
  },
  nodeAgent: {
    fontSize: 12,
    marginTop: 2,
  },
  nodeStatus: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
  },
  nodeStatusText: {
    fontSize: 11,
    fontWeight: '600',
    textTransform: 'capitalize',
  },
  nodeConnector: {
    alignItems: 'center',
    marginVertical: 4,
  },
  workflowActions: {
    flexDirection: 'row',
    gap: 8,
    marginTop: 16,
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
    gap: 6,
  },
  actionText: {
    fontSize: 13,
    fontWeight: '500',
  },
  emptyState: {
    alignItems: 'center',
    paddingVertical: 48,
  },
  emptyTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginTop: 16,
    marginBottom: 8,
  },
  emptyText: {
    fontSize: 14,
    textAlign: 'center',
  },
});
