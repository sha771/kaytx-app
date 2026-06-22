import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { useTheme } from '@/providers/ThemeProvider';
import { Crown, Star, Users, Activity, TrendingUp, Shield, Brain, Zap, Target, Briefcase } from 'lucide-react-native';

export default function CSuitePage() {
  const { theme } = useTheme();

  const C_SUITE_EXECUTIVES = [
    {
      id: 'ceo',
      name: 'Chief Executive Officer AI',
      acronym: 'CEO',
      icon: Crown,
      color: '#FFD700',
      description: 'Overall strategic direction and executive decision-making',
      responsibilities: [
        'Strategic Vision & Roadmap',
        'Executive Decision Making',
        'Board Reporting & Governance',
        'Cross-Functional Alignment',
        'Organizational Transformation'
      ],
      directReports: ['CFO', 'CTO', 'CMO', 'COO', 'CHRO', 'CDAO', 'CAO'],
      status: 'Active'
    },
    {
      id: 'cfo',
      name: 'Chief Financial Officer AI',
      acronym: 'CFO',
      icon: TrendingUp,
      color: '#10B981',
      description: 'Financial strategy, planning, and fiscal management',
      responsibilities: [
        'Financial Strategy & Planning',
        'Budget Management & Control',
        'Financial Reporting & Analysis',
        'Risk Assessment & Mitigation',
        'Investment Decision Support'
      ],
      directReports: ['VP Finance', 'Controller', 'Treasurer'],
      status: 'Active'
    },
    {
      id: 'cto',
      name: 'Chief Technology Officer AI',
      acronym: 'CTO',
      icon: Brain,
      color: '#3B82F6',
      description: 'Technology strategy, innovation, and digital transformation',
      responsibilities: [
        'Technology Strategy & Architecture',
        'Innovation & R&D',
        'Digital Transformation',
        'Technology Risk Management',
        'Technical Talent Development'
      ],
      directReports: ['VP Engineering', 'VP Product', 'VP Innovation'],
      status: 'Active'
    },
    {
      id: 'cmo',
      name: 'Chief Marketing Officer AI',
      acronym: 'CMO',
      icon: Target,
      color: '#EC4899',
      description: 'Marketing strategy, brand management, and growth initiatives',
      responsibilities: [
        'Marketing Strategy & Planning',
        'Brand Management & Positioning',
        'Growth Initiatives',
        'Customer Acquisition',
        'Market Intelligence'
      ],
      directReports: ['VP Marketing', 'VP Growth', 'VP Brand'],
      status: 'Active'
    },
    {
      id: 'coo',
      name: 'Chief Operating Officer AI',
      acronym: 'COO',
      icon: Briefcase,
      color: '#F59E0B',
      description: 'Operational excellence and process optimization',
      responsibilities: [
        'Operational Strategy & Execution',
        'Process Optimization',
        'Supply Chain Management',
        'Quality Assurance',
        'Operational Risk Management'
      ],
      directReports: ['VP Operations', 'VP Supply Chain', 'VP Quality'],
      status: 'Active'
    },
    {
      id: 'chro',
      name: 'Chief Human Resources Officer AI',
      acronym: 'CHRO',
      icon: Users,
      color: '#EF4444',
      description: 'Human capital strategy and organizational development',
      responsibilities: [
        'HR Strategy & Planning',
        'Talent Acquisition & Development',
        'Organizational Design',
        'Employee Experience',
        'Culture & Engagement'
      ],
      directReports: ['VP HR', 'VP Talent', 'VP Learning'],
      status: 'Active'
    },
    {
      id: 'cdao',
      name: 'Chief Data & Analytics Officer AI',
      acronym: 'CDAO',
      icon: Brain,
      color: '#7C3AED',
      description: 'Data strategy, analytics, and business intelligence',
      responsibilities: [
        'Data Strategy & Governance',
        'Analytics & Business Intelligence',
        'Data-Driven Decision Making',
        'Data Infrastructure',
        'AI & ML Strategy'
      ],
      directReports: ['VP Data', 'VP Analytics', 'VP AI/ML'],
      status: 'Active'
    },
    {
      id: 'cao',
      name: 'Chief Automation Officer AI',
      acronym: 'CAO',
      icon: Zap,
      color: '#8B5CF6',
      description: 'Automation strategy and intelligent process orchestration',
      responsibilities: [
        'Automation Strategy & Planning',
        'Process Automation',
        'Workflow Orchestration',
        'RPA Implementation',
        'Automation ROI Optimization'
      ],
      directReports: ['VP Automation', 'VP Process', 'VP Innovation'],
      status: 'Active'
    }
  ];

  const C_SUITE_STATS = [
    { label: 'Total Executives', value: '17', icon: Crown, color: '#FFD700' },
    { label: 'Direct Reports', value: '45', icon: Users, color: '#10B981' },
    { label: 'Departments Led', value: '21', icon: Briefcase, color: '#3B82F6' },
    { label: 'Strategic Decisions', value: '2.4K', icon: Activity, color: '#F59E0B' }
  ];

  return (
    <ScrollView style={[styles.container, { backgroundColor: theme.colors.background }]}>
      {/* Hero Section */}
      <View style={[styles.hero, { borderBottomColor: theme.colors.border || '#E5E5EA' }]}>
        <View style={[styles.heroIconWrap, { backgroundColor: '#FFD70020' }]}>
          <Crown size={56} color="#FFD700" />
        </View>
        <Text style={[styles.heroTitle, { color: theme.colors.text }]}>C-Suite Executives</Text>
        <Text style={[styles.heroSubtitle, { color: theme.colors.textSecondary }]}>
          Tier 1 - Executive Leadership (17 agents including CDAO & CAO)
        </Text>
        <View style={styles.badgesRow}>
          <View style={[styles.badge, { backgroundColor: '#FFD70022' }]}>
            <Crown size={12} color="#FFD700" />
            <Text style={[styles.badgeText, { color: '#FFD700' }]}>17 Executives</Text>
          </View>
          <View style={[styles.badge, { backgroundColor: '#10B98122' }]}>
            <Activity size={12} color="#10B981" />
            <Text style={[styles.badgeText, { color: '#10B981' }]}>Active</Text>
          </View>
          <View style={[styles.badge, { backgroundColor: '#8B5CF622' }]}>
            <Star size={12} color="#8B5CF6" />
            <Text style={[styles.badgeText, { color: '#8B5CF6' }]}>Upgraded</Text>
          </View>
        </View>
      </View>

      {/* C-Suite Stats */}
      <View style={styles.statsContainer}>
        {C_SUITE_STATS.map((stat, i) => (
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
          The C-Suite Executives tier represents the highest level of AI leadership in the organization. 
          These 17 executive agents provide strategic direction, make critical decisions, and oversee 
          all organizational operations. The upgraded C-Suite now includes the Chief Data & Analytics 
          Officer (CDAO) and Chief Automation Officer (CAO) for enhanced data-driven and automated 
          operations.
        </Text>
      </View>

      {/* C-Suite Executives */}
      <View style={[styles.section, { backgroundColor: theme.colors.card || '#F2F2F7' }]}>
        <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Executive Leadership</Text>
        {C_SUITE_EXECUTIVES.map((exec) => (
          <View key={exec.id} style={[styles.executiveCard, { backgroundColor: theme.colors.background || '#F2F2F7' }]}>
            <View style={[styles.executiveHeader, { borderBottomColor: theme.colors.border || '#E5E5EA' }]}>
              <View style={[styles.executiveIcon, { backgroundColor: exec.color + '20' }]}>
                <exec.icon size={32} color={exec.color} />
              </View>
              <View style={styles.executiveTitle}>
                <View style={styles.executiveNameRow}>
                  <Text style={[styles.executiveName, { color: theme.colors.text }]}>{exec.name}</Text>
                  <View style={[styles.acronymBadge, { backgroundColor: exec.color + '20' }]}>
                    <Text style={[styles.acronymText, { color: exec.color }]}>{exec.acronym}</Text>
                  </View>
                </View>
                <Text style={[styles.executiveDesc, { color: theme.colors.textSecondary }]}>{exec.description}</Text>
              </View>
              <View style={[styles.statusBadge, { backgroundColor: '#10B98120' }]}>
                <Activity size={12} color="#10B981" />
                <Text style={[styles.statusText, { color: '#10B981' }]}>{exec.status}</Text>
              </View>
            </View>

            <View style={styles.subsection}>
              <Text style={[styles.subsectionTitle, { color: theme.colors.text }]}>Key Responsibilities</Text>
              {exec.responsibilities.map((resp, i) => (
                <View key={i} style={styles.listItem}>
                  <View style={[styles.bullet, { backgroundColor: exec.color }]} />
                  <Text style={[styles.listText, { color: theme.colors.textSecondary }]}>{resp}</Text>
                </View>
              ))}
            </View>

            <View style={styles.subsection}>
              <Text style={[styles.subsectionTitle, { color: theme.colors.text }]}>Direct Reports</Text>
              <View style={styles.reportsGrid}>
                {exec.directReports.map((report, i) => (
                  <View key={i} style={[styles.reportChip, { backgroundColor: exec.color + '15' }]}>
                    <Text style={[styles.reportText, { color: exec.color }]}>{report}</Text>
                  </View>
                ))}
              </View>
            </View>
          </View>
        ))}
      </View>

      {/* Executive Collaboration */}
      <View style={[styles.section, { backgroundColor: theme.colors.card || '#F2F2F7' }]}>
        <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Executive Collaboration</Text>
        <Text style={[styles.description, { color: theme.colors.textSecondary }]}>
          The C-Suite executives work together through:
        </Text>
        <View style={styles.collaborationList}>
          <View style={styles.collaborationItem}>
            <Shield size={20} color="#DC2626" />
            <Text style={[styles.collaborationText, { color: theme.colors.text }]}>
              <Text style={{ fontWeight: '600' }}>Governance Alignment:</Text> All executives report to AI Ethics Board guidelines
            </Text>
          </View>
          <View style={styles.collaborationItem}>
            <Brain size={20} color="#7C3AED" />
            <Text style={[styles.collaborationText, { color: theme.colors.text }]}>
              <Text style={{ fontWeight: '600' }}>Intelligence Sharing:</Text> Leverage predictive insights for strategic decisions
            </Text>
          </View>
          <View style={styles.collaborationItem}>
            <Zap size={20} color="#F59E0B" />
            <Text style={[styles.collaborationText, { color: theme.colors.text }]}>
              <Text style={{ fontWeight: '600' }}>Command Coordination:</Text> Execute through Advanced Command Center
            </Text>
          </View>
          <View style={styles.collaborationItem}>
            <Users size={20} color="#10B981" />
            <Text style={[styles.collaborationText, { color: theme.colors.text }]}>
              <Text style={{ fontWeight: '600' }}>Department Leadership:</Text> Each executive leads specific departments
            </Text>
          </View>
        </View>
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
    marginBottom: 12,
  },
  executiveCard: {
    padding: 20,
    borderRadius: 12,
    marginBottom: 16,
  },
  executiveHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingBottom: 16,
    borderBottomWidth: 1,
    marginBottom: 16,
    gap: 16,
  },
  executiveIcon: {
    width: 64,
    height: 64,
    borderRadius: 32,
    justifyContent: 'center',
    alignItems: 'center',
  },
  executiveTitle: {
    flex: 1,
  },
  executiveNameRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 4,
  },
  executiveName: {
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
  executiveDesc: {
    fontSize: 14,
  },
  statusBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    gap: 4,
  },
  statusText: {
    fontSize: 12,
    fontWeight: '600',
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
  reportsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  reportChip: {
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 16,
  },
  reportText: {
    fontSize: 12,
    fontWeight: '500',
  },
  collaborationList: {
    gap: 12,
  },
  collaborationItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 12,
    padding: 12,
    borderRadius: 8,
    backgroundColor: '#F2F2F7',
  },
  collaborationText: {
    fontSize: 14,
    flex: 1,
  },
});
