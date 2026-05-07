import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useTheme } from '@/providers/ThemeProvider';
import { FileText, Activity, Star, CircleCheckBig, Target, ChartBarBig, Calendar, ArrowRight, Users, Zap, CalendarDays, CheckCircle, RefreshCw, TrendingUp, TrendingDown, DollarSign, BarChart3, Brain, Briefcase, Settings, Eye } from 'lucide-react-native';
import AgentFeatures from '@/components/ai-agent/AgentFeatures';
import { useRouter } from 'expo-router';

export default function VPContentPage() {
  const { theme } = useTheme();
  const router = useRouter();

  const stats = [
    { label: 'Content Pieces', value: '2,575', icon: CircleCheckBig, color: '#34C759', change: '+385' },
    { label: 'Engagement Rate', value: '4.8%', icon: TrendingUp, color: '#007AFF', change: '+0.6%' },
    { label: 'SEO Traffic', value: '340K', icon: Eye, color: '#FF9500', change: '+52K' },
    { label: 'Content ROI', value: '5.2x', icon: DollarSign, color: '#00897B', change: '+0.8x' },
  ];

  const kpis = [
    { label: 'Organic Reach', value: '1.2M', trend: 'up' },
    { label: 'Avg. Read Time', value: '4.2 min', trend: 'up' },
    { label: 'Share Rate', value: '12%', trend: 'up' },
    { label: 'Content Score', value: '94/100', trend: 'up' },
  ];

  const capabilities = ['Content Strategy','Editorial Planning','Quality Review','Content Repurposing','SEO Content','Multi-format','Brand Voice','Content Analytics','Content Governance','Workflow Management','Thought Leadership','Content Distribution','Audience Segmentation','Topic Clustering','Performance Tracking','Content Operations'];

  const responsibilities = [
    'Editorial calendar planning and content scheduling management',
    'Content quality review and brand voice consistency enforcement',
    'Content repurposing strategy across platforms and formats',
    'Multi-format content production management and coordination',
    'SEO-optimized content creation and distribution strategy',
    'Content performance analytics and optimization programs',
    'Cross-channel content strategy alignment and governance',
    'Content governance and workflow management systems',
    'Thought leadership content development and executive ghostwriting',
    'Content distribution and amplification strategy',
    'Audience segmentation and personalized content programs',
    'Topic clustering and content pillar strategy development'
  ];

  const activities = [
    { time: '5 min ago', text: 'Planned editorial calendar: 86 pieces for next 30 days', icon: CalendarDays, type: 'planning' },
    { time: '25 min ago', text: 'Reviewed 18 content pieces: 94% quality score', icon: CheckCircle, type: 'quality' },
    { time: '1 hour ago', text: 'Repurposed blog series into 12 social posts', icon: RefreshCw, type: 'repurpose' },
    { time: '3 hours ago', text: 'Updated content style guide v4.1 with SEO rules', icon: FileText, type: 'governance' },
    { time: '5 hours ago', text: 'Content engagement: 4.8% avg rate, +0.6% MoM', icon: Zap, type: 'analytics' },
    { time: '8 hours ago', text: 'SEO content audit: 340K organic visits, +18% growth', icon: Eye, type: 'seo' },
  ];

  const typeColors: Record<string, string> = { planning: '#00897B', quality: '#34C759', repurpose: '#FF9500', governance: '#007AFF', analytics: '#AF52DE', seo: '#5856D6' };

  const quickActions = [
    { label: 'Calendar', icon: CalendarDays }, { label: 'Quality', icon: CheckCircle },
    { label: 'Repurpose', icon: RefreshCw }, { label: 'SEO', icon: Eye },
    { label: 'Analytics', icon: ChartBarBig }, { label: 'Governance', icon: FileText },
    { label: 'Schedule', icon: Calendar }, { label: 'Settings', icon: Settings },
  ];

  const subAgents = [
    { name: 'AI Editorial Calendar Planner', id: 'editorial-calendar-planner', icon: CalendarDays, desc: 'Content scheduling & editorial planning' },
    { name: 'AI Content Quality Reviewer', id: 'content-quality-reviewer', icon: CheckCircle, desc: 'Content quality assurance & review' },
    { name: 'AI Repurposing Strategist', id: 'repurposing-strategist', icon: RefreshCw, desc: 'Content repurposing & multi-format strategy' },
  ];

  return (
    <ScrollView style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <View style={[styles.hero, { backgroundColor: '#C6282818' }]}>
        <View style={[styles.heroIconWrap, { backgroundColor: '#C6282825' }]}>
          <FileText size={48} color="#C62828" />
        </View>
        <Text style={[styles.heroTitle, { color: theme.colors.text }]}>AI VP Content</Text>
        <Text style={[styles.heroSubtitle, { color: theme.colors.textSecondary }]}>Marketing Division — VP Level</Text>
        <View style={styles.badgesRow}>
          <View style={[styles.badge, { backgroundColor: '#34C75922' }]}><Activity size={12} color="#34C759" /><Text style={[styles.badgeText, { color: '#34C759' }]}>Active</Text></View>
          <View style={[styles.badge, { backgroundColor: '#00897B22' }]}><Star size={12} color="#00897B" /><Text style={[styles.badgeText, { color: '#00897B' }]}>VP Level</Text></View>
          <View style={[styles.badge, { backgroundColor: '#FF950022' }]}><Briefcase size={12} color="#FF9500" /><Text style={[styles.badgeText, { color: '#FF9500' }]}>3 Reports</Text></View>
          <View style={[styles.badge, { backgroundColor: '#AF52DE22' }]}><Brain size={12} color="#AF52DE" /><Text style={[styles.badgeText, { color: '#AF52DE' }]}>AI-Powered</Text></View>
        </View>
      </View>

      <View style={styles.statsContainer}>
        {stats.map((stat, index) => { const StatIcon = stat.icon; return (
          <View key={index} style={[styles.statCard, { backgroundColor: theme.colors.card || '#F2F2F7' }]}>
            <StatIcon size={22} color={stat.color} />
            <Text style={[styles.statValue, { color: theme.colors.text }]}>{stat.value}</Text>
            <Text style={[styles.statChange, { color: stat.change.startsWith('+') ? '#34C759' : '#FF3B30' }]}>{stat.change}</Text>
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
          The AI VP Content leads content strategy, editorial planning, and quality management across all channels. This VP-level agent ensures content excellence through editorial calendar management, quality review, and strategic content repurposing for maximum reach and engagement.
        </Text>
      </View>

      <View style={[styles.section, { backgroundColor: theme.colors.card || '#F2F2F7' }]}>
        <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Capabilities</Text>
        <View style={styles.tagsContainer}>
          {capabilities.map((cap, index) => (
            <View key={index} style={[styles.tag, { backgroundColor: '#C6282818' }]}>
              <Text style={[styles.tagText, { color: '#C62828' }]}>{cap}</Text>
            </View>
          ))}
        </View>
      </View>

      <View style={[styles.section, { backgroundColor: theme.colors.card || '#F2F2F7' }]}>
        <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Key Responsibilities</Text>
        {responsibilities.map((item, index) => (
          <View key={index} style={styles.responsibilityRow}>
            <ArrowRight size={14} color="#C62828" />
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
        <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Sub-Agents</Text>
        {subAgents.map((sub, index) => (
          <TouchableOpacity key={index} onPress={() => router.push(`/ai-agent/marketing/sub-agents/${sub.id}`)} style={[styles.subAgentCard, { backgroundColor: theme.colors.background || '#F2F2F7' }]}>
            <View style={[styles.subAgentIcon, { backgroundColor: '#C6282815' }]}>
              <sub.icon size={20} color="#C62828" />
            </View>
            <View style={styles.subAgentInfo}>
              <Text style={[styles.subAgentName, { color: theme.colors.text }]}>{sub.name}</Text>
              <Text style={[styles.subAgentDesc, { color: theme.colors.textSecondary }]}>{sub.desc}</Text>
            </View>
            <ArrowRight size={18} color={theme.colors.textSecondary} />
          </TouchableOpacity>
        ))}
      </View>

      <View style={[styles.section, { backgroundColor: theme.colors.card || '#F2F2F7' }]}>
        <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Quick Actions</Text>
        <View style={styles.actionsGrid}>
          {quickActions.map((action, index) => (
            <TouchableOpacity key={index} style={[styles.actionButton, { backgroundColor: '#C6282812' }]}>
              <action.icon size={24} color="#C62828" />
              <Text style={[styles.actionText, { color: '#C62828' }]}>{action.label}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      <View style={[styles.section, { backgroundColor: theme.colors.card || '#F2F2F7' }]}>
        <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Parent Agent</Text>
        <TouchableOpacity onPress={() => router.push('/ai-agent/marketing/cmo' as any)} style={[styles.parentCard, { backgroundColor: theme.colors.background }]}>
          <FileText size={24} color="#C62828" />
          <View style={styles.parentInfo}>
            <Text style={[styles.parentName, { color: theme.colors.text }]}>AI Chief Marketing Officer</Text>
            <Text style={[styles.parentDesc, { color: theme.colors.textSecondary }]}>C-Suite • Marketing Division</Text>
          </View>
          <ArrowRight size={20} color={theme.colors.textSecondary} />
        </TouchableOpacity>
      </View>

      <AgentFeatures agentId="vp-content" agentName="AI VP Content" />
      <View style={{ height: 40 }} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  hero: { alignItems: 'center', paddingVertical: 32, paddingHorizontal: 20, borderBottomWidth: 1, borderBottomColor: '#E5E5EA' },
  heroIconWrap: { width: 88, height: 88, borderRadius: 44, justifyContent: 'center', alignItems: 'center', marginBottom: 16 },
  heroTitle: { fontSize: 26, fontWeight: 'bold' },
  heroSubtitle: { fontSize: 15, marginTop: 4, fontWeight: '500' },
  badgesRow: { flexDirection: 'row', marginTop: 16, gap: 8 },
  badge: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 10, paddingVertical: 5, borderRadius: 20, gap: 4 },
  badgeText: { fontSize: 12, fontWeight: '600' },
  statsContainer: { flexDirection: 'row', flexWrap: 'wrap', padding: 16, gap: 12 },
  statCard: { flex: 1, minWidth: '22%', alignItems: 'center', padding: 14, borderRadius: 12 },
  statValue: { fontSize: 18, fontWeight: 'bold', marginTop: 8 },
  statChange: { fontSize: 11, fontWeight: '600', marginTop: 2 },
  statLabel: { fontSize: 11, marginTop: 4 },
  section: { marginHorizontal: 16, marginBottom: 16, padding: 20, borderRadius: 16 },
  sectionTitle: { fontSize: 18, fontWeight: '700', marginBottom: 14 },
  description: { fontSize: 14, lineHeight: 22 },
  kpiGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 12, marginTop: 8 },
  kpiCard: { flex: 1, minWidth: '45%', padding: 14, borderRadius: 12, position: 'relative' },
  kpiValue: { fontSize: 20, fontWeight: 'bold' },
  kpiLabel: { fontSize: 12, marginTop: 4 },
  trendBadge: { position: 'absolute', top: 10, right: 10, padding: 4, borderRadius: 8 },
  tagsContainer: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  tag: { paddingHorizontal: 12, paddingVertical: 6, borderRadius: 20 },
  tagText: { fontSize: 12, fontWeight: '600' },
  responsibilityRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 10, gap: 8 },
  responsibilityText: { fontSize: 14, flex: 1, lineHeight: 20 },
  activityRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 12, gap: 12 },
  activityIcon: { width: 32, height: 32, borderRadius: 16, justifyContent: 'center', alignItems: 'center' },
  activityContent: { flex: 1 },
  activityText: { fontSize: 14, fontWeight: '500' },
  activityTime: { fontSize: 12, marginTop: 2 },
  activityBadge: { paddingHorizontal: 8, paddingVertical: 3, borderRadius: 10 },
  activityBadgeText: { fontSize: 10, fontWeight: '600', textTransform: 'capitalize' },
  subAgentCard: { flexDirection: 'row', alignItems: 'center', padding: 14, borderRadius: 12, marginBottom: 10, gap: 12 },
  subAgentIcon: { width: 40, height: 40, borderRadius: 20, justifyContent: 'center', alignItems: 'center' },
  subAgentInfo: { flex: 1 },
  subAgentName: { fontSize: 15, fontWeight: '600' },
  subAgentDesc: { fontSize: 12, marginTop: 2 },
  actionsGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 12 },
  actionButton: { flex: 1, minWidth: '45%', alignItems: 'center', padding: 16, borderRadius: 12 },
  actionText: { fontSize: 12, fontWeight: '600', marginTop: 8 },
  parentCard: { flexDirection: 'row', alignItems: 'center', padding: 16, borderRadius: 12, gap: 12 },
  parentInfo: { flex: 1 },
  parentName: { fontSize: 16, fontWeight: '600' },
  parentDesc: { fontSize: 12, marginTop: 2 },
});
