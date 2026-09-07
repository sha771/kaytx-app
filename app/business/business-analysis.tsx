 
import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput, FlatList } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Stack } from 'expo-router';
import { BarChart3, TrendingUp, Users, DollarSign, Target, Calendar, Search, ListFilter, Download, RefreshCw, CircleAlert, CircleCheck, Clock, ArrowUpRight, ArrowDownRight, Minus } from 'lucide-react-native';

interface BusinessMetric {
  id: string;
  name: string;
  value: string;
  change: string;
  trend: 'up' | 'down' | 'stable';
  category: string;
}

interface Report {
  id: string;
  title: string;
  type: 'revenue' | 'customers' | 'performance' | 'market';
  period: string;
  status: 'ready' | 'generating' | 'scheduled';
  lastUpdated: string;
}

const mockMetrics: BusinessMetric[] = [
  {
    id: '1',
    name: 'Monthly Revenue',
    value: '$125,450',
    change: '+12.5%',
    trend: 'up',
    category: 'Financial'
  },
  {
    id: '2',
    name: 'Customer Acquisition',
    value: '234',
    change: '+8.2%',
    trend: 'up',
    category: 'Growth'
  },
  {
    id: '3',
    name: 'Churn Rate',
    value: '3.2%',
    change: '-0.8%',
    trend: 'down',
    category: 'Retention'
  },
  {
    id: '4',
    name: 'Market Share',
    value: '15.7%',
    change: '+2.1%',
    trend: 'up',
    category: 'Market'
  }
];

const mockReports: Report[] = [
  {
    id: '1',
    title: 'Q1 Revenue Analysis',
    type: 'revenue',
    period: 'Quarterly',
    status: 'ready',
    lastUpdated: '2 hours ago'
  },
  {
    id: '2',
    title: 'Customer Behavior Study',
    type: 'customers',
    period: 'Monthly',
    status: 'generating',
    lastUpdated: 'In progress'
  }
];

export default function BusinessAnalysisScreen() {
  const [metrics, setMetrics] = useState<BusinessMetric[]>(mockMetrics);
  const [reports, setReports] = useState<Report[]>(mockReports);
  const [activeTab, setActiveTab] = useState<'metrics' | 'reports'>('metrics');

  const getTrendIcon = (trend: string) => {
    const color = trend === 'up' ? '#34C759' : trend === 'down' ? '#FF3B30' : '#8E8E93';
    return <TrendingUp size={16} color={color} />;
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'revenue': return <DollarSign size={20} color="#34C759" />;
      case 'customers': return <Users size={20} color="#007AFF" />;
      case 'performance': return <BarChart3 size={20} color="#FF9500" />;
      case 'market': return <Target size={20} color="#FF3B30" />;
      default: return <BarChart3 size={20} color="#8E8E93" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'ready': return '#34C759';
      case 'generating': return '#FF9500';
      case 'scheduled': return '#007AFF';
      default: return '#8E8E93';
    }
  };

  const MetricCard = ({ metric }: { metric: BusinessMetric }) => (
    <TouchableOpacity style={styles.metricCard}>
      <View style={styles.metricHeader}>
        <Text style={styles.metricName}>{metric.name}</Text>
        <View style={styles.categoryBadge}>
          <Text style={styles.categoryText}>{metric.category}</Text>
        </View>
      </View>
      
      <View style={styles.metricContent}>
        <Text style={styles.metricValue}>{metric.value}</Text>
        <View style={styles.changeContainer}>
          {getTrendIcon(metric.trend)}
          <Text style={[styles.changeText, { 
            color: metric.trend === 'up' ? '#34C759' : 
                   metric.trend === 'down' ? '#FF3B30' : '#8E8E93' 
          }]}>
            {metric.change}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  const ReportCard = ({ report }: { report: Report }) => (
    <TouchableOpacity style={styles.reportCard}>
      <View style={styles.reportHeader}>
        <View style={styles.reportInfo}>
          {getTypeIcon(report.type)}
          <View style={styles.reportDetails}>
            <Text style={styles.reportTitle}>{report.title}</Text>
            <Text style={styles.reportPeriod}>{report.period} • {report.lastUpdated}</Text>
          </View>
        </View>
        <View style={[styles.statusBadge, { backgroundColor: getStatusColor(report.status) }]}>
          <Text style={styles.statusText}>{report.status.toUpperCase()}</Text>
        </View>
      </View>
      
      <View style={styles.reportActions}>
        <TouchableOpacity style={styles.actionButton}>
          <BarChart3 size={16} color="#007AFF" />
          <Text style={styles.actionText}>View</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.actionButton}>
          <Calendar size={16} color="#007AFF" />
          <Text style={styles.actionText}>Schedule</Text>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <Stack.Screen 
        options={{
          title: 'Business Analysis',
          headerStyle: { backgroundColor: '#f8f9fa' },
          headerTitleStyle: { color: '#1a1a1a', fontWeight: '600' }
        }} 
      />
      
      <ScrollView style={styles.content}>
        <View style={styles.header}>
          <View style={styles.titleSection}>
            <BarChart3 size={28} color="#007AFF" />
            <View>
              <Text style={styles.title}>Business Analysis</Text>
              <Text style={styles.subtitle}>Comprehensive business insights</Text>
            </View>
          </View>
        </View>

        <View style={styles.summaryContainer}>
          <View style={styles.summaryCard}>
            <DollarSign size={24} color="#34C759" />
            <Text style={styles.summaryValue}>$1.2M</Text>
            <Text style={styles.summaryLabel}>Total Revenue</Text>
          </View>
          <View style={styles.summaryCard}>
            <Users size={24} color="#007AFF" />
            <Text style={styles.summaryValue}>2,450</Text>
            <Text style={styles.summaryLabel}>Active Users</Text>
          </View>
          <View style={styles.summaryCard}>
            <TrendingUp size={24} color="#FF9500" />
            <Text style={styles.summaryValue}>18.5%</Text>
            <Text style={styles.summaryLabel}>Growth Rate</Text>
          </View>
        </View>

        <View style={styles.tabContainer}>
          <TouchableOpacity 
            style={[styles.tab, activeTab === 'metrics' && styles.activeTab]}
            onPress={() => setActiveTab('metrics')}
          >
            <BarChart3 size={20} color={activeTab === 'metrics' ? '#fff' : '#666'} />
            <Text style={[styles.tabText, activeTab === 'metrics' && styles.activeTabText]}>
              Key Metrics
            </Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={[styles.tab, activeTab === 'reports' && styles.activeTab]}
            onPress={() => setActiveTab('reports')}
          >
            <Calendar size={20} color={activeTab === 'reports' ? '#fff' : '#666'} />
            <Text style={[styles.tabText, activeTab === 'reports' && styles.activeTabText]}>
              Reports
            </Text>
          </TouchableOpacity>
        </View>

        {activeTab === 'metrics' ? (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Business Metrics</Text>
            <View style={styles.metricsGrid}>
              {metrics.map(metric => (
                <MetricCard key={metric.id} metric={metric} />
              ))}
            </View>
          </View>
        ) : (
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>Analysis Reports</Text>
              <TouchableOpacity style={styles.createButton}>
                <Text style={styles.createButtonText}>Generate Report</Text>
              </TouchableOpacity>
            </View>
            {reports.map(report => (
              <ReportCard key={report.id} report={report} />
            ))}
          </View>
        )}

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Quick Actions</Text>
          <View style={styles.quickActions}>
            <TouchableOpacity style={styles.quickAction}>
              <BarChart3 size={24} color="#007AFF" />
              <Text style={styles.quickActionText}>Dashboard</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.quickAction}>
              <TrendingUp size={24} color="#34C759" />
              <Text style={styles.quickActionText}>Forecasting</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.quickAction}>
              <Target size={24} color="#FF9500" />
              <Text style={styles.quickActionText}>KPI Tracking</Text>
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
  summaryContainer: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 24
  },
  summaryCard: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    gap: 8,
    borderWidth: 1,
    borderColor: '#e1e5e9'
  },
  summaryValue: {
    fontSize: 20,
    fontWeight: '700',
    color: '#1a1a1a'
  },
  summaryLabel: {
    fontSize: 12,
    color: '#666'
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
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1a1a1a',
    marginBottom: 12
  },
  createButton: {
    backgroundColor: '#007AFF',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8
  },
  createButtonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 14
  },
  metricsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12
  },
  metricCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    width: '48%',
    borderWidth: 1,
    borderColor: '#e1e5e9'
  },
  metricHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12
  },
  metricName: {
    fontSize: 14,
    fontWeight: '500',
    color: '#1a1a1a',
    flex: 1
  },
  categoryBadge: {
    backgroundColor: '#f0f0f0',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 8
  },
  categoryText: {
    fontSize: 10,
    color: '#666',
    fontWeight: '500'
  },
  metricContent: {
    gap: 8
  },
  metricValue: {
    fontSize: 20,
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
  reportCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#e1e5e9'
  },
  reportHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12
  },
  reportInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    flex: 1
  },
  reportDetails: {
    flex: 1
  },
  reportTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1a1a1a'
  },
  reportPeriod: {
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
  reportActions: {
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
