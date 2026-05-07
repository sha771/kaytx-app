import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useTheme } from '@/providers/ThemeProvider';
import { Activity, Briefcase, ArrowRight, Lightbulb, Calculator, Microscope, GitMerge, Tool, ListChecks, Pickaxe, BarChart3, Scale, BookOpen, AlertTriangle, Rocket, Key, HeartPulse, Workflow, Plug, Zap } from 'lucide-react-native';

export default function SubAgentsIndex() {
  const { theme } = useTheme();
  const router = useRouter();

  return (
    <ScrollView style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <View style={[styles.hero, { borderBottomColor: theme.colors.border || '#E5E5EA' }]}>
        <View style={[styles.heroIconWrap, { backgroundColor: '#6366F115' }]}><Briefcase size={48} color="#6366F1" /></View>
        <Text style={[styles.heroTitle, { color: theme.colors.text }]}>AI Management - Sub-Agents</Text>
        <Text style={[styles.heroSubtitle, { color: theme.colors.textSecondary }]}>Helper & Sub-Agent Workforce</Text>
        <View style={styles.badgesRow}>
          <View style={[styles.badge, { backgroundColor: '#34C75922' }]}><Activity size={12} color="#34C759" /><Text style={[styles.badgeText, { color: '#34C759' }]}>Active</Text></View>
          <View style={[styles.badge, { backgroundColor: '#6366F422' }]}><Briefcase size={12} color="#6366F1" /><Text style={[styles.badgeText, { color: '#6366F1' }]}>18 Agents</Text></View>
        </View>
      </View>
      <View style={[styles.section, { backgroundColor: theme.colors.card || '#F2F2F7' }]}>
        <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Sub-Agents</Text>
        <TouchableOpacity key="automation-strategy-advisor" onPress={() => router.push('/ai-agent/executive/sub-agents/automation-strategy-advisor')} style={[styles.agentCard, { backgroundColor: theme.colors.background || '#F2F2F7' }]}>
          <View style={[styles.agentIcon, { backgroundColor: '#F59E0B20' }]}><Lightbulb size={28} color="#F59E0B" /></View>
          <View style={styles.agentInfo}>
            <Text style={[styles.agentName, { color: theme.colors.text }]}>Automation Strategy Advisor</Text>
            <Text style={[styles.agentDesc, { color: theme.colors.textSecondary }]}>CAO - Sub-Agent</Text>
          </View>
          <ArrowRight size={20} color={theme.colors.textSecondary} />
        </TouchableOpacity>
        <TouchableOpacity key="roi-calculator" onPress={() => router.push('/ai-agent/executive/sub-agents/roi-calculator')} style={[styles.agentCard, { backgroundColor: theme.colors.background || '#F2F2F7' }]}>
          <View style={[styles.agentIcon, { backgroundColor: '#10B98120' }]}><Calculator size={28} color="#10B981" /></View>
          <View style={styles.agentInfo}>
            <Text style={[styles.agentName, { color: theme.colors.text }]}>Roi Calculator</Text>
            <Text style={[styles.agentDesc, { color: theme.colors.textSecondary }]}>CAO - Sub-Agent</Text>
          </View>
          <ArrowRight size={20} color={theme.colors.textSecondary} />
        </TouchableOpacity>
        <TouchableOpacity key="technology-evaluator" onPress={() => router.push('/ai-agent/executive/sub-agents/technology-evaluator')} style={[styles.agentCard, { backgroundColor: theme.colors.background || '#F2F2F7' }]}>
          <View style={[styles.agentIcon, { backgroundColor: '#3B82F620' }]}><Microscope size={28} color="#3B82F6" /></View>
          <View style={styles.agentInfo}>
            <Text style={[styles.agentName, { color: theme.colors.text }]}>Technology Evaluator</Text>
            <Text style={[styles.agentDesc, { color: theme.colors.textSecondary }]}>CAO - Sub-Agent</Text>
          </View>
          <ArrowRight size={20} color={theme.colors.textSecondary} />
        </TouchableOpacity>
        <TouchableOpacity key="automation-pipeline-manager" onPress={() => router.push('/ai-agent/executive/sub-agents/automation-pipeline-manager')} style={[styles.agentCard, { backgroundColor: theme.colors.background || '#F2F2F7' }]}>
          <View style={[styles.agentIcon, { backgroundColor: '#8B5CF620' }]}><GitMerge size={28} color="#8B5CF6" /></View>
          <View style={styles.agentInfo}>
            <Text style={[styles.agentName, { color: theme.colors.text }]}>Automation Pipeline Manager</Text>
            <Text style={[styles.agentDesc, { color: theme.colors.textSecondary }]}>VP Automation - Sub-Agent</Text>
          </View>
          <ArrowRight size={20} color={theme.colors.textSecondary} />
        </TouchableOpacity>
        <TouchableOpacity key="tool-selector" onPress={() => router.push('/ai-agent/executive/sub-agents/tool-selector')} style={[styles.agentCard, { backgroundColor: theme.colors.background || '#F2F2F7' }]}>
          <View style={[styles.agentIcon, { backgroundColor: '#06B6D420' }]}><Tool size={28} color="#06B6D4" /></View>
          <View style={styles.agentInfo}>
            <Text style={[styles.agentName, { color: theme.colors.text }]}>Tool Selector</Text>
            <Text style={[styles.agentDesc, { color: theme.colors.textSecondary }]}>VP Automation - Sub-Agent</Text>
          </View>
          <ArrowRight size={20} color={theme.colors.textSecondary} />
        </TouchableOpacity>
        <TouchableOpacity key="implementation-planner" onPress={() => router.push('/ai-agent/executive/sub-agents/implementation-planner')} style={[styles.agentCard, { backgroundColor: theme.colors.background || '#F2F2F7' }]}>
          <View style={[styles.agentIcon, { backgroundColor: '#EC489920' }]}><ListChecks size={28} color="#EC4899" /></View>
          <View style={styles.agentInfo}>
            <Text style={[styles.agentName, { color: theme.colors.text }]}>Implementation Planner</Text>
            <Text style={[styles.agentDesc, { color: theme.colors.textSecondary }]}>VP Automation - Sub-Agent</Text>
          </View>
          <ArrowRight size={20} color={theme.colors.textSecondary} />
        </TouchableOpacity>
        <TouchableOpacity key="process-miner" onPress={() => router.push('/ai-agent/executive/sub-agents/process-miner')} style={[styles.agentCard, { backgroundColor: theme.colors.background || '#F2F2F7' }]}>
          <View style={[styles.agentIcon, { backgroundColor: '#F9731620' }]}><Pickaxe size={28} color="#F97316" /></View>
          <View style={styles.agentInfo}>
            <Text style={[styles.agentName, { color: theme.colors.text }]}>Process Miner</Text>
            <Text style={[styles.agentDesc, { color: theme.colors.textSecondary }]}>VP Process Excellence - Sub-Agent</Text>
          </View>
          <ArrowRight size={20} color={theme.colors.textSecondary} />
        </TouchableOpacity>
        <TouchableOpacity key="maturity-assessor" onPress={() => router.push('/ai-agent/executive/sub-agents/maturity-assessor')} style={[styles.agentCard, { backgroundColor: theme.colors.background || '#F2F2F7' }]}>
          <View style={[styles.agentIcon, { backgroundColor: '#14B8A620' }]}><BarChart3 size={28} color="#14B8A6" /></View>
          <View style={styles.agentInfo}>
            <Text style={[styles.agentName, { color: theme.colors.text }]}>Maturity Assessor</Text>
            <Text style={[styles.agentDesc, { color: theme.colors.textSecondary }]}>VP Process Excellence - Sub-Agent</Text>
          </View>
          <ArrowRight size={20} color={theme.colors.textSecondary} />
        </TouchableOpacity>
        <TouchableOpacity key="benchmark-analyzer" onPress={() => router.push('/ai-agent/executive/sub-agents/benchmark-analyzer')} style={[styles.agentCard, { backgroundColor: theme.colors.background || '#F2F2F7' }]}>
          <View style={[styles.agentIcon, { backgroundColor: '#6366F120' }]}><Scale size={28} color="#6366F1" /></View>
          <View style={styles.agentInfo}>
            <Text style={[styles.agentName, { color: theme.colors.text }]}>Benchmark Analyzer</Text>
            <Text style={[styles.agentDesc, { color: theme.colors.textSecondary }]}>VP Process Excellence - Sub-Agent</Text>
          </View>
          <ArrowRight size={20} color={theme.colors.textSecondary} />
        </TouchableOpacity>
        <TouchableOpacity key="automation-runbook-author" onPress={() => router.push('/ai-agent/executive/sub-agents/automation-runbook-author')} style={[styles.agentCard, { backgroundColor: theme.colors.background || '#F2F2F7' }]}>
          <View style={[styles.agentIcon, { backgroundColor: '#A855F720' }]}><BookOpen size={28} color="#A855F7" /></View>
          <View style={styles.agentInfo}>
            <Text style={[styles.agentName, { color: theme.colors.text }]}>Automation Runbook Author</Text>
            <Text style={[styles.agentDesc, { color: theme.colors.textSecondary }]}>AOD Lead - Sub-Agent</Text>
          </View>
          <ArrowRight size={20} color={theme.colors.textSecondary} />
        </TouchableOpacity>
        <TouchableOpacity key="exception-handler" onPress={() => router.push('/ai-agent/executive/sub-agents/exception-handler')} style={[styles.agentCard, { backgroundColor: theme.colors.background || '#F2F2F7' }]}>
          <View style={[styles.agentIcon, { backgroundColor: '#DC262620' }]}><AlertTriangle size={28} color="#DC2626" /></View>
          <View style={styles.agentInfo}>
            <Text style={[styles.agentName, { color: theme.colors.text }]}>Exception Handler</Text>
            <Text style={[styles.agentDesc, { color: theme.colors.textSecondary }]}>AOD Lead - Sub-Agent</Text>
          </View>
          <ArrowRight size={20} color={theme.colors.textSecondary} />
        </TouchableOpacity>
        <TouchableOpacity key="performance-monitor" onPress={() => router.push('/ai-agent/executive/sub-agents/performance-monitor')} style={[styles.agentCard, { backgroundColor: theme.colors.background || '#F2F2F7' }]}>
          <View style={[styles.agentIcon, { backgroundColor: '#22C55E20' }]}><Activity size={28} color="#22C55E" /></View>
          <View style={styles.agentInfo}>
            <Text style={[styles.agentName, { color: theme.colors.text }]}>Performance Monitor</Text>
            <Text style={[styles.agentDesc, { color: theme.colors.textSecondary }]}>AOD Lead - Sub-Agent</Text>
          </View>
          <ArrowRight size={20} color={theme.colors.textSecondary} />
        </TouchableOpacity>
        <TouchableOpacity key="bot-deployer" onPress={() => router.push('/ai-agent/executive/sub-agents/bot-deployer')} style={[styles.agentCard, { backgroundColor: theme.colors.background || '#F2F2F7' }]}>
          <View style={[styles.agentIcon, { backgroundColor: '#3B82F620' }]}><Rocket size={28} color="#3B82F6" /></View>
          <View style={styles.agentInfo}>
            <Text style={[styles.agentName, { color: theme.colors.text }]}>Bot Deployer</Text>
            <Text style={[styles.agentDesc, { color: theme.colors.textSecondary }]}>RPA Manager - Sub-Agent</Text>
          </View>
          <ArrowRight size={20} color={theme.colors.textSecondary} />
        </TouchableOpacity>
        <TouchableOpacity key="license-manager" onPress={() => router.push('/ai-agent/executive/sub-agents/license-manager')} style={[styles.agentCard, { backgroundColor: theme.colors.background || '#F2F2F7' }]}>
          <View style={[styles.agentIcon, { backgroundColor: '#EAB30820' }]}><Key size={28} color="#EAB308" /></View>
          <View style={styles.agentInfo}>
            <Text style={[styles.agentName, { color: theme.colors.text }]}>License Manager</Text>
            <Text style={[styles.agentDesc, { color: theme.colors.textSecondary }]}>RPA Manager - Sub-Agent</Text>
          </View>
          <ArrowRight size={20} color={theme.colors.textSecondary} />
        </TouchableOpacity>
        <TouchableOpacity key="bot-health-monitor" onPress={() => router.push('/ai-agent/executive/sub-agents/bot-health-monitor')} style={[styles.agentCard, { backgroundColor: theme.colors.background || '#F2F2F7' }]}>
          <View style={[styles.agentIcon, { backgroundColor: '#EF444420' }]}><HeartPulse size={28} color="#EF4444" /></View>
          <View style={styles.agentInfo}>
            <Text style={[styles.agentName, { color: theme.colors.text }]}>Bot Health Monitor</Text>
            <Text style={[styles.agentDesc, { color: theme.colors.textSecondary }]}>RPA Manager - Sub-Agent</Text>
          </View>
          <ArrowRight size={20} color={theme.colors.textSecondary} />
        </TouchableOpacity>
        <TouchableOpacity key="workflow-designer" onPress={() => router.push('/ai-agent/executive/sub-agents/workflow-designer')} style={[styles.agentCard, { backgroundColor: theme.colors.background || '#F2F2F7' }]}>
          <View style={[styles.agentIcon, { backgroundColor: '#06B6D420' }]}><Workflow size={28} color="#06B6D4" /></View>
          <View style={styles.agentInfo}>
            <Text style={[styles.agentName, { color: theme.colors.text }]}>Workflow Designer</Text>
            <Text style={[styles.agentDesc, { color: theme.colors.textSecondary }]}>Workflow Specialist - Sub-Agent</Text>
          </View>
          <ArrowRight size={20} color={theme.colors.textSecondary} />
        </TouchableOpacity>
        <TouchableOpacity key="integration-builder" onPress={() => router.push('/ai-agent/executive/sub-agents/integration-builder')} style={[styles.agentCard, { backgroundColor: theme.colors.background || '#F2F2F7' }]}>
          <View style={[styles.agentIcon, { backgroundColor: '#10B98120' }]}><Plug size={28} color="#10B981" /></View>
          <View style={styles.agentInfo}>
            <Text style={[styles.agentName, { color: theme.colors.text }]}>Integration Builder</Text>
            <Text style={[styles.agentDesc, { color: theme.colors.textSecondary }]}>Workflow Specialist - Sub-Agent</Text>
          </View>
          <ArrowRight size={20} color={theme.colors.textSecondary} />
        </TouchableOpacity>
        <TouchableOpacity key="trigger-configurator" onPress={() => router.push('/ai-agent/executive/sub-agents/trigger-configurator')} style={[styles.agentCard, { backgroundColor: theme.colors.background || '#F2F2F7' }]}>
          <View style={[styles.agentIcon, { backgroundColor: '#F59E0B20' }]}><Zap size={28} color="#F59E0B" /></View>
          <View style={styles.agentInfo}>
            <Text style={[styles.agentName, { color: theme.colors.text }]}>Trigger Configurator</Text>
            <Text style={[styles.agentDesc, { color: theme.colors.textSecondary }]}>Workflow Specialist - Sub-Agent</Text>
          </View>
          <ArrowRight size={20} color={theme.colors.textSecondary} />
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  hero: { alignItems: 'center', paddingVertical: 36, paddingHorizontal: 20, borderBottomWidth: 1 },
  heroIconWrap: { width: 100, height: 100, borderRadius: 50, justifyContent: 'center', alignItems: 'center', marginBottom: 16 },
  heroTitle: { fontSize: 22, fontWeight: 'bold', textAlign: 'center' },
  heroSubtitle: { fontSize: 15, marginTop: 6, fontWeight: '500' },
  badgesRow: { flexDirection: 'row', gap: 10, marginTop: 16, flexWrap: 'wrap', justifyContent: 'center' },
  badge: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 12, paddingVertical: 6, borderRadius: 20, gap: 5 },
  badgeText: { fontSize: 12, fontWeight: '600' },
  section: { marginHorizontal: 16, marginBottom: 16, padding: 20, borderRadius: 16 },
  sectionTitle: { fontSize: 18, fontWeight: '700', marginBottom: 14 },
  agentCard: { flexDirection: 'row', alignItems: 'center', padding: 16, borderRadius: 12, marginBottom: 12 },
  agentIcon: { width: 48, height: 48, borderRadius: 24, justifyContent: 'center', alignItems: 'center', marginRight: 16 },
  agentInfo: { flex: 1 },
  agentName: { fontSize: 16, fontWeight: '600' },
  agentDesc: { fontSize: 12, marginTop: 2 },
});
