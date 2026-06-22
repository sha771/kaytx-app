import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { useTheme } from '@/providers/ThemeProvider';
import { Shield, Scale, Gavel, AlertTriangle, CheckCircle, Activity, Layers, Crown } from 'lucide-react-native';

export default function GovernancePage() {
  const { theme } = useTheme();

  const GOVERNANCE_COMPONENTS = [
    {
      id: 'ai-ethics-board',
      name: 'AI Ethics Board',
      icon: Scale,
      color: '#DC2626',
      description: 'Governs ethical AI development and deployment across the organization',
      responsibilities: [
        'Establish ethical AI guidelines',
        'Review AI agent deployments',
        'Ensure compliance with AI regulations',
        'Monitor AI decision-making processes',
        'Approve high-impact AI systems'
      ],
      capabilities: [
        'Ethical Impact Assessment',
        'Bias Detection & Mitigation',
        'Regulatory Compliance Tracking',
        'Ethics Training & Awareness',
        'Stakeholder Engagement'
      ],
      metrics: {
        reviewsCompleted: '1,247',
        biasDetected: '23',
        complianceRate: '99.8%',
        activeProjects: '45'
      }
    },
    {
      id: 'ciso-ai',
      name: 'CISO-AI (Chief Information Security Officer AI)',
      icon: Shield,
      color: '#7C3AED',
      description: 'AI-powered security oversight and threat intelligence for all AI systems',
      responsibilities: [
        'AI security architecture oversight',
        'Threat detection for AI systems',
        'Security policy enforcement',
        'Incident response coordination',
        'Security training for AI agents'
      ],
      capabilities: [
        'AI Threat Detection',
        'Security Policy Automation',
        'Vulnerability Assessment',
        'Incident Response Orchestration',
        'Security Metrics & Reporting'
      ],
      metrics: {
        threatsBlocked: '15,892',
        securityScore: '98.5%',
        incidentsResolved: '234',
        policiesEnforced: '89'
      }
    }
  ];

  const GOVERNANCE_PRINCIPLES = [
    {
      principle: 'Transparency',
      description: 'All AI decisions and processes must be explainable and auditable',
      icon: CheckCircle,
      color: '#10B981'
    },
    {
      principle: 'Accountability',
      description: 'Clear ownership and responsibility for all AI systems',
      icon: Crown,
      color: '#F59E0B'
    },
    {
      principle: 'Fairness',
      description: 'AI systems must be designed to avoid bias and discrimination',
      icon: Scale,
      color: '#3B82F6'
    },
    {
      principle: 'Security',
      description: 'AI systems must be secure against adversarial attacks',
      icon: Shield,
      color: '#DC2626'
    }
  ];

  return (
    <ScrollView style={[styles.container, { backgroundColor: theme.colors.background }]}>
      {/* Hero Section */}
      <View style={[styles.hero, { borderBottomColor: theme.colors.border || '#E5E5EA' }]}>
        <View style={[styles.heroIconWrap, { backgroundColor: '#DC262620' }]}>
          <Shield size={56} color="#DC2626" />
        </View>
        <Text style={[styles.heroTitle, { color: theme.colors.text }]}>Governance & Ethics</Text>
        <Text style={[styles.heroSubtitle, { color: theme.colors.textSecondary }]}>
          Tier 0 - AI Ethics Board & Security Oversight
        </Text>
        <View style={styles.badgesRow}>
          <View style={[styles.badge, { backgroundColor: '#DC262622' }]}>
            <Shield size={12} color="#DC2626" />
            <Text style={[styles.badgeText, { color: '#DC2626' }]}>2 Components</Text>
          </View>
          <View style={[styles.badge, { backgroundColor: '#10B98122' }]}>
            <Activity size={12} color="#10B981" />
            <Text style={[styles.badgeText, { color: '#10B981' }]}>Active</Text>
          </View>
        </View>
      </View>

      {/* Overview */}
      <View style={[styles.section, { backgroundColor: theme.colors.card || '#F2F2F7' }]}>
        <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Overview</Text>
        <Text style={[styles.description, { color: theme.colors.textSecondary }]}>
          The Governance & Ethics tier provides the foundational oversight for the entire AI workforce. 
          The AI Ethics Board ensures all AI systems operate ethically and responsibly, while the CISO-AI 
          provides comprehensive security oversight. This tier sets the policies, guidelines, and standards 
          that all other AI agents must follow.
        </Text>
      </View>

      {/* Governance Principles */}
      <View style={[styles.section, { backgroundColor: theme.colors.card || '#F2F2F7' }]}>
        <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Governance Principles</Text>
        {GOVERNANCE_PRINCIPLES.map((principle) => (
          <View key={principle.principle} style={[styles.principleCard, { backgroundColor: theme.colors.background || '#F2F2F7' }]}>
            <View style={[styles.principleIcon, { backgroundColor: principle.color + '20' }]}>
              <principle.icon size={24} color={principle.color} />
            </View>
            <View style={styles.principleInfo}>
              <Text style={[styles.principleName, { color: theme.colors.text }]}>{principle.principle}</Text>
              <Text style={[styles.principleDesc, { color: theme.colors.textSecondary }]}>{principle.description}</Text>
            </View>
          </View>
        ))}
      </View>

      {/* Governance Components */}
      <View style={[styles.section, { backgroundColor: theme.colors.card || '#F2F2F7' }]}>
        <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Governance Components</Text>
        {GOVERNANCE_COMPONENTS.map((component) => (
          <View key={component.id} style={[styles.componentCard, { backgroundColor: theme.colors.background || '#F2F2F7' }]}>
            <View style={[styles.componentHeader, { borderBottomColor: theme.colors.border || '#E5E5EA' }]}>
              <View style={[styles.componentIcon, { backgroundColor: component.color + '20' }]}>
                <component.icon size={32} color={component.color} />
              </View>
              <View style={styles.componentTitle}>
                <Text style={[styles.componentName, { color: theme.colors.text }]}>{component.name}</Text>
                <Text style={[styles.componentDesc, { color: theme.colors.textSecondary }]}>{component.description}</Text>
              </View>
            </View>

            <View style={styles.subsection}>
              <Text style={[styles.subsectionTitle, { color: theme.colors.text }]}>Responsibilities</Text>
              {component.responsibilities.map((resp, i) => (
                <View key={i} style={styles.listItem}>
                  <View style={[styles.bullet, { backgroundColor: component.color }]} />
                  <Text style={[styles.listText, { color: theme.colors.textSecondary }]}>{resp}</Text>
                </View>
              ))}
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
  principleCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    gap: 16,
  },
  principleIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  principleInfo: {
    flex: 1,
  },
  principleName: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  principleDesc: {
    fontSize: 14,
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
  componentName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  componentDesc: {
    fontSize: 14,
  },
  subsection: {
    marginBottom: 16,
  },
  subsectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 12,
  },
  listItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
    gap: 12,
  },
  bullet: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  listText: {
    fontSize: 14,
    flex: 1,
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
});