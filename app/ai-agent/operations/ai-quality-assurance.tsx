import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useTheme } from '@/providers/ThemeProvider';
import { CircleCheckBig, Activity, Users, Clock, Target, Zap, ArrowRight, Shield, FileCode, RotateCcw, Briefcase } from 'lucide-react-native';
import AgentFeatures from '@/components/ai-agent/AgentFeatures';
import { useRouter } from 'expo-router';

export default function AIQualityAssurancePage() {
  const { theme } = useTheme();
  const router = useRouter();

  return (
    <ScrollView style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <View style={[styles.hero, { borderBottomColor: theme.colors.border || '#E5E5EA' }]}>
        <View style={[styles.heroIconWrap, { backgroundColor: '#E74C3C20' }]}>
          <Shield size={56} color="#E74C3C" />
        </View>
        <Text style={[styles.heroTitle, { color: theme.colors.text }]}>AI Quality Assurance Agent</Text>
        <Text style={[styles.heroSubtitle, { color: theme.colors.textSecondary }]}>Operations - Quality Assurance & Testing</Text>
        <View style={styles.badgesRow}>
          <View style={[styles.badge, { backgroundColor: '#34C75922' }]}><Activity size={12} color="#34C759" /><Text style={[styles.badgeText, { color: '#34C759' }]}>Active</Text></View>
          <View style={[styles.badge, { backgroundColor: '#E74C3C22' }]}><Briefcase size={12} color="#E74C3C" /><Text style={[styles.badgeText, { color: '#E74C3C' }]}>Agent</Text></View>
          <View style={[styles.badge, { backgroundColor: '#007AFF22' }]}><Users size={12} color="#007AFF" /><Text style={[styles.badgeText, { color: '#007AFF' }]}>3 Sub-Agents</Text></View>
        </View>
      </View>

      <View style={styles.statsContainer}>
        {[
          {label:'Cost Equiv',value:'$130K/yr',icon: CircleCheckBig, color: '#34C759'},
          {label:'AI Cost',value:'$6.5K/yr',icon: Clock, color: '#007AFF'},
          {label:'Efficiency',value:'20x',icon: Target, color: '#FF9500'},
          {label:'Defects/Day',value:'2,826',icon: Shield, color: '#E74C3C'}
        ].map((stat,index)=>(
          <View key={index} style={[styles.statCard, { backgroundColor: theme.colors.card || '#F2F2F7' }]}>
            <stat.icon size={22} color={stat.color} />
            <Text style={[styles.statValue, { color: theme.colors.text }]}>{stat.value}</Text>
            <Text style={[styles.statLabel, { color: theme.colors.textSecondary }]}>{stat.label}</Text>
          </View>
        ))}
      </View>

      <View style={[styles.section, { backgroundColor: theme.colors.card || '#F2F2F7' }]}>
        <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Overview</Text>
        <Text style={[styles.description, { color: theme.colors.textSecondary }]}>
          The AI Quality Assurance Agent ensures product and process quality across the enterprise through automated testing,
          defect tracking, and regression management. It orchestrates comprehensive QA workflows, generates test cases
          automatically, and maintains quality standards throughout the development lifecycle.
        </Text>
      </View>

      <View style={[styles.section, { backgroundColor: theme.colors.card || '#F2F2F7' }]}>
        <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Key Responsibilities</Text>
        {[
          'Automated Test Case Generation',
          'Defect Detection & Logging',
          'Regression Testing Management',
          'Quality Standards Enforcement',
          'Test Coverage Optimization',
          'Release Quality Gatekeeping'
        ].map((item,index)=>(
          <View key={index} style={styles.responsibilityRow}>
            <ArrowRight size={14} color="#E74C3C" />
            <Text style={[styles.responsibilityText, { color: theme.colors.textSecondary }]}>{item}</Text>
          </View>
        ))}
      </View>

      <View style={[styles.section, { backgroundColor: theme.colors.card || '#F2F2F7' }]}>
        <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Core Capabilities</Text>
        <View style={styles.tagsContainer}>
          {['Test Automation','Defect Tracking','Regression Testing','Quality Metrics','Coverage Analysis','CI/CD Integration','Performance Testing','Security Scanning'].map((cap,index)=>(
            <View key={index} style={[styles.tag, { backgroundColor: '#E74C3C18' }]}>
              <Text style={[styles.tagText, { color: '#E74C3C' }]}>{cap}</Text>
            </View>
          ))}
        </View>
      </View>

      <View style={[styles.section, { backgroundColor: theme.colors.card || '#F2F2F7' }]}>
        <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Key Metrics</Text>
        {[
          { label: 'Test Coverage', value: '94.7% coverage' },
          { label: 'Defect Detection', value: '99.4% accuracy' },
          { label: 'Regression Rate', value: '< 0.5% escape' },
          { label: 'Auto-Test Rate', value: '87% automated' }
        ].map((metric,index)=>(
          <View key={index} style={styles.metricRow}>
            <View style={[styles.metricDot, { backgroundColor: '#E74C3C' }]} />
            <Text style={[styles.metricLabel, { color: theme.colors.text }]}>{metric.label}:</Text>
            <Text style={[styles.metricValue, { color: theme.colors.textSecondary }]}>{metric.value}</Text>
          </View>
        ))}
      </View>

      <View style={[styles.section, { backgroundColor: theme.colors.card || '#F2F2F7' }]}>
        <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Sub-Agents</Text>
        {[
          { name: 'AI Test Case Generator', route: '/ai-agent/operations/sub-agents/test-case-generator', icon: FileCode, color: '#007AFF', desc: 'Generates automated test cases' },
          { name: 'AI Defect Logger', route: '/ai-agent/operations/sub-agents/defect-logger', icon: Shield, color: '#E74C3C', desc: 'Tracks and logs defects' },
          { name: 'AI Regression Tracker', route: '/ai-agent/operations/sub-agents/regression-tracker', icon: RotateCcw, color: '#8B5CF6', desc: 'Monitors regression patterns' }
        ].map((sub,index)=>(
          <TouchableOpacity key={index} onPress={() => router.push(sub.route as any)} style={[styles.subAgentCard, { backgroundColor: theme.colors.background || '#F2F2F7' }]}>
            <View style={[styles.subAgentIcon, { backgroundColor: sub.color + '20' }]}><sub.icon size={24} color={sub.color} /></View>
            <View style={styles.subAgentInfo}>
              <Text style={[styles.subAgentName, { color: theme.colors.text }]}>{sub.name}</Text>
              <Text style={[styles.subAgentDesc, { color: theme.colors.textSecondary }]}>{sub.desc}</Text>
            </View>
            <ArrowRight size={20} color={theme.colors.textSecondary} />
          </TouchableOpacity>
        ))}
      </View>

      <View style={[styles.section, { backgroundColor: theme.colors.card || '#F2F2F7' }]}>
        <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>A2A Endpoints</Text>
        {['/consult/quality-assurance', '/qa/test', '/qa/regression-check'].map((endpoint,index)=>(
          <View key={index} style={styles.endpointRow}>
            <Zap size={14} color="#8B5CF6" />
            <Text style={[styles.endpointText, { color: theme.colors.textSecondary }]}>{endpoint}</Text>
          </View>
        ))}
      </View>

      <View style={[styles.section, { backgroundColor: theme.colors.card || '#F2F2F7' }]}>
        <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Quick Actions</Text>
        <View style={styles.actionsGrid}>
          <TouchableOpacity style={[styles.actionButton, { backgroundColor: '#007AFF12' }]} onPress={() => router.push('/ai-agent/operations/sub-agents/test-case-generator')}>
            <FileCode size={24} color="#007AFF" />
            <Text style={[styles.actionText, { color: '#007AFF' }]}>Test Cases</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.actionButton, { backgroundColor: '#E74C3C12' }]} onPress={() => router.push('/ai-agent/operations/sub-agents/defect-logger')}>
            <Shield size={24} color="#E74C3C" />
            <Text style={[styles.actionText, { color: '#E74C3C' }]}>Defects</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.actionButton, { backgroundColor: '#8B5CF612' }]} onPress={() => router.push('/ai-agent/operations/sub-agents/regression-tracker')}>
            <RotateCcw size={24} color="#8B5CF6" />
            <Text style={[styles.actionText, { color: '#8B5CF6' }]}>Regression</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.actionButton, { backgroundColor: '#FF6B3512' }]} onPress={() => router.push('/ai-agent/operations')}>
            <CircleCheckBig size={24} color="#FF6B35" />
            <Text style={[styles.actionText, { color: '#FF6B35' }]}>Operations</Text>
          </TouchableOpacity>
        </View>
      </View>

      <AgentFeatures agentId="ai-quality-assurance" agentName="AI Quality Assurance" />
      <View style={{ height: 40 }} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  hero: { alignItems: 'center', paddingVertical: 36, paddingHorizontal: 20, borderBottomWidth: 1 },
  heroIconWrap: { width: 100, height: 100, borderRadius: 50, justifyContent: 'center', alignItems: 'center', marginBottom: 16 },
  heroTitle: { fontSize: 26, fontWeight: 'bold', textAlign: 'center' },
  heroSubtitle: { fontSize: 15, marginTop: 6, fontWeight: '500' },
  badgesRow: { flexDirection: 'row', gap: 10, marginTop: 16, flexWrap: 'wrap', justifyContent: 'center' },
  badge: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 12, paddingVertical: 6, borderRadius: 20, gap: 5 },
  badgeText: { fontSize: 12, fontWeight: '600' },
  statsContainer: { flexDirection: 'row', flexWrap: 'wrap', padding: 16, gap: 12 },
  statCard: { flex: 1, minWidth: '22%', alignItems: 'center', padding: 14, borderRadius: 12 },
  statValue: { fontSize: 16, fontWeight: 'bold', marginTop: 8 },
  statLabel: { fontSize: 11, marginTop: 4, textAlign: 'center' },
  section: { marginHorizontal: 16, marginBottom: 16, padding: 20, borderRadius: 16 },
  sectionTitle: { fontSize: 18, fontWeight: '700', marginBottom: 14 },
  description: { fontSize: 14, lineHeight: 22 },
  tagsContainer: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  tag: { paddingHorizontal: 12, paddingVertical: 6, borderRadius: 20 },
  tagText: { fontSize: 12, fontWeight: '600' },
  responsibilityRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 10, gap: 8 },
  responsibilityText: { fontSize: 14, flex: 1, lineHeight: 20 },
  metricRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 8, gap: 8 },
  metricDot: { width: 8, height: 8, borderRadius: 4 },
  metricLabel: { fontSize: 14, fontWeight: '600' },
  metricValue: { fontSize: 14, flex: 1 },
  subAgentCard: { flexDirection: 'row', alignItems: 'center', padding: 16, borderRadius: 12, marginBottom: 8, gap: 12 },
  subAgentIcon: { width: 44, height: 44, borderRadius: 22, justifyContent: 'center', alignItems: 'center' },
  subAgentInfo: { flex: 1 },
  subAgentName: { fontSize: 16, fontWeight: '600' },
  subAgentDesc: { fontSize: 12, marginTop: 2 },
  endpointRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 8, gap: 8 },
  endpointText: { fontSize: 13, fontFamily: 'monospace' },
  actionsGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 12 },
  actionButton: { flex: 1, minWidth: '45%', alignItems: 'center', padding: 16, borderRadius: 12 },
  actionText: { fontSize: 13, fontWeight: '600', marginTop: 8 },
});
