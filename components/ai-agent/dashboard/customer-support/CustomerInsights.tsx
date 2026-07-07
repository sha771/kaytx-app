import React from 'react';
import { View, StyleSheet, Text, ScrollView } from 'react-native';
import { useTheme } from '@/providers/ThemeProvider';

interface InsightItem {
  category: string;
  value: string;
  trend: 'up' | 'down' | 'stable';
  color: string;
}

interface TrendingIssue {
  issue: string;
  count: number;
  change: string;
  severity: 'high' | 'medium' | 'low';
}

interface CustomerSegment {
  name: string;
  count: number;
  satisfaction: number;
  churnRisk: number;
}

interface CustomerInsightsProps {
  topIssues: InsightItem[];
  trendingProblems: TrendingIssue[];
  segments: CustomerSegment[];
}

export default function CustomerInsights({ topIssues, trendingProblems, segments }: CustomerInsightsProps) {
  const { theme } = useTheme();

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'high': return '#EF4444';
      case 'medium': return '#F59E0B';
      case 'low': return '#10B981';
      default: return '#6B7280';
    }
  };

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'up': return '↑';
      case 'down': return '↓';
      case 'stable': return '→';
      default: return '';
    }
  };

  return (
    <View style={[styles.container, { backgroundColor: 'rgba(11, 15, 20, 0.8)', borderColor: 'rgba(16, 185, 129, 0.2)', borderWidth: 1 }]}>
      <Text style={[styles.title, { color: '#10B981' }]}>
        Customer Insights
      </Text>

      {/* Top Issues */}
      <View style={[styles.section, { backgroundColor: 'rgba(11, 15, 20, 0.6)', borderColor: 'rgba(16, 185, 129, 0.2)', borderWidth: 1 }]}>
        <Text style={[styles.sectionTitle, { color: '#FFFFFF' }]}>
          Top Issues
        </Text>
        <View style={styles.issuesGrid}>
          {topIssues.map((issue, index) => (
            <View key={index} style={styles.issueItem}>
              <Text style={[styles.issueCategory, { color: 'rgba(255, 255, 255, 0.5)' }]}>
                {issue.category}
              </Text>
              <Text style={[styles.issueValue, { color: issue.color }]}>
                {issue.value}
              </Text>
              <Text style={[styles.issueTrend, { color: 'rgba(255, 255, 255, 0.5)' }]}>
                {getTrendIcon(issue.trend)} vs last week
              </Text>
            </View>
          ))}
        </View>
      </View>

      {/* Trending Problems */}
      <View style={[styles.section, { backgroundColor: 'rgba(11, 15, 20, 0.6)', borderColor: 'rgba(16, 185, 129, 0.2)', borderWidth: 1 }]}>
        <Text style={[styles.sectionTitle, { color: '#FFFFFF' }]}>
          Trending Problems
        </Text>
        <ScrollView style={styles.problemsScroll} showsVerticalScrollIndicator={false}>
          {trendingProblems.map((problem, index) => (
            <View key={index} style={styles.problemItem}>
              <View style={styles.problemInfo}>
                <Text style={[styles.problemText, { color: '#FFFFFF' }]} numberOfLines={2}>
                  {problem.issue}
                </Text>
                <Text style={[styles.problemCount, { color: 'rgba(255, 255, 255, 0.5)' }]}>
                  {problem.count} reports
                </Text>
              </View>
              <View style={styles.problemMeta}>
                <View style={[
                  styles.severityBadge, 
                  { backgroundColor: `${getSeverityColor(problem.severity)}20`, borderColor: `${getSeverityColor(problem.severity)}40`, borderWidth: 1 }
                ]}>
                  <Text style={[styles.severityText, { color: getSeverityColor(problem.severity) }]}>
                    {problem.severity}
                  </Text>
                </View>
                <Text style={[styles.problemChange, { color: problem.change.startsWith('+') ? '#EF4444' : '#10B981' }]}>
                  {problem.change}
                </Text>
              </View>
            </View>
          ))}
        </ScrollView>
      </View>

      {/* Customer Segments */}
      <View style={[styles.section, { backgroundColor: 'rgba(11, 15, 20, 0.6)', borderColor: 'rgba(16, 185, 129, 0.2)', borderWidth: 1 }]}>
        <Text style={[styles.sectionTitle, { color: '#FFFFFF' }]}>
          Customer Segments
        </Text>
        <ScrollView style={styles.segmentsScroll} showsVerticalScrollIndicator={false}>
          {segments.map((segment, index) => (
            <View key={index} style={styles.segmentItem}>
              <View style={styles.segmentInfo}>
                <Text style={[styles.segmentName, { color: '#FFFFFF' }]}>
                  {segment.name}
                </Text>
                <Text style={[styles.segmentCount, { color: 'rgba(255, 255, 255, 0.5)' }]}>
                  {segment.count} customers
                </Text>
              </View>
              <View style={styles.segmentMetrics}>
                <View style={styles.segmentMetric}>
                  <Text style={[styles.metricLabel, { color: 'rgba(255, 255, 255, 0.5)' }]}>
                    Satisfaction
                  </Text>
                  <Text style={[styles.metricValue, { color: '#10B981' }]}>
                    {segment.satisfaction}/5
                  </Text>
                </View>
                <View style={styles.segmentMetric}>
                  <Text style={[styles.metricLabel, { color: 'rgba(255, 255, 255, 0.5)' }]}>
                    Churn Risk
                  </Text>
                  <Text style={[
                    styles.metricValue, 
                    { color: segment.churnRisk > 30 ? '#EF4444' : segment.churnRisk > 15 ? '#F59E0B' : '#10B981' }
                  ]}>
                    {segment.churnRisk}%
                  </Text>
                </View>
              </View>
            </View>
          ))}
        </ScrollView>
      </View>

      {/* Churn Risk Alert */}
      <View style={[styles.alertSection, { backgroundColor: 'rgba(239, 68, 68, 0.1)', borderColor: '#EF4444' }]}>
        <Text style={[styles.alertTitle, { color: '#EF4444' }]}>
          ⚠️ High Churn Risk
        </Text>
        <Text style={[styles.alertText, { color: 'rgba(255, 255, 255, 0.8)' }]}>
          {segments.filter(s => s.churnRisk > 30).length} segments at risk • 23 customers need attention
        </Text>
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
    maxHeight: 180,
  },
  sectionTitle: {
    fontSize: 15,
    fontWeight: '600',
    marginBottom: 12,
  },
  issuesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  issueItem: {
    width: '48%',
    padding: 12,
    borderRadius: 8,
    backgroundColor: 'rgba(11, 15, 20, 0.4)',
  },
  issueCategory: {
    fontSize: 10,
    marginBottom: 4,
  },
  issueValue: {
    fontSize: 16,
    fontWeight: '700',
    marginBottom: 4,
  },
  issueTrend: {
    fontSize: 10,
  },
  problemsScroll: {
    flex: 1,
  },
  problemItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
    paddingBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255,255,255,0.1)',
  },
  problemInfo: {
    flex: 1,
    marginRight: 12,
  },
  problemText: {
    fontSize: 12,
    fontWeight: '500',
    marginBottom: 4,
  },
  problemCount: {
    fontSize: 10,
  },
  problemMeta: {
    alignItems: 'flex-end',
  },
  severityBadge: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 12,
    marginBottom: 4,
  },
  severityText: {
    fontSize: 10,
    fontWeight: '600',
    textTransform: 'capitalize',
  },
  problemChange: {
    fontSize: 11,
    fontWeight: '500',
  },
  segmentsScroll: {
    flex: 1,
  },
  segmentItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
    paddingBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255,255,255,0.1)',
  },
  segmentInfo: {
    flex: 1,
  },
  segmentName: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 4,
  },
  segmentCount: {
    fontSize: 11,
  },
  segmentMetrics: {
    flexDirection: 'row',
    gap: 16,
  },
  segmentMetric: {
    alignItems: 'flex-end',
  },
  metricLabel: {
    fontSize: 9,
    marginBottom: 2,
  },
  metricValue: {
    fontSize: 13,
    fontWeight: '700',
  },
  alertSection: {
    padding: 14,
    borderRadius: 12,
    borderWidth: 1,
  },
  alertTitle: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 4,
  },
  alertText: {
    fontSize: 12,
  },
});