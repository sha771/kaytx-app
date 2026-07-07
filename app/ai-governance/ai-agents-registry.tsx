/**
 * @copyright Copyright (c) 2026 Kaytx & Antigravity Ecosystem ("kaytx")
 * @license MIT - See LICENSE file for full terms
 */

import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Stack, router } from 'expo-router';
import { 
  Bot, Shield, Zap, Brain, Activity, CheckCircle, AlertTriangle, 
  ArrowLeft, ChevronRight, Cpu, Database, Globe, Lock, Eye,
  TrendingUp, Award, Settings, Play, Pause, RotateCcw, Crown,
  Users, Target, Layers, Network
} from 'lucide-react-native';

interface AIAgent {
  id: string;
  name: string;
  type: string;
  department: string;
  status: 'active' | 'paused' | 'maintenance';
  complianceScore: number;
  riskLevel: 'low' | 'medium' | 'high';
  capabilities: string[];
  lastActivity: string;
  modelVersion: string;
  requestsPerDay: number;
}

const aiAgents: AIAgent[] = [
  {
    id: '1',
    name: 'Customer Service Agent',
    type: 'Conversational',
    department: 'Support',
    status: 'active',
    complianceScore: 98,
    riskLevel: 'low',
    capabilities: ['Ticket Resolution', 'Knowledge Base', 'Sentiment Analysis'],
    lastActivity: '2 min ago',
    modelVersion: 'GPT-4-Turbo',
    requestsPerDay: 15420
  },
  {
    id: '2',
    name: 'Sales Intelligence Agent',
    type: 'Analytics',
    department: 'Sales',
    status: 'active',
    complianceScore: 95,
    riskLevel: 'low',
    capabilities: ['Lead Scoring', 'Forecasting', 'CRM Integration'],
    lastActivity: '5 min ago',
    modelVersion: 'Claude-3-Opus',
    requestsPerDay: 8230
  },
  {
    id: '3',
    name: 'Code Review Agent',
    type: 'Development',
    department: 'Engineering',
    status: 'active',
    complianceScore: 94,
    riskLevel: 'medium',
    capabilities: ['Code Analysis', 'Security Scanning', 'PR Review'],
    lastActivity: '8 min ago',
    modelVersion: 'GPT-4-Turbo',
    requestsPerDay: 4560
  },
  {
    id: '4',
    name: 'HR Assistant Agent',
    type: 'Conversational',
    department: 'Human Resources',
    status: 'paused',
    complianceScore: 92,
    riskLevel: 'medium',
    capabilities: ['Employee Queries', 'Policy Info', 'Onboarding'],
    lastActivity: '1 hour ago',
    modelVersion: 'Claude-3-Sonnet',
    requestsPerDay: 2340
  },
  {
    id: '5',
    name: 'Financial Analysis Agent',
    type: 'Analytics',
    department: 'Finance',
    status: 'active',
    complianceScore: 99,
    riskLevel: 'low',
    capabilities: ['Report Generation', 'Anomaly Detection', 'Forecasting'],
    lastActivity: '3 min ago',
    modelVersion: 'GPT-4-Turbo',
    requestsPerDay: 6780
  },
  {
    id: '6',
    name: 'Content Generation Agent',
    type: 'Creative',
    department: 'Marketing',
    status: 'maintenance',
    complianceScore: 88,
    riskLevel: 'high',
    capabilities: ['Copywriting', 'Image Generation', 'SEO Optimization'],
    lastActivity: '4 hours ago',
    modelVersion: 'DALL-E-3',
    requestsPerDay: 3450
  },
];

const agentTypes = [
  { name: 'Conversational', count: 12, color: '#06b6d4' },
  { name: 'Analytics', count: 8, color: '#8b5cf6' },
  { name: 'Development', count: 6, color: '#10b981' },
  { name: 'Creative', count: 4, color: '#f59e0b' },
];

export default function AIAgentsRegistryScreen() {
  const [selectedAgent, setSelectedAgent] = useState<AIAgent | null>(null);
  const [filterStatus, setFilterStatus] = useState<string>('all');

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return '#10b981';
      case 'paused': return '#f59e0b';
      case 'maintenance': return '#ef4444';
      default: return '#9ca3af';
    }
  };

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case 'low': return '#10b981';
      case 'medium': return '#f59e0b';
      case 'high': return '#ef4444';
      default: return '#9ca3af';
    }
  };

  const getComplianceColor = (score: number) => {
    if (score >= 95) return '#10b981';
    if (score >= 90) return '#06b6d4';
    if (score >= 85) return '#f59e0b';
    return '#ef4444';
  };

  const filteredAgents = filterStatus === 'all' 
    ? aiAgents 
    : aiAgents.filter(agent => agent.status === filterStatus);

  const AgentCard = ({ agent }: { agent: AIAgent }) => (
    <TouchableOpacity 
      style={[styles.agentCard, { backgroundColor: 'rgba(10, 15, 25, 0.8)', borderColor: `${getStatusColor(agent.status)}30` }]}
      onPress={() => setSelectedAgent(agent)}
    >
      <View style={styles.agentHeader}>
        <View style={[styles.agentIcon, { backgroundColor: `${getStatusColor(agent.status)}20` }]}>
          <Bot size={24} color={getStatusColor(agent.status)} />
        </View>
        <View style={styles.agentInfo}>
          <Text style={[styles.agentName, { color: '#f9fafb' }]}>{agent.name}</Text>
          <Text style={[styles.agentType, { color: '#9ca3af' }]}>{agent.type} • {agent.department}</Text>
        </View>
        <View style={[styles.agentStatus, { backgroundColor: `${getStatusColor(agent.status)}20` }]}>
          <Text style={[styles.agentStatusText, { color: getStatusColor(agent.status) }]}>{agent.status}</Text>
        </View>
      </View>
      
      <View style={styles.agentMetrics}>
        <View style={styles.agentMetric}>
          <Text style={[styles.metricLabel, { color: '#9ca3af' }]}>Compliance</Text>
          <Text style={[styles.metricValue, { color: getComplianceColor(agent.complianceScore) }]}>{agent.complianceScore}%</Text>
        </View>
        <View style={styles.agentMetric}>
          <Text style={[styles.metricLabel, { color: '#9ca3af' }]}>Risk Level</Text>
          <View style={[styles.riskBadge, { backgroundColor: `${getRiskColor(agent.riskLevel)}20` }]}>
            <Text style={[styles.riskBadgeText, { color: getRiskColor(agent.riskLevel) }]}>{agent.riskLevel}</Text>
          </View>
        </View>
        <View style={styles.agentMetric}>
          <Text style={[styles.metricLabel, { color: '#9ca3af' }]}>Requests/Day</Text>
          <Text style={[styles.metricValue, { color: '#f9fafb' }]}>{agent.requestsPerDay.toLocaleString()}</Text>
        </View>
      </View>

      <View style={styles.agentCapabilities}>
        <Text style={[styles.capabilitiesLabel, { color: '#9ca3af' }]}>Capabilities:</Text>
        <View style={styles.capabilitiesList}>
          {agent.capabilities.slice(0, 3).map((cap, index) => (
            <View key={index} style={[styles.capabilityTag, { backgroundColor: 'rgba(6, 182, 212, 0.2)' }]}>
              <Text style={[styles.capabilityText, { color: '#06b6d4' }]}>{cap}</Text>
            </View>
          ))}
          {agent.capabilities.length > 3 && (
            <View style={[styles.capabilityTag, { backgroundColor: 'rgba(139, 92, 246, 0.2)' }]}>
              <Text style={[styles.capabilityText, { color: '#8b5cf6' }]}>+{agent.capabilities.length - 3}</Text>
            </View>
          )}
        </View>
      </View>

      <View style={styles.agentFooter}>
        <View style={styles.agentMeta}>
          <Cpu size={14} color="#6b7280" />
          <Text style={[styles.agentMetaText, { color: '#6b7280' }]}>{agent.modelVersion}</Text>
        </View>
        <View style={styles.agentMeta}>
          <Activity size={14} color="#6b7280" />
          <Text style={[styles.agentMetaText, { color: '#6b7280' }]}>{agent.lastActivity}</Text>
        </View>
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
            <Text style={[styles.headerTitleText, { color: '#f9fafb' }]}>AI Agents Registry</Text>
            <Text style={[styles.headerSubtitle, { color: '#9ca3af' }]}>Enterprise AI Agent Management</Text>
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
                  <Text style={[styles.executiveName, { color: '#f9fafb' }]}>AI Agent Governance</Text>
                  <Text style={[styles.executiveRole, { color: '#9ca3af' }]}>Enterprise Agent Control Plane</Text>
                </View>
              </View>
              <View style={[styles.executiveBadge, { backgroundColor: 'rgba(16, 185, 129, 0.2)' }]}>
                <Text style={[styles.executiveBadgeText, { color: '#10b981' }]}>GOVERNED</Text>
              </View>
            </View>
            <View style={styles.executiveMetrics}>
              <View style={styles.executiveMetric}>
                <Text style={[styles.executiveMetricValue, { color: '#06b6d4' }]}>30</Text>
                <Text style={[styles.executiveMetricLabel, { color: '#9ca3af' }]}>Registered Agents</Text>
              </View>
              <View style={styles.executiveMetric}>
                <Text style={[styles.executiveMetricValue, { color: '#10b981' }]}>95.2%</Text>
                <Text style={[styles.executiveMetricLabel, { color: '#9ca3af' }]}>Avg Compliance</Text>
              </View>
              <View style={styles.executiveMetric}>
                <Text style={[styles.executiveMetricValue, { color: '#8b5cf6' }]}>842K</Text>
                <Text style={[styles.executiveMetricLabel, { color: '#9ca3af' }]}>Daily Requests</Text>
              </View>
              <View style={styles.executiveMetric}>
                <Text style={[styles.executiveMetricValue, { color: '#f59e0b' }]}>12</Text>
                <Text style={[styles.executiveMetricLabel, { color: '#9ca3af' }]}>High Risk</Text>
              </View>
            </View>
          </View>
        </View>

        {/* Registry Overview */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: '#f9fafb' }]}>Registry Overview</Text>
          <View style={[styles.overviewContainer, { backgroundColor: 'rgba(10, 15, 25, 0.8)', borderColor: 'rgba(6, 182, 212, 0.2)' }]}>
            <View style={styles.overviewMetrics}>
              <View style={styles.overviewMetric}>
                <View style={[styles.overviewIcon, { backgroundColor: 'rgba(6, 182, 212, 0.2)' }]}>
                  <Bot size={32} color="#06b6d4" />
                </View>
                <Text style={[styles.overviewValue, { color: '#06b6d4' }]}>30</Text>
                <Text style={[styles.overviewLabel, { color: '#9ca3af' }]}>Total Agents</Text>
              </View>
              <View style={styles.overviewMetric}>
                <View style={[styles.overviewIcon, { backgroundColor: 'rgba(16, 185, 129, 0.2)' }]}>
                  <CheckCircle size={32} color="#10b981" />
                </View>
                <Text style={[styles.overviewValue, { color: '#10b981' }]}>95.2%</Text>
                <Text style={[styles.overviewLabel, { color: '#9ca3af' }]}>Avg Compliance</Text>
              </View>
              <View style={styles.overviewMetric}>
                <View style={[styles.overviewIcon, { backgroundColor: 'rgba(139, 92, 246, 0.2)' }]}>
                  <Zap size={32} color="#8b5cf6" />
                </View>
                <Text style={[styles.overviewValue, { color: '#8b5cf6' }]}>40.8K</Text>
                <Text style={[styles.overviewLabel, { color: '#9ca3af' }]}>Daily Requests</Text>
              </View>
            </View>
          </View>
        </View>

        {/* Agent Types Distribution */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: '#f9fafb' }]}>Agent Types</Text>
          <View style={[styles.typesContainer, { backgroundColor: 'rgba(10, 15, 25, 0.8)', borderColor: 'rgba(6, 182, 212, 0.2)' }]}>
            {agentTypes.map((type, index) => (
              <View key={index} style={styles.typeItem}>
                <View style={[styles.typeDot, { backgroundColor: type.color }]} />
                <Text style={[styles.typeName, { color: '#f9fafb' }]}>{type.name}</Text>
                <Text style={[styles.typeCount, { color: type.color }]}>{type.count}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* Filter Tabs */}
        <View style={styles.section}>
          <View style={styles.filterTabs}>
            {['all', 'active', 'paused', 'maintenance'].map(status => (
              <TouchableOpacity
                key={status}
                style={[styles.filterTab, filterStatus === status && styles.filterTabActive, { backgroundColor: filterStatus === status ? 'rgba(6, 182, 212, 0.2)' : 'rgba(10, 15, 25, 0.6)' }]}
                onPress={() => setFilterStatus(status)}
              >
                <Text style={[styles.filterTabText, filterStatus === status && styles.filterTabTextActive, { color: filterStatus === status ? '#06b6d4' : '#9ca3af' }]}>
                  {status.charAt(0).toUpperCase() + status.slice(1)}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* AI Agents List */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={[styles.sectionTitle, { color: '#f9faff' }]}>Registered Agents</Text>
            <TouchableOpacity style={[styles.addButton, { backgroundColor: 'rgba(6, 182, 212, 0.2)' }]}>
              <Text style={[styles.addButtonText, { color: '#06b6d4' }]}>+ Register Agent</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.agentsGrid}>
            {filteredAgents.map(agent => (
              <AgentCard key={agent.id} agent={agent} />
            ))}
          </View>
        </View>

        {/* Agent Health Summary */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: '#f9fafb' }]}>Agent Health Summary</Text>
          <View style={[styles.healthContainer, { backgroundColor: 'rgba(10, 15, 25, 0.8)', borderColor: 'rgba(6, 182, 212, 0.2)' }]}>
            <View style={styles.healthItem}>
              <View style={[styles.healthIcon, { backgroundColor: 'rgba(16, 185, 129, 0.2)' }]}>
                <Play size={20} color="#10b981" />
              </View>
              <View style={styles.healthInfo}>
                <Text style={[styles.healthTitle, { color: '#f9fafb' }]}>Active Agents</Text>
                <Text style={[styles.healthValue, { color: '#10b981' }]}>24/30</Text>
              </View>
            </View>
            <View style={styles.healthItem}>
              <View style={[styles.healthIcon, { backgroundColor: 'rgba(245, 158, 11, 0.2)' }]}>
                <Pause size={20} color="#f59e0b" />
              </View>
              <View style={styles.healthInfo}>
                <Text style={[styles.healthTitle, { color: '#f9fafb' }]}>Paused Agents</Text>
                <Text style={[styles.healthValue, { color: '#f59e0b' }]}>4/30</Text>
              </View>
            </View>
            <View style={styles.healthItem}>
              <View style={[styles.healthIcon, { backgroundColor: 'rgba(239, 68, 68, 0.2)' }]}>
                <RotateCcw size={20} color="#ef4444" />
              </View>
              <View style={styles.healthInfo}>
                <Text style={[styles.healthTitle, { color: '#f9fafb' }]}>In Maintenance</Text>
                <Text style={[styles.healthValue, { color: '#ef4444' }]}>2/30</Text>
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
  typesContainer: {
    padding: 20,
    borderRadius: 16,
    borderWidth: 1,
    gap: 16,
  },
  typeItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  typeDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
  },
  typeName: {
    fontSize: 14,
    fontWeight: '500',
    flex: 1,
  },
  typeCount: {
    fontSize: 16,
    fontWeight: '700',
  },
  filterTabs: {
    flexDirection: 'row',
    gap: 8,
  },
  filterTab: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 8,
  },
  filterTabActive: {
    borderWidth: 1,
    borderColor: '#06b6d4',
  },
  filterTabText: {
    fontSize: 13,
    fontWeight: '600',
  },
  filterTabTextActive: {
    fontWeight: '700',
  },
  agentsGrid: {
    gap: 12,
  },
  agentCard: {
    padding: 20,
    borderRadius: 16,
    borderWidth: 1,
  },
  agentHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  agentIcon: {
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  agentInfo: {
    flex: 1,
  },
  agentName: {
    fontSize: 16,
    fontWeight: '700',
    marginBottom: 4,
  },
  agentType: {
    fontSize: 12,
    fontWeight: '500',
  },
  agentStatus: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  agentStatusText: {
    fontSize: 11,
    fontWeight: '600',
    textTransform: 'capitalize',
  },
  agentMetrics: {
    flexDirection: 'row',
    marginBottom: 16,
    gap: 24,
  },
  agentMetric: {
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
  riskBadge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
    alignSelf: 'flex-start',
  },
  riskBadgeText: {
    fontSize: 11,
    fontWeight: '600',
    textTransform: 'capitalize',
  },
  agentCapabilities: {
    marginBottom: 16,
  },
  capabilitiesLabel: {
    fontSize: 11,
    fontWeight: '500',
    marginBottom: 8,
  },
  capabilitiesList: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  capabilityTag: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  capabilityText: {
    fontSize: 11,
    fontWeight: '600',
  },
  agentFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: 'rgba(255, 255, 255, 0.1)',
  },
  agentMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  agentMetaText: {
    fontSize: 11,
    fontWeight: '400',
  },
  healthContainer: {
    padding: 20,
    borderRadius: 16,
    borderWidth: 1,
    gap: 16,
  },
  healthItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  healthIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  healthInfo: {
    flex: 1,
  },
  healthTitle: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 4,
  },
  healthValue: {
    fontSize: 18,
    fontWeight: '700',
  },
});
