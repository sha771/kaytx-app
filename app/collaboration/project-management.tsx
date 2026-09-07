 
import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Stack } from 'expo-router';
import { FileText, Users, BarChart3, Folder, Settings, Plus, Search, ListFilter, Calendar, Download, Share } from 'lucide-react-native';

interface ProjectItem {
  id: string;
  name: string;
  type: 'project' | 'task' | 'document' | 'folder';
  status: 'active' | 'completed' | 'on-hold' | 'archived';
  assignees: number;
  dueDate?: string;
  progress: number;
  priority: 'high' | 'medium' | 'low';
}

const mockProjects: ProjectItem[] = [
  {
    id: '1',
    name: 'Mobile App Redesign',
    type: 'project',
    status: 'active',
    assignees: 5,
    dueDate: '2024-02-15',
    progress: 65,
    priority: 'high'
  },
  {
    id: '2',
    name: 'Marketing Campaign Q1',
    type: 'project',
    status: 'active',
    assignees: 3,
    dueDate: '2024-01-30',
    progress: 80,
    priority: 'medium'
  },
  {
    id: '3',
    name: 'User Research Analysis',
    type: 'document',
    status: 'completed',
    assignees: 2,
    dueDate: '2024-01-10',
    progress: 100,
    priority: 'low'
  },
  {
    id: '4',
    name: 'API Integration',
    type: 'task',
    status: 'on-hold',
    assignees: 1,
    dueDate: '2024-02-01',
    progress: 30,
    priority: 'high'
  }
];

interface TeamMember {
  id: string;
  name: string;
  role: string;
  avatar: string;
  status: 'online' | 'offline' | 'busy';
  tasksCompleted: number;
  activeProjects: number;
}

const mockTeamMembers: TeamMember[] = [
  {
    id: '1',
    name: 'Sarah Johnson',
    role: 'Project Manager',
    avatar: '👩‍💼',
    status: 'online',
    tasksCompleted: 23,
    activeProjects: 3
  },
  {
    id: '2',
    name: 'Mike Chen',
    role: 'Developer',
    avatar: '👨‍💻',
    status: 'busy',
    tasksCompleted: 18,
    activeProjects: 2
  },
  {
    id: '3',
    name: 'Emily Davis',
    role: 'Designer',
    avatar: '👩‍🎨',
    status: 'online',
    tasksCompleted: 31,
    activeProjects: 4
  },
  {
    id: '4',
    name: 'Alex Rodriguez',
    role: 'Marketing Specialist',
    avatar: '👨‍📊',
    status: 'offline',
    tasksCompleted: 15,
    activeProjects: 1
  }
];

export default function ProjectManagementScreen() {
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedTab, setSelectedTab] = useState<'projects' | 'team'>('projects');

  const getStatusColor = (status: ProjectItem['status']) => {
    switch (status) {
      case 'active': return '#10B981';
      case 'completed': return '#3B82F6';
      case 'on-hold': return '#F59E0B';
      case 'archived': return '#6B7280';
      default: return '#6B7280';
    }
  };

  const getPriorityColor = (priority: ProjectItem['priority']) => {
    switch (priority) {
      case 'high': return '#EF4444';
      case 'medium': return '#F59E0B';
      case 'low': return '#10B981';
      default: return '#6B7280';
    }
  };

  const getTypeIcon = (type: ProjectItem['type']) => {
    switch (type) {
      case 'project': return <Folder size={20} color="#3B82F6" />;
      case 'task': return <FileText size={20} color="#10B981" />;
      case 'document': return <FileText size={20} color="#F59E0B" />;
      case 'folder': return <Folder size={20} color="#8B5CF6" />;
      default: return <FileText size={20} color="#6B7280" />;
    }
  };

  const getStatusIcon = (status: TeamMember['status']) => {
    switch (status) {
      case 'online': return '🟢';
      case 'busy': return '🟡';
      case 'offline': return '⚫';
      default: return '⚫';
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Stack.Screen 
        options={{
          title: 'Project Management',
          headerStyle: { backgroundColor: '#1F2937' },
          headerTintColor: '#FFFFFF',
        }} 
      />
      
      <View style={styles.header}>
        <View style={styles.searchContainer}>
          <Search size={20} color="#6B7280" />
          <TextInput
            style={styles.searchInput}
            placeholder="Search projects and tasks..."
            placeholderTextColor="#6B7280"
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>
        
        <View style={styles.filterContainer}>
          <TouchableOpacity style={styles.filterButton}>
            <ListFilter size={20} color="#3B82F6" />
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.addButton}>
            <Plus size={20} color="#FFFFFF" />
            <Text style={styles.addButtonText}>New Project</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.tabContainer}>
        <TouchableOpacity 
          style={[styles.tab, selectedTab === 'projects' && styles.activeTab]}
          onPress={() => setSelectedTab('projects')}
        >
          <Text style={[styles.tabText, selectedTab === 'projects' && styles.activeTabText]}>
            Projects
          </Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={[styles.tab, selectedTab === 'team' && styles.activeTab]}
          onPress={() => setSelectedTab('team')}
        >
          <Text style={[styles.tabText, selectedTab === 'team' && styles.activeTabText]}>
            Team
          </Text>
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.content}>
        <View style={styles.statsContainer}>
          <View style={styles.statCard}>
            <Folder size={24} color="#3B82F6" />
            <Text style={styles.statNumber}>4</Text>
            <Text style={styles.statLabel}>Active Projects</Text>
          </View>
          
          <View style={styles.statCard}>
            <Users size={24} color="#10B981" />
            <Text style={styles.statNumber}>4</Text>
            <Text style={styles.statLabel}>Team Members</Text>
          </View>
          
          <View style={styles.statCard}>
            <FileText size={24} color="#F59E0B" />
            <Text style={styles.statNumber}>87</Text>
            <Text style={styles.statLabel}>Total Tasks</Text>
          </View>
          
          <View style={styles.statCard}>
            <BarChart3 size={24} color="#8B5CF6" />
            <Text style={styles.statNumber}>68%</Text>
            <Text style={styles.statLabel}>Completion Rate</Text>
          </View>
        </View>

        {selectedTab === 'projects' ? (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Projects & Tasks</Text>
            
            {mockProjects.map((project) => (
              <TouchableOpacity key={project.id} style={styles.projectCard}>
                <View style={styles.projectHeader}>
                  <View style={styles.projectInfo}>
                    <View style={styles.projectTitleContainer}>
                      {getTypeIcon(project.type)}
                      <Text style={styles.projectName}>{project.name}</Text>
                    </View>
                    
                    <View style={styles.projectMeta}>
                      <View style={[styles.statusBadge, { backgroundColor: getStatusColor(project.status) }]}>
                        <Text style={styles.statusText}>{project.status.toUpperCase()}</Text>
                      </View>
                      
                      <View style={[styles.priorityBadge, { backgroundColor: getPriorityColor(project.priority) }]}>
                        <Text style={styles.priorityText}>{project.priority.toUpperCase()}</Text>
                      </View>
                    </View>
                  </View>
                </View>
                
                <View style={styles.progressContainer}>
                  <View style={styles.progressHeader}>
                    <Text style={styles.progressLabel}>Progress</Text>
                    <Text style={styles.progressPercentage}>{project.progress}%</Text>
                  </View>
                  
                  <View style={styles.progressBar}>
                    <View 
                      style={[
                        styles.progressFill, 
                        { 
                          width: `${project.progress}%`,
                          backgroundColor: getStatusColor(project.status)
                        }
                      ]} 
                    />
                  </View>
                </View>
                
                <View style={styles.projectDetails}>
                  <View style={styles.detailItem}>
                    <Users size={16} color="#6B7280" />
                    <Text style={styles.detailText}>{project.assignees} assignees</Text>
                  </View>
                  
                  {project.dueDate && (
                    <View style={styles.detailItem}>
                      <Calendar size={16} color="#6B7280" />
                      <Text style={styles.detailText}>Due: {project.dueDate}</Text>
                    </View>
                  )}
                </View>
                
                <View style={styles.projectActions}>
                  <TouchableOpacity style={styles.actionButton}>
                    <FileText size={16} color="#3B82F6" />
                    <Text style={styles.actionText}>View Details</Text>
                  </TouchableOpacity>
                  
                  <TouchableOpacity style={styles.actionButton}>
                    <Share size={16} color="#10B981" />
                    <Text style={styles.actionText}>Share</Text>
                  </TouchableOpacity>
                  
                  <TouchableOpacity style={styles.actionButton}>
                    <Settings size={16} color="#6B7280" />
                    <Text style={styles.actionText}>Settings</Text>
                  </TouchableOpacity>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        ) : (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Team Members</Text>
            
            {mockTeamMembers.map((member) => (
              <TouchableOpacity key={member.id} style={styles.memberCard}>
                <View style={styles.memberHeader}>
                  <View style={styles.memberInfo}>
                    <View style={styles.avatarContainer}>
                      <Text style={styles.avatar}>{member.avatar}</Text>
                      <Text style={styles.statusIndicator}>{getStatusIcon(member.status)}</Text>
                    </View>
                    
                    <View style={styles.memberDetails}>
                      <Text style={styles.memberName}>{member.name}</Text>
                      <Text style={styles.memberRole}>{member.role}</Text>
                    </View>
                  </View>
                </View>
                
                <View style={styles.memberStats}>
                  <View style={styles.statItem}>
                    <Text style={styles.statValue}>{member.tasksCompleted}</Text>
                    <Text style={styles.statLabel}>Tasks Completed</Text>
                  </View>
                  
                  <View style={styles.statItem}>
                    <Text style={styles.statValue}>{member.activeProjects}</Text>
                    <Text style={styles.statLabel}>Active Projects</Text>
                  </View>
                </View>
                
                <View style={styles.memberActions}>
                  <TouchableOpacity style={styles.actionButton}>
                    <Users size={16} color="#3B82F6" />
                    <Text style={styles.actionText}>View Profile</Text>
                  </TouchableOpacity>
                  
                  <TouchableOpacity style={styles.actionButton}>
                    <FileText size={16} color="#10B981" />
                    <Text style={styles.actionText}>Assign Task</Text>
                  </TouchableOpacity>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        )}

        <View style={styles.quickActions}>
          <Text style={styles.sectionTitle}>Quick Actions</Text>
          
          <View style={styles.actionGrid}>
            <TouchableOpacity style={styles.actionCard}>
              <Plus size={24} color="#3B82F6" />
              <Text style={styles.actionCardText}>Create Project</Text>
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.actionCard}>
              <FileText size={24} color="#10B981" />
              <Text style={styles.actionCardText}>Add Task</Text>
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.actionCard}>
              <Users size={24} color="#F59E0B" />
              <Text style={styles.actionCardText}>Invite Member</Text>
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.actionCard}>
              <Download size={24} color="#8B5CF6" />
              <Text style={styles.actionCardText}>Export Report</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB',
  },
  header: {
    padding: 16,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F3F4F6',
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 8,
    marginBottom: 12,
  },
  searchInput: {
    flex: 1,
    marginLeft: 8,
    fontSize: 16,
    color: '#1F2937',
  },
  filterContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  filterButton: {
    padding: 8,
    borderRadius: 8,
    backgroundColor: '#EBF4FF',
  },
  addButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#3B82F6',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
  },
  addButtonText: {
    color: '#FFFFFF',
    fontWeight: '600',
    marginLeft: 4,
  },
  tabContainer: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  tab: {
    flex: 1,
    paddingVertical: 12,
    alignItems: 'center',
    borderBottomWidth: 2,
    borderBottomColor: 'transparent',
  },
  activeTab: {
    borderBottomColor: '#3B82F6',
  },
  tabText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#6B7280',
  },
  activeTabText: {
    color: '#3B82F6',
    fontWeight: '600',
  },
  content: {
    flex: 1,
    padding: 16,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 24,
  },
  statCard: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    padding: 12,
    borderRadius: 12,
    alignItems: 'center',
    marginHorizontal: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  statNumber: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1F2937',
    marginTop: 8,
  },
  statLabel: {
    fontSize: 10,
    color: '#6B7280',
    textAlign: 'center',
    marginTop: 4,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1F2937',
    marginBottom: 12,
  },
  projectCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  projectHeader: {
    marginBottom: 12,
  },
  projectInfo: {
    flex: 1,
  },
  projectTitleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  projectName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1F2937',
    marginLeft: 8,
    flex: 1,
  },
  projectMeta: {
    flexDirection: 'row',
    gap: 8,
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  statusText: {
    color: '#FFFFFF',
    fontSize: 10,
    fontWeight: '600',
  },
  priorityBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  priorityText: {
    color: '#FFFFFF',
    fontSize: 10,
    fontWeight: '600',
  },
  progressContainer: {
    marginBottom: 12,
  },
  progressHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  progressLabel: {
    fontSize: 14,
    color: '#6B7280',
    fontWeight: '500',
  },
  progressPercentage: {
    fontSize: 14,
    color: '#1F2937',
    fontWeight: '600',
  },
  progressBar: {
    height: 8,
    backgroundColor: '#E5E7EB',
    borderRadius: 4,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    borderRadius: 4,
  },
  projectDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  detailItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  detailText: {
    marginLeft: 8,
    fontSize: 14,
    color: '#6B7280',
  },
  projectActions: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    borderTopWidth: 1,
    borderTopColor: '#E5E7EB',
    paddingTop: 12,
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
    backgroundColor: '#F3F4F6',
  },
  actionText: {
    marginLeft: 4,
    fontSize: 12,
    fontWeight: '500',
    color: '#4B5563',
  },
  memberCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  memberHeader: {
    marginBottom: 12,
  },
  memberInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatarContainer: {
    position: 'relative',
    marginRight: 12,
  },
  avatar: {
    fontSize: 32,
  },
  statusIndicator: {
    position: 'absolute',
    bottom: -2,
    right: -2,
    fontSize: 12,
  },
  memberDetails: {
    flex: 1,
  },
  memberName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1F2937',
    marginBottom: 2,
  },
  memberRole: {
    fontSize: 14,
    color: '#6B7280',
  },
  memberStats: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 12,
  },
  statItem: {
    alignItems: 'center',
  },
  statValue: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1F2937',
  },
  memberActions: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    borderTopWidth: 1,
    borderTopColor: '#E5E7EB',
    paddingTop: 12,
  },
  quickActions: {
    marginBottom: 24,
  },
  actionGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  actionCard: {
    width: '48%',
    backgroundColor: '#FFFFFF',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  actionCardText: {
    marginTop: 8,
    fontSize: 14,
    fontWeight: '500',
    color: '#1F2937',
    textAlign: 'center',
  },
});
