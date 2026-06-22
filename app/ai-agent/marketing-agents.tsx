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
import { useRouter } from 'expo-router';
import {
  ChevronLeft,
  Target,
  Search,
  SlidersHorizontal,
  Settings,
  Database,
  Brain,
  Mic,
  Globe,
  User,
  Zap,
  TrendingUp,
  DollarSign,
  Users,
  Megaphone,
  ChartBarBig,
  ListFilter,
  ChevronRight,
  ChartLine,
} from 'lucide-react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { BlurView } from 'expo-blur';
import Animated, { FadeInUp, FadeInRight } from 'react-native-reanimated';
import { useColorScheme } from '@/hooks/useColorScheme';
import { Colors } from '@/constants/Colors';
import {
  AIAgent,
  marketingGrowthSubAgents,
  getMainAgentByCategory,
  updateAgentConfiguration,
} from '@/constants/aiAgentHierarchy';
import { LineChart, BarChart, PieChart } from 'react-native-chart-kit';

// Chart Data
const CAMPAIGN_PERFORMANCE_DATA = {
  labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
  datasets: [
    {
      data: [45000, 52000, 48000, 65000, 72000, 85000],
      color: (opacity = 1) => `rgba(255, 45, 85, ${opacity})`,
      strokeWidth: 2,
    },
  ],


};
const ENGAGEMENT_METRICS_DATA = {
  labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
  datasets: [
    {
      data: [3200, 3800, 3500, 4200, 4800, 2900, 3100],
    },
  ],
};

const CHANNEL_PERFORMANCE_DATA = [
  {
    name: 'Social Media',
    population: 40,
    color: '#FF2D55',
    legendFontColor: '#fff',
    legendFontSize: 12,
  },
  {
    name: 'Email',
    population: 25,
    color: '#3B82F6',
    legendFontColor: '#fff',
    legendFontSize: 12,
  },
  {
    name: 'Paid Ads',
    population: 20,
    color: '#F59E0B',
    legendFontColor: '#fff',
    legendFontSize: 12,
  },
  {
    name: 'Content',
    population: 15,
    color: '#10B981',
    legendFontColor: '#fff',
    legendFontSize: 12,
  },
];

const LEAD_GENERATION_DATA = {
  labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
  datasets: [
    {
      data: [1200, 1450, 1380, 1650, 1820, 2100],
      color: (opacity = 1) => `rgba(255, 45, 85, ${opacity})`,
      strokeWidth: 2,
    },
  ],
};

const ROI_DATA = {
  labels: ['Q1', 'Q2', 'Q3', 'Q4'],
  datasets: [
    {
      data: [280, 320, 350, 420],
      color: (opacity = 1) => `rgba(16, 185, 129, ${opacity})`,
      strokeWidth: 2,
    },
  ],
};

const AUDIENCE_SEGMENTATION_DATA = [
  {
    name: 'B2B',
    population: 45,
    color: '#3B82F6',
    legendFontColor: '#fff',
    legendFontSize: 12,
  },
  {
    name: 'B2C',
    population: 35,
    color: '#10B981',
    legendFontColor: '#fff',
    legendFontSize: 12,
  },
  {
    name: 'Enterprise',
    population: 15,
    color: '#F59E0B',
    legendFontColor: '#fff',
    legendFontSize: 12,
  },
  {
    name: 'Government',
    population: 5,
    color: '#8B5CF6',
    legendFontColor: '#fff',
    legendFontSize: 12,
  },
];

const BRAND_AWARENESS_DATA = {
  labels: ['Q1', 'Q2', 'Q3', 'Q4'],
  datasets: [
    {
      data: [45, 52, 58, 65],
      color: (opacity = 1) => `rgba(59, 130, 246, ${opacity})`,
      strokeWidth: 2,
    },
  ],
};

const CONTENT_ENGAGEMENT_DATA = [
  {
    name: 'Blog',
    population: 30,
    color: '#10B981',
    legendFontColor: '#fff',
    legendFontSize: 12,
  },
  {
    name: 'Video',
    population: 35,
    color: '#3B82F6',
    legendFontColor: '#fff',
    legendFontSize: 12,
  },
  {
    name: 'Social',
    population: 20,
    color: '#F59E0B',
    legendFontColor: '#fff',
    legendFontSize: 12,
  },
  {
    name: 'Email',
    population: 15,
    color: '#8B5CF6',
    legendFontColor: '#fff',
    legendFontSize: 12,
  },
];

const AUDIENCE_SEGMENT_DATA = [
  {
    name: 'Enterprise',
    population: 35,
    color: '#10B981',
    legendFontColor: '#fff',
    legendFontSize: 12,
  },
  {
    name: 'SMB',
    population: 30,
    color: '#3B82F6',
    legendFontColor: '#fff',
    legendFontSize: 12,
  },
  {
    name: 'Consumer',
    population: 25,
    color: '#F59E0B',
    legendFontColor: '#fff',
    legendFontSize: 12,
  },
  {
    name: 'Government',
    population: 10,
    color: '#8B5CF6',
    legendFontColor: '#fff',
    legendFontSize: 12,
  },
];

export default function MarketingAgentsScreen() {
  const router = useRouter();
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];
  const screenWidth = Dimensions.get('window').width;

  const [searchQuery, setSearchQuery] = useState('');
  const [showFilters, setShowFilters] = useState(false);

  const mainAgent = getMainAgentByCategory('marketing-growth');
  
  const filteredAgents = marketingGrowthSubAgents.filter(agent =>
    agent.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    agent.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleConfigureAgent = (agentId: string) => {
    router.push(`/ai-agent/agent-configuration?id=${agentId}`);
  };

  const handleDataUpload = (agentId: string) => {
    router.push(`/ai-agent/agent-data-upload?id=${agentId}`);
  };

  const stats = {
    total: marketingGrowthSubAgents.length,
    active: marketingGrowthSubAgents.filter(a => a.status === 'active').length,
    withVoice: marketingGrowthSubAgents.filter(a => a.configuration?.voice.enabled).length,
    withTraining: marketingGrowthSubAgents.filter(a => a.configuration?.training.enabled).length,
  };

  const renderLineChart = (data: any, title: string, color: string) => (
    <Animated.View entering={FadeInUp} style={[styles.chartCard, { backgroundColor: colors.card }]}>
      <View style={styles.chartHeader}>
        <Text style={[styles.chartTitle, { color: colors.text }]}>{title}</Text>
        <TouchableOpacity>
          <ChartLine size={18} color={colors.primary} />
        </TouchableOpacity>
      </View>
      <LineChart
        data={data}
        width={screenWidth - 64}
        height={200}
        chartConfig={{
          backgroundColor: colors.card,
          backgroundGradientFrom: colors.card,
          backgroundGradientTo: colors.card,
          decimalPlaces: 0,
          color: (opacity = 1) => color,
          labelColor: colors.text + '80',
          style: {
            borderRadius: 16,
          },
          propsForDots: {
            r: '4',
            strokeWidth: '2',
            stroke: color,
          },
        }}
        bezier
        style={styles.chart}
      />
    </Animated.View>
  );

  const renderBarChart = (data: any, title: string) => (
    <Animated.View entering={FadeInUp} style={[styles.chartCard, { backgroundColor: colors.card }]}>
      <View style={styles.chartHeader}>
        <Text style={[styles.chartTitle, { color: colors.text }]}>{title}</Text>
        <TouchableOpacity>
          <ChartBarBig size={18} color={colors.primary} />
        </TouchableOpacity>
      </View>
      <BarChart
        data={data}
        width={screenWidth - 64}
        height={200}
        chartConfig={{
          backgroundColor: colors.card,
          backgroundGradientFrom: colors.card,
          backgroundGradientTo: colors.card,
          decimalPlaces: 0,
          color: (opacity = 1) => colors.primary,
          labelColor: colors.text + '80',
          style: {
            borderRadius: 16,
          },
        }}
        style={styles.chart}
      />
    </Animated.View>
  );

  const renderPieChart = (data: any, title: string) => (
    <Animated.View entering={FadeInUp} style={[styles.chartCard, { backgroundColor: colors.card }]}>
      <View style={styles.chartHeader}>
        <Text style={[styles.chartTitle, { color: colors.text }]}>{title}</Text>
        <TouchableOpacity>
          <ChartBarBig size={18} color={colors.primary} />
        </TouchableOpacity>
      </View>
      <PieChart
        data={data}
        width={screenWidth - 64}
        height={200}
        chartConfig={{
          backgroundColor: colors.card,
          backgroundGradientFrom: colors.card,
          backgroundGradientTo: colors.card,
          color: (opacity = 1) => colors.primary,
          labelColor: colors.text + '80',
          style: {
            borderRadius: 16,
          },
        }}
        accessor="population"
        backgroundColor="transparent"
        paddingLeft="15"
        absolute
        style={styles.chart}
      />
    </Animated.View>
  );

  const renderAgentCard = (agent: AIAgent, index: number) => (
    <Animated.View
      entering={FadeInUp.delay(index * 50)}
      style={[styles.agentCard, { backgroundColor: colors.card, borderColor: colors.border }]}
    >
      <View style={styles.agentHeader}>
        <View style={[styles.iconContainer, { backgroundColor: agent.color + '15' }]}>
          <agent.icon size={28} color={agent.color} />
        </View>
        <View style={styles.agentInfo}>
          <Text style={[styles.agentName, { color: colors.text }]}>{agent.name}</Text>
          <Text style={[styles.agentTitle, { color: colors.text + '80' }]} numberOfLines={2}>
            {agent.title}
          </Text>
        </View>
        <View style={[styles.statusBadge, { 
          backgroundColor: agent.status === 'active' ? '#34C759' : '#FF9500' 
        }]}>
          <Text style={styles.statusText}>{agent.status}</Text>
        </View>
      </View>

      <Text style={[styles.description, { color: colors.text + '70' }]} numberOfLines={2}>
        {agent.description}
      </Text>

      {/* Configuration Summary */}
      <View style={styles.configRow}>
        {agent.configuration?.model && (
          <View style={styles.configBadge}>
            <Brain size={14} color={colors.primary} />
            <Text style={[styles.configText, { color: colors.text }]}>
              {agent.configuration.model.primary}
            </Text>
          </View>
        )}
        {agent.configuration?.voice.enabled && (
          <View style={styles.configBadge}>
            <Mic size={14} color={colors.primary} />
            <Text style={[styles.configText, { color: colors.text }]}>
              {agent.configuration.voice.gender}
            </Text>
          </View>
        )}
        {agent.configuration?.language && (
          <View style={styles.configBadge}>
            <Globe size={14} color={colors.primary} />
            <Text style={[styles.configText, { color: colors.text }]}>
              {agent.configuration.language.primary}
            </Text>
          </View>
        )}
      </View>

      {/* Action Buttons */}
      <View style={styles.actionRow}>
        <TouchableOpacity
          style={[styles.actionButton, { backgroundColor: colors.primary }]}
          onPress={() => handleConfigureAgent(agent.id)}
        >
          <Settings size={16} color="#fff" />
          <Text style={styles.actionButtonText}>Configure</Text>
        </TouchableOpacity>
        
        <TouchableOpacity
          style={[styles.actionButtonOutline, { borderColor: colors.border }]}
          onPress={() => handleDataUpload(agent.id)}
        >
          <Database size={16} color={colors.text} />
          <Text style={[styles.actionButtonTextOutline, { color: colors.text }]}>Data</Text>
        </TouchableOpacity>
      </View>

      {/* Capabilities */}
      <View style={styles.capabilitiesContainer}>
        <Text style={[styles.capabilitiesTitle, { color: colors.text + '60' }]}>Capabilities</Text>
        <View style={styles.capabilitiesRow}>
          {agent.capabilities.slice(0, 4).map((cap, idx) => (
            <View key={idx} style={[styles.capabilityBadge, { backgroundColor: colors.border + '30' }]}>
              <Text style={[styles.capabilityText, { color: colors.text + '80' }]}>{cap}</Text>
            </View>
          ))}
          {agent.capabilities.length > 4 && (
            <View style={[styles.capabilityBadge, { backgroundColor: colors.border + '30' }]}>
              <Text style={[styles.capabilityText, { color: colors.text + '80' }]}>
                +{agent.capabilities.length - 4}
              </Text>
            </View>
          )}
        </View>
      </View>
    </Animated.View>
  );

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      {/* Header */}
      <View style={[styles.header, { backgroundColor: colors.card, borderBottomColor: colors.border }]}>
        <View style={styles.headerTop}>
          <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
            <ChevronLeft size={24} color={colors.text} />
          </TouchableOpacity>
          <View style={styles.headerTitleContainer}>
            <Megaphone size={24} color="#FF2D55" />
            <Text style={[styles.headerTitle, { color: colors.text }]}>Marketing & Growth AI</Text>
          </View>
          <TouchableOpacity onPress={() => setShowFilters(!showFilters)} style={styles.filterButton}>
            <ListFilter size={20} color={colors.text} />
          </TouchableOpacity>
        </View>

        {/* Main Agent Card */}
        {mainAgent && (
          <Animated.View entering={FadeInRight} style={[styles.mainAgentCard, { backgroundColor: '#FF2D5515' }]}>
            <View style={styles.mainAgentInfo}>
              <mainAgent.icon size={32} color="#FF2D55" />
              <View style={styles.mainAgentText}>
                <Text style={[styles.mainAgentName, { color: colors.text }]}>{mainAgent.name}</Text>
                <Text style={[styles.mainAgentDesc, { color: colors.text + '80' }]} numberOfLines={1}>
                  {mainAgent.description}
                </Text>
              </View>
            </View>
            <TouchableOpacity
              style={[styles.mainAgentButton, { backgroundColor: '#FF2D55' }]}
              onPress={() => handleConfigureAgent(mainAgent.id)}
            >
              <Text style={styles.mainAgentButtonText}>Manage</Text>
            </TouchableOpacity>
          </Animated.View>
        )}

        {/* Stats */}
        <View style={styles.statsContainer}>
          <Animated.View entering={FadeInRight.delay(100)} style={[styles.statBadge, { backgroundColor: colors.border + '30' }]}>
            <User size={16} color={colors.text} />
            <Text style={[styles.statValue, { color: colors.text }]}>{stats.total}</Text>
            <Text style={[styles.statLabel, { color: colors.text + '60' }]}>Agents</Text>
          </Animated.View>
          <Animated.View entering={FadeInRight.delay(150)} style={[styles.statBadge, { backgroundColor: '#34C75915' }]}>
            <Zap size={16} color="#34C759" />
            <Text style={[styles.statValue, { color: '#34C759' }]}>{stats.active}</Text>
            <Text style={[styles.statLabel, { color: colors.text + '60' }]}>Active</Text>
          </Animated.View>
          <Animated.View entering={FadeInRight.delay(200)} style={[styles.statBadge, { backgroundColor: colors.primary + '15' }]}>
            <Mic size={16} color={colors.primary} />
            <Text style={[styles.statValue, { color: colors.primary }]}>{stats.withVoice}</Text>
            <Text style={[styles.statLabel, { color: colors.text + '60' }]}>Voice</Text>
          </Animated.View>
          <Animated.View entering={FadeInRight.delay(250)} style={[styles.statBadge, { backgroundColor: '#7C3AED15' }]}>
            <TrendingUp size={16} color="#7C3AED" />
            <Text style={[styles.statValue, { color: '#7C3AED' }]}>{stats.withTraining}</Text>
            <Text style={[styles.statLabel, { color: colors.text + '60' }]}>Training</Text>
          </Animated.View>
        </View>

        {/* Search */}
        <View style={[styles.searchContainer, { backgroundColor: colors.border + '30' }]}>
          <Search size={18} color={colors.text + '60'} />
          <TextInput
            style={[styles.searchInput, { color: colors.text }]}
            placeholder="Search marketing agents..."
            placeholderTextColor={colors.text + '40'}
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>
      </View>

      {/* Analytics Charts */}
      <ScrollView style={styles.chartsSection} horizontal={false}>
        {renderLineChart(CAMPAIGN_PERFORMANCE_DATA, 'Campaign Performance (6 Months)', '#FF2D55')}
        {renderBarChart(ENGAGEMENT_METRICS_DATA, 'Engagement Metrics (Weekly)')}
        {renderPieChart(CHANNEL_PERFORMANCE_DATA, 'Channel Performance')}
        {renderLineChart(LEAD_GENERATION_DATA, 'Lead Generation (6 Months)', '#FF2D55')}
        {renderLineChart(ROI_DATA, 'ROI (Quarterly)', '#10B981')}
        {renderPieChart(AUDIENCE_SEGMENTATION_DATA, 'Audience Segmentation')}
        {renderLineChart(CAMPAIGN_PERFORMANCE_DATA, 'Campaign Performance (6 Months)', '#10B981')}
        {renderLineChart(BRAND_AWARENESS_DATA, 'Brand Awareness (Quarterly)', '#3B82F6')}
        {renderPieChart(CONTENT_ENGAGEMENT_DATA, 'Content Engagement')}
        {renderLineChart(LEAD_GENERATION_DATA, 'Lead Generation (6 Months)', '#10B981')}
        {renderLineChart(CHANNEL_PERFORMANCE_DATA, 'Channel Performance (Quarterly)', '#3B82F6')}
        {renderPieChart(AUDIENCE_SEGMENT_DATA, 'Audience Segment Distribution')}
      </ScrollView>

      {/* Agents List */}
      <FlatList
        data={filteredAgents}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContainer}
        renderItem={({ item, index }) => renderAgentCard(item, index)}
        ListEmptyComponent={
          <View style={styles.emptyState}>
            <Megaphone size={48} color={colors.text + '20'} />
            <Text style={[styles.emptyTitle, { color: colors.text }]}>No agents found</Text>
          </View>
        }
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    borderBottomWidth: 1,
  },
  headerTop: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  backButton: {
    padding: 8,
  },
  headerTitleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
  },
  filterButton: {
    padding: 8,
  },
  mainAgentCard: {
    margin: 16,
    marginTop: 0,
    padding: 16,
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  mainAgentInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    flex: 1,
  },
  mainAgentText: {
    flex: 1,
  },
  mainAgentName: {
    fontSize: 16,
    fontWeight: '600',
  },
  mainAgentDesc: {
    fontSize: 13,
    marginTop: 2,
  },
  mainAgentButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
  },
  mainAgentButtonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 14,
  },
  statsContainer: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    gap: 8,
    marginBottom: 12,
  },
  statBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  statValue: {
    fontSize: 14,
    fontWeight: '600',
  },
  statLabel: {
    fontSize: 12,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    margin: 16,
    marginTop: 0,
    paddingHorizontal: 12,
    borderRadius: 10,
    height: 40,
  },
  searchInput: {
    flex: 1,
    marginLeft: 8,
    fontSize: 15,
  },
  listContainer: {
    padding: 16,
  },
  agentCard: {
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
  },
  agentHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  iconContainer: {
    width: 52,
    height: 52,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  agentInfo: {
    flex: 1,
  },
  agentName: {
    fontSize: 16,
    fontWeight: '600',
  },
  agentTitle: {
    fontSize: 13,
    marginTop: 2,
  },
  statusBadge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  statusText: {
    color: '#fff',
    fontSize: 11,
    fontWeight: '600',
    textTransform: 'uppercase',
  },
  description: {
    fontSize: 14,
    marginTop: 12,
    lineHeight: 20,
  },
  configRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginTop: 12,
  },
  configBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: '#00000010',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 6,
  },
  configText: {
    fontSize: 12,
    fontWeight: '500',
  },
  actionRow: {
    flexDirection: 'row',
    gap: 10,
    marginTop: 14,
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 8,
  },
  actionButtonOutline: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 8,
    borderWidth: 1,
  },
  actionButtonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 13,
  },
  actionButtonTextOutline: {
    fontWeight: '600',
    fontSize: 13,
  },
  capabilitiesContainer: {
    marginTop: 14,
    paddingTop: 14,
    borderTopWidth: 1,
    borderTopColor: '#00000010',
  },
  capabilitiesTitle: {
    fontSize: 12,
    marginBottom: 8,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  capabilitiesRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
  },
  capabilityBadge: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 6,
  },
  capabilityText: {
    fontSize: 11,
    fontWeight: '500',
  },
  emptyState: {
    alignItems: 'center',
    padding: 48,
  },
  emptyTitle: {
    fontSize: 16,
    marginTop: 16,
  },
  chartsSection: {
    paddingHorizontal: 16,
    paddingBottom: 16,
  },
  chartCard: {
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  chartHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  chartTitle: {
    fontSize: 16,
    fontWeight: '600',
  },
  chart: {
    borderRadius: 16,
  },
});
