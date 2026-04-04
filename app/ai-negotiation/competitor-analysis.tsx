import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { Stack } from 'expo-router';
import {
  Shield,
  TrendingUp,
  DollarSign,
  Star,
  AlertCircle,
  CheckCircle,
  XCircle,
} from 'lucide-react-native';

interface Competitor {
  id: string;
  name: string;
  marketShare: number;
  pricing: string;
  strengths: string[];
  weaknesses: string[];
  winRate: number;
  customerSatisfaction: number;
  features: {
    name: string;
    us: boolean;
    them: boolean;
  }[];
}

export default function CompetitorAnalysisScreen() {
  const [selectedCompetitor, setSelectedCompetitor] = useState<string>('1');

  const competitors: Competitor[] = [
    {
      id: '1',
      name: 'CompetitorA',
      marketShare: 35,
      pricing: '$199-$499/mo',
      strengths: [
        'Established brand recognition',
        'Large customer base',
        'Extensive integrations',
      ],
      weaknesses: [
        'Higher pricing',
        'Complex setup process',
        'Limited customization',
      ],
      winRate: 45,
      customerSatisfaction: 72,
      features: [
        { name: 'AI-Powered Negotiation', us: true, them: false },
        { name: 'Real-time Analytics', us: true, them: true },
        { name: 'Custom Workflows', us: true, them: false },
        { name: 'Mobile App', us: true, them: true },
        { name: 'API Access', us: true, them: true },
        { name: 'White Labeling', us: true, them: false },
      ],
    },
    {
      id: '2',
      name: 'CompetitorB',
      marketShare: 28,
      pricing: '$149-$399/mo',
      strengths: [
        'Competitive pricing',
        'Good customer support',
        'User-friendly interface',
      ],
      weaknesses: [
        'Limited features',
        'No AI capabilities',
        'Slower updates',
      ],
      winRate: 62,
      customerSatisfaction: 68,
      features: [
        { name: 'AI-Powered Negotiation', us: true, them: false },
        { name: 'Real-time Analytics', us: true, them: false },
        { name: 'Custom Workflows', us: true, them: true },
        { name: 'Mobile App', us: true, them: false },
        { name: 'API Access', us: true, them: true },
        { name: 'White Labeling', us: true, them: false },
      ],
    },
    {
      id: '3',
      name: 'CompetitorC',
      marketShare: 22,
      pricing: '$99-$299/mo',
      strengths: [
        'Affordable pricing',
        'Quick implementation',
        'Good for startups',
      ],
      weaknesses: [
        'Basic features only',
        'Limited scalability',
        'No enterprise support',
      ],
      winRate: 78,
      customerSatisfaction: 65,
      features: [
        { name: 'AI-Powered Negotiation', us: true, them: false },
        { name: 'Real-time Analytics', us: true, them: false },
        { name: 'Custom Workflows', us: true, them: false },
        { name: 'Mobile App', us: true, them: true },
        { name: 'API Access', us: true, them: false },
        { name: 'White Labeling', us: true, them: false },
      ],
    },
  ];

  const selectedCompData = competitors.find((c) => c.id === selectedCompetitor) || competitors[0];

  return (
    <View style={styles.container}>
      <Stack.Screen
        options={{
          title: 'Competitor Analysis',
          headerStyle: { backgroundColor: '#0F172A' },
          headerTintColor: '#fff',
        }}
      />

      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <Text style={styles.title}>Competitive Intelligence</Text>
          <Text style={styles.subtitle}>Win more deals with insights</Text>
        </View>

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.competitorTabs}
          contentContainerStyle={styles.competitorTabsContent}
        >
          {competitors.map((comp) => (
            <TouchableOpacity
              key={comp.id}
              style={[
                styles.competitorTab,
                selectedCompetitor === comp.id && styles.competitorTabActive,
              ]}
              onPress={() => setSelectedCompetitor(comp.id)}
            >
              <Text
                style={[
                  styles.competitorTabText,
                  selectedCompetitor === comp.id && styles.competitorTabTextActive,
                ]}
              >
                {comp.name}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        <View style={styles.section}>
          <View style={styles.metricsGrid}>
            <View style={[styles.metricCard, { backgroundColor: '#3B82F6' }]}>
              <Shield size={24} color="#fff" />
              <Text style={styles.metricValue}>{selectedCompData.winRate}%</Text>
              <Text style={styles.metricLabel}>Win Rate vs Them</Text>
            </View>

            <View style={[styles.metricCard, { backgroundColor: '#10B981' }]}>
              <TrendingUp size={24} color="#fff" />
              <Text style={styles.metricValue}>{selectedCompData.marketShare}%</Text>
              <Text style={styles.metricLabel}>Market Share</Text>
            </View>

            <View style={[styles.metricCard, { backgroundColor: '#F59E0B' }]}>
              <Star size={24} color="#fff" />
              <Text style={styles.metricValue}>{selectedCompData.customerSatisfaction}%</Text>
              <Text style={styles.metricLabel}>Satisfaction</Text>
            </View>

            <View style={[styles.metricCard, { backgroundColor: '#8B5CF6' }]}>
              <DollarSign size={24} color="#fff" />
              <Text style={styles.metricValue}>{selectedCompData.pricing}</Text>
              <Text style={styles.metricLabel}>Their Pricing</Text>
            </View>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Feature Comparison</Text>
          <View style={styles.comparisonTable}>
            <View style={styles.tableHeader}>
              <Text style={[styles.tableHeaderText, { flex: 2 }]}>Feature</Text>
              <Text style={styles.tableHeaderText}>Us</Text>
              <Text style={styles.tableHeaderText}>Them</Text>
            </View>
            {selectedCompData.features.map((feature, index) => (
              <View key={index} style={styles.tableRow}>
                <Text style={[styles.featureName, { flex: 2 }]}>{feature.name}</Text>
                <View style={styles.featureStatus}>
                  {feature.us ? (
                    <CheckCircle size={20} color="#10B981" />
                  ) : (
                    <XCircle size={20} color="#EF4444" />
                  )}
                </View>
                <View style={styles.featureStatus}>
                  {feature.them ? (
                    <CheckCircle size={20} color="#10B981" />
                  ) : (
                    <XCircle size={20} color="#EF4444" />
                  )}
                </View>
              </View>
            ))}
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Strengths</Text>
          <View style={styles.listContainer}>
            {selectedCompData.strengths.map((strength, index) => (
              <View key={index} style={styles.listItem}>
                <CheckCircle size={16} color="#10B981" />
                <Text style={styles.listText}>{strength}</Text>
              </View>
            ))}
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Weaknesses (Our Advantages)</Text>
          <View style={styles.listContainer}>
            {selectedCompData.weaknesses.map((weakness, index) => (
              <View key={index} style={styles.listItem}>
                <AlertCircle size={16} color="#F59E0B" />
                <Text style={styles.listText}>{weakness}</Text>
              </View>
            ))}
          </View>
        </View>

        <View style={styles.section}>
          <View style={styles.battleCard}>
            <Text style={styles.battleCardTitle}>Battle Card Summary</Text>
            <Text style={styles.battleCardText}>
              When competing against {selectedCompData.name}:
            </Text>
            <View style={styles.battlePoints}>
              <Text style={styles.battlePoint}>
                • Highlight our AI-powered negotiation capabilities
              </Text>
              <Text style={styles.battlePoint}>
                • Emphasize our {selectedCompData.winRate}% win rate
              </Text>
              <Text style={styles.battlePoint}>
                • Focus on unique features they lack
              </Text>
              <Text style={styles.battlePoint}>
                • Address their weaknesses proactively
              </Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0F172A',
  },
  header: {
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: '#fff',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#64748B',
  },
  competitorTabs: {
    paddingHorizontal: 16,
    marginBottom: 16,
  },
  competitorTabsContent: {
    gap: 8,
  },
  competitorTab: {
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 12,
    backgroundColor: '#1E293B',
  },
  competitorTabActive: {
    backgroundColor: '#3B82F6',
  },
  competitorTabText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#64748B',
  },
  competitorTabTextActive: {
    color: '#fff',
  },
  section: {
    padding: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#fff',
    marginBottom: 16,
  },
  metricsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  metricCard: {
    flex: 1,
    minWidth: '45%',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    gap: 8,
  },
  metricValue: {
    fontSize: 24,
    fontWeight: '700',
    color: '#fff',
  },
  metricLabel: {
    fontSize: 12,
    color: 'rgba(255,255,255,0.9)',
    textAlign: 'center',
  },
  comparisonTable: {
    backgroundColor: '#1E293B',
    borderRadius: 12,
    overflow: 'hidden',
  },
  tableHeader: {
    flexDirection: 'row',
    padding: 16,
    backgroundColor: '#0F172A',
  },
  tableHeaderText: {
    fontSize: 14,
    fontWeight: '700',
    color: '#94A3B8',
    flex: 1,
    textAlign: 'center',
  },
  tableRow: {
    flexDirection: 'row',
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: '#334155',
    alignItems: 'center',
  },
  featureName: {
    fontSize: 14,
    color: '#fff',
  },
  featureStatus: {
    flex: 1,
    alignItems: 'center',
  },
  listContainer: {
    gap: 12,
  },
  listItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    backgroundColor: '#1E293B',
    padding: 16,
    borderRadius: 12,
  },
  listText: {
    fontSize: 14,
    color: '#94A3B8',
    flex: 1,
  },
  battleCard: {
    backgroundColor: '#1E293B',
    padding: 20,
    borderRadius: 12,
    borderLeftWidth: 4,
    borderLeftColor: '#3B82F6',
  },
  battleCardTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#fff',
    marginBottom: 12,
  },
  battleCardText: {
    fontSize: 14,
    color: '#94A3B8',
    marginBottom: 16,
  },
  battlePoints: {
    gap: 10,
  },
  battlePoint: {
    fontSize: 14,
    color: '#94A3B8',
    lineHeight: 20,
  },
});
