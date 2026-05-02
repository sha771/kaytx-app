import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Switch,
  TextInput,
  Dimensions,
  Platform,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import * as Icons from 'lucide-react-native';
import { useTheme } from '@/providers/ThemeProvider';
import { router, useLocalSearchParams } from 'expo-router';
import {
  AIAgent,
  allSubAgents,
  AgentConfiguration,
  createAgentConfiguration,
  AgentCategory,
} from '@/constants/aiAgentHierarchy';

const { width } = Dimensions.get('window');

// ============================================
// AGENT CONFIGURATION SCREEN
// Comprehensive UI for Model, Voice, Personality, etc.
// ============================================

type ConfigSection = 'model' | 'voice' | 'language' | 'personality' | 'training' | 'data' | 'security';

const AgentConfigurationScreen = () => {
  const insets = useSafeAreaInsets();
  const { colors } = useTheme();
  const { agentId } = useLocalSearchParams<{ agentId: string }>();
  
  const [agent, setAgent] = useState<AIAgent | null>(null);
  const [_config, setConfig] = useState<AgentConfiguration | null>(null);
  const [activeSection, setActiveSection] = useState<ConfigSection>('model');
  const config = _config as any;

  useEffect(() => {
    if (agentId) {
      const foundAgent = allSubAgents.find(a => a.id === agentId);
      if (foundAgent) {
        setAgent(foundAgent);
        // Use existing config or create from preset
        setConfig(foundAgent.configuration || createAgentConfiguration(foundAgent.category as AgentCategory));
      }
    }
  }, [agentId]);

  if (!agent || !_config) return null;

  const updateConfig = (section: string, updates: any) => {
    setConfig(prev => {
      if (!prev) return null;
      const prevSection = (prev as any)[section];
      return {
        ...prev,
        [section]: { ...(typeof prevSection === 'object' && prevSection !== null ? prevSection : {}), ...updates }
      };
    });
  };

  const renderSectionTabs = () => (
    <ScrollView 
      horizontal 
      showsHorizontalScrollIndicator={false} 
      style={styles.tabsContainer}
      contentContainerStyle={styles.tabsContent}
    >
      {[
        { id: 'model', label: 'AI Model', icon: Icons.Cpu },
        { id: 'voice', label: 'Voice', icon: Icons.Mic },
        { id: 'personality', label: 'Personality', icon: Icons.User },
        { id: 'language', label: 'Language', icon: Icons.Languages },
        { id: 'training', label: 'Training', icon: Icons.BrainCircuit },
        { id: 'data', label: 'Data', icon: Icons.Database },
        { id: 'security', label: 'Security', icon: Icons.ShieldCheck },
      ].map((tab) => {
        const Icon = tab.icon;
        const isActive = activeSection === tab.id;
        return (
          <TouchableOpacity
            key={tab.id}
            onPress={() => setActiveSection(tab.id as ConfigSection)}
            style={[
              styles.tab,
              { backgroundColor: isActive ? agent.color : colors.card },
              isActive && styles.activeTabShadow
            ]}
          >
            <Icon size={18} color={isActive ? '#FFF' : colors.textSecondary} />
            <Text style={[styles.tabText, { color: isActive ? '#FFF' : colors.textSecondary }]}>
              {tab.label}
            </Text>
          </TouchableOpacity>
        );
      })}
    </ScrollView>
  );

  const renderModelConfig = () => (
    <View style={styles.sectionContainer}>
      <Text style={[styles.sectionTitle, { color: colors.text }]}>AI Model Engine</Text>
      
      <View style={[styles.inputGroup, { backgroundColor: colors.card }]}>
        <Text style={[styles.label, { color: colors.textSecondary }]}>Primary Model</Text>
        <TouchableOpacity style={styles.selector}>
          <Text style={[styles.selectorText, { color: colors.text }]}>{config.model.primary}</Text>
          <Icons.ChevronDown size={20} color={colors.textSecondary} />
        </TouchableOpacity>
      </View>

      <View style={[styles.inputGroup, { backgroundColor: colors.card }]}>
        <Text style={[styles.label, { color: colors.textSecondary }]}>Temperature (Creativity)</Text>
        <View style={styles.chipContainer}>
          {['0.0', '0.5', '1.0', '1.5', '2.0'].map((temp) => (
            <TouchableOpacity
              key={temp}
              onPress={() => updateConfig('model', { temperature: parseFloat(temp) })}
              style={[
                styles.chip,
                { backgroundColor: config.model.temperature === parseFloat(temp) ? agent.color : colors.background }
              ]}
            >
              <Text style={[styles.chipText, { color: config.model.temperature === parseFloat(temp) ? '#FFF' : colors.textSecondary }]}>
                {temp}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
        <View style={styles.sliderLabels}>
          <Text style={styles.sliderLabel}>Precise</Text>
          <Text style={styles.sliderLabel}>Balanced</Text>
          <Text style={styles.sliderLabel}>Creative</Text>
        </View>
      </View>

      <View style={[styles.inputGroup, { backgroundColor: colors.card }]}>
        <Text style={[styles.label, { color: colors.textSecondary }]}>Reasoning Level</Text>
        <View style={styles.chipContainer}>
          {['none', 'low', 'medium', 'high'].map((level) => (
            <TouchableOpacity
              key={level}
              onPress={() => updateConfig('model', { reasoning: level })}
              style={[
                styles.chip,
                { backgroundColor: config.model.reasoning === level ? agent.color : colors.background }
              ]}
            >
              <Text style={[styles.chipText, { color: config.model.reasoning === level ? '#FFF' : colors.textSecondary }]}>
                {level.toUpperCase()}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>
    </View>
  );

  const renderVoiceConfig = () => (
    <View style={styles.sectionContainer}>
      <View style={styles.headerRow}>
        <Text style={[styles.sectionTitle, { color: colors.text }]}>Voice Synthesis</Text>
        <Switch
          value={config.voice.enabled}
          onValueChange={(v) => updateConfig('voice', { enabled: v })}
          trackColor={{ false: colors.border, true: agent.color }}
        />
      </View>

      {config.voice.enabled && (
        <>
          <View style={[styles.inputGroup, { backgroundColor: colors.card }]}>
            <Text style={[styles.label, { color: colors.textSecondary }]}>Gender</Text>
            <View style={styles.chipContainer}>
              {['male', 'female', 'neutral'].map((g) => (
                <TouchableOpacity
                  key={g}
                  onPress={() => updateConfig('voice', { gender: g })}
                  style={[
                    styles.chip,
                    { backgroundColor: config.voice.gender === g ? agent.color : colors.background }
                  ]}
                >
                  <Text style={[styles.chipText, { color: config.voice.gender === g ? '#FFF' : colors.textSecondary }]}>
                    {g.toUpperCase()}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          <View style={[styles.inputGroup, { backgroundColor: colors.card }]}>
            <Text style={[styles.label, { color: colors.textSecondary }]}>Voice Style</Text>
            <TouchableOpacity style={styles.selector}>
              <Text style={[styles.selectorText, { color: colors.text }]}>{config.voice.style}</Text>
              <Icons.ChevronDown size={20} color={colors.textSecondary} />
            </TouchableOpacity>
          </View>

          <View style={[styles.inputGroup, { backgroundColor: colors.card }]}>
            <View style={styles.labelRow}>
              <Text style={[styles.label, { color: colors.textSecondary }]}>Speed</Text>
              <Text style={[styles.valueDisplay, { color: agent.color }]}>{config.voice.speed}</Text>
            </View>
            <View style={styles.chipContainer}>
              {['slow', 'normal', 'fast'].map((s) => (
                <TouchableOpacity
                  key={s}
                  onPress={() => updateConfig('voice', { speed: s })}
                  style={[
                    styles.chip,
                    { backgroundColor: config.voice.speed === s ? agent.color : colors.background }
                  ]}
                >
                  <Text style={[styles.chipText, { color: config.voice.speed === s ? '#FFF' : colors.textSecondary }]}>
                    {s.toUpperCase()}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        </>
      )}
    </View>
  );

  const renderLanguageConfig = () => (
    <View style={styles.sectionContainer}>
      <Text style={[styles.sectionTitle, { color: colors.text }]}>Language Settings</Text>
      
      <View style={[styles.inputGroup, { backgroundColor: colors.card }]}>
        <Text style={[styles.label, { color: colors.textSecondary }]}>Primary Language</Text>
        <View style={styles.chipContainer}>
          {['en', 'es', 'fr', 'de', 'zh', 'ja', 'ar'].map((lang) => (
            <TouchableOpacity
              key={lang}
              onPress={() => updateConfig('language', { primary: lang })}
              style={[
                styles.chip,
                { backgroundColor: config.language.primary === lang ? agent.color : colors.background }
              ]}
            >
              <Text style={[styles.chipText, { color: config.language.primary === lang ? '#FFF' : colors.textSecondary }]}>
                {lang.toUpperCase()}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      <View style={[styles.inputGroup, { backgroundColor: colors.card }]}>
        <Text style={[styles.label, { color: colors.textSecondary }]}>Supported Languages</Text>
        <View style={styles.tagsContainer}>
          {config.language.supported.map((lang, index) => (
            <View key={index} style={[styles.tag, { backgroundColor: `${agent.color}15` }]}>
              <Text style={[styles.tagText, { color: agent.color }]}>{lang.toUpperCase()}</Text>
              <TouchableOpacity style={styles.removeTag}>
                <Icons.X size={12} color={agent.color} />
              </TouchableOpacity>
            </View>
          ))}
          <TouchableOpacity style={[styles.addTag, { borderColor: colors.border }]}>
            <Icons.Plus size={16} color={colors.textSecondary} />
          </TouchableOpacity>
        </View>
      </View>

      <View style={[styles.inputGroup, { backgroundColor: colors.card }]}>
        <View style={styles.headerRow}>
          <Text style={[styles.label, { color: colors.textSecondary }]}>Auto-detect Language</Text>
          <Switch
            value={config.language.autoDetect}
            onValueChange={(v) => updateConfig('language', { autoDetect: v })}
            trackColor={{ false: colors.border, true: agent.color }}
          />
        </View>
      </View>

      <View style={[styles.inputGroup, { backgroundColor: colors.card }]}>
        <View style={styles.headerRow}>
          <Text style={[styles.label, { color: colors.textSecondary }]}>Formality Mode</Text>
          <Switch
            value={config.language.formality}
            onValueChange={(v) => updateConfig('language', { formality: v })}
            trackColor={{ false: colors.border, true: agent.color }}
          />
        </View>
      </View>
    </View>
  );

  const renderTrainingConfig = () => (
    <View style={styles.sectionContainer}>
      <Text style={[styles.sectionTitle, { color: colors.text }]}>Training & Learning</Text>
      
      <View style={[styles.inputGroup, { backgroundColor: colors.card }]}>
        <View style={styles.headerRow}>
          <Text style={[styles.label, { color: colors.textSecondary }]}>Continuous Learning</Text>
          <Switch
            value={config.training.continuousLearning}
            onValueChange={(v) => updateConfig('training', { continuousLearning: v })}
            trackColor={{ false: colors.border, true: agent.color }}
          />
        </View>
      </View>

      <View style={[styles.inputGroup, { backgroundColor: colors.card }]}>
        <Text style={[styles.label, { color: colors.textSecondary }]}>Learning Rate</Text>
        <View style={styles.chipContainer}>
          {['conservative', 'balanced', 'aggressive'].map((rate) => (
            <TouchableOpacity
              key={rate}
              onPress={() => updateConfig('training', { learningRate: rate })}
              style={[
                styles.chip,
                { backgroundColor: config.training.learningRate === rate ? agent.color : colors.background }
              ]}
            >
              <Text style={[styles.chipText, { color: config.training.learningRate === rate ? '#FFF' : colors.textSecondary }]}>
                {rate.toUpperCase()}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      <View style={[styles.inputGroup, { backgroundColor: colors.card }]}>
        <Text style={[styles.label, { color: colors.textSecondary }]}>Training Data Sources</Text>
        <View style={styles.tagsContainer}>
          {config.training.dataSources.map((source, index) => (
            <View key={index} style={[styles.tag, { backgroundColor: `${agent.color}15` }]}>
              <Icons.Database size={12} color={agent.color} />
              <Text style={[styles.tagText, { color: agent.color }]}>{source}</Text>
            </View>
          ))}
        </View>
      </View>

      <View style={[styles.inputGroup, { backgroundColor: colors.card }]}>
        <Text style={[styles.label, { color: colors.textSecondary }]}>Feedback Integration</Text>
        <View style={styles.chipContainer}>
          {['none', 'manual', 'automatic'].map((mode) => (
            <TouchableOpacity
              key={mode}
              onPress={() => updateConfig('training', { feedbackIntegration: mode })}
              style={[
                styles.chip,
                { backgroundColor: config.training.feedbackIntegration === mode ? agent.color : colors.background }
              ]}
            >
              <Text style={[styles.chipText, { color: config.training.feedbackIntegration === mode ? '#FFF' : colors.textSecondary }]}>
                {mode.toUpperCase()}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      <View style={[styles.inputGroup, { backgroundColor: colors.card }]}>
        <View style={styles.headerRow}>
          <Text style={[styles.label, { color: colors.textSecondary }]}>Human-in-the-Loop</Text>
          <Switch
            value={config.training.humanInTheLoop}
            onValueChange={(v) => updateConfig('training', { humanInTheLoop: v })}
            trackColor={{ false: colors.border, true: agent.color }}
          />
        </View>
      </View>
    </View>
  );

  const renderDataConfig = () => (
    <View style={styles.sectionContainer}>
      <Text style={[styles.sectionTitle, { color: colors.text }]}>Data Upload & Management</Text>
      
      <View style={[styles.inputGroup, { backgroundColor: colors.card }]}>
        <Text style={[styles.label, { color: colors.textSecondary }]}>Upload Knowledge Base</Text>
        <TouchableOpacity style={[styles.uploadArea, { borderColor: colors.border }]}>
          <Icons.UploadCloud size={32} color={agent.color} />
          <Text style={[styles.uploadText, { color: colors.text }]}>Tap to upload documents</Text>
          <Text style={[styles.uploadSubtext, { color: colors.textSecondary }]}>
            PDF, DOCX, TXT, CSV (max 50MB)
          </Text>
        </TouchableOpacity>
      </View>

      <View style={[styles.inputGroup, { backgroundColor: colors.card }]}>
        <Text style={[styles.label, { color: colors.textSecondary }]}>Data Retention</Text>
        <View style={styles.chipContainer}>
          {['7 days', '30 days', '90 days', '1 year', 'forever'].map((period) => (
            <TouchableOpacity
              key={period}
              onPress={() => updateConfig('dataUpload', { retentionPeriod: period })}
              style={[
                styles.chip,
                { backgroundColor: config.dataUpload.retentionPeriod === period ? agent.color : colors.background }
              ]}
            >
              <Text style={[styles.chipText, { color: config.dataUpload.retentionPeriod === period ? '#FFF' : colors.textSecondary }]}>
                {period.toUpperCase()}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      <View style={[styles.inputGroup, { backgroundColor: colors.card }]}>
        <View style={styles.headerRow}>
          <Text style={[styles.label, { color: colors.textSecondary }]}>Allow File Uploads</Text>
          <Switch
            value={config.dataUpload.allowFileUpload}
            onValueChange={(v) => updateConfig('dataUpload', { allowFileUpload: v })}
            trackColor={{ false: colors.border, true: agent.color }}
          />
        </View>
      </View>

      <View style={[styles.inputGroup, { backgroundColor: colors.card }]}>
        <View style={styles.headerRow}>
          <Text style={[styles.label, { color: colors.textSecondary }]}>Auto-process Documents</Text>
          <Switch
            value={config.dataUpload.autoProcess}
            onValueChange={(v) => updateConfig('dataUpload', { autoProcess: v })}
            trackColor={{ false: colors.border, true: agent.color }}
          />
        </View>
      </View>

      <View style={[styles.inputGroup, { backgroundColor: colors.card }]}>
        <Text style={[styles.label, { color: colors.textSecondary }]}>Processing Format</Text>
        <View style={styles.chipContainer}>
          {['structured', 'unstructured', 'both'].map((format) => (
            <TouchableOpacity
              key={format}
              onPress={() => updateConfig('dataUpload', { processingFormat: format })}
              style={[
                styles.chip,
                { backgroundColor: config.dataUpload.processingFormat === format ? agent.color : colors.background }
              ]}
            >
              <Text style={[styles.chipText, { color: config.dataUpload.processingFormat === format ? '#FFF' : colors.textSecondary }]}>
                {format.toUpperCase()}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>
    </View>
  );

  const renderSecurityConfig = () => (
    <View style={styles.sectionContainer}>
      <Text style={[styles.sectionTitle, { color: colors.text }]}>Security & Compliance</Text>
      
      <View style={[styles.inputGroup, { backgroundColor: colors.card }]}>
        <Text style={[styles.label, { color: colors.textSecondary }]}>Data Classification</Text>
        <View style={styles.chipContainer}>
          {['public', 'internal', 'confidential', 'restricted'].map((level) => (
            <TouchableOpacity
              key={level}
              onPress={() => updateConfig('security', { dataClassification: level })}
              style={[
                styles.chip,
                { backgroundColor: config.security.dataClassification === level ? agent.color : colors.background }
              ]}
            >
              <Text style={[styles.chipText, { color: config.security.dataClassification === level ? '#FFF' : colors.textSecondary }]}>
                {level.toUpperCase()}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      <View style={[styles.inputGroup, { backgroundColor: colors.card }]}>
        <View style={styles.headerRow}>
          <Text style={[styles.label, { color: colors.textSecondary }]}>PII Detection</Text>
          <Switch
            value={config.security.piiDetection}
            onValueChange={(v) => updateConfig('security', { piiDetection: v })}
            trackColor={{ false: colors.border, true: agent.color }}
          />
        </View>
      </View>

      <View style={[styles.inputGroup, { backgroundColor: colors.card }]}>
        <View style={styles.headerRow}>
          <Text style={[styles.label, { color: colors.textSecondary }]}>Audit Logging</Text>
          <Switch
            value={config.security.auditLogging}
            onValueChange={(v) => updateConfig('security', { auditLogging: v })}
            trackColor={{ false: colors.border, true: agent.color }}
          />
        </View>
      </View>

      <View style={[styles.inputGroup, { backgroundColor: colors.card }]}>
        <View style={styles.headerRow}>
          <Text style={[styles.label, { color: colors.textSecondary }]}>Encryption at Rest</Text>
          <Switch
            value={config.security.encryptionAtRest}
            onValueChange={(v) => updateConfig('security', { encryptionAtRest: v })}
            trackColor={{ false: colors.border, true: agent.color }}
          />
        </View>
      </View>

      <View style={[styles.inputGroup, { backgroundColor: colors.card }]}>
        <View style={styles.headerRow}>
          <Text style={[styles.label, { color: colors.textSecondary }]}>Encryption in Transit</Text>
          <Switch
            value={config.security.encryptionInTransit}
            onValueChange={(v) => updateConfig('security', { encryptionInTransit: v })}
            trackColor={{ false: colors.border, true: agent.color }}
          />
        </View>
      </View>

      <View style={[styles.inputGroup, { backgroundColor: colors.card }]}>
        <Text style={[styles.label, { color: colors.textSecondary }]}>Compliance Standards</Text>
        <View style={styles.tagsContainer}>
          {config.security.complianceStandards.map((standard, index) => (
            <View key={index} style={[styles.tag, { backgroundColor: `${agent.color}15` }]}>
              <Icons.ShieldCheck size={12} color={agent.color} />
              <Text style={[styles.tagText, { color: agent.color }]}>{standard}</Text>
            </View>
          ))}
        </View>
      </View>
    </View>
  );

  const renderPersonalityConfig = () => (
    <View style={styles.sectionContainer}>
      <Text style={[styles.sectionTitle, { color: colors.text }]}>Personality Settings</Text>
      <View style={[styles.inputGroup, { backgroundColor: colors.card }]}>
        <Text style={[styles.label, { color: colors.textSecondary }]}>Communication Style</Text>
        <View style={styles.chipContainer}>
          {['professional', 'friendly', 'technical', 'empathetic', 'humorous'].map((style) => (
            <TouchableOpacity
              key={style}
              onPress={() => updateConfig('personality', { communicationStyle: style })}
              style={[
                styles.chip,
                { backgroundColor: config.personality?.communicationStyle === style ? agent.color : colors.background }
              ]}
            >
              <Text style={[styles.chipText, { color: config.personality?.communicationStyle === style ? '#FFF' : colors.textSecondary }]}>
                {style.toUpperCase()}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>
      <View style={[styles.inputGroup, { backgroundColor: colors.card }]}>
        <Text style={[styles.label, { color: colors.textSecondary }]}>Expertise Level</Text>
        <View style={styles.chipContainer}>
          {['beginner', 'intermediate', 'advanced', 'expert', 'master'].map((level) => (
            <TouchableOpacity
              key={level}
              onPress={() => updateConfig('personality', { expertiseLevel: level })}
              style={[
                styles.chip,
                { backgroundColor: config.personality?.expertiseLevel === level ? agent.color : colors.background }
              ]}
            >
              <Text style={[styles.chipText, { color: config.personality?.expertiseLevel === level ? '#FFF' : colors.textSecondary }]}>
                {level.toUpperCase()}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>
    </View>
  );

  const renderContent = () => {
    switch (activeSection) {
      case 'model': return renderModelConfig();
      case 'voice': return renderVoiceConfig();
      case 'personality': return renderPersonalityConfig();
      case 'language': return renderLanguageConfig();
      case 'training': return renderTrainingConfig();
      case 'data': return renderDataConfig();
      case 'security': return renderSecurityConfig();
      default: return null;
    }
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      {/* Header */}
      <LinearGradient
        colors={[agent.color, `${agent.color}CC`]}
        style={[styles.header, { paddingTop: insets.top + 16 }]}
      >
        <View style={styles.headerTop}>
          <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
            <Icons.ArrowLeft color="#FFF" size={24} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Configuration</Text>
          <TouchableOpacity style={styles.backButton}>
            <Icons.RotateCcw color="#FFF" size={24} />
          </TouchableOpacity>
        </View>
        
        <View style={styles.agentOverview}>
          <View style={styles.agentIconCircle}>
            <Icons.User size={32} color={agent.color} />
          </View>
          <View>
            <Text style={styles.agentName}>{agent.name}</Text>
            <Text style={styles.agentType}>Level {agent.hierarchy.level} Specialist</Text>
          </View>
        </View>
      </LinearGradient>

      {/* Tabs */}
      <View style={styles.tabsWrapper}>
        {renderSectionTabs()}
      </View>

      {/* Config Content */}
      <ScrollView 
        style={styles.content}
        contentContainerStyle={styles.contentInner}
        showsVerticalScrollIndicator={false}
      >
        {renderContent()}
      </ScrollView>

      {/* Footer */}
      <View style={[styles.footer, { paddingBottom: insets.bottom + 16, backgroundColor: colors.card }]}>
        <TouchableOpacity style={[styles.saveButton, { backgroundColor: agent.color }]}>
          <Text style={styles.saveButtonText}>Save & Apply Configuration</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

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
    fontWeight: '700',
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255,255,255,0.2)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  agentOverview: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  agentIconCircle: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: '#FFF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  agentName: {
    color: '#FFF',
    fontSize: 20,
    fontWeight: '800',
  },
  agentType: {
    color: 'rgba(255,255,255,0.8)',
    fontSize: 14,
  },
  tabsWrapper: {
    marginTop: -24,
    zIndex: 10,
  },
  tabsContainer: {
    paddingVertical: 12,
  },
  tabsContent: {
    paddingHorizontal: 20,
    gap: 12,
  },
  tab: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 16,
    gap: 8,
  },
  activeTabShadow: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 5,
  },
  tabText: {
    fontSize: 13,
    fontWeight: '700',
  },
  content: {
    flex: 1,
  },
  contentInner: {
    padding: 20,
    paddingBottom: 100,
  },
  sectionContainer: {
    gap: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 4,
  },
  inputGroup: {
    padding: 16,
    borderRadius: 20,
    gap: 12,
  },
  label: {
    fontSize: 13,
    fontWeight: '600',
  },
  labelRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  valueDisplay: {
    fontSize: 14,
    fontWeight: '700',
  },
  selector: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0,0,0,0.05)',
  },
  selectorText: {
    fontSize: 15,
    fontWeight: '500',
  },
  slider: {
    width: '100%',
    height: 40,
  },
  sliderLabels: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  sliderLabel: {
    fontSize: 11,
    color: '#999',
  },
  chipContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  chip: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 12,
  },
  chipText: {
    fontSize: 12,
    fontWeight: '700',
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  tagsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  tag: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 12,
    gap: 8,
  },
  tagText: {
    fontSize: 13,
    fontWeight: '600',
  },
  removeTag: {
    padding: 2,
  },
  addTag: {
    width: 40,
    height: 40,
    borderRadius: 12,
    borderWidth: 1,
    borderStyle: 'dashed',
    justifyContent: 'center',
    alignItems: 'center',
  },
  uploadArea: {
    height: 120,
    borderRadius: 16,
    borderWidth: 2,
    borderStyle: 'dashed',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 8,
  },
  uploadText: {
    fontSize: 15,
    fontWeight: '600',
  },
  uploadSubtext: {
    fontSize: 12,
  },
  placeholderSection: {
    height: 300,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 16,
  },
  placeholderText: {
    fontSize: 14,
    textAlign: 'center',
    paddingHorizontal: 40,
  },
  footer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 20,
    borderTopWidth: 1,
    borderTopColor: 'rgba(0,0,0,0.05)',
  },
  saveButton: {
    height: 56,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 5,
  },
  saveButtonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: '700',
  },
});

export default AgentConfigurationScreen;
