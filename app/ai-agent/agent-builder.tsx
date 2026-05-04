import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  TextInput,
  Switch,
} from 'react-native';
import { useRouter } from 'expo-router';
import {
  ChevronLeft,
  Wand,
  Brain,
  Mic,
  Globe,
  User,
  Upload,
  Save,
  Check,
  ChevronRight,
  Sparkles,
  Palette,
  MessageSquare,
  Target,
  Zap,
  Plus,
  X,
} from 'lucide-react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Animated, { FadeInUp } from 'react-native-reanimated';
import { useColorScheme } from '@/hooks/useColorScheme';
import { Colors } from '@/constants/Colors';
import { agentCategories, createAgentConfiguration } from '@/constants/aiAgentHierarchy';

export default function AgentBuilderScreen() {
  const router = useRouter();
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];
  const [step, setStep] = useState(1);
  const [agentConfig, setAgentConfig] = useState({
    name: '',
    description: '',
    category: '',
    icon: 'User',
    color: '#3B82F6',
    model: 'gpt-4o',
    voiceEnabled: false,
    voiceGender: 'female',
    voiceStyle: 'professional',
    language: 'english',
    personaAge: 'adult',
    personality: 'helpful',
    capabilities: [] as string[],
    trainingEnabled: true,
    dataUploadEnabled: true,
  });
  const [newCapability, setNewCapability] = useState('');
  const models = ['gpt-4o', 'gpt-4o-mini', 'claude-3-5-sonnet', 'claude-3-haiku', 'gemini-1.5-pro'];
  const totalSteps = 4;
  const icons = ['User', 'Brain', 'MessageSquare', 'Target', 'Zap', 'Globe', 'User', 'Sparkles'];
  const colorOptions = ['#3B82F6', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6', '#EC4899', '#14B8A6', '#6366F1'];
  const languages = ['english', 'spanish', 'french', 'german', 'chinese', 'japanese', 'arabic'];
  const personalities = ['helpful', 'professional', 'friendly', 'analytical', 'creative', 'formal'];
  const voiceStyles = ['professional', 'casual', 'enthusiastic', 'calm', 'authoritative'];

  const addCapability = () => {
    if (newCapability && !agentConfig.capabilities.includes(newCapability)) {
      setAgentConfig({ ...agentConfig, capabilities: [...agentConfig.capabilities, newCapability] });
      setNewCapability('');
    }
  };

  const removeCapability = (cap: string) => {
    setAgentConfig({ ...agentConfig, capabilities: agentConfig.capabilities.filter(c => c !== cap) });
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <View>
            <Text style= [styles.stepTitle, { color: colors.text }]}>Basic Information</Text>
            <Text style= [styles.stepDesc, { color: colors.text + '60' }]}>Let{"'"}s start with the basics for your new AI agent.</Text>
            
            <Text style= [styles.inputLabel, { color: colors.text + '60' }]}>Agent Name</Text>
            <TextInput
              style= [styles.input, { color: colors.text, backgroundColor: colors.border + '30' }]}
              value={agentConfig.name}
              onChangeText={(v) => setAgentConfig({ ...agentConfig, name: v })}
              placeholder="e.g., AI Customer Support Specialist"
              placeholderTextColor={colors.text + '40'}
            />

            <Text style= [styles.inputLabel, { color: colors.text + '60' }]}>Description</Text>
            <TextInput
              style= [styles.textArea, { color: colors.text, backgroundColor: colors.border + '30' }]}
              value={agentConfig.description}
              onChangeText={(v) => setAgentConfig({ ...agentConfig, description: v })}
              placeholder="What does this agent do?"
              placeholderTextColor={colors.text + '40'}
              multiline
              numberOfLines={3}
            />

            <Text style= [styles.inputLabel, { color: colors.text + '60' }]}>Category</Text>
            <View style={styles.categoryGrid}>
              {agentCategories.map(cat => (
                <TouchableOpacity
                  key={cat.id}
                  style= [styles.categoryChip, agentConfig.category === cat.id && { backgroundColor: cat.color, borderColor: cat.color }]}
                  onPress={() => setAgentConfig({ ...agentConfig, category: cat.id })}
                >
                  <cat.icon size={16} color={agentConfig.category === cat.id ? '#fff' : colors.text} />
                  <Text style= [styles.categoryText, { color: agentConfig.category === cat.id ? '#fff' : colors.text }]}>
                    {cat.label.split(' ')[0]}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        );

      case 2:
        return (
          <View>
            <Text style= [styles.stepTitle, { color: colors.text }]}>Appearance</Text>
            <Text style= [styles.stepDesc, { color: colors.text + '60' }]}>Choose how your agent will look.</Text>

            <Text style= [styles.inputLabel, { color: colors.text + '60' }]}>Icon</Text>
            <View style={styles.iconGrid}>
              {icons.map(iconName => {
                const IconComponent = { Brain, MessageSquare, Target, Zap, Globe, User, Sparkles }[iconName] || User;
                const isSelected = agentConfig.icon === iconName;
                return (
                  <TouchableOpacity
                    key={iconName}
                    style= [styles.iconChip, isSelected && { backgroundColor: agentConfig.color, borderColor: agentConfig.color }]}
                    onPress={() => setAgentConfig({ ...agentConfig, icon: iconName })}
                  >
                    <IconComponent size={24} color={isSelected ? '#fff' : colors.text} />
                  </TouchableOpacity>
                );
              })}
            </View>

            <Text style= [styles.inputLabel, { color: colors.text + '60' }]}>Color Theme</Text>
            <View style={styles.colorGrid}>
              {colorOptions.map(color => (
                <TouchableOpacity
                  key={color}
                  style= [styles.colorChip, { backgroundColor: color }, agentConfig.color === color && styles.colorSelected]}
                  onPress={() => setAgentConfig({ ...agentConfig, color })}
                >
                  {agentConfig.color === color && <Check size={16} color="#fff" />}
                </TouchableOpacity>
              ))}
            </View>
          </View>
        );

      case 3:
        return (
          <View>
            <Text style= [styles.stepTitle, { color: colors.text }]}>Configuration</Text>
            <Text style= [styles.stepDesc, { color: colors.text + '60' }]}>Set up your agent{"'"}s AI model and behavior.</Text>

            <Text style= [styles.inputLabel, { color: colors.text + '60' }]}>AI Model</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.modelScroll}>
              {models.map(model => (
                <TouchableOpacity
                  key={model}
                  style= [styles.modelChip, agentConfig.model === model && { backgroundColor: colors.primary }]}
                  onPress={() => setAgentConfig({ ...agentConfig, model })}
                >
                  <Brain size={16} color={agentConfig.model === model ? '#fff' : colors.text} />
                  <Text style= [styles.modelText, { color: agentConfig.model === model ? '#fff' : colors.text }]}>
                    {model}
                  </Text>
                </TouchableOpacity>
              ))}
            </ScrollView>

            <View style={styles.toggleSection}>
              <View style={styles.toggleRow}>
                <View style={styles.toggleInfo}>
                  <Mic size={20} color={colors.text} />
                  <Text style= [styles.toggleLabel, { color: colors.text }]}>Enable Voice</Text>
                </View>
                <Switch
                  value={agentConfig.voiceEnabled}
                  onValueChange={(v) => setAgentConfig({ ...agentConfig, voiceEnabled: v })}
                  trackColor={{ false: '#767577', true: colors.primary + '80' }}
                  thumbColor={agentConfig.voiceEnabled ? colors.primary : '#f4f3f4'}
                />
              </View>

              {agentConfig.voiceEnabled && (
                <View style={styles.voiceOptions}>
                  <View style={styles.voiceRow}>
                    <Text style= [styles.voiceLabel, { color: colors.text + '60' }]}>Gender</Text>
                    <View style={styles.voiceChips}>
                      {['male', 'female', 'neutral'].map(g => (
                        <TouchableOpacity
                          key={g}
                          style= [styles.voiceChip, agentConfig.voiceGender === g && { backgroundColor: colors.primary }]}
                          onPress={() => setAgentConfig({ ...agentConfig, voiceGender: g })}
                        >
                          <Text style= [styles.voiceChipText, { color: agentConfig.voiceGender === g ? '#fff' : colors.text }]}>
                            {g}
                          </Text>
                        </TouchableOpacity>
                      ))}
                    </View>
                  </View>

                  <View style={styles.voiceRow}>
                    <Text style= [styles.voiceLabel, { color: colors.text + '60' }]}>Style</Text>
                    <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                      {voiceStyles.map(style => (
                        <TouchableOpacity
                          key={style}
                          style= [styles.voiceChip, agentConfig.voiceStyle === style && { backgroundColor: colors.primary }]}
                          onPress={() => setAgentConfig({ ...agentConfig, voiceStyle: style })}
                        >
                          <Text style= [styles.voiceChipText, { color: agentConfig.voiceStyle === style ? '#fff' : colors.text }]}>
                            {style}
                          </Text>
                        </TouchableOpacity>
                      ))}
                    </ScrollView>
                  </View>
                </View>
              )}
            </View>

            <Text style= [styles.inputLabel, { color: colors.text + '60' }]}>Language</Text>
            <View style={styles.languageGrid}>
              {languages.map(lang => (
                <TouchableOpacity
                  key={lang}
                  style= [styles.languageChip, agentConfig.language === lang && { backgroundColor: colors.primary }]}
                  onPress={() => setAgentConfig({ ...agentConfig, language: lang })}
                >
                  <Globe size={14} color={agentConfig.language === lang ? '#fff' : colors.text} />
                  <Text style= [styles.languageText, { color: agentConfig.language === lang ? '#fff' : colors.text }]}>
                    {lang}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>

            <Text style= [styles.inputLabel, { color: colors.text + '60' }]}>Personality</Text>
            <View style={styles.personalityGrid}>
              {personalities.map(p => (
                <TouchableOpacity
                  key={p}
                  style= [styles.personalityChip, agentConfig.personality === p && { backgroundColor: colors.primary }]}
                  onPress={() => setAgentConfig({ ...agentConfig, personality: p })}
                >
                  <Text style= [styles.personalityText, { color: agentConfig.personality === p ? '#fff' : colors.text }]}>
                    {p}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        );

      case 4:
        return (
          <View>
            <Text style= [styles.stepTitle, { color: colors.text }]}>Capabilities & Training</Text>
            <Text style= [styles.stepDesc, { color: colors.text + '60' }]}>Define what your agent can do.</Text>

            <Text style= [styles.inputLabel, { color: colors.text + '60' }]}>Add Capabilities</Text>
            <View style={styles.capabilityInput}>
              <TextInput
                style= [styles.capabilityTextInput, { color: colors.text, backgroundColor: colors.border + '30' }]}
                value={newCapability}
                onChangeText={setNewCapability}
                placeholder="e.g., Process invoices"
                placeholderTextColor={colors.text + '40'}
              />
              <TouchableOpacity style= [styles.addCapButton, { backgroundColor: colors.primary }]} onPress={addCapability}>
                <Plus size={20} color="#fff" />
              </TouchableOpacity>
            </View>

            <View style={styles.capabilitiesList}>
              {agentConfig.capabilities.map(cap => (
                <View key={cap} style= [styles.capabilityChip, { backgroundColor: colors.primary + '15' }]}>
                  <Zap size={14} color={colors.primary} />
                  <Text style= [styles.capabilityText, { color: colors.primary }]}>{cap}</Text>
                  <TouchableOpacity onPress={() => removeCapability(cap)}>
                    <X size={14} color={colors.primary} />
                  </TouchableOpacity>
                </View>
              ))}
            </View>

            <View style={styles.toggleSection}>
              <View style={styles.toggleRow}>
                <View style={styles.toggleInfo}>
                  <Brain size={20} color={colors.text} />
                  <Text style= [styles.toggleLabel, { color: colors.text }]}>Enable Training Mode</Text>
                </View>
                <Switch
                  value={agentConfig.trainingEnabled}
                  onValueChange={(v) => setAgentConfig({ ...agentConfig, trainingEnabled: v })}
                  trackColor={{ false: '#767577', true: colors.primary + '80' }}
                  thumbColor={agentConfig.trainingEnabled ? colors.primary : '#f4f3f4'}
                />
              </View>

              <View style={styles.toggleRow}>
                <View style={styles.toggleInfo}>
                  <Upload size={20} color={colors.text} />
                  <Text style= [styles.toggleLabel, { color: colors.text }]}>Allow Data Upload</Text>
                </View>
                <Switch
                  value={agentConfig.dataUploadEnabled}
                  onValueChange={(v) => setAgentConfig({ ...agentConfig, dataUploadEnabled: v })}
                  trackColor={{ false: '#767577', true: colors.primary + '80' }}
                  thumbColor={agentConfig.dataUploadEnabled ? colors.primary : '#f4f3f4'}
                />
              </View>
            </View>

            {/* Summary */}
            <View style= [styles.summaryCard, { backgroundColor: colors.card, borderColor: colors.border }]}>
              <Text style= [styles.summaryTitle, { color: colors.text + '60' }]}>AGENT PREVIEW</Text>
              <View style={styles.summaryRow}>
                <Text style= [styles.summaryLabel, { color: colors.text + '60' }]}>Name</Text>
                <Text style= [styles.summaryValue, { color: colors.text }]}>{agentConfig.name || 'Unnamed Agent'}</Text>
              </View>
              <View style={styles.summaryRow}>
                <Text style= [styles.summaryLabel, { color: colors.text + '60' }]}>Category</Text>
                <Text style= [styles.summaryValue, { color: colors.text }]}>{agentConfig.category || 'Uncategorized'}</Text>
              </View>
              <View style={styles.summaryRow}>
                <Text style= [styles.summaryLabel, { color: colors.text + '60' }]}>Model</Text>
                <Text style= [styles.summaryValue, { color: colors.text }]}>{agentConfig.model}</Text>
              </View>
              <View style={styles.summaryRow}>
                <Text style= [styles.summaryLabel, { color: colors.text + '60' }]}>Voice</Text>
                <Text style= [styles.summaryValue, { color: colors.text }]}>{agentConfig.voiceEnabled ? 'Enabled' : 'Disabled'}</Text>
              </View>
            </View>
          </View>
        );

      default:
        return null;
    }
  };

  return (
    <SafeAreaView style= [styles.container, { backgroundColor: colors.background }]}>
      <View style= [styles.header, { backgroundColor: colors.card, borderBottomColor: colors.border }]}>
        <View style={styles.headerTop}>
          <TouchableOpacity onPress={() => router.back()}>
            <ChevronLeft size={24} color={colors.text} />
          </TouchableOpacity>
          <View style={styles.headerTitle}>
            <Wand size={22} color={colors.primary} />
            <Text style= [styles.titleText, { color: colors.text }]}>Agent Builder</Text>
          </View>
          <View style={{ width: 24 }} />
        </View>

        {/* Progress */}
        <View style={styles.progressContainer}>
          <View style={styles.progressRow}>
            {Array.from({ length: totalSteps }).map((_, i) => (
              <View key={i} style= [styles.progressStep, i + 1 <= step && { backgroundColor: colors.primary }]} />
            ))}
          </View>
          <Text style= [styles.progressText, { color: colors.text + '60' }]}>Step {step} of {totalSteps}</Text>
        </View>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <Animated.View entering={FadeInUp}>
          {renderStep()}
        </Animated.View>
      </ScrollView>

      {/* Footer */}
      <View style= [styles.footer, { backgroundColor: colors.card, borderTopColor: colors.border }]}>
        {step > 1 && (
          <TouchableOpacity style= [styles.backBtn, { borderColor: colors.border }]} onPress={() => setStep(step - 1)}>
            <Text style= [styles.backText, { color: colors.text }]}>Back</Text>
          </TouchableOpacity>
        )}
        <TouchableOpacity 
          style= [styles.nextBtn, { backgroundColor: colors.primary }]} 
          onPress={() => step < totalSteps ? setStep(step + 1) : router.push('/ai-agent')}
        >
          <Text style={styles.nextText}>{step === totalSteps ? 'Create Agent' : 'Next'}</Text>
          <ChevronRight size={20} color="#fff" />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  header: { borderBottomWidth: 1 },
  headerTop: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', padding: 16 },
  headerTitle: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  titleText: { fontSize: 18, fontWeight: '600' },
  progressContainer: { paddingHorizontal: 16, paddingBottom: 16 },
  progressRow: { flexDirection: 'row', gap: 8, marginBottom: 8 },
  progressStep: { flex: 1, height: 4, borderRadius: 2, backgroundColor: '#00000015' },
  progressText: { fontSize: 12, textAlign: 'center' },
  content: { flex: 1, padding: 20 },
  stepTitle: { fontSize: 24, fontWeight: '700', marginBottom: 8 },
  stepDesc: { fontSize: 15, marginBottom: 24 },
  inputLabel: { fontSize: 12, fontWeight: '600', marginBottom: 8, textTransform: 'uppercase' },
  input: { padding: 14, borderRadius: 12, fontSize: 16, marginBottom: 16 },
  textArea: { padding: 14, borderRadius: 12, fontSize: 16, marginBottom: 16, height: 100, textAlignVertical: 'top' },
  categoryGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  categoryChip: { flexDirection: 'row', alignItems: 'center', gap: 6, paddingHorizontal: 14, paddingVertical: 10, borderRadius: 10, backgroundColor: '#00000008', borderWidth: 1, borderColor: 'transparent' },
  categoryText: { fontSize: 13, fontWeight: '500' },
  iconGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 10 },
  iconChip: { width: 56, height: 56, borderRadius: 12, justifyContent: 'center', alignItems: 'center', backgroundColor: '#00000008', borderWidth: 1, borderColor: 'transparent' },
  colorGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 10 },
  colorChip: { width: 48, height: 48, borderRadius: 24, justifyContent: 'center', alignItems: 'center' },
  colorSelected: { borderWidth: 3, borderColor: '#fff', shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.2, shadowRadius: 4 },
  modelScroll: { marginBottom: 20 },
  modelChip: { flexDirection: 'row', alignItems: 'center', gap: 8, paddingHorizontal: 16, paddingVertical: 10, borderRadius: 20, backgroundColor: '#00000008', marginRight: 10 },
  modelText: { fontSize: 14, fontWeight: '500' },
  toggleSection: { marginBottom: 20 },
  toggleRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingVertical: 12 },
  toggleInfo: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  toggleLabel: { fontSize: 16 },
  voiceOptions: { marginLeft: 32, marginBottom: 16 },
  voiceRow: { marginBottom: 12 },
  voiceLabel: { fontSize: 13, marginBottom: 8 },
  voiceChips: { flexDirection: 'row', gap: 8 },
  voiceChip: { paddingHorizontal: 14, paddingVertical: 8, borderRadius: 20, backgroundColor: '#00000008' },
  voiceChipText: { fontSize: 13, fontWeight: '500', textTransform: 'capitalize' },
  languageGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 8, marginBottom: 20 },
  languageChip: { flexDirection: 'row', alignItems: 'center', gap: 6, paddingHorizontal: 14, paddingVertical: 8, borderRadius: 20, backgroundColor: '#00000008' },
  languageText: { fontSize: 13, fontWeight: '500', textTransform: 'capitalize' },
  personalityGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  personalityChip: { paddingHorizontal: 16, paddingVertical: 10, borderRadius: 20, backgroundColor: '#00000008' },
  personalityText: { fontSize: 14, fontWeight: '500', textTransform: 'capitalize' },
  capabilityInput: { flexDirection: 'row', gap: 10, marginBottom: 12 },
  capabilityTextInput: { flex: 1, padding: 14, borderRadius: 12, fontSize: 15 },
  addCapButton: { width: 48, height: 48, borderRadius: 12, justifyContent: 'center', alignItems: 'center' },
  capabilitiesList: { flexDirection: 'row', flexWrap: 'wrap', gap: 8, marginBottom: 20 },
  capabilityChip: { flexDirection: 'row', alignItems: 'center', gap: 6, paddingHorizontal: 12, paddingVertical: 8, borderRadius: 20 },
  capabilityText: { fontSize: 13, fontWeight: '500' },
  summaryCard: { borderRadius: 16, borderWidth: 1, padding: 16 },
  summaryTitle: { fontSize: 12, fontWeight: '700', marginBottom: 12 },
  summaryRow: { flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 8 },
  summaryLabel: { fontSize: 14 },
  summaryValue: { fontSize: 14, fontWeight: '600' },
  footer: { flexDirection: 'row', padding: 16, gap: 12, borderTopWidth: 1 },
  backBtn: { paddingHorizontal: 20, paddingVertical: 14, borderRadius: 12, borderWidth: 1 },
  backText: { fontSize: 16, fontWeight: '600' },
  nextBtn: { flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 8, paddingVertical: 14, borderRadius: 12 },
  nextText: { color: '#fff', fontSize: 16, fontWeight: '600' },
});

