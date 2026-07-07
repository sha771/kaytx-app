import React from 'react';
import { View, StyleSheet, Text, ScrollView } from 'react-native';
import { useTheme } from '@/providers/ThemeProvider';
import { TrendingUp, Building2, FileText, DollarSign, Zap, AlertCircle, Target, Globe, Award } from 'lucide-react-native';

export default function CompetitiveResearchCenter() {
  const { theme } = useTheme();

  const competitiveMetrics = [
    {
      id: 'competitors',
      label: 'Competitors Tracked',
      value: '147',
      change: '+12',
      trend: 'up',
      icon: Building2,
      color: '#0B8AFF'
    },
    {
      id: 'innovations',
      label: 'Innovations Detected',
      value: '2,847',
      change: '+234',
      trend: 'up',
      icon: Zap,
      color: '#10B981'
    },
    {
      id: 'patents',
      label: 'Patent Activity',
      value: '1,247',
      change: '+89',
      trend: 'up',
      icon: FileText,
      color: '#8B5CF6'
    },
    {
      id: 'investments',
      label: 'Research Investments',
      value: '$4.2B',
      change: '+$340M',
      trend: 'up',
      icon: DollarSign,
      color: '#F59E0B'
    }
  ];

  const competitorInnovations = [
    {
      id: 'comp-001',
      company: 'TechCorp Inc',
      innovation: 'Quantum Encryption Breakthrough',
      category: 'Security',
      impact: 'High',
      timeline: '2 months ago',
      ourResponse: 'Under evaluation'
    },
    {
      id: 'comp-002',
      company: 'Innovation Labs',
      innovation: 'Neural Network Compression',
      category: 'AI/ML',
      impact: 'Very High',
      timeline: '1 month ago',
      ourResponse: 'Research initiated'
    },
    {
      id: 'comp-003',
      company: 'Quantum Dynamics',
      innovation: 'Quantum Sensor Array',
      category: 'Hardware',
      impact: 'Medium',
      timeline: '3 months ago',
      ourResponse: 'Monitoring'
    }
  ];

  const marketDisruptionRadar = [
    { area: 'AI & Machine Learning', threatLevel: 85, trend: 'increasing', color: '#EF4444' },
    { area: 'Quantum Computing', threatLevel: 72, trend: 'stable', color: '#F59E0B' },
    { area: 'Biotechnology', threatLevel: 68, trend: 'increasing', color: '#8B5CF6' },
    { area: 'Clean Energy', threatLevel: 54, trend: 'decreasing', color: '#10B981' },
    { area: 'Robotics', threatLevel: 61, trend: 'stable', color: '#0B8AFF' }
  ];

  const competitiveIntelligence = [
    { company: 'TechCorp Inc', marketShare: 24, innovationScore: 92, investment: '$1.2B', color: '#EF4444' },
    { company: 'Innovation Labs', marketShare: 18, innovationScore: 88, investment: '$890M', color: '#F59E0B' },
    { company: 'Quantum Dynamics', marketShare: 15, innovationScore: 85, investment: '$670M', color: '#8B5CF6' },
    { company: 'BioTech Solutions', marketShare: 12, innovationScore: 81, investment: '$540M', color: '#10B981' }
  ];

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.card }]}>
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <Target size={24} color="#0B8AFF" />
          <Text style={[styles.headerTitle, { color: theme.colors.text }]}>
            Competitive Research Center
          </Text>
        </View>
      </View>

      {/* Competitive Metrics */}
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.metricsScroll}>
        {competitiveMetrics.map((metric) => {
          const Icon = metric.icon;
          return (
            <View 
              key={metric.id}
              style={[
                styles.metricCard,
                { 
                  backgroundColor: metric.color + '15',
                  borderColor: metric.color + '30'
                }
              ]}
            >
              <View style={[styles.iconContainer, { backgroundColor: metric.color + '25' }]}>
                <Icon size={20} color={metric.color} />
              </View>
              <Text style={[styles.metricLabel, { color: theme.colors.textSecondary }]}>
                {metric.label}
              </Text>
              <Text style={[styles.metricValue, { color: theme.colors.text }]}>
                {metric.value}
              </Text>
              <View style={styles.metricChange}>
                <TrendingUp size={12} color="#22C55E" />
                <Text style={[styles.metricChangeText, { color: '#22C55E' }]}>
                  {metric.change}
                </Text>
              </View>
            </View>
          );
        })}
      </ScrollView>

      {/* Competitor Innovations */}
      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>
          Competitor Innovations
        </Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {competitorInnovations.map((innovation) => (
            <View 
              key={innovation.id}
              style={[
                styles.innovationCard,
                { 
                  backgroundColor: theme.colors.background,
                  borderColor: innovation.impact === 'Very High' ? '#EF4444' + '30' : theme.colors.border
                }
              ]}
            >
              <View style={styles.innovationHeader}>
                <View style={styles.companyInfo}>
                  <Building2 size={16} color="#0B8AFF" />
                  <Text style={[styles.companyName, { color: theme.colors.text }]}>
                    {innovation.company}
                  </Text>
                </View>
                <View style={[
                  styles.impactBadge,
                  { 
                    backgroundColor: innovation.impact === 'Very High' ? '#EF4444' + '20' : 
                                   innovation.impact === 'High' ? '#F59E0B' + '20' : '#10B981' + '20'
                  }
                ]}>
                  <AlertCircle size={10} color={innovation.impact === 'Very High' ? '#EF4444' : innovation.impact === 'High' ? '#F59E0B' : '#10B981'} />
                  <Text style={[
                    styles.impactText,
                    { 
                      color: innovation.impact === 'Very High' ? '#EF4444' : 
                             innovation.impact === 'High' ? '#F59E0B' : '#10B981'
                    }
                  ]}>
                    {innovation.impact}
                  </Text>
                </View>
              </View>

              <Text style={[styles.innovationTitle, { color: theme.colors.text }]}>
                {innovation.innovation}
              </Text>

              <View style={styles.innovationDetails}>
                <View style={styles.innovationDetail}>
                  <FileText size={12} color="#8B5CF6" />
                  <Text style={[styles.innovationDetailText, { color: theme.colors.textSecondary }]}>
                    {innovation.category}
                  </Text>
                </View>
                <View style={styles.innovationDetail}>
                  <Globe size={12} color="#06B6D4" />
                  <Text style={[styles.innovationDetailText, { color: theme.colors.textSecondary }]}>
                    {innovation.timeline}
                  </Text>
                </View>
              </View>

              <View style={styles.responseSection}>
                <Award size={12} color="#10B981" />
                <Text style={[styles.responseText, { color: theme.colors.textSecondary }]}>
                  Our Response: {innovation.ourResponse}
                </Text>
              </View>
            </View>
          ))}
        </ScrollView>
      </View>

      {/* Market Disruption Radar */}
      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>
          Market Disruption Radar
        </Text>
        <View style={styles.disruptionGrid}>
          {marketDisruptionRadar.map((area) => (
            <View 
              key={area.area}
              style={[
                styles.disruptionCard,
                { backgroundColor: theme.colors.background }
              ]}
            >
              <View style={styles.disruptionHeader}>
                <Text style={[styles.disruptionArea, { color: theme.colors.text }]}>
                  {area.area}
                </Text>
                <View style={[
                  styles.trendBadge,
                  { 
                    backgroundColor: area.trend === 'increasing' ? '#EF4444' + '20' : 
                                   area.trend === 'decreasing' ? '#10B981' + '20' : '#F59E0B' + '20'
                  }
                ]}>
                  <TrendingUp size={10} color={area.trend === 'increasing' ? '#EF4444' : area.trend === 'decreasing' ? '#10B981' : '#F59E0B'} />
                  <Text style={[
                    styles.trendText,
                    { 
                      color: area.trend === 'increasing' ? '#EF4444' : 
                             area.trend === 'decreasing' ? '#10B981' : '#F59E0B'
                    }
                  ]}>
                    {area.trend}
                  </Text>
                </View>
              </View>
              <View style={styles.threatSection}>
                <Text style={[styles.threatLabel, { color: theme.colors.textSecondary }]}>
                  Threat Level
                </Text>
                <Text style={[styles.threatValue, { color: area.color }]}>
                  {area.threatLevel}%
                </Text>
                <View style={[styles.threatBar, { backgroundColor: theme.colors.border }]}>
                  <View 
                    style={[
                      styles.threatFill,
                      { 
                        backgroundColor: area.color,
                        width: `${area.threatLevel}%`
                      }
                    ]} 
                  />
                </View>
              </View>
            </View>
          ))}
        </View>
      </View>

      {/* Competitive Intelligence Matrix */}
      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>
          Competitive Intelligence Matrix
        </Text>
        <View style={styles.intelligenceGrid}>
          {competitiveIntelligence.map((company) => (
            <View 
              key={company.company}
              style={[
                styles.intelligenceCard,
                { backgroundColor: theme.colors.background }
              ]}
            >
              <View style={[styles.companyDot, { backgroundColor: company.color }]} />
              <Text style={[styles.intelligenceCompany, { color: theme.colors.text }]}>
                {company.company}
              </Text>
              <View style={styles.intelligenceMetrics}>
                <View style={styles.intelligenceMetric}>
                  <Text style={[styles.metricLabel, { color: theme.colors.textSecondary }]}>
                    Market Share
                  </Text>
                  <Text style={[styles.metricValue, { color: theme.colors.text }]}>
                    {company.marketShare}%
                  </Text>
                </View>
                <View style={styles.intelligenceMetric}>
                  <Text style={[styles.metricLabel, { color: theme.colors.textSecondary }]}>
                    Innovation Score
                  </Text>
                  <Text style={[styles.metricValue, { color: theme.colors.text }]}>
                    {company.innovationScore}
                  </Text>
                </View>
                <View style={styles.intelligenceMetric}>
                  <Text style={[styles.metricLabel, { color: theme.colors.textSecondary }]}>
                    Investment
                  </Text>
                  <Text style={[styles.metricValue, { color: theme.colors.text }]}>
                    {company.investment}
                  </Text>
                </View>
              </View>
            </View>
          ))}
        </View>
      </View>

      {/* Innovation Benchmarking */}
      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>
          Innovation Benchmarking
        </Text>
        <View style={styles.benchmarkingContainer}>
          <View style={styles.benchmarkingRow}>
            <Text style={[styles.benchmarkLabel, { color: theme.colors.textSecondary }]}>
              Our Innovation Score
            </Text>
            <Text style={[styles.benchmarkValue, { color: '#0B8AFF' }]}>
              94
            </Text>
            <View style={[styles.benchmarkBar, { backgroundColor: theme.colors.border }]}>
              <View style={[styles.benchmarkFill, { backgroundColor: '#0B8AFF', width: '94%' }]} />
            </View>
          </View>
          <View style={styles.benchmarkingRow}>
            <Text style={[styles.benchmarkLabel, { color: theme.colors.textSecondary }]}>
              Industry Average
            </Text>
            <Text style={[styles.benchmarkValue, { color: '#8B5CF6' }]}>
              78
            </Text>
            <View style={[styles.benchmarkBar, { backgroundColor: theme.colors.border }]}>
              <View style={[styles.benchmarkFill, { backgroundColor: '#8B5CF6', width: '78%' }]} />
            </View>
          </View>
          <View style={styles.benchmarkingRow}>
            <Text style={[styles.benchmarkLabel, { color: theme.colors.textSecondary }]}>
              Top Competitor
            </Text>
            <Text style={[styles.benchmarkValue, { color: '#10B981' }]}>
              92
            </Text>
            <View style={[styles.benchmarkBar, { backgroundColor: theme.colors.border }]}>
              <View style={[styles.benchmarkFill, { backgroundColor: '#10B981', width: '92%' }]} />
            </View>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    margin: 16,
    borderRadius: 16,
    padding: 20,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '700',
    marginLeft: 12,
  },
  metricsScroll: {
    marginBottom: 20,
  },
  metricCard: {
    width: 140,
    padding: 14,
    borderRadius: 12,
    borderWidth: 1,
    marginRight: 12,
  },
  iconContainer: {
    width: 36,
    height: 36,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  metricLabel: {
    fontSize: 10,
    fontWeight: '500',
    marginBottom: 6,
    textTransform: 'uppercase',
  },
  metricValue: {
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 8,
  },
  metricChange: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  metricChangeText: {
    fontSize: 11,
    fontWeight: '600',
    marginLeft: 4,
  },
  section: {
    marginTop: 20,
    paddingTop: 20,
    borderTopWidth: 1,
    borderTopColor: 'rgba(255,255,255,0.1)',
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 16,
  },
  innovationCard: {
    width: 300,
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    marginRight: 12,
  },
  innovationHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  companyInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  companyName: {
    fontSize: 13,
    fontWeight: '600',
    marginLeft: 8,
  },
  impactBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  impactText: {
    fontSize: 10,
    fontWeight: '600',
    marginLeft: 4,
  },
  innovationTitle: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 12,
  },
  innovationDetails: {
    flexDirection: 'row',
    marginBottom: 12,
  },
  innovationDetail: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 16,
  },
  innovationDetailText: {
    fontSize: 10,
    marginLeft: 6,
  },
  responseSection: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  responseText: {
    fontSize: 10,
    marginLeft: 6,
  },
  disruptionGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  disruptionCard: {
    width: '31%',
    marginRight: '2%',
    marginBottom: 12,
    padding: 14,
    borderRadius: 10,
  },
  disruptionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  disruptionArea: {
    fontSize: 12,
    fontWeight: '600',
    flex: 1,
  },
  trendBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 6,
    paddingVertical: 3,
    borderRadius: 8,
  },
  trendText: {
    fontSize: 9,
    fontWeight: '600',
    marginLeft: 3,
  },
  threatSection: {
    marginTop: 8,
  },
  threatLabel: {
    fontSize: 10,
    marginBottom: 4,
  },
  threatValue: {
    fontSize: 16,
    fontWeight: '700',
    marginBottom: 6,
  },
  threatBar: {
    height: 6,
    borderRadius: 3,
    overflow: 'hidden',
  },
  threatFill: {
    height: '100%',
    borderRadius: 3,
  },
  intelligenceGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  intelligenceCard: {
    width: '48%',
    marginRight: '2%',
    marginBottom: 12,
    padding: 14,
    borderRadius: 10,
  },
  companyDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginBottom: 8,
  },
  intelligenceCompany: {
    fontSize: 13,
    fontWeight: '600',
    marginBottom: 12,
  },
  intelligenceMetrics: {
    gap: 8,
  },
  intelligenceMetric: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  metricLabel: {
    fontSize: 10,
  },
  metricValue: {
    fontSize: 12,
    fontWeight: '600',
  },
  benchmarkingContainer: {
    marginTop: 8,
  },
  benchmarkingRow: {
    marginBottom: 16,
  },
  benchmarkLabel: {
    fontSize: 12,
    marginBottom: 6,
  },
  benchmarkValue: {
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 6,
  },
  benchmarkBar: {
    height: 8,
    borderRadius: 4,
    overflow: 'hidden',
  },
  benchmarkFill: {
    height: '100%',
    borderRadius: 4,
  },
});