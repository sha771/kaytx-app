import React from 'react';
import { View, StyleSheet, Text, ScrollView } from 'react-native';
import { useTheme } from '@/providers/ThemeProvider';

interface PaidAdsPerformance {
  channel: string;
  spend: number;
  revenue: number;
  roas: number;
}

interface ROASByChannel {
  channel: string;
  roas: number;
}

interface CampaignOptimization {
  campaign: string;
  status: string;
  budget: number;
  spent: number;
  roas: number;
}

interface AudienceSegment {
  segment: string;
  size: number;
  conversion: number;
  ltv: number;
}

interface AttributionModel {
  model: string;
  attributed: number;
  share: number;
}

interface MarketingAdIntelligenceProps {
  paidAdsPerformance: PaidAdsPerformance[];
  roasByChannel: ROASByChannel[];
  campaignOptimization: CampaignOptimization[];
  audienceSegments: AudienceSegment[];
  attributionModels: AttributionModel[];
}

export default function MarketingAdIntelligence({
  paidAdsPerformance,
  roasByChannel,
  campaignOptimization,
  audienceSegments,
  attributionModels
}: MarketingAdIntelligenceProps) {
  const { theme } = useTheme();

  const formatCurrency = (num: number) => {
    if (num >= 1000000) return '$' + (num / 1000000).toFixed(1) + 'M';
    if (num >= 1000) return '$' + (num / 1000).toFixed(0) + 'K';
    return '$' + num.toString();
  };

  const formatNumber = (num: number) => {
    if (num >= 1000000) return (num / 1000000).toFixed(1) + 'M';
    if (num >= 1000) return (num / 1000).toFixed(0) + 'K';
    return num.toString();
  };

  const getStatusColor = (status: string) => {
    return status === 'active' ? '#22C55E' : status === 'paused' ? '#F59E0B' : '#EF4444';
  };

  return (
    <View style={[styles.container, { backgroundColor: 'rgba(11, 15, 20, 0.8)', borderColor: 'rgba(56, 189, 248, 0.2)', borderWidth: 1 }]}>
      <Text style={[styles.title, { color: '#38BDF8' }]}>
        Marketing & Ad Intelligence Center
      </Text>

      {/* Paid Ads Performance */}
      <View style={[styles.section, { backgroundColor: 'rgba(11, 15, 20, 0.6)', borderColor: 'rgba(56, 189, 248, 0.2)', borderWidth: 1 }]}>
        <Text style={[styles.sectionTitle, { color: '#FFFFFF' }]}>
          Paid Ads Performance
        </Text>
        <ScrollView style={styles.adsScroll} showsVerticalScrollIndicator={false}>
          {paidAdsPerformance.map((ad, index) => (
            <View key={index} style={styles.adItem}>
              <View style={styles.adInfo}>
                <Text style={[styles.adChannel, { color: '#FFFFFF' }]}>{ad.channel}</Text>
                <View style={styles.adMetrics}>
                  <Text style={[styles.adMetric, { color: 'rgba(255, 255, 255, 0.6)' }]}>
                    Spend: {formatCurrency(ad.spend)}
                  </Text>
                  <Text style={[styles.adMetric, { color: 'rgba(255, 255, 255, 0.6)' }]}>
                    Revenue: {formatCurrency(ad.revenue)}
                  </Text>
                </View>
              </View>
              <View style={[styles.roasBadge, { backgroundColor: ad.roas >= 4.5 ? 'rgba(34, 197, 94, 0.2)' : 'rgba(245, 158, 11, 0.2)' }]}>
                <Text style={[styles.roasText, { color: ad.roas >= 4.5 ? '#22C55E' : '#F59E0B' }]}>
                  {ad.roas}x
                </Text>
              </View>
            </View>
          ))}
        </ScrollView>
      </View>

      {/* ROAS by Channel */}
      <View style={[styles.section, { backgroundColor: 'rgba(11, 15, 20, 0.6)', borderColor: 'rgba(56, 189, 248, 0.2)', borderWidth: 1 }]}>
        <Text style={[styles.sectionTitle, { color: '#FFFFFF' }]}>
          ROAS by Channel
        </Text>
        <View style={styles.roasContainer}>
          {roasByChannel.map((item, index) => {
            const maxROAS = Math.max(...roasByChannel.map(r => r.roas));
            const barWidth = (item.roas / maxROAS) * 100;
            const isHighROAS = item.roas >= 10;
            
            return (
              <View key={index} style={styles.roasItem}>
                <View style={styles.roasInfo}>
                  <Text style={[styles.roasChannel, { color: '#FFFFFF' }]} numberOfLines={1}>
                    {item.channel}
                  </Text>
                  <Text style={[styles.roasValue, { color: isHighROAS ? '#22C55E' : '#3B82F6' }]}>
                    {item.roas}x
                  </Text>
                </View>
                <View style={[styles.roasBar, { backgroundColor: `${isHighROAS ? '#22C55E' : '#3B82F6'}30`, width: `${barWidth}%` }]}>
                  <View style={[styles.roasFill, { backgroundColor: isHighROAS ? '#22C55E' : '#3B82F6', width: `${barWidth}%` }]} />
                </View>
              </View>
            );
          })}
        </View>
      </View>

      {/* Campaign Optimization */}
      <View style={[styles.section, { backgroundColor: 'rgba(11, 15, 20, 0.6)', borderColor: 'rgba(56, 189, 248, 0.2)', borderWidth: 1 }]}>
        <Text style={[styles.sectionTitle, { color: '#FFFFFF' }]}>
          Campaign Optimization
        </Text>
        <ScrollView style={styles.campaignScroll} showsVerticalScrollIndicator={false}>
          {campaignOptimization.map((campaign, index) => {
            const budgetUsed = (campaign.spent / campaign.budget) * 100;
            
            return (
              <View key={index} style={styles.campaignItem}>
                <View style={styles.campaignHeader}>
                  <View style={styles.campaignInfo}>
                    <Text style={[styles.campaignName, { color: '#FFFFFF' }]} numberOfLines={1}>
                      {campaign.campaign}
                    </Text>
                    <View style={[styles.statusBadge, { backgroundColor: `${getStatusColor(campaign.status)}20` }]}>
                      <Text style={[styles.statusText, { color: getStatusColor(campaign.status) }]}>
                        {campaign.status}
                      </Text>
                    </View>
                  </View>
                  <View style={[styles.campaignRoas, { backgroundColor: campaign.roas >= 4.5 ? 'rgba(34, 197, 94, 0.2)' : 'rgba(245, 158, 11, 0.2)' }]}>
                    <Text style={[styles.campaignRoasText, { color: campaign.roas >= 4.5 ? '#22C55E' : '#F59E0B' }]}>
                      {campaign.roas}x
                    </Text>
                  </View>
                </View>
                <View style={styles.campaignBudget}>
                  <View style={styles.budgetInfo}>
                    <Text style={[styles.budgetLabel, { color: 'rgba(255, 255, 255, 0.6)' }]}>
                      Budget: {formatCurrency(campaign.budget)}
                    </Text>
                    <Text style={[styles.budgetSpent, { color: '#FFFFFF' }]}>
                      Spent: {formatCurrency(campaign.spent)}
                    </Text>
                  </View>
                  <View style={styles.budgetBar}>
                    <View style={[styles.budgetFill, { width: `${budgetUsed}%`, backgroundColor: budgetUsed > 80 ? '#EF4444' : budgetUsed > 60 ? '#F59E0B' : '#22C55E' }]} />
                  </View>
                  <Text style={[styles.budgetPercent, { color: 'rgba(255, 255, 255, 0.6)' }]}>
                    {budgetUsed.toFixed(0)}%
                  </Text>
                </View>
              </View>
            );
          })}
        </ScrollView>
      </View>

      {/* Audience Segments */}
      <View style={[styles.section, { backgroundColor: 'rgba(11, 15, 20, 0.6)', borderColor: 'rgba(56, 189, 248, 0.2)', borderWidth: 1 }]}>
        <Text style={[styles.sectionTitle, { color: '#FFFFFF' }]}>
          Audience Segments
        </Text>
        <ScrollView style={styles.segmentScroll} showsVerticalScrollIndicator={false}>
          {audienceSegments.map((segment, index) => (
            <View key={index} style={styles.segmentItem}>
              <View style={styles.segmentInfo}>
                <Text style={[styles.segmentName, { color: '#FFFFFF' }]}>{segment.segment}</Text>
                <Text style={[styles.segmentSize, { color: 'rgba(255, 255, 255, 0.6)' }]}>
                  {formatNumber(segment.size)} users
                </Text>
              </View>
              <View style={styles.segmentMetrics}>
                <View style={styles.segmentMetric}>
                  <Text style={[styles.metricLabel, { color: 'rgba(255, 255, 255, 0.5)' }]}>Conv.</Text>
                  <Text style={[styles.metricValue, { color: segment.conversion >= 4 ? '#22C55E' : '#F59E0B' }]}>
                    {segment.conversion}%
                  </Text>
                </View>
                <View style={styles.segmentMetric}>
                  <Text style={[styles.metricLabel, { color: 'rgba(255, 255, 255, 0.5)' }]}>LTV</Text>
                  <Text style={[styles.metricValue, { color: '#3B82F6' }]}>
                    ${segment.ltv}
                  </Text>
                </View>
              </View>
            </View>
          ))}
        </ScrollView>
      </View>

      {/* Attribution Models */}
      <View style={[styles.section, { backgroundColor: 'rgba(11, 15, 20, 0.6)', borderColor: 'rgba(56, 189, 248, 0.2)', borderWidth: 1 }]}>
        <Text style={[styles.sectionTitle, { color: '#FFFFFF' }]}>
          Attribution Models
        </Text>
        <View style={styles.attributionContainer}>
          {attributionModels.map((model, index) => {
            const maxShare = Math.max(...attributionModels.map(m => m.share));
            const barWidth = (model.share / maxShare) * 100;
            
            return (
              <View key={index} style={styles.attributionItem}>
                <View style={styles.attributionInfo}>
                  <Text style={[styles.attributionModel, { color: '#FFFFFF' }]}>{model.model}</Text>
                  <Text style={[styles.attributionValue, { color: '#38BDF8' }]}>
                    {formatCurrency(model.attributed)}
                  </Text>
                </View>
                <View style={styles.attributionMetric}>
                  <View style={[styles.attributionBar, { backgroundColor: 'rgba(56, 189, 248, 0.2)', width: `${barWidth}%` }]}>
                    <View style={[styles.attributionFill, { backgroundColor: '#38BDF8', width: `${barWidth}%` }]} />
                  </View>
                  <Text style={[styles.attributionShare, { color: '#38BDF8' }]}>
                    {model.share}%
                  </Text>
                </View>
              </View>
            );
          })}
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
  section: {
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 15,
    fontWeight: '600',
    marginBottom: 12,
  },
  adsScroll: {
    maxHeight: 200,
  },
  adItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 255, 255, 0.1)',
  },
  adInfo: {
    flex: 1,
  },
  adChannel: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 4,
  },
  adMetrics: {
    flexDirection: 'row',
  },
  adMetric: {
    fontSize: 11,
    marginRight: 12,
  },
  roasBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
  },
  roasText: {
    fontSize: 14,
    fontWeight: '700',
  },
  roasContainer: {
    maxHeight: 200,
  },
  roasItem: {
    marginBottom: 12,
  },
  roasInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 4,
  },
  roasChannel: {
    fontSize: 13,
    fontWeight: '500',
    flex: 1,
  },
  roasValue: {
    fontSize: 14,
    fontWeight: '700',
  },
  roasBar: {
    height: 8,
    borderRadius: 4,
    overflow: 'hidden',
  },
  roasFill: {
    height: '100%',
    borderRadius: 4,
  },
  campaignScroll: {
    maxHeight: 250,
  },
  campaignItem: {
    marginBottom: 12,
    paddingBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 255, 255, 0.1)',
  },
  campaignHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  campaignInfo: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  campaignName: {
    fontSize: 13,
    fontWeight: '500',
    flex: 1,
    marginRight: 8,
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  statusText: {
    fontSize: 10,
    fontWeight: '600',
  },
  campaignRoas: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
  },
  campaignRoasText: {
    fontSize: 12,
    fontWeight: '700',
  },
  campaignBudget: {
    marginTop: 8,
  },
  budgetInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 4,
  },
  budgetLabel: {
    fontSize: 11,
  },
  budgetSpent: {
    fontSize: 12,
    fontWeight: '600',
  },
  budgetBar: {
    height: 6,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 3,
    marginBottom: 4,
    overflow: 'hidden',
  },
  budgetFill: {
    height: '100%',
    borderRadius: 3,
  },
  budgetPercent: {
    fontSize: 10,
    textAlign: 'right',
  },
  segmentScroll: {
    maxHeight: 200,
  },
  segmentItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 255, 255, 0.1)',
  },
  segmentInfo: {
    flex: 1,
  },
  segmentName: {
    fontSize: 13,
    fontWeight: '500',
    marginBottom: 2,
  },
  segmentSize: {
    fontSize: 11,
  },
  segmentMetrics: {
    flexDirection: 'row',
  },
  segmentMetric: {
    marginLeft: 12,
    alignItems: 'center',
  },
  metricLabel: {
    fontSize: 9,
    marginBottom: 2,
  },
  metricValue: {
    fontSize: 12,
    fontWeight: '600',
  },
  attributionContainer: {
    maxHeight: 200,
  },
  attributionItem: {
    marginBottom: 12,
  },
  attributionInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 4,
  },
  attributionModel: {
    fontSize: 13,
    fontWeight: '500',
  },
  attributionValue: {
    fontSize: 13,
    fontWeight: '600',
  },
  attributionMetric: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  attributionBar: {
    flex: 1,
    height: 8,
    borderRadius: 4,
    marginRight: 8,
    overflow: 'hidden',
  },
  attributionFill: {
    height: '100%',
    borderRadius: 4,
  },
  attributionShare: {
    fontSize: 12,
    fontWeight: '600',
    width: 35,
    textAlign: 'right',
  },
});