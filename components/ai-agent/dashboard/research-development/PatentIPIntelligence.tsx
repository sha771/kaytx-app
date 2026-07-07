import React from 'react';
import { View, StyleSheet, Text, ScrollView } from 'react-native';
import { useTheme } from '@/providers/ThemeProvider';
import { FileText, AlertTriangle, TrendingUp, Shield, Search, CheckCircle, Clock, Globe } from 'lucide-react-native';

export default function PatentIPIntelligence() {
  const { theme } = useTheme();

  const patentMetrics = [
    {
      id: 'patent-filings',
      label: 'Patent Filings',
      value: '1,247',
      change: '+89',
      trend: 'up',
      icon: FileText,
      color: '#0B8AFF'
    },
    {
      id: 'patent-opportunities',
      label: 'Patent Opportunities',
      value: '128',
      change: '+18',
      trend: 'up',
      icon: Search,
      color: '#10B981'
    },
    {
      id: 'ip-risks',
      label: 'IP Risks',
      value: '23',
      change: '-5',
      trend: 'up',
      icon: AlertTriangle,
      color: '#EF4444'
    },
    {
      id: 'technology-ownership',
      label: 'Technology Ownership',
      value: '847',
      change: '+34',
      trend: 'up',
      icon: Shield,
      color: '#8B5CF6'
    }
  ];

  const patentOpportunities = [
    {
      id: 'pat-001',
      title: 'Quantum Error Correction Algorithm',
      category: 'Quantum Computing',
      strength: 94,
      marketPotential: '$2.4B',
      filingStatus: 'draft',
      priority: 'high'
    },
    {
      id: 'pat-002',
      title: 'Neural Network Optimization Method',
      category: 'AI/ML',
      strength: 89,
      marketPotential: '$1.8B',
      filingStatus: 'review',
      priority: 'high'
    },
    {
      id: 'pat-003',
      title: 'Advanced Battery Composition',
      category: 'Energy Storage',
      strength: 82,
      marketPotential: '$3.2B',
      filingStatus: 'research',
      priority: 'medium'
    }
  ];

  const competitorPatents = [
    { company: 'TechCorp Inc', patents: 234, growth: '+12%', color: '#EF4444' },
    { company: 'Innovation Labs', patents: 189, growth: '+18%', color: '#F59E0B' },
    { company: 'Quantum Dynamics', patents: 156, growth: '+24%', color: '#8B5CF6' },
    { company: 'BioTech Solutions', patents: 142, growth: '+8%', color: '#10B981' }
  ];

  const ipRisks = [
    { type: 'Infringement Risk', severity: 'high', count: 5, description: 'Potential patent conflicts' },
    { type: 'Freedom to Operate', severity: 'medium', count: 12, description: 'Market entry barriers' },
    { type: 'Expiration Risk', severity: 'low', count: 6, description: 'Patent term limitations' }
  ];

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.card }]}>
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <FileText size={24} color="#0B8AFF" />
          <Text style={[styles.headerTitle, { color: theme.colors.text }]}>
            Patent & IP Intelligence
          </Text>
        </View>
      </View>

      {/* Patent Metrics */}
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.metricsScroll}>
        {patentMetrics.map((metric) => {
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

      {/* Patent Opportunities */}
      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>
          Patent Opportunities
        </Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {patentOpportunities.map((patent) => (
            <View 
              key={patent.id}
              style={[
                styles.patentCard,
                { 
                  backgroundColor: theme.colors.background,
                  borderColor: patent.priority === 'high' ? '#10B981' + '30' : theme.colors.border
                }
              ]}
            >
              <View style={styles.patentHeader}>
                <Text style={[styles.patentTitle, { color: theme.colors.text }]}>
                  {patent.title}
                </Text>
                <View style={[
                  styles.priorityBadge,
                  { 
                    backgroundColor: patent.priority === 'high' ? '#10B981' + '20' : '#F59E0B' + '20'
                  }
                ]}>
                  <Text style={[
                    styles.priorityText,
                    { 
                      color: patent.priority === 'high' ? '#10B981' : '#F59E0B'
                    }
                  ]}>
                    {patent.priority}
                  </Text>
                </View>
              </View>

              <Text style={[styles.patentCategory, { color: theme.colors.textSecondary }]}>
                {patent.category}
              </Text>

              <View style={styles.patentMetrics}>
                <View style={styles.patentMetric}>
                  <Shield size={14} color="#0B8AFF" />
                  <Text style={[styles.patentMetricText, { color: theme.colors.textSecondary }]}>
                    Strength: {patent.strength}%
                  </Text>
                </View>
                <View style={styles.patentMetric}>
                  <Globe size={14} color="#10B981" />
                  <Text style={[styles.patentMetricText, { color: theme.colors.textSecondary }]}>
                    Market: {patent.marketPotential}
                  </Text>
                </View>
              </View>

              <View style={styles.filingStatus}>
                <Clock size={12} color="#8B5CF6" />
                <Text style={[styles.filingStatusText, { color: theme.colors.textSecondary }]}>
                  Status: {patent.filingStatus}
                </Text>
              </View>
            </View>
          ))}
        </ScrollView>
      </View>

      {/* Competitive Patent Analysis */}
      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>
          Competitive Patent Analysis
        </Text>
        <View style={styles.competitorGrid}>
          {competitorPatents.map((competitor) => (
            <View 
              key={competitor.company}
              style={[
                styles.competitorCard,
                { backgroundColor: theme.colors.background }
              ]}
            >
              <View style={[styles.competitorDot, { backgroundColor: competitor.color }]} />
              <Text style={[styles.competitorName, { color: theme.colors.text }]}>
                {competitor.company}
              </Text>
              <View style={styles.competitorMetrics}>
                <Text style={[styles.competitorPatents, { color: theme.colors.text }]}>
                  {competitor.patents} patents
                </Text>
                <View style={styles.growthBadge}>
                  <TrendingUp size={12} color="#22C55E" />
                  <Text style={[styles.growthText, { color: '#22C55E' }]}>
                    {competitor.growth}
                  </Text>
                </View>
              </View>
            </View>
          ))}
        </View>
      </View>

      {/* IP Risks */}
      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>
          IP Risk Assessment
        </Text>
        <View style={styles.riskGrid}>
          {ipRisks.map((risk) => (
            <View 
              key={risk.type}
              style={[
                styles.riskCard,
                { 
                  backgroundColor: risk.severity === 'high' ? '#EF4444' + '15' : 
                                 risk.severity === 'medium' ? '#F59E0B' + '15' : '#10B981' + '15',
                  borderColor: risk.severity === 'high' ? '#EF4444' + '30' : 
                               risk.severity === 'medium' ? '#F59E0B' + '30' : '#10B981' + '30'
                }
              ]}
            >
              <View style={styles.riskHeader}>
                <AlertTriangle size={16} color={risk.severity === 'high' ? '#EF4444' : risk.severity === 'medium' ? '#F59E0B' : '#10B981'} />
                <Text style={[styles.riskType, { color: theme.colors.text }]}>
                  {risk.type}
                </Text>
                <View style={[
                  styles.severityBadge,
                  { 
                    backgroundColor: risk.severity === 'high' ? '#EF4444' + '30' : 
                                   risk.severity === 'medium' ? '#F59E0B' + '30' : '#10B981' + '30'
                  }
                ]}>
                  <Text style={[
                    styles.severityText,
                    { 
                      color: risk.severity === 'high' ? '#EF4444' : 
                             risk.severity === 'medium' ? '#F59E0B' : '#10B981'
                    }
                  ]}>
                    {risk.severity}
                  </Text>
                </View>
              </View>
              <Text style={[styles.riskDescription, { color: theme.colors.textSecondary }]}>
                {risk.description}
              </Text>
              <Text style={[styles.riskCount, { color: theme.colors.text }]}>
                {risk.count} items
              </Text>
            </View>
          ))}
        </View>
      </View>

      {/* Innovation White Space */}
      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>
          Innovation White Space Mapping
        </Text>
        <View style={styles.whitespaceContainer}>
          <View style={styles.whitespaceGrid}>
            {['Quantum AI', 'Bio-Informatics', 'Neuromorphic', 'Green Tech', 'Space Tech', 'Nano-Materials'].map((area, index) => (
              <View 
                key={area}
                style={[
                  styles.whitespaceCell,
                  { 
                    backgroundColor: index % 2 === 0 ? '#0B8AFF' + '20' : '#8B5CF6' + '20',
                    borderColor: index % 2 === 0 ? '#0B8AFF' + '40' : '#8B5CF6' + '40'
                  }
                ]}
              >
                <Text style={[styles.whitespaceText, { color: theme.colors.text }]}>
                  {area}
                </Text>
                <CheckCircle size={12} color={index % 2 === 0 ? '#0B8AFF' : '#8B5CF6'} />
              </View>
            ))}
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
  patentCard: {
    width: 280,
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    marginRight: 12,
  },
  patentHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  patentTitle: {
    fontSize: 13,
    fontWeight: '600',
    flex: 1,
    marginRight: 8,
  },
  priorityBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  priorityText: {
    fontSize: 10,
    fontWeight: '600',
  },
  patentCategory: {
    fontSize: 11,
    marginBottom: 12,
  },
  patentMetrics: {
    flexDirection: 'row',
    marginBottom: 12,
  },
  patentMetric: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 16,
  },
  patentMetricText: {
    fontSize: 10,
    marginLeft: 6,
  },
  filingStatus: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  filingStatusText: {
    fontSize: 10,
    marginLeft: 6,
  },
  competitorGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  competitorCard: {
    width: '48%',
    marginRight: '2%',
    marginBottom: 12,
    padding: 14,
    borderRadius: 8,
  },
  competitorDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginBottom: 8,
  },
  competitorName: {
    fontSize: 13,
    fontWeight: '600',
    marginBottom: 8,
  },
  competitorMetrics: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  competitorPatents: {
    fontSize: 14,
    fontWeight: '600',
  },
  growthBadge: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  growthText: {
    fontSize: 11,
    fontWeight: '600',
    marginLeft: 4,
  },
  riskGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  riskCard: {
    width: '31%',
    marginRight: '2%',
    marginBottom: 12,
    padding: 14,
    borderRadius: 10,
    borderWidth: 1,
  },
  riskHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  riskType: {
    fontSize: 12,
    fontWeight: '600',
    flex: 1,
    marginLeft: 8,
  },
  severityBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  severityText: {
    fontSize: 10,
    fontWeight: '600',
  },
  riskDescription: {
    fontSize: 10,
    marginBottom: 8,
  },
  riskCount: {
    fontSize: 14,
    fontWeight: '700',
  },
  whitespaceContainer: {
    marginTop: 8,
  },
  whitespaceGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  whitespaceCell: {
    width: '31%',
    marginRight: '2%',
    marginBottom: 12,
    padding: 12,
    borderRadius: 8,
    borderWidth: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  whitespaceText: {
    fontSize: 11,
    fontWeight: '500',
  },
});