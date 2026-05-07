const fs = require('fs');
const path = require('path');

const baseDir = path.join(__dirname, '..', 'app', 'ai-agent', 'transportation', 'sub-agents');

const subAgents = [
  { id:'logistics-strategy-advisor', name:'AI Logistics Strategy Advisor', parent:'AI Chief Logistics Officer', parentRoute:'/ai-agent/transportation/clo-logistics', icon:'Globe' },
  { id:'network-optimizer', name:'AI Network Optimizer', parent:'AI Chief Logistics Officer', parentRoute:'/ai-agent/transportation/clo-logistics', icon:'MapPin' },
  { id:'cost-to-serve-analyst', name:'AI Cost-to-Serve Analyst', parent:'AI Chief Logistics Officer', parentRoute:'/ai-agent/transportation/clo-logistics', icon:'BarChart3' },
  { id:'fleet-strategy-planner', name:'AI Fleet Strategy Planner', parent:'AI VP Transportation', parentRoute:'/ai-agent/transportation/vp-transportation', icon:'Map' },
  { id:'route-network-designer', name:'AI Route Network Designer', parent:'AI VP Transportation', parentRoute:'/ai-agent/transportation/vp-transportation', icon:'Route' },
  { id:'capacity-planner', name:'AI Capacity Planner', parent:'AI VP Transportation', parentRoute:'/ai-agent/transportation/vp-transportation', icon:'BarChart3' },
  { id:'hub-operations-optimizer', name:'AI Hub Operations Optimizer', parent:'AI VP Logistics Operations', parentRoute:'/ai-agent/transportation/vp-logistics-operations', icon:'Settings' },
  { id:'throughput-monitor', name:'AI Throughput Monitor', parent:'AI VP Logistics Operations', parentRoute:'/ai-agent/transportation/vp-logistics-operations', icon:'Gauge' },
  { id:'sla-enforcer', name:'AI SLA Enforcer', parent:'AI VP Logistics Operations', parentRoute:'/ai-agent/transportation/vp-logistics-operations', icon:'FileText' },
  { id:'vehicle-scheduler', name:'AI Vehicle Scheduler', parent:'AI Fleet Manager', parentRoute:'/ai-agent/transportation/fleet-manager', icon:'Calendar' },
  { id:'fuel-efficiency-monitor', name:'AI Fuel Efficiency Monitor', parent:'AI Fleet Manager', parentRoute:'/ai-agent/transportation/fleet-manager', icon:'Gauge' },
  { id:'maintenance-planner', name:'AI Maintenance Planner', parent:'AI Fleet Manager', parentRoute:'/ai-agent/transportation/fleet-manager', icon:'Wrench' },
  { id:'slot-optimizer', name:'AI Slot Optimizer', parent:'AI Warehouse Manager', parentRoute:'/ai-agent/transportation/warehouse-manager', icon:'LayoutGrid' },
  { id:'pick-path-planner', name:'AI Pick Path Planner', parent:'AI Warehouse Manager', parentRoute:'/ai-agent/transportation/warehouse-manager', icon:'Route' },
  { id:'labor-scheduler', name:'AI Labor Scheduler', parent:'AI Warehouse Manager', parentRoute:'/ai-agent/transportation/warehouse-manager', icon:'Users' },
  { id:'zone-planner', name:'AI Zone Planner', parent:'AI Distribution Manager', parentRoute:'/ai-agent/transportation/distribution-manager', icon:'MapPin' },
  { id:'delivery-window-manager', name:'AI Delivery Window Manager', parent:'AI Distribution Manager', parentRoute:'/ai-agent/transportation/distribution-manager', icon:'Clock' },
  { id:'carrier-allocator', name:'AI Carrier Allocator', parent:'AI Distribution Manager', parentRoute:'/ai-agent/transportation/distribution-manager', icon:'Truck' },
  { id:'traffic-predictor', name:'AI Traffic Predictor', parent:'AI Route Optimizer', parentRoute:'/ai-agent/transportation/ai-route-optimizer', icon:'Activity' },
  { id:'multi-stop-planner', name:'AI Multi-stop Planner', parent:'AI Route Optimizer', parentRoute:'/ai-agent/transportation/ai-route-optimizer', icon:'Map' },
  { id:'real-time-rerouter', name:'AI Real-time Rerouter', parent:'AI Route Optimizer', parentRoute:'/ai-agent/transportation/ai-route-optimizer', icon:'RefreshCw' },
  { id:'dispatch-optimizer', name:'AI Dispatch Optimizer', parent:'AI Fleet Coordinator', parentRoute:'/ai-agent/transportation/ai-fleet-coordinator', icon:'Zap' },
  { id:'driver-assignment-agent', name:'AI Driver Assignment Agent', parent:'AI Fleet Coordinator', parentRoute:'/ai-agent/transportation/ai-fleet-coordinator', icon:'UserCheck' },
  { id:'vehicle-tracker', name:'AI Vehicle Tracker', parent:'AI Fleet Coordinator', parentRoute:'/ai-agent/transportation/ai-fleet-coordinator', icon:'MapPin' },
  { id:'inventory-put-away-agent', name:'AI Inventory Put-away Agent', parent:'AI Warehouse Operator', parentRoute:'/ai-agent/transportation/ai-warehouse-operator', icon:'ArrowDown' },
  { id:'pick-pack-coordinator', name:'AI Pick & Pack Coordinator', parent:'AI Warehouse Operator', parentRoute:'/ai-agent/transportation/ai-warehouse-operator', icon:'Package' },
  { id:'return-processor', name:'AI Return Processor', parent:'AI Warehouse Operator', parentRoute:'/ai-agent/transportation/ai-warehouse-operator', icon:'RotateCcw' },
  { id:'load-matcher', name:'AI Load Matcher', parent:'AI Dispatcher', parentRoute:'/ai-agent/transportation/ai-dispatcher', icon:'Layers' },
  { id:'driver-communicator', name:'AI Driver Communicator', parent:'AI Dispatcher', parentRoute:'/ai-agent/transportation/ai-dispatcher', icon:'MessageSquare' },
  { id:'delivery-sequencer', name:'AI Delivery Sequencer', parent:'AI Dispatcher', parentRoute:'/ai-agent/transportation/ai-dispatcher', icon:'List' },
  { id:'shipment-monitor', name:'AI Shipment Monitor', parent:'AI Tracking Specialist', parentRoute:'/ai-agent/transportation/ai-tracking-specialist', icon:'Eye' },
  { id:'eta-predictor', name:'AI ETA Predictor', parent:'AI Tracking Specialist', parentRoute:'/ai-agent/transportation/ai-tracking-specialist', icon:'Clock' },
  { id:'exception-alerter', name:'AI Exception Alerter', parent:'AI Tracking Specialist', parentRoute:'/ai-agent/transportation/ai-tracking-specialist', icon:'AlertTriangle' },
  { id:'delivery-window-negotiator', name:'AI Delivery Window Negotiator', parent:'AI Last Mile Coordinator', parentRoute:'/ai-agent/transportation/ai-last-mile-coordinator', icon:'Clock' },
  { id:'proof-of-delivery-manager', name:'AI Proof-of-delivery Manager', parent:'AI Last Mile Coordinator', parentRoute:'/ai-agent/transportation/ai-last-mile-coordinator', icon:'CheckCircle' },
  { id:'customer-notifier', name:'AI Customer Notifier', parent:'AI Last Mile Coordinator', parentRoute:'/ai-agent/transportation/ai-last-mile-coordinator', icon:'Bell' },
  { id:'rate-negotiator', name:'AI Rate Negotiator', parent:'AI Freight Broker', parentRoute:'/ai-agent/transportation/ai-freight-broker', icon:'DollarSign' },
  { id:'carrier-qualifier', name:'AI Carrier Qualifier', parent:'AI Freight Broker', parentRoute:'/ai-agent/transportation/ai-freight-broker', icon:'Shield' },
  { id:'lane-optimizer', name:'AI Lane Optimizer', parent:'AI Freight Broker', parentRoute:'/ai-agent/transportation/ai-freight-broker', icon:'Route' },
  { id:'duty-calculator', name:'AI Duty Calculator', parent:'AI Customs Specialist', parentRoute:'/ai-agent/transportation/ai-customs-specialist', icon:'Calculator' },
  { id:'document-preparer', name:'AI Document Preparer', parent:'AI Customs Specialist', parentRoute:'/ai-agent/transportation/ai-customs-specialist', icon:'FileText' },
  { id:'compliance-checker', name:'AI Compliance Checker', parent:'AI Customs Specialist', parentRoute:'/ai-agent/transportation/ai-customs-specialist', icon:'ShieldCheck' },
];

function toPascalCase(id) {
  return id.replace(/-([a-z])/g, (_, c) => c.toUpperCase());
}

function generatePage(sa) {
  const componentName = toPascalCase(sa.id) + 'Page';
  const shortName = sa.name.replace(/^AI /, '');
  return `import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useTheme } from '@/providers/ThemeProvider';
import { useRouter } from 'expo-router';
import { Activity, Star, CircleCheckBig, Target, ArrowRight, Zap, Users, MessageSquare, Calendar, ChartBarBig, TrendingUp, AlertTriangle, FileText, ChevronRight, ${sa.icon} } from 'lucide-react-native';
import AgentFeatures from '@/components/ai-agent/AgentFeatures';

export default function ${componentName}() {
  const { theme } = useTheme();
  const router = useRouter();

  const stats = [
    { label: 'Status', value: 'Active', icon: Activity, color: '#34C759' },
    { label: 'Level', value: 'Specialist', icon: Star, color: '#0EA5E9' },
    { label: 'Efficiency', value: '20x', icon: Target, color: '#FF9500' },
    { label: 'Parent', value: '${sa.parent}', icon: CircleCheckBig, color: '#007AFF' }
  ];

  const capabilities = [
    '${shortName}', 'Automation', 'AI-Powered', 'Real-time', 'Analytics',
    'Integration', 'Optimization', 'Monitoring', 'Reporting', 'Coordination',
    'Prediction', 'Analysis', 'Management', 'Tracking', 'Compliance',
    'Enterprise Integration'
  ];

  const responsibilities = [
    'Execute ${shortName} operations with enterprise-grade precision',
    'Monitor and optimize performance metrics for continuous improvement',
    'Coordinate with parent agent ${sa.parent} on strategic initiatives',
    'Generate real-time analytics and automated reporting',
    'Ensure compliance with transportation and logistics standards',
    'Integrate with external systems and carrier APIs',
    'Provide proactive alerts and exception management',
    'Support cross-functional logistics operations and workflows'
  ];

  const activities = [
    { time: '2 min ago', text: 'Processed ${shortName} workflow batch', icon: Zap },
    { time: '15 min ago', text: 'Updated performance metrics dashboard', icon: ChartBarBig },
    { time: '30 min ago', text: 'Coordinated with ${sa.parent} on priority task', icon: Users },
    { time: '1 hr ago', text: 'Generated automated compliance report', icon: FileText },
    { time: '3 hr ago', text: 'Optimized ${shortName} parameters for 5% improvement', icon: TrendingUp },
  ];

  return (
    <ScrollView style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <View style={[styles.hero, { borderBottomColor: theme.colors.border || '#E5E5EA' }]}>
        <View style={[styles.heroIconWrap, { backgroundColor: '#0EA5E920' }]}>
          <${sa.icon} size={56} color="#0EA5E9" />
        </View>
        <Text style={[styles.heroTitle, { color: theme.colors.text }]}>${sa.name}</Text>
        <Text style={[styles.heroSubtitle, { color: theme.colors.textSecondary }]}>Sub-Agent of ${sa.parent}</Text>
        <View style={styles.badgesRow}>
          <View style={[styles.badge, { backgroundColor: '#34C75922' }]}><Activity size={12} color="#34C759" /><Text style={[styles.badgeText, { color: '#34C759' }]}>Active</Text></View>
          <View style={[styles.badge, { backgroundColor: '#0EA5E922' }]}><Star size={12} color="#0EA5E9" /><Text style={[styles.badgeText, { color: '#0EA5E9' }]}>Specialist</Text></View>
        </View>
      </View>

      <View style={styles.statsContainer}>
        {stats.map((stat, i) => (
          <View key={i} style={[styles.statCard, { backgroundColor: theme.colors.card || '#F2F2F7' }]}>
            <stat.icon size={22} color={stat.color} />
            <Text style={[styles.statValue, { color: theme.colors.text }]}>{stat.value}</Text>
            <Text style={[styles.statLabel, { color: theme.colors.textSecondary }]}>{stat.label}</Text>
          </View>
        ))}
      </View>

      <View style={[styles.section, { backgroundColor: theme.colors.card || '#F2F2F7' }]}>
        <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Overview</Text>
        <Text style={[styles.description, { color: theme.colors.textSecondary }]}>
          ${sa.name} is a specialized sub-agent supporting ${sa.parent}. It provides enterprise-grade ${shortName} capabilities with real-time monitoring, optimization, and analytics integration across the transportation and logistics network.
        </Text>
      </View>

      <View style={[styles.section, { backgroundColor: theme.colors.card || '#F2F2F7' }]}>
        <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Enterprise Capabilities</Text>
        <View style={styles.tagsContainer}>
          {capabilities.map((cap, i) => (
            <View key={i} style={[styles.tag, { backgroundColor: '#0EA5E918' }]}>
              <Text style={[styles.tagText, { color: '#0EA5E9' }]}>{cap}</Text>
            </View>
          ))}
        </View>
      </View>

      <View style={[styles.section, { backgroundColor: theme.colors.card || '#F2F2F7' }]}>
        <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Key Responsibilities</Text>
        {responsibilities.map((item, i) => (
          <View key={i} style={styles.responsibilityRow}>
            <ArrowRight size={14} color="#0EA5E9" />
            <Text style={[styles.responsibilityText, { color: theme.colors.textSecondary }]}>{item}</Text>
          </View>
        ))}
      </View>

      <View style={[styles.section, { backgroundColor: theme.colors.card || '#F2F2F7' }]}>
        <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Performance Metrics</Text>
        <View style={styles.metricsGrid}>
          {[
            { label: 'Efficiency', value: '94.2%', change: '+3.8%', trend: 'up' },
            { label: 'Uptime', value: '99.8%', change: '+0.2%', trend: 'up' },
            { label: 'Response', value: '0.4s', change: '-35%', trend: 'up' },
            { label: 'Tasks/Day', value: '4,821', change: '+342', trend: 'up' },
          ].map((m, i) => (
            <View key={i} style={[styles.metricCard, { backgroundColor: theme.colors.background || '#F2F2F7' }]}>
              <Text style={[styles.metricValue, { color: theme.colors.text }]}>{m.value}</Text>
              <Text style={[styles.metricLabel, { color: theme.colors.textSecondary }]}>{m.label}</Text>
              <View style={styles.metricTrend}><TrendingUp size={12} color="#34C759" /><Text style={{ fontSize: 11, color: '#34C759', fontWeight: '600' }}>{m.change}</Text></View>
            </View>
          ))}
        </View>
      </View>

      <View style={[styles.section, { backgroundColor: theme.colors.card || '#F2F2F7' }]}>
        <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Recent Activity</Text>
        {activities.map((act, i) => (
          <View key={i} style={styles.activityRow}>
            <View style={[styles.activityIcon, { backgroundColor: '#0EA5E915' }]}><act.icon size={14} color="#0EA5E9" /></View>
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
          {[{label:'View Dashboard',icon:ChartBarBig},{label:'Team Chat',icon:MessageSquare},{label:'Schedule',icon:Calendar},{label:'Alerts',icon:AlertTriangle}].map((action,i) => (
            <TouchableOpacity key={i} style={[styles.actionButton, { backgroundColor: '#0EA5E912' }]}>
              <action.icon size={24} color="#0EA5E9" />
              <Text style={[styles.actionText, { color: '#0EA5E9' }]}>{action.label}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      <View style={[styles.section, { backgroundColor: theme.colors.card || '#F2F2F7' }]}>
        <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Parent Agent</Text>
        <TouchableOpacity onPress={() => router.push('${sa.parentRoute}')} style={[styles.parentCard, { backgroundColor: theme.colors.background || '#F2F2F7' }]}>
          <ArrowRight size={24} color="#0EA5E9" />
          <View style={styles.parentInfo}>
            <Text style={[styles.parentName, { color: theme.colors.text }]}>${sa.parent}</Text>
            <Text style={[styles.parentDesc, { color: theme.colors.textSecondary }]}>Navigate to parent agent page</Text>
          </View>
          <ChevronRight size={20} color={theme.colors.textSecondary} />
        </TouchableOpacity>
      </View>

      <AgentFeatures agentId="${sa.id}" agentName="${sa.name}" />
      <View style={{ height: 40 }} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  hero: { alignItems: 'center', paddingVertical: 32, paddingHorizontal: 20, borderBottomWidth: 1 },
  heroIconWrap: { width: 88, height: 88, borderRadius: 44, justifyContent: 'center', alignItems: 'center', marginBottom: 16 },
  heroTitle: { fontSize: 22, fontWeight: 'bold' },
  heroSubtitle: { fontSize: 15, marginTop: 4, fontWeight: '500' },
  badgesRow: { flexDirection: 'row', gap: 10, marginTop: 16, flexWrap: 'wrap', justifyContent: 'center' },
  badge: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 10, paddingVertical: 5, borderRadius: 20, gap: 4 },
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
  metricsGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 12 },
  metricCard: { flex: 1, minWidth: '45%', alignItems: 'center', padding: 16, borderRadius: 12 },
  metricValue: { fontSize: 20, fontWeight: 'bold' },
  metricLabel: { fontSize: 12, marginTop: 4 },
  metricTrend: { flexDirection: 'row', alignItems: 'center', gap: 4, marginTop: 6 },
  activityRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 12, gap: 12 },
  activityIcon: { width: 32, height: 32, borderRadius: 16, justifyContent: 'center', alignItems: 'center' },
  activityContent: { flex: 1 },
  activityText: { fontSize: 14, fontWeight: '500' },
  activityTime: { fontSize: 12, marginTop: 2 },
  actionsGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 12 },
  actionButton: { flex: 1, minWidth: '45%', alignItems: 'center', padding: 16, borderRadius: 12 },
  actionText: { fontSize: 13, fontWeight: '600', marginTop: 8 },
  parentCard: { flexDirection: 'row', alignItems: 'center', padding: 16, borderRadius: 12 },
  parentInfo: { flex: 1, marginLeft: 12 },
  parentName: { fontSize: 16, fontWeight: '600' },
  parentDesc: { fontSize: 12, marginTop: 2 },
});
`;
}

let success = 0;
for (const sa of subAgents) {
  try {
    const filePath = path.join(baseDir, sa.id + '.tsx');
    fs.writeFileSync(filePath, generatePage(sa), 'utf8');
    console.log('Written:', sa.id + '.tsx');
    success++;
  } catch (err) {
    console.error('Failed:', sa.id, err.message);
  }
}
console.log('\nDone:', success, 'of', subAgents.length, 'files');
