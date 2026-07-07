import React from 'react';
import { View, StyleSheet, Text, ScrollView } from 'react-native';
import { useTheme } from '@/providers/ThemeProvider';
import { Briefcase, TrendingUp, Target, Zap, AlertCircle, CheckCircle } from 'lucide-react-native';

export default function ResearchPortfolioManagement() {
  const { theme } = useTheme();

  const portfolioCategories = [
    {
      id: 'fundamental',
      name: 'Fundamental Research',
      projects: 42,
      budget: '$42M',
      progress: 78,
      status: 'on-track',
      color: '#0B8AFF'
    },
    {
      id: 'applied',
      name: 'Applied Research',
      projects: 68,
      budget: '$56M',
      progress: 65,
      status: 'on-track',
      color: '#8B5CF6'
    },
    {
      id: 'product',
      name: 'Product Innovation',
      projects: 54,
      budget: '$38M',
      progress: 82,
      status: 'ahead',
      color: '#10B981'
    },
    {
      id: 'technology',
      name: 'Technology Exploration',
      projects: 38,
      budget: '$24M',
      progress: 54,
      status: 'attention',
      color: '#F59E0B'
    },
    {
      id: 'strategic',
      name: 'Strategic Initiatives',
      projects: 46,
      budget: '$24M',
      progress: 71,
      status: 'on-track',
      color: '#06B6D4'
    }
  ];

  const projectStatusMatrix = [
    { status: 'Completed', count: 89, color: '#10B981' },
    { status: 'In Progress', count: 124, color: '#0B8AFF' },
    { status: 'Planning', count: 28, color: '#8B5CF6' },
    { status: 'On Hold', count: 7, color: '#F59E0B' }
  ];

  const resourceAllocation = [
    { category: 'Personnel', value: 45, color: '#0B8AFF' },
    { category: 'Equipment', value: 25, color: '#8B5CF6' },
    { category: 'Facilities', value: 18, color: '#10B981' },
    { category: 'External', value: 12, color: '#F59E0B' }
  ];

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.card }]}>
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <Briefcase size={24} color="#0B8AFF" />
          <Text style={[styles.headerTitle, { color: theme.colors.text }]}>
            Research Portfolio Management
          </Text>
        </View>
      </View>

      {/* Portfolio Heatmap */}
      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>
          Portfolio Overview
        </Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {portfolioCategories.map((category) => (
            <View 
              key={category.id}
              style={[
                styles.portfolioCard,
                { 
                  backgroundColor: category.color + '15',
                  borderColor: category.color + '30'
                }
              ]}
            >
              <View style={styles.portfolioHeader}>
                <Text style={[styles.portfolioName, { color: theme.colors.text }]}>
                  {category.name}
                </Text>
                <View style={[
                  styles.statusBadge,
                  { 
                    backgroundColor: category.status === 'ahead' ? '#10B981' + '20' : 
                                   category.status === 'attention' ? '#F59E0B' + '20' : '#0B8AFF' + '20'
                  }
                ]}>
                  {category.status === 'ahead' && <CheckCircle size={12} color="#10B981" />}
                  {category.status === 'attention' && <AlertCircle size={12} color="#F59E0B" />}
                  {category.status === 'on-track' && <Target size={12} color="#0B8AFF" />}
                  <Text style={[
                    styles.statusText,
                    { 
                      color: category.status === 'ahead' ? '#10B981' : 
                             category.status === 'attention' ? '#F59E0B' : '#0B8AFF'
                    }
                  ]}>
                    {category.status}
                  </Text>
                </View>
              </View>

              <View style={styles.portfolioMetrics}>
                <View style={styles.metricRow}>
                  <Text style={[styles.metricLabel, { color: theme.colors.textSecondary }]}>
                    Projects
                  </Text>
                  <Text style={[styles.metricValue, { color: theme.colors.text }]}>
                    {category.projects}
                  </Text>
                </View>
                <View style={styles.metricRow}>
                  <Text style={[styles.metricLabel, { color: theme.colors.textSecondary }]}>
                    Budget
                  </Text>
                  <Text style={[styles.metricValue, { color: theme.colors.text }]}>
                    {category.budget}
                  </Text>
                </View>
              </View>

              <View style={styles.progressSection}>
                <View style={styles.progressHeader}>
                  <Text style={[styles.progressLabel, { color: theme.colors.textSecondary }]}>
                    Progress
                  </Text>
                  <Text style={[styles.progressValue, { color: theme.colors.text }]}>
                    {category.progress}%
                  </Text>
                </View>
                <View style={[styles.progressBar, { backgroundColor: theme.colors.border }]}>
                  <View 
                    style={[
                      styles.progressFill,
                      { 
                        backgroundColor: category.color,
                        width: `${category.progress}%`
                      }
                    ]} 
                  />
                </View>
              </View>
            </View>
          ))}
        </ScrollView>
      </View>

      {/* Project Status Matrix */}
      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>
          Project Status Matrix
        </Text>
        <View style={styles.statusGrid}>
          {projectStatusMatrix.map((item) => (
            <View key={item.status} style={styles.statusCard}>
              <View style={[styles.statusDot, { backgroundColor: item.color }]} />
              <Text style={[styles.statusLabel, { color: theme.colors.textSecondary }]}>
                {item.status}
              </Text>
              <Text style={[styles.statusCount, { color: theme.colors.text }]}>
                {item.count}
              </Text>
            </View>
          ))}
        </View>
      </View>

      {/* Resource Allocation */}
      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>
          Resource Allocation
        </Text>
        <View style={styles.resourceGrid}>
          {resourceAllocation.map((item) => (
            <View key={item.category} style={styles.resourceItem}>
              <View style={styles.resourceHeader}>
                <View style={[styles.resourceDot, { backgroundColor: item.color }]} />
                <Text style={[styles.resourceLabel, { color: theme.colors.textSecondary }]}>
                  {item.category}
                </Text>
              </View>
              <Text style={[styles.resourceValue, { color: theme.colors.text }]}>
                {item.value}%
              </Text>
              <View style={[styles.resourceBar, { backgroundColor: theme.colors.border }]}>
                <View 
                  style={[
                    styles.resourceBarFill,
                    { 
                      backgroundColor: item.color,
                      width: `${item.value}%`
                    }
                  ]} 
                />
              </View>
            </View>
          ))}
        </View>
      </View>

      {/* Innovation Maturity Tracking */}
      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>
          Innovation Maturity Tracking
        </Text>
        <View style={styles.maturityContainer}>
          {['TRL 1-2', 'TRL 3-4', 'TRL 5-6', 'TRL 7-8', 'TRL 9'].map((trl, index) => (
            <View key={trl} style={styles.maturityLevel}>
              <View style={[
                styles.maturityBar,
                { 
                  backgroundColor: ['#EF4444', '#F59E0B', '#0B8AFF', '#8B5CF6', '#10B981'][index],
                  height: [20, 35, 55, 75, 85][index] + '%'
                }
              ]} />
              <Text style={[styles.maturityLabel, { color: theme.colors.textSecondary }]}>
                {trl}
              </Text>
            </View>
          ))}
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
  portfolioCard: {
    width: 200,
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    marginRight: 12,
  },
  portfolioHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  portfolioName: {
    fontSize: 14,
    fontWeight: '600',
  },
  statusBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  statusText: {
    fontSize: 10,
    fontWeight: '600',
    marginLeft: 4,
  },
  portfolioMetrics: {
    marginBottom: 12,
  },
  metricRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  metricLabel: {
    fontSize: 11,
  },
  metricValue: {
    fontSize: 13,
    fontWeight: '600',
  },
  progressSection: {
    marginTop: 8,
  },
  progressHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 6,
  },
  progressLabel: {
    fontSize: 11,
  },
  progressValue: {
    fontSize: 12,
    fontWeight: '600',
  },
  progressBar: {
    height: 6,
    borderRadius: 3,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    borderRadius: 3,
  },
  statusGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  statusCard: {
    width: '23%',
    marginRight: '2%',
    marginBottom: 12,
    padding: 12,
    borderRadius: 8,
    backgroundColor: 'rgba(255,255,255,0.05)',
  },
  statusDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginBottom: 8,
  },
  statusLabel: {
    fontSize: 11,
    marginBottom: 4,
  },
  statusCount: {
    fontSize: 18,
    fontWeight: '700',
  },
  resourceGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  resourceItem: {
    width: '48%',
    marginRight: '2%',
    marginBottom: 16,
  },
  resourceHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  resourceDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: 8,
  },
  resourceLabel: {
    fontSize: 12,
  },
  resourceValue: {
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 8,
  },
  resourceBar: {
    height: 6,
    borderRadius: 3,
    overflow: 'hidden',
  },
  resourceBarFill: {
    height: '100%',
    borderRadius: 3,
  },
  maturityContainer: {
    flexDirection: 'row',
    height: 120,
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    paddingHorizontal: 8,
  },
  maturityLevel: {
    flex: 1,
    alignItems: 'center',
    marginHorizontal: 4,
  },
  maturityBar: {
    width: '100%',
    borderRadius: 4,
    minHeight: 4,
  },
  maturityLabel: {
    fontSize: 10,
    marginTop: 8,
  },
});