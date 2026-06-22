import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Switch,
  Alert,
} from 'react-native';
import { useRouter } from 'expo-router';
import {
  ChevronLeft,
  Settings,
  Check,
  Brain,
  Mic,
  Globe,
  User,
  Zap,
  Save,
  CircleAlert,
  Layers,
  ListFilter,
} from 'lucide-react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Animated, { FadeInUp } from 'react-native-reanimated';
import { useColorScheme } from '@/hooks/useColorScheme';
import { Colors } from '@/constants/Colors';
import {
  allAgents,
  allSubAgents,
  agentCategories,
  updateAgentConfiguration,
  AIModelType,
  AgentLanguage,
} from '@/constants/aiAgentHierarchy';

export default function BulkConfigurationScreen() {
  const router = useRouter();
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];

  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedAgents, setSelectedAgents] = useState<Set<string>>(new Set());
  const [configChanges, setConfigChanges] = useState({
    model: '' as AIModelType | '',
    voiceEnabled: null as boolean | null,
    language: '' as AgentLanguage | '',
    autoTraining: null as boolean | null,
    dataUploadEnabled: null as boolean | null,
  });

  const filteredAgents = selectedCategory === 'all' 
    ? allAgents 
    : allAgents.filter(a => a.category === selectedCategory || (a.type === 'main_agent' && allSubAgents.some(s => s.category === selectedCategory && s.hierarchy.parentId === a.id)));

  const toggleAgent = (agentId: string) => {
    const newSelected = new Set(selectedAgents);
    if (newSelected.has(agentId)) {
      newSelected.delete(agentId);
    } else {
      newSelected.add(agentId);
    }
    setSelectedAgents(newSelected);

  };

  const selectAll = () => {
    if (selectedAgents.size === filteredAgents.length) {
      setSelectedAgents(new Set());
    } else {
      setSelectedAgents(new Set(filteredAgents.map(a => a.id)));
    }
  };

  const applyChanges = () => {
    if (selectedAgents.size === 0) {
      Alert.alert('No Agents Selected', 'Please select at least one agent to update.');
      return;
    }

    const changes: any = {};
    if (configChanges.model) changes.model = { primary: configChanges.model };
    if (configChanges.voiceEnabled !== null) changes.voice = { enabled: configChanges.voiceEnabled };
    if (configChanges.language) changes.language = { primary: configChanges.language };
    if (configChanges.autoTraining !== null) changes.training = { enabled: configChanges.autoTraining };
    if (configChanges.dataUploadEnabled !== null) changes.dataUpload = { enabled: configChanges.dataUploadEnabled };

    if (Object.keys(changes).length === 0) {
      Alert.alert('No Changes', 'Please configure at least one setting to update.');
      return;
    }

    selectedAgents.forEach(agentId => {
      updateAgentConfiguration(agentId, changes);
    });

    Alert.alert(
      'Configuration Updated',
      `Successfully updated ${selectedAgents.size} agent(s).`,
      [{ text: 'OK', onPress: () => router.back() }]
    );
  };

  const modelOptions = ['gpt-4o', 'gpt-4-turbo', 'claude-3-opus', 'claude-3-5-sonnet', 'gemini-1.5-pro', 'mistral-large'] as AIModelType[];
  const languageOptions = ['en', 'es', 'fr', 'de', 'zh', 'ja', 'ar', 'hi'] as AgentLanguage[];

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      {/* Header */}
      <View style={[styles.header, { backgroundColor: colors.card, borderBottomColor: colors.border }]}>
        <View style={styles.headerTop}>
          <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
            <ChevronLeft size={24} color={colors.text} />
          </TouchableOpacity>
          <View style={styles.headerTitleContainer}>
            <Layers size={22} color={colors.primary} />
            <Text style={[styles.headerTitle, { color: colors.text }]}>Bulk Configuration</Text>
          </View>
          <TouchableOpacity 
            style={[styles.saveButton, selectedAgents.size > 0 && { backgroundColor: colors.primary }]}
            onPress={applyChanges}
          >
            <Save size={20} color={selectedAgents.size > 0 ? '#fff' : colors.text + '40'} />
          </TouchableOpacity>
        </View>

        {/* Category Filter */}
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.categoryScroll}>
          <TouchableOpacity
            style={[styles.categoryChip, selectedCategory === 'all' && { backgroundColor: colors.primary }]}
            onPress={() => setSelectedCategory('all')}
          >
            <Text style={[styles.categoryText, { color: selectedCategory === 'all' ? '#fff' : colors.text }]}>
              All ({allAgents.length})
            </Text>
          </TouchableOpacity>
          {agentCategories.map(cat => {
            const count = allAgents.filter(a => a.category === cat.id).length;

            return (
              <TouchableOpacity
                key={cat.id}
                style={[styles.categoryChip, selectedCategory === cat.id && { backgroundColor: cat.color }]}
                onPress={() => setSelectedCategory(cat.id)}
              >
                <Text style={[styles.categoryText, { color: selectedCategory === cat.id ? '#fff' : colors.text }]}>
                  {cat.label.split(' ')[0]} ({count})
                </Text>
              </TouchableOpacity>
            );
          })}
        </ScrollView>

        {/* Select All Bar */}
        <TouchableOpacity style={styles.selectAllBar} onPress={selectAll}>
          <View style={[styles.checkbox, selectedAgents.size === filteredAgents.length && { backgroundColor: colors.primary, borderColor: colors.primary }]}>
            {selectedAgents.size === filteredAgents.length && <Check size={14} color="#fff" />}
          </View>
          <Text style={[styles.selectAllText, { color: colors.text }]}>
            Select All ({selectedAgents.size}/{filteredAgents.length})
          </Text>
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Configuration Options */}
        <Animated.View entering={FadeInUp} style={[styles.configSection, { backgroundColor: colors.card, borderColor: colors.border }]}>
          <Text style={[styles.configTitle, { color: colors.text }]}>Configuration Changes</Text>
          
          {/* Model Selection */}
          <View style={styles.configItem}>
            <View style={styles.configItemHeader}>
              <Brain size={18} color={colors.primary} />
              <Text style={[styles.configLabel, { color: colors.text }]}>AI Model</Text>
            </View>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.optionScroll}>
              <TouchableOpacity
                style={[styles.optionChip, configChanges.model === '' && { backgroundColor: colors.border + '50' }]}
                onPress={() => setConfigChanges({ ...configChanges, model: '' })}
              >
                <Text style={[styles.optionText, { color: colors.text }]}>No Change</Text>
              </TouchableOpacity>
              {modelOptions.map(model => (
                <TouchableOpacity
                  key={model}
                  style={[styles.optionChip, configChanges.model === model && { backgroundColor: colors.primary }]}
                  onPress={() => setConfigChanges({ ...configChanges, model })}
                >
                  <Text style={[styles.optionText, { color: configChanges.model === model ? '#fff' : colors.text }]}>
                    {model}
                  </Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>

          {/* Voice Toggle */}
          <View style={styles.configItem}>
            <View style={styles.configItemHeader}>
              <Mic size={18} color={colors.primary} />
              <Text style={[styles.configLabel, { color: colors.text }]}>Voice</Text>
            </View>
            <View style={styles.toggleGroup}>
              <TouchableOpacity
                style={[styles.toggleChip, configChanges.voiceEnabled === null && { backgroundColor: colors.border + '50' }]}
                onPress={() => setConfigChanges({ ...configChanges, voiceEnabled: null })}
              >
                <Text style={[styles.toggleText, { color: colors.text }]}>No Change</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.toggleChip, configChanges.voiceEnabled === true && { backgroundColor: '#10B981' }]}
                onPress={() => setConfigChanges({ ...configChanges, voiceEnabled: true })}
              >
                <Text style={[styles.toggleText, { color: configChanges.voiceEnabled === true ? '#fff' : colors.text }]}>
                  Enable
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.toggleChip, configChanges.voiceEnabled === false && { backgroundColor: '#EF4444' }]}
                onPress={() => setConfigChanges({ ...configChanges, voiceEnabled: false })}
              >
                <Text style={[styles.toggleText, { color: configChanges.voiceEnabled === false ? '#fff' : colors.text }]}>
                  Disable
                </Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Language Selection */}
          <View style={styles.configItem}>
            <View style={styles.configItemHeader}>
              <Globe size={18} color={colors.primary} />
              <Text style={[styles.configLabel, { color: colors.text }]}>Language</Text>
            </View>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.optionScroll}>
              <TouchableOpacity
                style={[styles.optionChip, configChanges.language === '' && { backgroundColor: colors.border + '50' }]}
                onPress={() => setConfigChanges({ ...configChanges, language: '' })}
              >
                <Text style={[styles.optionText, { color: colors.text }]}>No Change</Text>
              </TouchableOpacity>
              {languageOptions.map(lang => (
                <TouchableOpacity
                  key={lang}
                  style={[styles.optionChip, configChanges.language === lang && { backgroundColor: colors.primary }]}
                  onPress={() => setConfigChanges({ ...configChanges, language: lang })}
                >
                  <Text style={[styles.optionText, { color: configChanges.language === lang ? '#fff' : colors.text }]}>
                    {lang.charAt(0).toUpperCase() + lang.slice(1)}
                  </Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>

          {/* Auto Training */}
          <View style={styles.configItem}>
            <View style={styles.configItemHeader}>
              <Zap size={18} color={colors.primary} />
              <Text style={[styles.configLabel, { color: colors.text }]}>Auto Training</Text>
            </View>
            <View style={styles.toggleGroup}>
              <TouchableOpacity
                style={[styles.toggleChip, configChanges.autoTraining === null && { backgroundColor: colors.border + '50' }]}
                onPress={() => setConfigChanges({ ...configChanges, autoTraining: null })}
              >
                <Text style={[styles.toggleText, { color: colors.text }]}>No Change</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.toggleChip, configChanges.autoTraining === true && { backgroundColor: '#10B981' }]}
                onPress={() => setConfigChanges({ ...configChanges, autoTraining: true })}
              >
                <Text style={[styles.toggleText, { color: configChanges.autoTraining === true ? '#fff' : colors.text }]}>
                  Enable
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.toggleChip, configChanges.autoTraining === false && { backgroundColor: '#EF4444' }]}
                onPress={() => setConfigChanges({ ...configChanges, autoTraining: false })}
              >
                <Text style={[styles.toggleText, { color: configChanges.autoTraining === false ? '#fff' : colors.text }]}>
                  Disable
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </Animated.View>

        {/* Agent List */}
        <Text style={[styles.sectionTitle, { color: colors.text }]}>Select Agents</Text>
        {filteredAgents.map((agent, index) => {
          const Icon = agent.icon;
          return (
            <Animated.View entering={FadeInUp.delay(index * 30)} key={agent.id}>
              <TouchableOpacity
                style={[styles.agentRow, { backgroundColor: colors.card, borderColor: colors.border }]}
                onPress={() => toggleAgent(agent.id)}
              >
                <View style={[styles.checkbox, selectedAgents.has(agent.id) && { backgroundColor: colors.primary, borderColor: colors.primary }]}>
                  {selectedAgents.has(agent.id) && <Check size={14} color="#fff" />}
                </View>
                <View style={[styles.agentIcon, { backgroundColor: agent.color + '15' }]}>
                  <Icon size={22} color={agent.color} />
                </View>
                <View style={styles.agentInfo}>
                  <Text style={[styles.agentName, { color: colors.text }]}>{agent.name}</Text>
                  <Text style={[styles.agentTitle, { color: colors.text + '60' }]} numberOfLines={1}>
                    {agent.title}
                  </Text>
                  <View style={styles.agentBadges}>
                    <View style={[styles.typeBadge, { backgroundColor: agent.type === 'main_agent' ? '#8B5CF6' : '#3B82F6' }]}>
                      <Text style={styles.typeText}>{agent.type === 'main_agent' ? 'Main' : 'Sub'}</Text>
                    </View>
                    {agent.configuration?.voice.enabled && (
                      <Mic size={12} color="#10B981" />
                    )}
                  </View>
                </View>
              </TouchableOpacity>
            </Animated.View>
          );
        })}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    paddingBottom: 16,
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
    fontWeight: '700',
  },
  saveButton: {
    padding: 8,
    borderRadius: 8,
  },
  categoryScroll: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    gap: 8,
  },
  categoryChip: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
  },
  categoryText: {
    fontSize: 13,
    fontWeight: '600',
  },
  selectAllBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    gap: 8,
  },
  checkbox: {
    width: 22,
    height: 22,
    borderRadius: 6,
    borderWidth: 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  selectAllText: {
    fontSize: 14,
    fontWeight: '600',
  },
  content: {
    flex: 1,
    paddingHorizontal: 16,
  },
  configSection: {
    padding: 16,
    borderRadius: 16,
    borderWidth: 1,
    marginBottom: 20,
  },
  configTitle: {
    fontSize: 16,
    fontWeight: '700',
    marginBottom: 16,
  },
  configItem: {
    marginBottom: 20,
  },
  configItemHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 12,
  },
  configLabel: {
    fontSize: 14,
    fontWeight: '600',
  },
  optionScroll: {
    gap: 8,
  },
  optionChip: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 10,
    borderWidth: 1,
    minWidth: 100,
    alignItems: 'center',
  },
  optionText: {
    fontSize: 13,
    fontWeight: '600',
  },
  toggleGroup: {
    flexDirection: 'row',
    gap: 8,
    flexWrap: 'wrap',
  },
  toggleChip: {
    flex: 1,
    minWidth: 80,
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: 'center',
  },
  toggleText: {
    fontSize: 13,
    fontWeight: '600',
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '700',
    marginBottom: 12,
  },
  agentRow: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 14,
    borderRadius: 12,
    borderWidth: 1,
    marginBottom: 8,
    gap: 12,
  },
  agentIcon: {
    width: 44,
    height: 44,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  agentInfo: {
    flex: 1,
    minWidth: 0,
  },
  agentName: {
    fontSize: 15,
    fontWeight: '600',
  },
  agentTitle: {
    fontSize: 12,
    marginTop: 2,
  },
  agentBadges: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginTop: 8,
  },
  typeBadge: {
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 4,
  },
  typeText: {
    color: '#fff',
    fontSize: 10,
    fontWeight: '600',
  },
});

