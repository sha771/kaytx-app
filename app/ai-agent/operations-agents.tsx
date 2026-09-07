import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  TextInput,
  Dimensions,
} from 'react-native';
import { useRouter } from 'expo-router';
import {
  ChevronLeft,
  Settings,
  Search,
  Database,
  Brain,
  Mic,
  User,
  Zap,
  ListFilter,
  Workflow,
  Calendar,
  Users,
  Building2,
  Shield,
  ClipboardList,
  Package,
  Truck,
  FileCheck,
  BarChart3,
  ChartLine,
} from 'lucide-react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Animated, { FadeInUp, FadeInRight } from 'react-native-reanimated';
import { useColorScheme } from '@/hooks/useColorScheme';
import { Colors } from '@/constants/Colors';
import {
  AIAgent,
  operationsManagementSubAgents,
  getMainAgentByCategory,
} from '@/constants/aiAgentHierarchy';
import { LineChart, BarChart, PieChart } from 'react-native-chart-kit';

// Chart Data
const OPERATIONAL_EFFICIENCY_DATA = {
  labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
  datasets: [
    {
      data: [78, 82, 85, 88, 91, 94],
      color: (opacity = 1) => `rgba(255, 107, 53, ${opacity})`,
      strokeWidth: 2,
    },
  ],


};
const TASK_COMPLETION_DATA = {
  labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
  datasets: [
    {
      data: [950, 1100, 1050, 1250, 1180, 720, 850],
    },
  ],
};

const WORKFLOW_DISTRIBUTION_DATA = [
  {
    name: 'Automation',
    population: 35,
    color: '#FF6B35',
    legendFontColor: '#fff',
    legendFontSize: 12,
  },
  {
    name: 'Manual',
    population: 25,
    color: '#3B82F6',
    legendFontColor: '#fff',
    legendFontSize: 12,
  },
  {
    name: 'Hybrid',
    population: 25,
    color: '#10B981',
    legendFontColor: '#fff',
    legendFontSize: 12,
  },
  {
    name: 'AI-Driven',
    population: 15,
    color: '#8B5CF6',
    legendFontColor: '#fff',
    legendFontSize: 12,
  },
];

const PROCESS_TIME_DATA = {
  labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
  datasets: [
    {
      data: [4.2, 3.8, 3.5, 3.2, 2.9, 2.5],
      color: (opacity = 1) => `rgba(16, 185, 129, ${opacity})`,
      strokeWidth: 2,
    },
  ],
};

const ERROR_REDUCTION_DATA = {
  labels: ['Q1', 'Q2', 'Q3', 'Q4'],
  datasets: [
    {
      data: [15, 12, 8, 5],
      color: (opacity = 1) => `rgba(239, 68, 68, ${opacity})`,
      strokeWidth: 2,
    },
  ],
};

const RESOURCE_ALLOCATION_DATA = [
  {
    name: 'Development',
    population: 40,
    color: '#3B82F6',
    legendFontColor: '#fff',
    legendFontSize: 12,
  },
  {
    name: 'Support',
    population: 25,
    color: '#10B981',
    legendFontColor: '#fff',
    legendFontSize: 12,
  },
  {
    name: 'Operations',
    population: 20,
    color: '#F59E0B',
    legendFontColor: '#fff',
    legendFontSize: 12,
  },
  {
    name: 'Maintenance',
    population: 15,
    color: '#8B5CF6',
    legendFontColor: '#fff',
    legendFontSize: 12,
  },
];

const EFFICIENCY_METRICS_DATA = {
  labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
  datasets: [
    {
      data: [78, 82, 85, 88, 92, 95],
      color: (opacity = 1) => `rgba(16, 185, 129, ${opacity})`,
      strokeWidth: 2,
    },
  ],
};

const INCIDENT_RESPONSE_DATA = {
  labels: ['Q1', 'Q2', 'Q3', 'Q4'],
  datasets: [
    {
      data: [25, 22, 18, 15],
      color: (opacity = 1) => `rgba(239, 68, 68, ${opacity})`,
      strokeWidth: 2,
    },
  ],
};

const WORKLOAD_DISTRIBUTION_DATA = [
  {
    name: 'Automated',
    population: 45,
    color: '#10B981',
    legendFontColor: '#fff',
    legendFontSize: 12,
  },
  {
    name: 'Manual',
    population: 30,
    color: '#3B82F6',
    legendFontColor: '#fff',
    legendFontSize: 12,
  },
  {
    name: 'Hybrid',
    population: 25,
    color: '#F59E0B',
    legendFontColor: '#fff',
    legendFontSize: 12,
  },
];

const PROCESS_OPTIMIZATION_DATA = {
  labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
  datasets: [
    {
      data: [72, 78, 82, 86, 90, 94],
      color: (opacity = 1) => `rgba(16, 185, 129, ${opacity})`,
      strokeWidth: 2,
    },
  ],
};

const TASK_CATEGORY_DATA = [
  {
    name: 'Automation',
    population: 40,
    color: '#10B981',
    legendFontColor: '#fff',
    legendFontSize: 12,
  },
  {
    name: 'Monitoring',
    population: 30,
    color: '#3B82F6',
    legendFontColor: '#fff',
    legendFontSize: 12,
  },
  {
    name: 'Maintenance',
    population: 20,
    color: '#F59E0B',
    legendFontColor: '#fff',
    legendFontSize: 12,
  },
  {
    name: 'Support',
    population: 10,
    color: '#8B5CF6',
    legendFontColor: '#fff',
    legendFontSize: 12,
  },
];

export default function OperationsAgentsScreen() {
  const router = useRouter();
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];
  const screenWidth = Dimensions.get('window').width;
  const [searchQuery, setSearchQuery] = useState('');

  const mainAgent = getMainAgentByCategory('operations-management');
  const filteredAgents = operationsManagementSubAgents.filter(agent =>
    agent.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleConfigure = (agentId: string) => {
    router.push(`/ai-agent/agent-configuration?id=${agentId}`);
  };

  const handleDataUpload = (agentId: string) => {
    router.push(`/ai-agent/agent-data-upload?id=${agentId}`);
  };

  const stats = {
    total: operationsManagementSubAgents.length,
    withVoice: operationsManagementSubAgents.filter(a => a.configuration?.voice.enabled).length,
    withTraining: operationsManagementSubAgents.filter(a => a.configuration?.training.enabled).length,
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
          <BarChart3 size={18} color={colors.primary} />
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
          <BarChart3 size={18} color={colors.primary} />
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
    <Animated.View entering={FadeInUp.delay(index * 50)} style={[styles.card, { backgroundColor: colors.card, borderColor: colors.border }]}>
      <View style={styles.cardHeader}>
        <View style={[styles.iconContainer, { backgroundColor: '#FF6B3515' }]}>
          <agent.icon size={24} color="#FF6B35" />
        </View>
        <View style={styles.agentInfo}>
          <Text style={[styles.agentName, { color: colors.text }]}>{agent.name}</Text>
          <Text style={[styles.agentTitle, { color: colors.text + '80' }]} numberOfLines={1}>{agent.title}</Text>
        </View>
        <View style={[styles.statusBadge, { backgroundColor: agent.status === 'active' ? '#FF6B35' : '#F59E0B' }]}>
          <Text style={styles.statusText}>{agent.status}</Text>
        </View>
      </View>

      <View style={styles.configRow}>
        {agent.configuration?.model && (
          <View style={styles.configBadge}>
            <Brain size={12} color="#FF6B35" />
            <Text style={[styles.configText, { color: colors.text }]}>{agent.configuration.model.primary}</Text>
          </View>
        )}
        {agent.configuration?.personality && (
          <View style={styles.configBadge}>
            <User size={12} color="#FF6B35" />
            <Text style={[styles.configText, { color: colors.text }]}>{agent.configuration.personality.communicationStyle}</Text>
          </View>
        )}
      </View>

      <View style={styles.actionRow}>
        <TouchableOpacity style={[styles.actionBtn, { backgroundColor: '#FF6B35' }]} onPress={() => handleConfigure(agent.id)}>
          <Settings size={14} color="#fff" />
          <Text style={styles.actionBtnText}>Configure</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.actionBtnOutline, { borderColor: colors.border }]} onPress={() => handleDataUpload(agent.id)}>
          <Database size={14} color={colors.text} />
          <Text style={[styles.actionBtnTextOutline, { color: colors.text }]}>Training Data</Text>
        </TouchableOpacity>
      </View>
    </Animated.View>
  );

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      <View style={[styles.header, { backgroundColor: colors.card, borderBottomColor: colors.border }]}>
        <View style={styles.headerTop}>
          <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
            <ChevronLeft size={24} color={colors.text} />
          </TouchableOpacity>
          <View style={styles.titleContainer}>
            <Settings size={22} color="#FF6B35" />
            <Text style={[styles.title, { color: colors.text }]}>Operations AI</Text>
          </View>
          <View style={{ width: 40 }} />
        </View>

        {mainAgent && (
          <Animated.View entering={FadeInRight} style={[styles.mainCard, { backgroundColor: '#FF6B3515' }]}>
            <mainAgent.icon size={28} color="#FF6B35" />
            <View style={styles.mainInfo}>
              <Text style={[styles.mainName, { color: colors.text }]}>{mainAgent.name}</Text>
              <Text style={[styles.mainDesc, { color: colors.text + '80' }]} numberOfLines={1}>{mainAgent.description}</Text>
            </View>
            <TouchableOpacity style={[styles.manageBtn, { backgroundColor: '#FF6B35' }]} onPress={() => handleConfigure(mainAgent.id)}>
              <Text style={styles.manageBtnText}>Manage</Text>
            </TouchableOpacity>
          </Animated.View>
        )}

        <View style={styles.statsRow}>
          <View style={[styles.statPill, { backgroundColor: colors.border + '30' }]}>
            <User size={14} color={colors.text} />
            <Text style={[styles.statValue, { color: colors.text }]}>{stats.total}</Text>
          </View>
          <View style={[styles.statPill, { backgroundColor: '#FF6B3515' }]}>
            <Mic size={14} color="#FF6B35" />
            <Text style={[styles.statValue, { color: '#FF6B35' }]}>{stats.withVoice}</Text>
          </View>
          <View style={[styles.statPill, { backgroundColor: '#34C75915' }]}>
            <Zap size={14} color="#34C759" />
            <Text style={[styles.statValue, { color: '#34C759' }]}>{stats.withTraining}</Text>
          </View>
        </View>

        <View style={[styles.searchBox, { backgroundColor: colors.border + '30' }]}>
          <Search size={16} color={colors.text + '60'} />
          <TextInput
            style={[styles.searchInput, { color: colors.text }]}
            placeholder="Search operations agents..."
            placeholderTextColor={colors.text + '40'}
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>
      </View>

      {/* Analytics Charts */}
      <View style={styles.chartsSection}>
        {renderLineChart(OPERATIONAL_EFFICIENCY_DATA, 'Operational Efficiency (6 Months)', '#FF6B35')}
        {renderBarChart(TASK_COMPLETION_DATA, 'Task Completion (Weekly)')}
        {renderPieChart(WORKFLOW_DISTRIBUTION_DATA, 'Workflow Distribution')}
        {renderLineChart(PROCESS_TIME_DATA, 'Process Time (6 Months)', '#10B981')}
        {renderLineChart(ERROR_REDUCTION_DATA, 'Error Reduction (Quarterly)', '#EF4444')}
        {renderPieChart(RESOURCE_ALLOCATION_DATA, 'Resource Allocation')}
        {renderLineChart(EFFICIENCY_METRICS_DATA, 'Efficiency Metrics (6 Months)', '#10B981')}
        {renderLineChart(INCIDENT_RESPONSE_DATA, 'Incident Response (Quarterly)', '#EF4444')}
        {renderPieChart(WORKLOAD_DISTRIBUTION_DATA, 'Workload Distribution')}
        {renderLineChart(PROCESS_OPTIMIZATION_DATA, 'Process Optimization (6 Months)', '#10B981')}
        {renderPieChart(TASK_CATEGORY_DATA, 'Task Category Distribution')}
      </View>

      <FlatList
        data={filteredAgents}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.list}
        renderItem={({ item, index }) => renderAgentCard(item, index)}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  header: { borderBottomWidth: 1, paddingBottom: 16 },
  headerTop: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', padding: 16 },
  backBtn: { padding: 4 },
  titleContainer: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  title: { fontSize: 17, fontWeight: '600' },
  mainCard: { marginHorizontal: 16, marginBottom: 12, padding: 14, borderRadius: 12, flexDirection: 'row', alignItems: 'center', gap: 12 },
  mainInfo: { flex: 1 },
  mainName: { fontSize: 15, fontWeight: '600' },
  mainDesc: { fontSize: 12, marginTop: 2 },
  manageBtn: { paddingHorizontal: 14, paddingVertical: 6, borderRadius: 6 },
  manageBtnText: { color: '#fff', fontSize: 13, fontWeight: '600' },
  statsRow: { flexDirection: 'row', gap: 8, paddingHorizontal: 16, marginBottom: 12 },
  statPill: { flexDirection: 'row', alignItems: 'center', gap: 6, paddingHorizontal: 12, paddingVertical: 6, borderRadius: 16 },
  statValue: { fontSize: 13, fontWeight: '600' },
  searchBox: { flexDirection: 'row', alignItems: 'center', marginHorizontal: 16, paddingHorizontal: 12, borderRadius: 10, height: 40 },
  searchInput: { flex: 1, marginLeft: 8, fontSize: 15 },
  list: { padding: 16 },
  card: { borderRadius: 12, padding: 16, marginBottom: 12, borderWidth: 1 },
  cardHeader: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  iconContainer: { width: 48, height: 48, borderRadius: 10, justifyContent: 'center', alignItems: 'center' },
  agentInfo: { flex: 1 },
  agentName: { fontSize: 15, fontWeight: '600' },
  agentTitle: { fontSize: 12, marginTop: 2 },
  statusBadge: { paddingHorizontal: 8, paddingVertical: 3, borderRadius: 10 },
  statusText: { color: '#fff', fontSize: 10, fontWeight: '600', textTransform: 'uppercase' },
  configRow: { flexDirection: 'row', gap: 8, marginTop: 12 },
  configBadge: { flexDirection: 'row', alignItems: 'center', gap: 4, backgroundColor: '#00000008', paddingHorizontal: 8, paddingVertical: 4, borderRadius: 4 },
  configText: { fontSize: 11 },
  actionRow: { flexDirection: 'row', gap: 8, marginTop: 12 },
  actionBtn: { flexDirection: 'row', alignItems: 'center', gap: 4, paddingHorizontal: 12, paddingVertical: 6, borderRadius: 6 },
  actionBtnText: { color: '#fff', fontSize: 12, fontWeight: '600' },
  actionBtnOutline: { flexDirection: 'row', alignItems: 'center', gap: 4, paddingHorizontal: 12, paddingVertical: 6, borderRadius: 6, borderWidth: 1 },
  actionBtnTextOutline: { fontSize: 12, fontWeight: '600' },
  chartsSection: { paddingHorizontal: 16, paddingBottom: 16 },
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
