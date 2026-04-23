 
import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  FlatList,
  TextInput,
  Image,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import {
  Target,
  Users,
  TrendingUp,
  BarChart3,
  Calendar,
  Filter,
  Download,
  ArrowLeft,
  Plus,
  Activity,
  Clock,
  CheckCircle,
  AlertTriangle,
  ArrowRight,
  Mail,
  Phone,
  MessageSquare,
  Zap,
} from 'lucide-react-native';
import { useTheme } from '@/providers/ThemeProvider';
import { router } from 'expo-router';

interface Lead {
  id: string;
  name: string;
  email: string;
  company: string;
  source: string;
  stage: 'prospect' | 'qualified' | 'opportunity' | 'proposal' | 'negotiation' | 'closed_won' | 'closed_lost';
  score: number;
  value: number;
  lastActivity: string;
  assignedTo: string;
  avatar: string;
  activities: LeadActivity[];
}

interface LeadActivity {
  id: string;
  type: 'email' | 'call' | 'meeting' | 'demo' | 'proposal';
  description: string;
  timestamp: string;
  outcome: 'positive' | 'neutral' | 'negative';
}

interface LLMOMetric {
  title: string;
  value: string;
  change: string;
  icon: React.ComponentType<any>;
  color: string;
}

interface StageConversion {
  stage: string;
  count: number;
  conversionRate: number;
  avgTime: string;
  color: string;
}

const mockLeads: Lead[] = [
  {
    id: '1',
    name: 'Sarah Johnson',
    email: 'sarah@techcorp.com',
    company: 'TechCorp Inc.',
    source: 'Website',
    stage: 'opportunity',
    score: 85,
    value: 25000,
    lastActivity: '2 hours ago',
    assignedTo: 'Mike Sales',
    avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150',
    activities: [
      {
        id: '1',
        type: 'demo',
        description: 'Product demo completed',
        timestamp: '2 hours ago',
        outcome: 'positive',
      },
      {
        id: '2',
        type: 'email',
        description: 'Follow-up email sent',
        timestamp: '1 day ago',
        outcome: 'neutral',
      },
    ],
  },
  {
    id: '2',
    name: 'David Chen',
    email: 'david@startup.io',
    company: 'Startup.io',
    source: 'LinkedIn',
    stage: 'qualified',
    score: 72,
    value: 15000,
    lastActivity: '1 day ago',
    assignedTo: 'Lisa Sales',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150',
    activities: [
      {
        id: '1',
        type: 'call',
        description: 'Discovery call scheduled',
        timestamp: '1 day ago',
        outcome: 'positive',
      },
    ],
  },
];

const llmoMetrics: LLMOMetric[] = [
  {
    title: 'Total Leads',
    value: '1,247',
    change: '+18%',
    icon: Users,
    color: '#007AFF',
  },
  {
    title: 'Conversion Rate',
    value: '23.5%',
    change: '+3.2%',
    icon: Target,
    color: '#34C759',
  },
  {
    title: 'Avg Deal Size',
    value: '$18.5K',
    change: '+$2.1K',
    icon: TrendingUp,
    color: '#FF9500',
  },
  {
    title: 'Sales Velocity',
    value: '28 days',
    change: '-5 days',
    icon: Clock,
    color: '#AF52DE',
  },
];

const stageConversions: StageConversion[] = [
  { stage: 'Prospect', count: 1247, conversionRate: 45, avgTime: '2 days', color: '#8E8E93' },
  { stage: 'Qualified', count: 561, conversionRate: 65, avgTime: '5 days', color: '#007AFF' },
  { stage: 'Opportunity', count: 365, conversionRate: 78, avgTime: '8 days', color: '#34C759' },
  { stage: 'Proposal', count: 285, conversionRate: 82, avgTime: '12 days', color: '#FF9500' },
  { stage: 'Negotiation', count: 234, conversionRate: 89, avgTime: '6 days', color: '#AF52DE' },
  { stage: 'Closed Won', count: 208, conversionRate: 100, avgTime: '0 days', color: '#34C759' },
];

export default function LLMOScreen() {
  const { theme } = useTheme();
  const insets = useSafeAreaInsets();
  const [selectedTab, setSelectedTab] = useState<'pipeline' | 'optimization' | 'analytics'>('pipeline');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [filterStage, setFilterStage] = useState<string>('all');
  const [filterSource, setFilterSource] = useState<string>('all');

  const getStageColor = (stage: string) => {
    switch (stage) {
      case 'prospect': return '#8E8E93';
      case 'qualified': return '#007AFF';
      case 'opportunity': return '#34C759';
      case 'proposal': return '#FF9500';
      case 'negotiation': return '#AF52DE';
      case 'closed_won': return '#34C759';
      case 'closed_lost': return '#FF3B30';
      default: return theme.colors.secondaryText;
    }
  };

  const getScoreColor = (score: number) => {
    if (score >= 80) return '#34C759';
    if (score >= 60) return '#FF9500';
    return '#FF3B30';
  };

  const getActivityTypeIcon = (type: string) => {
    switch (type) {
      case 'email': return Mail;
      case 'call': return Phone;
      case 'meeting': return Users;
      case 'demo': return Activity;
      case 'proposal': return Target;
      default: return MessageSquare;
    }
  };

  const filteredLeads = mockLeads.filter(lead => {
    const matchesSearch = lead.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         lead.company.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStage = filterStage === 'all' || lead.stage === filterStage;
    const matchesSource = filterSource === 'all' || lead.source.toLowerCase() === filterSource.toLowerCase();
    return matchesSearch && matchesStage && matchesSource;
  });

  const renderMetric = ({ item }: { item: LLMOMetric }) => {
    const IconComponent = item.icon;
    const isPositive = item.change.startsWith('+') || item.change.startsWith('-');
    const changeColor = item.change.startsWith('+') ? '#34C759' : 
                       item.change.startsWith('-') ? '#FF3B30' : theme.colors.secondaryText;
    
    return (
      <View style={[styles.metricCard, { backgroundColor: theme.colors.cardBackground }]}>
        <View style={styles.metricHeader}>
          <View style={[styles.metricIcon, { backgroundColor: `${item.color}20` }]}>
            <IconComponent size={20} color={item.color} />
          </View>
          <Text style={[styles.metricChange, { color: changeColor }]}>
            {item.change}
          </Text>
        </View>
        <Text style={[styles.metricValue, { color: theme.colors.text }]}>{item.value}</Text>
        <Text style={[styles.metricTitle, { color: theme.colors.secondaryText }]}>{item.title}</Text>
      </View>
    );
  };

  const renderLead = ({ item }: { item: Lead }) => {
    const stageColor = getStageColor(item.stage);
    const scoreColor = getScoreColor(item.score);
    
    return (
      <View style={[styles.leadCard, { backgroundColor: theme.colors.cardBackground }]}>
        <View style={styles.leadHeader}>
          <View style={styles.leadInfo}>
            <Image source={{ uri: item.avatar }} style={styles.leadAvatar} />
            <View style={styles.leadDetails}>
              <Text style={[styles.leadName, { color: theme.colors.text }]}>{item.name}</Text>
              <Text style={[styles.leadCompany, { color: theme.colors.secondaryText }]}>{item.company}</Text>
              <View style={styles.leadBadges}>
                <View style={[styles.stageBadge, { backgroundColor: stageColor + '20' }]}>
                  <Text style={[styles.stageText, { color: stageColor }]}>
                    {item.stage.replace('_', ' ').toUpperCase()}
                  </Text>
                </View>
                <View style={[styles.sourceBadge, { backgroundColor: theme.colors.primary + '20' }]}>
                  <Text style={[styles.sourceText, { color: theme.colors.primary }]}>{item.source}</Text>
                </View>
              </View>
            </View>
          </View>
          <View style={styles.leadScore}>
            <View style={[styles.scoreCircle, { backgroundColor: scoreColor }]}>
              <Text style={styles.scoreText}>{item.score}</Text>
            </View>
          </View>
        </View>

        <View style={styles.leadStats}>
          <View style={styles.leadStat}>
            <Text style={[styles.leadStatValue, { color: theme.colors.text }]}>
              ${item.value.toLocaleString()}
            </Text>
            <Text style={[styles.leadStatLabel, { color: theme.colors.secondaryText }]}>Deal Value</Text>
          </View>
          <View style={styles.leadStat}>
            <Text style={[styles.leadStatValue, { color: theme.colors.text }]}>{item.assignedTo}</Text>
            <Text style={[styles.leadStatLabel, { color: theme.colors.secondaryText }]}>Assigned To</Text>
          </View>
          <View style={styles.leadStat}>
            <Text style={[styles.leadStatValue, { color: theme.colors.text }]}>{item.lastActivity}</Text>
            <Text style={[styles.leadStatLabel, { color: theme.colors.secondaryText }]}>Last Activity</Text>
          </View>
        </View>

        <View style={styles.activitiesSection}>
          <Text style={[styles.activitiesTitle, { color: theme.colors.text }]}>Recent Activities</Text>
          {item.activities.slice(0, 2).map((activity) => {
            const ActivityIcon = getActivityTypeIcon(activity.type);
            return (
              <View key={activity.id} style={styles.activityItem}>
                <ActivityIcon size={14} color={theme.colors.secondaryText} />
                <Text style={[styles.activityDescription, { color: theme.colors.text }]}>
                  {activity.description}
                </Text>
                <Text style={[styles.activityTimestamp, { color: theme.colors.secondaryText }]}>
                  {activity.timestamp}
                </Text>
              </View>
            );
          })}
        </View>

        <View style={styles.leadFooter}>
          <TouchableOpacity style={[styles.contactButton, { backgroundColor: theme.colors.primary }]}>
            <MessageSquare size={14} color="white" />
            <Text style={styles.contactButtonText}>Contact</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.viewButton}>
            <Text style={[styles.viewButtonText, { color: theme.colors.primary }]}>View Details</Text>
            <ArrowRight size={14} color={theme.colors.primary} />
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  const renderStageConversion = ({ item }: { item: StageConversion }) => (
    <View style={[styles.stageCard, { backgroundColor: theme.colors.cardBackground }]}>
      <View style={styles.stageHeader}>
        <Text style={[styles.stageName, { color: theme.colors.text }]}>{item.stage}</Text>
        <Text style={[styles.stageCount, { color: theme.colors.text }]}>{item.count}</Text>
      </View>
      <View style={styles.stageMetrics}>
        <View style={styles.stageMetric}>
          <Text style={[styles.stageMetricValue, { color: theme.colors.text }]}>{item.conversionRate}%</Text>
          <Text style={[styles.stageMetricLabel, { color: theme.colors.secondaryText }]}>Conversion</Text>
        </View>
        <View style={styles.stageMetric}>
          <Text style={[styles.stageMetricValue, { color: theme.colors.text }]}>{item.avgTime}</Text>
          <Text style={[styles.stageMetricLabel, { color: theme.colors.secondaryText }]}>Avg Time</Text>
        </View>
      </View>
      <View style={[styles.stageProgress, { backgroundColor: 'rgba(0,0,0,0.1)' }]}>
        <View 
          style={[
            styles.stageProgressFill, 
            { 
              backgroundColor: item.color,
              width: `${item.conversionRate}%`
            }
          ]} 
        />
      </View>
    </View>
  );

  const renderPipeline = () => (
    <ScrollView style={styles.tabContent} showsVerticalScrollIndicator={false}>
      {/* Metrics */}
      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>LLMO Overview</Text>
        <FlatList
          data={llmoMetrics}
          renderItem={renderMetric}
          keyExtractor={(item) => item.title}
          numColumns={2}
          scrollEnabled={false}
          contentContainerStyle={styles.metricsContainer}
        />
      </View>

      {/* Pipeline Stages */}
      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Pipeline Stages</Text>
        <FlatList
          data={stageConversions}
          renderItem={renderStageConversion}
          keyExtractor={(item) => item.stage}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.stagesContainer}
        />
      </View>

      {/* Search and Filters */}
      <View style={styles.filtersSection}>
        <View style={[styles.searchBar, { backgroundColor: theme.colors.cardBackground }]}>
          <TextInput
            style={[styles.searchInput, { color: theme.colors.text }]}
            placeholder="Search leads..."
            placeholderTextColor={theme.colors.secondaryText}
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>
        
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.filters}>
          <View style={styles.filterGroup}>
            <Text style={[styles.filterGroupTitle, { color: theme.colors.text }]}>Stage:</Text>
            {['all', 'prospect', 'qualified', 'opportunity', 'proposal'].map((stage) => (
              <TouchableOpacity
                key={stage}
                style={[
                  styles.filterChip,
                  filterStage === stage && { backgroundColor: theme.colors.primary },
                ]}
                onPress={() => setFilterStage(stage)}
              >
                <Text
                  style={[
                    styles.filterChipText,
                    {
                      color: filterStage === stage ? 'white' : theme.colors.secondaryText,
                    },
                  ]}
                >
                  {stage.charAt(0).toUpperCase() + stage.slice(1)}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </ScrollView>
      </View>

      <FlatList
        data={filteredLeads}
        renderItem={renderLead}
        keyExtractor={(item) => item.id}
        scrollEnabled={false}
        contentContainerStyle={styles.leadsList}
      />
    </ScrollView>
  );

  const renderOptimization = () => (
    <ScrollView style={styles.tabContent} showsVerticalScrollIndicator={false}>
      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Optimization Opportunities</Text>
        <View style={[styles.optimizationCard, { backgroundColor: theme.colors.cardBackground }]}>
          <Text style={[styles.optimizationTitle, { color: theme.colors.text }]}>Stage Bottlenecks</Text>
          <Text style={[styles.optimizationDescription, { color: theme.colors.secondaryText }]}>
            Qualified to Opportunity stage shows 35% drop-off. Focus on improving discovery calls and demo scheduling.
          </Text>
        </View>
      </View>
    </ScrollView>
  );

  const renderAnalytics = () => (
    <ScrollView style={styles.tabContent} showsVerticalScrollIndicator={false}>
      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Lead Analytics</Text>
        <View style={[styles.analyticsCard, { backgroundColor: theme.colors.cardBackground }]}>
          <Text style={[styles.analyticsTitle, { color: theme.colors.text }]}>Performance Summary</Text>
          <Text style={[styles.analyticsDescription, { color: theme.colors.secondaryText }]}>
            Lead conversion improved by 23.5% this quarter with website leads showing the highest quality scores.
          </Text>
        </View>
      </View>
    </ScrollView>
  );

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      {/* Header */}
      <View style={[styles.header, { backgroundColor: theme.colors.background, paddingTop: insets.top + 10 }]}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <ArrowLeft size={24} color={theme.colors.text} />
        </TouchableOpacity>
        <Text style={[styles.title, { color: theme.colors.text }]}>LLMO</Text>
        <View style={styles.headerActions}>
          <TouchableOpacity style={styles.headerButton}>
            <Filter size={20} color={theme.colors.text} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.headerButton}>
            <Plus size={20} color={theme.colors.text} />
          </TouchableOpacity>
        </View>
      </View>

      {/* Tabs */}
      <View style={styles.tabsContainer}>
        {(['pipeline', 'optimization', 'analytics'] as const).map((tab) => (
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
                {
                  color: selectedTab === tab ? 'white' : theme.colors.secondaryText,
                },
              ]}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Content */}
      {selectedTab === 'pipeline' && renderPipeline()}
      {selectedTab === 'optimization' && renderOptimization()}
      {selectedTab === 'analytics' && renderAnalytics()}
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
  headerActions: {
    flexDirection: 'row',
    gap: 8,
  },
  headerButton: {
    padding: 8,
  },
  tabsContainer: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    marginBottom: 16,
    gap: 8,
  },
  tab: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: 'rgba(0,0,0,0.05)',
  },
  tabText: {
    fontSize: 14,
    fontWeight: '500',
  },
  tabContent: {
    flex: 1,
    paddingHorizontal: 20,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 16,
  },
  metricsContainer: {
    gap: 12,
  },
  metricCard: {
    flex: 1,
    padding: 16,
    borderRadius: 12,
    marginHorizontal: 6,
  },
  metricHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  metricIcon: {
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  metricChange: {
    fontSize: 12,
    fontWeight: '600',
  },
  metricValue: {
    fontSize: 24,
    fontWeight: '700',
    marginBottom: 4,
  },
  metricTitle: {
    fontSize: 12,
    fontWeight: '500',
  },
  stagesContainer: {
    gap: 12,
    paddingHorizontal: 4,
  },
  stageCard: {
    padding: 16,
    borderRadius: 12,
    minWidth: 140,
  },
  stageHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  stageName: {
    fontSize: 14,
    fontWeight: '600',
  },
  stageCount: {
    fontSize: 16,
    fontWeight: '700',
  },
  stageMetrics: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  stageMetric: {
    alignItems: 'center',
  },
  stageMetricValue: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 2,
  },
  stageMetricLabel: {
    fontSize: 10,
  },
  stageProgress: {
    height: 4,
    borderRadius: 2,
  },
  stageProgressFill: {
    height: '100%',
    borderRadius: 2,
  },
  filtersSection: {
    marginBottom: 20,
  },
  searchBar: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 12,
    marginBottom: 12,
  },
  searchInput: {
    fontSize: 16,
  },
  filters: {
    flexDirection: 'row',
  },
  filterGroup: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 20,
    gap: 8,
  },
  filterGroupTitle: {
    fontSize: 14,
    fontWeight: '500',
  },
  filterChip: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    backgroundColor: 'rgba(0,0,0,0.05)',
  },
  filterChipText: {
    fontSize: 12,
    fontWeight: '500',
  },
  leadsList: {
    gap: 16,
  },
  leadCard: {
    padding: 16,
    borderRadius: 12,
  },
  leadHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  leadInfo: {
    flexDirection: 'row',
    flex: 1,
  },
  leadAvatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 12,
  },
  leadDetails: {
    flex: 1,
  },
  leadName: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  leadCompany: {
    fontSize: 14,
    marginBottom: 8,
  },
  leadBadges: {
    flexDirection: 'row',
    gap: 8,
  },
  stageBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  stageText: {
    fontSize: 10,
    fontWeight: '600',
  },
  sourceBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  sourceText: {
    fontSize: 10,
    fontWeight: '600',
  },
  leadScore: {
    alignItems: 'center',
  },
  scoreCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  scoreText: {
    color: 'white',
    fontSize: 14,
    fontWeight: '700',
  },
  leadStats: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
    paddingVertical: 12,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: 'rgba(0,0,0,0.1)',
  },
  leadStat: {
    alignItems: 'center',
  },
  leadStatValue: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 2,
  },
  leadStatLabel: {
    fontSize: 12,
  },
  activitiesSection: {
    marginBottom: 16,
  },
  activitiesTitle: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 8,
  },
  activityItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 6,
    gap: 8,
  },
  activityDescription: {
    flex: 1,
    fontSize: 14,
  },
  activityTimestamp: {
    fontSize: 12,
  },
  leadFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  contactButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    gap: 4,
  },
  contactButtonText: {
    color: 'white',
    fontSize: 12,
    fontWeight: '500',
  },
  viewButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  viewButtonText: {
    fontSize: 14,
    fontWeight: '500',
  },
  optimizationCard: {
    padding: 16,
    borderRadius: 12,
  },
  optimizationTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
  },
  optimizationDescription: {
    fontSize: 14,
    lineHeight: 20,
  },
  analyticsCard: {
    padding: 16,
    borderRadius: 12,
  },
  analyticsTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
  },
  analyticsDescription: {
    fontSize: 14,
    lineHeight: 20,
  },
});