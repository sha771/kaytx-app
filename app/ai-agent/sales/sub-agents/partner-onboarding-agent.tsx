import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useTheme } from '@/providers/ThemeProvider';
import { useRouter } from 'expo-router';
import { Activity, TrendingUp, TrendingDown, Target, ArrowRight, Briefcase, Brain, BarChart3, Link2, Users, UserPlus, Award, FileText, Settings, CheckCircle, Clock, ZapIcon } from 'lucide-react-native';
import AgentFeatures from '@/components/ai-agent/AgentFeatures';

const PARENT_AGENT = { id: 'vp-channel-partners', name: 'AI VP Channel Partners', route: '/ai-agent/sales/vp-channel-partners', icon: Link2, color: '#AF52DE' };

export default function PartnerOnboardingAgentPage() {
  const { theme } = useTheme();
  const router = useRouter();

  const stats = [
    { label: 'Onboarded', value: '142', icon: UserPlus, color: '#007AFF', change: '+18' },
    { label: 'In Progress', value: '34', icon: Clock, color: '#FF9500', change: '+5' },
    { label: 'Certified', value: '128', icon: Award, color: '#34C759', change: '+12' },
    { label: 'Time to Prod.', value: '28 days', icon: Target, color: '#AF52DE', change: '-4 days' },
  ];

  const kpis = [
    { label: 'Completion Rate', value: '94%', trend: 'up' },
    { label: 'Avg Onboard', value: '28 days', trend: 'down' },
    { label: 'Satisfaction', value: '4.6/5', trend: 'up' },
    { label: 'Cert Pass Rate', value: '91%', trend: 'up' },
  ];

  const capabilities = ['Partner Registration','Document Collection','Contract Workflow','Training Assignment','Certification Tracking','Portal Provisioning','Enablement Delivery','Progress Monitoring','Task Automation','Compliance Check','Welcome Sequences','Graduation'];

  const responsibilities = ['New partner registration and application processing','Document collection and verification automation','Contract workflow management and e-signature coordination','Training module assignment and progress tracking','Certification exam delivery and pass rate monitoring','Partner portal provisioning and access management','Enablement content delivery and consumption tracking','Onboarding milestone tracking and bottleneck identification','Automated reminder sequences for incomplete tasks','Compliance verification and background check coordination','Welcome sequence delivery and executive introduction scheduling','Partner graduation to productive status and handoff'];

  const activities = [
    { time: '4 min ago', text: 'TechCorp onboarded: 14 days to productive status', icon: CheckCircle, type: 'complete' },
    { time: '22 min ago', text: 'Partner certification batch: 12 SEs passed exam', icon: Award, type: 'cert' },
    { time: '38 min ago', text: 'Contract executed: CloudFirst partnership active', icon: FileText, type: 'contract' },
    { time: '1 hour ago', text: 'Training completion: 8 partners finished modules', icon: Users, type: 'training' },
    { time: '2 hours ago', text: 'Onboarding stalled: 3 partners flagged for outreach', icon: Clock, type: 'alert' },
    { time: '3 hours ago', text: 'Portal access provisioned: 5 new partners', icon: UserPlus, type: 'access' },
  ];

  const quickActions = [
    { label: 'Pipeline', icon: BarChart3 },{ label: 'New Partner', icon: UserPlus },{ label: 'Training', icon: Users },{ label: 'Certify', icon: Award },{ label: 'Contracts', icon: FileText },{ label: 'Tasks', icon: CheckCircle },{ label: 'Reports', icon: BarChart3 },{ label: 'Settings', icon: Settings },
  ];

  const typeColors: Record<string, string> = { complete: '#34C759', cert: '#007AFF', contract: '#AF52DE', training: '#FF9500', alert: '#FF3B30', access: '#5856D6' };

  return (
    <ScrollView style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <View style={[styles.hero, { backgroundColor: '#AF52DE18' }]}>
        <View style={[styles.heroIconWrap, { backgroundColor: '#AF52DE25' }]}>
          <UserPlus size={48} color="#AF52DE" />
        </View>
        <Text style={[styles.heroTitle, { color: theme.colors.text }]}>AI Partner Onboarding Agent</Text>
        <Text style={[styles.heroSubtitle, { color: theme.colors.textSecondary }]}>Partner Success • Channel Division</Text>
        <View style={styles.badgesRow}>
          <View style={[styles.badge, { backgroundColor: '#34C75922' }]}><Activity size={12} color="#34C759" /><Text style={[styles.badgeText, { color: '#34C759' }]}>Live</Text></View>
          <View style={[styles.badge, { backgroundColor: '#AF52DE22' }]}><Briefcase size={12} color="#AF52DE" /><Text style={[styles.badgeText, { color: '#AF52DE' }]}>Specialist</Text></View>
          <View style={[styles.badge, { backgroundColor: '#007AFF22' }]}><UserPlus size={12} color="#007AFF" /><Text style={[styles.badgeText, { color: '#007AFF' }]}>142 Onboarded</Text></View>
          <View style={[styles.badge, { backgroundColor: '#FF950022' }]}><Brain size={12} color="#FF9500" /><Text style={[styles.badgeText, { color: '#FF9500' }]}>AI-Powered</Text></View>
        </View>
      </View>

      <View style={styles.statsContainer}>
        {stats.map((stat, index) => { const StatIcon = stat.icon; return (
          <View key={index} style={[styles.statCard, { backgroundColor: theme.colors.card || '#F2F2F7' }]}>
            <StatIcon size={22} color={stat.color} />
            <Text style={[styles.statValue, { color: theme.colors.text }]}>{stat.value}</Text>
            <Text style={[styles.statChange, { color: stat.change.startsWith('+') ? '#34C759' : stat.change.startsWith('-') && stat.label.includes('Time') ? '#34C759' : '#FF3B30' }]}>{stat.change}</Text>
            <Text style={[styles.statLabel, { color: theme.colors.textSecondary }]}>{stat.label}</Text>
          </View>
        )})}
      </View>

      <View style={[styles.section, { backgroundColor: theme.colors.card || '#F2F2F7' }]}>
        <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Performance KPIs</Text>
        <View style={styles.kpiGrid}>
          {kpis.map((kpi, index) => (
            <View key={index} style={[styles.kpiCard, { backgroundColor: theme.colors.background }]}>
              <Text style={[styles.kpiValue, { color: theme.colors.text }]}>{kpi.value}</Text>
              <Text style={[styles.kpiLabel, { color: theme.colors.textSecondary }]}>{kpi.label}</Text>
              <View style={[styles.trendBadge, { backgroundColor: (kpi.trend === 'up' ? '#34C759' : '#FF3B30') + '22' }]}>
                {kpi.trend === 'up' ? <TrendingUp size={10} color="#34C759" /> : <TrendingDown size={10} color="#FF3B30" />}
              </View>
            </View>
          ))}
        </View>
      </View>

      <View style={[styles.section, { backgroundColor: theme.colors.card || '#F2F2F7' }]}>
        <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Overview</Text>
        <Text style={[styles.description, { color: theme.colors.textSecondary }]}>
          The AI Partner Onboarding Agent streamlines partner activation through automated workflows, training orchestration, and milestone tracking. It ensures consistent onboarding experiences, reduces time-to-productivity, and tracks partner certification progress to accelerate channel revenue generation.
        </Text>
      </View>

      <View style={[styles.section, { backgroundColor: theme.colors.card || '#F2F2F7' }]}>
        <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Core Capabilities</Text>
        <View style={styles.tagsContainer}>
          {capabilities.map((cap, index) => (<View key={index} style={[styles.tag, { backgroundColor: '#AF52DE18' }]}><Text style={[styles.tagText, { color: '#AF52DE' }]}>{cap}</Text></View>))}
        </View>
      </View>

      <View style={[styles.section, { backgroundColor: theme.colors.card || '#F2F2F7' }]}>
        <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Key Responsibilities</Text>
        {responsibilities.map((item, index) => (
          <View key={index} style={styles.responsibilityRow}>
            <View style={[styles.bulletPoint, { backgroundColor: '#AF52DE' }]} />
            <Text style={[styles.responsibilityText, { color: theme.colors.textSecondary }]}>{item}</Text>
          </View>
        ))}
      </View>

      <View style={[styles.section, { backgroundColor: theme.colors.card || '#F2F2F7' }]}>
        <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Activity Feed</Text>
        {activities.map((act, index) => { const ActIcon = act.icon; return (
          <View key={index} style={styles.activityRow}>
            <View style={[styles.activityIcon, { backgroundColor: (typeColors[act.type] || '#8E8E93') + '20' }]}>
              <ActIcon size={14} color={typeColors[act.type] || '#8E8E93'} />
            </View>
            <View style={styles.activityContent}>
              <Text style={[styles.activityText, { color: theme.colors.text }]}>{act.text}</Text>
              <Text style={[styles.activityTime, { color: theme.colors.textSecondary }]}>{act.time}</Text>
            </View>
            <View style={[styles.activityBadge, { backgroundColor: (typeColors[act.type] || '#8E8E93') + '15' }]}>
              <Text style={[styles.activityBadgeText, { color: typeColors[act.type] || '#8E8E93' }]}>{act.type}</Text>
            </View>
          </View>
        )})}
      </View>

      <View style={[styles.section, { backgroundColor: theme.colors.card || '#F2F2F7' }]}>
        <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Quick Actions</Text>
        <View style={styles.actionsGrid}>
          {quickActions.map((action, index) => { const ActionIcon = action.icon; return (
            <TouchableOpacity key={index} style={[styles.actionButton, { backgroundColor: '#AF52DE12' }]}>
              <ActionIcon size={22} color="#AF52DE" />
              <Text style={[styles.actionText, { color: '#AF52DE' }]}>{action.label}</Text>
            </TouchableOpacity>
          )})}
        </View>
      </View>

      <View style={[styles.section, { backgroundColor: theme.colors.card || '#F2F2F7' }]}>
        <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Parent Agent</Text>
        <TouchableOpacity onPress={() => router.push(PARENT_AGENT.route)} style={[styles.parentCard, { backgroundColor: theme.colors.background }]}>
          <PARENT_AGENT.icon size={24} color={PARENT_AGENT.color} />
          <View style={styles.parentInfo}>
            <Text style={[styles.parentName, { color: theme.colors.text }]}>{PARENT_AGENT.name}</Text>
            <Text style={[styles.parentDesc, { color: theme.colors.textSecondary }]}>Executive Agent • Channel Division</Text>
          </View>
          <ArrowRight size={20} color={theme.colors.textSecondary} />
        </TouchableOpacity>
      </View>

      <AgentFeatures agentId="partner-onboarding-agent" agentName="AI Partner Onboarding Agent" />
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
  statsContainer: { flexDirection: 'row', flexWrap: 'wrap', padding: 16, gap: 12 },
  statCard: { flex: 1, minWidth: '22%', alignItems: 'center', padding: 14, borderRadius: 12 },
  statValue: { fontSize: 14, fontWeight: 'bold', marginTop: 8 },
  statLabel: { fontSize: 11, marginTop: 4, textAlign: 'center' },
  section: { marginHorizontal: 16, marginBottom: 16, padding: 20, borderRadius: 16 },
  sectionTitle: { fontSize: 18, fontWeight: '700', marginBottom: 14 },
  description: { fontSize: 14, lineHeight: 22 },
  tagsContainer: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  tag: { paddingHorizontal: 12, paddingVertical: 6, borderRadius: 20 },
  tagText: { fontSize: 12, fontWeight: '600' },
  endpointRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 8, gap: 8 },
  endpointText: { fontSize: 13, fontFamily: 'monospace' },
  parentCard: { flexDirection: 'row', alignItems: 'center', padding: 16, borderRadius: 12, gap: 12 },
  parentInfo: { flex: 1 },
  parentName: { fontSize: 16, fontWeight: '600' },
  parentDesc: { fontSize: 12, marginTop: 2 },
});
