import React from 'react';
import { View, StyleSheet, Text, ScrollView } from 'react-native';
import { useTheme } from '@/providers/ThemeProvider';

interface UserJourney {
  id: string;
  name: string;
  steps: string[];
  completionRate: number;
  avgDuration: string;
  dropOffRate: number;
  users: number;
}

interface FunnelStage {
  name: string;
  users: number;
  conversionRate: number;
  dropOff: number;
}

interface BehavioralHeatmap {
  page: string;
  area: string;
  interactionRate: number;
  clicks: number;
  hoverTime: string;
}

interface UserBehaviorAnalyticsProps {
  journeys: UserJourney[];
  funnelStages: FunnelStage[];
  heatmaps: BehavioralHeatmap[];
}

export default function UserBehaviorAnalytics({ journeys, funnelStages, heatmaps }: UserBehaviorAnalyticsProps) {
  const { theme } = useTheme();

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.card }]}>
      <Text style={[styles.title, { color: theme.colors.text }]}>
        User Behavior Analytics
      </Text>

      <ScrollView 
        style={styles.scrollContainer}
        showsVerticalScrollIndicator={false}
      >
        {/* User Journeys */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>
            User Journeys
          </Text>
          {journeys.map((journey) => (
            <View 
              key={journey.id}
              style={[styles.journeyCard, { 
                backgroundColor: theme.colors.background,
                borderColor: theme.colors.border 
              }]}
            >
              <View style={styles.journeyHeader}>
                <Text style={[styles.journeyName, { color: theme.colors.text }]}>
                  {journey.name}
                </Text>
                <Text style={[styles.journeyUsers, { color: theme.colors.textSecondary }]}>
                  {journey.users.toLocaleString()} users
                </Text>
              </View>

              <View style={styles.journeyMetrics}>
                <View style={styles.journeyMetric}>
                  <Text style={[styles.metricLabel, { color: theme.colors.textSecondary }]}>
                    Completion
                  </Text>
                  <Text style={[styles.metricValue, { color: '#22C55E' }]}>
                    {journey.completionRate}%
                  </Text>
                </View>
                <View style={styles.journeyMetric}>
                  <Text style={[styles.metricLabel, { color: theme.colors.textSecondary }]}>
                    Avg Duration
                  </Text>
                  <Text style={[styles.metricValue, { color: theme.colors.text }]}>
                    {journey.avgDuration}
                  </Text>
                </View>
                <View style={styles.journeyMetric}>
                  <Text style={[styles.metricLabel, { color: theme.colors.textSecondary }]}>
                    Drop-off
                  </Text>
                  <Text style={[styles.metricValue, { color: '#EF4444' }]}>
                    {journey.dropOffRate}%
                  </Text>
                </View>
              </View>

              <View style={styles.stepsContainer}>
                {journey.steps.map((step, index) => (
                  <View key={index} style={styles.stepItem}>
                    <View style={[styles.stepDot, { backgroundColor: '#3B82F6' }]} />
                    <Text style={[styles.stepText, { color: theme.colors.textSecondary }]}>
                      {step}
                    </Text>
                    {index < journey.steps.length - 1 && (
                      <View style={[styles.stepConnector, { backgroundColor: 'rgba(59, 130, 246, 0.3)' }]} />
                    )}
                  </View>
                ))}
              </View>
            </View>
          ))}
        </View>

        {/* Funnel Analysis */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>
            Conversion Funnel
          </Text>
          <View style={[styles.funnelCard, { backgroundColor: theme.colors.background }]}>
            {funnelStages.map((stage, index) => (
              <View key={stage.name} style={styles.funnelStage}>
                <View style={styles.funnelStageHeader}>
                  <Text style={[styles.stageName, { color: theme.colors.text }]}>
                    {stage.name}
                  </Text>
                  <Text style={[styles.stageUsers, { color: theme.colors.textSecondary }]}>
                    {stage.users.toLocaleString()}
                  </Text>
                </View>
                <View style={styles.funnelBarContainer}>
                  <View 
                    style={[
                      styles.funnelBar, 
                      { 
                        width: `${(stage.users / funnelStages[0].users) * 100}%`,
                        backgroundColor: index === 0 ? '#22C55E' : index === funnelStages.length - 1 ? '#8B5CF6' : '#3B82F6'
                      }
                    ]} 
                  />
                </View>
                <View style={styles.funnelMetrics}>
                  <Text style={[styles.funnelMetric, { color: theme.colors.textSecondary }]}>
                    Conversion: {stage.conversionRate}%
                  </Text>
                  <Text style={[styles.funnelMetric, { color: stage.dropOff > 20 ? '#EF4444' : theme.colors.textSecondary }]}>
                    Drop-off: {stage.dropOff}%
                  </Text>
                </View>
              </View>
            ))}
          </View>
        </View>

        {/* Behavioral Heatmaps */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>
            Behavioral Heatmaps
          </Text>
          {heatmaps.map((heatmap, index) => (
            <View 
              key={index}
              style={[styles.heatmapCard, { 
                backgroundColor: theme.colors.background,
                borderColor: theme.colors.border 
              }]}
            >
              <View style={styles.heatmapHeader}>
                <Text style={[styles.heatmapPage, { color: theme.colors.text }]}>
                  {heatmap.page}
                </Text>
                <Text style={[styles.heatmapArea, { color: theme.colors.textSecondary }]}>
                  {heatmap.area}
                </Text>
              </View>
              <View style={styles.heatmapMetrics}>
                <View style={styles.heatmapMetric}>
                  <Text style={[styles.metricLabel, { color: theme.colors.textSecondary }]}>
                    Interaction Rate
                  </Text>
                  <Text style={[styles.metricValue, { color: '#F59E0B' }]}>
                    {heatmap.interactionRate}%
                  </Text>
                </View>
                <View style={styles.heatmapMetric}>
                  <Text style={[styles.metricLabel, { color: theme.colors.textSecondary }]}>
                    Clicks
                  </Text>
                  <Text style={[styles.metricValue, { color: theme.colors.text }]}>
                    {heatmap.clicks.toLocaleString()}
                  </Text>
                </View>
                <View style={styles.heatmapMetric}>
                  <Text style={[styles.metricLabel, { color: theme.colors.textSecondary }]}>
                    Hover Time
                  </Text>
                  <Text style={[styles.metricValue, { color: theme.colors.text }]}>
                    {heatmap.hoverTime}
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
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 12,
  },
  journeyCard: {
    borderWidth: 1,
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
  },
  journeyHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  journeyName: {
    fontSize: 14,
    fontWeight: '600',
  },
  journeyUsers: {
    fontSize: 12,
  },
  journeyMetrics: {
    flexDirection: 'row',
    marginBottom: 12,
    paddingBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255,255,255,0.1)',
  },
  journeyMetric: {
    flex: 1,
  },
  metricLabel: {
    fontSize: 10,
    marginBottom: 4,
  },
  metricValue: {
    fontSize: 14,
    fontWeight: '600',
  },
  stepsContainer: {
    position: 'relative',
  },
  stepItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
    position: 'relative',
  },
  stepDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    marginRight: 12,
    zIndex: 1,
  },
  stepText: {
    fontSize: 12,
  },
  stepConnector: {
    position: 'absolute',
    left: 5,
    top: 12,
    width: 2,
    height: 20,
    zIndex: 0,
  },
  funnelCard: {
    borderRadius: 12,
    padding: 16,
  },
  funnelStage: {
    marginBottom: 16,
  },
  funnelStageHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  stageName: {
    fontSize: 14,
    fontWeight: '600',
  },
  stageUsers: {
    fontSize: 12,
  },
  funnelBarContainer: {
    height: 24,
    backgroundColor: 'rgba(255,255,255,0.1)',
    borderRadius: 4,
    marginBottom: 8,
    overflow: 'hidden',
  },
  funnelBar: {
    height: '100%',
    borderRadius: 4,
  },
  funnelMetrics: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  funnelMetric: {
    fontSize: 11,
  },
  heatmapCard: {
    borderWidth: 1,
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
  },
  heatmapHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  heatmapPage: {
    fontSize: 14,
    fontWeight: '600',
  },
  heatmapArea: {
    fontSize: 12,
  },
  heatmapMetrics: {
    flexDirection: 'row',
  },
  heatmapMetric: {
    flex: 1,
  },
});
