import React from 'react';
import { View, StyleSheet, Text, ScrollView } from 'react-native';
import { useTheme } from '@/providers/ThemeProvider';
import { Users, Building2, GraduationCap, Globe, Network, BookOpen, GitBranch, Award, Mail, Calendar } from 'lucide-react-native';

export default function CollaborationExpertNetworks() {
  const { theme } = useTheme();

  const collaborationMetrics = [
    {
      id: 'research-teams',
      label: 'Research Teams',
      value: '47',
      change: '+3',
      trend: 'up',
      icon: Users,
      color: '#0B8AFF'
    },
    {
      id: 'external-collaborators',
      label: 'External Collaborators',
      value: '234',
      change: '+18',
      trend: 'up',
      icon: Building2,
      color: '#10B981'
    },
    {
      id: 'academic-partnerships',
      label: 'Academic Partnerships',
      value: '56',
      change: '+5',
      trend: 'up',
      icon: GraduationCap,
      color: '#8B5CF6'
    },
    {
      id: 'industry-consortia',
      label: 'Industry Consortia',
      value: '12',
      change: '+2',
      trend: 'up',
      icon: Globe,
      color: '#F59E0B'
    }
  ];

  const researchTeams = [
    {
      id: 'team-001',
      name: 'Quantum Research Lab',
      members: 24,
      activeProjects: 8,
      publications: 45,
      collaborations: 12,
      expertise: ['Quantum Computing', 'Cryptography', 'Sensing'],
      color: '#0B8AFF'
    },
    {
      id: 'team-002',
      name: 'AI Research Team',
      members: 32,
      activeProjects: 12,
      publications: 67,
      collaborations: 18,
      expertise: ['Machine Learning', 'NLP', 'Computer Vision'],
      color: '#8B5CF6'
    },
    {
      id: 'team-003',
      name: 'Materials Science Lab',
      members: 18,
      activeProjects: 6,
      publications: 34,
      collaborations: 9,
      expertise: ['Nanomaterials', 'Battery Tech', 'Composites'],
      color: '#10B981'
    }
  ];

  const collaborationNetwork = [
    { institution: 'MIT Research Lab', collaborationCount: 12, jointProjects: 8, publications: 45, color: '#0B8AFF' },
    { institution: 'Stanford AI Lab', collaborationCount: 15, jointProjects: 12, publications: 67, color: '#8B5CF6' },
    { institution: 'ETH Zurich', collaborationCount: 9, jointProjects: 6, publications: 34, color: '#10B981' },
    { institution: 'Cambridge Quantum', collaborationCount: 8, jointProjects: 5, publications: 28, color: '#F59E0B' }
  ];

  const expertiseMap = [
    { domain: 'Quantum Computing', experts: 45, connections: 89, impact: 94, color: '#0B8AFF' },
    { domain: 'Machine Learning', experts: 67, connections: 124, impact: 91, color: '#8B5CF6' },
    { domain: 'Biotechnology', experts: 38, connections: 56, impact: 88, color: '#10B981' },
    { domain: 'Materials Science', experts: 29, connections: 42, impact: 85, color: '#F59E0B' },
    { domain: 'Neuroscience', experts: 23, connections: 38, impact: 82, color: '#06B6D4' }
  ];

  const knowledgeSharing = [
    { type: 'Internal Workshops', events: 24, participants: 342, satisfaction: 94, color: '#0B8AFF' },
    { type: 'Conference Presentations', events: 18, participants: 1200, satisfaction: 91, color: '#8B5CF6' },
    { type: 'Joint Publications', events: 45, participants: 89, satisfaction: 88, color: '#10B981' },
    { type: 'Knowledge Exchange', events: 67, participants: 234, satisfaction: 87, color: '#F59E0B' }
  ];

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.card }]}>
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <Network size={24} color="#0B8AFF" />
          <Text style={[styles.headerTitle, { color: theme.colors.text }]}>
            Collaboration & Expert Networks
          </Text>
        </View>
      </View>

      {/* Collaboration Metrics */}
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.metricsScroll}>
        {collaborationMetrics.map((metric) => {
          const Icon = metric.icon;
          return (
            <View 
              key={metric.id}
              style={[
                styles.metricCard,
                { 
                  backgroundColor: metric.color + '15',
                  borderColor: metric.color + '30'
                }
              ]}
            >
              <View style={[styles.iconContainer, { backgroundColor: metric.color + '25' }]}>
                <Icon size={20} color={metric.color} />
              </View>
              <Text style={[styles.metricLabel, { color: theme.colors.textSecondary }]}>
                {metric.label}
              </Text>
              <Text style={[styles.metricValue, { color: theme.colors.text }]}>
                {metric.value}
              </Text>
              <View style={styles.metricChange}>
                <GitBranch size={12} color="#22C55E" />
                <Text style={[styles.metricChangeText, { color: '#22C55E' }]}>
                  {metric.change}
                </Text>
              </View>
            </View>
          );
        })}
      </ScrollView>

      {/* Research Teams */}
      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>
          Research Teams
        </Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {researchTeams.map((team) => (
            <View 
              key={team.id}
              style={[
                styles.teamCard,
                { 
                  backgroundColor: theme.colors.background,
                  borderColor: team.color + '30'
                }
              ]}
            >
              <View style={styles.teamHeader}>
                <View style={[styles.teamIcon, { backgroundColor: team.color + '20' }]}>
                  <Users size={20} color={team.color} />
                </View>
                <Text style={[styles.teamName, { color: theme.colors.text }]}>
                  {team.name}
                </Text>
              </View>

              <View style={styles.teamMetrics}>
                <View style={styles.teamMetric}>
                  <Users size={14} color="#0B8AFF" />
                  <Text style={[styles.teamMetricText, { color: theme.colors.textSecondary }]}>
                    {team.members} members
                  </Text>
                </View>
                <View style={styles.teamMetric}>
                  <BookOpen size={14} color="#8B5CF6" />
                  <Text style={[styles.teamMetricText, { color: theme.colors.textSecondary }]}>
                    {team.activeProjects} projects
                  </Text>
                </View>
                <View style={styles.teamMetric}>
                  <Award size={14} color="#10B981" />
                  <Text style={[styles.teamMetricText, { color: theme.colors.textSecondary }]}>
                    {team.publications} publications
                  </Text>
                </View>
                <View style={styles.teamMetric}>
                  <Network size={14} color="#F59E0B" />
                  <Text style={[styles.teamMetricText, { color: theme.colors.textSecondary }]}>
                    {team.collaborations} collaborations
                  </Text>
                </View>
              </View>

              <View style={styles.expertiseSection}>
                <Text style={[styles.expertiseLabel, { color: theme.colors.textSecondary }]}>
                  Expertise Areas
                </Text>
                <View style={styles.expertiseTags}>
                  {team.expertise.map((exp, index) => (
                    <View 
                      key={index}
                      style={[
                        styles.expertiseTag,
                        { backgroundColor: team.color + '25' }
                      ]}
                    >
                      <Text style={[styles.expertiseTagText, { color: team.color }]}>
                        {exp}
                      </Text>
                    </View>
                  ))}
                </View>
              </View>
            </View>
          ))}
        </ScrollView>
      </View>

      {/* Collaboration Network */}
      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>
          Collaboration Network
        </Text>
        <View style={styles.networkGrid}>
          {collaborationNetwork.map((collab) => (
            <View 
              key={collab.institution}
              style={[
                styles.networkCard,
                { backgroundColor: theme.colors.background }
              ]}
            >
              <View style={[styles.networkDot, { backgroundColor: collab.color }]} />
              <Text style={[styles.networkInstitution, { color: theme.colors.text }]}>
                {collab.institution}
              </Text>
              <View style={styles.networkMetrics}>
                <View style={styles.networkMetric}>
                  <GitBranch size={12} color="#0B8AFF" />
                  <Text style={[styles.networkMetricText, { color: theme.colors.textSecondary }]}>
                    {collab.collaborationCount} collaborations
                  </Text>
                </View>
                <View style={styles.networkMetric}>
                  <BookOpen size={12} color="#8B5CF6" />
                  <Text style={[styles.networkMetricText, { color: theme.colors.textSecondary }]}>
                    {collab.jointProjects} joint projects
                  </Text>
                </View>
                <View style={styles.networkMetric}>
                  <Award size={12} color="#10B981" />
                  <Text style={[styles.networkMetricText, { color: theme.colors.textSecondary }]}>
                    {collab.publications} publications
                  </Text>
                </View>
              </View>
            </View>
          ))}
        </View>
      </View>

      {/* Expertise Map */}
      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>
          Expertise Map
        </Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {expertiseMap.map((domain) => (
            <View 
              key={domain.domain}
              style={[
                styles.domainCard,
                { 
                  backgroundColor: domain.color + '15',
                  borderColor: domain.color + '30'
                }
              ]}
            >
              <View style={[styles.domainDot, { backgroundColor: domain.color }]} />
              <Text style={[styles.domainName, { color: theme.colors.text }]}>
                {domain.domain}
              </Text>
              <View style={styles.domainStats}>
                <View style={styles.domainStat}>
                  <Users size={12} color={domain.color} />
                  <Text style={[styles.domainStatText, { color: theme.colors.textSecondary }]}>
                    {domain.experts} experts
                  </Text>
                </View>
                <View style={styles.domainStat}>
                  <Network size={12} color={domain.color} />
                  <Text style={[styles.domainStatText, { color: theme.colors.textSecondary }]}>
                    {domain.connections} connections
                  </Text>
                </View>
              </View>
              <View style={styles.impactSection}>
                <Text style={[styles.impactLabel, { color: theme.colors.textSecondary }]}>
                  Impact Score
                </Text>
                <Text style={[styles.impactValue, { color: domain.color }]}>
                  {domain.impact}%
                </Text>
                <View style={[styles.impactBar, { backgroundColor: theme.colors.border }]}>
                  <View 
                    style={[
                      styles.impactBarFill,
                      { 
                        backgroundColor: domain.color,
                        width: `${domain.impact}%`
                      }
                    ]} 
                  />
                </View>
              </View>
            </View>
          ))}
        </ScrollView>
      </View>

      {/* Knowledge Sharing */}
      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>
          Knowledge Sharing
        </Text>
        <View style={styles.sharingGrid}>
          {knowledgeSharing.map((item) => (
            <View 
              key={item.type}
              style={[
                styles.sharingCard,
                { backgroundColor: theme.colors.background }
              ]}
            >
              <View style={[styles.sharingDot, { backgroundColor: item.color }]} />
              <Text style={[styles.sharingType, { color: theme.colors.text }]}>
                {item.type}
              </Text>
              <View style={styles.sharingMetrics}>
                <View style={styles.sharingMetric}>
                  <Calendar size={12} color="#0B8AFF" />
                  <Text style={[styles.sharingMetricText, { color: theme.colors.textSecondary }]}>
                    {item.events} events
                  </Text>
                </View>
                <View style={styles.sharingMetric}>
                  <Users size={12} color="#8B5CF6" />
                  <Text style={[styles.sharingMetricText, { color: theme.colors.textSecondary }]}>
                    {item.participants} participants
                  </Text>
                </View>
              </View>
              <View style={styles.satisfactionSection}>
                <Text style={[styles.satisfactionLabel, { color: theme.colors.textSecondary }]}>
                  Satisfaction
                </Text>
                <Text style={[styles.satisfactionValue, { color: item.color }]}>
                  {item.satisfaction}%
                </Text>
              </View>
            </View>
          ))}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    margin: 16,
    borderRadius: 16,
    padding: 20,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '700',
    marginLeft: 12,
  },
  metricsScroll: {
    marginBottom: 20,
  },
  metricCard: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 12,
    borderWidth: 1,
    marginRight: 12,
    minWidth: 140,
  },
  iconContainer: {
    width: 36,
    height: 36,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
  },
  metricLabel: {
    fontSize: 11,
    fontWeight: '500',
    marginBottom: 4,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  metricValue: {
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 4,
  },
  metricChange: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  metricChangeText: {
    fontSize: 11,
    fontWeight: '600',
    marginLeft: 4,
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 12,
  },
  teamCard: {
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    marginRight: 12,
    minWidth: 280,
  },
  teamHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  teamIcon: {
    width: 36,
    height: 36,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  teamName: {
    fontSize: 14,
    fontWeight: '600',
    flex: 1,
  },
  teamMetrics: {
    marginBottom: 12,
  },
  teamMetric: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 6,
  },
  teamMetricText: {
    fontSize: 12,
    marginLeft: 8,
  },
  expertiseSection: {
    marginTop: 8,
  },
  expertiseLabel: {
    fontSize: 11,
    fontWeight: '500',
    marginBottom: 8,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  expertiseTags: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  expertiseTag: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
    marginRight: 6,
    marginBottom: 6,
  },
  expertiseTagText: {
    fontSize: 11,
    fontWeight: '500',
  },
  networkGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  networkCard: {
    width: '48%',
    padding: 12,
    borderRadius: 12,
    marginRight: '2%',
    marginBottom: 8,
  },
  networkDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginBottom: 8,
  },
  networkInstitution: {
    fontSize: 13,
    fontWeight: '600',
    marginBottom: 8,
  },
  networkMetrics: {
    marginBottom: 8,
  },
  networkMetric: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  networkMetricText: {
    fontSize: 11,
    marginLeft: 6,
  },
  domainCard: {
    padding: 14,
    borderRadius: 12,
    borderWidth: 1,
    marginRight: 12,
    minWidth: 180,
  },
  domainDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginBottom: 8,
  },
  domainName: {
    fontSize: 13,
    fontWeight: '600',
    marginBottom: 8,
  },
  domainStats: {
    marginBottom: 8,
  },
  domainStat: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  domainStatText: {
    fontSize: 11,
    marginLeft: 6,
  },
  impactSection: {
    marginTop: 8,
  },
  impactLabel: {
    fontSize: 10,
    fontWeight: '500',
    marginBottom: 4,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  impactValue: {
    fontSize: 16,
    fontWeight: '700',
    marginBottom: 4,
  },
  impactBar: {
    height: 4,
    borderRadius: 2,
    overflow: 'hidden',
  },
  impactBarFill: {
    height: '100%',
    borderRadius: 2,
  },
  sharingGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  sharingCard: {
    width: '48%',
    padding: 12,
    borderRadius: 12,
    marginRight: '2%',
    marginBottom: 8,
  },
  sharingDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginBottom: 8,
  },
  sharingType: {
    fontSize: 13,
    fontWeight: '600',
    marginBottom: 8,
  },
  sharingMetrics: {
    marginBottom: 8,
  },
  sharingMetric: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  sharingMetricText: {
    fontSize: 11,
    marginLeft: 6,
  },
  satisfactionSection: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  satisfactionLabel: {
    fontSize: 10,
    fontWeight: '500',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  satisfactionValue: {
    fontSize: 14,
    fontWeight: '700',
  },
});