import React from 'react';
import { View, StyleSheet, Text, ScrollView } from 'react-native';
import { useTheme } from '@/providers/ThemeProvider';
import { Building2, DollarSign, TrendingUp, AlertCircle } from 'lucide-react-native';
import { LiveDealConfig } from './types';

interface LiveDealTrackerProps {
  config: LiveDealConfig;
}

export default function LiveDealTracker({ config }: LiveDealTrackerProps) {
  const { theme } = useTheme();

  const getProbabilityColor = (probability: number) => {
    if (probability >= 70) return '#10B981';
    if (probability >= 40) return '#F59E0B';
    return '#EF4444';
  };

  const getStageColor = (stage: string) => {
    const stageColors: { [key: string]: string } = {
      'Negotiation': '#8B5CF6',
      'Proposal': '#3B82F6',
      'Discovery': '#06B6D4',
      'Qualification': '#10B981',
    };
    return stageColors[stage] || '#6B7280';
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.card }]}>
      <View style={styles.header}>
        <View style={styles.headerTitle}>
          <Building2 size={20} color={theme.colors.primary} />
          <Text style={[styles.title, { color: theme.colors.text }]}>
            Live Deal Tracker
          </Text>
        </View>
        <View style={[styles.dealCount, { backgroundColor: theme.colors.background }]}>
          <Text style={[styles.dealCountText, { color: theme.colors.text }]}>
            {config.deals.length} Active Deals
          </Text>
        </View>
      </View>

      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        <View style={styles.tableContainer}>
          <View style={styles.tableHeader}>
            <Text style={[styles.headerCell, { color: theme.colors.textSecondary, width: 120 }]}>
              Company
            </Text>
            <Text style={[styles.headerCell, { color: theme.colors.textSecondary, width: 100 }]}>
              Value
            </Text>
            <Text style={[styles.headerCell, { color: theme.colors.textSecondary, width: 100 }]}>
              Stage
            </Text>
            <Text style={[styles.headerCell, { color: theme.colors.textSecondary, width: 80 }]}>
              Prob
            </Text>
            <Text style={[styles.headerCell, { color: theme.colors.textSecondary, width: 100 }]}>
              Owner
            </Text>
            <Text style={[styles.headerCell, { color: theme.colors.textSecondary, width: 140 }]}>
              AI Recommendation
            </Text>
          </View>

          {config.deals.map((deal) => (
            <View key={deal.id} style={[styles.tableRow, { borderBottomColor: theme.colors.border }]}>
              <View style={[styles.cell, { width: 120 }]}>
                <Text style={[styles.companyName, { color: theme.colors.text }]}>
                  {deal.company}
                </Text>
              </View>
              <View style={[styles.cell, { width: 100 }]}>
                <View style={styles.valueContainer}>
                  <DollarSign size={12} color={theme.colors.textSecondary} />
                  <Text style={[styles.valueText, { color: theme.colors.text }]}>
                    {(deal.value / 1000).toFixed(0)}K
                  </Text>
                </View>
              </View>
              <View style={[styles.cell, { width: 100 }]}>
                <View style={[styles.stageBadge, { backgroundColor: getStageColor(deal.stage) + '20' }]}>
                  <Text style={[styles.stageText, { color: getStageColor(deal.stage) }]}>
                    {deal.stage}
                  </Text>
                </View>
              </View>
              <View style={[styles.cell, { width: 80 }]}>
                <View style={styles.probabilityContainer}>
                  <View style={[styles.probabilityBar, { backgroundColor: theme.colors.background }]}>
                    <View 
                      style={[
                        styles.probabilityFill, 
                        { 
                          backgroundColor: getProbabilityColor(deal.probability),
                          width: `${deal.probability}%`
                        }
                      ]} 
                    />
                  </View>
                  <Text style={[styles.probabilityText, { color: getProbabilityColor(deal.probability) }]}>
                    {deal.probability}%
                  </Text>
                </View>
              </View>
              <View style={[styles.cell, { width: 100 }]}>
                <Text style={[styles.ownerText, { color: theme.colors.text }]}>
                  {deal.owner}
                </Text>
              </View>
              <View style={[styles.cell, { width: 140 }]}>
                <View style={styles.recommendationContainer}>
                  <TrendingUp size={12} color="#10B981" />
                  <Text style={[styles.recommendationText, { color: theme.colors.textSecondary }]} numberOfLines={1}>
                    {deal.aiRecommendation}
                  </Text>
                </View>
              </View>
            </View>
          ))}
        </View>
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
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  headerTitle: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
  },
  dealCount: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
  },
  dealCountText: {
    fontSize: 12,
    fontWeight: '600',
  },
  tableContainer: {
    minWidth: 700,
  },
  tableHeader: {
    flexDirection: 'row',
    paddingBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255,255,255,0.1)',
  },
  headerCell: {
    fontSize: 11,
    fontWeight: '600',
    textTransform: 'uppercase',
  },
  tableRow: {
    flexDirection: 'row',
    paddingVertical: 12,
    borderBottomWidth: 1,
  },
  cell: {
    justifyContent: 'center',
  },
  companyName: {
    fontSize: 13,
    fontWeight: '500',
  },
  valueContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  valueText: {
    fontSize: 13,
    fontWeight: '600',
  },
  stageBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
    alignSelf: 'flex-start',
  },
  stageText: {
    fontSize: 11,
    fontWeight: '600',
  },
  probabilityContainer: {
    gap: 4,
  },
  probabilityBar: {
    width: '100%',
    height: 4,
    borderRadius: 2,
    overflow: 'hidden',
  },
  probabilityFill: {
    height: '100%',
    borderRadius: 2,
  },
  probabilityText: {
    fontSize: 11,
    fontWeight: '600',
  },
  ownerText: {
    fontSize: 12,
  },
  recommendationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  recommendationText: {
    fontSize: 11,
    flex: 1,
  },
});
