import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Dimensions,
  TextInput,
  Platform,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import * as Icons from 'lucide-react-native';
import { useTheme } from '@/providers/ThemeProvider';
import { router } from 'expo-router';
import { allSubAgents } from '@/constants/aiAgentHierarchy';

const { width } = Dimensions.get('window');

// ============================================
// EMPLOYEE-AI COLLABORATION SCREEN
// Management of Human-in-the-Loop workflows
// ============================================

const EmployeeAICollaborationScreen = () => {
  const insets = useSafeAreaInsets();
  const { colors } = useTheme();
  const [activeTab, setActiveTab] = useState<'workflows' | 'approvals' | 'teams'>('workflows');

  const workflows = [
    {
      id: '1',
      title: 'Customer Refund Approval',
      agent: 'AI Ticket Resolution',
      human: 'Sarah (Finance)',
      status: 'High Priority',
      type: 'HITL',
      color: '#FF3B30'
    },
    {
      id: '2',
      title: 'Strategic Sales Proposal',
      agent: 'AI Proposal Generator',
      human: 'James (Sales VP)',
      status: 'Drafting',
      type: 'Collaborative',
      color: '#007AFF'
    },
    {
      id: '3',
      title: 'Monthly Audit Review',
      agent: 'AI Audit Agent',
      human: 'Mike (Compliance)',
      status: 'Scheduled',
      type: 'Verification',
      color: '#34C759'
    }
  ];

  const renderWorkflows = () => (
    <View style={styles.section}>
      <Text style={[styles.sectionTitle, { color: colors.text }]}>Active Delegation Chains</Text>
      {workflows.map((wf) => (
        <TouchableOpacity key={wf.id} style={[styles.workflowCard, { backgroundColor: colors.card }]}>
          <View style={[styles.workflowAccent, { backgroundColor: wf.color }]} />
          <View style={styles.workflowContent}>
            <View style={styles.workflowHeader}>
              <Text style={[styles.workflowTitle, { color: colors.text }]}>{wf.title}</Text>
              <View style={[styles.typeBadge, { backgroundColor: `${wf.color}15` }]}>
                <Text style={[styles.typeBadgeText, { color: wf.color }]}>{wf.type}</Text>
              </View>
            </View>
            
            <View style={styles.collabRow}>
              <View style={styles.collabEntity}>
                <Icons.User size={16} color={colors.textSecondary} />
                <Text style={[styles.entityName, { color: colors.textSecondary }]}>{wf.agent}</Text>
              </View>
              <Icons.ArrowRightLeft size={14} color={colors.border} />
              <View style={styles.collabEntity}>
                <Icons.User size={16} color={colors.textSecondary} />
                <Text style={[styles.entityName, { color: colors.textSecondary }]}>{wf.human}</Text>
              </View>
            </View>

            <View style={styles.workflowFooter}>
              <View style={styles.statusIndicator}>
                <View style={[styles.statusDot, { backgroundColor: wf.color }]} />
                <Text style={[styles.statusText, { color: colors.textSecondary }]}>{wf.status}</Text>
              </View>
              <Icons.ChevronRight size={18} color={colors.border} />
            </View>
          </View>
        </TouchableOpacity>
      ))}

      <TouchableOpacity style={[styles.createButton, { borderColor: colors.primary, borderWidth: 1, borderStyle: 'dashed' }]}>
        <Icons.Plus size={20} color={colors.primary} />
        <Text style={[styles.createButtonText, { color: colors.primary }]}>Define New Workflow</Text>
      </TouchableOpacity>
    </View>
  );

  const renderApprovals = () => (
    <View style={styles.section}>
      <View style={[styles.statsCard, { backgroundColor: colors.card }]}>
        <View style={styles.statItem}>
          <Text style={[styles.statVal, { color: colors.primary }]}>12</Text>
          <Text style={[styles.statLab, { color: colors.textSecondary }]}>Pending</Text>
        </View>
        <View style={styles.statDivider} />
        <View style={styles.statItem}>
          <Text style={[styles.statVal, { color: '#34C759' }]}>156</Text>
          <Text style={[styles.statLab, { color: colors.textSecondary }]}>Approved</Text>
        </View>
        <View style={styles.statDivider} />
        <View style={styles.statItem}>
          <Text style={[styles.statVal, { color: colors.text }]}>0.8h</Text>
          <Text style={[styles.statLab, { color: colors.textSecondary }]}>Avg Time</Text>
        </View>
      </View>

      <Text style={[styles.sectionTitle, { color: colors.text }]}>Human-in-the-Loop Queue</Text>
      {[
        { id: 'a1', action: 'Bulk Email Launch', agent: 'AI Email Marketing', time: '5m ago', risk: 'Medium' },
        { id: 'a2', action: 'Inventory Order > $5k', agent: 'AI Resource Planner', time: '12m ago', risk: 'High' },
        { id: 'a3', action: 'New Employee Access', agent: 'AI Task Coordinator', time: '45m ago', risk: 'Low' },
      ].map((item) => (
        <View key={item.id} style={[styles.approvalItem, { backgroundColor: colors.card }]}>
          <View style={styles.approvalInfo}>
            <Text style={[styles.approvalAction, { color: colors.text }]}>{item.action}</Text>
            <Text style={[styles.approvalMeta, { color: colors.textSecondary }]}>Requested by {item.agent} • {item.time}</Text>
          </View>
          <View style={styles.approvalActions}>
            <TouchableOpacity style={[styles.actionBtn, { backgroundColor: '#FF3B3015' }]}>
              <Icons.X size={18} color="#FF3B30" />
            </TouchableOpacity>
            <TouchableOpacity style={[styles.actionBtn, { backgroundColor: '#34C75915' }]}>
              <Icons.Check size={18} color="#34C759" />
            </TouchableOpacity>
          </View>
        </View>
      ))}
    </View>
  );

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <LinearGradient
        colors={['#FF9500', '#FF2D55']}
        style={[styles.header, { paddingTop: insets.top + 20 }]}
      >
        <View style={styles.headerTop}>
          <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
            <Icons.ArrowLeft color="#FFF" size={24} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Human-AI Collaboration</Text>
          <TouchableOpacity style={styles.backButton}>
            <Icons.UsersRound color="#FFF" size={24} />
          </TouchableOpacity>
        </View>
        
        <View style={styles.headerOverview}>
          <View style={styles.headerStat}>
            <Text style={styles.headerStatVal}>24</Text>
            <Text style={styles.headerStatLab}>Active Chains</Text>
          </View>
          <View style={styles.headerStat}>
            <Text style={styles.headerStatVal}>98%</Text>
            <Text style={styles.headerStatLab}>Sync Rate</Text>
          </View>
          <View style={styles.headerStat}>
            <Text style={styles.headerStatVal}>12x</Text>
            <Text style={styles.headerStatLab}>Efficiency</Text>
          </View>
        </View>
      </LinearGradient>

      <View style={styles.tabBar}>
        {['workflows', 'approvals', 'teams'].map((tab) => (
          <TouchableOpacity
            key={tab}
            onPress={() => setActiveTab(tab as any)}
            style={[
              styles.tab,
              activeTab === tab && { borderBottomColor: '#FF2D55', borderBottomWidth: 3 }
            ]}
          >
            <Text style={[
              styles.tabText,
              { color: activeTab === tab ? '#FF2D55' : colors.textSecondary }
            ]}>
              {tab.toUpperCase()}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <ScrollView 
        style={styles.content}
        contentContainerStyle={styles.contentInner}
        showsVerticalScrollIndicator={false}
      >
        {activeTab === 'workflows' ? renderWorkflows() : activeTab === 'approvals' ? renderApprovals() : null}
      </ScrollView>
    </View>
  );
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    paddingBottom: 24,
    paddingHorizontal: 20,
    borderBottomLeftRadius: 32,
    borderBottomRightRadius: 32,
  },
  headerTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
  },
  headerTitle: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: '800',
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255,255,255,0.2)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerOverview: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 10,
  },
  headerStat: {
    alignItems: 'center',
  },
  headerStatVal: {
    color: '#FFF',
    fontSize: 24,
    fontWeight: '800',
  },
  headerStatLab: {
    color: 'rgba(255,255,255,0.8)',
    fontSize: 11,
    fontWeight: '600',
    marginTop: 4,
  },
  tabBar: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0,0,0,0.05)',
  },
  tab: {
    flex: 1,
    paddingVertical: 16,
    alignItems: 'center',
  },
  tabText: {
    fontSize: 12,
    fontWeight: '700',
    letterSpacing: 0.5,
  },
  content: {
    flex: 1,
  },
  contentInner: {
    padding: 20,
  },
  section: {
    gap: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
  },
  workflowCard: {
    flexDirection: 'row',
    borderRadius: 20,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 12,
    elevation: 3,
  },
  workflowAccent: {
    width: 6,
  },
  workflowContent: {
    flex: 1,
    padding: 16,
    gap: 12,
  },
  workflowHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  workflowTitle: {
    fontSize: 15,
    fontWeight: '700',
    flex: 1,
    marginRight: 8,
  },
  typeBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  typeBadgeText: {
    fontSize: 10,
    fontWeight: '800',
  },
  collabRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    backgroundColor: 'rgba(0,0,0,0.02)',
    padding: 10,
    borderRadius: 12,
  },
  collabEntity: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  entityName: {
    fontSize: 12,
    fontWeight: '600',
  },
  workflowFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  statusIndicator: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  statusDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  statusText: {
    fontSize: 12,
    fontWeight: '500',
  },
  createButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    height: 56,
    borderRadius: 16,
    gap: 10,
    marginTop: 10,
  },
  createButtonText: {
    fontSize: 15,
    fontWeight: '700',
  },
  statsCard: {
    flexDirection: 'row',
    padding: 20,
    borderRadius: 24,
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  statItem: {
    alignItems: 'center',
    gap: 4,
  },
  statVal: {
    fontSize: 20,
    fontWeight: '800',
  },
  statLab: {
    fontSize: 11,
    fontWeight: '600',
  },
  statDivider: {
    width: 1,
    height: 30,
    backgroundColor: 'rgba(0,0,0,0.05)',
  },
  approvalItem: {
    flexDirection: 'row',
    padding: 16,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  approvalInfo: {
    flex: 1,
    gap: 4,
  },
  approvalAction: {
    fontSize: 15,
    fontWeight: '700',
  },
  approvalMeta: {
    fontSize: 12,
  },
  approvalActions: {
    flexDirection: 'row',
    gap: 8,
  },
  actionBtn: {
    width: 40,
    height: 40,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default EmployeeAICollaborationScreen;
