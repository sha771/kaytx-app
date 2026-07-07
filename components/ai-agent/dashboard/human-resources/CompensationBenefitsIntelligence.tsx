import React from 'react';
import { View, StyleSheet, Text, ScrollView } from 'react-native';
import { useTheme } from '@/providers/ThemeProvider';
import { DollarSign, Wallet, TrendingUp, PieChart, Scale, Gift, CheckCircle, ArrowUpRight, ArrowDownRight, Sparkles, Flame, Coins } from 'lucide-react-native';

interface CompensationMetrics {
  totalPayroll: string;
  avgSalary: string;
  compensationBudget: string;
  benefitsUtilization: number;
  salaryEquityScore: number;
  bonusPool: string;
}

interface CompensationBenchmark {
  role: string;
  currentAvg: string;
  marketAvg: string;
  variance: number;
  competitive: boolean;
}

interface BenefitCategory {
  category: string;
  enrollment: number;
  utilization: number;
  satisfaction: number;
}

interface CompensationBenefitsIntelligenceProps {
  metrics: CompensationMetrics;
  benchmarks: CompensationBenchmark[];
  benefits: BenefitCategory[];
}

export default function CompensationBenefitsIntelligence({ metrics, benchmarks, benefits }: CompensationBenefitsIntelligenceProps) {
  const { theme } = useTheme();

  const compensationCards = [
    {
      label: 'Total Payroll',
      value: metrics.totalPayroll,
      icon: Wallet,
      color: '#3B82F6',
      subtitle: 'Monthly',
      trend: 'up' as const
    },
    {
      label: 'Average Salary',
      value: metrics.avgSalary,
      icon: DollarSign,
      color: '#10B981',
      subtitle: 'Per employee',
      trend: 'up' as const
    },
    {
      label: 'Compensation Budget',
      value: metrics.compensationBudget,
      icon: PieChart,
      color: '#8B5CF6',
      subtitle: 'Annual',
      trend: 'up' as const
    },
    {
      label: 'Benefits Utilization',
      value: `${metrics.benefitsUtilization}%`,
      icon: Gift,
      color: '#F59E0B',
      subtitle: 'Enrollment rate',
      trend: 'up' as const
    }
  ];

  const getTrendIcon = (trend: 'up' | 'down') => {
    return trend === 'up' 
      ? <ArrowUpRight size={14} color="#10B981" />
      : <ArrowDownRight size={14} color="#EF4444" />;
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.card }]}>
      <View style={styles.header}>
        <View style={[styles.headerIcon, { backgroundColor: '#10B981' + '20' }]}>
          <Coins size={24} color="#10B981" />
        </View>
        <View style={styles.headerText}>
          <Text style={[styles.title, { color: theme.colors.text }]}>
            Compensation & Benefits Intelligence
          </Text>
          <Text style={[styles.subtitle, { color: theme.colors.textSecondary }]}>
            Total Rewards Analytics
          </Text>
        </View>
      </View>

      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        <View style={styles.cardsRow}>
          {compensationCards.map((card, index) => {
            const Icon = card.icon;
            return (
              <View key={index} style={[styles.compensationCard, { backgroundColor: 'rgba(255,255,255,0.02)', borderColor: card.color + '30', borderWidth: 1 }]}>
                <View style={[styles.iconContainer, { backgroundColor: card.color + '15' }]}>
                  <Icon size={22} color={card.color} />
                </View>
                <Text style={[styles.cardLabel, { color: theme.colors.textSecondary }]}>
                  {card.label}
                </Text>
                <Text style={[styles.cardValue, { color: card.color }]}>
                  {card.value}
                </Text>
                <View style={styles.cardFooter}>
                  {getTrendIcon(card.trend)}
                  <Text style={[styles.cardSubtitle, { color: theme.colors.textSecondary }]}>
                    {card.subtitle}
                  </Text>
                </View>
              </View>
            );
          })}
        </View>
      </ScrollView>

      <View style={[styles.section, { backgroundColor: 'rgba(255,255,255,0.02)', borderColor: 'rgba(255,255,255,0.08)', borderWidth: 1 }]}>
        <View style={styles.sectionHeader}>
          <Scale size={20} color="#8B5CF6" />
          <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>
            Salary Benchmarks
          </Text>
        </View>
        
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
          <View style={styles.benchmarksRow}>
            {benchmarks.map((benchmark, index) => (
              <View key={index} style={[styles.benchmarkCard, { backgroundColor: 'rgba(255,255,255,0.03)', borderColor: benchmark.competitive ? '#10B981' + '30' : '#F59E0B' + '30', borderWidth: 1 }]}>
                <View style={styles.benchmarkHeader}>
                  <Text style={[styles.benchmarkRole, { color: theme.colors.text }]}>
                    {benchmark.role}
                  </Text>
                  {benchmark.competitive ? (
                    <CheckCircle size={16} color="#10B981" />
                  ) : (
                    <Scale size={16} color="#F59E0B" />
                  )}
                </View>
                
                <View style={styles.salaryComparison}>
                  <View style={styles.salaryItem}>
                    <Text style={[styles.salaryLabel, { color: theme.colors.textSecondary }]}>
                      Current
                    </Text>
                    <Text style={[styles.salaryValue, { color: benchmark.competitive ? '#10B981' : '#F59E0B' }]}>
                      {benchmark.currentAvg}
                    </Text>
                  </View>
                  <View style={styles.salaryItem}>
                    <Text style={[styles.salaryLabel, { color: theme.colors.textSecondary }]}>
                      Market
                    </Text>
                    <Text style={[styles.salaryValue, { color: theme.colors.text }]}>
                      {benchmark.marketAvg}
                    </Text>
                  </View>
                </View>
                
                <View style={styles.varianceSection}>
                  <TrendingUp size={14} color={benchmark.variance >= 0 ? '#10B981' : '#EF4444'} />
                  <Text style={[styles.varianceText, { color: benchmark.variance >= 0 ? '#10B981' : '#EF4444' }]}>
                    {benchmark.variance >= 0 ? '+' : ''}{benchmark.variance}% vs market
                  </Text>
                </View>
              </View>
            ))}
          </View>
        </ScrollView>
      </View>

      <View style={[styles.section, { backgroundColor: 'rgba(255,255,255,0.02)', borderColor: 'rgba(255,255,255,0.08)', borderWidth: 1 }]}>
        <View style={styles.sectionHeader}>
          <Gift size={20} color="#F59E0B" />
          <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>
            Benefits Utilization
          </Text>
        </View>
        
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
          <View style={styles.benefitsRow}>
            {benefits.map((benefit, index) => (
              <View key={index} style={[styles.benefitCard, { backgroundColor: 'rgba(255,255,255,0.03)', borderColor: benefit.satisfaction >= 80 ? '#10B981' + '30' : benefit.satisfaction >= 60 ? '#F59E0B' + '30' : '#EF4444' + '30', borderWidth: 1 }]}>
                <Text style={[styles.benefitCategory, { color: theme.colors.text }]}>
                  {benefit.category}
                </Text>
                
                <View style={styles.benefitStats}>
                  <View style={styles.benefitStat}>
                    <Text style={[styles.benefitStatValue, { color: theme.colors.text }]}>
                      {benefit.enrollment}%
                    </Text>
                    <Text style={[styles.benefitStatLabel, { color: theme.colors.textSecondary }]}>
                      Enrollment
                    </Text>
                  </View>
                  <View style={styles.benefitStat}>
                    <Text style={[styles.benefitStatValue, { color: theme.colors.text }]}>
                      {benefit.utilization}%
                    </Text>
                    <Text style={[styles.benefitStatLabel, { color: theme.colors.textSecondary }]}>
                      Utilization
                    </Text>
                  </View>
                </View>
                
                <Text style={[styles.satisfactionLabel, { color: theme.colors.textSecondary }]}>
                  Satisfaction
                </Text>
                <Text style={[styles.satisfactionValue, { color: benefit.satisfaction >= 80 ? '#10B981' : benefit.satisfaction >= 60 ? '#F59E0B' : '#EF4444' }]}>
                  {benefit.satisfaction}%
                </Text>
                
                <View style={[styles.satisfactionBar, { backgroundColor: 'rgba(255,255,255,0.08)' }]}>
                  <View 
                    style={[
                      styles.satisfactionFill, 
                      { 
                        backgroundColor: benefit.satisfaction >= 80 ? '#10B981' : 
                                     benefit.satisfaction >= 60 ? '#F59E0B' : '#EF4444',
                        width: `${benefit.satisfaction}%`,
                        shadowColor: benefit.satisfaction >= 80 ? '#10B981' : benefit.satisfaction >= 60 ? '#F59E0B' : '#EF4444',
                        shadowOffset: { width: 0, height: 0 },
                        shadowOpacity: 0.4,
                        shadowRadius: 8,
                      }
                    ]} 
                  />
                </View>
              </View>
            ))}
          </View>
        </ScrollView>
      </View>

      <View style={styles.equitySection}>
        <View style={[styles.equityCard, { backgroundColor: 'rgba(139, 92, 246, 0.08)', borderColor: '#8B5CF6' + '30', borderWidth: 1 }]}>
          <View style={styles.equityHeader}>
            <View style={[styles.equityIcon, { backgroundColor: '#8B5CF6' + '20' }]}>
              <Scale size={20} color="#8B5CF6" />
            </View>
            <View style={styles.equityHeaderInfo}>
              <Text style={[styles.equityLabel, { color: theme.colors.textSecondary }]}>
                Salary Equity Score
              </Text>
              <Text style={[styles.equitySubtitle, { color: theme.colors.textSecondary }]}>
                Pay equity across demographics
              </Text>
            </View>
          </View>
          <Text style={[styles.equityValue, { color: '#8B5CF6' }]}>
            {metrics.salaryEquityScore}%
          </Text>
          <View style={[styles.equityBar, { backgroundColor: 'rgba(255,255,255,0.1)' }]}>
            <View 
              style={[
                styles.equityFill, 
                { 
                  backgroundColor: metrics.salaryEquityScore >= 90 ? '#10B981' : 
                               metrics.salaryEquityScore >= 75 ? '#F59E0B' : '#EF4444',
                  width: `${metrics.salaryEquityScore}%`,
                  shadowColor: metrics.salaryEquityScore >= 90 ? '#10B981' : metrics.salaryEquityScore >= 75 ? '#F59E0B' : '#EF4444',
                  shadowOffset: { width: 0, height: 0 },
                  shadowOpacity: 0.4,
                  shadowRadius: 10,
                }
              ]} 
            />
          </View>
        </View>
      </View>

      <View style={styles.bonusSection}>
        <View style={[styles.bonusCard, { backgroundColor: 'rgba(245, 158, 11, 0.08)', borderColor: '#F59E0B' + '30', borderWidth: 1 }]}>
          <View style={styles.bonusHeader}>
            <View style={[styles.bonusIcon, { backgroundColor: '#F59E0B' + '20' }]}>
              <Gift size={20} color="#F59E0B" />
            </View>
            <View style={styles.bonusHeaderInfo}>
              <Text style={[styles.bonusLabel, { color: theme.colors.textSecondary }]}>
                Bonus Pool
              </Text>
              <Text style={[styles.bonusSubtitle, { color: theme.colors.textSecondary }]}>
                Available for performance bonuses
              </Text>
            </View>
          </View>
          <Text style={[styles.bonusValue, { color: '#F59E0B' }]}>
            {metrics.bonusPool}
          </Text>
        </View>
      </View>

      <View style={[styles.insightsSection, { backgroundColor: 'rgba(255,255,255,0.02)', borderColor: 'rgba(255,255,255,0.08)', borderWidth: 1 }]}>
        <View style={styles.insightItem}>
          <Flame size={14} color="#F59E0B" />
          <Text style={[styles.insightText, { color: theme.colors.textSecondary }]}>
            Engineering salaries adjusted to market (+8%)
          </Text>
        </View>
        <View style={styles.insightItem}>
          <Sparkles size={14} color="#10B981" />
          <Text style={[styles.insightText, { color: theme.colors.textSecondary }]}>
            Benefits satisfaction improved by 12% this quarter
          </Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 20,
    padding: 20,
    marginVertical: 12,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 20,
  },
  headerIcon: {
    width: 48,
    height: 48,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerText: {
    flex: 1,
  },
  title: {
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 12,
    opacity: 0.6,
  },
  scrollContent: {
    paddingHorizontal: 4,
  },
  cardsRow: {
    flexDirection: 'row',
    gap: 14,
    marginBottom: 20,
  },
  compensationCard: {
    width: 160,
    padding: 16,
    borderRadius: 14,
  },
  iconContainer: {
    width: 44,
    height: 44,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  cardLabel: {
    fontSize: 10,
    fontWeight: '600',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    marginBottom: 8,
    opacity: 0.7,
  },
  cardValue: {
    fontSize: 24,
    fontWeight: '800',
    marginBottom: 10,
  },
  cardFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  cardSubtitle: {
    fontSize: 11,
    opacity: 0.7,
  },
  section: {
    padding: 18,
    borderRadius: 16,
    marginBottom: 16,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginBottom: 18,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '700',
  },
  benchmarksRow: {
    flexDirection: 'row',
    gap: 14,
  },
  benchmarkCard: {
    width: 180,
    padding: 16,
    borderRadius: 14,
  },
  benchmarkHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 14,
  },
  benchmarkRole: {
    fontSize: 13,
    fontWeight: '600',
  },
  salaryComparison: {
    flexDirection: 'row',
    gap: 20,
    marginBottom: 14,
  },
  salaryItem: {
    flex: 1,
  },
  salaryLabel: {
    fontSize: 10,
    opacity: 0.7,
    marginBottom: 6,
  },
  salaryValue: {
    fontSize: 18,
    fontWeight: '700',
  },
  varianceSection: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  varianceText: {
    fontSize: 12,
    fontWeight: '700',
  },
  benefitsRow: {
    flexDirection: 'row',
    gap: 14,
  },
  benefitCard: {
    width: 160,
    padding: 16,
    borderRadius: 14,
  },
  benefitCategory: {
    fontSize: 13,
    fontWeight: '600',
    marginBottom: 14,
  },
  benefitStats: {
    flexDirection: 'row',
    gap: 14,
    marginBottom: 14,
  },
  benefitStat: {
    flex: 1,
  },
  benefitStatValue: {
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 4,
  },
  benefitStatLabel: {
    fontSize: 10,
    opacity: 0.7,
  },
  satisfactionLabel: {
    fontSize: 10,
    opacity: 0.7,
    marginBottom: 6,
  },
  satisfactionValue: {
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 10,
  },
  satisfactionBar: {
    height: 10,
    borderRadius: 5,
    overflow: 'hidden',
  },
  satisfactionFill: {
    height: '100%',
    borderRadius: 5,
  },
  equitySection: {
    marginBottom: 16,
  },
  equityCard: {
    padding: 18,
    borderRadius: 16,
  },
  equityHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 16,
  },
  equityIcon: {
    width: 40,
    height: 40,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  equityHeaderInfo: {
    flex: 1,
  },
  equityLabel: {
    fontSize: 12,
    fontWeight: '600',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    marginBottom: 4,
  },
  equitySubtitle: {
    fontSize: 11,
    opacity: 0.7,
  },
  equityValue: {
    fontSize: 42,
    fontWeight: '800',
    marginBottom: 14,
  },
  equityBar: {
    height: 10,
    borderRadius: 5,
    overflow: 'hidden',
  },
  equityFill: {
    height: '100%',
    borderRadius: 5,
  },
  bonusSection: {
    marginBottom: 16,
  },
  bonusCard: {
    padding: 18,
    borderRadius: 16,
  },
  bonusHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 16,
  },
  bonusIcon: {
    width: 40,
    height: 40,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  bonusHeaderInfo: {
    flex: 1,
  },
  bonusLabel: {
    fontSize: 12,
    fontWeight: '600',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    marginBottom: 4,
  },
  bonusSubtitle: {
    fontSize: 11,
    opacity: 0.7,
  },
  bonusValue: {
    fontSize: 42,
    fontWeight: '800',
  },
  insightsSection: {
    flexDirection: 'row',
    gap: 12,
    padding: 14,
    borderRadius: 12,
  },
  insightItem: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  insightText: {
    fontSize: 11,
    opacity: 0.8,
    flex: 1,
  },
});