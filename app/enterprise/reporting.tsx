 
import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  FlatList,
  TextInput,
  Dimensions,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import {
  ArrowLeft,
  Download,
  ListFilter,
  Calendar,
  FileText,
  ChartBarBig,
  ChartPie,
  TrendingUp,
  Users,
  DollarSign,
  Activity,
  Clock,
  Target,
  Mail,
  Phone,
  MessageSquare,
  Share2,
} from 'lucide-react-native';
import { useTheme } from '@/providers/ThemeProvider';
import { router } from 'expo-router';

const { width } = Dimensions.get('window');

interface Report {
  id: string;
  name: string;
  type: 'performance' | 'financial' | 'operational' | 'engagement' | 'custom';
  period: string;
  status: 'ready' | 'generating' | 'scheduled';
  lastGenerated: string;
  size: string;
  icon: React.ComponentType<any>;
  color: string;
}

interface ReportTemplate {
  id: string;
  name: string;
  description: string;
  category: string;
  metrics: string[];
  icon: React.ComponentType<any>;
  color: string;
}

const reports: Report[] = [
  {
    id: '1',
    name: 'Monthly Performance Report',
    type: 'performance',
    period: 'January 2025',
    status: 'ready',
    lastGenerated: '2 hours ago',
    size: '2.4 MB',
    icon: ChartBarBig,
    color: '#007AFF',
  },
  {
    id: '2',
    name: 'Financial Analytics Q1',
    type: 'financial',
    period: 'Q1 2025',
    status: 'ready',
    lastGenerated: '1 day ago',
    size: '5.1 MB',
    icon: DollarSign,
    color: '#34C759',
  },
  {
    id: '3',
    name: 'User Engagement Report',
    type: 'engagement',
    period: 'Last 30 days',
    status: 'generating',
    lastGenerated: 'In progress',
    size: '-',
    icon: Users,
    color: '#FF9500',
  },
  {
    id: '4',
    name: 'Operational Efficiency',
    type: 'operational',
    period: 'This Week',
    status: 'ready',
    lastGenerated: '3 hours ago',
    size: '1.8 MB',
    icon: Activity,
    color: '#AF52DE',
  },
];

const reportTemplates: ReportTemplate[] = [
  {
    id: '1',
    name: 'Executive Summary',
    description: 'High-level overview for stakeholders',
    category: 'Leadership',
    metrics: ['Revenue', 'Users', 'Growth', 'ROI'],
    icon: TrendingUp,
    color: '#007AFF',
  },
  {
    id: '2',
    name: 'Sales Performance',
    description: 'Detailed sales metrics and trends',
    category: 'Sales',
    metrics: ['Conversions', 'Pipeline', 'Revenue', 'Forecasts'],
    icon: Target,
    color: '#34C759',
  },
  {
    id: '3',
    name: 'Customer Analytics',
    description: 'Customer behavior and engagement',
    category: 'Marketing',
    metrics: ['Retention', 'Churn', 'LTV', 'Satisfaction'],
    icon: Users,
    color: '#FF9500',
  },
  {
    id: '4',
    name: 'Communication Insights',
    description: 'All channels communication analysis',
    category: 'Operations',
    metrics: ['Messages', 'Calls', 'Emails', 'Response Time'],
    icon: MessageSquare,
    color: '#AF52DE',
  },
];

export default function EnterpriseReportingScreen() {
  const { theme } = useTheme();
  const insets = useSafeAreaInsets();
  const [selectedTab, setSelectedTab] = useState<'reports' | 'templates' | 'scheduled'>('reports');
  const [searchQuery, setSearchQuery] = useState('');

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'ready': return '#34C759';
      case 'generating': return '#FF9500';
      case 'scheduled': return '#007AFF';
      default: return theme.colors.secondaryText;
    }
  };

  const renderReport = ({ item }: { item: Report }) => {
    const IconComponent = item.icon;
    const statusColor = getStatusColor(item.status);

    return (
      <TouchableOpacity 
        style={[styles.reportCard, { backgroundColor: theme.colors.cardBackground }]}
        activeOpacity={0.7}
      >
        <View style={styles.reportHeader}>
          <View style={[styles.reportIcon, { backgroundColor: `${item.color}20` }]}>
            <IconComponent size={24} color={item.color} />
          </View>
          <View style={styles.reportInfo}>
            <Text style={[styles.reportName, { color: theme.colors.text }]}>{item.name}</Text>
            <Text style={[styles.reportPeriod, { color: theme.colors.secondaryText }]}>
              {item.period}
            </Text>
          </View>
        </View>

        <View style={styles.reportDetails}>
          <View style={styles.reportMeta}>
            <View style={styles.metaItem}>
              <Clock size={14} color={theme.colors.secondaryText} />
              <Text style={[styles.metaText, { color: theme.colors.secondaryText }]}>
                {item.lastGenerated}
              </Text>
            </View>
            <View style={styles.metaItem}>
              <FileText size={14} color={theme.colors.secondaryText} />
              <Text style={[styles.metaText, { color: theme.colors.secondaryText }]}>
                {item.size}
              </Text>
            </View>
          </View>

          <View style={styles.reportActions}>
            <View style={[styles.statusBadge, { backgroundColor: `${statusColor}20` }]}>
              <Text style={[styles.statusText, { color: statusColor }]}>
                {item.status.charAt(0).toUpperCase() + item.status.slice(1)}
              </Text>
            </View>
            {item.status === 'ready' && (
              <TouchableOpacity style={[styles.actionButton, { backgroundColor: theme.colors.primary }]}>
                <Download size={16} color="#FFFFFF" />
              </TouchableOpacity>
            )}
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  const renderTemplate = ({ item }: { item: ReportTemplate }) => {
    const IconComponent = item.icon;

    return (
      <TouchableOpacity 
        style={[styles.templateCard, { backgroundColor: theme.colors.cardBackground }]}
        activeOpacity={0.7}
      >
        <View style={[styles.templateIcon, { backgroundColor: `${item.color}20` }]}>
          <IconComponent size={28} color={item.color} />
        </View>
        
        <View style={styles.templateInfo}>
          <Text style={[styles.templateName, { color: theme.colors.text }]}>{item.name}</Text>
          <Text style={[styles.templateDescription, { color: theme.colors.secondaryText }]}>
            {item.description}
          </Text>
          
          <View style={styles.categoryBadge}>
            <Text style={[styles.categoryText, { color: item.color }]}>{item.category}</Text>
          </View>

          <View style={styles.metricsContainer}>
            {item.metrics.map((metric, index) => (
              <View key={index} style={[styles.metricChip, { backgroundColor: theme.colors.background }]}>
                <Text style={[styles.metricText, { color: theme.colors.text }]}>{metric}</Text>
              </View>
            ))}
          </View>

          <TouchableOpacity 
            style={[styles.generateButton, { backgroundColor: item.color }]}
          >
            <Text style={styles.generateButtonText}>Generate Report</Text>
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <View style={[styles.header, { paddingTop: insets.top + 10 }]}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <ArrowLeft size={24} color={theme.colors.text} />
        </TouchableOpacity>
        <Text style={[styles.title, { color: theme.colors.text }]}>Advanced Reporting</Text>
        <TouchableOpacity style={styles.headerButton}>
          <ListFilter size={20} color={theme.colors.text} />
        </TouchableOpacity>
      </View>

      <View style={styles.searchContainer}>
        <TextInput
          style={[styles.searchInput, { 
            backgroundColor: theme.colors.cardBackground,
            color: theme.colors.text,
          }]}
          placeholder="Search reports..."
          placeholderTextColor={theme.colors.secondaryText}
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
      </View>

      <View style={styles.tabsContainer}>
        {(['reports', 'templates', 'scheduled'] as const).map((tab) => (
          <TouchableOpacity
            key={tab}
            style={[
              styles.tab,
              selectedTab === tab && { backgroundColor: theme.colors.primary },
            ]}
            onPress={() => setSelectedTab(tab)}
          >
            <Text
              style={[
                styles.tabText,
                { color: selectedTab === tab ? 'white' : theme.colors.secondaryText },
              ]}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {selectedTab === 'reports' && (
          <FlatList
            data={reports}
            renderItem={renderReport}
            keyExtractor={(item) => item.id}
            scrollEnabled={false}
            contentContainerStyle={styles.reportsList}
          />
        )}

        {selectedTab === 'templates' && (
          <FlatList
            data={reportTemplates}
            renderItem={renderTemplate}
            keyExtractor={(item) => item.id}
            scrollEnabled={false}
            contentContainerStyle={styles.templatesList}
          />
        )}

        {selectedTab === 'scheduled' && (
          <View style={styles.emptyState}>
            <Calendar size={48} color={theme.colors.secondaryText} />
            <Text style={[styles.emptyText, { color: theme.colors.secondaryText }]}>
              No scheduled reports
            </Text>
          </View>
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingBottom: 16,
  },
  backButton: {
    padding: 8,
    marginRight: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    flex: 1,
  },
  headerButton: {
    padding: 8,
  },
  searchContainer: {
    paddingHorizontal: 20,
    marginBottom: 16,
  },
  searchInput: {
    height: 44,
    borderRadius: 12,
    paddingHorizontal: 16,
    fontSize: 16,
  },
  tabsContainer: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    marginBottom: 16,
    gap: 8,
  },
  tab: {
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: 'rgba(0,0,0,0.05)',
  },
  tabText: {
    fontSize: 14,
    fontWeight: '600',
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
  },
  reportsList: {
    gap: 16,
    paddingBottom: 20,
  },
  reportCard: {
    padding: 16,
    borderRadius: 16,
  },
  reportHeader: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  reportIcon: {
    width: 48,
    height: 48,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  reportInfo: {
    flex: 1,
    justifyContent: 'center',
  },
  reportName: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  reportPeriod: {
    fontSize: 14,
  },
  reportDetails: {
    gap: 12,
  },
  reportMeta: {
    flexDirection: 'row',
    gap: 16,
  },
  metaItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  metaText: {
    fontSize: 13,
  },
  reportActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  statusBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
  },
  statusText: {
    fontSize: 12,
    fontWeight: '600',
  },
  actionButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
  },
  templatesList: {
    gap: 20,
    paddingBottom: 20,
  },
  templateCard: {
    padding: 20,
    borderRadius: 16,
  },
  templateIcon: {
    width: 56,
    height: 56,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  templateInfo: {
    gap: 12,
  },
  templateName: {
    fontSize: 18,
    fontWeight: '700',
  },
  templateDescription: {
    fontSize: 14,
    lineHeight: 20,
  },
  categoryBadge: {
    alignSelf: 'flex-start',
  },
  categoryText: {
    fontSize: 12,
    fontWeight: '600',
  },
  metricsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  metricChip: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
  },
  metricText: {
    fontSize: 12,
    fontWeight: '500',
  },
  generateButton: {
    paddingVertical: 12,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 8,
  },
  generateButtonText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '600',
  },
  emptyState: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 60,
  },
  emptyText: {
    fontSize: 16,
    marginTop: 12,
  },
});
