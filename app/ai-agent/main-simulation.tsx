import React, { useState, useMemo, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Dimensions,
  Modal,
  FlatList,
  TextInput,
  Switch,
  Alert,
  Animated,
  RefreshControl,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import * as Icons from 'lucide-react-native';
import { useTheme } from '@/providers/ThemeProvider';
import { router } from 'expo-router';
import {
  aiAgentLayers,
  LAYER_STATS,
  layerFlowOrder,
  getLayerById,
  type AILayer,
  type LayerId,
  type LayerComponent,
} from '@/constants/aiAgentLayers';

const { width, height } = Dimensions.get('window');

interface SimulationConfig {
  layerId: LayerId;
  enabled: boolean;
  simulationMode: 'realtime' | 'fast' | 'detailed';
  tokenLimit: number;
  autoExecute: boolean;
}

interface LayerStatus {
  layerId: LayerId;
  active: boolean;
  processing: boolean;
  lastUpdate: Date;
  agentsActive: number;
  tokensUsed: number;
  successRate: number;
}

const MainSimulation = () => {
  const insets = useSafeAreaInsets();
  const { colors } = useTheme();
  
  const [activeTab, setActiveTab] = useState<'dashboard' | 'layers' | 'simulation' | 'settings'>('dashboard');
  const [selectedLayer, setSelectedLayer] = useState<AILayer | null>(null);
  const [showLayerDetail, setShowLayerDetail] = useState(false);
  const [showConfigModal, setShowConfigModal] = useState(false);
  const [showEnvironmentModal, setShowEnvironmentModal] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [simulationRunning, setSimulationRunning] = useState(false);
  const [simulationProgress, setSimulationProgress] = useState(0);
  const [complexityTier, setComplexityTier] = useState<'basic' | 'standard' | 'enterprise'>('standard');
  
  const complexityTiers = [
    { level: 'basic', label: 'Basic', sublabel: '100-1000', min: 100, max: 1000, color: '#10B981', description: 'Small business & personal use' },
    { level: 'standard', label: 'Standard', sublabel: '1K-10K', min: 1000, max: 10000, color: '#F59E0B', description: 'Growing teams & customer base' },
    { level: 'enterprise', label: 'Enterprise', sublabel: '10K-100K', min: 10000, max: 100000, color: '#8B5CF6', description: 'Large scale operations' },
  ];
  
  const [layerConfigs, setLayerConfigs] = useState<Record<LayerId, SimulationConfig>>(() => {
    const configs: Record<string, SimulationConfig> = {,
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
    layerFlowOrder.forEach(layerId => {
      configs[layerId] = {
        layerId,
        enabled: true,
        simulationMode: 'realtime',
        tokenLimit: layerId === 'governance' || layerId === 'leadership' ? 0 : 
                   layerId === 'memory' || layerId === 'translation' ? 50 : 200,
        autoExecute: layerId !== 'governance' && layerId !== 'leadership',
      };
    });
    return configs as Record<LayerId, SimulationConfig>;
  });

  const [layerStatuses, setLayerStatuses] = useState<Record<LayerId, LayerStatus>>(() => {
    const statuses: Record<string, LayerStatus> = {};
    aiAgentLayers.forEach(layer => {
      statuses[layer.id] = {
        layerId: layer.id,
        active: layer.id === 'governance' || layer.id === 'leadership',
        processing: false,
        lastUpdate: new Date(),
        agentsActive: layer.id === 'governance' || layer.id === 'leadership' ? layer.agentCount : 0,
        tokensUsed: 0,
        successRate: 98.5 + Math.random() * 1.5,
      };
    });
    return statuses as Record<LayerId, LayerStatus>;
  });

  const [environmentSettings, setEnvironmentSettings] = useState({
    mode: 'production' as 'development' | 'staging' | 'production',
    logLevel: 'info' as 'debug' | 'info' | 'warn' | 'error',
    enableNotifications: true,
    enableAnalytics: true,
    autoScale: true,
    maxConcurrency: 100,
    timeout: 30,
    retryAttempts: 3,
  });

  const onRefresh = () => {
    setRefreshing(true);
    setTimeout(() => {
      setLayerStatuses(prev => {
        const updated = { ...prev };
        Object.keys(updated).forEach(key => {
          const layerId = key as LayerId;
          updated[layerId] = {
            ...updated[layerId],
            lastUpdate: new Date(),
            successRate: 97 + Math.random() * 3,
          };
        });
        return updated;
      });
      setRefreshing(false);
    }, 1500);
  };

  const startSimulation = () => {
    setSimulationRunning(true);
    setSimulationProgress(0);
    
    let progress = 0;
    const interval = setInterval(() => {
      progress += 5;
      setSimulationProgress(progress);
      
      setLayerStatuses(prev => {
        const updated = { ...prev };
        layerFlowOrder.forEach((layerId, idx) => {
          if (layerConfigs[layerId].enabled && progress > idx * 8) {
            updated[layerId] = {
              ...updated[layerId],
              processing: true,
              agentsActive: Math.floor(aiAgentLayers[idx].agentCount * (progress / 100)),
              tokensUsed: Math.floor(layerConfigs[layerId].tokenLimit * (progress / 100)),
            };
          }
        });
        return updated;
      });
      
      if (progress >= 100) {
        clearInterval(interval);
        setSimulationRunning(false);
        setLayerStatuses(prev => {
          const updated = { ...prev };
          Object.keys(updated).forEach(key => {
            updated[key as LayerId] = { ...updated[key as LayerId], processing: false };
          });
          return updated;
        });
        Alert.alert('Simulation Complete', 'All enabled layers have been simulated successfully!');
      }
    }, 200);
  };

  const toggleLayerActive = (layerId: LayerId) => {
    setLayerStatuses(prev => ({
      ...prev,
      [layerId]: {
        ...prev[layerId],
        active: !prev[layerId].active,
        agentsActive: prev[layerId].active ? 0 : aiAgentLayers.find(l => l.id === layerId)!.agentCount,
      }
    }));
  };

  const handleLayerPress = (layer: AILayer) => {
    setSelectedLayer(layer);
    setShowLayerDetail(true);
  };

  const handleRunLayerSimulation = (layer: AILayer) => {
    setShowLayerDetail(false);
    setActiveTab('simulation');
    setLayerConfigs(prev => ({
      ...prev,
      [layer.id]: { ...prev[layer.id], enabled: true }
    }));
    startSimulation();
  };

  const renderDashboard = () => (
    <View style={styles.dashboardContainer}>
      <View style={styles.statsOverview}>
        <View style={styles.statsCard}>
          <LinearGradient colors={['#6366F1', '#8B5CF6']} style={styles.statsCardGradient}>
            <Icons.Layers size={24} color="#FFFFFF" />
            <Text style={styles.statsCardValue}>{LAYER_STATS.totalLayers}</Text>
            <Text style={styles.statsCardLabel}>Active Layers</Text>
          </LinearGradient>
        </View>
        <View style={styles.statsCard}>
          <LinearGradient colors={['#10B981', '#059669']} style={styles.statsCardGradient}>
            <Icons.Bot size={24} color="#FFFFFF" />
            <Text style={styles.statsCardValue}>{LAYER_STATS.totalAgents.toLocaleString()}</Text>
            <Text style={styles.statsCardLabel}>AI Agents</Text>
          </LinearGradient>
        </View>
        <View style={styles.statsCard}>
          <LinearGradient colors={['#F59E0B', '#D97706']} style={styles.statsCardGradient}>
            <Icons.Zap size={24} color="#FFFFFF" />
            <Text style={styles.statsCardValue}>{LAYER_STATS.optimizedCostPerRequest}</Text>
            <Text style={styles.statsCardLabel}>Cost/Request</Text>
          </LinearGradient>
        </View>
        <View style={styles.statsCard}>
          <LinearGradient colors={['#EC4899', '#DB2777']} style={styles.statsCardGradient}>
            <Icons.Gauge size={24} color="#FFFFFF" />
            <Text style={styles.statsCardValue}>{LAYER_STATS.efficiencyGain}</Text>
            <Text style={styles.statsCardLabel}>Efficiency</Text>
          </LinearGradient>
        </View>
      </View>

      <View style={styles.simulationStatus}>
        <View style={styles.simulationHeader}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>Simulation Status</Text>
          <TouchableOpacity 
            style={[styles.runButton, simulationRunning && styles.runButtonActive]}
            onPress={startSimulation}
            disabled={simulationRunning}
          >
            <Icons.Play size={16} color={simulationRunning ? '#10B981' : '#FFFFFF'} />
            <Text style={styles.runButtonText}>
              {simulationRunning ? 'Running...' : 'Run All'}
            </Text>
          </TouchableOpacity>
        </View>
        
        {simulationRunning && (
          <View style={styles.progressContainer}>
            <View style={styles.progressBar}>
              <Animated.View style={[styles.progressFill, { width: `${simulationProgress}%` }]} />
            </View>
            <Text style={[styles.progressText, { color: colors.textSecondary }]}>
              {simulationProgress}% Complete
            </Text>
          </View>
        )}

        <View style={styles.layerStatusGrid}>
          {aiAgentLayers.map(layer => {
            const status = layerStatuses[layer.id];
            const config = layerConfigs[layer.id];
            const LayerIcon = layer.icon;
            
            return (
              <TouchableOpacity
                key={layer.id}
                style={[styles.layerStatusCard, { backgroundColor: colors.card }]}
                onPress={() => handleLayerPress(layer)}
              >
                <View style={styles.layerStatusHeader}>
                  <View style={[styles.layerNumberBadge, { backgroundColor: layer.color }]}>
                    <Text style={styles.layerNumberText}>{layer.layerNumber}</Text>
                  </View>
                  <LayerIcon size={20} color={layer.color} />
                </View>
                <Text style={[styles.layerStatusName, { color: colors.text }]}>{layer.name}</Text>
                <View style={styles.layerStatusStats}>
                  <View style={styles.layerStatusStat}>
                    <Icons.Users size={12} color={colors.textSecondary} />
                    <Text style={[styles.layerStatusStatText, { color: colors.textSecondary }]}>
                      {status.agentsActive}/{layer.agentCount}
                    </Text>
                  </View>
                  <View style={styles.layerStatusStat}>
                    <Icons.Activity size={12} color={status.processing ? '#10B981' : colors.textSecondary} />
                    <Text style={[styles.layerStatusStatText, { color: status.processing ? '#10B981' : colors.textSecondary }]}>
                      {status.processing ? 'Active' : 'Idle'}
                    </Text>
                  </View>
                </View>
                <View style={styles.layerToggleRow}>
                  <Switch
                    value={config.enabled}
                    onValueChange={() => setLayerConfigs(prev => ({
                      ...prev,
                      [layer.id]: { ...prev[layer.id], enabled: !prev[layer.id].enabled }
                    }))}
                    trackColor={{ false: colors.border, true: layer.color + '80' }}
                    thumbColor={config.enabled ? layer.color : '#f4f3f4'}
                  />
                  <Text style={[styles.toggleLabel, { color: colors.textSecondary }]}>
                    {config.enabled ? 'Enabled' : 'Disabled'}
                  </Text>
                </View>
              </TouchableOpacity>
            );
          })}
        </View>
      </View>

      <View style={styles.flowVisualization}>
        <Text style={[styles.sectionTitle, { color: colors.text }]}>Data Flow</Text>
        <View style={styles.flowContainer}>
          {layerFlowOrder.map((layerId, index) => {
            const layer = getLayerById(layerId);
            if (!layer) return null;
            const LayerIcon = layer.icon;
            const status = layerStatuses[layerId];
            
            return (
              <View key={layerId} style={styles.flowNode}>
                <View style={[
                  styles.flowIconContainer, 
                  { backgroundColor: status.active ? layer.color + '30' : colors.border }
                ]}>
                  <LayerIcon size={18} color={status.active ? layer.color : colors.textSecondary} />
                </View>
                {index < layerFlowOrder.length - 1 && (
                  <View style={[styles.flowLine, { backgroundColor: colors.border }]} />
                )}
              </View>
            );
          })}
        </View>
      </View>
    </View>
  );

  const renderLayersView = () => (
    <ScrollView 
      style={styles.layersContainer}
      contentContainerStyle={styles.layersContent}
    >
      {aiAgentLayers.map(layer => {
        const LayerIcon = layer.icon;
        
        return (
          <TouchableOpacity
            key={layer.id}
            activeOpacity={0.8}
            onPress={() => handleLayerPress(layer)}
          >
            <LinearGradient
              colors={layer.gradient}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={styles.layerCard}
            >
              <View style={styles.layerCardHeader}>
                <View style={styles.layerCardNumber}>
                  <Text style={styles.layerCardNumberText}>{layer.layerNumber}</Text>
                </View>
                <View style={styles.layerCardInfo}>
                  <Text style={styles.layerCardTitle}>{layer.name}</Text>
                  <Text style={styles.layerCardSubtitle}>{layer.shortName}</Text>
                </View>
                <View style={styles.layerCardIcon}>
                  <LayerIcon size={28} color="#FFFFFF" />
                </View>
              </View>
              
              <Text style={styles.layerCardDescription}>{layer.description}</Text>
              
              <View style={styles.layerCardStats}>
                <View style={styles.layerCardStat}>
                  <Icons.Users size={14} color="rgba(255,255,255,0.8)" />
                  <Text style={styles.layerCardStatText}>{layer.agentCount} agents</Text>
                </View>
                <View style={styles.layerCardStat}>
                  <Icons.Zap size={14} color="rgba(255,255,255,0.8)" />
                  <Text style={styles.layerCardStatText}>{layer.optimizedTokenUsage} tokens</Text>
                </View>
                <View style={styles.layerCardStat}>
                  <Icons.Workflow size={14} color="rgba(255,255,255,0.8)" />
                  <Text style={styles.layerCardStatText}>{layer.flow}</Text>
                </View>
              </View>
              
              <View style={styles.layerCardFeatures}>
                {layer.features.slice(0, 3).map((feature, idx) => (
                  <View key={idx} style={styles.featureBadge}>
                    <Text style={styles.featureBadgeText}>{feature}</Text>
                  </View>
                ))}
                {layer.features.length > 3 && (
                  <View style={styles.featureBadge}>
                    <Text style={styles.featureBadgeText}>+{layer.features.length - 3}</Text>
                  </View>
                )}
              </View>
              
              <View style={styles.layerCardComponents}>
                <Text style={styles.componentsText}>
                  {layer.components.length} components
                </Text>
                <Icons.ChevronRight size={20} color="rgba(255,255,255,0.7)" />
              </View>
            </LinearGradient>
          </TouchableOpacity>
        );
      })}
    </ScrollView>
  );

  const renderSimulationView = () => (
    <ScrollView style={styles.simulationContainer}>
      <View style={styles.simulationHeaderSection}>
        <Text style={[styles.sectionTitle, { color: colors.text }]}>Simulation Complexity</Text>
        <Text style={[styles.sectionSubtitle, { color: colors.textSecondary }]}>
          Select complexity level based on your needs
        </Text>
      </View>

      {/* Complexity Tier Selector */}
      <View style={[styles.complexityTierCard, { backgroundColor: colors.card }]}>
        <View style={styles.complexityTierButtons}>
          {complexityTiers.map((tier) => (
            <TouchableOpacity
              key={tier.level}
              style={[
                styles.complexityTierButton,
                complexityTier === tier.level && { backgroundColor: tier.color, borderColor: tier.color },
              ]}
              onPress={() => setComplexityTier(tier.level as any)}
            >
              <Text style={[
                styles.complexityTierLabel,
                { color: complexityTier === tier.level ? '#FFFFFF' : colors.text },
              ]}>
                {tier.label}
              </Text>
              <Text style={[
                styles.complexityTierRange,
                { color: complexityTier === tier.level ? 'rgba(255,255,255,0.8)' : colors.textSecondary },
              ]}>
                {tier.sublabel}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
        <Text style={[styles.complexityTierDesc, { color: colors.textSecondary }]}>
          {complexityTiers.find(t => t.level === complexityTier)?.description}
        </Text>
      </View>

      <View style={styles.simulationHeaderSection}>
        <Text style={[styles.sectionTitle, { color: colors.text }]}>Layer Configuration</Text>
        <Text style={[styles.sectionSubtitle, { color: colors.textSecondary }]}>
          Configure simulation parameters for each layer
        </Text>
      </View>

      {layerFlowOrder.map(layerId => {
        const layer = getLayerById(layerId);
        const config = layerConfigs[layerId];
        if (!layer) return null;
        
        return (
          <View key={layerId} style={[styles.configCard, { backgroundColor: colors.card }]}>
            <View style={styles.configCardHeader}>
              <View style={[styles.configBadge, { backgroundColor: layer.color + '20' }]}>
                <Text style={[styles.configBadgeText, { color: layer.color }]}>
                  Layer {layer.layerNumber}
                </Text>
              </View>
              <Text style={[styles.configCardTitle, { color: colors.text }]}>{layer.name}</Text>
            </View>
            
            <View style={styles.configRow}>
              <View style={styles.configItem}>
                <Text style={[styles.configLabel, { color: colors.textSecondary }]}>Enabled</Text>
                <Switch
                  value={config.enabled}
                  onValueChange={(value) => setLayerConfigs(prev => ({
                    ...prev,
                    [layerId]: { ...prev[layerId], enabled: value }
                  }))}
                  trackColor={{ false: colors.border, true: layer.color + '80' }}
                  thumbColor={config.enabled ? layer.color : '#f4f3f4'}
                />
              </View>
              <View style={styles.configItem}>
                <Text style={[styles.configLabel, { color: colors.textSecondary }]}>Auto Execute</Text>
                <Switch
                  value={config.autoExecute}
                  onValueChange={(value) => setLayerConfigs(prev => ({
                    ...prev,
                    [layerId]: { ...prev[layerId], autoExecute: value }
                  }))}
                  trackColor={{ false: colors.border, true: layer.color + '80' }}
                  thumbColor={config.autoExecute ? layer.color : '#f4f3f4'}
                />
              </View>
            </View>
            
            <View style={styles.configRow}>
              <View style={styles.configItemFull}>
                <Text style={[styles.configLabel, { color: colors.textSecondary }]}>
                  Simulation Mode
                </Text>
                <View style={styles.modeSelector}>
                  {(['realtime', 'fast', 'detailed'] as const).map(mode => (
                    <TouchableOpacity
                      key={mode}
                      style={[
                        styles.modeButton,
                        config.simulationMode === mode && { backgroundColor: layer.color }
                      ]}
                      onPress={() => setLayerConfigs(prev => ({
                        ...prev,
                        [layerId]: { ...prev[layerId], simulationMode: mode }
                      }))}
                    >
                      <Text style={[
                        styles.modeButtonText,
                        config.simulationMode === mode && { color: '#FFFFFF' }
                      ]}>
                        {mode.charAt(0).toUpperCase() + mode.slice(1)}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </View>
              </View>
            </View>
            
            <View style={styles.configRow}>
              <View style={styles.configItemFull}>
                <Text style={[styles.configLabel, { color: colors.textSecondary }]}>
                  Token Limit: {config.tokenLimit}
                </Text>
                <View style={styles.tokenSlider}>
                  {[50, 100, 200, 400, 800].map(token => (
                    <TouchableOpacity
                      key={token}
                      style={[
                        styles.tokenButton,
                        config.tokenLimit === token && { backgroundColor: layer.color }
                      ]}
                      onPress={() => setLayerConfigs(prev => ({
                        ...prev,
                        [layerId]: { ...prev[layerId], tokenLimit: token }
                      }))}
                    >
                      <Text style={[
                        styles.tokenButtonText,
                        config.tokenLimit === token && { color: '#FFFFFF' }
                      ]}>
                        {token}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </View>
              </View>
            </View>
          </View>
        );
      })}

      <TouchableOpacity style={styles.runSimulationButton} onPress={startSimulation}>
        <LinearGradient colors={['#6366F1', '#8B5CF6']} style={styles.runSimulationGradient}>
          <Icons.Play size={24} color="#FFFFFF" />
          <Text style={styles.runSimulationText}>Run Full Simulation</Text>
        </LinearGradient>
      </TouchableOpacity>
    </ScrollView>
  );

  const renderSettingsView = () => (
    <ScrollView style={styles.settingsContainer}>
      <View style={styles.settingsSection}>
        <Text style={[styles.sectionTitle, { color: colors.text }]}>Environment</Text>
        
        <View style={[styles.settingsCard, { backgroundColor: colors.card }]}>
          <Text style={[styles.settingsLabel, { color: colors.textSecondary }]}>Mode</Text>
          <View style={styles.modeButtons}>
            {(['development', 'staging', 'production'] as const).map(mode => (
              <TouchableOpacity
                key={mode}
                style={[
                  styles.settingsModeButton,
                  environmentSettings.mode === mode && styles.settingsModeButtonActive,
                  environmentSettings.mode === mode && { backgroundColor: '#6366F1' }
                ]}
                onPress={() => setEnvironmentSettings(prev => ({ ...prev, mode }))}
              >
                <Text style={[
                  styles.settingsModeButtonText,
                  environmentSettings.mode === mode && { color: '#FFFFFF' }
                ]}>
                  {mode.charAt(0).toUpperCase() + mode.slice(1)}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <View style={[styles.settingsCard, { backgroundColor: colors.card }]}>
          <Text style={[styles.settingsLabel, { color: colors.textSecondary }]}>Log Level</Text>
          <View style={styles.modeButtons}>
            {(['debug', 'info', 'warn', 'error'] as const).map(level => (
              <TouchableOpacity
                key={level}
                style={[
                  styles.settingsModeButton,
                  environmentSettings.logLevel === level && styles.settingsModeButtonActive,
                  environmentSettings.logLevel === level && { backgroundColor: '#6366F1' }
                ]}
                onPress={() => setEnvironmentSettings(prev => ({ ...prev, logLevel: level }))}
              >
                <Text style={[
                  styles.settingsModeButtonText,
                  environmentSettings.logLevel === level && { color: '#FFFFFF' }
                ]}>
                  {level.toUpperCase()}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </View>

      <View style={styles.settingsSection}>
        <Text style={[styles.sectionTitle, { color: colors.text }]}>Options</Text>
        
        <View style={[styles.toggleCard, { backgroundColor: colors.card }]}>
          <View style={styles.toggleRow}>
            <View>
              <Text style={[styles.toggleTitle, { color: colors.text }]}>Notifications</Text>
              <Text style={[styles.toggleDescription, { color: colors.textSecondary }]}>
                Enable push notifications for layer events
              </Text>
            </View>
            <Switch
              value={environmentSettings.enableNotifications}
              onValueChange={(value) => setEnvironmentSettings(prev => ({ ...prev, enableNotifications: value }))}
              trackColor={{ false: colors.border, true: '#6366F180' }}
              thumbColor={environmentSettings.enableNotifications ? '#6366F1' : '#f4f3f4'}
            />
          </View>
        </View>

        <View style={[styles.toggleCard, { backgroundColor: colors.card }]}>
          <View style={styles.toggleRow}>
            <View>
              <Text style={[styles.toggleTitle, { color: colors.text }]}>Analytics</Text>
              <Text style={[styles.toggleDescription, { color: colors.textSecondary }]}>
                Enable analytics and performance tracking
              </Text>
            </View>
            <Switch
              value={environmentSettings.enableAnalytics}
              onValueChange={(value) => setEnvironmentSettings(prev => ({ ...prev, enableAnalytics: value }))}
              trackColor={{ false: colors.border, true: '#6366F180' }}
              thumbColor={environmentSettings.enableAnalytics ? '#6366F1' : '#f4f3f4'}
            />
          </View>
        </View>

        <View style={[styles.toggleCard, { backgroundColor: colors.card }]}>
          <View style={styles.toggleRow}>
            <View>
              <Text style={[styles.toggleTitle, { color: colors.text }]}>Auto Scale</Text>
              <Text style={[styles.toggleDescription, { color: colors.textSecondary }]}>
                Automatically scale resources based on load
              </Text>
            </View>
            <Switch
              value={environmentSettings.autoScale}
              onValueChange={(value) => setEnvironmentSettings(prev => ({ ...prev, autoScale: value }))}
              trackColor={{ false: colors.border, true: '#6366F180' }}
              thumbColor={environmentSettings.autoScale ? '#6366F1' : '#f4f3f4'}
            />
          </View>
        </View>
      </View>

      <View style={styles.settingsSection}>
        <Text style={[styles.sectionTitle, { color: colors.text }]}>Advanced</Text>
        
        <View style={[styles.settingsCard, { backgroundColor: colors.card }]}>
          <View style={styles.advancedRow}>
            <Text style={[styles.advancedLabel, { color: colors.text }]}>Max Concurrency</Text>
            <TextInput
              style={[styles.advancedInput, { backgroundColor: colors.background, color: colors.text }]}
              value={environmentSettings.maxConcurrency.toString()}
              onChangeText={(text) => setEnvironmentSettings(prev => ({ 
                ...prev, 
                maxConcurrency: parseInt(text) || 100 
              }))}
              keyboardType="numeric"
            />
          </View>
        </View>

        <View style={[styles.settingsCard, { backgroundColor: colors.card }]}>
          <View style={styles.advancedRow}>
            <Text style={[styles.advancedLabel, { color: colors.text }]}>Timeout (seconds)</Text>
            <TextInput
              style={[styles.advancedInput, { backgroundColor: colors.background, color: colors.text }]}
              value={environmentSettings.timeout.toString()}
              onChangeText={(text) => setEnvironmentSettings(prev => ({ 
                ...prev, 
                timeout: parseInt(text) || 30 
              }))}
              keyboardType="numeric"
            />
          </View>
        </View>

        <View style={[styles.settingsCard, { backgroundColor: colors.card }]}>
          <View style={styles.advancedRow}>
            <Text style={[styles.advancedLabel, { color: colors.text }]}>Retry Attempts</Text>
            <TextInput
              style={[styles.advancedInput, { backgroundColor: colors.background, color: colors.text }]}
              value={environmentSettings.retryAttempts.toString()}
              onChangeText={(text) => setEnvironmentSettings(prev => ({ 
                ...prev, 
                retryAttempts: parseInt(text) || 3 
              }))}
              keyboardType="numeric"
            />
          </View>
        </View>
      </View>

      <TouchableOpacity 
        style={styles.saveButton}
        onPress={() => Alert.alert('Settings Saved', 'Your environment settings have been saved.')}
      >
        <LinearGradient colors={['#10B981', '#059669']} style={styles.saveButtonGradient}>
          <Icons.Save size={20} color="#FFFFFF" />
          <Text style={styles.saveButtonText}>Save Settings</Text>
        </LinearGradient>
      </TouchableOpacity>
    </ScrollView>
  );

  const renderLayerDetailModal = () => (
    <Modal
      visible={showLayerDetail}
      animationType="slide"
      transparent={true}
      onRequestClose={() => setShowLayerDetail(false)}
    >
      <View style={styles.modalOverlay}>
        <View style={[styles.modalContent, { backgroundColor: colors.background }]}>
          {selectedLayer && (
            <>
              <LinearGradient
                colors={selectedLayer.gradient}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={styles.modalHeader}
              >
                <View style={styles.modalHeaderTop}>
                  <View style={styles.modalNumberContainer}>
                    <Text style={styles.modalNumber}>{selectedLayer.layerNumber}</Text>
                  </View>
                  <TouchableOpacity 
                    style={styles.modalCloseButton}
                    onPress={() => setShowLayerDetail(false)}
                  >
                    <Icons.X size={24} color="#FFFFFF" />
                  </TouchableOpacity>
                </View>
                <View style={styles.modalTitleRow}>
                  <Icons.Layers size={32} color="#FFFFFF" />
                  <Text style={styles.modalTitle}>{selectedLayer.name}</Text>
                </View>
                <Text style={styles.modalSubtitle}>{selectedLayer.description}</Text>
              </LinearGradient>
              
              <ScrollView style={styles.modalBody}>
                <View style={styles.modalStatsGrid}>
                  <View style={[styles.modalStatCard, { backgroundColor: colors.card }]}>
                    <Icons.Users size={24} color={selectedLayer.color} />
                    <Text style={[styles.modalStatValue, { color: colors.text }]}>
                      {selectedLayer.agentCount}
                    </Text>
                    <Text style={[styles.modalStatLabel, { color: colors.textSecondary }]}>
                      Agents
                    </Text>
                  </View>
                  <View style={[styles.modalStatCard, { backgroundColor: colors.card }]}>
                    <Icons.Zap size={24} color={selectedLayer.color} />
                    <Text style={[styles.modalStatValue, { color: colors.text }]}>
                      {selectedLayer.optimizedTokenUsage}
                    </Text>
                    <Text style={[styles.modalStatLabel, { color: colors.textSecondary }]}>
                      Tokens
                    </Text>
                  </View>
                  <View style={[styles.modalStatCard, { backgroundColor: colors.card }]}>
                    <Icons.Gauge size={24} color={selectedLayer.color} />
                    <Text style={[styles.modalStatValue, { color: colors.text }]}>
                      {selectedLayer.workType}
                    </Text>
                    <Text style={[styles.modalStatLabel, { color: colors.textSecondary }]}>
                      Work Type
                    </Text>
                  </View>
                  <View style={[styles.modalStatCard, { backgroundColor: colors.card }]}>
                    <Icons.Workflow size={24} color={selectedLayer.color} />
                    <Text style={[styles.modalStatValue, { color: colors.text }]}>
                      {selectedLayer.flow}
                    </Text>
                    <Text style={[styles.modalStatLabel, { color: colors.textSecondary }]}>
                      Flow
                    </Text>
                  </View>
                </View>

                <View style={styles.modalSection}>
                  <Text style={[styles.modalSectionTitle, { color: colors.text }]}>Features</Text>
                  <View style={styles.featuresGrid}>
                    {selectedLayer.features.map((feature, idx) => (
                      <View key={idx} style={[styles.featureChip, { backgroundColor: selectedLayer.color + '20' }]}>
                        <Icons.CheckCircle size={14} color={selectedLayer.color} />
                        <Text style={[styles.featureChipText, { color: selectedLayer.color }]}>{feature}</Text>
                      </View>
                    ))}
                  </View>
                </View>

                <View style={styles.modalSection}>
                  <Text style={[styles.modalSectionTitle, { color: colors.text }]}>
                    Components ({selectedLayer.components.length})
                  </Text>
                  {selectedLayer.components.slice(0, 6).map((component, idx) => {
                    const ComponentIcon = component.icon;
                    return (
                      <TouchableOpacity 
                        key={component.id} 
                        style={[styles.componentCard, { backgroundColor: colors.card }]}
                        onPress={() => {
                          setShowLayerDetail(false);
                          if (component.route) router.push(component.route as any);
                        }}
                      >
                        <View style={[styles.componentIconBox, { backgroundColor: component.color + '20' }]}>
                          <ComponentIcon size={20} color={component.color} />
                        </View>
                        <View style={styles.componentInfo}>
                          <Text style={[styles.componentName, { color: colors.text }]}>{component.name}</Text>
                          <Text style={[styles.componentDesc, { color: colors.textSecondary }]} numberOfLines={1}>
                            {component.description}
                          </Text>
                        </View>
                        <Icons.ChevronRight size={18} color={colors.textSecondary} />
                      </TouchableOpacity>
                    );
                  })}
                  {selectedLayer.components.length > 6 && (
                    <TouchableOpacity style={styles.viewAllButton}>
                      <Text style={styles.viewAllText}>View All {selectedLayer.components.length} Components</Text>
                    </TouchableOpacity>
                  )}
                </View>

                <View style={styles.modalActions}>
                  <TouchableOpacity 
                    style={[styles.actionButton, { backgroundColor: selectedLayer.color }]}
                    onPress={() => handleRunLayerSimulation(selectedLayer)}
                  >
                    <Icons.Play size={20} color="#FFFFFF" />
                    <Text style={styles.actionButtonText}>Run Simulation</Text>
                  </TouchableOpacity>
                  <TouchableOpacity 
                    style={[styles.actionButtonOutline, { borderColor: selectedLayer.color }]}
                    onPress={() => {
                      setShowLayerDetail(false);
                      setShowConfigModal(true);
                    }}
                  >
                    <Icons.Settings size={20} color={selectedLayer.color} />
                    <Text style={[styles.actionButtonTextOutline, { color: selectedLayer.color }]}>Configure</Text>
                  </TouchableOpacity>
                  {selectedLayer.route && (
                    <TouchableOpacity 
                      style={[styles.actionButton, { backgroundColor: selectedLayer.color, marginTop: 10 }]}
                      onPress={() => {
                        setShowLayerDetail(false);
                        router.push(selectedLayer.route as any);
                      }}
                    >
                      <Icons.ExternalLink size={20} color="#FFFFFF" />
                      <Text style={styles.actionButtonText}>Open Full Page</Text>
                    </TouchableOpacity>
                  )}
                </View>
              </ScrollView>
            </>
          )}
        </View>
      </View>
    </Modal>
  );

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <LinearGradient
        colors={['#1F2937', '#111827', '#0F172A']}
        style={[styles.header, { paddingTop: insets.top + 10 }]}
      >
        <View style={styles.headerTop}>
          <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
            <Icons.ArrowLeft size={24} color="#FFFFFF" />
          </TouchableOpacity>
          <View style={styles.headerTitleContainer}>
            <Text style={styles.headerTitle}>Main Simulation</Text>
            <Text style={styles.headerSubtitle}>KAYTX 11-Layer AI Workforce</Text>
          </View>
          <TouchableOpacity 
            style={styles.settingsButton}
            onPress={() => setShowEnvironmentModal(true)}
          >
            <Icons.Settings size={22} color="#FFFFFF" />
          </TouchableOpacity>
        </View>

        <View style={styles.tabContainer}>
          {[
            { key: 'dashboard', label: 'Dashboard', icon: Icons.LayoutDashboard },
            { key: 'layers', label: 'Layers', icon: Icons.Layers },
            { key: 'simulation', icon: Icons.Play, isAction: true },
            { key: 'settings', label: 'Settings', icon: Icons.Settings },
          ].map((tab, idx) => (
            tab.isAction ? (
              <TouchableOpacity 
                key={tab.key}
                style={styles.actionTab}
                onPress={startSimulation}
              >
                <LinearGradient colors={['#6366F1', '#8B5CF6']} style={styles.actionTabGradient}>
                  <Icons.Play size={20} color="#FFFFFF" />
                </LinearGradient>
              </TouchableOpacity>
            ) : (
              <TouchableOpacity
                key={tab.key}
                style={[styles.tab, activeTab === tab.key && styles.tabActive]}
                onPress={() => setActiveTab(tab.key as any)}
              >
                {activeTab === tab.key && <View style={styles.tabIndicator} />}
                <tab.icon 
                  size={20} 
                  color={activeTab === tab.key ? '#6366F1' : 'rgba(255,255,255,0.6)'} 
                />
                <Text style={[
                  styles.tabLabel,
                  activeTab === tab.key && styles.tabLabelActive
                ]}>
                  {tab.label}
                </Text>
              </TouchableOpacity>
            )
          ))}
        </View>
      </LinearGradient>

      <ScrollView 
        style={styles.content}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor="#6366F1" />
        }
      >
        {activeTab === 'dashboard' && renderDashboard()}
        {activeTab === 'layers' && renderLayersView()}
        {activeTab === 'simulation' && renderSimulationView()}
        {activeTab === 'settings' && renderSettingsView()}
      </ScrollView>

      {renderLayerDetailModal()}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    paddingBottom: 16,
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
  },
  headerTop: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    marginBottom: 16,
  },
  backButton: {
    padding: 8,
    marginRight: 8,
  },
  headerTitleContainer: {
    flex: 1,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  headerSubtitle: {
    fontSize: 13,
    color: 'rgba(255,255,255,0.7)',
    marginTop: 2,
  },
  settingsButton: {
    padding: 8,
  },
  tabContainer: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    gap: 8,
  },
  tab: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 10,
    borderRadius: 12,
    backgroundColor: 'rgba(255,255,255,0.1)',
    position: 'relative',
  },
  tabActive: {
    backgroundColor: 'rgba(255,255,255,0.15)',
  },
  tabIndicator: {
    position: 'absolute',
    top: 0,
    left: '20%',
    right: '20%',
    height: 3,
    backgroundColor: '#6366F1',
    borderBottomLeftRadius: 3,
    borderBottomRightRadius: 3,
  },
  tabLabel: {
    fontSize: 11,
    color: 'rgba(255,255,255,0.6)',
    marginTop: 4,
  },
  tabLabelActive: {
    color: '#FFFFFF',
    fontWeight: '600',
  },
  actionTab: {
    flex: 0.5,
  },
  actionTabGradient: {
    padding: 12,
    borderRadius: 12,
    alignItems: 'center',
  },
  content: {
    flex: 1,
  },
  dashboardContainer: {
    padding: 16,
  },
  statsOverview: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
    marginBottom: 20,
  },
  statsCard: {
    width: (width - 42) / 2,
  },
  statsCardGradient: {
    padding: 16,
    borderRadius: 16,
    alignItems: 'center',
  },
  statsCardValue: {
    fontSize: 22,
    fontWeight: '700',
    color: '#FFFFFF',
    marginTop: 8,
  },
  statsCardLabel: {
    fontSize: 12,
    color: 'rgba(255,255,255,0.8)',
    marginTop: 2,
  },
  simulationStatus: {
    marginBottom: 20,
  },
  simulationHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
  },
  sectionSubtitle: {
    fontSize: 13,
    marginTop: 4,
  },
  runButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 14,
    paddingVertical: 8,
    backgroundColor: '#6366F1',
    borderRadius: 20,
    gap: 6,
  },
  runButtonActive: {
    backgroundColor: '#10B981',
  },
  runButtonText: {
    color: '#FFFFFF',
    fontWeight: '600',
    fontSize: 13,
  },
  progressContainer: {
    marginBottom: 12,
  },
  progressBar: {
    height: 6,
    backgroundColor: '#374151',
    borderRadius: 3,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#6366F1',
    borderRadius: 3,
  },
  progressText: {
    fontSize: 12,
    marginTop: 4,
    textAlign: 'right',
  },
  layerStatusGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  layerStatusCard: {
    width: (width - 42) / 2,
    padding: 12,
    borderRadius: 12,
  },
  layerStatusHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  layerNumberBadge: {
    width: 24,
    height: 24,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  layerNumberText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  layerStatusName: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 8,
  },
  layerStatusStats: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 8,
  },
  layerStatusStat: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  layerStatusStatText: {
    fontSize: 11,
  },
  layerToggleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  toggleLabel: {
    fontSize: 11,
  },
  flowVisualization: {
    marginBottom: 20,
  },
  flowContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 16,
    paddingHorizontal: 8,
  },
  flowNode: {
    alignItems: 'center',
  },
  flowIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  flowLine: {
    width: 20,
    height: 2,
    marginTop: 4,
  },
  layersContainer: {
    flex: 1,
  },
  layersContent: {
    padding: 16,
    gap: 16,
  },
  layerCard: {
    borderRadius: 16,
    padding: 16,
  },
  layerCardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  layerCardNumber: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: 'rgba(255,255,255,0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  layerCardNumberText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  layerCardInfo: {
    flex: 1,
  },
  layerCardTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  layerCardSubtitle: {
    fontSize: 12,
    color: 'rgba(255,255,255,0.7)',
  },
  layerCardIcon: {
    marginLeft: 8,
  },
  layerCardDescription: {
    fontSize: 13,
    color: 'rgba(255,255,255,0.8)',
    lineHeight: 18,
    marginBottom: 12,
  },
  layerCardStats: {
    flexDirection: 'row',
    gap: 16,
    marginBottom: 12,
  },
  layerCardStat: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  layerCardStatText: {
    fontSize: 12,
    color: 'rgba(255,255,255,0.8)',
  },
  layerCardFeatures: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
    marginBottom: 12,
  },
  featureBadge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    backgroundColor: 'rgba(255,255,255,0.2)',
    borderRadius: 12,
  },
  featureBadgeText: {
    fontSize: 11,
    color: '#FFFFFF',
  },
  layerCardComponents: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: 'rgba(255,255,255,0.2)',
  },
  componentsText: {
    fontSize: 13,
    color: 'rgba(255,255,255,0.7)',
  },
  simulationContainer: {
    flex: 1,
    padding: 16,
  },
  simulationHeaderSection: {
    marginBottom: 16,
  },
  complexityTierCard: {
    padding: 16,
    borderRadius: 12,
    marginBottom: 20,
  },
  complexityTierButtons: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 12,
  },
  complexityTierButton: {
    flex: 1,
    paddingVertical: 12,
    paddingHorizontal: 8,
    borderRadius: 10,
    borderWidth: 1,
    alignItems: 'center',
  },
  complexityTierLabel: {
    fontSize: 14,
    fontWeight: '600',
  },
  complexityTierRange: {
    fontSize: 11,
    marginTop: 2,
  },
  complexityTierDesc: {
    fontSize: 12,
    textAlign: 'center',
    fontStyle: 'italic',
  },
  configCard: {
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
  },
  configCardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  configBadge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
    marginRight: 10,
  },
  configBadgeText: {
    fontSize: 12,
    fontWeight: '600',
  },
  configCardTitle: {
    fontSize: 16,
    fontWeight: '600',
    flex: 1,
  },
  configRow: {
    flexDirection: 'row',
    gap: 16,
    marginBottom: 12,
  },
  configItem: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  configItemFull: {
    flex: 1,
  },
  configLabel: {
    fontSize: 13,
    marginBottom: 8,
  },
  modeSelector: {
    flexDirection: 'row',
    gap: 8,
  },
  modeButton: {
    flex: 1,
    paddingVertical: 8,
    borderRadius: 8,
    backgroundColor: '#374151',
    alignItems: 'center',
  },
  modeButtonText: {
    fontSize: 12,
    color: '#FFFFFF',
  },
  tokenSlider: {
    flexDirection: 'row',
    gap: 8,
  },
  tokenButton: {
    flex: 1,
    paddingVertical: 8,
    borderRadius: 8,
    backgroundColor: '#374151',
    alignItems: 'center',
  },
  tokenButtonText: {
    fontSize: 12,
    color: '#FFFFFF',
  },
  runSimulationButton: {
    marginTop: 16,
    marginBottom: 32,
  },
  runSimulationGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
    borderRadius: 12,
    gap: 10,
  },
  runSimulationText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  settingsContainer: {
    flex: 1,
    padding: 16,
  },
  settingsSection: {
    marginBottom: 24,
  },
  settingsCard: {
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
  },
  settingsLabel: {
    fontSize: 13,
    marginBottom: 10,
  },
  modeButtons: {
    flexDirection: 'row',
    gap: 8,
  },
  settingsModeButton: {
    flex: 1,
    paddingVertical: 10,
    borderRadius: 8,
    backgroundColor: '#374151',
    alignItems: 'center',
  },
  settingsModeButtonActive: {
    backgroundColor: '#6366F1',
  },
  settingsModeButtonText: {
    fontSize: 12,
    color: '#FFFFFF',
  },
  toggleCard: {
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
  },
  toggleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  toggleTitle: {
    fontSize: 15,
    fontWeight: '600',
    marginBottom: 2,
  },
  toggleDescription: {
    fontSize: 12,
  },
  advancedRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  advancedLabel: {
    fontSize: 14,
    fontWeight: '500',
  },
  advancedInput: {
    width: 80,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
    textAlign: 'center',
    fontSize: 14,
    fontWeight: '600',
  },
  saveButton: {
    marginTop: 8,
    marginBottom: 40,
  },
  saveButtonGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
    borderRadius: 12,
    gap: 10,
  },
  saveButtonText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.8)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    maxHeight: height * 0.9,
  },
  modalHeader: {
    padding: 20,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
  },
  modalHeaderTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  modalNumberContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: 'rgba(255,255,255,0.2)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalNumber: {
    fontSize: 22,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  modalCloseButton: {
    padding: 8,
  },
  modalTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 8,
  },
  modalTitle: {
    fontSize: 26,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  modalSubtitle: {
    fontSize: 14,
    color: 'rgba(255,255,255,0.8)',
  },
  modalBody: {
    padding: 20,
  },
  modalStatsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
    marginBottom: 20,
  },
  modalStatCard: {
    width: (width - 62) / 2,
    padding: 14,
    borderRadius: 12,
    alignItems: 'center',
  },
  modalStatValue: {
    fontSize: 18,
    fontWeight: '700',
    marginTop: 8,
  },
  modalStatLabel: {
    fontSize: 11,
    marginTop: 2,
  },
  modalSection: {
    marginBottom: 20,
  },
  modalSectionTitle: {
    fontSize: 17,
    fontWeight: '700',
    marginBottom: 12,
  },
  featuresGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  featureChip: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    gap: 6,
  },
  featureChipText: {
    fontSize: 12,
    fontWeight: '500',
  },
  componentCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    borderRadius: 12,
    marginBottom: 8,
  },
  componentIconBox: {
    width: 40,
    height: 40,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  componentInfo: {
    flex: 1,
  },
  componentName: {
    fontSize: 14,
    fontWeight: '600',
  },
  componentDesc: {
    fontSize: 12,
    marginTop: 2,
  },
  viewAllButton: {
    alignItems: 'center',
    paddingVertical: 12,
  },
  viewAllText: {
    fontSize: 14,
    color: '#6366F1',
    fontWeight: '600',
  },
  modalActions: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 8,
    marginBottom: 32,
  },
  actionButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 14,
    borderRadius: 12,
    gap: 8,
  },
  actionButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  actionButtonOutline: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 14,
    borderRadius: 12,
    borderWidth: 2,
    gap: 8,
  },
  actionButtonTextOutline: {
    fontSize: 14,
    fontWeight: '600',
  },
});

export default MainSimulation;
