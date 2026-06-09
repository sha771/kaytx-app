import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, TextInput, useSafeAreaInsets } from 'react-native';
import { useRouter } from 'expo-router';
import { ArrowLeft, Plus, Edit3, CheckCircle, Star, MessageSquare, Clock, User, ThumbsUp, AlertCircle, TrendingUp, Bot, Filter, Search, Award, Shield, BookOpen, X, Check } from 'lucide-react-native';

export default function KnowledgeContributionsScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();

  // Core Contribution States
  const [totalContributions, setTotalContributions] = useState(1234);
  const [verifiedEntries, setVerifiedEntries] = useState(892);
  const [pendingCount, setPendingCount] = useState(45);
  
  const [contributions, setContributions] = useState([
    { id: 1, title: 'AWS Instance Types Guide', type: 'Technical', author: 'Sarah Chen', action: 'Created', time: '2h ago', status: 'verified', votes: 24, content: 'Comprehensive review of ec2 instance structures, compute-optimized instances for database indexing.' },
    { id: 2, title: 'Q4 Sales Comp Plan', type: 'Process', author: 'Mike Johnson', action: 'Updated', time: '5h ago', status: 'verified', votes: 18, content: 'Pricing overrides commission adjustments for enterprise customer acquisitions.' },
    { id: 3, title: 'Client Onboarding Checklist', type: 'Process', author: 'Emily Davis', action: 'Created', time: '1d ago', status: 'pending', votes: 0, content: 'Interactive check steps for client onboarding, including mentor syncs and Salesforce mappings.' },
    { id: 4, title: 'Security Protocol v2.3', type: 'Technical', author: 'James Wilson', action: 'Verified', time: '2d ago', status: 'verified', votes: 45, content: 'Compliance frameworks regarding SOC2 security audit check logs.' },
    { id: 5, title: 'API Error Handling Patterns', type: 'Technical', author: 'David Lee', action: 'Updated', time: '3d ago', status: 'verified', votes: 32, content: 'Centralized error formatting structures across all serverless endpoints.' }
  ]);

  const [topContributors, setTopContributors] = useState([
    { name: 'Sarah Chen', role: 'VP Engineering', contributions: 156, verified: 142, avatar: '#3B82F6' },
    { name: 'Mike Johnson', role: 'Sales Director', contributions: 134, verified: 128, avatar: '#10B981' },
    { name: 'James Wilson', role: 'Legal Counsel', contributions: 98, verified: 95, avatar: '#7C3AED' },
    { name: 'Emily Davis', role: 'Product Manager', contributions: 87, verified: 82, avatar: '#F59E0B' },
    { name: 'David Lee', role: 'Staff Engineer', contributions: 76, verified: 74, avatar: '#EC4899' }
  ]);

  // Form States
  const [showAddModal, setShowAddModal] = useState(false);
  const [contribTitle, setContribTitle] = useState('');
  const [contribType, setContribType] = useState('Technical');
  const [contribContent, setContribContent] = useState('');
  const [contribDept, setContribDept] = useState('Engineering');

  // Peer review states
  const [selectedContrib, setSelectedContrib] = useState<any>(null);

  // Manual Note submission
  const handleAddContribution = () => {
    if (!contribTitle.trim() || !contribContent.trim()) return;

    const newEntry = {
      id: Date.now(),
      title: contribTitle,
      type: contribType,
      author: 'Corporate User',
      action: 'Created',
      time: 'Just now',
      status: 'pending',
      votes: 0,
      content: contribContent
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

    setContributions([newEntry, ...contributions]);
    setTotalContributions(c => c + 1);
    setPendingCount(p => p + 1);

    // Reset Form
    setShowAddModal(false);
    setContribTitle('');
    setContribContent('');
  };

  // Peer review verify
  const approveAndVerifyNode = (id: number) => {
    setContributions(prev => prev.map(c => {
      if (c.id === id) {
        return { ...c, status: 'verified', votes: c.votes + 1 };
      }
      return c;
    }));

    setVerifiedEntries(v => v + 1);
    setPendingCount(p => Math.max(p - 1, 0));

    // Update expert contribution numbers
    setTopContributors(prev => prev.map(tc => {
      if (tc.name === 'Emily Davis' && id === 3) {
        return { ...tc, contributions: tc.contributions + 1, verified: tc.verified + 1 };
      }
      return tc;
    }));

    setSelectedContrib(null);
  };

  // Peer review reject
  const rejectContribution = (id: number) => {
    const item = contributions.find(c => c.id === id);
    setContributions(prev => prev.filter(c => c.id !== id));
    setTotalContributions(c => c - 1);
    if (item && item.status === 'pending') {
      setPendingCount(p => Math.max(p - 1, 0));
    } else {
      setVerifiedEntries(v => Math.max(v - 1, 0));
    }
    setSelectedContrib(null);
  };

  const SUGGESTIONS = [
    { title: 'Add pricing tier comparison matrix', category: 'Sales', votes: 12, status: 'pending' },
    { title: 'Update Q3 metrics database schemas', category: 'Analytics', votes: 8, status: 'in-progress' },
    { title: 'Add mobile app auth troubleshooting', category: 'Technical', votes: 6, status: 'pending' },
    { title: 'Clarify refund escalation protocols', category: 'Operations', votes: 15, status: 'approved' }
  ];

  return (
    <View style={{ flex: 1, backgroundColor: '#0F172A' }}>
      {/* Header */}
      <View style={[styles.header, { paddingTop: insets.top + 8 }]}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <ArrowLeft size={24} color="#FFFFFF" />
        </TouchableOpacity>
        <View style={styles.headerTitle}>
          <Text style={styles.headerTitleText}>Knowledge Contributions</Text>
          <Text style={styles.headerSubtitle}>Peer reviews, manual notes, and validation queue</Text>
        </View>
        <TouchableOpacity style={styles.headerAddBtn} onPress={() => setShowAddModal(true)}>
          <Plus size={20} color="#FFFFFF" />
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Stats Row */}
        <View style={styles.statsRow}>
          <View style={[styles.statCard, { backgroundColor: '#1E293B' }]}>
            <Edit3 size={18} color="#3B82F6" />
            <Text style={styles.statValue}>{totalContributions.toLocaleString()}</Text>
            <Text style={styles.statLabel}>Total Notes</Text>
          </View>
          <View style={[styles.statCard, { backgroundColor: '#1E293B' }]}>
            <CheckCircle size={18} color="#10B981" />
            <Text style={styles.statValue}>{verifiedEntries.toLocaleString()}</Text>
            <Text style={styles.statLabel}>Verified Nodes</Text>
          </View>
          <View style={[styles.statCard, { backgroundColor: '#1E293B' }]}>
            <Clock size={18} color="#F59E0B" />
            <Text style={styles.statValue}>{pendingCount}</Text>
            <Text style={styles.statLabel}>Pending Review</Text>
          </View>
          <View style={[styles.statCard, { backgroundColor: '#1E293B' }]}>
            <User size={18} color="#7C3AED" />
            <Text style={styles.statValue}>{topContributors.length}</Text>
            <Text style={styles.statLabel}>Contributors</Text>
          </View>
        </View>

        {/* Add Knowledge trigger */}
        <TouchableOpacity 
          style={[styles.primaryButton, { backgroundColor: '#3B82F6' }]}
          onPress={() => setShowAddModal(true)}
        >
          <Plus size={20} color="#FFFFFF" />
          <Text style={styles.primaryButtonText}>Add Manual Knowledge Node</Text>
        </TouchableOpacity>

        {/* Dynamic Reviews / Contributions list */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Verification Pipeline (Click to Review)</Text>
            <TouchableOpacity>
              <Filter size={18} color="#6B7280" />
            </TouchableOpacity>
          </View>
          {contributions.map((contrib) => (
            <TouchableOpacity 
              key={contrib.id} 
              style={[styles.contribCard, { backgroundColor: '#1E293B' }]}
              onPress={() => setSelectedContrib(contrib)}
            >
              <View style={styles.contribHeader}>
                <View style={[styles.contribIcon, { backgroundColor: contrib.status === 'verified' ? '#10B98115' : '#F59E0B15' }]}>
                  {contrib.status === 'verified' ? (
                    <CheckCircle size={18} color="#10B981" />
                  ) : (
                    <Clock size={18} color="#F59E0B" />
                  )}
                </View>
                <View style={styles.contribInfo}>
                  <Text style={styles.contribTitle}>{contrib.title}</Text>
                  <View style={styles.contribMeta}>
                    <View style={[styles.typeBadge, { backgroundColor: '#3B82F615' }]}>
                      <Text style={styles.typeText}>{contrib.type}</Text>
                    </View>
                    <Text style={styles.contribAuthor}>{contrib.author}</Text>
                    <Text style={styles.contribDot}>•</Text>
                    <Text style={styles.contribAction}>{contrib.action}</Text>
                    <Text style={styles.contribDot}>•</Text>
                    <Text style={styles.contribTime}>{contrib.time}</Text>
                  </View>
                </View>
                <View style={styles.contribVotes}>
                  <ThumbsUp size={14} color="#6B7280" />
                  <Text style={styles.votesText}>{contrib.votes}</Text>
                </View>
              </View>
            </TouchableOpacity>
          ))}
        </View>

        {/* Top Contributors */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Top Contributing Experts</Text>
            <Award size={18} color="#F59E0B" />
          </View>
          {topContributors.map((person, index) => (
            <View key={index} style={[styles.contributorCard, { backgroundColor: '#1E293B' }]}>
              <View style={[styles.contributorAvatar, { backgroundColor: person.avatar }]}>
                <Text style={styles.avatarText}>{person.name[0]}</Text>
              </View>
              <View style={styles.contributorInfo}>
                <View style={styles.contributorHeader}>
                  <Text style={styles.contributorName}>{person.name}</Text>
                  {index === 0 && (
                    <View style={[styles.crownBadge, { backgroundColor: '#F59E0B15' }]}>
                      <Award size={11} color="#F59E0B" />
                    </View>
                  )}
                </View>
                <Text style={styles.contributorRole}>{person.role}</Text>
                <View style={styles.contributorStats}>
                  <Text style={styles.contribStat}>{person.contributions} contributions</Text>
                  <Text style={styles.contribDot}>•</Text>
                  <Text style={styles.contribStat}>{person.verified} verified</Text>
                </View>
              </View>
              <View style={styles.contributorScore}>
                <Star size={14} color="#F59E0B" fill="#F59E0B" />
                <Text style={styles.scoreText}>{Math.round((person.verified / person.contributions) * 100)}%</Text>
              </View>
            </View>
          ))}
        </View>

        {/* Suggestions Improvement feed */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Requested Knowledge Enhancements</Text>
          {SUGGESTIONS.map((suggestion, index) => (
            <View key={index} style={[styles.suggestionCard, { backgroundColor: '#1E293B' }]}>
              <View style={styles.suggestionInfo}>
                <Text style={styles.suggestionTitle}>{suggestion.title}</Text>
                <View style={styles.suggestionMeta}>
                  <Text style={styles.suggestionCategory}>{suggestion.category} category</Text>
                  <View style={[styles.statusBadge, { 
                    backgroundColor: suggestion.status === 'approved' ? '#10B98115' : '#F59E0B15'
                  }]}>
                    <Text style={[styles.statusText, { 
                      color: suggestion.status === 'approved' ? '#10B981' : '#F59E0B'
                    }]}>{suggestion.status}</Text>
                  </View>
                </View>
              </View>
              <View style={styles.suggestionVotes}>
                <TrendingUp size={14} color="#10B981" />
                <Text style={styles.voteCount}>{suggestion.votes}</Text>
              </View>
            </View>
          ))}
        </View>

        {/* Contributions AI Agents */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Autonomous Verification Agents</Text>
          <View style={styles.agentsRow}>
            {[
              { name: 'Content Reviewer', color: '#3B82F6' },
              { name: 'Quality Scorer', color: '#7C3AED' },
              { name: 'Duplicate Detector', color: '#F59E0B' },
              { name: 'Suggestion Engine', color: '#10B981' },
            ].map((agent, index) => (
              <View key={index} style={[styles.agentChip, { backgroundColor: agent.color + '15' }]}>
                <Bot size={14} color={agent.color} />
                <Text style={[styles.agentChipText, { color: agent.color }]}>{agent.name}</Text>
              </View>
            ))}
          </View>
        </View>

        <View style={{ height: 60 }} />
      </ScrollView>

      {/* ADD MANUAL ENTRY MODAL */}
      {showAddModal && (
        <View style={styles.modalOverlay}>
          <View style={styles.modalCard}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Submit Institutional Note</Text>
              <TouchableOpacity onPress={() => setShowAddModal(false)}>
                <X size={20} color="#FFFFFF" />
              </TouchableOpacity>
            </View>

            <Text style={styles.inputLabel}>Knowledge Title</Text>
            <TextInput
              style={styles.configInput}
              placeholder="e.g. AWS server backup endpoints"
              placeholderTextColor="#4B5563"
              value={contribTitle}
              onChangeText={setContribTitle}
            />

            <Text style={styles.inputLabel}>Type Category</Text>
            <View style={styles.typeButtonsRow}>
              {['Technical', 'Process', 'Decision', 'Client'].map((t) => (
                <TouchableOpacity
                  key={t}
                  style={[styles.typeBtnOption, { backgroundColor: contribType === t ? '#3B82F6' : '#37415140' }]}
                  onPress={() => setContribType(t)}
                >
                  <Text style={styles.typeBtnText}>{t}</Text>
                </TouchableOpacity>
              ))}
            </View>

            <Text style={styles.inputLabel}>Content Details</Text>
            <TextInput
              style={[styles.configInput, { height: 100, textAlignVertical: 'top' }]}
              placeholder="Draft the unwritten guidelines or decision Context..."
              placeholderTextColor="#4B5563"
              multiline
              value={contribContent}
              onChangeText={setContribContent}
            />

            <View style={styles.modalActions}>
              <TouchableOpacity 
                style={[styles.btnCancel, { backgroundColor: '#374151' }]} 
                onPress={() => setShowAddModal(false)}
              >
                <Text style={styles.btnText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity 
                style={[styles.btnSave, { backgroundColor: '#3B82F6' }]} 
                onPress={handleAddContribution}
              >
                <Text style={styles.btnText}>Submit Node</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      )}

      {/* PEER REVIEW PANEL OVERLAY */}
      {selectedContrib && (
        <View style={styles.modalOverlay}>
          <View style={styles.modalCard}>
            <View style={styles.modalHeader}>
              <View>
                <Text style={styles.modalTitle}>{selectedContrib.title}</Text>
                <Text style={styles.modalSubtitle}>{selectedContrib.author} • {selectedContrib.type}</Text>
              </View>
              <TouchableOpacity onPress={() => setSelectedContrib(null)}>
                <X size={20} color="#FFFFFF" />
              </TouchableOpacity>
            </View>

            <View style={styles.reviewContentCard}>
              <Text style={styles.reviewContentText}>
                {selectedContrib.content || 'Proposed institutional knowledge note mapping organizational procedures, timelines, and expert relations.'}
              </Text>
            </View>

            <View style={styles.modalActions}>
              <TouchableOpacity 
                style={[styles.btnCancel, { backgroundColor: '#EF4444' }]} 
                onPress={() => rejectContribution(selectedContrib.id)}
              >
                <Text style={styles.btnText}>Reject & Delete</Text>
              </TouchableOpacity>

              {selectedContrib.status === 'pending' ? (
                <TouchableOpacity 
                  style={[styles.btnSave, { backgroundColor: '#10B981' }]} 
                  onPress={() => approveAndVerifyNode(selectedContrib.id)}
                >
                  <Text style={styles.btnText}>Approve & Verify</Text>
                </TouchableOpacity>
              ) : (
                <TouchableOpacity 
                  style={[styles.btnSave, { backgroundColor: '#374151' }]} 
                  onPress={() => setSelectedContrib(null)}
                >
                  <Text style={styles.btnText}>Close Viewer</Text>
                </TouchableOpacity>
              )}
            </View>
          </View>
        </View>
      )}
    </View>
  );
}

const styles = {
  header: { flexDirection: 'row', alignItems: 'center', padding: 16, backgroundColor: '#0F172A', gap: 12 },
  backButton: { padding: 4 },
  headerTitle: { flex: 1 },
  headerTitleText: { fontSize: 20, fontWeight: 'bold', color: '#FFFFFF' },
  headerSubtitle: { fontSize: 13, color: '#9CA3AF' },
  headerAddBtn: { width: 40, height: 40, borderRadius: 20, backgroundColor: '#3B82F620', justifyContent: 'center', alignItems: 'center' },
  content: { flex: 1, paddingHorizontal: 16 },
  statsRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 8, marginBottom: 20 },
  statCard: { width: '23.5%', padding: 12, borderRadius: 12, alignItems: 'center' },
  statValue: { fontSize: 16, fontWeight: 'bold', color: '#FFFFFF', marginTop: 6 },
  statLabel: { fontSize: 9, color: '#9CA3AF', marginTop: 2, textAlign: 'center' },
  primaryButton: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', padding: 14, borderRadius: 12, gap: 8, marginBottom: 24 },
  primaryButtonText: { fontSize: 14, fontWeight: 'bold', color: '#FFFFFF' },
  section: { marginBottom: 24 },
  sectionHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 },
  sectionTitle: { fontSize: 15, fontWeight: '600', color: '#FFFFFF' },
  contribCard: { padding: 14, borderRadius: 12, marginBottom: 8, borderWidth: 1, borderColor: '#37415130' },
  contribHeader: { flexDirection: 'row', alignItems: 'flex-start' },
  contribIcon: { width: 36, height: 36, borderRadius: 10, justifyContent: 'center', alignItems: 'center' },
  contribInfo: { flex: 1, marginLeft: 12 },
  contribTitle: { fontSize: 14, fontWeight: '600', color: '#FFFFFF' },
  contribMeta: { flexDirection: 'row', alignItems: 'center', marginTop: 6, flexWrap: 'wrap', gap: 4 },
  typeBadge: { paddingHorizontal: 6, paddingVertical: 2, borderRadius: 4 },
  typeText: { fontSize: 9, color: '#3B82F6', fontWeight: '600' },
  contribAuthor: { fontSize: 11, color: '#9CA3AF' },
  contribDot: { fontSize: 11, color: '#6B7280' },
  contribAction: { fontSize: 11, color: '#9CA3AF' },
  contribTime: { fontSize: 11, color: '#6B7280' },
  contribVotes: { flexDirection: 'row', alignItems: 'center', gap: 4 },
  votesText: { fontSize: 12, color: '#6B7280' },
  contributorCard: { flexDirection: 'row', alignItems: 'center', padding: 12, borderRadius: 12, marginBottom: 8, borderWidth: 1, borderColor: '#37415130' },
  contributorAvatar: { width: 40, height: 40, borderRadius: 20, justifyContent: 'center', alignItems: 'center' },
  avatarText: { fontSize: 16, fontWeight: 'bold', color: '#FFFFFF' },
  contributorInfo: { flex: 1, marginLeft: 12 },
  contributorHeader: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  contributorName: { fontSize: 13, fontWeight: '600', color: '#FFFFFF' },
  crownBadge: { padding: 4, borderRadius: 6 },
  contributorRole: { fontSize: 11, color: '#9CA3AF' },
  contributorStats: { flexDirection: 'row', alignItems: 'center', gap: 4, marginTop: 4 },
  contribStat: { fontSize: 11, color: '#6B7280' },
  contributorScore: { alignItems: 'center', backgroundColor: '#0F172A', paddingHorizontal: 8, paddingVertical: 4, borderRadius: 6 },
  scoreText: { fontSize: 12, fontWeight: 'bold', color: '#F59E0B', marginTop: 2 },
  suggestionCard: { flexDirection: 'row', alignItems: 'center', padding: 12, borderRadius: 10, marginBottom: 6 },
  suggestionInfo: { flex: 1 },
  suggestionTitle: { fontSize: 13, color: '#FFFFFF', fontWeight: '500' },
  suggestionMeta: { flexDirection: 'row', alignItems: 'center', gap: 8, marginTop: 6 },
  suggestionCategory: { fontSize: 11, color: '#9CA3AF' },
  statusBadge: { paddingHorizontal: 6, paddingVertical: 2, borderRadius: 6 },
  statusText: { fontSize: 9, fontWeight: '600', textTransform: 'uppercase' },
  suggestionVotes: { flexDirection: 'row', alignItems: 'center', gap: 4 },
  voteCount: { fontSize: 13, fontWeight: 'bold', color: '#10B981' },
  agentsRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  agentChip: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 12, paddingVertical: 8, borderRadius: 20, gap: 6 },
  agentChipText: { fontSize: 12, fontWeight: '600' },
  modalOverlay: { position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: '#000000BA', justifyContent: 'center', alignItems: 'center', padding: 16, zIndex: 999 },
  modalCard: { width: '100%', maxWidth: 400, backgroundColor: '#1E293B', borderRadius: 16, padding: 20, borderWidth: 1, borderColor: '#374151' },
  modalHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12, borderBottomWidth: 1, borderBottomColor: '#37415150', paddingBottom: 8 },
  modalTitle: { fontSize: 16, fontWeight: 'bold', color: '#FFFFFF' },
  modalSubtitle: { fontSize: 11, color: '#9CA3AF', marginTop: 2 },
  inputLabel: { fontSize: 11, fontWeight: '600', color: '#9CA3AF', marginTop: 12, marginBottom: 6 },
  configInput: { backgroundColor: '#0F172A', color: '#FFFFFF', paddingHorizontal: 12, paddingVertical: 10, borderRadius: 8, fontSize: 12, borderWidth: 1, borderColor: '#374151' },
  typeButtonsRow: { flexDirection: 'row', gap: 6, marginTop: 4 },
  typeBtnOption: { flex: 1, paddingVertical: 8, borderRadius: 8, alignItems: 'center' },
  typeBtnText: { color: '#FFFFFF', fontSize: 10, fontWeight: '600' },
  modalActions: { flexDirection: 'row', gap: 8, marginTop: 20, borderTopWidth: 1, borderTopColor: '#37415150', paddingTop: 14 },
  btnCancel: { flex: 1, paddingVertical: 10, borderRadius: 8, alignItems: 'center' },
  btnSave: { flex: 1, paddingVertical: 10, borderRadius: 8, alignItems: 'center' },
  btnText: { fontSize: 13, fontWeight: '600', color: '#FFFFFF' },
  reviewContentCard: { backgroundColor: '#0F172A', padding: 12, borderRadius: 8, marginTop: 10, borderWidth: 1, borderColor: '#374151' },
  reviewContentText: { color: '#D1D5DB', fontSize: 12, lineHeight: 18 }
};