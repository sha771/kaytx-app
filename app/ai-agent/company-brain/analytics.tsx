import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, useSafeAreaInsets, ActivityIndicator } from 'react-native';
import { useRouter } from 'expo-router';
import { ArrowLeft, BarChart3, TrendingUp, TrendingDown, AlertTriangle, CheckCircle, Users, FileText, Search, Clock, Target, Activity, Bot, Download, RefreshCw, Filter, X, Eye, Shield, UserCheck, ArrowRight } from 'lucide-react-native';

export default function CompanyBrainAnalyticsScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();

  // Dynamic Metrics State
  const [totalCoverage, setTotalCoverage] = useState(87);
  const [freshnessScore, setFreshnessScore] = useState(92);
  const [searchSuccess, setSearchSuccess] = useState(94);
  const [atRiskCount, setAtRiskCount] = useState(12);

  const [dailySearches, setDailySearches] = useState(892);
  const [activeUsers, setActiveUsers] = useState(156);
  const [avgQueryTime, setAvgQueryTime] = useState('1.2s');
  const [knowledgeAdded, setKnowledgeAdded] = useState(234);

  // Knowledge Retention Metrics
  const [preservationRate, setPreservationRate] = useState(94);
  const [departuresHandled, setDeparturesHandled] = useState(8);
  const [knowledgeTransferred, setKnowledgeTransferred] = useState(156);
  const [transferReadiness, setTransferReadiness] = useState(87);

  // Active Lists
  const [riskAlerts, setRiskAlerts] = useState([
    { id: 'risk1', type: 'Single Point of Failure', knowledge: 'AWS Architecture', holder: 'Sarah Chen', risk: 'high', resolved: false },
    { id: 'risk2', type: 'Departure Risk', knowledge: 'Legal Contracts', holder: 'James Wilson', risk: 'high', resolved: false },
    { id: 'risk3', type: 'Outdated Content', knowledge: 'Q3 Sales Playbook', age: '90 days', risk: 'medium', resolved: false },
    { id: 'risk4', type: 'Coverage Gap', knowledge: 'Mobile App Specs', department: 'Product', risk: 'low', resolved: false }
  ]);

  const [knowledgeGaps, setKnowledgeGaps] = useState([
    { area: 'Security Protocols', department: 'IT', priority: 'high', missing: 12 },
    { area: 'Pricing Strategy', department: 'Sales', priority: 'high', missing: 8 },
    { area: 'API Documentation', department: 'Engineering', priority: 'medium', missing: 15 },
    { area: 'Customer Success Playbook', department: 'CS', priority: 'medium', missing: 6 }
  ]);

  // Interactive Audits & Resolvers
  const [isAuditing, setIsAuditing] = useState(false);
  const [auditProgress, setAuditProgress] = useState(0);
  const [auditStep, setAuditStep] = useState('');
  
  const [activeResolverRisk, setActiveResolverRisk] = useState<any>(null);
  const [isResolving, setIsResolving] = useState(false);
  const [resolveStep, setResolveStep] = useState('');
  const [showResolvedSuccess, setShowResolvedSuccess] = useState(false);

  // Selected Department Details
  const [selectedDeptId, setSelectedDeptId] = useState<string | null>(null);

  // Corporate wide refresh audit simulator
  const triggerCorporateAudit = () => {
    if (isAuditing) return;
    setIsAuditing(true);
    setAuditProgress(0);
    setAuditStep('Scanning institutional data nodes...');

    const steps = [
      { text: 'Verifying Confluence indices & Jira timelines...', progress: 30 },
      { text: 'Auditing unwritten Slack decisions regarding refunds...', progress: 60 },
      { text: 'Mapping knowledge overlaps and expert credentials...', progress: 90 },
      { text: 'Re-indexing vector schemas... Audit finalized!', progress: 100 }
    ];

    steps.forEach((step, idx) => {
      setTimeout(() => {
        setAuditStep(step.text);
        setAuditProgress(step.progress);

        if (step.progress === 100) {
          setTimeout(() => {
            setIsAuditing(false);
            // Dynamic stat update
            setTotalCoverage(91);
            setFreshnessScore(96);
            setSearchSuccess(97);
            setKnowledgeAdded(a => a + 45);
            setDailySearches(s => s + 52);
            // Solve a gap
            setKnowledgeGaps(prev => prev.filter(g => g.area !== 'API Documentation'));
          }, 500);
        }
      }, (idx + 1) * 600);
    });
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

  // SPoF Risk Mitigation Session
  const runRiskMitigationSession = (riskItem: any) => {
    setActiveResolverRisk(riskItem);
    setIsResolving(true);
    setResolveStep('Initiating autonomous keyholder transcription...');

    const steps = [
      `Connecting to ${riskItem.holder}'s workspace feeds...`,
      `Extracting undocumented playbooks regarding ${riskItem.knowledge}...`,
      'Generating step-by-step Standard Operating Procedures (SOPs)...',
      'Saving new technical markdown files to corporate Confluence folder...',
      'Mapping redundancy backups... Risk secured!'
    ];

    steps.forEach((step, idx) => {
      setTimeout(() => {
        setResolveStep(step);
        if (idx === steps.length - 1) {
          setTimeout(() => {
            setIsResolving(false);
            setShowResolvedSuccess(true);
          }, 600);
        }
      }, (idx + 1) * 650);
    });
  };

  // Close risk resolution & commit metrics
  const commitRiskResolution = () => {
    if (!activeResolverRisk) return;

    // Toggle status in list
    setRiskAlerts(prev => prev.map(r => {
      if (r.id === activeResolverRisk.id) {
        return { ...r, resolved: true, risk: 'low' };
      }
      return r;
    }));

    // Lower At-Risk metrics
    setAtRiskCount(count => Math.max(count - 1, 0));
    setTotalCoverage(cov => Math.min(cov + 2, 99));

    // Clear resolver state
    setActiveResolverRisk(null);
    setShowResolvedSuccess(false);
  };

  const DEPARTMENT_COVERAGE = [
    { id: 'eng', dept: 'Engineering', coverage: 94, experts: 23, nodes: 456, details: 'Core repos and cloud server infrastructures are fully mapped. Sarah Chen serves as Principal Lead.' },
    { id: 'sales', dept: 'Sales', coverage: 88, experts: 15, nodes: 234, details: 'Client interactions & pricing tier negotiations mapped. Mike Johnson serves as Principal Lead.' },
    { id: 'prod', dept: 'Product', coverage: 85, experts: 12, nodes: 189, details: 'Product rollouts and launch timelines documented. Emily Davis serves as Principal Lead.' },
    { id: 'mktg', dept: 'Marketing', coverage: 78, experts: 8, nodes: 145, details: 'Social campaigns & media playbooks mapped. Synchronized weekly.' },
    { id: 'ops', dept: 'Operations', coverage: 72, experts: 6, nodes: 123, details: 'Customer refunds and ticketing escalations documented. Managed by Mike Johnson.' },
    { id: 'hr', dept: 'HR', coverage: 68, experts: 5, nodes: 98, details: 'Standard onboarding and compliance interview SOPs documented.' }
  ];

  const TOP_TOPICS = [
    { topic: 'AWS Migration', searches: 1234, department: 'Engineering', trend: 'up' },
    { topic: 'Q4 Product Launch', searches: 987, department: 'Product', trend: 'up' },
    { topic: 'Security Compliance', searches: 756, department: 'Security', trend: 'stable' },
    { topic: 'Client Onboarding', searches: 654, department: 'Sales', trend: 'up' },
    { topic: 'Refund Policy', searches: 543, department: 'Operations', trend: 'down' },
  ];

  return (
    <View style={{ flex: 1, backgroundColor: '#0F172A' }}>
      {/* Header */}
      <View style={[styles.header, { paddingTop: insets.top + 8 }]}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <ArrowLeft size={24} color="#FFFFFF" />
        </TouchableOpacity>
        <View style={styles.headerTitle}>
          <Text style={styles.headerTitleText}>Analytics & Insights</Text>
          <Text style={styles.headerSubtitle}>Corporate knowledge integrity auditing metrics</Text>
        </View>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Dynamic Diagnostics progress bar */}
        {isAuditing && (
          <View style={styles.auditProgressContainer}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 8 }}>
              <Text style={styles.auditTitle}>Refreshing Corporate Audit...</Text>
              <Text style={styles.auditPct}>{auditProgress}%</Text>
            </View>
            <View style={styles.progressBarBg}>
              <View style={[styles.progressBarFill, { width: `${auditProgress}%` }]} />
            </View>
            <Text style={styles.auditStepText}>{auditStep}</Text>
          </View>
        )}

        {/* Health Metrics */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Knowledge Health Indices</Text>
          <View style={styles.healthGrid}>
            <View style={[styles.healthCard, { backgroundColor: '#10B98110', borderColor: '#10B98120', borderWidth: 1 }]}>
              <View style={[styles.healthIcon, { backgroundColor: '#10B98120' }]}>
                <FileText size={18} color="#10B981" />
              </View>
              <Text style={styles.healthValue}>{totalCoverage}%</Text>
              <Text style={styles.healthLabel}>Knowledge Coverage</Text>
              <View style={styles.healthTrend}>
                <TrendingUp size={12} color="#10B981" />
                <Text style={[styles.healthTrendText, { color: '#10B981' }]}>+5% this month</Text>
              </View>
            </View>

            <View style={[styles.healthCard, { backgroundColor: '#3B82F610', borderColor: '#3B82F620', borderWidth: 1 }]}>
              <View style={[styles.healthIcon, { backgroundColor: '#3B82F620' }]}>
                <Clock size={18} color="#3B82F6" />
              </View>
              <Text style={styles.healthValue}>{freshnessScore}%</Text>
              <Text style={styles.healthLabel}>Freshness Index</Text>
              <View style={styles.healthTrend}>
                <TrendingUp size={12} color="#10B981" />
                <Text style={[styles.healthTrendText, { color: '#10B981' }]}>+3% this week</Text>
              </View>
            </View>

            <View style={[styles.healthCard, { backgroundColor: '#10B98110', borderColor: '#10B98120', borderWidth: 1 }]}>
              <View style={[styles.healthIcon, { backgroundColor: '#10B98120' }]}>
                <Search size={18} color="#10B981" />
              </View>
              <Text style={styles.healthValue}>{searchSuccess}%</Text>
              <Text style={styles.healthLabel}>Search Success</Text>
              <View style={styles.healthTrend}>
                <TrendingUp size={12} color="#10B981" />
                <Text style={[styles.healthTrendText, { color: '#10B981' }]}>+2%</Text>
              </View>
            </View>

            <View style={[styles.healthCard, { backgroundColor: atRiskCount <= 8 ? '#10B98110' : '#F59E0B10', borderColor: atRiskCount <= 8 ? '#10B98120' : '#F59E0B20', borderWidth: 1 }]}>
              <View style={[styles.healthIcon, { backgroundColor: atRiskCount <= 8 ? '#10B98120' : '#F59E0B20' }]}>
                <AlertTriangle size={18} color={atRiskCount <= 8 ? '#10B981' : '#F59E0B'} />
              </View>
              <Text style={styles.healthValue}>{atRiskCount}</Text>
              <Text style={styles.healthLabel}>Single Node Risks</Text>
              <View style={styles.healthTrend}>
                <TrendingDown size={12} color={atRiskCount <= 8 ? '#10B981' : '#EF4444'} />
                <Text style={[styles.healthTrendText, { color: atRiskCount <= 8 ? '#10B981' : '#EF4444' }]}>{atRiskCount <= 8 ? 'Secured' : 'Needs Audit'}</Text>
              </View>
            </View>
          </View>
        </View>

        {/* Usage Stats */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Usage Analytics</Text>
          <View style={styles.usageRow}>
            {[
              { label: 'Daily Searches', value: dailySearches, change: '+12%' },
              { label: 'Active Users', value: activeUsers, change: '+8%' },
              { label: 'Avg Query Time', value: avgQueryTime, change: '-15%' },
              { label: 'Knowledge Added', value: knowledgeAdded, change: '+23%' },
            ].map((stat, idx) => (
              <View key={idx} style={[styles.usageCard, { backgroundColor: '#1E293B' }]}>
                <Text style={styles.usageValue}>{stat.value}</Text>
                <Text style={styles.usageLabel}>{stat.label}</Text>
                <View style={styles.usageChange}>
                  <TrendingUp size={11} color="#10B981" />
                  <Text style={styles.usageChangeText}>{stat.change}</Text>
                </View>
              </View>
            ))}
          </View>
        </View>

        {/* Knowledge Retention Analytics */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Knowledge Retention</Text>
          <View style={styles.retentionGrid}>
            <View style={[styles.retentionCard, { backgroundColor: '#7C3AED10', borderColor: '#7C3AED20', borderWidth: 1 }]}>
              <View style={[styles.retentionIcon, { backgroundColor: '#7C3AED20' }]}>
                <Shield size={20} color="#7C3AED" />
              </View>
              <Text style={styles.retentionValue}>{preservationRate}%</Text>
              <Text style={styles.retentionLabel}>Preservation Rate</Text>
              <View style={styles.retentionTrend}>
                <TrendingUp size={12} color="#10B981" />
                <Text style={[styles.retentionTrendText, { color: '#10B981' }]}>+5% vs last quarter</Text>
              </View>
            </View>

            <View style={[styles.retentionCard, { backgroundColor: '#10B98110', borderColor: '#10B98120', borderWidth: 1 }]}>
              <View style={[styles.retentionIcon, { backgroundColor: '#10B98120' }]}>
                <UserCheck size={20} color="#10B981" />
              </View>
              <Text style={styles.retentionValue}>{departuresHandled}</Text>
              <Text style={styles.retentionLabel}>Departures Handled</Text>
              <View style={styles.retentionTrend}>
                <CheckCircle size={12} color="#10B981" />
                <Text style={[styles.retentionTrendText, { color: '#10B981' }]}>All preserved</Text>
              </View>
            </View>

            <View style={[styles.retentionCard, { backgroundColor: '#3B82F610', borderColor: '#3B82F620', borderWidth: 1 }]}>
              <View style={[styles.retentionIcon, { backgroundColor: '#3B82F620' }]}>
                <FileText size={20} color="#3B82F6" />
              </View>
              <Text style={styles.retentionValue}>{knowledgeTransferred}</Text>
              <Text style={styles.retentionLabel}>Knowledge Nodes Transferred</Text>
              <View style={styles.retentionTrend}>
                <TrendingUp size={12} color="#10B981" />
                <Text style={[styles.retentionTrendText, { color: '#10B981' }]}>+23 this month</Text>
              </View>
            </View>

            <View style={[styles.retentionCard, { backgroundColor: transferReadiness >= 80 ? '#10B98110' : '#F59E0B10', borderColor: transferReadiness >= 80 ? '#10B98120' : '#F59E0B20', borderWidth: 1 }]}>
              <View style={[styles.retentionIcon, { backgroundColor: transferReadiness >= 80 ? '#10B98120' : '#F59E0B20' }]}>
                <Target size={20} color={transferReadiness >= 80 ? '#10B981' : '#F59E0B'} />
              </View>
              <Text style={styles.retentionValue}>{transferReadiness}%</Text>
              <Text style={styles.retentionLabel}>Transfer Readiness</Text>
              <View style={styles.retentionTrend}>
                <TrendingUp size={12} color={transferReadiness >= 80 ? '#10B981' : '#F59E0B'} />
                <Text style={[styles.retentionTrendText, { color: transferReadiness >= 80 ? '#10B981' : '#F59E0B' }]}>{transferReadiness >= 80 ? 'On track' : 'Needs attention'}</Text>
              </View>
            </View>
          </View>

          {/* Recent Departures */}
          <View style={styles.recentDepartures}>
            <Text style={styles.subsectionTitle}>Recent Departures</Text>
            {[
              { name: 'Sarah Chen', role: 'Senior Engineer', date: '2 weeks ago', preserved: true },
              { name: 'James Wilson', role: 'Legal Counsel', date: '1 month ago', preserved: true },
              { name: 'Emily Rodriguez', role: 'Product Manager', date: 'In progress', preserved: false },
            ].map((departure, idx) => (
              <View key={idx} style={[styles.departureCard, { backgroundColor: '#1E293B' }]}>
                <View style={styles.departureInfo}>
                  <Text style={styles.departureName}>{departure.name}</Text>
                  <Text style={styles.departureRole}>{departure.role}</Text>
                  <Text style={styles.departureDate}>{departure.date}</Text>
                </View>
                <View style={[styles.departureStatus, { backgroundColor: departure.preserved ? '#10B98115' : '#F59E0B15' }]}>
                  {departure.preserved ? (
                    <CheckCircle size={16} color="#10B981" />
                  ) : (
                    <Activity size={16} color="#F59E0B" />
                  )}
                  <Text style={[styles.departureStatusText, { color: departure.preserved ? '#10B981' : '#F59E0B' }]}>
                    {departure.preserved ? 'Preserved' : 'In Progress'}
                  </Text>
                </View>
              </View>
            ))}
          </View>
        </View>

        {/* Risk Alerts with Resolvers */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Institutional Risk Alerts (Mitigate SPoFs)</Text>
          {riskAlerts.map((alert) => (
            <View key={alert.id} style={[styles.riskCard, { backgroundColor: '#1E293B' }]}>
              <View style={[styles.riskIconBox, { backgroundColor: alert.risk === 'high' ? '#EF444415' : alert.risk === 'medium' ? '#F59E0B15' : '#10B98115' }]}>
                <AlertTriangle size={18} color={alert.risk === 'high' ? '#EF4444' : alert.risk === 'medium' ? '#F59E0B' : '#10B981'} />
              </View>
              <View style={styles.riskInfo}>
                <Text style={styles.riskType}>{alert.type}</Text>
                <Text style={styles.riskKnowledge}>{alert.knowledge}</Text>
                <Text style={styles.riskDetail}>
                  {alert.holder ? `Holder: ${alert.holder}` : `Age: ${alert.age}`}
                </Text>
              </View>
              {alert.resolved ? (
                <View style={styles.resolvedBadgeInline}>
                  <CheckCircle size={12} color="#10B981" />
                  <Text style={styles.resolvedBadgeTextInline}>Secured</Text>
                </View>
              ) : (
                <TouchableOpacity 
                  style={[styles.btnResolveRisk, { backgroundColor: '#7C3AED' }]}
                  onPress={() => runRiskMitigationSession(alert)}
                >
                  <RefreshCw size={11} color="#FFFFFF" style={{ marginRight: 4 }} />
                  <Text style={styles.btnResolveRiskText}>Document</Text>
                </TouchableOpacity>
              )}
            </View>
          ))}
        </View>

        {/* Department Coverage with clickable deep dives */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Department Coverage (Click to Inspect)</Text>
          {DEPARTMENT_COVERAGE.map((dept) => (
            <TouchableOpacity 
              key={dept.id} 
              style={[styles.deptCard, { backgroundColor: '#1E293B', borderWidth: 1, borderColor: selectedDeptId === dept.id ? '#3B82F6' : 'transparent' }]}
              onPress={() => setSelectedDeptId(selectedDeptId === dept.id ? null : dept.id)}
            >
              <View style={styles.deptHeader}>
                <Text style={styles.deptName}>{dept.dept}</Text>
                <Text style={styles.deptCoverage}>{dept.coverage}%</Text>
              </View>
              <View style={styles.deptBar}>
                <View style={[styles.deptBarFill, { width: `${dept.coverage}%`, backgroundColor: dept.coverage >= 80 ? '#10B981' : dept.coverage >= 60 ? '#F59E0B' : '#EF4444' }]} />
              </View>
              
              {selectedDeptId === dept.id ? (
                <View style={styles.deptDetailsDrawer}>
                  <Text style={styles.deptDetailsText}>{dept.details}</Text>
                  <View style={styles.deptMetaInline}>
                    <Text style={styles.deptMetaTextInline}>{dept.experts} Experts</Text>
                    <Text style={styles.deptMetaTextInline}>{dept.nodes} Mapped blue SOPs</Text>
                  </View>
                </View>
              ) : (
                <View style={styles.deptMeta}>
                  <View style={styles.deptMetaItem}>
                    <Users size={11} color="#6B7280" />
                    <Text style={styles.deptMetaText}>{dept.experts} experts</Text>
                  </View>
                  <View style={styles.deptMetaItem}>
                    <FileText size={11} color="#6B7280" />
                    <Text style={styles.deptMetaText}>{dept.nodes} nodes</Text>
                  </View>
                </View>
              )}
            </TouchableOpacity>
          ))}
        </View>

        {/* Top Search Topics */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Top Searched Topics</Text>
          {TOP_TOPICS.map((item, index) => (
            <View key={index} style={[styles.topicCard, { backgroundColor: '#1E293B' }]}>
              <View style={styles.topicRank}>
                <Text style={styles.topicRankText}>{index + 1}</Text>
              </View>
              <View style={styles.topicInfo}>
                <Text style={styles.topicName}>{item.topic}</Text>
                <Text style={styles.topicDept}>{item.department}</Text>
              </View>
              <View style={styles.topicStats}>
                <Text style={styles.topicSearches}>{item.searches.toLocaleString()}</Text>
                <Text style={styles.topicSearchLabel}>queries</Text>
              </View>
              <View style={[styles.topicTrend, { backgroundColor: item.trend === 'up' ? '#10B98115' : '#6B728015' }]}>
                {item.trend === 'up' ? (
                  <TrendingUp size={12} color="#10B981" />
                ) : (
                  <Activity size={12} color="#6B7280" />
                )}
              </View>
            </View>
          ))}
        </View>

        {/* Knowledge Gaps */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Outstanding Knowledge Gaps</Text>
          {knowledgeGaps.map((gap, index) => (
            <View key={index} style={[styles.gapCard, { backgroundColor: '#1E293B' }]}>
              <View style={styles.gapHeader}>
                <Text style={styles.gapArea}>{gap.area}</Text>
                <View style={[styles.gapPriority, { backgroundColor: gap.priority === 'high' ? '#EF444415' : '#F59E0B15' }]}>
                  <Text style={[styles.gapPriorityText, { color: gap.priority === 'high' ? '#EF4444' : '#F59E0B' }]}>
                    {gap.priority}
                  </Text>
                </View>
              </View>
              <View style={styles.gapDetails}>
                <Text style={styles.gapDept}>{gap.department} department</Text>
                <Text style={styles.gapMissing}>{gap.missing} SOP nodes missing</Text>
              </View>
            </View>
          ))}
        </View>

        {/* Quick Actions */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Audit Actions</Text>
          <View style={styles.actionsRow}>
            <TouchableOpacity 
              style={[styles.actionButton, { backgroundColor: '#3B82F6' }]}
              onPress={triggerCorporateAudit}
              disabled={isAuditing}
            >
              <RefreshCw size={16} color="#FFFFFF" style={{ marginRight: 6 }} />
              <Text style={styles.actionText}>Run Corporate Knowledge Audit</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={{ height: 60 }} />
      </ScrollView>

      {/* RISK MITIGATION MODAL OVERLAY */}
      {activeResolverRisk && (
        <View style={styles.modalOverlay}>
          <View style={styles.modalCard}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Redundancy Audit: {activeResolverRisk.holder}</Text>
              <TouchableOpacity onPress={() => setActiveResolverRisk(null)}>
                <X size={20} color="#FFFFFF" />
              </TouchableOpacity>
            </View>

            {isResolving ? (
              <View style={{ padding: 24, alignItems: 'center' }}>
                <ActivityIndicator size="large" color="#7C3AED" />
                <Text style={styles.resolveStepText}>{resolveStep}</Text>
              </View>
            ) : showResolvedSuccess ? (
              <View>
                <View style={styles.resolutionReport}>
                  <CheckCircle size={24} color="#10B981" />
                  <Text style={styles.resolutionTitle}>Audit & SOP successfully committed!</Text>
                  <Text style={styles.resolutionBody}>
                    Captured 8 unwritten blueprints on "{activeResolverRisk.knowledge}" from {activeResolverRisk.holder}'s Slack channels.
                  </Text>
                  <Text style={styles.resolutionSub}>
                    Nodes committed: KB-SOP-921 to KB-SOP-929.Redundancy backup assigned to David Lee.
                  </Text>
                </View>

                <View style={styles.modalActions}>
                  <TouchableOpacity 
                    style={[styles.btnSave, { backgroundColor: '#10B981' }]} 
                    onPress={commitRiskResolution}
                  >
                    <Text style={styles.btnText}>Integrate & Close Session</Text>
                  </TouchableOpacity>
                </View>
              </View>
            ) : null}
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
  content: { flex: 1, paddingHorizontal: 16 },
  auditProgressContainer: {
    backgroundColor: '#1E293B',
    padding: 14,
    borderRadius: 12,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#3B82F640'
  },
  auditTitle: { color: '#3B82F6', fontSize: 13, fontWeight: 'bold' },
  auditPct: { color: '#3B82F6', fontSize: 13, fontWeight: 'bold' },
  progressBarBg: { height: 6, backgroundColor: '#374151', borderRadius: 3, overflow: 'hidden', marginVertical: 8 },
  progressBarFill: { height: '100%', backgroundColor: '#3B82F6', borderRadius: 3 },
  auditStepText: { color: '#9CA3AF', fontSize: 11, fontFamily: 'monospace' },
  section: { marginBottom: 24 },
  sectionTitle: { fontSize: 15, fontWeight: '600', color: '#FFFFFF', marginBottom: 12 },
  healthGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  healthCard: { width: '48%', padding: 14, borderRadius: 12 },
  healthIcon: { width: 32, height: 32, borderRadius: 8, justifyContent: 'center', alignItems: 'center', marginBottom: 8 },
  healthValue: { fontSize: 20, fontWeight: 'bold', color: '#FFFFFF' },
  healthLabel: { fontSize: 11, color: '#9CA3AF', marginTop: 2, fontWeight: '500' },
  healthTrend: { flexDirection: 'row', alignItems: 'center', gap: 4, marginTop: 6 },
  healthTrendText: { fontSize: 10, fontWeight: '600' },
  usageRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  usageCard: { width: '48%', padding: 12, borderRadius: 12 },
  usageValue: { fontSize: 18, fontWeight: 'bold', color: '#FFFFFF' },
  usageLabel: { fontSize: 11, color: '#9CA3AF', marginTop: 2 },
  usageChange: { flexDirection: 'row', alignItems: 'center', gap: 4, marginTop: 6 },
  usageChangeText: { fontSize: 10, color: '#10B981', fontWeight: '600' },
  riskCard: { flexDirection: 'row', alignItems: 'center', padding: 12, borderRadius: 12, marginBottom: 8, borderWidth: 1, borderColor: '#37415130' },
  riskIconBox: { width: 36, height: 36, borderRadius: 8, justifyContent: 'center', alignItems: 'center' },
  riskInfo: { flex: 1, marginLeft: 12 },
  riskType: { fontSize: 10, color: '#6B7280', fontWeight: '600' },
  riskKnowledge: { fontSize: 13, fontWeight: '600', color: '#FFFFFF', marginTop: 1 },
  riskDetail: { fontSize: 11, color: '#9CA3AF', marginTop: 2 },
  resolvedBadgeInline: { flexDirection: 'row', alignItems: 'center', gap: 4, paddingHorizontal: 8, paddingVertical: 4, backgroundColor: '#10B98115', borderRadius: 8 },
  resolvedBadgeTextInline: { color: '#10B981', fontSize: 10, fontWeight: '700', textTransform: 'uppercase' },
  btnResolveRisk: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 8, paddingVertical: 6, borderRadius: 8 },
  btnResolveRiskText: { color: '#FFFFFF', fontSize: 10, fontWeight: 'bold' },
  deptCard: { padding: 14, borderRadius: 12, marginBottom: 8, borderWidth: 1 },
  deptHeader: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 8 },
  deptName: { fontSize: 13, fontWeight: '600', color: '#FFFFFF' },
  deptCoverage: { fontSize: 13, fontWeight: 'bold', color: '#10B981' },
  deptBar: { height: 6, backgroundColor: '#374151', borderRadius: 3, marginBottom: 8, overflow: 'hidden' },
  deptBarFill: { height: '100%', borderRadius: 3 },
  deptMeta: { flexDirection: 'row', gap: 16 },
  deptMetaItem: { flexDirection: 'row', alignItems: 'center', gap: 4 },
  deptMetaText: { fontSize: 11, color: '#6B7280' },
  deptDetailsDrawer: { marginTop: 10, borderTopWidth: 1, borderTopColor: '#37415140', paddingTop: 10 },
  deptDetailsText: { fontSize: 12, color: '#9CA3AF', lineHeight: 16 },
  deptMetaInline: { flexDirection: 'row', gap: 14, marginTop: 8 },
  deptMetaTextInline: { fontSize: 10, color: '#3B82F6', fontWeight: '600' },
  topicCard: { flexDirection: 'row', alignItems: 'center', padding: 10, borderRadius: 10, marginBottom: 6 },
  topicRank: { width: 24, height: 24, borderRadius: 12, backgroundColor: '#374151', justifyContent: 'center', alignItems: 'center' },
  topicRankText: { fontSize: 11, fontWeight: 'bold', color: '#FFFFFF' },
  topicInfo: { flex: 1, marginLeft: 12 },
  topicName: { fontSize: 13, fontWeight: '600', color: '#FFFFFF' },
  topicDept: { fontSize: 11, color: '#9CA3AF' },
  topicStats: { alignItems: 'flex-end', marginRight: 12 },
  topicSearches: { fontSize: 13, fontWeight: 'bold', color: '#FFFFFF' },
  topicSearchLabel: { fontSize: 9, color: '#6B7280' },
  topicTrend: { width: 28, height: 28, borderRadius: 6, justifyContent: 'center', alignItems: 'center' },
  gapCard: { padding: 14, borderRadius: 12, marginBottom: 8 },
  gapHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 },
  gapArea: { fontSize: 13, fontWeight: '600', color: '#FFFFFF' },
  gapPriority: { paddingHorizontal: 8, paddingVertical: 2, borderRadius: 6 },
  gapPriorityText: { fontSize: 10, fontWeight: '600', textTransform: 'uppercase' },
  gapDetails: { flexDirection: 'row', justifyContent: 'space-between' },
  gapDept: { fontSize: 11, color: '#9CA3AF' },
  gapMissing: { fontSize: 11, color: '#EF4444', fontWeight: '500' },
  actionsRow: { flexDirection: 'row', gap: 8 },
  actionButton: { flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', padding: 14, borderRadius: 12 },
  actionText: { fontSize: 13, color: '#FFFFFF', fontWeight: 'bold' },
  modalOverlay: { position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: '#000000BA', justifyContent: 'center', alignItems: 'center', padding: 16, zIndex: 999 },
  modalCard: { width: '100%', maxWidth: 400, backgroundColor: '#1E293B', borderRadius: 16, padding: 20, borderWidth: 1, borderColor: '#374151' },
  modalHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12, borderBottomWidth: 1, borderBottomColor: '#37415150', paddingBottom: 8 },
  modalTitle: { fontSize: 16, fontWeight: 'bold', color: '#FFFFFF' },
  resolveStepText: { color: '#7C3AED', fontSize: 12, fontWeight: '600', marginTop: 12, textAlign: 'center' },
  resolutionReport: { alignItems: 'center', padding: 10 },
  resolutionTitle: { fontSize: 14, fontWeight: 'bold', color: '#10B981', marginTop: 12, textAlign: 'center' },
  resolutionBody: { color: '#FFFFFF', fontSize: 12, marginTop: 8, textAlign: 'center', lineHeight: 16 },
  resolutionSub: { color: '#9CA3AF', fontSize: 10, marginTop: 6, textAlign: 'center', lineHeight: 14 },
  modalActions: { flexDirection: 'row', gap: 8, marginTop: 20, borderTopWidth: 1, borderTopColor: '#37415150', paddingTop: 14 },
  btnSave: { flex: 1, paddingVertical: 10, borderRadius: 8, alignItems: 'center' },
  btnText: { fontSize: 13, fontWeight: '600', color: '#FFFFFF' },
  retentionGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  retentionCard: { width: '48%', padding: 14, borderRadius: 12 },
  retentionIcon: { width: 36, height: 36, borderRadius: 10, justifyContent: 'center', alignItems: 'center', marginBottom: 10 },
  retentionValue: { fontSize: 22, fontWeight: 'bold', color: '#FFFFFF' },
  retentionLabel: { fontSize: 11, color: '#9CA3AF', marginTop: 4, fontWeight: '500' },
  retentionTrend: { flexDirection: 'row', alignItems: 'center', gap: 4, marginTop: 8 },
  retentionTrendText: { fontSize: 10, fontWeight: '600' },
  recentDepartures: { marginTop: 16 },
  subsectionTitle: { fontSize: 13, fontWeight: '600', color: '#FFFFFF', marginBottom: 10 },
  departureCard: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', padding: 14, borderRadius: 12, marginBottom: 8, borderWidth: 1, borderColor: '#37415130' },
  departureInfo: { flex: 1 },
  departureName: { fontSize: 13, fontWeight: '600', color: '#FFFFFF' },
  departureRole: { fontSize: 11, color: '#9CA3AF', marginTop: 2 },
  departureDate: { fontSize: 10, color: '#6B7280', marginTop: 2 },
  departureStatus: { flexDirection: 'row', alignItems: 'center', gap: 6, paddingHorizontal: 10, paddingVertical: 6, borderRadius: 8 },
  departureStatusText: { fontSize: 11, fontWeight: '600' }
};