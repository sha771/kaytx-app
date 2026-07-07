import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import {
  Shield,
  Target,
  TrendingUp,
  Award,
  CheckCircle2,
  AlertTriangle,
  BarChart3,
  Calendar,
  Users,
  Briefcase,
  ArrowUpRight,
  ArrowDownRight,
  ChevronRight,
  Activity,
  Zap,
  Globe,
  Building2,
  Layers,
  FileText,
  DollarSign,
} from 'lucide-react-native';

interface PMOCommandCenterProps {
  data?: {
    initiatives: any[];
    portfolioHealth: any;
    strategicAlignment: any;
    benefitsRealization: any;
  };
}

export default function PMOCommandCenter({ data }: PMOCommandCenterProps) {
  // Mock data for PMO Command Center
  const initiatives = [
    { id: 1, name: 'Digital Transformation 2025', status: 'On Track', progress: 75, budget: '$12M', sponsor: 'CEO', strategicPriority: 'High' },
    { id: 2, name: 'Cloud Migration Program', status: 'At Risk', progress: 45, budget: '$8M', sponsor: 'CTO', strategicPriority: 'Critical' },
    { id: 3, name: 'AI/ML Platform Initiative', status: 'On Track', progress: 60, budget: '$6M', sponsor: 'CDO', strategicPriority: 'High' },
    { id: 4, name: 'Customer Experience Overhaul', status: 'On Track', progress: 82, budget: '$4M', sponsor: 'CMO', strategicPriority: 'Medium' },
    { id: 5, name: 'Security Enhancement Program', status: 'Delayed', progress: 30, budget: '$5M', sponsor: 'CISO', strategicPriority: 'Critical' },
  ];

  const portfolioHealth = {
    totalInitiatives: 42,
    onTrack: 28,
    atRisk: 8,
    delayed: 6,
    totalBudget: '$84M',
    spentBudget: '$52M',
    projectedSpend: '$78M',
    roi: 142,
  };

  const strategicAlignment = {
    fullyAligned: 18,
    partiallyAligned: 16,
    misaligned: 8,
    alignmentScore: 76,
  };

  const benefitsRealization = {
    totalBenefits: '$42M',
    realizedBenefits: '$28M',
    pendingBenefits: '$14M',
    realizationRate: 67,
    projectedAnnual: '$18M',
  };

  const renderInitiativeCard = (initiative: any, index: number) => (
    <View key={initiative.id} style={[styles.initiativeCard, { backgroundColor: 'rgba(16, 185, 129, 0.08)', borderColor: 'rgba(16, 185, 129, 0.3)' }]}>
      <View style={styles.initiativeHeader}>
        <View style={styles.initiativeInfo}>
          <Text style={[styles.initiativeName, { color: '#FFFFFF' }]}>{initiative.name}</Text>
          <Text style={[styles.initiativeSponsor, { color: 'rgba(255, 255, 255, 0.6)' }]}>Sponsor: {initiative.sponsor}</Text>
        </View>
        <View style={[
          styles.statusBadge,
          { 
            backgroundColor: initiative.status === 'On Track' ? 'rgba(16, 185, 129, 0.2)' : 
                           initiative.status === 'At Risk' ? 'rgba(245, 158, 11, 0.2)' : 
                           'rgba(239, 68, 68, 0.2)',
            borderColor: initiative.status === 'On Track' ? 'rgba(16, 185, 129, 0.5)' : 
                         initiative.status === 'At Risk' ? 'rgba(245, 158, 11, 0.5)' : 
                         'rgba(239, 68, 68, 0.5)'
          }
        ]}>
          <Text style={[
            styles.statusText,
            { color: initiative.status === 'On Track' ? '#10B981' : 
                   initiative.status === 'At Risk' ? '#F59E0B' : 
                   '#EF4444' }
          ]}>{initiative.status}</Text>
        </View>
      </View>

      <View style={styles.progressSection}>
        <View style={styles.progressHeader}>
          <Text style={[styles.progressLabel, { color: 'rgba(255, 255, 255, 0.7)' }]}>Progress</Text>
          <Text style={[styles.progressValue, { color: '#FFFFFF' }]}>{initiative.progress}%</Text>
        </View>
        <View style={styles.progressBar}>
          <View style={[
            styles.progressFill,
            { 
              width: `${initiative.progress}%`,
              backgroundColor: initiative.status === 'On Track' ? '#10B981' : 
                             initiative.status === 'At Risk' ? '#F59E0B' : 
                             '#EF4444'
            }
          ]} />
        </View>
      </View>

      <View style={styles.initiativeMetrics}>
        <View style={styles.metricItem}>
          <Briefcase size={16} color="rgba(255, 255, 255, 0.5)" />
          <Text style={[styles.metricText, { color: 'rgba(255, 255, 255, 0.7)' }]}>{initiative.budget}</Text>
        </View>
        <View style={[
          styles.priorityBadge,
          { 
            backgroundColor: initiative.strategicPriority === 'Critical' ? 'rgba(239, 68, 68, 0.2)' : 
                               initiative.strategicPriority === 'High' ? 'rgba(245, 158, 11, 0.2)' : 
                               'rgba(59, 130, 246, 0.2)',
            borderColor: initiative.strategicPriority === 'Critical' ? 'rgba(239, 68, 68, 0.4)' : 
                         initiative.strategicPriority === 'High' ? 'rgba(245, 158, 11, 0.4)' : 
                         'rgba(59, 130, 246, 0.4)'
          }
        ]}>
          <Target size={14} color={initiative.strategicPriority === 'Critical' ? '#EF4444' : 
                                    initiative.strategicPriority === 'High' ? '#F59E0B' : 
                                    '#3B82F6'} />
          <Text style={[
            styles.priorityText,
            { color: initiative.strategicPriority === 'Critical' ? '#EF4444' : 
                   initiative.strategicPriority === 'High' ? '#F59E0B' : 
                   '#3B82F6' }
          ]}>{initiative.strategicPriority}</Text>
        </View>
      </View>
    </View>
  );

  const renderHealthCard = (label: string, value: string | number, icon: any, color: string, trend?: string) => (
    <View style={[styles.healthCard, { backgroundColor: 'rgba(16, 185, 129, 0.08)', borderColor: 'rgba(16, 185, 129, 0.3)' }]}>
      <View style={[styles.healthIcon, { backgroundColor: `${color}20` }]}>
        <icon size={24} color={color} />
      </View>
      <Text style={[styles.healthValue, { color: '#FFFFFF' }]}>{value}</Text>
      <Text style={[styles.healthLabel, { color: 'rgba(255, 255, 255, 0.6)' }]}>{label}</Text>
      {trend && (
        <View style={styles.healthTrend}>
          <TrendingUp size={12} color="#10B981" />
          <Text style={[styles.healthTrendText, { color: '#10B981' }]}>{trend}</Text>
        </View>
      )}
    </View>
  );

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View style={[styles.headerIcon, { backgroundColor: 'rgba(16, 185, 129, 0.2)' }]}>
          <Shield size={28} color="#10B981" />
        </View>
        <View style={styles.headerContent}>
          <Text style={[styles.headerTitle, { color: '#FFFFFF' }]}>PMO Command Center</Text>
          <Text style={[styles.headerSubtitle, { color: 'rgba(255, 255, 255, 0.6)' }]}>
            Program Governance • Strategic Alignment • Portfolio Health
          </Text>
        </View>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Portfolio Health Overview */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: '#FFFFFF' }]}>Portfolio Health Overview</Text>
          <View style={styles.healthGrid}>
            {renderHealthCard('Total Initiatives', portfolioHealth.totalInitiatives, Layers, '#3B82F6')}
            {renderHealthCard('On Track', portfolioHealth.onTrack, CheckCircle2, '#10B981', '+12%')}
            {renderHealthCard('At Risk', portfolioHealth.atRisk, AlertTriangle, '#F59E0B', '-5%')}
            {renderHealthCard('Delayed', portfolioHealth.delayed, Activity, '#EF4444', '-8%')}
            {renderHealthCard('Total Budget', portfolioHealth.totalBudget, DollarSign, '#8B5CF6')}
            {renderHealthCard('Budget Spent', portfolioHealth.spentBudget, BarChart3, '#06B6D4')}
            {renderHealthCard('ROI', `${portfolioHealth.roi}%`, TrendingUp, '#10B981', '+18%')}
            {renderHealthCard('Realization Rate', `${portfolioHealth.benefitsRealization.realizationRate}%`, Award, '#8B5CF6')}
          </View>
        </View>

        {/* Strategic Initiatives */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={[styles.sectionTitle, { color: '#FFFFFF' }]}>Strategic Initiatives</Text>
            <TouchableOpacity>
              <Text style={[styles.seeAllText, { color: '#10B981' }]}>View All →</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.initiativesList}>
            {initiatives.map((initiative, index) => renderInitiativeCard(initiative, index))}
          </View>
        </View>

        {/* Strategic Alignment */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: '#FFFFFF' }]}>Strategic Alignment</Text>
          <View style={[styles.alignmentCard, { backgroundColor: 'rgba(16, 185, 129, 0.08)', borderColor: 'rgba(16, 185, 129, 0.3)' }]}>
            <View style={styles.alignmentHeader}>
              <Text style={[styles.alignmentScore, { color: '#10B981' }]}>{strategicAlignment.alignmentScore}%</Text>
              <Text style={[styles.alignmentLabel, { color: 'rgba(255, 255, 255, 0.6)' }]}>Alignment Score</Text>
            </View>
            <View style={styles.alignmentBreakdown}>
              <View style={styles.alignmentBar}>
                <View style={[styles.alignmentSegment, { backgroundColor: '#10B981', width: `${(strategicAlignment.fullyAligned / 42) * 100}%` }]} />
                <View style={[styles.alignmentSegment, { backgroundColor: '#F59E0B', width: `${(strategicAlignment.partiallyAligned / 42) * 100}%` }]} />
                <View style={[styles.alignmentSegment, { backgroundColor: '#EF4444', width: `${(strategicAlignment.misaligned / 42) * 100}%` }]} />
              </View>
              <View style={styles.alignmentLegend}>
                <View style={styles.legendItem}>
                  <View style={[styles.legendDot, { backgroundColor: '#10B981' }]} />
                  <Text style={[styles.legendText, { color: 'rgba(255, 255, 255, 0.7)' }]}>Fully Aligned ({strategicAlignment.fullyAligned})</Text>
                </View>
                <View style={styles.legendItem}>
                  <View style={[styles.legendDot, { backgroundColor: '#F59E0B' }]} />
                  <Text style={[styles.legendText, { color: 'rgba(255, 255, 255, 0.7)' }]}>Partially Aligned ({strategicAlignment.partiallyAligned})</Text>
                </View>
                <View style={styles.legendItem}>
                  <View style={[styles.legendDot, { backgroundColor: '#EF4444' }]} />
                  <Text style={[styles.legendText, { color: 'rgba(255, 255, 255, 0.7)' }]}>Misaligned ({strategicAlignment.misaligned})</Text>
                </View>
              </View>
            </View>
          </View>
        </View>

        {/* Benefits Realization */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: '#FFFFFF' }]}>Benefits Realization</Text>
          <View style={styles.benefitsGrid}>
            <View style={[styles.benefitCard, { backgroundColor: 'rgba(16, 185, 129, 0.08)', borderColor: 'rgba(16, 185, 129, 0.3)' }]}>
              <View style={[styles.benefitIcon, { backgroundColor: 'rgba(16, 185, 129, 0.2)' }]}>
                <Award size={24} color="#10B981" />
              </View>
              <Text style={[styles.benefitValue, { color: '#FFFFFF' }]}>{benefitsRealization.totalBenefits}</Text>
              <Text style={[styles.benefitLabel, { color: 'rgba(255, 255, 255, 0.6)' }]}>Total Benefits</Text>
            </View>
            <View style={[styles.benefitCard, { backgroundColor: 'rgba(59, 130, 246, 0.08)', borderColor: 'rgba(59, 130, 246, 0.3)' }]}>
              <View style={[styles.benefitIcon, { backgroundColor: 'rgba(59, 130, 246, 0.2)' }]}>
                <CheckCircle2 size={24} color="#3B82F6" />
              </View>
              <Text style={[styles.benefitValue, { color: '#FFFFFF' }]}>{benefitsRealization.realizedBenefits}</Text>
              <Text style={[styles.benefitLabel, { color: 'rgba(255, 255, 255, 0.6)' }]}>Realized</Text>
            </View>
            <View style={[styles.benefitCard, { backgroundColor: 'rgba(245, 158, 11, 0.08)', borderColor: 'rgba(245, 158, 11, 0.3)' }]}>
              <View style={[styles.benefitIcon, { backgroundColor: 'rgba(245, 158, 11, 0.2)' }]}>
                <Activity size={24} color="#F59E0B" />
              </View>
              <Text style={[styles.benefitValue, { color: '#FFFFFF' }]}>{benefitsRealization.pendingBenefits}</Text>
              <Text style={[styles.benefitLabel, { color: 'rgba(255, 255, 255, 0.6)' }]}>Pending</Text>
            </View>
            <View style={[styles.benefitCard, { backgroundColor: 'rgba(139, 92, 246, 0.08)', borderColor: 'rgba(139, 92, 246, 0.3)' }]}>
              <View style={[styles.benefitIcon, { backgroundColor: 'rgba(139, 92, 246, 0.2)' }]}>
                <TrendingUp size={24} color="#8B5CF6" />
              </View>
              <Text style={[styles.benefitValue, { color: '#FFFFFF' }]}>{benefitsRealization.projectedAnnual}</Text>
              <Text style={[styles.benefitLabel, { color: 'rgba(255, 255, 255, 0.6)' }]}>Projected Annual</Text>
            </View>
          </View>
        </View>

        {/* Governance Matrix */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: '#FFFFFF' }]}>Portfolio Governance Matrix</Text>
          <View style={[styles.governanceCard, { backgroundColor: 'rgba(16, 185, 129, 0.08)', borderColor: 'rgba(16, 185, 129, 0.3)' }]}>
            <View style={styles.governanceRow}>
              <Text style={[styles.governanceLabel, { color: 'rgba(255, 255, 255, 0.7)' }]}>Governance Compliance</Text>
              <View style={styles.governanceValue}>
                <View style={[styles.governanceBar, { backgroundColor: 'rgba(16, 185, 129, 0.2)' }]}>
                  <View style={[styles.governanceFill, { backgroundColor: '#10B981', width: '94%' }]} />
                </View>
                <Text style={[styles.governanceText, { color: '#10B981' }]}>94%</Text>
              </View>
            </View>
            <View style={styles.governanceRow}>
              <Text style={[styles.governanceLabel, { color: 'rgba(255, 255, 255, 0.7)' }]}>Stakeholder Engagement</Text>
              <View style={styles.governanceValue}>
                <View style={[styles.governanceBar, { backgroundColor: 'rgba(59, 130, 246, 0.2)' }]}>
                  <View style={[styles.governanceFill, { backgroundColor: '#3B82F6', width: '88%' }]} />
                </View>
                <Text style={[styles.governanceText, { color: '#3B82F6' }]}>88%</Text>
              </View>
            </View>
            <View style={styles.governanceRow}>
              <Text style={[styles.governanceLabel, { color: 'rgba(255, 255, 255, 0.7)' }]}>Risk Management</Text>
              <View style={styles.governanceValue}>
                <View style={[styles.governanceBar, { backgroundColor: 'rgba(245, 158, 11, 0.2)' }]}>
                  <View style={[styles.governanceFill, { backgroundColor: '#F59E0B', width: '82%' }]} />
                </View>
                <Text style={[styles.governanceText, { color: '#F59E0B' }]}>82%</Text>
              </View>
            </View>
            <View style={styles.governanceRow}>
              <Text style={[styles.governanceLabel, { color: 'rgba(255, 255, 255, 0.7)' }]}>Resource Allocation</Text>
              <View style={styles.governanceValue}>
                <View style={[styles.governanceBar, { backgroundColor: 'rgba(139, 92, 246, 0.2)' }]}>
                  <View style={[styles.governanceFill, { backgroundColor: '#8B5CF6', width: '90%' }]} />
                </View>
                <Text style={[styles.governanceText, { color: '#8B5CF6' }]}>90%</Text>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#050B14',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
    paddingTop: 60,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(16, 185, 129, 0.3)',
  },
  headerIcon: {
    width: 56,
    height: 56,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  headerContent: {
    flex: 1,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: '700',
    marginBottom: 4,
  },
  headerSubtitle: {
    fontSize: 13,
  },
  section: {
    padding: 16,
    marginBottom: 8,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  seeAllText: {
    fontSize: 14,
    fontWeight: '600',
  },
  healthGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  healthCard: {
    width: '48%',
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    alignItems: 'center',
    marginBottom: 8,
  },
  healthIcon: {
    width: 48,
    height: 48,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  healthValue: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  healthLabel: {
    fontSize: 12,
    marginBottom: 8,
  },
  healthTrend: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  healthTrendText: {
    fontSize: 12,
    fontWeight: '600',
  },
  initiativesList: {
    gap: 12,
  },
  initiativeCard: {
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    marginBottom: 12,
  },
  initiativeHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  initiativeInfo: {
    flex: 1,
  },
  initiativeName: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  initiativeSponsor: {
    fontSize: 12,
  },
  statusBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
    borderWidth: 1,
  },
  statusText: {
    fontSize: 12,
    fontWeight: '600',
  },
  progressSection: {
    marginBottom: 12,
  },
  progressHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  progressLabel: {
    fontSize: 12,
  },
  progressValue: {
    fontSize: 14,
    fontWeight: '600',
  },
  progressBar: {
    height: 8,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 4,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    borderRadius: 4,
  },
  initiativeMetrics: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  metricItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  metricText: {
    fontSize: 13,
    fontWeight: '500',
  },
  priorityBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 8,
    borderWidth: 1,
  },
  priorityText: {
    fontSize: 11,
    fontWeight: '600',
  },
  alignmentCard: {
    padding: 20,
    borderRadius: 12,
    borderWidth: 1,
  },
  alignmentHeader: {
    alignItems: 'center',
    marginBottom: 20,
  },
  alignmentScore: {
    fontSize: 48,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  alignmentLabel: {
    fontSize: 14,
  },
  alignmentBreakdown: {
    gap: 12,
  },
  alignmentBar: {
    height: 24,
    flexDirection: 'row',
    borderRadius: 4,
    overflow: 'hidden',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
  },
  alignmentSegment: {
    height: '100%',
  },
  alignmentLegend: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    flexWrap: 'wrap',
    gap: 8,
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  legendDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  legendText: {
    fontSize: 12,
  },
  benefitsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  benefitCard: {
    width: '48%',
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    alignItems: 'center',
  },
  benefitIcon: {
    width: 48,
    height: 48,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  benefitValue: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  benefitLabel: {
    fontSize: 12,
  },
  governanceCard: {
    padding: 20,
    borderRadius: 12,
    borderWidth: 1,
    gap: 16,
  },
  governanceRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  governanceLabel: {
    fontSize: 14,
    width: '40%',
  },
  governanceValue: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    flex: 1,
  },
  governanceBar: {
    height: 8,
    borderRadius: 4,
    overflow: 'hidden',
    flex: 1,
  },
  governanceFill: {
    height: '100%',
    borderRadius: 4,
  },
  governanceText: {
    fontSize: 14,
    fontWeight: '600',
    width: 40,
    textAlign: 'right',
  },
});
