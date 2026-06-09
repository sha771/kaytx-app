import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Switch,
  Alert,
} from 'react-native';
import { useRouter } from 'expo-router';
import {
  ChevronLeft,
  Save,
  Bot,
  User,
  Brain,
  Volume2,
  Globe,
  Shield,
  Bell,
  Database,
  Check,
  ChevronRight,
  Trash2,
  Upload,
  MessageSquare,
  Mail,
  Briefcase,
  Heart,
  Coffee,
  Crown,
  Share2,
} from 'lucide-react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Animated, { FadeInUp } from 'react-native-reanimated';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';

// Configuration Types
interface AgentConfig {
  name: string;
  role: string;
  description: string;
  model: 'gpt-4' | 'gpt-3.5-turbo' | 'claude-3' | 'custom';
  voice: 'alloy' | 'echo' | 'fable' | 'onyx' | 'nova' | 'shimmer';
  language: string;
  personality: 'professional' | 'friendly' | 'casual' | 'formal';
  temperature: number;
  maxTokens: number;
  responseTime: 'fast' | 'balanced' | 'quality';
  capabilities: string[];
  autoTrain: boolean;
  notifications: {
    email: boolean;
    push: boolean;
    sms: boolean;
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
  privacy: {
    logConversations: boolean;
    shareData: boolean;
    encryption: boolean;
  };
}

const VOICE_OPTIONS = [
  { id: 'alloy', name: 'Alloy', description: 'Neutral, balanced' },
  { id: 'echo', name: 'Echo', description: 'Male, mature' },
  { id: 'fable', name: 'Fable', description: 'British accent' },
  { id: 'onyx', name: 'Onyx', description: 'Deep, authoritative' },
  { id: 'nova', name: 'Nova', description: 'Female, energetic' },
  { id: 'shimmer', name: 'Shimmer', description: 'Young, bright' },
];

const MODEL_OPTIONS = [
  { id: 'gpt-4', name: 'GPT-4', description: 'Most capable', cost: 'High' },
  { id: 'gpt-3.5-turbo', name: 'GPT-3.5 Turbo', description: 'Fast & efficient', cost: 'Low' },
  { id: 'claude-3', name: 'Claude 3', description: 'Great for analysis', cost: 'Medium' },
  { id: 'custom', name: 'Custom Model', description: 'Your fine-tuned model', cost: 'Varies' },
];

const PERSONALITY_OPTIONS = [
  { id: 'professional', name: 'Professional', icon: Briefcase },
  { id: 'friendly', name: 'Friendly', icon: Heart },
  { id: 'casual', name: 'Casual', icon: Coffee },
  { id: 'formal', name: 'Formal', icon: Crown },
];

export default function AgentSettingsScreen() {
  const router = useRouter();
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];

  const [config, setConfig] = useState<AgentConfig>({
    name: 'Accounting & Finance AI',
    role: 'Chief Financial Officer',
    description: 'Manages financial operations, reporting, and strategic planning',
    model: 'gpt-4',
    voice: 'alloy',
    language: 'en-US',
    personality: 'professional',
    temperature: 0.7,
    maxTokens: 2048,
    responseTime: 'balanced',
    capabilities: ['accounting', 'reporting', 'budgeting', 'forecasting'],
    autoTrain: true,
    notifications: {
      email: true,
      push: true,
      sms: false,
    },
    privacy: {
      logConversations: true,
      shareData: false,
      encryption: true,
    },
  });

  const [activeSection, setActiveSection] = useState<'general' | 'ai' | 'voice' | 'notifications' | 'privacy'>('general');
  const [hasChanges, setHasChanges] = useState(false);

  const updateConfig = (key: keyof AgentConfig, value: any) => {
    setConfig(prev => ({ ...prev, [key]: value }));
    setHasChanges(true);
  };

  const saveConfig = () => {
    Alert.alert('Success', 'Agent settings saved successfully');
    setHasChanges(false);
  };

  const deleteAgent = () => {
    Alert.alert(
      'Delete Agent',
      'Are you sure you want to delete this agent? This action cannot be undone.',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Delete', style: 'destructive', onPress: () => router.back() },
      ]
    );
  };

  const renderSection = (section: typeof activeSection, label: string, icon: any) => {
    const Icon = icon;
    const isActive = activeSection === section;
    return (
      <TouchableOpacity
        style={[
          styles.sectionTab,
          { backgroundColor: isActive ? colors.tint : colors.card },
        ]}
        onPress={() => setActiveSection(section)}
      >
        <Icon size={20} color={isActive ? 'white' : colors.icon} />
        <Text
          style={[
            styles.sectionTabText,
            { color: isActive ? 'white' : colors.text },
          ]}
        >
          {label}
        </Text>
      </TouchableOpacity>
    );
  };

  const renderGeneralSection = () => (
    <Animated.View entering={FadeInUp} style={styles.sectionContent}>
      {/* Name */}
      <View style={styles.inputGroup}>
        <Text style={[styles.inputLabel, { color: colors.icon }]}>Agent Name</Text>
        <TextInput
          style={[styles.input, { color: colors.text, backgroundColor: colors.card }]}
          value={config.name}
          onChangeText={(text) => updateConfig('name', text)}
          placeholder="Enter agent name"
          placeholderTextColor={colors.icon}
        />
      </View>

      {/* Role */}
      <View style={styles.inputGroup}>
        <Text style={[styles.inputLabel, { color: colors.icon }]}>Role / Title</Text>
        <TextInput
          style={[styles.input, { color: colors.text, backgroundColor: colors.card }]}
          value={config.role}
          onChangeText={(text) => updateConfig('role', text)}
          placeholder="Enter agent role"
          placeholderTextColor={colors.icon}
        />
      </View>

      {/* Description */}
      <View style={styles.inputGroup}>
        <Text style={[styles.inputLabel, { color: colors.icon }]}>Description</Text>
        <TextInput
          style={[styles.textArea, { color: colors.text, backgroundColor: colors.card }]}
          value={config.description}
          onChangeText={(text) => updateConfig('description', text)}
          placeholder="Describe what this agent does"
          placeholderTextColor={colors.icon}
          multiline
          numberOfLines={4}
        />
      </View>

      {/* Avatar Upload */}
      <TouchableOpacity style={[styles.uploadCard, { backgroundColor: colors.card }]}>
        <View style={[styles.uploadIcon, { backgroundColor: colors.tint + '15' }]}>
          <Upload size={24} color={colors.tint} />
        </View>
        <View>
          <Text style={[styles.uploadTitle, { color: colors.text }]}>Agent Avatar</Text>
          <Text style={[styles.uploadSubtitle, { color: colors.icon }]}>
            Tap to upload a custom avatar
          </Text>
        </View>
      </TouchableOpacity>
    </Animated.View>
  );

  const renderAISection = () => (
    <Animated.View entering={FadeInUp} style={styles.sectionContent}>
      {/* Model Selection */}
      <Text style={[styles.sectionSubtitle, { color: colors.text }]}>AI Model</Text>
      {MODEL_OPTIONS.map((model) => (
        <TouchableOpacity
          key={model.id}
          style={[
            styles.optionCard,
            { backgroundColor: colors.card },
            config.model === model.id && { borderColor: colors.tint, borderWidth: 2 },
          ]}
          onPress={() => updateConfig('model', model.id)}
        >
          <View style={styles.optionInfo}>
            <Text style={[styles.optionName, { color: colors.text }]}>{model.name}</Text>
            <Text style={[styles.optionDescription, { color: colors.icon }]}>
              {model.description}
            </Text>
          </View>
          <View style={styles.optionMeta}>
            <View style={[styles.costBadge, { backgroundColor: colors.background }]}>
              <Text style={[styles.costText, { color: colors.icon }]}>{model.cost}</Text>
            </View>
            {config.model === model.id && (
              <View style={[styles.checkBadge, { backgroundColor: colors.tint }]}>
                <Check size={16} color="white" />
              </View>
            )}
          </View>
        </TouchableOpacity>
      ))}

      {/* Temperature Slider */}
      <View style={styles.sliderGroup}>
        <View style={styles.sliderHeader}>
          <Text style={[styles.sliderLabel, { color: colors.text }]}>Creativity (Temperature)</Text>
          <Text style={[styles.sliderValue, { color: colors.tint }]}>{config.temperature}</Text>
        </View>
        <View style={styles.sliderTrack}>
          <View
            style={[
              styles.sliderFill,
              { width: `${config.temperature * 100}%`, backgroundColor: colors.tint },
            ]}
          />
        </View>
        <View style={styles.sliderLabels}>
          <Text style={[styles.sliderMinMax, { color: colors.icon }]}>Precise</Text>
          <Text style={[styles.sliderMinMax, { color: colors.icon }]}>Creative</Text>
        </View>
      </View>

      {/* Max Tokens */}
      <View style={styles.inputGroup}>
        <Text style={[styles.inputLabel, { color: colors.icon }]}>Max Response Length (Tokens)</Text>
        <View style={styles.tokenSelector}>
          {[1024, 2048, 4096].map((tokens) => (
            <TouchableOpacity
              key={tokens}
              style={[
                styles.tokenChip,
                { backgroundColor: config.maxTokens === tokens ? colors.tint : colors.card },
              ]}
              onPress={() => updateConfig('maxTokens', tokens)}
            >
              <Text
                style={[
                  styles.tokenText,
                  { color: config.maxTokens === tokens ? 'white' : colors.text },
                ]}
              >
                {tokens}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* Auto-training */}
      <View style={[styles.toggleCard, { backgroundColor: colors.card }]}>
        <View>
          <Text style={[styles.toggleTitle, { color: colors.text }]}>Auto-Training</Text>
          <Text style={[styles.toggleDescription, { color: colors.icon }]}>
            Automatically improve from conversations
          </Text>
        </View>
        <Switch
          value={config.autoTrain}
          onValueChange={(value) => updateConfig('autoTrain', value)}
          trackColor={{ false: '#E5E7EB', true: colors.tint + '80' }}
          thumbColor={config.autoTrain ? colors.tint : '#9CA3AF'}
        />
      </View>
    </Animated.View>
  );

  const renderVoiceSection = () => (
    <Animated.View entering={FadeInUp} style={styles.sectionContent}>
      {/* Voice Selection */}
      <Text style={[styles.sectionSubtitle, { color: colors.text }]}>Voice</Text>
      <View style={styles.voiceGrid}>
        {VOICE_OPTIONS.map((voice) => (
          <TouchableOpacity
            key={voice.id}
            style={[
              styles.voiceCard,
              { backgroundColor: colors.card },
              config.voice === voice.id && { borderColor: colors.tint, borderWidth: 2 },
            ]}
            onPress={() => updateConfig('voice', voice.id)}
          >
            <View style={[styles.voiceIcon, { backgroundColor: config.voice === voice.id ? colors.tint + '15' : colors.background }]}>
              <Volume2 size={20} color={config.voice === voice.id ? colors.tint : colors.icon} />
            </View>
            <Text style={[styles.voiceName, { color: colors.text }]}>{voice.name}</Text>
            <Text style={[styles.voiceDescription, { color: colors.icon }]}>
              {voice.description}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Language */}
      <View style={styles.inputGroup}>
        <Text style={[styles.inputLabel, { color: colors.icon }]}>Primary Language</Text>
        <TouchableOpacity style={[styles.selector, { backgroundColor: colors.card }]}>
          <Globe size={18} color={colors.icon} />
          <Text style={[styles.selectorText, { color: colors.text }]}>
            English (US)
          </Text>
          <ChevronRight size={18} color={colors.icon} />
        </TouchableOpacity>
      </View>

      {/* Personality */}
      <Text style={[styles.sectionSubtitle, { color: colors.text }]}>Personality</Text>
      <View style={styles.personalityGrid}>
        {PERSONALITY_OPTIONS.map((personality) => {
          const Icon = personality.icon;
          return (
            <TouchableOpacity
              key={personality.id}
              style={[
                styles.personalityCard,
                { backgroundColor: colors.card },
                config.personality === personality.id && { borderColor: colors.tint, borderWidth: 2 },
              ]}
              onPress={() => updateConfig('personality', personality.id)}
            >
              <Icon size={20} color={config.personality === personality.id ? colors.tint : colors.icon} />
              <Text
                style={[
                  styles.personalityText,
                  { color: config.personality === personality.id ? colors.tint : colors.text },
                ]}
              >
                {personality.name}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
    </Animated.View>
  );

  const renderNotificationsSection = () => (
    <Animated.View entering={FadeInUp} style={styles.sectionContent}>
      <View style={[styles.toggleCard, { backgroundColor: colors.card }]}>
        <View style={styles.toggleIconRow}>
          <View style={[styles.toggleIcon, { backgroundColor: colors.tint + '15' }]}>
            <Mail size={20} color={colors.tint} />
          </View>
          <View>
            <Text style={[styles.toggleTitle, { color: colors.text }]}>Email Notifications</Text>
            <Text style={[styles.toggleDescription, { color: colors.icon }]}>
              Get updates about agent performance
            </Text>
          </View>
        </View>
        <Switch
          value={config.notifications.email}
          onValueChange={(value) => updateConfig('notifications', { ...config.notifications, email: value })}
          trackColor={{ false: '#E5E7EB', true: colors.tint + '80' }}
          thumbColor={config.notifications.email ? colors.tint : '#9CA3AF'}
        />
      </View>

      <View style={[styles.toggleCard, { backgroundColor: colors.card }]}>
        <View style={styles.toggleIconRow}>
          <View style={[styles.toggleIcon, { backgroundColor: colors.tint + '15' }]}>
            <Bell size={20} color={colors.tint} />
          </View>
          <View>
            <Text style={[styles.toggleTitle, { color: colors.text }]}>Push Notifications</Text>
            <Text style={[styles.toggleDescription, { color: colors.icon }]}>
              Real-time alerts on your device
            </Text>
          </View>
        </View>
        <Switch
          value={config.notifications.push}
          onValueChange={(value) => updateConfig('notifications', { ...config.notifications, push: value })}
          trackColor={{ false: '#E5E7EB', true: colors.tint + '80' }}
          thumbColor={config.notifications.push ? colors.tint : '#9CA3AF'}
        />
      </View>

      <View style={[styles.toggleCard, { backgroundColor: colors.card }]}>
        <View style={styles.toggleIconRow}>
          <View style={[styles.toggleIcon, { backgroundColor: colors.tint + '15' }]}>
            <MessageSquare size={20} color={colors.tint} />
          </View>
          <View>
            <Text style={[styles.toggleTitle, { color: colors.text }]}>SMS Notifications</Text>
            <Text style={[styles.toggleDescription, { color: colors.icon }]}>
              Text messages for critical alerts
            </Text>
          </View>
        </View>
        <Switch
          value={config.notifications.sms}
          onValueChange={(value) => updateConfig('notifications', { ...config.notifications, sms: value })}
          trackColor={{ false: '#E5E7EB', true: colors.tint + '80' }}
          thumbColor={config.notifications.sms ? colors.tint : '#9CA3AF'}
        />
      </View>
    </Animated.View>
  );

  const renderPrivacySection = () => (
    <Animated.View entering={FadeInUp} style={styles.sectionContent}>
      <View style={[styles.toggleCard, { backgroundColor: colors.card }]}>
        <View style={styles.toggleIconRow}>
          <View style={[styles.toggleIcon, { backgroundColor: colors.tint + '15' }]}>
            <Database size={20} color={colors.tint} />
          </View>
          <View>
            <Text style={[styles.toggleTitle, { color: colors.text }]}>Log Conversations</Text>
            <Text style={[styles.toggleDescription, { color: colors.icon }]}>
              Store conversation history for training
            </Text>
          </View>
        </View>
        <Switch
          value={config.privacy.logConversations}
          onValueChange={(value) => updateConfig('privacy', { ...config.privacy, logConversations: value })}
          trackColor={{ false: '#E5E7EB', true: colors.tint + '80' }}
          thumbColor={config.privacy.logConversations ? colors.tint : '#9CA3AF'}
        />
      </View>

      <View style={[styles.toggleCard, { backgroundColor: colors.card }]}>
        <View style={styles.toggleIconRow}>
          <View style={[styles.toggleIcon, { backgroundColor: colors.tint + '15' }]}>
            <Share2 size={20} color={colors.tint} />
          </View>
          <View>
            <Text style={[styles.toggleTitle, { color: colors.text }]}>Share Anonymous Data</Text>
            <Text style={[styles.toggleDescription, { color: colors.icon }]}>
              Help improve AI models
            </Text>
          </View>
        </View>
        <Switch
          value={config.privacy.shareData}
          onValueChange={(value) => updateConfig('privacy', { ...config.privacy, shareData: value })}
          trackColor={{ false: '#E5E7EB', true: colors.tint + '80' }}
          thumbColor={config.privacy.shareData ? colors.tint : '#9CA3AF'}
        />
      </View>

      <View style={[styles.toggleCard, { backgroundColor: colors.card }]}>
        <View style={styles.toggleIconRow}>
          <View style={[styles.toggleIcon, { backgroundColor: colors.tint + '15' }]}>
            <Shield size={20} color={colors.tint} />
          </View>
          <View>
            <Text style={[styles.toggleTitle, { color: colors.text }]}>End-to-End Encryption</Text>
            <Text style={[styles.toggleDescription, { color: colors.icon }]}>
              Secure all conversations
            </Text>
          </View>
        </View>
        <Switch
          value={config.privacy.encryption}
          onValueChange={(value) => updateConfig('privacy', { ...config.privacy, encryption: value })}
          trackColor={{ false: '#E5E7EB', true: colors.tint + '80' }}
          thumbColor={config.privacy.encryption ? colors.tint : '#9CA3AF'}
        />
      </View>
    </Animated.View>
  );

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <ChevronLeft size={28} color={colors.text} />
        </TouchableOpacity>
        <Text style={[styles.headerTitle, { color: colors.text }]}>Agent Settings</Text>
        <TouchableOpacity onPress={saveConfig} disabled={!hasChanges}>
          <Save size={24} color={hasChanges ? colors.tint : colors.icon} />
        </TouchableOpacity>
      </View>

      {/* Agent Header Card */}
      <View style={[styles.agentHeaderCard, { backgroundColor: colors.tint }]}>
        <View style={styles.agentHeaderIcon}>
          <Bot size={32} color="white" />
        </View>
        <View>
          <Text style={styles.agentHeaderName}>{config.name}</Text>
          <Text style={styles.agentHeaderRole}>{config.role}</Text>
        </View>
      </View>

      {/* Section Tabs */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.tabsContainer}
      >
        {renderSection('general', 'General', User)}
        {renderSection('ai', 'AI Model', Brain)}
        {renderSection('voice', 'Voice & Language', Volume2)}
        {renderSection('notifications', 'Notifications', Bell)}
        {renderSection('privacy', 'Privacy', Shield)}
      </ScrollView>

      {/* Content */}
      <ScrollView
        style={styles.content}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.contentContainer}
      >
        {activeSection === 'general' && renderGeneralSection()}
        {activeSection === 'ai' && renderAISection()}
        {activeSection === 'voice' && renderVoiceSection()}
        {activeSection === 'notifications' && renderNotificationsSection()}
        {activeSection === 'privacy' && renderPrivacySection()}

        {/* Danger Zone */}
        <View style={styles.dangerZone}>
          <Text style={[styles.dangerTitle, { color: '#EF4444' }]}>Danger Zone</Text>
          <TouchableOpacity
            style={[styles.dangerButton, { borderColor: '#EF4444' }]}
            onPress={deleteAgent}
          >
            <Trash2 size={20} color="#EF4444" />
            <Text style={[styles.dangerText, { color: '#EF4444' }]}>
              Delete Agent
            </Text>
          </TouchableOpacity>
        </View>
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
  headerTitle: {
    fontSize: 20,
    fontWeight: '700',
  },
  agentHeaderCard: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 16,
    padding: 16,
    borderRadius: 16,
    gap: 12,
    marginBottom: 16,
  },
  agentHeaderIcon: {
    width: 56,
    height: 56,
    borderRadius: 16,
    backgroundColor: 'rgba(255,255,255,0.2)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  agentHeaderName: {
    fontSize: 18,
    fontWeight: '700',
    color: 'white',
  },
  agentHeaderRole: {
    fontSize: 14,
    color: 'rgba(255,255,255,0.8)',
    marginTop: 2,
  },
  tabsContainer: {
    paddingHorizontal: 16,
    gap: 8,
    marginBottom: 16,
  },
  sectionTab: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 20,
    gap: 6,
  },
  sectionTabText: {
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
  sectionContent: {
    gap: 16,
  },
  sectionSubtitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
  },
  inputGroup: {
    gap: 8,
  },
  inputLabel: {
    fontSize: 13,
    fontWeight: '500',
  },
  input: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 12,
    fontSize: 15,
  },
  textArea: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 12,
    fontSize: 15,
    height: 100,
    textAlignVertical: 'top',
  },
  uploadCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderRadius: 12,
    gap: 16,
  },
  uploadIcon: {
    width: 48,
    height: 48,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  uploadTitle: {
    fontSize: 15,
    fontWeight: '600',
  },
  uploadSubtitle: {
    fontSize: 13,
    marginTop: 2,
  },
  optionCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderRadius: 12,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: 'transparent',
  },
  optionInfo: {
    flex: 1,
  },
  optionName: {
    fontSize: 15,
    fontWeight: '600',
  },
  optionDescription: {
    fontSize: 13,
    marginTop: 2,
  },
  optionMeta: {
    alignItems: 'flex-end',
    gap: 8,
  },
  costBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  costText: {
    fontSize: 11,
    fontWeight: '500',
  },
  checkBadge: {
    width: 24,
    height: 24,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  sliderGroup: {
    gap: 8,
  },
  sliderHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  sliderLabel: {
    fontSize: 15,
    fontWeight: '500',
  },
  sliderValue: {
    fontSize: 15,
    fontWeight: '600',
  },
  sliderTrack: {
    height: 6,
    backgroundColor: '#E5E7EB',
    borderRadius: 3,
  },
  sliderFill: {
    height: 6,
    borderRadius: 3,
  },
  sliderLabels: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  sliderMinMax: {
    fontSize: 12,
  },
  tokenSelector: {
    flexDirection: 'row',
    gap: 8,
  },
  tokenChip: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: 'center',
  },
  tokenText: {
    fontSize: 14,
    fontWeight: '600',
  },
  toggleCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    borderRadius: 12,
  },
  toggleIconRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  toggleIcon: {
    width: 40,
    height: 40,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  toggleTitle: {
    fontSize: 15,
    fontWeight: '600',
  },
  toggleDescription: {
    fontSize: 13,
    marginTop: 2,
  },
  voiceGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  voiceCard: {
    width: '48%',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'transparent',
  },
  voiceIcon: {
    width: 48,
    height: 48,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
  },
  voiceName: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 2,
  },
  voiceDescription: {
    fontSize: 11,
  },
  selector: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 12,
    gap: 12,
  },
  selectorText: {
    flex: 1,
    fontSize: 15,
  },
  personalityGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  personalityCard: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 10,
    gap: 8,
    borderWidth: 1,
    borderColor: 'transparent',
  },
  personalityText: {
    fontSize: 14,
    fontWeight: '500',
  },
  dangerZone: {
    marginTop: 32,
    paddingTop: 24,
    borderTopWidth: 1,
    borderTopColor: '#E5E7EB',
  },
  dangerTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 12,
  },
  dangerButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 14,
    borderRadius: 12,
    gap: 8,
    borderWidth: 1,
  },
  dangerText: {
    fontSize: 15,
    fontWeight: '600',
  },
});
