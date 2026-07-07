import React from 'react';
import { View, StyleSheet, Text, ScrollView } from 'react-native';
import { useTheme } from '@/providers/ThemeProvider';

interface Project {
  id: number;
  name: string;
  client: string;
  status: string;
  progress: number;
  margin: number;
  team: number;
}

interface Milestone {
  id: number;
  project: string;
  milestone: string;
  status: string;
  dueDate: string;
}

interface ProjectDeliveryControlCenterProps {
  data: {
    projects?: Project[];
    workflowStages?: WorkflowStage[];
    milestones?: Milestone[];
  };
}

interface WorkflowStage {
  stage: string;
  count: number;
  value: string;
}

export default function ProjectDeliveryControlCenter({ data }: ProjectDeliveryControlCenterProps) {
  const projects = data.projects || [];
  const workflowStages = data.workflowStages || [];
  const milestones = data.milestones || [];
  const { theme } = useTheme();

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'on track': return '#10B981';
      case 'at risk': return '#F59E0B';
      case 'delayed': return '#EF4444';
      case 'completed': return '#10B981';
      case 'in-progress': return '#06B6D4';
      default: return '#6B7280';
    }
  };

  const getProgressColor = (progress: number) => {
    if (progress >= 75) return '#10B981';
    if (progress >= 50) return '#06B6D4';
    if (progress >= 25) return '#F59E0B';
    return '#EF4444';
  };

  const getMarginColor = (margin: number) => {
    if (margin >= 35) return '#10B981';
    if (margin >= 25) return '#06B6D4';
    if (margin >= 15) return '#F59E0B';
    return '#EF4444';
  };

  const workflowSteps = [
    'Proposal Approved',
    'Team Allocation',
    'Project Kickoff',
    'Execution',
    'Client Review',
    'Delivery Completion'
  ];

  return (
    <View style={[styles.container, { backgroundColor: 'rgba(11, 15, 20, 0.8)', borderColor: 'rgba(16, 185, 129, 0.2)', borderWidth: 1 }]}>
      <Text style={[styles.title, { color: '#10B981' }]}>
        Project Delivery Control Center
      </Text>

      {/* Project Workflow */}
      <View style={[styles.workflowSection, { backgroundColor: 'rgba(11, 15, 20, 0.6)', borderColor: 'rgba(16, 185, 129, 0.2)', borderWidth: 1 }]}>
        <Text style={[styles.sectionTitle, { color: '#FFFFFF' }]}>
          Project Delivery Workflow
        </Text>
        <View style={styles.workflowContainer}>
          {workflowSteps.map((step, index) => (
            <View key={index} style={styles.workflowStep}>
              <View style={[styles.workflowDot, { backgroundColor: index < 3 ? '#10B981' : 'rgba(255, 255, 255, 0.2)' }]} />
              <Text style={[styles.workflowText, { color: index < 3 ? '#FFFFFF' : 'rgba(255, 255, 255, 0.4)' }]}>
                {step}
              </Text>
              {index < workflowSteps.length - 1 && (
                <View style={[styles.workflowLine, { backgroundColor: index < 2 ? '#10B981' : 'rgba(255, 255, 255, 0.1)' }]} />
              )}
            </View>
          ))}
        </View>
      </View>

      {/* Active Projects */}
      <View style={[styles.projectsSection, { backgroundColor: 'rgba(11, 15, 20, 0.6)', borderColor: 'rgba(16, 185, 129, 0.2)', borderWidth: 1 }]}>
        <Text style={[styles.sectionTitle, { color: '#FFFFFF' }]}>
          Active Projects
        </Text>
        <ScrollView style={styles.projectsScroll} showsVerticalScrollIndicator={false}>
          {projects.map((project) => (
            <View key={project.id} style={styles.projectCard}>
              <View style={styles.projectHeader}>
                <View style={styles.projectInfo}>
                  <Text style={[styles.projectName, { color: '#FFFFFF' }]}>{project.name}</Text>
                  <Text style={[styles.clientName, { color: 'rgba(255, 255, 255, 0.6)' }]}>{project.client}</Text>
                </View>
                <View style={[styles.statusBadge, { backgroundColor: `${getStatusColor(project.status)}20` }]}>
                  <Text style={[styles.statusText, { color: getStatusColor(project.status) }]}>
                    {project.status}
                  </Text>
                </View>
              </View>

              <View style={styles.projectMetrics}>
                <View style={styles.metric}>
                  <Text style={[styles.metricLabel, { color: 'rgba(255, 255, 255, 0.5)' }]}>Progress</Text>
                  <View style={styles.progressBarContainer}>
                    <View style={[styles.progressBar, { backgroundColor: 'rgba(255, 255, 255, 0.1)' }]}>
                      <View style={[styles.progressFill, { backgroundColor: getProgressColor(project.progress), width: `${project.progress}%` }]} />
                    </View>
                    <Text style={[styles.metricValue, { color: getProgressColor(project.progress) }]}>
                      {project.progress}%
                    </Text>
                  </View>
                </View>

                <View style={styles.metric}>
                  <Text style={[styles.metricLabel, { color: 'rgba(255, 255, 255, 0.5)' }]}>Margin</Text>
                  <Text style={[styles.metricValue, { color: getMarginColor(project.margin) }]}>
                    {project.margin}%
                  </Text>
                </View>

                <View style={styles.metric}>
                  <Text style={[styles.metricLabel, { color: 'rgba(255, 255, 255, 0.5)' }]}>Team</Text>
                  <Text style={[styles.metricValue, { color: '#06B6D4' }]}>
                    {project.team}
                  </Text>
                </View>
              </View>
            </View>
          ))}
        </ScrollView>
      </View>

      {/* Workflow Stages */}
      {workflowStages.length > 0 && (
        <View style={[styles.milestonesSection, { backgroundColor: 'rgba(11, 15, 20, 0.6)', borderColor: 'rgba(16, 185, 129, 0.2)', borderWidth: 1 }]}>
          <Text style={[styles.sectionTitle, { color: '#FFFFFF' }]}>
            Project Delivery Workflow
          </Text>
          <ScrollView style={styles.milestonesScroll} showsVerticalScrollIndicator={false}>
            {workflowStages.map((stage: WorkflowStage, index: number) => (
              <View key={index} style={styles.milestoneCard}>
                <View style={styles.milestoneLeft}>
                  <View style={[styles.milestoneDot, { backgroundColor: '#10B981' }]} />
                  <View style={styles.milestoneInfo}>
                    <Text style={[styles.milestoneProject, { color: 'rgba(255, 255, 255, 0.6)' }]}>
                      {stage.stage}
                    </Text>
                    <Text style={[styles.milestoneName, { color: '#FFFFFF' }]}>
                      {stage.count.toLocaleString()} projects
                    </Text>
                  </View>
                </View>
                <View style={styles.milestoneRight}>
                  <Text style={[styles.milestoneValue, { color: '#10B981' }]}>
                    {stage.value}
                  </Text>
                </View>
              </View>
            ))}
          </ScrollView>
        </View>
      )}

      {/* Active Milestones */}
      {milestones.length > 0 && (
        <View style={[styles.milestonesSection, { backgroundColor: 'rgba(11, 15, 20, 0.6)', borderColor: 'rgba(16, 185, 129, 0.2)', borderWidth: 1 }]}>
          <Text style={[styles.sectionTitle, { color: '#FFFFFF' }]}>
            Active Milestones
          </Text>
          <ScrollView style={styles.milestonesScroll} showsVerticalScrollIndicator={false}>
            {milestones.map((milestone: Milestone, index: number) => (
              <View key={index} style={styles.milestoneCard}>
                <View style={styles.milestoneLeft}>
                  <View style={[styles.milestoneDot, { backgroundColor: milestone.status === 'completed' ? '#10B981' : milestone.status === 'in-progress' ? '#06B6D4' : '#F59E0B' }]} />
                  <View style={styles.milestoneInfo}>
                    <Text style={[styles.milestoneProject, { color: 'rgba(255, 255, 255, 0.6)' }]}>
                      {milestone.project}
                    </Text>
                    <Text style={[styles.milestoneName, { color: '#FFFFFF' }]}>
                      {milestone.milestone}
                    </Text>
                  </View>
                </View>
                <View style={styles.milestoneRight}>
                  <Text style={[styles.milestoneDue, { color: 'rgba(255, 255, 255, 0.6)' }]}>
                    {milestone.dueDate}
                  </Text>
                  <View style={[styles.milestoneStatus, { backgroundColor: milestone.status === 'completed' ? '#10B981' + '20' : milestone.status === 'in-progress' ? '#06B6D4' + '20' : '#F59E0B' + '20' }]}>
                    <Text style={[styles.milestoneStatusText, { color: milestone.status === 'completed' ? '#10B981' : milestone.status === 'in-progress' ? '#06B6D4' : '#F59E0B' }]}>
                      {milestone.status}
                    </Text>
                  </View>
                </View>
              </View>
            ))}
          </ScrollView>
        </View>
      )}

      {/* Project Health Dashboard */}
      <View style={[styles.healthSection, { backgroundColor: 'rgba(11, 15, 20, 0.6)', borderColor: 'rgba(16, 185, 129, 0.2)', borderWidth: 1 }]}>
        <Text style={[styles.sectionTitle, { color: '#FFFFFF' }]}>
          Project Health Dashboard
        </Text>
        <View style={styles.healthGrid}>
          <View style={styles.healthItem}>
            <Text style={[styles.healthLabel, { color: 'rgba(255, 255, 255, 0.6)' }]}>On Track</Text>
            <Text style={[styles.healthValue, { color: '#10B981' }]}>50%</Text>
            <View style={[styles.healthBar, { backgroundColor: '#10B981', width: '50%' }]} />
          </View>
          <View style={styles.healthItem}>
            <Text style={[styles.healthLabel, { color: 'rgba(255, 255, 255, 0.6)' }]}>At Risk</Text>
            <Text style={[styles.healthValue, { color: '#F59E0B' }]}>25%</Text>
            <View style={[styles.healthBar, { backgroundColor: '#F59E0B', width: '25%' }]} />
          </View>
          <View style={styles.healthItem}>
            <Text style={[styles.healthLabel, { color: 'rgba(255, 255, 255, 0.6)' }]}>Delayed</Text>
            <Text style={[styles.healthValue, { color: '#EF4444' }]}>25%</Text>
            <View style={[styles.healthBar, { backgroundColor: '#EF4444', width: '25%' }]} />
          </View>
        </View>
      </View>

      {/* Risk Heatmap */}
      <View style={[styles.riskSection, { backgroundColor: 'rgba(11, 15, 20, 0.6)', borderColor: 'rgba(16, 185, 129, 0.2)', borderWidth: 1 }]}>
        <Text style={[styles.sectionTitle, { color: '#FFFFFF' }]}>
          Delivery Risk Heatmap
        </Text>
        <View style={styles.riskGrid}>
          <View style={[styles.riskCell, { backgroundColor: 'rgba(16, 185, 129, 0.2)' }]}>
            <Text style={[styles.riskCellLabel, { color: '#10B981' }]}>Low Risk</Text>
            <Text style={[styles.riskCellValue, { color: '#FFFFFF' }]}>12 projects</Text>
          </View>
          <View style={[styles.riskCell, { backgroundColor: 'rgba(245, 158, 11, 0.2)' }]}>
            <Text style={[styles.riskCellLabel, { color: '#F59E0B' }]}>Medium Risk</Text>
            <Text style={[styles.riskCellValue, { color: '#FFFFFF' }]}>6 projects</Text>
          </View>
          <View style={[styles.riskCell, { backgroundColor: 'rgba(239, 68, 68, 0.2)' }]}>
            <Text style={[styles.riskCellLabel, { color: '#EF4444' }]}>High Risk</Text>
            <Text style={[styles.riskCellValue, { color: '#FFFFFF' }]}>2 projects</Text>
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
  workflowSection: {
    padding: 16,
    borderRadius: 12,
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 15,
    fontWeight: '600',
    marginBottom: 12,
  },
  workflowContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  workflowStep: {
    alignItems: 'center',
    flex: 1,
  },
  workflowDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    marginBottom: 6,
  },
  workflowText: {
    fontSize: 10,
    textAlign: 'center',
  },
  workflowLine: {
    height: 2,
    flex: 1,
    marginHorizontal: 4,
  },
  projectsSection: {
    padding: 16,
    borderRadius: 12,
    marginBottom: 16,
    maxHeight: 350,
  },
  projectsScroll: {
    flex: 1,
  },
  projectCard: {
    padding: 12,
    backgroundColor: 'rgba(255, 255, 255, 0.03)',
    borderRadius: 8,
    marginBottom: 8,
  },
  projectHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  projectInfo: {
    flex: 1,
  },
  projectName: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 2,
  },
  clientName: {
    fontSize: 11,
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  statusText: {
    fontSize: 10,
    fontWeight: '600',
    textTransform: 'uppercase',
  },
  projectMetrics: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 12,
  },
  metric: {
    flex: 1,
  },
  metricLabel: {
    fontSize: 10,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    marginBottom: 4,
  },
  metricValue: {
    fontSize: 14,
    fontWeight: '600',
  },
  progressBarContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  progressBar: {
    flex: 1,
    height: 6,
    borderRadius: 3,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    borderRadius: 3,
  },
  milestonesSection: {
    padding: 16,
    borderRadius: 12,
    marginBottom: 16,
    maxHeight: 250,
  },
  milestonesScroll: {
    flex: 1,
  },
  milestoneCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    backgroundColor: 'rgba(255, 255, 255, 0.03)',
    borderRadius: 8,
    marginBottom: 8,
  },
  milestoneLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  milestoneDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: 10,
  },
  milestoneInfo: {
    flex: 1,
  },
  milestoneProject: {
    fontSize: 10,
    marginBottom: 2,
  },
  milestoneName: {
    fontSize: 12,
    fontWeight: '500',
  },
  milestoneRight: {
    alignItems: 'flex-end',
  },
  milestoneValue: {
    fontSize: 14,
    fontWeight: '600',
    color: '#10B981',
    marginBottom: 4,
  },
  milestoneDue: {
    fontSize: 10,
    marginBottom: 4,
  },
  milestoneStatus: {
    paddingHorizontal: 6,
    paddingVertical: 3,
    borderRadius: 6,
  },
  milestoneStatusText: {
    fontSize: 9,
    fontWeight: '600',
    textTransform: 'uppercase',
  },
  healthSection: {
    padding: 16,
    borderRadius: 12,
    marginBottom: 16,
  },
  healthGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 12,
  },
  healthItem: {
    flex: 1,
    alignItems: 'center',
  },
  healthLabel: {
    fontSize: 11,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    marginBottom: 6,
  },
  healthValue: {
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 6,
  },
  healthBar: {
    height: 6,
    borderRadius: 3,
    width: '100%',
  },
  riskSection: {
    padding: 16,
    borderRadius: 12,
  },
  riskGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 8,
  },
  riskCell: {
    flex: 1,
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  riskCellLabel: {
    fontSize: 11,
    fontWeight: '600',
    marginBottom: 4,
  },
  riskCellValue: {
    fontSize: 12,
  },
});
