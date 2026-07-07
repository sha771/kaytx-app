import React from 'react';
import { View, StyleSheet, Text, ScrollView } from 'react-native';
import { useTheme } from '@/providers/ThemeProvider';
import { GitMerge, FileText, Code, Bug, Target, Zap, CheckCircle, Clock } from 'lucide-react-native';

interface DevelopmentOperationsHubProps {
  metrics: {
    activeProjects: number;
    openPullRequests: number;
    codeReviews: number;
    mergeRate: string;
    bugResolution: number;
    sprintProgress: number;
  };
  projects: {
    id: string;
    name: string;
    status: string;
    progress: number;
    team: string;
  }[];
}

export default function DevelopmentOperationsHub({ metrics, projects }: DevelopmentOperationsHubProps) {
  const { theme } = useTheme();

  const devOpsCards = [
    {
      label: 'Active Projects',
      value: metrics.activeProjects.toString(),
      icon: Target,
      color: '#3B82F6',
      subtitle: 'In development'
    },
    {
      label: 'Open Pull Requests',
      value: metrics.openPullRequests.toString(),
      icon: GitMerge,
      color: '#8B5CF6',
      subtitle: 'Awaiting review'
    },
    {
      label: 'Code Reviews',
      value: metrics.codeReviews.toString(),
      icon: FileText,
      color: '#F59E0B',
      subtitle: 'Pending review'
    },
    {
      label: 'Merge Rate',
      value: metrics.mergeRate,
      icon: CheckCircle,
      color: '#10B981',
      subtitle: 'Success rate'
    },
    {
      label: 'Bug Resolution',
      value: `${metrics.bugResolution}h`,
      icon: Bug,
      color: '#EF4444',
      subtitle: 'Average time'
    },
    {
      label: 'Sprint Progress',
      value: `${metrics.sprintProgress}%`,
      icon: Zap,
      color: '#06B6D4',
      subtitle: 'Current sprint'
    }
  ];

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.card }]}>
      <View style={styles.header}>
        <Text style={[styles.headerTitle, { color: theme.colors.text }]}>
          Development Operations Hub
        </Text>
        <Text style={[styles.headerSubtitle, { color: theme.colors.textSecondary }]}>
          Software Development Analytics
        </Text>
      </View>

      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        <View style={styles.cardsRow}>
          {devOpsCards.map((card, index) => {
            const Icon = card.icon;
            return (
              <View key={index} style={[styles.card, { borderLeftColor: card.color }]}>
                <View style={[styles.cardIcon, { backgroundColor: card.color + '20' }]}>
                  <Icon size={20} color={card.color} />
                </View>
                <Text style={[styles.cardLabel, { color: theme.colors.textSecondary }]}>
                  {card.label}
                </Text>
                <Text style={[styles.cardValue, { color: theme.colors.text }]}>
                  {card.value}
                </Text>
                <Text style={[styles.cardSubtitle, { color: theme.colors.textSecondary }]}>
                  {card.subtitle}
                </Text>
              </View>
            );
          })}
        </View>
      </ScrollView>

      <View style={styles.projectsSection}>
        <View style={styles.projectsHeader}>
          <Text style={[styles.projectsTitle, { color: theme.colors.text }]}>
            Active Projects
          </Text>
          <Text style={[styles.projectsCount, { color: theme.colors.textSecondary }]}>
            {projects.length} projects
          </Text>
        </View>

        {projects.map((project) => (
          <View key={project.id} style={[styles.projectCard, { backgroundColor: 'rgba(255,255,255,0.03)' }]}>
            <View style={styles.projectHeader}>
              <View style={styles.projectInfo}>
                <Code size={20} color="#3B82F6" />
                <View style={styles.projectDetails}>
                  <Text style={[styles.projectName, { color: theme.colors.text }]}>
                    {project.name}
                  </Text>
                  <Text style={[styles.projectTeam, { color: theme.colors.textSecondary }]}>
                    {project.team}
                  </Text>
                </View>
              </View>
              <View style={[styles.statusBadge, { backgroundColor: project.status === 'On Track' ? '#10B981' + '20' : '#F59E0B' + '20' }]}>
                <Text style={[styles.statusText, { color: project.status === 'On Track' ? '#10B981' : '#F59E0B' }]}>
                  {project.status}
                </Text>
              </View>
            </View>

            <View style={styles.progressSection}>
              <View style={styles.progressHeader}>
                <Text style={[styles.progressLabel, { color: theme.colors.textSecondary }]}>
                  Sprint Progress
                </Text>
                <Text style={[styles.progressValue, { color: theme.colors.text }]}>
                  {project.progress}%
                </Text>
              </View>
              <View style={[styles.progressBar, { backgroundColor: 'rgba(255,255,255,0.1)' }]}>
                <View 
                  style={[styles.progressFill, { 
                    backgroundColor: project.progress >= 80 ? '#10B981' : project.progress >= 50 ? '#3B82F6' : '#F59E0B',
                    width: `${project.progress}%` 
                  }]} 
                />
              </View>
            </View>
          </View>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    marginBottom: 16,
  },
  header: {
    marginBottom: 16,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 4,
  },
  headerSubtitle: {
    fontSize: 13,
    opacity: 0.7,
  },
  cardsRow: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 20,
  },
  card: {
    width: 140,
    padding: 12,
    borderRadius: 12,
    backgroundColor: 'rgba(255,255,255,0.03)',
    borderLeftWidth: 3,
  },
  cardIcon: {
    width: 36,
    height: 36,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  cardLabel: {
    fontSize: 10,
    fontWeight: '500',
    textTransform: 'uppercase',
    marginBottom: 4,
    opacity: 0.7,
  },
  cardValue: {
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 4,
  },
  cardSubtitle: {
    fontSize: 9,
    opacity: 0.6,
  },
  projectsSection: {
    marginTop: 8,
  },
  projectsHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  projectsTitle: {
    fontSize: 16,
    fontWeight: '600',
  },
  projectsCount: {
    fontSize: 12,
    opacity: 0.7,
  },
  projectCard: {
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)',
  },
  projectHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  projectInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    flex: 1,
  },
  projectDetails: {
    flex: 1,
  },
  projectName: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 4,
  },
  projectTeam: {
    fontSize: 11,
    opacity: 0.7,
  },
  statusBadge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  statusText: {
    fontSize: 11,
    fontWeight: '600',
  },
  progressSection: {
    marginTop: 8,
  },
  progressHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  progressLabel: {
    fontSize: 11,
    opacity: 0.7,
  },
  progressValue: {
    fontSize: 12,
    fontWeight: '600',
  },
  progressBar: {
    height: 8,
    borderRadius: 4,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    borderRadius: 4,
  }
});