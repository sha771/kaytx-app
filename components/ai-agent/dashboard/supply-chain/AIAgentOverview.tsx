import React from 'react';
import { View, StyleSheet, Text, ScrollView } from 'react-native';
import { useTheme } from '@/providers/ThemeProvider';
import { Bot, Activity, Network, Zap, Shield, CheckCircle } from 'lucide-react-native';

export default function AIAgentOverview() {
  const { theme } = useTheme();

  const aiAgents = [
    {
      name: 'Agent Atlas',
      role: 'Demand Forecasting Agent',
      avatar: '🧠',
      status: 'active' as const,
      confidence: 96,
      economicImpact: '$142M',
      networkCoverage: '12.8M SKUs',
      operationalEfficiency: 94,
      metrics: {
        skusManaged: '12.8M',
        forecastAccuracy: '96%',
        stockoutReduction: '34%'
      }
    },
    {
      name: 'Agent Nexus',
      role: 'Procurement Optimization Agent',
      avatar: '🔗',
      status: 'active' as const,
      confidence: 94,
      economicImpact: '$184M',
      networkCoverage: '48,200 Suppliers',
      operationalEfficiency: 92,
      metrics: {
        suppliersManaged: '48,200',
        costSavings: '$184M',
        contractEfficiency: '+22%'
      }
    },
    {
      name: 'Agent Sentinel',
      role: 'Supply Chain Risk Agent',
      avatar: '🛡️',
      status: 'active' as const,
      confidence: 95,
      economicImpact: '$68M',
      networkCoverage: 'Global Network',
      operationalEfficiency: 97,
      metrics: {
        risksDetected: '8,420',
        disruptionsPrevented: '1,842',
        predictionAccuracy: '95%'
      }
    },
    {
      name: 'Agent Optimus',
      role: 'Inventory Optimization Agent',
      avatar: '📦',
      status: 'active' as const,
      confidence: 93,
      economicImpact: '$86M',
      networkCoverage: '248 Warehouses',
      operationalEfficiency: 91,
      metrics: {
        warehousesOptimized: '248',
        inventoryReduction: '18%',
        carryingCostSaved: '$42M'
      }
    },
    {
      name: 'Agent Vector',
      role: 'Logistics Orchestration Agent',
      avatar: '🚚',
      status: 'active' as const,
      confidence: 92,
      economicImpact: '$94M',
      networkCoverage: '1,842 Shipments',
      operationalEfficiency: 89,
      metrics: {
        routesOptimized: '1,842',
        deliveryTimeReduced: '12%',
        transportCostSaved: '$38M'
      }
    },
    {
      name: 'Agent Prime',
      role: 'Manufacturing Sync Agent',
      avatar: '⚙️',
      status: 'active' as const,
      confidence: 91,
      economicImpact: '$76M',
      networkCoverage: '42 Production Lines',
      operationalEfficiency: 88,
      metrics: {
        productionLinesSynced: '42',
        delayReduction: '67%',
        materialEfficiency: '+14%'
      }
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return '#10B981';
      case 'inactive': return '#6B7280';
      case 'warning': return '#F59E0B';
      case 'error': return '#EF4444';
      default: return '#6B7280';
    }
  };

  const getConfidenceColor = (confidence: number) => {
    if (confidence >= 95) return '#10B981';
    if (confidence >= 90) return '#3B82F6';
    if (confidence >= 85) return '#F59E0B';
    return '#EF4444';
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.card }]}>
      <View style={styles.header}>
        <Bot size={20} color="#3B82F6" />
        <Text style={[styles.title, { color: theme.colors.text }]}>
          AI Supply Chain Agents
        </Text>
      </View>

      <ScrollView 
        horizontal 
        showsHorizontalScrollIndicator={false} 
        style={styles.agentsScroll}
        contentContainerStyle={styles.agentsContent}
      >
        {aiAgents.map((agent, index) => (
          <View 
            key={index}
            style={[
              styles.agentCard, 
              { 
                backgroundColor: 'rgba(59, 130, 246, 0.05)',
                borderColor: 'rgba(59, 130, 246, 0.2)',
                borderWidth: 1
              }
            ]}
          >
            {/* Agent Header */}
            <View style={styles.agentHeader}>
              <View style={styles.agentAvatar}>
                <Text style={styles.avatarText}>{agent.avatar}</Text>
              </View>
              <View style={styles.agentInfo}>
                <Text style={[styles.agentName, { color: theme.colors.text }]}>
                  {agent.name}
                </Text>
                <Text style={[styles.agentRole, { color: theme.colors.textSecondary }]}>
                  {agent.role}
                </Text>
              </View>
              <View style={[
                styles.statusBadge, 
                { backgroundColor: getStatusColor(agent.status) + '20' }
              ]}>
                <View style={[
                  styles.statusDot, 
                  { backgroundColor: getStatusColor(agent.status) }
                ]} />
              </View>
            </View>

            {/* Agent Metrics */}
            <View style={styles.agentMetrics}>
              <View style={styles.metricRow}>
                <Activity size={12} color="#8B5CF6" />
                <Text style={[styles.metricLabel, { color: theme.colors.textSecondary }]}>
                  Confidence
                </Text>
                <Text style={[
                  styles.metricValue, 
                  { color: getConfidenceColor(agent.confidence) }
                ]}>
                  {agent.confidence}%
                </Text>
              </View>

              <View style={styles.metricRow}>
                <Zap size={12} color="#F59E0B" />
                <Text style={[styles.metricLabel, { color: theme.colors.textSecondary }]}>
                  Impact
                </Text>
                <Text style={[styles.metricValue, { color: '#10B981' }]}>
                  {agent.economicImpact}
                </Text>
              </View>

              <View style={styles.metricRow}>
                <Network size={12} color="#06B6D4" />
                <Text style={[styles.metricLabel, { color: theme.colors.textSecondary }]}>
                  Coverage
                </Text>
                <Text style={[styles.metricValue, { color: '#3B82F6' }]}>
                  {agent.networkCoverage}
                </Text>
              </View>

              <View style={styles.metricRow}>
                <Shield size={12} color="#8B5CF6" />
                <Text style={[styles.metricLabel, { color: theme.colors.textSecondary }]}>
                  Efficiency
                </Text>
                <Text style={[styles.metricValue, { color: '#10B981' }]}>
                  {agent.operationalEfficiency}%
                </Text>
              </View>
            </View>

            {/* Agent Specific Metrics */}
            <View style={styles.specificMetrics}>
              {Object.entries(agent.metrics).map(([key, value], idx) => (
                <View key={idx} style={styles.specificMetric}>
                  <Text style={[styles.specificLabel, { color: theme.colors.textSecondary }]}>
                    {key.replace(/([A-Z])/g, ' $1').trim()}
                  </Text>
                  <Text style={[styles.specificValue, { color: theme.colors.text }]}>
                    {value}
                  </Text>
                </View>
              ))}
            </View>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 16,
    padding: 16,
    marginVertical: 8,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 16,
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
  },
  agentsScroll: {
    marginBottom: 8,
  },
  agentsContent: {
    paddingRight: 16,
  },
  agentCard: {
    borderRadius: 12,
    padding: 16,
    marginRight: 12,
    minWidth: 240,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  agentHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  agentAvatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: 'rgba(59, 130, 246, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  avatarText: {
    fontSize: 24,
  },
  agentInfo: {
    flex: 1,
  },
  agentName: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 2,
  },
  agentRole: {
    fontSize: 11,
    fontWeight: '500',
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  statusDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  agentMetrics: {
    marginBottom: 12,
  },
  metricRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 8,
  },
  metricLabel: {
    fontSize: 11,
    fontWeight: '500',
    flex: 1,
  },
  metricValue: {
    fontSize: 12,
    fontWeight: '600',
  },
  specificMetrics: {
    borderTopWidth: 1,
    borderTopColor: 'rgba(59, 130, 246, 0.1)',
    paddingTop: 12,
  },
  specificMetric: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 6,
  },
  specificLabel: {
    fontSize: 10,
    fontWeight: '500',
    textTransform: 'capitalize',
  },
  specificValue: {
    fontSize: 11,
    fontWeight: '600',
  },
});