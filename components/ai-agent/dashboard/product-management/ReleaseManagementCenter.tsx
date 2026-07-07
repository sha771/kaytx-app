import React from 'react';
import { View, StyleSheet, Text, ScrollView } from 'react-native';
import { useTheme } from '@/providers/ThemeProvider';

interface Release {
  id: string;
  version: string;
  name: string;
  status: 'scheduled' | 'in-progress' | 'completed' | 'rolled-back';
  releaseDate: string;
  features: number;
  impact: string;
  rollbackRisk: 'low' | 'medium' | 'high';
}

interface ReleaseManagementCenterProps {
  releases: Release[];
}

export default function ReleaseManagementCenter({ releases }: ReleaseManagementCenterProps) {
  const { theme } = useTheme();

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'scheduled': return '#3B82F6';
      case 'in-progress': return '#F59E0B';
      case 'completed': return '#22C55E';
      case 'rolled-back': return '#EF4444';
      default: return '#6B7280';
    }
  };

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case 'low': return '#22C55E';
      case 'medium': return '#F59E0B';
      case 'high': return '#EF4444';
      default: return '#6B7280';
    }
  };

  const groupedReleases = {
    inProgress: releases.filter(r => r.status === 'in-progress'),
    scheduled: releases.filter(r => r.status === 'scheduled'),
    completed: releases.filter(r => r.status === 'completed'),
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.card }]}>
      <Text style={[styles.title, { color: theme.colors.text }]}>
        Release Management Center
      </Text>

      <ScrollView 
        style={styles.scrollContainer}
        showsVerticalScrollIndicator={false}
      >
        {/* Release Overview */}
        <View style={[styles.overviewCard, { backgroundColor: theme.colors.background }]}>
          <View style={styles.overviewMetric}>
            <Text style={[styles.overviewLabel, { color: theme.colors.textSecondary }]}>
              In Progress
            </Text>
            <Text style={[styles.overviewValue, { color: '#F59E0B' }]}>
              {groupedReleases.inProgress.length}
            </Text>
          </View>
          <View style={styles.overviewMetric}>
            <Text style={[styles.overviewLabel, { color: theme.colors.textSecondary }]}>
              Scheduled
            </Text>
            <Text style={[styles.overviewValue, { color: '#3B82F6' }]}>
              {groupedReleases.scheduled.length}
            </Text>
          </View>
          <View style={styles.overviewMetric}>
            <Text style={[styles.overviewLabel, { color: theme.colors.textSecondary }]}>
              Completed (30d)
            </Text>
            <Text style={[styles.overviewValue, { color: '#22C55E' }]}>
              {groupedReleases.completed.length}
            </Text>
          </View>
          <View style={styles.overviewMetric}>
            <Text style={[styles.overviewLabel, { color: theme.colors.textSecondary }]}>
              Features Shipped
            </Text>
            <Text style={[styles.overviewValue, { color: '#8B5CF6' }]}>
              {releases.reduce((acc, r) => acc + r.features, 0)}
            </Text>
          </View>
        </View>

        {/* In Progress Releases */}
        <View style={styles.releaseSection}>
          <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>
            In Progress
          </Text>
          {groupedReleases.inProgress.map((release) => (
            <View 
              key={release.id}
              style={[styles.releaseCard, { 
                backgroundColor: theme.colors.background,
                borderColor: theme.colors.border,
                borderLeftColor: getStatusColor(release.status),
                borderLeftWidth: 4
              }]}
            >
              <View style={styles.releaseHeader}>
                <View style={styles.releaseInfo}>
                  <Text style={[styles.releaseVersion, { color: theme.colors.text }]}>
                    {release.version}
                  </Text>
                  <Text style={[styles.releaseName, { color: theme.colors.textSecondary }]}>
                    {release.name}
                  </Text>
                </View>
                <View style={[styles.statusBadge, { backgroundColor: `${getStatusColor(release.status)}20` }]}>
                  <Text style={[styles.statusText, { color: getStatusColor(release.status) }]}>
                    {release.status}
                  </Text>
                </View>
              </View>

              <View style={styles.releaseMetrics}>
                <View style={styles.metricItem}>
                  <Text style={[styles.metricLabel, { color: theme.colors.textSecondary }]}>
                    Release Date
                  </Text>
                  <Text style={[styles.metricValue, { color: theme.colors.text }]}>
                    {release.releaseDate}
                  </Text>
                </View>
                <View style={styles.metricItem}>
                  <Text style={[styles.metricLabel, { color: theme.colors.textSecondary }]}>
                    Features
                  </Text>
                  <Text style={[styles.metricValue, { color: theme.colors.text }]}>
                    {release.features}
                  </Text>
                </View>
                <View style={styles.metricItem}>
                  <Text style={[styles.metricLabel, { color: theme.colors.textSecondary }]}>
                    Risk Level
                  </Text>
                  <Text style={[styles.metricValue, { color: getRiskColor(release.rollbackRisk) }]}>
                    {release.rollbackRisk}
                  </Text>
                </View>
              </View>

              <View style={styles.deploymentPipeline}>
                <Text style={[styles.pipelineLabel, { color: theme.colors.textSecondary }]}>
                  Deployment Pipeline
                </Text>
                <View style={styles.pipelineStages}>
                  <View style={styles.pipelineStage}>
                    <View style={[styles.stageDot, { backgroundColor: '#22C55E' }]} />
                    <Text style={[styles.stageText, { color: theme.colors.text }]}>
                      Build
                    </Text>
                  </View>
                  <View style={styles.pipelineConnector} />
                  <View style={styles.pipelineStage}>
                    <View style={[styles.stageDot, { backgroundColor: '#22C55E' }]} />
                    <Text style={[styles.stageText, { color: theme.colors.text }]}>
                      Test
                    </Text>
                  </View>
                  <View style={styles.pipelineConnector} />
                  <View style={styles.pipelineStage}>
                    <View style={[styles.stageDot, { backgroundColor: '#F59E0B' }]} />
                    <Text style={[styles.stageText, { color: theme.colors.text }]}>
                      Staging
                    </Text>
                  </View>
                  <View style={styles.pipelineConnector} />
                  <View style={styles.pipelineStage}>
                    <View style={[styles.stageDot, { backgroundColor: '#6B7280' }]} />
                    <Text style={[styles.stageText, { color: theme.colors.textSecondary }]}>
                      Production
                    </Text>
                  </View>
                </View>
              </View>
            </View>
          ))}
        </View>

        {/* Scheduled Releases */}
        <View style={styles.releaseSection}>
          <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>
            Scheduled
          </Text>
          {groupedReleases.scheduled.map((release) => (
            <View 
              key={release.id}
              style={[styles.releaseCard, { 
                backgroundColor: theme.colors.background,
                borderColor: theme.colors.border 
              }]}
            >
              <View style={styles.releaseHeader}>
                <View style={styles.releaseInfo}>
                  <Text style={[styles.releaseVersion, { color: theme.colors.text }]}>
                    {release.version}
                  </Text>
                  <Text style={[styles.releaseName, { color: theme.colors.textSecondary }]}>
                    {release.name}
                  </Text>
                </View>
                <View style={[styles.statusBadge, { backgroundColor: `${getStatusColor(release.status)}20` }]}>
                  <Text style={[styles.statusText, { color: getStatusColor(release.status) }]}>
                    {release.status}
                  </Text>
                </View>
              </View>

              <View style={styles.releaseMetrics}>
                <View style={styles.metricItem}>
                  <Text style={[styles.metricLabel, { color: theme.colors.textSecondary }]}>
                    Release Date
                  </Text>
                  <Text style={[styles.metricValue, { color: theme.colors.text }]}>
                    {release.releaseDate}
                  </Text>
                </View>
                <View style={styles.metricItem}>
                  <Text style={[styles.metricLabel, { color: theme.colors.textSecondary }]}>
                    Features
                  </Text>
                  <Text style={[styles.metricValue, { color: theme.colors.text }]}>
                    {release.features}
                  </Text>
                </View>
                <View style={styles.metricItem}>
                  <Text style={[styles.metricLabel, { color: theme.colors.textSecondary }]}>
                    Expected Impact
                  </Text>
                  <Text style={[styles.metricValue, { color: '#10B981' }]}>
                    {release.impact}
                  </Text>
                </View>
              </View>
            </View>
          ))}
        </View>

        {/* Recent Releases */}
        <View style={styles.releaseSection}>
          <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>
            Recently Completed
          </Text>
          {groupedReleases.completed.slice(0, 5).map((release) => (
            <View 
              key={release.id}
              style={[styles.releaseCard, { 
                backgroundColor: theme.colors.background,
                borderColor: theme.colors.border,
                opacity: 0.8
              }]}
            >
              <View style={styles.releaseHeader}>
                <View style={styles.releaseInfo}>
                  <Text style={[styles.releaseVersion, { color: theme.colors.text }]}>
                    {release.version}
                  </Text>
                  <Text style={[styles.releaseName, { color: theme.colors.textSecondary }]}>
                    {release.name}
                  </Text>
                </View>
                <View style={[styles.statusBadge, { backgroundColor: `${getStatusColor(release.status)}20` }]}>
                  <Text style={[styles.statusText, { color: getStatusColor(release.status) }]}>
                    {release.status}
                  </Text>
                </View>
              </View>

              <View style={styles.releaseMetrics}>
                <View style={styles.metricItem}>
                  <Text style={[styles.metricLabel, { color: theme.colors.textSecondary }]}>
                    Released
                  </Text>
                  <Text style={[styles.metricValue, { color: theme.colors.text }]}>
                    {release.releaseDate}
                  </Text>
                </View>
                <View style={styles.metricItem}>
                  <Text style={[styles.metricLabel, { color: theme.colors.textSecondary }]}>
                    Features
                  </Text>
                  <Text style={[styles.metricValue, { color: theme.colors.text }]}>
                    {release.features}
                  </Text>
                </View>
                <View style={styles.metricItem}>
                  <Text style={[styles.metricLabel, { color: theme.colors.textSecondary }]}>
                    Impact
                  </Text>
                  <Text style={[styles.metricValue, { color: '#10B981' }]}>
                    {release.impact}
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
  overviewCard: {
    borderRadius: 12,
    padding: 16,
    marginBottom: 20,
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  overviewMetric: {
    width: '25%',
    marginBottom: 12,
  },
  overviewLabel: {
    fontSize: 10,
    marginBottom: 4,
  },
  overviewValue: {
    fontSize: 20,
    fontWeight: '700',
  },
  releaseSection: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 12,
  },
  releaseCard: {
    borderWidth: 1,
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
  },
  releaseHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  releaseInfo: {
    flex: 1,
  },
  releaseVersion: {
    fontSize: 16,
    fontWeight: '700',
    marginBottom: 4,
  },
  releaseName: {
    fontSize: 12,
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
  releaseMetrics: {
    flexDirection: 'row',
    marginBottom: 12,
    paddingBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255,255,255,0.1)',
  },
  metricItem: {
    flex: 1,
  },
  metricLabel: {
    fontSize: 10,
    marginBottom: 4,
  },
  metricValue: {
    fontSize: 12,
    fontWeight: '600',
  },
  deploymentPipeline: {
    marginTop: 8,
  },
  pipelineLabel: {
    fontSize: 11,
    marginBottom: 8,
  },
  pipelineStages: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  pipelineStage: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  stageDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginRight: 6,
  },
  stageText: {
    fontSize: 11,
    fontWeight: '600',
  },
  pipelineConnector: {
    width: 24,
    height: 2,
    backgroundColor: 'rgba(255,255,255,0.2)',
    marginHorizontal: 4,
  },
});
