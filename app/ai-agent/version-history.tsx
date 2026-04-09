import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { useRouter } from 'expo-router';
import {
  ChevronLeft,
  GitBranch,
  GitCommit,
  RotateCcw,
  Clock,
  User,
  Bot,
  MessageSquare,
  CheckCircle,
  AlertCircle,
  ChevronDown,
  ChevronRight,
  MoreVertical,
  Download,
  Compare,
  Tag,
  Calendar,
  Filter,
  Search,
  Save,
} from 'lucide-react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Animated, { FadeInUp } from 'react-native-reanimated';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';

// Types
interface AgentVersion {
  id: string;
  version: string;
  name: string;
  description: string;
  author: string;
  timestamp: string;
  changes: string[];
  type: 'major' | 'minor' | 'patch';
  status: 'current' | 'previous' | 'reverted';
  metrics: {
    accuracy: number;
    conversations: number;
    avgResponseTime: number;
  };
}

// Mock Data
const AGENT_VERSIONS: AgentVersion[] = [
  {
    id: '1',
    version: 'v3.2.1',
    name: 'Support AI Pro',
    description: 'Improved intent recognition and added multilingual support',
    author: 'Sarah Chen',
    timestamp: '2026-03-01 14:30:00',
    changes: [
      'Enhanced intent recognition accuracy by 15%',
      'Added support for Spanish and French',
      'Fixed conversation timeout issues',
      'Improved escalation detection',
    ],
    type: 'minor',
    status: 'current',
    metrics: {
      accuracy: 94.5,
      conversations: 5234,
      avgResponseTime: 1.2,
    },
  },
  {
    id: '2',
    version: 'v3.1.0',
    name: 'Support AI Pro',
    description: 'Added advanced sentiment analysis',
    author: 'Mike Johnson',
    timestamp: '2026-02-15 10:00:00',
    changes: [
      'Implemented sentiment analysis for all conversations',
      'Added priority escalation based on sentiment',
      'Updated knowledge base integration',
    ],
    type: 'minor',
    status: 'previous',
    metrics: {
      accuracy: 92.1,
      conversations: 4890,
      avgResponseTime: 1.4,
    },
  },
  {
    id: '3',
    version: 'v3.0.0',
    name: 'Support AI Pro',
    description: 'Major rewrite with new GPT-4 integration',
    author: 'AI Team',
    timestamp: '2026-02-01 09:00:00',
    changes: [
      'Migrated to GPT-4 model',
      'Complete architecture overhaul',
      'New training pipeline implemented',
      '50% faster response times',
    ],
    type: 'major',
    status: 'previous',
    metrics: {
      accuracy: 89.8,
      conversations: 4210,
      avgResponseTime: 2.1,
    },
  },
  {
    id: '4',
    version: 'v2.5.2',
    name: 'Support AI',
    description: 'Bug fixes and performance improvements',
    author: 'Sarah Chen',
    timestamp: '2026-01-20 16:45:00',
    changes: [
      'Fixed API rate limiting issues',
      'Improved error handling',
      'Memory leak fixes',
    ],
    type: 'patch',
    status: 'reverted',
    metrics: {
      accuracy: 87.3,
      conversations: 3890,
      avgResponseTime: 2.3,
    },
  },
  {
    id: '5',
    version: 'v2.5.1',
    name: 'Support AI',
    description: 'Updated FAQ database and improved responses',
    author: 'Mike Johnson',
    timestamp: '2026-01-10 11:30:00',
    changes: [
      'Added 150 new FAQ entries',
      'Improved response templates',
      'Better handling of edge cases',
    ],
    type: 'patch',
    status: 'previous',
    metrics: {
      accuracy: 86.8,
      conversations: 3456,
      avgResponseTime: 2.4,
    },
  },
];

const TYPE_COLORS = {
  major: '#EF4444',
  minor: '#3B82F6',
  patch: '#10B981',
};

const TYPE_LABELS = {
  major: 'Major',
  minor: 'Minor',
  patch: 'Patch',
};

export default function AgentVersionHistoryScreen() {
  const router = useRouter();
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];

  const [selectedVersion, setSelectedVersion] = useState<AgentVersion | null>(null);
  const [compareMode, setCompareMode] = useState(false);
  const [compareVersions, setCompareVersions] = useState<string[]>([]);

  const currentVersion = AGENT_VERSIONS.find(v => v.status === 'current');

  const toggleCompare = (versionId: string) => {
    if (compareVersions.includes(versionId)) {
      setCompareVersions(prev => prev.filter(id => id !== versionId));
    } else if (compareVersions.length < 2) {
      setCompareVersions(prev => [...prev, versionId]);
    }
  };

  const renderVersionCard = (version: AgentVersion, index: number) => {
    const isExpanded = selectedVersion?.id === version.id;
    const isCurrent = version.status === 'current';
    const isSelectedForCompare = compareVersions.includes(version.id);

    return (
      <Animated.View
        key={version.id}
        entering={FadeInUp.delay(index * 50)}
        style={[
          styles.versionCard,
          { backgroundColor: colors.card },
          isCurrent && styles.currentCard,
        ]}
      >
        <TouchableOpacity
          style={styles.versionHeader}
          onPress={() => setSelectedVersion(isExpanded ? null : version)}
        >
          <View style={styles.versionLeft}>
            <View
              style={[
                styles.versionBadge,
                { backgroundColor: TYPE_COLORS[version.type] + '15' },
              ]}
            >
              <GitCommit size={14} color={TYPE_COLORS[version.type]} />
              <Text
                style={[
                  styles.versionBadgeText,
                  { color: TYPE_COLORS[version.type] },
                ]}
              >
                {version.version}
              </Text>
            </View>
            <View style={styles.versionInfo}>
              <Text style={[styles.versionName, { color: colors.text }]}>
                {version.name}
              </Text>
              <Text style={[styles.versionDescription, { color: colors.icon }]} numberOfLines={1}>
                {version.description}
              </Text>
            </View>
          </View>

          <View style={styles.versionRight}>
            {isCurrent && (
              <View style={[styles.currentBadge, { backgroundColor: '#10B981' + '15' }]}>
                <CheckCircle size={12} color="#10B981" />
                <Text style={[styles.currentText, { color: '#10B981' }]}>Current</Text>
              </View>
            )}
            <ChevronDown
              size={18}
              color={colors.icon}
              style={[styles.expandIcon, isExpanded && styles.expandIconRotated]}
            />
          </View>
        </TouchableOpacity>

        <View style={styles.versionMeta}>
          <View style={styles.metaItem}>
            <User size={12} color={colors.icon} />
            <Text style={[styles.metaText, { color: colors.icon }]}>{version.author}</Text>
          </View>
          <View style={styles.metaItem}>
            <Clock size={12} color={colors.icon} />
            <Text style={[styles.metaText, { color: colors.icon }]}>{version.timestamp}</Text>
          </View>
        </View>

        {/* Metrics Preview */}
        <View style={styles.metricsPreview}>
          <View style={styles.metricPreview}>
            <Text style={[styles.metricValue, { color: colors.text }]}>
              {version.metrics.accuracy}%
            </Text>
            <Text style={[styles.metricLabel, { color: colors.icon }]}>Accuracy</Text>
          </View>
          <View style={styles.metricDivider} />
          <View style={styles.metricPreview}>
            <Text style={[styles.metricValue, { color: colors.text }]}>
              {version.metrics.conversations.toLocaleString()}
            </Text>
            <Text style={[styles.metricLabel, { color: colors.icon }]}>Convos</Text>
          </View>
          <View style={styles.metricDivider} />
          <View style={styles.metricPreview}>
            <Text style={[styles.metricValue, { color: colors.text }]}>
              {version.metrics.avgResponseTime}s
            </Text>
            <Text style={[styles.metricLabel, { color: colors.icon }]}>Response</Text>
          </View>
        </View>

        {/* Expanded Details */}
        {isExpanded && (
          <Animated.View entering={FadeInUp} style={styles.versionDetails}>
            <View style={[styles.changesCard, { backgroundColor: colors.background }]}>
              <Text style={[styles.changesTitle, { color: colors.text }]}>
                Changes in this version
              </Text>
              {version.changes.map((change, i) => (
                <View key={i} style={styles.changeItem}>
                  <View style={[styles.changeBullet, { backgroundColor: TYPE_COLORS[version.type] }]} />
                  <Text style={[styles.changeText, { color: colors.icon }]}>{change}</Text>
                </View>
              ))}
            </View>

            <View style={styles.versionActions}>
              {!isCurrent && (
                <TouchableOpacity style={[styles.actionButton, { backgroundColor: colors.tint }]}
                  onPress={() => { /* Revert action */ }}
                >
                  <RotateCcw size={14} color="white" />
                  <Text style={styles.actionButtonText}>Revert to this version</Text>
                </TouchableOpacity>
              )}
              <TouchableOpacity style={[styles.actionButton, { backgroundColor: colors.background }]}>
                <Download size={14} color={colors.icon} />
                <Text style={[styles.actionButtonText, { color: colors.icon }]}>Export config</Text>
              </TouchableOpacity>
            </View>
          </Animated.View>
        )}
      </Animated.View>
    );
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <TouchableOpacity onPress={() => router.back()}>
            <ChevronLeft size={28} color={colors.text} />
          </TouchableOpacity>
          <View>
            <Text style={[styles.headerTitle, { color: colors.text }]}>
              Version History
            </Text>
            <Text style={[styles.headerSubtitle, { color: colors.icon }]}>
              {currentVersion?.name} • {currentVersion?.version}
            </Text>
          </View>
        </View>
        <TouchableOpacity
          style={[styles.compareButton, { backgroundColor: compareMode ? colors.tint : colors.card }]}
          onPress={() => {
            setCompareMode(!compareMode);
            setCompareVersions([]);
          }}
        >
          <Compare size={20} color={compareMode ? 'white' : colors.icon} />
        </TouchableOpacity>
      </View>

      {/* Current Version Summary */}
      <View style={[styles.summaryCard, { backgroundColor: colors.card }]}>
        <View style={styles.summaryHeader}>
          <View style={[styles.summaryIcon, { backgroundColor: colors.tint + '15' }]}>
            <GitBranch size={24} color={colors.tint} />
          </View>
          <View style={styles.summaryInfo}>
            <Text style={[styles.summaryTitle, { color: colors.text }]}>
              Current Version
            </Text>
            <Text style={[styles.summaryVersion, { color: colors.tint }]}>
              {currentVersion?.version} • {TYPE_LABELS[currentVersion?.type || 'patch']}
            </Text>
          </View>
        </View>

        <View style={styles.summaryMetrics}>
          <View style={styles.summaryMetric}>
            <Text style={[styles.summaryMetricValue, { color: colors.text }]}>
              {currentVersion?.metrics.accuracy}%
            </Text>
            <Text style={[styles.summaryMetricLabel, { color: colors.icon }]}>
              Accuracy
            </Text>
          </View>
          <View style={styles.summaryMetric}>
            <Text style={[styles.summaryMetricValue, { color: colors.text }]}>
              {currentVersion?.metrics.conversations.toLocaleString()}
            </Text>
            <Text style={[styles.summaryMetricLabel, { color: colors.icon }]}>
              Conversations
            </Text>
          </View>
          <View style={styles.summaryMetric}>
            <Text style={[styles.summaryMetricValue, { color: colors.text }]}>
              {currentVersion?.metrics.avgResponseTime}s
            </Text>
            <Text style={[styles.summaryMetricLabel, { color: colors.icon }]}>
              Avg Response
            </Text>
          </View>
        </View>
      </View>

      {/* Timeline */}
      <ScrollView
        style={styles.content}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.contentContainer}
      >
        <Text style={[styles.sectionTitle, { color: colors.text }]}>
          Version Timeline
        </Text>

        {AGENT_VERSIONS.map((version, index) => renderVersionCard(version, index))}

        <TouchableOpacity style={[styles.deployButton, { backgroundColor: colors.tint }]}>
          <Save size={18} color="white" />
          <Text style={styles.deployButtonText}>Deploy New Version</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingTop: 8,
    paddingBottom: 16,
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: '700',
  },
  headerSubtitle: {
    fontSize: 13,
    marginTop: 2,
  },
  compareButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    alignItems: 'center',
    justifyContent: 'center',
  },
  summaryCard: {
    marginHorizontal: 16,
    marginBottom: 20,
    padding: 20,
    borderRadius: 16,
  },
  summaryHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  summaryIcon: {
    width: 48,
    height: 48,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  summaryInfo: {
    flex: 1,
  },
  summaryTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 2,
  },
  summaryVersion: {
    fontSize: 14,
    fontWeight: '500',
  },
  summaryMetrics: {
    flexDirection: 'row',
    borderTopWidth: 1,
    borderTopColor: '#E5E7EB',
    paddingTop: 16,
  },
  summaryMetric: {
    flex: 1,
    alignItems: 'center',
  },
  summaryMetricValue: {
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 2,
  },
  summaryMetricLabel: {
    fontSize: 12,
  },
  content: {
    flex: 1,
  },
  contentContainer: {
    padding: 16,
    paddingTop: 0,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 12,
  },
  versionCard: {
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    borderWidth: 2,
    borderColor: 'transparent',
  },
  currentCard: {
    borderColor: '#10B981',
  },
  versionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  versionLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  versionBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 6,
    gap: 5,
    marginRight: 12,
  },
  versionBadgeText: {
    fontSize: 13,
    fontWeight: '600',
  },
  versionInfo: {
    flex: 1,
  },
  versionName: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 2,
  },
  versionDescription: {
    fontSize: 13,
  },
  versionRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  currentBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
    gap: 4,
  },
  currentText: {
    fontSize: 11,
    fontWeight: '600',
  },
  expandIcon: {
    marginLeft: 8,
  },
  expandIconRotated: {
    transform: [{ rotate: '180deg' }],
  },
  versionMeta: {
    flexDirection: 'row',
    gap: 16,
    marginBottom: 12,
  },
  metaItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  metaText: {
    fontSize: 12,
  },
  metricsPreview: {
    flexDirection: 'row',
    backgroundColor: '#00000005',
    borderRadius: 10,
    padding: 12,
  },
  metricPreview: {
    flex: 1,
    alignItems: 'center',
  },
  metricDivider: {
    width: 1,
    backgroundColor: '#E5E7EB',
  },
  metricValue: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 2,
  },
  metricLabel: {
    fontSize: 11,
  },
  versionDetails: {
    marginTop: 16,
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: '#E5E7EB',
  },
  changesCard: {
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
  },
  changesTitle: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 12,
  },
  changeItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginBottom: 8,
  },
  changeBullet: {
    width: 6,
    height: 6,
    borderRadius: 3,
  },
  changeText: {
    fontSize: 13,
    flex: 1,
    lineHeight: 18,
  },
  versionActions: {
    flexDirection: 'row',
    gap: 8,
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: 10,
    gap: 6,
  },
  actionButtonText: {
    color: 'white',
    fontSize: 14,
    fontWeight: '600',
  },
  deployButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 14,
    borderRadius: 12,
    gap: 8,
    marginTop: 16,
    marginBottom: 32,
  },
  deployButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
});
