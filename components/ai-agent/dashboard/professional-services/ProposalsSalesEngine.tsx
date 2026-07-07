import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { useTheme } from '@/providers/ThemeProvider';

interface SalesFunnel {
  qualified: number;
  proposal: number;
  negotiation: number;
  closed: number;
}

interface ProposalsSalesEngineProps {
  data: {
    rfps?: any;
    winRate?: any;
    dealPipeline?: any;
    pricingModels?: any[];
  };
}

export default function ProposalsSalesEngine({ data }: ProposalsSalesEngineProps) {
  const rfps = data.rfps || {};
  const winRate = data.winRate || {};
  const dealPipeline = data.dealPipeline || {};
  const pricingModels = data.pricingModels || [];
  const { theme } = useTheme();

  const getFunnelColor = (stage: string) => {
    switch (stage) {
      case 'qualified': return '#06B6D4';
      case 'proposal': return '#8B5CF6';
      case 'negotiation': return '#F59E0B';
      case 'closed': return '#10B981';
      default: return '#6B7280';
    }
  };

  const funnelStages = [
    { key: 'qualified', label: 'Qualified', value: data.salesFunnel.qualified },
    { key: 'proposal', label: 'Proposal', value: data.salesFunnel.proposal },
    { key: 'negotiation', label: 'Negotiation', value: data.salesFunnel.negotiation },
    { key: 'closed', label: 'Closed', value: data.salesFunnel.closed },
  ];

  const maxFunnelValue = Math.max(...Object.values(data.salesFunnel));

  return (
    <View style={[styles.container, { backgroundColor: 'rgba(11, 15, 20, 0.8)', borderColor: 'rgba(16, 185, 129, 0.2)', borderWidth: 1 }]}>
      <Text style={[styles.title, { color: '#10B981' }]}>
        Proposals & Sales Engine
      </Text>

      {/* Key Metrics */}
      <View style={styles.metricsGrid}>
        <View style={[styles.metricCard, { backgroundColor: 'rgba(11, 15, 20, 0.6)', borderColor: 'rgba(16, 185, 129, 0.2)', borderWidth: 1 }]}>
          <Text style={[styles.metricLabel, { color: 'rgba(255, 255, 255, 0.6)' }]}>Active RFPs</Text>
          <Text style={[styles.metricValue, { color: '#06B6D4' }]}>{data.rfps}</Text>
          <Text style={[styles.metricSubtitle, { color: 'rgba(255, 255, 255, 0.4)' }]}>In progress</Text>
        </View>

        <View style={[styles.metricCard, { backgroundColor: 'rgba(11, 15, 20, 0.6)', borderColor: 'rgba(139, 92, 246, 0.2)', borderWidth: 1 }]}>
          <Text style={[styles.metricLabel, { color: 'rgba(255, 255, 255, 0.6)' }]}>Proposals Submitted</Text>
          <Text style={[styles.metricValue, { color: '#8B5CF6' }]}>{data.proposalsSubmitted}</Text>
          <Text style={[styles.metricSubtitle, { color: 'rgba(255, 255, 255, 0.4)' }]}>This quarter</Text>
        </View>

        <View style={[styles.metricCard, { backgroundColor: 'rgba(11, 15, 20, 0.6)', borderColor: 'rgba(16, 185, 129, 0.2)', borderWidth: 1 }]}>
          <Text style={[styles.metricLabel, { color: 'rgba(255, 255, 255, 0.6)' }]}>Win Rate</Text>
          <Text style={[styles.metricValue, { color: '#10B981' }]}>{data.winRate}</Text>
          <Text style={[styles.metricSubtitle, { color: 'rgba(255, 255, 255, 0.4)' }]}>Industry avg: 45%</Text>
        </View>

        <View style={[styles.metricCard, { backgroundColor: 'rgba(11, 15, 20, 0.6)', borderColor: 'rgba(16, 185, 129, 0.2)', borderWidth: 1 }]}>
          <Text style={[styles.metricLabel, { color: 'rgba(255, 255, 255, 0.6)' }]}>Deal Pipeline</Text>
          <Text style={[styles.metricValue, { color: '#10B981' }]}>{data.dealPipeline}</Text>
          <Text style={[styles.metricSubtitle, { color: 'rgba(255, 255, 255, 0.4)' }]}>Total value</Text>
        </View>
      </View>

      {/* Sales Funnel */}
      <View style={[styles.funnelSection, { backgroundColor: 'rgba(11, 15, 20, 0.6)', borderColor: 'rgba(16, 185, 129, 0.2)', borderWidth: 1 }]}>
        <Text style={[styles.sectionTitle, { color: '#FFFFFF' }]}>
          Sales Funnel
        </Text>
        <View style={styles.funnelContainer}>
          {funnelStages.map((stage, index) => {
            const width = (stage.value / maxFunnelValue) * 100;
            const color = getFunnelColor(stage.key);
            
            return (
              <View key={stage.key} style={styles.funnelStage}>
                <View style={styles.funnelStageLeft}>
                  <Text style={[styles.funnelStageLabel, { color: 'rgba(255, 255, 255, 0.8)' }]}>
                    {stage.label}
                  </Text>
                  <Text style={[styles.funnelStageValue, { color }]}>
                    {stage.value}
                  </Text>
                </View>
                <View style={[styles.funnelBar, { width: `${width}%`, backgroundColor: `${color}30` }]}>
                  <View style={[styles.funnelBarFill, { width: '100%', backgroundColor: color }]} />
                </View>
                {index < funnelStages.length - 1 && (
                  <Text style={[styles.conversionRate, { color: 'rgba(255, 255, 255, 0.4)' }]}>
                    {((funnelStages[index + 1].value / stage.value) * 100).toFixed(0)}% conversion
                  </Text>
                )}
              </View>
            );
          })}
        </View>
        <View style={styles.funnelSummary}>
          <Text style={[styles.overallConversion, { color: '#10B981' }]}>
            Overall Conversion: {((data.salesFunnel.closed / data.salesFunnel.qualified) * 100).toFixed(1)}%
          </Text>
        </View>
      </View>

      {/* Pricing Models */}
      <View style={[styles.pricingSection, { backgroundColor: 'rgba(11, 15, 20, 0.6)', borderColor: 'rgba(16, 185, 129, 0.2)', borderWidth: 1 }]}>
        <Text style={[styles.sectionTitle, { color: '#FFFFFF' }]}>
          Pricing Models
        </Text>
        <View style={styles.pricingGrid}>
          {data.pricingModels.map((model, index) => (
            <View key={index} style={[styles.pricingModel, { backgroundColor: 'rgba(255, 255, 255, 0.03)' }]}>
              <Text style={[styles.pricingModelText, { color: '#FFFFFF' }]}>{model}</Text>
            </View>
          ))}
        </View>
      </View>

      {/* Proposal Win/Loss Analytics */}
      <View style={[styles.analyticsSection, { backgroundColor: 'rgba(11, 15, 20, 0.6)', borderColor: 'rgba(16, 185, 129, 0.2)', borderWidth: 1 }]}>
        <Text style={[styles.sectionTitle, { color: '#FFFFFF' }]}>
          Win/Loss Analytics
        </Text>
        <View style={styles.analyticsGrid}>
          <View style={styles.analyticsItem}>
            <Text style={[styles.analyticsLabel, { color: 'rgba(255, 255, 255, 0.6)' }]}>Wins</Text>
            <Text style={[styles.analyticsValue, { color: '#10B981' }]}>16</Text>
            <View style={[styles.analyticsBar, { backgroundColor: '#10B981', width: '67%' }]} />
          </View>
          <View style={styles.analyticsItem}>
            <Text style={[styles.analyticsLabel, { color: 'rgba(255, 255, 255, 0.6)' }]}>Losses</Text>
            <Text style={[styles.analyticsValue, { color: '#EF4444' }]}>8</Text>
            <View style={[styles.analyticsBar, { backgroundColor: '#EF4444', width: '33%' }]} />
          </View>
        </View>
        <View style={styles.lossReasons}>
          <Text style={[styles.lossTitle, { color: 'rgba(255, 255, 255, 0.8)' }]}>Top Loss Reasons:</Text>
          <View style={styles.lossReasonItem}>
            <Text style={[styles.lossReasonText, { color: 'rgba(255, 255, 255, 0.6)' }]}>• Price sensitivity (38%)</Text>
          </View>
          <View style={styles.lossReasonItem}>
            <Text style={[styles.lossReasonText, { color: 'rgba(255, 255, 255, 0.6)' }]}>• Competitor selection (25%)</Text>
          </View>
          <View style={styles.lossReasonItem}>
            <Text style={[styles.lossReasonText, { color: 'rgba(255, 255, 255, 0.6)' }]}>• Timeline concerns (20%)</Text>
          </View>
        </View>
      </View>

      {/* Deal Conversion Tracking */}
      <View style={[styles.conversionSection, { backgroundColor: 'rgba(11, 15, 20, 0.6)', borderColor: 'rgba(16, 185, 129, 0.2)', borderWidth: 1 }]}>
        <Text style={[styles.sectionTitle, { color: '#FFFFFF' }]}>
          Deal Conversion Tracking
        </Text>
        <View style={styles.conversionList}>
          <View style={styles.conversionItem}>
            <View style={styles.conversionLeft}>
              <Text style={[styles.conversionDeal, { color: '#FFFFFF' }]}>Enterprise AI Transformation</Text>
              <Text style={[styles.conversionClient, { color: 'rgba(255, 255, 255, 0.6)' }]}>Fortune 500 Tech</Text>
            </View>
            <View style={styles.conversionRight}>
              <View style={[styles.conversionStatus, { backgroundColor: '#10B98120' }]}>
                <Text style={[styles.conversionStatusText, { color: '#10B981' }]}>Closed Won</Text>
              </View>
              <Text style={[styles.conversionValue, { color: '#10B981' }]}>$2.4M</Text>
            </View>
          </View>
          <View style={styles.conversionItem}>
            <View style={styles.conversionLeft}>
              <Text style={[styles.conversionDeal, { color: '#FFFFFF' }]}>Cloud Infrastructure Assessment</Text>
              <Text style={[styles.conversionClient, { color: 'rgba(255, 255, 255, 0.6)' }]}>Global Bank</Text>
            </View>
            <View style={styles.conversionRight}>
              <View style={[styles.conversionStatus, { backgroundColor: '#F59E0B20' }]}>
                <Text style={[styles.conversionStatusText, { color: '#F59E0B' }]}>Negotiation</Text>
              </View>
              <Text style={[styles.conversionValue, { color: '#8B5CF6' }]}>$1.8M</Text>
            </View>
          </View>
          <View style={styles.conversionItem}>
            <View style={styles.conversionLeft}>
              <Text style={[styles.conversionDeal, { color: '#FFFFFF' }]}>Data Analytics Platform</Text>
              <Text style={[styles.conversionClient, { color: 'rgba(255, 255, 255, 0.6)' }]}>Retail Chain</Text>
            </View>
            <View style={styles.conversionRight}>
              <View style={[styles.conversionStatus, { backgroundColor: '#06B6D420' }]}>
                <Text style={[styles.conversionStatusText, { color: '#06B6D4' }]}>Proposal</Text>
              </View>
              <Text style={[styles.conversionValue, { color: '#8B5CF6' }]}>$1.2M</Text>
            </View>
          </View>
        </View>
      </View>

      {/* Pricing Optimization */}
      <View style={[styles.optimizationSection, { backgroundColor: 'rgba(11, 15, 20, 0.6)', borderColor: 'rgba(16, 185, 129, 0.2)', borderWidth: 1 }]}>
        <Text style={[styles.sectionTitle, { color: '#FFFFFF' }]}>
          Pricing Optimization Insights
        </Text>
        <View style={styles.optimizationList}>
          <View style={styles.optimizationItem}>
            <View style={[styles.optimizationDot, { backgroundColor: '#10B981' }]} />
            <Text style={[styles.optimizationText, { color: 'rgba(255, 255, 255, 0.8)' }]}>
              Time & Materials showing 23% higher margin than Fixed Price
            </Text>
          </View>
          <View style={styles.optimizationItem}>
            <View style={[styles.optimizationDot, { backgroundColor: '#06B6D4' }]} />
            <Text style={[styles.optimizationText, { color: 'rgba(255, 255, 255, 0.8)' }]}>
              Success-based pricing increasing win rate by 15%
            </Text>
          </View>
          <View style={styles.optimizationItem}>
            <View style={[styles.optimizationDot, { backgroundColor: '#F59E0B' }]} />
            <Text style={[styles.optimizationText, { color: 'rgba(255, 255, 255, 0.8)' }]}>
              Retainer model improving client lifetime value by 34%
            </Text>
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
  metricsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
    marginBottom: 16,
  },
  metricCard: {
    width: '48%',
    padding: 14,
    borderRadius: 12,
  },
  metricLabel: {
    fontSize: 11,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    marginBottom: 4,
  },
  metricValue: {
    fontSize: 22,
    fontWeight: '700',
    marginBottom: 2,
  },
  metricSubtitle: {
    fontSize: 10,
  },
  funnelSection: {
    padding: 16,
    borderRadius: 12,
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 15,
    fontWeight: '600',
    marginBottom: 12,
  },
  funnelContainer: {
    gap: 10,
  },
  funnelStage: {
    gap: 6,
  },
  funnelStageLeft: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  funnelStageLabel: {
    fontSize: 12,
    fontWeight: '500',
  },
  funnelStageValue: {
    fontSize: 14,
    fontWeight: '700',
  },
  funnelBar: {
    height: 8,
    borderRadius: 4,
    overflow: 'hidden',
  },
  funnelBarFill: {
    height: '100%',
    borderRadius: 4,
  },
  conversionRate: {
    fontSize: 10,
    textAlign: 'right',
  },
  funnelSummary: {
    marginTop: 8,
    alignItems: 'center',
  },
  overallConversion: {
    fontSize: 12,
    fontWeight: '600',
  },
  pricingSection: {
    padding: 16,
    borderRadius: 12,
    marginBottom: 16,
  },
  pricingGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  pricingModel: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
  },
  pricingModelText: {
    fontSize: 12,
    fontWeight: '500',
  },
  analyticsSection: {
    padding: 16,
    borderRadius: 12,
    marginBottom: 16,
  },
  analyticsGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  analyticsItem: {
    flex: 1,
    alignItems: 'center',
  },
  analyticsLabel: {
    fontSize: 11,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    marginBottom: 4,
  },
  analyticsValue: {
    fontSize: 24,
    fontWeight: '700',
    marginBottom: 6,
  },
  analyticsBar: {
    height: 6,
    borderRadius: 3,
    width: '100%',
  },
  lossReasons: {
    gap: 6,
  },
  lossTitle: {
    fontSize: 12,
    fontWeight: '600',
    marginBottom: 4,
  },
  lossReasonItem: {
    paddingLeft: 8,
  },
  lossReasonText: {
    fontSize: 11,
  },
  conversionSection: {
    padding: 16,
    borderRadius: 12,
    marginBottom: 16,
  },
  conversionList: {
    gap: 8,
  },
  conversionItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    backgroundColor: 'rgba(255, 255, 255, 0.03)',
    borderRadius: 8,
  },
  conversionLeft: {
    flex: 1,
  },
  conversionDeal: {
    fontSize: 13,
    fontWeight: '600',
    marginBottom: 2,
  },
  conversionClient: {
    fontSize: 10,
  },
  conversionRight: {
    alignItems: 'flex-end',
  },
  conversionStatus: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
    marginBottom: 4,
  },
  conversionStatusText: {
    fontSize: 10,
    fontWeight: '600',
    textTransform: 'uppercase',
  },
  conversionValue: {
    fontSize: 12,
    fontWeight: '600',
  },
  optimizationSection: {
    padding: 16,
    borderRadius: 12,
  },
  optimizationList: {
    gap: 8,
  },
  optimizationItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  optimizationDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: 10,
  },
  optimizationText: {
    fontSize: 12,
    flex: 1,
  },
});
