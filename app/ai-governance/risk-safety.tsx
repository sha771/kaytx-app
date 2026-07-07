/**
 * @copyright Copyright (c) 2026 Kaytx & Antigravity Ecosystem ("kaytx")
 * @license MIT - See LICENSE file for full terms
 */

import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Stack, router } from 'expo-router';
import {
  ShieldAlert,
  AlertTriangle,
  Radar,
  Activity,
  Zap,
  ArrowLeft,
  ChevronRight,
  Eye,
  Lock,
  Skull,
  Ghost,
  TrendingUp,
  Shield,
  CheckCircle,
  XCircle,
  Target,
  Flame,
  Crosshair,
  ShieldCheck,
  Bell,
  Radio,
  Clock,
  Crown,
  Bug,
  AlertCircle
} from 'lucide-react-native';

interface RiskMetric {
  id: string;
  name: string;
  value: string;
  threshold: string;
  status: 'safe' | 'warning' | 'critical';
  trend: 'up' | 'down' | 'stable';
}

interface SafetyGuardrail {
  id: string;
  name: string;
  category: string;
  effectiveness: number;
  violationsBlocked: number;
  lastTriggered: string;
}

const riskMetrics: RiskMetric[] = [
  { id: '1', name: 'Hallucination Rate', value: '0.8%', threshold: '< 2%', status: 'safe', trend: 'down' },
  { id: '2', name: 'Toxic Output Detection', value: '0.3%', threshold: '< 1%', status: 'safe', trend: 'down' },
  { id: '3', name: 'Prompt Injection Attacks', value: '12/day', threshold: '< 20/day', status: 'warning', trend: 'up' },
  { id: '4', name: 'Jailbreak Attempts', value: '8/day', threshold: '< 15/day', status: 'safe', trend: 'stable' },
  { id: '5', name: 'Bias Detection Score', value: '92%', threshold: '> 85%', status: 'safe', trend: 'up' },
  { id: '6', name: 'Safety Guardrail Effectiveness', value: '96.8%', threshold: '> 90%', status: 'safe', trend: 'up' },
];

const safetyGuardrails: SafetyGuardrail[] = [
  {
    id: '1',
    name: 'Content Filter',
    category: 'Output Safety',
    effectiveness: 98,
    violationsBlocked: 18420,
    lastTriggered: '2 min ago'
  },
  {
    id: '2',
    name: 'PII Redaction',
    category: 'Data Privacy',
    effectiveness: 96,
    violationsBlocked: 12450,
    lastTriggered: '5 min ago'
  },
  {
    id: '3',
    name: 'Prompt Injection Defense',
    category: 'Input Security',
    effectiveness: 94,
    violationsBlocked: 8920,
    lastTriggered: '8 min ago'
  },
  {
    id: '4',
    name: 'Bias Detector',
    category: 'Fairness',
    effectiveness: 92,
    violationsBlocked: 6780,
    lastTriggered: '12 min ago'
  },
];

const attackTimeline = [
  { id: '1', type: 'injection', count: 12, blocked: 11, time: 'Today' },
  { id: '2', type: 'jailbreak', count: 8, blocked: 8, time: 'Today' },
  { id: '3', type: 'injection', count: 15, blocked: 14, time: 'Yesterday' },
  { id: '4', type: 'jailbreak', count: 10, blocked: 9, time: 'Yesterday' },
  { id: '5', type: 'injection', count: 9, blocked: 9, time: '2 days ago' },
];

const realTimeThreats = [
  { id: '1', type: 'Prompt Injection', severity: 'high', source: 'API Gateway', timestamp: '2s ago', status: 'blocked' },
  { id: '2', type: 'Jailbreak Attempt', severity: 'medium', source: 'User Session', timestamp: '15s ago', status: 'blocked' },
  { id: '3', type: 'Data Exfiltration', severity: 'critical', source: 'External API', timestamp: '1m ago', status: 'investigating' },
];

const safetyWallMetrics = [
  { id: '1', metric: 'Content Safety', score: 98, violations: 12, status: 'active' },
  { id: '2', metric: 'Data Privacy', score: 96, violations: 8, status: 'active' },
  { id: '3', metric: 'Input Security', score: 94, violations: 15, status: 'active' },
  { id: '4', metric: 'Output Filtering', score: 97, violations: 6, status: 'active' },
];

const riskRadarData = [
  { id: '1', category: 'Hallucination', risk: 15, severity: 'low' },
  { id: '2', category: 'Toxicity', risk: 8, severity: 'low' },
  { id: '3', category: 'Bias', risk: 22, severity: 'medium' },
  { id: '4', category: 'Privacy', risk: 18, severity: 'low' },
  { id: '5', category: 'Security', risk: 35, severity: 'high' },
  { id: '6', category: 'Compliance', risk: 12, severity: 'low' },
];

export default function RiskSafetyScreen() {
  const [selectedGuardrail, setSelectedGuardrail] = useState<SafetyGuardrail | null>(null);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'safe': return '#10b981';
      case 'warning': return '#f59e0b';
      case 'critical': return '#ef4444';
      default: return '#9ca3af';
    }
  };

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'up': return <TrendingUp size={16} color="#ef4444" />;
      case 'down': return <TrendingUp size={16} color="#10b981" style={{ transform: [{ rotate: '180deg' }] }} />;
      default: return <Activity size={16} color="#9ca3af" />;
    }
  };

  const RiskMetricCard = ({ metric }: { metric: RiskMetric }) => (
    <View style={[styles.riskCard, { backgroundColor: 'rgba(10, 15, 25, 0.8)', borderColor: `${getStatusColor(metric.status)}30` }]}>
      <View style={styles.riskHeader}>
        <View style={[styles.riskIcon, { backgroundColor: `${getStatusColor(metric.status)}20` }]}>
          <ShieldAlert size={20} color={getStatusColor(metric.status)} />
        </View>
        <Text style={[styles.riskName, { color: '#f9fafb' }]}>{metric.name}</Text>
        {getTrendIcon(metric.trend)}
      </View>
      <View style={styles.riskContent}>
        <Text style={[styles.riskValue, { color: getStatusColor(metric.status) }]}>{metric.value}</Text>
        <Text style={[styles.riskThreshold, { color: '#9ca3af' }]}>Threshold: {metric.threshold}</Text>
      </View>
      <View style={[styles.riskStatus, { backgroundColor: `${getStatusColor(metric.status)}20` }]}>
        <Text style={[styles.riskStatusText, { color: getStatusColor(metric.status) }]}>{metric.status}</Text>
      </View>
    </View>
  );

  const GuardrailCard = ({ guardrail }: { guardrail: SafetyGuardrail }) => (
    <TouchableOpacity 
      style={[styles.guardrailCard, { backgroundColor: 'rgba(10, 15, 25, 0.8)', borderColor: 'rgba(6, 182, 212, 0.2)' }]}
      onPress={() => setSelectedGuardrail(guardrail)}
    >
      <View style={styles.guardrailHeader}>
        <View style={[styles.guardrailIcon, { backgroundColor: 'rgba(6, 182, 212, 0.2)' }]}>
          <Shield size={24} color="#06b6d4" />
        </View>
        <View style={styles.guardrailInfo}>
          <Text style={[styles.guardrailName, { color: '#f9fafb' }]}>{guardrail.name}</Text>
          <Text style={[styles.guardrailCategory, { color: '#9ca3af' }]}>{guardrail.category}</Text>
        </View>
        <View style={styles.guardrailEffectiveness}>
          <Text style={[styles.effectivenessValue, { color: guardrail.effectiveness > 95 ? '#10b981' : guardrail.effectiveness > 90 ? '#06b6d4' : '#f59e0b' }]}>
            {guardrail.effectiveness}%
          </Text>
        </View>
      </View>
      <View style={styles.guardrailMetrics}>
        <View style={styles.guardrailMetric}>
          <Text style={[styles.metricLabel, { color: '#9ca3af' }]}>Violations Blocked</Text>
          <Text style={[styles.metricValue, { color: '#f9fafb' }]}>{guardrail.violationsBlocked.toLocaleString()}</Text>
        </View>
        <View style={styles.guardrailMetric}>
          <Text style={[styles.metricLabel, { color: '#9ca3af' }]}>Last Triggered</Text>
          <Text style={[styles.metricValue, { color: '#f9fafb' }]}>{guardrail.lastTriggered}</Text>
        </View>
      </View>
      <View style={styles.guardrailFooter}>
        <ChevronRight size={20} color="#9ca3af" />
      </View>
    </TouchableOpacity>
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
            <Text style={[styles.headerTitleText, { color: '#f9fafb' }]}>Risk & Safety</Text>
            <Text style={[styles.headerSubtitle, { color: '#9ca3af' }]}>AI Risk & Safety Control Room</Text>
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
                  <Text style={[styles.executiveName, { color: '#f9fafb' }]}>Risk & Safety Control</Text>
                  <Text style={[styles.executiveRole, { color: '#9ca3af' }]}>Enterprise AI Threat Detection Center</Text>
                </View>
              </View>
              <View style={[styles.executiveBadge, { backgroundColor: 'rgba(16, 185, 129, 0.2)' }]}>
                <Text style={[styles.executiveBadgeText, { color: '#10b981' }]}>PROTECTED</Text>
              </View>
            </View>
            <View style={styles.executiveMetrics}>
              <View style={styles.executiveMetric}>
                <Text style={[styles.executiveMetricValue, { color: '#06b6d4' }]}>94.8%</Text>
                <Text style={[styles.executiveMetricLabel, { color: '#9ca3af' }]}>Safety Score</Text>
              </View>
              <View style={styles.executiveMetric}>
                <Text style={[styles.executiveMetricValue, { color: '#10b981' }]}>18.4K</Text>
                <Text style={[styles.executiveMetricLabel, { color: '#9ca3af' }]}>Threats Blocked</Text>
              </View>
              <View style={styles.executiveMetric}>
                <Text style={[styles.executiveMetricValue, { color: '#8b5cf6' }]}>12</Text>
                <Text style={[styles.executiveMetricLabel, { color: '#9ca3af' }]}>Active Alerts</Text>
              </View>
              <View style={styles.executiveMetric}>
                <Text style={[styles.executiveMetricValue, { color: '#f59e0b' }]}>48</Text>
                <Text style={[styles.executiveMetricLabel, { color: '#9ca3af' }]}>Incidents</Text>
              </View>
            </View>
          </View>
        </View>

        {/* Threat Detection Center */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: '#f9fafb' }]}>Threat Detection Center</Text>
          <View style={[styles.threatContainer, { backgroundColor: 'rgba(10, 15, 25, 0.8)', borderColor: 'rgba(6, 182, 212, 0.2)' }]}>
            <View style={styles.threatGrid}>
              <View style={[styles.threatCard, { backgroundColor: 'rgba(239, 68, 68, 0.1)', borderColor: 'rgba(239, 68, 68, 0.3)' }]}>
                <View style={styles.threatHeader}>
                  <Bug size={20} color="#ef4444" />
                  <Text style={[styles.threatTitle, { color: '#ef4444' }]}>Prompt Injection</Text>
                </View>
                <Text style={[styles.threatValue, { color: '#f9faff' }]}>12/day</Text>
                <Text style={[styles.threatSub, { color: '#9ca3af' }]}>Critical Priority</Text>
              </View>
              <View style={[styles.threatCard, { backgroundColor: 'rgba(245, 158, 11, 0.1)', borderColor: 'rgba(245, 158, 11, 0.3)' }]}>
                <View style={styles.threatHeader}>
                  <Ghost size={20} color="#f59e0b" />
                  <Text style={[styles.threatTitle, { color: '#f59e0b' }]}>Jailbreak Attempts</Text>
                </View>
                <Text style={[styles.threatValue, { color: '#f9faff' }]}>8/day</Text>
                <Text style={[styles.threatSub, { color: '#9ca3af' }]}>High Priority</Text>
              </View>
              <View style={[styles.threatCard, { backgroundColor: 'rgba(6, 182, 212, 0.1)', borderColor: 'rgba(6, 182, 212, 0.3)' }]}>
                <View style={styles.threatHeader}>
                  <Skull size={20} color="#06b6d4" />
                  <Text style={[styles.threatTitle, { color: '#06b6d4' }]}>Toxic Content</Text>
                </View>
                <Text style={[styles.threatValue, { color: '#f9faff' }]}>0.3%</Text>
                <Text style={[styles.threatSub, { color: '#9ca3af' }]}>Monitored</Text>
              </View>
              <View style={[styles.threatCard, { backgroundColor: 'rgba(16, 185, 129, 0.1)', borderColor: 'rgba(16, 185, 129, 0.3)' }]}>
                <View style={styles.threatHeader}>
                  <ShieldCheck size={20} color="#10b981" />
                  <Text style={[styles.threatTitle, { color: '#10b981' }]}>Hallucinations</Text>
                </View>
                <Text style={[styles.threatValue, { color: '#f9faff' }]}>0.8%</Text>
                <Text style={[styles.threatSub, { color: '#9ca3af' }]}>Controlled</Text>
              </View>
            </View>
          </View>
        </View>

        {/* Safety Score Overview */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: '#f9fafb' }]}>AI Safety Score</Text>
          <View style={[styles.safetyOverview, { backgroundColor: 'rgba(10, 15, 25, 0.8)', borderColor: 'rgba(6, 182, 212, 0.2)' }]}>
            <View style={styles.safetyCenter}>
              <View style={[styles.safetyRing, { borderColor: '#10b981' }]}>
                <View style={styles.safetyInner}>
                  <Text style={[styles.safetyScore, { color: '#10b981' }]}>94.8%</Text>
                  <Text style={[styles.safetyLabel, { color: '#9ca3af' }]}>Overall Safety</Text>
                </View>
              </View>
            </View>
            <View style={styles.safetyDetails}>
              <View style={styles.safetyDetail}>
                <CheckCircle size={20} color="#10b981" />
                <Text style={[styles.safetyDetailText, { color: '#f9fafb' }]}>Guardrails Active</Text>
              </View>
              <View style={styles.safetyDetail}>
                <AlertTriangle size={20} color="#f59e0b" />
                <Text style={[styles.safetyDetailText, { color: '#f9fafb' }]}>2 Warnings</Text>
              </View>
              <View style={styles.safetyDetail}>
                <XCircle size={20} color="#ef4444" />
                <Text style={[styles.safetyDetailText, { color: '#f9fafb' }]}>0 Critical</Text>
              </View>
            </View>
          </View>
        </View>

        {/* Risk Metrics */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: '#f9fafb' }]}>Risk Metrics</Text>
          <View style={styles.riskGrid}>
            {riskMetrics.map(metric => (
              <RiskMetricCard key={metric.id} metric={metric} />
            ))}
          </View>
        </View>

        {/* Safety Guardrails */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={[styles.sectionTitle, { color: '#f9fafb' }]}>Safety Guardrails</Text>
            <TouchableOpacity style={[styles.addButton, { backgroundColor: 'rgba(6, 182, 212, 0.2)' }]}>
              <Text style={[styles.addButtonText, { color: '#06b6d4' }]}>+ Add Guardrail</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.guardrailsGrid}>
            {safetyGuardrails.map(guardrail => (
              <GuardrailCard key={guardrail.id} guardrail={guardrail} />
            ))}
          </View>
        </View>

        {/* Attack Timeline */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: '#f9fafb' }]}>Attack Timeline</Text>
          <View style={[styles.timelineContainer, { backgroundColor: 'rgba(10, 15, 25, 0.8)', borderColor: 'rgba(6, 182, 212, 0.2)' }]}>
            {attackTimeline.map((item, index) => (
              <View key={item.id} style={styles.timelineItem}>
                <View style={styles.timelineLeft}>
                  <View style={[styles.timelineDot, { backgroundColor: item.type === 'injection' ? '#ef4444' : '#f59e0b' }]} />
                  {index < attackTimeline.length - 1 && <View style={[styles.timelineLine, { backgroundColor: 'rgba(255, 255, 255, 0.1)' }]} />}
                </View>
                <View style={styles.timelineContent}>
                  <View style={styles.timelineHeader}>
                    <Text style={[styles.timelineType, { color: '#f9fafb' }]}>{item.type === 'injection' ? 'Prompt Injection' : 'Jailbreak Attempt'}</Text>
                    <Text style={[styles.timelineTime, { color: '#9ca3af' }]}>{item.time}</Text>
                  </View>
                  <View style={styles.timelineStats}>
                    <View style={styles.timelineStat}>
                      <Text style={[styles.timelineStatLabel, { color: '#9ca3af' }]}>Attempts</Text>
                      <Text style={[styles.timelineStatValue, { color: '#ef4444' }]}>{item.count}</Text>
                    </View>
                    <View style={styles.timelineStat}>
                      <Text style={[styles.timelineStatLabel, { color: '#9ca3af' }]}>Blocked</Text>
                      <Text style={[styles.timelineStatValue, { color: '#10b981' }]}>{item.blocked}</Text>
                    </View>
                    <View style={styles.timelineStat}>
                      <Text style={[styles.timelineStatLabel, { color: '#9ca3af' }]}>Success Rate</Text>
                      <Text style={[styles.timelineStatValue, { color: '#f9fafb' }]}>
                        {Math.round((item.blocked / item.count) * 100)}%
                      </Text>
                    </View>
                  </View>
                </View>
              </View>
            ))}
          </View>
        </View>

        {/* Risk Radar */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: '#f9fafb' }]}>Risk Radar</Text>
          <View style={[styles.radarContainer, { backgroundColor: 'rgba(10, 15, 25, 0.8)', borderColor: 'rgba(6, 182, 212, 0.2)' }]}>
            <View style={styles.radarGrid}>
              <View style={styles.radarQuadrant}>
                <Text style={[styles.radarTitle, { color: '#f9fafb' }]}>Input Risks</Text>
                <View style={styles.radarMetrics}>
                  <View style={styles.radarMetric}>
                    <Text style={[styles.radarMetricLabel, { color: '#9ca3af' }]}>Injection</Text>
                    <View style={[styles.radarBar, { backgroundColor: 'rgba(239, 68, 68, 0.2)' }]}>
                      <View style={[styles.radarFill, { width: '60%', backgroundColor: '#ef4444' }]} />
                    </View>
                  </View>
                  <View style={styles.radarMetric}>
                    <Text style={[styles.radarMetricLabel, { color: '#9ca3af' }]}>Jailbreak</Text>
                    <View style={[styles.radarBar, { backgroundColor: 'rgba(245, 158, 11, 0.2)' }]}>
                      <View style={[styles.radarFill, { width: '40%', backgroundColor: '#f59e0b' }]} />
                    </View>
                  </View>
                </View>
              </View>
              <View style={styles.radarQuadrant}>
                <Text style={[styles.radarTitle, { color: '#f9fafb' }]}>Output Risks</Text>
                <View style={styles.radarMetrics}>
                  <View style={styles.radarMetric}>
                    <Text style={[styles.radarMetricLabel, { color: '#9ca3af' }]}>Hallucination</Text>
                    <View style={[styles.radarBar, { backgroundColor: 'rgba(16, 185, 129, 0.2)' }]}>
                      <View style={[styles.radarFill, { width: '20%', backgroundColor: '#10b981' }]} />
                    </View>
                  </View>
                  <View style={styles.radarMetric}>
                    <Text style={[styles.radarMetricLabel, { color: '#9ca3af' }]}>Toxicity</Text>
                    <View style={[styles.radarBar, { backgroundColor: 'rgba(16, 185, 129, 0.2)' }]}>
                      <View style={[styles.radarFill, { width: '15%', backgroundColor: '#10b981' }]} />
                    </View>
                  </View>
                </View>
              </View>
              <View style={styles.radarQuadrant}>
                <Text style={[styles.radarTitle, { color: '#f9fafb' }]}>Data Risks</Text>
                <View style={styles.radarMetrics}>
                  <View style={styles.radarMetric}>
                    <Text style={[styles.radarMetricLabel, { color: '#9ca3af' }]}>PII Exposure</Text>
                    <View style={[styles.radarBar, { backgroundColor: 'rgba(16, 185, 129, 0.2)' }]}>
                      <View style={[styles.radarFill, { width: '25%', backgroundColor: '#10b981' }]} />
                    </View>
                  </View>
                  <View style={styles.radarMetric}>
                    <Text style={[styles.radarMetricLabel, { color: '#9ca3af' }]}>Bias</Text>
                    <View style={[styles.radarBar, { backgroundColor: 'rgba(6, 182, 212, 0.2)' }]}>
                      <View style={[styles.radarFill, { width: '30%', backgroundColor: '#06b6d4' }]} />
                    </View>
                  </View>
                </View>
              </View>
              <View style={styles.radarQuadrant}>
                <Text style={[styles.radarTitle, { color: '#f9fafb' }]}>System Risks</Text>
                <View style={styles.radarMetrics}>
                  <View style={styles.radarMetric}>
                    <Text style={[styles.radarMetricLabel, { color: '#9ca3af' }]}>Drift</Text>
                    <View style={[styles.radarBar, { backgroundColor: 'rgba(245, 158, 11, 0.2)' }]}>
                      <View style={[styles.radarFill, { width: '35%', backgroundColor: '#f59e0b' }]} />
                    </View>
                  </View>
                  <View style={styles.radarMetric}>
                    <Text style={[styles.radarMetricLabel, { color: '#9ca3af' }]}>Latency</Text>
                    <View style={[styles.radarBar, { backgroundColor: 'rgba(16, 185, 129, 0.2)' }]}>
                      <View style={[styles.radarFill, { width: '20%', backgroundColor: '#10b981' }]} />
                    </View>
                  </View>
                </View>
              </View>
            </View>
          </View>
        </View>

        {/* Real-Time Threat Detection */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: '#f9fafb' }]}>Real-Time Threat Detection</Text>
          <View style={[styles.threatContainer, { backgroundColor: 'rgba(10, 15, 25, 0.8)', borderColor: 'rgba(6, 182, 212, 0.2)' }]}>
            {realTimeThreats.map(threat => (
              <View key={threat.id} style={[styles.threatRow, { backgroundColor: 'rgba(255, 255, 255, 0.02)', borderLeftWidth: 3, borderLeftColor: threat.severity === 'critical' ? '#ef4444' : threat.severity === 'high' ? '#f59e0b' : '#06b6d4' }]}>
                <View style={styles.threatInfo}>
                  <View style={[styles.threatIcon, { backgroundColor: threat.severity === 'critical' ? 'rgba(239, 68, 68, 0.2)' : threat.severity === 'high' ? 'rgba(245, 158, 11, 0.2)' : 'rgba(6, 182, 212, 0.2)' }]}>
                    <Crosshair size={18} color={threat.severity === 'critical' ? '#ef4444' : threat.severity === 'high' ? '#f59e0b' : '#06b6d4'} />
                  </View>
                  <View style={styles.threatDetails}>
                    <Text style={[styles.threatType, { color: '#f9fafb' }]}>{threat.type}</Text>
                    <Text style={[styles.threatSource, { color: '#9ca3af' }]}>{threat.source}</Text>
                  </View>
                </View>
                <View style={styles.threatMeta}>
                  <Text style={[styles.threatTimestamp, { color: '#9ca3af' }]}>{threat.timestamp}</Text>
                  <View style={[styles.threatStatus, { backgroundColor: threat.status === 'blocked' ? 'rgba(16, 185, 129, 0.2)' : 'rgba(245, 158, 11, 0.2)' }]}>
                    <ShieldCheck size={14} color={threat.status === 'blocked' ? '#10b981' : '#f59e0b'} />
                    <Text style={[styles.threatStatusText, { color: threat.status === 'blocked' ? '#10b981' : '#f59e0b' }]}>{threat.status}</Text>
                  </View>
                </View>
              </View>
            ))}
          </View>
        </View>

        {/* Safety Wall Dashboard */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: '#f9fafb' }]}>Safety Wall Dashboard</Text>
          <View style={[styles.safetyWallContainer, { backgroundColor: 'rgba(10, 15, 25, 0.8)', borderColor: 'rgba(6, 182, 212, 0.2)' }]}>
            {safetyWallMetrics.map(metric => (
              <View key={metric.id} style={[styles.safetyWallCard, { backgroundColor: 'rgba(255, 255, 255, 0.02)' }]}>
                <View style={styles.safetyWallHeader}>
                  <View style={[styles.safetyWallIcon, { backgroundColor: 'rgba(6, 182, 212, 0.2)' }]}>
                    <ShieldCheck size={20} color="#06b6d4" />
                  </View>
                  <View style={styles.safetyWallInfo}>
                    <Text style={[styles.safetyWallMetric, { color: '#f9fafb' }]}>{metric.metric}</Text>
                    <Text style={[styles.safetyWallScore, { color: metric.score > 95 ? '#10b981' : '#06b6d4' }]}>{metric.score}%</Text>
                  </View>
                  <View style={[styles.safetyWallStatus, { backgroundColor: 'rgba(16, 185, 129, 0.2)' }]}>
                    <Radio size={14} color="#10b981" />
                    <Text style={[styles.safetyWallStatusText, { color: '#10b981' }]}>{metric.status}</Text>
                  </View>
                </View>
                <View style={styles.safetyWallFooter}>
                  <View style={styles.safetyWallViolations}>
                    <Flame size={14} color="#ef4444" />
                    <Text style={[styles.safetyWallViolationsText, { color: '#9ca3af' }]}>Violations: {metric.violations}</Text>
                  </View>
                </View>
              </View>
            ))}
          </View>
        </View>

        {/* Advanced Risk Radar */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: '#f9fafb' }]}>Advanced Risk Radar</Text>
          <View style={[styles.advancedRadarContainer, { backgroundColor: 'rgba(10, 15, 25, 0.8)', borderColor: 'rgba(6, 182, 212, 0.2)' }]}>
            {riskRadarData.map(item => (
              <View key={item.id} style={[styles.advancedRadarRow, { backgroundColor: 'rgba(255, 255, 255, 0.02)' }]}>
                <View style={styles.advancedRadarCategory}>
                  <Text style={[styles.advancedRadarCategoryName, { color: '#f9fafb' }]}>{item.category}</Text>
                  <View style={[styles.advancedRadarSeverity, { backgroundColor: item.severity === 'high' ? 'rgba(239, 68, 68, 0.2)' : item.severity === 'medium' ? 'rgba(245, 158, 11, 0.2)' : 'rgba(16, 185, 129, 0.2)' }]}>
                    <Text style={[styles.advancedRadarSeverityText, { color: item.severity === 'high' ? '#ef4444' : item.severity === 'medium' ? '#f59e0b' : '#10b981' }]}>{item.severity}</Text>
                  </View>
                </View>
                <View style={styles.advancedRadarBarContainer}>
                  <View style={[styles.advancedRadarBar, { backgroundColor: 'rgba(255, 255, 255, 0.1)' }]}>
                    <View style={[styles.advancedRadarFill, { width: `${item.risk}%`, backgroundColor: item.risk > 30 ? '#ef4444' : item.risk > 20 ? '#f59e0b' : '#10b981' }]} />
                  </View>
                  <Text style={[styles.advancedRadarValue, { color: item.risk > 30 ? '#ef4444' : item.risk > 20 ? '#f59e0b' : '#10b981' }]}>{item.risk}%</Text>
                </View>
              </View>
            ))}
          </View>
        </View>

        {/* Incident Response Dashboard */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: '#f9fafb' }]}>Incident Response Dashboard</Text>
          <View style={[styles.incidentContainer, { backgroundColor: 'rgba(10, 15, 25, 0.8)', borderColor: 'rgba(6, 182, 212, 0.2)' }]}>
            <View style={styles.incidentStats}>
              <View style={styles.incidentStat}>
                <View style={[styles.incidentIcon, { backgroundColor: 'rgba(239, 68, 68, 0.2)' }]}>
                  <AlertTriangle size={24} color="#ef4444" />
                </View>
                <Text style={[styles.incidentValue, { color: '#ef4444' }]}>3</Text>
                <Text style={[styles.incidentLabel, { color: '#9ca3af' }]}>Active Incidents</Text>
              </View>
              <View style={styles.incidentStat}>
                <View style={[styles.incidentIcon, { backgroundColor: 'rgba(16, 185, 129, 0.2)' }]}>
                  <CheckCircle size={24} color="#10b981" />
                </View>
                <Text style={[styles.incidentValue, { color: '#10b981' }]}>142</Text>
                <Text style={[styles.incidentLabel, { color: '#9ca3af' }]}>Resolved This Week</Text>
              </View>
              <View style={styles.incidentStat}>
                <View style={[styles.incidentIcon, { backgroundColor: 'rgba(6, 182, 212, 0.2)' }]}>
                  <Clock size={24} color="#06b6d4" />
                </View>
                <Text style={[styles.incidentValue, { color: '#06b6d4' }]}>18m</Text>
                <Text style={[styles.incidentLabel, { color: '#9ca3af' }]}>Avg Response Time</Text>
              </View>
            </View>
            <View style={styles.incidentList}>
              <View style={[styles.incidentItem, { backgroundColor: 'rgba(239, 68, 68, 0.1)', borderColor: 'rgba(239, 68, 68, 0.3)' }]}>
                <View style={styles.incidentHeader}>
                  <Text style={[styles.incidentTitle, { color: '#f9fafb' }]}>Data Exfiltration Attempt</Text>
                  <View style={[styles.incidentBadge, { backgroundColor: 'rgba(239, 68, 68, 0.2)' }]}>
                    <Text style={[styles.incidentBadgeText, { color: '#ef4444' }]}>Critical</Text>
                  </View>
                </View>
                <Text style={[styles.incidentDescription, { color: '#9ca3af' }]}>External API attempting to export sensitive data - investigation in progress</Text>
                <Text style={[styles.incidentTime, { color: '#f59e0b' }]}>Started 1m ago</Text>
              </View>
              <View style={[styles.incidentItem, { backgroundColor: 'rgba(245, 158, 11, 0.1)', borderColor: 'rgba(245, 158, 11, 0.3)' }]}>
                <View style={styles.incidentHeader}>
                  <Text style={[styles.incidentTitle, { color: '#f9faff' }]}>Model Drift Alert</Text>
                  <View style={[styles.incidentBadge, { backgroundColor: 'rgba(245, 158, 11, 0.2)' }]}>
                    <Text style={[styles.incidentBadgeText, { color: '#f59e0b' }]}>Warning</Text>
                  </View>
                </View>
                <Text style={[styles.incidentDescription, { color: '#9ca3af' }]}>Finance cluster model accuracy dropped below threshold</Text>
                <Text style={[styles.incidentTime, { color: '#f59e0b' }]}>Started 15m ago</Text>
              </View>
              <View style={[styles.incidentItem, { backgroundColor: 'rgba(245, 158, 11, 0.1)', borderColor: 'rgba(245, 158, 11, 0.3)' }]}>
                <View style={styles.incidentHeader}>
                  <Text style={[styles.incidentTitle, { color: '#f9faff' }]}>Rate Limit Exceeded</Text>
                  <View style={[styles.incidentBadge, { backgroundColor: 'rgba(245, 158, 11, 0.2)' }]}>
                    <Text style={[styles.incidentBadgeText, { color: '#f59e0b' }]}>Warning</Text>
                  </View>
                </View>
                <Text style={[styles.incidentDescription, { color: '#9ca3af' }]}>EU region API rate limiting triggered unusually high traffic</Text>
                <Text style={[styles.incidentTime, { color: '#f59e0b' }]}>Started 22m ago</Text>
              </View>
            </View>
          </View>
        </View>

        {/* Safety Guardrail Configuration */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: '#f9fafb' }]}>Safety Guardrail Configuration</Text>
          <View style={[styles.guardrailConfigContainer, { backgroundColor: 'rgba(10, 15, 25, 0.8)', borderColor: 'rgba(6, 182, 212, 0.2)' }]}>
            <View style={styles.guardrailConfigGrid}>
              <View style={styles.guardrailConfigCard}>
                <View style={styles.guardrailConfigHeader}>
                  <ShieldCheck size={20} color="#10b981" />
                  <Text style={[styles.guardrailConfigName, { color: '#f9faff' }]}>Content Filter</Text>
                </View>
                <View style={styles.guardrailConfigToggle}>
                  <View style={[styles.guardrailToggleActive, { backgroundColor: '#10b981' }]} />
                  <Text style={[styles.guardrailToggleLabel, { color: '#10b981' }]}>Active</Text>
                </View>
                <Text style={[styles.guardrailConfigSensitivity, { color: '#9ca3af' }]}>Sensitivity: High</Text>
              </View>
              <View style={styles.guardrailConfigCard}>
                <View style={styles.guardrailConfigHeader}>
                  <Eye size={20} color="#06b6d4" />
                  <Text style={[styles.guardrailConfigName, { color: '#f9faff' }]}>PII Redaction</Text>
                </View>
                <View style={styles.guardrailConfigToggle}>
                  <View style={[styles.guardrailToggleActive, { backgroundColor: '#10b981' }]} />
                  <Text style={[styles.guardrailToggleLabel, { color: '#10b981' }]}>Active</Text>
                </View>
                <Text style={[styles.guardrailConfigSensitivity, { color: '#9ca3af' }]}>Sensitivity: Medium</Text>
              </View>
              <View style={styles.guardrailConfigCard}>
                <View style={styles.guardrailConfigHeader}>
                  <Skull size={20} color="#f59e0b" />
                  <Text style={[styles.guardrailConfigName, { color: '#f9faff' }]}>Jailbreak Defense</Text>
                </View>
                <View style={styles.guardrailConfigToggle}>
                  <View style={[styles.guardrailToggleActive, { backgroundColor: '#10b981' }]} />
                  <Text style={[styles.guardrailToggleLabel, { color: '#10b981' }]}>Active</Text>
                </View>
                <Text style={[styles.guardrailConfigSensitivity, { color: '#9ca3af' }]}>Sensitivity: High</Text>
              </View>
              <View style={styles.guardrailConfigCard}>
                <View style={styles.guardrailConfigHeader}>
                  <Ghost size={20} color="#8b5cf6" />
                  <Text style={[styles.guardrailConfigName, { color: '#f9faff' }]}>Bias Detection</Text>
                </View>
                <View style={styles.guardrailConfigToggle}>
                  <View style={[styles.guardrailToggleActive, { backgroundColor: '#10b981' }]} />
                  <Text style={[styles.guardrailToggleLabel, { color: '#10b981' }]}>Active</Text>
                </View>
                <Text style={[styles.guardrailConfigSensitivity, { color: '#9ca3af' }]}>Sensitivity: Medium</Text>
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
  threatContainer: {
    padding: 20,
    borderRadius: 16,
    borderWidth: 1,
    marginBottom: 20,
  },
  threatGrid: {
    flexDirection: 'row',
    gap: 12,
  },
  threatCard: {
    flex: 1,
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    alignItems: 'center',
  },
  threatHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginBottom: 8,
  },
  threatTitle: {
    fontSize: 12,
    fontWeight: '600',
  },
  threatValue: {
    fontSize: 24,
    fontWeight: '800',
    marginBottom: 4,
  },
  threatSub: {
    fontSize: 11,
    fontWeight: '500',
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
  safetyOverview: {
    padding: 24,
    borderRadius: 16,
    borderWidth: 1,
  },
  safetyCenter: {
    alignItems: 'center',
    marginBottom: 24,
  },
  safetyRing: {
    width: 160,
    height: 160,
    borderRadius: 80,
    borderWidth: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  safetyInner: {
    alignItems: 'center',
  },
  safetyScore: {
    fontSize: 36,
    fontWeight: '800',
    marginBottom: 4,
  },
  safetyLabel: {
    fontSize: 12,
    fontWeight: '500',
  },
  safetyDetails: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: 'rgba(255, 255, 255, 0.1)',
  },
  safetyDetail: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  safetyDetailText: {
    fontSize: 13,
    fontWeight: '500',
  },
  riskGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  riskCard: {
    width: '48%',
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
  },
  riskHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
    gap: 8,
  },
  riskIcon: {
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
  },
  riskName: {
    fontSize: 12,
    fontWeight: '600',
    flex: 1,
  },
  riskContent: {
    marginBottom: 12,
  },
  riskValue: {
    fontSize: 20,
    fontWeight: '800',
    marginBottom: 4,
  },
  riskThreshold: {
    fontSize: 11,
    fontWeight: '400',
  },
  riskStatus: {
    alignSelf: 'flex-start',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 20,
  },
  riskStatusText: {
    fontSize: 10,
    fontWeight: '600',
    textTransform: 'uppercase',
  },
  guardrailsGrid: {
    gap: 12,
  },
  guardrailCard: {
    padding: 20,
    borderRadius: 16,
    borderWidth: 1,
  },
  guardrailHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  guardrailIcon: {
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  guardrailInfo: {
    flex: 1,
  },
  guardrailName: {
    fontSize: 16,
    fontWeight: '700',
    marginBottom: 4,
  },
  guardrailCategory: {
    fontSize: 12,
    fontWeight: '500',
  },
  guardrailEffectiveness: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
  },
  effectivenessValue: {
    fontSize: 18,
    fontWeight: '800',
  },
  guardrailMetrics: {
    flexDirection: 'row',
    marginBottom: 16,
    gap: 24,
  },
  guardrailMetric: {
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
  guardrailFooter: {
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
    gap: 16,
  },
  timelineItem: {
    flexDirection: 'row',
    gap: 16,
  },
  timelineLeft: {
    alignItems: 'center',
  },
  timelineDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
  },
  timelineLine: {
    width: 2,
    flex: 1,
    marginTop: 8,
  },
  timelineContent: {
    flex: 1,
    padding: 16,
    backgroundColor: 'rgba(255, 255, 255, 0.02)',
    borderRadius: 12,
  },
  timelineHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  timelineType: {
    fontSize: 14,
    fontWeight: '600',
  },
  timelineTime: {
    fontSize: 12,
    fontWeight: '400',
  },
  timelineStats: {
    flexDirection: 'row',
    gap: 24,
  },
  timelineStat: {
    flex: 1,
  },
  timelineStatLabel: {
    fontSize: 10,
    fontWeight: '500',
    marginBottom: 4,
  },
  timelineStatValue: {
    fontSize: 16,
    fontWeight: '700',
  },
  radarContainer: {
    padding: 20,
    borderRadius: 16,
    borderWidth: 1,
  },
  radarGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  radarQuadrant: {
    width: '48%',
    padding: 16,
    backgroundColor: 'rgba(255, 255, 255, 0.02)',
    borderRadius: 12,
  },
  radarTitle: {
    fontSize: 14,
    fontWeight: '700',
    marginBottom: 12,
  },
  radarMetrics: {
    gap: 12,
  },
  radarMetric: {
    gap: 6,
  },
  radarMetricLabel: {
    fontSize: 11,
    fontWeight: '500',
  },
  radarBar: {
    height: 6,
    borderRadius: 3,
    overflow: 'hidden',
  },
  radarFill: {
    height: '100%',
    borderRadius: 3,
  },
  incidentContainer: {
    padding: 20,
    borderRadius: 16,
    borderWidth: 1,
  },
  incidentStats: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  incidentStat: {
    alignItems: 'center',
  },
  incidentIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  incidentValue: {
    fontSize: 24,
    fontWeight: '800',
    marginBottom: 4,
  },
  incidentLabel: {
    fontSize: 11,
    fontWeight: '500',
    textTransform: 'uppercase',
  },
  incidentList: {
    gap: 12,
  },
  incidentItem: {
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
  },
  incidentHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  incidentTitle: {
    fontSize: 14,
    fontWeight: '600',
  },
  incidentBadge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 20,
  },
  incidentBadgeText: {
    fontSize: 11,
    fontWeight: '600',
    textTransform: 'uppercase',
  },
  incidentDescription: {
    fontSize: 12,
    fontWeight: '400',
    marginBottom: 8,
  },
  incidentTime: {
    fontSize: 11,
    fontWeight: '500',
  },
  guardrailConfigContainer: {
    padding: 20,
    borderRadius: 16,
    borderWidth: 1,
  },
  guardrailConfigGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  guardrailConfigCard: {
    width: '48%',
    padding: 16,
    backgroundColor: 'rgba(255, 255, 255, 0.02)',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
  guardrailConfigHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 12,
  },
  guardrailConfigName: {
    fontSize: 14,
    fontWeight: '600',
  },
  guardrailConfigToggle: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 8,
  },
  guardrailToggleActive: {
    width: 40,
    height: 20,
    borderRadius: 10,
  },
  guardrailToggleLabel: {
    fontSize: 12,
    fontWeight: '600',
  },
  guardrailConfigSensitivity: {
    fontSize: 11,
    fontWeight: '500',
  },
  threatRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
  threatInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    flex: 1,
  },
  threatIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  threatDetails: {
    flex: 1,
  },
  threatType: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 4,
  },
  threatSource: {
    fontSize: 12,
    fontWeight: '500',
  },
  threatMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  threatTimestamp: {
    fontSize: 12,
    fontWeight: '500',
  },
  threatStatus: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 20,
  },
  threatStatusText: {
    fontSize: 11,
    fontWeight: '600',
  },
  safetyWallContainer: {
    padding: 16,
    borderRadius: 16,
    borderWidth: 1,
    gap: 12,
  },
  safetyWallCard: {
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
  safetyWallHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  safetyWallIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  safetyWallInfo: {
    flex: 1,
  },
  safetyWallMetric: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 4,
  },
  safetyWallScore: {
    fontSize: 16,
    fontWeight: '700',
  },
  safetyWallStatus: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 20,
  },
  safetyWallStatusText: {
    fontSize: 11,
    fontWeight: '600',
  },
  safetyWallFooter: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  safetyWallViolations: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  safetyWallViolationsText: {
    fontSize: 12,
    fontWeight: '500',
  },
  advancedRadarContainer: {
    padding: 16,
    borderRadius: 16,
    borderWidth: 1,
    gap: 12,
  },
  advancedRadarRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
  advancedRadarCategory: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    flex: 1,
  },
  advancedRadarCategoryName: {
    fontSize: 14,
    fontWeight: '600',
  },
  advancedRadarSeverity: {
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 20,
  },
  advancedRadarSeverityText: {
    fontSize: 11,
    fontWeight: '600',
    textTransform: 'uppercase',
  },
  advancedRadarBarContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    flex: 1,
  },
  advancedRadarBar: {
    flex: 1,
    height: 8,
    borderRadius: 4,
    overflow: 'hidden',
  },
  advancedRadarFill: {
    height: '100%',
    borderRadius: 4,
  },
  advancedRadarValue: {
    fontSize: 14,
    fontWeight: '700',
    width: 40,
  },
});
