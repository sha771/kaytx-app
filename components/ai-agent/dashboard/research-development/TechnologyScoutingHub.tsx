import React from 'react';
import { View, StyleSheet, Text, ScrollView } from 'react-native';
import { useTheme } from '@/providers/ThemeProvider';
import { Search, TrendingUp, Rocket, Building, GraduationCap, Globe, Zap, AlertCircle, CheckCircle, Clock } from 'lucide-react-native';

export default function TechnologyScoutingHub() {
  const { theme } = useTheme();

  const scoutingMetrics = [
    {
      id: 'emerging-tech',
      label: 'Emerging Technologies',
      value: '1,247',
      change: '+89',
      trend: 'up',
      icon: Zap,
      color: '#0B8AFF'
    },
    {
      id: 'startups',
      label: 'Startup Innovations',
      value: '856',
      change: '+67',
      trend: 'up',
      icon: Rocket,
      color: '#10B981'
    },
    {
      id: 'breakthroughs',
      label: 'Industry Breakthroughs',
      value: '234',
      change: '+34',
      trend: 'up',
      icon: TrendingUp,
      color: '#8B5CF6'
    },
    {
      id: 'academic-research',
      label: 'Academic Research',
      value: '3,421',
      change: '+156',
      trend: 'up',
      icon: GraduationCap,
      color: '#F59E0B'
    }
  ];

  const emergingTechnologies = [
    {
      id: 'tech-001',
      name: 'Quantum Machine Learning',
      category: 'Quantum + AI',
      maturity: 'Early Stage',
      potential: 'Very High',
      timeToMarket: '5-7 years',
      interestScore: 94,
      companies: 12
    },
    {
      id: 'tech-002',
      name: 'Neuromorphic Computing',
      category: 'Hardware',
      maturity: 'Research',
      potential: 'High',
      timeToMarket: '7-10 years',
      interestScore: 87,
      companies: 8
    },
    {
      id: 'tech-003',
      name: 'Solid-State Batteries',
      category: 'Energy',
      maturity: 'Development',
      potential: 'Very High',
      timeToMarket: '3-5 years',
      interestScore: 92,
      companies: 24
    }
  ];

  const technologyRadar = [
    { quadrant: 'Adopt', technologies: ['AI/ML', 'Cloud Native', 'Edge Computing'], color: '#10B981' },
    { quadrant: 'Trial', technologies: ['Quantum', 'Blockchain', 'AR/VR'], color: '#0B8AFF' },
    { quadrant: 'Assess', technologies: ['Neuromorphic', 'Biocomputing', '6G'], color: '#F59E0B' },
    { quadrant: 'Hold', technologies: ['Legacy Systems', 'On-Prem Only'], color: '#EF4444' }
  ];

  const maturityCurve = [
    { stage: 'Innovation Trigger', technologies: 12, color: '#EF4444' },
    { stage: 'Peak of Inflated Expectations', technologies: 8, color: '#F59E0B' },
    { stage: 'Trough of Disillusionment', technologies: 5, color: '#8B5CF6' },
    { stage: 'Slope of Enlightenment', technologies: 15, color: '#0B8AFF' },
    { stage: 'Plateau of Productivity', technologies: 22, color: '#10B981' }
  ];

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.card }]}>
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <Search size={24} color="#0B8AFF" />
          <Text style={[styles.headerTitle, { color: theme.colors.text }]}>
            Technology Scouting Hub
          </Text>
        </View>
      </View>

      {/* Scouting Metrics */}
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.metricsScroll}>
        {scoutingMetrics.map((metric) => {
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
                <TrendingUp size={12} color="#22C55E" />
                <Text style={[styles.metricChangeText, { color: '#22C55E' }]}>
                  {metric.change}
                </Text>
              </View>
            </View>
          );
        })}
      </ScrollView>

      {/* Emerging Technologies */}
      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>
          Emerging Technologies
        </Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {emergingTechnologies.map((tech) => (
            <View 
              key={tech.id}
              style={[
                styles.techCard,
                { 
                  backgroundColor: theme.colors.background,
                  borderColor: theme.colors.border
                }
              ]}
            >
              <View style={styles.techHeader}>
                <Text style={[styles.techName, { color: theme.colors.text }]}>
                  {tech.name}
                </Text>
                <View style={[styles.interestBadge, { backgroundColor: '#0B8AFF' + '20' }]}>
                  <Zap size={12} color="#0B8AFF" />
                  <Text style={[styles.interestText, { color: '#0B8AFF' }]}>
                    {tech.interestScore}
                  </Text>
                </View>
              </View>

              <Text style={[styles.techCategory, { color: theme.colors.textSecondary }]}>
                {tech.category}
              </Text>

              <View style={styles.techMetrics}>
                <View style={styles.techMetric}>
                  <Rocket size={14} color="#8B5CF6" />
                  <Text style={[styles.techMetricText, { color: theme.colors.textSecondary }]}>
                    {tech.maturity}
                  </Text>
                </View>
                <View style={styles.techMetric}>
                  <TrendingUp size={14} color="#10B981" />
                  <Text style={[styles.techMetricText, { color: theme.colors.textSecondary }]}>
                    {tech.potential}
                  </Text>
                </View>
              </View>

              <View style={styles.techDetail}>
                <Clock size={12} color="#F59E0B" />
                <Text style={[styles.techDetailText, { color: theme.colors.textSecondary }]}>
                  Time to Market: {tech.timeToMarket}
                </Text>
              </View>

              <View style={styles.companiesSection}>
                <Building size={12} color="#0B8AFF" />
                <Text style={[styles.companiesText, { color: theme.colors.textSecondary }]}>
                  {tech.companies} companies tracking
                </Text>
              </View>
            </View>
          ))}
        </ScrollView>
      </View>

      {/* Technology Radar */}
      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>
          Technology Radar
        </Text>
        <View style={styles.radarGrid}>
          {technologyRadar.map((quadrant) => (
            <View 
              key={quadrant.quadrant}
              style={[
                styles.radarCard,
                { 
                  backgroundColor: quadrant.color + '15',
                  borderColor: quadrant.color + '30'
                }
              ]}
            >
              <View style={[styles.radarDot, { backgroundColor: quadrant.color }]} />
              <Text style={[styles.radarQuadrant, { color: theme.colors.text }]}>
                {quadrant.quadrant}
              </Text>
              <View style={styles.technologiesList}>
                {quadrant.technologies.map((tech, index) => (
                  <View 
                    key={index}
                    style={[
                      styles.techTag,
                      { backgroundColor: quadrant.color + '25' }
                    ]}
                  >
                    <Text style={[styles.techTagText, { color: quadrant.color }]}>
                      {tech}
                    </Text>
                  </View>
                ))}
              </View>
            </View>
          ))}
        </View>
      </View>

      {/* Maturity Curve */}
      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>
          Technology Maturity Curve
        </Text>
        <View style={styles.maturityContainer}>
          {maturityCurve.map((stage, index) => (
            <View key={stage.stage} style={styles.maturityStage}>
              <View 
                style={[
                  styles.maturityBar,
                  { 
                    backgroundColor: stage.color,
                    height: `${(stage.technologies / 22) * 100}%`
                  }
                ]} 
              />
              <Text style={[styles.maturityLabel, { color: theme.colors.textSecondary }]}>
                {stage.stage}
              </Text>
              <Text style={[styles.maturityCount, { color: theme.colors.text }]}>
                {stage.technologies}
              </Text>
            </View>
          ))}
        </View>
      </View>

      {/* Innovation Map */}
      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>
          Emerging Innovation Map
        </Text>
        <View style={styles.innovationGrid}>
          {['Quantum AI', 'Bio-Computing', 'Green Hydrogen', 'Space Mining', 'Digital Twins', 'Synthetic Biology'].map((innovation, index) => (
            <View 
              key={innovation}
              style={[
                styles.innovationCard,
                { 
                  backgroundColor: index % 2 === 0 ? '#0B8AFF' + '15' : '#10B981' + '15',
                  borderColor: index % 2 === 0 ? '#0B8AFF' + '30' : '#10B981' + '30'
                }
              ]}
            >
              <Globe size={16} color={index % 2 === 0 ? '#0B8AFF' : '#10B981'} />
              <Text style={[styles.innovationText, { color: theme.colors.text }]}>
                {innovation}
              </Text>
              <CheckCircle size={12} color={index % 2 === 0 ? '#0B8AFF' : '#10B981'} />
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
    width: 140,
    padding: 14,
    borderRadius: 12,
    borderWidth: 1,
    marginRight: 12,
  },
  iconContainer: {
    width: 36,
    height: 36,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  metricLabel: {
    fontSize: 10,
    fontWeight: '500',
    marginBottom: 6,
    textTransform: 'uppercase',
  },
  metricValue: {
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 8,
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
    marginTop: 20,
    paddingTop: 20,
    borderTopWidth: 1,
    borderTopColor: 'rgba(255,255,255,0.1)',
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 16,
  },
  techCard: {
    width: 280,
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    marginRight: 12,
  },
  techHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  techName: {
    fontSize: 14,
    fontWeight: '600',
    flex: 1,
  },
  interestBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  interestText: {
    fontSize: 12,
    fontWeight: '600',
    marginLeft: 4,
  },
  techCategory: {
    fontSize: 11,
    marginBottom: 12,
  },
  techMetrics: {
    flexDirection: 'row',
    marginBottom: 12,
  },
  techMetric: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 16,
  },
  techMetricText: {
    fontSize: 10,
    marginLeft: 6,
  },
  techDetail: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  techDetailText: {
    fontSize: 10,
    marginLeft: 6,
  },
  companiesSection: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  companiesText: {
    fontSize: 10,
    marginLeft: 6,
  },
  radarGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  radarCard: {
    width: '48%',
    marginRight: '2%',
    marginBottom: 12,
    padding: 14,
    borderRadius: 10,
    borderWidth: 1,
  },
  radarDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginBottom: 8,
  },
  radarQuadrant: {
    fontSize: 13,
    fontWeight: '600',
    marginBottom: 10,
  },
  technologiesList: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  techTag: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
    marginRight: 6,
    marginBottom: 6,
  },
  techTagText: {
    fontSize: 10,
    fontWeight: '500',
  },
  maturityContainer: {
    flexDirection: 'row',
    height: 120,
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    paddingHorizontal: 8,
  },
  maturityStage: {
    flex: 1,
    alignItems: 'center',
    marginHorizontal: 4,
  },
  maturityBar: {
    width: '100%',
    borderRadius: 4,
    minHeight: 4,
  },
  maturityLabel: {
    fontSize: 9,
    marginTop: 8,
    textAlign: 'center',
  },
  maturityCount: {
    fontSize: 12,
    fontWeight: '600',
    marginTop: 2,
  },
  innovationGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  innovationCard: {
    width: '31%',
    marginRight: '2%',
    marginBottom: 12,
    padding: 12,
    borderRadius: 8,
    borderWidth: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  innovationText: {
    fontSize: 11,
    fontWeight: '500',
    flex: 1,
    marginLeft: 8,
  },
});