import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useTheme } from '@/providers/ThemeProvider';
import { Clipboard, Building2, Users, Settings, TrendingUp, ArrowRight, Shield, Activity, Star, Briefcase, Brain } from 'lucide-react-native';
import { useRouter } from 'expo-router';

export default function AdministrativePage() {
  const { theme } = useTheme();
  const router = useRouter();

  const stats = [
    { label: 'Total Agents', value: '36', icon: Users, color: '#795548' },
    { label: 'Departments', value: '9', icon: Building2, color: '#5D4037' },
    { label: 'Sub-Agents', value: '27', icon: Clipboard, color: '#8D6E63' },
    { label: 'Active Tasks', value: '1,247', icon: Activity, color: '#4E342E' },
  ];

  const hierarchyAgents = [
    { 
      id: 'chief-administrative-officer', 
      name: 'AI Chief Administrative Officer', 
      role: 'C-Suite Executive',
      icon: Briefcase, 
      color: '#4E342E',
      desc: 'Strategic administrative oversight, cost reduction, policy governance',
      subAgents: ['AI Admin Strategy Planner', 'AI Cost Reduction Analyst', 'AI Policy Overseer']
    },
    { 
      id: 'vp-admin-operations', 
      name: 'AI VP Admin Operations', 
      role: 'VP Level',
      icon: Settings, 
      color: '#5D4037',
      desc: 'Process standardization, vendor management, budget control',
      subAgents: ['AI Process Standardizer', 'AI Vendor Manager', 'AI Office Budget Controller']
    },
    { 
      id: 'vp-facilities', 
      name: 'AI VP Facilities', 
      role: 'VP Level',
      icon: Building2, 
      color: '#6D4C41',
      desc: 'Space planning, maintenance scheduling, safety compliance',
      subAgents: ['AI Space Planner', 'AI Maintenance Scheduler', 'AI Safety Compliance Checker']
    },
    { 
      id: 'admin-manager', 
      name: 'AI Admin Manager', 
      role: 'Manager Level',
      icon: Clipboard, 
      color: '#795548',
      desc: 'Task delegation, schedule coordination, inventory management',
      subAgents: ['AI Task Delegator', 'AI Schedule Coordinator', 'AI Inventory Manager']
    },
    { 
      id: 'office-manager', 
      name: 'AI Office Manager', 
      role: 'Manager Level',
      icon: Users, 
      color: '#8D6E63',
      desc: 'Meeting room booking, supply ordering, visitor hosting',
      subAgents: ['AI Meeting Room Booker', 'AI Supply Orderer', 'AI Visitor Host']
    },
    { 
      id: 'executive-assistant', 
      name: 'AI Executive Assistant', 
      role: 'Specialist Level',
      icon: Star, 
      color: '#A1887F',
      desc: 'Calendar optimization, travel booking, correspondence drafting',
      subAgents: ['AI Calendar Optimizer', 'AI Travel Booker', 'AI Correspondence Drafter']
    },
    { 
      id: 'facilities-coordinator', 
      name: 'AI Facilities Coordinator', 
      role: 'Coordinator Level',
      icon: Shield, 
      color: '#9E9E9E',
      desc: 'Work order management, vendor liaison, inspection scheduling',
      subAgents: ['AI Work Order Manager', 'AI Vendor Liaison', 'AI Inspection Scheduler']
    },
    { 
      id: 'travel-coordinator', 
      name: 'AI Travel Coordinator', 
      role: 'Coordinator Level',
      icon: TrendingUp, 
      color: '#BDBDBD',
      desc: 'Itinerary planning, expense reporting, visa documentation',
      subAgents: ['AI Itinerary Planner', 'AI Expense Reporter', 'AI Visa Documenter']
    },
    { 
      id: 'document-controller', 
      name: 'AI Document Controller', 
      role: 'Controller Level',
      icon: Clipboard, 
      color: '#CFD8DC',
      desc: 'Version management, archive organization, access control',
      subAgents: ['AI Version Manager', 'AI Archive Organizer', 'AI Access Controller']
    },
  ];

  return (
    <ScrollView style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <View style={[styles.hero, { backgroundColor: '#79554818' }]}>
        <View style={[styles.heroIconWrap, { backgroundColor: '#79554825' }]}>
          <Clipboard size={48} color="#795548" />
        </View>
        <Text style={[styles.heroTitle, { color: theme.colors.text }]}>Administrative Division</Text>
        <Text style={[styles.heroSubtitle, { color: theme.colors.textSecondary }]}>AI-Powered Administrative Operations</Text>
        <View style={styles.badgesRow}>
          <View style={[styles.badge, { backgroundColor: '#79554822' }]}><Activity size={12} color="#795548" /><Text style={[styles.badgeText, { color: '#795548' }]}>36 Agents</Text></View>
          <View style={[styles.badge, { backgroundColor: '#4E342E22' }]}><Briefcase size={12} color="#4E342E" /><Text style={[styles.badgeText, { color: '#4E342E' }]}>C-Suite</Text></View>
          <View style={[styles.badge, { backgroundColor: '#5D403722' }]}><Brain size={12} color="#5D4037" /><Text style={[styles.badgeText, { color: '#5D4037' }]}>AI-Powered</Text></View>
        </View>
      </View>

      <View style={styles.statsContainer}>
        {stats.map((stat, index) => { const StatIcon = stat.icon; return (
          <View key={index} style={[styles.statCard, { backgroundColor: theme.colors.card || '#F2F2F7' }]}>
            <StatIcon size={22} color={stat.color} />
            <Text style={[styles.statValue, { color: theme.colors.text }]}>{stat.value}</Text>
            <Text style={[styles.statLabel, { color: theme.colors.textSecondary }]}>{stat.label}</Text>
          </View>
        )})}
      </View>

      <View style={[styles.section, { backgroundColor: theme.colors.card || '#F2F2F7' }]}>
        <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Administrative Hierarchy</Text>
        <Text style={[styles.description, { color: theme.colors.textSecondary }]}>
          The Administrative Division consists of 9 hierarchical levels with 36 specialized AI agents handling everything from executive administration to document control and facilities management.
        </Text>
      </View>

      <View style={[styles.section, { backgroundColor: theme.colors.card || '#F2F2F7' }]}>
        <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>AI Agents & Employees</Text>
        {hierarchyAgents.map((agent, index) => (
          <TouchableOpacity 
            key={index} 
            onPress={() => router.push(`/ai-agent/administrative/${agent.id}`)}
            style={[styles.agentCard, { backgroundColor: theme.colors.background }]}
          >
            <View style={[styles.agentIcon, { backgroundColor: agent.color + '15' }]}>
              <agent.icon size={24} color={agent.color} />
            </View>
            <View style={styles.agentInfo}>
              <Text style={[styles.agentName, { color: theme.colors.text }]}>{agent.name}</Text>
              <Text style={[styles.agentRole, { color: agent.color }]}>{agent.role}</Text>
              <Text style={[styles.agentDesc, { color: theme.colors.textSecondary }]}>{agent.desc}</Text>
              <View style={styles.subAgentsRow}>
                {agent.subAgents.map((sub, i) => (
                  <View key={i} style={[styles.subAgentTag, { backgroundColor: agent.color + '18' }]}>
                    <Text style={[styles.subAgentText, { color: agent.color }]}>{sub}</Text>
                  </View>
                ))}
              </View>
            </View>
            <ArrowRight size={18} color={theme.colors.textSecondary} />
          </TouchableOpacity>
        ))}
      </View>

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
  statLabel: { fontSize: 11, marginTop: 4 },
  section: { marginHorizontal: 16, marginBottom: 16, padding: 20, borderRadius: 16 },
  sectionTitle: { fontSize: 18, fontWeight: '700', marginBottom: 14 },
  description: { fontSize: 14, lineHeight: 22 },
  agentCard: { flexDirection: 'row', alignItems: 'center', padding: 14, borderRadius: 12, marginBottom: 12, gap: 12 },
  agentIcon: { width: 48, height: 48, borderRadius: 24, justifyContent: 'center', alignItems: 'center' },
  agentInfo: { flex: 1 },
  agentName: { fontSize: 15, fontWeight: '600' },
  agentRole: { fontSize: 11, fontWeight: '600', marginTop: 2 },
  agentDesc: { fontSize: 12, marginTop: 2, lineHeight: 16 },
  subAgentsRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 6, marginTop: 8 },
  subAgentTag: { paddingHorizontal: 8, paddingVertical: 3, borderRadius: 12 },
  subAgentText: { fontSize: 10, fontWeight: '500' },
});
