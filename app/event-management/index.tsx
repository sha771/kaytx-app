import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { 
  Calendar, Ticket, MapPin, Users, Building2, 
  DollarSign, TrendingUp, Activity, Zap, Globe,
  BarChart3, Shield, Sparkles, ArrowRight
} from 'lucide-react-native';

export default function EventManagementIndex() {
  const router = useRouter();

  const EXECUTIVE_KPIS = [
    { label: 'Active Events', value: '1,260', icon: Calendar, color: '#06B6D4', trend: '+12%' },
    { label: 'Total Attendees', value: '9.4M', icon: Users, color: '#8B5CF6', trend: '+8%' },
    { label: 'Ticket Revenue', value: '$5.8B', icon: DollarSign, color: '#10B981', trend: '+15%' },
    { label: 'Venues Managed', value: '2,450', icon: MapPin, color: '#F59E0B', trend: '+5%' },
    { label: 'Sponsor Revenue', value: '$920M', icon: Building2, color: '#FFD700', trend: '+18%' },
    { label: 'AI Revenue Impact', value: '+$410M', icon: Sparkles, color: '#EC4899', trend: '+22%' },
  ];

  const NAVIGATION_ITEMS = [
    { id: 'dashboard', label: 'Executive Dashboard', icon: BarChart3, color: '#06B6D4', description: 'High-level event intelligence' },
    { id: 'agents', label: 'AI Event Agents', icon: Zap, color: '#8B5CF6', description: 'Autonomous event agents' },
    { id: 'planning', label: 'Event Planning', icon: Calendar, color: '#10B981', description: 'Timeline & resource management' },
    { id: 'ticketing', label: 'Ticketing', icon: Ticket, color: '#F59E0B', description: 'Sales & registration' },
    { id: 'venues', label: 'Venues', icon: MapPin, color: '#EC4899', description: 'Venue operations' },
    { id: 'attendees', label: 'Attendees', icon: Users, color: '#06B6D4', description: 'Attendee intelligence' },
    { id: 'vendors', label: 'Vendors', icon: Building2, color: '#8B5CF6', description: 'Vendor management' },
    { id: 'sponsors', label: 'Sponsors', icon: DollarSign, color: '#FFD700', description: 'Sponsorship operations' },
    { id: 'marketing', label: 'Marketing', icon: TrendingUp, color: '#10B981', description: 'Campaigns & promotion' },
    { id: 'live-operations', label: 'Live Operations', icon: Activity, color: '#F59E0B', description: 'Real-time monitoring' },
    { id: 'analytics', label: 'Analytics', icon: BarChart3, color: '#EC4899', description: 'Deep analytics' },
    { id: 'settings', label: 'Settings', icon: Shield, color: '#06B6D4', description: 'System configuration' },
  ];

  const AI_AGENTS = [
    { name: 'Agent Planner', role: 'Event Planning Agent', icon: Calendar, color: '#06B6D4', metrics: 'Events Planned: 847' },
    { name: 'Agent Venue', role: 'Venue Operations Agent', icon: MapPin, color: '#8B5CF6', metrics: 'Venues Managed: 2,450' },
    { name: 'Agent Ticket', role: 'Ticketing Agent', icon: Ticket, color: '#10B981', metrics: 'Tickets Processed: 9.4M' },
    { name: 'Agent Connect', role: 'Attendee Experience Agent', icon: Users, color: '#F59E0B', metrics: 'Engagement Score: 94%' },
    { name: 'Agent Sponsor', role: 'Sponsorship Agent', icon: DollarSign, color: '#FFD700', metrics: 'Revenue Impact: $920M' },
    { name: 'Agent Guardian', role: 'Security & Risk Agent', icon: Shield, color: '#EC4899', metrics: 'Incidents Prevented: 12,847' },
  ];

  return (
    <ScrollView style={styles.container}>
      {/* Hero Section */}
      <View style={styles.hero}>
        <View style={styles.heroIcon}>
          <Globe size={64} color="#06B6D4" />
        </View>
        <Text style={styles.heroTitle}>Event Management AI OS</Text>
        <Text style={styles.heroSubtitle}>
          Autonomous AI-Powered Event Operations Platform
        </Text>
        <View style={styles.badges}>
          <View style={[styles.badge, { backgroundColor: '#06B6D422' }]}>
            <Activity size={14} color="#06B6D4" />
            <Text style={[styles.badgeText, { color: '#06B6D4' }]}>1,260 Active Events</Text>
          </View>
          <View style={[styles.badge, { backgroundColor: '#8B5CF622' }]}>
            <Zap size={14} color="#8B5CF6" />
            <Text style={[styles.badgeText, { color: '#8B5CF6' }]}>AI-Powered</Text>
          </View>
          <View style={[styles.badge, { backgroundColor: '#10B98122' }]}>
            <Sparkles size={14} color="#10B981" />
            <Text style={[styles.badgeText, { color: '#10B981' }]}>+$410M AI Impact</Text>
          </View>
        </View>
      </View>

      {/* Executive KPIs */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Executive KPIs</Text>
        <View style={styles.kpiGrid}>
          {EXECUTIVE_KPIS.map((kpi, index) => (
            <View key={index} style={[styles.kpiCard, { borderColor: kpi.color + '40' }]}>
              <View style={[styles.kpiIcon, { backgroundColor: kpi.color + '20' }]}>
                <kpi.icon size={28} color={kpi.color} />
              </View>
              <Text style={styles.kpiValue}>{kpi.value}</Text>
              <Text style={styles.kpiLabel}>{kpi.label}</Text>
              <View style={[styles.trendBadge, { backgroundColor: kpi.color + '20' }]}>
                <TrendingUp size={12} color={kpi.color} />
                <Text style={[styles.trendText, { color: kpi.color }]}>{kpi.trend}</Text>
              </View>
            </View>
          ))}
        </View>
      </View>

      {/* AI Event Agents */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>AI Event Agents</Text>
        <Text style={styles.sectionDescription}>
          Autonomous AI agents managing event operations in real-time
        </Text>
        {AI_AGENTS.map((agent, index) => (
          <TouchableOpacity
            key={index}
            onPress={() => router.push('/event-management/agents')}
            style={[styles.agentCard, { borderColor: agent.color + '40' }]}
          >
            <View style={[styles.agentIcon, { backgroundColor: agent.color + '20' }]}>
              <agent.icon size={32} color={agent.color} />
            </View>
            <View style={styles.agentInfo}>
              <Text style={styles.agentName}>{agent.name}</Text>
              <Text style={styles.agentRole}>{agent.role}</Text>
              <Text style={[styles.agentMetrics, { color: agent.color }]}>{agent.metrics}</Text>
            </View>
            <ArrowRight size={24} color={agent.color} />
          </TouchableOpacity>
        ))}
      </View>

      {/* Navigation */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Command Centers</Text>
        <View style={styles.navGrid}>
          {NAVIGATION_ITEMS.map((item, index) => (
            <TouchableOpacity
              key={index}
              onPress={() => router.push(`/event-management/${item.id}`)}
              style={[styles.navCard, { borderColor: item.color + '40' }]}
            >
              <View style={[styles.navIcon, { backgroundColor: item.color + '20' }]}>
                <item.icon size={32} color={item.color} />
              </View>
              <Text style={styles.navLabel}>{item.label}</Text>
              <Text style={styles.navDescription}>{item.description}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* Chief Event Officer Command Center */}
      <View style={[styles.section, styles.commandCenter]}>
        <Text style={styles.sectionTitle}>Chief Event Officer Command Center</Text>
        <View style={styles.commandStats}>
          <View style={styles.commandStat}>
            <Text style={styles.commandStatValue}>1,260</Text>
            <Text style={styles.commandStatLabel}>Active Events</Text>
          </View>
          <View style={styles.commandStat}>
            <Text style={styles.commandStatValue}>9.4M</Text>
            <Text style={styles.commandStatLabel}>Total Attendees</Text>
          </View>
          <View style={styles.commandStat}>
            <Text style={styles.commandStatValue}>$5.8B</Text>
            <Text style={styles.commandStatLabel}>Ticket Revenue</Text>
          </View>
          <View style={styles.commandStat}>
            <Text style={styles.commandStatValue}>2,450</Text>
            <Text style={styles.commandStatLabel}>Venues Managed</Text>
          </View>
        </View>
        <TouchableOpacity
          onPress={() => router.push('/event-management/dashboard')}
          style={styles.commandButton}
        >
          <Text style={styles.commandButtonText}>Launch Command Center</Text>
          <ArrowRight size={20} color="#06B6D4" />
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#03050A',
  },
  hero: {
    padding: 24,
    borderBottomWidth: 1,
    borderBottomColor: '#06B6D440',
  },
  heroIcon: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#06B6D420',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  heroTitle: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 8,
  },
  heroSubtitle: {
    fontSize: 16,
    color: '#9CA3AF',
    marginBottom: 16,
  },
  badges: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  badge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    gap: 6,
  },
  badgeText: {
    fontSize: 12,
    fontWeight: '600',
  },
  section: {
    padding: 20,
    marginTop: 8,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 8,
  },
  sectionDescription: {
    fontSize: 14,
    color: '#9CA3AF',
    marginBottom: 16,
  },
  kpiGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  kpiCard: {
    flex: 1,
    minWidth: 150,
    backgroundColor: '#0A0F1A',
    borderWidth: 1,
    borderRadius: 16,
    padding: 16,
    alignItems: 'center',
    gap: 8,
  },
  kpiIcon: {
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
  },
  kpiValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  kpiLabel: {
    fontSize: 12,
    color: '#9CA3AF',
    textAlign: 'center',
  },
  trendBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    gap: 4,
  },
  trendText: {
    fontSize: 11,
    fontWeight: '600',
  },
  agentCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#0A0F1A',
    borderWidth: 1,
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    gap: 16,
  },
  agentIcon: {
    width: 64,
    height: 64,
    borderRadius: 32,
    justifyContent: 'center',
    alignItems: 'center',
  },
  agentInfo: {
    flex: 1,
    gap: 4,
  },
  agentName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  agentRole: {
    fontSize: 14,
    color: '#9CA3AF',
  },
  agentMetrics: {
    fontSize: 12,
    fontWeight: '600',
  },
  navGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  navCard: {
    flex: 1,
    minWidth: 140,
    backgroundColor: '#0A0F1A',
    borderWidth: 1,
    borderRadius: 16,
    padding: 16,
    alignItems: 'center',
    gap: 8,
  },
  navIcon: {
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
  },
  navLabel: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#FFFFFF',
    textAlign: 'center',
  },
  navDescription: {
    fontSize: 11,
    color: '#9CA3AF',
    textAlign: 'center',
  },
  commandCenter: {
    backgroundColor: '#0A0F1A',
    borderWidth: 1,
    borderColor: '#06B6D440',
    borderRadius: 16,
  },
  commandStats: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 24,
    marginBottom: 16,
  },
  commandStat: {
    alignItems: 'center',
  },
  commandStatValue: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#06B6D4',
    marginBottom: 4,
  },
  commandStatLabel: {
    fontSize: 12,
    color: '#9CA3AF',
  },
  commandButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#06B6D4',
    padding: 16,
    borderRadius: 12,
    gap: 12,
  },
  commandButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
