import React, { useState, useCallback, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Switch,
  Alert,
  ActivityIndicator,
  Modal,
  FlatList,
} from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import {
  ChevronLeft,
  Save,
  Bot,
  Brain,
  Mic,
  Globe,
  User,
  GraduationCap,
  Upload,
  Settings,
  ChevronDown,
  Check,
  X,
  AlertTriangle,
  Shield,
  Clock,
  Zap,
  BarChart3,
  FileText,
  Lock,
} from 'lucide-react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { BlurView } from 'expo-blur';
import Animated, { FadeInUp } from 'react-native-reanimated';
import { useColorScheme } from '@/hooks/useColorScheme';
import { Colors } from '@/constants/Colors';
import {
  AIAgent,
  AgentConfiguration,
  AIModelType,
  AgentLanguage,
  VoiceGender,
  VoiceStyle,
  VoiceSpeed,
  VoiceTone,
  AgentPersonaAge,
  getAgentById,
  updateAgentConfiguration,
  defaultAgentConfiguration,
  agentConfigurationPresets,
  AgentCategory,
  createAgentConfiguration,
} from '@/constants/aiAgentHierarchy';

type ConfigSection = 'model' | 'voice' | 'language' | 'personality' | 'training' | 'data' | 'advanced' | 'security';

const modelOptions: { value: AIModelType; label: string; description: string; cost: string }[] = [
  { value: 'gpt-4o', label: 'GPT-4o', description: 'Most capable multimodal model', cost: 'High' },
  { value: 'gpt-4o-mini', label: 'GPT-4o Mini', description: 'Fast and cost-effective', cost: 'Low' },
  { value: 'gpt-4-turbo', label: 'GPT-4 Turbo', description: 'Advanced reasoning', cost: 'High' },
  { value: 'claude-3-5-sonnet', label: 'Claude 3.5 Sonnet', description: 'Excellent for analysis', cost: 'Medium' },
  { value: 'claude-3-5-haiku', label: 'Claude 3.5 Haiku', description: 'Fast and efficient', cost: 'Low' },
  { value: 'claude-3-opus', label: 'Claude 3 Opus', description: 'Deep reasoning tasks', cost: 'Very High' },
  { value: 'gemini-1.5-pro', label: 'Gemini 1.5 Pro', description: 'Long context window', cost: 'Medium' },
  { value: 'gemini-1.5-flash', label: 'Gemini 1.5 Flash', description: 'Quick responses', cost: 'Low' },
  { value: 'llama-3.1-70b', label: 'Llama 3.1 70B', description: 'Open source powerful', cost: 'Medium' },
  { value: 'llama-3.1-8b', label: 'Llama 3.1 8B', description: 'Efficient and fast', cost: 'Low' },
  { value: 'mistral-large', label: 'Mistral Large', description: 'European AI leader', cost: 'Medium' },
  { value: 'mistral-medium', label: 'Mistral Medium', description: 'Balanced performance', cost: 'Low' },
];

const languageOptions: { value: AgentLanguage; label: string; flag: string }[] = [
  { value: 'en', label: 'English', flag: '🇺🇸' },
  { value: 'es', label: 'Spanish', flag: '🇪🇸' },
  { value: 'fr', label: 'French', flag: '🇫🇷' },
  { value: 'de', label: 'German', flag: '🇩🇪' },
  { value: 'it', label: 'Italian', flag: '🇮🇹' },
  { value: 'pt', label: 'Portuguese', flag: '🇵🇹' },
  { value: 'zh', label: 'Chinese', flag: '🇨🇳' },
  { value: 'ja', label: 'Japanese', flag: '🇯🇵' },
  { value: 'ko', label: 'Korean', flag: '🇰🇷' },
  { value: 'ar', label: 'Arabic', flag: '🇸🇦' },
  { value: 'hi', label: 'Hindi', flag: '🇮🇳' },
  { value: 'ru', label: 'Russian', flag: '🇷🇺' },
  { value: 'multi', label: 'Multilingual', flag: '🌍' },
];

const voiceGenderOptions: { value: VoiceGender; label: string }[] = [
  { value: 'male', label: 'Male' },
  { value: 'female', label: 'Female' },
  { value: 'neutral', label: 'Neutral' },
];

const voiceStyleOptions: { value: VoiceStyle; label: string }[] = [
  { value: 'professional', label: 'Professional' },
  { value: 'friendly', label: 'Friendly' },
  { value: 'casual', label: 'Casual' },
  { value: 'formal', label: 'Formal' },
  { value: 'energetic', label: 'Energetic' },
  { value: 'calm', label: 'Calm' },
  { value: 'authoritative', label: 'Authoritative' },
];

const voiceSpeedOptions: { value: VoiceSpeed; label: string }[] = [
  { value: 'slow', label: 'Slow' },
  { value: 'normal', label: 'Normal' },
  { value: 'fast', label: 'Fast' },
];

const voiceToneOptions: { value: VoiceTone; label: string }[] = [
  { value: 'warm', label: 'Warm' },
  { value: 'neutral', label: 'Neutral' },
  { value: 'bright', label: 'Bright' },
  { value: 'deep', label: 'Deep' },
  { value: 'soft', label: 'Soft' },
];

const ageOptions: { value: AgentPersonaAge; label: string }[] = [
  { value: 'young', label: 'Young (20s)' },
  { value: 'adult', label: 'Adult (30s)' },
  { value: 'mature', label: 'Mature (40s)' },
  { value: 'senior', label: 'Senior (50s+)' },
];

const expertiseOptions = [
  'beginner',
  'intermediate',
  'advanced',
  'expert',
  'master',
] as const;

const communicationStyles = [
  'professional',
  'friendly',
  'technical',
  'empathetic',
  'humorous',
  'authoritative',
  'consultative',
] as const;

const responseLengthOptions = [
  { value: 'concise' as const, label: 'Concise', description: 'Brief, to-the-point responses' },
  { value: 'balanced' as const, label: 'Balanced', description: 'Moderate detail level' },
  { value: 'detailed' as const, label: 'Detailed', description: 'Comprehensive explanations' },
  { value: 'comprehensive' as const, label: 'Comprehensive', description: 'In-depth analysis' },
];

const privacyLevels = [
  { value: 'standard', label: 'Standard', description: 'Basic data protection' },
  { value: 'high', label: 'High', description: 'Enhanced security measures' },
  { value: 'maximum', label: 'Maximum', description: 'Enterprise-grade encryption' },
] as const;

const piiHandlingOptions = [
  { value: 'block', label: 'Block', description: 'Reject PII entirely' },
  { value: 'mask', label: 'Mask', description: 'Hide sensitive data' },
  { value: 'anonymize', label: 'Anonymize', description: 'Remove identifiers' },
  { value: 'allow', label: 'Allow', description: 'Process normally' },
] as const;

const trainingScheduleOptions = [
  { value: 'manual' as const, label: 'Manual', description: 'Trigger training yourself' },
  { value: 'daily' as const, label: 'Daily', description: 'Train every 24 hours' },
  { value: 'weekly' as const, label: 'Weekly', description: 'Train once per week' },
  { value: 'monthly' as const, label: 'Monthly', description: 'Train monthly' },
];

const processingScheduleOptions = [
  { value: 'immediate' as const, label: 'Immediate', description: 'Process right away' },
  { value: 'hourly' as const, label: 'Hourly', description: 'Batch process hourly' },
  { value: 'daily' as const, label: 'Daily', description: 'Process once daily' },
  { value: 'weekly' as const, label: 'Weekly', description: 'Process weekly' },
];

export default function AgentConfigurationScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];

  const [agent, setAgent] = useState<AIAgent | null>(null);
  const [config, setConfig] = useState<AgentConfiguration>(defaultAgentConfiguration);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [activeSection, setActiveSection] = useState<ConfigSection>('model');
  const [showModelPicker, setShowModelPicker] = useState(false);
  const [showLanguagePicker, setShowLanguagePicker] = useState(false);
  const [unsavedChanges, setUnsavedChanges] = useState(false);

  const loadAgent = useCallback(() => {
    setLoading(true);
    const foundAgent = getAgentById(id);
    if (foundAgent) {
      setAgent(foundAgent);
      setConfig(foundAgent.configuration || defaultAgentConfiguration);
    }
    setLoading(false);
  }, [id]);

  useEffect(() => {
    loadAgent();
  }, [id, loadAgent]);

  const handleSave = async () => {
    if (!agent) return;
    
    setSaving(true);
    try {
      const updatedAgent = updateAgentConfiguration(agent.id, config);
      if (updatedAgent) {
        setAgent(updatedAgent);
        setUnsavedChanges(false);
        Alert.alert('Success', 'Agent configuration saved successfully');
      } else {
        Alert.alert('Error', 'Failed to save configuration');
      }
    } catch {
      Alert.alert('Error', 'An error occurred while saving');
    } finally {
      setSaving(false);
    }
  };

  const updateConfig = (updates: Partial<AgentConfiguration>) => {
    setConfig(prev => ({ ...prev, ...updates }));
    setUnsavedChanges(true);
  };

  const updateModelConfig = (updates: Partial<AgentConfiguration['model']>) => {
    setConfig(prev => ({
      ...prev,
      model: { ...prev.model, ...updates },
    }));
    setUnsavedChanges(true);
  };

  const updateVoiceConfig = (updates: Partial<AgentConfiguration['voice']>) => {
    setConfig(prev => ({
      ...prev,
      voice: { ...prev.voice, ...updates },
    }));
    setUnsavedChanges(true);
  };

  const updateLanguageConfig = (updates: Partial<AgentConfiguration['language']>) => {
    setConfig(prev => ({
      ...prev,
      language: { ...prev.language, ...updates },
    }));
    setUnsavedChanges(true);
  };

  const updatePersonalityConfig = (updates: Partial<AgentConfiguration['personality']>) => {
    setConfig(prev => ({
      ...prev,
      personality: { ...prev.personality, ...updates },
    }));
    setUnsavedChanges(true);
  };

  const updateTrainingConfig = (updates: Partial<AgentConfiguration['training']>) => {
    setConfig(prev => ({
      ...prev,
      training: { ...prev.training, ...updates },
    }));
    setUnsavedChanges(true);
  };

  const updateDataUploadConfig = (updates: Partial<AgentConfiguration['dataUpload']>) => {
    setConfig(prev => ({
      ...prev,
      dataUpload: { ...prev.dataUpload, ...updates },
    }));
    setUnsavedChanges(true);
  };

  const resetToDefaults = () => {
    Alert.alert(
      'Reset Configuration',
      'Are you sure you want to reset to default configuration?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Reset',
          style: 'destructive',
          onPress: () => {
            if (agent) {
              const defaultConfig = createAgentConfiguration(agent.category as AgentCategory);
              setConfig(defaultConfig);
              setUnsavedChanges(true);
            }
          },
        },
      ]
    );
  };

  const applyCategoryPreset = () => {
    Alert.alert(
      'Apply Category Preset',
      `Apply ${agent?.category} preset configuration?`,
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Apply',
          onPress: () => {
            if (agent) {
              const preset = agentConfigurationPresets[agent.category as AgentCategory];
              setConfig(prev => ({
                ...prev,
                ...preset,
                model: { ...prev.model, ...preset.model },
                voice: { ...prev.voice, ...preset.voice },
                personality: { ...prev.personality, ...preset.personality },
                language: { ...prev.language, ...preset.language },
              }));
              setUnsavedChanges(true);
            }
          },
        },
      ]
    );
  };

  if (loading) {
    return (
      <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={colors.primary} />
          <Text style={[styles.loadingText, { color: colors.text }]}>Loading agent configuration...</Text>
        </View>
      </SafeAreaView>
    );
  }

  if (!agent) {
    return (
      <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
        <View style={styles.errorContainer}>
          <AlertTriangle size={48} color={colors.error} />
          <Text style={[styles.errorText, { color: colors.text }]}>Agent not found</Text>
          <TouchableOpacity style={[styles.button, { backgroundColor: colors.primary }]} onPress={() => router.back()}>
            <Text style={styles.buttonText}>Go Back</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  const sections: { id: ConfigSection; label: string; icon: React.ReactNode }[] = [
    { id: 'model', label: 'AI Model', icon: <Brain size={20} color={activeSection === 'model' ? '#fff' : colors.text} /> },
    { id: 'voice', label: 'Voice', icon: <Mic size={20} color={activeSection === 'voice' ? '#fff' : colors.text} /> },
    { id: 'language', label: 'Language', icon: <Globe size={20} color={activeSection === 'language' ? '#fff' : colors.text} /> },
    { id: 'personality', label: 'Personality', icon: <User size={20} color={activeSection === 'personality' ? '#fff' : colors.text} /> },
    { id: 'training', label: 'Training', icon: <GraduationCap size={20} color={activeSection === 'training' ? '#fff' : colors.text} /> },
    { id: 'data', label: 'Data Upload', icon: <Upload size={20} color={activeSection === 'data' ? '#fff' : colors.text} /> },
    { id: 'advanced', label: 'Advanced', icon: <Settings size={20} color={activeSection === 'advanced' ? '#fff' : colors.text} /> },
    { id: 'security', label: 'Security', icon: <Shield size={20} color={activeSection === 'security' ? '#fff' : colors.text} /> },
  ];

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      {/* Header */}
      <View style={[styles.header, { backgroundColor: colors.card, borderBottomColor: colors.border }]}>
        <View style={styles.headerTop}>
          <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
            <ChevronLeft size={24} color={colors.text} />
          </TouchableOpacity>
          <View style={styles.headerTitleContainer}>
            <Bot size={24} color={colors.primary} />
            <Text style={[styles.headerTitle, { color: colors.text }]}>Agent Configuration</Text>
          </View>
          <TouchableOpacity
            onPress={handleSave}
            disabled={!unsavedChanges || saving}
            style={[
              styles.saveButton,
              { backgroundColor: unsavedChanges ? colors.primary : colors.border },
            ]}
          >
            {saving ? (
              <ActivityIndicator size="small" color="#fff" />
            ) : (
              <Save size={20} color="#fff" />
            )}
          </TouchableOpacity>
        </View>

        {/* Agent Info Card */}
        <Animated.View entering={FadeInUp.delay(100)} style={[styles.agentCard, { backgroundColor: agent.color + '15' }]}>
          <View style={[styles.agentIconContainer, { backgroundColor: agent.color }]}>
            <Bot size={32} color="#fff" />
          </View>
          <View style={styles.agentInfo}>
            <Text style={[styles.agentName, { color: colors.text }]}>{agent.name}</Text>
            <Text style={[styles.agentCategory, { color: colors.text + '99' }]}>{agent.parentCategory}</Text>
            {unsavedChanges && (
              <View style={styles.unsavedBadge}>
                <Text style={styles.unsavedText}>Unsaved Changes</Text>
              </View>
            )}
          </View>
        </Animated.View>

        {/* Quick Actions */}
        <View style={styles.quickActions}>
          <TouchableOpacity onPress={applyCategoryPreset} style={[styles.quickAction, { backgroundColor: colors.primary + '15' }]}>
            <Zap size={16} color={colors.primary} />
            <Text style={[styles.quickActionText, { color: colors.primary }]}>Apply Preset</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={resetToDefaults} style={[styles.quickAction, { backgroundColor: colors.error + '15' }]}>
            <Clock size={16} color={colors.error} />
            <Text style={[styles.quickActionText, { color: colors.error }]}>Reset</Text>
          </TouchableOpacity>
        </View>

        {/* Section Tabs */}
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.sectionTabs}>
          {sections.map((section, index) => (
            <TouchableOpacity
              key={section.id}
              onPress={() => setActiveSection(section.id)}
              style={[
                styles.sectionTab,
                {
                  backgroundColor: activeSection === section.id ? colors.primary : colors.border + '40',
                  marginLeft: index === 0 ? 16 : 8,
                  marginRight: index === sections.length - 1 ? 16 : 0,
                },
              ]}
            >
              {section.icon}
              <Text
                style={[
                  styles.sectionTabText,
                  { color: activeSection === section.id ? '#fff' : colors.text },
                ]}
              >
                {section.label}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      {/* Configuration Content */}
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <Animated.View entering={FadeInUp.delay(200)}>
          {activeSection === 'model' && (
            <ModelConfiguration
              config={config}
              updateModelConfig={updateModelConfig}
              showModelPicker={showModelPicker}
              setShowModelPicker={setShowModelPicker}
              colors={colors}
            />
          )}

          {activeSection === 'voice' && (
            <VoiceConfiguration
              config={config}
              updateVoiceConfig={updateVoiceConfig}
              colors={colors}
            />
          )}

          {activeSection === 'language' && (
            <LanguageConfiguration
              config={config}
              updateLanguageConfig={updateLanguageConfig}
              showLanguagePicker={showLanguagePicker}
              setShowLanguagePicker={setShowLanguagePicker}
              colors={colors}
            />
          )}

          {activeSection === 'personality' && (
            <PersonalityConfiguration
              config={config}
              updatePersonalityConfig={updatePersonalityConfig}
              colors={colors}
            />
          )}

          {activeSection === 'training' && (
            <TrainingConfiguration
              config={config}
              updateTrainingConfig={updateTrainingConfig}
              colors={colors}
            />
          )}

          {activeSection === 'data' && (
            <DataUploadConfiguration
              config={config}
              updateDataUploadConfig={updateDataUploadConfig}
              colors={colors}
            />
          )}

          {activeSection === 'advanced' && (
            <AdvancedConfiguration
              config={config}
              updateConfig={updateConfig}
              colors={colors}
            />
          )}

          {activeSection === 'security' && (
            <SecurityConfiguration
              config={config}
              updateConfig={updateConfig}
              colors={colors}
            />
          )}
        </Animated.View>

        <View style={styles.bottomPadding} />
      </ScrollView>
    </SafeAreaView>
  );
}

// Sub-components for each configuration section

function ModelConfiguration({
  config,
  updateModelConfig,
  showModelPicker,
  setShowModelPicker,
  colors,
}: {
  config: AgentConfiguration;
  updateModelConfig: (updates: Partial<AgentConfiguration['model']>) => void;
  showModelPicker: boolean;
  setShowModelPicker: (show: boolean) => void;
  colors: any;
}) {
  const selectedModel = modelOptions.find(m => m.value === config.model.primary);

  return (
    <View style={styles.section}>
      <Text style={[styles.sectionTitle, { color: colors.text }]}>AI Model Settings</Text>

      {/* Primary Model */}
      <View style={styles.configCard}>
        <Text style={[styles.configLabel, { color: colors.text }]}>Primary Model</Text>
        <TouchableOpacity
          style={[styles.dropdown, { backgroundColor: colors.border + '30', borderColor: colors.border }]}
          onPress={() => setShowModelPicker(true)}
        >
          <View style={styles.dropdownContent}>
            <Text style={[styles.dropdownText, { color: colors.text }]}>
              {selectedModel?.label || 'Select Model'}
            </Text>
            <Text style={[styles.dropdownDescription, { color: colors.text + '80' }]}>
              {selectedModel?.description}
            </Text>
          </View>
          <ChevronDown size={20} color={colors.text} />
        </TouchableOpacity>

        {/* Cost Badge */}
        {selectedModel && (
          <View style={[styles.costBadge, { backgroundColor: colors.primary + '15' }]}>
            <BarChart3 size={14} color={colors.primary} />
            <Text style={[styles.costText, { color: colors.primary }]}>
              Cost: {selectedModel.cost}
            </Text>
          </View>
        )}
      </View>

      {/* Fallback Model */}
      <View style={styles.configCard}>
        <Text style={[styles.configLabel, { color: colors.text }]}>Fallback Model</Text>
        <Text style={[styles.configDescription, { color: colors.text + '60' }]}>
          Used when primary model is unavailable
        </Text>
        <View style={styles.switchRow}>
          <Switch
            value={!!config.model.fallback}
            onValueChange={(enabled) =>
              updateModelConfig({ fallback: enabled ? 'gpt-4o-mini' : undefined })
            }
          />
          <Text style={[styles.switchLabel, { color: colors.text }]}>
            {config.model.fallback ? config.model.fallback : 'Disabled'}
          </Text>
        </View>
      </View>

      {/* Temperature */}
      <ConfigSlider
        label="Temperature (Creativity)"
        value={config.model.temperature}
        min={0}
        max={2}
        step={0.1}
        onValueChange={(value) => updateModelConfig({ temperature: value })}
        description="Lower = more focused, Higher = more creative"
        colors={colors}
      />

      {/* Max Tokens */}
      <ConfigSlider
        label="Max Response Length"
        value={config.model.maxTokens}
        min={256}
        max={8192}
        step={256}
        onValueChange={(value) => updateModelConfig({ maxTokens: value })}
        description="Maximum tokens in response"
        formatValue={(v) => `${v} tokens`}
        colors={colors}
      />

      {/* Reasoning Level */}
      <View style={styles.configCard}>
        <Text style={[styles.configLabel, { color: colors.text }]}>Reasoning Level</Text>
        <View style={styles.buttonGroup}>
          {(['none', 'low', 'medium', 'high'] as const).map((level) => (
            <TouchableOpacity
              key={level}
              style={[
                styles.buttonGroupItem,
                {
                  backgroundColor: config.model.reasoning === level ? colors.primary : colors.border + '30',
                },
              ]}
              onPress={() => updateModelConfig({ reasoning: level })}
            >
              <Text
                style={[
                  styles.buttonGroupText,
                  { color: config.model.reasoning === level ? '#fff' : colors.text },
                ]}
              >
                {level.charAt(0).toUpperCase() + level.slice(1)}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* Model Picker Modal */}
      <Modal visible={showModelPicker} animationType="slide" transparent>
        <View style={styles.modalOverlay}>
          <BlurView intensity={50} style={styles.modalContent}>
            <View style={[styles.modalHeader, { backgroundColor: colors.card }]}>
              <Text style={[styles.modalTitle, { color: colors.text }]}>Select AI Model</Text>
              <TouchableOpacity onPress={() => setShowModelPicker(false)}>
                <X size={24} color={colors.text} />
              </TouchableOpacity>
            </View>
            <FlatList
              data={modelOptions}
              keyExtractor={(item) => item.value}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={[
                    styles.modelOption,
                    {
                      backgroundColor: config.model.primary === item.value ? colors.primary + '20' : 'transparent',
                      borderColor: config.model.primary === item.value ? colors.primary : colors.border,
                    },
                  ]}
                  onPress={() => {
                    updateModelConfig({ primary: item.value });
                    setShowModelPicker(false);
                  }}
                >
                  <View style={styles.modelOptionContent}>
                    <View style={styles.modelOptionHeader}>
                      <Text style={[styles.modelOptionLabel, { color: colors.text }]}>
                        {item.label}
                      </Text>
                      <View style={[styles.costTag, { backgroundColor: colors.primary + '15' }]}>
                        <Text style={[styles.costTagText, { color: colors.primary }]}>{item.cost}</Text>
                      </View>
                    </View>
                    <Text style={[styles.modelOptionDescription, { color: colors.text + '80' }]}>
                      {item.description}
                    </Text>
                  </View>
                  {config.model.primary === item.value && (
                    <Check size={20} color={colors.primary} />
                  )}
                </TouchableOpacity>
              )}
            />
          </BlurView>
        </View>
      </Modal>
    </View>
  );
}

function VoiceConfiguration({
  config,
  updateVoiceConfig,
  colors,
}: {
  config: AgentConfiguration;
  updateVoiceConfig: (updates: Partial<AgentConfiguration['voice']>) => void;
  colors: any;
}) {
  return (
    <View style={styles.section}>
      <Text style={[styles.sectionTitle, { color: colors.text }]}>Voice Settings</Text>

      {/* Enable Voice */}
      <View style={styles.configCard}>
        <View style={styles.switchRow}>
          <View style={styles.switchInfo}>
            <Text style={[styles.configLabel, { color: colors.text }]}>Enable Voice</Text>
            <Text style={[styles.configDescription, { color: colors.text + '60' }]}>
              Allow agent to speak responses
            </Text>
          </View>
          <Switch
            value={config.voice.enabled}
            onValueChange={(enabled) => updateVoiceConfig({ enabled })}
          />
        </View>
      </View>

      {config.voice.enabled && (
        <>
          {/* Gender */}
          <View style={styles.configCard}>
            <Text style={[styles.configLabel, { color: colors.text }]}>Voice Gender</Text>
            <View style={styles.buttonGroup}>
              {voiceGenderOptions.map((option) => (
                <TouchableOpacity
                  key={option.value}
                  style={[
                    styles.buttonGroupItem,
                    {
                      backgroundColor: config.voice.gender === option.value ? colors.primary : colors.border + '30',
                    },
                  ]}
                  onPress={() => updateVoiceConfig({ gender: option.value })}
                >
                  <Text
                    style={[
                      styles.buttonGroupText,
                      { color: config.voice.gender === option.value ? '#fff' : colors.text },
                    ]}
                  >
                    {option.label}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          {/* Style */}
          <View style={styles.configCard}>
            <Text style={[styles.configLabel, { color: colors.text }]}>Voice Style</Text>
            <View style={styles.optionsGrid}>
              {voiceStyleOptions.map((option) => (
                <TouchableOpacity
                  key={option.value}
                  style={[
                    styles.optionChip,
                    {
                      backgroundColor: config.voice.style === option.value ? colors.primary : colors.border + '30',
                      borderColor: config.voice.style === option.value ? colors.primary : colors.border,
                    },
                  ]}
                  onPress={() => updateVoiceConfig({ style: option.value })}
                >
                  <Text
                    style={[
                      styles.optionChipText,
                      { color: config.voice.style === option.value ? '#fff' : colors.text },
                    ]}
                  >
                    {option.label}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          {/* Speed */}
          <View style={styles.configCard}>
            <Text style={[styles.configLabel, { color: colors.text }]}>Speech Speed</Text>
            <View style={styles.buttonGroup}>
              {voiceSpeedOptions.map((option) => (
                <TouchableOpacity
                  key={option.value}
                  style={[
                    styles.buttonGroupItem,
                    {
                      backgroundColor: config.voice.speed === option.value ? colors.primary : colors.border + '30',
                    },
                  ]}
                  onPress={() => updateVoiceConfig({ speed: option.value })}
                >
                  <Text
                    style={[
                      styles.buttonGroupText,
                      { color: config.voice.speed === option.value ? '#fff' : colors.text },
                    ]}
                  >
                    {option.label}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          {/* Tone */}
          <View style={styles.configCard}>
            <Text style={[styles.configLabel, { color: colors.text }]}>Voice Tone</Text>
            <View style={styles.optionsGrid}>
              {voiceToneOptions.map((option) => (
                <TouchableOpacity
                  key={option.value}
                  style={[
                    styles.optionChip,
                    {
                      backgroundColor: config.voice.tone === option.value ? colors.primary : colors.border + '30',
                      borderColor: config.voice.tone === option.value ? colors.primary : colors.border,
                    },
                  ]}
                  onPress={() => updateVoiceConfig({ tone: option.value })}
                >
                  <Text
                    style={[
                      styles.optionChipText,
                      { color: config.voice.tone === option.value ? '#fff' : colors.text },
                    ]}
                  >
                    {option.label}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          {/* Pitch Slider */}
          <ConfigSlider
            label="Pitch"
            value={config.voice.pitch || 1.0}
            min={0.5}
            max={2.0}
            step={0.1}
            onValueChange={(value) => updateVoiceConfig({ pitch: value })}
            description="Voice pitch adjustment"
            colors={colors}
          />

          {/* Volume Slider */}
          <ConfigSlider
            label="Volume"
            value={config.voice.volume || 1.0}
            min={0.1}
            max={1.0}
            step={0.1}
            onValueChange={(value) => updateVoiceConfig({ volume: value })}
            description="Voice volume level"
            colors={colors}
          />
        </>
      )}
    </View>
  );
}

function LanguageConfiguration({
  config,
  updateLanguageConfig,
  showLanguagePicker,
  setShowLanguagePicker,
  colors,
}: {
  config: AgentConfiguration;
  updateLanguageConfig: (updates: Partial<AgentConfiguration['language']>) => void;
  showLanguagePicker: boolean;
  setShowLanguagePicker: (show: boolean) => void;
  colors: any;
}) {
  const primaryLang = languageOptions.find(l => l.value === config.language.primary);

  return (
    <View style={styles.section}>
      <Text style={[styles.sectionTitle, { color: colors.text }]}>Language Settings</Text>

      {/* Primary Language */}
      <View style={styles.configCard}>
        <Text style={[styles.configLabel, { color: colors.text }]}>Primary Language</Text>
        <TouchableOpacity
          style={[styles.dropdown, { backgroundColor: colors.border + '30', borderColor: colors.border }]}
          onPress={() => setShowLanguagePicker(true)}
        >
          <View style={styles.languageOption}>
            <Text style={styles.flag}>{primaryLang?.flag}</Text>
            <Text style={[styles.dropdownText, { color: colors.text }]}>
              {primaryLang?.label}
            </Text>
          </View>
          <ChevronDown size={20} color={colors.text} />
        </TouchableOpacity>
      </View>

      {/* Auto Detect */}
      <View style={styles.configCard}>
        <View style={styles.switchRow}>
          <View style={styles.switchInfo}>
            <Text style={[styles.configLabel, { color: colors.text }]}>Auto-detect Language</Text>
            <Text style={[styles.configDescription, { color: colors.text + '60' }]}>
              Automatically detect user&apos;s language
            </Text>
          </View>
          <Switch
            value={config.language.autoDetect}
            onValueChange={(enabled) => updateLanguageConfig({ autoDetect: enabled })}
          />
        </View>
      </View>

      {/* Translation */}
      <View style={styles.configCard}>
        <View style={styles.switchRow}>
          <View style={styles.switchInfo}>
            <Text style={[styles.configLabel, { color: colors.text }]}>Translation Enabled</Text>
            <Text style={[styles.configDescription, { color: colors.text + '60' }]}>
              Translate responses to user&apos;s language
            </Text>
          </View>
          <Switch
            value={config.language.translationEnabled}
            onValueChange={(enabled) => updateLanguageConfig({ translationEnabled: enabled })}
          />
        </View>
      </View>

      {/* Cultural Adaptation */}
      <View style={styles.configCard}>
        <View style={styles.switchRow}>
          <View style={styles.switchInfo}>
            <Text style={[styles.configLabel, { color: colors.text }]}>Cultural Adaptation</Text>
            <Text style={[styles.configDescription, { color: colors.text + '60' }]}>
              Adapt responses to cultural context
            </Text>
          </View>
          <Switch
            value={config.language.culturalAdaptation}
            onValueChange={(enabled) => updateLanguageConfig({ culturalAdaptation: enabled })}
          />
        </View>
      </View>

      {/* Formality Level */}
      <View style={styles.configCard}>
        <Text style={[styles.configLabel, { color: colors.text }]}>Formality Level</Text>
        <View style={styles.buttonGroup}>
          {(['casual', 'neutral', 'formal'] as const).map((level) => (
            <TouchableOpacity
              key={level}
              style={[
                styles.buttonGroupItem,
                {
                  backgroundColor: config.language.formalityLevel === level ? colors.primary : colors.border + '30',
                },
              ]}
              onPress={() => updateLanguageConfig({ formalityLevel: level })}
            >
              <Text
                style={[
                  styles.buttonGroupText,
                  { color: config.language.formalityLevel === level ? '#fff' : colors.text },
                ]}
              >
                {level.charAt(0).toUpperCase() + level.slice(1)}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* Language Picker Modal */}
      <Modal visible={showLanguagePicker} animationType="slide" transparent>
        <View style={styles.modalOverlay}>
          <BlurView intensity={50} style={styles.modalContent}>
            <View style={[styles.modalHeader, { backgroundColor: colors.card }]}>
              <Text style={[styles.modalTitle, { color: colors.text }]}>Select Language</Text>
              <TouchableOpacity onPress={() => setShowLanguagePicker(false)}>
                <X size={24} color={colors.text} />
              </TouchableOpacity>
            </View>
            <FlatList
              data={languageOptions}
              keyExtractor={(item) => item.value}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={[
                    styles.languageListItem,
                    {
                      backgroundColor: config.language.primary === item.value ? colors.primary + '20' : 'transparent',
                    },
                  ]}
                  onPress={() => {
                    updateLanguageConfig({ primary: item.value });
                    setShowLanguagePicker(false);
                  }}
                >
                  <Text style={styles.flag}>{item.flag}</Text>
                  <Text style={[styles.languageListText, { color: colors.text }]}>{item.label}</Text>
                  {config.language.primary === item.value && (
                    <Check size={20} color={colors.primary} />
                  )}
                </TouchableOpacity>
              )}
            />
          </BlurView>
        </View>
      </Modal>
    </View>
  );
}

function PersonalityConfiguration({
  config,
  updatePersonalityConfig,
  colors,
}: {
  config: AgentConfiguration;
  updatePersonalityConfig: (updates: Partial<AgentConfiguration['personality']>) => void;
  colors: any;
}) {
  return (
    <View style={styles.section}>
      <Text style={[styles.sectionTitle, { color: colors.text }]}>Personality Settings</Text>

      {/* Age */}
      <View style={styles.configCard}>
        <Text style={[styles.configLabel, { color: colors.text }]}>Persona Age</Text>
        <View style={styles.buttonGroup}>
          {ageOptions.map((option) => (
            <TouchableOpacity
              key={option.value}
              style={[
                styles.buttonGroupItem,
                {
                  backgroundColor: config.personality.age === option.value ? colors.primary : colors.border + '30',
                },
              ]}
              onPress={() => updatePersonalityConfig({ age: option.value })}
            >
              <Text
                style={[
                  styles.buttonGroupText,
                  { color: config.personality.age === option.value ? '#fff' : colors.text },
                ]}
              >
                {option.label}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* Communication Style */}
      <View style={styles.configCard}>
        <Text style={[styles.configLabel, { color: colors.text }]}>Communication Style</Text>
        <View style={styles.optionsGrid}>
          {communicationStyles.map((style) => (
            <TouchableOpacity
              key={style}
              style={[
                styles.optionChip,
                {
                  backgroundColor: config.personality.communicationStyle === style ? colors.primary : colors.border + '30',
                  borderColor: config.personality.communicationStyle === style ? colors.primary : colors.border,
                },
              ]}
              onPress={() => updatePersonalityConfig({ communicationStyle: style })}
            >
              <Text
                style={[
                  styles.optionChipText,
                  { color: config.personality.communicationStyle === style ? '#fff' : colors.text },
                ]}
              >
                {style.charAt(0).toUpperCase() + style.slice(1)}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* Expertise Level */}
      <View style={styles.configCard}>
        <Text style={[styles.configLabel, { color: colors.text }]}>Expertise Level</Text>
        <View style={styles.buttonGroup}>
          {expertiseOptions.map((level) => (
            <TouchableOpacity
              key={level}
              style={[
                styles.buttonGroupItem,
                {
                  backgroundColor: config.personality.expertiseLevel === level ? colors.primary : colors.border + '30',
                },
              ]}
              onPress={() => updatePersonalityConfig({ expertiseLevel: level })}
            >
              <Text
                style={[
                  styles.buttonGroupText,
                  { color: config.personality.expertiseLevel === level ? '#fff' : colors.text },
                ]}
              >
                {level.charAt(0).toUpperCase() + level.slice(1)}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* Traits */}
      <View style={styles.configCard}>
        <Text style={[styles.configLabel, { color: colors.text }]}>Personality Traits</Text>
        <TextInput
          style={[styles.textInput, { backgroundColor: colors.border + '30', color: colors.text, borderColor: colors.border }]}
          value={config.personality.traits.join(', ')}
          onChangeText={(text) => updatePersonalityConfig({ traits: text.split(',').map(t => t.trim()).filter(Boolean) })}
          placeholder="Enter traits separated by commas"
          placeholderTextColor={colors.text + '40'}
          multiline
        />
        <Text style={[styles.helperText, { color: colors.text + '50' }]}>
          e.g., helpful, professional, creative, empathetic
        </Text>
      </View>

      {/* Sliders */}
      <ConfigSlider
        label="Creativity Level"
        value={config.personality.creativityLevel}
        min={0}
        max={1}
        step={0.1}
        onValueChange={(value) => updatePersonalityConfig({ creativityLevel: value })}
        colors={colors}
      />

      <ConfigSlider
        label="Enthusiasm Level"
        value={config.personality.enthusiasmLevel}
        min={0}
        max={1}
        step={0.1}
        onValueChange={(value) => updatePersonalityConfig({ enthusiasmLevel: value })}
        colors={colors}
      />

      <ConfigSlider
        label="Empathy Level"
        value={config.personality.empathyLevel}
        min={0}
        max={1}
        step={0.1}
        onValueChange={(value) => updatePersonalityConfig({ empathyLevel: value })}
        colors={colors}
      />

      {/* Custom Prompt */}
      <View style={styles.configCard}>
        <Text style={[styles.configLabel, { color: colors.text }]}>Custom Personality Prompt</Text>
        <Text style={[styles.configDescription, { color: colors.text + '60' }]}>
          Advanced: Override with custom instructions
        </Text>
        <TextInput
          style={[
            styles.textInput,
            styles.textArea,
            { backgroundColor: colors.border + '30', color: colors.text, borderColor: colors.border },
          ]}
          value={config.personality.customPersonalityPrompt || ''}
          onChangeText={(text) => updatePersonalityConfig({ customPersonalityPrompt: text })}
          placeholder="Enter custom personality instructions..."
          placeholderTextColor={colors.text + '40'}
          multiline
          numberOfLines={4}
        />
      </View>
    </View>
  );
}

function TrainingConfiguration({
  config,
  updateTrainingConfig,
  colors,
}: {
  config: AgentConfiguration;
  updateTrainingConfig: (updates: Partial<AgentConfiguration['training']>) => void;
  colors: any;
}) {
  return (
    <View style={styles.section}>
      <Text style={[styles.sectionTitle, { color: colors.text }]}>Training Settings</Text>

      {/* Enable Training */}
      <View style={styles.configCard}>
        <View style={styles.switchRow}>
          <View style={styles.switchInfo}>
            <Text style={[styles.configLabel, { color: colors.text }]}>Enable Training</Text>
            <Text style={[styles.configDescription, { color: colors.text + '60' }]}>
              Allow agent to learn from interactions
            </Text>
          </View>
          <Switch
            value={config.training.enabled}
            onValueChange={(enabled) => updateTrainingConfig({ enabled })}
          />
        </View>
      </View>

      {config.training.enabled && (
        <>
          {/* Auto Training */}
          <View style={styles.configCard}>
            <View style={styles.switchRow}>
              <View style={styles.switchInfo}>
                <Text style={[styles.configLabel, { color: colors.text }]}>Auto Training</Text>
                <Text style={[styles.configDescription, { color: colors.text + '60' }]}>
                  Automatically train on schedule
                </Text>
              </View>
              <Switch
                value={config.training.autoTraining}
                onValueChange={(enabled) => updateTrainingConfig({ autoTraining: enabled })}
              />
            </View>
          </View>

          {/* Training Schedule */}
          <View style={styles.configCard}>
            <Text style={[styles.configLabel, { color: colors.text }]}>Training Schedule</Text>
            <View style={styles.optionsList}>
              {trainingScheduleOptions.map((option) => (
                <TouchableOpacity
                  key={option.value}
                  style={[
                    styles.optionRow,
                    {
                      backgroundColor: config.training.trainingSchedule === option.value ? colors.primary + '15' : 'transparent',
                      borderColor: config.training.trainingSchedule === option.value ? colors.primary : colors.border,
                    },
                  ]}
                  onPress={() => updateTrainingConfig({ trainingSchedule: option.value })}
                >
                  <View>
                    <Text style={[styles.optionRowLabel, { color: colors.text }]}>{option.label}</Text>
                    <Text style={[styles.optionRowDescription, { color: colors.text + '60' }]}>
                      {option.description}
                    </Text>
                  </View>
                  {config.training.trainingSchedule === option.value && (
                    <Check size={20} color={colors.primary} />
                  )}
                </TouchableOpacity>
              ))}
            </View>
          </View>

          {/* Feedback Loop */}
          <View style={styles.configCard}>
            <View style={styles.switchRow}>
              <View style={styles.switchInfo}>
                <Text style={[styles.configLabel, { color: colors.text }]}>Feedback Loop</Text>
                <Text style={[styles.configDescription, { color: colors.text + '60' }]}>
                  Learn from user feedback and corrections
                </Text>
              </View>
              <Switch
                value={config.training.feedbackLoop}
                onValueChange={(enabled) => updateTrainingConfig({ feedbackLoop: enabled })}
              />
            </View>
          </View>

          {/* Learning Goals */}
          <View style={styles.configCard}>
            <Text style={[styles.configLabel, { color: colors.text }]}>Learning Goals</Text>
            <TextInput
              style={[styles.textInput, { backgroundColor: colors.border + '30', color: colors.text, borderColor: colors.border }]}
              value={config.training.learningGoals?.join('\n') || ''}
              onChangeText={(text) => updateTrainingConfig({ learningGoals: text.split('\n').filter(Boolean) })}
              placeholder="Enter learning goals (one per line)"
              placeholderTextColor={colors.text + '40'}
              multiline
              numberOfLines={3}
            />
          </View>
        </>
      )}
    </View>
  );
}

function DataUploadConfiguration({
  config,
  updateDataUploadConfig,
  colors,
}: {
  config: AgentConfiguration;
  updateDataUploadConfig: (updates: Partial<AgentConfiguration['dataUpload']>) => void;
  colors: any;
}) {
  const fileFormats = ['pdf', 'doc', 'docx', 'txt', 'csv', 'json', 'xlsx', 'ppt', 'pptx', 'md', 'html', 'xml'] as const;

  const toggleFormat = (format: typeof fileFormats[number]) => {
    const current = config.dataUpload.allowedFormats;
    const updated = current.includes(format)
      ? current.filter(f => f !== format)
      : [...current, format];
    updateDataUploadConfig({ allowedFormats: updated });
  };

  return (
    <View style={styles.section}>
      <Text style={[styles.sectionTitle, { color: colors.text }]}>Data Upload Settings</Text>

      {/* Enable Data Upload */}
      <View style={styles.configCard}>
        <View style={styles.switchRow}>
          <View style={styles.switchInfo}>
            <Text style={[styles.configLabel, { color: colors.text }]}>Enable Data Upload</Text>
            <Text style={[styles.configDescription, { color: colors.text + '60' }]}>
              Allow uploading documents for training
            </Text>
          </View>
          <Switch
            value={config.dataUpload.enabled}
            onValueChange={(enabled) => updateDataUploadConfig({ enabled })}
          />
        </View>
      </View>

      {config.dataUpload.enabled && (
        <>
          {/* Allowed Formats */}
          <View style={styles.configCard}>
            <Text style={[styles.configLabel, { color: colors.text }]}>Allowed File Formats</Text>
            <View style={styles.formatsGrid}>
              {fileFormats.map((format) => (
                <TouchableOpacity
                  key={format}
                  style={[
                    styles.formatChip,
                    {
                      backgroundColor: config.dataUpload.allowedFormats.includes(format) ? colors.primary : colors.border + '30',
                      borderColor: config.dataUpload.allowedFormats.includes(format) ? colors.primary : colors.border,
                    },
                  ]}
                  onPress={() => toggleFormat(format)}
                >
                  <FileText size={14} color={config.dataUpload.allowedFormats.includes(format) ? '#fff' : colors.text} />
                  <Text
                    style={[
                      styles.formatChipText,
                      { color: config.dataUpload.allowedFormats.includes(format) ? '#fff' : colors.text },
                    ]}
                  >
                    .{format}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          {/* Max File Size */}
          <ConfigSlider
            label="Max File Size"
            value={config.dataUpload.maxFileSize}
            min={1}
            max={100}
            step={1}
            onValueChange={(value) => updateDataUploadConfig({ maxFileSize: value })}
            formatValue={(v) => `${v} MB`}
            colors={colors}
          />

          {/* Max Storage */}
          <ConfigSlider
            label="Max Total Storage"
            value={config.dataUpload.maxTotalStorage}
            min={1}
            max={50}
            step={1}
            onValueChange={(value) => updateDataUploadConfig({ maxTotalStorage: value })}
            formatValue={(v) => `${v} GB`}
            colors={colors}
          />

          {/* Auto Processing */}
          <View style={styles.configCard}>
            <View style={styles.switchRow}>
              <View style={styles.switchInfo}>
                <Text style={[styles.configLabel, { color: colors.text }]}>Auto Processing</Text>
                <Text style={[styles.configDescription, { color: colors.text + '60' }]}>
                  Automatically process uploaded documents
                </Text>
              </View>
              <Switch
                value={config.dataUpload.autoProcessing}
                onValueChange={(enabled) => updateDataUploadConfig({ autoProcessing: enabled })}
              />
            </View>
          </View>

          {/* Processing Schedule */}
          {config.dataUpload.autoProcessing && (
            <View style={styles.configCard}>
              <Text style={[styles.configLabel, { color: colors.text }]}>Processing Schedule</Text>
              <View style={styles.optionsList}>
                {processingScheduleOptions.map((option) => (
                  <TouchableOpacity
                    key={option.value}
                    style={[
                      styles.optionRow,
                      {
                        backgroundColor: config.dataUpload.processingSchedule === option.value ? colors.primary + '15' : 'transparent',
                        borderColor: config.dataUpload.processingSchedule === option.value ? colors.primary : colors.border,
                      },
                    ]}
                    onPress={() => updateDataUploadConfig({ processingSchedule: option.value })}
                  >
                    <View>
                      <Text style={[styles.optionRowLabel, { color: colors.text }]}>{option.label}</Text>
                      <Text style={[styles.optionRowDescription, { color: colors.text + '60' }]}>
                        {option.description}
                      </Text>
                    </View>
                    {config.dataUpload.processingSchedule === option.value && (
                      <Check size={20} color={colors.primary} />
                    )}
                  </TouchableOpacity>
                ))}
              </View>
            </View>
          )}

          {/* Data Retention */}
          <ConfigSlider
            label="Data Retention Period"
            value={config.dataUpload.dataRetentionDays || 365}
            min={7}
            max={3650}
            step={7}
            onValueChange={(value) => updateDataUploadConfig({ dataRetentionDays: value })}
            formatValue={(v) => `${v} days`}
            colors={colors}
          />
        </>
      )}
    </View>
  );
}

function AdvancedConfiguration({
  config,
  updateConfig,
  colors,
}: {
  config: AgentConfiguration;
  updateConfig: (updates: Partial<AgentConfiguration>) => void;
  colors: any;
}) {
  return (
    <View style={styles.section}>
      <Text style={[styles.sectionTitle, { color: colors.text }]}>Advanced Settings</Text>

      {/* Memory */}
      <View style={styles.configCard}>
        <View style={styles.switchRow}>
          <View style={styles.switchInfo}>
            <Text style={[styles.configLabel, { color: colors.text }]}>Memory Enabled</Text>
            <Text style={[styles.configDescription, { color: colors.text + '60' }]}>
              Remember past conversations
            </Text>
          </View>
          <Switch
            value={config.memoryEnabled}
            onValueChange={(enabled) => updateConfig({ memoryEnabled: enabled })}
          />
        </View>
      </View>

      {config.memoryEnabled && (
        <View style={styles.configCard}>
          <Text style={[styles.configLabel, { color: colors.text }]}>Memory Depth</Text>
          <View style={styles.buttonGroup}>
            {(['short', 'medium', 'long', 'infinite'] as const).map((depth) => (
              <TouchableOpacity
                key={depth}
                style={[
                  styles.buttonGroupItem,
                  {
                    backgroundColor: config.memoryDepth === depth ? colors.primary : colors.border + '30',
                  },
                ]}
                onPress={() => updateConfig({ memoryDepth: depth })}
              >
                <Text
                  style={[
                    styles.buttonGroupText,
                    { color: config.memoryDepth === depth ? '#fff' : colors.text },
                  ]}
                >
                  {depth.charAt(0).toUpperCase() + depth.slice(1)}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      )}

      {/* Context Awareness */}
      <View style={styles.configCard}>
        <View style={styles.switchRow}>
          <View style={styles.switchInfo}>
            <Text style={[styles.configLabel, { color: colors.text }]}>Context Awareness</Text>
            <Text style={[styles.configDescription, { color: colors.text + '60' }]}>
              Understand conversation context
            </Text>
          </View>
          <Switch
            value={config.contextAwareness}
            onValueChange={(enabled) => updateConfig({ contextAwareness: enabled })}
          />
        </View>
      </View>

      {/* Emotion Recognition */}
      <View style={styles.configCard}>
        <View style={styles.switchRow}>
          <View style={styles.switchInfo}>
            <Text style={[styles.configLabel, { color: colors.text }]}>Emotion Recognition</Text>
            <Text style={[styles.configDescription, { color: colors.text + '60' }]}>
              Detect and respond to emotions
            </Text>
          </View>
          <Switch
            value={config.emotionRecognition}
            onValueChange={(enabled) => updateConfig({ emotionRecognition: enabled })}
          />
        </View>
      </View>

      {/* Multi-modal */}
      <View style={styles.configCard}>
        <View style={styles.switchRow}>
          <View style={styles.switchInfo}>
            <Text style={[styles.configLabel, { color: colors.text }]}>Multi-modal Input</Text>
            <Text style={[styles.configDescription, { color: colors.text + '60' }]}>
              Support text, voice, image, video
            </Text>
          </View>
          <Switch
            value={config.multiModal}
            onValueChange={(enabled) => updateConfig({ multiModal: enabled })}
          />
        </View>
      </View>

      {/* Proactivity */}
      <ConfigSlider
        label="Proactivity Level"
        value={config.proactivity}
        min={0}
        max={1}
        step={0.1}
        onValueChange={(value) => updateConfig({ proactivity: value })}
        description="How often agent takes initiative"
        colors={colors}
      />

      {/* Autonomy */}
      <ConfigSlider
        label="Autonomy Level"
        value={config.autonomy}
        min={0}
        max={1}
        step={0.1}
        onValueChange={(value) => updateConfig({ autonomy: value })}
        description="Level of independent decision making"
        colors={colors}
      />

      {/* Response Length */}
      <View style={styles.configCard}>
        <Text style={[styles.configLabel, { color: colors.text }]}>Response Length</Text>
        <View style={styles.optionsList}>
          {responseLengthOptions.map((option) => (
            <TouchableOpacity
              key={option.value}
              style={[
                styles.optionRow,
                {
                  backgroundColor: config.responseLength === option.value ? colors.primary + '15' : 'transparent',
                  borderColor: config.responseLength === option.value ? colors.primary : colors.border,
                },
              ]}
              onPress={() => updateConfig({ responseLength: option.value })}
            >
              <View>
                <Text style={[styles.optionRowLabel, { color: colors.text }]}>{option.label}</Text>
                <Text style={[styles.optionRowDescription, { color: colors.text + '60' }]}>
                  {option.description}
                </Text>
              </View>
              {config.responseLength === option.value && (
                <Check size={20} color={colors.primary} />
              )}
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* Use Emojis */}
      <View style={styles.configCard}>
        <View style={styles.switchRow}>
          <View style={styles.switchInfo}>
            <Text style={[styles.configLabel, { color: colors.text }]}>Use Emojis</Text>
          </View>
          <Switch
            value={config.useEmojis}
            onValueChange={(enabled) => updateConfig({ useEmojis: enabled })}
          />
        </View>
      </View>

      {/* Time Zone */}
      <View style={styles.configCard}>
        <Text style={[styles.configLabel, { color: colors.text }]}>Time Zone</Text>
        <TextInput
          style={[styles.textInput, { backgroundColor: colors.border + '30', color: colors.text, borderColor: colors.border }]}
          value={config.timeZone}
          onChangeText={(text) => updateConfig({ timeZone: text })}
          placeholder="e.g., UTC, America/New_York, Europe/London"
          placeholderTextColor={colors.text + '40'}
        />
      </View>
    </View>
  );
}

function SecurityConfiguration({
  config,
  updateConfig,
  colors,
}: {
  config: AgentConfiguration;
  updateConfig: (updates: Partial<AgentConfiguration>) => void;
  colors: any;
}) {
  return (
    <View style={styles.section}>
      <Text style={[styles.sectionTitle, { color: colors.text }]}>Security & Privacy</Text>

      {/* Data Privacy Level */}
      <View style={styles.configCard}>
        <Text style={[styles.configLabel, { color: colors.text }]}>Data Privacy Level</Text>
        <View style={styles.optionsList}>
          {privacyLevels.map((option) => (
            <TouchableOpacity
              key={option.value}
              style={[
                styles.optionRow,
                {
                  backgroundColor: config.dataPrivacyLevel === option.value ? colors.primary + '15' : 'transparent',
                  borderColor: config.dataPrivacyLevel === option.value ? colors.primary : colors.border,
                },
              ]}
              onPress={() => updateConfig({ dataPrivacyLevel: option.value })}
            >
              <View style={styles.optionRowIcon}>
                <Shield size={20} color={config.dataPrivacyLevel === option.value ? colors.primary : colors.text} />
                <View>
                  <Text style={[styles.optionRowLabel, { color: colors.text }]}>{option.label}</Text>
                  <Text style={[styles.optionRowDescription, { color: colors.text + '60' }]}>
                    {option.description}
                  </Text>
                </View>
              </View>
              {config.dataPrivacyLevel === option.value && (
                <Check size={20} color={colors.primary} />
              )}
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* PII Handling */}
      <View style={styles.configCard}>
        <Text style={[styles.configLabel, { color: colors.text }]}>PII Handling</Text>
        <Text style={[styles.configDescription, { color: colors.text + '60' }]}>
          How to handle personally identifiable information
        </Text>
        <View style={styles.optionsList}>
          {piiHandlingOptions.map((option) => (
            <TouchableOpacity
              key={option.value}
              style={[
                styles.optionRow,
                {
                  backgroundColor: config.piiHandling === option.value ? colors.primary + '15' : 'transparent',
                  borderColor: config.piiHandling === option.value ? colors.primary : colors.border,
                },
              ]}
              onPress={() => updateConfig({ piiHandling: option.value })}
            >
              <View style={styles.optionRowIcon}>
                <Lock size={20} color={config.piiHandling === option.value ? colors.primary : colors.text} />
                <View>
                  <Text style={[styles.optionRowLabel, { color: colors.text }]}>{option.label}</Text>
                  <Text style={[styles.optionRowDescription, { color: colors.text + '60' }]}>
                    {option.description}
                  </Text>
                </View>
              </View>
              {config.piiHandling === option.value && (
                <Check size={20} color={colors.primary} />
              )}
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* Audit Logging */}
      <View style={styles.configCard}>
        <View style={styles.switchRow}>
          <View style={styles.switchInfo}>
            <Text style={[styles.configLabel, { color: colors.text }]}>Audit Logging</Text>
            <Text style={[styles.configDescription, { color: colors.text + '60' }]}>
              Log all agent activities for compliance
            </Text>
          </View>
          <Switch
            value={config.auditLogging}
            onValueChange={(enabled) => updateConfig({ auditLogging: enabled })}
          />
        </View>
      </View>

      {/* API Access */}
      <View style={styles.configCard}>
        <View style={styles.switchRow}>
          <View style={styles.switchInfo}>
            <Text style={[styles.configLabel, { color: colors.text }]}>API Access</Text>
            <Text style={[styles.configDescription, { color: colors.text + '60' }]}>
              Allow external API calls
            </Text>
          </View>
          <Switch
            value={config.apiAccess}
            onValueChange={(enabled) => updateConfig({ apiAccess: enabled })}
          />
        </View>
      </View>

      {/* Webhook URL */}
      {config.apiAccess && (
        <View style={styles.configCard}>
          <Text style={[styles.configLabel, { color: colors.text }]}>Webhook URL</Text>
          <Text style={[styles.configDescription, { color: colors.text + '60' }]}>
            URL for real-time notifications
          </Text>
          <TextInput
            style={[styles.textInput, { backgroundColor: colors.border + '30', color: colors.text, borderColor: colors.border }]}
            value={config.webhookUrl || ''}
            onChangeText={(text) => updateConfig({ webhookUrl: text })}
            placeholder="https://your-webhook-url.com"
            placeholderTextColor={colors.text + '40'}
            autoCapitalize="none"
            keyboardType="url"
          />
        </View>
      )}
    </View>
  );
}

// Helper Components

function ConfigSlider({
  label,
  value,
  min,
  max,
  step,
  onValueChange,
  description,
  formatValue,
  colors,
}: {
  label: string;
  value: number;
  min: number;
  max: number;
  step: number;
  onValueChange: (value: number) => void;
  description?: string;
  formatValue?: (value: number) => string;
  colors: any;
}) {
  const [localValue, setLocalValue] = useState(value);

  return (
    <View style={styles.configCard}>
      <View style={styles.sliderHeader}>
        <Text style={[styles.configLabel, { color: colors.text }]}>{label}</Text>
        <Text style={[styles.sliderValue, { color: colors.primary }]}>
          {formatValue ? formatValue(localValue) : localValue.toFixed(1)}
        </Text>
      </View>
      {description && (
        <Text style={[styles.configDescription, { color: colors.text + '60' }]}>{description}</Text>
      )}
      <View style={styles.sliderContainer}>
        <Text style={[styles.sliderLabel, { color: colors.text + '60' }]}>{formatValue ? formatValue(min) : min}</Text>
        <View style={styles.sliderTrack}>
          <View
            style={[
              styles.sliderFill,
              {
                backgroundColor: colors.primary,
                width: `${((localValue - min) / (max - min)) * 100}%`,
              },
            ]}
          />
          <View style={styles.sliderSteps}>
            {Array.from({ length: Math.floor((max - min) / step) + 1 }, (_, i) => (
              <TouchableOpacity
                key={i}
                style={styles.sliderStep}
                onPress={() => {
                  const newValue = min + i * step;
                  setLocalValue(newValue);
                  onValueChange(newValue);
                }}
              />
            ))}
          </View>
        </View>
        <Text style={[styles.sliderLabel, { color: colors.text + '60' }]}>{formatValue ? formatValue(max) : max}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 16,
    fontSize: 16,
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 32,
  },
  errorText: {
    fontSize: 18,
    marginTop: 16,
    marginBottom: 24,
  },
  button: {
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  header: {
    borderBottomWidth: 1,
  },
  headerTop: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  backButton: {
    padding: 8,
  },
  headerTitleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
  },
  saveButton: {
    padding: 10,
    borderRadius: 8,
  },
  agentCard: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 16,
    marginTop: 8,
    padding: 16,
    borderRadius: 12,
  },
  agentIconContainer: {
    width: 56,
    height: 56,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  agentInfo: {
    marginLeft: 16,
    flex: 1,
  },
  agentName: {
    fontSize: 18,
    fontWeight: '600',
  },
  agentCategory: {
    fontSize: 14,
    marginTop: 2,
  },
  unsavedBadge: {
    marginTop: 6,
    backgroundColor: '#FF950020',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 4,
    alignSelf: 'flex-start',
  },
  unsavedText: {
    fontSize: 12,
    color: '#FF9500',
    fontWeight: '500',
  },
  quickActions: {
    flexDirection: 'row',
    marginHorizontal: 16,
    marginTop: 12,
    gap: 8,
  },
  quickAction: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
  },
  quickActionText: {
    fontSize: 13,
    fontWeight: '500',
  },
  sectionTabs: {
    marginTop: 16,
    marginBottom: 12,
  },
  sectionTab: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 20,
  },
  sectionTabText: {
    fontSize: 14,
    fontWeight: '500',
  },
  content: {
    flex: 1,
  },
  section: {
    padding: 16,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: '700',
    marginBottom: 16,
  },
  configCard: {
    marginBottom: 12,
    padding: 16,
    borderRadius: 12,
    backgroundColor: 'transparent',
  },
  configLabel: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
  },
  configDescription: {
    fontSize: 13,
    marginBottom: 12,
  },
  dropdown: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 12,
    borderRadius: 8,
    borderWidth: 1,
  },
  dropdownContent: {
    flex: 1,
  },
  dropdownText: {
    fontSize: 16,
    fontWeight: '500',
  },
  dropdownDescription: {
    fontSize: 13,
    marginTop: 2,
  },
  switchRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  switchInfo: {
    flex: 1,
    paddingRight: 16,
  },
  switchLabel: {
    fontSize: 14,
    marginLeft: 8,
  },
  buttonGroup: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginTop: 8,
  },
  buttonGroupItem: {
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 8,
  },
  buttonGroupText: {
    fontSize: 14,
    fontWeight: '500',
  },
  optionsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginTop: 8,
  },
  optionChip: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    borderWidth: 1,
  },
  optionChipText: {
    fontSize: 13,
    fontWeight: '500',
  },
  optionsList: {
    gap: 8,
    marginTop: 8,
  },
  optionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 12,
    borderRadius: 8,
    borderWidth: 1,
  },
  optionRowIcon: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    flex: 1,
  },
  optionRowLabel: {
    fontSize: 15,
    fontWeight: '600',
  },
  optionRowDescription: {
    fontSize: 13,
    marginTop: 2,
  },
  textInput: {
    padding: 12,
    borderRadius: 8,
    borderWidth: 1,
    fontSize: 15,
    minHeight: 44,
  },
  textArea: {
    minHeight: 80,
    textAlignVertical: 'top',
  },
  helperText: {
    fontSize: 12,
    marginTop: 6,
  },
  sliderHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  sliderValue: {
    fontSize: 16,
    fontWeight: '600',
  },
  sliderContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginTop: 12,
  },
  sliderTrack: {
    flex: 1,
    height: 6,
    backgroundColor: '#E5E5EA',
    borderRadius: 3,
    position: 'relative',
  },
  sliderFill: {
    height: '100%',
    borderRadius: 3,
  },
  sliderSteps: {
    position: 'absolute',
    top: -7,
    left: 0,
    right: 0,
    height: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  sliderStep: {
    width: 20,
    height: 20,
    borderRadius: 10,
  },
  sliderLabel: {
    fontSize: 12,
    width: 50,
  },
  formatsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginTop: 8,
  },
  formatChip: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 6,
    borderWidth: 1,
  },
  formatChipText: {
    fontSize: 12,
    fontWeight: '600',
  },
  costBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 6,
    marginTop: 12,
    alignSelf: 'flex-start',
  },
  costText: {
    fontSize: 13,
    fontWeight: '600',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    maxHeight: '80%',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    overflow: 'hidden',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E5EA',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: '600',
  },
  modelOption: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E5EA30',
  },
  modelOptionContent: {
    flex: 1,
    marginRight: 12,
  },
  modelOptionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 4,
  },
  modelOptionLabel: {
    fontSize: 16,
    fontWeight: '600',
  },
  modelOptionDescription: {
    fontSize: 13,
  },
  costTag: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
  },
  costTagText: {
    fontSize: 12,
    fontWeight: '600',
  },
  languageOption: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  flag: {
    fontSize: 24,
  },
  languageListItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E5EA30',
  },
  languageListText: {
    fontSize: 16,
    flex: 1,
  },
  bottomPadding: {
    height: 40,
  },
});
