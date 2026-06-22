import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { useTheme } from '@/providers/ThemeProvider';
import { Brain, Heart, Shield, TrendingUp, Activity, Zap, Target, Sparkles } from 'lucide-react-native';

export default function IntelligencePage() {
  const { theme } = useTheme();

  const INTELLIGENCE_COMPONENTS = [
    {
      id: 'predictive-engine',
      name: 'Predictive Engine',
      icon: Brain,
      color: '#7C3AED',
      acronym: 'PRED',
      description: 'Advanced predictive analytics for demand forecasting, churn prediction, and trend analysis',
      capabilities: [
        'Demand Forecasting',
        'Churn Prediction',
        'Trend Analysis',
        'Revenue Prediction',
        'Resource Planning',
        'Market Intelligence'
      ],
      businessImpact: '+30% customer retention through proactive intervention',
      exampleOutput: 'Customer X (score: 85) will churn within 7 days. Recommended intervention: Offer personalized discount.',
      metrics: {
        predictionsAccuracy: '94.2%',
        proactiveInterventions: '1,247',
        revenueSaved: '$2.4M',
        modelsActive: '45'
      },
      integrations: ['CRM', 'Sales Data', 'Customer Support', 'Marketing Platform']
    },
    {
      id: 'sentiment-core',
      name: 'Sentiment Core',
      icon: Heart,
      color: '#EC4899',
      acronym: 'SENTIMENT',
      description: 'Real-time emotion detection and customer satisfaction tracking with mood-based routing',
      capabilities: [
        'Real-time Emotion Detection',
        'Customer Satisfaction Tracking',
        'Mood-based Routing',
        'Empathy Scoring',
        'Tone Analysis',
        'Sentiment Trend Analysis'
      ],
      businessImpact: '+25% CSAT through early escalation of frustrated customers',
      exampleOutput: 'Customer mood: 2/10 (frustrated). Auto-escalate to senior agent with empathy training.',
      metrics: {
        sentimentAccuracy: '91.8%',
        escalationsPrevented: '856',
        csatImprovement: '+25%',
        conversationsAnalyzed: '156K'
      },
      integrations: ['Support Tickets', 'Chat Logs', 'Social Media', 'Voice Calls']
    },
    {
      id: 'anomaly-detector',
      name: 'Anomaly Detector',
      icon: Shield,
      color: '#EF4444',
      acronym: 'ANOMALY',
      description: 'Security threat identification, fraud detection, and unusual behavior pattern alerts',
      capabilities: [
        'Fraud Detection',
        'Security Threat Identification',
        'Pattern Break Detection',
        'Risk Warnings',
        'Unusual Behavior Alerts',
        'Compliance Monitoring'
      ],
      businessImpact: '-90% fraud losses through instant detection and prevention',
      exampleOutput: 'Transaction #4521 flagged: 5x above normal pattern. Risk score: 92/100. Action: Auto-block.',
      metrics: {
        fraudPrevented: '$4.8M',
        threatsBlocked: '15,892',
        falsePositiveRate: '0.8%',
        patternsMonitored: '234K'
      },
      integrations: ['Payment Systems', 'User Activity', 'Network Logs', 'Access Controls']
    }
  ];

  const INTELLIGENCE_STATS = [
    { label: 'Total Predictions', value: '2.4M', icon: Brain, color: '#7C3AED' },
    { label: 'Sentiment Analysis', value: '156K', icon: Heart, color: '#EC4899' },
    { label: 'Threats Blocked', value: '15.8K', icon: Shield, color: '#EF4444' },
    { label: 'Accuracy Rate', value: '94.2%', icon: Target, color: '#10B981' }
  ];

  return (
    <ScrollView style={[styles.container, { backgroundColor: theme.colors.background }]}>
      {/* Hero Section */}
      <View style={[styles.hero, { borderBottomColor: theme.colors.border || '#E5E5EA' }]}>
        <View style={[styles.heroIconWrap, { backgroundColor: '#7C3AED20' }]}>
          <Brain size={56} color="#7C3AED" />
        </View>
        <Text style={[styles.heroTitle, { color: theme.colors.text }]}>Intelligence Layer</Text>
        <Text style={[styles.heroSubtitle, { color: theme.colors.textSecondary }]}>
          Tier 2 - Predictive Analytics & Advanced Intelligence
        </Text>
        <View style={styles.badgesRow}>
          <View style={[styles.badge, { backgroundColor: '#7C3AED22' }]}>
            <Brain size={12} color="#7C3AED" />
            <Text style={[styles.badgeText, { color: '#7C3AED' }]}>3 Components</Text>
          </View>
          <View style={[styles.badge, { backgroundColor: '#10B98122' }]}>
            <Activity size={12} color="#10B981" />
            <Text style={[styles.badgeText, { color: '#10B981' }]}>Active</Text>
          </View>
          <View style={[styles.badge, { backgroundColor: '#F59E0B22' }]}>
            <Sparkles size={12} color="#F59E0B" />
            <Text style={[styles.badgeText, { color: '#F59E0B' }]}>AI-Powered</Text>
          </View>
        </View>
      </View>

      {/* Intelligence Stats */}
      <View style={styles.statsContainer}>
        {INTELLIGENCE_STATS.map((stat, i) => (
          <View key={i} style={[styles.statCard, { backgroundColor: theme.colors.card || '#F2F2F7' }]}>
            <stat.icon size={24} color={stat.color} />
            <Text style={[styles.statValue, { color: theme.colors.text }]}>{stat.value}</Text>
            <Text style={[styles.statLabel, { color: theme.colors.textSecondary }]}>{stat.label}</Text>
          </View>
        ))}
      </View>

      {/* Overview */}
      <View style={[styles.section, { backgroundColor: theme.colors.card || '#F2F2F7' }]}>
        <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Overview</Text>
        <Text style={[styles.description, { color: theme.colors.textSecondary }]}>
          The Intelligence Layer provides advanced predictive and analytical capabilities that power 
          the entire AI workforce. By analyzing patterns, predicting outcomes, and detecting anomalies 
          in real-time, this layer enables proactive decision-making and intelligent automation across 
          all business functions.
        </Text>
      </View>

      {/* Intelligence Components */}
      <View style={[styles.section, { backgroundColor: theme.colors.card || '#F2F2F7' }]}>
        <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Intelligence Components</Text>
        {INTELLIGENCE_COMPONENTS.map((component) => (
          <View key={component.id} style={[styles.componentCard, { backgroundColor: theme.colors.background || '#F2F2F7' }]}>
            <View style={[styles.componentHeader, { borderBottomColor: theme.colors.border || '#E5E5EA' }]}>
              <View style={[styles.componentIcon, { backgroundColor: component.color + '20' }]}>
                <component.icon size={32} color={component.color} />
              </View>
              <View style={styles.componentTitle}>
                <View style={styles.componentNameRow}>
                  <Text style={[styles.componentName, { color: theme.colors.text }]}>{component.name}</Text>
                  <View style={[styles.acronymBadge, { backgroundColor: component.color + '20' }]}>
                    <Text style={[styles.acronymText, { color: component.color }]}>{component.acronym}</Text>
                  </View>
                </View>
                <Text style={[styles.componentDesc, { color: theme.colors.textSecondary }]}>{component.description}</Text>
              </View>
            </View>

            <View style={styles.impactBanner}>
              <TrendingUp size={20} color="#10B981" />
              <Text style={[styles.impactText, { color: '#10B981' }]}>Business Impact: {component.businessImpact}</Text>
            </View>

            <View style={styles.subsection}>
              <Text style={[styles.subsectionTitle, { color: theme.colors.text }]}>Capabilities</Text>
              <View style={styles.capabilitiesGrid}>
                {component.capabilities.map((cap, i) => (
                  <View key={i} style={[styles.capabilityChip, { backgroundColor: component.color + '15' }]}>
                    <Text style={[styles.capabilityText, { color: component.color }]}>{cap}</Text>
                  </View>
                ))}
              </View>
            </View>

            <View style={styles.subsection}>
              <Text style={[styles.subsectionTitle, { color: theme.colors.text }]}>Example Output</Text>
              <View style={[styles.exampleBox, { backgroundColor: component.color + '10', borderColor: component.color + '30' }]}>
                <Zap size={16} color={component.color} />
                <Text style={[styles.exampleText, { color: theme.colors.text }]}>{component.exampleOutput}</Text>
              </View>
            </View>

            <View style={styles.subsection}>
              <Text style={[styles.subsectionTitle, { color: theme.colors.text }]}>Key Metrics</Text>
              <View style={styles.metricsGrid}>
                {Object.entries(component.metrics).map(([key, value]) => (
                  <View key={key} style={[styles.metricItem, { backgroundColor: theme.colors.card || '#F2F2F7' }]}>
                    <Text style={[styles.metricValue, { color: component.color }]}>{value}</Text>
                    <Text style={[styles.metricLabel, { color: theme.colors.textSecondary }]}>
                      {key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
                    </Text>
                  </View>
                ))}
              </View>
            </View>

            <View style={styles.subsection}>
              <Text style={[styles.subsectionTitle, { color: theme.colors.text }]}>Integrations</Text>
              <View style={styles.integrationsList}>
                {component.integrations.map((integration, i) => (
                  <View key={i} style={[styles.integrationChip, { backgroundColor: component.color + '15' }]}>
                    <Text style={[styles.integrationText, { color: component.color }]}>{integration}</Text>
                  </View>
                ))}
              </View>
            </View>
          </View>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  hero: {
    padding: 24,
    borderBottomWidth: 1,
  },
  heroIconWrap: {
    width: 80,
    height: 80,
    borderRadius: 40,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  heroTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  heroSubtitle: {
    fontSize: 16,
    marginBottom: 16,
  },
  badgesRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  badge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    gap: 6,
  },
  badgeText: {
    fontSize: 12,
    fontWeight: '600',
  },
  statsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    padding: 16,
    gap: 12,
  },
  statCard: {
    flex: 1,
    minWidth: 140,
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    gap: 8,
  },
  statValue: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  statLabel: {
    fontSize: 12,
    textAlign: 'center',
  },
  section: {
    padding: 20,
    marginTop: 8,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  description: {
    fontSize: 14,
    lineHeight: 20,
  },
  componentCard: {
    padding: 20,
    borderRadius: 12,
    marginBottom: 16,
  },
  componentHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingBottom: 16,
    borderBottomWidth: 1,
    marginBottom: 16,
    gap: 16,
  },
  componentIcon: {
    width: 64,
    height: 64,
    borderRadius: 32,
    justifyContent: 'center',
    alignItems: 'center',
  },
  componentTitle: {
    flex: 1,
  },
  componentNameRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 4,
  },
  componentName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  acronymBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  acronymText: {
    fontSize: 12,
    fontWeight: '600',
  },
  componentDesc: {
    fontSize: 14,
  },
  impactBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#10B98115',
    padding: 12,
    borderRadius: 8,
    marginBottom: 16,
    gap: 8,
  },
  impactText: {
    fontSize: 14,
    fontWeight: '600',
    flex: 1,
  },
  subsection: {
    marginBottom: 16,
  },
  subsectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 12,
  },
  capabilitiesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  capabilityChip: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  capabilityText: {
    fontSize: 12,
    fontWeight: '500',
  },
  exampleBox: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    padding: 16,
    borderRadius: 8,
    borderWidth: 1,
    gap: 12,
  },
  exampleText: {
    fontSize: 14,
    fontStyle: 'italic',
    flex: 1,
  },
  metricsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  metricItem: {
    flex: 1,
    minWidth: 120,
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    gap: 4,
  },
  metricValue: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  metricLabel: {
    fontSize: 12,
    textAlign: 'center',
  },
  integrationsList: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  integrationChip: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  integrationText: {
    fontSize: 12,
    fontWeight: '500',
  },
});