import React from 'react';
import { View, StyleSheet, Text, ScrollView } from 'react-native';
import { useTheme } from '@/providers/ThemeProvider';

interface Client {
  id: number;
  name: string;
  healthScore: number;
  satisfaction: number;
  expansion: number;
  churnRisk: number;
  contractValue: string;
}

interface Segmentation {
  enterprise: number;
  midMarket: number;
  smb: number;
}

interface ClientIntelligenceHubProps {
  clients: Client[];
  segmentation: Segmentation;
}

export default function ClientIntelligenceHub({ clients, segmentation }: ClientIntelligenceHubProps) {
  const { theme } = useTheme();

  const getHealthColor = (score: number) => {
    if (score >= 85) return '#10B981';
    if (score >= 70) return '#06B6D4';
    if (score >= 50) return '#F59E0B';
    return '#EF4444';
  };

  const getRiskColor = (risk: number) => {
    if (risk <= 10) return '#10B981';
    if (risk <= 25) return '#F59E0B';
    return '#EF4444';
  };

  return (
    <View style={[styles.container, { backgroundColor: 'rgba(11, 15, 20, 0.8)', borderColor: 'rgba(16, 185, 129, 0.2)', borderWidth: 1 }]}>
      <Text style={[styles.title, { color: '#10B981' }]}>
        Client Intelligence Hub
      </Text>

      {/* Client Overview */}
      <View style={[styles.overviewSection, { backgroundColor: 'rgba(11, 15, 20, 0.6)', borderColor: 'rgba(16, 185, 129, 0.2)', borderWidth: 1 }]}>
        <Text style={[styles.sectionTitle, { color: '#FFFFFF' }]}>
          Client Portfolio Overview
        </Text>
        <View style={styles.overviewGrid}>
          <View style={styles.overviewItem}>
            <Text style={[styles.overviewLabel, { color: 'rgba(255, 255, 255, 0.6)' }]}>Total Clients</Text>
            <Text style={[styles.overviewValue, { color: '#FFFFFF' }]}>248</Text>
          </View>
          <View style={styles.overviewItem}>
            <Text style={[styles.overviewLabel, { color: 'rgba(255, 255, 255, 0.6)' }]}>Avg Health Score</Text>
            <Text style={[styles.overviewValue, { color: '#10B981' }]}>86%</Text>
          </View>
          <View style={styles.overviewItem}>
            <Text style={[styles.overviewLabel, { color: 'rgba(255, 255, 255, 0.6)' }]}>Avg Satisfaction</Text>
            <Text style={[styles.overviewValue, { color: '#06B6D4' }]}>89%</Text>
          </View>
          <View style={styles.overviewItem}>
            <Text style={[styles.overviewLabel, { color: 'rgba(255, 255, 255, 0.6)' }]}>Total Contract Value</Text>
            <Text style={[styles.overviewValue, { color: '#8B5CF6' }]}>$5.4B</Text>
          </View>
        </View>
      </View>

      {/* Client Segmentation */}
      <View style={[styles.segmentationSection, { backgroundColor: 'rgba(11, 15, 20, 0.6)', borderColor: 'rgba(16, 185, 129, 0.2)', borderWidth: 1 }]}>
        <Text style={[styles.sectionTitle, { color: '#FFFFFF' }]}>
          Client Segmentation
        </Text>
        <View style={styles.segmentationChart}>
          <View style={styles.segmentationBar}>
            <View style={[styles.segment, { backgroundColor: '#8B5CF6', width: `${segmentation.enterprise}%` }]} />
            <View style={[styles.segment, { backgroundColor: '#06B6D4', width: `${segmentation.midMarket}%` }]} />
            <View style={[styles.segment, { backgroundColor: '#10B981', width: `${segmentation.smb}%` }]} />
          </View>
          <View style={styles.segmentationLegend}>
            <View style={styles.legendItem}>
              <View style={[styles.legendDot, { backgroundColor: '#8B5CF6' }]} />
              <Text style={[styles.legendText, { color: 'rgba(255, 255, 255, 0.8)' }]}>Enterprise {segmentation.enterprise}%</Text>
            </View>
            <View style={styles.legendItem}>
              <View style={[styles.legendDot, { backgroundColor: '#06B6D4' }]} />
              <Text style={[styles.legendText, { color: 'rgba(255, 255, 255, 0.8)' }]}>Mid-Market {segmentation.midMarket}%</Text>
            </View>
            <View style={styles.legendItem}>
              <View style={[styles.legendDot, { backgroundColor: '#10B981' }]} />
              <Text style={[styles.legendText, { color: 'rgba(255, 255, 255, 0.8)' }]}>SMB {segmentation.smb}%</Text>
            </View>
          </View>
        </View>
      </View>

      {/* Client Health Scores */}
      <View style={[styles.healthSection, { backgroundColor: 'rgba(11, 15, 20, 0.6)', borderColor: 'rgba(16, 185, 129, 0.2)', borderWidth: 1 }]}>
        <Text style={[styles.sectionTitle, { color: '#FFFFFF' }]}>
          Client Health Scores
        </Text>
        <ScrollView style={styles.clientsScroll} showsVerticalScrollIndicator={false}>
          {clients.map((client) => (
            <View key={client.id} style={styles.clientCard}>
              <View style={styles.clientHeader}>
                <View style={styles.clientInfo}>
                  <Text style={[styles.clientName, { color: '#FFFFFF' }]}>{client.name}</Text>
                  <Text style={[styles.contractValue, { color: 'rgba(255, 255, 255, 0.6)' }]}>{client.contractValue}</Text>
                </View>
                <View style={[styles.healthBadge, { backgroundColor: `${getHealthColor(client.healthScore)}20` }]}>
                  <Text style={[styles.healthScore, { color: getHealthColor(client.healthScore) }]}>
                    {client.healthScore}
                  </Text>
                </View>
              </View>

              <View style={styles.clientMetrics}>
                <View style={styles.metric}>
                  <Text style={[styles.metricLabel, { color: 'rgba(255, 255, 255, 0.5)' }]}>Satisfaction</Text>
                  <View style={styles.metricBar}>
                    <View style={[styles.metricBarFill, { backgroundColor: '#10B981', width: `${client.satisfaction}%` }]} />
                  </View>
                  <Text style={[styles.metricValue, { color: '#10B981' }]}>{client.satisfaction}%</Text>
                </View>

                <View style={styles.metric}>
                  <Text style={[styles.metricLabel, { color: 'rgba(255, 255, 255, 0.5)' }]}>Expansion</Text>
                  <View style={styles.metricBar}>
                    <View style={[styles.metricBarFill, { backgroundColor: '#8B5CF6', width: `${client.expansion}%` }]} />
                  </View>
                  <Text style={[styles.metricValue, { color: '#8B5CF6' }]}>{client.expansion}%</Text>
                </View>

                <View style={styles.metric}>
                  <Text style={[styles.metricLabel, { color: 'rgba(255, 255, 255, 0.5)' }]}>Churn Risk</Text>
                  <View style={styles.metricBar}>
                    <View style={[styles.metricBarFill, { backgroundColor: getRiskColor(client.churnRisk), width: `${client.churnRisk}%` }]} />
                  </View>
                  <Text style={[styles.metricValue, { color: getRiskColor(client.churnRisk) }]}>{client.churnRisk}%</Text>
                </View>
              </View>
            </View>
          ))}
        </ScrollView>
      </View>

      {/* Expansion Opportunities */}
      <View style={[styles.expansionSection, { backgroundColor: 'rgba(11, 15, 20, 0.6)', borderColor: 'rgba(16, 185, 129, 0.2)', borderWidth: 1 }]}>
        <Text style={[styles.sectionTitle, { color: '#FFFFFF' }]}>
          Expansion Opportunities
        </Text>
        <View style={styles.expansionList}>
          <View style={styles.expansionItem}>
            <View style={styles.expansionLeft}>
              <Text style={[styles.expansionClient, { color: '#FFFFFF' }]}>Fortune 500 Tech</Text>
              <Text style={[styles.expansionService, { color: 'rgba(255, 255, 255, 0.6)' }]}>AI/ML Services</Text>
            </View>
            <View style={styles.expansionRight}>
              <Text style={[styles.expansionProbability, { color: '#10B981' }]}>78%</Text>
              <Text style={[styles.expansionValue, { color: '#8B5CF6' }]}>$1.2M</Text>
            </View>
          </View>
          <View style={styles.expansionItem}>
            <View style={styles.expansionLeft}>
              <Text style={[styles.expansionClient, { color: '#FFFFFF' }]}>Healthcare System</Text>
              <Text style={[styles.expansionService, { color: 'rgba(255, 255, 255, 0.6)' }]}>Cloud Migration</Text>
            </View>
            <View style={styles.expansionRight}>
              <Text style={[styles.expansionProbability, { color: '#06B6D4' }]}>72%</Text>
              <Text style={[styles.expansionValue, { color: '#8B5CF6' }]}>$800K</Text>
            </View>
          </View>
          <View style={styles.expansionItem}>
            <View style={styles.expansionLeft}>
              <Text style={[styles.expansionClient, { color: '#FFFFFF' }]}>Global Bank</Text>
              <Text style={[styles.expansionService, { color: 'rgba(255, 255, 255, 0.6)' }]}>Security Assessment</Text>
            </View>
            <View style={styles.expansionRight}>
              <Text style={[styles.expansionProbability, { color: '#F59E0B' }]}>65%</Text>
              <Text style={[styles.expansionValue, { color: '#8B5CF6' }]}>$600K</Text>
            </View>
          </View>
        </View>
      </View>

      {/* Churn Risk Analysis */}
      <View style={[styles.churnSection, { backgroundColor: 'rgba(11, 15, 20, 0.6)', borderColor: 'rgba(239, 68, 68, 0.2)', borderWidth: 1 }]}>
        <Text style={[styles.sectionTitle, { color: '#FFFFFF' }]}>
          Churn Risk Analysis
        </Text>
        <View style={styles.churnGrid}>
          <View style={styles.churnItem}>
            <Text style={[styles.churnLabel, { color: 'rgba(255, 255, 255, 0.6)' }]}>High Risk</Text>
            <Text style={[styles.churnValue, { color: '#EF4444' }]}>12 clients</Text>
            <Text style={[styles.churnRevenue, { color: '#EF4444' }]}>$840K at risk</Text>
          </View>
          <View style={styles.churnItem}>
            <Text style={[styles.churnLabel, { color: 'rgba(255, 255, 255, 0.6)' }]}>Medium Risk</Text>
            <Text style={[styles.churnValue, { color: '#F59E0B' }]}>28 clients</Text>
            <Text style={[styles.churnRevenue, { color: '#F59E0B' }]}>$1.2M at risk</Text>
          </View>
          <View style={styles.churnItem}>
            <Text style={[styles.churnLabel, { color: 'rgba(255, 255, 255, 0.6)' }]}>Low Risk</Text>
            <Text style={[styles.churnValue, { color: '#10B981' }]}>208 clients</Text>
            <Text style={[styles.churnRevenue, { color: '#10B981' }]}>Stable</Text>
          </View>
        </View>
      </View>

      {/* Client Lifecycle Tracking */}
      <View style={[styles.lifecycleSection, { backgroundColor: 'rgba(11, 15, 20, 0.6)', borderColor: 'rgba(16, 185, 129, 0.2)', borderWidth: 1 }]}>
        <Text style={[styles.sectionTitle, { color: '#FFFFFF' }]}>
          Client Lifecycle Distribution
        </Text>
        <View style={styles.lifecycleGrid}>
          <View style={styles.lifecycleItem}>
            <View style={[styles.lifecycleDot, { backgroundColor: '#10B981' }]} />
            <Text style={[styles.lifecycleLabel, { color: 'rgba(255, 255, 255, 0.8)' }]}>Onboarding</Text>
            <Text style={[styles.lifecycleValue, { color: '#FFFFFF' }]}>18%</Text>
          </View>
          <View style={styles.lifecycleItem}>
            <View style={[styles.lifecycleDot, { backgroundColor: '#06B6D4' }]} />
            <Text style={[styles.lifecycleLabel, { color: 'rgba(255, 255, 255, 0.8)' }]}>Growth</Text>
            <Text style={[styles.lifecycleValue, { color: '#FFFFFF' }]}>42%</Text>
          </View>
          <View style={styles.lifecycleItem}>
            <View style={[styles.lifecycleDot, { backgroundColor: '#8B5CF6' }]} />
            <Text style={[styles.lifecycleLabel, { color: 'rgba(255, 255, 255, 0.8)' }]}>Mature</Text>
            <Text style={[styles.lifecycleValue, { color: '#FFFFFF' }]}>32%</Text>
          </View>
          <View style={styles.lifecycleItem}>
            <View style={[styles.lifecycleDot, { backgroundColor: '#F59E0B' }]} />
            <Text style={[styles.lifecycleLabel, { color: 'rgba(255, 255, 255, 0.8)' }]}>Renewal</Text>
            <Text style={[styles.lifecycleValue, { color: '#FFFFFF' }]}>8%</Text>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    borderRadius: 16,
    marginBottom: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 16,
  },
  overviewSection: {
    padding: 16,
    borderRadius: 12,
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 15,
    fontWeight: '600',
    marginBottom: 12,
  },
  overviewGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  overviewItem: {
    alignItems: 'center',
  },
  overviewLabel: {
    fontSize: 10,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    marginBottom: 4,
  },
  overviewValue: {
    fontSize: 18,
    fontWeight: '700',
  },
  segmentationSection: {
    padding: 16,
    borderRadius: 12,
    marginBottom: 16,
  },
  segmentationChart: {
    gap: 12,
  },
  segmentationBar: {
    height: 24,
    flexDirection: 'row',
    borderRadius: 12,
    overflow: 'hidden',
  },
  segment: {
    height: '100%',
  },
  segmentationLegend: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  legendDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: 6,
  },
  legendText: {
    fontSize: 11,
  },
  healthSection: {
    padding: 16,
    borderRadius: 12,
    marginBottom: 16,
    maxHeight: 400,
  },
  clientsScroll: {
    flex: 1,
  },
  clientCard: {
    padding: 12,
    backgroundColor: 'rgba(255, 255, 255, 0.03)',
    borderRadius: 8,
    marginBottom: 8,
  },
  clientHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  clientInfo: {
    flex: 1,
  },
  clientName: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 2,
  },
  contractValue: {
    fontSize: 11,
  },
  healthBadge: {
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 12,
  },
  healthScore: {
    fontSize: 16,
    fontWeight: '700',
  },
  clientMetrics: {
    gap: 8,
  },
  metric: {
    gap: 4,
  },
  metricLabel: {
    fontSize: 10,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  metricBar: {
    height: 6,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 3,
    overflow: 'hidden',
  },
  metricBarFill: {
    height: '100%',
    borderRadius: 3,
  },
  metricValue: {
    fontSize: 11,
    fontWeight: '600',
    textAlign: 'right',
  },
  expansionSection: {
    padding: 16,
    borderRadius: 12,
    marginBottom: 16,
  },
  expansionList: {
    gap: 8,
  },
  expansionItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    backgroundColor: 'rgba(255, 255, 255, 0.03)',
    borderRadius: 8,
  },
  expansionLeft: {
    flex: 1,
  },
  expansionClient: {
    fontSize: 13,
    fontWeight: '600',
    marginBottom: 2,
  },
  expansionService: {
    fontSize: 10,
  },
  expansionRight: {
    alignItems: 'flex-end',
  },
  expansionProbability: {
    fontSize: 14,
    fontWeight: '700',
    marginBottom: 2,
  },
  expansionValue: {
    fontSize: 11,
  },
  churnSection: {
    padding: 16,
    borderRadius: 12,
    marginBottom: 16,
  },
  churnGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  churnItem: {
    flex: 1,
    alignItems: 'center',
  },
  churnLabel: {
    fontSize: 11,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    marginBottom: 4,
  },
  churnValue: {
    fontSize: 16,
    fontWeight: '700',
    marginBottom: 2,
  },
  churnRevenue: {
    fontSize: 10,
  },
  lifecycleSection: {
    padding: 16,
    borderRadius: 12,
  },
  lifecycleGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  lifecycleItem: {
    alignItems: 'center',
    gap: 6,
  },
  lifecycleDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
  },
  lifecycleLabel: {
    fontSize: 11,
    fontWeight: '500',
  },
  lifecycleValue: {
    fontSize: 14,
    fontWeight: '700',
  },
});
