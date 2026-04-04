import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  FlatList,
  TextInput,
  Image,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import {
  Users,
  Search,
  Plus,
  Filter,
  MoreVertical,
  Calendar,
  Clock,
  CheckCircle,
  AlertCircle,
  Target,
  BarChart3,
  ArrowLeft,
  Edit,
  Trash2,
  Share2,
  FileText,
  Briefcase,
  TrendingUp,
  Activity,
  Book,
  Folder,
} from 'lucide-react-native';
import { useTheme } from '@/providers/ThemeProvider';
import { router } from 'expo-router';

interface TeamMember {
  id: string;
  name: string;
  email: string;
  role: string;
  avatar: string;
  status: 'online' | 'offline' | 'busy' | 'away';
  department: string;
  tasksCompleted: number;
  performance: number;
  joinDate: string;
}

interface Project {
  id: string;
  name: string;
  description: string;
  status: 'planning' | 'in-progress' | 'review' | 'completed' | 'on-hold';
  progress: number;
  dueDate: string;
  teamMembers: string[];
  priority: 'low' | 'medium' | 'high';
  budget: number;
}

interface Task {
  id: string;
  title: string;
  description: string;
  status: 'todo' | 'in-progress' | 'review' | 'completed';
  assignee: string;
  dueDate: string;
  priority: 'low' | 'medium' | 'high';
  projectId: string;
}

interface CollaborationMetric {
  title: string;
  value: string;
  change: string;
  icon: React.ComponentType<any>;
  color: string;
}

interface WikiDoc {
  id: string;
  title: string;
  category: string;
  lastUpdated: string;
  author: string;
}

const mockTeamMembers: TeamMember[] = [
  {
    id: '1',
    name: 'Sarah Johnson',
    email: 'sarah@company.com',
    role: 'Project Manager',
    avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150',
    status: 'online',
    department: 'Product',
    tasksCompleted: 24,
    performance: 95,
    joinDate: '2023-01-15',
  },
  {
    id: '2',
    name: 'Mike Chen',
    email: 'mike@company.com',
    role: 'Senior Developer',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150',
    status: 'busy',
    department: 'Engineering',
    tasksCompleted: 18,
    performance: 88,
    joinDate: '2022-08-20',
  },
  {
    id: '3',
    name: 'Emily Davis',
    email: 'emily@company.com',
    role: 'UX Designer',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150',
    status: 'online',
    department: 'Design',
    tasksCompleted: 16,
    performance: 92,
    joinDate: '2023-03-10',
  },
];

const mockProjects: Project[] = [
  {
    id: '1',
    name: 'Mobile App Redesign',
    description: 'Complete redesign of the mobile application',
    status: 'in-progress',
    progress: 65,
    dueDate: '2024-03-15',
    teamMembers: ['1', '2', '3'],
    priority: 'high',
    budget: 50000,
  },
  {
    id: '2',
    name: 'API Integration',
    description: 'Integrate third-party APIs for enhanced functionality',
    status: 'planning',
    progress: 20,
    dueDate: '2024-04-01',
    teamMembers: ['2'],
    priority: 'medium',
    budget: 25000,
  },
];

const mockTasks: Task[] = [
  {
    id: '1',
    title: 'Design user interface mockups',
    description: 'Create high-fidelity mockups for the new mobile app',
    status: 'in-progress',
    assignee: 'Emily Davis',
    dueDate: '2024-02-20',
    priority: 'high',
    projectId: '1',
  },
  {
    id: '2',
    title: 'Implement authentication system',
    description: 'Build secure user authentication and authorization',
    status: 'todo',
    assignee: 'Mike Chen',
    dueDate: '2024-02-25',
    priority: 'high',
    projectId: '1',
  },
];

const mockDocs: WikiDoc[] = [
  { id: '1', title: 'Onboarding Guide', category: 'HR', lastUpdated: '2 days ago', author: 'Sarah Johnson' },
  { id: '2', title: 'API Documentation', category: 'Engineering', lastUpdated: '1 week ago', author: 'Mike Chen' },
  { id: '3', title: 'Design System', category: 'Design', lastUpdated: '3 days ago', author: 'Emily Davis' },
];

const collaborationMetrics: CollaborationMetric[] = [
  {
    title: 'Active Projects',
    value: '12',
    change: '+3',
    icon: Briefcase,
    color: '#007AFF',
  },
  {
    title: 'Team Members',
    value: '24',
    change: '+2',
    icon: Users,
    color: '#34C759',
  },
  {
    title: 'Tasks Completed',
    value: '156',
    change: '+18%',
    icon: CheckCircle,
    color: '#FF9500',
  },
  {
    title: 'Team Performance',
    value: '92%',
    change: '+5%',
    icon: TrendingUp,
    color: '#AF52DE',
  },
];

export default function CollaborationScreen() {
  const { theme } = useTheme();
  const insets = useSafeAreaInsets();
  const [selectedTab, setSelectedTab] = useState<'team' | 'projects' | 'tasks' | 'wiki' | 'analytics'>('team');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [filterStatus, setFilterStatus] = useState<'all' | 'online' | 'busy' | 'offline'>('all');

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'online': return '#34C759';
      case 'busy': return '#FF3B30';
      case 'away': return '#FF9500';
      case 'offline': return '#8E8E93';
      default: return theme.colors.secondaryText;
    }
  };

  const getProjectStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return '#34C759';
      case 'in-progress': return '#007AFF';
      case 'review': return '#AF52DE';
      case 'planning': return '#FF9500';
      case 'on-hold': return '#8E8E93';
      default: return theme.colors.secondaryText;
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return '#FF3B30';
      case 'medium': return '#FF9500';
      case 'low': return '#34C759';
      default: return theme.colors.secondaryText;
    }
  };

  const filteredTeamMembers = mockTeamMembers.filter(member => {
    const matchesSearch = member.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         member.role.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         member.department.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = filterStatus === 'all' || member.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  const renderMetric = ({ item }: { item: CollaborationMetric }) => {
    const IconComponent = item.icon;
    const isPositive = item.change.startsWith('+');
    
    return (
      <View style={[styles.metricCard, { backgroundColor: theme.colors.cardBackground }]}>
        <View style={styles.metricHeader}>
          <View style={[styles.metricIcon, { backgroundColor: `${item.color}20` }]}>
            <IconComponent size={20} color={item.color} />
          </View>
          <Text style={[styles.metricChange, { color: isPositive ? '#34C759' : '#FF3B30' }]}>
            {item.change}
          </Text>
        </View>
        <Text style={[styles.metricValue, { color: theme.colors.text }]}>{item.value}</Text>
        <Text style={[styles.metricTitle, { color: theme.colors.secondaryText }]}>{item.title}</Text>
      </View>
    );
  };

  const renderTeamMember = ({ item }: { item: TeamMember }) => (
    <TouchableOpacity style={[styles.memberCard, { backgroundColor: theme.colors.cardBackground }]}>
      <View style={styles.memberHeader}>
        <View style={styles.memberInfo}>
          <View style={styles.avatarContainer}>
            <Image source={{ uri: item.avatar }} style={styles.memberAvatar} />
            <View style={[styles.statusIndicator, { backgroundColor: getStatusColor(item.status) }]} />
          </View>
          <View style={styles.memberDetails}>
            <Text style={[styles.memberName, { color: theme.colors.text }]}>{item.name}</Text>
            <Text style={[styles.memberRole, { color: theme.colors.secondaryText }]}>{item.role}</Text>
            <Text style={[styles.memberDepartment, { color: theme.colors.secondaryText }]}>
              {item.department} • Joined {item.joinDate}
            </Text>
          </View>
        </View>
        <View style={styles.memberActions}>
          <TouchableOpacity style={styles.actionButton}>
            <MoreVertical size={16} color={theme.colors.text} />
          </TouchableOpacity>
        </View>
      </View>
      
      <View style={styles.memberStats}>
        <View style={styles.statItem}>
          <Text style={[styles.statValue, { color: theme.colors.text }]}>{item.tasksCompleted}</Text>
          <Text style={[styles.statLabel, { color: theme.colors.secondaryText }]}>Tasks</Text>
        </View>
        <View style={styles.statItem}>
          <Text style={[styles.statValue, { color: theme.colors.text }]}>{item.performance}%</Text>
          <Text style={[styles.statLabel, { color: theme.colors.secondaryText }]}>Performance</Text>
        </View>
        <View style={styles.statItem}>
          <View style={[styles.statusBadge, { backgroundColor: getStatusColor(item.status) + '20' }]}>
            <Text style={[styles.statusText, { color: getStatusColor(item.status) }]}>
              {item.status.toUpperCase()}
            </Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );

  const renderProject = ({ item }: { item: Project }) => (
    <TouchableOpacity style={[styles.projectCard, { backgroundColor: theme.colors.cardBackground }]}>
      <View style={styles.projectHeader}>
        <View style={styles.projectInfo}>
          <Text style={[styles.projectName, { color: theme.colors.text }]}>{item.name}</Text>
          <Text style={[styles.projectDescription, { color: theme.colors.secondaryText }]}>
            {item.description}
          </Text>
        </View>
        <View style={styles.projectBadges}>
          <View style={[styles.priorityBadge, { backgroundColor: getPriorityColor(item.priority) + '20' }]}>
            <Text style={[styles.priorityText, { color: getPriorityColor(item.priority) }]}>
              {item.priority.toUpperCase()}
            </Text>
          </View>
          <View style={[styles.statusBadge, { backgroundColor: getProjectStatusColor(item.status) + '20' }]}>
            <Text style={[styles.statusText, { color: getProjectStatusColor(item.status) }]}>
              {item.status.replace('-', ' ').toUpperCase()}
            </Text>
          </View>
        </View>
      </View>
      
      <View style={styles.progressSection}>
        <View style={styles.progressHeader}>
          <Text style={[styles.progressLabel, { color: theme.colors.secondaryText }]}>Progress</Text>
          <Text style={[styles.progressValue, { color: theme.colors.text }]}>{item.progress}%</Text>
        </View>
        <View style={[styles.progressBar, { backgroundColor: theme.colors.border }]}>
          <View 
            style={[
              styles.progressFill, 
              { 
                backgroundColor: getProjectStatusColor(item.status),
                width: `${item.progress}%`
              }
            ]} 
          />
        </View>
      </View>
      
      <View style={styles.projectFooter}>
        <Text style={[styles.dueDate, { color: theme.colors.secondaryText }]}>
          Due: {item.dueDate}
        </Text>
        <Text style={[styles.budget, { color: theme.colors.primary }]}>
          ${item.budget.toLocaleString()}
        </Text>
      </View>
    </TouchableOpacity>
  );

  const renderTask = ({ item }: { item: Task }) => (
    <TouchableOpacity style={[styles.taskCard, { backgroundColor: theme.colors.cardBackground }]}>
      <View style={styles.taskHeader}>
        <View style={styles.taskInfo}>
          <Text style={[styles.taskTitle, { color: theme.colors.text }]}>{item.title}</Text>
          <Text style={[styles.taskDescription, { color: theme.colors.secondaryText }]}>
            {item.description}
          </Text>
        </View>
        <View style={styles.taskBadges}>
          <View style={[styles.priorityBadge, { backgroundColor: getPriorityColor(item.priority) + '20' }]}>
            <Text style={[styles.priorityText, { color: getPriorityColor(item.priority) }]}>
              {item.priority.toUpperCase()}
            </Text>
          </View>
        </View>
      </View>
      
      <View style={styles.taskFooter}>
        <Text style={[styles.assignee, { color: theme.colors.secondaryText }]}>
          Assigned to: {item.assignee}
        </Text>
        <Text style={[styles.dueDate, { color: theme.colors.secondaryText }]}>
          Due: {item.dueDate}
        </Text>
      </View>
    </TouchableOpacity>
  );

  const renderWikiDoc = ({ item }: { item: WikiDoc }) => (
    <TouchableOpacity style={[styles.wikiCard, { backgroundColor: theme.colors.cardBackground }]}>
      <View style={styles.wikiHeader}>
        <View style={styles.wikiIcon}>
          <Book size={20} color={theme.colors.primary} />
        </View>
        <View style={{flex: 1, marginLeft: 12}}>
          <Text style={[styles.wikiTitle, { color: theme.colors.text }]}>{item.title}</Text>
          <Text style={[styles.wikiMeta, { color: theme.colors.secondaryText }]}>
            {item.category} • Updated {item.lastUpdated}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  const renderWiki = () => (
    <ScrollView style={styles.tabContent} showsVerticalScrollIndicator={false}>
      <View style={styles.searchContainer}>
        <View style={[styles.searchBar, { backgroundColor: theme.colors.cardBackground }]}>
          <Search size={20} color={theme.colors.secondaryText} />
          <TextInput
            style={[styles.searchInput, { color: theme.colors.text }]}
            placeholder="Search wiki..."
            placeholderTextColor={theme.colors.secondaryText}
          />
        </View>
      </View>
      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Documents</Text>
        <FlatList
          data={mockDocs}
          renderItem={renderWikiDoc}
          keyExtractor={(item) => item.id}
          scrollEnabled={false}
          contentContainerStyle={styles.wikiContainer}
        />
      </View>
    </ScrollView>
  );

  const renderTeam = () => (
    <ScrollView style={styles.tabContent} showsVerticalScrollIndicator={false}>
      {/* Search and Filters */}
      <View style={styles.searchContainer}>
        <View style={[styles.searchBar, { backgroundColor: theme.colors.cardBackground }]}>
          <Search size={20} color={theme.colors.secondaryText} />
          <TextInput
            style={[styles.searchInput, { color: theme.colors.text }]}
            placeholder="Search team members..."
            placeholderTextColor={theme.colors.secondaryText}
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>
      </View>
      
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.filtersContainer}>
        <View style={styles.filters}>
          {(['all', 'online', 'busy', 'offline'] as const).map((filter) => (
            <TouchableOpacity
              key={filter}
              style={[
                styles.filterChip,
                filterStatus === filter && { backgroundColor: theme.colors.primary },
              ]}
              onPress={() => setFilterStatus(filter)}
            >
              <Text
                style={[
                  styles.filterText,
                  {
                    color: filterStatus === filter ? 'white' : theme.colors.secondaryText,
                  },
                ]}
              >
                {filter.charAt(0).toUpperCase() + filter.slice(1)}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
      
      <FlatList
        data={filteredTeamMembers}
        renderItem={renderTeamMember}
        keyExtractor={(item) => item.id}
        scrollEnabled={false}
        contentContainerStyle={styles.membersContainer}
      />
    </ScrollView>
  );

  const renderProjects = () => (
    <ScrollView style={styles.tabContent} showsVerticalScrollIndicator={false}>
      <FlatList
        data={mockProjects}
        renderItem={renderProject}
        keyExtractor={(item) => item.id}
        scrollEnabled={false}
        contentContainerStyle={styles.projectsContainer}
      />
    </ScrollView>
  );

  const renderTasks = () => (
    <ScrollView style={styles.tabContent} showsVerticalScrollIndicator={false}>
      <FlatList
        data={mockTasks}
        renderItem={renderTask}
        keyExtractor={(item) => item.id}
        scrollEnabled={false}
        contentContainerStyle={styles.tasksContainer}
      />
    </ScrollView>
  );

  const renderAnalytics = () => (
    <ScrollView style={styles.tabContent} showsVerticalScrollIndicator={false}>
      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Team Analytics</Text>
        <FlatList
          data={collaborationMetrics}
          renderItem={renderMetric}
          keyExtractor={(item) => item.title}
          numColumns={2}
          scrollEnabled={false}
          contentContainerStyle={styles.metricsContainer}
        />
      </View>
    </ScrollView>
  );

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      {/* Header */}
      <View style={[styles.header, { backgroundColor: theme.colors.background, paddingTop: insets.top + 10 }]}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <ArrowLeft size={24} color={theme.colors.text} />
        </TouchableOpacity>
        <Text style={[styles.title, { color: theme.colors.text }]}>Team Collaboration</Text>
        <TouchableOpacity style={styles.headerButton}>
          <Plus size={20} color={theme.colors.text} />
        </TouchableOpacity>
      </View>

      {/* Tabs */}
      <View style={styles.tabsContainer}>
        {(['team', 'projects', 'tasks', 'wiki', 'analytics'] as const).map((tab) => (
          <TouchableOpacity
            key={tab}
            style={[
              styles.tab,
              selectedTab === tab && { backgroundColor: theme.colors.primary },
            ]}
            onPress={() => setSelectedTab(tab)}
          >
            <Text
              style={[
                styles.tabText,
                {
                  color: selectedTab === tab ? 'white' : theme.colors.secondaryText,
                },
              ]}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Content */}
      {selectedTab === 'team' && renderTeam()}
      {selectedTab === 'projects' && renderProjects()}
      {selectedTab === 'tasks' && renderTasks()}
      {selectedTab === 'wiki' && renderWiki()}
      {selectedTab === 'analytics' && renderAnalytics()}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingBottom: 16,
  },
  backButton: {
    padding: 8,
    marginRight: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    flex: 1,
  },
  headerButton: {
    padding: 8,
  },
  tabsContainer: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    marginBottom: 16,
    gap: 8,
  },
  tab: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: 'rgba(0,0,0,0.05)',
  },
  tabText: {
    fontSize: 14,
    fontWeight: '500',
  },
  tabContent: {
    flex: 1,
    paddingHorizontal: 20,
  },
  searchContainer: {
    marginBottom: 16,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 12,
    gap: 12,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
  },
  filtersContainer: {
    marginBottom: 16,
  },
  filters: {
    flexDirection: 'row',
    gap: 8,
  },
  filterChip: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: 'rgba(0,0,0,0.05)',
  },
  filterText: {
    fontSize: 14,
    fontWeight: '500',
  },
  membersContainer: {
    gap: 12,
  },
  memberCard: {
    padding: 16,
    borderRadius: 12,
  },
  memberHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  memberInfo: {
    flexDirection: 'row',
    flex: 1,
  },
  avatarContainer: {
    position: 'relative',
    marginRight: 12,
  },
  memberAvatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  statusIndicator: {
    position: 'absolute',
    bottom: 2,
    right: 2,
    width: 12,
    height: 12,
    borderRadius: 6,
    borderWidth: 2,
    borderColor: 'white',
  },
  memberDetails: {
    flex: 1,
  },
  memberName: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  memberRole: {
    fontSize: 14,
    marginBottom: 2,
  },
  memberDepartment: {
    fontSize: 12,
  },
  memberActions: {
    flexDirection: 'row',
    gap: 8,
  },
  actionButton: {
    padding: 8,
  },
  memberStats: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: 'rgba(0,0,0,0.1)',
  },
  statItem: {
    alignItems: 'center',
  },
  statValue: {
    fontSize: 16,
    fontWeight: '700',
    marginBottom: 2,
  },
  statLabel: {
    fontSize: 12,
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  statusText: {
    fontSize: 10,
    fontWeight: '600',
  },
  projectsContainer: {
    gap: 16,
  },
  projectCard: {
    padding: 16,
    borderRadius: 12,
  },
  projectHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  projectInfo: {
    flex: 1,
  },
  projectName: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  projectDescription: {
    fontSize: 14,
  },
  projectBadges: {
    gap: 4,
  },
  priorityBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    alignItems: 'center',
  },
  priorityText: {
    fontSize: 10,
    fontWeight: '600',
  },
  progressSection: {
    marginBottom: 16,
  },
  progressHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  progressLabel: {
    fontSize: 12,
  },
  progressValue: {
    fontSize: 12,
    fontWeight: '600',
  },
  progressBar: {
    height: 6,
    borderRadius: 3,
  },
  progressFill: {
    height: '100%',
    borderRadius: 3,
  },
  projectFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  dueDate: {
    fontSize: 12,
  },
  budget: {
    fontSize: 14,
    fontWeight: '600',
  },
  tasksContainer: {
    gap: 12,
  },
  taskCard: {
    padding: 16,
    borderRadius: 12,
  },
  taskHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  taskInfo: {
    flex: 1,
  },
  taskTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  taskDescription: {
    fontSize: 14,
  },
  taskBadges: {},
  taskFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  assignee: {
    fontSize: 12,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 16,
  },
  metricsContainer: {
    gap: 12,
  },
  metricCard: {
    flex: 1,
    padding: 16,
    borderRadius: 12,
    marginHorizontal: 6,
  },
  metricHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  metricIcon: {
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  metricChange: {
    fontSize: 12,
    fontWeight: '600',
  },
  metricValue: {
    fontSize: 24,
    fontWeight: '700',
    marginBottom: 4,
  },
  metricTitle: {
    fontSize: 12,
    fontWeight: '500',
  },
  wikiContainer: {
    gap: 12,
  },
  wikiCard: {
    padding: 16,
    borderRadius: 12,
  },
  wikiHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  wikiIcon: {
    width: 40,
    height: 40,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.05)',
  },
  wikiTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  wikiMeta: {
    fontSize: 12,
  },
});
