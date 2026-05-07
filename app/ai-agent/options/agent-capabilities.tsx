import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Switch } from 'react-native';
import { useTheme } from '@/providers/ThemeProvider';
import { Zap, Brain, Eye, Ear, Hand, Globe, MessageSquare, ImageIcon, FileText, BarChart3, Shield, Cloud, Database, Code, Settings2, Save, ChevronRight, CheckCircle2 } from 'lucide-react-native';
import { useRouter } from 'expo-router';
import AgentFeatures from '@/components/ai-agent/AgentFeatures';

const CAPABILITY_CATEGORIES = [
  {
    id: 'core',
    name: 'Core Capabilities',
    icon: Zap,
    color: '#F59E0B',
    capabilities: [
      { id: 'reasoning', name: 'Advanced Reasoning', description: 'Complex logical inference and analysis', enabled: true, tier: 'premium' },
      { id: 'planning', name: 'Task Planning', description: 'Multi-step task decomposition and execution', enabled: true, tier: 'standard' },
      { id: 'memory', name: 'Long-term Memory', description: 'Persistent context across sessions', enabled: true, tier: 'standard' },
      { id: 'learning', name: 'Continuous Learning', description: 'Self-improvement from interactions', enabled: false, tier: 'premium' },
      { id: 'creativity', name: 'Creative Generation', description: 'Novel content and idea generation', enabled: true, tier: 'standard' },
    ]
  },
  {
    id: 'sensory',
    name: 'Sensory Capabilities',
    icon: Eye,
    color: '#3B82F6',
    capabilities: [
      { id: 'vision', name: 'Computer Vision', description: 'Image recognition and analysis', enabled: true, tier: 'standard' },
      { id: 'ocr', name: 'OCR & Document Reading', description: 'Text extraction from images and PDFs', enabled: true, tier: 'standard' },
      { id: 'speech-recognition', name: 'Speech Recognition', description: 'Audio to text transcription', enabled: true, tier: 'standard' },
      { id: 'speaker-id', name: 'Speaker Identification', description: 'Voice biometric recognition', enabled: false, tier: 'premium' },
      { id: 'object-detection', name: 'Object Detection', description: 'Real-time object identification', enabled: false, tier: 'premium' },
    ]
  },
  {
    id: 'communication',
    name: 'Communication',
    icon: MessageSquare,
    color: '#10B981',
    capabilities: [
      { id: 'multilingual', name: 'Multi-language Support', description: 'Operate in 50+ languages', enabled: true, tier: 'standard' },
      { id: 'translation', name: 'Real-time Translation', description: 'Instant language translation', enabled: true, tier: 'standard' },
      { id: 'sentiment', name: 'Sentiment Analysis', description: 'Emotion and tone detection', enabled: true, tier: 'standard' },
      { id: 'summarization', name: 'Text Summarization', description: 'Condense long documents', enabled: true, tier: 'standard' },
      { id: 'a2a', name: 'Agent-to-Agent Communication', description: 'Collaborate with other AI agents', enabled: true, tier: 'premium' },
    ]
  },
  {
    id: 'data',
    name: 'Data & Analytics',
    icon: Database,
    color: '#8B5CF6',
    capabilities: [
      { id: 'sql', name: 'SQL Query Generation', description: 'Database interaction and querying', enabled: true, tier: 'standard' },
      { id: 'data-analysis', name: 'Data Analysis', description: 'Statistical analysis and insights', enabled: true, tier: 'standard' },
      { id: 'visualization', name: 'Data Visualization', description: 'Chart and graph generation', enabled: true, tier: 'standard' },
      { id: 'forecasting', name: 'Predictive Forecasting', description: 'Trend prediction and modeling', enabled: false, tier: 'premium' },
      { id: 'etl', name: 'ETL Processing', description: 'Extract, transform, load operations', enabled: false, tier: 'premium' },
    ]
  },
  {
    id: 'integration',
    name: 'Integration & Automation',
    icon: Cloud,
    color: '#06B6D4',
    capabilities: [
      { id: 'api-calls', name: 'API Integration', description: 'Connect to external services', enabled: true, tier: 'standard' },
      { id: 'web-scraping', name: 'Web Data Extraction', description: 'Scrape and process web content', enabled: false, tier: 'premium' },
      { id: 'workflow', name: 'Workflow Automation', description: 'Trigger and manage automated flows', enabled: true, tier: 'standard' },
      { id: 'rpa', name: 'RPA Capabilities', description: 'Robotic process automation', enabled: false, tier: 'premium' },
      { id: 'mcp', name: 'MCP Protocol Support', description: 'Model Context Protocol integration', enabled: true, tier: 'premium' },
    ]
  },
];

const SKILL_LEVELS = [
  { id: 'novice', name: 'Novice', description: 'Basic capability, minimal autonomy', color: '#94A3B8' },
  { id: 'intermediate', name: 'Intermediate', description: 'Standard operations with oversight', color: '#3B82F6' },
  { id: 'advanced', name: 'Advanced', description: 'Complex tasks with limited supervision', color: '#8B5CF6' },
  { id: 'expert', name: 'Expert', description: 'Full autonomy on expert-level tasks', color: '#F59E0B' },
  { id: 'master', name: 'Master', description: 'Can train and guide other agents', color: '#10B981' },
];

export default function AgentCapabilitiesPage() {
  const { theme } = useTheme();
  const router = useRouter();
  const [capabilities, setCapabilities] = useState<Record<string, boolean>>({});
  const [skillLevel, setSkillLevel] = useState('advanced');

  const handleToggle = (categoryId: string, capabilityId: string, currentEnabled: boolean) => {
    setCapabilities(prev => ({
      ...prev,
      [`${categoryId}-${capabilityId}`]: !currentEnabled
    }));
  };

  const isEnabled = (categoryId: string, capabilityId: string, defaultEnabled: boolean) => {
    const key = `${categoryId}-${capabilityId}`;
    return capabilities[key] !== undefined ? capabilities[key] : defaultEnabled;
  };

  return (
    <ScrollView style={[styles.container, { backgroundColor: theme.colors.background }]}>
      {/* Header */}
      <View style={[styles.header, { borderBottomColor: theme.colors.border || '#E5E5EA' }]}>
        <View style={[styles.headerIconWrap, { backgroundColor: '#F59E0B20' }]}>
          <Zap size={40} color="#F59E0B" />
        </View>
        <Text style={[styles.headerTitle, { color: theme.colors.text }]}>Agent Capabilities</Text>
        <Text style={[styles.headerSubtitle, { color: theme.colors.textSecondary }]}>
          Configure skills, features, and abilities
        </Text>
      </View>

      {/* Skill Level Selector */}
      <View style={[styles.section, { backgroundColor: theme.colors.card || '#F2F2F7' }]}>
        <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Skill Level</Text>
        <Text style={[styles.sectionSubtitle, { color: theme.colors.textSecondary }]}>
          Set the autonomy and expertise level for this agent
        </Text>
        <View style={styles.skillLevels}>
          {SKILL_LEVELS.map((level) => (
            <TouchableOpacity
              key={level.id}
              onPress={() => setSkillLevel(level.id)}
              style={[
                styles.skillCard,
                { backgroundColor: skillLevel === level.id ? level.color + '20' : theme.colors.background },
                skillLevel === level.id && { borderColor: level.color, borderWidth: 2 }
              ]}
            >
              <View style={[styles.skillDot, { backgroundColor: level.color }]} />
              <Text style={[styles.skillName, { color: theme.colors.text }]}>{level.name}</Text>
              <Text style={[styles.skillDesc, { color: theme.colors.textSecondary }]}>{level.description}</Text>
              {skillLevel === level.id && (
                <CheckCircle2 size={20} color={level.color} style={styles.skillCheck} />
              )}
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* Capability Categories */}
      {CAPABILITY_CATEGORIES.map((category) => (
        <View key={category.id} style={[styles.section, { backgroundColor: theme.colors.card || '#F2F2F7' }]}>
          <View style={styles.categoryHeader}>
            <View style={[styles.categoryIcon, { backgroundColor: category.color + '20' }]}>
              <category.icon size={24} color={category.color} />
            </View>
            <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>{category.name}</Text>
          </View>
          <View style={styles.capabilitiesList}>
            {category.capabilities.map((capability) => {
              const enabled = isEnabled(category.id, capability.id, capability.enabled);
              return (
                <View key={capability.id} style={styles.capabilityItem}>
                  <View style={styles.capabilityInfo}>
                    <View style={styles.capabilityHeader}>
                      <Text style={[styles.capabilityName, { color: theme.colors.text }]}>{capability.name}</Text>
                      {capability.tier === 'premium' && (
                        <View style={[styles.tierBadge, { backgroundColor: '#FFD70030' }]}>
                          <Text style={[styles.tierText, { color: '#FFD700' }]}>PRO</Text>
                        </View>
                      )}
                    </View>
                    <Text style={[styles.capabilityDesc, { color: theme.colors.textSecondary }]}>
                      {capability.description}
                    </Text>
                  </View>
                  <Switch
                    value={enabled}
                    onValueChange={() => handleToggle(category.id, capability.id, capability.enabled)}
                    trackColor={{ false: '#767577', true: category.color + '80' }}
                    thumbColor={enabled ? category.color : '#f4f3f4'}
                  />
                </View>
              );
            })}
          </View>
        </View>
      ))}

      {/* Advanced Settings */}
      <TouchableOpacity style={[styles.advancedButton, { backgroundColor: theme.colors.card || '#F2F2F7' }]}>
        <Settings2 size={24} color="#3B82F6" />
        <View style={styles.advancedText}>
          <Text style={[styles.advancedTitle, { color: theme.colors.text }]}>Advanced Capability Settings</Text>
          <Text style={[styles.advancedDesc, { color: theme.colors.textSecondary }]}>
            Fine-tune model parameters and thresholds
          </Text>
        </View>
        <ChevronRight size={20} color={theme.colors.textSecondary} />
      </TouchableOpacity>

      {/* Save Button */}
      <TouchableOpacity style={[styles.saveButton, { backgroundColor: '#F59E0B' }]}>
        <Save size={20} color="#fff" />
        <Text style={styles.saveButtonText}>Save Capabilities</Text>
      </TouchableOpacity>

      <AgentFeatures agentId="agent-capabilities" agentName="Agent Capabilities" />
      <View style={{ height: 40 }} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  header: { alignItems: 'center', paddingVertical: 30, paddingHorizontal: 20, borderBottomWidth: 1 },
  headerIconWrap: { width: 80, height: 80, borderRadius: 40, justifyContent: 'center', alignItems: 'center', marginBottom: 16 },
  headerTitle: { fontSize: 26, fontWeight: 'bold' },
  headerSubtitle: { fontSize: 14, marginTop: 6, textAlign: 'center' },
  section: { marginHorizontal: 16, marginBottom: 16, padding: 20, borderRadius: 16 },
  sectionTitle: { fontSize: 18, fontWeight: '700' },
  sectionSubtitle: { fontSize: 13, marginTop: 4, marginBottom: 16 },
  skillLevels: { gap: 10 },
  skillCard: { flexDirection: 'row', alignItems: 'center', padding: 14, borderRadius: 12 },
  skillDot: { width: 12, height: 12, borderRadius: 6, marginRight: 12 },
  skillName: { fontSize: 15, fontWeight: '600', flex: 1 },
  skillDesc: { fontSize: 12 },
  skillCheck: { marginLeft: 8 },
  categoryHeader: { flexDirection: 'row', alignItems: 'center', marginBottom: 16 },
  categoryIcon: { width: 40, height: 40, borderRadius: 10, justifyContent: 'center', alignItems: 'center', marginRight: 12 },
  capabilitiesList: { gap: 4 },
  capabilityItem: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingVertical: 12, borderBottomWidth: 1, borderBottomColor: '#E5E5EA30' },
  capabilityInfo: { flex: 1, marginRight: 12 },
  capabilityHeader: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  capabilityName: { fontSize: 15, fontWeight: '500' },
  tierBadge: { paddingHorizontal: 6, paddingVertical: 2, borderRadius: 4 },
  tierText: { fontSize: 9, fontWeight: '700' },
  capabilityDesc: { fontSize: 12, marginTop: 2 },
  advancedButton: { flexDirection: 'row', alignItems: 'center', marginHorizontal: 16, marginBottom: 16, padding: 16, borderRadius: 14 },
  advancedText: { flex: 1, marginLeft: 12 },
  advancedTitle: { fontSize: 15, fontWeight: '600' },
  advancedDesc: { fontSize: 12, marginTop: 2 },
  saveButton: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginHorizontal: 16, marginVertical: 20, padding: 16, borderRadius: 14, gap: 8 },
  saveButtonText: { color: '#fff', fontSize: 16, fontWeight: '600' },
});
