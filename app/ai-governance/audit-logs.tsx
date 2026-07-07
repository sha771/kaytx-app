/**
 * @copyright Copyright (c) 2026 Kaytx & Antigravity Ecosystem ("kaytx")
 * @license MIT - See LICENSE file for full terms
 */

import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Stack, router } from 'expo-router';
import { 
  FileText, Clock, User, Shield, AlertTriangle, CheckCircle, 
  ArrowLeft, ChevronRight, Search, Filter, Download, Eye,
  GitBranch, Activity, Zap, Lock, Database, Brain,
  Link, Network, Hash, Fingerprint, Route, Crown,
  Settings, RefreshCw, Timeline
} from 'lucide-react-native';

interface AuditLog {
  id: string;
  timestamp: string;
  type: 'decision' | 'prompt' | 'output' | 'override' | 'violation' | 'policy';
  actor: string;
  action: string;
  details: string;
  severity: 'info' | 'warning' | 'critical';
}

const mockAuditLogs: AuditLog[] = [
  {
    id: '1',
    timestamp: '2024-01-20 14:32:15',
    type: 'decision',
    actor: 'GPT-4-Turbo',
    action: 'Model Decision',
    details: 'Approved loan application based on credit score analysis',
    severity: 'info'
  },
  {
    id: '2',
    timestamp: '2024-01-20 14:28:42',
    type: 'violation',
    actor: 'Policy Engine',
    action: 'Policy Violation Blocked',
    details: 'Blocked unauthorized data access attempt from user ID 4521',
    severity: 'critical'
  },
  {
    id: '3',
    timestamp: '2024-01-20 14:25:18',
    type: 'prompt',
    actor: 'User 8923',
    action: 'Prompt Injection Detected',
    details: 'Detected and blocked jailbreak attempt in customer service query',
    severity: 'warning'
  },
  {
    id: '4',
    timestamp: '2024-01-20 14:22:05',
    type: 'output',
    actor: 'Claude-3-Opus',
    action: 'Model Output Generated',
    details: 'Generated compliance report for Q4 2023 financial audit',
    severity: 'info'
  },
  {
    id: '5',
    timestamp: '2024-01-20 14:18:33',
    type: 'override',
    actor: 'Human Reviewer',
    action: 'Human Override Triggered',
    details: 'Manual intervention required for edge case in medical diagnosis',
    severity: 'warning'
  },
  {
    id: '6',
    timestamp: '2024-01-20 14:15:21',
    type: 'policy',
    actor: 'Policy Engine',
    action: 'Policy Enforcement',
    details: 'Applied GDPR data retention policy to customer records',
    severity: 'info'
  },
  {
    id: '7',
    timestamp: '2024-01-20 14:12:48',
    type: 'decision',
    actor: 'Llama-2-70B',
    action: 'Model Decision',
    details: 'Classified document as confidential based on content analysis',
    severity: 'info'
  },
];

const traceabilityNodes = [
  { id: '1', name: 'User Input', timestamp: '14:32:10', status: 'completed' },
  { id: '2', name: 'Policy Check', timestamp: '14:32:12', status: 'completed' },
  { id: '3', name: 'Model Inference', timestamp: '14:32:13', status: 'completed' },
  { id: '4', name: 'Safety Filter', timestamp: '14:32:14', status: 'completed' },
  { id: '5', name: 'Output Generation', timestamp: '14:32:15', status: 'completed' },
  { id: '6', name: 'Audit Logging', timestamp: '14:32:15', status: 'completed' },
];

const immutableTimeline = [
  { id: '1', event: 'Model Deployment', hash: '0x8f2a...4c1b', timestamp: '2024-01-20 14:32:15', verified: true },
  { id: '2', event: 'Policy Update', hash: '0x3d7e...9a2f', timestamp: '2024-01-20 14:28:42', verified: true },
  { id: '3', event: 'Data Access', hash: '0x1b4c...6e8d', timestamp: '2024-01-20 14:25:18', verified: true },
  { id: '4', event: 'Human Override', hash: '0x7a9f...2b3c', timestamp: '2024-01-20 14:22:05', verified: true },
];

const decisionTrace = [
  { id: '1', step: 'Input Processing', confidence: 0.98, factors: ['User Query', 'Context Window', 'Token Count'] },
  { id: '2', step: 'Policy Evaluation', confidence: 0.95, factors: ['Data Privacy', 'Access Control', 'Compliance'] },
  { id: '3', step: 'Model Selection', confidence: 0.92, factors: ['Task Type', 'Complexity', 'Resource Availability'] },
  { id: '4', step: 'Safety Check', confidence: 0.97, factors: ['Content Filter', 'Bias Detection', 'Harm Prevention'] },
  { id: '5', step: 'Output Generation', confidence: 0.94, factors: ['Accuracy', 'Relevance', 'Clarity'] },
];

export default function AuditLogsScreen() {
  const [selectedLog, setSelectedLog] = useState<AuditLog | null>(null);
  const [filterType, setFilterType] = useState<string>('all');

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'info': return '#06b6d4';
      case 'warning': return '#f59e0b';
      case 'critical': return '#ef4444';
      default: return '#9ca3af';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'decision': return <Brain size={16} color="#06b6d4" />;
      case 'prompt': return <AlertTriangle size={16} color="#f59e0b" />;
      case 'output': return <FileText size={16} color="#8b5cf6" />;
      case 'override': return <User size={16} color="#f59e0b" />;
      case 'violation': return <Shield size={16} color="#ef4444" />;
      case 'policy': return <Lock size={16} color="#10b981" />;
      default: return <Activity size={16} color="#9ca3af" />;
    }
  };

  const filteredLogs = filterType === 'all' 
    ? mockAuditLogs 
    : mockAuditLogs.filter(log => log.type === filterType);

  const AuditLogCard = ({ log }: { log: AuditLog }) => (
    <TouchableOpacity 
      style={[styles.logCard, { backgroundColor: 'rgba(10, 15, 25, 0.8)', borderLeftWidth: 3, borderLeftColor: getSeverityColor(log.severity) }]}
      onPress={() => setSelectedLog(log)}
    >
      <View style={styles.logHeader}>
        <View style={[styles.logIcon, { backgroundColor: `${getSeverityColor(log.severity)}20` }]}>
          {getTypeIcon(log.type)}
        </View>
        <View style={styles.logInfo}>
          <Text style={[styles.logAction, { color: '#f9fafb' }]}>{log.action}</Text>
          <Text style={[styles.logActor, { color: '#9ca3af' }]}>{log.actor}</Text>
        </View>
        <Text style={[styles.logTime, { color: '#6b7280' }]}>{log.timestamp.split(' ')[1]}</Text>
      </View>
      <Text style={[styles.logDetails, { color: '#9ca3af' }]}>{log.details}</Text>
      <View style={styles.logFooter}>
        <View style={[styles.logType, { backgroundColor: 'rgba(255, 255, 255, 0.05)' }]}>
          <Text style={[styles.logTypeText, { color: '#9ca3af' }]}>{log.type}</Text>
        </View>
        <ChevronRight size={20} color="#9ca3af" />
      </View>
    </TouchableOpacity>
  );

  const TraceabilityNode = ({ node, index }: { node: typeof traceabilityNodes[0], index: number }) => (
    <View style={styles.traceNode}>
      <View style={[styles.traceDot, { backgroundColor: '#10b981' }]} />
      <View style={styles.traceContent}>
        <Text style={[styles.traceName, { color: '#f9fafb' }]}>{node.name}</Text>
        <Text style={[styles.traceTime, { color: '#9ca3af' }]}>{node.timestamp}</Text>
      </View>
      {index < traceabilityNodes.length - 1 && <View style={[styles.traceLine, { backgroundColor: '#10b981' }]} />}
    </View>
  );

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: '#05070A' }]}>
      <Stack.Screen options={{ headerShown: false }} />
      
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={[styles.header, { backgroundColor: 'rgba(10, 15, 25, 0.95)', borderBottomWidth: 1, borderBottomColor: 'rgba(6, 182, 212, 0.1)' }]}>
          <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
            <ArrowLeft size={24} color="#f9fafb" />
          </TouchableOpacity>
          <View style={styles.headerTitle}>
            <Text style={[styles.headerTitleText, { color: '#f9fafb' }]}>Audit Logs</Text>
            <Text style={[styles.headerSubtitle, { color: '#9ca3af' }]}>Audit & Traceability System</Text>
          </View>
          <TouchableOpacity style={[styles.exportButton, { backgroundColor: 'rgba(6, 182, 212, 0.2)' }]}>
            <Download size={18} color="#06b6d4" />
          </TouchableOpacity>
        </View>

        {/* Executive Governance Layer */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: '#f9fafb' }]}>Executive Governance Layer</Text>
          <View style={[styles.executiveContainer, { backgroundColor: 'rgba(10, 15, 25, 0.8)', borderColor: 'rgba(6, 182, 212, 0.2)' }]}>
            <View style={styles.executiveHeader}>
              <View style={styles.executiveProfile}>
                <View style={[styles.executiveAvatar, { backgroundColor: 'rgba(6, 182, 212, 0.2)' }]}>
                  <Crown size={28} color="#06b6d4" />
                </View>
                <View style={styles.executiveInfo}>
                  <Text style={[styles.executiveName, { color: '#f9fafb' }]}>Audit & Traceability Control</Text>
                  <Text style={[styles.executiveRole, { color: '#9ca3af' }]}>Enterprise Decision Trace System</Text>
                </View>
              </View>
              <View style={[styles.executiveBadge, { backgroundColor: 'rgba(16, 185, 129, 0.2)' }]}>
                <Text style={[styles.executiveBadgeText, { color: '#10b981' }]}>VERIFIED</Text>
              </View>
            </View>
            <View style={styles.executiveMetrics}>
              <View style={styles.executiveMetric}>
                <Text style={[styles.executiveMetricValue, { color: '#06b6d4' }]}>1.2M</Text>
                <Text style={[styles.executiveMetricLabel, { color: '#9ca3af' }]}>Total Logs</Text>
              </View>
              <View style={styles.executiveMetric}>
                <Text style={[styles.executiveMetricValue, { color: '#10b981' }]}>99.8%</Text>
                <Text style={[styles.executiveMetricLabel, { color: '#9ca3af' }]}>Traceability</Text>
              </View>
              <View style={styles.executiveMetric}>
                <Text style={[styles.executiveMetricValue, { color: '#8b5cf6' }]}>48.2K</Text>
                <Text style={[styles.executiveMetricLabel, { color: '#9ca3af' }]}>Decisions</Text>
              </View>
              <View style={styles.executiveMetric}>
                <Text style={[styles.executiveMetricValue, { color: '#f59e0b' }]}>12</Text>
                <Text style={[styles.executiveMetricLabel, { color: '#9ca3af' }]}>Overrides</Text>
              </View>
            </View>
          </View>
        </View>

        {/* Decision Trace Graph */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: '#f9fafb' }]}>Decision Trace Graph</Text>
          <View style={[styles.traceContainer, { backgroundColor: 'rgba(10, 15, 25, 0.8)', borderColor: 'rgba(6, 182, 212, 0.2)' }]}>
            <View style={styles.traceGraph}>
              {decisionTrace.map((item, index) => (
                <View key={item.id} style={styles.traceStep}>
                  <View style={styles.traceStepHeader}>
                    <View style={[styles.traceStepDot, { backgroundColor: '#06b6d4' }]} />
                    <Text style={[styles.traceStepName, { color: '#f9fafb' }]}>{item.step}</Text>
                    <Text style={[styles.traceStepConfidence, { color: '#10b981' }]}>{(item.confidence * 100).toFixed(0)}%</Text>
                  </View>
                  <View style={styles.traceStepFactors}>
                    {item.factors.map((factor, fIndex) => (
                      <View key={fIndex} style={[styles.traceFactorTag, { backgroundColor: 'rgba(139, 92, 246, 0.2)' }]}>
                        <Text style={[styles.traceFactorText, { color: '#8b5cf6' }]}>{factor}</Text>
                      </View>
                    ))}
                  </View>
                  {index < decisionTrace.length - 1 && <View style={[styles.traceConnector, { backgroundColor: '#06b6d4' }]} />}
                </View>
              ))}
            </View>
          </View>
        </View>

        {/* Audit Overview */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: '#f9fafb' }]}>Audit Overview</Text>
          <View style={[styles.overviewContainer, { backgroundColor: 'rgba(10, 15, 25, 0.8)', borderColor: 'rgba(6, 182, 212, 0.2)' }]}>
            <View style={styles.overviewMetrics}>
              <View style={styles.overviewMetric}>
                <View style={[styles.overviewIcon, { backgroundColor: 'rgba(6, 182, 212, 0.2)' }]}>
                  <FileText size={32} color="#06b6d4" />
                </View>
                <Text style={[styles.overviewValue, { color: '#06b6d4' }]}>1.2M</Text>
                <Text style={[styles.overviewLabel, { color: '#9ca3af' }]}>Total Logs</Text>
              </View>
              <View style={styles.overviewMetric}>
                <View style={[styles.overviewIcon, { backgroundColor: 'rgba(16, 185, 129, 0.2)' }]}>
                  <CheckCircle size={32} color="#10b981" />
                </View>
                <Text style={[styles.overviewValue, { color: '#10b981' }]}>99.8%</Text>
                <Text style={[styles.overviewLabel, { color: '#9ca3af' }]}>Audit Coverage</Text>
              </View>
              <View style={styles.overviewMetric}>
                <View style={[styles.overviewIcon, { backgroundColor: 'rgba(245, 158, 11, 0.2)' }]}>
                  <AlertTriangle size={32} color="#f59e0b" />
                </View>
                <Text style={[styles.overviewValue, { color: '#f59e0b' }]}>48</Text>
                <Text style={[styles.overviewLabel, { color: '#9ca3af' }]}>Violations</Text>
              </View>
            </View>
          </View>
        </View>

        {/* Filters */}
        <View style={styles.section}>
          <View style={styles.filterContainer}>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.filterScroll}>
              {['all', 'decision', 'prompt', 'output', 'override', 'violation', 'policy'].map((type) => (
                <TouchableOpacity
                  key={type}
                  style={[styles.filterChip, filterType === type && { backgroundColor: 'rgba(6, 182, 212, 0.2)' }]}
                  onPress={() => setFilterType(type)}
                >
                  <Text style={[styles.filterChipText, { color: filterType === type ? '#06b6d4' : '#9ca3af' }]}>
                    {type.charAt(0).toUpperCase() + type.slice(1)}
                  </Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>
        </View>

        {/* Traceability Path */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: '#f9fafb' }]}>Decision Traceability Path</Text>
          <View style={[styles.traceContainer, { backgroundColor: 'rgba(10, 15, 25, 0.8)', borderColor: 'rgba(6, 182, 212, 0.2)' }]}>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.traceScroll}>
              {traceabilityNodes.map((node, index) => (
                <View key={node.id} style={styles.traceStage}>
                  <TraceabilityNode node={node} index={index} />
                </View>
              ))}
            </ScrollView>
          </View>
        </View>

        {/* Audit Logs */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={[styles.sectionTitle, { color: '#f9fafb' }]}>Recent Audit Logs</Text>
            <TouchableOpacity style={[styles.searchButton, { backgroundColor: 'rgba(6, 182, 212, 0.2)' }]}>
              <Search size={16} color="#06b6d4" />
              <Text style={[styles.searchButtonText, { color: '#06b6d4' }]}>Search</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.logsGrid}>
            {filteredLogs.map(log => (
              <AuditLogCard key={log.id} log={log} />
            ))}
          </View>
        </View>

        {/* Explainability Path */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: '#f9fafb' }]}>Explainability Path</Text>
          <View style={[styles.explainContainer, { backgroundColor: 'rgba(10, 15, 25, 0.8)', borderColor: 'rgba(6, 182, 212, 0.2)' }]}>
            <View style={styles.explainRow}>
              <View style={[styles.explainIcon, { backgroundColor: 'rgba(6, 182, 212, 0.2)' }]}>
                <Database size={20} color="#06b6d4" />
              </View>
              <View style={styles.explainInfo}>
                <Text style={[styles.explainTitle, { color: '#f9fafb' }]}>Data Sources</Text>
                <Text style={[styles.explainValue, { color: '#9ca3af' }]}>Enterprise Corpus v3.2, Customer Records</Text>
              </View>
            </View>
            <View style={styles.explainRow}>
              <View style={[styles.explainIcon, { backgroundColor: 'rgba(139, 92, 246, 0.2)' }]}>
                <Brain size={20} color="#8b5cf6" />
              </View>
              <View style={styles.explainInfo}>
                <Text style={[styles.explainTitle, { color: '#f9fafb' }]}>Model Used</Text>
                <Text style={[styles.explainValue, { color: '#9ca3af' }]}>GPT-4-Turbo v2.4.1 (96.8% confidence)</Text>
              </View>
            </View>
            <View style={styles.explainRow}>
              <View style={[styles.explainIcon, { backgroundColor: 'rgba(16, 185, 129, 0.2)' }]}>
                <Shield size={20} color="#10b981" />
              </View>
              <View style={styles.explainInfo}>
                <Text style={[styles.explainTitle, { color: '#f9fafb' }]}>Policy Applied</Text>
                <Text style={[styles.explainValue, { color: '#9ca3af' }]}>EU AI Act, GDPR Data Retention</Text>
              </View>
            </View>
            <View style={styles.explainRow}>
              <View style={[styles.explainIcon, { backgroundColor: 'rgba(245, 158, 11, 0.2)' }]}>
                <GitBranch size={20} color="#f59e0b" />
              </View>
              <View style={styles.explainInfo}>
                <Text style={[styles.explainTitle, { color: '#f9fafb' }]}>Decision Factors</Text>
                <Text style={[styles.explainValue, { color: '#9ca3af' }]}>Credit Score (45%), Payment History (30%), Income (25%)</Text>
              </View>
            </View>
          </View>
        </View>

        {/* Governance Audit Ledger */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: '#f9fafb' }]}>Governance Audit Ledger</Text>
          <View style={[styles.ledgerContainer, { backgroundColor: 'rgba(10, 15, 25, 0.8)', borderColor: 'rgba(6, 182, 212, 0.2)' }]}>
            <View style={styles.ledgerRow}>
              <Text style={[styles.ledgerLabel, { color: '#9ca3af' }]}>Audit Trail Hash</Text>
              <Text style={[styles.ledgerValue, { color: '#06b6d4' }]}>0x8f2a...4c1b</Text>
            </View>
            <View style={styles.ledgerRow}>
              <Text style={[styles.ledgerLabel, { color: '#9ca3af' }]}>Immutable Storage</Text>
              <Text style={[styles.ledgerValue, { color: '#10b981' }]}>Verified</Text>
            </View>
            <View style={styles.ledgerRow}>
              <Text style={[styles.ledgerLabel, { color: '#9ca3af' }]}>Retention Period</Text>
              <Text style={[styles.ledgerValue, { color: '#f9faff' }]}>7 years</Text>
            </View>
            <View style={styles.ledgerRow}>
              <Text style={[styles.ledgerLabel, { color: '#9ca3af' }]}>Compliance Status</Text>
              <Text style={[styles.ledgerValue, { color: '#10b981' }]}>SOC2 Type II</Text>
            </View>
          </View>
        </View>

        {/* Immutable Audit Timeline */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: '#f9fafb' }]}>Immutable Audit Timeline</Text>
          <View style={[styles.immutableContainer, { backgroundColor: 'rgba(10, 15, 25, 0.8)', borderColor: 'rgba(6, 182, 212, 0.2)' }]}>
            {immutableTimeline.map(item => (
              <View key={item.id} style={[styles.immutableRow, { backgroundColor: 'rgba(255, 255, 255, 0.02)' }]}>
                <View style={styles.immutableEvent}>
                  <View style={[styles.immutableIcon, { backgroundColor: 'rgba(6, 182, 212, 0.2)' }]}>
                    <Hash size={16} color="#06b6d4" />
                  </View>
                  <View style={styles.immutableInfo}>
                    <Text style={[styles.immutableEventName, { color: '#f9fafb' }]}>{item.event}</Text>
                    <Text style={[styles.immutableHash, { color: '#9ca3af' }]}>{item.hash}</Text>
                  </View>
                </View>
                <View style={styles.immutableMeta}>
                  <Text style={[styles.immutableTimestamp, { color: '#9ca3af' }]}>{item.timestamp.split(' ')[1]}</Text>
                  {item.verified && <Fingerprint size={14} color="#10b981" />}
                </View>
              </View>
            ))}
          </View>
        </View>

        {/* Decision Trace Graph */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: '#f9fafb' }]}>Decision Trace Graph</Text>
          <View style={[styles.traceGraphContainer, { backgroundColor: 'rgba(10, 15, 25, 0.8)', borderColor: 'rgba(6, 182, 212, 0.2)' }]}>
            {decisionTrace.map((step, index) => (
              <View key={step.id} style={styles.traceGraphRow}>
                <View style={styles.traceGraphStep}>
                  <View style={[styles.traceGraphDot, { backgroundColor: step.confidence > 0.95 ? '#10b981' : step.confidence > 0.90 ? '#06b6d4' : '#f59e0b' }]} />
                  <View style={styles.traceGraphContent}>
                    <Text style={[styles.traceGraphStepName, { color: '#f9fafb' }]}>{step.step}</Text>
                    <Text style={[styles.traceGraphConfidence, { color: step.confidence > 0.95 ? '#10b981' : step.confidence > 0.90 ? '#06b6d4' : '#f59e0b' }]}>
                      {Math.round(step.confidence * 100)}% confidence
                    </Text>
                  </View>
                </View>
                <View style={styles.traceGraphFactors}>
                  {step.factors.map((factor, fIndex) => (
                    <View key={fIndex} style={[styles.traceFactor, { backgroundColor: 'rgba(139, 92, 246, 0.2)' }]}>
                      <Text style={[styles.traceFactorText, { color: '#9ca3af' }]}>{factor}</Text>
                    </View>
                  ))}
                </View>
              </View>
            ))}
          </View>
        </View>

        <View style={{ height: 40 }} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    padding: 20,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
    marginBottom: 24,
    borderRadius: 16,
  },
  backButton: {
    marginRight: 16,
  },
  headerTitle: {
    flex: 1,
  },
  headerTitleText: {
    fontSize: 22,
    fontWeight: '800',
    letterSpacing: -0.5,
  },
  headerSubtitle: {
    fontSize: 13,
    fontWeight: '500',
    marginTop: 4,
  },
  exportButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  section: {
    marginBottom: 32,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    letterSpacing: -0.5,
  },
  executiveContainer: {
    padding: 20,
    borderRadius: 16,
    borderWidth: 1,
    marginBottom: 20,
  },
  executiveHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  executiveProfile: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  executiveAvatar: {
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
  },
  executiveInfo: {
    flex: 1,
  },
  executiveName: {
    fontSize: 16,
    fontWeight: '700',
    marginBottom: 4,
  },
  executiveRole: {
    fontSize: 12,
    fontWeight: '500',
  },
  executiveBadge: {
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 20,
  },
  executiveBadgeText: {
    fontSize: 12,
    fontWeight: '700',
    letterSpacing: 1,
  },
  executiveMetrics: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  executiveMetric: {
    alignItems: 'center',
    flex: 1,
  },
  executiveMetricValue: {
    fontSize: 24,
    fontWeight: '800',
    marginBottom: 4,
  },
  executiveMetricLabel: {
    fontSize: 11,
    fontWeight: '500',
    textTransform: 'uppercase',
  },
  traceContainer: {
    padding: 20,
    borderRadius: 16,
    borderWidth: 1,
    marginBottom: 20,
  },
  traceGraph: {
    gap: 16,
  },
  traceStep: {
    position: 'relative',
  },
  traceStepHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 8,
  },
  traceStepDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
  },
  traceStepName: {
    fontSize: 14,
    fontWeight: '600',
    flex: 1,
  },
  traceStepConfidence: {
    fontSize: 12,
    fontWeight: '700',
  },
  traceStepFactors: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginLeft: 24,
  },
  traceFactorTag: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  traceFactorText: {
    fontSize: 11,
    fontWeight: '500',
  },
  traceConnector: {
    position: 'absolute',
    left: 5,
    top: 24,
    width: 2,
    height: 40,
  },
  searchButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 8,
  },
  searchButtonText: {
    fontSize: 13,
    fontWeight: '600',
  },
  overviewContainer: {
    padding: 24,
    borderRadius: 16,
    borderWidth: 1,
  },
  overviewMetrics: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  overviewMetric: {
    alignItems: 'center',
    flex: 1,
  },
  overviewIcon: {
    width: 64,
    height: 64,
    borderRadius: 32,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  overviewValue: {
    fontSize: 28,
    fontWeight: '800',
    marginBottom: 4,
  },
  overviewLabel: {
    fontSize: 12,
    fontWeight: '500',
    textTransform: 'uppercase',
  },
  filterContainer: {
    marginBottom: 16,
  },
  filterScroll: {
    flexDirection: 'row',
  },
  filterChip: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 20,
    marginRight: 8,
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
  },
  filterChipText: {
    fontSize: 13,
    fontWeight: '600',
  },
  traceContainer: {
    padding: 20,
    borderRadius: 16,
    borderWidth: 1,
  },
  traceScroll: {
    flexDirection: 'row',
  },
  traceStage: {
    marginRight: 20,
  },
  traceNode: {
    alignItems: 'center',
    width: 100,
  },
  traceDot: {
    width: 16,
    height: 16,
    borderRadius: 8,
    marginBottom: 8,
  },
  traceLine: {
    position: 'absolute',
    top: 8,
    right: -20,
    width: 40,
    height: 2,
  },
  traceContent: {
    alignItems: 'center',
  },
  traceName: {
    fontSize: 11,
    fontWeight: '600',
    marginBottom: 2,
  },
  traceTime: {
    fontSize: 10,
    fontWeight: '400',
  },
  logsGrid: {
    gap: 12,
  },
  logCard: {
    padding: 16,
    borderRadius: 12,
  },
  logHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  logIcon: {
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  logInfo: {
    flex: 1,
  },
  logAction: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 2,
  },
  logActor: {
    fontSize: 12,
    fontWeight: '400',
  },
  logTime: {
    fontSize: 11,
    fontWeight: '500',
  },
  logDetails: {
    fontSize: 13,
    fontWeight: '400',
    marginBottom: 12,
    lineHeight: 18,
  },
  logFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: 'rgba(255, 255, 255, 0.1)',
  },
  logType: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 20,
  },
  logTypeText: {
    fontSize: 11,
    fontWeight: '600',
    textTransform: 'capitalize',
  },
  explainContainer: {
    padding: 20,
    borderRadius: 16,
    borderWidth: 1,
    gap: 16,
  },
  explainRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  explainIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  explainInfo: {
    flex: 1,
  },
  explainTitle: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 4,
  },
  explainValue: {
    fontSize: 12,
    fontWeight: '400',
  },
  ledgerContainer: {
    padding: 20,
    borderRadius: 16,
    borderWidth: 1,
    gap: 16,
  },
  ledgerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 255, 255, 0.05)',
  },
  ledgerLabel: {
    fontSize: 13,
    fontWeight: '500',
  },
  ledgerValue: {
    fontSize: 14,
    fontWeight: '700',
  },
  immutableContainer: {
    padding: 16,
    borderRadius: 16,
    borderWidth: 1,
    gap: 12,
  },
  immutableRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
  immutableEvent: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  immutableIcon: {
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  immutableInfo: {
    flex: 1,
  },
  immutableEventName: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 4,
  },
  immutableHash: {
    fontSize: 12,
    fontWeight: '500',
  },
  immutableMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  immutableTimestamp: {
    fontSize: 12,
    fontWeight: '500',
  },
  traceGraphContainer: {
    padding: 16,
    borderRadius: 16,
    borderWidth: 1,
    gap: 16,
  },
  traceGraphRow: {
    gap: 12,
  },
  traceGraphStep: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  traceGraphDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
  },
  traceGraphContent: {
    flex: 1,
  },
  traceGraphStepName: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 4,
  },
  traceGraphConfidence: {
    fontSize: 12,
    fontWeight: '500',
  },
  traceGraphFactors: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginLeft: 24,
  },
  traceFactor: {
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 20,
  },
  traceFactorText: {
    fontSize: 11,
    fontWeight: '500',
  },
});
