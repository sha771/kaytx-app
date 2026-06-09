import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Clipboard,
} from 'react-native';
import { useRouter } from 'expo-router';
import {
  ChevronLeft,
  Code,
  Terminal,
  Book,
  Globe,
  Key,
  Server,
  ChevronRight,
  Copy,
  Check,
  Play,
  EllipsisVertical,
  FileCode,
  Search,
  Star,
  Zap,
  Shield,
  CircleAlert,
  ExternalLink,
  Download,
} from 'lucide-react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Animated, { FadeInUp } from 'react-native-reanimated';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';

// Types
interface ApiEndpoint {
  id: string;
  method: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';
  path: string;
  name: string;
  description: string;
  category: string;
  parameters?: ApiParameter[];
  responses?: ApiResponse[];
}

interface ApiParameter {
  name: string;
  type: string;
  required: boolean;
  description: string;
}

interface ApiResponse {
  code: number;
  description: string;
  example: string;
}

// Mock Data
const API_ENDPOINTS: ApiEndpoint[] = [
  {
    id: '1',
    method: 'POST',
    path: '/api/v1/agents/chat',
    name: 'Send Message',
    description: 'Send a message to an AI agent and receive a response',
    category: 'Agents',
    parameters: [
      { name: 'agent_id', type: 'string', required: true, description: 'ID of the agent to chat with' },
      { name: 'message', type: 'string', required: true, description: 'Message content' },
      { name: 'session_id', type: 'string', required: false, description: 'Session identifier for context' },
    ],
    responses: [
      { code: 200, description: 'Success', example: '{"response": "Hello! How can I help?", "session_id": "abc123"}' },
      { code: 404, description: 'Agent not found', example: '{"error": "Agent not found"}' },
    ],
  },
  {
    id: '2',
    method: 'GET',
    path: '/api/v1/agents',
    name: 'List Agents',
    description: 'Get a list of all available AI agents',
    category: 'Agents',
    parameters: [
      { name: 'limit', type: 'integer', required: false, description: 'Maximum number of results (default: 20)' },
      { name: 'offset', type: 'integer', required: false, description: 'Pagination offset' },
    ],
    responses: [
      { code: 200, description: 'Success', example: '{"agents": [{"id": "1", "name": "Support AI"}], "total": 5}' },
    ],
  },
  {
    id: '3',
    method: 'POST',
    path: '/api/v1/workflows/execute',
    name: 'Execute Workflow',
    description: 'Trigger a workflow execution',
    category: 'Workflows',
    parameters: [
      { name: 'workflow_id', type: 'string', required: true, description: 'ID of the workflow to execute' },
      { name: 'input', type: 'object', required: false, description: 'Input data for the workflow' },
    ],
    responses: [
      { code: 202, description: 'Accepted', example: '{"execution_id": "exec_123", "status": "running"}' },
    ],
  },
  {
    id: '4',
    method: 'GET',
    path: '/api/v1/analytics/conversations',
    name: 'Get Analytics',
    description: 'Retrieve conversation analytics data',
    category: 'Analytics',
    parameters: [
      { name: 'start_date', type: 'string', required: true, description: 'Start date (ISO 8601)' },
      { name: 'end_date', type: 'string', required: true, description: 'End date (ISO 8601)' },
      { name: 'agent_id', type: 'string', required: false, description: 'Filter by specific agent' },
    ],
    responses: [
      { code: 200, description: 'Success', example: '{"total_conversations": 1234, "avg_duration": 120}' },
    ],
  },
  {
    id: '5',
    method: 'POST',
    path: '/api/v1/knowledge/upload',
    name: 'Upload Knowledge',
    description: 'Upload knowledge base documents or FAQs',
    category: 'Knowledge Base',
    parameters: [
      { name: 'file', type: 'file', required: true, description: 'Document file to upload' },
      { name: 'category', type: 'string', required: false, description: 'Knowledge category' },
    ],
    responses: [
      { code: 201, description: 'Created', example: '{"document_id": "doc_123", "status": "processing"}' },
    ],
  },
];

const METHOD_COLORS = {
  GET: '#10B981',
  POST: '#3B82F6',
  PUT: '#F59E0B',
  DELETE: '#EF4444',
  PATCH: '#8B5CF6',
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

export default function ApiDocumentationScreen() {
  const router = useRouter();
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];

  const [activeTab, setActiveTab] = useState<'overview' | 'endpoints' | 'code'>('overview');
  const [selectedEndpoint, setSelectedEndpoint] = useState<ApiEndpoint | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [copied, setCopied] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState('curl');

  const filteredEndpoints = API_ENDPOINTS.filter(
    e =>
      e.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      e.path.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const categories = [...new Set(API_ENDPOINTS.map(e => e.category))];

  const copyToClipboard = (text: string) => {
    // Mock clipboard action
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const getCodeExample = (endpoint: ApiEndpoint) => {
    const baseUrl = 'https://api.kaytx.ai';
    
    switch (selectedLanguage) {
      case 'curl':
        return `curl -X ${endpoint.method} \\\n  ${baseUrl}${endpoint.path} \\\n  -H "Authorization: Bearer YOUR_API_KEY" \\\n  -H "Content-Type: application/json"${endpoint.method !== 'GET' ? ` \\\n  -d '${JSON.stringify({ example: 'data' })}'` : ''}`;
      case 'javascript':
        return `fetch('${baseUrl}${endpoint.path}', {
  method: '${endpoint.method}',
  headers: {
    'Authorization': 'Bearer YOUR_API_KEY',
    'Content-Type': 'application/json'
  },${endpoint.method !== 'GET' ? `
  body: JSON.stringify({
    example: 'data'
  })` : ''}
})
.then(response => response.json())
.then(data => console.log(data));`;
      case 'python':
        return `import requests

response = requests.${endpoint.method.toLowerCase()}(
    '${baseUrl}${endpoint.path}',
    headers={'Authorization': 'Bearer YOUR_API_KEY'},
    ${endpoint.method !== 'GET' ? `json={'example': 'data'}` : ''}
)
print(response.json())`;
      default:
        return '';
    }
  };

  const renderEndpointCard = (endpoint: ApiEndpoint, index: number) => {
    const isExpanded = selectedEndpoint?.id === endpoint.id;

    return (
      <Animated.View
        key={endpoint.id}
        entering={FadeInUp.delay(index * 50)}
        style={[styles.endpointCard, { backgroundColor: colors.card }]}
      >
        <TouchableOpacity
          style={styles.endpointHeader}
          onPress={() => setSelectedEndpoint(isExpanded ? null : endpoint)}
        >
          <View style={[styles.methodBadge, { backgroundColor: METHOD_COLORS[endpoint.method] + '15' }]}>
            <Text style={[styles.methodText, { color: METHOD_COLORS[endpoint.method] }]}>
              {endpoint.method}
            </Text>
          </View>
          <View style={styles.endpointInfo}>
            <Text style={[styles.endpointPath, { color: colors.text }]}>{endpoint.path}</Text>
            <Text style={[styles.endpointName, { color: colors.icon }]}>{endpoint.name}</Text>
          </View>
          <ChevronRight
            size={18}
            color={colors.icon}
            style={[styles.expandIcon, isExpanded && styles.expandIconRotated]}
          />
        </TouchableOpacity>

        {isExpanded && (
          <Animated.View entering={FadeInUp} style={styles.endpointDetails}>
            <Text style={[styles.endpointDescription, { color: colors.icon }]}>
              {endpoint.description}
            </Text>

            {/* Parameters */}
            {endpoint.parameters && endpoint.parameters.length > 0 && (
              <View style={styles.section}>
                <Text style={[styles.sectionTitle, { color: colors.text }]}>Parameters</Text>
                {endpoint.parameters.map((param, i) => (
                  <View key={i} style={styles.parameterRow}>
                    <View style={styles.paramName}>
                      <Text style={[styles.paramNameText, { color: colors.text }]}>
                        {param.name}
                      </Text>
                      {param.required && (
                        <Text style={[styles.requiredBadge, { color: '#EF4444' }]}>required</Text>
                      )}
                    </View>
                    <Text style={[styles.paramType, { color: colors.icon }]}>{param.type}</Text>
                    <Text style={[styles.paramDesc, { color: colors.icon }]}>{param.description}</Text>
                  </View>
                ))}
              </View>
            )}

            {/* Code Example */}
            <View style={styles.section}>
              <View style={styles.codeHeader}>
                <Text style={[styles.sectionTitle, { color: colors.text }]}>Example</Text>
                <View style={styles.languageSelector}>
                  {['curl', 'javascript', 'python'].map(lang => (
                    <TouchableOpacity
                      key={lang}
                      style={[
                        styles.langChip,
                        { backgroundColor: selectedLanguage === lang ? colors.tint : colors.background },
                      ]}
                      onPress={() => setSelectedLanguage(lang)}
                    >
                      <Text
                        style={[
                          styles.langText,
                          { color: selectedLanguage === lang ? 'white' : colors.icon },
                        ]}
                      >
                        {lang}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </View>
              </View>
              <View style={[styles.codeBlock, { backgroundColor: colors.background }]}>
                <TouchableOpacity
                  style={styles.copyButton}
                  onPress={() => copyToClipboard(getCodeExample(endpoint))}
                >
                  {copied ? (
                    <Check size={14} color="#10B981" />
                  ) : (
                    <Copy size={14} color={colors.icon} />
                  )}
                </TouchableOpacity>
                <Text style={[styles.codeText, { color: colors.text }]}>
                  {getCodeExample(endpoint)}
                </Text>
              </View>
            </View>

            {/* Responses */}
            {endpoint.responses && (
              <View style={styles.section}>
                <Text style={[styles.sectionTitle, { color: colors.text }]}>Responses</Text>
                {endpoint.responses.map((resp, i) => (
                  <View key={i} style={styles.responseRow}>
                    <View
                      style={[
                        styles.statusBadge,
                        { backgroundColor: resp.code < 300 ? '#10B981' + '15' : '#EF4444' + '15' },
                      ]}
                    >
                      <Text
                        style={[
                          styles.statusCode,
                          { color: resp.code < 300 ? '#10B981' : '#EF4444' },
                        ]}
                      >
                        {resp.code}
                      </Text>
                    </View>
                    <View style={styles.responseInfo}>
                      <Text style={[styles.responseDesc, { color: colors.icon }]}>
                        {resp.description}
                      </Text>
                      <Text style={[styles.responseExample, { color: colors.icon }]} numberOfLines={2}>
                        {resp.example}
                      </Text>
                    </View>
                  </View>
                ))}
              </View>
            )}
          </Animated.View>
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
              API Documentation
            </Text>
            <Text style={[styles.headerSubtitle, { color: colors.icon }]}>
              Developer portal & reference
            </Text>
          </View>
        </View>
        <TouchableOpacity>
          <Globe size={24} color={colors.text} />
        </TouchableOpacity>
      </View>

      {/* Quick Stats */}
      <View style={styles.statsRow}>
        <View style={[styles.statCard, { backgroundColor: colors.card }]}>
          <View style={[styles.statIcon, { backgroundColor: '#3B82F6' + '15' }]}>
            <Server size={18} color="#3B82F6" />
          </View>
          <Text style={[styles.statValue, { color: colors.text }]}>{API_ENDPOINTS.length}</Text>
          <Text style={[styles.statLabel, { color: colors.icon }]}>Endpoints</Text>
        </View>
        <View style={[styles.statCard, { backgroundColor: colors.card }]}>
          <View style={[styles.statIcon, { backgroundColor: '#10B981' + '15' }]}>
            <Zap size={18} color="#10B981" />
          </View>
          <Text style={[styles.statValue, { color: colors.text }]}>99.9%</Text>
          <Text style={[styles.statLabel, { color: colors.icon }]}>Uptime</Text>
        </View>
        <View style={[styles.statCard, { backgroundColor: colors.card }]}>
          <View style={[styles.statIcon, { backgroundColor: '#F59E0B' + '15' }]}>
            <Shield size={18} color="#F59E0B" />
          </View>
          <Text style={[styles.statValue, { color: colors.text }]}>v1</Text>
          <Text style={[styles.statLabel, { color: colors.icon }]}>Version</Text>
        </View>
      </View>

      {/* Tabs */}
      <View style={styles.tabContainer}>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'overview' && { backgroundColor: colors.tint }]}
          onPress={() => setActiveTab('overview')}
        >
          <Book size={16} color={activeTab === 'overview' ? 'white' : colors.icon} />
          <Text style={[styles.tabText, { color: activeTab === 'overview' ? 'white' : colors.text }]}>
            Overview
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'endpoints' && { backgroundColor: colors.tint }]}
          onPress={() => setActiveTab('endpoints')}
        >
          <Terminal size={16} color={activeTab === 'endpoints' ? 'white' : colors.icon} />
          <Text style={[styles.tabText, { color: activeTab === 'endpoints' ? 'white' : colors.text }]}>
            Endpoints
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'code' && { backgroundColor: colors.tint }]}
          onPress={() => setActiveTab('code')}
        >
          <Code size={16} color={activeTab === 'code' ? 'white' : colors.icon} />
          <Text style={[styles.tabText, { color: activeTab === 'code' ? 'white' : colors.text }]}>
            SDKs
          </Text>
        </TouchableOpacity>
      </View>

      {/* Content */}
      <ScrollView
        style={styles.content}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.contentContainer}
      >
        {activeTab === 'overview' && (
          <Animated.View entering={FadeInUp} style={styles.overviewContent}>
            <View style={[styles.introCard, { backgroundColor: colors.card }]}>
              <Text style={[styles.introTitle, { color: colors.text }]}>
                Getting Started
              </Text>
              <Text style={[styles.introText, { color: colors.icon }]}>
                The Kaytx AI API enables you to integrate intelligent agents into your applications. 
                Authenticate using API keys and interact with agents programmatically.
              </Text>

              <View style={styles.quickStart}>
                <Text style={[styles.quickStartTitle, { color: colors.text }]}>
                  Quick Start
                </Text>
                <View style={styles.step}>
                  <View style={[styles.stepNumber, { backgroundColor: colors.tint }]}>
                    <Text style={styles.stepNumberText}>1</Text>
                  </View>
                  <View style={styles.stepContent}>
                    <Text style={[styles.stepTitle, { color: colors.text }]}>
                      Get your API key
                    </Text>
                    <Text style={[styles.stepDesc, { color: colors.icon }]}>
                      Create an API key from the Integrations page
                    </Text>
                  </View>
                </View>
                <View style={styles.step}>
                  <View style={[styles.stepNumber, { backgroundColor: colors.tint }]}>
                    <Text style={styles.stepNumberText}>2</Text>
                  </View>
                  <View style={styles.stepContent}>
                    <Text style={[styles.stepTitle, { color: colors.text }]}>
                      Make your first request
                    </Text>
                    <Text style={[styles.stepDesc, { color: colors.icon }]}>
                      Use the endpoint reference below to start chatting
                    </Text>
                  </View>
                </View>
              </View>
            </View>

            <View style={[styles.baseUrlCard, { backgroundColor: colors.card }]}>
              <Text style={[styles.baseUrlTitle, { color: colors.text }]}>
                Base URL
              </Text>
              <View style={styles.baseUrlRow}>
                <Code size={16} color={colors.icon} />
                <Text style={[styles.baseUrl, { color: colors.text }]}>
                  https://api.kaytx.ai/v1
                </Text>
                <TouchableOpacity onPress={() => copyToClipboard('https://api.kaytx.ai/v1')}>
                  {copied ? (
                    <Check size={16} color="#10B981" />
                  ) : (
                    <Copy size={16} color={colors.icon} />
                  )}
                </TouchableOpacity>
              </View>
            </View>

            <View style={[styles.authCard, { backgroundColor: colors.card }]}>
              <Text style={[styles.authTitle, { color: colors.text }]}>
                Authentication
              </Text>
              <Text style={[styles.authText, { color: colors.icon }]}>
                Include your API key in the Authorization header:
              </Text>
              <View style={[styles.codeBlock, { backgroundColor: colors.background }]}>
                <Text style={[styles.codeText, { color: colors.text }]}>
                  Authorization: Bearer YOUR_API_KEY
                </Text>
              </View>
            </View>
          </Animated.View>
        )}

        {activeTab === 'endpoints' && (
          <>
            <View style={[styles.searchContainer, { backgroundColor: colors.card }]}>
              <Search size={18} color={colors.icon} />
              <TextInput
                style={[styles.searchInput, { color: colors.text }]}
                placeholder="Search endpoints..."
                placeholderTextColor={colors.icon}
                value={searchQuery}
                onChangeText={setSearchQuery}
              />
            </View>

            {categories.map(category => (
              <View key={category}>
                <Text style={[styles.categoryTitle, { color: colors.text }]}>
                  {category}
                </Text>
                {filteredEndpoints
                  .filter(e => e.category === category)
                  .map((endpoint, index) => renderEndpointCard(endpoint, index))}
              </View>
            ))}
          </>
        )}

        {activeTab === 'code' && (
          <Animated.View entering={FadeInUp} style={styles.sdkContent}>
            <View style={[styles.sdkCard, { backgroundColor: colors.card }]}>
              <View style={[styles.sdkIcon, { backgroundColor: '#F7DF1E' + '20' }]}>
                <FileCode size={32} color="#F7DF1E" />
              </View>
              <Text style={[styles.sdkName, { color: colors.text }]}>
                JavaScript SDK
              </Text>
              <Text style={[styles.sdkDesc, { color: colors.icon }]}>
                Official JavaScript/TypeScript SDK for web and Node.js
              </Text>
              <TouchableOpacity style={[styles.sdkButton, { backgroundColor: colors.tint + '15' }]}>
                <ExternalLink size={16} color={colors.tint} />
                <Text style={[styles.sdkButtonText, { color: colors.tint }]}>
                  View on npm
                </Text>
              </TouchableOpacity>
            </View>

            <View style={[styles.sdkCard, { backgroundColor: colors.card }]}>
              <View style={[styles.sdkIcon, { backgroundColor: '#3776AB' + '20' }]}>
                <FileCode size={32} color="#3776AB" />
              </View>
              <Text style={[styles.sdkName, { color: colors.text }]}>
                Python SDK
              </Text>
              <Text style={[styles.sdkDesc, { color: colors.icon }]}>
                Official Python SDK with async support
              </Text>
              <TouchableOpacity style={[styles.sdkButton, { backgroundColor: colors.tint + '15' }]}>
                <ExternalLink size={16} color={colors.tint} />
                <Text style={[styles.sdkButtonText, { color: colors.tint }]}>
                  View on PyPI
                </Text>
              </TouchableOpacity>
            </View>

            <View style={[styles.postmanCard, { backgroundColor: colors.card }]}>
              <Text style={[styles.postmanTitle, { color: colors.text }]}>
                Postman Collection
              </Text>
              <Text style={[styles.postmanDesc, { color: colors.icon }]}>
                Import our complete Postman collection to test all endpoints
              </Text>
              <TouchableOpacity style={[styles.postmanButton, { backgroundColor: '#FF6C37' }]}>
                <Download size={16} color="white" />
                <Text style={styles.postmanButtonText}>Download Collection</Text>
              </TouchableOpacity>
            </View>
          </Animated.View>
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
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 2,
  },
  statLabel: {
    fontSize: 12,
  },
  tabContainer: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    gap: 8,
    marginBottom: 16,
  },
  tab: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
    borderRadius: 10,
    gap: 6,
  },
  tabText: {
    fontSize: 13,
    fontWeight: '600',
  },
  content: {
    flex: 1,
  },
  contentContainer: {
    padding: 16,
    paddingTop: 0,
  },
  overviewContent: {
    gap: 16,
  },
  introCard: {
    padding: 20,
    borderRadius: 16,
  },
  introTitle: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 12,
  },
  introText: {
    fontSize: 14,
    lineHeight: 22,
    marginBottom: 20,
  },
  quickStart: {
    gap: 12,
  },
  quickStartTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
  },
  step: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 12,
  },
  stepNumber: {
    width: 28,
    height: 28,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
  },
  stepNumberText: {
    color: 'white',
    fontSize: 14,
    fontWeight: '600',
  },
  stepContent: {
    flex: 1,
  },
  stepTitle: {
    fontSize: 15,
    fontWeight: '500',
    marginBottom: 2,
  },
  stepDesc: {
    fontSize: 13,
  },
  baseUrlCard: {
    padding: 16,
    borderRadius: 16,
  },
  baseUrlTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 12,
  },
  baseUrlRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  baseUrl: {
    flex: 1,
    fontSize: 15,
    fontWeight: '500',
  },
  authCard: {
    padding: 16,
    borderRadius: 16,
  },
  authTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
  },
  authText: {
    fontSize: 14,
    marginBottom: 12,
  },
  codeBlock: {
    padding: 12,
    borderRadius: 8,
    position: 'relative',
  },
  codeText: {
    fontSize: 13,
    fontFamily: 'monospace',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderRadius: 10,
    marginBottom: 16,
  },
  searchInput: {
    flex: 1,
    marginLeft: 10,
    fontSize: 15,
  },
  categoryTitle: {
    fontSize: 14,
    fontWeight: '600',
    textTransform: 'uppercase',
    marginBottom: 12,
    marginTop: 8,
  },
  endpointCard: {
    borderRadius: 12,
    marginBottom: 12,
    overflow: 'hidden',
  },
  endpointHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 14,
  },
  methodBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
    marginRight: 12,
  },
  methodText: {
    fontSize: 12,
    fontWeight: '700',
  },
  endpointInfo: {
    flex: 1,
  },
  endpointPath: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 2,
  },
  endpointName: {
    fontSize: 12,
  },
  expandIcon: {
    marginLeft: 8,
  },
  expandIconRotated: {
    transform: [{ rotate: '90deg' }],
  },
  endpointDetails: {
    padding: 14,
    paddingTop: 0,
  },
  endpointDescription: {
    fontSize: 13,
    lineHeight: 18,
    marginBottom: 16,
  },
  section: {
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 10,
  },
  parameterRow: {
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  paramName: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 4,
  },
  paramNameText: {
    fontSize: 13,
    fontWeight: '500',
  },
  requiredBadge: {
    fontSize: 10,
    fontWeight: '500',
  },
  paramType: {
    fontSize: 12,
    marginBottom: 2,
  },
  paramDesc: {
    fontSize: 12,
  },
  codeHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  languageSelector: {
    flexDirection: 'row',
    gap: 6,
  },
  langChip: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
  },
  langText: {
    fontSize: 11,
    fontWeight: '500',
  },
  copyButton: {
    position: 'absolute',
    top: 8,
    right: 8,
    padding: 6,
    zIndex: 1,
  },
  responseRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    paddingVertical: 8,
    gap: 12,
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
  },
  statusCode: {
    fontSize: 12,
    fontWeight: '600',
  },
  responseInfo: {
    flex: 1,
  },
  responseDesc: {
    fontSize: 13,
    marginBottom: 4,
  },
  responseExample: {
    fontSize: 11,
  },
  sdkContent: {
    gap: 16,
  },
  sdkCard: {
    padding: 20,
    borderRadius: 16,
    alignItems: 'center',
  },
  sdkIcon: {
    width: 64,
    height: 64,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  sdkName: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 6,
  },
  sdkDesc: {
    fontSize: 14,
    textAlign: 'center',
    marginBottom: 16,
  },
  sdkButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 8,
    gap: 6,
  },
  sdkButtonText: {
    fontSize: 14,
    fontWeight: '600',
  },
  postmanCard: {
    padding: 20,
    borderRadius: 16,
  },
  postmanTitle: {
    fontSize: 17,
    fontWeight: '600',
    marginBottom: 8,
  },
  postmanDesc: {
    fontSize: 14,
    marginBottom: 16,
  },
  postmanButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    borderRadius: 10,
    gap: 8,
  },
  postmanButtonText: {
    color: 'white',
    fontSize: 15,
    fontWeight: '600',
  },
});
