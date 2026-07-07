import React from 'react';
import { View, StyleSheet, Text, ScrollView } from 'react-native';
import { useTheme } from '@/providers/ThemeProvider';
import { Heart, Smile, MessageSquare, TrendingUp, TrendingDown, Star, Users, ArrowUpRight, ArrowDownRight, Sparkles, Target, Flame } from 'lucide-react-native';

interface EngagementMetrics {
  overallEngagement: number;
  employeeSatisfaction: number;
  surveyResponseRate: number;
  managerEffectiveness: number;
  teamMorale: number;
  netPromoterScore: number;
}

interface TeamEngagement {
  team: string;
  engagementScore: number;
  trend: 'up' | 'down' | 'stable';
  members: number;
}

interface FeedbackCategory {
  category: string;
  positive: number;
  neutral: number;
  negative: number;
}

interface EmployeeEngagementDashboardProps {
  metrics: EngagementMetrics;
  teams: TeamEngagement[];
  feedback: FeedbackCategory[];
}

export default function EmployeeEngagementDashboard({ metrics, teams, feedback }: EmployeeEngagementDashboardProps) {
  const { theme } = useTheme();

  const engagementCards = [
    {
      label: 'Overall Engagement',
      value: `${metrics.overallEngagement}%`,
      icon: Heart,
      color: '#10B981',
      trend: '+5%',
      trendType: 'up' as const
    },
    {
      label: 'Employee Satisfaction',
      value: `${metrics.employeeSatisfaction}%`,
      icon: Smile,
      color: '#3B82F6',
      trend: '+3%',
      trendType: 'up' as const
    },
    {
      label: 'Survey Response Rate',
      value: `${metrics.surveyResponseRate}%`,
      icon: MessageSquare,
      color: '#8B5CF6',
      trend: '+8%',
      trendType: 'up' as const
    },
    {
      label: 'Manager Effectiveness',
      value: `${metrics.managerEffectiveness}%`,
      icon: Star,
      color: '#F59E0B',
      trend: '+2%',
      trendType: 'up' as const
    }
  ];

  const getTrendIcon = (trend: 'up' | 'down' | 'stable') => {
    switch (trend) {
      case 'up':
        return <ArrowUpRight size={14} color="#10B981" />;
      case 'down':
        return <ArrowDownRight size={14} color="#EF4444" />;
      case 'stable':
        return <TrendingUp size={14} color="#6B7280" />;
    }
  };

  const getNPSColor = (score: number) => {
    if (score >= 50) return '#10B981';
    if (score >= 0) return '#F59E0B';
    return '#EF4444';
  };

  const getNPSCategory = (score: number) => {
    if (score >= 50) return 'Excellent';
    if (score >= 0) return 'Good';
    return 'Needs Improvement';
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.card }]}>
      <View style={styles.header}>
        <View style={[styles.headerIcon, { backgroundColor: '#10B981' + '20' }]}>
          <Heart size={24} color="#10B981" />
        </View>
        <View style={styles.headerText}>
          <Text style={[styles.title, { color: theme.colors.text }]}>
            Employee Engagement Dashboard
          </Text>
          <Text style={[styles.subtitle, { color: theme.colors.textSecondary }]}>
            Employee Experience Intelligence
          </Text>
        </View>
      </View>

      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        <View style={styles.cardsRow}>
          {engagementCards.map((card, index) => {
            const Icon = card.icon;
            return (
              <View key={index} style={[styles.engagementCard, { backgroundColor: 'rgba(255,255,255,0.02)', borderColor: card.color + '30', borderWidth: 1 }]}>
                <View style={[styles.iconContainer, { backgroundColor: card.color + '15' }]}>
                  <Icon size={22} color={card.color} />
                </View>
                <Text style={[styles.cardLabel, { color: theme.colors.textSecondary }]}>
                  {card.label}
                </Text>
                <Text style={[styles.cardValue, { color: card.color }]}>
                  {card.value}
                </Text>
                <View style={styles.trendBadge}>
                  {getTrendIcon(card.trendType)}
                  <Text style={[styles.trendText, { color: '#10B981' }]}>
                    {card.trend}
                  </Text>
                </View>
              </View>
            );
          })}
        </View>
      </ScrollView>

      <View style={[styles.section, { backgroundColor: 'rgba(255,255,255,0.02)', borderColor: 'rgba(255,255,255,0.08)', borderWidth: 1 }]}>
        <View style={styles.sectionHeader}>
          <Users size={20} color="#8B5CF6" />
          <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>
            Team Engagement Scores
          </Text>
        </View>
        
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
          <View style={styles.teamsRow}>
            {teams.map((team, index) => (
              <View key={index} style={[styles.teamCard, { backgroundColor: 'rgba(255,255,255,0.03)', borderColor: team.engagementScore >= 80 ? '#10B981' + '30' : team.engagementScore >= 60 ? '#F59E0B' + '30' : '#EF4444' + '30', borderWidth: 1 }]}>
                <View style={styles.teamHeader}>
                  <Text style={[styles.teamName, { color: theme.colors.text }]}>
                    {team.team}
                  </Text>
                  {getTrendIcon(team.trend)}
                </View>
                
                <Text style={[styles.teamScore, { color: team.engagementScore >= 80 ? '#10B981' : team.engagementScore >= 60 ? '#F59E0B' : '#EF4444' }]}>
                  {team.engagementScore}%
                </Text>
                
                <View style={styles.teamMembers}>
                  <Users size={12} color={theme.colors.textSecondary} />
                  <Text style={[styles.membersCount, { color: theme.colors.textSecondary }]}>
                    {team.members} members
                  </Text>
                </View>
                
                <View style={[styles.scoreBar, { backgroundColor: 'rgba(255,255,255,0.08)' }]}>
                  <View 
                    style={[
                      styles.scoreFill, 
                      { 
                        backgroundColor: team.engagementScore >= 80 ? '#10B981' : 
                                     team.engagementScore >= 60 ? '#F59E0B' : '#EF4444',
                        width: `${team.engagementScore}%`,
                        shadowColor: team.engagementScore >= 80 ? '#10B981' : team.engagementScore >= 60 ? '#F59E0B' : '#EF4444',
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

      <View style={[styles.section, { backgroundColor: 'rgba(255,255,255,0.02)', borderColor: 'rgba(255,255,255,0.08)', borderWidth: 1 }]}>
        <View style={styles.sectionHeader}>
          <MessageSquare size={20} color="#EC4899" />
          <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>
            Feedback Analysis
          </Text>
        </View>
        
        <View style={styles.feedbackGrid}>
          {feedback.map((category, index) => (
            <View key={index} style={[styles.feedbackCard, { backgroundColor: 'rgba(255,255,255,0.03)', borderColor: 'rgba(255,255,255,0.08)', borderWidth: 1 }]}>
              <Text style={[styles.feedbackCategory, { color: theme.colors.text }]}>
                {category.category}
              </Text>
              
              <View style={styles.sentimentRow}>
                <View style={styles.sentimentItem}>
                  <View style={[styles.sentimentDot, { backgroundColor: '#10B981' }]} />
                  <Text style={[styles.sentimentLabel, { color: theme.colors.textSecondary }]}>
                    Positive
                  </Text>
                  <Text style={[styles.sentimentValue, { color: '#10B981' }]}>
                    {category.positive}%
                  </Text>
                </View>
                
                <View style={styles.sentimentItem}>
                  <View style={[styles.sentimentDot, { backgroundColor: '#6B7280' }]} />
                  <Text style={[styles.sentimentLabel, { color: theme.colors.textSecondary }]}>
                    Neutral
                  </Text>
                  <Text style={[styles.sentimentValue, { color: '#6B7280' }]}>
                    {category.neutral}%
                  </Text>
                </View>
                
                <View style={styles.sentimentItem}>
                  <View style={[styles.sentimentDot, { backgroundColor: '#EF4444' }]} />
                  <Text style={[styles.sentimentLabel, { color: theme.colors.textSecondary }]}>
                    Negative
                  </Text>
                  <Text style={[styles.sentimentValue, { color: '#EF4444' }]}>
                    {category.negative}%
                  </Text>
                </View>
              </View>
              
              <View style={styles.sentimentBar}>
                <View 
                  style={[
                    styles.sentimentFill, 
                    { backgroundColor: '#10B981', width: `${category.positive}%` }
                  ]} 
                />
                <View 
                  style={[
                    styles.sentimentFill, 
                    { backgroundColor: '#6B7280', width: `${category.neutral}%` }
                  ]} 
                />
                <View 
                  style={[
                    styles.sentimentFill, 
                    { backgroundColor: '#EF4444', width: `${category.negative}%` }
                  ]} 
                />
              </View>
            </View>
          ))}
        </View>
      </View>

      <View style={styles.npsSection}>
        <View style={[styles.npsCard, { backgroundColor: 'rgba(139, 92, 246, 0.08)', borderColor: '#8B5CF6' + '30', borderWidth: 1 }]}>
          <View style={styles.npsHeader}>
            <View style={[styles.npsIcon, { backgroundColor: '#8B5CF6' + '20' }]}>
              <Star size={20} color="#8B5CF6" />
            </View>
            <View style={styles.npsHeaderInfo}>
              <Text style={[styles.npsLabel, { color: theme.colors.textSecondary }]}>
                Net Promoter Score
              </Text>
              <Text style={[styles.npsSubtitle, { color: theme.colors.textSecondary }]}>
                Employee advocacy metric
              </Text>
            </View>
          </View>
          <Text style={[styles.npsValue, { color: getNPSColor(metrics.netPromoterScore) }]}>
            {metrics.netPromoterScore}
          </Text>
          <View style={[styles.npsCategoryBadge, { backgroundColor: getNPSColor(metrics.netPromoterScore) + '20' }]}>
            <Text style={[styles.npsCategoryText, { color: getNPSColor(metrics.netPromoterScore) }]}>
              {getNPSCategory(metrics.netPromoterScore)}
            </Text>
          </View>
        </View>
      </View>

      <View style={[styles.insightsSection, { backgroundColor: 'rgba(255,255,255,0.02)', borderColor: 'rgba(255,255,255,0.08)', borderWidth: 1 }]}>
        <View style={styles.insightItem}>
          <Flame size={14} color="#F59E0B" />
          <Text style={[styles.insightText, { color: theme.colors.textSecondary }]}>
            Engineering team morale up 12% after new initiative
          </Text>
        </View>
        <View style={styles.insightItem}>
          <Sparkles size={14} color="#10B981" />
          <Text style={[styles.insightText, { color: theme.colors.textSecondary }]}>
            Manager training improved effectiveness scores by 8%
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
  engagementCard: {
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
    fontSize: 28,
    fontWeight: '800',
    marginBottom: 10,
  },
  trendBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  trendText: {
    fontSize: 12,
    fontWeight: '700',
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
  teamsRow: {
    flexDirection: 'row',
    gap: 14,
  },
  teamCard: {
    width: 160,
    padding: 16,
    borderRadius: 14,
  },
  teamHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  teamName: {
    fontSize: 13,
    fontWeight: '600',
  },
  teamScore: {
    fontSize: 32,
    fontWeight: '800',
    marginBottom: 12,
  },
  teamMembers: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginBottom: 12,
  },
  membersCount: {
    fontSize: 11,
    opacity: 0.7,
  },
  scoreBar: {
    height: 8,
    borderRadius: 4,
    overflow: 'hidden',
  },
  scoreFill: {
    height: '100%',
    borderRadius: 4,
  },
  feedbackGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 14,
  },
  feedbackCard: {
    flex: 1,
    minWidth: 200,
    padding: 16,
    borderRadius: 14,
  },
  feedbackCategory: {
    fontSize: 13,
    fontWeight: '700',
    marginBottom: 14,
  },
  sentimentRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  sentimentItem: {
    alignItems: 'center',
    gap: 6,
  },
  sentimentDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  sentimentLabel: {
    fontSize: 10,
    opacity: 0.7,
  },
  sentimentValue: {
    fontSize: 12,
    fontWeight: '700',
  },
  sentimentBar: {
    height: 10,
    borderRadius: 5,
    overflow: 'hidden',
    flexDirection: 'row',
  },
  sentimentFill: {
    height: '100%',
  },
  npsSection: {
    marginBottom: 16,
  },
  npsCard: {
    padding: 18,
    borderRadius: 16,
  },
  npsHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 16,
  },
  npsIcon: {
    width: 40,
    height: 40,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  npsHeaderInfo: {
    flex: 1,
  },
  npsLabel: {
    fontSize: 12,
    fontWeight: '600',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    marginBottom: 4,
  },
  npsSubtitle: {
    fontSize: 11,
    opacity: 0.7,
  },
  npsValue: {
    fontSize: 48,
    fontWeight: '800',
    marginBottom: 12,
  },
  npsCategoryBadge: {
    alignSelf: 'flex-start',
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 20,
  },
  npsCategoryText: {
    fontSize: 12,
    fontWeight: '700',
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