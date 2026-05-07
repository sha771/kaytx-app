import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useTheme } from '@/providers/ThemeProvider';
import { Activity, Truck, ArrowRight, Briefcase, Users } from 'lucide-react-native';
import { useRouter } from 'expo-router';

export default function SubAgentsIndex() {
  const { theme } = useTheme();
  const router = useRouter();

  return (
    <ScrollView style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <View style={[styles.hero, { borderBottomColor: theme.colors.border || '#E5E5EA' }]}>
        <View style={[styles.heroIconWrap, { backgroundColor: '#0EA5E915' }]}><Truck size={48} color="#0EA5E9" /></View>
        <Text style={[styles.heroTitle, { color: theme.colors.text }]}>Transportation & Logistics - Sub-Agents</Text>
        <Text style={[styles.heroSubtitle, { color: theme.colors.textSecondary }]}>Helper & Sub-Agent Workforce</Text>
        <View style={styles.badgesRow}>
          <View style={[styles.badge, { backgroundColor: '#34C75922' }]}><Activity size={12} color="#34C759" /><Text style={[styles.badgeText, { color: '#34C759' }]}>Active</Text></View>
          <View style={[styles.badge, { backgroundColor: '#0EA5E922' }]}><Users size={12} color="#0EA5E9" /><Text style={[styles.badgeText, { color: '#0EA5E9' }]}>42 Agents</Text></View>
        </View>
      </View>
      <View style={[styles.section, { backgroundColor: theme.colors.card || '#F2F2F7' }]}>
        <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Sub-Agents</Text>
        <TouchableOpacity key="capacity-planner" onPress={() => router.push('/ai-agent/transportation/sub-agents/capacity-planner')} style={[styles.agentCard, { backgroundColor: theme.colors.background || '#F2F2F7' }]}>
          <View style={[styles.agentIcon, { backgroundColor: '#0EA5E920' }]}><Truck size={28} color="#0EA5E9" /></View>
          <View style={styles.agentInfo}>
            <Text style={[styles.agentName, { color: theme.colors.text }]}>Capacity Planner</Text>
            <Text style={[styles.agentDesc, { color: theme.colors.textSecondary }]}>Sub-Agent</Text>
          </View>
          <ArrowRight size={20} color={theme.colors.textSecondary} />
        </TouchableOpacity>
        <TouchableOpacity key="carrier-allocator" onPress={() => router.push('/ai-agent/transportation/sub-agents/carrier-allocator')} style={[styles.agentCard, { backgroundColor: theme.colors.background || '#F2F2F7' }]}>
          <View style={[styles.agentIcon, { backgroundColor: '#0EA5E920' }]}><Truck size={28} color="#0EA5E9" /></View>
          <View style={styles.agentInfo}>
            <Text style={[styles.agentName, { color: theme.colors.text }]}>Carrier Allocator</Text>
            <Text style={[styles.agentDesc, { color: theme.colors.textSecondary }]}>Sub-Agent</Text>
          </View>
          <ArrowRight size={20} color={theme.colors.textSecondary} />
        </TouchableOpacity>
        <TouchableOpacity key="carrier-qualifier" onPress={() => router.push('/ai-agent/transportation/sub-agents/carrier-qualifier')} style={[styles.agentCard, { backgroundColor: theme.colors.background || '#F2F2F7' }]}>
          <View style={[styles.agentIcon, { backgroundColor: '#0EA5E920' }]}><Truck size={28} color="#0EA5E9" /></View>
          <View style={styles.agentInfo}>
            <Text style={[styles.agentName, { color: theme.colors.text }]}>Carrier Qualifier</Text>
            <Text style={[styles.agentDesc, { color: theme.colors.textSecondary }]}>Sub-Agent</Text>
          </View>
          <ArrowRight size={20} color={theme.colors.textSecondary} />
        </TouchableOpacity>
        <TouchableOpacity key="compliance-checker" onPress={() => router.push('/ai-agent/transportation/sub-agents/compliance-checker')} style={[styles.agentCard, { backgroundColor: theme.colors.background || '#F2F2F7' }]}>
          <View style={[styles.agentIcon, { backgroundColor: '#0EA5E920' }]}><Truck size={28} color="#0EA5E9" /></View>
          <View style={styles.agentInfo}>
            <Text style={[styles.agentName, { color: theme.colors.text }]}>Compliance Checker</Text>
            <Text style={[styles.agentDesc, { color: theme.colors.textSecondary }]}>Sub-Agent</Text>
          </View>
          <ArrowRight size={20} color={theme.colors.textSecondary} />
        </TouchableOpacity>
        <TouchableOpacity key="cost-to-serve-analyst" onPress={() => router.push('/ai-agent/transportation/sub-agents/cost-to-serve-analyst')} style={[styles.agentCard, { backgroundColor: theme.colors.background || '#F2F2F7' }]}>
          <View style={[styles.agentIcon, { backgroundColor: '#0EA5E920' }]}><Truck size={28} color="#0EA5E9" /></View>
          <View style={styles.agentInfo}>
            <Text style={[styles.agentName, { color: theme.colors.text }]}>Cost To Serve Analyst</Text>
            <Text style={[styles.agentDesc, { color: theme.colors.textSecondary }]}>Sub-Agent</Text>
          </View>
          <ArrowRight size={20} color={theme.colors.textSecondary} />
        </TouchableOpacity>
        <TouchableOpacity key="customer-notifier" onPress={() => router.push('/ai-agent/transportation/sub-agents/customer-notifier')} style={[styles.agentCard, { backgroundColor: theme.colors.background || '#F2F2F7' }]}>
          <View style={[styles.agentIcon, { backgroundColor: '#0EA5E920' }]}><Truck size={28} color="#0EA5E9" /></View>
          <View style={styles.agentInfo}>
            <Text style={[styles.agentName, { color: theme.colors.text }]}>Customer Notifier</Text>
            <Text style={[styles.agentDesc, { color: theme.colors.textSecondary }]}>Sub-Agent</Text>
          </View>
          <ArrowRight size={20} color={theme.colors.textSecondary} />
        </TouchableOpacity>
        <TouchableOpacity key="delivery-sequencer" onPress={() => router.push('/ai-agent/transportation/sub-agents/delivery-sequencer')} style={[styles.agentCard, { backgroundColor: theme.colors.background || '#F2F2F7' }]}>
          <View style={[styles.agentIcon, { backgroundColor: '#0EA5E920' }]}><Truck size={28} color="#0EA5E9" /></View>
          <View style={styles.agentInfo}>
            <Text style={[styles.agentName, { color: theme.colors.text }]}>Delivery Sequencer</Text>
            <Text style={[styles.agentDesc, { color: theme.colors.textSecondary }]}>Sub-Agent</Text>
          </View>
          <ArrowRight size={20} color={theme.colors.textSecondary} />
        </TouchableOpacity>
        <TouchableOpacity key="delivery-window-manager" onPress={() => router.push('/ai-agent/transportation/sub-agents/delivery-window-manager')} style={[styles.agentCard, { backgroundColor: theme.colors.background || '#F2F2F7' }]}>
          <View style={[styles.agentIcon, { backgroundColor: '#0EA5E920' }]}><Truck size={28} color="#0EA5E9" /></View>
          <View style={styles.agentInfo}>
            <Text style={[styles.agentName, { color: theme.colors.text }]}>Delivery Window Manager</Text>
            <Text style={[styles.agentDesc, { color: theme.colors.textSecondary }]}>Sub-Agent</Text>
          </View>
          <ArrowRight size={20} color={theme.colors.textSecondary} />
        </TouchableOpacity>
        <TouchableOpacity key="delivery-window-negotiator" onPress={() => router.push('/ai-agent/transportation/sub-agents/delivery-window-negotiator')} style={[styles.agentCard, { backgroundColor: theme.colors.background || '#F2F2F7' }]}>
          <View style={[styles.agentIcon, { backgroundColor: '#0EA5E920' }]}><Truck size={28} color="#0EA5E9" /></View>
          <View style={styles.agentInfo}>
            <Text style={[styles.agentName, { color: theme.colors.text }]}>Delivery Window Negotiator</Text>
            <Text style={[styles.agentDesc, { color: theme.colors.textSecondary }]}>Sub-Agent</Text>
          </View>
          <ArrowRight size={20} color={theme.colors.textSecondary} />
        </TouchableOpacity>
        <TouchableOpacity key="dispatch-optimizer" onPress={() => router.push('/ai-agent/transportation/sub-agents/dispatch-optimizer')} style={[styles.agentCard, { backgroundColor: theme.colors.background || '#F2F2F7' }]}>
          <View style={[styles.agentIcon, { backgroundColor: '#0EA5E920' }]}><Truck size={28} color="#0EA5E9" /></View>
          <View style={styles.agentInfo}>
            <Text style={[styles.agentName, { color: theme.colors.text }]}>Dispatch Optimizer</Text>
            <Text style={[styles.agentDesc, { color: theme.colors.textSecondary }]}>Sub-Agent</Text>
          </View>
          <ArrowRight size={20} color={theme.colors.textSecondary} />
        </TouchableOpacity>
        <TouchableOpacity key="document-preparer" onPress={() => router.push('/ai-agent/transportation/sub-agents/document-preparer')} style={[styles.agentCard, { backgroundColor: theme.colors.background || '#F2F2F7' }]}>
          <View style={[styles.agentIcon, { backgroundColor: '#0EA5E920' }]}><Truck size={28} color="#0EA5E9" /></View>
          <View style={styles.agentInfo}>
            <Text style={[styles.agentName, { color: theme.colors.text }]}>Document Preparer</Text>
            <Text style={[styles.agentDesc, { color: theme.colors.textSecondary }]}>Sub-Agent</Text>
          </View>
          <ArrowRight size={20} color={theme.colors.textSecondary} />
        </TouchableOpacity>
        <TouchableOpacity key="driver-assignment-agent" onPress={() => router.push('/ai-agent/transportation/sub-agents/driver-assignment-agent')} style={[styles.agentCard, { backgroundColor: theme.colors.background || '#F2F2F7' }]}>
          <View style={[styles.agentIcon, { backgroundColor: '#0EA5E920' }]}><Truck size={28} color="#0EA5E9" /></View>
          <View style={styles.agentInfo}>
            <Text style={[styles.agentName, { color: theme.colors.text }]}>Driver Assignment Agent</Text>
            <Text style={[styles.agentDesc, { color: theme.colors.textSecondary }]}>Sub-Agent</Text>
          </View>
          <ArrowRight size={20} color={theme.colors.textSecondary} />
        </TouchableOpacity>
        <TouchableOpacity key="driver-communicator" onPress={() => router.push('/ai-agent/transportation/sub-agents/driver-communicator')} style={[styles.agentCard, { backgroundColor: theme.colors.background || '#F2F2F7' }]}>
          <View style={[styles.agentIcon, { backgroundColor: '#0EA5E920' }]}><Truck size={28} color="#0EA5E9" /></View>
          <View style={styles.agentInfo}>
            <Text style={[styles.agentName, { color: theme.colors.text }]}>Driver Communicator</Text>
            <Text style={[styles.agentDesc, { color: theme.colors.textSecondary }]}>Sub-Agent</Text>
          </View>
          <ArrowRight size={20} color={theme.colors.textSecondary} />
        </TouchableOpacity>
        <TouchableOpacity key="duty-calculator" onPress={() => router.push('/ai-agent/transportation/sub-agents/duty-calculator')} style={[styles.agentCard, { backgroundColor: theme.colors.background || '#F2F2F7' }]}>
          <View style={[styles.agentIcon, { backgroundColor: '#0EA5E920' }]}><Truck size={28} color="#0EA5E9" /></View>
          <View style={styles.agentInfo}>
            <Text style={[styles.agentName, { color: theme.colors.text }]}>Duty Calculator</Text>
            <Text style={[styles.agentDesc, { color: theme.colors.textSecondary }]}>Sub-Agent</Text>
          </View>
          <ArrowRight size={20} color={theme.colors.textSecondary} />
        </TouchableOpacity>
        <TouchableOpacity key="eta-predictor" onPress={() => router.push('/ai-agent/transportation/sub-agents/eta-predictor')} style={[styles.agentCard, { backgroundColor: theme.colors.background || '#F2F2F7' }]}>
          <View style={[styles.agentIcon, { backgroundColor: '#0EA5E920' }]}><Truck size={28} color="#0EA5E9" /></View>
          <View style={styles.agentInfo}>
            <Text style={[styles.agentName, { color: theme.colors.text }]}>Eta Predictor</Text>
            <Text style={[styles.agentDesc, { color: theme.colors.textSecondary }]}>Sub-Agent</Text>
          </View>
          <ArrowRight size={20} color={theme.colors.textSecondary} />
        </TouchableOpacity>
        <TouchableOpacity key="exception-alerter" onPress={() => router.push('/ai-agent/transportation/sub-agents/exception-alerter')} style={[styles.agentCard, { backgroundColor: theme.colors.background || '#F2F2F7' }]}>
          <View style={[styles.agentIcon, { backgroundColor: '#0EA5E920' }]}><Truck size={28} color="#0EA5E9" /></View>
          <View style={styles.agentInfo}>
            <Text style={[styles.agentName, { color: theme.colors.text }]}>Exception Alerter</Text>
            <Text style={[styles.agentDesc, { color: theme.colors.textSecondary }]}>Sub-Agent</Text>
          </View>
          <ArrowRight size={20} color={theme.colors.textSecondary} />
        </TouchableOpacity>
        <TouchableOpacity key="fleet-strategy-planner" onPress={() => router.push('/ai-agent/transportation/sub-agents/fleet-strategy-planner')} style={[styles.agentCard, { backgroundColor: theme.colors.background || '#F2F2F7' }]}>
          <View style={[styles.agentIcon, { backgroundColor: '#0EA5E920' }]}><Truck size={28} color="#0EA5E9" /></View>
          <View style={styles.agentInfo}>
            <Text style={[styles.agentName, { color: theme.colors.text }]}>Fleet Strategy Planner</Text>
            <Text style={[styles.agentDesc, { color: theme.colors.textSecondary }]}>Sub-Agent</Text>
          </View>
          <ArrowRight size={20} color={theme.colors.textSecondary} />
        </TouchableOpacity>
        <TouchableOpacity key="fuel-efficiency-monitor" onPress={() => router.push('/ai-agent/transportation/sub-agents/fuel-efficiency-monitor')} style={[styles.agentCard, { backgroundColor: theme.colors.background || '#F2F2F7' }]}>
          <View style={[styles.agentIcon, { backgroundColor: '#0EA5E920' }]}><Truck size={28} color="#0EA5E9" /></View>
          <View style={styles.agentInfo}>
            <Text style={[styles.agentName, { color: theme.colors.text }]}>Fuel Efficiency Monitor</Text>
            <Text style={[styles.agentDesc, { color: theme.colors.textSecondary }]}>Sub-Agent</Text>
          </View>
          <ArrowRight size={20} color={theme.colors.textSecondary} />
        </TouchableOpacity>
        <TouchableOpacity key="hub-operations-optimizer" onPress={() => router.push('/ai-agent/transportation/sub-agents/hub-operations-optimizer')} style={[styles.agentCard, { backgroundColor: theme.colors.background || '#F2F2F7' }]}>
          <View style={[styles.agentIcon, { backgroundColor: '#0EA5E920' }]}><Truck size={28} color="#0EA5E9" /></View>
          <View style={styles.agentInfo}>
            <Text style={[styles.agentName, { color: theme.colors.text }]}>Hub Operations Optimizer</Text>
            <Text style={[styles.agentDesc, { color: theme.colors.textSecondary }]}>Sub-Agent</Text>
          </View>
          <ArrowRight size={20} color={theme.colors.textSecondary} />
        </TouchableOpacity>
        <TouchableOpacity key="inventory-put-away-agent" onPress={() => router.push('/ai-agent/transportation/sub-agents/inventory-put-away-agent')} style={[styles.agentCard, { backgroundColor: theme.colors.background || '#F2F2F7' }]}>
          <View style={[styles.agentIcon, { backgroundColor: '#0EA5E920' }]}><Truck size={28} color="#0EA5E9" /></View>
          <View style={styles.agentInfo}>
            <Text style={[styles.agentName, { color: theme.colors.text }]}>Inventory Put Away Agent</Text>
            <Text style={[styles.agentDesc, { color: theme.colors.textSecondary }]}>Sub-Agent</Text>
          </View>
          <ArrowRight size={20} color={theme.colors.textSecondary} />
        </TouchableOpacity>
        <TouchableOpacity key="labor-scheduler" onPress={() => router.push('/ai-agent/transportation/sub-agents/labor-scheduler')} style={[styles.agentCard, { backgroundColor: theme.colors.background || '#F2F2F7' }]}>
          <View style={[styles.agentIcon, { backgroundColor: '#0EA5E920' }]}><Truck size={28} color="#0EA5E9" /></View>
          <View style={styles.agentInfo}>
            <Text style={[styles.agentName, { color: theme.colors.text }]}>Labor Scheduler</Text>
            <Text style={[styles.agentDesc, { color: theme.colors.textSecondary }]}>Sub-Agent</Text>
          </View>
          <ArrowRight size={20} color={theme.colors.textSecondary} />
        </TouchableOpacity>
        <TouchableOpacity key="lane-optimizer" onPress={() => router.push('/ai-agent/transportation/sub-agents/lane-optimizer')} style={[styles.agentCard, { backgroundColor: theme.colors.background || '#F2F2F7' }]}>
          <View style={[styles.agentIcon, { backgroundColor: '#0EA5E920' }]}><Truck size={28} color="#0EA5E9" /></View>
          <View style={styles.agentInfo}>
            <Text style={[styles.agentName, { color: theme.colors.text }]}>Lane Optimizer</Text>
            <Text style={[styles.agentDesc, { color: theme.colors.textSecondary }]}>Sub-Agent</Text>
          </View>
          <ArrowRight size={20} color={theme.colors.textSecondary} />
        </TouchableOpacity>
        <TouchableOpacity key="load-matcher" onPress={() => router.push('/ai-agent/transportation/sub-agents/load-matcher')} style={[styles.agentCard, { backgroundColor: theme.colors.background || '#F2F2F7' }]}>
          <View style={[styles.agentIcon, { backgroundColor: '#0EA5E920' }]}><Truck size={28} color="#0EA5E9" /></View>
          <View style={styles.agentInfo}>
            <Text style={[styles.agentName, { color: theme.colors.text }]}>Load Matcher</Text>
            <Text style={[styles.agentDesc, { color: theme.colors.textSecondary }]}>Sub-Agent</Text>
          </View>
          <ArrowRight size={20} color={theme.colors.textSecondary} />
        </TouchableOpacity>
        <TouchableOpacity key="logistics-strategy-advisor" onPress={() => router.push('/ai-agent/transportation/sub-agents/logistics-strategy-advisor')} style={[styles.agentCard, { backgroundColor: theme.colors.background || '#F2F2F7' }]}>
          <View style={[styles.agentIcon, { backgroundColor: '#0EA5E920' }]}><Truck size={28} color="#0EA5E9" /></View>
          <View style={styles.agentInfo}>
            <Text style={[styles.agentName, { color: theme.colors.text }]}>Logistics Strategy Advisor</Text>
            <Text style={[styles.agentDesc, { color: theme.colors.textSecondary }]}>Sub-Agent</Text>
          </View>
          <ArrowRight size={20} color={theme.colors.textSecondary} />
        </TouchableOpacity>
        <TouchableOpacity key="maintenance-planner" onPress={() => router.push('/ai-agent/transportation/sub-agents/maintenance-planner')} style={[styles.agentCard, { backgroundColor: theme.colors.background || '#F2F2F7' }]}>
          <View style={[styles.agentIcon, { backgroundColor: '#0EA5E920' }]}><Truck size={28} color="#0EA5E9" /></View>
          <View style={styles.agentInfo}>
            <Text style={[styles.agentName, { color: theme.colors.text }]}>Maintenance Planner</Text>
            <Text style={[styles.agentDesc, { color: theme.colors.textSecondary }]}>Sub-Agent</Text>
          </View>
          <ArrowRight size={20} color={theme.colors.textSecondary} />
        </TouchableOpacity>
        <TouchableOpacity key="multi-stop-planner" onPress={() => router.push('/ai-agent/transportation/sub-agents/multi-stop-planner')} style={[styles.agentCard, { backgroundColor: theme.colors.background || '#F2F2F7' }]}>
          <View style={[styles.agentIcon, { backgroundColor: '#0EA5E920' }]}><Truck size={28} color="#0EA5E9" /></View>
          <View style={styles.agentInfo}>
            <Text style={[styles.agentName, { color: theme.colors.text }]}>Multi Stop Planner</Text>
            <Text style={[styles.agentDesc, { color: theme.colors.textSecondary }]}>Sub-Agent</Text>
          </View>
          <ArrowRight size={20} color={theme.colors.textSecondary} />
        </TouchableOpacity>
        <TouchableOpacity key="network-optimizer" onPress={() => router.push('/ai-agent/transportation/sub-agents/network-optimizer')} style={[styles.agentCard, { backgroundColor: theme.colors.background || '#F2F2F7' }]}>
          <View style={[styles.agentIcon, { backgroundColor: '#0EA5E920' }]}><Truck size={28} color="#0EA5E9" /></View>
          <View style={styles.agentInfo}>
            <Text style={[styles.agentName, { color: theme.colors.text }]}>Network Optimizer</Text>
            <Text style={[styles.agentDesc, { color: theme.colors.textSecondary }]}>Sub-Agent</Text>
          </View>
          <ArrowRight size={20} color={theme.colors.textSecondary} />
        </TouchableOpacity>
        <TouchableOpacity key="pick-pack-coordinator" onPress={() => router.push('/ai-agent/transportation/sub-agents/pick-pack-coordinator')} style={[styles.agentCard, { backgroundColor: theme.colors.background || '#F2F2F7' }]}>
          <View style={[styles.agentIcon, { backgroundColor: '#0EA5E920' }]}><Truck size={28} color="#0EA5E9" /></View>
          <View style={styles.agentInfo}>
            <Text style={[styles.agentName, { color: theme.colors.text }]}>Pick Pack Coordinator</Text>
            <Text style={[styles.agentDesc, { color: theme.colors.textSecondary }]}>Sub-Agent</Text>
          </View>
          <ArrowRight size={20} color={theme.colors.textSecondary} />
        </TouchableOpacity>
        <TouchableOpacity key="pick-path-planner" onPress={() => router.push('/ai-agent/transportation/sub-agents/pick-path-planner')} style={[styles.agentCard, { backgroundColor: theme.colors.background || '#F2F2F7' }]}>
          <View style={[styles.agentIcon, { backgroundColor: '#0EA5E920' }]}><Truck size={28} color="#0EA5E9" /></View>
          <View style={styles.agentInfo}>
            <Text style={[styles.agentName, { color: theme.colors.text }]}>Pick Path Planner</Text>
            <Text style={[styles.agentDesc, { color: theme.colors.textSecondary }]}>Sub-Agent</Text>
          </View>
          <ArrowRight size={20} color={theme.colors.textSecondary} />
        </TouchableOpacity>
        <TouchableOpacity key="proof-of-delivery-manager" onPress={() => router.push('/ai-agent/transportation/sub-agents/proof-of-delivery-manager')} style={[styles.agentCard, { backgroundColor: theme.colors.background || '#F2F2F7' }]}>
          <View style={[styles.agentIcon, { backgroundColor: '#0EA5E920' }]}><Truck size={28} color="#0EA5E9" /></View>
          <View style={styles.agentInfo}>
            <Text style={[styles.agentName, { color: theme.colors.text }]}>Proof Of Delivery Manager</Text>
            <Text style={[styles.agentDesc, { color: theme.colors.textSecondary }]}>Sub-Agent</Text>
          </View>
          <ArrowRight size={20} color={theme.colors.textSecondary} />
        </TouchableOpacity>
        <TouchableOpacity key="rate-negotiator" onPress={() => router.push('/ai-agent/transportation/sub-agents/rate-negotiator')} style={[styles.agentCard, { backgroundColor: theme.colors.background || '#F2F2F7' }]}>
          <View style={[styles.agentIcon, { backgroundColor: '#0EA5E920' }]}><Truck size={28} color="#0EA5E9" /></View>
          <View style={styles.agentInfo}>
            <Text style={[styles.agentName, { color: theme.colors.text }]}>Rate Negotiator</Text>
            <Text style={[styles.agentDesc, { color: theme.colors.textSecondary }]}>Sub-Agent</Text>
          </View>
          <ArrowRight size={20} color={theme.colors.textSecondary} />
        </TouchableOpacity>
        <TouchableOpacity key="real-time-rerouter" onPress={() => router.push('/ai-agent/transportation/sub-agents/real-time-rerouter')} style={[styles.agentCard, { backgroundColor: theme.colors.background || '#F2F2F7' }]}>
          <View style={[styles.agentIcon, { backgroundColor: '#0EA5E920' }]}><Truck size={28} color="#0EA5E9" /></View>
          <View style={styles.agentInfo}>
            <Text style={[styles.agentName, { color: theme.colors.text }]}>Real Time Rerouter</Text>
            <Text style={[styles.agentDesc, { color: theme.colors.textSecondary }]}>Sub-Agent</Text>
          </View>
          <ArrowRight size={20} color={theme.colors.textSecondary} />
        </TouchableOpacity>
        <TouchableOpacity key="return-processor" onPress={() => router.push('/ai-agent/transportation/sub-agents/return-processor')} style={[styles.agentCard, { backgroundColor: theme.colors.background || '#F2F2F7' }]}>
          <View style={[styles.agentIcon, { backgroundColor: '#0EA5E920' }]}><Truck size={28} color="#0EA5E9" /></View>
          <View style={styles.agentInfo}>
            <Text style={[styles.agentName, { color: theme.colors.text }]}>Return Processor</Text>
            <Text style={[styles.agentDesc, { color: theme.colors.textSecondary }]}>Sub-Agent</Text>
          </View>
          <ArrowRight size={20} color={theme.colors.textSecondary} />
        </TouchableOpacity>
        <TouchableOpacity key="route-network-designer" onPress={() => router.push('/ai-agent/transportation/sub-agents/route-network-designer')} style={[styles.agentCard, { backgroundColor: theme.colors.background || '#F2F2F7' }]}>
          <View style={[styles.agentIcon, { backgroundColor: '#0EA5E920' }]}><Truck size={28} color="#0EA5E9" /></View>
          <View style={styles.agentInfo}>
            <Text style={[styles.agentName, { color: theme.colors.text }]}>Route Network Designer</Text>
            <Text style={[styles.agentDesc, { color: theme.colors.textSecondary }]}>Sub-Agent</Text>
          </View>
          <ArrowRight size={20} color={theme.colors.textSecondary} />
        </TouchableOpacity>
        <TouchableOpacity key="shipment-monitor" onPress={() => router.push('/ai-agent/transportation/sub-agents/shipment-monitor')} style={[styles.agentCard, { backgroundColor: theme.colors.background || '#F2F2F7' }]}>
          <View style={[styles.agentIcon, { backgroundColor: '#0EA5E920' }]}><Truck size={28} color="#0EA5E9" /></View>
          <View style={styles.agentInfo}>
            <Text style={[styles.agentName, { color: theme.colors.text }]}>Shipment Monitor</Text>
            <Text style={[styles.agentDesc, { color: theme.colors.textSecondary }]}>Sub-Agent</Text>
          </View>
          <ArrowRight size={20} color={theme.colors.textSecondary} />
        </TouchableOpacity>
        <TouchableOpacity key="sla-enforcer" onPress={() => router.push('/ai-agent/transportation/sub-agents/sla-enforcer')} style={[styles.agentCard, { backgroundColor: theme.colors.background || '#F2F2F7' }]}>
          <View style={[styles.agentIcon, { backgroundColor: '#0EA5E920' }]}><Truck size={28} color="#0EA5E9" /></View>
          <View style={styles.agentInfo}>
            <Text style={[styles.agentName, { color: theme.colors.text }]}>Sla Enforcer</Text>
            <Text style={[styles.agentDesc, { color: theme.colors.textSecondary }]}>Sub-Agent</Text>
          </View>
          <ArrowRight size={20} color={theme.colors.textSecondary} />
        </TouchableOpacity>
        <TouchableOpacity key="slot-optimizer" onPress={() => router.push('/ai-agent/transportation/sub-agents/slot-optimizer')} style={[styles.agentCard, { backgroundColor: theme.colors.background || '#F2F2F7' }]}>
          <View style={[styles.agentIcon, { backgroundColor: '#0EA5E920' }]}><Truck size={28} color="#0EA5E9" /></View>
          <View style={styles.agentInfo}>
            <Text style={[styles.agentName, { color: theme.colors.text }]}>Slot Optimizer</Text>
            <Text style={[styles.agentDesc, { color: theme.colors.textSecondary }]}>Sub-Agent</Text>
          </View>
          <ArrowRight size={20} color={theme.colors.textSecondary} />
        </TouchableOpacity>
        <TouchableOpacity key="throughput-monitor" onPress={() => router.push('/ai-agent/transportation/sub-agents/throughput-monitor')} style={[styles.agentCard, { backgroundColor: theme.colors.background || '#F2F2F7' }]}>
          <View style={[styles.agentIcon, { backgroundColor: '#0EA5E920' }]}><Truck size={28} color="#0EA5E9" /></View>
          <View style={styles.agentInfo}>
            <Text style={[styles.agentName, { color: theme.colors.text }]}>Throughput Monitor</Text>
            <Text style={[styles.agentDesc, { color: theme.colors.textSecondary }]}>Sub-Agent</Text>
          </View>
          <ArrowRight size={20} color={theme.colors.textSecondary} />
        </TouchableOpacity>
        <TouchableOpacity key="traffic-predictor" onPress={() => router.push('/ai-agent/transportation/sub-agents/traffic-predictor')} style={[styles.agentCard, { backgroundColor: theme.colors.background || '#F2F2F7' }]}>
          <View style={[styles.agentIcon, { backgroundColor: '#0EA5E920' }]}><Truck size={28} color="#0EA5E9" /></View>
          <View style={styles.agentInfo}>
            <Text style={[styles.agentName, { color: theme.colors.text }]}>Traffic Predictor</Text>
            <Text style={[styles.agentDesc, { color: theme.colors.textSecondary }]}>Sub-Agent</Text>
          </View>
          <ArrowRight size={20} color={theme.colors.textSecondary} />
        </TouchableOpacity>
        <TouchableOpacity key="vehicle-scheduler" onPress={() => router.push('/ai-agent/transportation/sub-agents/vehicle-scheduler')} style={[styles.agentCard, { backgroundColor: theme.colors.background || '#F2F2F7' }]}>
          <View style={[styles.agentIcon, { backgroundColor: '#0EA5E920' }]}><Truck size={28} color="#0EA5E9" /></View>
          <View style={styles.agentInfo}>
            <Text style={[styles.agentName, { color: theme.colors.text }]}>Vehicle Scheduler</Text>
            <Text style={[styles.agentDesc, { color: theme.colors.textSecondary }]}>Sub-Agent</Text>
          </View>
          <ArrowRight size={20} color={theme.colors.textSecondary} />
        </TouchableOpacity>
        <TouchableOpacity key="vehicle-tracker" onPress={() => router.push('/ai-agent/transportation/sub-agents/vehicle-tracker')} style={[styles.agentCard, { backgroundColor: theme.colors.background || '#F2F2F7' }]}>
          <View style={[styles.agentIcon, { backgroundColor: '#0EA5E920' }]}><Truck size={28} color="#0EA5E9" /></View>
          <View style={styles.agentInfo}>
            <Text style={[styles.agentName, { color: theme.colors.text }]}>Vehicle Tracker</Text>
            <Text style={[styles.agentDesc, { color: theme.colors.textSecondary }]}>Sub-Agent</Text>
          </View>
          <ArrowRight size={20} color={theme.colors.textSecondary} />
        </TouchableOpacity>
        <TouchableOpacity key="zone-planner" onPress={() => router.push('/ai-agent/transportation/sub-agents/zone-planner')} style={[styles.agentCard, { backgroundColor: theme.colors.background || '#F2F2F7' }]}>
          <View style={[styles.agentIcon, { backgroundColor: '#0EA5E920' }]}><Truck size={28} color="#0EA5E9" /></View>
          <View style={styles.agentInfo}>
            <Text style={[styles.agentName, { color: theme.colors.text }]}>Zone Planner</Text>
            <Text style={[styles.agentDesc, { color: theme.colors.textSecondary }]}>Sub-Agent</Text>
          </View>
          <ArrowRight size={20} color={theme.colors.textSecondary} />
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  hero: { alignItems: 'center', paddingVertical: 32, paddingHorizontal: 20, borderBottomWidth: 1 },
  heroIconWrap: { width: 88, height: 88, borderRadius: 44, justifyContent: 'center', alignItems: 'center', marginBottom: 16 },
  heroTitle: { fontSize: 26, fontWeight: 'bold' },
  heroSubtitle: { fontSize: 15, marginTop: 4, fontWeight: '500' },
  badgesRow: { flexDirection: 'row', gap: 10, marginTop: 16 },
  badge: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 10, paddingVertical: 5, borderRadius: 20, gap: 4 },
  badgeText: { fontSize: 12, fontWeight: '600' },
  section: { marginHorizontal: 16, marginBottom: 16, padding: 20, borderRadius: 16 },
  sectionTitle: { fontSize: 18, fontWeight: '700', marginBottom: 14 },
  agentCard: { flexDirection: 'row', alignItems: 'center', padding: 16, borderRadius: 12, marginBottom: 12 },
  agentIcon: { width: 48, height: 48, borderRadius: 12, alignItems: 'center', justifyContent: 'center' },
  agentInfo: { flex: 1, marginLeft: 12 },
  agentName: { fontSize: 16, fontWeight: '600' },
  agentDesc: { fontSize: 12, marginTop: 2 },
});
