import React from 'react';
import { View, StyleSheet, Text, ScrollView } from 'react-native';
import { useTheme } from '@/providers/ThemeProvider';

interface RoadmapItem {
  id: string;
  name: string;
  timeframe: 'now' | 'next' | 'later';
  priority: 'high' | 'medium' | 'low';
  progress: number;
  team: string;
  impact: number;
  effort: number;
}

interface ProductRoadmapIntelligenceProps {
  roadmapItems: RoadmapItem[];
}

export default function ProductRoadmapIntelligence({ roadmapItems }: ProductRoadmapIntelligenceProps) {
  const { theme } = useTheme();

  const getTimeframeColor = (timeframe: string) => {
    switch (timeframe) {
      case 'now': return '#22C55E';
      case 'next': return '#3B82F6';
      case 'later': return '#8B5CF6';
      default: return '#6B7280';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return '#EF4444';
      case 'medium': return '#F59E0B';
      case 'low': return '#22C55E';
      default: return '#6B7280';
    }
  };

  const groupedItems = {
    now: roadmapItems.filter(item => item.timeframe === 'now'),
    next: roadmapItems.filter(item => item.timeframe === 'next'),
    later: roadmapItems.filter(item => item.timeframe === 'later'),
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.card }]}>
      <Text style={[styles.title, { color: theme.colors.text }]}>
        Product Roadmap Intelligence
      </Text>

      <ScrollView 
        style={styles.scrollContainer}
        showsVerticalScrollIndicator={false}
      >
        {/* Now Section */}
        <View style={styles.timeframeSection}>
          <View style={[styles.timeframeHeader, { borderLeftColor: getTimeframeColor('now') }]}>
            <Text style={[styles.timeframeTitle, { color: theme.colors.text }]}>
              Now
            </Text>
            <Text style={[styles.itemCount, { color: theme.colors.textSecondary }]}>
              {groupedItems.now.length} items
            </Text>
          </View>
          {groupedItems.now.map((item) => (
            <View 
              key={item.id}
              style={[styles.roadmapCard, { 
                backgroundColor: theme.colors.background,
                borderColor: theme.colors.border 
              }]}
            >
              <View style={styles.cardHeader}>
                <Text style={[styles.itemName, { color: theme.colors.text }]}>
                  {item.name}
                </Text>
                <View style={[styles.priorityBadge, { backgroundColor: `${getPriorityColor(item.priority)}20` }]}>
                  <Text style={[styles.priorityText, { color: getPriorityColor(item.priority) }]}>
                    {item.priority}
                  </Text>
                </View>
              </View>
              
              <View style={styles.progressSection}>
                <View style={styles.progressBar}>
                  <View 
                    style={[styles.progressFill, { 
                      width: `${item.progress}%`,
                      backgroundColor: getTimeframeColor('now')
                    }]} 
                  />
                </View>
                <Text style={[styles.progressText, { color: theme.colors.textSecondary }]}>
                  {item.progress}%
                </Text>
              </View>

              <View style={styles.metricsRow}>
                <View style={styles.metricItem}>
                  <Text style={[styles.metricLabel, { color: theme.colors.textSecondary }]}>
                    Team
                  </Text>
                  <Text style={[styles.metricValue, { color: theme.colors.text }]}>
                    {item.team}
                  </Text>
                </View>
                <View style={styles.metricItem}>
                  <Text style={[styles.metricLabel, { color: theme.colors.textSecondary }]}>
                    Impact
                  </Text>
                  <Text style={[styles.metricValue, { color: '#10B981' }]}>
                    {item.impact}
                  </Text>
                </View>
                <View style={styles.metricItem}>
                  <Text style={[styles.metricLabel, { color: theme.colors.textSecondary }]}>
                    Effort
                  </Text>
                  <Text style={[styles.metricValue, { color: '#F59E0B' }]}>
                    {item.effort}
                  </Text>
                </View>
              </View>
            </View>
          ))}
        </View>

        {/* Next Section */}
        <View style={styles.timeframeSection}>
          <View style={[styles.timeframeHeader, { borderLeftColor: getTimeframeColor('next') }]}>
            <Text style={[styles.timeframeTitle, { color: theme.colors.text }]}>
              Next
            </Text>
            <Text style={[styles.itemCount, { color: theme.colors.textSecondary }]}>
              {groupedItems.next.length} items
            </Text>
          </View>
          {groupedItems.next.map((item) => (
            <View 
              key={item.id}
              style={[styles.roadmapCard, { 
                backgroundColor: theme.colors.background,
                borderColor: theme.colors.border 
              }]}
            >
              <View style={styles.cardHeader}>
                <Text style={[styles.itemName, { color: theme.colors.text }]}>
                  {item.name}
                </Text>
                <View style={[styles.priorityBadge, { backgroundColor: `${getPriorityColor(item.priority)}20` }]}>
                  <Text style={[styles.priorityText, { color: getPriorityColor(item.priority) }]}>
                    {item.priority}
                  </Text>
                </View>
              </View>
              
              <View style={styles.metricsRow}>
                <View style={styles.metricItem}>
                  <Text style={[styles.metricLabel, { color: theme.colors.textSecondary }]}>
                    Team
                  </Text>
                  <Text style={[styles.metricValue, { color: theme.colors.text }]}>
                    {item.team}
                  </Text>
                </View>
                <View style={styles.metricItem}>
                  <Text style={[styles.metricLabel, { color: theme.colors.textSecondary }]}>
                    Impact
                  </Text>
                  <Text style={[styles.metricValue, { color: '#10B981' }]}>
                    {item.impact}
                  </Text>
                </View>
                <View style={styles.metricItem}>
                  <Text style={[styles.metricLabel, { color: theme.colors.textSecondary }]}>
                    Effort
                  </Text>
                  <Text style={[styles.metricValue, { color: '#F59E0B' }]}>
                    {item.effort}
                  </Text>
                </View>
              </View>
            </View>
          ))}
        </View>

        {/* Later Section */}
        <View style={styles.timeframeSection}>
          <View style={[styles.timeframeHeader, { borderLeftColor: getTimeframeColor('later') }]}>
            <Text style={[styles.timeframeTitle, { color: theme.colors.text }]}>
              Later
            </Text>
            <Text style={[styles.itemCount, { color: theme.colors.textSecondary }]}>
              {groupedItems.later.length} items
            </Text>
          </View>
          {groupedItems.later.map((item) => (
            <View 
              key={item.id}
              style={[styles.roadmapCard, { 
                backgroundColor: theme.colors.background,
                borderColor: theme.colors.border 
              }]}
            >
              <View style={styles.cardHeader}>
                <Text style={[styles.itemName, { color: theme.colors.text }]}>
                  {item.name}
                </Text>
                <View style={[styles.priorityBadge, { backgroundColor: `${getPriorityColor(item.priority)}20` }]}>
                  <Text style={[styles.priorityText, { color: getPriorityColor(item.priority) }]}>
                    {item.priority}
                  </Text>
                </View>
              </View>
              
              <View style={styles.metricsRow}>
                <View style={styles.metricItem}>
                  <Text style={[styles.metricLabel, { color: theme.colors.textSecondary }]}>
                    Team
                  </Text>
                  <Text style={[styles.metricValue, { color: theme.colors.text }]}>
                    {item.team}
                  </Text>
                </View>
                <View style={styles.metricItem}>
                  <Text style={[styles.metricLabel, { color: theme.colors.textSecondary }]}>
                    Impact
                  </Text>
                  <Text style={[styles.metricValue, { color: '#10B981' }]}>
                    {item.impact}
                  </Text>
                </View>
                <View style={styles.metricItem}>
                  <Text style={[styles.metricLabel, { color: theme.colors.textSecondary }]}>
                    Effort
                  </Text>
                  <Text style={[styles.metricValue, { color: '#F59E0B' }]}>
                    {item.effort}
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
    maxHeight: 600,
  },
  timeframeSection: {
    marginBottom: 20,
  },
  timeframeHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 8,
    borderLeftWidth: 4,
    marginBottom: 12,
  },
  timeframeTitle: {
    fontSize: 16,
    fontWeight: '600',
  },
  itemCount: {
    fontSize: 12,
  },
  roadmapCard: {
    borderWidth: 1,
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  itemName: {
    fontSize: 14,
    fontWeight: '600',
    flex: 1,
  },
  priorityBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  priorityText: {
    fontSize: 10,
    fontWeight: '600',
    textTransform: 'uppercase',
  },
  progressSection: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  progressBar: {
    flex: 1,
    height: 6,
    backgroundColor: 'rgba(255,255,255,0.1)',
    borderRadius: 3,
    marginRight: 8,
  },
  progressFill: {
    height: '100%',
    borderRadius: 3,
  },
  progressText: {
    fontSize: 12,
    fontWeight: '600',
    minWidth: 35,
  },
  metricsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  metricItem: {
    width: '33.33%',
    paddingRight: 8,
  },
  metricLabel: {
    fontSize: 10,
    marginBottom: 4,
  },
  metricValue: {
    fontSize: 12,
    fontWeight: '600',
  },
});
