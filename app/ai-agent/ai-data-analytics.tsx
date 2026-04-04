import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Stack } from 'expo-router';
import { Brain, BarChart3, TrendingUp, Database, Zap, Settings } from 'lucide-react-native';

interface DataInsight {
  id: string;
  title: string;
  value: string;
  change: string;
  trend: 'up' | 'down' | 'stable';
  category: string;
}

interface AnalyticsModel {
  id: string;
  name: string;
  type: string;
  accuracy: number;
  status: 'active' | 'training' | 'inactive';
  lastUpdated: string;
}

const mockInsights: DataInsight[] = [
  {
    id: '1',
    title: 'Customer Satisfaction',
    value: '87%',
    change: '+5%',
    trend: 'up',
    category: 'Customer'
  },
  {
    id: '2',
    title: 'Revenue Prediction',
    value: '$125K',
    change: '+12%',
    trend: 'up',
    category: 'Finance'
  },
  {
    id: '3',
    title: 'Churn Risk',
    value: '3.2%',
    change: '-1.1%',
    trend: 'down',
    category: 'Risk'
  }
];

const mockModels: AnalyticsModel[] = [
  {
    id: '1',
    name: 'Customer Behavior Predictor',
    type: 'Classification',
    accuracy: 94.5,
    status: 'active',
    lastUpdated: '2024-01-18'
  },
  {
    id: '2',
    name: 'Revenue Forecasting',
    type: 'Regression',
    accuracy: 89.2,
    status: 'training',
    lastUpdated: '2024-01-17'
  }
];

export default function AIDataAnalyticsScreen() {
  const [insights, setInsights] = useState<DataInsight[]>(mockInsights);
  const [models, setModels] = useState<AnalyticsModel[]>(mockModels);
  const [activeTab, setActiveTab] = useState<'insights' | 'models'>('insights');

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'up': return <TrendingUp size={16} color="#34C759" />;
      case 'down': return <TrendingUp size={16} color="#FF3B30" style={{ transform: [{ rotate: '180deg' }] }} />;
      default: return <TrendingUp size={16} color="#8E8E93" />;
    }
  };

  const InsightCard = ({ insight }: { insight: DataInsight }) => (
    <TouchableOpacity style={styles.insightCard}>
      <View style={styles.insightHeader}>
        <Text style={styles.insightTitle}>{insight.title}</Text>
        <View style={styles.categoryBadge}>
          <Text style={styles.categoryText}>{insight.category}</Text>
        </View>
      </View>
      
      <View style={styles.insightMetrics}>
        <Text style={styles.insightValue}>{insight.value}</Text>
        <View style={styles.changeContainer}>
          {getTrendIcon(insight.trend)}
          <Text style={[styles.changeText, { 
            color: insight.trend === 'up' ? '#34C759' : 
                   insight.trend === 'down' ? '#FF3B30' : '#8E8E93' 
          }]}>
            {insight.change}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  const ModelCard = ({ model }: { model: AnalyticsModel }) => (
    <TouchableOpacity style={styles.modelCard}>
      <View style={styles.modelHeader}>
        <View style={styles.modelInfo}>
          <Text style={styles.modelName}>{model.name}</Text>
          <Text style={styles.modelType}>{model.type}</Text>
        </View>
        <View style={[styles.statusBadge, { 
          backgroundColor: model.status === 'active' ? '#34C759' : 
                          model.status === 'training' ? '#FF9500' : '#8E8E93' 
        }]}>
          <Text style={styles.statusText}>{model.status.toUpperCase()}</Text>
        </View>
      </View>
      
      <View style={styles.modelMetrics}>
        <View style={styles.metric}>
          <Text style={styles.metricLabel}>Accuracy</Text>
          <Text style={styles.metricValue}>{model.accuracy}%</Text>
        </View>
        <View style={styles.metric}>
          <Text style={styles.metricLabel}>Last Updated</Text>
          <Text style={styles.metricValue}>{model.lastUpdated}</Text>
        </View>
      </View>
      
      <View style={styles.modelActions}>
        <TouchableOpacity style={styles.actionButton}>
          <Settings size={16} color="#007AFF" />
          <Text style={styles.actionText}>Configure</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.actionButton}>
          <Zap size={16} color="#007AFF" />
          <Text style={styles.actionText}>Deploy</Text>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <Stack.Screen 
        options={{
          title: 'AI Data Analytics',
          headerStyle: { backgroundColor: '#f8f9fa' },
          headerTitleStyle: { color: '#1a1a1a', fontWeight: '600' }
        }} 
      />
      
      <ScrollView style={styles.content}>
        <View style={styles.header}>
          <View style={styles.titleSection}>
            <Brain size={28} color="#007AFF" />
            <View>
              <Text style={styles.title}>AI Data Analytics</Text>
              <Text style={styles.subtitle}>Intelligent insights and predictions</Text>
            </View>
          </View>
        </View>

        <View style={styles.tabContainer}>
          <TouchableOpacity 
            style={[styles.tab, activeTab === 'insights' && styles.activeTab]}
            onPress={() => setActiveTab('insights')}
          >
            <BarChart3 size={20} color={activeTab === 'insights' ? '#fff' : '#666'} />
            <Text style={[styles.tabText, activeTab === 'insights' && styles.activeTabText]}>
              Insights
            </Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={[styles.tab, activeTab === 'models' && styles.activeTab]}
            onPress={() => setActiveTab('models')}
          >
            <Database size={20} color={activeTab === 'models' ? '#fff' : '#666'} />
            <Text style={[styles.tabText, activeTab === 'models' && styles.activeTabText]}>
              Models
            </Text>
          </TouchableOpacity>
        </View>

        {activeTab === 'insights' ? (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>AI-Generated Insights</Text>
            {insights.map(insight => (
              <InsightCard key={insight.id} insight={insight} />
            ))}
          </View>
        ) : (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Analytics Models</Text>
            {models.map(model => (
              <ModelCard key={model.id} model={model} />
            ))}
          </View>
        )}

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Quick Actions</Text>
          <View style={styles.quickActions}>
            <TouchableOpacity style={styles.quickAction}>
              <Brain size={24} color="#007AFF" />
              <Text style={styles.quickActionText}>Train Model</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.quickAction}>
              <BarChart3 size={24} color="#34C759" />
              <Text style={styles.quickActionText}>Generate Report</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.quickAction}>
              <Database size={24} color="#FF9500" />
              <Text style={styles.quickActionText}>Data Sources</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa'
  },
  content: {
    flex: 1,
    padding: 16
  },
  header: {
    marginBottom: 24
  },
  titleSection: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: '#1a1a1a'
  },
  subtitle: {
    fontSize: 14,
    color: '#666',
    marginTop: 2
  },
  tabContainer: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 4,
    marginBottom: 24
  },
  tab: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    borderRadius: 8,
    gap: 8
  },
  activeTab: {
    backgroundColor: '#007AFF'
  },
  tabText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#666'
  },
  activeTabText: {
    color: '#fff'
  },
  section: {
    marginBottom: 24
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1a1a1a',
    marginBottom: 12
  },
  insightCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#e1e5e9'
  },
  insightHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12
  },
  insightTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1a1a1a',
    flex: 1
  },
  categoryBadge: {
    backgroundColor: '#f0f0f0',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12
  },
  categoryText: {
    fontSize: 12,
    color: '#666',
    fontWeight: '500'
  },
  insightMetrics: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  insightValue: {
    fontSize: 24,
    fontWeight: '700',
    color: '#1a1a1a'
  },
  changeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4
  },
  changeText: {
    fontSize: 14,
    fontWeight: '600'
  },
  modelCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#e1e5e9'
  },
  modelHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12
  },
  modelInfo: {
    flex: 1
  },
  modelName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1a1a1a'
  },
  modelType: {
    fontSize: 12,
    color: '#666',
    marginTop: 2
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12
  },
  statusText: {
    color: '#fff',
    fontSize: 10,
    fontWeight: '600'
  },
  modelMetrics: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12
  },
  metric: {
    flex: 1
  },
  metricLabel: {
    fontSize: 12,
    color: '#666',
    marginBottom: 4
  },
  metricValue: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1a1a1a'
  },
  modelActions: {
    flexDirection: 'row',
    gap: 12
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 6,
    backgroundColor: '#f0f0f0',
    gap: 4,
    flex: 1,
    justifyContent: 'center'
  },
  actionText: {
    fontSize: 12,
    color: '#007AFF',
    fontWeight: '500'
  },
  quickActions: {
    flexDirection: 'row',
    gap: 12
  },
  quickAction: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    gap: 8,
    borderWidth: 1,
    borderColor: '#e1e5e9'
  },
  quickActionText: {
    fontSize: 12,
    color: '#1a1a1a',
    fontWeight: '500',
    textAlign: 'center'
  }
});