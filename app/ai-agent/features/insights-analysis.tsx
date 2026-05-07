import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useTheme } from '@/providers/ThemeProvider';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { 
  ChevronLeft, 
  ChartBarBig, 
  TrendingUp, 
  ChartPie, 
  Activity, 
  Target, 
  Zap, 
  Lightbulb,
  ArrowUpRight,
  ListFilter,
  Download
} from 'lucide-react-native';
import AgentFeatures from '@/components/ai-agent/AgentFeatures';

export default function InsightsAnalysisPage() {
  const { theme } = useTheme();
  const router = useRouter();
  const { agentId, agentName } = useLocalSearchParams<{ agentId: string; agentName: string }>();

  const insights = [
    { 
      title: 'Performance Trends', 
      value: '+24%', 
      trend: 'up', 
      icon: TrendingUp,
      color: '#34C759',
      description: 'Increased efficiency over last 30 days'
    },
    { 
      title: 'Task Completion', 
      value: '94.2%', 
      trend: 'up', 
      icon: Target,
      color: '#007AFF',
      description: 'Above target by 4.2%'
    },
    { 
      title: 'Response Quality', 
      value: '4.8/5', 
      trend: 'stable', 
      icon: Activity,
      color: '#FF9500',
      description: 'Based on 1,247 interactions'
    },
    { 
      title: 'Automation Rate', 
      value: '87%', 
      trend: 'up', 
      icon: Zap,
      color: '#AF52DE',
      description: 'Tasks handled autonomously'
    },
  ];

  const analysisCategories = [
    { name: 'Workflow Efficiency', score: 92, icon: ChartBarBig },
    { name: 'Decision Accuracy', score: 88, icon: Target },
    { name: 'User Satisfaction', score: 95, icon: ChartPie },
    { name: 'Learning Progress', score: 78, icon: Lightbulb },
  ];

  const recentFindings = [
    { title: 'Peak performance during business hours', detail: '9 AM - 5 PM shows 40% higher efficiency', time: '2 hours ago' },
    { title: 'Pattern detected in user queries', detail: '35% increase in technical questions this week', time: '5 hours ago' },
    { title: 'Optimization opportunity identified', detail: 'Response time can be improved by 15%', time: '1 day ago' },
    { title: 'Correlation found: Training data vs Accuracy', detail: 'Additional domain data recommended', time: '2 days ago' },
  ];

  return (
    <ScrollView style={[styles.container, { backgroundColor: theme.colors.background }]}>
      {/* Header */}
      <View style={[styles.header, { backgroundColor: theme.colors.card || '#F2F2F7' }]}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <ChevronLeft size={28} color={theme.colors.text} />
        </TouchableOpacity>
        <View style={styles.headerContent}>
          <Text style={[styles.headerTitle, { color: theme.colors.text }]}>Insights & Analysis</Text>
          <Text style={[styles.headerSubtitle, { color: theme.colors.textSecondary }]}>
            {agentName || 'AI Agent'} Performance Analytics
          </Text>
        </View>
        <TouchableOpacity style={styles.actionButton}>
          <Download size={20} color={theme.colors.primary} />
        </TouchableOpacity>
      </View>

      {/* Key Metrics */}
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Key Metrics</Text>
          <TouchableOpacity style={styles.filterBtn}>
            <ListFilter size={16} color={theme.colors.primary} />
            <Text style={[styles.filterText, { color: theme.colors.primary }]}>Filter</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.metricsGrid}>
          {insights.map((item, index) => (
            <View key={index} style={[styles.metricCard, { backgroundColor: theme.colors.card || '#F2F2F7' }]}>
              <View style={styles.metricHeader}>
                <item.icon size={20} color={item.color} />
                <ArrowUpRight size={16} color={item.trend === 'up' ? '#34C759' : '#8E8E93'} />
              </View>
              <Text style={[styles.metricValue, { color: theme.colors.text }]}>{item.value}</Text>
              <Text style={[styles.metricTitle, { color: theme.colors.textSecondary }]}>{item.title}</Text>
              <Text style={[styles.metricDesc, { color: theme.colors.textSecondary }]}>{item.description}</Text>
            </View>
          ))}
        </View>
      </View>

      {/* Analysis Categories */}
      <View style={[styles.section, { backgroundColor: theme.colors.card || '#F2F2F7' }]}>
        <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Analysis Categories</Text>
        {analysisCategories.map((cat, index) => (
          <View key={index} style={styles.analysisRow}>
            <View style={styles.analysisLeft}>
              <View style={[styles.analysisIcon, { backgroundColor: theme.colors.primary + '15' }]}>
                <cat.icon size={18} color={theme.colors.primary} />
              </View>
              <Text style={[styles.analysisName, { color: theme.colors.text }]}>{cat.name}</Text>
            </View>
            <View style={styles.analysisRight}>
              <View style={[styles.progressBar, { backgroundColor: theme.colors.background }]}>
                <View style={[styles.progressFill, { width: `${cat.score}%`, backgroundColor: theme.colors.primary }]} />
              </View>
              <Text style={[styles.analysisScore, { color: theme.colors.primary }]}>{cat.score}%</Text>
            </View>
          </View>
        ))}
      </View>

      {/* Recent Findings */}
      <View style={[styles.section, { backgroundColor: theme.colors.card || '#F2F2F7' }]}>
        <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Recent Findings</Text>
        {recentFindings.map((finding, index) => (
          <View key={index} style={styles.findingRow}>
            <View style={[styles.findingDot, { backgroundColor: theme.colors.primary }]} />
            <View style={styles.findingContent}>
              <Text style={[styles.findingTitle, { color: theme.colors.text }]}>{finding.title}</Text>
              <Text style={[styles.findingDetail, { color: theme.colors.textSecondary }]}>{finding.detail}</Text>
              <Text style={[styles.findingTime, { color: theme.colors.textSecondary }]}>{finding.time}</Text>
            </View>
          </View>
        ))}
      </View>

      {/* Action Button */}
      <TouchableOpacity style={[styles.fullReportBtn, { backgroundColor: theme.colors.primary }]}>
        <ChartBarBig size={20} color="#fff" />
        <Text style={styles.fullReportText}>Generate Full Report</Text>
      </TouchableOpacity>
    
      <AgentFeatures agentId="insights-analysis" agentName="Insights Analysis" />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  header: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    padding: 16, 
    borderBottomWidth: 1, 
    borderBottomColor: '#E5E5EA' 
  },
  backButton: { padding: 4 },
  headerContent: { flex: 1, marginLeft: 12 },
  headerTitle: { fontSize: 20, fontWeight: 'bold' },
  headerSubtitle: { fontSize: 14, marginTop: 2 },
  actionButton: { padding: 8 },
  section: { padding: 16, marginBottom: 12 },
  sectionHeader: { 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    alignItems: 'center', 
    marginBottom: 16 
  },
  sectionTitle: { fontSize: 18, fontWeight: '700' },
  filterBtn: { flexDirection: 'row', alignItems: 'center', gap: 4 },
  filterText: { fontSize: 14, fontWeight: '500' },
  metricsGrid: { 
    flexDirection: 'row', 
    flexWrap: 'wrap', 
    gap: 12 
  },
  metricCard: { 
    flex: 1, 
    minWidth: '45%', 
    padding: 16, 
    borderRadius: 12 
  },
  metricHeader: { 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    marginBottom: 12 
  },
  metricValue: { 
    fontSize: 28, 
    fontWeight: 'bold', 
    marginBottom: 4 
  },
  metricTitle: { fontSize: 13, fontWeight: '600', marginBottom: 4 },
  metricDesc: { fontSize: 11, lineHeight: 16 },
  analysisRow: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    marginBottom: 16 
  },
  analysisLeft: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    flex: 1 
  },
  analysisIcon: { 
    width: 40, 
    height: 40, 
    borderRadius: 20, 
    justifyContent: 'center', 
    alignItems: 'center', 
    marginRight: 12 
  },
  analysisName: { fontSize: 15, fontWeight: '500' },
  analysisRight: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    width: 120 
  },
  progressBar: { 
    flex: 1, 
    height: 6, 
    borderRadius: 3, 
    marginRight: 8 
  },
  progressFill: { 
    height: '100%', 
    borderRadius: 3 
  },
  analysisScore: { fontSize: 14, fontWeight: '600', minWidth: 35 },
  findingRow: { 
    flexDirection: 'row', 
    marginBottom: 16 
  },
  findingDot: { 
    width: 8, 
    height: 8, 
    borderRadius: 4, 
    marginTop: 6, 
    marginRight: 12 
  },
  findingContent: { flex: 1 },
  findingTitle: { fontSize: 15, fontWeight: '600', marginBottom: 4 },
  findingDetail: { fontSize: 13, marginBottom: 4, lineHeight: 18 },
  findingTime: { fontSize: 11 },
  fullReportBtn: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    justifyContent: 'center', 
    margin: 16, 
    padding: 16, 
    borderRadius: 12, 
    gap: 8 
  },
  fullReportText: { 
    color: '#fff', 
    fontSize: 16, 
    fontWeight: '600' 
  },
});

