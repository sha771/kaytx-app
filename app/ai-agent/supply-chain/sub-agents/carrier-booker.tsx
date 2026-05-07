import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useTheme } from '@/providers/ThemeProvider';
import { Activity, Package, Clock, Target, Zap, ArrowRight, Briefcase, Calendar, Truck, CheckCircle } from 'lucide-react-native';
import AgentFeatures from '@/components/ai-agent/AgentFeatures';
import { useRouter } from 'expo-router';

const agent = {
  name: 'AI Carrier Booker',
  parent: 'AI Shipping Coordinator',
  parentRoute: '/ai-agent/supply-chain/ai-shipping-coordinator',
  color: '#84CC16',
};

export default function CarrierBookerPage() {
  const { theme } = useTheme();
  const router = useRouter();

  return (
    <ScrollView style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <View style={[styles.hero, { borderBottomColor: theme.colors.border || '#E5E5EA' }]}>
        <View style={[styles.heroIconWrap, { backgroundColor: '#84CC1620' }]}>
          <Calendar size={56} color="#84CC16" />
        </View>
        <Text style={[styles.heroTitle, { color: theme.colors.text }]}>{agent.name}</Text>
        <Text style={[styles.heroSubtitle, { color: theme.colors.textSecondary }]}>Sub-Agent of {agent.parent}</Text>
        <View style={styles.badgesRow}>
          <View style={[styles.badge, { backgroundColor: '#34C75922' }]}><Activity size={12} color="#34C759" /><Text style={[styles.badgeText, { color: '#34C759' }]}>Active</Text></View>
          <View style={[styles.badge, { backgroundColor: '#84CC1622' }]}><Briefcase size={12} color="#84CC16" /><Text style={[styles.badgeText, { color: '#84CC16' }]}>Booker</Text></View>
          <TouchableOpacity onPress={()=>router.push(agent.parentRoute)} style={[styles.badge, { backgroundColor: '#5856D622' }]}>
            <ArrowRight size={12} color="#5856D6" /><Text style={[styles.badgeText, { color: '#5856D6' }]}>View Parent</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.statsContainer}>
        {[
          {label:'Active',value:'24/7',icon: Activity, color: '#34C759'},
          {label:'Level',value:'Booker',icon: Briefcase, color: '#84CC16'},
          {label:'Booked',value:'50000+',icon: Truck, color: '#FF9500'},
          {label:'Carriers',value:'200+',icon: CheckCircle, color: '#007AFF'}
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
          The AI Carrier Booker books freight with carriers, compares rates, and secures capacity for shipments. This enterprise-level sub-agent optimizes carrier selection based on cost, service, and reliability.
        </Text>
      </View>

      <View style={[styles.section, { backgroundColor: theme.colors.card || '#F2F2F7' }]}>
        <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Core Capabilities</Text>
        <View style={styles.tagsContainer}>
          {['Rate Comparison','Capacity Booking','Carrier Selection','Load Optimization','Booking Confirmation','Tracking Integration'].map((cap,index)=>(
            <View key={index} style={[styles.tag, { backgroundColor: '#84CC1618' }]}>
              <Text style={[styles.tagText, { color: '#84CC16' }]}>{cap}</Text>
            </View>
          ))}
        </View>
      </View>

      <View style={[styles.section, { backgroundColor: theme.colors.card || '#F2F2F7' }]}>
        <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>A2A Endpoints</Text>
        {['/consult/carrier-booker','/carrier-booker/execute','/carrier-booker/analyze'].map((endpoint,index)=>(
          <View key={index} style={styles.endpointRow}>
            <Zap size={14} color="#8B5CF6" />
            <Text style={[styles.endpointText, { color: theme.colors.textSecondary }]}>{endpoint}</Text>
          </View>
        ))}
      </View>

      <View style={[styles.section, { backgroundColor: theme.colors.card || '#F2F2F7' }]}>
        <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Parent Agent</Text>
        <TouchableOpacity onPress={() => router.push('/ai-agent/supply-chain/shipping-coordinator')} style={[styles.parentCard, { backgroundColor: theme.colors.background || '#F2F2F7' }]}>
          <Package size={24} color="#0EA5E9" />
          <View style={styles.parentInfo}>
            <Text style={[styles.parentName, { color: theme.colors.text }]}>{"AI Shipping Coordinator"}</Text>
            <Text style={[styles.parentDesc, { color: theme.colors.textSecondary }]}>Main Agent</Text>
          </View>
          <ArrowRight size={20} color={theme.colors.textSecondary} />
        </TouchableOpacity>
      </View>

      <AgentFeatures agentId="carrier-booker" agentName="AI Carrier Booker" />
      <View style={{ height: 40 }} />
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
