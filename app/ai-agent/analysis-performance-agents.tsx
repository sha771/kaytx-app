import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  TextInput,
} from 'react-native';
import { useRouter } from 'expo-router';
import {
  ChevronLeft,
  Gauge,
  Search,
  Database,
  Brain,
  Mic,
  User,
  Zap,
  Activity,
  TrendingUp,
  Timer,
  Target,
  ChartBarBig,
  ChartLine,
  ChartPie,
} from 'lucide-react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Animated, { FadeInUp, FadeInRight } from 'react-native-reanimated';
import { useColorScheme } from '@/hooks/useColorScheme';
import { Colors } from '@/constants/Colors';
import {
  AIAgent,
  analysisInsightsPerformanceSubAgents,
  getMainAgentByCategory,
} from '@/constants/aiAgentHierarchy';

export default function AnalysisPerformanceAgentsScreen() {
  const router = useRouter();
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];
  const [searchQuery, setSearchQuery] = useState('');

  const mainAgent = getMainAgentByCategory('analysis-insights-performance');
  const filteredAgents = analysisInsightsPerformanceSubAgents.filter(agent =>
    agent.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleConfigure = (agentId: string) => {
    router.push(`/ai-agent/agent-configuration?id=${agentId}`);
  };

  const handleDataUpload = (agentId: string) => {
    router.push(`/ai-agent/agent-data-upload?id=${agentId}`);
  };

  const stats = {
    total: analysisInsightsPerformanceSubAgents.length,
    withVoice: analysisInsightsPerformanceSubAgents.filter(a => a.configuration?.voice.enabled).length,
    withTraining: analysisInsightsPerformanceSubAgents.filter(a => a.configuration?.training.enabled).length,
  };

  const renderAgentCard = (agent: AIAgent, index: number) => (
    <Animated.View entering={FadeInUp.delay(index * 50)} style={[styles.card, { backgroundColor: colors.card, borderColor: colors.border }]}>
      <View style={styles.cardHeader}>
        <View style={[styles.iconContainer, { backgroundColor: '#E74C3C15' }]}>
          <agent.icon size={24} color="#E74C3C" />
        </View>
        <View style={styles.agentInfo}>
          <Text style={[styles.agentName, { color: colors.text }]}>{agent.name}</Text>
          <Text style={[styles.agentTitle, { color: colors.text + '80' }]} numberOfLines={1}>{agent.title}</Text>
        </View>
        <View style={[styles.statusBadge, { backgroundColor: agent.status === 'active' ? '#E74C3C' : '#F59E0B' }]}>
          <Text style={styles.statusText}>{agent.status}</Text>
        </View>
      </View>

      <View style={styles.configRow}>
        {agent.configuration?.model && (
          <View style={styles.configBadge}>
            <Brain size={12} color="#E74C3C" />
            <Text style={[styles.configText, { color: colors.text }]}>{agent.configuration.model.primary}</Text>
          </View>
        )}
        {agent.configuration?.personality && (
          <View style={styles.configBadge}>
            <User size={12} color="#E74C3C" />
            <Text style={[styles.configText, { color: colors.text }]}>{agent.configuration.personality.traits[0]}</Text>
          </View>
        )}
      </View>

      <View style={styles.actionRow}>
        <TouchableOpacity style={[styles.actionBtn, { backgroundColor: '#E74C3C' }]} onPress={() => handleConfigure(agent.id)}>
          <Activity size={14} color="#fff" />
          <Text style={styles.actionBtnText}>Configure</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.actionBtnOutline, { borderColor: colors.border }]} onPress={() => handleDataUpload(agent.id)}>
          <Database size={14} color={colors.text} />
          <Text style={[styles.actionBtnTextOutline, { color: colors.text }]}>Metrics Data</Text>
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
            <Gauge size={22} color="#E74C3C" />
            <Text style={[styles.title, { color: colors.text }]}>Analysis & Performance AI</Text>
          </View>
          <View style={{ width: 40 }} />
        </View>

        {mainAgent && (
          <Animated.View entering={FadeInRight} style={[styles.mainCard, { backgroundColor: '#E74C3C15' }]}>
            <mainAgent.icon size={28} color="#E74C3C" />
            <View style={styles.mainInfo}>
              <Text style={[styles.mainName, { color: colors.text }]}>{mainAgent.name}</Text>
              <Text style={[styles.mainDesc, { color: colors.text + '80' }]} numberOfLines={1}>{mainAgent.description}</Text>
            </View>
            <TouchableOpacity style={[styles.manageBtn, { backgroundColor: '#E74C3C' }]} onPress={() => handleConfigure(mainAgent.id)}>
              <Text style={styles.manageBtnText}>Manage</Text>
            </TouchableOpacity>
          </Animated.View>
        )}

        <View style={styles.statsRow}>
          <View style={[styles.statPill, { backgroundColor: colors.border + '30' }]}>
            <User size={14} color={colors.text} />
            <Text style={[styles.statValue, { color: colors.text }]}>{stats.total}</Text>
          </View>
          <View style={[styles.statPill, { backgroundColor: '#E74C3C15' }]}>
            <Mic size={14} color="#E74C3C" />
            <Text style={[styles.statValue, { color: '#E74C3C' }]}>{stats.withVoice}</Text>
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
            placeholder="Search analysis agents..."
            placeholderTextColor={colors.text + '40'}
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>
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
});
