import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useTheme } from '@/providers/ThemeProvider';
import { Package, Activity, CircleCheckBig, Clock, Target, ChartBar, MessageSquare, Calendar, Shield, ArrowRight, Users, Zap, Star } from 'lucide-react-native';
import AgentFeatures from '@/components/ai-agent/AgentFeatures';

export default function VPSupplyChainOpsPage() {
  const { theme } = useTheme();
  return (
    <ScrollView style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <View style={[styles.hero, { backgroundColor: theme.colors.primary + '18' }]}>
        <View style={[styles.heroIconWrap, { backgroundColor: theme.colors.primary + '25' }]}>
          <Package size={48} color={theme.colors.primary} />
        </View>
        <Text style={[styles.heroTitle, { color: theme.colors.text }]}>VP Supply Chain Operations</Text>
        <Text style={[styles.heroSubtitle, { color: theme.colors.textSecondary }]}>Supply Chain & Logistics Department</Text>
        <View style={styles.badgesRow}>
          <View style={[styles.badge, { backgroundColor: '#34C75922' }]}><Activity size={12} color="#34C759" /><Text style={[styles.badgeText, { color: '#34C759' }]}>Active</Text></View>
          <View style={[styles.badge, { backgroundColor: theme.colors.primary + '22' }]}><Star size={12} color={theme.colors.primary} /><Text style={[styles.badgeText, { color: theme.colors.primary }]}>VP Level</Text></View>
          <View style={[styles.badge, { backgroundColor: '#FF950022' }]}><Users size={12} color="#FF9500" /><Text style={[styles.badgeText, { color: '#FF9500' }]}>5+ Reports</Text></View>
        </View>
      </View>

      <View style={styles.statsContainer}>
        {[{label:'Orders',value:'34,521',icon: CircleCheckBig,color:'#34C759'},{label:'Uptime',value:'99.96%',icon:Activity,color:'#007AFF'},{label:'Response',value:'0.5s',icon:Clock,color:'#FF9500'},{label:'Accuracy',value:'99.2%',icon:Target,color:'#AF52DE'}].map((stat,index)=>(
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
          The VP Supply Chain Operations AI manages procurement, logistics, and inventory optimization. This agent ensures seamless end-to-end supply chain coordination, cost efficiency, and resilience against disruptions.
        </Text>
      </View>

      <View style={[styles.section, { backgroundColor: theme.colors.card || '#F2F2F7' }]}>
        <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Capabilities</Text>
        <View style={styles.tagsContainer}>
          {['Procurement','Inventory Mgmt','Demand Forecast','Vendor Relations','Logistics','Warehouse Ops','Order Fulfillment','Risk Mgmt'].map((cap,index)=>(
            <View key={index} style={[styles.tag, { backgroundColor: theme.colors.primary + '18' }]}>
              <Text style={[styles.tagText, { color: theme.colors.primary }]}>{cap}</Text>
            </View>
          ))}
        </View>
      </View>

      <View style={[styles.section, { backgroundColor: theme.colors.card || '#F2F2F7' }]}>
        <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Key Responsibilities</Text>
        {['Supply Chain Strategy & Network Design','Procurement & Sourcing Management','Inventory Optimization & Control','Demand Forecasting & Planning','Vendor Relationship & Contract Mgmt','Logistics Coordination & Transportation','Warehouse Operations & Fulfillment','Supply Chain Risk & Resilience Mgmt'].map((item,index)=>(
          <View key={index} style={styles.responsibilityRow}>
            <ArrowRight size={14} color={theme.colors.primary} />
            <Text style={[styles.responsibilityText, { color: theme.colors.textSecondary }]}>{item}</Text>
          </View>
        ))}
      </View>

      <View style={[styles.section, { backgroundColor: theme.colors.card || '#F2F2F7' }]}>
        <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Recent Activity</Text>
        {[{time:'2 min ago',text:'Processed 850 new purchase orders'},{time:'12 min ago',text:'Updated inventory levels across 12 warehouses'},{time:'40 min ago',text:'Completed vendor performance review'},{time:'2 hours ago',text:'Optimized demand forecast for Q4'},{time:'4 hours ago',text:'Published supply chain resilience report'}].map((act,index)=>(
          <View key={index} style={styles.activityRow}>
            <View style={[styles.activityIcon, { backgroundColor: theme.colors.primary + '15' }]}>
              <Zap size={14} color={theme.colors.primary} />
            </View>
            <View style={styles.activityContent}>
              <Text style={[styles.activityText, { color: theme.colors.text }]}>{act.text}</Text>
              <Text style={[styles.activityTime, { color: theme.colors.textSecondary }]}>{act.time}</Text>
            </View>
          </View>
        ))}
      </View>

      <View style={[styles.section, { backgroundColor: theme.colors.card || '#F2F2F7' }]}>
        <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Quick Actions</Text>
        <View style={styles.actionsGrid}>
          [{label:'View Reports',icon:ChartBar},{label:'Team Chat',icon:MessageSquare},{label:'Schedule',icon:Calendar},{label:'Settings',icon:Shield}].map((action,index)=>(
            <TouchableOpacity key={index} style={[styles.actionButton, { backgroundColor: theme.colors.primary + '12' }]}>
              <action.icon size={24} color={theme.colors.primary} />
              <Text style={[styles.actionText, { color: theme.colors.primary }]}>{action.label}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>
    <AgentFeatures agentId="vp-supply-chain-ops" agentName="VP Supply Chain Operations" />

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
  actionsGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 12 },
  actionButton: { flex: 1, minWidth: '45%', alignItems: 'center', padding: 16, borderRadius: 12 },
  actionText: { fontSize: 13, fontWeight: '600', marginTop: 8 },
});

