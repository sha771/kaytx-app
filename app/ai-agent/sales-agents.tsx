import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  FlatList,
  TextInput,
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
  Briefcase,
  ChartBarBig,
  ListFilter,
  ChevronRight,
  Award,
  Phone,
  Mail,
  Handshake,
} from 'lucide-react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { BlurView } from 'expo-blur';
import Animated, { FadeInUp, FadeInRight } from 'react-native-reanimated';
import { useColorScheme } from '@/hooks/useColorScheme';
import { Colors } from '@/constants/Colors';
import {
  AIAgent,
  salesRevenueSubAgents,
  getMainAgentByCategory,
  updateAgentConfiguration,
} from '@/constants/aiAgentHierarchy';

export default function SalesAgentsScreen() {
  const router = useRouter();
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];

  const [searchQuery, setSearchQuery] = useState('');
  const [showFilters, setShowFilters] = useState(false);

  const mainAgent = getMainAgentByCategory('sales-revenue');
  
  const filteredAgents = salesRevenueSubAgents.filter(agent =>
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
    total: salesRevenueSubAgents.length,
    active: salesRevenueSubAgents.filter(a => a.status === 'active').length,
    withVoice: salesRevenueSubAgents.filter(a => a.configuration?.voice.enabled).length,
    withTraining: salesRevenueSubAgents.filter(a => a.configuration?.training.enabled).length,
  };

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
        {agent.configuration?.personality && (
          <View style={styles.configBadge}>
            <User size={14} color={colors.primary} />
            <Text style={[styles.configText, { color: colors.text }]}>
              {agent.configuration.personality.age}
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
            <Target size={24} color="#34C759" />
            <Text style={[styles.headerTitle, { color: colors.text }]}>Sales & Revenue AI</Text>
          </View>
          <TouchableOpacity onPress={() => setShowFilters(!showFilters)} style={styles.filterButton}>
            <ListFilter size={20} color={colors.text} />
          </TouchableOpacity>
        </View>

        {/* Main Agent Card */}
        {mainAgent && (
          <Animated.View entering={FadeInRight} style={[styles.mainAgentCard, { backgroundColor: '#34C75915' }]}>
            <View style={styles.mainAgentInfo}>
              <mainAgent.icon size={32} color="#34C759" />
              <View style={styles.mainAgentText}>
                <Text style={[styles.mainAgentName, { color: colors.text }]}>{mainAgent.name}</Text>
                <Text style={[styles.mainAgentDesc, { color: colors.text + '80' }]} numberOfLines={1}>
                  {mainAgent.description}
                </Text>
              </View>
            </View>
            <TouchableOpacity
              style={[styles.mainAgentButton, { backgroundColor: '#34C759' }]}
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
          <Animated.View entering={FadeInRight.delay(250)} style={[styles.statBadge, { backgroundColor: '#F59E0B15' }]}>
            <DollarSign size={16} color="#F59E0B" />
            <Text style={[styles.statValue, { color: '#F59E0B' }]}>{stats.withTraining}</Text>
            <Text style={[styles.statLabel, { color: colors.text + '60' }]}>Training</Text>
          </Animated.View>
        </View>

        {/* Search */}
        <View style={[styles.searchContainer, { backgroundColor: colors.border + '30' }]}>
          <Search size={18} color={colors.text + '60'} />
          <TextInput
            style={[styles.searchInput, { color: colors.text }]}
            placeholder="Search sales agents..."
            placeholderTextColor={colors.text + '40'}
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>
      </View>

      {/* Agents List */}
      <FlatList
        data={filteredAgents}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContainer}
        renderItem={({ item, index }) => renderAgentCard(item, index)}
        ListEmptyComponent={
          <View style={styles.emptyState}>
            <Target size={48} color={colors.text + '20'} />
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
});
