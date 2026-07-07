import React from 'react';
import { View, StyleSheet, Text, ScrollView } from 'react-native';
import { useTheme } from '@/providers/ThemeProvider';

interface FeatureRequest {
  id: string;
  title: string;
  demandScore: number;
  revenueImpact: string;
  engineeringEffort: number;
  strategicAlignment: number;
  votes: number;
  status: 'backlog' | 'planned' | 'in-progress' | 'shipped';
}

interface FeaturePrioritizationEngineProps {
  features: FeatureRequest[];
}

export default function FeaturePrioritizationEngine({ features }: FeaturePrioritizationEngineProps) {
  const { theme } = useTheme();

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'backlog': return '#6B7280';
      case 'planned': return '#3B82F6';
      case 'in-progress': return '#F59E0B';
      case 'shipped': return '#22C55E';
      default: return '#6B7280';
    }
  };

  const getPriorityScore = (feature: FeatureRequest) => {
    const demandWeight = 0.3;
    const revenueWeight = 0.25;
    const effortWeight = 0.2;
    const strategicWeight = 0.25;
    
    const revenueNumeric = parseFloat(feature.revenueImpact.replace(/[^0-9.]/g, '')) || 0;
    const effortInverse = 1 / (feature.engineeringEffort || 1);
    
    return (
      (feature.demandScore * demandWeight) +
      (revenueNumeric * revenueWeight) +
      (effortInverse * 100 * effortWeight) +
      (feature.strategicAlignment * strategicWeight)
    ).toFixed(1);
  };

  const sortedFeatures = [...features].sort((a, b) => 
    parseFloat(getPriorityScore(b)) - parseFloat(getPriorityScore(a))
  );

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.card }]}>
      <Text style={[styles.title, { color: theme.colors.text }]}>
        Feature Prioritization Engine
      </Text>

      <ScrollView 
        style={styles.scrollContainer}
        showsVerticalScrollIndicator={false}
      >
        {/* Impact vs Effort Matrix Header */}
        <View style={[styles.matrixHeader, { backgroundColor: theme.colors.background }]}>
          <Text style={[styles.matrixTitle, { color: theme.colors.text }]}>
            Priority Scoring
          </Text>
          <Text style={[styles.matrixSubtitle, { color: theme.colors.textSecondary }]}>
            AI-powered prioritization based on demand, revenue, effort, and strategy
          </Text>
        </View>

        {/* Feature Leaderboard */}
        <View style={styles.leaderboardSection}>
          <Text style={[styles.leaderboardTitle, { color: theme.colors.text }]}>
            Feature Leaderboard
          </Text>
          {sortedFeatures.map((feature, index) => (
            <View 
              key={feature.id}
              style={[styles.featureCard, { 
                backgroundColor: theme.colors.background,
                borderColor: theme.colors.border,
                borderLeftColor: index < 3 ? '#F59E0B' : theme.colors.border,
                borderLeftWidth: index < 3 ? 4 : 1
              }]}
            >
              <View style={styles.featureHeader}>
                <View style={styles.rankSection}>
                  <View style={[styles.rankBadge, { backgroundColor: index < 3 ? '#F59E0B' : '#6B7280' }]}>
                    <Text style={styles.rankText}>#{index + 1}</Text>
                  </View>
                  <Text style={[styles.featureTitle, { color: theme.colors.text }]}>
                    {feature.title}
                  </Text>
                </View>
                <View style={[styles.statusBadge, { backgroundColor: `${getStatusColor(feature.status)}20` }]}>
                  <Text style={[styles.statusText, { color: getStatusColor(feature.status) }]}>
                    {feature.status}
                  </Text>
                </View>
              </View>

              <View style={styles.scoreSection}>
                <View style={styles.scoreCard}>
                  <Text style={[styles.scoreLabel, { color: theme.colors.textSecondary }]}>
                    Priority Score
                  </Text>
                  <Text style={[styles.scoreValue, { color: '#8B5CF6' }]}>
                    {getPriorityScore(feature)}
                  </Text>
                </View>
                <View style={styles.scoreCard}>
                  <Text style={[styles.scoreLabel, { color: theme.colors.textSecondary }]}>
                    Demand Score
                  </Text>
                  <Text style={[styles.scoreValue, { color: '#3B82F6' }]}>
                    {feature.demandScore}
                  </Text>
                </View>
                <View style={styles.scoreCard}>
                  <Text style={[styles.scoreLabel, { color: theme.colors.textSecondary }]}>
                    Revenue Impact
                  </Text>
                  <Text style={[styles.scoreValue, { color: '#10B981' }]}>
                    {feature.revenueImpact}
                  </Text>
                </View>
              </View>

              <View style={styles.metricsGrid}>
                <View style={styles.metricItem}>
                  <Text style={[styles.metricLabel, { color: theme.colors.textSecondary }]}>
                    Engineering Effort
                  </Text>
                  <View style={styles.effortBar}>
                    <View 
                      style={[
                        styles.effortFill, 
                        { 
                          width: `${(feature.engineeringEffort / 10) * 100}%`,
                          backgroundColor: feature.engineeringEffort > 7 ? '#EF4444' : feature.engineeringEffort > 4 ? '#F59E0B' : '#22C55E'
                        }
                      ]} 
                    />
                  </View>
                  <Text style={[styles.metricValue, { color: theme.colors.text }]}>
                    {feature.engineeringEffort}/10
                  </Text>
                </View>
                <View style={styles.metricItem}>
                  <Text style={[styles.metricLabel, { color: theme.colors.textSecondary }]}>
                    Strategic Alignment
                  </Text>
                  <View style={styles.alignmentBar}>
                    <View 
                      style={[
                        styles.alignmentFill, 
                        { 
                          width: `${feature.strategicAlignment}%`,
                          backgroundColor: '#8B5CF6'
                        }
                      ]} 
                    />
                  </View>
                  <Text style={[styles.metricValue, { color: theme.colors.text }]}>
                    {feature.strategicAlignment}%
                  </Text>
                </View>
                <View style={styles.metricItem}>
                  <Text style={[styles.metricLabel, { color: theme.colors.textSecondary }]}>
                    User Votes
                  </Text>
                  <Text style={[styles.metricValue, { color: theme.colors.text }]}>
                    {feature.votes.toLocaleString()}
                  </Text>
                </View>
              </View>
            </View>
          ))}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    borderRadius: 12,
    marginBottom: 16,
  },
  title: {
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 16,
  },
  scrollContainer: {
    maxHeight: 700,
  },
  matrixHeader: {
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
  },
  matrixTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  matrixSubtitle: {
    fontSize: 12,
  },
  leaderboardSection: {
    marginBottom: 16,
  },
  leaderboardTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 12,
  },
  featureCard: {
    borderWidth: 1,
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
  },
  featureHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  rankSection: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  rankBadge: {
    width: 28,
    height: 28,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  rankText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  featureTitle: {
    fontSize: 14,
    fontWeight: '600',
    flex: 1,
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  statusText: {
    fontSize: 10,
    fontWeight: '600',
    textTransform: 'uppercase',
  },
  scoreSection: {
    flexDirection: 'row',
    marginBottom: 12,
    paddingBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255,255,255,0.1)',
  },
  scoreCard: {
    flex: 1,
    alignItems: 'center',
  },
  scoreLabel: {
    fontSize: 10,
    marginBottom: 4,
  },
  scoreValue: {
    fontSize: 18,
    fontWeight: '700',
  },
  metricsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  metricItem: {
    width: '33.33%',
    paddingRight: 8,
    marginBottom: 8,
  },
  metricLabel: {
    fontSize: 10,
    marginBottom: 4,
  },
  metricValue: {
    fontSize: 12,
    fontWeight: '600',
    marginBottom: 4,
  },
  effortBar: {
    height: 4,
    backgroundColor: 'rgba(255,255,255,0.1)',
    borderRadius: 2,
    marginBottom: 4,
  },
  effortFill: {
    height: '100%',
    borderRadius: 2,
  },
  alignmentBar: {
    height: 4,
    backgroundColor: 'rgba(255,255,255,0.1)',
    borderRadius: 2,
    marginBottom: 4,
  },
  alignmentFill: {
    height: '100%',
    borderRadius: 2,
  },
});
