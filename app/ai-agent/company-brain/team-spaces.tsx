import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, useSafeAreaInsets } from 'react-native';
import { useRouter } from 'expo-router';
import { ArrowLeft, Users, Briefcase, Target, Shield, Plus, Search, MoreHorizontal, FileText, MessageSquare, Clock, UserPlus, Settings, ChevronRight, Folder, Lock, Globe, Bot } from 'lucide-react-native';

export default function TeamSpacesScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();

  const DEPARTMENTS = [
    { id: 'engineering', name: 'Engineering', icon: 'code', color: '#3B82F6', members: 45, nodes: 456, privacy: 'private' },
    { id: 'sales', name: 'Sales', icon: 'trending-up', color: '#10B981', members: 28, nodes: 234, privacy: 'private' },
    { id: 'product', name: 'Product', icon: 'package', color: '#7C3AED', members: 15, nodes: 189, privacy: 'private' },
    { id: 'marketing', name: 'Marketing', icon: 'megaphone', color: '#F59E0B', members: 18, nodes: 145, privacy: 'public' },
    { id: 'hr', name: 'Human Resources', icon: 'users', color: '#EC4899', members: 8, nodes: 98, privacy: 'private' },
    { id: 'operations', name: 'Operations', icon: 'settings', color: '#06B6D4', members: 12, nodes: 123, privacy: 'private' },
  ];

  const PROJECTS = [
    { name: 'AWS Migration', dept: 'Engineering', members: 12, nodes: 89, updated: '2h ago' },
    { name: 'Q4 Product Launch', dept: 'Product', members: 8, nodes: 67, updated: '5h ago' },
    { name: 'Enterprise Sales Playbook', dept: 'Sales', members: 15, nodes: 45, updated: '1d ago' },
    { name: 'Security Audit 2024', dept: 'Operations', members: 6, nodes: 34, updated: '3h ago' },
  ];

  const CLIENT_HUBS = [
    { name: 'Acme Corp', industry: 'Technology', contacts: 8, nodes: 56, lastContact: '2h ago' },
    { name: 'Global Bank', industry: 'Finance', contacts: 12, nodes: 89, lastContact: '1d ago' },
    { name: 'HealthPlus', industry: 'Healthcare', contacts: 5, nodes: 34, lastContact: '3d ago' },
  ];

  const SHARED_SPACES = [
    { name: 'Company Policies', type: 'Company-wide', nodes: 234, contributors: 15 },
    { name: 'Onboarding Guide', type: 'Company-wide', nodes: 156, contributors: 8 },
    { name: 'Brand Guidelines', type: 'Company-wide', nodes: 78, contributors: 4 },
    { name: 'IT & Security', type: 'Cross-functional', nodes: 123, contributors: 6 },
  ];

  return (
    <View style={{ flex: 1, backgroundColor: '#0F172A' }}>
      {/* Header */}
      <View style={[styles.header, { paddingTop: insets.top + 8 }]}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <ArrowLeft size={24} color="#FFFFFF" />
        </TouchableOpacity>
        <View style={styles.headerTitle}>
          <Text style={styles.headerTitleText}>Team Spaces</Text>
          <Text style={styles.headerSubtitle}>Department and project-specific knowledge bases</Text>
        </View>
        <TouchableOpacity style={styles.addButton}>
          <Plus size={20} color="#FFFFFF" />
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Quick Stats */}
        <View style={styles.statsRow}>
          <View style={[styles.statCard, { backgroundColor: '#1E293B' }]}>
            <Users size={20} color="#3B82F6" />
            <Text style={styles.statValue}>6</Text>
            <Text style={styles.statLabel}>Departments</Text>
          </View>
          <View style={[styles.statCard, { backgroundColor: '#1E293B' }]}>
            <Briefcase size={20} color="#7C3AED" />
            <Text style={styles.statValue}>12</Text>
            <Text style={styles.statLabel}>Projects</Text>
          </View>
          <View style={[styles.statCard, { backgroundColor: '#1E293B' }]}>
            <Target size={20} color="#10B981" />
            <Text style={styles.statValue}>3</Text>
            <Text style={styles.statLabel}>Client Hubs</Text>
          </View>
        </View>

        {/* Search */}
        <View style={[styles.searchBar, { backgroundColor: '#1E293B' }]}>
          <Search size={18} color="#6B7280" />
          <Text style={styles.searchPlaceholder}>Search team spaces...</Text>
        </View>

        {/* Department Spaces */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Department Spaces</Text>
            <TouchableOpacity>
              <Text style={styles.seeAll}>See All</Text>
            </TouchableOpacity>
          </View>
          {DEPARTMENTS.map((dept, index) => (
            <TouchableOpacity key={dept.id} style={[styles.spaceCard, { backgroundColor: '#1E293B' }]}>
              <View style={[styles.spaceIcon, { backgroundColor: dept.color + '20' }]}>
                <Users size={22} color={dept.color} />
              </View>
              <View style={styles.spaceInfo}>
                <View style={styles.spaceNameRow}>
                  <Text style={styles.spaceName}>{dept.name}</Text>
                  {dept.privacy === 'private' ? (
                    <Lock size={12} color="#6B7280" />
                  ) : (
                    <Globe size={12} color="#10B981" />
                  )}
                </View>
                <View style={styles.spaceMeta}>
                  <View style={styles.spaceMetaItem}>
                    <Users size={12} color="#6B7280" />
                    <Text style={styles.spaceMetaText}>{dept.members} members</Text>
                  </View>
                  <View style={styles.spaceMetaItem}>
                    <FileText size={12} color="#6B7280" />
                    <Text style={styles.spaceMetaText}>{dept.nodes} nodes</Text>
                  </View>
                </View>
              </View>
              <ChevronRight size={18} color="#6B7280" />
            </TouchableOpacity>
          ))}
        </View>

        {/* Project Spaces */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Project Spaces</Text>
            <TouchableOpacity>
              <Text style={styles.seeAll}>See All</Text>
            </TouchableOpacity>
          </View>
          {PROJECTS.map((project, index) => (
            <TouchableOpacity key={index} style={[styles.projectCard, { backgroundColor: '#1E293B' }]}>
              <View style={[styles.projectIcon, { backgroundColor: '#7C3AED20' }]}>
                <Briefcase size={20} color="#7C3AED" />
              </View>
              <View style={styles.projectInfo}>
                <Text style={styles.projectName}>{project.name}</Text>
                <Text style={styles.projectDept}>{project.dept}</Text>
              </View>
              <View style={styles.projectStats}>
                <Text style={styles.projectNodes}>{project.nodes} nodes</Text>
                <Text style={styles.projectTime}>{project.updated}</Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>

        {/* Client Hubs */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Client Knowledge Hubs</Text>
            <TouchableOpacity>
              <Text style={styles.seeAll}>See All</Text>
            </TouchableOpacity>
          </View>
          {CLIENT_HUBS.map((client, index) => (
            <TouchableOpacity key={index} style={[styles.clientCard, { backgroundColor: '#1E293B' }]}>
              <View style={[styles.clientIcon, { backgroundColor: '#10B98120' }]}>
                <Target size={20} color="#10B981" />
              </View>
              <View style={styles.clientInfo}>
                <Text style={styles.clientName}>{client.name}</Text>
                <Text style={styles.clientIndustry}>{client.industry}</Text>
              </View>
              <View style={styles.clientStats}>
                <Text style={styles.clientContacts}>{client.contacts} contacts</Text>
                <Text style={styles.clientTime}>{client.lastContact}</Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>

        {/* Shared Company Spaces */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Company-Wide Spaces</Text>
          {SHARED_SPACES.map((space, index) => (
            <TouchableOpacity key={index} style={[styles.sharedCard, { backgroundColor: '#1E293B' }]}>
              <View style={[styles.sharedIcon, { backgroundColor: '#3B82F620' }]}>
                <Globe size={20} color="#3B82F6" />
              </View>
              <View style={styles.sharedInfo}>
                <Text style={styles.sharedName}>{space.name}</Text>
                <Text style={styles.sharedType}>{space.type}</Text>
              </View>
              <View style={styles.sharedStats}>
                <Text style={styles.sharedNodes}>{space.nodes} nodes</Text>
                <Text style={styles.sharedContributors}>{space.contributors} contributors</Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>

        {/* Create New Space */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Create New Space</Text>
          <View style={styles.createGrid}>
            <TouchableOpacity style={[styles.createCard, { backgroundColor: '#1E293B' }]}>
              <Users size={24} color="#3B82F6" />
              <Text style={styles.createText}>Department Space</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.createCard, { backgroundColor: '#1E293B' }]}>
              <Briefcase size={24} color="#7C3AED" />
              <Text style={styles.createText}>Project Space</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.createCard, { backgroundColor: '#1E293B' }]}>
              <Target size={24} color="#10B981" />
              <Text style={styles.createText}>Client Hub</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.createCard, { backgroundColor: '#1E293B' }]}>
              <Shield size={24} color="#F59E0B" />
              <Text style={styles.createText}>Cross-Functional</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Team Spaces AI Agents */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Team Spaces AI Agents</Text>
          <View style={styles.agentsRow}>
            {[
              { name: 'Space Manager', color: '#3B82F6' },
              { name: 'Access Controller', color: '#7C3AED' },
              { name: 'Sync Coordinator', color: '#10B981' },
              { name: 'Content Router', color: '#F59E0B' },
            ].map((agent, index) => (
              <View key={index} style={[styles.agentChip, { backgroundColor: agent.color + '20' }]}>
                <Bot size={14} color={agent.color} />
                <Text style={[styles.agentChipText, { color: agent.color }]}>{agent.name}</Text>
              </View>
            ))}
          </View>
        </View>

        <View style={{ height: 40 }} />
      </ScrollView>
    </View>
  );
}

const styles = {
  header: { flexDirection: 'row', alignItems: 'center', padding: 16, backgroundColor: '#0F172A', gap: 12 },
  backButton: { padding: 4 },
  headerTitle: { flex: 1 },
  headerTitleText: { fontSize: 20, fontWeight: 'bold', color: '#FFFFFF' },
  headerSubtitle: { fontSize: 13, color: '#9CA3AF' },
  addButton: { width: 40, height: 40, borderRadius: 20, backgroundColor: '#3B82F6', justifyContent: 'center', alignItems: 'center' },
  content: { flex: 1, paddingHorizontal: 16 },
  statsRow: { flexDirection: 'row', gap: 8, marginBottom: 20 },
  statCard: { flex: 1, padding: 14, borderRadius: 12, alignItems: 'center' },
  statValue: { fontSize: 22, fontWeight: 'bold', color: '#FFFFFF', marginTop: 6 },
  statLabel: { fontSize: 11, color: '#9CA3AF', marginTop: 2 },
  searchBar: { flexDirection: 'row', alignItems: 'center', padding: 12, borderRadius: 12, marginBottom: 20, gap: 10 },
  searchPlaceholder: { fontSize: 14, color: '#6B7280' },
  section: { marginBottom: 24 },
  sectionHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 },
  sectionTitle: { fontSize: 16, fontWeight: '600', color: '#FFFFFF' },
  seeAll: { fontSize: 13, color: '#3B82F6' },
  spaceCard: { flexDirection: 'row', alignItems: 'center', padding: 14, borderRadius: 12, marginBottom: 8 },
  spaceIcon: { width: 44, height: 44, borderRadius: 12, justifyContent: 'center', alignItems: 'center' },
  spaceInfo: { flex: 1, marginLeft: 12 },
  spaceNameRow: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  spaceName: { fontSize: 15, fontWeight: '600', color: '#FFFFFF' },
  spaceMeta: { flexDirection: 'row', gap: 16, marginTop: 4 },
  spaceMetaItem: { flexDirection: 'row', alignItems: 'center', gap: 4 },
  spaceMetaText: { fontSize: 12, color: '#6B7280' },
  projectCard: { flexDirection: 'row', alignItems: 'center', padding: 12, borderRadius: 10, marginBottom: 6 },
  projectIcon: { width: 40, height: 40, borderRadius: 10, justifyContent: 'center', alignItems: 'center' },
  projectInfo: { flex: 1, marginLeft: 12 },
  projectName: { fontSize: 14, fontWeight: '600', color: '#FFFFFF' },
  projectDept: { fontSize: 12, color: '#9CA3AF' },
  projectStats: { alignItems: 'flex-end' },
  projectNodes: { fontSize: 13, color: '#FFFFFF' },
  projectTime: { fontSize: 11, color: '#6B7280', marginTop: 2 },
  clientCard: { flexDirection: 'row', alignItems: 'center', padding: 12, borderRadius: 10, marginBottom: 6 },
  clientIcon: { width: 40, height: 40, borderRadius: 10, justifyContent: 'center', alignItems: 'center' },
  clientInfo: { flex: 1, marginLeft: 12 },
  clientName: { fontSize: 14, fontWeight: '600', color: '#FFFFFF' },
  clientIndustry: { fontSize: 12, color: '#9CA3AF' },
  clientStats: { alignItems: 'flex-end' },
  clientContacts: { fontSize: 13, color: '#FFFFFF' },
  clientTime: { fontSize: 11, color: '#6B7280', marginTop: 2 },
  sharedCard: { flexDirection: 'row', alignItems: 'center', padding: 12, borderRadius: 10, marginBottom: 6 },
  sharedIcon: { width: 40, height: 40, borderRadius: 10, justifyContent: 'center', alignItems: 'center' },
  sharedInfo: { flex: 1, marginLeft: 12 },
  sharedName: { fontSize: 14, fontWeight: '600', color: '#FFFFFF' },
  sharedType: { fontSize: 12, color: '#9CA3AF' },
  sharedStats: { alignItems: 'flex-end' },
  sharedNodes: { fontSize: 13, color: '#FFFFFF' },
  sharedContributors: { fontSize: 11, color: '#6B7280', marginTop: 2 },
  createGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  createCard: { width: '48%', padding: 16, borderRadius: 12, alignItems: 'center' },
  createText: { fontSize: 13, color: '#FFFFFF', marginTop: 8, textAlign: 'center' },
  agentsRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  agentChip: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 12, paddingVertical: 8, borderRadius: 20, gap: 6 },
  agentChipText: { fontSize: 12, fontWeight: '500' }
};