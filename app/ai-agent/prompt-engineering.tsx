import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import { useRouter } from 'expo-router';
import {
  ChevronLeft,
  Code,
  MessageSquare,
  Play,
  Save,
  Copy,
  Check,
  RotateCcw,
  Sparkles,
  Settings,
  Zap,
  Lightbulb,
  CircleAlert,
  ChevronDown,
  Terminal,
  FileText,
  Plus,
  Trash2,
  EllipsisVertical,
  Wand,
} from 'lucide-react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Animated, { FadeInUp } from 'react-native-reanimated';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';

// Types
interface PromptTemplate {
  id: string;
  name: string;
  description: string;
  content: string;
  category: string;
  variables: string[];
  lastModified: string;
  usage: number;
}

interface PromptVersion {
  id: string;
  version: string;
  content: string;
  author: string;
  timestamp: string;
  changes: string;
}

// Mock Data
const PROMPT_TEMPLATES: PromptTemplate[] = [
  {
    id: '1',
    name: 'Customer Support Greeting',
    description: 'Initial greeting for customer support conversations',
    content: `You are a helpful customer support agent. Greet the customer warmly and ask how you can assist them today.

Context: {{customer_name}} has been a customer since {{signup_date}}.

Tone: Friendly, professional, and empathetic.`,
    category: 'Support',
    variables: ['customer_name', 'signup_date'],
    lastModified: '2026-03-01',
    usage: 2340,
  },
  {
    id: '2',
    name: 'Technical Troubleshooting',
    description: 'Guide for technical issue diagnosis',
    content: `Help the user troubleshoot {{issue_type}}. 

Steps:
1. Ask clarifying questions
2. Identify symptoms
3. Suggest solutions
4. Escalate if needed

Be patient and thorough.`,
    category: 'Technical',
    variables: ['issue_type'],
    lastModified: '2026-02-28',
    usage: 1890,
  },
  {
    id: '3',
    name: 'Sales Pitch',
    description: 'Product recommendation and upselling',
    content: `Recommend {{product_name}} to {{customer_name}} based on their usage of {{current_plan}}.

Key benefits to highlight:
- {{benefit_1}}
- {{benefit_2}}
- {{benefit_3}}

Keep it conversational and not pushy.`,
    category: 'Sales',
    variables: ['product_name', 'customer_name', 'current_plan', 'benefit_1', 'benefit_2', 'benefit_3'],
    lastModified: '2026-02-25',
    usage: 1456,
  },
];

const PROMPT_VERSIONS: PromptVersion[] = [
  {
    id: '1',
    version: 'v3.2',
    content: 'Updated with empathetic tone guidelines',
    author: 'Sarah Chen',
    timestamp: '2026-03-01 14:30',
    changes: 'Added empathy section and context variables',
  },
  {
    id: '2',
    version: 'v3.1',
    content: 'Added escalation guidelines',
    author: 'Mike Johnson',
    timestamp: '2026-02-15 10:00',
    changes: 'Enhanced troubleshooting flow',
  },
  {
    id: '3',
    version: 'v3.0',
    content: 'Complete rewrite with structured format',
    author: 'AI Team',
    timestamp: '2026-02-01 09:00',
    changes: 'Major overhaul of prompt structure',
  },
];

export default function PromptEngineeringScreen() {
  const router = useRouter();
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];

  const [activeTab, setActiveTab] = useState<'editor' | 'templates' | 'versions'>('editor');
  const [selectedTemplate, setSelectedTemplate] = useState<PromptTemplate | null>(PROMPT_TEMPLATES[0]);
  const [promptContent, setPromptContent] = useState(PROMPT_TEMPLATES[0].content);
  const [testInput, setTestInput] = useState('');
  const [testOutput, setTestOutput] = useState('');
  const [isTesting, setIsTesting] = useState(false);
  const [copied, setCopied] = useState(false);
  const [expandedTemplate, setExpandedTemplate] = useState<string | null>(null);

  const runTest = () => {
    setIsTesting(true);
    setTimeout(() => {
      setTestOutput(`Hello! I'd be happy to help you today. I see you've been with us since 2023 - thank you for your continued trust in our service!

How may I assist you today? I'm here to help with any questions or concerns you might have.`);
      setIsTesting(false);
    }, 1500);


  const copyToClipboard = () => {
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const renderTemplateCard = (template: PromptTemplate, index: number) => {
    const isExpanded = expandedTemplate === template.id;
    const isSelected = selectedTemplate?.id === template.id;

    return (
      <Animated.View
        key={template.id}
        entering={FadeInUp.delay(index * 50)}
        style={[
          styles.templateCard,
          { backgroundColor: colors.card },
          isSelected && { borderColor: colors.tint, borderWidth: 2 },
        ]}
      >
        <TouchableOpacity
          style={styles.templateHeader}
          onPress={() => {
            setSelectedTemplate(template);
            setPromptContent(template.content);
            setExpandedTemplate(isExpanded ? null : template.id);
          }}
        >
          <View style={[styles.templateIcon, { backgroundColor: colors.tint + '15' }]}>
            <FileText size={18} color={colors.tint} />
          </View>
          <View style={styles.templateInfo}>
            <Text style={[styles.templateName, { color: colors.text }]}>
              {template.name}
            </Text>
            <Text style={[styles.templateDesc, { color: colors.icon }]} numberOfLines={1}>
              {template.description}
            </Text>
          </View>
          <View style={styles.templateMeta}>
            <View style={[styles.categoryBadge, { backgroundColor: colors.tint + '10' }]}>
              <Text style={[styles.categoryText, { color: colors.tint }]}>
                {template.category}
              </Text>
            </View>
            <ChevronDown
              size={18}
              color={colors.icon}
              style={[styles.expandIcon, isExpanded && styles.expandIconRotated]}
            />
          </View>
        </TouchableOpacity>

        {isExpanded && (
          <Animated.View entering={FadeInUp} style={styles.templateDetails}>
            <View style={styles.variablesRow}>
              <Text style={[styles.variablesLabel, { color: colors.icon }]}>
                Variables:
              </Text>
              {template.variables.map((variable, i) => (
                <View key={i} style={[styles.variableChip, { backgroundColor: colors.background }]}>
                  <Code size={10} color={colors.icon} />
                  <Text style={[styles.variableText, { color: colors.icon }]}>
                    {variable}
                  </Text>
                </View>
              ))}
            </View>

            <View style={styles.templateStats}>
              <View style={styles.templateStat}>
                <MessageSquare size={14} color={colors.icon} />
                <Text style={[styles.templateStatText, { color: colors.icon }]}>
                  {template.usage.toLocaleString()} uses
                </Text>
              </View>
              <View style={styles.templateStat}>
                <RotateCcw size={14} color={colors.icon} />
                <Text style={[styles.templateStatText, { color: colors.icon }]}>
                  Modified {template.lastModified}
                </Text>
              </View>
            </View>

            <View style={styles.templateActions}>
              <TouchableOpacity
                style={[styles.templateActionBtn, { backgroundColor: colors.tint + '15' }]}
                onPress={() => {
                  setSelectedTemplate(template);
                  setPromptContent(template.content);
                  setActiveTab('editor');
                }}
              >
                <Code size={16} color={colors.tint} />
                <Text style={[styles.templateActionText, { color: colors.tint }]}>
                  Edit
                </Text>
              </TouchableOpacity>
              <TouchableOpacity style={[styles.templateActionBtn, { backgroundColor: colors.background }]}>
                <Copy size={16} color={colors.icon} />
                <Text style={[styles.templateActionText, { color: colors.icon }]}>
                  Duplicate
                </Text>
              </TouchableOpacity>
            </View>
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
              Prompt Engineering
            </Text>
            <Text style={[styles.headerSubtitle, { color: colors.icon }]}>
              Design and test prompts
            </Text>
          </View>
        </View>
        <TouchableOpacity style={[styles.saveButton, { backgroundColor: colors.tint }]}>
          <Save size={20} color="white" />
        </TouchableOpacity>
      </View>

      {/* Tabs */}
      <View style={styles.tabContainer}>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'editor' && { backgroundColor: colors.tint }]}
          onPress={() => setActiveTab('editor')}
        >
          <Code size={16} color={activeTab === 'editor' ? 'white' : colors.icon} />
          <Text style={[styles.tabText, { color: activeTab === 'editor' ? 'white' : colors.text }]}>
            Editor
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'templates' && { backgroundColor: colors.tint }]}
          onPress={() => setActiveTab('templates')}
        >
          <FileText size={16} color={activeTab === 'templates' ? 'white' : colors.icon} />
          <Text style={[styles.tabText, { color: activeTab === 'templates' ? 'white' : colors.text }]}>
            Templates
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'versions' && { backgroundColor: colors.tint }]}
          onPress={() => setActiveTab('versions')}
        >
          <RotateCcw size={16} color={activeTab === 'versions' ? 'white' : colors.icon} />
          <Text style={[styles.tabText, { color: activeTab === 'versions' ? 'white' : colors.text }]}>
            Versions
          </Text>
        </TouchableOpacity>
      </View>

      {/* Content */}
      <ScrollView
        style={styles.content}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.contentContainer}
      >
        {activeTab === 'editor' && (
          <>
            {/* Prompt Editor */}
            <Animated.View entering={FadeInUp} style={[styles.editorCard, { backgroundColor: colors.card }]}>
              <View style={styles.editorHeader}>
                <View style={styles.editorTitleRow}>
                  <Code size={20} color={colors.tint} />
                  <Text style={[styles.editorTitle, { color: colors.text }]}>
                    {selectedTemplate?.name || 'New Prompt'}
                  </Text>
                </View>
                <View style={styles.editorActions}>
                  <TouchableOpacity onPress={copyToClipboard}>
                    {copied ? (
                      <Check size={20} color="#10B981" />
                    ) : (
                      <Copy size={20} color={colors.icon} />
                    )}
                  </TouchableOpacity>
                  <TouchableOpacity>
                    <EllipsisVertical size={20} color={colors.icon} />
                  </TouchableOpacity>
                </View>
              </View>

              <TextInput
                style={[styles.promptInput, { color: colors.text, backgroundColor: colors.background }]}
                value={promptContent}
                onChangeText={setPromptContent}
                multiline
                placeholder="Enter your prompt here..."
                placeholderTextColor={colors.icon}
                textAlignVertical="top"
              />

              <View style={styles.editorFooter}>
                <View style={styles.variablesList}>
                  <Text style={[styles.variablesTitle, { color: colors.icon }]}>
                    Variables detected:
                  </Text>
                  {selectedTemplate?.variables.map((variable, i) => (
                    <View key={i} style={[styles.detectedVariable, { backgroundColor: colors.tint + '15' }]}>
                      <Text style={[styles.detectedVariableText, { color: colors.tint }]}>
                        {'{{' + variable + '}}'}
                      </Text>
                    </View>
                  ))}
                </View>
                <Text style={[styles.charCount, { color: colors.icon }]}>
                  {promptContent.length} chars
                </Text>
              </View>
            </Animated.View>

            {/* Test Panel */}
            <Animated.View entering={FadeInUp.delay(100)} style={[styles.testCard, { backgroundColor: colors.card }]}>
              <View style={styles.testHeader}>
                <View style={styles.testTitleRow}>
                  <Terminal size={20} color="#10B981" />
                  <Text style={[styles.testTitle, { color: colors.text }]}>
                    Test Prompt
                  </Text>
                </View>
                <TouchableOpacity
                  style={[styles.testButton, { backgroundColor: colors.tint }]}
                  onPress={runTest}
                >
                  <Play size={14} color="white" />
                  <Text style={styles.testButtonText}>Run Test</Text>
                </TouchableOpacity>
              </View>

              <Text style={[styles.testLabel, { color: colors.icon }]}>
                Test Input
              </Text>
              <TextInput
                style={[styles.testInput, { color: colors.text, borderColor: colors.icon }]}
                value={testInput}
                onChangeText={setTestInput}
                placeholder="Enter test input..."
                placeholderTextColor={colors.icon}
                multiline
              />

              {testOutput && (
                <>
                  <Text style={[styles.testLabel, { color: colors.icon, marginTop: 12 }]}>
                    Output
                  </Text>
                  <View style={[styles.testOutput, { backgroundColor: colors.background }]}>
                    <Text style={[styles.testOutputText, { color: colors.text }]}>
                      {testOutput}
                    </Text>
                  </View>
                </>
              )}

              {isTesting && (
                <View style={styles.testingIndicator}>
                  <View style={[styles.testingDot, { backgroundColor: colors.tint }]} />
                  <View style={[styles.testingDot, { backgroundColor: colors.tint }]} />
                  <View style={[styles.testingDot, { backgroundColor: colors.tint }]} />
                </View>
              )}
            </Animated.View>

            {/* AI Suggestions */}
            <Animated.View entering={FadeInUp.delay(200)} style={[styles.suggestionsCard, { backgroundColor: colors.card }]}>
              <View style={styles.suggestionsHeader}>
                <Wand size={20} color="#F59E0B" />
                <Text style={[styles.suggestionsTitle, { color: colors.text }]}>
                  AI Suggestions
                </Text>
              </View>
              <View style={styles.suggestionItem}>
                <Lightbulb size={16} color="#F59E0B" />
                <Text style={[styles.suggestionText, { color: colors.text }]}>
                  Add specific examples to improve response quality
                </Text>
              </View>
              <View style={styles.suggestionItem}>
                <Zap size={16} color="#F59E0B" />
                <Text style={[styles.suggestionText, { color: colors.text }]}>
                  Include fallback behavior for edge cases
                </Text>
              </View>
              <View style={styles.suggestionItem}>
                <CircleAlert size={16} color="#F59E0B" />
                <Text style={[styles.suggestionText, { color: colors.text }]}>
                  Consider adding tone guidelines for consistency
                </Text>
              </View>
            </Animated.View>
          </>
        )}

        {activeTab === 'templates' && (
          <>
            <TouchableOpacity style={[styles.newTemplate, { backgroundColor: colors.tint + '15' }]}>
              <Plus size={20} color={colors.tint} />
              <Text style={[styles.newTemplateText, { color: colors.tint }]}>
                Create New Template
              </Text>
            </TouchableOpacity>

            {PROMPT_TEMPLATES.map((template, index) => renderTemplateCard(template, index))}
          </>
        )}

        {activeTab === 'versions' && (
          <Animated.View entering={FadeInUp} style={styles.versionsContainer}>
            <View style={[styles.versionsCard, { backgroundColor: colors.card }]}>
              <Text style={[styles.versionsTitle, { color: colors.text }]}>
                Version History
              </Text>
              {PROMPT_VERSIONS.map((version, index) => (
                <View key={version.id} style={styles.versionRow}>
                  <View style={styles.versionLeft}>
                    <View style={[styles.versionBadge, { backgroundColor: colors.tint + '15' }]}>
                      <Text style={[styles.versionBadgeText, { color: colors.tint }]}>
                        {version.version}
                      </Text>
                    </View>
                    <View style={styles.versionInfo}>
                      <Text style={[styles.versionAuthor, { color: colors.text }]}>
                        {version.author}
                      </Text>
                      <Text style={[styles.versionChanges, { color: colors.icon }]}>
                        {version.changes}
                      </Text>
                      <Text style={[styles.versionTime, { color: colors.icon }]}>
                        {version.timestamp}
                      </Text>
                    </View>
                  </View>
                  <TouchableOpacity style={[styles.restoreBtn, { backgroundColor: colors.background }]}>
                    <RotateCcw size={14} color={colors.icon} />
                    <Text style={[styles.restoreText, { color: colors.icon }]}>
                      Restore
                    </Text>
                  </TouchableOpacity>
                </View>
              ))}
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
  saveButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    alignItems: 'center',
    justifyContent: 'center',
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
  editorCard: {
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
  },
  editorHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  editorTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  editorTitle: {
    fontSize: 17,
    fontWeight: '600',
  },
  editorActions: {
    flexDirection: 'row',
    gap: 16,
  },
  promptInput: {
    borderRadius: 12,
    padding: 12,
    fontSize: 14,
    lineHeight: 20,
    minHeight: 150,
    textAlignVertical: 'top',
  },
  editorFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 12,
  },
  variablesList: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    flexWrap: 'wrap',
    flex: 1,
  },
  variablesTitle: {
    fontSize: 12,
  },
  detectedVariable: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
  },
  detectedVariableText: {
    fontSize: 11,
    fontWeight: '500',
  },
  charCount: {
    fontSize: 12,
  },
  testCard: {
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
  },
  testHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  testTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  testTitle: {
    fontSize: 17,
    fontWeight: '600',
  },
  testButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
    gap: 6,
  },
  testButtonText: {
    color: 'white',
    fontSize: 13,
    fontWeight: '600',
  },
  testLabel: {
    fontSize: 13,
    fontWeight: '500',
    marginBottom: 8,
  },
  testInput: {
    borderWidth: 1,
    borderRadius: 8,
    padding: 10,
    fontSize: 14,
    minHeight: 60,
    textAlignVertical: 'top',
  },
  testOutput: {
    borderRadius: 8,
    padding: 12,
  },
  testOutputText: {
    fontSize: 14,
    lineHeight: 20,
  },
  testingIndicator: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 6,
    paddingVertical: 16,
  },
  testingDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    opacity: 0.6,
  },
  suggestionsCard: {
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
  },
  suggestionsHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 12,
  },
  suggestionsTitle: {
    fontSize: 16,
    fontWeight: '600',
  },
  suggestionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    paddingVertical: 8,
  },
  suggestionText: {
    flex: 1,
    fontSize: 14,
  },
  newTemplate: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 14,
    borderRadius: 12,
    gap: 8,
    marginBottom: 16,
  },
  newTemplateText: {
    fontSize: 15,
    fontWeight: '600',
  },
  templateCard: {
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    borderWidth: 2,
    borderColor: 'transparent',
  },
  templateHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  templateIcon: {
    width: 44,
    height: 44,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  templateInfo: {
    flex: 1,
  },
  templateName: {
    fontSize: 15,
    fontWeight: '600',
    marginBottom: 2,
  },
  templateDesc: {
    fontSize: 12,
  },
  templateMeta: {
    alignItems: 'flex-end',
    gap: 8,
  },
  categoryBadge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 6,
  },
  categoryText: {
    fontSize: 11,
    fontWeight: '600',
  },
  expandIcon: {
    marginLeft: 8,
  },
  expandIconRotated: {
    transform: [{ rotate: '180deg' }],
  },
  templateDetails: {
    marginTop: 16,
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: '#E5E7EB',
  },
  variablesRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    flexWrap: 'wrap',
    marginBottom: 12,
  },
  variablesLabel: {
    fontSize: 12,
  },
  variableChip: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
    gap: 4,
  },
  variableText: {
    fontSize: 11,
  },
  templateStats: {
    flexDirection: 'row',
    gap: 16,
    marginBottom: 12,
  },
  templateStat: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  templateStatText: {
    fontSize: 12,
  },
  templateActions: {
    flexDirection: 'row',
    gap: 8,
  },
  templateActionBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
    gap: 6,
  },
  templateActionText: {
    fontSize: 13,
    fontWeight: '600',
  },
  versionsContainer: {
    gap: 16,
  },
  versionsCard: {
    borderRadius: 16,
    padding: 16,
  },
  versionsTitle: {
    fontSize: 17,
    fontWeight: '600',
    marginBottom: 16,
  },
  versionRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  versionLeft: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 12,
    flex: 1,
  },
  versionBadge: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 6,
  },
  versionBadgeText: {
    fontSize: 12,
    fontWeight: '700',
  },
  versionInfo: {
    flex: 1,
  },
  versionAuthor: {
    fontSize: 14,
    fontWeight: '500',
    marginBottom: 2,
  },
  versionChanges: {
    fontSize: 12,
    marginBottom: 2,
  },
  versionTime: {
    fontSize: 11,
  },
  restoreBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 6,
    gap: 4,
  },
  restoreText: {
    fontSize: 12,
    fontWeight: '500',
  },
});

}