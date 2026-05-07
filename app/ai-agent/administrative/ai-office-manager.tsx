import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useTheme } from '@/providers/ThemeProvider';
import { Users, Activity, Star, CircleCheckBig, TrendingUp, TrendingDown, DollarSign, BarChart3, Shield, ArrowRight, Zap, FileText, Target, Brain, Briefcase, Eye, Globe, Calendar, Megaphone, Coffee, MapPin, Hand, Box, DoorOpen } from 'lucide-react-native';
import AgentFeatures from '@/components/ai-agent/AgentFeatures';
import { useRouter } from 'expo-router';

export default function AiOfficeManagerPage() {
  const { theme } = useTheme();
  const router = useRouter();

  const stats = [
    { label: 'Meetings Booked', value: '1,847', icon: Calendar, color: '#8D6E63', change: '+124' },
    { label: 'Supply Orders', value: '342', icon: Box, color: '#A1887F', change: '+28' },
    { label: 'Visitors Hosted', value: '2,156', icon: Hand, color: '#795548', change: '+189' },
    { label: 'Satisfaction', value: '96%', icon: Star, color: '#6D4C41', change: '+2%' },
  ];

  const kpis = [
    { label: 'Room Utilization', value: '87%', trend: 'up' },
    { label: 'Supply Fill Rate', value: '99%', trend: 'up' },
    { label: 'Visitor Experience', value: '4.7/5', trend: 'up' },
    { label: 'Response Time', value: '1.8m', trend: 'down' },
  ];

  const capabilities = ['Meeting Room Booking','Supply Management','Visitor Reception','Office Hospitality','Facility Coordination','Catering Management','Event Support','Front Desk Operations','Mail Handling','Equipment Allocation','Workspace Allocation','Vendor Liaison','Service Requests','Office Maintenance','Employee Support'];

  const responsibilities = [
    'Manage meeting room bookings, scheduling, and conflict resolution',
    'Coordinate office supply procurement, inventory, and distribution',
    'Handle visitor reception, check-in, and hospitality services',
    'Oversee office hospitality including catering and event support',
    'Coordinate with facilities for workspace and equipment needs',
    'Manage catering services for meetings and special events',
    'Provide support for office events and executive gatherings',
    'Manage front desk operations and first-point-of-contact services',
    'Handle incoming and outgoing mail and package distribution',
    'Allocate equipment and workspace resources efficiently',
    'Optimize workspace allocation based on utilization data',
    'Liaise with vendors for office services and supplies',
    'Process and prioritize employee service requests',
    'Coordinate office maintenance and cleaning schedules',
    'Provide comprehensive support for all employee office needs'
  ];

  const activities = [
    { time: '3 min ago', text: 'Meeting room booked: Executive boardroom, 14 attendees', icon: Calendar, type: 'booking' },
    { time: '15 min ago', text: 'Supply order processed: $4,200 stationery restocked', icon: Box, type: 'supply' },
    { time: '45 min ago', text: 'VIP visitor checked in: Guided tour arranged', icon: Hand, type: 'visitor' },
    { time: '2 hours ago', text: 'Catering confirmed: Executive lunch for 12, 12:30 PM', icon: Coffee, type: 'catering' },
    { time: '4 hours ago', text: 'Workspace reallocation: 3 teams relocated successfully', icon: MapPin, type: 'workspace' },
    { time: '6 hours ago', text: 'Event setup completed: Town hall ready for 200 attendees', icon: DoorOpen, type: 'event' },
  ];

  const quickActions = [
    { label: 'Rooms', icon: Calendar }, { label: 'Supplies', icon: Box },
    { label: 'Visitors', icon: Hand }, { label: 'Catering', icon: Coffee },
    { label: 'Support', icon: Users }, { label: 'Reports', icon: BarChart3 },
    { label: 'Schedule', icon: Calendar }, { label: 'Settings', icon: Shield },
  ];

  const typeColors: Record<string, string> = { booking: '#8D6E63', supply: '#A1887F', visitor: '#795548', catering: '#6D4C41', workspace: '#5D4037', event: '#4E342E' };

  const subAgents = [
    { name: 'AI Meeting Room Booker', id: 'meeting-room-booker', icon: Calendar, desc: 'Room scheduling, conflict resolution & capacity planning', color: '#8D6E63' },
    { name: 'AI Supply Orderer', id: 'supply-orderer', icon: Box, desc: 'Inventory monitoring, procurement & distribution automation', color: '#A1887F' },
    { name: 'AI Visitor Host', id: 'visitor-host', icon: Hand, desc: 'Visitor reception, check-in & hospitality coordination', color: '#795548' },
  ];

  return (
    <ScrollView style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <View style={[styles.hero, { backgroundColor: '#8D6E6318' }]}>
        <View style={[styles.heroIconWrap, { backgroundColor: '#8D6E6325' }]}>
          <Users size={48} color="#8D6E63" />
        </View>
        <Text style={[styles.heroTitle, { color: theme.colors.text }]}>AI Office Manager</Text>
        <Text style={[styles.heroSubtitle, { color: theme.colors.textSecondary }]}>Administrative Division — Manager Level</Text>
        <View style={styles.badgesRow}>
          <View style={[styles.badge, { backgroundColor: '#34C75922' }]}><Activity size={12} color="#34C759" /><Text style={[styles.badgeText, { color: '#34C759' }]}>Active</Text></View>
          <View style={[styles.badge, { backgroundColor: '#8D6E6322' }]}><Briefcase size={12} color="#8D6E63" /><Text style={[styles.badgeText, { color: '#8D6E63' }]}>Manager</Text></View>
          <View style={[styles.badge, { backgroundColor: '#79554822' }]}><Users size={12} color="#795548" /><Text style={[styles.badgeText, { color: '#795548' }]}>Office</Text></View>
          <View style={[styles.badge, { backgroundColor: '#6D4C4122' }]}><Brain size={12} color="#6D4C41" /><Text style={[styles.badgeText, { color: '#6D4C41' }]}>AI-Powered</Text></View>
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
              <View style={[styles.trendBadge, { backgroundColor: (kpi.trend === 'up' || kpi.trend === 'down' ? '#34C759' : '#FF3B30') + '22' }]}>
                {kpi.trend === 'up' || kpi.trend === 'down' ? <TrendingUp size={10} color="#34C759" /> : <TrendingDown size={10} color="#FF3B30" />}
              </View>
            </View>
          ))}
        </View>
      </View>

      <View style={[styles.section, { backgroundColor: theme.colors.card || '#F2F2F7' }]}>
        <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Overview</Text>
        <Text style={[styles.description, { color: theme.colors.textSecondary }]}>
          The AI Office Manager serves as the central hub for all office operations, ensuring a seamless workplace experience. This manager-level agent handles meeting room bookings, supply management, visitor reception, and employee support with exceptional hospitality and efficiency, creating an environment where productivity thrives.
        </Text>
      </View>

      <View style={[styles.section, { backgroundColor: theme.colors.card || '#F2F2F7' }]}>
        <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Capabilities</Text>
        <View style={styles.tagsContainer}>
          {capabilities.map((cap, index) => (
            <View key={index} style={[styles.tag, { backgroundColor: '#8D6E6318' }]}>
              <Text style={[styles.tagText, { color: '#8D6E63' }]}>{cap}</Text>
            </View>
          ))}
        </View>
      </View>

      <View style={[styles.section, { backgroundColor: theme.colors.card || '#F2F2F7' }]}>
        <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Key Responsibilities</Text>
        {responsibilities.map((item, index) => (
          <View key={index} style={styles.responsibilityRow}>
            <ArrowRight size={14} color="#8D6E63" />
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
          <TouchableOpacity key={index} onPress={() => router.push(`/ai-agent/administrative/sub-agents/${sub.id}`)} style={[styles.subAgentCard, { backgroundColor: theme.colors.background || '#F2F2F7' }]}>
            <View style={[styles.subAgentIcon, { backgroundColor: sub.color + '15' }]}>
              <sub.icon size={20} color={sub.color} />
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
            <TouchableOpacity key={index} style={[styles.actionButton, { backgroundColor: '#8D6E6312' }]}>
              <action.icon size={24} color="#8D6E63" />
              <Text style={[styles.actionText, { color: '#8D6E63' }]}>{action.label}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      <AgentFeatures agentId="ai-office-manager" agentName="AI Office Manager" />
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
  actionText: { fontSize: 13, fontWeight: '600', marginTop: 8 },
});
