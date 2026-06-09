import React, { useState, useMemo } from 'react';
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

const AILayersDashboard = () => {
  const insets = useSafeAreaInsets();
  const { colors } = useTheme();
  
  const [selectedLayer, setSelectedLayer] = useState<AILayer | null>(null);
  const [showLayerModal, setShowLayerModal] = useState(false);
  const [viewMode, setViewMode] = useState<'flow' | 'grid' | 'list'>('flow');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedLayerCompare, setSelectedLayerCompare] = useState<AILayer | null>(null);
  const [showCompareModal, setShowCompareModal] = useState(false);

  const filteredLayers = useMemo(() => {
    if (!searchQuery) return aiAgentLayers;
    return aiAgentLayers.filter(layer =>
      layer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      layer.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      layer.components.some(c => c.name.toLowerCase().includes(searchQuery.toLowerCase()))
    );
  }, [searchQuery]);

  const handleLayerPress = (layer: AILayer) => {
    setSelectedLayer(layer);
    setShowLayerModal(true);
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

  const handleComparePress = (layer: AILayer) => {
    setSelectedLayerCompare(layer);
    setShowCompareModal(true);
  };

  const handleComponentPress = (component: LayerComponent) => {
    setShowLayerModal(false);
    if (component.route) {
      router.push(component.route as any);
    }
  };

  const renderFlowView = () => (
    <View style={styles.flowContainer}>
      {layerFlowOrder.map((layerId, index) => {
        const layer = getLayerById(layerId);
        if (!layer) return null;
        
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
              style={styles.flowCard}
            >
              <View style={styles.flowNumberContainer}>
                <Text style={styles.flowNumber}>{layer.layerNumber}</Text>
              </View>
              <View style={styles.flowContent}>
                <View style={styles.flowIconContainer}>
                  <LayerIcon size={28} color="#FFFFFF" />
                </View>
                <Text style={styles.flowTitle}>{layer.name}</Text>
                <Text style={styles.flowAgents}>{layer.agentCount} agents</Text>
              </View>
              {index < layerFlowOrder.length - 1 && (
                <View style={styles.flowArrow}>
                  <Icons.ChevronDown size={20} color="rgba(255,255,255,0.5)" />
                </View>
              )}
            </LinearGradient>
          </TouchableOpacity>
        );
      })}
    </View>
  );

  const renderGridView = () => (
    <View style={styles.gridContainer}>
      {aiAgentLayers.map((layer) => {
        const LayerIcon = layer.icon;
        
        return (
          <TouchableOpacity
            key={layer.id}
            activeOpacity={0.8}
            onPress={() => handleLayerPress(layer)}
            style={styles.gridItem}
          >
            <LinearGradient
              colors={layer.gradient}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={styles.gridCard}
            >
              <View style={styles.gridHeader}>
                <View style={styles.gridNumberBadge}>
                  <Text style={styles.gridNumber}>{layer.layerNumber}</Text>
                </View>
                <LayerIcon size={24} color="#FFFFFF" />
              </View>
              <Text style={styles.gridTitle}>{layer.name}</Text>
              <Text style={styles.gridDescription} numberOfLines={2}>
                {layer.description}
              </Text>
              <View style={styles.gridFooter}>
                <View style={styles.gridStat}>
                  <Icons.Users size={14} color="rgba(255,255,255,0.8)" />
                  <Text style={styles.gridStatText}>{layer.agentCount}</Text>
                </View>
                <View style={styles.gridStat}>
                  <Icons.Zap size={14} color="rgba(255,255,255,0.8)" />
                  <Text style={styles.gridStatText}>{layer.optimizedTokenUsage} tokens</Text>
                </View>
              </View>
            </LinearGradient>
          </TouchableOpacity>
        );
      })}
    </View>
  );

  const renderListView = () => (
    <View style={styles.listContainer}>
      {aiAgentLayers.map((layer, index) => {
        const LayerIcon = layer.icon;
        
        return (
          <TouchableOpacity
            key={layer.id}
            activeOpacity={0.8}
            onPress={() => handleLayerPress(layer)}
            style={styles.listItem}
          >
            <View style={[styles.listNumber, { backgroundColor: layer.color }]}>
              <Text style={styles.listNumberText}>{layer.layerNumber}</Text>
            </View>
            <View style={[styles.listIcon, { backgroundColor: layer.color + '20' }]}>
              <LayerIcon size={24} color={layer.color} />
            </View>
            <View style={styles.listContent}>
              <Text style={styles.listTitle}>{layer.name}</Text>
              <Text style={styles.listUseCase} numberOfLines={1}>
                {layer.useCase}
              </Text>
            </View>
            <View style={styles.listStats}>
              <Text style={styles.listAgents}>{layer.agentCount} agents</Text>
              <Text style={styles.listTokens}>{layer.optimizedTokenUsage} tokens</Text>
            </View>
            <Icons.ChevronRight size={20} color={colors.textSecondary} />
          </TouchableOpacity>
        );
      })}
    </View>
  );

  const renderLayerModal = () => (
    <Modal
      visible={showLayerModal}
      animationType="slide"
      transparent={true}
      onRequestClose={() => setShowLayerModal(false)}
    >
      <View style={styles.modalOverlay}>
        <View style={[styles.modalContent, { backgroundColor: colors.card }]}>
          {selectedLayer && (
            <>
              <LinearGradient
                colors={selectedLayer.gradient}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={styles.modalHeader}
              >
                <View style={styles.modalHeaderContent}>
                  <View style={styles.modalNumberContainer}>
                    <Text style={styles.modalNumber}>{selectedLayer.layerNumber}</Text>
                  </View>
                  <View style={styles.modalTitleContainer}>
                    <Text style={styles.modalTitle}>{selectedLayer.name}</Text>
                    <Text style={styles.modalSubtitle}>{selectedLayer.shortName} Layer</Text>
                  </View>
                </View>
                <TouchableOpacity
                  style={styles.modalCloseButton}
                  onPress={() => setShowLayerModal(false)}
                >
                  <Icons.X size={24} color="#FFFFFF" />
                </TouchableOpacity>
              </LinearGradient>
              
              <ScrollView style={styles.modalBody}>
                <Text style={[styles.modalDescription, { color: colors.text }]}>
                  {selectedLayer.description}
                </Text>
                
                <View style={styles.modalStats}>
                  <View style={styles.modalStatItem}>
                    <Icons.Users size={20} color={selectedLayer.color} />
                    <Text style={[styles.modalStatValue, { color: colors.text }]}>
                      {selectedLayer.agentCount}
                    </Text>
                    <Text style={[styles.modalStatLabel, { color: colors.textSecondary }]}>
                      Agents
                    </Text>
                  </View>
                  <View style={styles.modalStatItem}>
                    <Icons.Zap size={20} color={selectedLayer.color} />
                    <Text style={[styles.modalStatValue, { color: colors.text }]}>
                      {selectedLayer.optimizedTokenUsage}
                    </Text>
                    <Text style={[styles.modalStatLabel, { color: colors.textSecondary }]}>
                      Tokens
                    </Text>
                  </View>
                  <View style={styles.modalStatItem}>
                    <Icons.Gauge size={20} color={selectedLayer.color} />
                    <Text style={[styles.modalStatValue, { color: colors.text }]}>
                      {selectedLayer.workType}
                    </Text>
                    <Text style={[styles.modalStatLabel, { color: colors.textSecondary }]}>
                      Work Type
                    </Text>
                  </View>
                </View>
                
                <View style={styles.featuresSection}>
                  <Text style={[styles.sectionTitle, { color: colors.text }]}>Features</Text>
                  <View style={styles.featuresList}>
                    {selectedLayer.features.map((feature, idx) => (
                      <View key={idx} style={styles.featureItem}>
                        <Icons.CheckCircle size={16} color={selectedLayer.color} />
                        <Text style={[styles.featureText, { color: colors.text }]}>{feature}</Text>
                      </View>
                    ))}
                  </View>
                </View>
                
                <View style={styles.componentsSection}>
                  <Text style={[styles.sectionTitle, { color: colors.text }]}>
                    Components ({selectedLayer.components.length})
                  </Text>
                  <FlatList
                    data={selectedLayer.components}
                    keyExtractor={(item) => item.id}
                    scrollEnabled={false}
                    renderItem={({ item }) => {
                      const ComponentIcon = item.icon;
                      return (
                        <TouchableOpacity
                          style={[styles.componentItem, { backgroundColor: colors.background }]}
                          onPress={() => handleComponentPress(item)}
                        >
                          <View style={[styles.componentIcon, { backgroundColor: item.color + '20' }]}>
                            <ComponentIcon size={20} color={item.color} />
                          </View>
                          <View style={styles.componentContent}>
                            <Text style={[styles.componentName, { color: colors.text }]}>
                              {item.name}
                            </Text>
                            <Text style={[styles.componentDescription, { color: colors.textSecondary }]}>
                              {item.description}
                            </Text>
                          </View>
                          <Icons.ChevronRight size={18} color={colors.textSecondary} />
                        </TouchableOpacity>
                      );
                    }}
                  />
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
        colors={['#6366F1', '#8B5CF6', '#A855F7']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={[styles.header, { paddingTop: insets.top + 20 }]}
      >
        <View style={styles.headerContent}>
          <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
            <Icons.ArrowLeft size={24} color="#FFFFFF" />
          </TouchableOpacity>
          <View style={styles.headerTitleContainer}>
            <Text style={styles.headerTitle}>KAYTX 11-Layer AI Workforce</Text>
            <Text style={styles.headerSubtitle}>Enterprise AI Operating System</Text>
          </View>
        </View>
        
        <View style={styles.statsRow}>
          <View style={styles.statItem}>
            <Text style={styles.statValue}>{LAYER_STATS.totalLayers}</Text>
            <Text style={styles.statLabel}>Layers</Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.statItem}>
            <Text style={styles.statValue}>{LAYER_STATS.totalAgents.toLocaleString()}</Text>
            <Text style={styles.statLabel}>AI Agents</Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.statItem}>
            <Text style={styles.statValue}>{LAYER_STATS.optimizedCostPerRequest}</Text>
            <Text style={styles.statLabel}>Cost/Request</Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.statItem}>
            <Text style={styles.statValue}>{LAYER_STATS.efficiencyGain}</Text>
            <Text style={styles.statLabel}>Efficiency</Text>
          </View>
        </View>
        
        <View style={styles.viewModeContainer}>
          <TouchableOpacity
            style={[styles.viewModeButton, viewMode === 'flow' && styles.viewModeButtonActive]}
            onPress={() => setViewMode('flow')}
          >
            <Icons.ArrowDown size={18} color={viewMode === 'flow' ? '#6366F1' : '#FFFFFF'} />
            <Text style={[styles.viewModeText, viewMode === 'flow' && styles.viewModeTextActive]}>
              Flow
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.viewModeButton, viewMode === 'grid' && styles.viewModeButtonActive]}
            onPress={() => setViewMode('grid')}
          >
            <Icons.LayoutGrid size={18} color={viewMode === 'grid' ? '#6366F1' : '#FFFFFF'} />
            <Text style={[styles.viewModeText, viewMode === 'grid' && styles.viewModeTextActive]}>
              Grid
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.viewModeButton, viewMode === 'list' && styles.viewModeButtonActive]}
            onPress={() => setViewMode('list')}
          >
            <Icons.List size={18} color={viewMode === 'list' ? '#6366F1' : '#FFFFFF'} />
            <Text style={[styles.viewModeText, viewMode === 'list' && styles.viewModeTextActive]}>
              List
            </Text>
          </TouchableOpacity>
        </View>
        
        <View style={styles.searchContainer}>
          <Icons.Search size={18} color="rgba(255,255,255,0.7)" style={styles.searchIcon} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search layers, components..."
            placeholderTextColor="rgba(255,255,255,0.5)"
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
          {searchQuery.length > 0 && (
            <TouchableOpacity onPress={() => setSearchQuery('')}>
              <Icons.X size={18} color="rgba(255,255,255,0.7)" />
            </TouchableOpacity>
          )}
        </View>
      </LinearGradient>
      
      <ScrollView 
        style={styles.content}
        contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator={false}
      >
        {viewMode === 'flow' && renderFlowView()}
        {viewMode === 'grid' && renderGridView()}
        {viewMode === 'list' && renderListView()}
      </ScrollView>
      
      {renderLayerModal()}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    paddingBottom: 20,
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
  },
  headerContent: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    marginBottom: 20,
  },
  backButton: {
    padding: 8,
    marginRight: 12,
  },
  headerTitleContainer: {
    flex: 1,
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  headerSubtitle: {
    fontSize: 14,
    color: 'rgba(255,255,255,0.8)',
    marginTop: 2,
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingHorizontal: 16,
    paddingVertical: 16,
    backgroundColor: 'rgba(0,0,0,0.2)',
    borderRadius: 16,
    marginHorizontal: 16,
  },
  statItem: {
    alignItems: 'center',
  },
  statValue: {
    fontSize: 18,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  statLabel: {
    fontSize: 11,
    color: 'rgba(255,255,255,0.7)',
    marginTop: 2,
  },
  statDivider: {
    width: 1,
    backgroundColor: 'rgba(255,255,255,0.3)',
  },
  viewModeContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 16,
    gap: 8,
  },
  viewModeButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: 'rgba(255,255,255,0.2)',
    gap: 6,
  },
  viewModeButtonActive: {
    backgroundColor: '#FFFFFF',
  },
  viewModeText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  viewModeTextActive: {
    color: '#6366F1',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.15)',
    borderRadius: 12,
    marginHorizontal: 16,
    marginTop: 16,
    paddingHorizontal: 12,
    height: 44,
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    fontSize: 15,
    color: '#FFFFFF',
  },
  content: {
    flex: 1,
  },
  contentContainer: {
    padding: 16,
    paddingBottom: 40,
  },
  flowContainer: {
    alignItems: 'center',
    gap: 8,
  },
  flowCard: {
    width: width - 32,
    borderRadius: 16,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    position: 'relative',
  },
  flowNumberContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255,255,255,0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  flowNumber: {
    fontSize: 18,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  flowContent: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  flowIconContainer: {
    marginRight: 12,
  },
  flowTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#FFFFFF',
    flex: 1,
  },
  flowAgents: {
    fontSize: 13,
    color: 'rgba(255,255,255,0.8)',
  },
  flowArrow: {
    position: 'absolute',
    bottom: -14,
    left: '50%',
    marginLeft: -10,
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: '#1F2937',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 10,
  },
  gridContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  gridItem: {
    width: (width - 44) / 2,
  },
  gridCard: {
    borderRadius: 16,
    padding: 16,
    minHeight: 180,
  },
  gridHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  gridNumberBadge: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: 'rgba(255,255,255,0.2)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  gridNumber: {
    fontSize: 14,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  gridTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#FFFFFF',
    marginBottom: 6,
  },
  gridDescription: {
    fontSize: 12,
    color: 'rgba(255,255,255,0.8)',
    lineHeight: 16,
    marginBottom: 12,
  },
  gridFooter: {
    flexDirection: 'row',
    gap: 12,
  },
  gridStat: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  gridStatText: {
    fontSize: 12,
    color: 'rgba(255,255,255,0.9)',
  },
  listContainer: {
    gap: 8,
  },
  listItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    borderRadius: 12,
    backgroundColor: '#1F2937',
  },
  listNumber: {
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  listNumberText: {
    fontSize: 14,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  listIcon: {
    width: 44,
    height: 44,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  listContent: {
    flex: 1,
  },
  listTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  listUseCase: {
    fontSize: 12,
    color: 'rgba(255,255,255,0.6)',
    marginTop: 2,
  },
  listStats: {
    alignItems: 'flex-end',
    marginRight: 8,
  },
  listAgents: {
    fontSize: 13,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  listTokens: {
    fontSize: 11,
    color: 'rgba(255,255,255,0.6)',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.7)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    maxHeight: height * 0.85,
  },
  modalHeader: {
    padding: 20,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
  },
  modalHeaderContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  modalNumberContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: 'rgba(255,255,255,0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  modalNumber: {
    fontSize: 22,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  modalTitleContainer: {
    flex: 1,
  },
  modalTitle: {
    fontSize: 22,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  modalSubtitle: {
    fontSize: 14,
    color: 'rgba(255,255,255,0.8)',
  },
  modalCloseButton: {
    padding: 8,
  },
  modalBody: {
    padding: 20,
  },
  modalDescription: {
    fontSize: 15,
    lineHeight: 22,
    marginBottom: 20,
  },
  modalStats: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 16,
    backgroundColor: '#1F2937',
    borderRadius: 16,
    marginBottom: 20,
  },
  modalStatItem: {
    alignItems: 'center',
  },
  modalStatValue: {
    fontSize: 18,
    fontWeight: '700',
    marginTop: 6,
  },
  modalStatLabel: {
    fontSize: 12,
    marginTop: 2,
  },
  featuresSection: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 12,
  },
  featuresList: {
    gap: 10,
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  featureText: {
    fontSize: 14,
  },
  componentsSection: {
    marginBottom: 40,
  },
  componentItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    borderRadius: 12,
    marginBottom: 8,
  },
  componentIcon: {
    width: 40,
    height: 40,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  componentContent: {
    flex: 1,
  },
  componentName: {
    fontSize: 15,
    fontWeight: '600',
  },
  componentDescription: {
    fontSize: 12,
    marginTop: 2,
  },
});

export default AILayersDashboard;
