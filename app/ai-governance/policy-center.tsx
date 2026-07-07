/**
 * @copyright Copyright (c) 2026 Kaytx & Antigravity Ecosystem ("kaytx")
 * @license MIT - See LICENSE file for full terms
 */

import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Stack, router } from 'expo-router';
import { 
  FileCheck, Shield, Globe, AlertTriangle, CheckCircle, 
  ArrowLeft, ChevronRight, Scale, Gavel, BookOpen,
  Lock, Eye, TrendingUp, Activity, Zap, Layers,
  BarChart3, Target, Award, Ban, ShieldAlert, Network,
  Crown, FileText, Settings, Clock
} from 'lucide-react-native';

interface Policy {
  id: string;
  name: string;
  category: string;
  status: 'active' | 'draft' | 'deprecated';
  enforcementRate: number;
  violationsBlocked: number;
  lastUpdated: string;
}

interface ComplianceFramework {
  id: string;
  name: string;
  status: 'compliant' | 'partial' | 'non-compliant';
  score: number;
  requirements: number;
  met: number;
}

const mockPolicies: Policy[] = [
  {
    id: '1',
    name: 'EU AI Act Compliance',
    category: 'Regulatory',
    status: 'active',
    enforcementRate: 98.2,
    violationsBlocked: 18420,
    lastUpdated: '2024-01-20'
  },
  {
    id: '2',
    name: 'ISO 27001 AI Security',
    category: 'Security',
    status: 'active',
    enforcementRate: 96.8,
    violationsBlocked: 12450,
    lastUpdated: '2024-01-18'
  },
  {
    id: '3',
    name: 'SOC2 AI Controls',
    category: 'Compliance',
    status: 'active',
    enforcementRate: 94.5,
    violationsBlocked: 8920,
    lastUpdated: '2024-01-15'
  },
  {
    id: '4',
    name: 'Ethical AI Guidelines',
    category: 'Ethics',
    status: 'active',
    enforcementRate: 92.1,
    violationsBlocked: 6780,
    lastUpdated: '2024-01-12'
  },
];

const complianceFrameworks: ComplianceFramework[] = [
  {
    id: '1',
    name: 'EU AI Act',
    status: 'compliant',
    score: 98,
    requirements: 42,
    met: 42
  },
  {
    id: '2',
    name: 'ISO 27001',
    status: 'compliant',
    score: 96,
    requirements: 114,
    met: 110
  },
  {
    id: '3',
    name: 'SOC2 Type II',
    status: 'partial',
    score: 89,
    requirements: 63,
    met: 56
  },
  {
    id: '4',
    name: 'GDPR AI',
    status: 'compliant',
    score: 95,
    requirements: 28,
    met: 27
  },
];

const violationTimeline = [
  { id: '1', date: 'Jan 20', violations: 12, blocked: 118 },
  { id: '2', date: 'Jan 19', violations: 8, blocked: 95 },
  { id: '3', date: 'Jan 18', violations: 15, blocked: 142 },
  { id: '4', date: 'Jan 17', violations: 6, blocked: 78 },
  { id: '5', date: 'Jan 16', violations: 10, blocked: 105 },
  { id: '6', date: 'Jan 15', violations: 9, blocked: 92 },
  { id: '7', date: 'Jan 14', violations: 14, blocked: 128 },
];

const policyEnforcementData = [
  { id: '1', policy: 'Data Privacy', enforced: 18420, attempted: 18650, rate: 98.8 },
  { id: '2', policy: 'Content Safety', enforced: 12450, attempted: 12800, rate: 97.3 },
  { id: '3', policy: 'Access Control', enforced: 8920, attempted: 9200, rate: 97.0 },
  { id: '4', policy: 'Audit Trail', enforced: 6780, attempted: 7100, rate: 95.5 },
];

const ethicalGuardrails = [
  { id: '1', name: 'Bias Detection', status: 'active', score: 94, violations: 12 },
  { id: '2', name: 'Harm Prevention', status: 'active', score: 96, violations: 8 },
  { id: '3', name: 'Fairness Checks', status: 'active', score: 92, violations: 15 },
  { id: '4', name: 'Transparency', status: 'review', score: 88, violations: 22 },
];

const restrictedUseCases = [
  { id: '1', name: 'Medical Diagnosis', status: 'restricted', approvals: 42, denials: 8 },
  { id: '2', name: 'Legal Advice', status: 'restricted', approvals: 28, denials: 12 },
  { id: '3', name: 'Financial Trading', status: 'monitored', approvals: 156, denials: 24 },
  { id: '4', name: 'Public Safety', status: 'restricted', approvals: 18, denials: 5 },
];

export default function PolicyCenterScreen() {
  const [selectedPolicy, setSelectedPolicy] = useState<Policy | null>(null);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return '#10b981';
      case 'draft': return '#8b5cf6';
      case 'deprecated': return '#ef4444';
      default: return '#9ca3af';
    }
  };

  const getComplianceColor = (status: string) => {
    switch (status) {
      case 'compliant': return '#10b981';
      case 'partial': return '#f59e0b';
      case 'non-compliant': return '#ef4444';
      default: return '#9ca3af';
    }
  };

  const PolicyCard = ({ policy }: { policy: Policy }) => (
    <TouchableOpacity 
      style={[styles.policyCard, { backgroundColor: 'rgba(10, 15, 25, 0.8)', borderColor: `${getStatusColor(policy.status)}30` }]}
      onPress={() => setSelectedPolicy(policy)}
    >
      <View style={styles.policyHeader}>
        <View style={[styles.policyIcon, { backgroundColor: `${getStatusColor(policy.status)}20` }]}>
          <FileCheck size={24} color={getStatusColor(policy.status)} />
        </View>
        <View style={styles.policyInfo}>
          <Text style={[styles.policyName, { color: '#f9fafb' }]}>{policy.name}</Text>
          <Text style={[styles.policyCategory, { color: '#9ca3af' }]}>{policy.category}</Text>
        </View>
        <View style={[styles.policyStatus, { backgroundColor: `${getStatusColor(policy.status)}20` }]}>
          <Text style={[styles.policyStatusText, { color: getStatusColor(policy.status) }]}>{policy.status}</Text>
        </View>
      </View>
      <View style={styles.policyMetrics}>
        <View style={styles.policyMetric}>
          <Text style={[styles.metricLabel, { color: '#9ca3af' }]}>Enforcement Rate</Text>
          <Text style={[styles.metricValue, { color: '#f9fafb' }]}>{policy.enforcementRate}%</Text>
        </View>
        <View style={styles.policyMetric}>
          <Text style={[styles.metricLabel, { color: '#9ca3af' }]}>Violations Blocked</Text>
          <Text style={[styles.metricValue, { color: '#f9fafb' }]}>{policy.violationsBlocked.toLocaleString()}</Text>
        </View>
        <View style={styles.policyMetric}>
          <Text style={[styles.metricLabel, { color: '#9ca3af' }]}>Last Updated</Text>
          <Text style={[styles.metricValue, { color: '#f9fafb' }]}>{policy.lastUpdated}</Text>
        </View>
      </View>
      <View style={styles.policyFooter}>
        <ChevronRight size={20} color="#9ca3af" />
      </View>
    </TouchableOpacity>
  );

  const FrameworkCard = ({ framework }: { framework: ComplianceFramework }) => (
    <View style={[styles.frameworkCard, { backgroundColor: 'rgba(10, 15, 25, 0.8)', borderColor: `${getComplianceColor(framework.status)}30` }]}>
      <View style={styles.frameworkHeader}>
        <View style={[styles.frameworkIcon, { backgroundColor: `${getComplianceColor(framework.status)}20` }]}>
          <Scale size={24} color={getComplianceColor(framework.status)} />
        </View>
        <View style={styles.frameworkInfo}>
          <Text style={[styles.frameworkName, { color: '#f9fafb' }]}>{framework.name}</Text>
          <Text style={[styles.frameworkStatus, { color: getComplianceColor(framework.status) }]}>{framework.status}</Text>
        </View>
        <View style={styles.frameworkScore}>
          <Text style={[styles.scoreValue, { color: getComplianceColor(framework.status) }]}>{framework.score}%</Text>
        </View>
      </View>
      <View style={styles.frameworkProgress}>
        <View style={styles.progressInfo}>
          <Text style={[styles.progressLabel, { color: '#9ca3af' }]}>Requirements Met</Text>
          <Text style={[styles.progressValue, { color: '#f9fafb' }]}>{framework.met}/{framework.requirements}</Text>
        </View>
        <View style={[styles.progressBar, { backgroundColor: 'rgba(255, 255, 255, 0.1)' }]}>
          <View style={[styles.progressFill, { width: `${(framework.met / framework.requirements) * 100}%`, backgroundColor: getComplianceColor(framework.status) }]} />
        </View>
      </View>
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
            <Text style={[styles.headerTitleText, { color: '#f9fafb' }]}>Policy Center</Text>
            <Text style={[styles.headerSubtitle, { color: '#9ca3af' }]}>Policy & Compliance Engine</Text>
          </View>
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
                  <Text style={[styles.executiveName, { color: '#f9fafb' }]}>Policy & Compliance Control</Text>
                  <Text style={[styles.executiveRole, { color: '#9ca3af' }]}>Enterprise Policy Enforcement Engine</Text>
                </View>
              </View>
              <View style={[styles.executiveBadge, { backgroundColor: 'rgba(16, 185, 129, 0.2)' }]}>
                <Text style={[styles.executiveBadgeText, { color: '#10b981' }]}>ENFORCED</Text>
              </View>
            </View>
            <View style={styles.executiveMetrics}>
              <View style={styles.executiveMetric}>
                <Text style={[styles.executiveMetricValue, { color: '#06b6d4' }]}>1,284</Text>
                <Text style={[styles.executiveMetricLabel, { color: '#9ca3af' }]}>Active Policies</Text>
              </View>
              <View style={styles.executiveMetric}>
                <Text style={[styles.executiveMetricValue, { color: '#10b981' }]}>97.4%</Text>
                <Text style={[styles.executiveMetricLabel, { color: '#9ca3af' }]}>Compliance Rate</Text>
              </View>
              <View style={styles.executiveMetric}>
                <Text style={[styles.executiveMetricValue, { color: '#8b5cf6' }]}>18.4K</Text>
                <Text style={[styles.executiveMetricLabel, { color: '#9ca3af' }]}>Violations Blocked</Text>
              </View>
              <View style={styles.executiveMetric}>
                <Text style={[styles.executiveMetricValue, { color: '#f59e0b' }]}>48</Text>
                <Text style={[styles.executiveMetricLabel, { color: '#9ca3af' }]}>Policy Gaps</Text>
              </View>
            </View>
          </View>
        </View>

        {/* Compliance Overview */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: '#f9fafb' }]}>Compliance Overview</Text>
          <View style={[styles.overviewContainer, { backgroundColor: 'rgba(10, 15, 25, 0.8)', borderColor: 'rgba(6, 182, 212, 0.2)' }]}>
            <View style={styles.overviewMetrics}>
              <View style={styles.overviewMetric}>
                <View style={[styles.overviewIcon, { backgroundColor: 'rgba(16, 185, 129, 0.2)' }]}>
                  <CheckCircle size={32} color="#10b981" />
                </View>
                <Text style={[styles.overviewValue, { color: '#10b981' }]}>97.4%</Text>
                <Text style={[styles.overviewLabel, { color: '#9ca3af' }]}>Overall Compliance</Text>
              </View>
              <View style={styles.overviewMetric}>
                <View style={[styles.overviewIcon, { backgroundColor: 'rgba(6, 182, 212, 0.2)' }]}>
                  <Shield size={32} color="#06b6d4" />
                </View>
                <Text style={[styles.overviewValue, { color: '#06b6d4' }]}>1,284</Text>
                <Text style={[styles.overviewLabel, { color: '#9ca3af' }]}>Active Policies</Text>
              </View>
              <View style={styles.overviewMetric}>
                <View style={[styles.overviewIcon, { backgroundColor: 'rgba(245, 158, 11, 0.2)' }]}>
                  <AlertTriangle size={32} color="#f59e0b" />
                </View>
                <Text style={[styles.overviewValue, { color: '#f59e0b' }]}>48</Text>
                <Text style={[styles.overviewLabel, { color: '#9ca3af' }]}>Open Violations</Text>
              </View>
            </View>
          </View>
        </View>

        {/* Compliance Frameworks */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: '#f9fafb' }]}>Compliance Frameworks</Text>
          <View style={styles.frameworksGrid}>
            {complianceFrameworks.map(framework => (
              <FrameworkCard key={framework.id} framework={framework} />
            ))}
          </View>
        </View>

        {/* Active Policies */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={[styles.sectionTitle, { color: '#f9fafb' }]}>Active Policies</Text>
            <TouchableOpacity style={[styles.addButton, { backgroundColor: 'rgba(6, 182, 212, 0.2)' }]}>
              <Text style={[styles.addButtonText, { color: '#06b6d4' }]}>+ Add Policy</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.policiesGrid}>
            {mockPolicies.map(policy => (
              <PolicyCard key={policy.id} policy={policy} />
            ))}
          </View>
        </View>

        {/* Violation Timeline */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: '#f9fafb' }]}>Violation Timeline</Text>
          <View style={[styles.timelineContainer, { backgroundColor: 'rgba(10, 15, 25, 0.8)', borderColor: 'rgba(6, 182, 212, 0.2)' }]}>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.timelineScroll}>
              {violationTimeline.map((item, index) => (
                <View key={item.id} style={styles.timelineItem}>
                  <View style={[styles.timelineBar, { height: 40 + (item.violations * 4), backgroundColor: item.violations > 10 ? '#ef4444' : item.violations > 7 ? '#f59e0b' : '#10b981' }]} />
                  <Text style={[styles.timelineDate, { color: '#9ca3af' }]}>{item.date}</Text>
                  <Text style={[styles.timelineCount, { color: '#f9fafb' }]}>{item.violations}</Text>
                </View>
              ))}
            </ScrollView>
          </View>
        </View>

        {/* Rule Coverage Matrix */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: '#f9fafb' }]}>Rule Coverage Matrix</Text>
          <View style={[styles.matrixContainer, { backgroundColor: 'rgba(10, 15, 25, 0.8)', borderColor: 'rgba(6, 182, 212, 0.2)' }]}>
            <View style={styles.matrixRow}>
              <Text style={[styles.matrixLabel, { color: '#9ca3af' }]}>Data Privacy</Text>
              <View style={[styles.matrixBar, { backgroundColor: 'rgba(16, 185, 129, 0.2)' }]}>
                <View style={[styles.matrixFill, { width: '98%', backgroundColor: '#10b981' }]} />
              </View>
              <Text style={[styles.matrixPercent, { color: '#10b981' }]}>98%</Text>
            </View>
            <View style={styles.matrixRow}>
              <Text style={[styles.matrixLabel, { color: '#9ca3af' }]}>Content Safety</Text>
              <View style={[styles.matrixBar, { backgroundColor: 'rgba(6, 182, 212, 0.2)' }]}>
                <View style={[styles.matrixFill, { width: '95%', backgroundColor: '#06b6d4' }]} />
              </View>
              <Text style={[styles.matrixPercent, { color: '#06b6d4' }]}>95%</Text>
            </View>
            <View style={styles.matrixRow}>
              <Text style={[styles.matrixLabel, { color: '#9ca3af' }]}>Access Control</Text>
              <View style={[styles.matrixBar, { backgroundColor: 'rgba(139, 92, 246, 0.2)' }]}>
                <View style={[styles.matrixFill, { width: '92%', backgroundColor: '#8b5cf6' }]} />
              </View>
              <Text style={[styles.matrixPercent, { color: '#8b5cf6' }]}>92%</Text>
            </View>
            <View style={styles.matrixRow}>
              <Text style={[styles.matrixLabel, { color: '#9ca3af' }]}>Audit Trail</Text>
              <View style={[styles.matrixBar, { backgroundColor: 'rgba(245, 158, 11, 0.2)' }]}>
                <View style={[styles.matrixFill, { width: '89%', backgroundColor: '#f59e0b' }]} />
              </View>
              <Text style={[styles.matrixPercent, { color: '#f59e0b' }]}>89%</Text>
            </View>
            <View style={styles.matrixRow}>
              <Text style={[styles.matrixLabel, { color: '#9ca3af' }]}>Model Governance</Text>
              <View style={[styles.matrixBar, { backgroundColor: 'rgba(239, 68, 68, 0.2)' }]}>
                <View style={[styles.matrixFill, { width: '85%', backgroundColor: '#ef4444' }]} />
              </View>
              <Text style={[styles.matrixPercent, { color: '#ef4444' }]}>85%</Text>
            </View>
          </View>
        </View>

        {/* Policy Enforcement Graph */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: '#f9fafb' }]}>Policy Enforcement Graph</Text>
          <View style={[styles.enforcementContainer, { backgroundColor: 'rgba(10, 15, 25, 0.8)', borderColor: 'rgba(6, 182, 212, 0.2)' }]}>
            {policyEnforcementData.map(item => (
              <View key={item.id} style={[styles.enforcementRow, { backgroundColor: 'rgba(255, 255, 255, 0.02)' }]}>
                <View style={styles.enforcementPolicy}>
                  <Text style={[styles.enforcementPolicyName, { color: '#f9fafb' }]}>{item.policy}</Text>
                  <Text style={[styles.enforcementRate, { color: '#10b981' }]}>{item.rate}%</Text>
                </View>
                <View style={styles.enforcementMetrics}>
                  <View style={styles.enforcementMetric}>
                    <ShieldAlert size={14} color="#10b981" />
                    <Text style={[styles.enforcementMetricLabel, { color: '#9ca3af' }]}>Enforced</Text>
                    <Text style={[styles.enforcementMetricValue, { color: '#f9fafb' }]}>{item.enforced.toLocaleString()}</Text>
                  </View>
                  <View style={styles.enforcementMetric}>
                    <AlertTriangle size={14} color="#f59e0b" />
                    <Text style={[styles.enforcementMetricLabel, { color: '#9ca3af' }]}>Attempted</Text>
                    <Text style={[styles.enforcementMetricValue, { color: '#f9fafb' }]}>{item.attempted.toLocaleString()}</Text>
                  </View>
                </View>
              </View>
            ))}
          </View>
        </View>

        {/* Ethical AI Guardrails */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: '#f9fafb' }]}>Ethical AI Guardrails</Text>
          <View style={[styles.guardrailsContainer, { backgroundColor: 'rgba(10, 15, 25, 0.8)', borderColor: 'rgba(6, 182, 212, 0.2)' }]}>
            {ethicalGuardrails.map(guardrail => (
              <View key={guardrail.id} style={[styles.guardrailCard, { backgroundColor: 'rgba(255, 255, 255, 0.02)', borderColor: guardrail.status === 'active' ? 'rgba(16, 185, 129, 0.3)' : 'rgba(245, 158, 11, 0.3)' }]}>
                <View style={styles.guardrailHeader}>
                  <View style={[styles.guardrailIcon, { backgroundColor: guardrail.status === 'active' ? 'rgba(16, 185, 129, 0.2)' : 'rgba(245, 158, 11, 0.2)' }]}>
                    <Shield size={20} color={guardrail.status === 'active' ? '#10b981' : '#f59e0b'} />
                  </View>
                  <View style={styles.guardrailInfo}>
                    <Text style={[styles.guardrailName, { color: '#f9fafb' }]}>{guardrail.name}</Text>
                    <Text style={[styles.guardrailStatus, { color: guardrail.status === 'active' ? '#10b981' : '#f59e0b' }]}>{guardrail.status}</Text>
                  </View>
                  <View style={[styles.guardrailScore, { backgroundColor: guardrail.score >= 90 ? 'rgba(16, 185, 129, 0.2)' : 'rgba(245, 158, 11, 0.2)' }]}>
                    <Text style={[styles.guardrailScoreValue, { color: guardrail.score >= 90 ? '#10b981' : '#f59e0b' }]}>{guardrail.score}%</Text>
                  </View>
                </View>
                <View style={styles.guardrailFooter}>
                  <View style={styles.guardrailViolations}>
                    <Ban size={14} color="#ef4444" />
                    <Text style={[styles.guardrailViolationsText, { color: '#9ca3af' }]}>Violations: {guardrail.violations}</Text>
                  </View>
                </View>
              </View>
            ))}
          </View>
        </View>

        {/* Restricted Use Cases */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: '#f9fafb' }]}>Restricted Use Cases</Text>
          <View style={[styles.restrictedContainer, { backgroundColor: 'rgba(10, 15, 25, 0.8)', borderColor: 'rgba(6, 182, 212, 0.2)' }]}>
            {restrictedUseCases.map(useCase => (
              <View key={useCase.id} style={[styles.restrictedCard, { backgroundColor: 'rgba(255, 255, 255, 0.02)', borderColor: useCase.status === 'restricted' ? 'rgba(239, 68, 68, 0.3)' : 'rgba(6, 182, 212, 0.3)' }]}>
                <View style={styles.restrictedHeader}>
                  <View style={[styles.restrictedIcon, { backgroundColor: useCase.status === 'restricted' ? 'rgba(239, 68, 68, 0.2)' : 'rgba(6, 182, 212, 0.2)' }]}>
                    <Lock size={20} color={useCase.status === 'restricted' ? '#ef4444' : '#06b6d4'} />
                  </View>
                  <View style={styles.restrictedInfo}>
                    <Text style={[styles.restrictedName, { color: '#f9fafb' }]}>{useCase.name}</Text>
                    <Text style={[styles.restrictedStatus, { color: useCase.status === 'restricted' ? '#ef4444' : '#06b6d4' }]}>{useCase.status}</Text>
                  </View>
                </View>
                <View style={styles.restrictedMetrics}>
                  <View style={styles.restrictedMetric}>
                    <CheckCircle size={14} color="#10b981" />
                    <Text style={[styles.restrictedMetricLabel, { color: '#9ca3af' }]}>Approvals</Text>
                    <Text style={[styles.restrictedMetricValue, { color: '#f9fafb' }]}>{useCase.approvals}</Text>
                  </View>
                  <View style={styles.restrictedMetric}>
                    <Ban size={14} color="#ef4444" />
                    <Text style={[styles.restrictedMetricLabel, { color: '#9ca3af' }]}>Denials</Text>
                    <Text style={[styles.restrictedMetricValue, { color: '#f9fafb' }]}>{useCase.denials}</Text>
                  </View>
                </View>
              </View>
            ))}
          </View>
        </View>

        {/* Policy Impact Analysis */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: '#f9fafb' }]}>Policy Impact Analysis</Text>
          <View style={[styles.impactContainer, { backgroundColor: 'rgba(10, 15, 25, 0.8)', borderColor: 'rgba(6, 182, 212, 0.2)' }]}>
            <View style={styles.impactSummary}>
              <View style={styles.impactMetric}>
                <Text style={[styles.impactMetricValue, { color: '#10b981' }]}>98.2%</Text>
                <Text style={[styles.impactMetricLabel, { color: '#9ca3af' }]}>Policy Coverage</Text>
              </View>
              <View style={styles.impactMetric}>
                <Text style={[styles.impactMetricValue, { color: '#06b6d4' }]}>18,420</Text>
                <Text style={[styles.impactMetricLabel, { color: '#9ca3af' }]}>Violations Blocked</Text>
              </View>
              <View style={styles.impactMetric}>
                <Text style={[styles.impactMetricValue, { color: '#8b5cf6' }]}>$2.4M</Text>
                <Text style={[styles.impactMetricLabel, { color: '#9ca3af' }]}>Risk Mitigated</Text>
              </View>
            </View>
            <View style={styles.impactBreakdown}>
              <View style={styles.impactItem}>
                <View style={[styles.impactBar, { backgroundColor: 'rgba(16, 185, 129, 0.2)' }]}>
                  <View style={[styles.impactFill, { width: '85%', backgroundColor: '#10b981' }]} />
                </View>
                <Text style={[styles.impactLabel, { color: '#9ca3af' }]}>Data Privacy (85%)</Text>
              </View>
              <View style={styles.impactItem}>
                <View style={[styles.impactBar, { backgroundColor: 'rgba(6, 182, 212, 0.2)' }]}>
                  <View style={[styles.impactFill, { width: '78%', backgroundColor: '#06b6d4' }]} />
                </View>
                <Text style={[styles.impactLabel, { color: '#9ca3af' }]}>Content Safety (78%)</Text>
              </View>
              <View style={styles.impactItem}>
                <View style={[styles.impactBar, { backgroundColor: 'rgba(139, 92, 246, 0.2)' }]}>
                  <View style={[styles.impactFill, { width: '92%', backgroundColor: '#8b5cf6' }]} />
                </View>
                <Text style={[styles.impactLabel, { color: '#9ca3af' }]}>Access Control (92%)</Text>
              </View>
            </View>
          </View>
        </View>

        {/* Regulatory Compliance Map */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: '#f9fafb' }]}>Regulatory Compliance Map</Text>
          <View style={[styles.regulatoryContainer, { backgroundColor: 'rgba(10, 15, 25, 0.8)', borderColor: 'rgba(6, 182, 212, 0.2)' }]}>
            <View style={styles.regulatoryGrid}>
              <View style={[styles.regulatoryCard, { backgroundColor: 'rgba(255, 255, 255, 0.02)', borderColor: 'rgba(16, 185, 129, 0.3)' }]}>
                <View style={styles.regulatoryHeader}>
                  <Globe size={20} color="#10b981" />
                  <Text style={[styles.regulatoryName, { color: '#f9fafb' }]}>EU AI Act</Text>
                </View>
                <Text style={[styles.regulatoryScore, { color: '#10b981' }]}>98% Compliant</Text>
                <Text style={[styles.regulatorySub, { color: '#9ca3af' }]}>42/42 requirements met</Text>
              </View>
              <View style={[styles.regulatoryCard, { backgroundColor: 'rgba(255, 255, 255, 0.02)', borderColor: 'rgba(16, 185, 129, 0.3)' }]}>
                <View style={styles.regulatoryHeader}>
                  <Scale size={20} color="#10b981" />
                  <Text style={[styles.regulatoryName, { color: '#f9fafb' }]}>ISO 27001</Text>
                </View>
                <Text style={[styles.regulatoryScore, { color: '#10b981' }]}>96% Compliant</Text>
                <Text style={[styles.regulatorySub, { color: '#9ca3af' }]}>110/114 requirements met</Text>
              </View>
              <View style={[styles.regulatoryCard, { backgroundColor: 'rgba(255, 255, 255, 0.02)', borderColor: 'rgba(245, 158, 11, 0.3)' }]}>
                <View style={styles.regulatoryHeader}>
                  <BookOpen size={20} color="#f59e0b" />
                  <Text style={[styles.regulatoryName, { color: '#f9fafb' }]}>SOC2 Type II</Text>
                </View>
                <Text style={[styles.regulatoryScore, { color: '#f59e0b' }]}>89% Compliant</Text>
                <Text style={[styles.regulatorySub, { color: '#9ca3af' }]}>56/63 requirements met</Text>
              </View>
              <View style={[styles.regulatoryCard, { backgroundColor: 'rgba(255, 255, 255, 0.02)', borderColor: 'rgba(16, 185, 129, 0.3)' }]}>
                <View style={styles.regulatoryHeader}>
                  <Shield size={20} color="#10b981" />
                  <Text style={[styles.regulatoryName, { color: '#f9fafb' }]}>GDPR AI</Text>
                </View>
                <Text style={[styles.regulatoryScore, { color: '#10b981' }]}>95% Compliant</Text>
                <Text style={[styles.regulatorySub, { color: '#9ca3af' }]}>27/28 requirements met</Text>
              </View>
            </View>
          </View>
        </View>

        {/* Policy Automation Dashboard */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: '#f9fafb' }]}>Policy Automation Dashboard</Text>
          <View style={[styles.automationContainer, { backgroundColor: 'rgba(10, 15, 25, 0.8)', borderColor: 'rgba(6, 182, 212, 0.2)' }]}>
            <View style={styles.automationStats}>
              <View style={styles.automationStat}>
                <View style={[styles.automationIcon, { backgroundColor: 'rgba(16, 185, 129, 0.2)' }]}>
                  <Zap size={24} color="#10b981" />
                </View>
                <Text style={[styles.automationValue, { color: '#10b981' }]}>94.8%</Text>
                <Text style={[styles.automationLabel, { color: '#9ca3af' }]}>Automation Rate</Text>
              </View>
              <View style={styles.automationStat}>
                <View style={[styles.automationIcon, { backgroundColor: 'rgba(6, 182, 212, 0.2)' }]}>
                  <Activity size={24} color="#06b6d4" />
                </View>
                <Text style={[styles.automationValue, { color: '#06b6d4' }]}>1.2K</Text>
                <Text style={[styles.automationLabel, { color: '#9ca3af' }]}>Auto-Actions/hr</Text>
              </View>
              <View style={styles.automationStat}>
                <View style={[styles.automationIcon, { backgroundColor: 'rgba(139, 92, 246, 0.2)' }]}>
                  <Target size={24} color="#8b5cf6" />
                </View>
                <Text style={[styles.automationValue, { color: '#8b5cf6' }]}>99.2%</Text>
                <Text style={[styles.automationLabel, { color: '#9ca3af' }]}>Accuracy</Text>
              </View>
            </View>
            <View style={styles.automationRules}>
              <View style={styles.automationRule}>
                <View style={[styles.automationRuleDot, { backgroundColor: '#10b981' }]} />
                <Text style={[styles.automationRuleText, { color: '#f9fafb' }]}>Auto-block high-risk content patterns</Text>
                <Text style={[styles.automationRuleCount, { color: '#10b981' }]}>842 blocked</Text>
              </View>
              <View style={styles.automationRule}>
                <View style={[styles.automationRuleDot, { backgroundColor: '#06b6d4' }]} />
                <Text style={[styles.automationRuleText, { color: '#f9fafb' }]}>Auto-escalate policy violations</Text>
                <Text style={[styles.automationRuleCount, { color: '#06b6d4' }]}>124 escalated</Text>
              </View>
              <View style={styles.automationRule}>
                <View style={[styles.automationRuleDot, { backgroundColor: '#8b5cf6' }]} />
                <Text style={[styles.automationRuleText, { color: '#f9fafb' }]}>Auto-generate compliance reports</Text>
                <Text style={[styles.automationRuleCount, { color: '#8b5cf6' }]}>48 generated</Text>
              </View>
            </View>
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
  addButton: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 8,
  },
  addButtonText: {
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
  frameworksGrid: {
    gap: 12,
  },
  frameworkCard: {
    padding: 20,
    borderRadius: 16,
    borderWidth: 1,
  },
  frameworkHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  frameworkIcon: {
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  frameworkInfo: {
    flex: 1,
  },
  frameworkName: {
    fontSize: 16,
    fontWeight: '700',
    marginBottom: 4,
  },
  frameworkStatus: {
    fontSize: 12,
    fontWeight: '600',
    textTransform: 'capitalize',
  },
  frameworkScore: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
  },
  scoreValue: {
    fontSize: 18,
    fontWeight: '800',
  },
  frameworkProgress: {
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: 'rgba(255, 255, 255, 0.1)',
  },
  progressInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  progressLabel: {
    fontSize: 12,
    fontWeight: '500',
  },
  progressValue: {
    fontSize: 14,
    fontWeight: '700',
  },
  progressBar: {
    height: 8,
    borderRadius: 4,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    borderRadius: 4,
  },
  policiesGrid: {
    gap: 12,
  },
  policyCard: {
    padding: 20,
    borderRadius: 16,
    borderWidth: 1,
  },
  policyHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  policyIcon: {
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  policyInfo: {
    flex: 1,
  },
  policyName: {
    fontSize: 16,
    fontWeight: '700',
    marginBottom: 4,
  },
  policyCategory: {
    fontSize: 12,
    fontWeight: '500',
  },
  policyStatus: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  policyStatusText: {
    fontSize: 11,
    fontWeight: '600',
    textTransform: 'uppercase',
  },
  policyMetrics: {
    flexDirection: 'row',
    marginBottom: 16,
    gap: 24,
  },
  policyMetric: {
    flex: 1,
  },
  metricLabel: {
    fontSize: 11,
    fontWeight: '500',
    marginBottom: 4,
  },
  metricValue: {
    fontSize: 14,
    fontWeight: '700',
  },
  policyFooter: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: 'rgba(255, 255, 255, 0.1)',
  },
  timelineContainer: {
    padding: 20,
    borderRadius: 16,
    borderWidth: 1,
  },
  timelineScroll: {
    flexDirection: 'row',
  },
  timelineItem: {
    alignItems: 'center',
    marginRight: 24,
    width: 40,
  },
  timelineBar: {
    width: 24,
    borderRadius: 12,
    marginBottom: 8,
  },
  timelineDate: {
    fontSize: 10,
    fontWeight: '500',
    marginBottom: 4,
  },
  timelineCount: {
    fontSize: 14,
    fontWeight: '700',
  },
  matrixContainer: {
    padding: 20,
    borderRadius: 16,
    borderWidth: 1,
    gap: 16,
  },
  matrixRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  matrixLabel: {
    fontSize: 13,
    fontWeight: '500',
    width: 100,
  },
  matrixBar: {
    flex: 1,
    height: 8,
    borderRadius: 4,
    overflow: 'hidden',
  },
  matrixFill: {
    height: '100%',
    borderRadius: 4,
  },
  matrixPercent: {
    fontSize: 14,
    fontWeight: '700',
    width: 40,
  },
  enforcementContainer: {
    padding: 16,
    borderRadius: 16,
    borderWidth: 1,
    gap: 12,
  },
  enforcementRow: {
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
  enforcementPolicy: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  enforcementPolicyName: {
    fontSize: 14,
    fontWeight: '600',
  },
  enforcementRate: {
    fontSize: 16,
    fontWeight: '700',
  },
  enforcementMetrics: {
    flexDirection: 'row',
    gap: 24,
  },
  enforcementMetric: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    flex: 1,
  },
  enforcementMetricLabel: {
    fontSize: 11,
    fontWeight: '500',
  },
  enforcementMetricValue: {
    fontSize: 13,
    fontWeight: '700',
  },
  guardrailsContainer: {
    padding: 16,
    borderRadius: 16,
    borderWidth: 1,
    gap: 12,
  },
  guardrailCard: {
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
  },
  guardrailHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  guardrailIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  guardrailInfo: {
    flex: 1,
  },
  guardrailName: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 4,
  },
  guardrailStatus: {
    fontSize: 12,
    fontWeight: '500',
  },
  guardrailScore: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  guardrailScoreValue: {
    fontSize: 14,
    fontWeight: '700',
  },
  guardrailFooter: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  guardrailViolations: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  guardrailViolationsText: {
    fontSize: 12,
    fontWeight: '500',
  },
  restrictedContainer: {
    padding: 16,
    borderRadius: 16,
    borderWidth: 1,
    gap: 12,
  },
  restrictedCard: {
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
  },
  restrictedHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  restrictedIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  restrictedInfo: {
    flex: 1,
  },
  restrictedName: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 4,
  },
  restrictedStatus: {
    fontSize: 12,
    fontWeight: '500',
  },
  restrictedMetrics: {
    flexDirection: 'row',
    gap: 24,
  },
  restrictedMetric: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    flex: 1,
  },
  restrictedMetricLabel: {
    fontSize: 11,
    fontWeight: '500',
  },
  restrictedMetricValue: {
    fontSize: 13,
    fontWeight: '700',
  },
  impactContainer: {
    padding: 20,
    borderRadius: 16,
    borderWidth: 1,
  },
  impactSummary: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  impactMetric: {
    alignItems: 'center',
  },
  impactMetricValue: {
    fontSize: 24,
    fontWeight: '800',
    marginBottom: 4,
  },
  impactMetricLabel: {
    fontSize: 11,
    fontWeight: '500',
    textTransform: 'uppercase',
  },
  impactBreakdown: {
    gap: 12,
  },
  impactItem: {
    gap: 6,
  },
  impactBar: {
    height: 8,
    borderRadius: 4,
    overflow: 'hidden',
  },
  impactFill: {
    height: '100%',
    borderRadius: 4,
  },
  impactLabel: {
    fontSize: 12,
    fontWeight: '500',
  },
  regulatoryContainer: {
    padding: 20,
    borderRadius: 16,
    borderWidth: 1,
  },
  regulatoryGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  regulatoryCard: {
    width: '48%',
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
  },
  regulatoryHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 12,
  },
  regulatoryName: {
    fontSize: 14,
    fontWeight: '600',
  },
  regulatoryScore: {
    fontSize: 16,
    fontWeight: '700',
    marginBottom: 4,
  },
  regulatorySub: {
    fontSize: 11,
    fontWeight: '500',
  },
  automationContainer: {
    padding: 20,
    borderRadius: 16,
    borderWidth: 1,
  },
  automationStats: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  automationStat: {
    alignItems: 'center',
  },
  automationIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  automationValue: {
    fontSize: 20,
    fontWeight: '800',
    marginBottom: 4,
  },
  automationLabel: {
    fontSize: 11,
    fontWeight: '500',
    textTransform: 'uppercase',
  },
  automationRules: {
    gap: 12,
  },
  automationRule: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    backgroundColor: 'rgba(255, 255, 255, 0.02)',
    borderRadius: 8,
  },
  automationRuleDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: 12,
  },
  automationRuleText: {
    flex: 1,
    fontSize: 13,
    fontWeight: '500',
  },
  automationRuleCount: {
    fontSize: 12,
    fontWeight: '600',
  },
});
