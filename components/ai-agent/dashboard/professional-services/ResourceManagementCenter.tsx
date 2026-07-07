import React from 'react';
import { View, StyleSheet, Text, ScrollView } from 'react-native';
import { useTheme } from '@/providers/ThemeProvider';

interface Consultant {
  id: number;
  name: string;
  role: string;
  skills: string[];
  utilization: number;
  availability: string;
}

interface SkillsMatrix {
  [key: string]: {
    demand: number;
    supply: number;
  };
}

interface ResourceManagementCenterProps {
  data: {
    consultantAvailability?: any;
    skillsMatrix?: any[];
    utilizationRates?: any[];
    staffingGaps?: any[];
  };
}

export default function ResourceManagementCenter({ data }: ResourceManagementCenterProps) {
  const consultantAvailability = data.consultantAvailability || {};
  const skillsMatrix = data.skillsMatrix || [];
  const utilizationRates = data.utilizationRates || [];
  const staffingGaps = data.staffingGaps || [];
  const { theme } = useTheme();

  const getAvailabilityColor = (availability: string) => {
    switch (availability.toLowerCase()) {
      case 'available': return '#10B981';
      case 'limited': return '#F59E0B';
      case 'booked': return '#EF4444';
      default: return '#6B7280';
    }
  };

  const getUtilizationColor = (utilization: number) => {
    if (utilization >= 90) return '#10B981';
    if (utilization >= 75) return '#06B6D4';
    if (utilization >= 50) return '#F59E0B';
    return '#EF4444';
  };

  const getSkillGapColor = (demand: number, supply: number) => {
    const gap = demand - supply;
    if (gap > 20) return '#EF4444';
    if (gap > 10) return '#F59E0B';
    if (gap > 0) return '#06B6D4';
    return '#10B981';
  };

  return (
    <View style={[styles.container, { backgroundColor: 'rgba(11, 15, 20, 0.8)', borderColor: 'rgba(16, 185, 129, 0.2)', borderWidth: 1 }]}>
      <Text style={[styles.title, { color: '#10B981' }]}>
        Resource Management Center
      </Text>

      {/* Resource Overview */}
      <View style={[styles.overviewSection, { backgroundColor: 'rgba(11, 15, 20, 0.6)', borderColor: 'rgba(16, 185, 129, 0.2)', borderWidth: 1 }]}>
        <Text style={[styles.sectionTitle, { color: '#FFFFFF' }]}>
          Resource Overview
        </Text>
        <View style={styles.overviewGrid}>
          <View style={styles.overviewItem}>
            <Text style={[styles.overviewLabel, { color: 'rgba(255, 255, 255, 0.6)' }]}>Total Consultants</Text>
            <Text style={[styles.overviewValue, { color: '#FFFFFF' }]}>248</Text>
          </View>
          <View style={styles.overviewItem}>
            <Text style={[styles.overviewLabel, { color: 'rgba(255, 255, 255, 0.6)' }]}>Available</Text>
            <Text style={[styles.overviewValue, { color: '#10B981' }]}>64</Text>
          </View>
          <View style={styles.overviewItem}>
            <Text style={[styles.overviewLabel, { color: 'rgba(255, 255, 255, 0.6)' }]}>On Project</Text>
            <Text style={[styles.overviewValue, { color: '#06B6D4' }]}>184</Text>
          </View>
          <View style={styles.overviewItem}>
            <Text style={[styles.overviewLabel, { color: 'rgba(255, 255, 255, 0.6)' }]}>Avg Utilization</Text>
            <Text style={[styles.overviewValue, { color: '#10B981' }]}>87%</Text>
          </View>
        </View>
      </View>

      {/* Skills Matrix */}
      <View style={[styles.skillsSection, { backgroundColor: 'rgba(11, 15, 20, 0.6)', borderColor: 'rgba(16, 185, 129, 0.2)', borderWidth: 1 }]}>
        <Text style={[styles.sectionTitle, { color: '#FFFFFF' }]}>
          Skills Demand vs Supply
        </Text>
        <View style={styles.skillsGrid}>
          {Object.entries(skillsMatrix).map(([skill, data]) => (
            <View key={skill} style={styles.skillCard}>
              <Text style={[styles.skillName, { color: '#FFFFFF' }]}>{skill}</Text>
              <View style={styles.skillBars}>
                <View style={styles.skillBarRow}>
                  <Text style={[styles.skillBarLabel, { color: 'rgba(255, 255, 255, 0.6)' }]}>Demand</Text>
                  <View style={styles.skillBarContainer}>
                    <View style={[styles.skillBarFill, { backgroundColor: '#EF4444', width: `${data.demand}%` }]} />
                  </View>
                  <Text style={[styles.skillBarValue, { color: '#EF4444' }]}>{data.demand}%</Text>
                </View>
                <View style={styles.skillBarRow}>
                  <Text style={[styles.skillBarLabel, { color: 'rgba(255, 255, 255, 0.6)' }]}>Supply</Text>
                  <View style={styles.skillBarContainer}>
                    <View style={[styles.skillBarFill, { backgroundColor: '#10B981', width: `${data.supply}%` }]} />
                  </View>
                  <Text style={[styles.skillBarValue, { color: '#10B981' }]}>{data.supply}%</Text>
                </View>
              </View>
              <View style={[styles.gapIndicator, { backgroundColor: `${getSkillGapColor(data.demand, data.supply)}20` }]}>
                <Text style={[styles.gapText, { color: getSkillGapColor(data.demand, data.supply) }]}>
                  Gap: {data.demand - data.supply > 0 ? '+' : ''}{data.demand - data.supply}%
                </Text>
              </View>
            </View>
          ))}
        </View>
      </View>

      {/* Consultant Availability */}
      <View style={[styles.consultantsSection, { backgroundColor: 'rgba(11, 15, 20, 0.6)', borderColor: 'rgba(16, 185, 129, 0.2)', borderWidth: 1 }]}>
        <Text style={[styles.sectionTitle, { color: '#FFFFFF' }]}>
          Consultant Availability
        </Text>
        <ScrollView style={styles.consultantsScroll} showsVerticalScrollIndicator={false}>
          {consultants.map((consultant) => (
            <View key={consultant.id} style={styles.consultantCard}>
              <View style={styles.consultantHeader}>
                <View style={styles.consultantInfo}>
                  <Text style={[styles.consultantName, { color: '#FFFFFF' }]}>{consultant.name}</Text>
                  <Text style={[styles.consultantRole, { color: 'rgba(255, 255, 255, 0.6)' }]}>{consultant.role}</Text>
                </View>
                <View style={[styles.availabilityBadge, { backgroundColor: `${getAvailabilityColor(consultant.availability)}20` }]}>
                  <Text style={[styles.availabilityText, { color: getAvailabilityColor(consultant.availability) }]}>
                    {consultant.availability}
                  </Text>
                </View>
              </View>

              <View style={styles.consultantSkills}>
                {consultant.skills.map((skill, index) => (
                  <View key={index} style={[styles.skillTag, { backgroundColor: 'rgba(6, 182, 212, 0.2)' }]}>
                    <Text style={[styles.skillTagText, { color: '#06B6D4' }]}>{skill}</Text>
                  </View>
                ))}
              </View>

              <View style={styles.consultantMetrics}>
                <View style={styles.metric}>
                  <Text style={[styles.metricLabel, { color: 'rgba(255, 255, 255, 0.5)' }]}>Utilization</Text>
                  <View style={styles.utilizationBar}>
                    <View style={[styles.utilizationFill, { backgroundColor: getUtilizationColor(consultant.utilization), width: `${consultant.utilization}%` }]} />
                  </View>
                  <Text style={[styles.metricValue, { color: getUtilizationColor(consultant.utilization) }]}>
                    {consultant.utilization}%
                  </Text>
                </View>
              </View>
            </View>
          ))}
        </ScrollView>
      </View>

      {/* Capacity Planning */}
      <View style={[styles.capacitySection, { backgroundColor: 'rgba(11, 15, 20, 0.6)', borderColor: 'rgba(16, 185, 129, 0.2)', borderWidth: 1 }]}>
        <Text style={[styles.sectionTitle, { color: '#FFFFFF' }]}>
          Capacity Planning Forecast
        </Text>
        <View style={styles.capacityGrid}>
          <View style={styles.capacityItem}>
            <Text style={[styles.capacityLabel, { color: 'rgba(255, 255, 255, 0.6)' }]}>This Month</Text>
            <Text style={[styles.capacityValue, { color: '#10B981' }]}>92%</Text>
            <Text style={[styles.capacityTrend, { color: '#F59E0B' }]}>-3% vs last month</Text>
          </View>
          <View style={styles.capacityItem}>
            <Text style={[styles.capacityLabel, { color: 'rgba(255, 255, 255, 0.6)' }]}>Next Month</Text>
            <Text style={[styles.capacityValue, { color: '#F59E0B' }]}>78%</Text>
            <Text style={[styles.capacityTrend, { color: '#10B981' }]}>+5% projected</Text>
          </View>
          <View style={styles.capacityItem}>
            <Text style={[styles.capacityLabel, { color: 'rgba(255, 255, 255, 0.6)' }]}>Quarter</Text>
            <Text style={[styles.capacityValue, { color: '#06B6D4' }]}>85%</Text>
            <Text style={[styles.capacityTrend, { color: '#10B981' }]}>On target</Text>
          </View>
        </View>
      </View>

      {/* Staffing Gaps */}
      <View style={[styles.gapsSection, { backgroundColor: 'rgba(11, 15, 20, 0.6)', borderColor: 'rgba(16, 185, 129, 0.2)', borderWidth: 1 }]}>
        <Text style={[styles.sectionTitle, { color: '#FFFFFF' }]}>
          Staffing Gaps Analysis
        </Text>
        <View style={styles.gapsList}>
          <View style={styles.gapItem}>
            <View style={[styles.gapPriority, { backgroundColor: '#EF4444' }]} />
            <View style={styles.gapInfo}>
              <Text style={[styles.gapRole, { color: '#FFFFFF' }]}>AI/ML Engineers</Text>
              <Text style={[styles.gapDetails, { color: 'rgba(255, 255, 255, 0.6)' }]}>Shortage: 12 consultants</Text>
            </View>
            <Text style={[styles.gapUrgency, { color: '#EF4444' }]}>Critical</Text>
          </View>
          <View style={styles.gapItem}>
            <View style={[styles.gapPriority, { backgroundColor: '#F59E0B' }]} />
            <View style={styles.gapInfo}>
              <Text style={[styles.gapRole, { color: '#FFFFFF' }]}>Cloud Architects</Text>
              <Text style={[styles.gapDetails, { color: 'rgba(255, 255, 255, 0.6)' }]}>Shortage: 8 consultants</Text>
            </View>
            <Text style={[styles.gapUrgency, { color: '#F59E0B' }]}>High</Text>
          </View>
          <View style={styles.gapItem}>
            <View style={[styles.gapPriority, { backgroundColor: '#06B6D4' }]} />
            <View style={styles.gapInfo}>
              <Text style={[styles.gapRole, { color: '#FFFFFF' }]}>Data Analysts</Text>
              <Text style={[styles.gapDetails, { color: 'rgba(255, 255, 255, 0.6)' }]}>Shortage: 5 consultants</Text>
            </View>
            <Text style={[styles.gapUrgency, { color: '#06B6D4' }]}>Medium</Text>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    borderRadius: 16,
    marginBottom: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 16,
  },
  overviewSection: {
    padding: 16,
    borderRadius: 12,
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 15,
    fontWeight: '600',
    marginBottom: 12,
  },
  overviewGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  overviewItem: {
    alignItems: 'center',
  },
  overviewLabel: {
    fontSize: 10,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    marginBottom: 4,
  },
  overviewValue: {
    fontSize: 20,
    fontWeight: '700',
  },
  skillsSection: {
    padding: 16,
    borderRadius: 12,
    marginBottom: 16,
  },
  skillsGrid: {
    gap: 12,
  },
  skillCard: {
    padding: 12,
    backgroundColor: 'rgba(255, 255, 255, 0.03)',
    borderRadius: 8,
  },
  skillName: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 8,
  },
  skillBars: {
    gap: 6,
  },
  skillBarRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  skillBarLabel: {
    fontSize: 10,
    width: 50,
  },
  skillBarContainer: {
    flex: 1,
    height: 6,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 3,
    overflow: 'hidden',
  },
  skillBarFill: {
    height: '100%',
    borderRadius: 3,
  },
  skillBarValue: {
    fontSize: 10,
    fontWeight: '600',
    width: 30,
    textAlign: 'right',
  },
  gapIndicator: {
    alignSelf: 'flex-start',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
    marginTop: 8,
  },
  gapText: {
    fontSize: 10,
    fontWeight: '600',
  },
  consultantsSection: {
    padding: 16,
    borderRadius: 12,
    marginBottom: 16,
    maxHeight: 400,
  },
  consultantsScroll: {
    flex: 1,
  },
  consultantCard: {
    padding: 12,
    backgroundColor: 'rgba(255, 255, 255, 0.03)',
    borderRadius: 8,
    marginBottom: 8,
  },
  consultantHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  consultantInfo: {
    flex: 1,
  },
  consultantName: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 2,
  },
  consultantRole: {
    fontSize: 11,
  },
  availabilityBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  availabilityText: {
    fontSize: 10,
    fontWeight: '600',
    textTransform: 'uppercase',
  },
  consultantSkills: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
    marginBottom: 8,
  },
  skillTag: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  skillTagText: {
    fontSize: 10,
    fontWeight: '500',
  },
  consultantMetrics: {
    gap: 6,
  },
  metric: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  metricLabel: {
    fontSize: 10,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    width: 60,
  },
  utilizationBar: {
    flex: 1,
    height: 6,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 3,
    overflow: 'hidden',
  },
  utilizationFill: {
    height: '100%',
    borderRadius: 3,
  },
  metricValue: {
    fontSize: 12,
    fontWeight: '600',
    width: 35,
    textAlign: 'right',
  },
  capacitySection: {
    padding: 16,
    borderRadius: 12,
    marginBottom: 16,
  },
  capacityGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  capacityItem: {
    flex: 1,
    alignItems: 'center',
  },
  capacityLabel: {
    fontSize: 11,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    marginBottom: 4,
  },
  capacityValue: {
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 2,
  },
  capacityTrend: {
    fontSize: 10,
  },
  gapsSection: {
    padding: 16,
    borderRadius: 12,
  },
  gapsList: {
    gap: 8,
  },
  gapItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    backgroundColor: 'rgba(255, 255, 255, 0.03)',
    borderRadius: 8,
  },
  gapPriority: {
    width: 4,
    height: 4,
    borderRadius: 2,
    marginRight: 10,
  },
  gapInfo: {
    flex: 1,
  },
  gapRole: {
    fontSize: 13,
    fontWeight: '600',
    marginBottom: 2,
  },
  gapDetails: {
    fontSize: 10,
  },
  gapUrgency: {
    fontSize: 10,
    fontWeight: '600',
    textTransform: 'uppercase',
  },
});
