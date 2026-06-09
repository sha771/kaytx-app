import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert, Share } from 'react-native';
import { useExportCounselingSessions, useGenerateCounselingReport } from '../hooks/useEnhancedCounseling';
import { AnimatedCard, AnimatedButton } from '../../components/ai-agent/CounselingAnimations';

export default function CounselingExportScreen() {
  const [selectedFormat, setSelectedFormat] = useState('json');
  const [exportOptions, setExportOptions] = useState({
    includeRequests: true,
    includeResponses: true,
    includeMetadata: true,
    includeMetrics: false,
    anonymize: false,
  });
  const [reportType, setReportType] = useState('summary');
  
  const exportMutation = useExportCounselingSessions();
  const reportMutation = useGenerateCounselingReport();

  const exportFormats = [
    { value: 'json', label: 'JSON', description: 'Machine-readable format' },
    { value: 'csv', label: 'CSV', description: 'Spreadsheet compatible' },
    { value: 'pdf', label: 'PDF', description: 'Document format' },
    { value: 'markdown', label: 'Markdown', description: 'Text documentation' },
    { value: 'xlsx', label: 'Excel', description: 'Advanced spreadsheet' },
  ];

  const reportTypes = [
    { value: 'summary', label: 'Summary Report', description: 'High-level overview' },
    { value: 'detailed', label: 'Detailed Report', description: 'Complete session data' },
    { value: 'analytics', label: 'Analytics Report', description: 'Performance metrics' },
    { value: 'compliance', label: 'Compliance Report', description: 'Audit documentation' },
    { value: 'custom', label: 'Custom Report', description: 'Tailored format' },
  ];

  const handleExport = async () => {
    try {
      const result = await exportMutation.mutateAsync({
        format: selectedFormat as any,
        ...exportOptions,
      });
      
      Alert.alert(
        'Export Complete',
        `Exported ${result.filename} (${(result.size / 1024).toFixed(1)} KB)`,
        [
          {
            text: 'Share',
            onPress: () => {
              // Share the exported file
              Share.share({
                url: result.content,
                title: result.filename,
              });
            },
          },
          {
            text: 'OK',
            style: 'default',
          },
        ]
      );
    } catch {
      Alert.alert('Error', 'Failed to export sessions');
    }
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

  const handleGenerateReport = async () => {
    try {
      const report = await reportMutation.mutateAsync({
        title: `${reportType.charAt(0).toUpperCase() + reportType.slice(1)} Report`,
        type: reportType as any,
        period: {
          start: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000), // Last 30 days
          end: new Date(),
        },
      });
      
      Alert.alert(
        'Report Generated',
        `Report ${report.reportId} generated successfully`,
        [
          {
            text: 'View Report',
            onPress: () => {
              // Navigate to report viewer
            },
          },
          {
            text: 'OK',
            style: 'default',
          },
        ]
      );
    } catch {
      Alert.alert('Error', 'Failed to generate report');
    }
  };

  const toggleOption = (option: keyof typeof exportOptions) => {
    setExportOptions(prev => ({
      ...prev,
      [option]: !prev[option],
    }));
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Export & Reports</Text>
      </View>

      <ScrollView style={styles.content}>
        {/* Export Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Export Sessions</Text>
          
          {/* Format Selection */}
          <View style={styles.formatSection}>
            <Text style={styles.formatTitle}>Export Format</Text>
            {exportFormats.map(format => (
              <AnimatedCard
                key={format.value}
                style={[
                  styles.formatCard,
                  selectedFormat === format.value && styles.selectedFormat,
                ]}
                onPress={() => setSelectedFormat(format.value)}
              >
                <View style={styles.formatHeader}>
                  <Text style={styles.formatName}>{format.label}</Text>
                  <View style={[
                    styles.formatRadio,
                    selectedFormat === format.value && styles.selectedRadio,
                  ]}>
                    {selectedFormat === format.value && (
                      <View style={styles.radioInner} />
                    )}
                  </View>
                </View>
                <Text style={styles.formatDescription}>{format.description}</Text>
              </AnimatedCard>
            ))}
          </View>

          {/* Export Options */}
          <View style={styles.optionsSection}>
            <Text style={styles.optionsTitle}>Export Options</Text>
            {Object.entries(exportOptions).map(([key, value]) => (
              <TouchableOpacity
                key={key}
                style={styles.optionRow}
                onPress={() => toggleOption(key as keyof typeof exportOptions)}
              >
                <Text style={styles.optionLabel}>
                  {key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
                </Text>
                <View style={[
                  styles.optionToggle,
                  value && styles.optionToggleOn,
                ]}>
                  <Text style={styles.optionToggleTextOn}>
                    {value ? 'ON' : 'OFF'}
                  </Text>
                </View>
              </TouchableOpacity>
            ))}
          </View>

          <AnimatedButton
            title="Export Sessions"
            onPress={handleExport}
            variant="primary"
            loading={exportMutation.isLoading}
            disabled={exportMutation.isLoading}
          />
        </View>

        {/* Reports Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Generate Reports</Text>
          
          <View style={styles.reportSection}>
            <Text style={styles.reportTitle}>Report Type</Text>
            {reportTypes.map(type => (
              <AnimatedCard
                key={type.value}
                style={[
                  styles.reportCard,
                  reportType === type.value && styles.selectedReport,
                ]}
                onPress={() => setReportType(type.value)}
              >
                <View style={styles.reportHeader}>
                  <Text style={styles.reportName}>{type.label}</Text>
                  <View style={[
                    styles.reportRadio,
                    reportType === type.value && styles.selectedRadio,
                  ]}>
                    {reportType === type.value && (
                      <View style={styles.radioInner} />
                    )}
                  </View>
                </View>
                <Text style={styles.reportDescription}>{type.description}</Text>
              </AnimatedCard>
            ))}
          </View>

          <AnimatedButton
            title="Generate Report"
            onPress={handleGenerateReport}
            variant="primary"
            loading={reportMutation.isLoading}
            disabled={reportMutation.isLoading}
          />
        </View>

        {/* Recent Exports */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Recent Exports</Text>
          <Text style={styles.noExportsText}>
            No recent exports. Export sessions to see history here.
          </Text>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9fafb',
  },
  header: {
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#111827',
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
  },
  section: {
    marginBottom: 32,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#374151',
    marginBottom: 16,
  },
  formatSection: {
    marginBottom: 24,
  },
  formatTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#374151',
    marginBottom: 12,
  },
  formatCard: {
    marginBottom: 12,
    borderLeftWidth: 4,
    borderLeftColor: '#e5e7eb',
  },
  selectedFormat: {
    borderLeftColor: '#6366f1',
    backgroundColor: '#f0f9ff',
  },
  formatHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  formatName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
  },
  formatRadio: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#d1d5db',
    justifyContent: 'center',
    alignItems: 'center',
  },
  selectedRadio: {
    borderColor: '#6366f1',
  },
  radioInner: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#6366f1',
  },
  formatDescription: {
    fontSize: 14,
    color: '#6b7280',
  },
  optionsSection: {
    marginBottom: 24,
  },
  optionsTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#374151',
    marginBottom: 12,
  },
  optionRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
  },
  optionLabel: {
    fontSize: 14,
    color: '#374151',
  },
  optionToggle: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
    backgroundColor: '#e5e7eb',
  },
  optionToggleOn: {
    backgroundColor: '#6366f1',
  },
  optionToggleTextOn: {
    fontSize: 12,
    fontWeight: '600',
    color: '#ffffff',
  },
  reportSection: {
    marginBottom: 24,
  },
  reportTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#374151',
    marginBottom: 12,
  },
  reportCard: {
    marginBottom: 12,
    borderLeftWidth: 4,
    borderLeftColor: '#e5e7eb',
  },
  selectedReport: {
    borderLeftColor: '#6366f1',
    backgroundColor: '#f0f9ff',
  },
  reportHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  reportName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
  },
  reportRadio: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#d1d5db',
    justifyContent: 'center',
    alignItems: 'center',
  },
  reportDescription: {
    fontSize: 14,
    color: '#6b7280',
  },
  noExportsText: {
    fontSize: 14,
    color: '#9ca3af',
    textAlign: 'center',
    fontStyle: 'italic',
  },
});
