import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useTheme } from '@/providers/ThemeProvider';
import { Activity, Cpu, ArrowRight, Briefcase, Users } from 'lucide-react-native';
import { useRouter } from 'expo-router';

export default function SubAgentsIndex() {
  const { theme } = useTheme();
  const router = useRouter();

  return (
    <ScrollView style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <View style={[styles.hero, { borderBottomColor: theme.colors.border || '#E5E5EA' }]}>
        <View style={[styles.heroIconWrap, { backgroundColor: '#1565C015' }]}><Cpu size={48} color="#1565C0" /></View>
        <Text style={[styles.heroTitle, { color: theme.colors.text }]}>Technology & Engineering - Sub-Agents</Text>
        <Text style={[styles.heroSubtitle, { color: theme.colors.textSecondary }]}>Helper & Sub-Agent Workforce</Text>
        <View style={styles.badgesRow}>
          <View style={[styles.badge, { backgroundColor: '#34C75922' }]}><Activity size={12} color="#34C759" /><Text style={[styles.badgeText, { color: '#34C759' }]}>Active</Text></View>
          <View style={[styles.badge, { backgroundColor: '#1565C022' }]}><Users size={12} color="#1565C0" /><Text style={[styles.badgeText, { color: '#1565C0' }]}>48 Agents</Text></View>
        </View>
      </View>
      <View style={[styles.section, { backgroundColor: theme.colors.card || '#F2F2F7' }]}>
        <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Sub-Agents</Text>
        <TouchableOpacity key="access-policy-implementer" onPress={() => router.push('/ai-agent/tech/sub-agents/access-policy-implementer')} style={[styles.agentCard, { backgroundColor: theme.colors.background || '#F2F2F7' }]}>
          <View style={[styles.agentIcon, { backgroundColor: '#1565C020' }]}><Cpu size={28} color="#1565C0" /></View>
          <View style={styles.agentInfo}>
            <Text style={[styles.agentName, { color: theme.colors.text }]}>Access Policy Implementer</Text>
            <Text style={[styles.agentDesc, { color: theme.colors.textSecondary }]}>Sub-Agent</Text>
          </View>
          <ArrowRight size={20} color={theme.colors.textSecondary} />
        </TouchableOpacity>
        <TouchableOpacity key="accessibility-auditor" onPress={() => router.push('/ai-agent/tech/sub-agents/accessibility-auditor')} style={[styles.agentCard, { backgroundColor: theme.colors.background || '#F2F2F7' }]}>
          <View style={[styles.agentIcon, { backgroundColor: '#1565C020' }]}><Cpu size={28} color="#1565C0" /></View>
          <View style={styles.agentInfo}>
            <Text style={[styles.agentName, { color: theme.colors.text }]}>Accessibility Auditor</Text>
            <Text style={[styles.agentDesc, { color: theme.colors.textSecondary }]}>Sub-Agent</Text>
          </View>
          <ArrowRight size={20} color={theme.colors.textSecondary} />
        </TouchableOpacity>
        <TouchableOpacity key="alert-tuner" onPress={() => router.push('/ai-agent/tech/sub-agents/alert-tuner')} style={[styles.agentCard, { backgroundColor: theme.colors.background || '#F2F2F7' }]}>
          <View style={[styles.agentIcon, { backgroundColor: '#1565C020' }]}><Cpu size={28} color="#1565C0" /></View>
          <View style={styles.agentInfo}>
            <Text style={[styles.agentName, { color: theme.colors.text }]}>Alert Tuner</Text>
            <Text style={[styles.agentDesc, { color: theme.colors.textSecondary }]}>Sub-Agent</Text>
          </View>
          <ArrowRight size={20} color={theme.colors.textSecondary} />
        </TouchableOpacity>
        <TouchableOpacity key="api-design-reviewer" onPress={() => router.push('/ai-agent/tech/sub-agents/api-design-reviewer')} style={[styles.agentCard, { backgroundColor: theme.colors.background || '#F2F2F7' }]}>
          <View style={[styles.agentIcon, { backgroundColor: '#1565C020' }]}><Cpu size={28} color="#1565C0" /></View>
          <View style={styles.agentInfo}>
            <Text style={[styles.agentName, { color: theme.colors.text }]}>Api Design Reviewer</Text>
            <Text style={[styles.agentDesc, { color: theme.colors.textSecondary }]}>Sub-Agent</Text>
          </View>
          <ArrowRight size={20} color={theme.colors.textSecondary} />
        </TouchableOpacity>
        <TouchableOpacity key="api-endpoint-developer" onPress={() => router.push('/ai-agent/tech/sub-agents/api-endpoint-developer')} style={[styles.agentCard, { backgroundColor: theme.colors.background || '#F2F2F7' }]}>
          <View style={[styles.agentIcon, { backgroundColor: '#1565C020' }]}><Cpu size={28} color="#1565C0" /></View>
          <View style={styles.agentInfo}>
            <Text style={[styles.agentName, { color: theme.colors.text }]}>Api Endpoint Developer</Text>
            <Text style={[styles.agentDesc, { color: theme.colors.textSecondary }]}>Sub-Agent</Text>
          </View>
          <ArrowRight size={20} color={theme.colors.textSecondary} />
        </TouchableOpacity>
        <TouchableOpacity key="architecture-reviewer" onPress={() => router.push('/ai-agent/tech/sub-agents/architecture-reviewer')} style={[styles.agentCard, { backgroundColor: theme.colors.background || '#F2F2F7' }]}>
          <View style={[styles.agentIcon, { backgroundColor: '#1565C020' }]}><Cpu size={28} color="#1565C0" /></View>
          <View style={styles.agentInfo}>
            <Text style={[styles.agentName, { color: theme.colors.text }]}>Architecture Reviewer</Text>
            <Text style={[styles.agentDesc, { color: theme.colors.textSecondary }]}>Sub-Agent</Text>
          </View>
          <ArrowRight size={20} color={theme.colors.textSecondary} />
        </TouchableOpacity>
        <TouchableOpacity key="capacity-monitor" onPress={() => router.push('/ai-agent/tech/sub-agents/capacity-monitor')} style={[styles.agentCard, { backgroundColor: theme.colors.background || '#F2F2F7' }]}>
          <View style={[styles.agentIcon, { backgroundColor: '#1565C020' }]}><Cpu size={28} color="#1565C0" /></View>
          <View style={styles.agentInfo}>
            <Text style={[styles.agentName, { color: theme.colors.text }]}>Capacity Monitor</Text>
            <Text style={[styles.agentDesc, { color: theme.colors.textSecondary }]}>Sub-Agent</Text>
          </View>
          <ArrowRight size={20} color={theme.colors.textSecondary} />
        </TouchableOpacity>
        <TouchableOpacity key="chaos-engineering-planner" onPress={() => router.push('/ai-agent/tech/sub-agents/chaos-engineering-planner')} style={[styles.agentCard, { backgroundColor: theme.colors.background || '#F2F2F7' }]}>
          <View style={[styles.agentIcon, { backgroundColor: '#1565C020' }]}><Cpu size={28} color="#1565C0" /></View>
          <View style={styles.agentInfo}>
            <Text style={[styles.agentName, { color: theme.colors.text }]}>Chaos Engineering Planner</Text>
            <Text style={[styles.agentDesc, { color: theme.colors.textSecondary }]}>Sub-Agent</Text>
          </View>
          <ArrowRight size={20} color={theme.colors.textSecondary} />
        </TouchableOpacity>
        <TouchableOpacity key="cicd-pipeline-optimizer" onPress={() => router.push('/ai-agent/tech/sub-agents/cicd-pipeline-optimizer')} style={[styles.agentCard, { backgroundColor: theme.colors.background || '#F2F2F7' }]}>
          <View style={[styles.agentIcon, { backgroundColor: '#1565C020' }]}><Cpu size={28} color="#1565C0" /></View>
          <View style={styles.agentInfo}>
            <Text style={[styles.agentName, { color: theme.colors.text }]}>Cicd Pipeline Optimizer</Text>
            <Text style={[styles.agentDesc, { color: theme.colors.textSecondary }]}>Sub-Agent</Text>
          </View>
          <ArrowRight size={20} color={theme.colors.textSecondary} />
        </TouchableOpacity>
        <TouchableOpacity key="cloud-cost-optimizer" onPress={() => router.push('/ai-agent/tech/sub-agents/cloud-cost-optimizer')} style={[styles.agentCard, { backgroundColor: theme.colors.background || '#F2F2F7' }]}>
          <View style={[styles.agentIcon, { backgroundColor: '#1565C020' }]}><Cpu size={28} color="#1565C0" /></View>
          <View style={styles.agentInfo}>
            <Text style={[styles.agentName, { color: theme.colors.text }]}>Cloud Cost Optimizer</Text>
            <Text style={[styles.agentDesc, { color: theme.colors.textSecondary }]}>Sub-Agent</Text>
          </View>
          <ArrowRight size={20} color={theme.colors.textSecondary} />
        </TouchableOpacity>
        <TouchableOpacity key="component-builder" onPress={() => router.push('/ai-agent/tech/sub-agents/component-builder')} style={[styles.agentCard, { backgroundColor: theme.colors.background || '#F2F2F7' }]}>
          <View style={[styles.agentIcon, { backgroundColor: '#1565C020' }]}><Cpu size={28} color="#1565C0" /></View>
          <View style={styles.agentInfo}>
            <Text style={[styles.agentName, { color: theme.colors.text }]}>Component Builder</Text>
            <Text style={[styles.agentDesc, { color: theme.colors.textSecondary }]}>Sub-Agent</Text>
          </View>
          <ArrowRight size={20} color={theme.colors.textSecondary} />
        </TouchableOpacity>
        <TouchableOpacity key="cross-browser-tester" onPress={() => router.push('/ai-agent/tech/sub-agents/cross-browser-tester')} style={[styles.agentCard, { backgroundColor: theme.colors.background || '#F2F2F7' }]}>
          <View style={[styles.agentIcon, { backgroundColor: '#1565C020' }]}><Cpu size={28} color="#1565C0" /></View>
          <View style={styles.agentInfo}>
            <Text style={[styles.agentName, { color: theme.colors.text }]}>Cross Browser Tester</Text>
            <Text style={[styles.agentDesc, { color: theme.colors.textSecondary }]}>Sub-Agent</Text>
          </View>
          <ArrowRight size={20} color={theme.colors.textSecondary} />
        </TouchableOpacity>
        <TouchableOpacity key="data-quality-checker" onPress={() => router.push('/ai-agent/tech/sub-agents/data-quality-checker')} style={[styles.agentCard, { backgroundColor: theme.colors.background || '#F2F2F7' }]}>
          <View style={[styles.agentIcon, { backgroundColor: '#1565C020' }]}><Cpu size={28} color="#1565C0" /></View>
          <View style={styles.agentInfo}>
            <Text style={[styles.agentName, { color: theme.colors.text }]}>Data Quality Checker</Text>
            <Text style={[styles.agentDesc, { color: theme.colors.textSecondary }]}>Sub-Agent</Text>
          </View>
          <ArrowRight size={20} color={theme.colors.textSecondary} />
        </TouchableOpacity>
        <TouchableOpacity key="data-validator" onPress={() => router.push('/ai-agent/tech/sub-agents/data-validator')} style={[styles.agentCard, { backgroundColor: theme.colors.background || '#F2F2F7' }]}>
          <View style={[styles.agentIcon, { backgroundColor: '#1565C020' }]}><Cpu size={28} color="#1565C0" /></View>
          <View style={styles.agentInfo}>
            <Text style={[styles.agentName, { color: theme.colors.text }]}>Data Validator</Text>
            <Text style={[styles.agentDesc, { color: theme.colors.textSecondary }]}>Sub-Agent</Text>
          </View>
          <ArrowRight size={20} color={theme.colors.textSecondary} />
        </TouchableOpacity>
        <TouchableOpacity key="database-query-optimizer" onPress={() => router.push('/ai-agent/tech/sub-agents/database-query-optimizer')} style={[styles.agentCard, { backgroundColor: theme.colors.background || '#F2F2F7' }]}>
          <View style={[styles.agentIcon, { backgroundColor: '#1565C020' }]}><Cpu size={28} color="#1565C0" /></View>
          <View style={styles.agentInfo}>
            <Text style={[styles.agentName, { color: theme.colors.text }]}>Database Query Optimizer</Text>
            <Text style={[styles.agentDesc, { color: theme.colors.textSecondary }]}>Sub-Agent</Text>
          </View>
          <ArrowRight size={20} color={theme.colors.textSecondary} />
        </TouchableOpacity>
        <TouchableOpacity key="deployment-coordinator" onPress={() => router.push('/ai-agent/tech/sub-agents/deployment-coordinator')} style={[styles.agentCard, { backgroundColor: theme.colors.background || '#F2F2F7' }]}>
          <View style={[styles.agentIcon, { backgroundColor: '#1565C020' }]}><Cpu size={28} color="#1565C0" /></View>
          <View style={styles.agentInfo}>
            <Text style={[styles.agentName, { color: theme.colors.text }]}>Deployment Coordinator</Text>
            <Text style={[styles.agentDesc, { color: theme.colors.textSecondary }]}>Sub-Agent</Text>
          </View>
          <ArrowRight size={20} color={theme.colors.textSecondary} />
        </TouchableOpacity>
        <TouchableOpacity key="design-pattern-advisor" onPress={() => router.push('/ai-agent/tech/sub-agents/design-pattern-advisor')} style={[styles.agentCard, { backgroundColor: theme.colors.background || '#F2F2F7' }]}>
          <View style={[styles.agentIcon, { backgroundColor: '#1565C020' }]}><Cpu size={28} color="#1565C0" /></View>
          <View style={styles.agentInfo}>
            <Text style={[styles.agentName, { color: theme.colors.text }]}>Design Pattern Advisor</Text>
            <Text style={[styles.agentDesc, { color: theme.colors.textSecondary }]}>Sub-Agent</Text>
          </View>
          <ArrowRight size={20} color={theme.colors.textSecondary} />
        </TouchableOpacity>
        <TouchableOpacity key="e2e-test-writer" onPress={() => router.push('/ai-agent/tech/sub-agents/e2e-test-writer')} style={[styles.agentCard, { backgroundColor: theme.colors.background || '#F2F2F7' }]}>
          <View style={[styles.agentIcon, { backgroundColor: '#1565C020' }]}><Cpu size={28} color="#1565C0" /></View>
          <View style={styles.agentInfo}>
            <Text style={[styles.agentName, { color: theme.colors.text }]}>E2e Test Writer</Text>
            <Text style={[styles.agentDesc, { color: theme.colors.textSecondary }]}>Sub-Agent</Text>
          </View>
          <ArrowRight size={20} color={theme.colors.textSecondary} />
        </TouchableOpacity>
        <TouchableOpacity key="engineering-metrics-tracker" onPress={() => router.push('/ai-agent/tech/sub-agents/engineering-metrics-tracker')} style={[styles.agentCard, { backgroundColor: theme.colors.background || '#F2F2F7' }]}>
          <View style={[styles.agentIcon, { backgroundColor: '#1565C020' }]}><Cpu size={28} color="#1565C0" /></View>
          <View style={styles.agentInfo}>
            <Text style={[styles.agentName, { color: theme.colors.text }]}>Engineering Metrics Tracker</Text>
            <Text style={[styles.agentDesc, { color: theme.colors.textSecondary }]}>Sub-Agent</Text>
          </View>
          <ArrowRight size={20} color={theme.colors.textSecondary} />
        </TouchableOpacity>
        <TouchableOpacity key="ethics-reviewer" onPress={() => router.push('/ai-agent/tech/sub-agents/ethics-reviewer')} style={[styles.agentCard, { backgroundColor: theme.colors.background || '#F2F2F7' }]}>
          <View style={[styles.agentIcon, { backgroundColor: '#1565C020' }]}><Cpu size={28} color="#1565C0" /></View>
          <View style={styles.agentInfo}>
            <Text style={[styles.agentName, { color: theme.colors.text }]}>Ethics Reviewer</Text>
            <Text style={[styles.agentDesc, { color: theme.colors.textSecondary }]}>Sub-Agent</Text>
          </View>
          <ArrowRight size={20} color={theme.colors.textSecondary} />
        </TouchableOpacity>
        <TouchableOpacity key="flaky-test-detector" onPress={() => router.push('/ai-agent/tech/sub-agents/flaky-test-detector')} style={[styles.agentCard, { backgroundColor: theme.colors.background || '#F2F2F7' }]}>
          <View style={[styles.agentIcon, { backgroundColor: '#1565C020' }]}><Cpu size={28} color="#1565C0" /></View>
          <View style={styles.agentInfo}>
            <Text style={[styles.agentName, { color: theme.colors.text }]}>Flaky Test Detector</Text>
            <Text style={[styles.agentDesc, { color: theme.colors.textSecondary }]}>Sub-Agent</Text>
          </View>
          <ArrowRight size={20} color={theme.colors.textSecondary} />
        </TouchableOpacity>
        <TouchableOpacity key="incident-commander" onPress={() => router.push('/ai-agent/tech/sub-agents/incident-commander')} style={[styles.agentCard, { backgroundColor: theme.colors.background || '#F2F2F7' }]}>
          <View style={[styles.agentIcon, { backgroundColor: '#1565C020' }]}><Cpu size={28} color="#1565C0" /></View>
          <View style={styles.agentInfo}>
            <Text style={[styles.agentName, { color: theme.colors.text }]}>Incident Commander</Text>
            <Text style={[styles.agentDesc, { color: theme.colors.textSecondary }]}>Sub-Agent</Text>
          </View>
          <ArrowRight size={20} color={theme.colors.textSecondary} />
        </TouchableOpacity>
        <TouchableOpacity key="incident-post-mortem-facilitator" onPress={() => router.push('/ai-agent/tech/sub-agents/incident-post-mortem-facilitator')} style={[styles.agentCard, { backgroundColor: theme.colors.background || '#F2F2F7' }]}>
          <View style={[styles.agentIcon, { backgroundColor: '#1565C020' }]}><Cpu size={28} color="#1565C0" /></View>
          <View style={styles.agentInfo}>
            <Text style={[styles.agentName, { color: theme.colors.text }]}>Incident Post Mortem Facilitator</Text>
            <Text style={[styles.agentDesc, { color: theme.colors.textSecondary }]}>Sub-Agent</Text>
          </View>
          <ArrowRight size={20} color={theme.colors.textSecondary} />
        </TouchableOpacity>
        <TouchableOpacity key="innovation-scout" onPress={() => router.push('/ai-agent/tech/sub-agents/innovation-scout')} style={[styles.agentCard, { backgroundColor: theme.colors.background || '#F2F2F7' }]}>
          <View style={[styles.agentIcon, { backgroundColor: '#1565C020' }]}><Cpu size={28} color="#1565C0" /></View>
          <View style={styles.agentInfo}>
            <Text style={[styles.agentName, { color: theme.colors.text }]}>Innovation Scout</Text>
            <Text style={[styles.agentDesc, { color: theme.colors.textSecondary }]}>Sub-Agent</Text>
          </View>
          <ArrowRight size={20} color={theme.colors.textSecondary} />
        </TouchableOpacity>
        <TouchableOpacity key="integration-planner" onPress={() => router.push('/ai-agent/tech/sub-agents/integration-planner')} style={[styles.agentCard, { backgroundColor: theme.colors.background || '#F2F2F7' }]}>
          <View style={[styles.agentIcon, { backgroundColor: '#1565C020' }]}><Cpu size={28} color="#1565C0" /></View>
          <View style={styles.agentInfo}>
            <Text style={[styles.agentName, { color: theme.colors.text }]}>Integration Planner</Text>
            <Text style={[styles.agentDesc, { color: theme.colors.textSecondary }]}>Sub-Agent</Text>
          </View>
          <ArrowRight size={20} color={theme.colors.textSecondary} />
        </TouchableOpacity>
        <TouchableOpacity key="model-performance-monitor" onPress={() => router.push('/ai-agent/tech/sub-agents/model-performance-monitor')} style={[styles.agentCard, { backgroundColor: theme.colors.background || '#F2F2F7' }]}>
          <View style={[styles.agentIcon, { backgroundColor: '#1565C020' }]}><Cpu size={28} color="#1565C0" /></View>
          <View style={styles.agentInfo}>
            <Text style={[styles.agentName, { color: theme.colors.text }]}>Model Performance Monitor</Text>
            <Text style={[styles.agentDesc, { color: theme.colors.textSecondary }]}>Sub-Agent</Text>
          </View>
          <ArrowRight size={20} color={theme.colors.textSecondary} />
        </TouchableOpacity>
        <TouchableOpacity key="pen-test-script-writer" onPress={() => router.push('/ai-agent/tech/sub-agents/pen-test-script-writer')} style={[styles.agentCard, { backgroundColor: theme.colors.background || '#F2F2F7' }]}>
          <View style={[styles.agentIcon, { backgroundColor: '#1565C020' }]}><Cpu size={28} color="#1565C0" /></View>
          <View style={styles.agentInfo}>
            <Text style={[styles.agentName, { color: theme.colors.text }]}>Pen Test Script Writer</Text>
            <Text style={[styles.agentDesc, { color: theme.colors.textSecondary }]}>Sub-Agent</Text>
          </View>
          <ArrowRight size={20} color={theme.colors.textSecondary} />
        </TouchableOpacity>
        <TouchableOpacity key="performance-profiler" onPress={() => router.push('/ai-agent/tech/sub-agents/performance-profiler')} style={[styles.agentCard, { backgroundColor: theme.colors.background || '#F2F2F7' }]}>
          <View style={[styles.agentIcon, { backgroundColor: '#1565C020' }]}><Cpu size={28} color="#1565C0" /></View>
          <View style={styles.agentInfo}>
            <Text style={[styles.agentName, { color: theme.colors.text }]}>Performance Profiler</Text>
            <Text style={[styles.agentDesc, { color: theme.colors.textSecondary }]}>Sub-Agent</Text>
          </View>
          <ArrowRight size={20} color={theme.colors.textSecondary} />
        </TouchableOpacity>
        <TouchableOpacity key="pipeline-builder" onPress={() => router.push('/ai-agent/tech/sub-agents/pipeline-builder')} style={[styles.agentCard, { backgroundColor: theme.colors.background || '#F2F2F7' }]}>
          <View style={[styles.agentIcon, { backgroundColor: '#1565C020' }]}><Cpu size={28} color="#1565C0" /></View>
          <View style={styles.agentInfo}>
            <Text style={[styles.agentName, { color: theme.colors.text }]}>Pipeline Builder</Text>
            <Text style={[styles.agentDesc, { color: theme.colors.textSecondary }]}>Sub-Agent</Text>
          </View>
          <ArrowRight size={20} color={theme.colors.textSecondary} />
        </TouchableOpacity>
        <TouchableOpacity key="runbook-author" onPress={() => router.push('/ai-agent/tech/sub-agents/runbook-author')} style={[styles.agentCard, { backgroundColor: theme.colors.background || '#F2F2F7' }]}>
          <View style={[styles.agentIcon, { backgroundColor: '#1565C020' }]}><Cpu size={28} color="#1565C0" /></View>
          <View style={styles.agentInfo}>
            <Text style={[styles.agentName, { color: theme.colors.text }]}>Runbook Author</Text>
            <Text style={[styles.agentDesc, { color: theme.colors.textSecondary }]}>Sub-Agent</Text>
          </View>
          <ArrowRight size={20} color={theme.colors.textSecondary} />
        </TouchableOpacity>
        <TouchableOpacity key="scalability-planner" onPress={() => router.push('/ai-agent/tech/sub-agents/scalability-planner')} style={[styles.agentCard, { backgroundColor: theme.colors.background || '#F2F2F7' }]}>
          <View style={[styles.agentIcon, { backgroundColor: '#1565C020' }]}><Cpu size={28} color="#1565C0" /></View>
          <View style={styles.agentInfo}>
            <Text style={[styles.agentName, { color: theme.colors.text }]}>Scalability Planner</Text>
            <Text style={[styles.agentDesc, { color: theme.colors.textSecondary }]}>Sub-Agent</Text>
          </View>
          <ArrowRight size={20} color={theme.colors.textSecondary} />
        </TouchableOpacity>
        <TouchableOpacity key="schema-migration-planner" onPress={() => router.push('/ai-agent/tech/sub-agents/schema-migration-planner')} style={[styles.agentCard, { backgroundColor: theme.colors.background || '#F2F2F7' }]}>
          <View style={[styles.agentIcon, { backgroundColor: '#1565C020' }]}><Cpu size={28} color="#1565C0" /></View>
          <View style={styles.agentInfo}>
            <Text style={[styles.agentName, { color: theme.colors.text }]}>Schema Migration Planner</Text>
            <Text style={[styles.agentDesc, { color: theme.colors.textSecondary }]}>Sub-Agent</Text>
          </View>
          <ArrowRight size={20} color={theme.colors.textSecondary} />
        </TouchableOpacity>
        <TouchableOpacity key="security-patch-tracker" onPress={() => router.push('/ai-agent/tech/sub-agents/security-patch-tracker')} style={[styles.agentCard, { backgroundColor: theme.colors.background || '#F2F2F7' }]}>
          <View style={[styles.agentIcon, { backgroundColor: '#1565C020' }]}><Cpu size={28} color="#1565C0" /></View>
          <View style={styles.agentInfo}>
            <Text style={[styles.agentName, { color: theme.colors.text }]}>Security Patch Tracker</Text>
            <Text style={[styles.agentDesc, { color: theme.colors.textSecondary }]}>Sub-Agent</Text>
          </View>
          <ArrowRight size={20} color={theme.colors.textSecondary} />
        </TouchableOpacity>
        <TouchableOpacity key="security-tool-evaluator" onPress={() => router.push('/ai-agent/tech/sub-agents/security-tool-evaluator')} style={[styles.agentCard, { backgroundColor: theme.colors.background || '#F2F2F7' }]}>
          <View style={[styles.agentIcon, { backgroundColor: '#1565C020' }]}><Cpu size={28} color="#1565C0" /></View>
          <View style={styles.agentInfo}>
            <Text style={[styles.agentName, { color: theme.colors.text }]}>Security Tool Evaluator</Text>
            <Text style={[styles.agentDesc, { color: theme.colors.textSecondary }]}>Sub-Agent</Text>
          </View>
          <ArrowRight size={20} color={theme.colors.textSecondary} />
        </TouchableOpacity>
        <TouchableOpacity key="service-integrator" onPress={() => router.push('/ai-agent/tech/sub-agents/service-integrator')} style={[styles.agentCard, { backgroundColor: theme.colors.background || '#F2F2F7' }]}>
          <View style={[styles.agentIcon, { backgroundColor: '#1565C020' }]}><Cpu size={28} color="#1565C0" /></View>
          <View style={styles.agentInfo}>
            <Text style={[styles.agentName, { color: theme.colors.text }]}>Service Integrator</Text>
            <Text style={[styles.agentDesc, { color: theme.colors.textSecondary }]}>Sub-Agent</Text>
          </View>
          <ArrowRight size={20} color={theme.colors.textSecondary} />
        </TouchableOpacity>
        <TouchableOpacity key="service-mesh-coordinator" onPress={() => router.push('/ai-agent/tech/sub-agents/service-mesh-coordinator')} style={[styles.agentCard, { backgroundColor: theme.colors.background || '#F2F2F7' }]}>
          <View style={[styles.agentIcon, { backgroundColor: '#1565C020' }]}><Cpu size={28} color="#1565C0" /></View>
          <View style={styles.agentInfo}>
            <Text style={[styles.agentName, { color: theme.colors.text }]}>Service Mesh Coordinator</Text>
            <Text style={[styles.agentDesc, { color: theme.colors.textSecondary }]}>Sub-Agent</Text>
          </View>
          <ArrowRight size={20} color={theme.colors.textSecondary} />
        </TouchableOpacity>
        <TouchableOpacity key="sla-calculator" onPress={() => router.push('/ai-agent/tech/sub-agents/sla-calculator')} style={[styles.agentCard, { backgroundColor: theme.colors.background || '#F2F2F7' }]}>
          <View style={[styles.agentIcon, { backgroundColor: '#1565C020' }]}><Cpu size={28} color="#1565C0" /></View>
          <View style={styles.agentInfo}>
            <Text style={[styles.agentName, { color: theme.colors.text }]}>Sla Calculator</Text>
            <Text style={[styles.agentDesc, { color: theme.colors.textSecondary }]}>Sub-Agent</Text>
          </View>
          <ArrowRight size={20} color={theme.colors.textSecondary} />
        </TouchableOpacity>
        <TouchableOpacity key="sprint-capacity-planner" onPress={() => router.push('/ai-agent/tech/sub-agents/sprint-capacity-planner')} style={[styles.agentCard, { backgroundColor: theme.colors.background || '#F2F2F7' }]}>
          <View style={[styles.agentIcon, { backgroundColor: '#1565C020' }]}><Cpu size={28} color="#1565C0" /></View>
          <View style={styles.agentInfo}>
            <Text style={[styles.agentName, { color: theme.colors.text }]}>Sprint Capacity Planner</Text>
            <Text style={[styles.agentDesc, { color: theme.colors.textSecondary }]}>Sub-Agent</Text>
          </View>
          <ArrowRight size={20} color={theme.colors.textSecondary} />
        </TouchableOpacity>
        <TouchableOpacity key="style-enforcer" onPress={() => router.push('/ai-agent/tech/sub-agents/style-enforcer')} style={[styles.agentCard, { backgroundColor: theme.colors.background || '#F2F2F7' }]}>
          <View style={[styles.agentIcon, { backgroundColor: '#1565C020' }]}><Cpu size={28} color="#1565C0" /></View>
          <View style={styles.agentInfo}>
            <Text style={[styles.agentName, { color: theme.colors.text }]}>Style Enforcer</Text>
            <Text style={[styles.agentDesc, { color: theme.colors.textSecondary }]}>Sub-Agent</Text>
          </View>
          <ArrowRight size={20} color={theme.colors.textSecondary} />
        </TouchableOpacity>
        <TouchableOpacity key="tech-debt-prioritizer" onPress={() => router.push('/ai-agent/tech/sub-agents/tech-debt-prioritizer')} style={[styles.agentCard, { backgroundColor: theme.colors.background || '#F2F2F7' }]}>
          <View style={[styles.agentIcon, { backgroundColor: '#1565C020' }]}><Cpu size={28} color="#1565C0" /></View>
          <View style={styles.agentInfo}>
            <Text style={[styles.agentName, { color: theme.colors.text }]}>Tech Debt Prioritizer</Text>
            <Text style={[styles.agentDesc, { color: theme.colors.textSecondary }]}>Sub-Agent</Text>
          </View>
          <ArrowRight size={20} color={theme.colors.textSecondary} />
        </TouchableOpacity>
        <TouchableOpacity key="tech-standard-enforcer" onPress={() => router.push('/ai-agent/tech/sub-agents/tech-standard-enforcer')} style={[styles.agentCard, { backgroundColor: theme.colors.background || '#F2F2F7' }]}>
          <View style={[styles.agentIcon, { backgroundColor: '#1565C020' }]}><Cpu size={28} color="#1565C0" /></View>
          <View style={styles.agentInfo}>
            <Text style={[styles.agentName, { color: theme.colors.text }]}>Tech Standard Enforcer</Text>
            <Text style={[styles.agentDesc, { color: theme.colors.textSecondary }]}>Sub-Agent</Text>
          </View>
          <ArrowRight size={20} color={theme.colors.textSecondary} />
        </TouchableOpacity>
        <TouchableOpacity key="tech-strategy-advisor" onPress={() => router.push('/ai-agent/tech/sub-agents/tech-strategy-advisor')} style={[styles.agentCard, { backgroundColor: theme.colors.background || '#F2F2F7' }]}>
          <View style={[styles.agentIcon, { backgroundColor: '#1565C020' }]}><Cpu size={28} color="#1565C0" /></View>
          <View style={styles.agentInfo}>
            <Text style={[styles.agentName, { color: theme.colors.text }]}>Tech Strategy Advisor</Text>
            <Text style={[styles.agentDesc, { color: theme.colors.textSecondary }]}>Sub-Agent</Text>
          </View>
          <ArrowRight size={20} color={theme.colors.textSecondary} />
        </TouchableOpacity>
        <TouchableOpacity key="test-framework-maintainer" onPress={() => router.push('/ai-agent/tech/sub-agents/test-framework-maintainer')} style={[styles.agentCard, { backgroundColor: theme.colors.background || '#F2F2F7' }]}>
          <View style={[styles.agentIcon, { backgroundColor: '#1565C020' }]}><Cpu size={28} color="#1565C0" /></View>
          <View style={styles.agentInfo}>
            <Text style={[styles.agentName, { color: theme.colors.text }]}>Test Framework Maintainer</Text>
            <Text style={[styles.agentDesc, { color: theme.colors.textSecondary }]}>Sub-Agent</Text>
          </View>
          <ArrowRight size={20} color={theme.colors.textSecondary} />
        </TouchableOpacity>
        <TouchableOpacity key="threat-intelligence-aggregator" onPress={() => router.push('/ai-agent/tech/sub-agents/threat-intelligence-aggregator')} style={[styles.agentCard, { backgroundColor: theme.colors.background || '#F2F2F7' }]}>
          <View style={[styles.agentIcon, { backgroundColor: '#1565C020' }]}><Cpu size={28} color="#1565C0" /></View>
          <View style={styles.agentInfo}>
            <Text style={[styles.agentName, { color: theme.colors.text }]}>Threat Intelligence Aggregator</Text>
            <Text style={[styles.agentDesc, { color: theme.colors.textSecondary }]}>Sub-Agent</Text>
          </View>
          <ArrowRight size={20} color={theme.colors.textSecondary} />
        </TouchableOpacity>
        <TouchableOpacity key="training-data-curator" onPress={() => router.push('/ai-agent/tech/sub-agents/training-data-curator')} style={[styles.agentCard, { backgroundColor: theme.colors.background || '#F2F2F7' }]}>
          <View style={[styles.agentIcon, { backgroundColor: '#1565C020' }]}><Cpu size={28} color="#1565C0" /></View>
          <View style={styles.agentInfo}>
            <Text style={[styles.agentName, { color: theme.colors.text }]}>Training Data Curator</Text>
            <Text style={[styles.agentDesc, { color: theme.colors.textSecondary }]}>Sub-Agent</Text>
          </View>
          <ArrowRight size={20} color={theme.colors.textSecondary} />
        </TouchableOpacity>
        <TouchableOpacity key="ui-component-librarian" onPress={() => router.push('/ai-agent/tech/sub-agents/ui-component-librarian')} style={[styles.agentCard, { backgroundColor: theme.colors.background || '#F2F2F7' }]}>
          <View style={[styles.agentIcon, { backgroundColor: '#1565C020' }]}><Cpu size={28} color="#1565C0" /></View>
          <View style={styles.agentInfo}>
            <Text style={[styles.agentName, { color: theme.colors.text }]}>Ui Component Librarian</Text>
            <Text style={[styles.agentDesc, { color: theme.colors.textSecondary }]}>Sub-Agent</Text>
          </View>
          <ArrowRight size={20} color={theme.colors.textSecondary} />
        </TouchableOpacity>
        <TouchableOpacity key="uptime-monitor" onPress={() => router.push('/ai-agent/tech/sub-agents/uptime-monitor')} style={[styles.agentCard, { backgroundColor: theme.colors.background || '#F2F2F7' }]}>
          <View style={[styles.agentIcon, { backgroundColor: '#1565C020' }]}><Cpu size={28} color="#1565C0" /></View>
          <View style={styles.agentInfo}>
            <Text style={[styles.agentName, { color: theme.colors.text }]}>Uptime Monitor</Text>
            <Text style={[styles.agentDesc, { color: theme.colors.textSecondary }]}>Sub-Agent</Text>
          </View>
          <ArrowRight size={20} color={theme.colors.textSecondary} />
        </TouchableOpacity>
        <TouchableOpacity key="vulnerability-scanner" onPress={() => router.push('/ai-agent/tech/sub-agents/vulnerability-scanner')} style={[styles.agentCard, { backgroundColor: theme.colors.background || '#F2F2F7' }]}>
          <View style={[styles.agentIcon, { backgroundColor: '#1565C020' }]}><Cpu size={28} color="#1565C0" /></View>
          <View style={styles.agentInfo}>
            <Text style={[styles.agentName, { color: theme.colors.text }]}>Vulnerability Scanner</Text>
            <Text style={[styles.agentDesc, { color: theme.colors.textSecondary }]}>Sub-Agent</Text>
          </View>
          <ArrowRight size={20} color={theme.colors.textSecondary} />
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  hero: { alignItems: 'center', paddingVertical: 32, paddingHorizontal: 20, borderBottomWidth: 1 },
  heroIconWrap: { width: 88, height: 88, borderRadius: 44, justifyContent: 'center', alignItems: 'center', marginBottom: 16 },
  heroTitle: { fontSize: 26, fontWeight: 'bold' },
  heroSubtitle: { fontSize: 15, marginTop: 4, fontWeight: '500' },
  badgesRow: { flexDirection: 'row', gap: 10, marginTop: 16 },
  badge: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 10, paddingVertical: 5, borderRadius: 20, gap: 4 },
  badgeText: { fontSize: 12, fontWeight: '600' },
  section: { marginHorizontal: 16, marginBottom: 16, padding: 20, borderRadius: 16 },
  sectionTitle: { fontSize: 18, fontWeight: '700', marginBottom: 14 },
  agentCard: { flexDirection: 'row', alignItems: 'center', padding: 16, borderRadius: 12, marginBottom: 12 },
  agentIcon: { width: 48, height: 48, borderRadius: 12, alignItems: 'center', justifyContent: 'center' },
  agentInfo: { flex: 1, marginLeft: 12 },
  agentName: { fontSize: 16, fontWeight: '600' },
  agentDesc: { fontSize: 12, marginTop: 2 },
});
