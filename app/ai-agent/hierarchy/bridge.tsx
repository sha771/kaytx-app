import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { useTheme } from '@/providers/ThemeProvider';
import { Network, ArrowUpDown, Zap, Shield, Clock, Activity, Layers, Settings, Database } from 'lucide-react-native';

export default function BridgePage() {
  const { theme } = useTheme();

  const BRIDGE_CONFIG = {
    id: 'layer-bridge',
    name: 'Layer Bridge',
    icon: Network,
    color: '#3B82F6',
    description: 'Digital Interface for seamless communication between hierarchy layers',
    function: 'Enables intelligent routing and communication across all 7 tiers',
    version: '2.1.0',
    status: 'Active'
  };

  const BRIDGE_CAPABILITIES = [
    {
      capability: 'Intelligent Routing',
      description: 'Routes requests to the most appropriate layer based on complexity and context',
      icon: ArrowUpDown,
      color: '#3B82F6',
      metrics: {
        routingAccuracy: '98.5%',
        avgRoutingTime: '45ms',
        requestsRouted: '2.4M'
      }
    },
    {
      capability: 'Protocol Translation',
      description: 'Translates communication protocols between different hierarchy layers',
      icon: Zap,
      color: '#F59E0B',
      metrics: {
        translationAccuracy: '99.2%',
        protocolsSupported: '15',
        translationsDaily: '1.8M'
      }
    },
    {
      capability: 'Security Enforcement',
      description: 'Enforces security policies and access controls across layer boundaries',
      icon: Shield,
      color: '#EF4444',
      metrics: {
        threatsBlocked: '8,547',
        policyEnforcements: '456K',
        complianceRate: '99.9%'
      }
    },
    {
      capability: 'Performance Monitoring',
      description: 'Monitors and optimizes communication performance between layers',
      icon: Activity,
      color: '#10B981',
      metrics: {
        latencyReduced: '62%',
        throughputImproved: '45%',
        uptime: '99.95%'
      }
    }
  ];

  const LAYER_CONNECTIONS = [
    {
      from: 'Governance & Ethics',
      to: 'C-Suite Executives',
      protocol: 'Policy Broadcast',
      status: 'Active',
      traffic: '245K msg/day'
    },
    {
      from: 'C-Suite Executives',
      to: 'Intelligence Layer',
      protocol: 'Strategic Query',
      status: 'Active',
      traffic: '1.2M msg/day'
    },
    {
      from: 'Intelligence Layer',
      to: 'Command Center',
      protocol: 'Insight Stream',
      status: 'Active',
      traffic: '3.4M msg/day'
    },
    {
      from: 'Command Center',
      to: 'Departments',
      protocol: 'Command Dispatch',
      status: 'Active',
      traffic: '8.9M msg/day'
    },
    {
      from: 'Departments',
      to: 'AI Workforce',
      protocol: 'Task Assignment',
      status: 'Active',
      traffic: '45M msg/day'
    }
  ];

  const BRIDGE_STATS = [
    { label: 'Messages Routed', value: '58.7M', icon: Network, color: '#3B82F6' },
    { label: 'Avg Latency', value: '45ms', icon: Clock, color: '#F59E0B' },
    { label: 'Routing Accuracy', value: '98.5%', icon: Activity, color: '#10B981' },
    { label: 'Protocols', value: '15', icon: Layers, color: '#8B5CF6' }
  ];

  return (
    <ScrollView style={[styles.container, { backgroundColor: theme.colors.background }]}>
      {/* Hero Section */}
      <View style={[styles.hero, { borderBottomColor: theme.colors.border || '#E5E5EA' }]}>
        <View style={[styles.heroIconWrap, { backgroundColor: '#3B82F620' }]}>
          <Network size={56} color="#3B82F6" />
        </View>
        <Text style={[styles.heroTitle, { color: theme.colors.text }]}>Layer Bridge</Text>
        <Text style={[styles.heroSubtitle, { color: theme.colors.textSecondary }]}>
          Tier 3 - Digital Interface for Hierarchy Communication
        </Text>
        <View style={styles.badgesRow}>
          <View style={[styles.badge, { backgroundColor: '#3B82F622' }]}>
            <Network size={12} color="#3B82F6" />
            <Text style={[styles.badgeText, { color: '#3B82F6' }]}>Bridge Interface</Text>
          </View>
          <View style={[styles.badge, { backgroundColor: '#10B98122' }]}>
            <Activity size={12} color="#10B981" />
            <Text style={[styles.badgeText, { color: '#10B981' }]}>Active</Text>
          </View>
          <View style={[styles.badge, { backgroundColor: '#8B5CF622' }]}>
            <Zap size={12} color="#8B5CF6" />
            <Text style={[styles.badgeText, { color: '#8B5CF6' }]}>v2.1.0</Text>
          </View>
        </View>
      </View>

      {/* Bridge Stats */}
      <View style={styles.statsContainer}>
        {BRIDGE_STATS.map((stat, i) => (
          <View key={i} style={[styles.statCard, { backgroundColor: theme.colors.card || '#F2F2F7' }]}>
            <stat.icon size={24} color={stat.color} />
            <Text style={[styles.statValue, { color: theme.colors.text }]}>{stat.value}</Text>
            <Text style={[styles.statLabel, { color: theme.colors.textSecondary }]}>{stat.label}</Text>
          </View>
        ))}
      </View>

      {/* Overview */}
      <View style={[styles.section, { backgroundColor: theme.colors.card || '#F2F2F7' }]}>
        <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Overview</Text>
        <Text style={[styles.description, { color: theme.colors.textSecondary }]}>
          The Layer Bridge serves as the critical communication interface between all hierarchy tiers. 
          It enables intelligent routing, protocol translation, and security enforcement across the 
          7-tier structure, ensuring seamless communication from Governance down to the AI Workforce.
        </Text>
        <View style={[styles.infoBox, { backgroundColor: '#3B82F610', borderColor: '#3B82F630' }]}>
          <Settings size={20} color="#3B82F6" />
          <Text style={[styles.infoText, { color: theme.colors.text }]}>
            Currently bridging 5 active layer connections with 58.7M+ messages routed daily
          </Text>
        </View>
      </View>

      {/* Bridge Capabilities */}
      <View style={[styles.section, { backgroundColor: theme.colors.card || '#F2F2F7' }]}>
        <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Bridge Capabilities</Text>
        {BRIDGE_CAPABILITIES.map((cap) => (
          <View key={cap.capability} style={[styles.capabilityCard, { backgroundColor: theme.colors.background || '#F2F2F7' }]}>
            <View style={[styles.capabilityHeader, { borderBottomColor: theme.colors.border || '#E5E5EA' }]}>
              <View style={[styles.capabilityIcon, { backgroundColor: cap.color + '20' }]}>
                <cap.icon size={28} color={cap.color} />
              </View>
              <View style={styles.capabilityTitle}>
                <Text style={[styles.capabilityName, { color: theme.colors.text }]}>{cap.capability}</Text>
                <Text style={[styles.capabilityDesc, { color: theme.colors.textSecondary }]}>{cap.description}</Text>
              </View>
            </View>
            <View style={styles.metricsRow}>
              {Object.entries(cap.metrics).map(([key, value]) => (
                <View key={key} style={styles.metricRow}>
                  <Text style={[styles.metricLabelSmall, { color: theme.colors.textSecondary }]}>
                    {key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
                  </Text>
                  <Text style={[styles.metricValueSmall, { color: cap.color }]}>{value}</Text>
                </View>
              ))}
            </View>
          </View>
        ))}
      </View>

      {/* Layer Connections */}
      <View style={[styles.section, { backgroundColor: theme.colors.card || '#F2F2F7' }]}>
        <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Layer Connections</Text>
        <Text style={[styles.description, { color: theme.colors.textSecondary }]}>
          Active communication channels between hierarchy tiers
        </Text>
        {LAYER_CONNECTIONS.map((conn, i) => (
          <View key={i} style={[styles.connectionCard, { backgroundColor: theme.colors.background || '#F2F2F7' }]}>
            <View style={styles.connectionFrom}>
              <Text style={[styles.connectionText, { color: theme.colors.text }]}>{conn.from}</Text>
            </View>
            <View style={styles.connectionArrow}>
              <ArrowUpDown size={20} color="#3B82F6" />
            </View>
            <View style={styles.connectionTo}>
              <Text style={[styles.connectionText, { color: theme.colors.text }]}>{conn.to}</Text>
            </View>
            <View style={styles.connectionDetails}>
              <View style={[styles.protocolBadge, { backgroundColor: '#3B82F615' }]}>
                <Text style={[styles.protocolText, { color: '#3B82F6' }]}>{conn.protocol}</Text>
              </View>
              <Text style={[styles.trafficText, { color: theme.colors.textSecondary }]}>{conn.traffic}</Text>
            </View>
          </View>
        ))}
      </View>

      {/* Technical Specifications */}
      <View style={[styles.section, { backgroundColor: theme.colors.card || '#F2F2F7' }]}>
        <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Technical Specifications</Text>
        <View style={styles.specGrid}>
          <View style={styles.specItem}>
            <Database size={20} color="#3B82F6" />
            <Text style={[styles.specLabel, { color: theme.colors.textSecondary }]}>Message Queue</Text>
            <Text style={[styles.specValue, { color: theme.colors.text }]}>Redis Cluster</Text>
          </View>
          <View style={styles.specItem}>
            <Zap size={20} color="#F59E0B" />
            <Text style={[styles.specLabel, { color: theme.colors.textSecondary }]}>Latency</Text>
            <Text style={[styles.specValue, { color: theme.colors.text }]}>&lt;50ms p99</Text>
          </View>
          <View style={styles.specItem}>
            <Shield size={20} color="#EF4444" />
            <Text style={[styles.specLabel, { color: theme.colors.textSecondary }]}>Encryption</Text>
            <Text style={[styles.specValue, { color: theme.colors.text }]}>AES-256</Text>
          </View>
          <View style={styles.specItem}>
            <Activity size={20} color="#10B981" />
            <Text style={[styles.specLabel, { color: theme.colors.textSecondary }]}>Throughput</Text>
            <Text style={[styles.specValue, { color: theme.colors.text }]}>100K msg/sec</Text>
          </View>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  hero: {
    padding: 24,
    borderBottomWidth: 1,
  },
  heroIconWrap: {
    width: 80,
    height: 80,
    borderRadius: 40,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  heroTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  heroSubtitle: {
    fontSize: 16,
    marginBottom: 16,
  },
  badgesRow: {
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
  statsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    padding: 16,
    gap: 12,
  },
  statCard: {
    flex: 1,
    minWidth: 140,
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    gap: 8,
  },
  statValue: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  statLabel: {
    fontSize: 12,
    textAlign: 'center',
  },
  section: {
    padding: 20,
    marginTop: 8,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  description: {
    fontSize: 14,
    lineHeight: 20,
    marginBottom: 12,
  },
  infoBox: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    borderRadius: 8,
    borderWidth: 1,
    gap: 12,
  },
  infoText: {
    fontSize: 14,
    flex: 1,
  },
  capabilityCard: {
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
  },
  capabilityHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingBottom: 12,
    borderBottomWidth: 1,
    marginBottom: 12,
    gap: 12,
  },
  capabilityIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  capabilityTitle: {
    flex: 1,
  },
  capabilityName: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  capabilityDesc: {
    fontSize: 14,
  },
  metricsRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  metricRow: {
    alignItems: 'center',
  },
  metricLabelSmall: {
    fontSize: 11,
    marginBottom: 4,
  },
  metricValueSmall: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  connectionCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    gap: 12,
  },
  connectionFrom: {
    flex: 1,
  },
  connectionTo: {
    flex: 1,
  },
  connectionText: {
    fontSize: 13,
    fontWeight: '500',
    textAlign: 'center',
  },
  connectionArrow: {
    justifyContent: 'center',
  },
  connectionDetails: {
    alignItems: 'flex-end',
    gap: 4,
  },
  protocolBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  protocolText: {
    fontSize: 11,
    fontWeight: '600',
  },
  trafficText: {
    fontSize: 11,
  },
  specGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 16,
  },
  specItem: {
    flex: 1,
    minWidth: 140,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    padding: 16,
    borderRadius: 12,
    backgroundColor: '#F2F2F7',
  },
  specLabel: {
    fontSize: 12,
  },
  specValue: {
    fontSize: 14,
    fontWeight: '600',
  },
});