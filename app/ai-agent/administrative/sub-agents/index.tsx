import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useTheme } from '@/providers/ThemeProvider';
import { Activity, Briefcase, ArrowRight } from 'lucide-react-native';
import { useRouter } from 'expo-router';
import { DoorOpen } from 'lucide-react-native';
import { ShoppingCart } from 'lucide-react-native';
import { UserPlus } from 'lucide-react-native';
import { CalendarCheck } from 'lucide-react-native';
import { Plane } from 'lucide-react-native';
import { Mail } from 'lucide-react-native';
import { ClipboardList } from 'lucide-react-native';
import { Handshake } from 'lucide-react-native';
import { Search } from 'lucide-react-native';
import { Map } from 'lucide-react-native';
import { Receipt } from 'lucide-react-native';
import { FileText } from 'lucide-react-native';
import { GitBranch } from 'lucide-react-native';
import { Archive } from 'lucide-react-native';
import { Lock } from 'lucide-react-native';

export default function SubAgentsIndex() {
  const { theme } = useTheme();
  const router = useRouter();

  return (
    <ScrollView style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <View style={[styles.hero, { borderBottomColor: theme.colors.border || '#E5E5EA' }]}>
        <View style={[styles.heroIconWrap, { backgroundColor: '#6366F115' }]}><Briefcase size={48} color="#6366F1" /></View>
        <Text style={[styles.heroTitle, { color: theme.colors.text }]}>Administrative - Sub-Agents</Text>
        <Text style={[styles.heroSubtitle, { color: theme.colors.textSecondary }]}>Helper & Sub-Agent Workforce</Text>
        <View style={styles.badgesRow}>
          <View style={[styles.badge, { backgroundColor: '#34C75922' }]}><Activity size={12} color="#34C759" /><Text style={[styles.badgeText, { color: '#34C759' }]}>Active</Text></View>
          <View style={[styles.badge, { backgroundColor: '#6366F422' }]}><Briefcase size={12} color="#6366F1" /><Text style={[styles.badgeText, { color: '#6366F1' }]}>15 Agents</Text></View>
        </View>
      </View>
      <View style={[styles.section, { backgroundColor: theme.colors.card || '#F2F2F7' }]}>
        <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Sub-Agents</Text>
        <TouchableOpacity key="meeting-room-booker" onPress={() => router.push('/ai-agent/administrative/sub-agents/meeting-room-booker')} style={[styles.agentCard, { backgroundColor: theme.colors.background || '#F2F2F7' }]}>
          <View style={[styles.agentIcon, { backgroundColor: '#3B82F620' }]}><DoorOpen size={28} color="#3B82F6" /></View>
          <View style={styles.agentInfo}>
            <Text style={[styles.agentName, { color: theme.colors.text }]}>Meeting Room Booker</Text>
            <Text style={[styles.agentDesc, { color: theme.colors.textSecondary }]}>Office Manager - Sub-Agent</Text>
          </View>
          <ArrowRight size={20} color={theme.colors.textSecondary} />
        </TouchableOpacity>
        <TouchableOpacity key="supply-orderer" onPress={() => router.push('/ai-agent/administrative/sub-agents/supply-orderer')} style={[styles.agentCard, { backgroundColor: theme.colors.background || '#F2F2F7' }]}>
          <View style={[styles.agentIcon, { backgroundColor: '#F59E0B20' }]}><ShoppingCart size={28} color="#F59E0B" /></View>
          <View style={styles.agentInfo}>
            <Text style={[styles.agentName, { color: theme.colors.text }]}>Supply Orderer</Text>
            <Text style={[styles.agentDesc, { color: theme.colors.textSecondary }]}>Office Manager - Sub-Agent</Text>
          </View>
          <ArrowRight size={20} color={theme.colors.textSecondary} />
        </TouchableOpacity>
        <TouchableOpacity key="visitor-host" onPress={() => router.push('/ai-agent/administrative/sub-agents/visitor-host')} style={[styles.agentCard, { backgroundColor: theme.colors.background || '#F2F2F7' }]}>
          <View style={[styles.agentIcon, { backgroundColor: '#10B98120' }]}><UserPlus size={28} color="#10B981" /></View>
          <View style={styles.agentInfo}>
            <Text style={[styles.agentName, { color: theme.colors.text }]}>Visitor Host</Text>
            <Text style={[styles.agentDesc, { color: theme.colors.textSecondary }]}>Office Manager - Sub-Agent</Text>
          </View>
          <ArrowRight size={20} color={theme.colors.textSecondary} />
        </TouchableOpacity>
        <TouchableOpacity key="calendar-optimizer" onPress={() => router.push('/ai-agent/administrative/sub-agents/calendar-optimizer')} style={[styles.agentCard, { backgroundColor: theme.colors.background || '#F2F2F7' }]}>
          <View style={[styles.agentIcon, { backgroundColor: '#8B5CF620' }]}><CalendarCheck size={28} color="#8B5CF6" /></View>
          <View style={styles.agentInfo}>
            <Text style={[styles.agentName, { color: theme.colors.text }]}>Calendar Optimizer</Text>
            <Text style={[styles.agentDesc, { color: theme.colors.textSecondary }]}>Executive Assistant - Sub-Agent</Text>
          </View>
          <ArrowRight size={20} color={theme.colors.textSecondary} />
        </TouchableOpacity>
        <TouchableOpacity key="travel-booker" onPress={() => router.push('/ai-agent/administrative/sub-agents/travel-booker')} style={[styles.agentCard, { backgroundColor: theme.colors.background || '#F2F2F7' }]}>
          <View style={[styles.agentIcon, { backgroundColor: '#06B6D420' }]}><Plane size={28} color="#06B6D4" /></View>
          <View style={styles.agentInfo}>
            <Text style={[styles.agentName, { color: theme.colors.text }]}>Travel Booker</Text>
            <Text style={[styles.agentDesc, { color: theme.colors.textSecondary }]}>Executive Assistant - Sub-Agent</Text>
          </View>
          <ArrowRight size={20} color={theme.colors.textSecondary} />
        </TouchableOpacity>
        <TouchableOpacity key="correspondence-drafter" onPress={() => router.push('/ai-agent/administrative/sub-agents/correspondence-drafter')} style={[styles.agentCard, { backgroundColor: theme.colors.background || '#F2F2F7' }]}>
          <View style={[styles.agentIcon, { backgroundColor: '#EC489920' }]}><Mail size={28} color="#EC4899" /></View>
          <View style={styles.agentInfo}>
            <Text style={[styles.agentName, { color: theme.colors.text }]}>Correspondence Drafter</Text>
            <Text style={[styles.agentDesc, { color: theme.colors.textSecondary }]}>Executive Assistant - Sub-Agent</Text>
          </View>
          <ArrowRight size={20} color={theme.colors.textSecondary} />
        </TouchableOpacity>
        <TouchableOpacity key="work-order-manager" onPress={() => router.push('/ai-agent/administrative/sub-agents/work-order-manager')} style={[styles.agentCard, { backgroundColor: theme.colors.background || '#F2F2F7' }]}>
          <View style={[styles.agentIcon, { backgroundColor: '#F9731620' }]}><ClipboardList size={28} color="#F97316" /></View>
          <View style={styles.agentInfo}>
            <Text style={[styles.agentName, { color: theme.colors.text }]}>Work Order Manager</Text>
            <Text style={[styles.agentDesc, { color: theme.colors.textSecondary }]}>Facilities Coordinator - Sub-Agent</Text>
          </View>
          <ArrowRight size={20} color={theme.colors.textSecondary} />
        </TouchableOpacity>
        <TouchableOpacity key="vendor-liaison" onPress={() => router.push('/ai-agent/administrative/sub-agents/vendor-liaison')} style={[styles.agentCard, { backgroundColor: theme.colors.background || '#F2F2F7' }]}>
          <View style={[styles.agentIcon, { backgroundColor: '#84CC1620' }]}><Handshake size={28} color="#84CC16" /></View>
          <View style={styles.agentInfo}>
            <Text style={[styles.agentName, { color: theme.colors.text }]}>Vendor Liaison</Text>
            <Text style={[styles.agentDesc, { color: theme.colors.textSecondary }]}>Facilities Coordinator - Sub-Agent</Text>
          </View>
          <ArrowRight size={20} color={theme.colors.textSecondary} />
        </TouchableOpacity>
        <TouchableOpacity key="inspection-scheduler" onPress={() => router.push('/ai-agent/administrative/sub-agents/inspection-scheduler')} style={[styles.agentCard, { backgroundColor: theme.colors.background || '#F2F2F7' }]}>
          <View style={[styles.agentIcon, { backgroundColor: '#6366F120' }]}><Search size={28} color="#6366F1" /></View>
          <View style={styles.agentInfo}>
            <Text style={[styles.agentName, { color: theme.colors.text }]}>Inspection Scheduler</Text>
            <Text style={[styles.agentDesc, { color: theme.colors.textSecondary }]}>Facilities Coordinator - Sub-Agent</Text>
          </View>
          <ArrowRight size={20} color={theme.colors.textSecondary} />
        </TouchableOpacity>
        <TouchableOpacity key="itinerary-planner" onPress={() => router.push('/ai-agent/administrative/sub-agents/itinerary-planner')} style={[styles.agentCard, { backgroundColor: theme.colors.background || '#F2F2F7' }]}>
          <View style={[styles.agentIcon, { backgroundColor: '#14B8A620' }]}><Map size={28} color="#14B8A6" /></View>
          <View style={styles.agentInfo}>
            <Text style={[styles.agentName, { color: theme.colors.text }]}>Itinerary Planner</Text>
            <Text style={[styles.agentDesc, { color: theme.colors.textSecondary }]}>Travel Coordinator - Sub-Agent</Text>
          </View>
          <ArrowRight size={20} color={theme.colors.textSecondary} />
        </TouchableOpacity>
        <TouchableOpacity key="expense-reporter" onPress={() => router.push('/ai-agent/administrative/sub-agents/expense-reporter')} style={[styles.agentCard, { backgroundColor: theme.colors.background || '#F2F2F7' }]}>
          <View style={[styles.agentIcon, { backgroundColor: '#EAB30820' }]}><Receipt size={28} color="#EAB308" /></View>
          <View style={styles.agentInfo}>
            <Text style={[styles.agentName, { color: theme.colors.text }]}>Expense Reporter</Text>
            <Text style={[styles.agentDesc, { color: theme.colors.textSecondary }]}>Travel Coordinator - Sub-Agent</Text>
          </View>
          <ArrowRight size={20} color={theme.colors.textSecondary} />
        </TouchableOpacity>
        <TouchableOpacity key="visa-documenter" onPress={() => router.push('/ai-agent/administrative/sub-agents/visa-documenter')} style={[styles.agentCard, { backgroundColor: theme.colors.background || '#F2F2F7' }]}>
          <View style={[styles.agentIcon, { backgroundColor: '#A855F720' }]}><FileText size={28} color="#A855F7" /></View>
          <View style={styles.agentInfo}>
            <Text style={[styles.agentName, { color: theme.colors.text }]}>Visa Documenter</Text>
            <Text style={[styles.agentDesc, { color: theme.colors.textSecondary }]}>Travel Coordinator - Sub-Agent</Text>
          </View>
          <ArrowRight size={20} color={theme.colors.textSecondary} />
        </TouchableOpacity>
        <TouchableOpacity key="version-manager" onPress={() => router.push('/ai-agent/administrative/sub-agents/version-manager')} style={[styles.agentCard, { backgroundColor: theme.colors.background || '#F2F2F7' }]}>
          <View style={[styles.agentIcon, { backgroundColor: '#3B82F620' }]}><GitBranch size={28} color="#3B82F6" /></View>
          <View style={styles.agentInfo}>
            <Text style={[styles.agentName, { color: theme.colors.text }]}>Version Manager</Text>
            <Text style={[styles.agentDesc, { color: theme.colors.textSecondary }]}>Document Controller - Sub-Agent</Text>
          </View>
          <ArrowRight size={20} color={theme.colors.textSecondary} />
        </TouchableOpacity>
        <TouchableOpacity key="archive-organizer" onPress={() => router.push('/ai-agent/administrative/sub-agents/archive-organizer')} style={[styles.agentCard, { backgroundColor: theme.colors.background || '#F2F2F7' }]}>
          <View style={[styles.agentIcon, { backgroundColor: '#6B728020' }]}><Archive size={28} color="#6B7280" /></View>
          <View style={styles.agentInfo}>
            <Text style={[styles.agentName, { color: theme.colors.text }]}>Archive Organizer</Text>
            <Text style={[styles.agentDesc, { color: theme.colors.textSecondary }]}>Document Controller - Sub-Agent</Text>
          </View>
          <ArrowRight size={20} color={theme.colors.textSecondary} />
        </TouchableOpacity>
        <TouchableOpacity key="access-controller" onPress={() => router.push('/ai-agent/administrative/sub-agents/access-controller')} style={[styles.agentCard, { backgroundColor: theme.colors.background || '#F2F2F7' }]}>
          <View style={[styles.agentIcon, { backgroundColor: '#DC262620' }]}><Lock size={28} color="#DC2626" /></View>
          <View style={styles.agentInfo}>
            <Text style={[styles.agentName, { color: theme.colors.text }]}>Access Controller</Text>
            <Text style={[styles.agentDesc, { color: theme.colors.textSecondary }]}>Document Controller - Sub-Agent</Text>
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
