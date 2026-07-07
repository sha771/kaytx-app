import React from 'react';
import { View, StyleSheet, Text, ScrollView } from 'react-native';
import { useTheme } from '@/providers/ThemeProvider';
import { 
  Users, 
  TrendingUp, 
  Heart, 
  AlertTriangle, 
  DollarSign,
  Repeat,
  BarChart3,
  Target
} from 'lucide-react-native';

export default function CustomerIntelligenceHub() {
  const { theme } = useTheme();

  const customerSegments = [
    { segment: 'High-Value Shoppers', count: '2.4M', aov: '$340', ltv: '$2,400', purchaseRate: '8.2/month' },
    { segment: 'Frequent Buyers', count: '4.8M', aov: '$180', ltv: '$1,800', purchaseRate: '4.5/month' },
    { segment: 'New Customers', count: '12.2M', aov: '$85', ltv: '$340', purchaseRate: '1.2/month' },
    { segment: 'Occasional Shoppers', count: '8.6M', aov: '$120', ltv: '$680', purchaseRate: '2.1/month' },
  ];

  const repeatPurchaseRate = [
    { cohort: 'New Customers (0-30d)', rate: '12%', target: '15%', trend: 'up' },
    { cohort: 'Recent (31-90d)', rate: '34%', target: '35%', trend: 'up' },
    { cohort: 'Active (91-180d)', rate: '58%', target: '60%', trend: 'stable' },
    { cohort: 'Loyal (181-365d)', rate: '72%', target: '70%', trend: 'up' },
    { cohort: 'VIP (365d+)', rate: '89%', target: '85%', trend: 'up' },
  ];

  const behavioralProfiles = [
    { profile: 'Deal Seekers', count: '6.8M', behavior: 'Price-sensitive, discount-driven', conversion: '4.2%' },
    { profile: 'Brand Loyalists', count: '3.2M', behavior: 'Brand-focused, premium purchases', conversion: '6.8%' },
    { profile: 'Impulse Buyers', count: '4.5M', behavior: 'Quick decisions, trend-following', conversion: '5.4%' },
    { profile: 'Researchers', count: '5.8M', behavior: 'Thorough evaluation, comparison', conversion: '3.8%' },
  ];

  const churnRisk = [
    { segment: 'High-Value Shoppers', atRisk: '12%', riskLevel: 'medium', reason: 'Reduced engagement' },
    { segment: 'Frequent Buyers', atRisk: '8%', riskLevel: 'low', reason: 'Seasonal dip' },
    { segment: 'New Customers', atRisk: '28%', riskLevel: 'high', reason: 'No repeat purchase' },
    { segment: 'Occasional Shoppers', atRisk: '18%', riskLevel: 'medium', reason: 'Infrequent visits' },
  ];

  const lifetimeValue = [
    { segment: 'High-Value Shoppers', currentLtv: '$2,400', potentialLtv: '$3,200', opportunity: '+$800' },
    { segment: 'Frequent Buyers', currentLtv: '$1,800', potentialLtv: '$2,400', opportunity: '+$600' },
    { segment: 'New Customers', currentLtv: '$340', potentialLtv: '$1,200', opportunity: '+$860' },
    { segment: 'Occasional Shoppers', currentLtv: '$680', potentialLtv: '$1,400', opportunity: '+$720' },
  ];

  const retentionMetrics = [
    { metric: '30-Day Retention', value: '68%', target: '70%', trend: 'up' },
    { metric: '90-Day Retention', value: '52%', target: '55%', trend: 'up' },
    { metric: '180-Day Retention', value: '38%', target: '40%', trend: 'stable' },
    { metric: '365-Day Retention', value: '24%', target: '25%', trend: 'up' },
  ];

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.card }]}>
      <View style={styles.header}>
        <Text style={[styles.headerTitle, { color: theme.colors.text }]}>Customer Intelligence Hub</Text>
        <Text style={[styles.headerSubtitle, { color: theme.colors.textSecondary }]}>Customer segmentation, behavior analysis, and lifetime value</Text>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Customer Segments */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Customer Segments</Text>
          <View style={[styles.segmentsContainer, { backgroundColor: theme.colors.background }]}>
            {customerSegments.map((segment, index) => (
              <View key={index} style={styles.segmentItem}>
                <View style={styles.segmentHeader}>
                  <Users size={20} color="#38BDF8" />
                  <Text style={[styles.segmentName, { color: theme.colors.text }]}>{segment.segment}</Text>
                </View>
                <View style={styles.segmentMetrics}>
                  <View style={styles.segmentMetric}>
                    <Text style={[styles.metricLabel, { color: theme.colors.textSecondary }]}>Count</Text>
                    <Text style={[styles.metricValue, { color: theme.colors.text }]}>{segment.count}</Text>
                  </View>
                  <View style={styles.segmentMetric}>
                    <Text style={[styles.metricLabel, { color: theme.colors.textSecondary }]}>AOV</Text>
                    <Text style={[styles.metricValue, { color: '#22C55E' }]}>{segment.aov}</Text>
                  </View>
                  <View style={styles.segmentMetric}>
                    <Text style={[styles.metricLabel, { color: theme.colors.textSecondary }]}>LTV</Text>
                    <Text style={[styles.metricValue, { color: '#8B5CF6' }]}>{segment.ltv}</Text>
                  </View>
                  <View style={styles.segmentMetric}>
                    <Text style={[styles.metricLabel, { color: theme.colors.textSecondary }]}>Rate</Text>
                    <Text style={[styles.metricValue, { color: '#38BDF8' }]}>{segment.purchaseRate}</Text>
                  </View>
                </View>
              </View>
            ))}
          </View>
        </View>

        {/* Repeat Purchase Rate */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Repeat Purchase Rate</Text>
          <View style={[styles.repeatContainer, { backgroundColor: theme.colors.background }]}>
            {repeatPurchaseRate.map((item, index) => (
              <View key={index} style={styles.repeatItem}>
                <Text style={[styles.repeatCohort, { color: theme.colors.text }]}>{item.cohort}</Text>
                <View style={styles.repeatMetrics}>
                  <View style={styles.repeatMetric}>
                    <Text style={[styles.metricLabel, { color: theme.colors.textSecondary }]}>Rate</Text>
                    <Text style={[styles.metricValue, { color: '#38BDF8' }]}>{item.rate}</Text>
                  </View>
                  <View style={styles.repeatMetric}>
                    <Text style={[styles.metricLabel, { color: theme.colors.textSecondary }]}>Target</Text>
                    <Text style={[styles.metricValue, { color: theme.colors.textSecondary }]}>{item.target}</Text>
                  </View>
                  <View style={styles.repeatMetric}>
                    <Text style={[styles.metricLabel, { color: theme.colors.textSecondary }]}>Trend</Text>
                    {item.trend === 'up' && <TrendingUp size={14} color="#22C55E" />}
                    {item.trend === 'stable' && <Target size={14} color="#6B7280" />}
                  </View>
                </View>
              </View>
            ))}
          </View>
        </View>

        {/* Behavioral Profiles */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Behavioral Profiles</Text>
          <View style={[styles.profilesContainer, { backgroundColor: theme.colors.background }]}>
            {behavioralProfiles.map((profile, index) => (
              <View key={index} style={styles.profileItem}>
                <Text style={[styles.profileName, { color: theme.colors.text }]}>{profile.profile}</Text>
                <Text style={[styles.profileBehavior, { color: theme.colors.textSecondary }]}>{profile.behavior}</Text>
                <View style={styles.profileMetrics}>
                  <View style={styles.profileMetric}>
                    <Text style={[styles.metricLabel, { color: theme.colors.textSecondary }]}>Count</Text>
                    <Text style={[styles.metricValue, { color: theme.colors.text }]}>{profile.count}</Text>
                  </View>
                  <View style={styles.profileMetric}>
                    <Text style={[styles.metricLabel, { color: theme.colors.textSecondary }]}]}>Conversion</Text>
                    <Text style={[styles.metricValue, { color: '#22C55E' }]}>{profile.conversion}</Text>
                  </View>
                </View>
              </View>
            ))}
          </View>
        </View>

        {/* Churn Risk */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Churn Risk Analysis</Text>
          <View style={[styles.churnContainer, { backgroundColor: theme.colors.background }]}>
            {churnRisk.map((item, index) => (
              <View key={index} style={styles.churnItem}>
                <View style={styles.churnHeader}>
                  <AlertTriangle size={16} color={item.riskLevel === 'high' ? '#EF4444' : item.riskLevel === 'medium' ? '#F59E0B' : '#22C55E'} />
                  <Text style={[styles.churnSegment, { color: theme.colors.text }]}>{item.segment}</Text>
                </View>
                <View style={styles.churnMetrics}>
                  <View style={styles.churnMetric}>
                    <Text style={[styles.metricLabel, { color: theme.colors.textSecondary }]}>At Risk</Text>
                    <Text style={[styles.metricValue, { color: '#EF4444' }]}>{item.atRisk}</Text>
                  </View>
                  <View style={styles.churnMetric}>
                    <Text style={[styles.metricLabel, { color: theme.colors.textSecondary }]}>Risk Level</Text>
                    <Text style={[
                      styles.metricValue, 
                      { color: item.riskLevel === 'high' ? '#EF4444' : item.riskLevel === 'medium' ? '#F59E0B' : '#22C55E' }
                    ]}>
                      {item.riskLevel}
                    </Text>
                  </View>
                  <View style={styles.churnMetric}>
                    <Text style={[styles.metricLabel, { color: theme.colors.textSecondary }]}>Reason</Text>
                    <Text style={[styles.metricValue, { color: theme.colors.textSecondary }]}>{item.reason}</Text>
                  </View>
                </View>
              </View>
            ))}
          </View>
        </View>

        {/* Lifetime Value */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Customer Lifetime Value</Text>
          <View style={[styles.ltvContainer, { backgroundColor: theme.colors.background }]}>
            {lifetimeValue.map((item, index) => (
              <View key={index} style={styles.ltvItem}>
                <Text style={[styles.ltvSegment, { color: theme.colors.text }]}>{item.segment}</Text>
                <View style={styles.ltvBars}>
                  <View style={styles.ltvBar}>
                    <Text style={[styles.ltvLabel, { color: theme.colors.textSecondary }]}>Current: {item.currentLtv}</Text>
                    <View style={styles.barContainer}>
                      <View 
                        style={[
                          styles.barFill, 
                          { backgroundColor: '#38BDF8', width: '65%' }
                        ]} 
                      />
                    </View>
                  </View>
                  <View style={styles.ltvBar}>
                    <Text style={[styles.ltvLabel, { color: theme.colors.textSecondary }]}>Potential: {item.potentialLtv}</Text>
                    <View style={styles.barContainer}>
                      <View 
                        style={[
                          styles.barFill, 
                          { backgroundColor: '#22C55E', width: '85%' }
                        ]} 
                      />
                    </View>
                  </View>
                </View>
                <View style={styles.ltvOpportunity}>
                  <Text style={[styles.opportunityLabel, { color: theme.colors.textSecondary }]}>Opportunity</Text>
                  <Text style={[styles.opportunityValue, { color: '#22C55E' }]}>{item.opportunity}</Text>
                </View>
              </View>
            ))}
          </View>
        </View>

        {/* Retention Metrics */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Retention Metrics</Text>
          <View style={[styles.retentionContainer, { backgroundColor: theme.colors.background }]}>
            {retentionMetrics.map((metric, index) => (
              <View key={index} style={styles.retentionItem}>
                <View style={styles.retentionHeader}>
                  <Repeat size={16} color="#38BDF8" />
                  <Text style={[styles.retentionMetric, { color: theme.colors.text }]}>{metric.metric}</Text>
                </View>
                <View style={styles.retentionValues}>
                  <View style={styles.retentionValue}>
                    <Text style={[styles.metricLabel, { color: theme.colors.textSecondary }]}>Value</Text>
                    <Text style={[styles.metricValue, { color: '#38BDF8' }]}>{metric.value}</Text>
                  </View>
                  <View style={styles.retentionValue}>
                    <Text style={[styles.metricLabel, { color: theme.colors.textSecondary }]}>Target</Text>
                    <Text style={[styles.metricValue, { color: theme.colors.textSecondary }]}>{metric.target}</Text>
                  </View>
                  <View style={styles.retentionValue}>
                    <Text style={[styles.metricLabel, { color: theme.colors.textSecondary }]}>Trend</Text>
                    {metric.trend === 'up' && <TrendingUp size={14} color="#22C55E" />}
                    {metric.trend === 'stable' && <Target size={14} color="#6B7280" />}
                  </View>
                </View>
              </View>
            ))}
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    marginBottom: 16,
    borderRadius: 12,
  },
  header: {
    marginBottom: 16,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  headerSubtitle: {
    fontSize: 12,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 12,
  },
  segmentsContainer: {
    padding: 16,
    borderRadius: 12,
  },
  segmentItem: {
    marginBottom: 16,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#1F2937',
  },
  segmentHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  segmentName: {
    fontSize: 14,
    fontWeight: '600',
    marginLeft: 8,
  },
  segmentMetrics: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  segmentMetric: {
    alignItems: 'center',
  },
  metricLabel: {
    fontSize: 12,
    marginBottom: 4,
  },
  metricValue: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  repeatContainer: {
    padding: 16,
    borderRadius: 12,
  },
  repeatItem: {
    marginBottom: 16,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#1F2937',
  },
  repeatCohort: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 12,
  },
  repeatMetrics: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  repeatMetric: {
    alignItems: 'center',
  },
  profilesContainer: {
    padding: 16,
    borderRadius: 12,
  },
  profileItem: {
    marginBottom: 16,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#1F2937',
  },
  profileName: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 8,
  },
  profileBehavior: {
    fontSize: 12,
    marginBottom: 12,
  },
  profileMetrics: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  profileMetric: {
    alignItems: 'center',
  },
  churnContainer: {
    padding: 16,
    borderRadius: 12,
  },
  churnItem: {
    marginBottom: 16,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#1F2937',
  },
  churnHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  churnSegment: {
    fontSize: 14,
    fontWeight: '600',
    marginLeft: 8,
  },
  churnMetrics: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  churnMetric: {
    alignItems: 'center',
  },
  ltvContainer: {
    padding: 16,
    borderRadius: 12,
  },
  ltvItem: {
    marginBottom: 16,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#1F2937',
  },
  ltvSegment: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 12,
  },
  ltvBars: {
    marginBottom: 12,
  },
  ltvBar: {
    marginBottom: 8,
  },
  ltvLabel: {
    fontSize: 12,
    marginBottom: 4,
  },
  barContainer: {
    height: 8,
    backgroundColor: '#1F2937',
    borderRadius: 4,
    overflow: 'hidden',
  },
  barFill: {
    height: '100%',
    borderRadius: 4,
  },
  ltvOpportunity: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  opportunityLabel: {
    fontSize: 12,
  },
  opportunityValue: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  retentionContainer: {
    padding: 16,
    borderRadius: 12,
  },
  retentionItem: {
    marginBottom: 16,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#1F2937',
  },
  retentionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  retentionMetric: {
    fontSize: 14,
    fontWeight: '600',
    marginLeft: 8,
  },
  retentionValues: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  retentionValue: {
    alignItems: 'center',
  },
});