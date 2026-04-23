 
import React, { useMemo, useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Switch,
  ActivityIndicator,
} from 'react-native';
import {
  Brain,
  MessageSquare,
  Plus,
  Play,
  Save,
  Settings,
  TrendingUp,
  Zap,
  Book,
  FileText,
  AlertCircle,
  Shield,
  Sparkles,
  Award,
  Target,
  Activity,
  Lock,
} from 'lucide-react-native';
import { useTheme } from '@/providers/ThemeProvider';
import { Stack, useRouter } from 'expo-router';
import { trpc } from '@/lib/trpc';

export default function AITrainingScreen() {
  const { theme } = useTheme();
  const router = useRouter();
  const [selectedTab, setSelectedTab] = useState<'flows' | 'knowledge' | 'rules'>('flows');
  
  // Real tRPC data
  const { data: subscription } = trpc.user.getSubscription.useQuery();
  const isEnterprise = subscription?.plan === 'enterprise';

  const { data: flowsData = [], isLoading: isLoadingFlows } = trpc.receptionist.getTrainingFlows.useQuery();
  const flows = (flowsData || []) as any[];
  const { data: statsData, isLoading: isLoadingStats } = trpc.receptionist.getTrainingStats.useQuery();
  const { data: config, isLoading: isLoadingConfig } = trpc.receptionist.getConfig.useQuery();
  
  const utils = trpc.useUtils();
  const updateConfigMutation = trpc.receptionist.saveConfig.useMutation({
    onSuccess: () => utils.receptionist.getConfig.invalidate(),
  });

  const [autoLearn, setAutoLearn] = useState<boolean>(true);
  const [safeMode, setSafeMode] = useState<boolean>(true);

  useEffect(() => {
    if (config?.config) {
      // Assuming aiConfig might be inside config object based on get-config/route.ts
      // or we just use the top level flags if they exist
      setAutoLearn(true); // Default or from config if available
      setSafeMode(true);
    }
  }, [config]);

  const stats = useMemo(() => [
    { title: 'Trained Flows', value: statsData?.trainedFlows?.toString() ?? '0', icon: MessageSquare, color: '#007AFF' },
    { title: 'Avg Confidence', value: `${statsData?.avgConfidence ?? 0}%`, icon: TrendingUp, color: '#34C759' },
    { title: 'Auto-Learned', value: statsData?.autoLearned?.toString() ?? '0', icon: Zap, color: '#FF9500' },
    { title: 'Knowledge Items', value: statsData?.knowledgeItems?.toString() ?? '0', icon: Book, color: '#AF52DE' },
  ], [statsData]);

  const evaluationScores = useMemo(() => [
    { metric: 'Intent match', value: `${statsData?.evaluations?.intentMatch ?? 0}%`, delta: '+2%', status: 'good' },
    { metric: 'Policy adherence', value: `${statsData?.evaluations?.policyAdherence ?? 0}%`, delta: 'Stable', status: 'good' },
    { metric: 'Fallbacks', value: `${statsData?.evaluations?.fallbacks ?? 0}%`, delta: '-0.4%', status: 'good' },
    { metric: 'Escalations', value: `${statsData?.evaluations?.escalations ?? 0}%`, delta: '+0.5%', status: 'watch' },
  ], [statsData]);

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]} testID="receptionist-training-screen">
      <Stack.Screen
        options={{
          title: 'AI Training',
          headerStyle: { backgroundColor: theme.colors.background },
          headerTintColor: theme.colors.text,
        }}
      />

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <Text style={[styles.title, { color: theme.colors.text }]}>AI Training</Text>
          <Text style={[styles.subtitle, { color: theme.colors.secondaryText }]}
            testID="receptionist-training-subtitle">
            Configure neural call flows, knowledge, and guardrails with live evals
          </Text>
        </View>

        <View style={styles.statsGrid}>
          {isLoadingStats ? (
            <ActivityIndicator size="small" color={theme.colors.primary} />
          ) : (
            stats.map(stat => {
              const Icon = stat.icon;
              return (
                <View
                  key={stat.title}
                  style={[styles.statCard, { backgroundColor: theme.colors.cardBackground }]}
                  testID={`receptionist-training-stat-${stat.title}`}
                >
                  <View style={[styles.statIcon, { backgroundColor: `${stat.color}20` }]}>
                    <Icon size={18} color={stat.color} />
                  </View>
                  <Text style={[styles.statValue, { color: theme.colors.text }]}>{stat.value}</Text>
                  <Text style={[styles.statTitle, { color: theme.colors.secondaryText }]}>{stat.title}</Text>
                </View>
              );
            })
          )}
        </View>

        <View style={[styles.autoLearnCard, { backgroundColor: theme.colors.cardBackground }]}
          testID="receptionist-training-autolearn">
          {!isEnterprise && (
            <TouchableOpacity 
              style={styles.lockOverlay}
              onPress={() => router.push('/enterprise-admin')}
            >
              <Lock size={20} color="white" />
            </TouchableOpacity>
          )}
          <View style={styles.autoLearnLeft}>
            <Zap size={24} color={theme.colors.primary} />
            <View style={styles.autoLearnInfo}>
              <Text style={[styles.autoLearnTitle, { color: theme.colors.text }]}>Auto-Learning</Text>
              <Text style={[styles.autoLearnText, { color: theme.colors.secondaryText }]}>AI learns from successful interactions</Text>
            </View>
          </View>
          <Switch
            value={autoLearn}
            onValueChange={value => {
              if (!isEnterprise) {
                router.push('/enterprise-admin');
                return;
              }
              setAutoLearn(value);
              updateConfigMutation.mutate({ aiConfig: { autoLearn: value } });
            }}
            trackColor={{ false: '#767577', true: theme.colors.primary }}
            thumbColor={autoLearn ? '#fff' : '#f4f3f4'}
          />
        </View>

        <View style={[styles.guardrailCard, { backgroundColor: theme.colors.cardBackground }]}
          testID="receptionist-training-guardrails">
          <View style={styles.guardrailHeader}>
            <View style={styles.guardrailTitleRow}>
              <Shield size={18} color={theme.colors.primary} />
              <Text style={[styles.guardrailTitle, { color: theme.colors.text }]}>Safe response mode</Text>
            </View>
            <Switch
              value={safeMode}
              onValueChange={value => {
                console.log('Safe response toggled', value);
                setSafeMode(value);
              }}
              trackColor={{ false: '#767577', true: theme.colors.primary }}
              thumbColor={safeMode ? '#fff' : '#f4f3f4'}
            />
          </View>
          <View style={styles.guardrailBody}>
            <View style={styles.guardrailChip}>
              <Sparkles size={14} color={theme.colors.primary} />
              <Text style={[styles.guardrailChipText, { color: theme.colors.primary }]}>PII redaction enabled</Text>
            </View>
            <View style={styles.guardrailChip}>
              <Target size={14} color={theme.colors.primary} />
              <Text style={[styles.guardrailChipText, { color: theme.colors.primary }]}>Escalate after 2 failed intents</Text>
            </View>
          </View>
        </View>

        <View style={styles.tabsContainer}>
          {[
            { id: 'flows', label: 'Conversation Flows', icon: MessageSquare },
            { id: 'knowledge', label: 'Knowledge Base', icon: Book },
            { id: 'rules', label: 'AI Rules & Limits', icon: Settings },
          ].map(tab => {
            const Icon = tab.icon;
            const isActive = selectedTab === tab.id;
            return (
              <TouchableOpacity
                key={tab.id}
                style={[
                  styles.tab,
                  { backgroundColor: isActive ? theme.colors.primary : theme.colors.cardBackground },
                ]}
                onPress={() => setSelectedTab(tab.id as typeof selectedTab)}
                testID={`receptionist-training-tab-${tab.id}`}
              >
                <Icon size={16} color={isActive ? 'white' : theme.colors.secondaryText} />
                <Text
                  style={[
                    styles.tabText,
                    { color: isActive ? 'white' : theme.colors.secondaryText },
                  ]}
                >
                  {tab.label}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>

        {selectedTab === 'flows' && (
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Conversation Flows</Text>
              <TouchableOpacity
                style={[styles.addButton, { backgroundColor: theme.colors.primary }]}
                testID="receptionist-training-add-flow"
              >
                <Plus size={18} color="white" />
                <Text style={styles.addButtonText}>Add Flow</Text>
              </TouchableOpacity>
            </View>

            {conversationFlows.map(flow => (
              <View
                key={flow.id}
                style={[styles.flowCard, { backgroundColor: theme.colors.cardBackground }]}
                testID={`receptionist-training-flow-${flow.id}`}
              >
                <View style={styles.flowHeader}>
                  <View>
                    <Text style={[styles.flowName, { color: theme.colors.text }]}>{flow.name}</Text>
                    <Text style={[styles.flowMeta, { color: theme.colors.secondaryText }]}>Trigger coverage 98%</Text>
                  </View>
                  <View style={styles.confidenceBadge}>
                    <Text style={[styles.confidenceText, { color: '#34C759' }]}>{flow.confidence}%</Text>
                  </View>
                </View>

                <View style={styles.flowSection}>
                  <Text style={[styles.flowLabel, { color: theme.colors.secondaryText }]}>Trigger Pattern</Text>
                  <View style={[styles.codeBlock, { backgroundColor: theme.colors.background }]}>
                    <Text style={[styles.codeText, { color: theme.colors.text }]}>{flow.trigger}</Text>
                  </View>
                </View>

                <View style={styles.flowSection}>
                  <Text style={[styles.flowLabel, { color: theme.colors.secondaryText }]}>AI Response</Text>
                  <Text style={[styles.flowResponse, { color: theme.colors.text }]}>{flow.response}</Text>
                </View>

                {flow.nextAction && (
                  <View style={[styles.nextActionBadge, { backgroundColor: '#007AFF20' }]}
                    testID={`receptionist-training-next-${flow.id}`}>
                    <Zap size={12} color="#007AFF" />
                    <Text style={[styles.nextActionText, { color: '#007AFF' }]}>Next: {flow.nextAction}</Text>
                  </View>
                )}

                <View style={styles.flowActions}>
                  <TouchableOpacity
                    style={[styles.flowActionButton, { backgroundColor: theme.colors.background }]}
                    testID={`receptionist-training-test-${flow.id}`}
                  >
                    <Play size={16} color={theme.colors.primary} />
                    <Text style={[styles.flowActionText, { color: theme.colors.primary }]}>Test</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={[styles.flowActionButton, { backgroundColor: theme.colors.background }]}
                    testID={`receptionist-training-edit-${flow.id}`}
                  >
                    <FileText size={16} color={theme.colors.secondaryText} />
                    <Text style={[styles.flowActionText, { color: theme.colors.secondaryText }]}>Edit</Text>
                  </TouchableOpacity>
                </View>
              </View>
            ))}
          </View>
        )}

        {selectedTab === 'knowledge' && (
          <View style={styles.section}>
            <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Knowledge Base</Text>
            <Text style={[styles.sectionDescription, { color: theme.colors.secondaryText }]}
              testID="receptionist-training-knowledge-hint">
              Add information about your business, products, and services
            </Text>

            <View style={[styles.datasetRow, { backgroundColor: theme.colors.cardBackground }]}
              testID="receptionist-training-datasets">
              <View style={styles.datasetHeader}>
                <Award size={16} color={theme.colors.primary} />
                <Text style={[styles.datasetTitle, { color: theme.colors.text }]}>Dataset versions</Text>
              </View>
              {datasetVersions.map(dataset => (
                <View key={dataset.id} style={styles.datasetItem}>
                  <View>
                    <Text style={[styles.datasetLabel, { color: theme.colors.text }]}>{dataset.label}</Text>
                    <Text style={[styles.datasetMeta, { color: theme.colors.secondaryText }]}>
                      {dataset.records} records · {dataset.trainedOn}
                    </Text>
                  </View>
                  <View
                    style={[styles.datasetStatus, {
                      backgroundColor:
                        dataset.status === 'active'
                          ? '#34C75930'
                          : dataset.status === 'training'
                          ? '#FF950030'
                          : '#8E8E9330',
                    }]}
                  >
                    <Text
                      style={[styles.datasetStatusText, {
                        color:
                          dataset.status === 'active'
                            ? '#34C759'
                            : dataset.status === 'training'
                            ? '#FF9500'
                            : '#8E8E93',
                      }]}
                    >
                      {dataset.status === 'active' && 'Active'}
                      {dataset.status === 'training' && 'Training'}
                      {dataset.status === 'archived' && 'Archived'}
                    </Text>
                  </View>
                </View>
              ))}
              <TouchableOpacity style={[styles.primaryButton, { backgroundColor: theme.colors.primary }]}
                testID="receptionist-training-train">
                <Sparkles size={16} color="white" />
                <Text style={styles.primaryButtonText}>Train new version</Text>
              </TouchableOpacity>
            </View>

            <TouchableOpacity
              style={[styles.uploadCard, { backgroundColor: theme.colors.cardBackground }]}
              testID="receptionist-training-upload"
            >
              <Book size={32} color={theme.colors.primary} />
              <Text style={[styles.uploadTitle, { color: theme.colors.text }]}>Upload Documents</Text>
              <Text style={[styles.uploadText, { color: theme.colors.secondaryText }]}>PDF, DOC, TXT files supported</Text>
            </TouchableOpacity>

            <TextInput
              style={[
                styles.textArea,
                {
                  backgroundColor: theme.colors.cardBackground,
                  color: theme.colors.text,
                  borderColor: theme.colors.border,
                },
              ]}
              placeholder="Or paste your knowledge base content here..."
              placeholderTextColor={theme.colors.secondaryText}
              multiline
              numberOfLines={8}
              textAlignVertical="top"
            />

            <TouchableOpacity
              style={[styles.saveButton, { backgroundColor: theme.colors.primary }]}
              testID="receptionist-training-save-knowledge"
            >
              <Save size={18} color="white" />
              <Text style={styles.saveButtonText}>Save Knowledge Base</Text>
            </TouchableOpacity>
          </View>
        )}

        {selectedTab === 'rules' && (
          <View style={styles.section}>
            <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>AI Rules & Limits</Text>
            <View style={styles.evaluationGrid}>
              {evaluationScores.map(score => (
                <View key={score.metric} style={[styles.evaluationCard, { backgroundColor: theme.colors.cardBackground }]}
                  testID={`receptionist-training-score-${score.metric}`}>
                  <Text style={[styles.evaluationMetric, { color: theme.colors.secondaryText }]}>{score.metric}</Text>
                  <Text style={[styles.evaluationValue, { color: theme.colors.text }]}>{score.value}</Text>
                  <Text
                    style={[styles.evaluationDelta, {
                      color: score.status === 'watch' ? '#FF9500' : '#34C759',
                    }]}
                  >
                    {score.delta}
                  </Text>
                </View>
              ))}
            </View>

            <View style={[styles.ruleCard, { backgroundColor: theme.colors.cardBackground }]}
              testID="receptionist-training-rule-duration">
              <Text style={[styles.ruleTitle, { color: theme.colors.text }]}>Call Duration Limit</Text>
              <TextInput
                style={[styles.ruleInput, { backgroundColor: theme.colors.background, color: theme.colors.text }]}
                placeholder="30 minutes"
                placeholderTextColor={theme.colors.secondaryText}
              />
            </View>

            <View style={[styles.ruleCard, { backgroundColor: theme.colors.cardBackground }]}
              testID="receptionist-training-rule-escalation">
              <Text style={[styles.ruleTitle, { color: theme.colors.text }]}>Escalation Triggers</Text>
              <TextInput
                style={[styles.ruleInput, { backgroundColor: theme.colors.background, color: theme.colors.text }]}
                placeholder="angry, frustrated, manager"
                placeholderTextColor={theme.colors.secondaryText}
              />
            </View>

            <View style={[styles.ruleCard, { backgroundColor: theme.colors.cardBackground }]}
              testID="receptionist-training-rule-fallback">
              <Text style={[styles.ruleTitle, { color: theme.colors.text }]}>Fallback Action</Text>
              <TextInput
                style={[styles.ruleInput, { backgroundColor: theme.colors.background, color: theme.colors.text }]}
                placeholder="Transfer to human agent"
                placeholderTextColor={theme.colors.secondaryText}
              />
            </View>

            <View style={[styles.infoCard, { backgroundColor: '#FF950020' }]}
              testID="receptionist-training-info">
              <AlertCircle size={20} color="#FF9500" />
              <Text style={[styles.infoText, { color: '#FF9500' }]}>Changes will be applied to new conversations immediately</Text>
            </View>
          </View>
        )}

        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>AI Lab Runs</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.labScroll}>
            {[
              { id: 'load', title: 'Load testing', detail: '1k concurrent calls · 99.98% success', icon: Activity },
              { id: 'accuracy', title: 'Accuracy audit', detail: 'Intent drift < 0.8%', icon: Brain },
              { id: 'playbook', title: 'Playbook tuning', detail: '12 flows auto-improved', icon: Sparkles },
            ].map(lab => {
              const Icon = lab.icon;
              return (
                <View key={lab.id} style={[styles.labCard, { backgroundColor: theme.colors.cardBackground }]}
                  testID={`receptionist-training-lab-${lab.id}`}>
                  <Icon size={18} color={theme.colors.primary} />
                  <Text style={[styles.labTitle, { color: theme.colors.text }]}>{lab.title}</Text>
                  <Text style={[styles.labDetail, { color: theme.colors.secondaryText }]}>{lab.detail}</Text>
                </View>
              );
            })}
          </ScrollView>
        </View>

        <View style={{ height: 32 }} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
  },
  header: {
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 16,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 14,
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: 14,
    gap: 12,
    marginBottom: 20,
  },
  statCard: {
    width: '47%',
    padding: 14,
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  statIcon: {
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  statValue: {
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 4,
  },
  statTitle: {
    fontSize: 11,
  },
  autoLearnCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginHorizontal: 20,
    padding: 16,
    borderRadius: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  autoLearnLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    gap: 12,
  },
  autoLearnInfo: {
    flex: 1,
  },
  autoLearnTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  autoLearnText: {
    fontSize: 13,
  },
  guardrailCard: {
    marginHorizontal: 20,
    padding: 16,
    borderRadius: 18,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 3,
  },
  guardrailHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  guardrailTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  guardrailTitle: {
    fontSize: 16,
    fontWeight: '600',
  },
  guardrailBody: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  guardrailChip: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
    backgroundColor: 'rgba(0,0,0,0.04)',
  },
  guardrailChipText: {
    fontSize: 12,
    fontWeight: '600',
  },
  tabsContainer: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    marginBottom: 20,
    gap: 8,
  },
  tab: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 12,
    borderRadius: 12,
    gap: 6,
  },
  tabText: {
    fontSize: 12,
    fontWeight: '600',
  },
  section: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
  },
  sectionDescription: {
    fontSize: 14,
    marginBottom: 16,
  },
  addButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    paddingHorizontal: 14,
    borderRadius: 10,
    gap: 6,
  },
  addButtonText: {
    color: 'white',
    fontSize: 14,
    fontWeight: '600',
  },
  flowCard: {
    padding: 16,
    borderRadius: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  flowHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  flowName: {
    fontSize: 18,
    fontWeight: '700',
  },
  flowMeta: {
    fontSize: 12,
    marginTop: 4,
  },
  confidenceBadge: {
    backgroundColor: '#34C75920',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 8,
  },
  confidenceText: {
    fontSize: 12,
    fontWeight: '700',
  },
  flowSection: {
    marginBottom: 12,
  },
  flowLabel: {
    fontSize: 12,
    fontWeight: '600',
    marginBottom: 6,
    textTransform: 'uppercase',
  },
  codeBlock: {
    padding: 12,
    borderRadius: 8,
  },
  codeText: {
    fontSize: 13,
    fontFamily: 'monospace',
  },
  flowResponse: {
    fontSize: 14,
    lineHeight: 20,
  },
  nextActionBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderRadius: 8,
    gap: 6,
    marginBottom: 12,
  },
  nextActionText: {
    fontSize: 12,
    fontWeight: '600',
  },
  flowActions: {
    flexDirection: 'row',
    gap: 8,
    marginTop: 8,
  },
  flowActionButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 10,
    gap: 6,
  },
  flowActionText: {
    fontSize: 14,
    fontWeight: '600',
  },
  uploadCard: {
    alignItems: 'center',
    padding: 32,
    borderRadius: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  uploadTitle: {
    fontSize: 18,
    fontWeight: '700',
    marginTop: 12,
    marginBottom: 4,
  },
  uploadText: {
    fontSize: 13,
  },
  textArea: {
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    fontSize: 14,
    marginBottom: 16,
  },
  saveButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 14,
    borderRadius: 12,
    gap: 8,
  },
  saveButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  datasetRow: {
    padding: 16,
    borderRadius: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 6,
    elevation: 2,
  },
  datasetHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 12,
  },
  datasetTitle: {
    fontSize: 16,
    fontWeight: '600',
  },
  datasetItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  datasetLabel: {
    fontSize: 15,
    fontWeight: '600',
  },
  datasetMeta: {
    fontSize: 12,
    marginTop: 4,
  },
  datasetStatus: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
  },
  datasetStatusText: {
    fontSize: 12,
    fontWeight: '600',
  },
  primaryButton: {
    marginTop: 8,
    paddingVertical: 12,
    borderRadius: 12,
    flexDirection: 'row',
    gap: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  primaryButtonText: {
    color: 'white',
    fontSize: 14,
    fontWeight: '600',
  },
  evaluationGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
    marginBottom: 16,
  },
  evaluationCard: {
    width: '47%',
    padding: 14,
    borderRadius: 14,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.06,
    shadowRadius: 6,
    elevation: 2,
  },
  evaluationMetric: {
    fontSize: 11,
    textTransform: 'uppercase',
    marginBottom: 4,
  },
  evaluationValue: {
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 4,
  },
  evaluationDelta: {
    fontSize: 12,
    fontWeight: '600',
  },
  ruleCard: {
    padding: 16,
    borderRadius: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  ruleTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 12,
  },
  ruleInput: {
    padding: 12,
    borderRadius: 10,
    fontSize: 14,
  },
  infoCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderRadius: 12,
    gap: 12,
  },
  infoText: {
    flex: 1,
    fontSize: 13,
    fontWeight: '500',
  },
  labScroll: {
    paddingVertical: 4,
  },
  labCard: {
    width: 200,
    padding: 16,
    borderRadius: 16,
    marginRight: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 3,
  },
  labTitle: {
    fontSize: 15,
    fontWeight: '700',
    marginTop: 12,
    marginBottom: 6,
  },
  labDetail: {
    fontSize: 13,
    lineHeight: 18,
  },
});
