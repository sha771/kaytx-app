import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { useSearchCounselingSessions, useFullTextSearchSessions, useSaveSearchFilter } from '../hooks/useEnhancedCounseling';
import { AnimatedCard, AnimatedButton, Skeleton } from '@/components/ai-agent/CounselingAnimations';

export default function CounselingSearchScreen() {
  const [_searchQuery] = useState('');
  const [activeTab, setActiveTab] = useState<'Filter' | 'search'>('Filter');
  const [filters, setFilters] = useState({
    status: [] as string[],
    priority: [] as string[],
    counselingMode: [] as string[],
    tags: [] as string[],
  });
  
  const { data: searchResults, isLoading, error } = useSearchCounselingSessions(filters);
  const { data: textResults, isLoading: isTextSearching } = useFullTextSearchSessions({
    query: _searchQuery,
    fuzzy: true,
  });
  const saveSearchMutation = useSaveSearchFilter();

  const handleSaveSearch = async () => {
    try {
      await saveSearchMutation.mutateAsync({
        name: `Search ${new Date().toLocaleDateString()}`,
        filters,
      });
      Alert.alert('Success', 'Search Filter saved');
    } catch {
      Alert.alert('Error', 'Failed to save search');
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

  const statusOptions = [
    { value: 'pending', label: 'Pending' },
    { value: 'in_progress', label: 'In Progress' },
    { value: 'completed', label: 'Completed' },
    { value: 'escalated', label: 'Escalated' },
  ];

  const priorityOptions = [
    { value: 'critical', label: 'Critical' },
    { value: 'high', label: 'High' },
    { value: 'medium', label: 'Medium' },
    { value: 'low', label: 'Low' },
  ];

  const modeOptions = [
    { value: 'main_to_sub', label: 'Main to Sub' },
    { value: 'sub_to_main', label: 'Sub to Main' },
    { value: 'peer_to_peer', label: 'Peer to Peer' },
    { value: 'cross_functional', label: 'Cross Functional' },
  ];

  const toggleFilter = (category: string, value: string) => {
    setFilters(prev => ({
      ...prev,
      [category]: prev[category as keyof typeof filters].includes(value)
        ? prev[category as keyof typeof filters].filter(item => item !== value)
        : [...prev[category as keyof typeof filters], value],
    }));
  };

  const clearFilters = () => {
    setFilters({
      status: [],
      priority: [],
      counselingMode: [],
      tags: [],
    });
  };

  const hasActiveFilters = Object.values(filters).some(arr => arr.length > 0);

  const renderFilterSection = (title: string, options: any[], category: string) => (
    <View style={styles.filterSection}>
      <Text style={styles.filterSectionTitle}>{title}</Text>
      <View style={styles.filterOptions}>
        {options.map(option => (
          <TouchableOpacity
            key={option.value}
            style={[
              styles.filterChip,
              filters[category as keyof typeof filters].includes(option.value) && styles.activeFilter,
            ]}
            onPress={() => toggleFilter(category, option.value)}
          >
            <Text style={[
              styles.filterChipText,
              filters[category as keyof typeof filters].includes(option.value) && styles.activeFilterText,
            ]}>
              {option.label}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );

  const renderSessionCard = (session: any) => (
    <AnimatedCard key={session.id} style={styles.sessionCard}>
      <View style={styles.sessionHeader}>
        <Text style={styles.sessionTopic}>{session.topic}</Text>
        <View style={[
          styles.statusBadge,
          { backgroundColor: getStatusColor(session.status) }
        ]}>
          <Text style={styles.statusText}>{session.status}</Text>
        </View>
      </View>
      
      <View style={styles.sessionMeta}>
        <Text style={styles.metaText}>
          {session.initiator} → {session.participants?.join(', ')}
        </Text>
        <Text style={styles.metaText}>
          Priority: {session.priority}
        </Text>
        <Text style={styles.metaText}>
          {new Date(session.createdAt).toLocaleDateString()}
        </Text>
      </View>
      
      <View style={styles.sessionActions}>
        <AnimatedButton
          title="View Details"
          onPress={() => {
            // Navigate to session details
          }}
          variant="primary"
          size="small"
        />
      </View>
    </AnimatedCard>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Search Sessions</Text>
        {hasActiveFilters && (
          <AnimatedButton
            title="Clear Filters"
            onPress={clearFilters}
            variant="ghost"
            size="small"
          />
        )}
      </View>

      {/* Tab Navigation */}
      <View style={styles.tabContainer}>
        <TouchableOpacity
          style={[
            styles.tab,
            activeTab === 'Filter' && styles.activeTab,
          ]}
          onPress={() => setActiveTab('Filter')}
        >
          <Text style={[
            styles.tabText,
            activeTab === 'Filter' && styles.activeTabText,
          ]}>
            Filter Search
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.tab,
            activeTab === 'search' && styles.activeTab,
          ]}
          onPress={() => setActiveTab('search')}
        >
          <Text style={[
            styles.tabText,
            activeTab === 'search' && styles.activeTabText,
          ]}>
            Text Search
          </Text>
        </TouchableOpacity>
      </View>

      {/* Filter Search Tab */}
      {activeTab === 'Filter' && (
        <ScrollView style={styles.filterContent}>
          {renderFilterSection('Status', statusOptions, 'status')}
          {renderFilterSection('Priority', priorityOptions, 'priority')}
          {renderFilterSection('Counseling Mode', modeOptions, 'counselingMode')}
          
          <View style={styles.filterActions}>
            <AnimatedButton
              title="Save Search Filter"
              onPress={handleSaveSearch}
              variant="secondary"
              disabled={!hasActiveFilters}
            />
          </View>

          {/* Results */}
          <View style={styles.resultsSection}>
            <Text style={styles.resultsTitle}>
              Results ({searchResults?.total || 0})
            </Text>
            {isLoading ? (
              [1, 2, 3].map(i => (
                <Skeleton key={i} height={120} style={styles.skeleton} />
              ))
            ) : error ? (
              <Text style={styles.errorText}>Failed to load results</Text>
            ) : (
              searchResults?.sessions.map(renderSessionCard)
            )}
          </View>
        </ScrollView>
      )}

      {/* Text Search Tab */}
      {activeTab === 'search' && (
        <View style={styles.searchContent}>
          <View style={styles.searchInputContainer}>
            <Text style={styles.searchInputLabel}>Search Query</Text>
            <Text style={styles.searchInputPlaceholder}>
              Enter search terms to find sessions...
            </Text>
          </View>

          <View style={styles.searchOptions}>
            <Text style={styles.searchOptionsTitle}>Search Options</Text>
            <View style={styles.searchOption}>
              <Text style={styles.searchOptionLabel}>Fuzzy Search</Text>
              <Text style={styles.searchOptionValue}>Enabled</Text>
            </View>
            <View style={styles.searchOption}>
              <Text style={styles.searchOptionLabel}>Search Fields</Text>
              <Text style={styles.searchOptionValue}>Topic, Question, Answer</Text>
            </View>
          </View>

          {/* Text Search Results */}
          <ScrollView style={styles.textResults}>
            <Text style={styles.resultsTitle}>
              Results ({textResults?.length || 0})
            </Text>
            {isTextSearching ? (
              [1, 2, 3].map(i => (
                <Skeleton key={i} height={120} style={styles.skeleton} />
              ))
            ) : textResults?.length === 0 ? (
              <View style={styles.noResults}>
                <Text style={styles.noResultsText}>No results found</Text>
                <Text style={styles.noResultsSubtext}>
                  Try different search terms
                </Text>
              </View>
            ) : (
              textResults?.map(renderSessionCard)
            )}
          </ScrollView>
        </View>
      )}
    </View>
  );
}

function getStatusColor(status: string): string {
  const colorMap: Record<string, string> = {
    pending: '#f59e0b',
    in_progress: '#6366f1',
    completed: '#22c55e',
    escalated: '#ef4444',
    rejected: '#ef4444',
    timeout: '#6b7280',
  };
  return colorMap[status] || '#6b7280';
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9fafb',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#111827',
  },
  tabContainer: {
    flexDirection: 'row',
    marginHorizontal: 20,
    marginBottom: 20,
    backgroundColor: '#e5e7eb',
    borderRadius: 12,
    padding: 4,
  },
  tab: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  activeTab: {
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  tabText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#6b7280',
  },
  activeTabText: {
    color: '#111827',
    fontWeight: '600',
  },
  filterContent: {
    flex: 1,
    paddingHorizontal: 20,
  },
  filterSection: {
    marginBottom: 24,
  },
  filterSectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#374151',
    marginBottom: 12,
  },
  filterOptions: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  filterChip: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    backgroundColor: '#e5e7eb',
    borderWidth: 1,
    borderColor: '#d1d5db',
  },
  activeFilter: {
    backgroundColor: '#6366f1',
    borderColor: '#6366f1',
  },
  filterChipText: {
    fontSize: 12,
    color: '#374151',
    fontWeight: '500',
  },
  activeFilterText: {
    color: '#fff',
  },
  filterActions: {
    marginBottom: 24,
  },
  resultsSection: {
    flex: 1,
  },
  resultsTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#374151',
    marginBottom: 16,
  },
  sessionCard: {
    marginBottom: 12,
  },
  sessionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  sessionTopic: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
    flex: 1,
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  statusText: {
    fontSize: 12,
    color: '#fff',
    fontWeight: '500',
  },
  sessionMeta: {
    marginBottom: 12,
  },
  metaText: {
    fontSize: 12,
    color: '#9ca3af',
    marginBottom: 4,
  },
  sessionActions: {
    flexDirection: 'row',
    gap: 8,
  },
  searchContent: {
    flex: 1,
    paddingHorizontal: 20,
  },
  searchInputContainer: {
    marginBottom: 24,
  },
  searchInputLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#374151',
    marginBottom: 8,
  },
  searchInputPlaceholder: {
    fontSize: 14,
    color: '#9ca3af',
    padding: 12,
    backgroundColor: '#f9fafb',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#e5e7eb',
  },
  searchOptions: {
    marginBottom: 24,
  },
  searchOptionsTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#374151',
    marginBottom: 12,
  },
  searchOption: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
  },
  searchOptionLabel: {
    fontSize: 14,
    color: '#374151',
  },
  searchOptionValue: {
    fontSize: 14,
    color: '#6b7280',
  },
  textResults: {
    flex: 1,
  },
  noResults: {
    alignItems: 'center',
    paddingVertical: 40,
  },
  noResultsText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#374151',
    marginBottom: 8,
  },
  noResultsSubtext: {
    fontSize: 14,
    color: '#9ca3af',
    textAlign: 'center',
  },
  errorText: {
    fontSize: 14,
    color: '#ef4444',
    textAlign: 'center',
    marginTop: 20,
  },
  skeleton: {
    marginBottom: 12,
  },
});
