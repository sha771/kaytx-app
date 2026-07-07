import React from 'react';
import { View, StyleSheet, Text, ScrollView } from 'react-native';
import { useTheme } from '@/providers/ThemeProvider';
import { Target, Award, TrendingUp, CheckCircle, AlertCircle, Star, Zap, ArrowUpRight, ArrowDownRight, Sparkles, Trophy, Flame } from 'lucide-react-native';

interface PerformanceMetrics {
  goalAchievement: number;
  performanceReviews: number;
  highPerformers: number;
  developmentPlans: number;
  promotionReadiness: number;
  averageRating: number;
}

interface GoalCategory {
  category: string;
  completion: number;
  onTrack: number;
  atRisk: number;
}

interface TalentTier {
  tier: string;
  count: number;
  percentage: number;
  color: string;
}

interface PerformanceManagementCenterProps {
  metrics: PerformanceMetrics;
  goals: GoalCategory[];
  talentTiers: TalentTier[];
}

export default function PerformanceManagementCenter({ metrics, goals, talentTiers }: PerformanceManagementCenterProps) {
  const { theme } = useTheme();

  const performanceCards = [
    {
      label: 'Goal Achievement',
      value: `${metrics.goalAchievement}%`,
      icon: Target,
      color: '#10B981',
      subtitle: 'Overall completion',
      trend: 'up' as const
    },
    {
      label: 'Performance Reviews',
      value: metrics.performanceReviews.toString(),
      icon: Star,
      color: '#8B5CF6',
      subtitle: 'Completed this quarter',
      trend: 'up' as const
    },
    {
      label: 'High Performers',
      value: metrics.highPerformers.toString(),
      icon: Award,
      color: '#F59E0B',
      subtitle: 'Top tier employees',
      trend: 'up' as const
    },
    {
      label: 'Development Plans',
      value: metrics.developmentPlans.toString(),
      icon: Zap,
      color: '#06B6D4',
      subtitle: 'Active plans',
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
          <Target size={24} color="#10B981" />
        </View>
        <View style={styles.headerText}>
          <Text style={[styles.title, { color: theme.colors.text }]}>
            Performance Management Center
          </Text>
          <Text style={[styles.subtitle, { color: theme.colors.textSecondary }]}>
            Talent Development Intelligence
          </Text>
        </View>
      </View>

      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        <View style={styles.cardsRow}>
          {performanceCards.map((card, index) => {
            const Icon = card.icon;
            return (
              <View key={index} style={[styles.performanceCard, { backgroundColor: 'rgba(255,255,255,0.02)', borderColor: card.color + '30', borderWidth: 1 }]}>
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
          <Target size={20} color="#8B5CF6" />
          <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>
            Goal Achievement by Category
          </Text>
        </View>
        
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
          <View style={styles.goalsRow}>
            {goals.map((goal, index) => (
              <View key={index} style={[styles.goalCard, { backgroundColor: 'rgba(255,255,255,0.03)', borderColor: goal.completion >= 80 ? '#10B981' + '30' : goal.completion >= 60 ? '#F59E0B' + '30' : '#EF4444' + '30', borderWidth: 1 }]}>
                <Text style={[styles.goalCategory, { color: theme.colors.text }]}>
                  {goal.category}
                </Text>
                
                <Text style={[styles.goalCompletion, { color: goal.completion >= 80 ? '#10B981' : goal.completion >= 60 ? '#F59E0B' : '#EF4444' }]}>
                  {goal.completion}%
                </Text>
                
                <View style={[styles.goalBar, { backgroundColor: 'rgba(255,255,255,0.08)' }]}>
                  <View 
                    style={[
                      styles.goalFill, 
                      { 
                        backgroundColor: goal.completion >= 80 ? '#10B981' : 
                                     goal.completion >= 60 ? '#F59E0B' : '#EF4444',
                        width: `${goal.completion}%`,
                        shadowColor: goal.completion >= 80 ? '#10B981' : goal.completion >= 60 ? '#F59E0B' : '#EF4444',
                        shadowOffset: { width: 0, height: 0 },
                        shadowOpacity: 0.4,
                        shadowRadius: 8,
                      }
                    ]} 
                  />
                </View>
                
                <View style={styles.goalStats}>
                  <View style={styles.goalStat}>
                    <CheckCircle size={12} color="#10B981" />
                    <Text style={[styles.goalStatText, { color: theme.colors.textSecondary }]}>
                      {goal.onTrack} on track
                    </Text>
                  </View>
                  <View style={styles.goalStat}>
                    <AlertCircle size={12} color="#EF4444" />
                    <Text style={[styles.goalStatText, { color: theme.colors.textSecondary }]}>
                      {goal.atRisk} at risk
                    </Text>
                  </View>
                </View>
              </View>
            ))}
          </View>
        </ScrollView>
      </View>

      <View style={[styles.section, { backgroundColor: 'rgba(255,255,255,0.02)', borderColor: 'rgba(255,255,255,0.08)', borderWidth: 1 }]}>
        <View style={styles.sectionHeader}>
          <Trophy size={20} color="#F59E0B" />
          <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>
            Talent Distribution
          </Text>
        </View>
        
        <View style={styles.talentGrid}>
          {talentTiers.map((tier, index) => (
            <View key={index} style={[styles.talentCard, { backgroundColor: 'rgba(255,255,255,0.03)', borderColor: tier.color + '30', borderWidth: 1 }]}>
              <View style={[styles.tierDot, { backgroundColor: tier.color }]} />
              <Text style={[styles.tierName, { color: theme.colors.text }]}>
                {tier.tier}
              </Text>
              <Text style={[styles.tierCount, { color: tier.color }]}>
                {tier.count}
              </Text>
              <Text style={[styles.tierPercentage, { color: theme.colors.textSecondary }]}>
                {tier.percentage}% of workforce
              </Text>
              <View style={[styles.tierBar, { backgroundColor: 'rgba(255,255,255,0.08)' }]}>
                <View 
                  style={[
                    styles.tierFill, 
                    { 
                      backgroundColor: tier.color,
                      width: `${tier.percentage}%`,
                      shadowColor: tier.color,
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
      </View>

      <View style={styles.promotionSection}>
        <View style={[styles.promotionCard, { backgroundColor: 'rgba(139, 92, 246, 0.08)', borderColor: '#8B5CF6' + '30', borderWidth: 1 }]}>
          <View style={styles.promotionHeader}>
            <View style={[styles.promotionIcon, { backgroundColor: '#8B5CF6' + '20' }]}>
              <TrendingUp size={20} color="#8B5CF6" />
            </View>
            <View style={styles.promotionHeaderInfo}>
              <Text style={[styles.promotionLabel, { color: theme.colors.textSecondary }]}>
                Promotion Readiness
              </Text>
              <Text style={[styles.promotionSubtitle, { color: theme.colors.textSecondary }]}>
                Employees ready for advancement
              </Text>
            </View>
          </View>
          <Text style={[styles.promotionValue, { color: '#8B5CF6' }]}>
            {metrics.promotionReadiness}%
          </Text>
          <View style={[styles.promotionBar, { backgroundColor: 'rgba(255,255,255,0.1)' }]}>
            <View 
              style={[
                styles.promotionFill, 
                { 
                  backgroundColor: '#8B5CF6',
                  width: `${metrics.promotionReadiness}%`,
                  shadowColor: '#8B5CF6',
                  shadowOffset: { width: 0, height: 0 },
                  shadowOpacity: 0.4,
                  shadowRadius: 10,
                }
              ]} 
            />
          </View>
        </View>
      </View>

      <View style={styles.ratingSection}>
        <View style={[styles.ratingCard, { backgroundColor: 'rgba(245, 158, 11, 0.08)', borderColor: '#F59E0B' + '30', borderWidth: 1 }]}>
          <View style={styles.ratingHeader}>
            <View style={[styles.ratingIcon, { backgroundColor: '#F59E0B' + '20' }]}>
              <Star size={20} color="#F59E0B" />
            </View>
            <View style={styles.ratingHeaderInfo}>
              <Text style={[styles.ratingLabel, { color: theme.colors.textSecondary }]}>
                Average Performance Rating
              </Text>
              <Text style={[styles.ratingSubtitle, { color: theme.colors.textSecondary }]}>
                Across all departments
              </Text>
            </View>
          </View>
          <Text style={[styles.ratingValue, { color: '#F59E0B' }]}>
            {metrics.averageRating}/5.0
          </Text>
          <View style={styles.starsContainer}>
            {[1, 2, 3, 4, 5].map((star) => (
              <Star 
                key={star} 
                size={18} 
                color={star <= Math.floor(metrics.averageRating) ? '#F59E0B' : 'rgba(255,255,255,0.2)'} 
                fill={star <= Math.floor(metrics.averageRating) ? '#F59E0B' : 'none'}
              />
            ))}
          </View>
        </View>
      </View>

      <View style={[styles.insightsSection, { backgroundColor: 'rgba(255,255,255,0.02)', borderColor: 'rgba(255,255,255,0.08)', borderWidth: 1 }]}>
        <View style={styles.insightItem}>
          <Flame size={14} color="#F59E0B" />
          <Text style={[styles.insightText, { color: theme.colors.textSecondary }]}>
            Sales team exceeded Q4 goals by 23%
          </Text>
        </View>
        <View style={styles.insightItem}>
          <Sparkles size={14} color="#10B981" />
          <Text style={[styles.insightText, { color: theme.colors.textSecondary }]}>
            High performers identified for leadership program
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
  performanceCard: {
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
  goalsRow: {
    flexDirection: 'row',
    gap: 14,
  },
  goalCard: {
    width: 180,
    padding: 16,
    borderRadius: 14,
  },
  goalCategory: {
    fontSize: 13,
    fontWeight: '600',
    marginBottom: 12,
  },
  goalCompletion: {
    fontSize: 32,
    fontWeight: '800',
    marginBottom: 12,
  },
  goalBar: {
    height: 10,
    borderRadius: 5,
    overflow: 'hidden',
    marginBottom: 14,
  },
  goalFill: {
    height: '100%',
    borderRadius: 5,
  },
  goalStats: {
    gap: 10,
  },
  goalStat: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  goalStatText: {
    fontSize: 11,
    opacity: 0.7,
  },
  talentGrid: {
    flexDirection: 'row',
    gap: 14,
  },
  talentCard: {
    flex: 1,
    padding: 16,
    borderRadius: 14,
  },
  tierDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginBottom: 10,
  },
  tierName: {
    fontSize: 13,
    fontWeight: '600',
    marginBottom: 8,
  },
  tierCount: {
    fontSize: 28,
    fontWeight: '800',
    marginBottom: 6,
  },
  tierPercentage: {
    fontSize: 11,
    opacity: 0.7,
    marginBottom: 12,
  },
  tierBar: {
    height: 8,
    borderRadius: 4,
    overflow: 'hidden',
  },
  tierFill: {
    height: '100%',
    borderRadius: 4,
  },
  promotionSection: {
    marginBottom: 16,
  },
  promotionCard: {
    padding: 18,
    borderRadius: 16,
  },
  promotionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 16,
  },
  promotionIcon: {
    width: 40,
    height: 40,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  promotionHeaderInfo: {
    flex: 1,
  },
  promotionLabel: {
    fontSize: 12,
    fontWeight: '600',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    marginBottom: 4,
  },
  promotionSubtitle: {
    fontSize: 11,
    opacity: 0.7,
  },
  promotionValue: {
    fontSize: 42,
    fontWeight: '800',
    marginBottom: 14,
  },
  promotionBar: {
    height: 10,
    borderRadius: 5,
    overflow: 'hidden',
  },
  promotionFill: {
    height: '100%',
    borderRadius: 5,
  },
  ratingSection: {
    marginBottom: 16,
  },
  ratingCard: {
    padding: 18,
    borderRadius: 16,
  },
  ratingHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 16,
  },
  ratingIcon: {
    width: 40,
    height: 40,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  ratingHeaderInfo: {
    flex: 1,
  },
  ratingLabel: {
    fontSize: 12,
    fontWeight: '600',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    marginBottom: 4,
  },
  ratingSubtitle: {
    fontSize: 11,
    opacity: 0.7,
  },
  ratingValue: {
    fontSize: 42,
    fontWeight: '800',
    marginBottom: 12,
  },
  starsContainer: {
    flexDirection: 'row',
    gap: 6,
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