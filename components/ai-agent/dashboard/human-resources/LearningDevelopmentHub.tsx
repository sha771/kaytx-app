import React from 'react';
import { View, StyleSheet, Text, ScrollView } from 'react-native';
import { useTheme } from '@/providers/ThemeProvider';
import { BookOpen, Award, TrendingUp, CheckCircle, Clock, Target, Zap, ArrowUpRight, ArrowDownRight, Sparkles, Flame, GraduationCap } from 'lucide-react-native';

interface LearningMetrics {
  trainingCompletion: number;
  skillsDeveloped: number;
  certificationsEarned: number;
  learningPaths: number;
  skillGapScore: number;
  avgLearningHours: number;
}

interface SkillCategory {
  category: string;
  proficiency: number;
  gap: number;
  demand: 'high' | 'medium' | 'low';
}

interface LearningProgram {
  program: string;
  enrolled: number;
  completed: number;
  completionRate: number;
}

interface LearningDevelopmentHubProps {
  metrics: LearningMetrics;
  skills: SkillCategory[];
  programs: LearningProgram[];
}

export default function LearningDevelopmentHub({ metrics, skills, programs }: LearningDevelopmentHubProps) {
  const { theme } = useTheme();

  const learningCards = [
    {
      label: 'Training Completion',
      value: `${metrics.trainingCompletion}%`,
      icon: CheckCircle,
      color: '#10B981',
      subtitle: 'Overall rate',
      trend: 'up' as const
    },
    {
      label: 'Skills Developed',
      value: metrics.skillsDeveloped.toString(),
      icon: Zap,
      color: '#3B82F6',
      subtitle: 'New skills acquired',
      trend: 'up' as const
    },
    {
      label: 'Certifications Earned',
      value: metrics.certificationsEarned.toString(),
      icon: Award,
      color: '#8B5CF6',
      subtitle: 'This quarter',
      trend: 'up' as const
    },
    {
      label: 'Active Learning Paths',
      value: metrics.learningPaths.toString(),
      icon: Target,
      color: '#F59E0B',
      subtitle: 'In progress',
      trend: 'up' as const
    }
  ];

  const getTrendIcon = (trend: 'up' | 'down') => {
    return trend === 'up' 
      ? <ArrowUpRight size={14} color="#10B981" />
      : <ArrowDownRight size={14} color="#EF4444" />;
  };

  const getDemandColor = (demand: 'high' | 'medium' | 'low') => {
    switch (demand) {
      case 'high':
        return '#EF4444';
      case 'medium':
        return '#F59E0B';
      case 'low':
        return '#10B981';
    }
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.card }]}>
      <View style={styles.header}>
        <View style={[styles.headerIcon, { backgroundColor: '#3B82F6' + '20' }]}>
          <BookOpen size={24} color="#3B82F6" />
        </View>
        <View style={styles.headerText}>
          <Text style={[styles.title, { color: theme.colors.text }]}>
            Learning & Development Hub
          </Text>
          <Text style={[styles.subtitle, { color: theme.colors.textSecondary }]}>
            Skills & Training Intelligence
          </Text>
        </View>
      </View>

      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        <View style={styles.cardsRow}>
          {learningCards.map((card, index) => {
            const Icon = card.icon;
            return (
              <View key={index} style={[styles.learningCard, { backgroundColor: 'rgba(255,255,255,0.02)', borderColor: card.color + '30', borderWidth: 1 }]}>
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
          <GraduationCap size={20} color="#8B5CF6" />
          <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>
            Skill Proficiency & Gaps
          </Text>
        </View>
        
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
          <View style={styles.skillsRow}>
            {skills.map((skill, index) => (
              <View key={index} style={[styles.skillCard, { backgroundColor: 'rgba(255,255,255,0.03)', borderColor: skill.proficiency >= 80 ? '#10B981' + '30' : skill.proficiency >= 60 ? '#F59E0B' + '30' : '#EF4444' + '30', borderWidth: 1 }]}>
                <View style={styles.skillHeader}>
                  <Text style={[styles.skillCategory, { color: theme.colors.text }]}>
                    {skill.category}
                  </Text>
                  <View style={[styles.demandBadge, { backgroundColor: getDemandColor(skill.demand) + '20' }]}>
                    <Text style={[styles.demandText, { color: getDemandColor(skill.demand) }]}>
                      {skill.demand}
                    </Text>
                  </View>
                </View>
                
                <Text style={[styles.skillProficiency, { color: skill.proficiency >= 80 ? '#10B981' : skill.proficiency >= 60 ? '#F59E0B' : '#EF4444' }]}>
                  {skill.proficiency}%
                </Text>
                
                <View style={[styles.skillBar, { backgroundColor: 'rgba(255,255,255,0.08)' }]}>
                  <View 
                    style={[
                      styles.skillFill, 
                      { 
                        backgroundColor: skill.proficiency >= 80 ? '#10B981' : 
                                     skill.proficiency >= 60 ? '#F59E0B' : '#EF4444',
                        width: `${skill.proficiency}%`,
                        shadowColor: skill.proficiency >= 80 ? '#10B981' : skill.proficiency >= 60 ? '#F59E0B' : '#EF4444',
                        shadowOffset: { width: 0, height: 0 },
                        shadowOpacity: 0.4,
                        shadowRadius: 8,
                      }
                    ]} 
                  />
                </View>
                
                <View style={styles.gapSection}>
                  <Zap size={12} color="#EF4444" />
                  <Text style={[styles.gapText, { color: theme.colors.textSecondary }]}>
                    {skill.gap}% skill gap
                  </Text>
                </View>
              </View>
            ))}
          </View>
        </ScrollView>
      </View>

      <View style={[styles.section, { backgroundColor: 'rgba(255,255,255,0.02)', borderColor: 'rgba(255,255,255,0.08)', borderWidth: 1 }]}>
        <View style={styles.sectionHeader}>
          <Target size={20} color="#F59E0B" />
          <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>
            Learning Programs
          </Text>
        </View>
        
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
          <View style={styles.programsRow}>
            {programs.map((program, index) => (
              <View key={index} style={[styles.programCard, { backgroundColor: 'rgba(255,255,255,0.03)', borderColor: program.completionRate >= 80 ? '#10B981' + '30' : program.completionRate >= 60 ? '#F59E0B' + '30' : '#EF4444' + '30', borderWidth: 1 }]}>
                <Text style={[styles.programName, { color: theme.colors.text }]}>
                  {program.program}
                </Text>
                
                <View style={styles.programStats}>
                  <View style={styles.programStat}>
                    <CheckCircle size={12} color="#10B981" />
                    <Text style={[styles.programStatText, { color: theme.colors.textSecondary }]}>
                      {program.completed} completed
                    </Text>
                  </View>
                  <View style={styles.programStat}>
                    <Clock size={12} color="#3B82F6" />
                    <Text style={[styles.programStatText, { color: theme.colors.textSecondary }]}>
                      {program.enrolled} enrolled
                    </Text>
                  </View>
                </View>
                
                <Text style={[styles.completionRate, { color: program.completionRate >= 80 ? '#10B981' : program.completionRate >= 60 ? '#F59E0B' : '#EF4444' }]}>
                  {program.completionRate}% completion
                </Text>
                
                <View style={[styles.programBar, { backgroundColor: 'rgba(255,255,255,0.08)' }]}>
                  <View 
                    style={[
                      styles.programFill, 
                      { 
                        backgroundColor: program.completionRate >= 80 ? '#10B981' : 
                                     program.completionRate >= 60 ? '#F59E0B' : '#EF4444',
                        width: `${program.completionRate}%`,
                        shadowColor: program.completionRate >= 80 ? '#10B981' : program.completionRate >= 60 ? '#F59E0B' : '#EF4444',
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

      <View style={styles.metricsSection}>
        <View style={styles.metricsGrid}>
          <View style={[styles.metricCard, { backgroundColor: 'rgba(245, 158, 11, 0.08)', borderColor: '#F59E0B' + '30', borderWidth: 1 }]}>
            <Target size={20} color="#F59E0B" />
            <Text style={[styles.metricLabel, { color: theme.colors.textSecondary }]}>
              Skill Gap Score
            </Text>
            <Text style={[styles.metricValue, { color: '#F59E0B' }]}>
              {metrics.skillGapScore}%
            </Text>
            <Text style={[styles.metricSubtitle, { color: theme.colors.textSecondary }]}>
              Overall gap analysis
            </Text>
          </View>

          <View style={[styles.metricCard, { backgroundColor: 'rgba(59, 130, 246, 0.08)', borderColor: '#3B82F6' + '30', borderWidth: 1 }]}>
            <Clock size={20} color="#3B82F6" />
            <Text style={[styles.metricLabel, { color: theme.colors.textSecondary }]}>
              Avg Learning Hours
            </Text>
            <Text style={[styles.metricValue, { color: '#3B82F6' }]}>
              {metrics.avgLearningHours}h
            </Text>
            <Text style={[styles.metricSubtitle, { color: theme.colors.textSecondary }]}>
              Per employee/month
            </Text>
          </View>
        </View>
      </View>

      <View style={[styles.insightsSection, { backgroundColor: 'rgba(255,255,255,0.02)', borderColor: 'rgba(255,255,255,0.08)', borderWidth: 1 }]}>
        <View style={styles.insightItem}>
          <Flame size={14} color="#F59E0B" />
          <Text style={[styles.insightText, { color: theme.colors.textSecondary }]}>
            AI/ML skills training up 35% this quarter
          </Text>
        </View>
        <View style={styles.insightItem}>
          <Sparkles size={14} color="#10B981" />
          <Text style={[styles.insightText, { color: theme.colors.textSecondary }]}>
            Leadership program completion rate at 92%
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
  learningCard: {
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
  skillsRow: {
    flexDirection: 'row',
    gap: 14,
  },
  skillCard: {
    width: 180,
    padding: 16,
    borderRadius: 14,
  },
  skillHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  skillCategory: {
    fontSize: 13,
    fontWeight: '600',
  },
  demandBadge: {
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 8,
  },
  demandText: {
    fontSize: 10,
    fontWeight: '700',
  },
  skillProficiency: {
    fontSize: 32,
    fontWeight: '800',
    marginBottom: 12,
  },
  skillBar: {
    height: 10,
    borderRadius: 5,
    overflow: 'hidden',
    marginBottom: 12,
  },
  skillFill: {
    height: '100%',
    borderRadius: 5,
  },
  gapSection: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  gapText: {
    fontSize: 11,
    opacity: 0.7,
  },
  programsRow: {
    flexDirection: 'row',
    gap: 14,
  },
  programCard: {
    width: 200,
    padding: 16,
    borderRadius: 14,
  },
  programName: {
    fontSize: 13,
    fontWeight: '600',
    marginBottom: 14,
  },
  programStats: {
    flexDirection: 'row',
    gap: 14,
    marginBottom: 14,
  },
  programStat: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  programStatText: {
    fontSize: 11,
    opacity: 0.7,
  },
  completionRate: {
    fontSize: 16,
    fontWeight: '700',
    marginBottom: 10,
  },
  programBar: {
    height: 10,
    borderRadius: 5,
    overflow: 'hidden',
  },
  programFill: {
    height: '100%',
    borderRadius: 5,
  },
  metricsSection: {
    marginBottom: 16,
  },
  metricsGrid: {
    flexDirection: 'row',
    gap: 14,
  },
  metricCard: {
    flex: 1,
    padding: 18,
    borderRadius: 16,
  },
  metricLabel: {
    fontSize: 12,
    fontWeight: '600',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    marginBottom: 8,
    opacity: 0.7,
  },
  metricValue: {
    fontSize: 32,
    fontWeight: '800',
    marginBottom: 6,
  },
  metricSubtitle: {
    fontSize: 11,
    opacity: 0.8,
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